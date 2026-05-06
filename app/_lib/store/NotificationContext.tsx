'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Notification, NotificationType } from '../types';
import { MOCK_NOTIFICATIONS } from '../mock/data';
import { usePersistedState } from '../utils/localStorage';
import { generateId } from '../utils/generateId';

const STORAGE_KEY = 'jakupsil_notifications';

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (data: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = usePersistedState(STORAGE_KEY, MOCK_NOTIFICATIONS);

  const addNotification = (
    data: Omit<Notification, 'id' | 'read' | 'createdAt'>
  ) => {
    const notification: Notification = {
      id: generateId(),
      ...data,
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [notification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAsRead, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      'useNotifications must be used within NotificationProvider'
    );
  return ctx;
}
