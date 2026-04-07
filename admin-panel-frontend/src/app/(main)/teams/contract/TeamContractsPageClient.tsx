'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type SearchField = 'contract' | 'manager' | 'model' | 'status';
type ContractModel = 'fixed' | 'credits' | 'sub';
type ContractStatus = 'active' | 'expired' | 'expiring';

type Scope =
  | { type: 'catalog'; count: null; items: [] }
  | { type: 'plan'; count: null; items: string[] }
  | { type: 'courses'; count: number; items: string[] };

type Contract = {
  id: number;
  contractId: string;
  name: string;
  manager: {
    name: string;
    email: string;
    avatar: string;
    userId: string;
  };
  secondaryManagers: { name: string; avatar: string }[];
  model: ContractModel;
  utilization: { used: number; total: number; percent: number };
  scope: Scope;
  status: ContractStatus;
  expiry: string;
  expiryDays: number | null;
};

const INITIAL_CONTRACTS: Contract[] = [
  {
    id: 1,
    contractId: 'CTR-8FJ39K2L',
    name: 'Acme Corp - Q1',
    manager: {
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@acme.com',
      avatar: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png',
      userId: 'USR-8FJ39K2L',
    },
    secondaryManagers: [
      { name: 'John Smith', avatar: 'https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png' },
      { name: 'Emily Chen', avatar: 'https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg' },
    ],
    model: 'fixed',
    utilization: { used: 8, total: 10, percent: 80 },
    scope: { type: 'courses', count: 2, items: ['Intro to UX Design', 'Advanced Figma Masterclass'] },
    status: 'active',
    expiry: 'Dec 31, 2024',
    expiryDays: 45,
  },
  {
    id: 2,
    contractId: 'CTR-9XM45RN7',
    name: 'TechStart - Flex',
    manager: {
      name: 'Mike Ross',
      email: 'mike.ross@techstart.io',
      avatar: 'https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png',
      userId: 'USR-9XM45RN7',
    },
    secondaryManagers: [],
    model: 'credits',
    utilization: { used: 150, total: 500, percent: 30 },
    scope: { type: 'catalog', count: null, items: [] },
    status: 'active',
    expiry: 'Never',
    expiryDays: null,
  },
  {
    id: 3,
    contractId: 'CTR-7JK2L3P9',
    name: 'Design Co - Monthly',
    manager: {
      name: 'Elena Rodriguez',
      email: 'elena.r@designco.com',
      avatar: 'https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg',
      userId: 'USR-7JK2L3P9',
    },
    secondaryManagers: [
      { name: 'Tom Wilson', avatar: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png' },
      { name: 'Amy Parker', avatar: 'https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png' },
      { name: 'David Lee', avatar: 'https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg' },
    ],
    model: 'sub',
    utilization: { used: 20, total: 20, percent: 100 },
    scope: { type: 'plan', count: null, items: ['Gold Plan'] },
    status: 'expiring',
    expiry: 'Jan 15, 2025',
    expiryDays: 25,
  },
  {
    id: 4,
    contractId: 'CTR-4MN8Q5R2',
    name: 'Enterprise Plus',
    manager: {
      name: 'David Wilson',
      email: 'dwilson@enterprise.com',
      avatar: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png',
      userId: 'USR-4MN8Q5R2',
    },
    secondaryManagers: [{ name: 'Rachel Green', avatar: 'https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg' }],
    model: 'fixed',
    utilization: { used: 45, total: 100, percent: 45 },
    scope: {
      type: 'courses',
      count: 5,
      items: [
        'Leadership 101',
        'Project Management',
        'Agile Fundamentals',
        'Team Communication',
        'Remote Work Best Practices',
      ],
    },
    status: 'active',
    expiry: 'Mar 31, 2025',
    expiryDays: 100,
  },
  {
    id: 5,
    contractId: 'CTR-3TY9P6Q8',
    name: 'Startup Bundle',
    manager: {
      name: 'Lisa Thompson',
      email: 'lisa.t@startup.co',
      avatar: 'https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg',
      userId: 'USR-3TY9P6Q8',
    },
    secondaryManagers: [],
    model: 'credits',
    utilization: { used: 80, total: 200, percent: 40 },
    scope: { type: 'catalog', count: null, items: [] },
    status: 'expired',
    expiry: 'Nov 30, 2024',
    expiryDays: -15,
  },
];

type SortKey =
  | 'name-asc'
  | 'name-desc'
  | 'expiry-soon'
  | 'expiry-late'
  | 'utilization-high'
  | 'utilization-low';

const SEARCH_FIELD_LABELS: Record<SearchField, string> = {
  contract: 'Contract (Name & ID)',
  manager: 'Manager',
  model: 'Model',
  status: 'Status',
};

function getModelClass(model: ContractModel) {
  const map: Record<ContractModel, string> = {
    fixed: 'bg-[#E6F7FF] text-[#1890FF]',
    credits: 'bg-[#F9F0FF] text-[#722ED1]',
    sub: 'bg-[#FFF7E6] text-[#FA8C16]',
  };
  return map[model];
}

function getModelText(model: ContractModel) {
  const map: Record<ContractModel, string> = {
    fixed: 'Fixed',
    credits: 'Credits',
    sub: 'Sub',
  };
  return map[model];
}

function getStatusClass(status: ContractStatus) {
  const map: Record<ContractStatus, string> = {
    active: 'bg-[#d3f8df] text-[#085c37]',
    expired: 'bg-[rgba(102,102,102,0.1)] text-[#666666]',
    expiring: 'bg-[rgba(250,173,20,0.1)] text-[#FA8C16]',
  };
  return map[status];
}

function getStatusText(status: ContractStatus) {
  const map: Record<ContractStatus, string> = {
    active: 'Active',
    expired: 'Expired',
    expiring: 'Expiring',
  };
  return map[status];
}

function getProgressTone(percent: number) {
  if (percent >= 70) return 'bg-[var(--success-color)]';
  if (percent >= 40) return 'bg-[var(--warning-color)]';
  return 'bg-[var(--danger-color)]';
}

function IconCopy({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" aria-hidden>
      <path
        stroke="#333333"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5.83203 8.05648C5.83203 7.46704 6.06619 6.90174 6.48299 6.48494C6.89979 6.06814 7.46509 5.83398 8.05453 5.83398H15.2762C15.8571 5.83398 16.6414 6.27856 16.8477 6.48494C17.4987 7.76462 17.4987 8.05648V15.2782C17.4987 15.859 17.0541 16.6433 16.8477 16.8497C16.6414 17.0561 16.3964 17.2198 16.1267 17.3315C15.8571 17.4432 15.5681 17.5007 15.2762 17.5007H8.05453C7.47366 17.5007 6.68936 17.0561 6.48299 16.8497C6.27661 16.6433 6.1129 16.3983 6.00121 16.1287C5.88952 15.859 5.83203 15.57 5.83203 15.2782V8.05648Z"
      />
      <path
        stroke="#333333"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3.34333 13.9475C3.08779 13.8018 2.87523 13.5912 2.72715 13.3371C2.57906 13.0829 2.50071 12.7942 2.5 12.5V4.16667C2.5 3.25 3.25 2.5 4.16667 2.5H12.5C13.125 2.5 13.465 2.82083 13.75 3.33333"
      />
    </svg>
  );
}

export default function TeamContractsPageClient() {
  const [contracts] = useState<Contract[]>(INITIAL_CONTRACTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFields, setSelectedFields] = useState<SearchField[]>(['contract']);
  const [searchFieldsOpen, setSearchFieldsOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [rowMenuId, setRowMenuId] = useState<number | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('name-asc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 3000);
  }, []);

  useEffect(() => {
    const onDocClick = () => {
      setSearchFieldsOpen(false);
      setSortOpen(false);
      setFilterOpen(false);
      setBulkOpen(false);
      setRowMenuId(null);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const stats = useMemo(() => {
    const active = contracts.filter((c) => c.status === 'active').length;
    const expiringSoon = contracts.filter((c) => c.status === 'expiring').length;
    const avgUtil =
      contracts.length === 0
        ? 0
        : Math.round(contracts.reduce((a, c) => a + c.utilization.percent, 0) / contracts.length);
    return {
      active,
      expiringSoon,
      utilization: avgUtil,
      mrr: '$14,200',
    };
  }, [contracts]);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return contracts.filter((c) => {
      if (!q) return true;
      return selectedFields.some((field) => {
        switch (field) {
          case 'contract':
            return (
              c.name.toLowerCase().includes(q) || c.contractId.toLowerCase().includes(q)
            );
          case 'manager':
            return (
              c.manager.name.toLowerCase().includes(q) ||
              c.manager.email.toLowerCase().includes(q)
            );
          case 'model':
            return getModelText(c.model).toLowerCase().includes(q);
          case 'status':
            return getStatusText(c.status).toLowerCase().includes(q);
          default:
            return false;
        }
      });
    });
  }, [contracts, searchTerm, selectedFields]);

  const sorted = useMemo(() => {
    const rows = [...filtered];
    const expSort = (a: Contract, b: Contract, soonFirst: boolean) => {
      const da = a.expiryDays ?? 99999;
      const db = b.expiryDays ?? 99999;
      return soonFirst ? da - db : db - da;
    };
    rows.sort((a, b) => {
      switch (sortKey) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'expiry-soon':
          return expSort(a, b, true);
        case 'expiry-late':
          return expSort(a, b, false);
        case 'utilization-high':
          return b.utilization.percent - a.utilization.percent;
        case 'utilization-low':
          return a.utilization.percent - b.utilization.percent;
        default:
          return 0;
      }
    });
    return rows;
  }, [filtered, sortKey]);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, safePage, pageSize]);

  const startIdx = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endIdx = Math.min(safePage * pageSize, total);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedFields, sortKey]);

  const toggleField = (field: SearchField) => {
    setSelectedFields((prev) => {
      if (prev.includes(field)) {
        if (prev.length <= 1) return prev;
        return prev.filter((f) => f !== field);
      }
      return [...prev, field];
    });
  };

  const fieldsSummary = useMemo(() => {
    if (selectedFields.length === 1) {
      const f = selectedFields[0];
      return f === 'contract' ? 'CONTRACT' : f.toUpperCase();
    }
    if (selectedFields.length <= 2) {
      return selectedFields.map((f) => f.charAt(0).toUpperCase()).join(', ');
    }
    return `${selectedFields.length} FIELDS`;
  }, [selectedFields]);

  const allVisibleSelected =
    paginated.length > 0 && paginated.every((c) => selectedIds.has(c.id));
  const someSelected = paginated.some((c) => selectedIds.has(c.id));

  const toggleSelectAllVisible = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) {
        paginated.forEach((c) => next.delete(c.id));
      } else {
        paginated.forEach((c) => next.add(c.id));
      }
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

  const selectedCount = selectedIds.size;

  const copyText = (text: string, okMessage: string) => {
    void navigator.clipboard.writeText(text).then(() => showToast(okMessage, 'success'));
  };

  return (
    <div className="min-h-screen bg-[var(--dashboard-bg)] p-5 text-[var(--primary-text)]">
      <div className="mx-auto max-w-[1600px]">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-[var(--primary-text)]">Team Contracts</h1>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--button-line)] bg-[var(--default-button-bg)] px-4 py-2 text-sm font-medium text-[var(--icon-default)] transition-colors hover:bg-[#ebebeb]"
              onClick={() => showToast('Exporting contracts to CSV...', 'info')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export CSV
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--button-glow)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#3A7BAF]"
              onClick={() => showToast('Opening new contract form...', 'info')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              New Contract
            </button>
          </div>
        </header>

        <div className="mb-6 grid grid-cols-1 gap-4 min-[1200px]:grid-cols-4">
          <StatCard
            title="Active Contracts"
            value={String(stats.active)}
            trend={{ value: '+3', tone: 'positive' }}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M9 15l2 2 4-4" />
              </svg>
            }
          />
          <StatCard
            title="Expiring Soon"
            value={String(stats.expiringSoon)}
            trend={{ value: '30 days', tone: 'warning' }}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            }
          />
          <StatCard
            title="Seat Utilization"
            value={`${stats.utilization}%`}
            trend={{ value: '+4.2%', tone: 'positive' }}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path d="M18 20V10" />
                <path d="M12 20V4" />
                <path d="M6 20v-6" />
              </svg>
            }
          />
          <StatCard
            title="Team MRR"
            value={stats.mrr}
            trend={{ value: '+5.4%', tone: 'positive' }}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            }
          />
        </div>

        <div className="mb-6 overflow-hidden rounded-lg bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
          <div className="flex flex-col flex-wrap items-stretch justify-between gap-3 p-4 md:flex-row md:items-center">
            <div className="relative flex w-full max-w-[420px] overflow-visible rounded-md border border-[var(--button-line)] bg-white md:w-[420px]">
              <div className="relative flex min-w-0 flex-1 items-center">
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--mobile-secondary)]"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" />
                </svg>
                <input
                  type="text"
                  placeholder="Search contracts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border-0 bg-transparent py-2.5 pl-10 pr-3 text-sm text-[var(--primary-text)] outline-none placeholder:text-[var(--mobile-secondary)]"
                />
              </div>
              <div className="relative shrink-0">
                <button
                  type="button"
                  className="flex h-full min-w-[140px] items-center justify-between gap-2 border-l border-[var(--button-line)] bg-[#fafafa] px-3 py-2 text-left hover:bg-[#f0f0f0]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchFieldsOpen((v) => !v);
                  }}
                >
                  <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-[var(--icon-default)]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {fieldsSummary}
                  </span>
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none">
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
                {searchFieldsOpen ? (
                  <div
                    className="absolute right-0 top-[calc(100%+4px)] z-[1000] min-w-[200px] animate-fade-in rounded-lg bg-white py-2 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {(Object.keys(SEARCH_FIELD_LABELS) as SearchField[]).map((field) => {
                      const selected = selectedFields.includes(field);
                      return (
                        <button
                          key={field}
                          type="button"
                          className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm hover:bg-[var(--secondary-bg)]"
                          onClick={() => toggleField(field)}
                        >
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 ${
                              selected
                                ? 'border-[var(--button-glow)] bg-[var(--button-glow)]'
                                : 'border-[var(--button-line)]'
                            }`}
                          >
                            {selected ? (
                              <span className="mb-0.5 block h-2 w-1 rotate-45 border-2 border-white border-l-0 border-t-0" />
                            ) : null}
                          </span>
                          {SEARCH_FIELD_LABELS[field]}
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Dropdown
                open={sortOpen}
                onOpenToggle={() => {
                  setSortOpen((v) => !v);
                  setFilterOpen(false);
                  setBulkOpen(false);
                }}
                label="Sort"
                icon={
                  <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.75 12H1V10.5H1.75H5.25H6V12H5.25H1.75ZM1.75 7.75H1V6.25H1.75H4.25H5V7.75H4.25H1.75ZM1.75 3.5H1V2H1.75H7.25H8V3.5H7.25H1.75ZM12.5303 14.7803C12.2374 15.0732 11.7626 15.0732 11.4697 14.7803L9.21967 12.5303L8.68934 12L9.75 10.9393L10.2803 11.4697L11.25 12.4393V2.75V2H12.75V2.75V12.4393L13.7197 11.4697L14.25 10.9393L15.3107 12L14.7803 12.5303L12.5303 14.7803Z"
                    />
                  </svg>
                }
              >
                {(
                  [
                    ['name-asc', 'Contract Name (A-Z)'],
                    ['name-desc', 'Contract Name (Z-A)'],
                    ['expiry-soon', 'Expiry (Soonest First)'],
                    ['expiry-late', 'Expiry (Latest First)'],
                    ['utilization-high', 'Utilization (High to Low)'],
                    ['utilization-low', 'Utilization (Low to High)'],
                  ] as [SortKey, string][]
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    className="flex w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--secondary-bg)]"
                    onClick={() => {
                      setSortKey(key);
                      setSortOpen(false);
                      showToast(`Sorting by: ${label}`, 'info');
                    }}
                  >
                    {label}
                  </button>
                ))}
              </Dropdown>

              <Dropdown
                open={filterOpen}
                onOpenToggle={() => {
                  setFilterOpen((v) => !v);
                  setSortOpen(false);
                  setBulkOpen(false);
                }}
                label="Filter"
                icon={
                  <svg viewBox="0 0 512 512" className="h-4 w-4" aria-hidden>
                    <path
                      fill="currentColor"
                      d="M0 416c0 13.3 10.7 24 24 24l59.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 440c13.3 0 24-10.7 24-24s-10.7-24-24-24l-251.7 0c-10.2-32.5-40.5-56-76.3-56s-66.1 23.5-76.3 56L24 392c-13.3 0-24 10.7-24 24zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-35.8 0-66.1 23.5-76.3 56L24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l251.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56l59.7 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-59.7 0c-10.2-32.5-40.5-56-76.3-56zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm76.3-56C258.1 39.5 227.8 16 192 16s-66.1 23.5-76.3 56L24 72C10.7 72 0 82.7 0 96s10.7 24 24 24l91.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 120c13.3 0 24-10.7 24-24s-10.7-24-24-24L268.3 72z"
                    />
                  </svg>
                }
              >
                {(['Status', 'Model Type', 'Expiry Date', 'Utilization Range'] as const).map((label) => (
                  <button
                    key={label}
                    type="button"
                    className="flex w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--secondary-bg)]"
                    onClick={() => {
                      setFilterOpen(false);
                      showToast(`Filter by ${label} would open here`, 'info');
                    }}
                  >
                    {label}
                  </button>
                ))}
              </Dropdown>

              <div className="relative">
                <button
                  type="button"
                  disabled={selectedCount === 0}
                  className="inline-flex items-center gap-2 rounded-md border border-[var(--button-line)] bg-[var(--default-button-bg)] px-4 py-2 text-sm font-medium text-[var(--icon-default)] transition-colors hover:bg-[#ebebeb] disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setBulkOpen((v) => !v);
                    setSortOpen(false);
                    setFilterOpen(false);
                  }}
                >
                  Bulk Actions
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {bulkOpen && selectedCount > 0 ? (
                  <div
                    className="absolute right-0 top-[calc(100%+8px)] z-10 min-w-[180px] rounded-lg bg-white py-1 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {[
                      ['extend', 'Extend Expiry'],
                      ['add-seats', 'Add Seats'],
                      ['assign-manager', 'Assign Manager'],
                    ].map(([action, label]) => (
                      <button
                        key={action}
                        type="button"
                        className="flex w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--secondary-bg)]"
                        onClick={() => {
                          setBulkOpen(false);
                          showToast(`${label} applied to ${selectedCount} contracts`, 'info');
                        }}
                      >
                        {label}
                      </button>
                    ))}
                    <div className="my-1 h-px bg-[var(--button-line)]" />
                    <button
                      type="button"
                      className="flex w-full px-4 py-2.5 text-left text-sm text-[var(--warning-color)] hover:bg-[var(--secondary-bg)]"
                      onClick={() => {
                        setBulkOpen(false);
                        showToast(`Suspending ${selectedCount} contracts...`, 'warning');
                      }}
                    >
                      Suspend Contracts
                    </button>
                    <button
                      type="button"
                      className="flex w-full px-4 py-2.5 text-left text-sm text-[var(--danger-color)] hover:bg-[var(--secondary-bg)]"
                      onClick={() => {
                        setBulkOpen(false);
                        showToast(`Cancelling ${selectedCount} contracts...`, 'error');
                      }}
                    >
                      Cancel Contracts
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="w-[50px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                    <button
                      type="button"
                      aria-label="Select all on page"
                      className={`mx-auto flex h-[18px] w-[18px] items-center justify-center rounded border-2 transition-colors ${
                        allVisibleSelected
                          ? 'border-[var(--button-glow)] bg-[var(--button-glow)]'
                          : someSelected
                            ? 'border-[var(--button-glow)] bg-[var(--secondary-bg)]'
                            : 'border-[var(--button-line)] bg-white'
                      }`}
                      onClick={toggleSelectAllVisible}
                    >
                      {allVisibleSelected ? (
                        <span className="mb-0.5 block h-2 w-1 rotate-45 border-2 border-white border-l-0 border-t-0" />
                      ) : null}
                    </button>
                  </th>
                  <th className="w-[180px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                    Contract Name
                  </th>
                  <th className="w-[200px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                    Manager
                  </th>
                  <th className="w-[100px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                    Model
                  </th>
                  <th className="w-[150px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                    Utilization
                  </th>
                  <th className="w-[130px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                    Scope
                  </th>
                  <th className="w-[100px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                    Status
                  </th>
                  <th className="w-[110px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                    Expiry
                  </th>
                  <th className="w-[80px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                    View
                  </th>
                  <th className="w-[100px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                    Linked To
                  </th>
                  <th className="w-[60px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {paginated.map((contract) => (
                  <tr key={contract.id} className="group/row">
                    <td className="border-b border-[var(--button-line)] px-4 py-3 align-middle">
                      <button
                        type="button"
                        aria-label="Select row"
                        className={`flex h-[18px] w-[18px] items-center justify-center rounded border-2 transition-colors ${
                          selectedIds.has(contract.id)
                            ? 'border-[var(--button-glow)] bg-[var(--button-glow)]'
                            : 'border-[var(--button-line)] bg-white'
                        }`}
                        onClick={() => toggleRow(contract.id)}
                      >
                        {selectedIds.has(contract.id) ? (
                          <span className="mb-0.5 block h-2 w-1 rotate-45 border-2 border-white border-l-0 border-t-0" />
                        ) : null}
                      </button>
                    </td>
                    <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                      <div className="flex flex-col">
                        <span className="mb-1 font-semibold text-[var(--primary-text)]">{contract.name}</span>
                        <button
                          type="button"
                          className="group/cid flex items-center gap-1 font-mono text-xs text-[var(--mobile-secondary)] hover:text-[var(--button-glow)]"
                          onClick={() => copyText(contract.contractId, 'Contract ID copied to clipboard!')}
                        >
                          {contract.contractId}
                          <span className="opacity-0 transition-opacity group-hover/cid:opacity-100">
                            <IconCopy className="h-3.5 w-3.5" />
                          </span>
                        </button>
                      </div>
                    </td>
                    <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                      <div className="flex items-center">
                        <Image
                          src={contract.manager.avatar}
                          alt=""
                          width={36}
                          height={36}
                          className="mr-2.5 h-9 w-9 shrink-0 rounded-full bg-[var(--secondary-bg)] object-cover"
                        />
                        <div className="min-w-0">
                          <ManagerNameBlock
                            manager={contract.manager}
                            secondary={contract.secondaryManagers}
                            onManagerClick={(name) =>
                              showToast(`Redirecting to User Management for ${name}...`, 'info')
                            }
                          />
                          <button
                            type="button"
                            className="group/em flex max-w-[160px] items-center gap-1 truncate text-left text-xs text-[var(--mobile-secondary)] hover:text-[var(--button-glow)]"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyText(contract.manager.email, 'Email copied to clipboard!');
                            }}
                          >
                            <span className="truncate">{contract.manager.email}</span>
                            <span className="shrink-0 opacity-0 transition-opacity group-hover/em:opacity-100">
                              <IconCopy className="h-3.5 w-3.5" />
                            </span>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                      <span className={`inline-block rounded-xl px-2.5 py-1 text-[11px] font-semibold uppercase ${getModelClass(contract.model)}`}>
                        {getModelText(contract.model)}
                      </span>
                    </td>
                    <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                      <div className="w-[140px]">
                        <div className="mb-1 flex justify-between text-xs font-semibold">
                          <span>
                            {contract.utilization.used}/{contract.utilization.total}{' '}
                            {contract.model === 'credits' ? 'Credits' : 'Seats'}
                          </span>
                          <span>{contract.utilization.percent}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-[#f0f0f0]">
                          <div
                            className={`h-full rounded-full transition-[width] duration-300 ${
                              contract.model === 'credits' ? 'bg-[#722ED1]' : getProgressTone(contract.utilization.percent)
                            }`}
                            style={{ width: `${contract.utilization.percent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                      <ScopeCell scope={contract.scope} model={contract.model} />
                    </td>
                    <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                      <span className={`inline-block rounded-xl px-2.5 py-1 text-[11px] font-semibold uppercase ${getStatusClass(contract.status)}`}>
                        {getStatusText(contract.status)}
                      </span>
                    </td>
                    <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 text-sm group-hover/row:bg-[var(--secondary-bg)]">
                      {contract.expiry}
                    </td>
                    <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                      <div className="flex gap-1">
                        <ViewIconButton
                          tooltip="Billing"
                          onClick={() => showToast('Opening Billing...', 'info')}
                          icon={<BillingIcon />}
                        />
                        <ViewIconButton
                          tooltip="Assigned Content"
                          onClick={() => showToast('Opening Assigned Content...', 'info')}
                          icon={<AssignedContentIcon />}
                        />
                      </div>
                    </td>
                    <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                      <div className="flex gap-1">
                        <ViewIconButton
                          tooltip="Team Members"
                          onClick={() => showToast('Opening Team Members view...', 'info')}
                          icon={<MembersIcon />}
                        />
                        <ViewIconButton
                          tooltip="Primary Manager"
                          onClick={() => showToast('Redirecting to User Management (Primary Manager)...', 'info')}
                          icon={<ManagerIcon />}
                        />
                        {contract.secondaryManagers.length > 0 ? (
                          <ViewIconButton
                            tooltip={`All Managers (${1 + contract.secondaryManagers.length})`}
                            onClick={() => showToast('Redirecting to User Management (All Managers)...', 'info')}
                            icon={<ManagersIcon />}
                          />
                        ) : null}
                      </div>
                    </td>
                    <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                      <div className="relative">
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--mobile-secondary)] hover:bg-[var(--secondary-bg)]"
                          onClick={(e) => {
                            e.stopPropagation();
                            setRowMenuId((id) => (id === contract.id ? null : contract.id));
                          }}
                        >
                          <MoreIcon />
                        </button>
                        {rowMenuId === contract.id ? (
                          <div
                            className="absolute right-0 top-[calc(100%+4px)] z-20 min-w-[200px] rounded-lg bg-white py-1 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <RowMenuItem
                              icon={<EditIcon />}
                              label="Edit Contract"
                              onClick={() => {
                                setRowMenuId(null);
                                showToast(`Edit Contract for ${contract.name}`, 'info');
                              }}
                            />
                            <RowMenuItem
                              icon={<AddSeatsIcon />}
                              label="Modify Seat Limit"
                              onClick={() => {
                                setRowMenuId(null);
                                showToast(`Modify Seat Limit for ${contract.name}`, 'info');
                              }}
                            />
                            <RowMenuItem
                              icon={<SyncIcon />}
                              label="Sync MSO"
                              onClick={() => {
                                setRowMenuId(null);
                                showToast(`Sync MSO for ${contract.name}`, 'info');
                              }}
                            />
                            <div className="my-1 h-px bg-[var(--button-line)]" />
                            <RowMenuItem
                              icon={<CancelIcon />}
                              label="Cancel Contract"
                              danger
                              onClick={() => {
                                setRowMenuId(null);
                                showToast(`Cancelling ${contract.name}...`, 'error');
                              }}
                            />
                          </div>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-[var(--button-line)] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--mobile-secondary)]">
              <span>
                Showing <span className="font-semibold text-[var(--primary-text)]">{startIdx}</span>-
                <span className="font-semibold text-[var(--primary-text)]">{endIdx}</span> of{' '}
                <span className="font-semibold text-[var(--primary-text)]">{total}</span> contracts
              </span>
              <div className="flex items-center gap-1.5">
                <span>Rows per page:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(1);
                  }}
                  className="rounded border-0 bg-[#f1f1f1] px-2 py-1 text-sm font-semibold text-[var(--primary-text)]"
                >
                  {[10, 25, 50].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <PaginationBtn
                disabled={safePage <= 1}
                onClick={() => setPage(1)}
                label="First"
                icon="first"
              />
              <PaginationBtn
                disabled={safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                label="Previous"
                icon="prev"
              />
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((pnum) => (
                <button
                  key={pnum}
                  type="button"
                  className={`flex h-8 w-8 items-center justify-center rounded-md border text-sm ${
                    pnum === safePage
                      ? 'border-[var(--button-glow)] bg-[var(--button-glow)] text-white'
                      : 'border-[var(--button-line)] bg-white hover:bg-[var(--secondary-bg)]'
                  }`}
                  onClick={() => setPage(pnum)}
                >
                  {pnum}
                </button>
              ))}
              <PaginationBtn
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                label="Next"
                icon="next"
              />
              <PaginationBtn
                disabled={safePage >= totalPages}
                onClick={() => setPage(totalPages)}
                label="Last"
                icon="last"
              />
            </div>
          </div>
        </div>
      </div>

      {toast ? (
        <div
          className={`fixed right-4 top-4 z-[2000] flex items-center gap-2 rounded-md px-4 py-3 text-sm text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] ${
            toast.type === 'success'
              ? 'bg-[var(--success-color)]'
              : toast.type === 'error'
                ? 'bg-[var(--danger-color)]'
                : toast.type === 'warning'
                  ? 'bg-[var(--warning-color)]'
                  : 'bg-[var(--info-color)]'
          }`}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden>
            <path
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="M7.75 12L10.58 14.83L16.25 9.17004" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {toast.message}
        </div>
      ) : null}
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
  trend: { value: string; tone: 'positive' | 'warning' | 'negative' | 'neutral' };
  icon: ReactNode;
}) {
  const trendCls =
    trend.tone === 'positive'
      ? 'bg-[rgba(82,196,26,0.1)] text-[#52C41A]'
      : trend.tone === 'warning'
        ? 'bg-[rgba(250,173,20,0.1)] text-[#FA8C16]'
        : trend.tone === 'negative'
          ? 'bg-[rgba(255,77,79,0.1)] text-[#FF4D4F]'
          : 'bg-[rgba(102,102,102,0.1)] text-[#666666]';
  return (
    <div className="flex items-center rounded-lg bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
      <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--secondary-bg)] text-[var(--icon-default)]">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="mb-1 truncate text-sm text-[var(--mobile-secondary)]">{title}</h3>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xl font-semibold text-[var(--primary-text)]">{value}</span>
          <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${trendCls}`}>{trend.value}</span>
        </div>
      </div>
    </div>
  );
}

function Dropdown({
  open,
  onOpenToggle,
  label,
  icon,
  children,
}: {
  open: boolean;
  onOpenToggle: () => void;
  label: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md border border-[var(--button-line)] bg-[var(--default-button-bg)] px-4 py-2 text-sm font-medium text-[var(--icon-default)] transition-colors hover:bg-[#ebebeb]"
        onClick={(e) => {
          e.stopPropagation();
          onOpenToggle();
        }}
      >
        {icon}
        {label}
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open ? (
        <div
          className="absolute right-0 top-[calc(100%+8px)] z-10 min-w-[200px] rounded-lg bg-white py-1 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

function ManagerNameBlock({
  manager,
  secondary,
  onManagerClick,
}: {
  manager: Contract['manager'];
  secondary: { name: string; avatar: string }[];
  onManagerClick: (name: string) => void;
}) {
  if (secondary.length === 0) {
    return (
      <button
        type="button"
        className="max-w-full truncate text-left text-sm font-medium text-[var(--primary-text)] hover:text-[var(--button-glow)]"
        onClick={() => onManagerClick(manager.name)}
      >
        {manager.name}
      </button>
    );
  }
  return (
    <div className="group/tooltip relative inline-flex max-w-full">
      <button
        type="button"
        className="truncate text-left text-sm font-medium text-[var(--primary-text)] hover:text-[var(--button-glow)]"
        onClick={() => onManagerClick(manager.name)}
      >
        {manager.name}
      </button>
      <div className="pointer-events-none invisible absolute bottom-[calc(100%+8px)] left-1/2 z-[100] min-w-[180px] -translate-x-1/2 rounded-lg bg-[var(--primary-text)] px-4 py-3 text-xs text-white opacity-0 shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all group-hover/tooltip:visible group-hover/tooltip:opacity-100">
        <div className="mb-2 border-b border-white/20 pb-2 font-semibold">
          Managers ({1 + secondary.length})
        </div>
        <div className="flex items-center gap-2 py-1">
          <Image src={manager.avatar} alt="" width={20} height={20} className="rounded-full" />
          <span>{manager.name} (Primary)</span>
        </div>
        {secondary.map((m) => (
          <div key={m.name} className="flex items-center gap-2 py-1">
            <Image src={m.avatar} alt="" width={20} height={20} className="rounded-full" />
            <span>{m.name}</span>
          </div>
        ))}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-8 border-transparent border-t-[var(--primary-text)]" />
      </div>
    </div>
  );
}

function ScopeCell({ scope, model }: { scope: Scope; model: ContractModel }) {
  if (scope.type === 'catalog') {
    return <span className="text-[13px] text-[var(--mobile-secondary)]">Global Catalog</span>;
  }
  if (scope.type === 'plan') {
    return <span className="text-[13px] text-[var(--mobile-secondary)]">{scope.items[0]}</span>;
  }
  if (scope.type === 'courses' && model === 'fixed') {
    return (
      <div className="group/st flex items-center gap-1.5">
        <span className="text-[13px] text-[var(--mobile-secondary)]">{scope.count} Courses</span>
        <div className="relative flex h-4 w-4 cursor-help items-center justify-center text-[var(--mobile-secondary)]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <div className="pointer-events-none invisible absolute bottom-[calc(100%+8px)] left-1/2 z-[100] min-w-[200px] -translate-x-1/2 rounded-lg bg-[var(--primary-text)] px-4 py-3 text-xs text-white opacity-0 shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all group-hover/st:visible group-hover/st:opacity-100">
            <div className="mb-2 border-b border-white/20 pb-2 font-semibold">Linked Courses ({scope.count})</div>
            {scope.items.map((item) => (
              <div key={item} className="py-1">
                • {item}
              </div>
            ))}
            <span className="absolute left-1/2 top-full -translate-x-1/2 border-8 border-transparent border-t-[var(--primary-text)]" />
          </div>
        </div>
      </div>
    );
  }
  return <span className="text-[13px] text-[var(--mobile-secondary)]">{scope.count ?? 0} Courses</span>;
}

function ViewIconButton({
  tooltip,
  onClick,
  icon,
}: {
  tooltip: string;
  onClick: () => void;
  icon: ReactNode;
}) {
  return (
    <button
      type="button"
      className="group/v relative flex h-7 w-7 items-center justify-center rounded-full bg-[var(--secondary-bg)] text-[var(--icon-default)] transition-transform hover:-translate-y-0.5 hover:bg-[var(--button-glow)] hover:text-white"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <span className="h-3.5 w-3.5 [&_svg]:h-3.5 [&_svg]:w-3.5">{icon}</span>
      <span className="pointer-events-none invisible absolute bottom-[calc(100%+6px)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-[var(--primary-text)] px-2.5 py-1.5 text-xs text-white opacity-0 shadow-md transition-all group-hover/v:visible group-hover/v:opacity-100">
        {tooltip}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-[6px] border-transparent border-t-[var(--primary-text)]" />
      </span>
    </button>
  );
}

function RowMenuItem({
  icon,
  label,
  onClick,
  danger,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm hover:bg-[var(--secondary-bg)] ${
        danger ? 'text-[var(--danger-color)]' : 'text-[var(--primary-text)]'
      }`}
      onClick={onClick}
    >
      <span className="h-4 w-4 shrink-0 [&_svg]:h-4 [&_svg]:w-4">{icon}</span>
      {label}
    </button>
  );
}

function PaginationBtn({
  disabled,
  onClick,
  label,
  icon,
}: {
  disabled: boolean;
  onClick: () => void;
  label: string;
  icon: 'first' | 'prev' | 'next' | 'last';
}) {
  const icons = {
    first: (
      <>
        <path d="M18 17L13 12L18 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M11 17L6 12L11 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    prev: <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
    next: <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
    last: (
      <>
        <path d="M6 7L11 12L6 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M13 7L18 12L13 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  };
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--button-line)] bg-white text-[var(--primary-text)] hover:bg-[var(--secondary-bg)] disabled:cursor-not-allowed disabled:opacity-50"
      onClick={() => {
        if (!disabled) onClick();
      }}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
        {icons[icon]}
      </svg>
    </button>
  );
}

function BillingIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
      <path
        fill="currentColor"
        d="M17 12.7992V13.5992C17.4418 13.5992 17.8 13.241 17.8 12.7992H17ZM17 8.39922H17.8C17.8 7.95739 17.4418 7.59922 17 7.59922V8.39922ZM4.96739 4.12628C4.59574 4.3652 4.48814 4.86017 4.72706 5.23183C4.96598 5.60348 5.46095 5.71108 5.83261 5.47216L4.96739 4.12628ZM11 1.19922L11.6315 0.708066C11.3773 0.381231 10.9157 0.302372 10.5674 0.526276L11 1.19922ZM13.1685 5.29037C13.4398 5.63913 13.9424 5.70196 14.2912 5.4307C14.6399 5.15945 14.7027 4.65682 14.4315 4.30807L13.1685 5.29037ZM17 11.9992H14.4V13.5992H17V11.9992ZM14.4 9.19922H17V7.59922H14.4V9.19922ZM16.2 8.39922V12.7992H17.8V8.39922H16.2ZM13 10.5992C13 9.82602 13.6268 9.19922 14.4 9.19922V7.59922C12.7431 7.59922 11.4 8.94237 11.4 10.5992H13ZM14.4 11.9992C13.6268 11.9992 13 11.3724 13 10.5992H11.4C11.4 12.2561 12.7431 13.5992 14.4 13.5992V11.9992ZM5.83261 5.47216L11.4326 1.87216L10.5674 0.526276L4.96739 4.12628L5.83261 5.47216ZM10.3685 1.69037L13.1685 5.29037L14.4315 4.30807L11.6315 0.708066L10.3685 1.69037ZM1.8 5.59922H15.4V3.99922H1.8V5.59922ZM15.4 15.9992H1.8V17.5992H15.4V15.9992ZM1.8 15.9992V5.59922H0.2V15.9992H1.8ZM1.8 15.9992H1.8H0.2C0.2 16.8829 0.916343 17.5992 1.8 17.5992V15.9992ZM15.4 15.9992H15.4V17.5992C16.2837 17.5992 17 16.8829 17 15.9992H15.4ZM15.4 5.59922H15.4H17C17 4.71556 16.2837 3.99922 15.4 3.99922V5.59922ZM1.8 3.99922C0.916344 3.99922 0.2 4.71556 0.2 5.59922H1.8H1.8V3.99922ZM15.4 13.3992V15.9992H17V13.3992H15.4ZM15.4 5.59922V7.69922H17V5.59922H15.4Z"
      />
    </svg>
  );
}

function AssignedContentIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none">
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" d="M8 4L8 13.3333" />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        d="M3.9872 2.19029C6.21466 2.6144 7.54224 3.50154 8.00016 4.01086C8.45809 3.50154 9.78566 2.6144 12.0131 2.19029C13.1416 1.97544 13.7058 1.86801 14.1863 2.27976C14.6668 2.69152 14.6668 3.36015 14.6668 4.69741V9.50331C14.6668 10.726 14.6668 11.3374 14.3584 11.7191C14.05 12.1008 13.3711 12.2301 12.0131 12.4886C10.8026 12.7191 9.85787 13.0864 9.17404 13.4554C8.50124 13.8185 8.16483 14 8.00016 14C7.8355 14 7.49908 13.8185 6.82628 13.4554C6.14246 13.0864 5.19772 12.7191 3.9872 12.4886C2.62926 12.2301 1.95029 12.1008 1.64189 11.7191C1.3335 11.3374 1.3335 10.726 1.3335 9.50331V4.69741C1.3335 3.36015 1.3335 2.69152 1.81402 2.27976C2.29454 1.86801 2.85876 1.97544 3.9872 2.19029Z"
      />
    </svg>
  );
}

function MembersIcon() {
  return (
    <svg fill="none" viewBox="0 0 20 20">
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M6.66667 17.5V16.6667C6.66667 16.2246 6.84226 15.8007 7.15482 15.4882C7.46738 15.1756 7.89131 15 8.33333 15H11.6667C12.1087 15 12.5326 15.1756 12.8452 15.4882C13.1577 15.8007 13.3333 16.2246 13.3333 16.6667V17.5M14.1667 8.33333H15.8333C16.2754 8.33333 16.6993 8.50893 17.0118 8.82149C17.3244 9.13405 17.5 9.55797 17.5 10V10.8333M2.5 10.8333V10C2.5 9.55797 2.67559 9.13405 2.98816 8.82149C3.30072 8.50893 3.72464 8.33333 4.16667 8.33333H5.83333M8.33333 10.8333C8.33333 11.2754 8.50893 11.6993 8.82149 12.0118C9.13405 12.3244 9.55797 12.5 10 12.5C10.442 12.5 10.866 12.3244 11.1785 12.0118C11.4911 11.6993 11.6667 11.2754 11.6667 10.8333C11.6667 10.3913 11.4911 9.96738 11.1785 9.65482C10.866 9.34226 10.442 9.16667 10 9.16667C9.55797 9.16667 9.13405 9.34226 8.82149 9.65482C8.50893 9.96738 8.33333 10.3913 8.33333 10.8333ZM12.5 4.16667C12.5 4.60869 12.6756 5.03262 12.9882 5.34518C13.3007 5.65774 13.7246 5.83333 14.1667 5.83333C14.6087 5.83333 15.0326 5.65774 15.3452 5.34518C15.6577 5.03262 15.8333 4.60869 15.8333 4.16667C15.8333 3.80072 15.6452 3.42936 15.3452 3.19799C15.0452 2.96662 14.6738 2.83333 14.1667 2.83333C13.6595 2.83333 13.3007 3.00355 12.9882 3.19799C12.6756 3.39244 12.5 3.80072 12.5 4.16667ZM4.16667 4.16667C4.16667 4.60869 4.34226 5.03262 4.65482 5.34518C4.96738 5.65774 5.39131 5.83333 5.83333 5.83333C6.27536 5.83333 6.69928 5.65774 7.01184 5.34518C7.3244 5.03262 7.5 4.60869 7.5 4.16667C7.5 3.72464 7.3244 3.30072 7.01184 2.98816C6.69928 2.67559 6.27536 2.5 5.83333 2.5C5.39131 2.5 4.96738 2.67559 4.65482 2.98816C4.34226 3.30072 4.16667 3.72464 4.16667 4.16667Z"
      />
    </svg>
  );
}

function ManagerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ManagersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden>
      <path
        fill="currentColor"
        fillRule="nonzero"
        d="M12 10.393a1.607 1.607 0 1 0 0 3.214 1.607 1.607 0 0 0 0-3.214M12 4.393a1.607 1.607 0 1 0 0 3.214 1.607 1.607 0 0 0 0-3.214M12 16.393a1.607 1.607 0 1 0 0 3.214 1.607 1.607 0 0 0 0-3.214"
      />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function AddSeatsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  );
}

function SyncIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

function CancelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}
