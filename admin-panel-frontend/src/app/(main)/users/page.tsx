'use client';

import React, { useState, useCallback } from 'react';
import { PlusIcon } from '@/components/icons';
import { UserStatsCards } from '@/components/users/UserStatsCards';
import { UsersTable } from '@/components/users/UsersTable';
import { ToastProvider, useToast } from '@/components/ui/Toast';

const UsersPageContent: React.FC = () => {
  const { showToast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [totalUsers, setTotalUsers] = useState(8432);

  // Handler functions
  const handleUserAction = useCallback((action: string, userId: string) => {
    switch (action) {
      case 'suspend':
        showToast(`User ${userId} has been suspended`, 'success');
        break;
      case 'unsuspend':
        showToast(`User ${userId} has been unsuspended`, 'success');
        break;
      case 'resend-verification':
        showToast(`Verification email sent to user ${userId}`, 'info');
        break;
      case 'change-role':
        showToast(`Role change dialog would open for user ${userId}`, 'info');
        break;
      case 'enroll-products':
        showToast(`Product enrollment dialog would open for user ${userId}`, 'info');
        break;
      case 'tags':
        showToast(`Tag management dialog would open for user ${userId}`, 'info');
        break;
      default:
        showToast(`${action} action would be performed on user ${userId}`, 'info');
    }
  }, [showToast]);

  const handleBulkAction = useCallback((action: string, userIds: string[]) => {
    switch (action) {
      case 'suspend':
        showToast(`${userIds.length} users have been suspended`, 'success');
        break;
      case 'unsuspend':
        showToast(`${userIds.length} users have been unsuspended`, 'success');
        break;
      case 'resend-verification':
        showToast(`Verification emails sent to ${userIds.length} users`, 'info');
        break;
      case 'change-role':
        showToast(`Role change dialog would open for ${userIds.length} users`, 'info');
        break;
      case 'enroll-products':
        showToast(`Product enrollment dialog would open for ${userIds.length} users`, 'info');
        break;
      case 'tags':
        showToast(`Tag management dialog would open for ${userIds.length} users`, 'info');
        break;
      default:
        showToast(`${action} action would be applied to ${userIds.length} selected users`, 'info');
    }
  }, [showToast]);

  const handleSearch = useCallback((query: string) => {
    if (query.trim()) {
      showToast(`Searching for: "${query}"`, 'info');
    }
    // Here you would typically call an API to search users
    // setLoading(true);
    // fetchUsers({ search: query, page: 1, pageSize });
  }, [showToast]);

  const handleSort = useCallback((field: string, direction: 'asc' | 'desc') => {
    showToast(`Sorting by ${field} (${direction})`, 'info');
    // Here you would typically call an API to sort users
    // setLoading(true);
    // fetchUsers({ sort: field, direction, page: currentPage, pageSize });
  }, [showToast]);

  const handleFilter = useCallback((filters: Record<string, any>) => {
    showToast(`Filter by ${JSON.stringify(filters)} would be applied`, 'info');
    // Here you would typically call an API to filter users
    // setLoading(true);
    // fetchUsers({ filters, page: 1, pageSize });
  }, [showToast]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    showToast(`Navigating to page ${page}`, 'info');
    // Here you would typically call an API to get the specific page
    // setLoading(true);
    // fetchUsers({ page, pageSize });
  }, [showToast]);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    showToast(`Changed page size to ${newPageSize}`, 'info');
    // Here you would typically call an API with the new page size
    // setLoading(true);
    // fetchUsers({ page: 1, pageSize: newPageSize });
  }, [showToast]);

  const handleNewAction = useCallback(() => {
    showToast('New Action functionality would be implemented here', 'info');
    // This would typically open a modal or navigate to a new user creation page
  }, [showToast]);

  return (
    <div className="min-h-screen bg-[#F8FCFF] p-5">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-[#343637]">Users</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleNewAction}
              className="flex items-center gap-2 px-4 py-2 bg-[#458BC1] text-white rounded-md text-sm font-medium hover:bg-[#3A7BAF] transition-colors"
            >
              <PlusIcon size={16} />
              New Action
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <UserStatsCards />

        {/* Users Table */}
        <UsersTable
          users={users}
          onUserAction={handleUserAction}
          onBulkAction={handleBulkAction}
          onSearch={handleSearch}
          onSort={handleSort}
          onFilter={handleFilter}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          totalUsers={totalUsers}
          currentPage={currentPage}
          pageSize={pageSize}
          loading={loading}
        />
      </div>
    </div>
  );
};

const UsersPage: React.FC = () => {
  return (
    <ToastProvider>
      <UsersPageContent />
    </ToastProvider>
  );
};

export default UsersPage;