import React from "react";
import { useState } from "react";
import Image from "next/image";
import c1 from "@/assets/explore/c1.jpg";
import c2 from "@/assets/explore/c2.jpg";
import c3 from "@/assets/explore/c3.jpg";
import c4 from "@/assets/explore/c4.jpg";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  CourseSvg,
  StarSvg,
  TimeStampSVG,
  HartSvg,
  CertificateSvg,
  BarChart3,
  CheckSVG,
} from "@/app/components/svg";
import { CourseOptionsDrawer } from "./CourseOptionsDrawer";
import { CourseOptionsPopup } from "./CourseOptionsPopup";
import { CollectionModal } from "./CollectionModal";
import { StaticImageData } from "next/image";

const courses = [
  {
    id: "1",
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen Covey",
    image: c1,
    type: "course",
    students: "35K",
    duration: "1.5h",
    units: 16,
    level: "Beginner",
    currentPrice: "$14.99",
    originalPrice: "$89.99",
    rating: 4.8,
    reviews: 2300,
    points: [
      {
        text: "Master proven strategies for personal effectiveness through hands-on exercises and practical applications in daily scenarios",
      },
      {
        text: "Develop proactive mindset and build sustainable habits with scientifically-backed techniques and structured approach",
      },
      {
        text: "Transform your approach to life and work using paradigm-shifting principles and systematic methodology",
      },
    ],
  },
  {
    id: "2",
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    image: c2,
    type: "course",
    students: "28K",
    duration: "2.5h",
    units: 12,
    level: "Advanced",
    currentPrice: "$19.99",
    originalPrice: "$99.99",
    rating: 4.9,
    reviews: 1900,
    points: [
      {
        text: "Master the art of communication through practical exercises and real-world scenarios",
      },
      {
        text: "Build lasting relationships using proven psychological principles and engagement techniques",
      },
      {
        text: "Enhance leadership capabilities with time-tested methods for influence and persuasion",
      },
    ],
  },
  {
    id: "3",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    image: c3,
    type: "course",
    students: "42K",
    duration: "3.5h",
    units: 20,
    level: "Intermediate",
    currentPrice: "$24.99",
    originalPrice: "$129.99",
    rating: 4.7,
    reviews: 2800,
    points: [
      {
        text: "Master the foundational principles of wealth creation and financial success",
      },
      {
        text: "Develop the mindset and habits of successful entrepreneurs and business leaders",
      },
      {
        text: "Apply proven strategies for goal achievement and personal transformation",
      },
    ],
  },
  {
    id: "4",
    title: "Advanced UI/UX Design Masterclass",
    author: "Sarah Johnson",
    image: c4,
    type: "course",
    students: "15K",
    duration: "4.5h",
    units: 24,
    level: "All",
    currentPrice: "$29.99",
    originalPrice: "$149.99",
    rating: 4.9,
    reviews: 1500,
    points: [
      {
        text: "Master modern design principles and create stunning user interfaces",
      },
      {
        text: "Learn advanced UX research methods and user-centered design approaches",
      },
      {
        text: "Build professional design systems and scalable interface components",
      },
    ],
  },
];

export const TrendingCourse = () => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const isMobile = useIsMobile();

  const handleMenuClick = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (openMenuId === courseId) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(courseId);
    }
  };

  interface Course {
    id: string;
    title: string;
    author: string;
    image: string | StaticImageData;
    type: string;
    students: string;
    duration: string;
    units: number;
    level: string;
    currentPrice: string;
    originalPrice: string;
    rating: number;
    reviews: number;
    points: Array<{ text: string }>;
  }

  const handleShowCollections = (course: Course) => {
    setSelectedCourse(course);
    setShowCollectionModal(true);
    setOpenMenuId(null); // Close the menu/drawer when showing collections
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId && !(event.target as Element).closest('.options-menu')) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);

  return (
    <div className="mb-4 bg-white px-5 py-6 rounded-2xl">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-11 h-11 bg-gray-100 rounded-lg flex items-center justify-center">
            <CourseSvg className="w-6 h-6" fill="#1c4ed8" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Trending Courses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center p-3 bg-gray-50 border-b border-gray-200">
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    course.type === "course"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  <CourseSvg className="w-4 h-4" fill="#1c4ed8" />
                  <span className="capitalize">{course.type}</span>
                </div>

                <div className="text-gray-600 hover:text-gray-800 relative options-menu">
                  <button
                    className="text-2xl relative top-[-8px]"
                    onClick={(e) => handleMenuClick(course.id, e)}
                  >
                    ...
                  </button>

                  {isMobile ? (
                    <CourseOptionsDrawer 
                      isOpen={openMenuId === course.id} 
                      setIsOpen={(open) => {
                        if (!open) setOpenMenuId(null);
                      }}
                      course={course}
                      onShowCollections={() => handleShowCollections(course)}
                    />
                  ) : (
                    openMenuId === course.id && (
                      <CourseOptionsPopup
                        course={course}
                        onClose={() => setOpenMenuId(null)}
                        onShowCollections={() => handleShowCollections(course)}
                      />
                    )
                  )}
                </div>
              </div>
              {/* Card Main Content */}
              <div className="group relative ">
                {/* Course Image */}
                <div className="p-3">
                  <div className="relative w-full h-[180px]">
                    <Image
                      src={
                        course.image || "/placeholder.svg?height=180&width=320"
                      }
                      alt={course.title}
                      fill
                      className="object-cover rounded-3xl"
                    />
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-4 ">
                  <h3 className="text-[15px] font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[42px]">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 italic">
                    {course.author}
                  </p>

                  {/* Course Stats */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold">
                      <CourseSvg className="w-4 h-4 text-gray-700" />
                      <span>{course.students}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold">
                      <TimeStampSVG className="w-4 h-4 text-gray-700" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold">
                      <BarChart3 className="w-4 h-4 text-gray-700" />
                      <span>{course.level}</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-semibold text-teal-500">
                      {course.currentPrice}
                    </span>
                    <span className="text-sm text-gray-500 line-through font-semibold">
                      {course.originalPrice}
                    </span>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-white/98 p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {course.title}
                  </h3>

                  {/* Hover Stats */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 relative group/tooltip">
                      <CourseSvg className="w-4 h-4 text-teal-500" />
                      <span>{course.units}</span>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-opacity whitespace-nowrap">
                        {course.units} Learning Units
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <CertificateSvg className="w-4 h-4 text-teal-500" />
                      <span>Certificate</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mb-4">
                    by {course.author}
                  </p>

                  <div className="h-px bg-gray-200 my-2 opacity-70"></div>

                  <h4 className="text-xs font-semibold text-gray-900 mb-3">
                    What you&apos;ll learn
                  </h4>

                  {/* Learning Points */}
                  <div className="mb-2">
                    {course.points.map((point, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 mb-2 relative group/point"
                      >
                        <CheckSVG className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                        <p
                          className={`text-xs text-gray-700 line-clamp-${
                            index === course.points.length - 1 ? "1" : "2"
                          }`}
                        >
                          {point.text}
                        </p>
                        <div className="absolute top-[-40px] left-6 bg-gray-800 text-white text-xs py-1.5 px-3 rounded max-w-[200px] opacity-0 invisible group-hover/point:opacity-100 group-hover/point:visible transition-opacity ">
                          {point.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <button className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-semibold rounded-lg transition-colors">
                      More Info
                    </button>
                    <button className="flex-1 py-3 px-4 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-lg transition-colors">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-gray-50 flex items-center justify-between border-t border-gray-200">
                <div className="flex items-center">
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center border-2 border-teal-500 ">
                    <CourseSvg
                      className="w-3.5 h-3.5 text-teal-500"
                      fill="#00bba7"
                    />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center border-2 border-teal-500 -ml-2">
                    <HartSvg
                      className="w-3.5 h-3.5 text-teal-500"
                      fill="#00bba7"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <CertificateSvg className="w-4 h-4" />
                  <span>Certificate</span>
                </div>

                <div className="flex items-center gap-1">
                  <StarSvg />
                  <span className="text-xs font-semibold text-gray-900">
                    {course.rating}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({course.reviews})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collection Modal */}
      {showCollectionModal && selectedCourse && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-[100]"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowCollectionModal(false);
            }
          }}
        >
          <CollectionModal
            course={selectedCourse}
            onClose={() => setShowCollectionModal(false)}
          />
        </div>
      )}
    </div>
  );
};
