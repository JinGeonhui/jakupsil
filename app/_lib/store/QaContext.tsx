'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { QaSession } from '../types';
import { MOCK_QA_SESSIONS } from '../mock/data';
import { usePersistedState } from '../utils/localStorage';
import { generateId } from '../utils/generateId';

const STORAGE_KEY = 'jakupsil_qa_sessions';

interface QaContextType {
  sessions: QaSession[];
  getByProject: (projectId: string) => QaSession[];
  getSession: (id: string) => QaSession | undefined;
  addSession: (data: Pick<QaSession, 'projectId' | 'templateId' | 'title' | 'checkItems'>) => QaSession;
  toggleCheckItem: (sessionId: string, itemId: string) => void;
  updateStatus: (sessionId: string, status: QaSession['status']) => void;
}

const QaContext = createContext<QaContextType | null>(null);

export function QaProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = usePersistedState(STORAGE_KEY, MOCK_QA_SESSIONS);

  const getByProject = (projectId: string) =>
    sessions.filter((s) => s.projectId === projectId);

  const getSession = (id: string) => sessions.find((s) => s.id === id);

  const addSession = (
    data: Pick<QaSession, 'projectId' | 'templateId' | 'title' | 'checkItems'>
  ): QaSession => {
    const now = new Date().toISOString();
    const session: QaSession = {
      id: generateId(),
      ...data,
      status: 'in-progress',
      createdAt: now,
      updatedAt: now,
    };
    setSessions((prev) => [...prev, session]);
    return session;
  };

  const toggleCheckItem = (sessionId: string, itemId: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== sessionId) return s;
        const updatedItems = s.checkItems.map((item) =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        );
        const allChecked = updatedItems.every((item) => item.checked);
        return {
          ...s,
          checkItems: updatedItems,
          status: allChecked ? 'completed' as const : 'in-progress' as const,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const updateStatus = (sessionId: string, status: QaSession['status']) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? { ...s, status, updatedAt: new Date().toISOString() }
          : s
      )
    );
  };

  return (
    <QaContext.Provider
      value={{ sessions, getByProject, getSession, addSession, toggleCheckItem, updateStatus }}
    >
      {children}
    </QaContext.Provider>
  );
}

export function useQa() {
  const ctx = useContext(QaContext);
  if (!ctx) throw new Error('useQa must be used within QaProvider');
  return ctx;
}
