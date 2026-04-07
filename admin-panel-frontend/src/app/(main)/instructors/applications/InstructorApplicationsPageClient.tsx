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

type AppStatus = 'pending' | 'approved' | 'rejected' | 'info';

type Note = {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
};

type Application = {
  id: number;
  appId: string;
  name: string;
  email: string;
  avatar: string;
  applied: string;
  appliedFull: string;
  category: string;
  experience: string;
  status: AppStatus;
  reviewer: { name: string; avatar: string } | null;
  phone: string;
  ip: string;
  teachingLanguage: string;
  motivation: string;
  videoUrl: string | null;
  socialMedia: { platform: string; url: string }[];
  portfolioUrl: string | null;
  rejectionReason: string | null;
  notes: Note[];
};

const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 1,
    appId: 'APP-2938',
    name: 'Jason Miller',
    email: 'jason.m@dev.com',
    avatar: 'https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png',
    applied: 'Today',
    appliedFull: 'December 13, 2025',
    category: 'Development',
    experience: '5 Years',
    status: 'pending',
    reviewer: null,
    phone: '+1 (555) 123-4567',
    ip: '192.168.1.105',
    teachingLanguage: 'English',
    motivation:
      'I have been passionate about software development for over 5 years and have extensive experience teaching coding bootcamps. I believe in hands-on learning and want to share my knowledge with aspiring developers. My approach focuses on practical projects and real-world applications.',
    videoUrl: 'https://www.youtube.com/watch?v=example123',
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/jasonmiller' },
      { platform: 'Twitter', url: 'https://twitter.com/jasonmdev' },
      { platform: 'GitHub', url: 'https://github.com/jasonmiller' },
    ],
    portfolioUrl: 'https://jasonmiller.dev',
    rejectionReason: null,
    notes: [],
  },
  {
    id: 2,
    appId: 'APP-2910',
    name: 'Alicia Keys',
    email: 'alicia@music.io',
    avatar: 'https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg',
    applied: 'Feb 20, 2025',
    appliedFull: 'February 20, 2025',
    category: 'Music',
    experience: '10+ Years',
    status: 'info',
    reviewer: {
      name: 'Admin Dave',
      avatar: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png',
    },
    phone: '+1 (555) 987-6543',
    ip: '45.67.89.123',
    teachingLanguage: 'English, Spanish',
    motivation:
      'As a professional musician with over a decade of experience, I want to help others discover the joy of music. I have taught private lessons and group classes, and I believe online learning can reach students who otherwise would not have access to quality music education.',
    videoUrl: 'https://vimeo.com/example456',
    socialMedia: [
      { platform: 'Instagram', url: 'https://instagram.com/aliciamusic' },
      { platform: 'YouTube', url: 'https://youtube.com/aliciakeys' },
    ],
    portfolioUrl: 'https://aliciamusic.com',
    rejectionReason: null,
    notes: [
      {
        id: 1,
        author: 'Admin Dave',
        avatar: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png',
        content: 'Need to verify her credentials. Waiting for certificate copies.',
        timestamp: '2 days ago',
      },
      {
        id: 2,
        author: 'Sarah Admin',
        avatar: 'https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg',
        content: 'I reached out via email. She said she will send them by Friday.',
        timestamp: '1 day ago',
      },
    ],
  },
  {
    id: 3,
    appId: 'APP-2899',
    name: 'Robert Fox',
    email: 'bob.fox@mail.com',
    avatar: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png',
    applied: 'Feb 18, 2025',
    appliedFull: 'February 18, 2025',
    category: 'Marketing',
    experience: '1 Year',
    status: 'rejected',
    reviewer: {
      name: 'Admin Dave',
      avatar: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png',
    },
    phone: '+1 (555) 456-7890',
    ip: '78.90.12.34',
    teachingLanguage: 'English',
    motivation: 'I want to teach digital marketing strategies to small business owners.',
    videoUrl: null,
    socialMedia: [{ platform: 'LinkedIn', url: 'https://linkedin.com/in/robertfox' }],
    portfolioUrl: null,
    rejectionReason:
      'Insufficient teaching experience. We require a minimum of 3 years of professional experience in the subject area. Please feel free to reapply once you have gained more experience.',
    notes: [
      {
        id: 1,
        author: 'Admin Dave',
        avatar: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png',
        content: 'Application lacks substance. Only 1 year experience is not enough.',
        timestamp: '5 days ago',
      },
    ],
  },
  {
    id: 4,
    appId: 'APP-2875',
    name: 'Emily Chen',
    email: 'emily.chen@design.co',
    avatar: 'https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg',
    applied: 'Feb 15, 2025',
    appliedFull: 'February 15, 2025',
    category: 'Design',
    experience: '8 Years',
    status: 'approved',
    reviewer: {
      name: 'Sarah Admin',
      avatar: 'https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg',
    },
    phone: '+1 (555) 234-5678',
    ip: '123.45.67.89',
    teachingLanguage: 'English, Mandarin',
    motivation:
      'Design is my passion and I have been working as a UX designer for Fortune 500 companies. I want to share my knowledge and help others break into the design industry.',
    videoUrl: 'https://www.youtube.com/watch?v=design789',
    socialMedia: [
      { platform: 'Dribbble', url: 'https://dribbble.com/emilychen' },
      { platform: 'Behance', url: 'https://behance.net/emilychen' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/emilychen' },
    ],
    portfolioUrl: 'https://emilychen.design',
    rejectionReason: null,
    notes: [
      {
        id: 1,
        author: 'Sarah Admin',
        avatar: 'https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg',
        content: 'Excellent portfolio and credentials. Approved!',
        timestamp: '10 days ago',
      },
    ],
  },
  {
    id: 5,
    appId: 'APP-2860',
    name: 'Marcus Johnson',
    email: 'marcus.j@fitness.io',
    avatar: 'https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png',
    applied: 'Feb 12, 2025',
    appliedFull: 'February 12, 2025',
    category: 'Fitness',
    experience: '6 Years',
    status: 'pending',
    reviewer: {
      name: 'Admin Dave',
      avatar: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png',
    },
    phone: '+1 (555) 345-6789',
    ip: '98.76.54.32',
    teachingLanguage: 'English',
    motivation:
      'As a certified personal trainer and nutrition coach, I have helped hundreds of clients achieve their fitness goals. I want to expand my reach and help even more people live healthier lives through online courses.',
    videoUrl: 'https://www.youtube.com/watch?v=fitness101',
    socialMedia: [
      { platform: 'Instagram', url: 'https://instagram.com/marcusfitness' },
      { platform: 'YouTube', url: 'https://youtube.com/marcusjohnson' },
    ],
    portfolioUrl: 'https://marcusfitness.com',
    rejectionReason: null,
    notes: [
      {
        id: 1,
        author: 'Admin Dave',
        avatar: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png',
        content:
          'Checking his certifications. NASM and ACE certified - looks good so far.',
        timestamp: '3 days ago',
      },
    ],
  },
];

const STATS = [
  {
    id: 'pendingReview',
    title: 'Pending Review',
    value: '12',
    trend: null as null | { value: string; type: 'positive' | 'negative' | 'neutral' },
    icon: <IconPendingClock />,
  },
  {
    id: 'approved',
    title: 'Approved (30d)',
    value: '45',
    trend: { value: '+12%', type: 'positive' as const },
    icon: <IconApproved />,
  },
  {
    id: 'rejected',
    title: 'Rejected (30d)',
    value: '8',
    trend: { value: '-2%', type: 'negative' as const },
    icon: <IconRejected />,
  },
  {
    id: 'avgTime',
    title: 'Avg. Review Time',
    value: '1.4 Days',
    trend: { value: 'Fast', type: 'positive' as const },
    icon: <IconClockSm />,
  },
] as const;

const SEARCH_FIELDS = [
  { key: 'applicant', label: 'Applicant (Name & ID)' },
  { key: 'email', label: 'Email' },
  { key: 'category', label: 'Category' },
  { key: 'status', label: 'Status' },
  { key: 'reviewer', label: 'Reviewer' },
] as const;

type SearchFieldKey = (typeof SEARCH_FIELDS)[number]['key'];

function statusPillClass(s: AppStatus) {
  const m: Record<AppStatus, string> = {
    pending: 'bg-[#fff7e6] text-[#d46b08]',
    approved: 'bg-[#d3f8df] text-[#085c37]',
    rejected: 'bg-[#fff1f0] text-[#cf1322]',
    info: 'bg-[#e6f7ff] text-[#096dd9]',
  };
  return m[s];
}

function statusText(s: AppStatus) {
  const m: Record<AppStatus, string> = {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    info: 'Needs Info',
  };
  return m[s];
}

function searchFieldsLabel(fields: SearchFieldKey[]) {
  if (fields.length === 1) return fields[0].toUpperCase();
  if (fields.length <= 2) return fields.map((f) => f.charAt(0).toUpperCase()).join(', ');
  return `${fields.length} FIELDS`;
}

export default function InstructorApplicationsPageClient() {
  const [applications, setApplications] = useState<Application[]>(() =>
    JSON.parse(JSON.stringify(INITIAL_APPLICATIONS)) as Application[],
  );
  const [search, setSearch] = useState('');
  const [searchFieldsOpen, setSearchFieldsOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState<SearchFieldKey[]>(['applicant']);
  const [openToolbarMenu, setOpenToolbarMenu] = useState<null | 'sort' | 'filter' | 'bulk'>(
    null,
  );
  const [rowMenuAppId, setRowMenuAppId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [detailsAppId, setDetailsAppId] = useState<number | null>(null);
  const [notesAppId, setNotesAppId] = useState<number | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    visible: boolean;
  }>({ message: '', type: 'success', visible: false });

  const toolbarPopoversRef = useRef<HTMLDivElement>(null);

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
      setToast({ message, type, visible: true });
      window.setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
    },
    [],
  );

  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      const t = e.target;
      if (!(t instanceof Node)) return;
      if (toolbarPopoversRef.current?.contains(t)) return;
      setSearchFieldsOpen(false);
      setOpenToolbarMenu(null);
      const el = t instanceof Element ? t : t.parentElement;
      if (el?.closest('[data-applications-row-actions]')) return;
      setRowMenuAppId(null);
    };
    document.addEventListener('click', onClickCapture, true);
    return () => document.removeEventListener('click', onClickCapture, true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDetailsAppId(null);
        setNotesAppId(null);
        resetNoteForm();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const resetNoteForm = () => {
    setNewNoteText('');
    setEditingNoteId(null);
  };

  const closeNotesModal = () => {
    setNotesAppId(null);
    resetNoteForm();
  };

  const toggleSearchField = (key: SearchFieldKey) => {
    setSelectedFields((prev) => {
      const has = prev.includes(key);
      if (has && prev.length === 1) return prev;
      if (has) return prev.filter((k) => k !== key);
      return [...prev, key];
    });
  };

  const visibleRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return applications.filter((row) => {
      if (!q) return true;
      return selectedFields.some((field) => {
        switch (field) {
          case 'applicant':
            return (
              row.name.toLowerCase().includes(q) ||
              row.appId.toLowerCase().includes(q)
            );
          case 'email':
            return row.email.toLowerCase().includes(q);
          case 'category':
            return row.category.toLowerCase().includes(q);
          case 'status':
            return statusText(row.status).toLowerCase().includes(q);
          case 'reviewer':
            return (row.reviewer?.name ?? 'Unassigned').toLowerCase().includes(q);
          default:
            return false;
        }
      });
    });
  }, [applications, search, selectedFields]);

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

  const detailsApp = detailsAppId
    ? applications.find((a) => a.id === detailsAppId)
    : undefined;
  const notesApp = notesAppId ? applications.find((a) => a.id === notesAppId) : undefined;

  const saveNote = () => {
    const text = newNoteText.trim();
    if (!text || !notesAppId) return;
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== notesAppId) return app;
        if (editingNoteId != null) {
          return {
            ...app,
            notes: app.notes.map((n) =>
              n.id === editingNoteId
                ? { ...n, content: text, timestamp: 'Edited just now' }
                : n,
            ),
          };
        }
        const newNote: Note = {
          id: Date.now(),
          author: 'You',
          avatar: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png',
          content: text,
          timestamp: 'Just now',
        };
        return { ...app, notes: [...app.notes, newNote] };
      }),
    );
    showToast(editingNoteId ? 'Note updated successfully!' : 'Note added successfully!', 'success');
    resetNoteForm();
  };

  const deleteNote = (noteId: number) => {
    if (!notesAppId) return;
    setApplications((prev) =>
      prev.map((app) =>
        app.id === notesAppId
          ? { ...app, notes: app.notes.filter((n) => n.id !== noteId) }
          : app,
      ),
    );
    resetNoteForm();
    showToast('Note deleted successfully', 'success');
  };

  const startEditNote = (note: Note) => {
    setEditingNoteId(note.id);
    setNewNoteText(note.content);
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
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-[var(--primary-text)]">
            Instructor Applications
          </h1>
          <button
            type="button"
            onClick={() => showToast('Exporting applications to CSV...', 'info')}
            className="inline-flex items-center gap-2 rounded-md border border-[var(--button-line)] bg-[var(--default-button-bg)] px-4 py-2 text-sm font-medium text-[var(--icon-default)] hover:bg-[#EBEBEB]"
          >
            <IconExport />
            Export CSV
          </button>
        </header>

        <div className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {STATS.map((s) => (
            <div
              key={s.id}
              className="flex items-center rounded-lg bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
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
                  {s.trend ? (
                    <span
                      className={`rounded px-1.5 py-0.5 text-xs font-medium whitespace-nowrap ${
                        s.trend.type === 'positive'
                          ? 'bg-[rgba(82,196,26,0.1)] text-[#52C41A]'
                          : s.trend.type === 'negative'
                            ? 'bg-[rgba(255,77,79,0.1)] text-[#FF4D4F]'
                            : 'bg-[rgba(102,102,102,0.1)] text-[#666]'
                      }`}
                    >
                      {s.trend.value}
                    </span>
                  ) : null}
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
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth={2} />
                </svg>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search applications..."
                  className="w-full border-0 bg-transparent py-2.5 pl-10 pr-3 text-sm outline-none"
                />
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchFieldsOpen((v) => !v);
                  }}
                  className="flex h-full min-w-[140px] items-center justify-between gap-2 border-l border-[var(--button-line)] bg-[#FAFAFA] px-3 py-2 hover:bg-[#F0F0F0]"
                >
                  <span className="flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.5px] text-[var(--icon-default)]">
                    <IconFunnelSm />
                    {searchFieldsLabel(selectedFields)}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5" />
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
                          onClick={() => toggleSearchField(f.key)}
                          className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm hover:bg-[var(--secondary-bg)]"
                        >
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 ${
                              sel
                                ? 'border-[var(--button-glow)] bg-[var(--button-glow)]'
                                : 'border-[var(--button-line)]'
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
                  'Date Applied (Newest)',
                  'Date Applied (Oldest)',
                  'Name (A-Z)',
                  'Name (Z-A)',
                  'Status',
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
                {['Status', 'Date Applied Range', 'Category', 'Assigned To'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="block w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--secondary-bg)]"
                    onClick={() => {
                      showToast(`Filter by ${t} would open here`, 'info');
                      setOpenToolbarMenu(null);
                    }}
                  >
                    {t}
                  </button>
                ))}
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
                <button
                  type="button"
                  className="block w-full px-4 py-2.5 text-left text-sm text-[var(--success-color)] hover:bg-[var(--secondary-bg)]"
                  onClick={() => {
                    showToast(`${selectedIds.size} applications approved!`, 'success');
                    setOpenToolbarMenu(null);
                  }}
                >
                  Approve Selected
                </button>
                <button
                  type="button"
                  className="block w-full px-4 py-2.5 text-left text-sm text-[var(--danger-color)] hover:bg-[var(--secondary-bg)]"
                  onClick={() => {
                    showToast(`${selectedIds.size} applications rejected`, 'error');
                    setOpenToolbarMenu(null);
                  }}
                >
                  Reject Selected
                </button>
                <div className="my-1.5 h-px bg-[var(--button-line)]" />
                <button
                  type="button"
                  className="block w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--secondary-bg)]"
                  onClick={() => {
                    showToast(`Assign to reviewer: ${selectedIds.size} rows`, 'info');
                    setOpenToolbarMenu(null);
                  }}
                >
                  Assign to Reviewer
                </button>
              </ToolbarDropdown>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="w-[50px] border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
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
                    ['Applicant', 'w-[220px]'],
                    ['App ID', 'w-[100px]'],
                    ['Applied', 'w-[120px]'],
                    ['Category', 'w-[100px]'],
                    ['Experience', 'w-[100px]'],
                    ['Status', 'w-[110px]'],
                    ['Reviewer', 'w-[160px]'],
                    ['View', 'w-[100px]'],
                    ['Linked To', 'w-[100px]'],
                    ['Actions', 'w-[70px]'],
                  ].map(([h, w]) => (
                    <th
                      key={String(h)}
                      className={`${w} border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((app) => (
                  <tr key={app.id} className="hover:bg-[var(--secondary-bg)]">
                    <td className="border-b border-[var(--button-line)] px-4 py-3">
                      <div className="flex justify-center">
                        <Checkbox
                          checked={selectedIds.has(app.id)}
                          onToggle={(e) => {
                            e.stopPropagation();
                            toggleRow(app.id);
                          }}
                        />
                      </div>
                    </td>
                    <td className="border-b border-[var(--button-line)] px-4 py-3">
                      <div className="flex items-center">
                        <Image
                          src={app.avatar}
                          alt=""
                          width={40}
                          height={40}
                          className="mr-3 h-10 w-10 shrink-0 rounded-full object-cover"
                        />
                        <div className="min-w-0">
                          <div className="truncate font-medium">{app.name}</div>
                          <div className="truncate text-xs text-[var(--mobile-secondary)]">
                            {app.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-[var(--button-line)] px-4 py-3 font-mono text-xs text-[var(--mobile-secondary)]">
                      {app.appId}
                    </td>
                    <td className="border-b border-[var(--button-line)] px-4 py-3 text-sm">
                      {app.applied}
                    </td>
                    <td className="border-b border-[var(--button-line)] px-4 py-3 text-sm">
                      {app.category}
                    </td>
                    <td className="border-b border-[var(--button-line)] px-4 py-3 text-sm">
                      {app.experience}
                    </td>
                    <td className="border-b border-[var(--button-line)] px-4 py-3">
                      <span
                        className={`inline-block rounded-xl px-2.5 py-1 text-[11px] font-semibold uppercase ${statusPillClass(app.status)}`}
                      >
                        {statusText(app.status)}
                      </span>
                    </td>
                    <td className="border-b border-[var(--button-line)] px-4 py-3 text-sm">
                      {app.reviewer ? (
                        <div className="flex items-center gap-2">
                          <Image
                            src={app.reviewer.avatar}
                            alt=""
                            width={24}
                            height={24}
                            className="h-6 w-6 rounded-full object-cover"
                          />
                          <span>{app.reviewer.name}</span>
                        </div>
                      ) : (
                        <span className="italic text-[var(--mobile-secondary)]">Unassigned</span>
                      )}
                    </td>
                    <td className="border-b border-[var(--button-line)] px-4 py-3">
                      <div className="flex gap-1">
                        <ViewIconBtn
                          label="Application Details"
                          onClick={() => setDetailsAppId(app.id)}
                        >
                          <IconFileLines />
                        </ViewIconBtn>
                        <ViewIconBtn
                          label={`Notes${app.notes.length ? ` (${app.notes.length})` : ''}`}
                          onClick={() => setNotesAppId(app.id)}
                        >
                          <IconNotes />
                        </ViewIconBtn>
                      </div>
                    </td>
                    <td className="border-b border-[var(--button-line)] px-4 py-3">
                      <div className="flex gap-1">
                        <ViewIconBtn
                          label="User Profile"
                          onClick={() => showToast('Opening user profile...', 'info')}
                        >
                          <IconUser />
                        </ViewIconBtn>
                        <ViewIconBtn
                          label="API Log"
                          onClick={() => showToast('Opening API log...', 'info')}
                        >
                          <IconCloud />
                        </ViewIconBtn>
                      </div>
                    </td>
                    <td className="border-b border-[var(--button-line)] px-4 py-3">
                      <div className="relative" data-applications-row-actions>
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-[var(--secondary-bg)]"
                          aria-label="Row actions"
                          onClick={(e) => {
                            e.stopPropagation();
                            setRowMenuAppId((id) => (id === app.id ? null : app.id));
                          }}
                        >
                          <IconMore />
                        </button>
                        {rowMenuAppId === app.id ? (
                          <div
                            className="absolute right-0 top-[calc(100%+8px)] z-[1000] min-w-[200px] rounded-lg bg-white py-1 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {app.status !== 'approved' ? (
                              <RowMenuBtn
                                className="text-[var(--success-color)]"
                                icon={<IconApprovedSm />}
                                onClick={() => {
                                  showToast(`${app.name}'s application approved!`, 'success');
                                  setRowMenuAppId(null);
                                }}
                              >
                                Approve
                              </RowMenuBtn>
                            ) : null}
                            {app.status !== 'rejected' ? (
                              <RowMenuBtn
                                className="text-[var(--danger-color)]"
                                icon={<IconRejectedSm />}
                                onClick={() => {
                                  showToast(`${app.name}'s application rejected`, 'error');
                                  setRowMenuAppId(null);
                                }}
                              >
                                Reject
                              </RowMenuBtn>
                            ) : null}
                            {app.status === 'pending' ? (
                              <RowMenuBtn
                                onClick={() => {
                                  showToast('Information request sent', 'info');
                                  setRowMenuAppId(null);
                                }}
                              >
                                Request Info
                              </RowMenuBtn>
                            ) : null}
                            <div className="my-1 h-px bg-[var(--button-line)]" />
                            <RowMenuBtn
                              onClick={() => {
                                showToast('Assigned to you', 'success');
                                setRowMenuAppId(null);
                              }}
                            >
                              Assign to Me
                            </RowMenuBtn>
                          </div>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-[var(--button-line)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--mobile-secondary)]">
              <span>
                Showing{' '}
                <span className="font-semibold text-[var(--primary-text)]">1-5</span> of{' '}
                <span className="font-semibold text-[var(--primary-text)]">65</span>{' '}
                applications
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
              <PageBtn disabled>
                <ChevronDblLeft />
              </PageBtn>
              <PageBtn disabled>
                <ChevronLeft />
              </PageBtn>
              <PageBtn active>1</PageBtn>
              {[2, 3].map((n) => (
                <PageBtn key={n} onClick={() => showToast(`Page ${n}`, 'info')}>
                  {n}
                </PageBtn>
              ))}
              <PageBtn onClick={() => showToast('Next page', 'info')}>
                <ChevronRight />
              </PageBtn>
              <PageBtn onClick={() => showToast('Last page', 'info')}>
                <ChevronDblRight />
              </PageBtn>
            </div>
          </div>
        </div>
      </div>

      {/* Details modal */}
      {detailsApp ? (
        <div
          className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDetailsAppId(null);
          }}
        >
          <div className="flex max-h-[85vh] w-full max-w-[600px] flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[var(--button-line)] px-6 py-5">
              <h3 className="flex items-center gap-2.5 text-lg font-semibold text-[var(--primary-text)]">
                <IconFileLines className="text-[var(--button-glow)]" />
                Application Details
              </h3>
              <button
                type="button"
                onClick={() => setDetailsAppId(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--mobile-secondary)] hover:bg-[var(--secondary-bg)]"
                aria-label="Close"
              >
                <IconClose />
              </button>
            </div>
            <div className="max-h-[60vh] flex-1 overflow-y-auto px-6 py-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4">
                <DetailGroup label="Full Name" value={detailsApp.name} />
                <DetailGroup
                  label="Email"
                  value={
                    <a href={`mailto:${detailsApp.email}`} className="text-[var(--button-glow)] hover:underline">
                      {detailsApp.email}
                    </a>
                  }
                />
                <DetailGroup label="Phone Number" value={detailsApp.phone || 'Not provided'} />
                <DetailGroup
                  label="Submitter IP"
                  value={<span className="font-mono">{detailsApp.ip}</span>}
                />
                <DetailGroup label="Teaching Language(s)" value={detailsApp.teachingLanguage} />
                <DetailGroup label="Category" value={detailsApp.category} />
              </div>
              <div className="mt-5">
                <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--mobile-secondary)]">
                  Motivation Statement
                </div>
                <div className="max-h-[150px] overflow-y-auto rounded-lg bg-[var(--secondary-bg)] p-4 text-sm leading-relaxed">
                  {detailsApp.motivation}
                </div>
              </div>
              <div className="mt-5">
                <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--mobile-secondary)]">
                  Video Sample
                </div>
                {detailsApp.videoUrl ? (
                  <a
                    href={detailsApp.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3.5 rounded-xl bg-gradient-to-br from-[#1a1e2e] to-[#2d3348] px-5 py-4 text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                      <IconPlay />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[15px] font-semibold">Watch Video Sample</span>
                      <span className="text-xs opacity-70">Click to open in new tab</span>
                    </span>
                  </a>
                ) : (
                  <p className="text-sm italic text-[var(--mobile-secondary)]">No video provided</p>
                )}
              </div>
              <div className="mt-5">
                <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--mobile-secondary)]">
                  Social Media Links
                </div>
                {detailsApp.socialMedia.length ? (
                  <div className="flex flex-wrap gap-2">
                    {detailsApp.socialMedia.map((s) => (
                      <a
                        key={s.url}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md bg-[var(--secondary-bg)] px-3 py-1.5 text-sm text-[var(--button-glow)] transition hover:bg-[var(--button-glow)] hover:text-white"
                      >
                        {s.platform}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[var(--mobile-secondary)]">No social media links</p>
                )}
              </div>
              <div className="mt-5">
                <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--mobile-secondary)]">
                  Portfolio URL
                </div>
                {detailsApp.portfolioUrl ? (
                  <a
                    href={detailsApp.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[var(--button-glow)] hover:underline"
                  >
                    {detailsApp.portfolioUrl}
                  </a>
                ) : (
                  <p className="text-sm text-[var(--mobile-secondary)]">No portfolio provided</p>
                )}
              </div>
              {detailsApp.status === 'rejected' && detailsApp.rejectionReason ? (
                <div className="mt-5 rounded-lg border border-[#ffccc7] bg-[#fff1f0] p-4">
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#cf1322]">
                    Rejection Reason
                  </div>
                  <p className="text-sm leading-relaxed">{detailsApp.rejectionReason}</p>
                </div>
              ) : null}
            </div>
            <div className="flex justify-end border-t border-[var(--button-line)] px-6 py-4">
              <button
                type="button"
                onClick={() => setDetailsAppId(null)}
                className="rounded-lg bg-[var(--default-button-bg)] px-4 py-2.5 text-sm font-medium hover:bg-[#E8E8EA]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Notes modal */}
      {notesApp ? (
        <div
          className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeNotesModal();
          }}
        >
          <div className="flex max-h-[90vh] w-full max-w-[550px] flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[var(--button-line)] px-6 py-5">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-[var(--primary-text)]">
                <IconNotes />
                Internal Notes
                <span className="rounded-xl bg-[var(--button-glow)] px-2 py-0.5 text-xs font-semibold text-white">
                  {notesApp.notes.length}
                </span>
              </h3>
              <button
                type="button"
                onClick={closeNotesModal}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--mobile-secondary)] hover:bg-[var(--secondary-bg)]"
                aria-label="Close"
              >
                <IconClose />
              </button>
            </div>
            <div className="flex max-h-[70vh] flex-col overflow-hidden px-6 py-6">
              <div className="mb-4 max-h-[400px] flex-1 overflow-y-auto pr-1">
                {notesApp.notes.length === 0 ? (
                  <div className="py-10 text-center text-[var(--mobile-secondary)]">
                    <IconEmptyNotes className="mx-auto mb-4 h-16 w-16 text-[var(--button-line)]" />
                    <p className="text-sm">No notes yet. Be the first to add one!</p>
                  </div>
                ) : (
                  notesApp.notes.map((note) => (
                    <div key={note.id} className="mb-4 rounded-xl border border-[var(--button-line)] p-4">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <Image
                            src={note.avatar}
                            alt=""
                            width={32}
                            height={32}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold">{note.author}</span>
                            <span className="text-[11px] text-[var(--mobile-secondary)]">
                              {note.timestamp}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            className="rounded px-2 py-1 text-xs text-[var(--button-glow)] hover:bg-[var(--secondary-bg)]"
                            onClick={() => startEditNote(note)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="rounded px-2 py-1 text-xs text-[var(--danger-color)] hover:bg-[var(--secondary-bg)]"
                            onClick={() => deleteNote(note.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed">{note.content}</p>
                    </div>
                  ))
                )}
              </div>
              <div className="rounded-xl bg-[var(--secondary-bg)] p-4">
                <div className="mb-3 flex items-center gap-2.5">
                  <Image
                    src="https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png"
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm font-medium">Add a note</span>
                </div>
                <textarea
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder={editingNoteId ? 'Edit your note...' : 'Write your note here...'}
                  className="mb-3 min-h-[100px] w-full resize-none rounded-lg border border-[var(--button-line)] bg-white px-3 py-3 text-sm focus:border-[var(--button-glow)] focus:outline-none focus:ring-2 focus:ring-[var(--button-glow)]/20"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={resetNoteForm}
                    className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium hover:bg-[#E8E8EA]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={saveNote}
                    className="rounded-lg bg-[var(--button-glow)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#3A7BAF]"
                  >
                    {editingNoteId ? 'Save Note' : 'Add Note'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={`fixed right-4 top-4 z-[3100] flex items-center gap-2 rounded-md px-4 py-3 text-sm text-white shadow-lg transition-all duration-300 ${
          toast.visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-5 opacity-0'
        } ${toastBg}`}
        role="status"
      >
        <IconToastCheck />
        <span>{toast.message}</span>
      </div>
    </div>
  );
}

function DetailGroup({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--mobile-secondary)]">
        {label}
      </div>
      <div className="text-sm leading-relaxed text-[var(--primary-text)]">{value}</div>
    </div>
  );
}

function RowMenuBtn({
  children,
  onClick,
  icon,
  className = '',
}: {
  children: ReactNode;
  onClick: () => void;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-[var(--secondary-bg)] ${className}`}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
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
        className="inline-flex items-center gap-2 rounded-md border border-[var(--button-line)] bg-[var(--default-button-bg)] px-4 py-2 text-sm font-medium text-[var(--icon-default)] hover:bg-[#EBEBEB] disabled:cursor-not-allowed disabled:opacity-50"
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
      <span className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-[var(--primary-text)] px-2.5 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover/v:opacity-100">
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
}: {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={`flex h-8 w-8 items-center justify-center rounded-md border text-sm transition-colors ${
        active
          ? 'border-[var(--button-glow)] bg-[var(--button-glow)] text-white'
          : 'border-[var(--button-line)] bg-white hover:bg-[var(--secondary-bg)]'
      } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {children}
    </button>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor">
      <path d="M19 9l-7 7-7-7" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth={2} />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth={2} />
    </svg>
  );
}

function ChevronDblLeft() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <path d="M18 17L13 12L18 7" stroke="currentColor" strokeWidth={2} />
      <path d="M11 17L6 12L11 7" stroke="currentColor" strokeWidth={2} />
    </svg>
  );
}

function ChevronDblRight() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
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

function IconFunnelSm() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconExport() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function IconPendingClock() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
    </svg>
  );
}

function IconClockSm() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconApproved() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function IconRejected() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

function IconFileLines({ className }: { className?: string }) {
  return (
    <svg className={className ?? 'h-3.5 w-3.5'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function IconNotes({ className }: { className?: string }) {
  return (
    <svg className={className ?? 'h-4 w-4'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconCloud() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M5 9.897c0-1.714 1.46-3.104 3.26-3.104.275-1.22 1.255-2.215 2.572-2.611 1.317-.397 2.77-.134 3.811.69 1.042.822 1.514 2.08 1.239 3.3h.693a2.42 2.42 0 0 1 2.425 2.414 2.42 2.42 0 0 1-2.425 2.414H8.315c-1.8 0-3.26-1.39-3.26-3.103z" />
      <path d="M12 13v3M12 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      <path d="M14 18h7M3 18h7" />
    </svg>
  );
}

function IconMore() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" className="text-[var(--mobile-secondary)]">
      <path d="M12 10.393a1.607 1.607 0 1 0 0 3.214 1.607 1.607 0 0 0 0-3.214M12 4.393a1.607 1.607 0 1 0 0 3.214 1.607 1.607 0 0 0 0-3.214M12 16.393a1.607 1.607 0 1 0 0 3.214 1.607 1.607 0 0 0 0-3.214" />
    </svg>
  );
}

function IconApprovedSm() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function IconRejectedSm() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

function IconPlay() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function IconEmptyNotes({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M8 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2" />
      <rect x="8" y="1" width="8" height="4" rx="1" />
      <line x1="12" y1="11" x2="12" y2="17" />
      <line x1="9" y1="14" x2="15" y2="14" />
    </svg>
  );
}

function IconToastCheck() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" strokeWidth={1.5} />
      <path d="M7.75 12L10.58 14.83L16.25 9.17" stroke="currentColor" strokeWidth={1.5} />
    </svg>
  );
}
