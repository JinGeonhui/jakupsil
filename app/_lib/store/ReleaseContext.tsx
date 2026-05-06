'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Release } from '../types';
import { MOCK_RELEASES } from '../mock/data';
import { usePersistedState } from '../utils/localStorage';

const STORAGE_KEY = 'jakupsil_releases';

interface ReleaseContextType {
  releases: Release[];
  getByProject: (projectId: string) => Release[];
  rollback: (releaseId: string) => void;
}

const ReleaseContext = createContext<ReleaseContextType | null>(null);

export function ReleaseProvider({ children }: { children: ReactNode }) {
  const [releases, setReleases] = usePersistedState(STORAGE_KEY, MOCK_RELEASES);

  const getByProject = (projectId: string) =>
    releases
      .filter((r) => r.projectId === projectId)
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

  const rollback = (releaseId: string) => {
    setReleases((prev) => {
      const target = prev.find((r) => r.id === releaseId);
      if (!target) return prev;

      return prev.map((r) => {
        if (r.projectId !== target.projectId) return r;
        if (new Date(r.date).getTime() > new Date(target.date).getTime()) {
          return { ...r, status: 'rolledback' as const };
        }
        return { ...r, status: 'active' as const };
      });
    });
  };

  return (
    <ReleaseContext.Provider value={{ releases, getByProject, rollback }}>
      {children}
    </ReleaseContext.Provider>
  );
}

export function useReleases() {
  const ctx = useContext(ReleaseContext);
  if (!ctx) throw new Error('useReleases must be used within ReleaseProvider');
  return ctx;
}
