'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTemplates } from '@/app/_lib/store/TemplateContext';
import { PageContainer } from '@/app/_components/layout/PageContainer';
import { Input } from '@/app/_components/ui/Input';
import { TextArea } from '@/app/_components/ui/TextArea';
import { Select } from '@/app/_components/ui/Select';
import { Button } from '@/app/_components/ui/Button';
import type { TemplateType } from '@/app/_lib/types';

const TYPE_OPTIONS = [
  { value: 'document', label: '문서' },
  { value: 'meeting-notes', label: '회의록' },
  { value: 'policy', label: '정책' },
  { value: 'qa', label: 'QA' },
];

const DEFAULT_TEMPLATES: Record<TemplateType, string> = {
  document: `## 1. 개요

프로젝트(또는 문서)의 목적과 배경을 간략히 설명합니다.

## 2. 목적

이 문서를 작성하는 목적을 기술합니다.

## 3. 범위

문서가 다루는 범위와 대상을 정의합니다.

## 4. 상세 내용

### 4.1 주요 기능

- 기능 1: 설명
- 기능 2: 설명

### 4.2 요구사항

- [ ] 요구사항 1
- [ ] 요구사항 2

## 5. 일정

| 단계 | 기간 | 담당자 |
|------|------|--------|
| 기획 |      |        |
| 개발 |      |        |
| QA   |      |        |

## 6. 참고 사항

추가 참고 자료 및 링크를 기재합니다.`,

  'meeting-notes': `## 회의 정보

- 일시: YYYY-MM-DD HH:MM
- 장소:
- 참석자:
- 작성자:

## 안건

1. 안건 1
2. 안건 2

## 논의 내용

### 안건 1

논의된 내용을 기록합니다.

### 안건 2

논의된 내용을 기록합니다.

## 결정 사항

1. 결정 1
2. 결정 2

## 액션 아이템

| 담당자 | 할 일 | 기한 | 상태 |
|--------|-------|------|------|
|        |       |      | 대기 |
|        |       |      | 대기 |

## 다음 회의 일정

- 일시:
- 안건:`,

  policy: `## 정책명

정책의 이름을 기재합니다.

## 목적

이 정책을 수립하는 목적을 설명합니다.

## 적용 범위

정책이 적용되는 대상, 팀, 프로젝트를 정의합니다.

## 규칙

### 1. 규칙 1

규칙에 대한 상세 설명을 기술합니다.

### 2. 규칙 2

규칙에 대한 상세 설명을 기술합니다.

### 3. 규칙 3

규칙에 대한 상세 설명을 기술합니다.

## 예외 사항

정책의 예외가 적용되는 상황을 기술합니다.

## 위반 시 조치

정책 위반 시 처리 절차를 설명합니다.

## 시행일

- 최초 시행일:
- 최근 수정일:`,

  qa: `## 테스트 대상

테스트할 기능 또는 화면을 명시합니다.

## 테스트 환경

- OS:
- 브라우저:
- 디바이스:
- 빌드 버전:

## 전제 조건

테스트를 시작하기 전 필요한 설정이나 상태를 기재합니다.

## 체크리스트

### 기능 테스트

- [ ] 기능이 정상적으로 동작하는가
- [ ] 입력 값 검증이 올바르게 작동하는가
- [ ] 에러 발생 시 적절한 메시지가 표시되는가
- [ ] 성공 시 올바른 결과가 표시되는가

### UI/UX 테스트

- [ ] 디자인이 시안과 일치하는가
- [ ] 반응형 레이아웃이 정상 동작하는가
- [ ] 로딩 상태가 표시되는가

### 접근성 테스트

- [ ] 키보드 네비게이션이 가능한가
- [ ] 스크린 리더 호환이 되는가

## 비고

추가 발견 사항이나 참고 사항을 기재합니다.`,
};

export default function NewTemplatePage() {
  const { projectId } = useParams<{ projectId: string }>();
  const router = useRouter();
  const { addTemplate } = useTemplates();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<TemplateType>('document');
  const [content, setContent] = useState(DEFAULT_TEMPLATES['document']);

  useEffect(() => {
    setContent(DEFAULT_TEMPLATES[type]);
  }, [type]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    addTemplate({ projectId, type, title: title.trim(), content });
    router.push(`/projects/${projectId}`);
  };

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-primary-800 mb-6">새 템플릿</h1>

      <div className="max-w-2xl flex flex-col gap-4">
        <Input
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="템플릿 제목을 입력하세요"
        />
        <Select
          label="유형"
          options={TYPE_OPTIONS}
          value={type}
          onChange={(e) => setType(e.target.value as TemplateType)}
          hint="유형을 변경하면 기본 템플릿이 적용됩니다"
        />
        <TextArea
          label="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="템플릿 내용을 입력하세요"
          className="min-h-[400px]"
        />
        <div className="flex gap-3 mt-2">
          <Button onClick={handleSubmit} disabled={!title.trim()}>
            생성
          </Button>
          <Button variant="secondary" onClick={() => router.back()}>
            취소
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
