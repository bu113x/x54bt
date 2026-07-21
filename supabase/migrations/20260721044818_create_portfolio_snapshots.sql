-- ============================================================================
-- portfolio_snapshots
-- One row per user per day, recording total portfolio value at that point
-- in time. Populated by a scheduled job (pg_cron), not by the application
-- directly — this is derived/historical data, never written by client code.
-- ============================================================================

create extension if not exists pg_cron with schema extensions;

create table portfolio_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  total_value numeric(14, 2) not null,
  total_deposited numeric(14, 2) not null,
  total_profit numeric(14, 2) not null,
  recorded_at timestamptz not null default now(),
  snapshot_date date not null default current_date,

  -- One snapshot per user per day. Re-running the job the same day
  -- updates the existing row instead of creating duplicates.
  constraint portfolio_snapshots_user_date_unique unique (user_id, snapshot_date)
);

create index portfolio_snapshots_user_date_idx
  on portfolio_snapshots (user_id, snapshot_date desc);

alter table portfolio_snapshots enable row level security;

create policy "portfolio_snapshots_select_own_or_admin"
  on portfolio_snapshots for select
  using (user_id = auth.uid() or is_admin());

-- ---------------------------------------------------------------------------
-- record_portfolio_snapshots
-- Computes and upserts today's snapshot for every user with at least one
-- position. SECURITY DEFINER so the cron job (running as postgres) can
-- write rows on behalf of every user, bypassing the select-only RLS above
-- by design — this is the one legitimate write path into this table.
-- ---------------------------------------------------------------------------
create or replace function record_portfolio_snapshots()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into portfolio_snapshots (user_id, total_value, total_deposited, total_profit, snapshot_date)
  select
    p.user_id,
    coalesce(sum(p.current_value) filter (where p.status = 'active'), 0) as total_value,
    coalesce(sum(p.amount_invested), 0) as total_deposited,
    coalesce(sum(p.current_value - p.amount_invested), 0) as total_profit,
    current_date
  from positions p
  group by p.user_id
  on conflict (user_id, snapshot_date)
  do update set
    total_value = excluded.total_value,
    total_deposited = excluded.total_deposited,
    total_profit = excluded.total_profit,
    recorded_at = now();
end;
$$;

-- Only the postgres role (used by pg_cron) should ever call this directly —
-- it's not meant to be invoked by the application.
revoke all on function record_portfolio_snapshots() from public;

-- ---------------------------------------------------------------------------
-- Schedule: once daily at 00:05 UTC. Adjust the cron expression if you want
-- more frequent snapshots (e.g. hourly for a more granular chart), keeping
-- in mind each run scans every user's positions.
-- ---------------------------------------------------------------------------
select cron.schedule(
  'daily-portfolio-snapshot',
  '5 0 * * *',
  $$ select record_portfolio_snapshots(); $$
);