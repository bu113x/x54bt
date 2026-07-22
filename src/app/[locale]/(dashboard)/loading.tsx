const DashboardLoading = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="h-7 w-40 animate-pulse rounded-lg bg-surface-elevated" />
        <div className="mt-2 h-4 w-64 animate-pulse rounded-lg bg-surface-elevated" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-card border border-border bg-surface"
          />
        ))}
      </div>

      <div className="h-64 animate-pulse rounded-card border border-border bg-surface" />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-72 animate-pulse rounded-card border border-border bg-surface" />
        <div className="h-72 animate-pulse rounded-card border border-border bg-surface" />
      </div>
    </div>
  );
};

export default DashboardLoading;
