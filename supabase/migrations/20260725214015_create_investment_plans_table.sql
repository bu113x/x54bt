-- ============================================================================
-- Investment plans: duration/price tiers.
-- ============================================================================

create table investment_plans (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  min_deposit numeric(14, 2) not null check (min_deposit > 0),
  duration_days integer not null check (duration_days > 0),
  expected_return numeric(5, 2) check (expected_return >= 0),
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger investment_plans_set_updated_at
  before update on investment_plans
  for each row execute function set_updated_at();

create index investment_plans_active_idx on investment_plans (sort_order) where is_active;

alter table investment_plans enable row level security;

create policy "investment_plans_select_authenticated"
  on investment_plans for select
  to authenticated
  using (is_active or is_admin());

create policy "investment_plans_write_admin_only"
  on investment_plans for all
  using (is_admin())
  with check (is_admin());

-- ---------------------------------------------------------------------------
-- Seed: the 8 tiers
-- ---------------------------------------------------------------------------
insert into investment_plans (slug, name, min_deposit, duration_days, expected_return, sort_order)
values
  ('genesis',  'Genesis Plan',  200,  12, 4, 1),
  ('nova',     'Nova Plan',     500,  10, 4, 2),
  ('orbit',    'Orbit Plan',    1000, 8, 3,  3),
  ('vertex',   'Vertex Plan',   1500, 7, 3.2, 4),
  ('summit',   'Summit Plan',   2000, 7, 3,  5),
  ('titan',    'Titan Plan',    3500, 5, 2.5,  6),
  ('infinity', 'Infinity Plan', 5000, 5, 2.5,  7),
  ('nexus',    'Nexus Plan',    7000, 3, 2, 8)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Positions: track which plan was chosen and when the lock-in matures.
-- ---------------------------------------------------------------------------
alter table positions
  add column plan_id uuid references investment_plans(id) on delete restrict,
  add column matures_at timestamptz;

create index positions_plan_id_idx on positions (plan_id);

-- ---------------------------------------------------------------------------
-- create_investment_position: now takes a plan slug too. Validates the
-- amount against BOTH the asset's investment limits and the plan's minimum
-- deposit, and stamps matures_at = opened_at + plan.duration_days.
-- ============================================================================
create or replace function create_investment_position(
  p_asset_symbol text,
  p_plan_slug text,
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
  v_plan investment_plans%rowtype;
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
  for share;

  if not found then
    raise exception 'Asset % is not available for investment', p_asset_symbol;
  end if;

  select * into v_plan from investment_plans
  where slug = p_plan_slug and is_active
  for share;

  if not found then
    raise exception 'Plan % is not available', p_plan_slug;
  end if;

  if p_amount < v_asset.min_investment or p_amount > v_asset.max_investment then
    raise exception 'Amount must be between % and % for this asset', v_asset.min_investment, v_asset.max_investment;
  end if;

  if p_amount < v_plan.min_deposit then
    raise exception 'Amount must be at least % for the % plan', v_plan.min_deposit, v_plan.name;
  end if;

  select * into v_wallet from wallets
  where user_id = v_user_id
  for update;

  if not found then
    raise exception 'Wallet not found for user';
  end if;

  if v_wallet.balance < p_amount then
    raise exception 'Insufficient balance';
  end if;

  update wallets
  set balance = balance - p_amount
  where user_id = v_user_id;

  insert into positions (
    user_id, asset_id, plan_id, amount_invested, current_value, status, matures_at
  )
  values (
    v_user_id, v_asset.id, v_plan.id, p_amount, p_amount, 'active',
    now() + (v_plan.duration_days || ' days')::interval
  )
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
    format('Opened %s position (%s plan)', v_asset.symbol, v_plan.name),
    v_reference
  );

  return v_position;
end;
$$;

revoke all on function create_investment_position(text, text, numeric) from public;
grant execute on function create_investment_position(text, text, numeric) to authenticated;

-- Drop the old 2-arg version now that the 3-arg version replaces it.
drop function if exists create_investment_position(text, numeric);