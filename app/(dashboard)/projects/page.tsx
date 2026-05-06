'use client';

import { useState } from 'react';
import { useProjects } from '@/app/_lib/store/ProjectContext';
import { PageContainer } from '@/app/_components/layout/PageContainer';
import { Card } from '@/app/_components/ui/Card';
import { Button } from '@/app/_components/ui/Button';
import { Modal } from '@/app/_components/ui/Modal';
import { Input } from '@/app/_components/ui/Input';
import { TextArea } from '@/app/_components/ui/TextArea';
import { EmptyState } from '@/app/_components/ui/EmptyState';
import { formatDate } from '@/app/_lib/utils/formatDate';
import Link from 'next/link';

export default function ProjectsPage() {
  const { projects, addProject } = useProjects();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (!name.trim()) return;
    addProject({ name: name.trim(), description: description.trim() });
    setName('');
    setDescription('');
    setModalOpen(false);
  };

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary-800">프로젝트</h1>
          <p className="text-sm text-primary-400 mt-1">
            진행 중인 프로젝트 목록
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)}>+ 새 프로젝트</Button>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          title="프로젝트가 없습니다"
          description="새 프로젝트를 생성하여 시작하세요"
        >
          <Button size="sm" onClick={() => setModalOpen(true)}>
            + 새 프로젝트
          </Button>
        </EmptyState>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card hoverable className="h-full">
                <h3 className="text-lg font-semibold text-primary-800 mb-2">
                  {project.name}
                </h3>
                <p className="text-sm text-primary-500 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <p className="text-xs text-primary-300">
                  수정일 {formatDate(project.updatedAt)}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="새 프로젝트"
      >
        <div className="flex flex-col gap-4">
          <Input
            label="프로젝트 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="프로젝트 이름을 입력하세요"
          />
          <TextArea
            label="설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="프로젝트 설명을 입력하세요"
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              취소
            </Button>
            <Button onClick={handleCreate} disabled={!name.trim()}>
              생성
            </Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}
