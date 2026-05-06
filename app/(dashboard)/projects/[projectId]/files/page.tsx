'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useFiles } from '@/app/_lib/store/FileContext';
import { useProjects } from '@/app/_lib/store/ProjectContext';
import { PageContainer } from '@/app/_components/layout/PageContainer';
import { EmptyState } from '@/app/_components/ui/EmptyState';
import { Toast } from '@/app/_components/ui/Toast';
import { ConfirmDialog } from '@/app/_components/ui/ConfirmDialog';
import { FileUploadArea } from '@/app/_components/files/FileUploadArea';
import { FileListItem } from '@/app/_components/files/FileListItem';

export default function FilesPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { getProject } = useProjects();
  const { getByProject, addFile, removeFile, downloadFile } = useFiles();

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const project = getProject(projectId);
  const files = getByProject(projectId);

  if (!project) {
    return (
      <PageContainer>
        <EmptyState title="프로젝트를 찾을 수 없습니다" />
      </PageContainer>
    );
  }

  const handleUpload = async (file: File) => {
    const result = await addFile(projectId, file);
    if (result) {
      setToastMsg(`${file.name} 업로드 완료`);
    } else {
      setToastMsg('파일 크기가 초과되었습니다');
    }
    setShowToast(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await removeFile(deleteTarget);
    setDeleteTarget(null);
    setToastMsg('파일이 삭제되었습니다');
    setShowToast(true);
  };

  const deleteFile = files.find((f) => f.id === deleteTarget);

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary-800">파일 보관함</h1>
        <p className="text-sm text-primary-400 mt-1">
          프로젝트 관련 문서를 업로드하고 관리하세요
        </p>
      </div>

      <div className="max-w-2xl">
        <div className="mb-6">
          <FileUploadArea onUpload={handleUpload} />
        </div>

        {files.length === 0 ? (
          <EmptyState
            title="업로드된 파일이 없습니다"
            description="기획서, 디자인 시안, 분석 문서 등을 업로드해보세요"
          />
        ) : (
          <div className="flex flex-col gap-3">
            {files.map((file) => (
              <FileListItem
                key={file.id}
                file={file}
                onDownload={() => downloadFile(file.id)}
                onDelete={() => setDeleteTarget(file.id)}
              />
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="파일을 삭제하시겠습니까?"
        description={deleteFile ? `${deleteFile.name}이(가) 영구적으로 삭제됩니다.` : ''}
        confirmLabel="삭제"
        cancelLabel="취소"
        variant="danger"
      />

      <Toast
        message={toastMsg}
        open={showToast}
        onClose={() => setShowToast(false)}
      />
    </PageContainer>
  );
}
