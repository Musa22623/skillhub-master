import React, { useState } from 'react';
import Image from 'next/image';
import { CalenderSvg1, EyeSvg, TimeStampSVG, DocumentSvg } from '@/app/components/svg';
import { ChevronDown } from 'lucide-react';

// Example course data structure
const courseData = [
  {
    id: 1,
    title: "Your Progress in The 3D UX Journey",
    status: "In Progress",
    isExpanded: true,
    courses: [
      {
        id: 101,
        title: "Creating Engaging Learning Journeys: UI/UX Best Practices",
        description: "Learn how to get the most out of this course and access all supplementary materials. We'll cover the course structure, download...",
        type: "1st Session",
        duration: "2m 30s",
        lastActive: "Oct 15, 2024",
        progress: 80,
        yourProgress: 40,
        completion: "1/16",
        users: [1, 2, 3, 4]
      },
      {
        id: 102,
        title: "Creating Engaging Learning Journeys: UI/UX Best Practices",
        description: "Learn how to get the most out of this course and access all supplementary materials. We'll cover the course structure, download...",
        type: "Video",
        duration: "2m 30s",
        lastActive: "Oct 15, 2024",
        progress: 20,
        completion: "3/16",
        users: [1, 2, 3, 4]
      },
      {
        id: 103,
        title: "The Prompt Collective - AI Writers Community",
        description: "Learn how to get the most out of this course and access all supplementary materials. We'll cover the course structure, downlo...",
        type: "Video",
        duration: "2m 30s",
        lastActive: "Oct 15, 2024",
        progress: 60,
        yourProgress: 60,
        completion: "5/16",
        users: [1, 2, 3, 4]
      },
    ]
  },
  {
    id: 2,
    title: "You Completed",
    status: "",
    isExpanded: true,
    courses: [
      {
        id: 201,
        title: "Java Programming Masterclass",
        description: "Learn how to get the most out of this course and access all supplementary materials. We'll cover the course structure, download...",
        type: "Video",
        duration: "2.5 hrs",
        completedDate: "Nov 5, 2023",
        progress: 100,
        completion: "2/16",
        users: [1, 2, 3, 4, 5]
      }
    ]
  },
  {
    id: 3,
    title: "Not Yet Started",
    status: "",
    isExpanded: true,
    courses: [
      {
        id: 301,
        title: "Java Programming Masterclass Certificate",
        description: "",
        type: "Video",
        duration: "2m 30s",
        progress: 0,
        status: "NOT STARTED",
        learningUnit: "4/16",
        completion: "1/16",
        users: [1, 2, 3, 4, 5]
      }
    ]
  },
  {
    id: 4,
    title: "Your Progress in The 3D Copywriting Journey",
    status: "",
    isExpanded: false,
    courses: []
  }
];

// Fixed interface to match the actual data structure
interface Section {
  id: number;
  title: string;
  status: string;
  isExpanded: boolean;
  courses: Course[];
}

interface Course {
  id: number;
  title: string;
  description?: string;
  type: string;
  duration?: string;
  lastActive?: string;
  completedDate?: string;
  progress: number;
  yourProgress?: number;
  completion?: string;
  status?: string;
  learningUnit?: string;
  users?: number[];
}

// Course Card Component
const CourseCard = ({ course }: { course: Course }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  
  return (
    <div className="bg-white rounded mb-3 border border-gray-100 overflow-hidden">
      {/* Desktop View */}
      <div className="hidden md:flex md:items-start p-4">
        {/* Left - Video Icon */}
        <div className="w-1/6 pr-4">
          <div className="bg-gray-100 rounded-md items-center justify-center text-center pt-4">
            <button className="text-teal-500 hover:text-teal-600">
              <CalenderSvg1 className="size-10"/>
            </button>
            <div className="text-xs bg-gray-300 rounded-br-md rounded-bl-md text-gray-500 text-center mt-5 p-2">{course.type}</div>
          </div>
        </div>
        
        {/* Middle - Course Info */}
        <div className="w-2/3 pr-4">
          <h3 className="font-semibold text-gray-800 mb-1">{course.title}</h3>
          {course.description && (
            <p className="text-sm text-gray-500 mb-3">{course.description}</p>
          )}
          <div className="flex flex-wrap text-xs text-gray-500 gap-4">
            {course.duration && (
              <div className="flex items-center">
                <TimeStampSVG className="size-3 mr-1"/>
                {course.duration}
              </div>
            )}
            
            {course.lastActive && (
              <div className="flex items-center">
                <CalenderSvg1 className="size-3 mr-1"/>
                Last Active: {course.lastActive}
              </div>
            )}
            
            {course.completedDate && (
              <div className="flex items-center">
                <DocumentSvg className="size-3 mr-1"/>
                Completed {course.completedDate}
              </div>
            )}
            
            {course.completion && (
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {course.completion}
              </div>
            )}
            
            {course.learningUnit && (
              <div className="bg-gray-700 text-white px-2 py-1 rounded text-xs">
                Learning Unit: {course.learningUnit}
              </div>
            )}
          </div>
        </div>
        
        {/* Right - Progress */}
        <div className="w-1/4">
          <div className={`rounded-lg p-2 ${course.progress === 100 ? 'bg-blue-50' : course.progress === 0 ? 'bg-gray-50' : 'bg-blue-50'}`}>
            <div className="flex justify-between items-center mb-1 py-3">
              <span className="text-xs font-semibold text-gray-600">
                {course.progress === 100 ? '100% COMPLETED' : 
                 course.progress === 0 ? 'NOT STARTED' : 
                 `${course.progress}% PROGRESS`}
              </span>
              <span className="bg-teal-600 p-2 rounded-full">
                <EyeSvg className="size-4" fill="#009689" />
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
              <div 
                className="bg-teal-500 h-1.5 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            
            {/* User avatars */}
            <div className="flex gap-2 mt-2">
              {course.users && course.users.map((user, index) => (
                <div key={index} className="w-6 h-6 rounded-full border-2 border-white relative group">
                  <Image src="https://i.ibb.co/v4GRFBbB/AVATAR-Kostis-Kapelonis.png" alt="" width={20} height={20} className="rounded-full object-cover" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity mb-2 z-10 pointer-events-none">
                    Progress {25 + (index * 25)}%
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/80"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden border-b border-gray-200">
        <div className="px-4 py-4">
          {/* Top Section with Icon and Title */}
          <div className="flex items-start gap-3 mb-2">
            <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
              <CalenderSvg1 className="size-6 text-teal-500"/>
            </div>
            
            <div className="flex-grow">
              <h3 className="font-semibold text-gray-800 text-base">{course.title}</h3>
              {course.description && (
                <>
                  <p className={`text-sm text-gray-500 transition-all duration-300 ${showFullDesc ? '' : 'line-clamp-2'}`}>
                    {course.description}
                  </p>
                  {course.description.length > 80 && (
                    <button 
                      className="text-teal-500 text-sm mt-1 focus:outline-none"
                      onClick={() => setShowFullDesc(!showFullDesc)}
                    >
                      {showFullDesc ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* Course Metadata */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mt-3 mb-2">
            {course.duration && (
              <div className="flex items-center">
                <TimeStampSVG className="size-4 mr-1"/>
                {course.duration}
              </div>
            )}
            
            {course.lastActive && (
              <div className="flex items-center">
                <CalenderSvg1 className="size-4 mr-1"/>
                {course.lastActive}
              </div>
            )}
            
            {(course.completion || course.learningUnit) && (
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {course.completion || course.learningUnit}
              </div>
            )}
          </div>
          
          {/* Progress Section */}
          <div className="bg-gray-50 p-4 rounded-lg mt-3">
            <div className="font-semibold text-sm text-gray-600 mb-2">
              {course.progress === 100 ? '100% COMPLETED' : 
               course.progress === 0 ? 'NOT STARTED' : 
               `${course.progress}% PROGRESS`}
            </div>
            
            {/* Progress bar with avatars */}
            <div className="relative w-full h-2 bg-gray-200 rounded-full mb-8">
              <div 
                className="absolute top-0 left-0 h-2 bg-teal-500 rounded-full" 
                style={{ width: `${course.progress}%` }}
              ></div>
              
              {/* Position avatars along the progress bar */}
              {course.users && course.users.map((user, index) => {
                const position = 25 + (index * 25);
                return (
                  <div 
                    key={index} 
                    className="absolute top-0 w-6 h-6 rounded-full border-2 border-white transform -translate-y-1/2" 
                    style={{ left: `${position}%`, transform: 'translateX(-50%) translateY(-50%)' }}
                  >
                    <Image 
                      src="https://i.ibb.co/v4GRFBbB/AVATAR-Kostis-Kapelonis.png" 
                      alt="" 
                      width={24} 
                      height={24} 
                      className="rounded-full object-cover" 
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Course Section Component
const CourseSection = ({ section }: { section: Section }) => {
  const [expanded, setExpanded] = useState(section.isExpanded);
  
  return (
    <div className="mb-4">
      <div 
        className={`p-4 rounded-md flex justify-between items-center ${expanded ? 'bg-blue-50' : 'bg-gray-50'} cursor-pointer`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          {section.id <= 2 && (
            <div className="mr-3 rounded-md flex items-center justify-center">
              <Image 
                src="https://i.ibb.co/jJ4GHXP/img1.jpg" 
                alt="Check" 
                width={50} 
                height={50} 
                className="rounded-md" 
              />
            </div>
          )}
          <div>
            <h2 className="font-semibold">{section.title}</h2>
            {section.status && <p className="text-xs text-gray-500">{section.status}</p>}
          </div>
        </div>
        <ChevronDown className={`text-gray-500 transform transition-transform ${expanded ? 'rotate-180' : ''}`}/>
      </div>
      
      {expanded && section.courses.length > 0 && (
        <div className="mt-2 transition-all duration-300">
          {section.courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
      
      {expanded && section.courses.length === 0 && (
        <div className="bg-white p-4 rounded-md mt-2 text-gray-500 text-center">
          No courses available in this section yet.
        </div>
      )}
    </div>
  );
}

// Main Component
const CourseProgress = () => {
  return (
        <div className="bg-teal-50 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 md:p-6">
            {courseData.map(section => (
              <CourseSection key={section.id} section={section} />
            ))}
          </div>
        </div>
  );
}

export default CourseProgress;