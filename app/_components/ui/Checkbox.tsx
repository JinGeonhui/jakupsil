'use client';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  className?: string;
}

export function Checkbox({
  label,
  checked,
  onChange,
  id,
  className = '',
}: CheckboxProps) {
  const checkboxId = id || label.replace(/\s/g, '-').toLowerCase();

  return (
    <label
      htmlFor={checkboxId}
      className={`flex items-center gap-2 cursor-pointer select-none ${className}`}
    >
      <input
        id={checkboxId}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 rounded-xs border-gray-300 text-primary-900 accent-primary-900 cursor-pointer"
      />
      <span
        className={`text-sm ${checked ? 'text-primary-600 line-through' : 'text-primary-800'}`}
      >
        {label}
      </span>
    </label>
  );
}
