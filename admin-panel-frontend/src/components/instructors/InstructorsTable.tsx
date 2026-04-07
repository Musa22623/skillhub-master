
'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useToast } from '@/components/ui/Toast';
import { DataTable, type DataTableColumn } from '@/components/ui/DataTable';

export type PayoutStatus = 'eligible' | 'setup' | 'processing' | 'hold' | 'suspended';

export type Instructor = {
  id: number;
  name: string;
  email: string;
  internalId: string;
  lwId: string;
  avatar: string;
  approvedDate: string;
  products: { total: number; courses: number; events: number; bundles: number };
  totalSales: string;
  payoutStatus: PayoutStatus;
  lastPayout: { amount: string; date: string };
  pending: string;
};
const INSTRUCTORS: Instructor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Jenkins',
    email: 'sarah.j@uni.edu',
    internalId: 'USR-8FJ3K2L',
    lwId: 'LW-4829037',
    avatar: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png',
    approvedDate: 'Jan 12, 2024',
    products: { total: 14, courses: 12, events: 2, bundles: 0 },
    totalSales: '$45,230',
    payoutStatus: 'eligible',
    lastPayout: { amount: '$1,200.00', date: 'Feb 28, 2025' },
    pending: '$450.00',
  },
  {
    id: 2,
    name: 'Markus DeVine',
    email: 'markus.dev@tech.io',
    internalId: 'USR-9X2MK7P',
    lwId: 'LW-1102845',
    avatar: 'https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png',
    approvedDate: 'Mar 04, 2024',
    products: { total: 3, courses: 3, events: 0, bundles: 0 },
    totalSales: '$850.00',
    payoutStatus: 'setup',
    lastPayout: { amount: '—', date: 'Never' },
    pending: '$850.00',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    email: 'elena.r@design.co',
    internalId: 'USR-3K9PL4Q',
    lwId: 'LW-7741293',
    avatar: 'https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg',
    approvedDate: 'Nov 20, 2023',
    products: { total: 21, courses: 15, events: 4, bundles: 2 },
    totalSales: '$112,400',
    payoutStatus: 'processing',
    lastPayout: { amount: '$5,420.50', date: 'Processing...' },
    pending: '$2,100.00',
  },
  {
    id: 4,
    name: 'James Carter',
    email: 'j.carter@edu.net',
    internalId: 'USR-4J8LR2N',
    lwId: 'LW-9921847',
    avatar: 'https://i.pravatar.cc/150?u=4',
    approvedDate: 'Feb 01, 2024',
    products: { total: 5, courses: 5, events: 0, bundles: 0 },
    totalSales: '$12,400',
    payoutStatus: 'hold',
    lastPayout: { amount: '$3,200.00', date: 'Jan 15, 2025' },
    pending: '$4,500.00',
  },
  {
    id: 5,
    name: 'Alex Morgan',
    email: 'alex.m@susp.com',
    internalId: 'USR-XXXXX',
    lwId: 'LW-XXXXX',
    avatar: 'https://i.pravatar.cc/150?u=5',
    approvedDate: 'Aug 15, 2023',
    products: { total: 0, courses: 0, events: 0, bundles: 0 },
    totalSales: '$0.00',
    payoutStatus: 'suspended',
    lastPayout: { amount: '—', date: '—' },
    pending: '—',
  },
];

const SEARCH_FIELDS = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'id', label: 'ID' },
  { key: 'status', label: 'Payout Status' },
] as const;

type SearchFieldKey = (typeof SEARCH_FIELDS)[number]['key'];

function statusClass(s: PayoutStatus) {
  const m: Record<PayoutStatus, string> = {
    eligible: 'bg-[#d3f8df] text-[#085c37]',
    setup: 'bg-[#fff7e6] text-[#d46b08]',
    hold: 'bg-[#fff1f0] text-[#cf1322]',
    processing: 'bg-[#E8F1FF] text-[var(--processing-color)]',
    suspended: 'bg-[#F0F0F0] text-[var(--suspended-color)]',
  };
  return m[s];
}

function statusLabel(s: PayoutStatus) {
  const m: Record<PayoutStatus, string> = {
    eligible: 'Eligible',
    setup: 'Pend. Setup',
    processing: 'Processing',
    hold: 'On Hold',
    suspended: 'Suspended',
  };
  return m[s];
}

function fieldsLabel(fields: SearchFieldKey[]) {
  if (fields.length === 1) return fields[0].toUpperCase();
  if (fields.length <= 2) return fields.map((f) => f.charAt(0).toUpperCase()).join(', ');
  return `${fields.length} FIELDS`;
}
export function InstructorsTable({ instructors = INSTRUCTORS }: { instructors?: Instructor[] }) {
  const [search, setSearch] = useState('');
  const [searchFieldsOpen, setSearchFieldsOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState<SearchFieldKey[]>(['name']);
  const [openToolbarMenu, setOpenToolbarMenu] = useState<null | 'sort' | 'filter' | 'bulk'>(null);
  const [rowMenuId, setRowMenuId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<PayoutStatus | 'all'>('all');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const { showToast } = useToast();

  const toolbarPopoversRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      const t = e.target;
      if (!(t instanceof Node)) return;
      if (toolbarPopoversRef.current?.contains(t)) return;
      setSearchFieldsOpen(false);
      setOpenToolbarMenu(null);
      const el = t instanceof Element ? t : t.parentElement;
      if (el?.closest('[data-instructors-row-actions]')) return;
      setRowMenuId(null);
    };
    document.addEventListener('click', onClickCapture, true);
    return () => document.removeEventListener('click', onClickCapture, true);
  }, []);

  const toggleField = (key: SearchFieldKey) => {
    setSelectedFields((prev) => {
      const has = prev.includes(key);
      if (has && prev.length === 1) return prev;
      if (has) return prev.filter((k) => k !== key);
      return [...prev, key];
    });
  };

  const visibleRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return instructors.filter((row) => {
      if (statusFilter !== 'all' && row.payoutStatus !== statusFilter) return false;
      if (!q) return true;
      return selectedFields.some((field) => {
        switch (field) {
          case 'name':
            return row.name.toLowerCase().includes(q);
          case 'email':
            return row.email.toLowerCase().includes(q);
          case 'id':
            return row.internalId.toLowerCase().includes(q) || row.lwId.toLowerCase().includes(q);
          case 'status':
            return statusLabel(row.payoutStatus).toLowerCase().includes(q);
          default:
            return false;
        }
      });
    });
  }, [search, selectedFields, statusFilter, instructors]);

  const totalCount = instructors.length;
  const showingCount = visibleRows.length;

  const allVisibleSelected = visibleRows.length > 0 && visibleRows.every((r) => selectedIds.has(r.id));
  const someSelected = selectedIds.size > 0 && !allVisibleSelected;

  const toggleSelectAll = (checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) visibleRows.forEach((r) => next.add(r.id));
      else visibleRows.forEach((r) => next.delete(r.id));
      return next;
    });
  };

  const toggleRow = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const copyText = async (text: string, msg: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(msg, 'success');
    } catch {
      showToast('Copy failed', 'error');
    }
  };
  const columns: DataTableColumn<Instructor>[] = [
    {
      key: 'instructor',
      header: 'Instructor',
      className: 'min-w-[230px]',
      render: (row) => {
        const suspended = row.payoutStatus === 'suspended';
        return (
          <div className="flex items-center gap-3">
            <Image
              src={row.avatar}
              alt={row.name}
              width={40}
              height={40}
              className={`h-10 w-10 rounded-full object-cover ${suspended ? 'grayscale' : ''}`}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[var(--primary-text)]">{row.name}</span>
                <span className="rounded-full bg-[#EDF5FF] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.6px] text-[var(--primary-text)]">
                  {row.lwId}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--mobile-secondary)]">
                <span className="font-medium">{row.email}</span>
                <span aria-hidden>•</span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded bg-[var(--secondary-bg)] px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.6px] text-[var(--primary-text)]"
                  onClick={() => copyText(row.internalId, 'Copied User ID')}
                >
                  <CopyIcon className="h-3.5 w-3.5" />
                  {row.internalId}
                </button>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      key: 'products',
      header: 'Products',
      className: 'min-w-[220px]',
      render: (row) => (
        <div className="grid grid-cols-[repeat(3,auto)] gap-y-1 gap-x-3 text-[13px] text-[var(--primary-text)]">
          <div className="flex items-center gap-1.5">
            <IconBook />
            Courses
          </div>
          <div className="font-semibold">{row.products.courses}</div>
          <div className="text-[var(--mobile-secondary)]">of {row.products.total}</div>
          <div className="flex items-center gap-1.5">
            <IconUserCircle />
            Events
          </div>
          <div className="font-semibold">{row.products.events}</div>
          <div className="text-[var(--mobile-secondary)]">of {row.products.total}</div>
          <div className="flex items-center gap-1.5">
            <IconCard />
            Bundles
          </div>
          <div className="font-semibold">{row.products.bundles}</div>
          <div className="text-[var(--mobile-secondary)]">of {row.products.total}</div>
        </div>
      ),
    },
    {
      key: 'sales',
      header: 'Sales',
      render: (row) => (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <IconDollar />
            <span className="text-sm font-semibold text-[var(--primary-text)]">{row.totalSales}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--mobile-secondary)]">
            <IconChart />
            <span>Avg. $4,320 / product</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--mobile-secondary)]">
            <IconUserRound />
            <span>{row.approvedDate}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'payouts',
      header: 'Payouts',
      render: (row) => (
        <div className="space-y-2 rounded-md border border-[var(--button-line)] bg-[var(--secondary-bg)] p-3">
          <div className="flex items-center justify-between text-xs text-[var(--mobile-secondary)]">
            <span>Last payout</span>
            <span>{row.lastPayout.date}</span>
          </div>
          <div className="flex items-center justify-between text-sm font-semibold text-[var(--primary-text)]">
            <span>{row.lastPayout.amount}</span>
            <button
              type="button"
              onClick={() => showToast('Payout receipt modal', 'info')}
              className="text-[var(--button-glow)] hover:underline"
            >
              View
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.6px] ${statusClass(row.payoutStatus)}`}>
              {statusLabel(row.payoutStatus)}
            </span>
            <span className="text-xs text-[var(--mobile-secondary)]">ACH · NET15</span>
          </div>
        </div>
      ),
    },
    {
      key: 'pending',
      header: 'Pending',
      render: (row) => (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[13px] font-semibold text-[var(--primary-text)]">
            <IconDollarSm />
            {row.pending}
          </div>
          <div className="flex items-center gap-1 text-xs text-[var(--mobile-secondary)]">
            <IconSliders />
            Next payout batch · Feb 15
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-[var(--mobile-secondary)]">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--secondary-bg)]">
              {row.payoutStatus === 'eligible' ? (
                <IconRefresh />
              ) : row.payoutStatus === 'processing' ? (
                <IconDollarSm />
              ) : row.payoutStatus === 'setup' ? (
                <IconSliders />
              ) : row.payoutStatus === 'hold' ? (
                <IconClock />
              ) : (
                <IconBan />
              )}
            </span>
            <span className="text-sm font-semibold text-[var(--primary-text)]">
              {row.payoutStatus === 'eligible'
                ? 'Eligible for payout'
                : row.payoutStatus === 'processing'
                  ? 'Processing now'
                  : row.payoutStatus === 'setup'
                    ? 'Pending setup'
                    : row.payoutStatus === 'hold'
                      ? 'Payouts paused'
                      : 'Suspended'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => showToast('Payout timeline modal', 'info')}
              className="inline-flex items-center gap-2 rounded-md border border-[var(--button-line)] px-3 py-1.5 text-xs font-semibold text-[var(--primary-text)] transition-colors hover:bg-[var(--secondary-bg)]"
            >
              <IconClock />
              Timeline
            </button>
            <button
              type="button"
              onClick={() => showToast('Open payout settings', 'info')}
              className="inline-flex items-center gap-2 rounded-md border border-[var(--button-line)] px-3 py-1.5 text-xs font-semibold text-[var(--primary-text)] transition-colors hover:bg-[var(--secondary-bg)]"
            >
              <IconCard />
              Payout account
            </button>
          </div>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => {
        const suspended = row.payoutStatus === 'suspended';
        return (
          <div className="flex items-center gap-3" data-instructors-row-actions>
            <ToolbarDropdown
              label="Actions"
              icon={<ChevronDown className="h-4 w-4" />}
              open={rowMenuId === row.id}
              onToggle={(e) => {
                e.stopPropagation();
                setRowMenuId((v) => (v === row.id ? null : row.id));
              }}
            >
              <div className="flex w-[240px] flex-col px-3 py-2">
                {(
                  [
                    ['Open instructor profile', <IconUserCircle key="ic1" />, 'info'],
                    ['Open earnings report', <IconDollar key="ic2" />, 'info'],
                    ['Open payouts history', <IconChart key="ic3" />, 'info'],
                    ['Send notification', <IconMail key="ic4" />, 'info'],
                    [suspended ? 'Unsuspend' : 'Pause payouts', <IconClock key="ic5" />, suspended ? 'success' : 'warning'],
                  ] as const
                ).map(([label, icon, tone]) => (
                  <button
                    key={label}
                    type="button"
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-[var(--primary-text)] transition-colors hover:bg-[var(--secondary-bg)]"
                    onClick={() => {
                      showToast(label, tone as any);
                      setRowMenuId(null);
                    }}
                  >
                    <span className="text-[var(--icon-default)]">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
            </ToolbarDropdown>
            <button
              type="button"
              onClick={() => showToast('Audit log opened', 'info')}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--button-line)] text-[var(--icon-default)] transition-colors hover:bg-[var(--secondary-bg)]"
            >
              <IconFile />
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="mb-6 overflow-visible rounded-lg bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
      <div
        ref={toolbarPopoversRef}
        className="relative z-10 flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between"
      >
        <div className="flex w-full max-w-[420px] flex-1 overflow-visible rounded-md border border-[var(--button-line)] bg-white md:max-w-none md:min-w-[320px] lg:max-w-[420px]">
          <div className="relative flex flex-1 items-center">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--mobile-secondary)]"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="currentColor"
                strokeWidth={2}
              />
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth={2} />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search instructors, email or ID..."
              className="w-full border-0 bg-transparent py-2.5 pl-10 pr-3 text-sm text-[var(--primary-text)] outline-none"
            />
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSearchFieldsOpen((v) => !v);
              }}
              className="flex h-full min-w-[140px] items-center justify-between gap-2 border-l border-[var(--button-line)] bg-[#FAFAFA] px-3 py-2 text-left hover:bg-[#F0F0F0]"
            >
              <span className="flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.5px] text-[var(--icon-default)]">
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {fieldsLabel(selectedFields)}
              </span>
              <ChevronDown className="h-3.5 w-3.5 shrink-0" />
            </button>
            {searchFieldsOpen ? (
              <div
                className="absolute right-0 top-[calc(100%+4px)] z-[1000] min-w-[200px] rounded-lg bg-white py-2 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                onClick={(e) => e.stopPropagation()}
              >
                {SEARCH_FIELDS.map((f) => {
                  const sel = selectedFields.includes(f.key);
                  return (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => toggleField(f.key)}
                      className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-[var(--primary-text)] hover:bg-[var(--secondary-bg)]"
                    >
                      <span
                        className={`grid h-5 w-5 place-items-center rounded border text-[var(--primary-text)] ${
                          sel
                            ? 'border-[var(--button-glow)] bg-[var(--button-glow)]'
                            : 'border-[var(--button-line)] bg-white'
                        }`}
                        aria-hidden
                      >
                        {sel ? (
                          <svg
                            width={12}
                            height={12}
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path d="M3 8L6.5 11L13 5" />
                          </svg>
                        ) : null}
                      </span>
                      <span className="text-sm font-medium text-[var(--primary-text)]">{f.label}</span>
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ToolbarDropdown
            label="Sort"
            icon={<SortIcon />}
            open={openToolbarMenu === 'sort'}
            onToggle={(e) => {
              e.stopPropagation();
              setOpenToolbarMenu((v) => (v === 'sort' ? null : 'sort'));
            }}
          >
            <div className="flex w-[240px] flex-col gap-2 px-3 py-2">
              <div className="flex items-center justify-between rounded-md border border-[var(--button-line)] px-3 py-2">
                <span className="text-sm text-[var(--primary-text)]">Last Activity</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => showToast('Sorting Asc', 'info')}
                  className="flex-1 rounded-md bg-[var(--default-button-bg)] px-3 py-2 text-sm font-medium text-[var(--primary-text)] transition-colors hover:bg-[#EBEBEB]"
                >
                  Asc
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Sorting Desc', 'info')}
                  className="flex-1 rounded-md bg-[var(--default-button-bg)] px-3 py-2 text-sm font-medium text-[var(--primary-text)] transition-colors hover:bg-[#EBEBEB]"
                >
                  Desc
                </button>
              </div>
            </div>
          </ToolbarDropdown>
          <ToolbarDropdown
            label="Filter"
            icon={<FilterIcon />}
            open={openToolbarMenu === 'filter'}
            onToggle={(e) => {
              e.stopPropagation();
              setOpenToolbarMenu((v) => (v === 'filter' ? null : 'filter'));
            }}
          >
            <div className="flex w-[280px] flex-col gap-3 px-3 py-2">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.4px] text-[var(--mobile-secondary)]">
                  Payout Status
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {(['all', 'eligible', 'processing', 'setup', 'hold', 'suspended'] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setStatusFilter(status)}
                      className={`rounded-md border px-3 py-2 text-left text-sm font-medium transition-colors ${
                        statusFilter === status
                          ? 'border-[var(--primary-text)] bg-[var(--secondary-bg)] text-[var(--primary-text)]'
                          : 'border-[var(--button-line)] text-[var(--primary-text)] hover:bg-[var(--secondary-bg)]'
                      }`}
                    >
                      {status === 'all' ? 'All Statuses' : statusLabel(status as PayoutStatus)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-md bg-[var(--secondary-bg)] px-3 py-2 text-xs text-[var(--mobile-secondary)]">
                Payout status updates in real time as settlement batches are processed.
              </div>
            </div>
          </ToolbarDropdown>
          <ToolbarDropdown
            label="Bulk Actions"
            icon={<ChevronDown className="h-4 w-4" />}
            open={openToolbarMenu === 'bulk'}
            onToggle={(e) => {
              e.stopPropagation();
              setOpenToolbarMenu((v) => (v === 'bulk' ? null : 'bulk'));
            }}
            disabled={selectedIds.size === 0}
          >
            <div className="flex w-[240px] flex-col px-3 py-2">
              <button
                type="button"
                onClick={() => {
                  showToast(`${selectedIds.size} instructors paused`, 'warning');
                  setSelectedIds(new Set());
                }}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-[var(--primary-text)] transition-colors hover:bg-[var(--secondary-bg)]"
              >
                <IconClock />
                Pause payouts
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`${selectedIds.size} instructors reactivated`, 'success');
                  setSelectedIds(new Set());
                }}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-[var(--primary-text)] transition-colors hover:bg-[var(--secondary-bg)]"
              >
                <IconRefresh />
                Resume payouts
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`${selectedIds.size} instructors exported`, 'info');
                  setSelectedIds(new Set());
                }}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-[var(--primary-text)] transition-colors hover:bg-[var(--secondary-bg)]"
              >
                <IconFile />
                Export CSV
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`${selectedIds.size} instructors notified`, 'info');
                  setSelectedIds(new Set());
                }}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-[var(--primary-text)] transition-colors hover:bg-[var(--secondary-bg)]"
              >
                <IconMail />
                Send email
              </button>
            </div>
          </ToolbarDropdown>
        </div>
      </div>

      <DataTable
        data={visibleRows}
        getRowId={(row) => row.id}
        selectable
        selectedIds={selectedIds}
        onToggleRow={(id) => toggleRow(id as number)}
        onToggleAll={(checked) => toggleSelectAll(checked)}
        allSelected={allVisibleSelected}
        someSelected={someSelected}
        tableClassName="min-w-[1080px]"
        rowClassName={(row) => (row.payoutStatus === 'suspended' ? 'opacity-70' : '')}
        columns={columns}
      />

      <div className="flex flex-col gap-4 border-t border-[var(--button-line)] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--mobile-secondary)]">
          <span>
            Showing{' '}
            <span className="font-semibold text-[var(--primary-text)]">
              {showingCount === 0 ? 0 : `1-${showingCount}`}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-[var(--primary-text)]">{totalCount}</span>{' '}
            instructors
          </span>
          <div className="flex items-center gap-1.5">
            <span>Rows per page:</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showToast('Page size options: 10, 25, 50, 100', 'info');
              }}
              className="flex items-center gap-1 rounded bg-[#f1f1f1] px-2 py-1"
            >
              <span className="font-semibold text-[var(--primary-text)]">25</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <PageBtn disabled ariaLabel="First page">
            <ChevronDblLeft />
          </PageBtn>
          <PageBtn disabled ariaLabel="Previous page">
            <ChevronLeft />
          </PageBtn>
          <PageBtn active>1</PageBtn>
          {[2, 3, 4, 5].map((n) => (
            <PageBtn key={n} onClick={() => showToast(`Navigating to page ${n}`, 'info')}>
              {n}
            </PageBtn>
          ))}
          <PageBtn ariaLabel="Next page" onClick={() => showToast('Next page', 'info')}>
            <ChevronRight />
          </PageBtn>
          <PageBtn ariaLabel="Last page" onClick={() => showToast('Last page', 'info')}>
            <ChevronDblRight />
          </PageBtn>
        </div>
      </div>
    </div>
  );
}
function ToolbarDropdown({
  label,
  icon,
  open,
  onToggle,
  disabled,
  children,
}: {
  label: string;
  icon: ReactNode;
  open: boolean;
  onToggle: (e: React.MouseEvent) => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={onToggle}
        className="inline-flex items-center gap-2 rounded-md border border-[var(--button-line)] bg-[var(--default-button-bg)] px-4 py-2 text-sm font-medium text-[var(--icon-default)] transition-colors hover:bg-[#EBEBEB] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {icon}
        {label}
        <ChevronDown className="h-4 w-4" />
      </button>
      {open ? (
        <div
          className="absolute right-0 top-[calc(100%+8px)] z-[1000] min-w-[180px] rounded-lg bg-white py-1 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

function PageBtn({
  children,
  active,
  onClick,
  ariaLabel,
  disabled,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={`flex h-8 min-w-[34px] items-center justify-center rounded-md border text-xs font-semibold transition-colors ${
        active
          ? 'border-[var(--button-glow)] bg-[var(--button-glow)] text-white'
          : 'border-[var(--button-line)] bg-white text-[var(--primary-text)] hover:bg-[var(--secondary-bg)]'
      } disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {children}
    </button>
  );
}
function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

function ChevronDblLeft() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 17L13 12L18 7" stroke="currentColor" strokeWidth={2} />
      <path d="M11 17L6 12L11 7" stroke="currentColor" strokeWidth={2} />
    </svg>
  );
}

function ChevronDblRight() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 7L11 12L6 17" stroke="currentColor" strokeWidth={2} />
      <path d="M13 7L18 12L13 17" stroke="currentColor" strokeWidth={2} />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" aria-hidden>
      <path
        fill="currentColor"
        d="M1.75 12H1V10.5H1.75H5.25H6V12H5.25H1.75ZM1.75 7.75H1V6.25H1.75H4.25H5V7.75H4.25H1.75ZM1.75 3.5H1V2H1.75H7.25H8V3.5H7.25H1.75ZM12.5303 14.7803C12.2374 15.0732 11.7626 15.0732 11.4697 14.7803L9.21967 12.5303L8.68934 12L9.75 10.9393L10.2803 11.4697L11.25 12.4393V2.75V2H12.75V2.75V12.4393L13.7197 11.4697L14.25 10.9393L15.3107 12L14.7803 12.5303L12.5303 14.7803Z"
      />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 512 512" aria-hidden>
      <path
        fill="currentColor"
        d="M0 416c0 13.3 10.7 24 24 24l59.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 440c13.3 0 24-10.7 24-24s-10.7-24-24-24l-251.7 0c-10.2 32.5-40.5 56-76.3 56s-66.1-23.5-76.3-56L24 392c-13.3 0-24 10.7-24 24zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-35.8 0-66.1 23.5-76.3 56L24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l251.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56l59.7 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-59.7 0c-10.2-32.5-40.5-56-76.3-56zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm76.3-56C258.1 39.5 227.8 16 192 16s-66.1 23.5-76.3 56L24 72C10.7 72 0 82.7 0 96s10.7 24 24 24l91.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 120c13.3 0 24-10.7 24-24s-10.7-24-24-24L268.3 72z"
      />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M5.83 8.06c0-.59.23-1.15.65-1.57.42-.42.98-.65 1.57-.65h7.22c.29 0 .58.06.85.17.27.11.51.28.71.48.2.21.36.45.48.72.11.27.17.56.17.85v7.22c0 .29-.06.58-.17.85-.11.27-.28.51-.48.71-.21.2-.45.36-.72.48-.27.11-.56.17-.85.17H8.05c-.29 0-.58-.06-.85-.17-.27-.11-.51-.28-.71-.48-.2-.21-.36-.45-.48-.72-.11-.27-.17-.56-.17-.85V8.06Z"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <path
        d="M3.34 13.95a2 2 0 0 1-.84-1.45V4.17C2.5 3.25 3.25 2.5 4.17 2.5H12.5c.62 0 .97.32 1.25.83"
        stroke="currentColor"
        strokeWidth={1.5}
      />
    </svg>
  );
}
function IconUserRound() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconDollar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M3 3v18h18" />
      <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
    </svg>
  );
}

function IconUserCircle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" />
      <path d="M20.59 22c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function IconCard() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function IconSliders() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  );
}

function IconDollarSm() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function IconRefresh() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M23 4v6h-6M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

function IconFile() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22 6 12 13 2 6" />
    </svg>
  );
}

function IconBan() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  );
}
