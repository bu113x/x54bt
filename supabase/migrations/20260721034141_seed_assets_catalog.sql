-- ============================================================================
-- Seed data: assets catalog
-- Runs automatically on `supabase db reset` (local dev only).
-- For remote/production, apply via `supabase db push --include-seed`
-- or run this file manually against the remote DB (see notes below).
-- ============================================================================

insert into assets (
  symbol,
  name,
  logo_url,
  risk_tier,
  historical_range_low,
  historical_range_high,
  performance_fee_percent,
  min_investment,
  max_investment,
  about,
  strategy_description,
  is_active
)
values
  (
    'BTC',
    'Bitcoin',
    'https://muzcdagdunujzzhktgvo.supabase.co/storage/v1/object/public/coins/bitcoin.webp',
    'balanced',
    8,
    16,
    20,
    100,
    50000,
    'Bitcoin is the largest cryptocurrency by market cap, used here as the underlying asset for our balanced-tier trading strategy.',
    'Funds allocated to this asset are actively traded by our team using a mix of trend-following and mean-reversion strategies. Historical monthly performance has ranged from 8% to 16%, though this is not a guarantee of future results.',
    true
  ),
  (
    'ETH',
    'Ethereum',
    'https://muzcdagdunujzzhktgvo.supabase.co/storage/v1/object/public/coins/ethereum.webp',
    'conservative',
    4,
    9,
    15,
    100,
    50000,
    'Ethereum is the largest smart-contract platform by market cap, used here as the underlying asset for our conservative-tier strategy.',
    'Funds allocated to this asset favor capital-preservation strategies with tighter drawdown control. Historical monthly performance has ranged from 4% to 9%, though this is not a guarantee of future results.',
    true
  ),
  (
    'ADA',
    'Cardano',
    'https://muzcdagdunujzzhktgvo.supabase.co/storage/v1/object/public/coins/cardano.webp',
    'aggressive',
    12,
    28,
    25,
    100,
    50000,
    'Cardano is a proof-of-stake blockchain platform, used here as the underlying asset for our aggressive-tier strategy.',
    'Funds allocated to this asset pursue higher-volatility, higher-potential-return strategies. Historical monthly performance has ranged from 12% to 28%, though this is not a guarantee of future results.',
    true
  ),
  (
    'USDT',
    'Tether (Yield Vault)',
    'https://muzcdagdunujzzhktgvo.supabase.co/storage/v1/object/public/coins/tether.webp',
    'conservative',
    3,
    6,
    12,
    50,
    100000,
    'A stablecoin-denominated yield vault, used for lower-volatility capital deployment.',
    'Funds allocated to this vault pursue the most conservative strategies available on the platform, prioritizing stability over upside. Historical monthly performance has ranged from 3% to 6%, though this is not a guarantee of future results.',
    true
  ),
  (
    'LTC',
    'Litecoin',
    'https://muzcdagdunujzzhktgvo.supabase.co/storage/v1/object/public/coins/litecoin.webp',
    'balanced',
    7,
    15,
    20,
    100,
    50000,
    'Litecoin is a long-standing payments-focused cryptocurrency, used here as the underlying asset for a balanced-tier strategy.',
    'Funds allocated to this asset are actively traded using a mix of trend-following and mean-reversion strategies. Historical monthly performance has ranged from 7% to 15%, though this is not a guarantee of future results.',
    true
  ),
  (
    'XRP',
    'Ripple',
    'https://muzcdagdunujzzhktgvo.supabase.co/storage/v1/object/public/coins/ripple.webp',
    'aggressive',
    10,
    24,
    25,
    100,
    50000,
    'XRP is used here as the underlying asset for our aggressive-tier strategy.',
    'Funds allocated to this asset pursue higher-volatility strategies with correspondingly higher potential drawdown. Historical monthly performance has ranged from 10% to 24%, though this is not a guarantee of future results.',
    true
  )
on conflict (symbol) do nothing;