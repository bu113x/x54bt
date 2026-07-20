interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

const ToggleSwitch = ({
  checked,
  onChange,
  label,
  description,
}: ToggleSwitchProps) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs text-foreground-muted">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors cursor-pointer ${
          checked ? "bg-primary" : "bg-surface-elevated"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-0" : "-translate-x-4.5"
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
