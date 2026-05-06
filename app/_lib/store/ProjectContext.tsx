'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Project } from '../types';
import { MOCK_PROJECTS } from '../mock/data';
import { usePersistedState } from '../utils/localStorage';
import { generateId } from '../utils/generateId';

const STORAGE_KEY = 'jakupsil_projects';

interface ProjectContextType {
  projects: Project[];
  addProject: (data: Pick<Project, 'name' | 'description'>) => Project;
  updateProject: (id: string, data: Partial<Pick<Project, 'name' | 'description'>>) => void;
  deleteProject: (id: string) => void;
  getProject: (id: string) => Project | undefined;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = usePersistedState(STORAGE_KEY, MOCK_PROJECTS);

  const addProject = (data: Pick<Project, 'name' | 'description'>): Project => {
    const now = new Date().toISOString();
    const project: Project = {
      id: generateId(),
      name: data.name,
      description: data.description,
      createdAt: now,
      updatedAt: now,
    };
    setProjects((prev) => [...prev, project]);
    return project;
  };

  const updateProject = (id: string, data: Partial<Pick<Project, 'name' | 'description'>>) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
      )
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const getProject = (id: string) => projects.find((p) => p.id === id);

  return (
    <ProjectContext.Provider
      value={{ projects, addProject, updateProject, deleteProject, getProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProjects must be used within ProjectProvider');
  return ctx;
}
