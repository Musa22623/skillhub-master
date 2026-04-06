'use client';

import React from 'react';

// This layout will be enhanced to include the header and sidebar
// For now, it's a simple wrapper that allows the main content to be displayed
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FCFF]">
      {/* TODO: Add header component here */}
      <div className="flex">
        {/* TODO: Add sidebar component here */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}