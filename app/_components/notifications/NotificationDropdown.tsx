'use client';

import { useNotifications } from '@/app/_lib/store/NotificationContext';
import { NotificationItem } from './NotificationItem';

interface NotificationDropdownProps {
  onClose: () => void;
}

export function NotificationDropdown({ onClose }: NotificationDropdownProps) {
  const { notifications, markAllAsRead } = useNotifications();

  const sorted = [...notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-background border border-gray-200 rounded-md shadow-2 z-50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <span className="text-sm font-semibold text-primary-800">알림</span>
        <button
          type="button"
          onClick={markAllAsRead}
          className="text-xs text-accent-500 hover:text-accent-600 cursor-pointer"
        >
          모두 읽기
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {sorted.length === 0 ? (
          <p className="text-sm text-primary-400 text-center py-8">
            알림이 없습니다
          </p>
        ) : (
          sorted
            .slice(0, 10)
            .map((n) => (
              <NotificationItem key={n.id} notification={n} onClose={onClose} />
            ))
        )}
      </div>
    </div>
  );
}
