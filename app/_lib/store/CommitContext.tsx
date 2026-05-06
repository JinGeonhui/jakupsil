'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Commit } from '../types';
import { MOCK_COMMITS } from '../mock/data';
import { usePersistedState } from '../utils/localStorage';

const STORAGE_KEY = 'jakupsil_commits';

interface CommitContextType {
  commits: Commit[];
  getByProject: (projectId: string, branch?: 'develop' | 'main') => Commit[];
}

const CommitContext = createContext<CommitContextType | null>(null);

export function CommitProvider({ children }: { children: ReactNode }) {
  const [commits] = usePersistedState(STORAGE_KEY, MOCK_COMMITS);

  const getByProject = (projectId: string, branch?: 'develop' | 'main') => {
    return commits
      .filter(
        (c) =>
          c.projectId === projectId && (branch ? c.branch === branch : true)
      )
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  };

  return (
    <CommitContext.Provider value={{ commits, getByProject }}>
      {children}
    </CommitContext.Provider>
  );
}

export function useCommits() {
  const ctx = useContext(CommitContext);
  if (!ctx) throw new Error('useCommits must be used within CommitProvider');
  return ctx;
}
