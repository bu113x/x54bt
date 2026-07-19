"use client";

interface TabGroupProps<T extends string> {
  tabs: { value: T; label: string; count?: number }[];
  active: T;
  onChange: (value: T) => void;
}

const TabGroup = <T extends string>({
  tabs,
  active,
  onChange,
}: TabGroupProps<T>) => {
  return (
    <div className="flex gap-1 border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`relative flex items-center gap-2 px-4 py-2.5 text-sm transition-colors cursor-pointer ${
            active === tab.value
              ? "font-medium text-primary"
              : "text-foreground-muted hover:text-foreground"
          }`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="rounded-full bg-surface-elevated px-1.5 py-0.5 text-[10px]">
              {tab.count}
            </span>
          )}
          {active === tab.value && (
            <span className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
};

export default TabGroup;
