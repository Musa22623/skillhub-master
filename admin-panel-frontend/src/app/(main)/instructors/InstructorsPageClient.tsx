'use client';

import React from 'react';
import { InstructorStatsCards } from '@/components/instructors/InstructorStatsCards';
import { InstructorsTable } from '@/components/instructors/InstructorsTable';
import { ToastProvider, useToast } from '@/components/ui/Toast';

const InstructorsPageContent: React.FC = () => {
  const { showToast } = useToast();

  return (
    <div className="min-h-full p-5">
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-[var(--primary-text)]">All Instructors</h1>
          <button
            type="button"
            onClick={() => showToast('New Instructor invite modal opening...', 'info')}
            className="inline-flex items-center gap-2 rounded-md border-0 bg-[var(--button-glow)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#3A7BAF]"
          >
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M8 3V13M3 8H13"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            New Instructor
          </button>
        </header>

        <InstructorStatsCards />

        <InstructorsTable />
      </div>
    </div>
  );
};

const InstructorsPageClient: React.FC = () => (
  <ToastProvider>
    <InstructorsPageContent />
  </ToastProvider>
);

export default InstructorsPageClient;
