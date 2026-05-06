'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { ProjectFile } from '../types';
import { usePersistedState } from '../utils/localStorage';
import { saveFileBlob, deleteFileBlob, getFileBlob } from '../utils/fileStorage';
import { generateId } from '../utils/generateId';

const STORAGE_KEY = 'jakupsil_files';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface FileContextType {
  files: ProjectFile[];
  getByProject: (projectId: string) => ProjectFile[];
  addFile: (projectId: string, file: File) => Promise<ProjectFile | null>;
  removeFile: (id: string) => Promise<void>;
  downloadFile: (id: string) => Promise<void>;
}

const FileContext = createContext<FileContextType | null>(null);

export function FileProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = usePersistedState<ProjectFile[]>(STORAGE_KEY, []);

  const getByProject = (projectId: string) =>
    files
      .filter((f) => f.projectId === projectId)
      .sort(
        (a, b) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      );

  const addFile = async (
    projectId: string,
    file: File
  ): Promise<ProjectFile | null> => {
    if (file.size > MAX_FILE_SIZE) return null;

    const id = generateId();
    await saveFileBlob(id, file);

    const meta: ProjectFile = {
      id,
      projectId,
      name: file.name,
      size: file.size,
      mimeType: file.type || 'application/octet-stream',
      uploadedAt: new Date().toISOString(),
    };

    setFiles((prev) => [...prev, meta]);
    return meta;
  };

  const removeFile = async (id: string) => {
    await deleteFileBlob(id);
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const downloadFile = async (id: string) => {
    const meta = files.find((f) => f.id === id);
    if (!meta) return;

    const blob = await getFileBlob(id);
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = meta.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <FileContext.Provider
      value={{ files, getByProject, addFile, removeFile, downloadFile }}
    >
      {children}
    </FileContext.Provider>
  );
}

export function useFiles() {
  const ctx = useContext(FileContext);
  if (!ctx) throw new Error('useFiles must be used within FileProvider');
  return ctx;
}

export { MAX_FILE_SIZE };
