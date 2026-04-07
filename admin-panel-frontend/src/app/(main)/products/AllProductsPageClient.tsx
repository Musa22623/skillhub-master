'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type SearchField = 'title' | 'id' | 'instructor' | 'type' | 'status';
type ProductType = 'course' | 'event' | 'bundle' | 'community';
type ProductStatus = 'published' | 'pending' | 'draft' | 'rejected' | 'private';

type Product = {
  id: number;
  productId: string;
  lwId: string;
  title: string;
  thumbnail: string;
  instructor: { id: string; name: string; avatar: string };
  type: ProductType;
  price: string;
  originalPrice: string | null;
  discount: string | null;
  status: ProductStatus;
  enrollments: number;
  salesLast30d: number;
  rating: number | null;
  reviewCount: number;
  created: string;
  createdFull: string;
  updatedFull: string;
  createdTs: number;
  updatedTs: number;
  linkedToSchool: boolean;
  viewLinks: ('productDetails' | 'pricingHistory' | 'recommendations' | 'auditLog')[];
  linkedTo: ('school' | 'enrollments' | 'transactions' | 'reviews' | 'coupons' | 'checklist' | 'apiLogs')[];
};

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    productId: 'PROD-8329',
    lwId: 'course-ux-master',
    title: 'Complete UX Design Masterclass',
    thumbnail: 'https://i.ibb.co/XZwpwsqp/product1.webp',
    instructor: {
      id: 'USR-7823',
      name: 'Sarah Johnson',
      avatar: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png',
    },
    type: 'course',
    price: '$89.00',
    originalPrice: '$199.00',
    discount: '55%',
    status: 'published',
    enrollments: 1204,
    salesLast30d: 45,
    rating: 4.8,
    reviewCount: 245,
    created: 'Jan 10, 2025',
    createdFull: 'January 10, 2025 2:30:00 PM',
    updatedFull: 'February 15, 2025 10:45:22 AM',
    createdTs: Date.parse('2025-01-10T14:30:00'),
    updatedTs: Date.parse('2025-02-15T10:45:22'),
    linkedToSchool: true,
    viewLinks: ['productDetails', 'pricingHistory', 'recommendations', 'auditLog'],
    linkedTo: ['school', 'enrollments', 'transactions', 'reviews', 'coupons', 'checklist', 'apiLogs'],
  },
  {
    id: 2,
    productId: 'EVT-9921',
    lwId: 'live-session-01',
    title: 'Weekly Coaching Session',
    thumbnail: 'https://i.ibb.co/SwpdsBdp/product2.webp',
    instructor: {
      id: 'USR-4521',
      name: 'Michael Chen',
      avatar: 'https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png',
    },
    type: 'event',
    price: '$150.00',
    originalPrice: null,
    discount: null,
    status: 'published',
    enrollments: 45,
    salesLast30d: 12,
    rating: 5.0,
    reviewCount: 45,
    created: 'Feb 01, 2025',
    createdFull: 'February 01, 2025 9:15:00 AM',
    updatedFull: 'February 20, 2025 3:22:18 PM',
    createdTs: Date.parse('2025-02-01T09:15:00'),
    updatedTs: Date.parse('2025-02-20T15:22:18'),
    linkedToSchool: true,
    viewLinks: ['productDetails', 'pricingHistory', 'recommendations', 'auditLog'],
    linkedTo: ['school', 'enrollments', 'transactions', 'reviews', 'coupons', 'apiLogs'],
  },
  {
    id: 3,
    productId: 'BND-1123',
    lwId: 'bundle-fs-01',
    title: 'Full Stack Developer Path',
    thumbnail: 'https://i.ibb.co/4w9x7g7j/AVATAR-midtone-ux-instrgram.jpg',
    instructor: {
      id: 'USR-9012',
      name: 'Tech Academy',
      avatar: 'https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg',
    },
    type: 'bundle',
    price: '$299.00',
    originalPrice: null,
    discount: null,
    status: 'pending',
    enrollments: 0,
    salesLast30d: 0,
    rating: null,
    reviewCount: 0,
    created: 'Feb 20, 2025',
    createdFull: 'February 20, 2025 11:00:00 AM',
    updatedFull: 'February 22, 2025 4:15:33 PM',
    createdTs: Date.parse('2025-02-20T11:00:00'),
    updatedTs: Date.parse('2025-02-22T16:15:33'),
    linkedToSchool: false,
    viewLinks: ['productDetails', 'pricingHistory', 'recommendations', 'auditLog'],
    linkedTo: ['enrollments', 'transactions', 'coupons', 'apiLogs'],
  },
  {
    id: 4,
    productId: 'COM-4412',
    lwId: 'community-designers',
    title: 'Designers Circle',
    thumbnail: 'https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg',
    instructor: {
      id: 'USR-7823',
      name: 'Sarah Johnson',
      avatar: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png',
    },
    type: 'community',
    price: 'Free',
    originalPrice: null,
    discount: null,
    status: 'draft',
    enrollments: 500,
    salesLast30d: 0,
    rating: null,
    reviewCount: 0,
    created: 'Jan 05, 2025',
    createdFull: 'January 05, 2025 8:45:00 AM',
    updatedFull: 'January 18, 2025 2:30:15 PM',
    createdTs: Date.parse('2025-01-05T08:45:00'),
    updatedTs: Date.parse('2025-01-18T14:30:15'),
    linkedToSchool: false,
    viewLinks: ['productDetails', 'pricingHistory', 'recommendations', 'auditLog'],
    linkedTo: ['enrollments', 'apiLogs'],
  },
];

type SortKey =
  | 'created-desc'
  | 'created-asc'
  | 'updated-desc'
  | 'updated-asc'
  | 'title-asc'
  | 'title-desc'
  | 'price-high'
  | 'price-low'
  | 'enrollments-high'
  | 'enrollments-low'
  | 'rating-high'
  | 'rating-low';

const SEARCH_FIELD_LABELS: Record<SearchField, string> = {
  title: 'Title',
  id: 'Product ID',
  instructor: 'Instructor',
  type: 'Type',
  status: 'Status',
};

function truncateId(id: string) {
  return id.length <= 12 ? id : `${id.substring(0, 10)}...`;
}

function parsePriceValue(price: string): number {
  if (price.toLowerCase() === 'free') return 0;
  const n = parseFloat(price.replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function typePillClass(type: ProductType) {
  const map: Record<ProductType, string> = {
    course: 'bg-[#E6F7FF] text-[#1890FF]',
    event: 'bg-[#F9F0FF] text-[#722ED1]',
    bundle: 'bg-[#FFF7E6] text-[#FA8C16]',
    community: 'bg-[#F6FFED] text-[#52C41A]',
  };
  return map[type];
}

function statusPillClass(status: ProductStatus) {
  const map: Record<ProductStatus, string> = {
    published: 'bg-[#d3f8df] text-[#085c37]',
    draft: 'border border-[#D9D9D9] bg-[#F5F5F5] text-[#595959]',
    pending: 'bg-[#e0e4ff] text-[#402fa4]',
    rejected: 'bg-[rgba(255,77,79,0.1)] text-[#FF4D4F]',
    private: 'bg-[rgba(102,102,102,0.1)] text-[#666666]',
  };
  return map[status];
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

export default function AllProductsPageClient() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFields, setSelectedFields] = useState<SearchField[]>(['title']);
  const [searchFieldsOpen, setSearchFieldsOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [newProductOpen, setNewProductOpen] = useState(false);
  const [rowMenuId, setRowMenuId] = useState<number | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('created-desc');
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
    const onDoc = () => {
      setSearchFieldsOpen(false);
      setSortOpen(false);
      setFilterOpen(false);
      setBulkOpen(false);
      setNewProductOpen(false);
      setRowMenuId(null);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const filterByStat = (filter: string) => {
    if (filter === 'all') {
      showToast('Showing all products', 'info');
    } else {
      showToast(
        `Filtering products by status: ${filter.charAt(0).toUpperCase() + filter.slice(1)}`,
        'info',
      );
    }
  };

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return products.filter((p) => {
      if (!q) return true;
      return selectedFields.some((field) => {
        switch (field) {
          case 'title':
            return p.title.toLowerCase().includes(q);
          case 'id':
            return (
              p.productId.toLowerCase().includes(q) || p.lwId.toLowerCase().includes(q)
            );
          case 'instructor':
            return p.instructor.name.toLowerCase().includes(q);
          case 'type':
            return p.type.toLowerCase().includes(q);
          case 'status':
            return p.status.toLowerCase().includes(q);
          default:
            return false;
        }
      });
    });
  }, [products, searchTerm, selectedFields]);

  const sorted = useMemo(() => {
    const rows = [...filtered];
    const price = (p: Product) => parsePriceValue(p.price);
    const ratingVal = (p: Product) => p.rating ?? -1;
    rows.sort((a, b) => {
      switch (sortKey) {
        case 'created-desc':
          return b.createdTs - a.createdTs;
        case 'created-asc':
          return a.createdTs - b.createdTs;
        case 'updated-desc':
          return b.updatedTs - a.updatedTs;
        case 'updated-asc':
          return a.updatedTs - b.updatedTs;
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'price-high':
          return price(b) - price(a);
        case 'price-low':
          return price(a) - price(b);
        case 'enrollments-high':
          return b.enrollments - a.enrollments;
        case 'enrollments-low':
          return a.enrollments - b.enrollments;
        case 'rating-high':
          return ratingVal(b) - ratingVal(a);
        case 'rating-low':
          return ratingVal(a) - ratingVal(b);
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
      return selectedFields[0].toUpperCase();
    }
    if (selectedFields.length <= 2) {
      return selectedFields.map((f) => f.charAt(0).toUpperCase()).join(', ');
    }
    return `${selectedFields.length} FIELDS`;
  }, [selectedFields]);

  const allVisibleSelected =
    paginated.length > 0 && paginated.every((p) => selectedIds.has(p.id));
  const someSelected = paginated.some((p) => selectedIds.has(p.id));

  const toggleSelectAllVisible = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) {
        paginated.forEach((p) => next.delete(p.id));
      } else {
        paginated.forEach((p) => next.add(p.id));
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

  const copyProductIds = (p: Product) => {
    const text = `Internal Product ID: ${p.productId}\nLearnWorlds ID: ${p.lwId}`;
    void navigator.clipboard.writeText(text).then(() =>
      showToast('Product IDs copied to clipboard!', 'success'),
    );
  };

  const applyRowAction = (action: string, product: Product) => {
    const title = product.title;
    switch (action) {
      case 'preview':
        showToast(`Opening preview for "${title}"`, 'info');
        break;
      case 'edit':
        showToast(`Opening editor for "${title}"`, 'info');
        break;
      case 'approve':
        showToast(`Approving "${title}"`, 'info');
        break;
      case 'reject':
        showToast(`Rejecting "${title}"`, 'info');
        break;
      case 'publish':
        setProducts((prev) =>
          prev.map((x) => (x.id === product.id ? { ...x, status: 'published' as const } : x)),
        );
        showToast(`Publishing "${title}"`, 'info');
        break;
      case 'unpublish':
        setProducts((prev) =>
          prev.map((x) => (x.id === product.id ? { ...x, status: 'draft' as const } : x)),
        );
        showToast(`Unpublishing "${title}"`, 'info');
        break;
      case 'manage-instructors':
        showToast(`Managing instructors for "${title}"`, 'info');
        break;
      case 'sync':
        showToast(`Syncing "${title}" with LearnWorlds`, 'info');
        break;
      default:
        showToast(`${action} for "${title}"`, 'info');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--dashboard-bg)] p-5 text-[var(--primary-text)]">
      <div className="mx-auto max-w-[1600px]">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold">All Products</h1>
          <div className="relative">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--button-glow)] px-4 py-2 text-sm font-medium text-white hover:bg-[#3A7BAF]"
              onClick={(e) => {
                e.stopPropagation();
                setNewProductOpen((v) => !v);
                setSortOpen(false);
                setFilterOpen(false);
                setBulkOpen(false);
              }}
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
              New Product
            </button>
            {newProductOpen ? (
              <div
                className="absolute right-0 top-[calc(100%+8px)] z-[100] min-w-[180px] rounded-lg bg-white py-1 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                onClick={(e) => e.stopPropagation()}
              >
                {(['course', 'event', 'bundle', 'community'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="flex w-full px-4 py-2.5 text-left text-sm capitalize hover:bg-[var(--secondary-bg)]"
                    onClick={() => {
                      setNewProductOpen(false);
                      showToast(`Creating new ${t}...`, 'info');
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        <div className="mb-6 grid grid-cols-1 gap-4 min-[1400px]:grid-cols-4 md:grid-cols-2">
          <button
            type="button"
            className="flex items-center rounded-lg bg-white p-5 text-left shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
            onClick={() => filterByStat('all')}
          >
            <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--secondary-bg)] text-[var(--icon-default)]">
              <IconStatTotal />
            </div>
            <div className="min-w-0">
              <h3 className="mb-1 truncate text-sm text-[var(--mobile-secondary)]">Total Products</h3>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xl font-semibold text-[var(--primary-text)] hover:text-[var(--button-glow)]">
                  1,432
                </span>
                <span className="rounded bg-[rgba(82,196,26,0.1)] px-1.5 py-0.5 text-xs font-medium text-[#52C41A]">
                  +5.2%
                </span>
              </div>
            </div>
          </button>
          <button
            type="button"
            className="flex items-center rounded-lg bg-white p-5 text-left shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
            onClick={() => filterByStat('published')}
          >
            <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--secondary-bg)] text-[var(--icon-default)]">
              <IconStatPublished />
            </div>
            <div className="min-w-0">
              <h3 className="mb-1 truncate text-sm text-[var(--mobile-secondary)]">Published</h3>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xl font-semibold">982</span>
                <span className="rounded bg-[rgba(82,196,26,0.1)] px-1.5 py-0.5 text-xs font-medium text-[#52C41A]">
                  +12%
                </span>
              </div>
            </div>
          </button>
          <button
            type="button"
            className="flex items-center rounded-lg bg-white p-5 text-left shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
            onClick={() => filterByStat('pending')}
          >
            <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--secondary-bg)] text-[var(--icon-default)]">
              <IconStatPending />
            </div>
            <div className="min-w-0">
              <h3 className="mb-1 truncate text-sm text-[var(--mobile-secondary)]">Pending Approval</h3>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xl font-semibold">105</span>
                <span className="rounded bg-[rgba(82,196,26,0.1)] px-1.5 py-0.5 text-xs font-medium text-[#52C41A]">
                  +8
                </span>
              </div>
            </div>
          </button>
          <button
            type="button"
            className="flex items-center rounded-lg bg-white p-5 text-left shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
            onClick={() => filterByStat('draft')}
          >
            <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--secondary-bg)] text-[var(--icon-default)]">
              <IconStatDrafts />
            </div>
            <div className="min-w-0">
              <h3 className="mb-1 truncate text-sm text-[var(--mobile-secondary)]">Drafts</h3>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xl font-semibold">345</span>
                <span className="rounded bg-[rgba(102,102,102,0.1)] px-1.5 py-0.5 text-xs font-medium text-[#666666]">
                  0%
                </span>
              </div>
            </div>
          </button>
        </div>

        <ProductsTableSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedFields={selectedFields}
          toggleField={toggleField}
          fieldsSummary={fieldsSummary}
          searchFieldsOpen={searchFieldsOpen}
          setSearchFieldsOpen={setSearchFieldsOpen}
          sortOpen={sortOpen}
          setSortOpen={setSortOpen}
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
          bulkOpen={bulkOpen}
          setBulkOpen={setBulkOpen}
          sortKey={sortKey}
          setSortKey={setSortKey}
          showToast={showToast}
          paginated={paginated}
          selectedIds={selectedIds}
          toggleRow={toggleRow}
          toggleSelectAllVisible={toggleSelectAllVisible}
          allVisibleSelected={allVisibleSelected}
          someSelected={someSelected}
          rowMenuId={rowMenuId}
          setRowMenuId={setRowMenuId}
          copyProductIds={copyProductIds}
          applyRowAction={applyRowAction}
          selectedCount={selectedCount}
          total={total}
          startIdx={startIdx}
          endIdx={endIdx}
          safePage={safePage}
          totalPages={totalPages}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>

      {toast ? (
        <div
          className={`fixed right-4 top-4 z-[2000] flex max-w-[400px] items-center gap-2 rounded-md px-4 py-3 text-sm text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] ${
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

function viewLinkMeta(key: Product['viewLinks'][number]): { label: string; Icon: () => ReactNode } {
  switch (key) {
    case 'productDetails':
      return { label: 'Product Details', Icon: IconProductDetails };
    case 'pricingHistory':
      return { label: 'Pricing History', Icon: IconPricingHistory };
    case 'recommendations':
      return { label: 'Recommendations', Icon: IconRecommendations };
    case 'auditLog':
      return { label: 'Audit Log', Icon: IconAuditLog };
    default:
      return { label: key, Icon: IconProductDetails };
  }
}

function linkedMeta(key: Product['linkedTo'][number]): { label: string; Icon: () => ReactNode } {
  switch (key) {
    case 'school':
      return { label: 'Go to Linked School', Icon: IconSchool };
    case 'enrollments':
      return { label: 'Enrollments (?productId=XYZ)', Icon: IconEnrollments };
    case 'transactions':
      return { label: 'Transactions (?productId=XYZ)', Icon: IconTransactions };
    case 'reviews':
      return { label: 'Reviews (?productId=XYZ)', Icon: IconReviews };
    case 'coupons':
      return { label: 'Coupons (?applicableProductId=XYZ)', Icon: IconCoupons };
    case 'checklist':
      return { label: 'Checklist Instances (?entityId=XYZ)', Icon: IconChecklist };
    case 'apiLogs':
      return { label: 'API Logs (?relatedEntityId=XYZ)', Icon: IconApiLogs };
    default:
      return { label: key, Icon: IconApiLogs };
  }
}

function ProductsTableSection({
  searchTerm,
  setSearchTerm,
  selectedFields,
  toggleField,
  fieldsSummary,
  searchFieldsOpen,
  setSearchFieldsOpen,
  sortOpen,
  setSortOpen,
  filterOpen,
  setFilterOpen,
  bulkOpen,
  setBulkOpen,
  sortKey,
  setSortKey,
  showToast,
  paginated,
  selectedIds,
  toggleRow,
  toggleSelectAllVisible,
  allVisibleSelected,
  someSelected,
  rowMenuId,
  setRowMenuId,
  copyProductIds,
  applyRowAction,
  selectedCount,
  total,
  startIdx,
  endIdx,
  safePage,
  totalPages,
  page,
  setPage,
  pageSize,
  setPageSize,
}: {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedFields: SearchField[];
  toggleField: (f: SearchField) => void;
  fieldsSummary: string;
  searchFieldsOpen: boolean;
  setSearchFieldsOpen: (v: boolean | ((p: boolean) => boolean)) => void;
  sortOpen: boolean;
  setSortOpen: (v: boolean | ((p: boolean) => boolean)) => void;
  filterOpen: boolean;
  setFilterOpen: (v: boolean | ((p: boolean) => boolean)) => void;
  bulkOpen: boolean;
  setBulkOpen: (v: boolean | ((p: boolean) => boolean)) => void;
  sortKey: SortKey;
  setSortKey: (k: SortKey) => void;
  showToast: (m: string, t?: 'success' | 'error' | 'info' | 'warning') => void;
  paginated: Product[];
  selectedIds: Set<number>;
  toggleRow: (id: number) => void;
  toggleSelectAllVisible: () => void;
  allVisibleSelected: boolean;
  someSelected: boolean;
  rowMenuId: number | null;
  setRowMenuId: (v: number | null | ((p: number | null) => number | null)) => void;
  copyProductIds: (p: Product) => void;
  applyRowAction: (action: string, p: Product) => void;
  selectedCount: number;
  total: number;
  startIdx: number;
  endIdx: number;
  safePage: number;
  totalPages: number;
  page: number;
  setPage: (v: number | ((p: number) => number)) => void;
  pageSize: number;
  setPageSize: (v: number) => void;
}) {
  const SORT_OPTIONS: [SortKey, string][] = [
    ['created-desc', 'Created Date (Newest)'],
    ['created-asc', 'Created Date (Oldest)'],
    ['updated-desc', 'Updated Date (Newest)'],
    ['updated-asc', 'Updated Date (Oldest)'],
    ['title-asc', 'Title (A-Z)'],
    ['title-desc', 'Title (Z-A)'],
    ['price-high', 'Price (High to Low)'],
    ['price-low', 'Price (Low to High)'],
    ['enrollments-high', 'Enrollments (High to Low)'],
    ['enrollments-low', 'Enrollments (Low to High)'],
    ['rating-high', 'Rating (High to Low)'],
    ['rating-low', 'Rating (Low to High)'],
  ];

  return (
    <div className="overflow-visible rounded-lg bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col flex-wrap items-stretch justify-between gap-3 border-b border-[var(--button-line)] p-4 md:flex-row md:items-center">
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
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-0 bg-transparent py-2.5 pl-10 pr-3 text-sm outline-none placeholder:text-[var(--mobile-secondary)]"
            />
          </div>
          <div className="relative shrink-0">
            <button
              type="button"
              className="flex h-full min-w-[140px] items-center justify-between gap-2 rounded-r-md border-l border-[var(--button-line)] bg-[#fafafa] px-3 py-2 hover:bg-[#f0f0f0]"
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
                  const sel = selectedFields.includes(field);
                  return (
                    <button
                      key={field}
                      type="button"
                      className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm hover:bg-[var(--secondary-bg)]"
                      onClick={() => toggleField(field)}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 ${
                          sel ? 'border-[var(--button-glow)] bg-[var(--button-glow)]' : 'border-[var(--button-line)]'
                        }`}
                      >
                        {sel ? (
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
            onToggle={() => {
              setSortOpen((v) => !v);
              setFilterOpen(false);
              setBulkOpen(false);
            }}
            label="Sort"
            icon={<IconSortGlyph />}
          >
            {SORT_OPTIONS.map(([key, label]) => (
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
            onToggle={() => {
              setFilterOpen((v) => !v);
              setSortOpen(false);
              setBulkOpen(false);
            }}
            label="Filter"
            icon={<IconFilterGlyph />}
          >
            {[
              'Type (Course, Event, Bundle, Community)',
              'Status (Draft, Published, Pending...)',
              'Category (Hierarchical)',
              'Price Range (Min/Max)',
              'Featured (Yes/No)',
            ].map((label) => (
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
              className="inline-flex items-center gap-2 rounded-md border border-[var(--button-line)] bg-[var(--default-button-bg)] px-4 py-2 text-sm font-medium text-[var(--icon-default)] hover:bg-[#ebebeb] disabled:cursor-not-allowed disabled:opacity-50"
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
                className="absolute right-0 top-[calc(100%+8px)] z-[100] min-w-[220px] rounded-lg bg-white py-1 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                onClick={(e) => e.stopPropagation()}
              >
                {['Publish Selected', 'Unpublish Selected', 'Add to Category', 'Feature/Unfeature'].map((label) => (
                  <button
                    key={label}
                    type="button"
                    className="flex w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--secondary-bg)]"
                    onClick={() => {
                      setBulkOpen(false);
                      showToast(`${label} action applied to ${selectedCount} selected products`, 'info');
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="w-[50px] whitespace-nowrap border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                <button
                  type="button"
                  aria-label="Select all on page"
                  className={`mx-auto flex h-[18px] w-[18px] items-center justify-center rounded border-2 ${
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
              <th className="min-w-[220px] whitespace-nowrap border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                Product
              </th>
              <th className="min-w-[150px] whitespace-nowrap border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                Instructor
              </th>
              <th className="w-[100px] whitespace-nowrap border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                Type
              </th>
              <th className="w-[90px] whitespace-nowrap border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                Price
              </th>
              <th className="w-[100px] whitespace-nowrap border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                Status
              </th>
              <th className="w-[80px] whitespace-nowrap border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                <span className="inline-flex items-center">
                  Enroll.
                  <span className="group/ht relative ml-1 inline-flex cursor-help text-[var(--mobile-secondary)]">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                    <span className="pointer-events-none invisible absolute bottom-[calc(100%+8px)] left-1/2 z-[100] w-[220px] -translate-x-1/2 rounded-md bg-[var(--primary-text)] px-3.5 py-2.5 text-left text-xs font-normal normal-case leading-snug tracking-normal text-white opacity-0 shadow-md transition-all group-hover/ht:visible group-hover/ht:opacity-100">
                      For Bundles, this shows &quot;Sales&quot; count (purchases). For Courses, Events, and
                      Communities, it shows actual enrollments.
                      <span className="absolute left-1/2 top-full -translate-x-1/2 border-6 border-transparent border-t-[var(--primary-text)]" />
                    </span>
                  </span>
                </span>
              </th>
              <th className="w-[90px] max-xl:hidden whitespace-nowrap border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                Rating
              </th>
              <th className="w-[100px] whitespace-nowrap border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                Created
              </th>
              <th className="w-[140px] whitespace-nowrap border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                View
              </th>
              <th className="w-[200px] whitespace-nowrap border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--icon-default)]">
                Linked To
              </th>
              <th className="w-[60px] whitespace-nowrap border-b border-[var(--button-line)] bg-[var(--secondary-bg)] px-4 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((p) => {
              const isPending = p.status === 'pending';
              const isPublished = p.status === 'published';
              const enrollLabel = p.type === 'bundle' ? 'Sales' : 'Enrollments';
              const filteredLinked = p.linkedToSchool ? p.linkedTo : p.linkedTo.filter((x) => x !== 'school');
              const maxV = 4;
              const viewVis = p.viewLinks.slice(0, maxV);
              const viewMore = p.viewLinks.length - maxV;
              const linkVis = filteredLinked.slice(0, maxV);
              const linkMore = filteredLinked.length - maxV;

              return (
                <tr key={p.id} className="group/row">
                  <td className="border-b border-[var(--button-line)] px-4 py-3 align-middle">
                    <button
                      type="button"
                      aria-label="Select row"
                      className={`flex h-[18px] w-[18px] items-center justify-center rounded border-2 ${
                        selectedIds.has(p.id)
                          ? 'border-[var(--button-glow)] bg-[var(--button-glow)]'
                          : 'border-[var(--button-line)] bg-white'
                      }`}
                      onClick={() => toggleRow(p.id)}
                    >
                      {selectedIds.has(p.id) ? (
                        <span className="mb-0.5 block h-2 w-1 rotate-45 border-2 border-white border-l-0 border-t-0" />
                      ) : null}
                    </button>
                  </td>
                  <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                    <div className="flex items-center">
                      <Image
                        src={p.thumbnail}
                        alt=""
                        width={48}
                        height={48}
                        className="mr-3 h-12 w-12 shrink-0 rounded-md border border-[var(--button-line)] bg-[var(--secondary-bg)] object-cover"
                      />
                      <div className="min-w-0 max-w-[200px]">
                        <div className="truncate font-semibold">{p.title}</div>
                        <button
                          type="button"
                          className="group/pid flex items-center gap-1 font-mono text-xs text-[var(--mobile-secondary)] hover:text-[var(--button-glow)]"
                          onClick={() => copyProductIds(p)}
                        >
                          {truncateId(p.productId)}
                          <span className="opacity-0 transition-opacity group-hover/pid:opacity-100">
                            <IconCopy className="h-3.5 w-3.5" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                    <div className="flex items-center">
                      <Image
                        src={p.instructor.avatar}
                        alt=""
                        width={32}
                        height={32}
                        className="mr-2.5 h-8 w-8 shrink-0 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <div className="truncate text-[13px] font-medium">{p.instructor.name}</div>
                        <button
                          type="button"
                          className="truncate font-mono text-[11px] text-[var(--mobile-secondary)] hover:text-[var(--button-glow)] hover:underline"
                          onClick={() =>
                            showToast(
                              `Redirecting to instructor page: ${p.instructor.name} (${p.instructor.id})`,
                              'info',
                            )
                          }
                        >
                          {p.instructor.id}
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                    <span className={`pill inline-block rounded-xl px-2.5 py-1 text-[11px] font-semibold uppercase ${typePillClass(p.type)}`}>
                      {p.type}
                    </span>
                  </td>
                  <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle font-semibold group-hover/row:bg-[var(--secondary-bg)]">
                    {p.discount && p.originalPrice ? (
                      <span className="group/price relative inline-flex cursor-default">
                        {p.price}
                        <span className="pointer-events-none invisible absolute bottom-[calc(100%+4px)] left-1/2 z-10 min-w-[160px] -translate-x-1/2 rounded-md bg-[var(--primary-text)] px-3 py-2 text-left text-xs font-normal text-white opacity-0 shadow-md transition-all group-hover/price:visible group-hover/price:opacity-100">
                          Original: {p.originalPrice}
                          <br />
                          Discount: {p.discount}
                          <span className="absolute left-1/2 top-full -translate-x-1/2 border-6 border-transparent border-t-[var(--primary-text)]" />
                        </span>
                      </span>
                    ) : (
                      p.price
                    )}
                  </td>
                  <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                    <span className={`pill inline-block rounded-xl px-2.5 py-1 text-[11px] font-semibold uppercase ${statusPillClass(p.status)}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                    <span className="group/en relative inline-flex cursor-default">
                      {p.enrollments.toLocaleString()}
                      <span className="pointer-events-none invisible absolute bottom-[calc(100%+4px)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--primary-text)] px-3 py-2 text-xs text-white opacity-0 shadow-md transition-all group-hover/en:visible group-hover/en:opacity-100">
                        {enrollLabel} (30d): {p.salesLast30d}
                        <span className="absolute left-1/2 top-full -translate-x-1/2 border-6 border-transparent border-t-[var(--primary-text)]" />
                      </span>
                    </span>
                  </td>
                  <td className="max-xl:hidden border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                    {p.rating != null ? (
                      <div className="flex items-center gap-1">
                        <IconStar className="h-3.5 w-3.5 shrink-0 text-[var(--warning-color)]" />
                        {p.rating}
                        <span className="ml-0.5 text-xs font-normal text-[var(--mobile-secondary)]">
                          ({p.reviewCount})
                        </span>
                      </div>
                    ) : (
                      <span className="text-[#ccc]">—</span>
                    )}
                  </td>
                  <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle text-sm group-hover/row:bg-[var(--secondary-bg)]">
                    <span className="group/cr relative inline-flex cursor-default">
                      {p.created}
                      <span className="pointer-events-none invisible absolute bottom-[calc(100%+4px)] left-0 z-10 min-w-[200px] rounded-md bg-[var(--primary-text)] px-3 py-2 text-left text-xs text-white opacity-0 shadow-md transition-all group-hover/cr:visible group-hover/cr:opacity-100">
                        Created: {p.createdFull}
                        <br />
                        Updated: {p.updatedFull}
                        <span className="absolute left-4 top-full border-6 border-transparent border-t-[var(--primary-text)]" />
                      </span>
                    </span>
                  </td>
                  <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                    <div className="flex flex-wrap items-center gap-1">
                      {viewVis.map((key) => {
                        const { label, Icon } = viewLinkMeta(key);
                        return (
                          <CircleIconBtn
                            key={key}
                            tooltip={label}
                            onClick={() => showToast(`Opening ${label}`, 'info')}
                            icon={<Icon />}
                          />
                        );
                      })}
                      {viewMore > 0 ? (
                        <button
                          type="button"
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--button-line)] text-[10px] font-semibold text-[var(--icon-default)] hover:bg-[var(--button-glow)] hover:text-white"
                          onClick={() => showToast('Additional options would be shown here', 'info')}
                        >
                          +{viewMore}
                        </button>
                      ) : null}
                    </div>
                  </td>
                  <td className="border-b border-[var(--button-line)] bg-white px-4 py-3 align-middle group-hover/row:bg-[var(--secondary-bg)]">
                    <div className="flex flex-wrap items-center gap-1">
                      {linkVis.map((key) => {
                        const { label, Icon } = linkedMeta(key);
                        return (
                          <CircleIconBtn
                            key={key}
                            tooltip={label}
                            linked
                            onClick={() => showToast(`Navigate: ${label}`, 'info')}
                            icon={<Icon />}
                          />
                        );
                      })}
                      {linkMore > 0 ? (
                        <button
                          type="button"
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--button-line)] text-[10px] font-semibold hover:bg-[var(--button-glow)] hover:text-white"
                          onClick={() => showToast('Additional options would be shown here', 'info')}
                        >
                          +{linkMore}
                        </button>
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
                          setRowMenuId((id) => (id === p.id ? null : p.id));
                        }}
                      >
                        <IconRowMore />
                      </button>
                      {rowMenuId === p.id ? (
                        <div
                          className="absolute right-0 top-[calc(100%+4px)] z-[150] min-w-[220px] rounded-lg bg-white py-1 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <RowDdItem icon={<IconPreview />} label="Preview" onClick={() => { setRowMenuId(null); applyRowAction('preview', p); }} />
                          <RowDdItem icon={<IconEdit />} label="Edit Product" onClick={() => { setRowMenuId(null); applyRowAction('edit', p); }} />
                          {isPending ? (
                            <>
                              <RowDdItem icon={<IconApprove />} label="Approve" onClick={() => { setRowMenuId(null); applyRowAction('approve', p); }} />
                              <RowDdItem icon={<IconReject />} label="Reject" onClick={() => { setRowMenuId(null); applyRowAction('reject', p); }} />
                            </>
                          ) : null}
                          <RowDdItem
                            icon={isPublished ? <IconUnpublish /> : <IconPublish />}
                            label={isPublished ? 'Unpublish' : 'Publish'}
                            onClick={() => {
                              setRowMenuId(null);
                              applyRowAction(isPublished ? 'unpublish' : 'publish', p);
                            }}
                          />
                          <div className="my-1 h-px bg-[var(--button-line)]" />
                          <RowDdItem icon={<IconManageInstructors />} label="Manage Instructors" onClick={() => { setRowMenuId(null); applyRowAction('manage-instructors', p); }} />
                          <RowDdItem icon={<IconSync />} label="Sync with LW" onClick={() => { setRowMenuId(null); applyRowAction('sync', p); }} />
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

      <div className="flex flex-col gap-3 border-t border-[var(--button-line)] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--mobile-secondary)]">
          <span>
            Showing <span className="font-semibold text-[var(--primary-text)]">{startIdx}</span>-
            <span className="font-semibold text-[var(--primary-text)]">{endIdx}</span> of{' '}
            <span className="font-semibold text-[var(--primary-text)]">{total.toLocaleString()}</span> products
          </span>
          <div className="flex items-center gap-1.5">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="rounded border-0 bg-[#f1f1f1] px-2 py-1 text-sm font-semibold"
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
          <PageBtn disabled={safePage <= 1} onClick={() => setPage(1)} label="First" icon="first" />
          <PageBtn disabled={safePage <= 1} onClick={() => setPage((x) => Math.max(1, x - 1))} label="Prev" icon="prev" />
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((pn) => (
            <button
              key={pn}
              type="button"
              className={`flex h-8 w-8 items-center justify-center rounded-md border text-sm ${
                pn === safePage
                  ? 'border-[var(--button-glow)] bg-[var(--button-glow)] text-white'
                  : 'border-[var(--button-line)] bg-white hover:bg-[var(--secondary-bg)]'
              }`}
              onClick={() => setPage(pn)}
            >
              {pn}
            </button>
          ))}
          <PageBtn disabled={safePage >= totalPages} onClick={() => setPage((x) => Math.min(totalPages, x + 1))} label="Next" icon="next" />
          <PageBtn disabled={safePage >= totalPages} onClick={() => setPage(totalPages)} label="Last" icon="last" />
        </div>
      </div>
    </div>
  );
}

function Dropdown({
  open,
  onToggle,
  label,
  icon,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  label: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md border border-[var(--button-line)] bg-[var(--default-button-bg)] px-4 py-2 text-sm font-medium text-[var(--icon-default)] hover:bg-[#ebebeb]"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
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
          className="absolute right-0 top-[calc(100%+8px)] z-[100] max-h-[min(70vh,420px)] min-w-[200px] overflow-y-auto rounded-lg bg-white py-1 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

function CircleIconBtn({
  tooltip,
  onClick,
  icon,
  linked,
}: {
  tooltip: string;
  onClick: () => void;
  icon: ReactNode;
  linked?: boolean;
}) {
  return (
    <button
      type="button"
      className={`group/v relative flex h-7 w-7 items-center justify-center rounded-full bg-[var(--secondary-bg)] text-[var(--icon-default)] transition-transform hover:-translate-y-0.5 hover:bg-[var(--button-glow)] hover:text-white ${linked ? 'hover:!bg-[var(--info-color)]' : ''}`}
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

function RowDdItem({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-[var(--secondary-bg)]"
      onClick={onClick}
    >
      <span className="h-4 w-4 shrink-0 [&_svg]:h-4 [&_svg]:w-4">{icon}</span>
      {label}
    </button>
  );
}

function PageBtn({
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
      className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--button-line)] bg-white disabled:cursor-not-allowed disabled:opacity-50 hover:bg-[var(--secondary-bg)]"
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

function IconSortGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.75 12H1V10.5H1.75H5.25H6V12H5.25H1.75ZM1.75 7.75H1V6.25H1.75H4.25H5V7.75H4.25H1.75ZM1.75 3.5H1V2H1.75H7.25H8V3.5H7.25H1.75ZM12.5303 14.7803C12.2374 15.0732 11.7626 15.0732 11.4697 14.7803L9.21967 12.5303L8.68934 12L9.75 10.9393L10.2803 11.4697L11.25 12.4393V2.75V2H12.75V2.75V12.4393L13.7197 11.4697L14.25 10.9393L15.3107 12L14.7803 12.5303L12.5303 14.7803Z"
      />
    </svg>
  );
}

function IconFilterGlyph() {
  return (
    <svg viewBox="0 0 512 512" width="16" height="16" aria-hidden>
      <path
        fill="currentColor"
        d="M0 416c0 13.3 10.7 24 24 24l59.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 440c13.3 0 24-10.7 24-24s-10.7-24-24-24l-251.7 0c-10.2-32.5-40.5-56-76.3-56s-66.1 23.5-76.3 56L24 392c-13.3 0-24 10.7-24 24zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-35.8 0-66.1 23.5-76.3 56L24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l251.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56l59.7 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-59.7 0c-10.2-32.5-40.5-56-76.3-56zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm76.3-56C258.1 39.5 227.8 16 192 16s-66.1 23.5-76.3 56L24 72C10.7 72 0 82.7 0 96s10.7 24 24 24l91.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 120c13.3 0 24-10.7 24-24s-10.7-24-24-24L268.3 72z"
      />
    </svg>
  );
}

function IconStatTotal() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function IconStatPublished() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function IconStatPending() {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className="h-6 w-6">
      <path d="M480-200q117 0 198.5-81.5T760-480q0-107-70.5-186.5T513-757q-14-2-23.5 7t-9.5 23v247L311-303q-9 10-8.5 23t10.5 21q35 29 78 44t89 15m0 120q-82 0-155-31.5t-127.5-86-86-127.5T80-480q0-83 31.5-156t86-127T325-848.5 480-880q83 0 156 31.5T763-763t85.5 127T880-480q0 82-31.5 155T763-197.5t-127 86T480-80m0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140m0-340" />
    </svg>
  );
}

function IconStatDrafts() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function IconProductDetails() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconPricingHistory() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function IconRecommendations() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
    </svg>
  );
}

function IconAuditLog() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function IconSchool() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.33333 3.25C8.31123 3.25 8.29004 3.25878 8.27441 3.27441C8.25878 3.29004 8.25 3.31123 8.25 3.33333V8.02267L11.3637 11.1363C11.5043 11.277 11.5833 11.4678 11.5833 11.6667V16.75H16.75V3.33333C16.75 3.31123 16.7412 3.29003 16.7256 3.27441C16.71 3.25878 16.6888 3.25 16.6667 3.25H8.33333ZM10.0833 16.75V11.9773L6.66667 8.56066L3.25 11.9773V16.75H5.91667V14.1667C5.91667 13.7525 6.25245 13.4167 6.66667 13.4167C7.08088 13.4167 7.41667 13.7525 7.41667 14.1667V16.75H10.0833ZM6.75 6.75462C6.53133 6.73031 6.30401 6.80199 6.13634 6.96967L1.96967 11.1363C1.82902 11.277 1.75 11.4678 1.75 11.6667V17.5C1.75 17.9142 2.08579 18.25 2.5 18.25H17.5C17.9142 18.25 18.25 17.9142 18.25 17.5V3.33333C18.25 2.91341 18.0832 2.51068 17.7863 2.21375C17.4893 1.91681 17.0866 1.75 16.6667 1.75H8.33333C7.91341 1.75 7.51068 1.91681 7.21375 2.21375C6.91682 2.51068 6.75 2.91341 6.75 3.33333V6.75462ZM10.8333 5.08333C11.2475 5.08333 11.5833 5.41912 11.5833 5.83333V5.84167C11.5833 6.25588 11.2475 6.59167 10.8333 6.59167C10.4191 6.59167 10.0833 6.25588 10.0833 5.84167V5.83333C10.0833 5.41912 10.4191 5.08333 10.8333 5.08333ZM14.1667 5.08333C14.5809 5.08333 14.9167 5.41912 14.9167 5.83333V5.84167C14.9167 6.25588 14.5809 6.59167 14.1667 6.59167C13.7525 6.59167 13.4167 6.25588 13.4167 5.84167V5.83333C13.4167 5.41912 13.7525 5.08333 14.1667 5.08333ZM14.1667 8.41667C14.5809 8.41667 14.9167 8.75245 14.9167 9.16667V9.175C14.9167 9.58921 14.5809 9.925 14.1667 9.925C13.7525 9.925 13.4167 9.58921 13.4167 9.175V9.16667C13.4167 8.75245 13.7525 8.41667 14.1667 8.41667ZM14.1667 11.75C14.5809 11.75 14.9167 12.0858 14.9167 12.5V12.5083C14.9167 12.9225 14.5809 13.2583 14.1667 13.2583C13.7525 13.2583 13.4167 12.9225 13.4167 12.5083V12.5C13.4167 12.0858 13.7525 11.75 14.1667 11.75Z"
      />
    </svg>
  );
}

function IconEnrollments() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconTransactions() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function IconReviews() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function IconCoupons() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function IconChecklist() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function IconApiLogs() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <path d="M5 9.897c0-1.714 1.46-3.104 3.26-3.104.275-1.22 1.255-2.215 2.572-2.611 1.317-.397 2.77-.134 3.811.69 1.042.822 1.514 2.08 1.239 3.3h.693a2.42 2.42 0 0 1 2.425 2.414 2.42 2.42 0 0 1-2.425 2.414H8.26c-1.8 0-3.26-1.39-3.26-3.103z" />
      <path d="M12 13v3" />
      <circle cx="12" cy="18" r="2" />
      <path d="M14 18h7M3 18h7" />
    </svg>
  );
}

function IconRowMore() {
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

function IconPreview() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function IconApprove() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconReject() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconPublish() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconUnpublish() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function IconManageInstructors() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconSync() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

function IconStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

