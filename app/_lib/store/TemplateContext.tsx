'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Template, TemplateType } from '../types';
import { MOCK_TEMPLATES } from '../mock/data';
import { usePersistedState } from '../utils/localStorage';
import { generateId } from '../utils/generateId';

const STORAGE_KEY = 'jakupsil_templates';

interface TemplateContextType {
  templates: Template[];
  getByProject: (projectId: string) => Template[];
  getTemplate: (id: string) => Template | undefined;
  addTemplate: (data: Pick<Template, 'projectId' | 'type' | 'title' | 'content'>) => Template;
  updateTemplate: (id: string, data: Partial<Pick<Template, 'title' | 'content' | 'type'>>) => void;
  deleteTemplate: (id: string) => void;
}

const TemplateContext = createContext<TemplateContextType | null>(null);

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [templates, setTemplates] = usePersistedState(STORAGE_KEY, MOCK_TEMPLATES);

  const getByProject = (projectId: string) =>
    templates.filter((t) => t.projectId === projectId);

  const getTemplate = (id: string) => templates.find((t) => t.id === id);

  const addTemplate = (
    data: Pick<Template, 'projectId' | 'type' | 'title' | 'content'>
  ): Template => {
    const now = new Date().toISOString();
    const template: Template = {
      id: generateId(),
      ...data,
      createdAt: now,
      updatedAt: now,
    };
    setTemplates((prev) => [...prev, template]);
    return template;
  };

  const updateTemplate = (
    id: string,
    data: Partial<Pick<Template, 'title' | 'content' | 'type'>>
  ) => {
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t
      )
    );
  };

  const deleteTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TemplateContext.Provider
      value={{ templates, getByProject, getTemplate, addTemplate, updateTemplate, deleteTemplate }}
    >
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplates() {
  const ctx = useContext(TemplateContext);
  if (!ctx) throw new Error('useTemplates must be used within TemplateProvider');
  return ctx;
}
