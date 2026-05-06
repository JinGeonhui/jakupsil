// ===== Core Entities =====

export type TemplateType = 'document' | 'meeting-notes' | 'policy' | 'qa';

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  projectId: string;
  type: TemplateType;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// ===== Version Control (Mock GitHub) =====

export interface Commit {
  id: string;
  projectId: string;
  branch: 'develop' | 'main';
  title: string;
  author: string;
  date: string;
  diff: string;
}

export interface Release {
  id: string;
  projectId: string;
  version: string;
  title: string;
  description: string;
  commitId: string;
  author: string;
  date: string;
  status: 'active' | 'rolledback';
}

// ===== QA =====

export interface QaCheckItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface QaSession {
  id: string;
  projectId: string;
  templateId: string;
  title: string;
  checkItems: QaCheckItem[];
  status: 'in-progress' | 'completed' | 'merge-requested';
  createdAt: string;
  updatedAt: string;
}

// ===== Deploy Approval =====

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface DeployRequest {
  id: string;
  projectId: string;
  qaSessionId: string;
  requestedBy: string;
  assignedTo: string;
  status: ApprovalStatus;
  rejectionReason?: string;
  requestedAt: string;
  resolvedAt?: string;
}

// ===== Files =====

export interface ProjectFile {
  id: string;
  projectId: string;
  name: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
}

// ===== Notifications =====

export type NotificationType =
  | 'deploy-request'
  | 'deploy-approved'
  | 'deploy-rejected'
  | 'qa-completed'
  | 'meeting-notes'
  | 'release-created';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  projectId: string;
  linkTo: string;
  read: boolean;
  createdAt: string;
}
