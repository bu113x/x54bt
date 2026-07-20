-- ============================================================================
-- Bullex investment platform schema
-- Tables: profiles, wallets, assets, positions, ledger_transactions,
--         notification_preferences
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto"; -- for gen_random_uuid()

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type risk_tier as enum ('conservative', 'balanced', 'aggressive');

create type position_status as enum ('active', 'closed');

create type transaction_type as enum (
  'deposit',
  'withdrawal',
  'position_opened',
  'position_closed',
  'profit_distribution'
);

create type transaction_status as enum ('completed', 'pending', 'failed');

-- ---------------------------------------------------------------------------
-- Shared helper: updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- profiles
-- One row per auth.users row. Created automatically via trigger on signup.
-- Must exist before is_admin(), since that's a `language sql` function and
-- Postgres validates/inlines SQL function bodies at creation time.
-- ---------------------------------------------------------------------------
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  country text,
  role text not null default 'investor' check (role in ('investor', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profiles_set_updated_at
  before update on profiles
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Shared helper: is_admin()
-- SECURITY DEFINER so it can check profiles.role regardless of the caller's
-- own RLS visibility. Reused across every admin-scoped policy below.
-- ---------------------------------------------------------------------------
create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- wallets
-- One row per user. balance = available (uninvested) funds only.
-- Positions hold invested funds separately — never derive available balance
-- by subtracting positions on the fly; this column is the source of truth
-- and is only ever mutated inside SECURITY DEFINER functions below.
-- ---------------------------------------------------------------------------
create table wallets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  balance numeric(14, 2) not null default 0 check (balance >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger wallets_set_updated_at
  before update on wallets
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- notification_preferences
-- One row per user, created alongside profile/wallet on signup.
-- Created before handle_new_user() since that function inserts into it
-- (plpgsql wouldn't error either way, but keeping creation order consistent
-- with dependency order avoids surprises later).
-- ---------------------------------------------------------------------------
create table notification_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email_deposits boolean not null default true,
  email_profit_distributions boolean not null default true,
  email_marketing boolean not null default false,
  push_price_alerts boolean not null default true,
  updated_at timestamptz not null default now()
);

create trigger notification_preferences_set_updated_at
  before update on notification_preferences
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Auto-create a profile + wallet + notification prefs whenever a new auth
-- user signs up. plpgsql body isn't validated against table existence at
-- creation time, but all three tables above already exist by this point.
-- ---------------------------------------------------------------------------
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into profiles (id, full_name, phone)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'phone'
  );

  insert into wallets (user_id, balance)
  values (new.id, 0);

  insert into notification_preferences (user_id)
  values (new.id);

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ---------------------------------------------------------------------------
-- assets
-- Catalog of investable assets/strategies. Admin-managed.
-- ---------------------------------------------------------------------------
create table assets (
  id uuid primary key default gen_random_uuid(),
  symbol text not null unique,
  name text not null,
  logo_url text,
  risk_tier risk_tier not null,
  historical_range_low numeric(5, 2) not null check (historical_range_low >= 0),
  historical_range_high numeric(5, 2) not null check (historical_range_high >= historical_range_low),
  performance_fee_percent numeric(5, 2) not null check (performance_fee_percent between 0 and 100),
  min_investment numeric(14, 2) not null check (min_investment > 0),
  max_investment numeric(14, 2) not null check (max_investment >= min_investment),
  about text,
  strategy_description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger assets_set_updated_at
  before update on assets
  for each row execute function set_updated_at();

create index assets_risk_tier_idx on assets (risk_tier) where is_active;

-- ---------------------------------------------------------------------------
-- positions
-- One row per investor position in an asset.
-- ---------------------------------------------------------------------------
create table positions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  asset_id uuid not null references assets(id) on delete restrict,
  amount_invested numeric(14, 2) not null check (amount_invested > 0),
  current_value numeric(14, 2) not null,
  status position_status not null default 'active',
  opened_at timestamptz not null default now(),
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint closed_at_requires_closed_status
    check (status = 'closed' or closed_at is null)
);

create trigger positions_set_updated_at
  before update on positions
  for each row execute function set_updated_at();

create index positions_user_id_idx on positions (user_id);
create index positions_asset_id_idx on positions (asset_id);
create index positions_user_status_idx on positions (user_id, status);

-- ---------------------------------------------------------------------------
-- ledger_transactions
-- Full audit trail: deposits, withdrawals, position events, profit payouts.
-- Append-only from the application's perspective — never update amounts
-- after the fact; write a correcting entry instead if something's wrong.
-- ---------------------------------------------------------------------------
create table ledger_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  position_id uuid references positions(id) on delete set null,
  type transaction_type not null,
  status transaction_status not null default 'completed',
  amount numeric(14, 2) not null, -- signed: positive = credit, negative = debit
  description text not null,
  reference text not null unique,
  created_at timestamptz not null default now()
);

create index ledger_user_id_idx on ledger_transactions (user_id, created_at desc);
create index ledger_position_id_idx on ledger_transactions (position_id);
create index ledger_reference_idx on ledger_transactions (reference);

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table profiles enable row level security;
alter table wallets enable row level security;
alter table assets enable row level security;
alter table positions enable row level security;
alter table ledger_transactions enable row level security;
alter table notification_preferences enable row level security;

-- profiles: users see/edit their own; admins see/edit all
create policy "profiles_select_own_or_admin"
  on profiles for select
  using (id = auth.uid() or is_admin());

create policy "profiles_update_own_or_admin"
  on profiles for update
  using (id = auth.uid() or is_admin());

-- wallets: users can only read their own balance; writes happen exclusively
-- through SECURITY DEFINER functions (create_investment_position, etc.),
-- so no insert/update policy is granted to regular users at all.
create policy "wallets_select_own_or_admin"
  on wallets for select
  using (user_id = auth.uid() or is_admin());

-- assets: public catalog, readable by any authenticated user; only admins
-- can create/modify listings.
create policy "assets_select_authenticated"
  on assets for select
  to authenticated
  using (is_active or is_admin());

create policy "assets_write_admin_only"
  on assets for all
  using (is_admin())
  with check (is_admin());

-- positions: users see their own; writes happen through functions only.
create policy "positions_select_own_or_admin"
  on positions for select
  using (user_id = auth.uid() or is_admin());

-- ledger_transactions: users see their own; writes happen through
-- functions only (never direct client inserts, to keep the audit trail
-- trustworthy).
create policy "ledger_select_own_or_admin"
  on ledger_transactions for select
  using (user_id = auth.uid() or is_admin());

-- notification_preferences: users manage their own directly (safe to allow
-- client writes here — no financial impact).
create policy "notification_prefs_select_own_or_admin"
  on notification_preferences for select
  using (user_id = auth.uid() or is_admin());

create policy "notification_prefs_update_own"
  on notification_preferences for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- ============================================================================
-- create_investment_position
-- Atomically: validates amount against asset limits, checks wallet balance,
-- debits wallet, creates position, writes ledger entry. All under
-- SECURITY DEFINER so RLS on wallets/positions/ledger doesn't block the
-- writes — but every check below re-validates against auth.uid(), so a
-- caller can only ever act on their own wallet.
-- ============================================================================
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
  v_asset assets%rowtype;
  v_wallet wallets%rowtype;
  v_position positions%rowtype;
  v_reference text;
begin
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  if p_amount <= 0 then
    raise exception 'Investment amount must be greater than zero';
  end if;

  select * into v_asset from assets
  where symbol = p_asset_symbol and is_active
  for share; -- prevent asset limits changing mid-transaction

  if not found then
    raise exception 'Asset % is not available for investment', p_asset_symbol;
  end if;

  if p_amount < v_asset.min_investment or p_amount > v_asset.max_investment then
    raise exception 'Amount must be between % and %', v_asset.min_investment, v_asset.max_investment;
  end if;

  select * into v_wallet from wallets
  where user_id = v_user_id
  for update; -- lock the wallet row to prevent concurrent double-spend

  if not found then
    raise exception 'Wallet not found for user';
  end if;

  if v_wallet.balance < p_amount then
    raise exception 'Insufficient balance';
  end if;

  update wallets
  set balance = balance - p_amount
  where user_id = v_user_id;

  insert into positions (user_id, asset_id, amount_invested, current_value, status)
  values (v_user_id, v_asset.id, p_amount, p_amount, 'active')
  returning * into v_position;

  v_reference := 'TXN-' || upper(substr(md5(gen_random_uuid()::text), 1, 8));

  insert into ledger_transactions (
    user_id, position_id, type, status, amount, description, reference
  )
  values (
    v_user_id,
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

-- Only authenticated users may call this; SECURITY DEFINER body still
-- constrains every write to auth.uid()'s own rows.
revoke all on function create_investment_position(text, numeric) from public;
grant execute on function create_investment_position(text, numeric) to authenticated;