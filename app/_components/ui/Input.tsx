'use client';

import { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Input({
  label,
  hint,
  error,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.replace(/\s/g, '-').toLowerCase();

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-primary-700"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`h-11 px-4 rounded-sm border bg-background text-primary-800 placeholder:text-primary-300 transition-colors duration-100
          ${error ? 'border-danger-500' : 'border-gray-300 focus:border-primary-900'}
          focus:outline-none focus:ring-2 focus:ring-offset-0 ${error ? 'focus:ring-danger-500/20' : 'focus:ring-primary-900/20'}
          ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-danger-600">{error}</p>}
      {hint && !error && <p className="text-xs text-primary-400">{hint}</p>}
    </div>
  );
}
