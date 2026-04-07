'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type SearchField = 'member' | 'plan' | 'owner' | 'role' | 'status';
type PlanType = 'subscription' | 'credits';
type MemberRole = 'manager' | 'seat' | 'member';
type MemberStatus = 'accepted' | 'pending' | 'removed';

type TeamMember = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  planName: string;
  planType: PlanType;
  planId: string;
  owner: { name: string; id: string; avatar: string };
  role: MemberRole;
  status: MemberStatus;
  joined: string;
  joinedFull: string;
  joinedTs: number;
};

const INITIAL_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@acme.com',
    avatar: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png',
    planName: 'Acme Corp - Q1 2025',
    planType: 'subscription',
    planId: 'PLAN-ACM-001',
    owner: {
      name: 'John Mitchell',
      id: 'USR-JM9284KL',
      avatar: 'https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png',
    },
    role: 'manager',
    status: 'accepted',
    joined: 'Jan 12, 2025',
    joinedFull: 'January 12, 2025 10:30:45 AM',
    joinedTs: Date.parse('2025-01-12T10:30:45'),
  },
  {
    id: 2,
    name: 'Dave Smith',
    email: 'dave.smith@acme.com',
    avatar: 'https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png',
    planName: 'Acme Corp - Q1 2025',
    planType: 'subscription',
    planId: 'PLAN-ACM-001',
    owner: {
      name: 'John Mitchell',
      id: 'USR-JM9284KL',
      avatar: 'https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png',
    },
    role: 'member',
    status: 'pending',
    joined: 'Invited Feb 10',
    joinedFull: 'Invited February 10, 2025 2:15:22 PM',
    joinedTs: Date.parse('2025-02-10T14:15:22'),
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    email: 'elena@design.co',
    avatar: 'https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg',
    planName: 'Design Co - Monthly',
    planType: 'credits',
    planId: 'PLAN-DSN-042',
    owner: {
      name: 'Maria Chen',
      id: 'USR-MC7361PQ',
      avatar: 'https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg',
    },
    role: 'seat',
    status: 'accepted',
    joined: 'Mar 01, 2025',
    joinedFull: 'March 01, 2025 9:45:18 AM',
    joinedTs: Date.parse('2025-03-01T09:45:18'),
  },
  {
    id: 4,
    name: 'Michael Torres',
    email: 'michael.t@startup.io',
    avatar: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png',
    planName: 'Startup.io - Annual',
    planType: 'subscription',
    planId: 'PLAN-STR-089',
    owner: {
      name: 'Alex Kim',
      id: 'USR-AK5829NM',
      avatar: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png',
    },
    role: 'manager',
    status: 'accepted',
    joined: 'Feb 15, 2025',
    joinedFull: 'February 15, 2025 3:22:09 PM',
    joinedTs: Date.parse('2025-02-15T15:22:09'),
  },
  {
    id: 5,
    name: 'Lisa Wang',
    email: 'lisa.wang@techcorp.com',
    avatar: 'https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg',
    planName: 'TechCorp Enterprise',
    planType: 'credits',
    planId: 'PLAN-TCH-156',
    owner: {
      name: 'Robert Chang',
      id: 'USR-RC4728HJ',
      avatar: 'https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png',
    },
    role: 'member',
    status: 'removed',
    joined: 'Dec 20, 2024',
    joinedFull: 'December 20, 2024 11:08:33 AM',
    joinedTs: Date.parse('2024-12-20T11:08:33'),
  },
];

type SortKey =
  | 'name-asc'
  | 'name-desc'
  | 'joined-newest'
  | 'joined-oldest'
  | 'plan-asc'
  | 'plan-desc';

const SEARCH_FIELD_LABELS: Record<SearchField, string> = {
  member: 'Member (Name & Email)',
  plan: 'Team Plan',
  owner: 'Plan Owner',
  role: 'Role',
  status: 'Status',
};

function getRoleClass(role: MemberRole) {
  const map: Record<MemberRole, string> = {
    manager: 'bg-[#F9F0FF] text-[#722ED1]',
    seat: 'bg-[#E6F7FF] text-[#1890FF]',
    member: 'bg-[#F5F5F5] text-[#666666]',
  };
  return map[role];
}

function getRoleLabel(role: MemberRole) {
  const map: Record<MemberRole, string> = {
    manager: 'Manager',
    seat: 'Seat Mgr',
    member: 'Member',
  };
  return map[role];
}

function getStatusClass(status: MemberStatus) {
  const map: Record<MemberStatus, string> = {
    accepted: 'bg-[#d3f8df] text-[#085c37]',
    pending: 'bg-[#e0e4ff] text-[#402fa4]',
    removed: 'bg-[rgba(255,77,79,0.1)] text-[#FF4D4F]',
  };
  return map[status];
}

function getPlanTypeClass(type: PlanType) {
  return type === 'subscription'
    ? 'bg-[#E6F7FF] text-[#1890FF]'
    : 'bg-[#F9F0FF] text-[#722ED1]';
}

function IconCopy({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" aria-hidden>
      <path
        stroke="#333333"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5.83203 8.05648C5.83203 7.46704 6.06619 6.90174 6.48299 6.48494C6.89979 6.06814 7.46509 5.83398 8.05453 5.83398H15.2762C15.5681 5.83398 15.8571 5.89147 16.1267 6.00316C16.3964 6.11485 16.6414 6.27856 16.8477 6.48494C17.0541 6.69132 17.2178 6.93632 17.3295 7.20597C17.4412 7.47562 17.4987 7.76462 17.4987 8.05648V15.2782C17.4987 15.57 17.4412 15.859 17.3295 16.1287C17.2178 16.3983 17.0541 16.6433 16.8477 16.8497C16.6414 17.0561 16.3964 17.2198 16.1267 17.3315C15.8571 17.4432 15.5681 17.5007 15.2762 17.5007H8.05453C7.76267 17.5007 7.47366 17.4432 7.20402 17.3315C6.93437 17.2198 6.68936 17.0561 6.48299 16.8497C6.27661 16.6433 6.1129 16.3983 6.00121 16.1287C5.88952 15.859 5.83203 15.57 5.83203 15.2782V8.05648Z"
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

export default function TeamMembersPageClient() {
  const [members] = useState<TeamMember[]>(INITIAL_MEMBERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFields, setSelectedFields] = useState<SearchField[]>(['member']);
  const [searchFieldsOpen, setSearchFieldsOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [rowMenuId, setRowMenuId] = useState<number | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('name-asc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  } | null>(null);

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
      setToast({ message, type });
      window.setTimeout(() => setToast(null), 3000);
    },
    [],
  );

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

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return members.filter((m) => {
      if (!q) return true;
      return selectedFields.some((field) => {
        switch (field) {
          case 'member':
            return m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q);
          case 'plan':
            return m.planName.toLowerCase().includes(q);
          case 'owner':
            return (
              m.owner.name.toLowerCase().includes(q) || m.owner.id.toLowerCase().includes(q)
            );
          case 'role':
            return getRoleLabel(m.role).toLowerCase().includes(q);
          case 'status':
            return m.status.toLowerCase().includes(q);
          default:
            return false;
        }
      });
    });
  }, [members, searchTerm, selectedFields]);

  const sorted = useMemo(() => {
    const rows = [...filtered];
    rows.sort((a, b) => {
      switch (sortKey) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'joined-newest':
          return b.joinedTs - a.joinedTs;
        case 'joined-oldest':
          return a.joinedTs - b.joinedTs;
        case 'plan-asc':
          return a.planName.localeCompare(b.planName);
        case 'plan-desc':
          return b.planName.localeCompare(a.planName);
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
      return f === 'member' ? 'MEMBER' : f.toUpperCase();
    }
    if (selectedFields.length <= 2) {
      return selectedFields.map((f) => f.charAt(0).toUpperCase()).join(', ');
    }
    return `${selectedFields.length} FIELDS`;
  }, [selectedFields]);

  const allVisibleSelected =
    paginated.length > 0 && paginated.every((m) => selectedIds.has(m.id));
  const someSelected = paginated.some((m) => selectedIds.has(m.id));

  const toggleSelectAllVisible = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) {
        paginated.forEach((m) => next.delete(m.id));
      } else {
        paginated.forEach((m) => next.add(m.id));
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
          <h1 className="text-2xl font-semibold text-[var(--primary-text)]">Team Members</h1>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--button-glow)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#3A7BAF]"
            onClick={() => showToast('Invite Member modal would open here', 'info')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 3V13M3 8H13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Invite Member
          </button>
        </header>

        <div className="mb-6 grid grid-cols-1 gap-4 min-[1200px]:grid-cols-4">
          <StatCard
            title="Total Members"
            value="784"
            trend={{ value: '+45', tone: 'positive' }}
            icon={<StatIconTotalMembers />}
          />
          <StatCard
            title="Unique Managers"
            value="156"
            trend={{ value: '+12', tone: 'positive' }}
            icon={<StatIconUniqueManagers />}
          />
          <StatCard
            title="Seat Managers"
            value="42"
            trend={{ value: '+3', tone: 'positive' }}
            icon={<StatIconSeatManagers />}
          />
          <StatCard title="Pending Invites" value="24" icon={<StatIconPendingInvites />} />
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
                  placeholder="Search members..."
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
                    className="absolute right-0 top-[calc(100%+4px)] z-[1000] min-w-[220px] animate-fade-in rounded-lg bg-white py-2 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
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
                icon={<SortIcon />}
              >
                {(
                  [
                    ['name-asc', 'Name (A-Z)'],
                    ['name-desc', 'Name (Z-A)'],
                    ['joined-newest', 'Join Date (Newest)'],
                    ['joined-oldest', 'Join Date (Oldest)'],
                    ['plan-asc', 'Team Plan (A-Z)'],
                    ['plan-desc', 'Team Plan (Z-A)'],
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
                icon={<FilterFunnelIcon />}
              >
                {(['Role', 'Status', 'Plan Type', 'Join Date', 'Team Plan'] as const).map((label) => (
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
                    className="absolute right-0 top-[calc(100%+8px)] z-10 min-w-[200px] rounded-lg bg-white py-1 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {(
                      [
                        { action: 'change-role', label: 'Change Role', Icon: ChangeRoleIcon, danger: false },
                        { action: 'resend-invite', label: 'Resend Invite', Icon: ResendInviteIcon, danger: false },
                        {
                          action: 'revoke-invite',
                          label: 'Revoke Invite',
                          Icon: RemoveFromTeamIcon,
                          danger: true,
                        },
                        {
                          action: 'remove',
                          label: 'Remove from Team',
                          Icon: RemoveFromTeamIcon,
                          danger: true,
                        },
                      ] as const
                    ).map(({ action, label, Icon, danger }) => (
                      <button
                        key={action}
                        type="button"
                        className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-[var(--secondary-bg)] ${
                          danger ? 'text-[var(--danger-color)]' : ''
                        }`}
                        onClick={() => {
                          setBulkOpen(false);
                          showToast(
                            `${label} would be applied to ${selectedCount} selected members`,
                            'info',
                          );
                        }}
                      >
                        <span className="h-4 w-4 shrink-0 text-current [&_svg]:h-4 [&_svg]:w-4">
                          <Icon />
                        </span>
                        {label}
                      </button>
                    ))}
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
                  <th className="w-[220px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                    Member
                  </th>
                  <th className="w-[180px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                    Team Plan
                  </th>
                  <th className="w-[180px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                    Plan Owner
                  </th>
                  <th className="w-[100px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                    Role
                  </th>
                  <th className="w-[100px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                    Status
                  </th>
                  <th className="w-[110px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                    Joined
                  </th>
                  <th className="w-[100px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                    View
                  </th>
                  <th className="w-[180px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                    Linked To
                  </th>
                  <th className="w-[60px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {paginated.map((m) => (
                  <tr key={m.id} className="group/row">
                    <td className="border-b border-[var(--button-line)] px-4 py-3 align-middle">
                      <button
                        type="button"
                        aria-label="Select row"
                        className={`flex h-[18px] w-[18px] items-center justify-center rounded border-2 transition-colors ${
                          selectedIds.has(m.id)
                            ? 'border-[var(--button-glow)] bg-[var(--button-glow)]'
                            : 'border-[var(--button-line)] bg-white'
                        }`}
                        onClick={() => toggleRow(m.id)}
                      >
                        {selectedIds.has(m.id) ? (
                          <span className="mb-0.5 block h-2 w-1 rotate-45 border-2 border-white border-l-0 border-t-0" />
                        ) : null}
                      </button>
                    </td>
                    <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                      <div className="flex items-center">
                        <Image
                          src={m.avatar}
                          alt=""
                          width={36}
                          height={36}
                          className="mr-3 h-9 w-9 shrink-0 rounded-full bg-[var(--secondary-bg)] object-cover"
                        />
                        <div className="min-w-0">
                          <button
                            type="button"
                            className="block max-w-full truncate text-left font-medium text-[var(--primary-text)] hover:text-[var(--button-glow)]"
                            onClick={() =>
                              showToast(`Opening profile for member ID: ${m.id}`, 'info')
                            }
                          >
                            {m.name}
                          </button>
                          <button
                            type="button"
                            className="group/em flex max-w-[200px] items-center gap-1 truncate text-left text-xs text-[var(--mobile-secondary)] hover:text-[var(--button-glow)]"
                            onClick={() => copyText(m.email, 'Email copied to clipboard!')}
                          >
                            <span className="truncate">{m.email}</span>
                            <span className="shrink-0 opacity-0 transition-opacity group-hover/em:opacity-100">
                              <IconCopy className="h-3.5 w-3.5" />
                            </span>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          className="text-left text-sm font-medium text-[var(--button-glow)] hover:underline"
                          onClick={() => showToast(`Redirecting to Team Plan: ${m.planId}`, 'info')}
                        >
                          {m.planName}
                        </button>
                        <span
                          className={`inline-block w-fit rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${getPlanTypeClass(m.planType)}`}
                        >
                          {m.planType}
                        </span>
                      </div>
                    </td>
                    <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                      <div className="flex items-center">
                        <Image
                          src={m.owner.avatar}
                          alt=""
                          width={28}
                          height={28}
                          className="mr-2.5 h-7 w-7 shrink-0 rounded-full object-cover"
                        />
                        <div className="min-w-0">
                          <div className="truncate text-[13px] font-medium text-[var(--primary-text)]">
                            {m.owner.name}
                          </div>
                          <div className="truncate font-mono text-[11px] text-[var(--mobile-secondary)]">
                            {m.owner.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                      <span
                        className={`inline-block rounded-xl px-2.5 py-1 text-[11px] font-semibold uppercase ${getRoleClass(m.role)}`}
                      >
                        {getRoleLabel(m.role)}
                      </span>
                    </td>
                    <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                      <span
                        className={`inline-block rounded-xl px-2.5 py-1 text-[11px] font-semibold uppercase ${getStatusClass(m.status)}`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td
                      className="border-b border-[var(--button-line)] bg-white px-4 py-3 text-sm group-hover/row:bg-[var(--secondary-bg)]"
                      title={m.joinedFull}
                    >
                      {m.joined}
                    </td>
                    <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                      <div className="flex gap-1.5">
                        <ViewIconButton
                          tooltip="Membership Details"
                          onClick={() =>
                            showToast(`Opening Membership Details for member: ${m.id}`, 'info')
                          }
                          icon={<MembershipDetailsIcon />}
                        />
                        <ViewIconButton
                          tooltip="Activity"
                          onClick={() => showToast(`Opening Activity log for member: ${m.id}`, 'info')}
                          icon={<ActivityIcon />}
                        />
                      </div>
                    </td>
                    <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                      <div className="flex flex-wrap gap-1.5">
                        <ViewIconButton
                          tooltip="Plan Owner"
                          onClick={() =>
                            showToast(
                              `Redirecting to User Management filtered by owner: ${m.owner.id}`,
                              'info',
                            )
                          }
                          icon={<PlanOwnerIcon />}
                        />
                        <ViewIconButton
                          tooltip="Manager Profile"
                          onClick={() =>
                            showToast(`Opening Manager Profile for member: ${m.id}`, 'info')
                          }
                          icon={<ManagerProfileIcon />}
                        />
                        <ViewIconButton
                          tooltip="Team Plan"
                          onClick={() =>
                            showToast(`Redirecting to Team Plan Management for: ${m.planId}`, 'info')
                          }
                          icon={<TeamPlanIcon />}
                        />
                        <ViewIconButton
                          tooltip="Invoices"
                          onClick={() =>
                            showToast(`Redirecting to Transactions filtered by plan: ${m.planId}`, 'info')
                          }
                          icon={<InvoicesIcon />}
                        />
                        <ViewIconButton
                          tooltip="Enrollments"
                          onClick={() =>
                            showToast(
                              `Redirecting to Enrollments for member: ${m.id}, plan: ${m.planId}`,
                              'info',
                            )
                          }
                          icon={<EnrollmentsIcon />}
                        />
                      </div>
                    </td>
                    <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                      <div className="relative">
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--mobile-secondary)] hover:bg-[var(--secondary-bg)]"
                          onClick={(e) => {
                            e.stopPropagation();
                            setRowMenuId((id) => (id === m.id ? null : m.id));
                          }}
                        >
                          <RowMoreIcon />
                        </button>
                        {rowMenuId === m.id ? (
                          <div
                            className="absolute right-0 top-[calc(100%+4px)] z-20 min-w-[220px] rounded-lg bg-white py-1 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <RowMenuRow
                              icon={<ChangeRoleIcon />}
                              label="Change Role"
                              onClick={() => {
                                setRowMenuId(null);
                                showToast(`Change Role for ${m.name}`, 'info');
                              }}
                            />
                            {m.status === 'pending' ? (
                              <>
                                <RowMenuRow
                                  icon={<ResendInviteIcon />}
                                  label="Resend Invite"
                                  onClick={() => {
                                    setRowMenuId(null);
                                    showToast(`Resend Invite for ${m.name}`, 'info');
                                  }}
                                />
                                <RowMenuRow
                                  icon={<RemoveFromTeamIcon />}
                                  label="Revoke Invite"
                                  danger
                                  onClick={() => {
                                    setRowMenuId(null);
                                    showToast(`Revoke Invite for ${m.name}`, 'error');
                                  }}
                                />
                              </>
                            ) : (
                              <RowMenuRow
                                icon={<RemoveFromTeamIcon />}
                                label="Remove from Team"
                                danger
                                onClick={() => {
                                  setRowMenuId(null);
                                  showToast(`Remove from Team for ${m.name}`, 'error');
                                }}
                              />
                            )}
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
                <span className="font-semibold text-[var(--primary-text)]">{total}</span> members
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
                  {[10, 25, 50, 100].map((n) => (
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
  trend?: { value: string; tone: 'positive' | 'warning' | 'negative' | 'neutral' };
  icon: ReactNode;
}) {
  const trendCls = trend
    ? trend.tone === 'positive'
      ? 'bg-[rgba(82,196,26,0.1)] text-[#52C41A]'
      : trend.tone === 'warning'
        ? 'bg-[rgba(250,173,20,0.1)] text-[#FA8C16]'
        : trend.tone === 'negative'
          ? 'bg-[rgba(255,77,79,0.1)] text-[#FF4D4F]'
          : 'bg-[rgba(102,102,102,0.1)] text-[#666666]'
    : '';
  return (
    <div className="flex items-center rounded-lg bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
      <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--secondary-bg)] text-[var(--icon-default)]">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="mb-1 truncate text-sm text-[var(--mobile-secondary)]">{title}</h3>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xl font-semibold text-[var(--primary-text)]">{value}</span>
          {trend ? (
            <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${trendCls}`}>
              {trend.value}
            </span>
          ) : null}
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

function RowMenuRow({
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
      <span className="h-4 w-4 shrink-0 text-current [&_svg]:h-4 [&_svg]:w-4">{icon}</span>
      {label}
    </button>
  );
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

function SortIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.75 12H1V10.5H1.75H5.25H6V12H5.25H1.75ZM1.75 7.75H1V6.25H1.75H4.25H5V7.75H4.25H1.75ZM1.75 3.5H1V2H1.75H7.25H8V3.5H7.25H1.75ZM12.5303 14.7803C12.2374 15.0732 11.7626 15.0732 11.4697 14.7803L9.21967 12.5303L8.68934 12L9.75 10.9393L10.2803 11.4697L11.25 12.4393V2.75V2H12.75V2.75V12.4393L13.7197 11.4697L14.25 10.9393L15.3107 12L14.7803 12.5303L12.5303 14.7803Z"
      />
    </svg>
  );
}

function FilterFunnelIcon() {
  return (
    <svg viewBox="0 0 512 512" className="h-4 w-4" aria-hidden>
      <path
        fill="currentColor"
        d="M0 416c0 13.3 10.7 24 24 24l59.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 440c13.3 0 24-10.7 24-24s-10.7-24-24-24l-251.7 0c-10.2-32.5-40.5-56-76.3-56s-66.1 23.5-76.3 56L24 392c-13.3 0-24 10.7-24 24zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-35.8 0-66.1 23.5-76.3 56L24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l251.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56l59.7 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-59.7 0c-10.2-32.5-40.5-56-76.3-56zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm76.3-56C258.1 39.5 227.8 16 192 16s-66.1 23.5-76.3 56L24 72C10.7 72 0 82.7 0 96s10.7 24 24 24l91.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 120c13.3 0 24-10.7 24-24s-10.7-24-24-24L268.3 72z"
      />
    </svg>
  );
}

function StatIconTotalMembers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function StatIconUniqueManagers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="M20 8v6" />
      <path d="M23 11h-6" />
    </svg>
  );
}

function StatIconSeatManagers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <polyline points="17 11 19 13 23 9" />
    </svg>
  );
}

function StatIconPendingInvites() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MembershipDetailsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h4" />
      <path d="M7 18h2" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function PlanOwnerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ManagerProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function TeamPlanIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function InvoicesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2l-3 2-3-2-3 2-3-2-3 2-3-2z" />
      <path d="M8 10h8" />
      <path d="M8 14h8" />
      <path d="M8 18h4" />
    </svg>
  );
}

function EnrollmentsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M8 7h8" />
      <path d="M8 11h6" />
    </svg>
  );
}

function RowMoreIcon() {
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

function ChangeRoleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="M18 8l4 4-4 4" />
      <path d="M22 12h-8" />
    </svg>
  );
}

function ResendInviteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 8.5V12.5C22 17.5 20 19.5 15 19.5H9C4 19.5 2 17.5 2 12.5V8.5C2 3.5 4 1.5 9 1.5H15C20 1.5 22 3.5 22 8.5Z" />
      <path d="M15.5 5.25L12.5 7.75C11.67 8.41 10.32 8.41 9.49 7.75L6.5 5.25" />
    </svg>
  );
}

function RemoveFromTeamIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="18" y1="11" x2="23" y2="11" />
    </svg>
  );
}
