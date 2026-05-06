@AGENTS.md
@DESIGN_SYSTEM.md

## 디자인 시스템 규칙

- **모든 UI 개발 시 `DESIGN_SYSTEM.md`를 반드시 참조**하고, 정의된 디자인 토큰만 사용할 것
- 색상은 `globals.css`에 정의된 CSS 변수(`--primary-*`, `--accent-*`, `--gray-*`, `--danger-*` 등)만 사용
- 임의의 색상값(예: `bg-[#abc123]`)을 사용하지 말 것 — 반드시 토큰 기반 Tailwind 클래스 사용 (예: `bg-primary-900`, `text-accent-500`)
- 간격(margin, padding, gap)은 8pt 그리드 기반 spacing 토큰을 따를 것
- border-radius, shadow는 정의된 토큰만 사용 (`rounded-md`, `shadow-1` 등)
- 타이포그래피는 DESIGN_SYSTEM.md의 타입 스케일 참조
- 새로운 컴포넌트 작성 시 DESIGN_SYSTEM.md의 컴포넌트 스펙을 우선 확인
- 접근성(WCAG AA) 기준을 항상 준수 — 명암비 4.5:1 이상
