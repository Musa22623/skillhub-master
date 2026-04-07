'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  SearchIcon,
  SortIcon,
  FilterIcon,
  ChevronDownIcon,
  MoreHorizontalIcon,
  CopyIcon,
  UserIcon,
  SettingsIcon,
  CreditCardIcon,
  ShieldIcon,
  BarChartIcon,
  DocumentIcon,
  HeartIcon,
  CalendarIcon,
  SuspendIcon,
  MailIcon,
  LayersIcon,
  UsersGroupIcon,
  TagIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from '@/components/icons';
import { DataTable, type DataTableColumn } from '@/components/ui/DataTable';

export interface User {
  id: string;
  internalId: string;
  lwId: string;
  name: string;
  email: string;
  avatar: string;
  role: 'instructor' | 'student' | 'support' | 'admin';
  status: 'active' | 'pending' | 'inactive' | 'suspended';
  joinedDate: string;
  lastLogin: string;
  registerIP: string;
  lastLoginIP: string;
  tags: string[];
}

export interface UsersTableProps {
  users?: User[];
  onUserAction?: (action: string, userId: string) => void;
  onBulkAction?: (action: string, userIds: string[]) => void;
  onSearch?: (query: string) => void;
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  onFilter?: (filters: Record<string, any>) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  totalUsers?: number;
  currentPage?: number;
  pageSize?: number;
  loading?: boolean;
}

const ROLE_COLORS: Record<User['role'], string> = {
  admin: 'bg-purple-100 text-purple-700',
  instructor: 'bg-blue-100 text-blue-700',
  student: 'bg-green-100 text-green-700',
  support: 'bg-amber-100 text-amber-700',
};

const STATUS_COLORS: Record<User['status'], string> = {
  active: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  inactive: 'bg-gray-100 text-gray-600',
  suspended: 'bg-red-100 text-red-700',
};

export const UsersTable: React.FC<UsersTableProps> = ({
  users = [],
  onUserAction,
  onBulkAction,
  onSearch,
  onSort,
  onFilter,
  onPageChange,
  onPageSizeChange,
  totalUsers,
  currentPage = 1,
  pageSize = 25,
  loading = false,
}) => {
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [openRow, setOpenRow] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const data = users;
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter((u) =>
      [u.name, u.email, u.internalId, u.lwId].some((field) => field.toLowerCase().includes(q)),
    );
  }, [search, data]);

  const allSelected = filtered.length > 0 && filtered.every((u) => selectedIds.has(u.id));
  const someSelected = selectedIds.size > 0 && !allSelected;

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = (checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) filtered.forEach((u) => next.add(u.id));
      else filtered.forEach((u) => next.delete(u.id));
      return next;
    });
  };

  useEffect(() => {
    onSearch?.(search);
  }, [search, onSearch]);

  const columns: DataTableColumn<User>[] = [
    {
      key: 'user',
      header: 'User',
      className: 'min-w-[220px]',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.avatar} alt={row.name} className="h-10 w-10 rounded-full object-cover" />
          <div className="min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">{row.name}</div>
            <div
              className="text-xs text-gray-500 cursor-pointer hover:text-[#458BC1] flex items-center gap-1"
              onClick={() => navigator.clipboard.writeText(row.internalId)}
            >
              {row.internalId}
              <CopyIcon size={12} />
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      className: 'min-w-[180px]',
      render: (row) => (
        <div
          className="text-sm text-gray-900 cursor-pointer hover:text-[#458BC1] flex items-center gap-2 max-w-[200px]"
          onClick={() => navigator.clipboard.writeText(row.email)}
        >
          <span className="truncate">{row.email}</span>
          <CopyIcon size={14} />
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (row) => (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${ROLE_COLORS[row.role]}`}>
          {row.role}
        </span>
      ),
    },
    {
      key: 'joined',
      header: 'Joined',
      render: (row) => (
        <div className="text-sm text-gray-800">
          <div>{row.joinedDate}</div>
          <div className="text-xs text-gray-500">Last login {row.lastLogin}</div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${STATUS_COLORS[row.status]}`}>
          {row.status}
        </span>
      ),
    },
    {
      key: 'ip',
      header: 'IP Info',
      className: 'hidden lg:table-cell min-w-[180px]',
      render: (row) => (
        <div className="text-xs text-gray-700">
          <div>Reg: {row.registerIP}</div>
          <div>Last: {row.lastLoginIP}</div>
        </div>
      ),
    },
    {
      key: 'tags',
      header: 'Tags',
      className: 'hidden md:table-cell min-w-[160px]',
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.tags.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs">
              {t}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: 'view',
      header: 'View',
      render: (row) => (
        <div className="flex items-center gap-2 text-gray-500">
          <SettingsIcon size={16} />
          <CreditCardIcon size={16} />
          <ShieldIcon size={16} />
          <BarChartIcon size={16} />
          <DocumentIcon size={16} />
          <HeartIcon size={16} />
          <CalendarIcon size={16} />
        </div>
      ),
    },
    {
      key: 'linked',
      header: 'Linked To',
      render: () => (
        <div className="flex items-center gap-2 text-gray-600">
          <UsersGroupIcon size={16} />
          <TagIcon size={16} />
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="relative">
          <button
            className="w-8 h-8 rounded hover:bg-gray-100 flex items-center justify-center"
            onClick={() => setOpenRow((prev) => (prev === row.id ? null : row.id))}
          >
            <MoreHorizontalIcon size={18} className="text-gray-500" />
          </button>
          {openRow === row.id ? (
            <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[180px] z-20">
              {(row.status === 'suspended'
                ? [['unsuspend', 'Unsuspend']]
                : [['suspend', 'Suspend']]
              ).concat([
                ['resend-verification', 'Resend Verification'],
                ['change-role', 'Change Role'],
                ['enroll-products', 'Enroll in Product(s)'],
                ['tags', 'Add/Remove Tags'],
              ]).map(([action, label]) => (
                <button
                  key={action}
                  onClick={() => {
                    onUserAction?.(action, row.id);
                    setOpenRow(null);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                >
                  {label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ),
    },
  ];

  const total = totalUsers ?? users.length;
  const start = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(total, start + filtered.length - 1);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between border-b border-gray-100 bg-[#FAFAFA]">
        <div className="flex w-full max-w-xl items-center gap-2 bg-white border border-gray-200 rounded-md px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <SearchIcon size={18} className="text-gray-500" />
          <input
            ref={searchRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name, email or ID"
            className="flex-1 text-sm outline-none bg-transparent"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => onSort?.('name', 'asc')}
          >
            <SortIcon size={16} /> Sort
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => onFilter?.({ status: 'active' })}
          >
            <FilterIcon size={16} /> Filter
          </button>
          <div className="relative">
            <button
              className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm border ${
                selectedIds.size ? 'border-[#458BC1] text-[#03314B] bg-[#E9F2FB]' : 'border-gray-200 text-gray-400 bg-white'
              }`}
              disabled={!selectedIds.size}
            >
              <ChevronDownIcon size={16} /> Bulk Actions
            </button>
            {selectedIds.size > 0 && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px] z-20">
                {[
                  ['suspend', 'Suspend'],
                  ['unsuspend', 'Unsuspend'],
                  ['resend-verification', 'Resend Verification'],
                  ['change-role', 'Change Role'],
                  ['enroll-products', 'Enroll in Product(s)'],
                  ['tags', 'Add/Remove Tags'],
                ].map(([action, label]) => (
                  <button
                    key={action}
                    onClick={() => onBulkAction?.(action, Array.from(selectedIds))}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <DataTable
        data={filtered}
        getRowId={(row) => row.id}
        selectable
        selectedIds={selectedIds}
        onToggleRow={(id) => toggleRow(id as string)}
        onToggleAll={(checked) => toggleAll(checked)}
        allSelected={allSelected}
        someSelected={someSelected}
        tableClassName="min-w-[1100px]"
        columns={columns}
      />

      {/* Pagination */}
      <div className="flex flex-col gap-2 px-4 py-3 border-t border-gray-200 bg-gray-50 sm:flex-row sm:items-center sm:justify-between text-sm text-gray-700">
        <div>
          Showing <span className="font-semibold text-gray-900">{start}-{end}</span> of{' '}
          <span className="font-semibold text-gray-900">{total}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Rows per page</span>
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded px-2 py-1">
            <span className="font-semibold text-gray-900">{pageSize}</span>
            <ChevronDownIcon size={14} />
          </div>
          <div className="flex items-center gap-1">
            <button
              className="p-2 rounded border border-gray-300 hover:bg-white disabled:opacity-50"
              onClick={() => onPageChange?.(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeftIcon size={16} />
            </button>
            <button
              className="p-2 rounded border border-gray-300 hover:bg-white disabled:opacity-50"
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon size={16} />
            </button>
            <button
              className="p-2 rounded border border-gray-300 hover:bg-white"
              onClick={() => onPageChange?.(currentPage + 1)}
            >
              <ChevronRightIcon size={16} />
            </button>
            <button
              className="p-2 rounded border border-gray-300 hover:bg-white"
              onClick={() => {
                const last = Math.max(1, Math.ceil(total / pageSize));
                onPageChange?.(last);
              }}
            >
              <ChevronsRightIcon size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
