'use client';

import { useState, useEffect } from 'react';

export function getStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorageItem(key: string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(key);
}

const APP_VERSION = 3;
const VERSION_KEY = 'jakupsil_version';

/** mock 데이터 변경 시 APP_VERSION을 올리면 기존 localStorage를 리셋한다. */
export function resetStorageIfVersionChanged(): void {
  if (typeof window === 'undefined') return;
  const stored = window.localStorage.getItem(VERSION_KEY);
  if (stored !== String(APP_VERSION)) {
    const keysToRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key?.startsWith('jakupsil_') && key !== VERSION_KEY) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => window.localStorage.removeItem(k));
    window.localStorage.setItem(VERSION_KEY, String(APP_VERSION));
  }
}

/**
 * SSR-safe persisted state hook.
 * Always initializes with `fallback` (matching server render),
 * then hydrates from localStorage after mount.
 */
export function usePersistedState<T>(key: string, fallback: T) {
  const [state, setState] = useState<T>(fallback);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(getStorageItem(key, fallback));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hydrated) {
      setStorageItem(key, state);
    }
  }, [key, state, hydrated]);

  return [state, setState] as const;
}
