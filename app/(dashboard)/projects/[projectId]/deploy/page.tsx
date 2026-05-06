'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useDeploy } from '@/app/_lib/store/DeployContext';
import { useQa } from '@/app/_lib/store/QaContext';
import { useProjects } from '@/app/_lib/store/ProjectContext';
import { useNotifications } from '@/app/_lib/store/NotificationContext';
import { PageContainer } from '@/app/_components/layout/PageContainer';
import { Card } from '@/app/_components/ui/Card';
import { Badge } from '@/app/_components/ui/Badge';
import { Button } from '@/app/_components/ui/Button';
import { Modal } from '@/app/_components/ui/Modal';
import { TextArea } from '@/app/_components/ui/TextArea';
import { EmptyState } from '@/app/_components/ui/EmptyState';
import { Toast } from '@/app/_components/ui/Toast';
import { formatDateTime } from '@/app/_lib/utils/formatDate';

const STATUS_BADGE: Record<
  string,
  { label: string; variant: 'default' | 'info' | 'success' | 'warning' | 'danger' }
> = {
  pending: { label: '승인 대기', variant: 'warning' },
  approved: { label: '승인 완료', variant: 'success' },
  rejected: { label: '반려', variant: 'danger' },
};

export default function DeployPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { getProject } = useProjects();
  const { getByProject, updateStatus } = useDeploy();
  const { getSession } = useQa();
  const { addNotification } = useNotifications();

  const [showDevTools, setShowDevTools] = useState(false);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const project = getProject(projectId);
  const requests = getByProject(projectId).sort(
    (a, b) =>
      new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()
  );

  const pending = requests.filter((r) => r.status === 'pending');
  const resolved = requests.filter((r) => r.status !== 'pending');

  if (!project) {
    return (
      <PageContainer>
        <EmptyState title="프로젝트를 찾을 수 없습니다" />
      </PageContainer>
    );
  }

  const handleSimApprove = (id: string) => {
    updateStatus(id, 'approved');
    addNotification({
      type: 'deploy-approved',
      title: '배포 승인 완료',
      message: `${project.name} 배포가 승인되었습니다.`,
      projectId,
      linkTo: `/projects/${projectId}/deploy`,
    });
    setToastMsg('배포가 승인되었습니다');
    setShowToast(true);
  };

  const handleSimReject = () => {
    if (!rejectId || !reason.trim()) return;
    updateStatus(rejectId, 'rejected', reason.trim());
    addNotification({
      type: 'deploy-rejected',
      title: '배포 반려',
      message: `${project.name} 배포가 반려되었습니다. 사유: ${reason.trim()}`,
      projectId,
      linkTo: `/projects/${projectId}/deploy`,
    });
    setRejectId(null);
    setReason('');
    setToastMsg('배포가 반려되었습니다');
    setShowToast(true);
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary-800">배포 승인 현황</h1>
        <p className="text-sm text-primary-400 mt-1">
          QA 완료 후 요청한 배포 승인 상태를 확인합니다
        </p>
      </div>

      {/* 흐름 안내 */}
      <div className="flex items-center gap-2 mb-6 p-3 bg-gray-50 rounded-md text-xs text-primary-500 flex-wrap">
        <span className="font-medium text-primary-700">QA 완료</span>
        <svg className="w-4 h-4 text-primary-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
        <span>머지 요청 (기획자)</span>
        <svg className="w-4 h-4 text-primary-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
        <span>승인/반려 (개발자)</span>
        <svg className="w-4 h-4 text-primary-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
        <span className="font-medium text-primary-700">배포</span>
      </div>

      {requests.length === 0 ? (
        <EmptyState
          title="배포 요청이 없습니다"
          description="QA 체크리스트를 모두 완료한 후 머지 요청을 보내면 배포 승인 요청이 생성됩니다"
        />
      ) : (
        <>
          {/* 대기 중인 요청 */}
          {pending.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-primary-700 mb-3">
                승인 대기 중
              </h2>
              <div className="flex flex-col gap-3">
                {pending.map((req) => {
                  const qa = getSession(req.qaSessionId);
                  const checked =
                    qa?.checkItems.filter((i) => i.checked).length ?? 0;
                  const total = qa?.checkItems.length ?? 0;

                  return (
                    <Card key={req.id}>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="warning">승인 대기</Badge>
                      </div>
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="text-primary-400">담당 개발자: </span>
                          <span className="font-medium text-primary-800">
                            {req.assignedTo}
                          </span>
                        </p>
                        <p className="text-xs text-primary-400">
                          요청일: {formatDateTime(req.requestedAt)}
                        </p>
                        {qa && (
                          <p className="text-xs text-primary-400">
                            QA: {qa.title} ({checked}/{total} 완료)
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-primary-300 mt-3">
                        개발자의 승인을 기다리고 있습니다
                      </p>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* 처리 완료 */}
          {resolved.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-primary-700 mb-3">
                처리 완료
              </h2>
              <div className="flex flex-col gap-3">
                {resolved.map((req) => {
                  const badge = STATUS_BADGE[req.status];
                  return (
                    <Card key={req.id}>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={badge.variant}>{badge.label}</Badge>
                        <span className="text-xs text-primary-400">
                          담당: {req.assignedTo}
                        </span>
                      </div>
                      <div className="text-xs text-primary-400 space-y-1">
                        <p>요청일: {formatDateTime(req.requestedAt)}</p>
                        {req.resolvedAt && (
                          <p>처리일: {formatDateTime(req.resolvedAt)}</p>
                        )}
                      </div>
                      {req.rejectionReason && (
                        <div className="mt-2 p-2 bg-danger-50 rounded-sm">
                          <p className="text-xs text-danger-600">
                            반려 사유: {req.rejectionReason}
                          </p>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* MVP 개발자 시뮬레이션 */}
      {pending.length > 0 && (
        <div className="mt-8 border-t border-dashed border-gray-300 pt-6">
          <button
            type="button"
            className="flex items-center gap-2 text-xs text-primary-300 hover:text-primary-500 transition-colors duration-100"
            onClick={() => setShowDevTools((v) => !v)}
          >
            <svg
              className={`w-3 h-3 transition-transform duration-100 ${showDevTools ? 'rotate-90' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            MVP 테스트: 개발자 응답 시뮬레이션
          </button>

          {showDevTools && (
            <div className="mt-3 p-4 bg-gray-50 rounded-md border border-dashed border-gray-300">
              <p className="text-xs text-primary-400 mb-3">
                실제 서비스에서는 개발자가 별도 화면에서 승인/반려합니다.
                MVP에서는 아래 버튼으로 개발자의 응답을 시뮬레이션할 수 있습니다.
              </p>
              <div className="flex flex-col gap-2">
                {pending.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between gap-3 p-2 bg-background rounded-sm border border-gray-200"
                  >
                    <span className="text-xs text-primary-500 truncate">
                      {req.assignedTo}에게 요청한 건
                    </span>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        size="sm"
                        onClick={() => handleSimApprove(req.id)}
                      >
                        승인
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setRejectId(req.id)}
                      >
                        반려
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <Modal
        open={!!rejectId}
        onClose={() => {
          setRejectId(null);
          setReason('');
        }}
        title="배포 반려 시뮬레이션"
      >
        <p className="text-sm text-primary-500 mb-4">
          개발자가 반려할 때의 사유를 입력합니다.
        </p>
        <TextArea
          label="반려 사유"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="반려 사유를 입력하세요 (필수)"
        />
        <div className="flex justify-end gap-3 mt-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setRejectId(null);
              setReason('');
            }}
          >
            취소
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleSimReject}
            disabled={!reason.trim()}
          >
            반려
          </Button>
        </div>
      </Modal>

      <Toast
        message={toastMsg}
        open={showToast}
        onClose={() => setShowToast(false)}
      />
    </PageContainer>
  );
}
