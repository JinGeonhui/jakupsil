'use client';

import { useParams } from 'next/navigation';
import { useQa } from '@/app/_lib/store/QaContext';
import { useProjects } from '@/app/_lib/store/ProjectContext';
import { PageContainer } from '@/app/_components/layout/PageContainer';
import { Card } from '@/app/_components/ui/Card';
import { Badge } from '@/app/_components/ui/Badge';
import { EmptyState } from '@/app/_components/ui/EmptyState';
import { formatDate } from '@/app/_lib/utils/formatDate';
import Link from 'next/link';

const STATUS_MAP: Record<string, { label: string; variant: 'default' | 'info' | 'success' | 'warning' }> = {
  'in-progress': { label: '진행 중', variant: 'warning' },
  completed: { label: '완료', variant: 'success' },
  'merge-requested': { label: '머지 요청됨', variant: 'info' },
};

export default function QaListPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { getProject } = useProjects();
  const { getByProject } = useQa();

  const project = getProject(projectId);
  const sessions = getByProject(projectId);

  if (!project) {
    return (
      <PageContainer>
        <EmptyState title="프로젝트를 찾을 수 없습니다" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary-800">QA 확인</h1>
        <p className="text-sm text-primary-400 mt-1">
          QA 템플릿 기반 테스트 체크리스트
        </p>
      </div>

      {sessions.length === 0 ? (
        <EmptyState
          title="QA 세션이 없습니다"
          description="QA 템플릿을 기반으로 세션을 생성하세요"
        />
      ) : (
        <div className="flex flex-col gap-3">
          {sessions.map((session) => {
            const checked = session.checkItems.filter((i) => i.checked).length;
            const total = session.checkItems.length;
            const percent = total > 0 ? Math.round((checked / total) * 100) : 0;
            const status = STATUS_MAP[session.status];

            return (
              <Link key={session.id} href={`/projects/${projectId}/qa/${session.id}`}>
                <Card hoverable>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-primary-800">
                      {session.title}
                    </h3>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-900 rounded-full transition-all duration-200"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="text-xs text-primary-400 shrink-0">
                      {checked}/{total} ({percent}%)
                    </span>
                  </div>
                  <p className="text-xs text-primary-300 mt-2">
                    수정일 {formatDate(session.updatedAt)}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}
