'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 4v6h-6" />
      <path d="M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

function SpinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className ?? ''}`}
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const handleRefresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showToast('Dashboard data refreshed');
    }, 1000);
  };

  return (
    <div className="min-h-full p-5">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-[var(--primary-text)]">Dashboard</h1>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-2 rounded-md border-0 bg-[var(--button-glow)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#3A7BAF] disabled:opacity-80"
            >
              {refreshing ? <SpinIcon /> : <RefreshIcon />}
              {refreshing ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>
        </div>

        {/* KPI Stats */}
        <div className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          <StatCard
            title="Total Revenue (30d)"
            value="$125,400"
            trend={{ type: 'positive', label: '12.5%' }}
            icon={<DollarIcon />}
          />
          <StatCard
            title="Transactions (30d)"
            value="3,450"
            trend={{ type: 'positive', label: '8.2%' }}
            icon={<PackageIcon />}
          />
          <StatCard
            title="Subscription MRR"
            value="$45,200"
            trend={{ type: 'positive', label: '5.4%' }}
            icon={<WalletIcon />}
          />
          <StatCard
            title="Active Users (30d)"
            value="8,932"
            trend={{ type: 'positive', label: '3.1%' }}
            icon={<UsersIcon />}
          />
          <StatCard
            title="Total Products"
            value="1,432"
            trend={{ type: 'neutral' }}
            icon={<DocumentIcon />}
          />
        </div>

        {/* Charts */}
        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="flex h-[350px] flex-col rounded-lg bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-[var(--primary-text)]">Revenue Trend</h3>
              <div className="chart-actions">
                <select className="rounded border border-[var(--button-line)] px-2 py-1 text-xs text-[var(--mobile-secondary)] outline-none">
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                </select>
              </div>
            </div>
            <div className="relative flex flex-1 items-end justify-between px-2.5 pb-0 pt-5">
              <svg className="absolute inset-x-2.5 bottom-5 top-5" viewBox="0 0 500 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#458BC1" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#458BC1" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,120 Q50,80 100,90 T200,60 T300,80 T400,40 T500,70 V150 H0 Z"
                  fill="url(#revenueGradient)"
                  stroke="none"
                />
                <path
                  d="M0,120 Q50,80 100,90 T200,60 T300,80 T400,40 T500,70"
                  fill="none"
                  stroke="var(--button-glow)"
                  strokeWidth={2}
                  className="drop-shadow-[0_4px_6px_rgba(69,139,193,0.2)]"
                />
              </svg>
            </div>
          </div>

          <div className="flex h-[350px] flex-col rounded-lg bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-[var(--primary-text)]">User Growth</h3>
              <select className="rounded border border-[var(--button-line)] px-2 py-1 text-xs text-[var(--mobile-secondary)] outline-none">
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="flex h-[80%] w-full items-end justify-around px-2.5">
              {[40, 60, 50, 75, 65, 90].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="w-[12%] rounded-t bg-[var(--button-glow)]"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-3 lg:grid-cols-2">
          {/* Infrastructure */}
          <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-between border-b border-[var(--button-line)] px-5 py-4 text-[15px] font-semibold text-[var(--primary-text)]">
              Infrastructure Health
              <Link href="/logs" className="cursor-pointer text-xs text-[var(--button-glow)] hover:underline">
                System Logs
              </Link>
            </div>
            <div className="flex-1">
              <HealthRow
                dot="success"
                label="RabbitMQ Queues"
                right={<span className="rounded-xl border border-[#B7EB8F] bg-[#F6FFED] px-2 py-0.5 text-xs font-semibold text-[var(--success-color)]">42 Pending</span>}
              />
              <HealthRow
                dot="success"
                label="Integration Errors (24h)"
                right={<span className="text-[13px] font-semibold text-[var(--primary-text)]">0 Failed</span>}
              />
              <HealthRow
                dot="success"
                label="Daily Aggregation Job"
                right={<span className="text-[13px] font-semibold text-[var(--primary-text)]">Success (00:15)</span>}
              />
              <HealthRow
                dot="danger"
                label="Automation (Apify)"
                right={<span className="rounded-xl border border-[#FFA39E] bg-[#FFF1F0] px-2 py-0.5 text-xs font-semibold text-[var(--danger-color)]">2 Failed</span>}
              />
              <div className="grid grid-cols-2 gap-3 border-t border-[var(--button-line)] p-4">
                <div className="flex flex-col items-center rounded-md border border-[var(--button-line)] p-3 text-center">
                  <div className="mb-1 text-xs font-semibold text-[var(--mobile-secondary)]">LearnWorlds API</div>
                  <div className="text-xs font-semibold text-[var(--success-color)]">Connected</div>
                </div>
                <div className="flex flex-col items-center rounded-md border border-[var(--button-line)] p-3 text-center">
                  <div className="mb-1 text-xs font-semibold text-[var(--mobile-secondary)]">PayPal Payouts</div>
                  <div className="text-xs font-semibold text-[var(--success-color)]">Connected</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Actions */}
          <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
            <div className="border-b border-[var(--button-line)] px-5 py-4 text-[15px] font-semibold text-[var(--primary-text)]">
              Pending Actions
            </div>
            <PendingRow
              icon={<ClockIcon />}
              label="Pending Products"
              metric="12"
              actionLabel="Review"
              onAction={() => {
                showToast('Navigating to Products...');
                router.push('/products');
              }}
            />
            <PendingRow
              icon={<DocumentSmallIcon />}
              label="Instructor Apps"
              metric="5"
              actionLabel="Review"
              onAction={() => {
                showToast('Navigating to Applications...');
                router.push('/instructors');
              }}
            />
            <PendingRow
              icon={<CardIcon />}
              label="Payouts Pending"
              metric="8"
              actionLabel="Process"
              onAction={() => {
                showToast('Navigating to Payouts...');
                router.push('/payouts');
              }}
            />
          </div>

          {/* Recent Activity */}
          <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] lg:col-span-2 xl:col-span-1">
            <div className="border-b border-[var(--button-line)] px-5 py-4 text-[15px] font-semibold text-[var(--primary-text)]">
              Recent Activity
            </div>
            <div className="flex-1">
              <ActivityRow
                icon={
                  <Image
                    src="https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png"
                    alt=""
                    width={36}
                    height={36}
                    className="h-full w-full object-cover"
                  />
                }
                title="UX Design Masterclass"
                subtitle="Sale • Sarah Johnson"
                metaRight="$89.00"
                metaTime="2m ago"
              />
              <ActivityRow
                icon={<UserCircleIcon />}
                title="New User: Alex M."
                subtitle="Student Registration"
                metaTime="15m ago"
              />
              <ActivityRow
                icon={
                  <Image
                    src="https://i.ibb.co/SwpdsBdp/product2.webp"
                    alt=""
                    width={36}
                    height={36}
                    className="h-full w-full object-cover"
                  />
                }
                title="React Native Bootcamp"
                subtitle="Sale • Emily R."
                metaRight="$49.50"
                metaTime="1h ago"
              />
              <button
                type="button"
                onClick={() => {
                  showToast('Viewing All Transactions...');
                  router.push('/subscriptions');
                }}
                className="w-full cursor-pointer border-t border-[var(--button-line)] bg-white px-5 py-3.5 text-right transition-colors hover:bg-[var(--secondary-bg)]"
              >
                <span className="inline-flex items-center justify-end gap-1.5 text-[13px] font-semibold text-[var(--button-glow)] after:text-sm after:content-['→'] hover:text-[#3A7BAF]">
                  View All Activity
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div
        className={`fixed right-5 top-5 z-[9999] flex items-center gap-2.5 rounded-md bg-[#333] px-5 py-3 text-sm text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 ${
          toast.visible ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0 pointer-events-none'
        }`}
        role="status"
        aria-live="polite"
      >
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>{toast.message || 'Action successful'}</span>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  trend,
  icon,
}: {
  title: string;
  value: string;
  trend: { type: 'positive' | 'negative' | 'neutral'; label?: string };
  icon: ReactNode;
}) {
  return (
    <div className="relative flex items-center overflow-hidden rounded-lg bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
      <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--secondary-bg)] text-[var(--icon-default)] [&_svg]:h-6 [&_svg]:w-6">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="mb-1 text-[13px] font-semibold uppercase tracking-[0.5px] text-[var(--mobile-secondary)]">
          {title}
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-2xl font-bold text-[var(--primary-text)]">{value}</span>
          {trend.type === 'neutral' ? (
            <span className="text-xs font-medium text-[var(--draft-color)]">-</span>
          ) : (
            <span
              className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium whitespace-nowrap ${
                trend.type === 'positive'
                  ? 'bg-[rgba(82,196,26,0.1)] text-[var(--success-color)]'
                  : 'bg-[rgba(255,77,79,0.1)] text-[var(--danger-color)]'
              }`}
            >
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                <path d="M18 15l-6-6-6 6" />
              </svg>
              {trend.label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function HealthRow({
  dot,
  label,
  right,
}: {
  dot: 'success' | 'danger';
  label: string;
  right: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--button-line)] px-5 py-3.5 last:border-b-0">
      <div className="flex items-center gap-3 text-sm font-medium text-[var(--primary-text)]">
        <span
          className={`h-2 w-2 shrink-0 rounded-full ${dot === 'success' ? 'bg-[var(--success-color)]' : 'bg-[var(--danger-color)]'}`}
        />
        {label}
      </div>
      <div className="flex items-center">{right}</div>
    </div>
  );
}

function PendingRow({
  icon,
  label,
  metric,
  actionLabel,
  onAction,
}: {
  icon: ReactNode;
  label: string;
  metric: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--button-line)] px-5 py-3.5 last:border-b-0">
      <div className="flex items-center gap-3 text-sm font-medium text-[var(--primary-text)]">
        <span className="text-[var(--icon-default)]">{icon}</span>
        {label}
      </div>
      <div className="mr-3 rounded-md bg-[var(--secondary-bg)] px-2 py-0.5 text-sm font-bold text-[var(--primary-text)]">
        {metric}
      </div>
      <button
        type="button"
        onClick={onAction}
        className="rounded border border-transparent px-2.5 py-1 text-[13px] font-semibold text-[var(--button-glow)] transition-colors hover:border-transparent hover:bg-[#E6F7FF] hover:text-[#1890FF]"
      >
        {actionLabel}
      </button>
    </div>
  );
}

function ActivityRow({
  icon,
  title,
  subtitle,
  metaRight,
  metaTime,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  metaRight?: string;
  metaTime: string;
}) {
  return (
    <div className="flex cursor-default items-center justify-between border-b border-[var(--button-line)] px-5 py-3.5 transition-colors last:border-b-0 hover:bg-[var(--secondary-bg)]">
      <div className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--secondary-bg)] text-[var(--icon-default)]">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-semibold text-[var(--primary-text)]">{title}</div>
        <div className="text-[11px] text-[var(--mobile-secondary)]">{subtitle}</div>
      </div>
      <div className="flex flex-col items-end text-right">
        {metaRight ? <div className="text-[13px] font-semibold text-[var(--primary-text)]">{metaRight}</div> : null}
        <div className="text-[11px] text-[var(--mobile-secondary)]">{metaTime}</div>
      </div>
    </div>
  );
}

function DollarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function DocumentSmallIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function UserCircleIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
