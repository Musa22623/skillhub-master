"use client";
import CreateSchoolForm from '@/app/components/School/CreateSchool';
import React, { useState, useRef } from 'react';

export default function PopupDrawer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddSchoolPopupOpen, setIsAddSchoolPopupOpen] = useState(false);
  const searchInputRef = useRef(null);

  const schools = [
    {
      id: 'create',
      name: 'Create School',
      type: 'Start a new learning community',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" />
        </svg>
      ),
      action: () => setIsAddSchoolPopupOpen(true),
    },
    {
      id: 'discover',
      name: 'Discover Schools',
      type: 'Explore learning communities',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.9411 13.953L7.58105 16.424L10.0601 10.056L16.4201 7.58501L13.9411 13.953Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path fillRule="evenodd" clipRule="evenodd" d="M10.0601 10.056L13.9491 13.945L7.58105 16.424L10.0601 10.056Z" fill="currentColor" />
          <path d="M12.001 22.505C17.8 22.505 22.501 17.804 22.501 12.005C22.501 6.20602 17.8 1.505 12.001 1.505C6.20199 1.505 1.50098 6.20602 1.50098 12.005C1.50098 17.804 6.20199 22.505 12.001 22.505Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    { id: 'atlas', name: 'Atlas Academy', type: 'Technology & Design', icon: 'A' },
    { id: 'nova', name: 'Nova Institute', type: 'Business & Leadership', icon: 'N' },
    { id: 'quantum', name: 'Quantum School', type: 'Science & Research', icon: 'Q' },
    { id: 'vista', name: 'Vista Learning', type: 'Arts & Creativity', icon: 'V' }
  ];

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='min-h-[80vh]'>
      {/* Left side */}
      <div className="px-8 py-2">
        <div className="text-lg font-semibold text-[#262B3D] mb-4">Browse Schools</div>
        <div className="relative mb-5">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none">
            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search Schools..."
            className="w-full py-2.5 pl-10 pr-4 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-300">
          {filteredSchools.map((school) => (
            <div
              key={school.id}
              className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition hover:bg-gray-100"
              onClick={school.action}
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-[#3B6E91] text-sm font-bold">
                {typeof school.icon === 'string' ? school.icon : school.icon}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#262B3D]">{school.name}</div>
                <div className="text-xs text-gray-500">{school.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create School Popup */}
      {isAddSchoolPopupOpen && (
        <CreateSchoolForm onClose={() => setIsAddSchoolPopupOpen(false)} />
      )}

    </div>
  );
}
