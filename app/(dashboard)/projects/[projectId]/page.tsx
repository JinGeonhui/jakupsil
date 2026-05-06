'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useProjects } from '@/app/_lib/store/ProjectContext';
import { useTemplates } from '@/app/_lib/store/TemplateContext';
import { PageContainer } from '@/app/_components/layout/PageContainer';
import { Card } from '@/app/_components/ui/Card';
import { Badge } from '@/app/_components/ui/Badge';
import { Button } from '@/app/_components/ui/Button';
import { Chip } from '@/app/_components/ui/Chip';
import { EmptyState } from '@/app/_components/ui/EmptyState';
import { ConfirmDialog } from '@/app/_components/ui/ConfirmDialog';
import { formatDate } from '@/app/_lib/utils/formatDate';
import type { TemplateType } from '@/app/_lib/types';
import Link from 'next/link';

const TYPE_LABELS: Record<TemplateType, string> = {
  document: '문서',
  'meeting-notes': '회의록',
  policy: '정책',
  qa: 'QA',
};

export default function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { getProject } = useProjects();
  const { getByProject, deleteTemplate } = useTemplates();
  const [filter, setFilter] = useState<TemplateType | 'all'>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const project = getProject(projectId);
  const templates = getByProject(projectId);
  const filtered =
    filter === 'all' ? templates : templates.filter((t) => t.type === filter);

  if (!project) {
    return (
      <PageContainer>
        <EmptyState title="프로젝트를 찾을 수 없습니다" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-800">{project.name}</h1>
        <p className="text-sm text-primary-500 mt-1">{project.description}</p>
      </div>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          <Chip selected={filter === 'all'} onClick={() => setFilter('all')}>
            전체
          </Chip>
          {(
            Object.entries(TYPE_LABELS) as [TemplateType, string][]
          ).map(([key, label]) => (
            <Chip
              key={key}
              selected={filter === key}
              onClick={() => setFilter(key)}
            >
              {label}
            </Chip>
          ))}
        </div>
        <Link href={`/projects/${projectId}/templates/new`}>
          <Button size="sm">+ 새 템플릿</Button>
        </Link>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="템플릿이 없습니다"
          description="새 템플릿을 생성하여 시작하세요"
        />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((template) => (
            <Card key={template.id} className="flex items-center justify-between">
              <Link
                href={`/projects/${projectId}/templates/${template.id}`}
                className="flex-1 min-w-0"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Badge>{TYPE_LABELS[template.type]}</Badge>
                  <span className="font-medium text-primary-800 truncate">
                    {template.title}
                  </span>
                </div>
                <p className="text-xs text-primary-400">
                  수정일 {formatDate(template.updatedAt)}
                </p>
              </Link>
              <div className="flex gap-2 shrink-0 ml-4">
                <Link href={`/projects/${projectId}/templates/${template.id}/edit`}>
                  <Button variant="ghost" size="sm">
                    수정
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteId(template.id)}
                >
                  삭제
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteTemplate(deleteId);
          setDeleteId(null);
        }}
        title="템플릿 삭제"
        description="이 템플릿을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmLabel="삭제"
        variant="danger"
      />
    </PageContainer>
  );
}
