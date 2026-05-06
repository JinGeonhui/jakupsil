# 작업실 디자인 시스템

> KRDS(한국 정부 디자인 시스템)와 신한은행 SOLID 디자인 시스템을 참고하여 구축한 앱 전용 디자인 시스템.
> 모노크롬 중심 + 블루 포인트 컨셉. 모든 UI 개발 시 이 문서를 반드시 참조할 것.

---

## 1. 디자인 원칙

| 원칙 | 설명 |
|------|------|
| **일관성** | 동일한 토큰과 컴포넌트를 반복 사용하여 통일된 경험 제공 |
| **접근성** | WCAG AA 기준 준수, 명암비 4.5:1(일반 텍스트), 3:1(큰 텍스트) |
| **간결함** | 불필요한 장식을 배제하고 콘텐츠에 집중 |
| **효율성** | 디자인 토큰 기반으로 빠른 개발과 유지보수 |

---

## 2. 색상 시스템 (Color)

### 2.1 디자인 토큰 구조

3단계 토큰 체계를 따른다:
- **Primitive**: 원시 색상값 (`primary-900: #000000`)
- **Semantic**: 의미 기반 (`color-text-heading: primary-800`)
- **Component**: 컴포넌트 전용 (`button-primary-bg: primary-900`)

### 2.2 Primary (Black/Neutral) — 주요 색상

검은색/흰색 기반의 모노크롬 팔레트. 텍스트, 버튼, 아이콘 등 핵심 UI에 사용.

| 토큰 | HEX | 용도 |
|------|-----|------|
| `primary-50` | `#F5F5F5` | 구분 배경, hover 배경 |
| `primary-100` | `#E5E5E5` | 비활성 배경, 구분선 |
| `primary-200` | `#D4D4D4` | 테두리, 구분선 |
| `primary-300` | `#A3A3A3` | 비활성 텍스트, placeholder |
| `primary-400` | `#737373` | 보조 텍스트, 캡션 |
| `primary-500` | `#525252` | 본문 텍스트 (보조) |
| `primary-600` | `#404040` | 본문 텍스트 |
| `primary-700` | `#262626` | 강조 텍스트 |
| `primary-800` | `#171717` | 헤딩 |
| `primary-900` | `#000000` | 최강조, 주요 버튼 배경 |

### 2.3 Accent (Blue) — 보조 강조

링크, CTA, 인터랙션 포인트에만 절제적으로 사용.

| 토큰 | HEX | 용도 |
|------|-----|------|
| `accent-50` | `#E8F1FD` | accent 배경 (hover 등) |
| `accent-100` | `#C5DBFA` | 선택된 항목 배경 |
| `accent-200` | `#9DC2F7` | — |
| `accent-300` | `#6BA3F0` | — |
| `accent-400` | `#3B84E8` | — |
| `accent-500` | `#0461D0` | 링크, CTA, 포커스 링 |
| `accent-600` | `#0352B0` | 링크 hover |
| `accent-700` | `#024190` | — |
| `accent-800` | `#013170` | — |
| `accent-900` | `#002050` | — |

### 2.4 Gray — UI 전용

카드, 입력 필드 등 UI 요소의 배경과 테두리에 사용.

| 토큰 | HEX | 용도 |
|------|-----|------|
| `gray-50` | `#FAFAFA` | 페이지 배경 (대체) |
| `gray-100` | `#F5F5F5` | 카드 배경, 입력 필드 배경 |
| `gray-200` | `#EEEEEE` | 구분선, 테두리 |
| `gray-300` | `#E0E0E0` | 비활성 테두리 |
| `gray-400` | `#BDBDBD` | 아이콘 (비활성) |
| `gray-500` | `#9E9E9E` | placeholder |
| `gray-600` | `#757575` | 보조 정보 |
| `gray-700` | `#616161` | — |
| `gray-800` | `#424242` | — |
| `gray-900` | `#212121` | — |

### 2.5 System — 상태 표시

| 토큰 | HEX | 용도 |
|------|-----|------|
| `danger-50` | `#FEF2F2` | 에러 배경 |
| `danger-500` | `#EF4444` | 에러 아이콘, 테두리 |
| `danger-600` | `#DC2626` | 에러 텍스트, 버튼 |
| `warning-50` | `#FFFBEB` | 경고 배경 |
| `warning-500` | `#F59E0B` | 경고 아이콘, 테두리 |
| `warning-600` | `#D97706` | 경고 텍스트 |
| `success-50` | `#F0FDF4` | 성공 배경 |
| `success-500` | `#22C55E` | 성공 아이콘, 테두리 |
| `success-600` | `#16A34A` | 성공 텍스트 |
| `info-50` | `#EFF6FF` | 정보 배경 |
| `info-500` | `#3B82F6` | 정보 아이콘, 테두리 |
| `info-600` | `#2563EB` | 정보 텍스트 |

### 2.6 배경색

| 토큰 | HEX | 용도 |
|------|-----|------|
| `background` | `#FFFFFF` | 기본 배경 |
| `background-secondary` | `#F5F5F5` | 구분 영역 배경 |
| `background-elevated` | `#FFFFFF` | 카드/모달 배경 (그림자와 함께) |

### 2.7 색상 사용 규칙

- **60/30/10 비율**: 배경(white) 60%, 보조(gray/primary) 30%, 강조(accent/system) 10%
- **accent 색상은 절제적으로**: 링크, CTA 버튼, 포커스 링, 선택 상태에만 사용
- **텍스트에 accent를 남용하지 않음**: 텍스트 강조는 `font-weight`로 처리

---

## 3. 타이포그래피 (Typography)

### 3.1 폰트 패밀리

| 용도 | 폰트 |
|------|------|
| 본문 (sans) | `Pretendard`, system-ui, sans-serif |
| 코드 (mono) | `Geist Mono`, monospace |

### 3.2 타입 스케일

8pt 그리드 기준. `line-height`는 최소 150%.

| 토큰 | 크기 | 행간 | 굵기 | 용도 |
|------|------|------|------|------|
| `display-1` | 48px (3rem) | 56px | 700 | 히어로 타이틀 |
| `display-2` | 36px (2.25rem) | 44px | 700 | 섹션 대제목 |
| `heading-1` | 30px (1.875rem) | 40px | 700 | 페이지 제목 |
| `heading-2` | 24px (1.5rem) | 32px | 700 | 섹션 제목 |
| `heading-3` | 20px (1.25rem) | 28px | 600 | 서브 제목 |
| `heading-4` | 18px (1.125rem) | 26px | 600 | 소제목 |
| `body-1` | 16px (1rem) | 24px | 400 | 기본 본문 |
| `body-2` | 14px (0.875rem) | 20px | 400 | 보조 본문 |
| `caption` | 12px (0.75rem) | 16px | 400 | 캡션, 힌트 |
| `label` | 14px (0.875rem) | 20px | 500 | 라벨, 버튼 텍스트 |

### 3.3 반응형 타이포그래피

- **Mobile (< 768px)**: display-1 → 36px, display-2 → 28px, heading-1 → 24px
- **Desktop (≥ 768px)**: 기본값 사용

---

## 4. 간격 시스템 (Spacing)

8-point grid 기반. 모든 margin, padding, gap에 이 값만 사용.

| 토큰 | 값 | 용도 |
|------|-----|------|
| `space-0` | 0px | 없음 |
| `space-1` | 4px | 아이콘-텍스트 간격 |
| `space-2` | 8px | 인라인 요소 간격 |
| `space-3` | 12px | 관련 요소 간격 |
| `space-4` | 16px | 컴포넌트 내부 패딩 |
| `space-5` | 20px | 컴포넌트 간 간격 |
| `space-6` | 24px | 섹션 내부 간격 |
| `space-7` | 32px | 섹션 간 간격 |
| `space-8` | 40px | 큰 섹션 간격 |
| `space-9` | 48px | 페이지 섹션 간격 |
| `space-10` | 64px | 페이지 상단/하단 여백 |

---

## 5. Border Radius

| 토큰 | 값 | 용도 |
|------|-----|------|
| `radius-xs` | 2px | 뱃지, 태그 |
| `radius-sm` | 4px | 입력 필드, 칩 |
| `radius-md` | 6px | 카드, 버튼 |
| `radius-lg` | 10px | 모달, 바텀시트 |
| `radius-xl` | 12px | 대형 카드 |
| `radius-full` | 9999px | 원형 (아바타, 토글) |

---

## 6. Elevation (그림자)

| 토큰 | box-shadow | 용도 |
|------|------------|------|
| `shadow-1` | `0 1px 2px rgba(0,0,0,0.06)` | 카드, 입력 필드 |
| `shadow-2` | `0 2px 8px rgba(0,0,0,0.08)` | 드롭다운, 팝오버 |
| `shadow-3` | `0 4px 16px rgba(0,0,0,0.12)` | 모달, 다이얼로그 |
| `shadow-4` | `0 8px 32px rgba(0,0,0,0.16)` | 바텀시트, 오버레이 |
| `shadow-dimmed` | `inset 0 0 0 9999px rgba(0,0,0,0.4)` | 딤드 배경 |

---

## 7. 브레이크포인트 (Breakpoints)

KRDS 기반 반응형 구간.

| 토큰 | 값 | 용도 |
|------|-----|------|
| `sm` | 360px | 모바일 |
| `md` | 768px | 태블릿 |
| `lg` | 1024px | 데스크탑 |
| `xl` | 1280px | 대형 데스크탑 |
| `2xl` | 1440px | 와이드 스크린 |

- 최대 콘텐츠 너비: **1200px**
- 스크린 마진: Mobile 16px, Desktop 24px

---

## 8. 컴포넌트 스펙

### 8.1 Button

| 속성 | Primary | Secondary | Ghost | Danger |
|------|---------|-----------|-------|--------|
| 배경 | `primary-900` | transparent | transparent | `danger-600` |
| 텍스트 | `#FFFFFF` | `primary-900` | `primary-700` | `#FFFFFF` |
| 테두리 | none | `primary-900` 1px | none | none |
| hover 배경 | `primary-800` | `primary-50` | `primary-50` | `danger-500` |
| border-radius | `radius-md` | `radius-md` | `radius-md` | `radius-md` |
| 패딩 | 12px 24px | 12px 24px | 12px 24px | 12px 24px |
| 높이 | 44px (md), 36px (sm), 52px (lg) | 동일 | 동일 | 동일 |
| 폰트 | `label` (14px/500) | 동일 | 동일 | 동일 |
| disabled | opacity 0.4, cursor not-allowed | 동일 | 동일 | 동일 |

### 8.2 Input

| 속성 | 값 |
|------|-----|
| 배경 | `#FFFFFF` |
| 테두리 | `gray-300` 1px |
| 테두리 (focus) | `primary-900` 2px |
| 테두리 (error) | `danger-500` 1px |
| border-radius | `radius-sm` |
| 패딩 | 12px 16px |
| 높이 | 44px |
| placeholder 색상 | `primary-300` |
| 텍스트 색상 | `primary-800` |
| 라벨 | `label` (14px/500), `primary-700` |
| 힌트/에러 텍스트 | `caption` (12px), `primary-400` 또는 `danger-600` |

### 8.3 Card

| 속성 | 값 |
|------|-----|
| 배경 | `#FFFFFF` |
| 테두리 | `gray-200` 1px |
| border-radius | `radius-md` |
| 패딩 | 24px (desktop), 16px (mobile) |
| 그림자 | `shadow-1` |
| hover 그림자 | `shadow-2` (클릭 가능한 경우) |

### 8.4 Badge / Chip

| 속성 | Badge | Chip |
|------|-------|------|
| 배경 | `primary-100` | `gray-100` |
| 텍스트 | `primary-700` | `primary-600` |
| border-radius | `radius-xs` | `radius-full` |
| 패딩 | 2px 8px | 6px 12px |
| 폰트 | `caption` (12px) | `body-2` (14px) |
| 선택 상태 배경 | — | `primary-900` |
| 선택 상태 텍스트 | — | `#FFFFFF` |

### 8.5 Modal / Dialog

| 속성 | 값 |
|------|-----|
| 배경 | `#FFFFFF` |
| border-radius | `radius-lg` |
| 패딩 | 32px (desktop), 24px (mobile) |
| 그림자 | `shadow-3` |
| 딤드 배경 | `rgba(0,0,0,0.4)` |
| 최대 너비 | 480px (sm), 640px (md), 800px (lg) |

### 8.6 Toast / Snackbar

| 속성 | 값 |
|------|-----|
| 배경 | `primary-900` |
| 텍스트 | `#FFFFFF` |
| border-radius | `radius-md` |
| 패딩 | 12px 24px |
| 그림자 | `shadow-2` |
| 위치 | 하단 중앙, 하단에서 24px |

### 8.7 Navigation / Header

| 속성 | 값 |
|------|-----|
| 배경 | `#FFFFFF` |
| 높이 | 56px (mobile), 64px (desktop) |
| 로고/제목 | `primary-900`, `heading-4` |
| 네비 링크 | `primary-600` (기본), `primary-900` (활성) |

- 하단 테두리 사용하지 않음 — 레이아웃과 콘텐츠 배치로 자연스럽게 구분

### 8.8 Sidebar Navigation

| 속성 | 값 |
|------|-----|
| 배경 | `#FFFFFF` |
| 너비 | 240px |

- 우측 테두리 사용하지 않음 — 레이아웃과 콘텐츠 배치로 자연스럽게 구분

#### 프로젝트 항목

| 상태 | 배경 | 텍스트 | 폰트 | border-radius |
|------|------|--------|------|---------------|
| 기본 | transparent | `primary-500` | body-2 (14px/400) | `radius-md` |
| hover | `primary-50` | `primary-700` | body-2 (14px/400) | `radius-md` |
| 활성 | `primary-900` | `#FFFFFF` | label (14px/600) | `radius-md` |

- 좌우 패딩: 12px, 상하 패딩: 8px
- 좌우 마진: 12px (사이드바 가장자리에서 떨어뜨림)
- 활성 상태에서 border 사용하지 않음 — 배경색 반전으로 표현

#### 세부 탭 항목

| 상태 | 배경 | 텍스트 | 아이콘 | 폰트 | border-radius |
|------|------|--------|--------|------|---------------|
| 기본 | transparent | `primary-400` | `primary-300` | body-2 (14px/400) | `radius-md` |
| hover | `primary-50` | `primary-600` | `primary-500` | body-2 (14px/400) | `radius-md` |
| 활성 | `primary-50` | `primary-900` | `primary-900` | label (14px/500) | `radius-md` |

- 아이콘: 16px, outlined 스타일, 텍스트와 gap 8px
- 좌우 패딩: 12px, 상하 패딩: 8px
- 왼쪽 마진: 8px (프로젝트 대비 들여쓰기)
- 항목 간 간격: 2px
- 활성 상태에서 border, shadow 사용하지 않음 — 배경색 채움으로 표현

---

## 9. 접근성 (Accessibility)

### 9.1 명암비 기준 (WCAG AA)

| 대상 | 최소 명암비 |
|------|-------------|
| 일반 텍스트 (< 18px) | 4.5:1 |
| 큰 텍스트 (≥ 18px bold 또는 ≥ 24px) | 3:1 |
| UI 컴포넌트, 그래픽 | 3:1 |

### 9.2 주요 조합 명암비

| 조합 | 명암비 | 등급 |
|------|--------|------|
| primary-900(#000) on white(#FFF) | 21:1 | AAA |
| primary-800(#171717) on white | 18.4:1 | AAA |
| primary-600(#404040) on white | 9.7:1 | AAA |
| primary-400(#737373) on white | 4.6:1 | AA |
| accent-500(#0461D0) on white | 5.2:1 | AA |
| white(#FFF) on primary-900(#000) | 21:1 | AAA |

### 9.3 추가 규칙

- 색상만으로 정보를 전달하지 않고, 아이콘/텍스트를 함께 사용
- 포커스 링: `accent-500` 2px outline, offset 2px
- 터치 타겟 최소 크기: 44px × 44px
- 키보드 네비게이션 지원 필수

---

## 10. 아이콘 (Iconography)

| 속성 | 값 |
|------|-----|
| 크기 | 16px (sm), 20px (md), 24px (lg) |
| 색상 | 텍스트 색상과 동일하게 적용 |
| 스타일 | Outlined (기본), Filled (활성/강조) |
| 간격 | 아이콘-텍스트 사이 `space-1` (4px) |

---

## 11. 모션 / 트랜지션

| 토큰 | 값 | 용도 |
|------|-----|------|
| `duration-fast` | 100ms | hover, focus |
| `duration-normal` | 200ms | 일반 전환 |
| `duration-slow` | 300ms | 모달, 바텀시트 |
| `easing-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | 기본 이징 |
| `easing-in` | `cubic-bezier(0.4, 0, 1, 1)` | 진입 |
| `easing-out` | `cubic-bezier(0, 0, 0.2, 1)` | 퇴장 |

---

## 12. Tailwind CSS 토큰 매핑

`globals.css`의 `@theme inline`에서 정의된 CSS 변수는 Tailwind 클래스로 직접 사용 가능:

```
bg-primary-900    → var(--color-primary-900)
text-primary-600  → var(--color-primary-600)
text-accent-500   → var(--color-accent-500)
rounded-md        → var(--radius-md)
shadow-1          → var(--shadow-1)
p-4               → var(--spacing-4, 16px)
gap-6             → var(--spacing-6, 24px)
```

---

## 부록: 색상 비율 가이드

```
┌─────────────────────────────────────────────┐
│                                             │
│   60% — 배경 (white, gray-50)               │
│                                             │
│   ┌───────────────────────────────────┐     │
│   │                                   │     │
│   │  30% — 텍스트, 테두리             │     │
│   │  (primary-600~900, gray-200~300)  │     │
│   │                                   │     │
│   │  ┌───────────────┐               │     │
│   │  │ 10% — 강조    │               │     │
│   │  │ (accent-500,  │               │     │
│   │  │  system)      │               │     │
│   │  └───────────────┘               │     │
│   └───────────────────────────────────┘     │
└─────────────────────────────────────────────┘
```
