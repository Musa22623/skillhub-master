import React from "react";
import Image from "next/image";
import c1 from "@/assets/explore/c1.jpg";
import c2 from "@/assets/explore/c2.jpg";
import c3 from "@/assets/explore/c3.jpg";
import c4 from "@/assets/explore/c4.jpg";
import {
  StarSvg,
  UserSVG,
  SessionSvg1,
  SessionSvg,
  VideoSvg,
} from "@/app/components/svg";
import { useIsMobile } from "@/hooks/use-mobile";
import { Info, X } from "lucide-react";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/app/components/ui/drawer";
import { Button } from "@/app/components/ui/button";


const courses = [
  {
    title: "Advanced Machine Learning Workshop",
    img: c1,
    instructorimg: c1,
    instructor: "Dr. Sarah Connor",
    content:
      "Deep dive into advanced ML algorithms, neural networks, and practical applications. Learn to...",
    rating: "4.8",
    reviews: "2.3k",
    students: "28k",
    duration: "1on1",
    icon: {
      studentSvg: <UserSVG />,
      starSvg: <StarSvg className="w-4 h-4 text-yellow-500" />,
      sessionSvg: <SessionSvg1 className="w-4 h-4 text-red-500" />,
    },
  },
  {
    title: "Web Development Masterclass",
    img: c2,
    instructorimg: c2,
    instructor: "David Chen",
    content:
      "Master modern web development with React, Node.js, and cloud technologies. Build scalable app...",
    rating: "4.7",
    reviews: "1.9k",
    students: "35k",
    duration: "Group",
    icon: {
      studentSvg: <UserSVG />,
      starSvg: <StarSvg className="w-4 h-4 text-yellow-500" />,
      sessionSvg: <SessionSvg1 className="w-4 h-4 text-red-500" />,
    },
  },
  {
    title: "Advanced Machine Learning Workshop",
    img: c3,
    instructorimg: c3,
    instructor: "Jane Doe",
    content:
      "Comprehensive bootcamp covering data analysis, visualization, and machine learning techniques...",
    rating: "4.9",
    reviews: "3.1k",
    students: "28k",
    duration: "1on1",
    icon: {
      studentSvg: <UserSVG />,
      starSvg: <StarSvg className="w-4 h-4 text-yellow-500" />,
      sessionSvg: <SessionSvg1 className="w-4 h-4 text-red-500" />,
    },
  },
  {
    title: "Web Development Masterclass",
    img: c4,
    instructorimg: c4,
    instructor: "John Smith",
    content:
      "An introductory course on AI concepts, tools, and applications. Designed for beginners to gra...",
    rating: "4.6",
    reviews: "1.2k",
    students: "35k",
    duration: "Group",
    icon: {
      studentSvg: <UserSVG />,
      starSvg: <StarSvg className="w-4 h-4 text-yellow-500" />,
      sessionSvg: <SessionSvg1 className="w-4 h-4 text-red-500" />,
    },
  },
];

export const TrendingSessions = () => {
   const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-4 bg-white px-5 py-6 rounded-2xl">
      {/* Header Section */}
      <div className="flex items-center flex-col md:flex-row gap-4  mb-4">
        <SessionSvg className="size-7 text-teal-500" />
        <h1 className="text-2xl font-bold">Trending Sessions</h1>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-xl  shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]"
          >
            {/* Course Image */}
            <div className="relative">
              <Image
                alt={course.title}
                className="w-full h-48 object-cover"
                src={course.img}
                width={400}
                height={200}
              />

              <Image
                alt={course.title}
                className="absolute bottom-[-25px] left-[20px] w-[50px] h-[50px] shadow-lg rounded-[12px] border-3 border-white"
                src={course.img}
                width={50}
                height={50}
              />

              <div className="absolute -bottom-4 right-5 w-8 h-8 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-md transition-colors duration-300">
                <span className="relative -top-2 text-2xl">...</span>
              </div>
            </div>
            {isMobile ? (
                <>
                  <div className="flex w-25 ml-5 mt-8 items-center mt-1 px-2 py-1 bg-red-100 rounded-md">
                    <VideoSvg className="size-4" />
                    <span className="text-xs font-semibold text-red-800">1:1 Session</span>
                  </div>
                </>
              ): (
                <div className="mt-5"></div>
              )}
              

            {/* Course Details */}
            <div className="pt-4 pl-4 pr-4 ">
              <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                {course.content}
              </p>

              <div className="flex rounded-md overflow-hidden bg-[#13C4CC] text-white  shadow-md">
                <button className="p-2 flex-grow text-center text-lg font-semibold hover:bg-teal-500 transition-colors">
                  Book Now
                </button>
                {isMobile && (
                  <>
                    <div className="w-px bg-teal-300"></div>
                    <button
                      className="p-2 hover:bg-teal-500 transition-colors"
                      onClick={() => setIsOpen(true)}
                    >
                      <Info size={24} />
                    </button>
                  </>
                )}
              </div>
              {isOpen && isMobile && (
                <Drawer open={isOpen} onOpenChange={setIsOpen}>
                  <DrawerContent className="mb-4">
                    <DrawerHeader className="flex-row items-center justify-between border-b px-6 py-4">
                      <DrawerTitle>Session Details</DrawerTitle>
                      <Button
                        onClick={() => setIsOpen(false)}
                        variant="secondary"
                      >
                        <X className="size-4" />
                      </Button>
                    </DrawerHeader>

                    <section className="px-6 py-4 space-y-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                          About the Session
                        </h3>
                        <p className="text-gray-700 text-sm">
                          A vibrant community of UI/UX designers focused on
                          sharing knowledge, getting feedback, and staying
                          updated with the latest design trends and best
                          practices. Join us to connect with fellow designers
                          and grow together.
                        </p>
                      </div>

                    </section>
                  </DrawerContent>
                </Drawer>
              )}
            </div>
            {/* Course Stats */}
            <div className="flex items-center justify-between text-sm bg-[rgb(248,_249,_251)] p-[10px] flex justify-between">
              <div className="relative group flex items-center gap-1">
                <div className="text-[#4287C4] w-4 h-4">
                  {course.icon.sessionSvg}
                </div>
                <span className="text-[14px] font-semibold text-[rgb(0, 0, 0)]">
                  {course.duration}
                </span>

                <div className="absolute left-8 -top-10 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
                  {course.duration === "1on1"
                    ? "1on1 Session"
                    : "Group Session"}

                  <div className="absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                </div>
              </div>

              <div className="relative group flex items-center gap-1">
                <div className="text-[#4287C4] w-4 h-4">
                  {course.icon.studentSvg}
                </div>
                <span className="text-[14px] font-semibold text-[rgb(0, 0, 0)]">
                  {course.students}
                </span>

                <div className="absolute -top-10 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
                  Member Count
                  <div className="absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                </div>
              </div>

              <div className="relative group flex items-center gap-1">
                <div className="text-[#4287C4] w-4 h-4">
                  {course.icon.starSvg}
                </div>
                <span className="text-[14px] font-semibold text-[rgb(0, 0, 0)]">
                  {course.reviews}
                </span>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
