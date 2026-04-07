'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

type PayoutStatus = 'eligible' | 'setup' | 'processing' | 'hold' | 'suspended';

type Instructor = {
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

const STATS = [
  {
    id: 'instructors',
    title: 'Approved Instructors',
    value: '248',
    trend: { value: '+5.2%', type: 'positive' as const },
    icon: <StatInstructorsIcon />,
  },
  {
    id: 'products',
    title: 'Active Products',
    value: '1,892',
    trend: { value: '+12.4%', type: 'positive' as const },
    icon: <StatGridIcon />,
  },
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: '$4.2M',
    trend: { value: '+8.5%', type: 'positive' as const },
    icon: <StatRevenueIcon />,
  },
  {
    id: 'pending',
    title: 'Pending Payouts',
    value: '$12,450',
    trend: { value: 'Due 15th', type: 'neutral' as const },
    icon: <StatPendingIcon />,
  },
];

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

export default function InstructorsPageClient() {
  const [search, setSearch] = useState('');
  const [searchFieldsOpen, setSearchFieldsOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState<SearchFieldKey[]>(['name']);
  const [openToolbarMenu, setOpenToolbarMenu] = useState<
    null | 'sort' | 'filter' | 'bulk'
  >(null);
  const [rowMenuId, setRowMenuId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<PayoutStatus | 'all'>('all');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    visible: boolean;
  }>({ message: '', type: 'success', visible: false });

  /** Search + Sort/Filter/Bulk popovers (must exclude table so outside-click closes toolbars) */
  const toolbarPopoversRef = useRef<HTMLDivElement>(null);

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
      setToast({ message, type, visible: true });
      window.setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
    },
    [],
  );

  // Capture phase: runs before table buttons/checkboxes call stopPropagation(), so outside clicks still close popovers.
  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      const t = e.target;
      if (!(t instanceof Node)) return;
      if (toolbarPopoversRef.current?.contains(t)) return;
      setSearchFieldsOpen(false);
      setOpenToolbarMenu(null);
      const el = t instanceof Element ? t : t.parentElement;
      if (el?.closest('[data-instructors-row-actions]')) {
        return;
      }
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
    return INSTRUCTORS.filter((row) => {
      if (statusFilter !== 'all' && row.payoutStatus !== statusFilter) return false;
      if (!q) return true;
      return selectedFields.some((field) => {
        switch (field) {
          case 'name':
            return row.name.toLowerCase().includes(q);
          case 'email':
            return row.email.toLowerCase().includes(q);
          case 'id':
            return (
              row.internalId.toLowerCase().includes(q) ||
              row.lwId.toLowerCase().includes(q)
            );
          case 'status':
            return statusLabel(row.payoutStatus).toLowerCase().includes(q);
          default:
            return false;
        }
      });
    });
  }, [search, selectedFields, statusFilter]);

  const allVisibleSelected =
    visibleRows.length > 0 && visibleRows.every((r) => selectedIds.has(r.id));

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        visibleRows.forEach((r) => next.delete(r.id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        visibleRows.forEach((r) => next.add(r.id));
        return next;
      });
    }
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

  const toastBg =
    toast.type === 'success'
      ? 'bg-[var(--success-color)]'
      : toast.type === 'error'
        ? 'bg-[var(--danger-color)]'
        : toast.type === 'warning'
          ? 'bg-[var(--warning-color)]'
          : 'bg-[var(--info-color)]';

  return (
    <div className="min-h-full p-5">
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-[var(--primary-text)]">
            All Instructors
          </h1>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showToast('New Instructor invite modal opening...', 'info');
            }}
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

        <div className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {STATS.map((s) => (
            <div
              key={s.id}
              className="relative flex items-center rounded-lg bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
            >
              <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--secondary-bg)] text-[var(--icon-default)]">
                {s.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="mb-1 truncate text-sm text-[var(--mobile-secondary)]">
                  {s.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xl font-semibold text-[var(--primary-text)]">
                    {s.value}
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-xs font-medium whitespace-nowrap ${
                      s.trend.type === 'positive'
                        ? 'bg-[rgba(82,196,26,0.1)] text-[#52C41A]'
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
                  <path
                    d="M21 21L16.65 16.65"
                    stroke="currentColor"
                    strokeWidth={2}
                  />
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
                      <path
                        d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
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
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 ${
                              sel
                                ? 'border-[var(--button-glow)] bg-[var(--button-glow)]'
                                : 'border-[var(--button-line)] bg-white'
                            }`}
                          >
                            {sel ? (
                              <span className="mb-0.5 ml-px block h-2 w-1 rotate-45 border-2 border-white border-t-0 border-l-0" />
                            ) : null}
                          </span>
                          {f.label}
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
              <ToolbarDropdown
                label="Sort"
                icon={<SortIcon />}
                open={openToolbarMenu === 'sort'}
                onToggle={(e) => {
                  e.stopPropagation();
                  setOpenToolbarMenu((m) => (m === 'sort' ? null : 'sort'));
                }}
              >
                {[
                  'Name (A-Z)',
                  'Name (Z-A)',
                  'Revenue (High-Low)',
                  'Revenue (Low-High)',
                  'Date Approved (Newest)',
                  'Date Approved (Oldest)',
                  'Products (High-Low)',
                ].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="block w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--secondary-bg)]"
                    onClick={() => {
                      showToast(`Sorting by: ${t}`, 'info');
                      setOpenToolbarMenu(null);
                    }}
                  >
                    {t}
                  </button>
                ))}
              </ToolbarDropdown>

              <ToolbarDropdown
                label="Filter"
                icon={<FilterIcon />}
                open={openToolbarMenu === 'filter'}
                onToggle={(e) => {
                  e.stopPropagation();
                  setOpenToolbarMenu((m) => (m === 'filter' ? null : 'filter'));
                }}
              >
                {(
                  [
                    ['eligible', 'Payout Eligible'],
                    ['setup', 'Pending Setup'],
                    ['hold', 'On Hold'],
                    ['suspended', 'Suspended'],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    className="block w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--secondary-bg)]"
                    onClick={() => {
                      setStatusFilter(key);
                      showToast(`Filtered by: ${label}`, 'info');
                      setOpenToolbarMenu(null);
                    }}
                  >
                    {label}
                  </button>
                ))}
                <div className="my-1 h-px bg-[var(--button-line)]" />
                <button
                  type="button"
                  className="block w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--secondary-bg)]"
                  onClick={() => {
                    setStatusFilter('all');
                    showToast('Showing all instructors', 'info');
                    setOpenToolbarMenu(null);
                  }}
                >
                  Show all
                </button>
              </ToolbarDropdown>

              <ToolbarDropdown
                label="Bulk Actions"
                icon={null}
                disabled={selectedIds.size === 0}
                open={openToolbarMenu === 'bulk'}
                onToggle={(e) => {
                  e.stopPropagation();
                  if (selectedIds.size === 0) return;
                  setOpenToolbarMenu((m) => (m === 'bulk' ? null : 'bulk'));
                }}
              >
                {[
                  'Adjust Commission',
                  'Initiate Payout',
                  'Suspend',
                  'Export CSV',
                ].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="block w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--secondary-bg)]"
                    onClick={() => {
                      showToast(
                        `${t} would apply to ${selectedIds.size} selected`,
                        'info',
                      );
                      setOpenToolbarMenu(null);
                    }}
                  >
                    {t}
                  </button>
                ))}
              </ToolbarDropdown>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="w-[50px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold tracking-wide text-[var(--icon-default)] uppercase">
                    <div className="flex justify-center">
                      <Checkbox
                        checked={allVisibleSelected}
                        onToggle={(e) => {
                          e.stopPropagation();
                          toggleSelectAll();
                        }}
                      />
                    </div>
                  </th>
                  {[
                    ['Instructor', 'w-[220px]'],
                    ['IDs', 'w-[120px]'],
                    ['Appr. Date', 'w-[100px]'],
                    ['PRODS.', 'w-[80px]'],
                    ['Total Sales', 'w-[110px]'],
                    ['Payout Status', 'w-[120px]'],
                    ['Last Payout', 'w-[130px]'],
                    ['Pending', 'w-[100px]'],
                    ['VIEW', 'w-[130px]'],
                    ['LINKED TO', 'w-[150px]'],
                    ['ACTIONS', 'w-[60px]'],
                  ].map(([label, w]) => (
                    <th
                      key={String(label)}
                      className={`${w} border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold tracking-wide text-[var(--icon-default)] uppercase`}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row) => {
                  const suspended = row.payoutStatus === 'suspended';
                  const checked = selectedIds.has(row.id);
                  return (
                    <tr
                      key={row.id}
                      className={`hover:bg-[var(--secondary-bg)] ${suspended ? 'opacity-70' : ''}`}
                    >
                      <td className="border-b border-[var(--button-line)] px-4 py-3 align-middle">
                        <div className="flex justify-center">
                          <Checkbox
                            checked={checked}
                            onToggle={(e) => {
                              e.stopPropagation();
                              toggleRow(row.id);
                            }}
                          />
                        </div>
                      </td>
                      <td className="border-b border-[var(--button-line)] px-4 py-3 align-middle text-sm text-[var(--primary-text)]">
                        <div className="flex items-center">
                          <Image
                            src={row.avatar}
                            alt=""
                            width={40}
                            height={40}
                            className={`mr-3 h-10 w-10 shrink-0 rounded-full object-cover bg-[var(--secondary-bg)] ${suspended ? 'grayscale' : ''}`}
                          />
                          <div className="min-w-0">
                            <div className="truncate font-medium">{row.name}</div>
                            <button
                              type="button"
                              className="group/email flex max-w-full items-center gap-1 text-left text-xs text-[var(--mobile-secondary)] hover:text-[var(--button-glow)]"
                              onClick={(e) => {
                                e.stopPropagation();
                                copyText(row.email, 'Email copied to clipboard!');
                              }}
                            >
                              <span className="truncate">{row.email}</span>
                              <CopyIcon className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover/email:opacity-100" />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="border-b border-[var(--button-line)] px-4 py-3 align-middle font-mono text-xs">
                        <div className="flex flex-col gap-0.5">
                          <button
                            type="button"
                            className="group/id flex w-fit items-center gap-1 text-[var(--primary-text)] hover:text-[var(--button-glow)]"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyText(row.internalId, 'ID copied to clipboard!');
                            }}
                          >
                            {row.internalId}
                            <CopyIcon className="h-3 w-3 opacity-0 group-hover/id:opacity-100" />
                          </button>
                          <button
                            type="button"
                            className="group/id2 flex w-fit items-center gap-1 text-[var(--mobile-secondary)] hover:text-[var(--button-glow)]"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyText(row.lwId, 'ID copied to clipboard!');
                            }}
                          >
                            {row.lwId}
                            <CopyIcon className="h-3 w-3 opacity-0 group-hover/id2:opacity-100" />
                          </button>
                        </div>
                      </td>
                      <td className="border-b border-[var(--button-line)] px-4 py-3 align-middle text-sm">
                        {row.approvedDate}
                      </td>
                      <td className="border-b border-[var(--button-line)] px-4 py-3 align-middle text-sm">
                        <span className="group/prod relative inline-flex cursor-default">
                          {row.products.total}
                          <span className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--primary-text)] px-2.5 py-1.5 text-xs leading-snug text-white opacity-0 shadow-lg transition-all group-hover/prod:visible group-hover/prod:opacity-100">
                            Courses: {row.products.courses}
                            <br />
                            Events: {row.products.events}
                            <br />
                            Bundles: {row.products.bundles}
                          </span>
                        </span>
                      </td>
                      <td className="border-b border-[var(--button-line)] px-4 py-3 align-middle text-sm">
                        <span className="money-text font-medium text-[var(--primary-text)]">
                          {row.totalSales}
                        </span>
                      </td>
                      <td className="border-b border-[var(--button-line)] px-4 py-3 align-middle">
                        <span
                          className={`inline-block rounded-xl px-2.5 py-1 text-[11px] font-semibold uppercase ${statusClass(row.payoutStatus)}`}
                        >
                          {statusLabel(row.payoutStatus)}
                        </span>
                      </td>
                      <td className="border-b border-[var(--button-line)] px-4 py-3 align-middle text-sm">
                        <span className="font-medium">{row.lastPayout.amount}</span>
                        <span className="mt-0.5 block text-[11px] text-[var(--mobile-secondary)]">
                          {row.lastPayout.date}
                        </span>
                      </td>
                      <td className="border-b border-[var(--button-line)] px-4 py-3 align-middle text-sm">
                        <span
                          className={`font-medium ${row.pending !== '—' ? 'text-[var(--warning-color)]' : ''}`}
                        >
                          {row.pending}
                        </span>
                      </td>
                      <td className="border-b border-[var(--button-line)] px-4 py-3 align-middle">
                        <div className="flex flex-wrap gap-1.5">
                          <ViewIconBtn
                            label="Instructor Details"
                            onClick={() =>
                              showToast('Opening Instructor Details', 'info')
                            }
                          >
                            <IconUserRound />
                          </ViewIconBtn>
                          <ViewIconBtn
                            label="Financial"
                            onClick={() => showToast('Opening Financial', 'info')}
                          >
                            <IconDollar />
                          </ViewIconBtn>
                          <ViewIconBtn
                            label="Performance Stats"
                            onClick={() =>
                              showToast('Opening Performance Stats', 'info')
                            }
                          >
                            <IconChart />
                          </ViewIconBtn>
                        </div>
                      </td>
                      <td className="border-b border-[var(--button-line)] px-4 py-3 align-middle">
                        <div className="flex flex-wrap gap-1.5">
                          <ViewIconBtn
                            label="User Profile"
                            onClick={() => showToast('Opening User Profile', 'info')}
                          >
                            <IconUserCircle />
                          </ViewIconBtn>
                          <ViewIconBtn
                            label="Owned Products"
                            onClick={() =>
                              showToast('Opening Owned Products', 'info')
                            }
                          >
                            <IconBook />
                          </ViewIconBtn>
                          <ViewIconBtn
                            label="Transactions"
                            onClick={() =>
                              showToast('Opening Transactions', 'info')
                            }
                          >
                            <IconCard />
                          </ViewIconBtn>
                          <ViewIconBtn
                            label="Payout History"
                            onClick={() =>
                              showToast('Opening Payout History', 'info')
                            }
                          >
                            <IconClock />
                          </ViewIconBtn>
                        </div>
                      </td>
                      <td className="border-b border-[var(--button-line)] px-4 py-3 align-middle">
                        <div className="relative" data-instructors-row-actions>
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-[var(--secondary-bg)]"
                            aria-label="Row actions"
                            onClick={(e) => {
                              e.stopPropagation();
                              setRowMenuId((id) => (id === row.id ? null : row.id));
                            }}
                          >
                            <svg
                              className="text-[var(--mobile-secondary)]"
                              viewBox="0 0 24 24"
                              width={18}
                              height={18}
                              aria-hidden
                            >
                              <circle cx="12" cy="12" r="2" fill="currentColor" />
                              <circle cx="12" cy="5" r="2" fill="currentColor" />
                              <circle cx="12" cy="19" r="2" fill="currentColor" />
                            </svg>
                          </button>
                          {rowMenuId === row.id ? (
                            <div
                              className="absolute right-0 top-[calc(100%+8px)] z-[1000] min-w-[200px] rounded-lg bg-white py-1 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {[
                                ['adjust', 'Adjust Commission', <IconSliders key="a" />],
                                ['payout', 'Initiate Payout', <IconDollarSm key="b" />],
                                ['sync', 'Force Sync', <IconRefresh key="c" />],
                                ['audit', 'Audit Logs', <IconFile key="d" />],
                                ['msg', 'Communicate', <IconMail key="e" />],
                              ].map(([k, label, icon]) => (
                                <button
                                  key={String(k)}
                                  type="button"
                                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm hover:bg-[var(--secondary-bg)]"
                                  onClick={() => {
                                    showToast(
                                      `${label} for ${row.name}`,
                                      'info',
                                    );
                                    setRowMenuId(null);
                                  }}
                                >
                                  <span className="text-[var(--icon-default)]">
                                    {icon}
                                  </span>
                                  {label}
                                </button>
                              ))}
                              <div className="my-1 h-px bg-[var(--button-line)]" />
                              <button
                                type="button"
                                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-[var(--danger-color)] hover:bg-[var(--secondary-bg)]"
                                onClick={() => {
                                  showToast(
                                    `${suspended ? 'Unsuspend' : 'Suspend'} for ${row.name}`,
                                    'info',
                                  );
                                  setRowMenuId(null);
                                }}
                              >
                                <IconBan />
                                {suspended ? 'Unsuspend' : 'Suspend'}
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-[var(--button-line)] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--mobile-secondary)]">
              <span>
                Showing{' '}
                <span className="font-semibold text-[var(--primary-text)]">1-5</span>{' '}
                of{' '}
                <span className="font-semibold text-[var(--primary-text)]">248</span>{' '}
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
                <PageBtn
                  key={n}
                  onClick={() =>
                    showToast(`Navigating to page ${n}`, 'info')
                  }
                >
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

      </div>

      <div
        className={`fixed right-4 top-4 z-[2000] flex items-center gap-2 rounded-md px-4 py-3 text-sm text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 ${
          toast.visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-5 opacity-0'
        } ${toastBg}`}
        role="status"
      >
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <path
            d="M7.75 12L10.58 14.83L16.25 9.17004"
            stroke="currentColor"
            strokeWidth={1.5}
          />
        </svg>
        <span>{toast.message}</span>
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

function Checkbox({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      className={`inline-flex h-[18px] w-[18px] items-center justify-center rounded border-2 transition-colors ${
        checked
          ? 'border-[var(--button-glow)] bg-[var(--button-glow)]'
          : 'border-[var(--button-line)] bg-white'
      }`}
    >
      {checked ? (
        <span className="mb-0.5 ml-px block h-2.5 w-1.5 rotate-45 border-2 border-white border-t-0 border-l-0" />
      ) : null}
    </button>
  );
}

function ViewIconBtn({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="group/v relative flex h-7 w-7 items-center justify-center rounded-full bg-[var(--secondary-bg)] text-[var(--icon-default)] transition-all hover:-translate-y-0.5 hover:bg-[var(--button-glow)] hover:text-white"
    >
      <span className="h-3.5 w-3.5 [&_svg]:h-full [&_svg]:w-full">{children}</span>
      <span className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--primary-text)] px-2.5 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover/v:opacity-100">
        {label}
      </span>
    </button>
  );
}

function PageBtn({
  children,
  active,
  disabled,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={`flex h-8 w-8 items-center justify-center rounded-md border text-sm transition-colors ${
        active
          ? 'border-[var(--button-glow)] bg-[var(--button-glow)] text-white'
          : 'border-[var(--button-line)] bg-white text-[var(--primary-text)] hover:bg-[var(--secondary-bg)]'
      } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {children}
    </button>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6L15 12L9 18"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
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
        d="M0 416c0 13.3 10.7 24 24 24l59.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 440c13.3 0 24-10.7 24-24s-10.7-24-24-24l-251.7 0c-10.2-32.5-40.5-56-76.3-56s-66.1 23.5-76.3 56L24 392c-13.3 0-24 10.7-24 24zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-35.8 0-66.1 23.5-76.3 56L24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l251.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56l59.7 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-59.7 0c-10.2-32.5-40.5-56-76.3-56zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm76.3-56C258.1 39.5 227.8 16 192 16s-66.1 23.5-76.3 56L24 72C10.7 72 0 82.7 0 96s10.7 24 24 24l91.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 120c13.3 0 24-10.7 24-24s-10.7-24-24-24L268.3 72z"
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
