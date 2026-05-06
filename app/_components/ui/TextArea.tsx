'use client';

import { type TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function TextArea({
  label,
  hint,
  error,
  className = '',
  id,
  ...props
}: TextAreaProps) {
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
      <textarea
        id={inputId}
        className={`min-h-[120px] px-4 py-3 rounded-sm border bg-background text-primary-800 placeholder:text-primary-300 transition-colors duration-100 resize-y
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
