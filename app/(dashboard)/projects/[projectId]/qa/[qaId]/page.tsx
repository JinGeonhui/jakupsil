'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useQa } from '@/app/_lib/store/QaContext';
import { useDeploy } from '@/app/_lib/store/DeployContext';
import { useNotifications } from '@/app/_lib/store/NotificationContext';
import { PageContainer } from '@/app/_components/layout/PageContainer';
import { Badge } from '@/app/_components/ui/Badge';
import { Button } from '@/app/_components/ui/Button';
import { Checkbox } from '@/app/_components/ui/Checkbox';
import { EmptyState } from '@/app/_components/ui/EmptyState';
import { Toast } from '@/app/_components/ui/Toast';

const STATUS_MAP: Record<string, { label: string; variant: 'default' | 'info' | 'success' | 'warning' }> = {
  'in-progress': { label: '진행 중', variant: 'warning' },
  completed: { label: '완료', variant: 'success' },
  'merge-requested': { label: '머지 요청됨', variant: 'info' },
};

export default function QaDetailPage() {
  const { projectId, qaId } = useParams<{
    projectId: string;
    qaId: string;
  }>();
  const router = useRouter();
  const { getSession, toggleCheckItem, updateStatus } = useQa();
  const { addRequest } = useDeploy();
  const { addNotification } = useNotifications();
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const session = getSession(qaId);

  if (!session) {
    return (
      <PageContainer>
        <EmptyState title="QA 세션을 찾을 수 없습니다" />
      </PageContainer>
    );
  }

  const checked = session.checkItems.filter((i) => i.checked).length;
  const total = session.checkItems.length;
  const percent = total > 0 ? Math.round((checked / total) * 100) : 0;
  const allChecked = checked === total && total > 0;
  const status = STATUS_MAP[session.status];

  const handleMergeRequest = () => {
    updateStatus(qaId, 'merge-requested');

    addRequest({
      projectId,
      qaSessionId: qaId,
      requestedBy: '기획자',
      assignedTo: '김개발',
    });

    addNotification({
      type: 'deploy-request',
      title: '배포 승인 요청',
      message: `${session.title} QA 완료 후 배포 승인이 요청되었습니다.`,
      projectId,
      linkTo: `/projects/${projectId}/deploy`,
    });

    addNotification({
      type: 'qa-completed',
      title: 'QA 완료',
      message: `${session.title} QA가 완료되었습니다.`,
      projectId,
      linkTo: `/projects/${projectId}/qa/${qaId}`,
    });

    setToastMsg('머지 요청이 전송되었습니다');
    setShowToast(true);
  };

  return (
    <PageContainer>
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold text-primary-800">
              {session.title}
            </h1>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          돌아가기
        </Button>
      </div>

      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-900 rounded-full transition-all duration-200"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-sm font-medium text-primary-600">
            {checked}/{total}
          </span>
        </div>

        <div className="flex flex-col gap-3 mb-8">
          {session.checkItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-3 bg-background border border-gray-200 rounded-md"
            >
              <Checkbox
                label={item.label}
                checked={item.checked}
                onChange={() => {
                  if (session.status !== 'merge-requested') {
                    toggleCheckItem(qaId, item.id);
                  }
                }}
              />
            </div>
          ))}
        </div>

        {session.status !== 'merge-requested' && (
          <Button
            onClick={handleMergeRequest}
            disabled={!allChecked}
            className="w-full"
          >
            {allChecked
              ? '머지 요청'
              : `모든 항목을 완료해주세요 (${checked}/${total})`}
          </Button>
        )}

        {session.status === 'merge-requested' && (
          <div className="p-4 bg-info-50 border border-info-500 rounded-md text-sm text-info-600">
            머지 요청이 전송되었습니다. 개발자의 승인을 기다리고 있습니다.
          </div>
        )}
      </div>

      <Toast
        message={toastMsg}
        open={showToast}
        onClose={() => setShowToast(false)}
      />
    </PageContainer>
  );
}
