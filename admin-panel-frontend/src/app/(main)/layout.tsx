'use client';

import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--dashboard-bg)]">
      <div className="flex">
        <Sidebar />
        <main className="min-h-screen flex-1 lg:ml-[280px]">{children}</main>
      </div>
    </div>
  );
}