'use client';

import { type SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  hint?: string;
}

export function Select({
  label,
  options,
  placeholder,
  hint,
  className = '',
  id,
  ...props
}: SelectProps) {
  const selectId = id || label?.replace(/\s/g, '-').toLowerCase();

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-primary-700"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`h-11 px-4 rounded-sm border border-gray-300 bg-background text-primary-800 transition-colors duration-100
          focus:border-primary-900 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary-900/20
          ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && <p className="text-xs text-primary-400">{hint}</p>}
    </div>
  );
}
