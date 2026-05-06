'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useCommits } from '@/app/_lib/store/CommitContext';
import { useProjects } from '@/app/_lib/store/ProjectContext';
import { PageContainer } from '@/app/_components/layout/PageContainer';
import { Card } from '@/app/_components/ui/Card';
import { Badge } from '@/app/_components/ui/Badge';
import { EmptyState } from '@/app/_components/ui/EmptyState';
import { formatDateTime } from '@/app/_lib/utils/formatDate';

export default function CommitsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { getProject } = useProjects();
  const { getByProject } = useCommits();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const project = getProject(projectId);
  const commits = getByProject(projectId, 'develop');

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
        <h1 className="text-3xl font-bold text-primary-800">변경 이력</h1>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="info">develop</Badge>
          <span className="text-sm text-primary-400">
            {commits.length}개 커밋
          </span>
        </div>
      </div>

      {commits.length === 0 ? (
        <EmptyState
          title="커밋이 없습니다"
          description="develop 브랜치에 커밋이 없습니다"
        />
      ) : (
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />
          <div className="flex flex-col gap-1">
            {commits.map((commit) => (
              <div key={commit.id} className="relative pl-10">
                <div className="absolute left-[11px] top-5 w-2.5 h-2.5 rounded-full bg-foreground border-2 border-background" />
                <Card
                  hoverable
                  className="cursor-pointer"
                  onClick={() =>
                    setExpandedId(
                      expandedId === commit.id ? null : commit.id
                    )
                  }
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-xs text-accent-500 font-mono">
                          {commit.id}
                        </code>
                        <span className="text-sm font-medium text-primary-800 truncate">
                          {commit.title}
                        </span>
                      </div>
                      <p className="text-xs text-primary-400">
                        {commit.author} | {formatDateTime(commit.date)}
                      </p>
                    </div>
                    <svg
                      className={`w-4 h-4 text-primary-400 transition-transform duration-200 shrink-0 mt-1 ${
                        expandedId === commit.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                  {expandedId === commit.id && (
                    <pre className="mt-3 pt-3 border-t border-gray-200 text-xs text-primary-500 font-mono whitespace-pre-wrap">
                      {commit.diff}
                    </pre>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageContainer>
  );
}
