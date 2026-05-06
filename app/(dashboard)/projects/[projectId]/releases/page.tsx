'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useReleases } from '@/app/_lib/store/ReleaseContext';
import { useProjects } from '@/app/_lib/store/ProjectContext';
import { useNotifications } from '@/app/_lib/store/NotificationContext';
import { PageContainer } from '@/app/_components/layout/PageContainer';
import { Card } from '@/app/_components/ui/Card';
import { Badge } from '@/app/_components/ui/Badge';
import { Button } from '@/app/_components/ui/Button';
import { EmptyState } from '@/app/_components/ui/EmptyState';
import { ConfirmDialog } from '@/app/_components/ui/ConfirmDialog';
import { Toast } from '@/app/_components/ui/Toast';
import { formatDateTime } from '@/app/_lib/utils/formatDate';
import type { Release } from '@/app/_lib/types';

export default function ReleasesPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { getProject } = useProjects();
  const { getByProject, rollback } = useReleases();
  const { addNotification } = useNotifications();

  const [rollbackTarget, setRollbackTarget] = useState<Release | null>(null);
  const [showToast, setShowToast] = useState(false);

  const project = getProject(projectId);
  const releases = getByProject(projectId);

  if (!project) {
    return (
      <PageContainer>
        <EmptyState title="프로젝트를 찾을 수 없습니다" />
      </PageContainer>
    );
  }

  const handleRollback = () => {
    if (!rollbackTarget) return;
    rollback(rollbackTarget.id);

    addNotification({
      type: 'release-created',
      title: '릴리스 롤백',
      message: `${project.name}이 ${rollbackTarget.version}으로 롤백되었습니다.`,
      projectId,
      linkTo: `/projects/${projectId}/releases`,
    });

    setRollbackTarget(null);
    setShowToast(true);
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary-800">릴리스 이력</h1>
        <p className="text-sm text-primary-400 mt-1">
          main 브랜치에 합병된 릴리스 버전
        </p>
      </div>

      {releases.length === 0 ? (
        <EmptyState
          title="릴리스가 없습니다"
          description="main 브랜치에 합병된 릴리스가 없습니다"
        />
      ) : (
        <div className="flex flex-col gap-4">
          {releases.map((release, idx) => (
            <Card
              key={release.id}
              hoverable
              onClick={() => setRollbackTarget(release)}
              className={
                release.status === 'rolledback' ? 'opacity-50' : ''
              }
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-primary-900">
                      {release.version}
                    </span>
                    <span className="text-sm text-primary-600">
                      {release.title}
                    </span>
                    {release.status === 'active' && idx === 0 && (
                      <Badge variant="success">현재</Badge>
                    )}
                    {release.status === 'rolledback' && (
                      <Badge variant="danger">롤백됨</Badge>
                    )}
                    {release.status === 'active' && idx !== 0 && (
                      <Badge>이전</Badge>
                    )}
                  </div>
                  <p className="text-sm text-primary-500 mb-2">
                    {release.description}
                  </p>
                  <p className="text-xs text-primary-400">
                    {release.author} | {formatDateTime(release.date)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!rollbackTarget}
        onClose={() => setRollbackTarget(null)}
        onConfirm={handleRollback}
        title="선택하신 히스토리로 롤백을 진행하시겠습니까?"
        description={
          rollbackTarget
            ? `${rollbackTarget.version} — ${rollbackTarget.title} (${formatDateTime(rollbackTarget.date)})`
            : ''
        }
        confirmLabel="롤백"
        cancelLabel="취소"
        variant="danger"
      />

      <Toast
        message="롤백이 완료되었습니다"
        open={showToast}
        onClose={() => setShowToast(false)}
      />
    </PageContainer>
  );
}
