'use client';

import Link from 'next/link';
import type { Notification } from '@/app/_lib/types';
import { useNotifications } from '@/app/_lib/store/NotificationContext';
import { formatRelativeTime } from '@/app/_lib/utils/formatDate';

interface NotificationItemProps {
  notification: Notification;
  onClose: () => void;
}

export function NotificationItem({
  notification,
  onClose,
}: NotificationItemProps) {
  const { markAsRead } = useNotifications();

  return (
    <Link
      href={notification.linkTo}
      onClick={() => {
        markAsRead(notification.id);
        onClose();
      }}
      className="flex items-start gap-3 px-4 py-3 hover:bg-primary-50 transition-colors duration-100"
    >
      {!notification.read && (
        <span className="mt-1.5 w-2 h-2 rounded-full bg-accent-500 shrink-0" />
      )}
      {notification.read && <span className="w-2 shrink-0" />}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-primary-800 truncate">
          {notification.title}
        </p>
        <p className="text-xs text-primary-400 truncate">
          {notification.message}
        </p>
        <p className="text-xs text-primary-300 mt-1">
          {formatRelativeTime(notification.createdAt)}
        </p>
      </div>
    </Link>
  );
}
