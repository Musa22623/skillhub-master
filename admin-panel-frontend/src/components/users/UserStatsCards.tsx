'use client';

import React from 'react';
import {
  UsersIcon,
  ActiveUsersIcon,
  InstructorsIcon,
  UserIcon,
  SuspendedUsersIcon,
  PendingVerificationIcon,
  NewUsersIcon,
  InactiveUsersIcon
} from '@/components/icons';

interface StatCardProps {
  title: string;
  value: string;
  trend?: {
    type: 'positive' | 'negative' | 'neutral';
    value: string;
  };
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon }) => {
  const getTrendClasses = (type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive':
        return 'bg-green-100 text-green-600';
      case 'negative':
        return 'bg-red-100 text-red-600';
      case 'neutral':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex items-center relative">
      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4 flex-shrink-0">
        <div className="text-[#03314B]">
          {icon}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm text-gray-600 mb-1 truncate">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-gray-900">
            {value}
          </span>
          {trend && (
            <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${getTrendClasses(trend.type)} whitespace-nowrap`}>
              {trend.value}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

interface UserStatsCardsProps {
  stats?: {
    totalUsers: { value: number; trend: { type: 'positive' | 'negative' | 'neutral'; value: string } };
    activeUsers: { value: number; trend: { type: 'positive' | 'negative' | 'neutral'; value: string } };
    instructors: { value: number; trend: { type: 'positive' | 'negative' | 'neutral'; value: string } };
    students: { value: number; trend: { type: 'positive' | 'negative' | 'neutral'; value: string } };
    suspendedUsers: { value: number; trend: { type: 'positive' | 'negative' | 'neutral'; value: string } };
    pendingVerification: { value: number; trend: { type: 'positive' | 'negative' | 'neutral'; value: string } };
    newUsers: { value: number; trend: { type: 'positive' | 'negative' | 'neutral'; value: string } };
    inactiveUsers: { value: number; trend: { type: 'positive' | 'negative' | 'neutral'; value: string } };
  };
}

export const UserStatsCards: React.FC<UserStatsCardsProps> = ({ stats }) => {
  // Default stats data (matching the original HTML)
  const defaultStats = {
    totalUsers: { value: 8432, trend: { type: 'positive' as const, value: '+12.3%' } },
    activeUsers: { value: 3247, trend: { type: 'positive' as const, value: '+8.1%' } },
    instructors: { value: 1248, trend: { type: 'positive' as const, value: '+15.2%' } },
    students: { value: 6954, trend: { type: 'positive' as const, value: '+9.7%' } },
    suspendedUsers: { value: 127, trend: { type: 'negative' as const, value: '-2.3%' } },
    pendingVerification: { value: 432, trend: { type: 'neutral' as const, value: '-0.8%' } },
    newUsers: { value: 394, trend: { type: 'positive' as const, value: '+18.4%' } },
    inactiveUsers: { value: 1623, trend: { type: 'negative' as const, value: '-5.2%' } },
  };

  const currentStats = stats || defaultStats;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Total Users"
        value={formatNumber(currentStats.totalUsers.value)}
        trend={currentStats.totalUsers.trend}
        icon={<UsersIcon size={24} />}
      />
      
      <StatCard
        title="Active Users (24h)"
        value={formatNumber(currentStats.activeUsers.value)}
        trend={currentStats.activeUsers.trend}
        icon={<ActiveUsersIcon size={24} />}
      />
      
      <StatCard
        title="Instructors"
        value={formatNumber(currentStats.instructors.value)}
        trend={currentStats.instructors.trend}
        icon={<InstructorsIcon size={24} />}
      />
      
      <StatCard
        title="Students"
        value={formatNumber(currentStats.students.value)}
        trend={currentStats.students.trend}
        icon={<UserIcon size={24} />}
      />
      
      <StatCard
        title="Suspended Users"
        value={formatNumber(currentStats.suspendedUsers.value)}
        trend={currentStats.suspendedUsers.trend}
        icon={<SuspendedUsersIcon size={24} />}
      />
      
      <StatCard
        title="Pending Verification"
        value={formatNumber(currentStats.pendingVerification.value)}
        trend={currentStats.pendingVerification.trend}
        icon={<PendingVerificationIcon size={24} />}
      />
      
      <StatCard
        title="New Users (7d)"
        value={formatNumber(currentStats.newUsers.value)}
        trend={currentStats.newUsers.trend}
        icon={<NewUsersIcon size={24} />}
      />
      
      <StatCard
        title="Inactive Users (30d+)"
        value={formatNumber(currentStats.inactiveUsers.value)}
        trend={currentStats.inactiveUsers.trend}
        icon={<InactiveUsersIcon size={24} />}
      />
    </div>
  );
};