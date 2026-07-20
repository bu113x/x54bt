interface SettingsProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Settings = ({ title, description, children, footer }: SettingsProps) => {
  return (
    <div className="rounded-card border border-border bg-surface">
      <div className="border-b border-border px-6 py-5">
        <h3 className="font-semibold">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-foreground-muted">{description}</p>
        )}
      </div>

      <div className="px-6 py-5">{children}</div>

      {footer && (
        <div className="flex justify-end border-t border-border px-6 py-4">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Settings;
