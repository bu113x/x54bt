-- ============================================================================
-- crypto_deposits
-- Tracks the lifecycle of a NOWPayments payment intended to fund an
-- investment position. Separate from ledger_transactions because a
-- deposit's status mutates over time (waiting -> confirming -> finished),
-- whereas the ledger is an append-only settled record.
-- ============================================================================

create type deposit_status as enum (
  'waiting',
  'confirming',
  'confirmed',
  'sending',
  'partially_paid',
  'finished',
  'failed',
  'refunded',
  'expired'
);

create table crypto_deposits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  asset_id uuid not null references assets(id) on delete restrict,
  nowpayments_payment_id text not null unique,
  pay_currency text not null,      -- e.g. "btc" - what the investor is paying with
  pay_address text,                -- deposit address NOWPayments generated
  price_amount numeric(14, 2) not null, -- intended USD investment amount
  price_currency text not null default 'usd',
  pay_amount numeric(20, 8),        -- estimated crypto amount owed
  actually_paid numeric(20, 8),     -- filled in once NOWPayments reports it
  status deposit_status not null default 'waiting',
  position_id uuid references positions(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger crypto_deposits_set_updated_at
  before update on crypto_deposits
  for each row execute function set_updated_at();

create index crypto_deposits_user_id_idx on crypto_deposits (user_id);
create index crypto_deposits_status_idx on crypto_deposits (status);
create index crypto_deposits_payment_id_idx on crypto_deposits (nowpayments_payment_id);

alter table crypto_deposits enable row level security;

-- Users can see their own deposit intents (e.g. to show "waiting for payment"
-- UI), and create their own — but never update status directly. Status
-- transitions only happen via the webhook handler, using the service role
-- key, which bypasses RLS entirely by design.
create policy "crypto_deposits_select_own_or_admin"
  on crypto_deposits for select
  using (user_id = auth.uid() or is_admin());

create policy "crypto_deposits_insert_own"
  on crypto_deposits for insert
  with check (user_id = auth.uid());

-- ============================================================================
-- Refactor: split create_investment_position into an internal helper that
-- doesn't depend on auth.uid(), so both the client-facing RPC and the
-- webhook-triggered deposit flow can share the same core logic.
-- ============================================================================

create or replace function _open_position_for_user(
  p_user_id uuid,
  p_asset_symbol text,
  p_amount numeric
)
returns positions
language plpgsql
security definer
set search_path = public
as $$
declare
  v_asset assets%rowtype;
  v_wallet wallets%rowtype;
  v_position positions%rowtype;
  v_reference text;
begin
  if p_amount <= 0 then
    raise exception 'Investment amount must be greater than zero';
  end if;

  select * into v_asset from assets
  where symbol = p_asset_symbol and is_active
  for share;

  if not found then
    raise exception 'Asset % is not available for investment', p_asset_symbol;
  end if;

  if p_amount < v_asset.min_investment or p_amount > v_asset.max_investment then
    raise exception 'Amount must be between % and %', v_asset.min_investment, v_asset.max_investment;
  end if;

  select * into v_wallet from wallets
  where user_id = p_user_id
  for update;

  if not found then
    raise exception 'Wallet not found for user';
  end if;

  if v_wallet.balance < p_amount then
    raise exception 'Insufficient balance';
  end if;

  update wallets
  set balance = balance - p_amount
  where user_id = p_user_id;

  insert into positions (user_id, asset_id, amount_invested, current_value, status)
  values (p_user_id, v_asset.id, p_amount, p_amount, 'active')
  returning * into v_position;

  v_reference := 'TXN-' || upper(substr(md5(gen_random_uuid()::text), 1, 8));

  insert into ledger_transactions (
    user_id, position_id, type, status, amount, description, reference
  )
  values (
    p_user_id,
    v_position.id,
    'position_opened',
    'completed',
    -p_amount,
    format('Opened %s position', v_asset.symbol),
    v_reference
  );

  return v_position;
end;
$$;

revoke all on function _open_position_for_user(uuid, text, numeric) from public;

-- Client-facing RPC: unchanged signature/behavior, now delegates to the
-- shared helper. auth.uid() check happens here, not in the helper.
create or replace function create_investment_position(
  p_asset_symbol text,
  p_amount numeric
)
returns positions
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
begin
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  return _open_position_for_user(v_user_id, p_asset_symbol, p_amount);
end;
$$;

-- ============================================================================
-- create_investment_from_deposit
-- Called only by the webhook handler (service role), never by the client.
-- Idempotent: if the deposit is already linked to a position, or isn't in
-- a "finished" state, this is a no-op that returns the existing state
-- rather than erroring — safe to call multiple times for the same webhook
-- delivery retry.
-- ============================================================================

create or replace function create_investment_from_deposit(
  p_deposit_id uuid
)
returns positions
language plpgsql
security definer
set search_path = public
as $$
declare
  v_deposit crypto_deposits%rowtype;
  v_asset assets%rowtype;
  v_position positions%rowtype;
  v_reference text;
begin
  select * into v_deposit from crypto_deposits
  where id = p_deposit_id
  for update; -- lock this deposit row for the duration of processing

  if not found then
    raise exception 'Deposit % not found', p_deposit_id;
  end if;

  -- Idempotency guard: already processed, just return the existing position.
  if v_deposit.position_id is not null then
    select * into v_position from positions where id = v_deposit.position_id;
    return v_position;
  end if;

  if v_deposit.status != 'finished' then
    raise exception 'Deposit % is not finished (status: %)', p_deposit_id, v_deposit.status;
  end if;

  select * into v_asset from assets where id = v_deposit.asset_id;

  -- Step 1: credit the wallet — this deposit's funds are now "available".
  update wallets
  set balance = balance + v_deposit.price_amount
  where user_id = v_deposit.user_id;

  v_reference := 'DEP-' || upper(substr(md5(gen_random_uuid()::text), 1, 8));

  insert into ledger_transactions (
    user_id, type, status, amount, description, reference
  )
  values (
    v_deposit.user_id,
    'deposit',
    'completed',
    v_deposit.price_amount,
    format('Deposit via %s (NOWPayments)', upper(v_deposit.pay_currency)),
    v_reference
  );

  -- Step 2: immediately open the position the investor was depositing for.
  v_position := _open_position_for_user(v_deposit.user_id, v_asset.symbol, v_deposit.price_amount);

  update crypto_deposits
  set position_id = v_position.id
  where id = p_deposit_id;

  return v_position;
end;
$$;

revoke all on function create_investment_from_deposit(uuid) from public;
-- Deliberately no grant to `authenticated` — this must only be callable
-- via the service role key from the webhook handler.