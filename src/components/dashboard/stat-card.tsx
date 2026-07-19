import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: { value: string; positive: boolean };
  sublabel?: string;
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  delta,
  sublabel,
}: StatCardProps) => {
  return (
    <div className="rounded-card border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wide text-foreground-muted">
          {label}
        </p>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </span>
      </div>

      <p
        className="mt-3 text-2xl font-bold"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {value}
      </p>

      {(delta || sublabel) && (
        <div className="mt-1.5 flex items-center gap-2 text-xs">
          {delta && (
            <span className={delta.positive ? "text-success" : "text-danger"}>
              {delta.positive ? "+" : ""}
              {delta.value}
            </span>
          )}
          {sublabel && (
            <span className="text-foreground-muted">{sublabel}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;
