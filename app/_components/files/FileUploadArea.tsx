'use client';

import { useRef, useState, useCallback } from 'react';
import { MAX_FILE_SIZE } from '@/app/_lib/store/FileContext';

interface FileUploadAreaProps {
  onUpload: (file: File) => void;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(0)}MB`;
}

export function FileUploadArea({ onUpload }: FileUploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');

  const handleFile = useCallback(
    (file: File) => {
      setError('');
      if (file.size > MAX_FILE_SIZE) {
        setError(`파일 크기가 ${formatSize(MAX_FILE_SIZE)}를 초과합니다`);
        return;
      }
      onUpload(file);
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      if (inputRef.current) inputRef.current.value = '';
    },
    [handleFile]
  );

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors duration-100
          ${
            dragging
              ? 'border-primary-900 bg-primary-50'
              : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50'
          }`}
      >
        <svg
          className="w-8 h-8 mx-auto mb-3 text-primary-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
          />
        </svg>
        <p className="text-sm text-primary-500 mb-1">
          파일을 드래그하거나 클릭하여 업로드
        </p>
        <p className="text-xs text-primary-300">
          최대 {formatSize(MAX_FILE_SIZE)}
        </p>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
        />
      </div>
      {error && (
        <p className="text-xs text-danger-600 mt-2">{error}</p>
      )}
    </div>
  );
}
