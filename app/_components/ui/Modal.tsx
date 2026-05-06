'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
}

const maxWidthStyles = {
  sm: 'max-w-[480px]',
  md: 'max-w-[640px]',
  lg: 'max-w-[800px]',
};

export function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = 'sm',
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="backdrop:bg-black/40 bg-transparent p-4 m-auto"
    >
      <div
        className={`bg-background rounded-lg shadow-3 p-8 w-full ${maxWidthStyles[maxWidth]}`}
      >
        {title && (
          <h2 className="text-lg font-semibold text-primary-800 mb-4">
            {title}
          </h2>
        )}
        {children}
      </div>
    </dialog>
  );
}
