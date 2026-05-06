'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { DeployRequest, ApprovalStatus } from '../types';
import { MOCK_DEPLOY_REQUESTS } from '../mock/data';
import { usePersistedState } from '../utils/localStorage';
import { generateId } from '../utils/generateId';

const STORAGE_KEY = 'jakupsil_deploy_requests';

interface DeployContextType {
  requests: DeployRequest[];
  getByProject: (projectId: string) => DeployRequest[];
  addRequest: (data: Pick<DeployRequest, 'projectId' | 'qaSessionId' | 'requestedBy' | 'assignedTo'>) => DeployRequest;
  updateStatus: (id: string, status: ApprovalStatus, rejectionReason?: string) => void;
}

const DeployContext = createContext<DeployContextType | null>(null);

export function DeployProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = usePersistedState(STORAGE_KEY, MOCK_DEPLOY_REQUESTS);

  const getByProject = (projectId: string) =>
    requests.filter((r) => r.projectId === projectId);

  const addRequest = (
    data: Pick<DeployRequest, 'projectId' | 'qaSessionId' | 'requestedBy' | 'assignedTo'>
  ): DeployRequest => {
    const request: DeployRequest = {
      id: generateId(),
      ...data,
      status: 'pending',
      requestedAt: new Date().toISOString(),
    };
    setRequests((prev) => [...prev, request]);
    return request;
  };

  const updateStatus = (
    id: string,
    status: ApprovalStatus,
    rejectionReason?: string
  ) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status,
              rejectionReason: status === 'rejected' ? rejectionReason : undefined,
              resolvedAt: new Date().toISOString(),
            }
          : r
      )
    );
  };

  return (
    <DeployContext.Provider
      value={{ requests, getByProject, addRequest, updateStatus }}
    >
      {children}
    </DeployContext.Provider>
  );
}

export function useDeploy() {
  const ctx = useContext(DeployContext);
  if (!ctx) throw new Error('useDeploy must be used within DeployProvider');
  return ctx;
}
