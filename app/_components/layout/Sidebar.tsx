'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useProjects } from '@/app/_lib/store/ProjectContext';
import { useTheme } from '@/app/_lib/store/ThemeContext';
import type { ReactNode } from 'react';

const NAV_ITEMS: { label: string; path: string; icon: ReactNode }[] = [
  {
    label: '템플릿',
    path: '',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    label: '파일',
    path: '/files',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
      </svg>
    ),
  },
  {
    label: '변경 이력',
    path: '/commits',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    label: 'QA 확인',
    path: '/qa',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    label: '배포 승인',
    path: '/deploy',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    label: '릴리스',
    path: '/releases',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
      </svg>
    ),
  },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { projects } = useProjects();
  const { theme } = useTheme();

  const activeProjectId = pathname.match(/\/projects\/([^/]+)/)?.[1];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-60 bg-background flex flex-col transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:z-auto`}
      >
        <div className="h-14 md:h-16 flex items-center px-5">
          <Link href="/projects" onClick={onClose}>
            <Image
              src={theme === 'dark' ? '/logo-white.png' : '/logo.png'}
              alt="작업실"
              width={80}
              height={28}
              priority
            />
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-2">
            <span className="text-xs font-medium text-primary-400 uppercase tracking-wider">
              프로젝트
            </span>
          </div>

          {projects.map((project) => {
            const isActive = activeProjectId === project.id;

            return (
              <div key={project.id} className="px-3">
                <Link
                  href={`/projects/${project.id}`}
                  onClick={onClose}
                  className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-100
                    ${
                      isActive
                        ? 'bg-foreground text-background font-semibold'
                        : 'text-primary-500 hover:bg-primary-50 hover:text-primary-700'
                    }`}
                >
                  {project.name}
                </Link>

                {isActive && (
                  <div className="mt-1 mb-2 flex flex-col gap-0.5 ml-2">
                    {NAV_ITEMS.map((item) => {
                      const href = `/projects/${project.id}${item.path}`;
                      const isTabActive =
                        item.path === ''
                          ? pathname === `/projects/${project.id}`
                          : pathname.startsWith(href);

                      return (
                        <Link
                          key={item.path}
                          href={href}
                          onClick={onClose}
                          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors duration-100
                            ${
                              isTabActive
                                ? 'bg-primary-50 text-primary-900 font-medium'
                                : 'text-primary-400 hover:text-primary-600 hover:bg-primary-50'
                            }`}
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
