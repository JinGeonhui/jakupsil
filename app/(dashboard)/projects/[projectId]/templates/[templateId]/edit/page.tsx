'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTemplates } from '@/app/_lib/store/TemplateContext';
import { PageContainer } from '@/app/_components/layout/PageContainer';
import { Input } from '@/app/_components/ui/Input';
import { TextArea } from '@/app/_components/ui/TextArea';
import { Select } from '@/app/_components/ui/Select';
import { Button } from '@/app/_components/ui/Button';
import { EmptyState } from '@/app/_components/ui/EmptyState';
import { Toast } from '@/app/_components/ui/Toast';
import type { TemplateType } from '@/app/_lib/types';

const TYPE_OPTIONS = [
  { value: 'document', label: '문서' },
  { value: 'meeting-notes', label: '회의록' },
  { value: 'policy', label: '정책' },
  { value: 'qa', label: 'QA' },
];

export default function EditTemplatePage() {
  const { projectId, templateId } = useParams<{
    projectId: string;
    templateId: string;
  }>();
  const router = useRouter();
  const { getTemplate, updateTemplate } = useTemplates();

  const template = getTemplate(templateId);

  const [title, setTitle] = useState('');
  const [type, setType] = useState<TemplateType>('document');
  const [content, setContent] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (template) {
      setTitle(template.title);
      setType(template.type);
      setContent(template.content);
    }
  }, [template]);

  if (!template) {
    return (
      <PageContainer>
        <EmptyState title="템플릿을 찾을 수 없습니다" />
      </PageContainer>
    );
  }

  const handleSave = () => {
    updateTemplate(templateId, {
      title: title.trim(),
      type,
      content,
    });
    setShowToast(true);
  };

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-primary-800 mb-6">템플릿 수정</h1>

      <div className="max-w-2xl flex flex-col gap-4">
        <Input
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Select
          label="유형"
          options={TYPE_OPTIONS}
          value={type}
          onChange={(e) => setType(e.target.value as TemplateType)}
        />
        <TextArea
          label="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[300px]"
        />
        <div className="flex gap-3 mt-2">
          <Button onClick={handleSave} disabled={!title.trim()}>
            저장
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              router.push(`/projects/${projectId}/templates/${templateId}`)
            }
          >
            돌아가기
          </Button>
        </div>
      </div>

      <Toast
        message="저장되었습니다"
        open={showToast}
        onClose={() => setShowToast(false)}
      />
    </PageContainer>
  );
}
