alter table assets
  add column coingecko_id text;

-- Backfill for the assets already seeded. Run after this migration via
-- a follow-up seed/update — see accompanying data migration below.
comment on column assets.coingecko_id is
  'CoinGecko coin id (e.g. "bitcoin"), used for live price/market-chart lookups. Not always equal to the ticker symbol.';