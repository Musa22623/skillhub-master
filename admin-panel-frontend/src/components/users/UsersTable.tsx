'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  SearchIcon,
  SortIcon,
  FilterIcon,
  ChevronDownIcon,
  MoreHorizontalIcon,
  CopyIcon,
  HelpCircleIcon,
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
  ChevronsRightIcon
} from '@/components/icons';

interface User {
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

interface UsersTableProps {
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

const Checkbox: React.FC<{ checked: boolean; onChange: (checked: boolean) => void; }> = ({ checked, onChange }) => (
  <div
    className={`w-[18px] h-[18px] border-2 rounded cursor-pointer transition-all duration-200 flex items-center justify-center
      ${checked 
        ? 'bg-[#458BC1] border-[#458BC1]' 
        : 'bg-white border-gray-300 hover:border-[#458BC1]'
      }`}
    onClick={() => onChange(!checked)}
  >
    {checked && (
      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    )}
  </div>
);

const Dropdown: React.FC<{
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}> = ({ trigger, children, isOpen, onToggle, className = "" }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div onClick={onToggle}>
        {trigger}
      </div>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[180px] z-50 animate-in fade-in-0 zoom-in-95 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};

const DropdownItem: React.FC<{
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ icon, children, onClick, className = "" }) => (
  <div
    className={`flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors ${className}`}
    onClick={onClick}
  >
    {icon && <span className="w-4 h-4 text-gray-500">{icon}</span>}
    <span>{children}</span>
  </div>
);

const Tooltip: React.FC<{ content: string; children: React.ReactNode; }> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs text-white bg-gray-900 rounded-md whitespace-nowrap z-50">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  );
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
  totalUsers = 8432,
  currentPage = 1,
  pageSize = 25,
  loading = false
}) => {
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [bulkActionsDropdownOpen, setBulkActionsDropdownOpen] = useState(false);
  const [actionDropdowns, setActionDropdowns] = useState<Record<string, boolean>>({});
  const [viewDropdowns, setViewDropdowns] = useState<Record<string, boolean>>({});

  // Default users data (matching the original HTML)
  const defaultUsers: User[] = [
    {
      id: '1',
      internalId: 'USR-8FJ39K2L',
      lwId: 'LW-4829037',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      avatar: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png',
      role: 'instructor',
      status: 'active',
      joinedDate: 'Jan 15, 2025',
      lastLogin: 'Feb 22, 2025 10:15:32 AM',
      registerIP: '85.124.33.98',
      lastLoginIP: '85.124.35.102',
      tags: ['Premium', 'Verified', 'Beta Tester', 'Course Creator']
    },
    {
      id: '2',
      internalId: 'USR-9XM45RN7',
      lwId: 'LW-5932184',
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      avatar: 'https://i.ibb.co/Bb24RDc/AVATAR-Kostis-Kapelonis.png',
      role: 'student',
      status: 'active',
      joinedDate: 'Jan 28, 2025',
      lastLogin: 'Feb 25, 2025 3:22:18 PM',
      registerIP: '192.168.45.72',
      lastLoginIP: '192.168.45.78',
      tags: ['Beginner', 'Mobile']
    },
    {
      id: '3',
      internalId: 'USR-7JK2L3P9',
      lwId: 'LW-6847293',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@example.com',
      avatar: 'https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg',
      role: 'support',
      status: 'pending',
      joinedDate: 'Feb 10, 2025',
      lastLogin: 'Feb 25, 2025 9:18:47 AM',
      registerIP: '45.89.127.55',
      lastLoginIP: '45.89.127.60',
      tags: ['Support', 'UK', 'Remote Worker']
    },
    {
      id: '4',
      internalId: 'USR-4MN8Q5R2',
      lwId: 'LW-7435629',
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      avatar: 'https://i.ibb.co/3m3G6rWg/AVATAR-laurentfa.png',
      role: 'admin',
      status: 'suspended',
      joinedDate: 'Dec 03, 2024',
      lastLogin: 'Feb 26, 2025 8:45:12 AM',
      registerIP: '203.45.128.91',
      lastLoginIP: '203.45.128.95',
      tags: ['Admin', 'Senior', 'Full Permissions', 'System Manager', 'Technical Lead']
    },
    {
      id: '5',
      internalId: 'USR-3TY9P6Q8',
      lwId: 'LW-8947251',
      name: 'Lisa Thompson',
      email: 'lisa.thompson@example.com',
      avatar: 'https://i.ibb.co/8nYndwPw/AVATAR-midtone-ux-instrgram.jpg',
      role: 'student',
      status: 'inactive',
      joinedDate: 'Feb 20, 2025',
      lastLogin: 'Feb 25, 2025 11:30:45 AM',
      registerIP: '98.236.147.22',
      lastLoginIP: '98.236.147.28',
      tags: ['Trial']
    }
  ];

  const currentUsers = users.length > 0 ? users : defaultUsers;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(new Set(currentUsers.map(user => user.id)));
    } else {
      setSelectedUsers(new Set());
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    const newSelected = new Set(selectedUsers);
    if (checked) {
      newSelected.add(userId);
    } else {
      newSelected.delete(userId);
    }
    setSelectedUsers(newSelected);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleCopyUserId = (user: User) => {
    const copyText = `Internal User ID: ${user.internalId}\nLearnWorlds User ID: ${user.lwId}`;
    navigator.clipboard.writeText(copyText).then(() => {
      // Toast notification would be triggered here
      console.log('User IDs copied to clipboard!');
    });
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email).then(() => {
      // Toast notification would be triggered here
      console.log('Email copied to clipboard!');
    });
  };

  const getRoleClassName = (role: string) => {
    const baseClasses = "inline-block px-2.5 py-1 rounded-full text-xs font-medium capitalize";
    switch (role) {
      case 'instructor':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'student':
        return `${baseClasses} bg-cyan-100 text-cyan-800`;
      case 'support':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'admin':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusClassName = (status: string) => {
    const baseClasses = "inline-block px-2.5 py-1 rounded-full text-xs font-medium uppercase";
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'inactive':
        return `${baseClasses} bg-gray-100 text-gray-600`;
      case 'suspended':
        return `${baseClasses} bg-red-100 text-red-600`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-600`;
    }
  };

  const truncateEmail = (email: string) => {
    if (email.length <= 16) return email;
    const [localPart, domain] = email.split('@');
    if (localPart.length > 10) {
      return `${localPart.substring(0, 8)}...@${domain}`;
    }
    return `${localPart}@${domain.substring(0, 6)}...`;
  };

  const toggleActionDropdown = (userId: string) => {
    setActionDropdowns(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const toggleViewDropdown = (userId: string, type: 'view' | 'linked') => {
    setViewDropdowns(prev => ({
      ...prev,
      [`${userId}-${type}`]: !prev[`${userId}-${type}`]
    }));
  };

  const allSelected = currentUsers.length > 0 && selectedUsers.size === currentUsers.length;
  const someSelected = selectedUsers.size > 0 && selectedUsers.size < currentUsers.length;

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalUsers);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Search and Filters */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#458BC1] focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Dropdown
              trigger={
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                  <SortIcon size={16} />
                  Sort
                  <ChevronDownIcon size={16} />
                </button>
              }
              isOpen={sortDropdownOpen}
              onToggle={() => setSortDropdownOpen(!sortDropdownOpen)}
            >
              <DropdownItem onClick={() => onSort?.('name', 'asc')}>Full Name (A-Z)</DropdownItem>
              <DropdownItem onClick={() => onSort?.('name', 'desc')}>Full Name (Z-A)</DropdownItem>
              <DropdownItem onClick={() => onSort?.('email', 'asc')}>Email (A-Z)</DropdownItem>
              <DropdownItem onClick={() => onSort?.('email', 'desc')}>Email (Z-A)</DropdownItem>
              <DropdownItem onClick={() => onSort?.('joined', 'desc')}>Join Date (Newest First)</DropdownItem>
              <DropdownItem onClick={() => onSort?.('joined', 'asc')}>Join Date (Oldest First)</DropdownItem>
            </Dropdown>

            <Dropdown
              trigger={
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                  <FilterIcon size={16} />
                  Filter
                  <ChevronDownIcon size={16} />
                </button>
              }
              isOpen={filterDropdownOpen}
              onToggle={() => setFilterDropdownOpen(!filterDropdownOpen)}
            >
              <DropdownItem onClick={() => onFilter?.({ type: 'status' })}>Status</DropdownItem>
              <DropdownItem onClick={() => onFilter?.({ type: 'role' })}>Role</DropdownItem>
              <DropdownItem onClick={() => onFilter?.({ type: 'joinDate' })}>Join Date</DropdownItem>
              <DropdownItem onClick={() => onFilter?.({ type: 'lastLogin' })}>Last Login Date</DropdownItem>
              <DropdownItem onClick={() => onFilter?.({ type: 'country' })}>Country</DropdownItem>
            </Dropdown>

            <Dropdown
              trigger={
                <button 
                  className={`flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md text-sm font-medium transition-colors
                    ${selectedUsers.size > 0 
                      ? 'text-gray-900 hover:bg-gray-100' 
                      : 'text-gray-400 cursor-not-allowed'
                    }`}
                  disabled={selectedUsers.size === 0}
                >
                  Bulk Actions
                  <ChevronDownIcon size={16} />
                </button>
              }
              isOpen={bulkActionsDropdownOpen}
              onToggle={() => setBulkActionsDropdownOpen(!bulkActionsDropdownOpen)}
            >
              <DropdownItem 
                icon={<SuspendIcon size={16} />}
                onClick={() => onBulkAction?.('suspend', Array.from(selectedUsers))}
              >
                Suspend
              </DropdownItem>
              <DropdownItem 
                icon={<UserIcon size={16} />}
                onClick={() => onBulkAction?.('unsuspend', Array.from(selectedUsers))}
              >
                Unsuspend
              </DropdownItem>
              <DropdownItem 
                icon={<MailIcon size={16} />}
                onClick={() => onBulkAction?.('resend-verification', Array.from(selectedUsers))}
              >
                Resend Verification Email
              </DropdownItem>
              <DropdownItem 
                icon={<UserIcon size={16} />}
                onClick={() => onBulkAction?.('change-role', Array.from(selectedUsers))}
              >
                Change Role
              </DropdownItem>
              <DropdownItem 
                icon={<LayersIcon size={16} />}
                onClick={() => onBulkAction?.('enroll-products', Array.from(selectedUsers))}
              >
                Enroll in Product(s)
              </DropdownItem>
              <DropdownItem 
                icon={<TagIcon size={16} />}
                onClick={() => onBulkAction?.('tags', Array.from(selectedUsers))}
              >
                Add/Remove Tags
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-4 py-3 text-left">
                <Checkbox 
                  checked={allSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                User
                <Tooltip content="User information including name and internal ID">
                  <HelpCircleIcon className="inline ml-1 text-gray-400" />
                </Tooltip>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
                <Tooltip content="User's email address">
                  <HelpCircleIcon className="inline ml-1 text-gray-400" />
                </Tooltip>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Role
                <Tooltip content="User's role in the system">
                  <HelpCircleIcon className="inline ml-1 text-gray-400" />
                </Tooltip>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Joined
                <Tooltip content="Date when user joined the platform">
                  <HelpCircleIcon className="inline ml-1 text-gray-400" />
                </Tooltip>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
                <Tooltip content="Current user status">
                  <HelpCircleIcon className="inline ml-1 text-gray-400" />
                </Tooltip>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                IP Info
                <Tooltip content="Registration and last login IP addresses">
                  <HelpCircleIcon className="inline ml-1 text-gray-400" />
                </Tooltip>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                Tags
                <Tooltip content="User tags and categories">
                  <HelpCircleIcon className="inline ml-1 text-gray-400" />
                </Tooltip>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                View
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Linked To
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedUsers.has(user.id)}
                    onChange={(checked) => handleSelectUser(user.id, checked)}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {user.name}
                      </div>
                      <div 
                        className="text-xs text-gray-500 cursor-pointer hover:text-[#458BC1] flex items-center gap-1"
                        onClick={() => handleCopyUserId(user)}
                      >
                        {user.internalId}
                        <CopyIcon size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div 
                    className="text-sm text-gray-900 cursor-pointer hover:text-[#458BC1] flex items-center gap-2 max-w-[160px]"
                    onClick={() => handleCopyEmail(user.email)}
                  >
                    <span className="truncate">{truncateEmail(user.email)}</span>
                    <CopyIcon size={14} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={getRoleClassName(user.role)}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Tooltip content={`Joined: ${user.joinedDate}\nLast Login: ${user.lastLogin}`}>
                    <div className="text-sm text-gray-900 cursor-help">
                      {user.joinedDate}
                    </div>
                  </Tooltip>
                </td>
                <td className="px-4 py-3">
                  <span className={getStatusClassName(user.status)}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <Tooltip content={`Register IP: ${user.registerIP}\nLast Login IP: ${user.lastLoginIP}`}>
                    <div className="text-sm font-mono text-gray-600 cursor-help">
                      {user.registerIP}
                    </div>
                  </Tooltip>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <div className="flex items-center gap-1 flex-wrap max-w-[150px]">
                    {user.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {user.tags.length > 2 && (
                      <Tooltip content={user.tags.join('\n')}>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-200 text-gray-600 rounded cursor-pointer hover:bg-[#458BC1] hover:text-white transition-colors">
                          +{user.tags.length - 2}
                        </span>
                      </Tooltip>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Tooltip content="Account Details">
                      <button className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#458BC1] hover:text-white transition-all duration-200 flex items-center justify-center">
                        <UserIcon size={14} />
                      </button>
                    </Tooltip>
                    <Tooltip content="Preferences">
                      <button className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#458BC1] hover:text-white transition-all duration-200 flex items-center justify-center">
                        <SettingsIcon size={14} />
                      </button>
                    </Tooltip>
                    <Tooltip content="Billing Information">
                      <button className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#458BC1] hover:text-white transition-all duration-200 flex items-center justify-center">
                        <CreditCardIcon size={14} />
                      </button>
                    </Tooltip>
                    <Tooltip content="Login History">
                      <button className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#458BC1] hover:text-white transition-all duration-200 flex items-center justify-center">
                        <ShieldIcon size={14} />
                      </button>
                    </Tooltip>
                    <span className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-semibold cursor-pointer hover:bg-[#458BC1] hover:text-white transition-colors">
                      +4
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Tooltip content="Enrollments">
                      <button className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#458BC1] hover:text-white transition-all duration-200 flex items-center justify-center">
                        <DocumentIcon size={14} />
                      </button>
                    </Tooltip>
                    <Tooltip content="Transactions">
                      <button className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#458BC1] hover:text-white transition-all duration-200 flex items-center justify-center">
                        <CreditCardIcon size={14} />
                      </button>
                    </Tooltip>
                    <Tooltip content="Reviews Left">
                      <button className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#458BC1] hover:text-white transition-all duration-200 flex items-center justify-center">
                        <HeartIcon size={14} />
                      </button>
                    </Tooltip>
                    <span className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-semibold cursor-pointer hover:bg-[#458BC1] hover:text-white transition-colors">
                      +3
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Dropdown
                    trigger={
                      <button className="w-8 h-8 rounded hover:bg-gray-100 flex items-center justify-center">
                        <MoreHorizontalIcon size={18} className="text-gray-500" />
                      </button>
                    }
                    isOpen={actionDropdowns[user.id] || false}
                    onToggle={() => toggleActionDropdown(user.id)}
                  >
                    {user.status === 'suspended' ? (
                      <DropdownItem 
                        icon={<UserIcon size={16} />}
                        onClick={() => onUserAction?.('unsuspend', user.id)}
                      >
                        Unsuspend
                      </DropdownItem>
                    ) : (
                      <DropdownItem 
                        icon={<SuspendIcon size={16} />}
                        onClick={() => onUserAction?.('suspend', user.id)}
                      >
                        Suspend
                      </DropdownItem>
                    )}
                    <DropdownItem 
                      icon={<MailIcon size={16} />}
                      onClick={() => onUserAction?.('resend-verification', user.id)}
                    >
                      Resend Verification
                    </DropdownItem>
                    <DropdownItem 
                      icon={<UserIcon size={16} />}
                      onClick={() => onUserAction?.('change-role', user.id)}
                    >
                      Change Role
                    </DropdownItem>
                    <DropdownItem 
                      icon={<LayersIcon size={16} />}
                      onClick={() => onUserAction?.('enroll-products', user.id)}
                    >
                      Enroll in Product(s)
                    </DropdownItem>
                    <DropdownItem 
                      icon={<TagIcon size={16} />}
                      onClick={() => onUserAction?.('tags', user.id)}
                    >
                      Add/Remove Tags
                    </DropdownItem>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>
            Showing <span className="font-semibold text-gray-900">{startIndex}-{endIndex}</span> of{' '}
            <span className="font-semibold text-gray-900">{totalUsers.toLocaleString()}</span> users
          </span>
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <div className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1 cursor-pointer hover:bg-gray-200 transition-colors">
              <span className="font-semibold text-gray-900">{pageSize}</span>
              <ChevronDownIcon size={16} />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            className="p-2 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
            onClick={() => onPageChange?.(1)}
          >
            <ChevronsLeftIcon size={16} />
          </button>
          <button 
            className="p-2 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
            onClick={() => onPageChange?.(currentPage - 1)}
          >
            <ChevronLeftIcon size={16} />
          </button>
          
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-8 h-8 rounded border text-sm font-medium transition-colors
                ${page === currentPage 
                  ? 'bg-[#458BC1] border-[#458BC1] text-white' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              onClick={() => onPageChange?.(page)}
            >
              {page}
            </button>
          ))}
          
          <button 
            className="p-2 rounded border border-gray-300 hover:bg-gray-50"
            onClick={() => onPageChange?.(currentPage + 1)}
          >
            <ChevronRightIcon size={16} />
          </button>
          <button 
            className="p-2 rounded border border-gray-300 hover:bg-gray-50"
            onClick={() => onPageChange?.(Math.ceil(totalUsers / pageSize))}
          >
            <ChevronsRightIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};