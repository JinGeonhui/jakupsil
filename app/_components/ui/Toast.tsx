'use client';

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  open: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({
  message,
  open,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, onClose, duration]);

  if (!open) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-primary-400 text-white rounded-md px-6 py-3 shadow-2 text-sm">
        {message}
      </div>
    </div>
  );
}
