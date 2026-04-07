'use client';

import React from 'react';

type TrendType = 'positive' | 'negative' | 'neutral';

export type InstructorStat = {
  id: string;
  title: string;
  value: string;
  trend: { value: string; type: TrendType };
  icon: React.ReactNode;
};

const DEFAULT_STATS: InstructorStat[] = [
  {
    id: 'instructors',
    title: 'Approved Instructors',
    value: '248',
    trend: { value: '+5.2%', type: 'positive' },
    icon: <StatInstructorsIcon />,
  },
  {
    id: 'products',
    title: 'Active Products',
    value: '1,892',
    trend: { value: '+12.4%', type: 'positive' },
    icon: <StatGridIcon />,
  },
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: '$4.2M',
    trend: { value: '+8.5%', type: 'positive' },
    icon: <StatRevenueIcon />,
  },
  {
    id: 'pending',
    title: 'Pending Payouts',
    value: '$12,450',
    trend: { value: 'Due 15th', type: 'neutral' },
    icon: <StatPendingIcon />,
  },
];

export const InstructorStatsCards: React.FC<{ stats?: InstructorStat[] }> = ({
  stats = DEFAULT_STATS,
}) => {
  return (
    <div className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
      {stats.map((s) => (
        <div
          key={s.id}
          className="relative flex items-center rounded-lg bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
        >
          <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--secondary-bg)] text-[var(--icon-default)]">
            {s.icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="mb-1 truncate text-sm text-[var(--mobile-secondary)]">{s.title}</h3>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xl font-semibold text-[var(--primary-text)]">{s.value}</span>
              <span
                className={`whitespace-nowrap rounded px-1.5 py-0.5 text-xs font-medium ${
                  s.trend.type === 'positive'
                    ? 'bg-[rgba(82,196,26,0.1)] text-[#52C41A]'
                    : s.trend.type === 'negative'
                      ? 'bg-[rgba(207,19,34,0.1)] text-[#cf1322]'
                      : 'bg-[rgba(102,102,102,0.1)] text-[#666]'
                }`}
              >
                {s.trend.value}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

function StatInstructorsIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function StatGridIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z" />
      <circle cx="17" cy="17" r="3" />
    </svg>
  );
}

function StatRevenueIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function StatPendingIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1 15V9h2v8h-2zm0-10V5h2v2h-2z" />
    </svg>
  );
}

