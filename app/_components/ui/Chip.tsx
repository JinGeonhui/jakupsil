'use client';

interface ChipProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Chip({
  children,
  selected = false,
  onClick,
  className = '',
}: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm transition-colors duration-100 cursor-pointer
        ${
          selected
            ? 'bg-foreground text-background'
            : 'bg-gray-100 text-primary-600 hover:bg-gray-200'
        }
        ${className}`}
    >
      {children}
    </button>
  );
}
