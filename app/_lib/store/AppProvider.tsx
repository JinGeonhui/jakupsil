'use client';

import type { ReactNode } from 'react';
import { resetStorageIfVersionChanged } from '../utils/localStorage';
import { ProjectProvider } from './ProjectContext';
import { TemplateProvider } from './TemplateContext';
import { CommitProvider } from './CommitContext';
import { QaProvider } from './QaContext';
import { DeployProvider } from './DeployContext';
import { ReleaseProvider } from './ReleaseContext';
import { NotificationProvider } from './NotificationContext';
import { FileProvider } from './FileContext';
import { ThemeProvider } from './ThemeContext';

// 모듈 로드 시 실행 — 모든 Provider 마운트 전에 stale 데이터를 제거
resetStorageIfVersionChanged();

export function AppProvider({ children }: { children: ReactNode }) {

  return (
    <ThemeProvider>
      <ProjectProvider>
        <TemplateProvider>
          <CommitProvider>
            <QaProvider>
              <DeployProvider>
                <ReleaseProvider>
                  <NotificationProvider>
                    <FileProvider>{children}</FileProvider>
                  </NotificationProvider>
                </ReleaseProvider>
              </DeployProvider>
            </QaProvider>
          </CommitProvider>
        </TemplateProvider>
      </ProjectProvider>
    </ThemeProvider>
  );
}
