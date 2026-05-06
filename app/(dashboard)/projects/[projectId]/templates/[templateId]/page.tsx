'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTemplates } from '@/app/_lib/store/TemplateContext';
import { PageContainer } from '@/app/_components/layout/PageContainer';
import { Badge } from '@/app/_components/ui/Badge';
import { Button } from '@/app/_components/ui/Button';
import { EmptyState } from '@/app/_components/ui/EmptyState';
import { MarkdownRenderer } from '@/app/_components/ui/MarkdownRenderer';
import { QaChecklistView } from '@/app/_components/qa/QaChecklistView';
import { formatDateTime } from '@/app/_lib/utils/formatDate';
import type { TemplateType } from '@/app/_lib/types';
import Link from 'next/link';

const TYPE_LABELS: Record<TemplateType, string> = {
  document: '문서',
  'meeting-notes': '회의록',
  policy: '정책',
  qa: 'QA',
};

export default function ViewTemplatePage() {
  const { projectId, templateId } = useParams<{
    projectId: string;
    templateId: string;
  }>();
  const router = useRouter();
  const { getTemplate } = useTemplates();

  const template = getTemplate(templateId);

  if (!template) {
    return (
      <PageContainer>
        <EmptyState title="템플릿을 찾을 수 없습니다" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge>{TYPE_LABELS[template.type]}</Badge>
            <h1 className="text-3xl font-bold text-primary-800">
              {template.title}
            </h1>
          </div>
          <p className="text-sm text-primary-400 mt-1">
            수정일 {formatDateTime(template.updatedAt)}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/projects/${projectId}/templates/${templateId}/edit`}>
            <Button size="sm">수정</Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/projects/${projectId}`)}
          >
            돌아가기
          </Button>
        </div>
      </div>

      <div className="max-w-2xl">
        <div className="bg-background border border-gray-200 rounded-md p-6 shadow-1">
          {template.type === 'qa' ? (
            <QaChecklistView
              templateId={template.id}
              projectId={projectId}
              templateContent={template.content}
              templateTitle={template.title}
            />
          ) : (
            <MarkdownRenderer content={template.content} />
          )}
        </div>
      </div>
    </PageContainer>
  );
}
