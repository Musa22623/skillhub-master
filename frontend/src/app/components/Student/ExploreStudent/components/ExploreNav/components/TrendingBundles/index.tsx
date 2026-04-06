"use client";
import React from "react";
import Image from "next/image";
import c1 from "@/assets/explore/c1.jpg";
import c2 from "@/assets/explore/c2.jpg";
import c3 from "@/assets/explore/c3.jpg";
import c4 from "@/assets/explore/c4.jpg";
import { StarSvg, StudentSvg, CourseSvg, CartSvg } from "@/app/components/svg";
import { X, Info } from "lucide-react";
// import ViewBundles from "./ViewBundles/index";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/app/components/ui/drawer";
import ViewBundles from "./ViewBundles";

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
    duration: "12",
    icon: {
      studentSvg: <StudentSvg />,
      starSvg: <StarSvg className="w-4 h-4 text-yellow-500" />,
      courseSvg: <CourseSvg />,
    },
    courseimg: {
      img1: c2,
      img2: c2,
      img3: c2,
      img4: c2,
      img5: c2,
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
    duration: "12",
    icon: {
      studentSvg: <StudentSvg />,
      starSvg: <StarSvg className="w-4 h-4 text-yellow-500" />,
      courseSvg: <CourseSvg />,
    },
    courseimg: {
      img1: c2,
      img2: c2,
      img3: c2,
      img4: c2,
      img5: c2,
    },
  },
  {
    title: "Data Science Bootcamp Web Development Masterclass",
    img: c3,
    instructorimg: c3,
    instructor: "Jane Doe",
    content:
      "Comprehensive bootcamp covering data analysis, visualization, and machine learning techniques...",
    rating: "4.9",
    reviews: "3.1k",
    students: "28k",
    duration: "12",
    icon: {
      studentSvg: <StudentSvg />,
      starSvg: <StarSvg className="w-4 h-4 text-yellow-500" />,
      courseSvg: <CourseSvg />,
    },
    courseimg: {
      img1: c2,
      img2: c2,
      img3: c2,
      img4: c2,
      img5: c2,
    },
  },
  {
    title: "AI for Beginners Web Development Masterclass",
    img: c4,
    instructorimg: c4,
    instructor: "John Smith",
    content:
      "An introductory course on AI concepts, tools, and applications. Designed for beginners to gra...",
    rating: "4.6",
    reviews: "1.2k",
    students: "35k",
    duration: "12",
    icon: {
      studentSvg: <StudentSvg />,
      starSvg: <StarSvg className="w-4 h-4 text-yellow-500" />,
      courseSvg: <CourseSvg />,
    },
    courseimg: {
      img1: c2,
      img2: c2,
      img3: c2,
      img4: c2,
      img5: c2,
    },
  },
];

export const TrendingBundles = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="mb-4 bg-white px-5 py-6 rounded-2xl mt-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-4">
        <h1 className="text-2xl font-bold">Trending Bundles</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md transition-all duration-300"
          >
            <div className="relative">
              <Image
                alt={course.title}
                className="w-full h-48 object-cover"
                src={course.img}
                width={400}
                height={200}
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-zinc-900 mb-2 leading-snug line-clamp-2">
                {course.title}
              </h3>
              <h3 className="text-sm mb-2 text-gray-500">{course.content}</h3>

              {/* <div className="bg-gray-50 mb-4 w-full rounded-lg">
                <div className="flex  overflow-x-auto gap-2 p-1">
                  <div className="relative w-10 h-10 cursor-pointer group">
                    <Image
                      alt={course.title}
                      className="w-full h-full object-cover rounded-md"
                      src={course.img}
                      width={50}
                      height={50}
                    />
                    <div className="w-[250px] z-[999] absolute bottom-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                      The Complete Web Development Bootcamp
                    </div>
                  </div>
                  <div className="relative w-10 h-10 cursor-pointer group">
                    <Image
                      alt={course.title}
                      className="w-full h-full object-cover rounded-md"
                      src={course.img}
                      width={40}
                      height={50}
                    />
                    <div className=" w-[250px] z-[999] absolute bottom-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                      The Complete Web Development Bootcamp
                    </div>
                  </div>
                  <div className="relative w-10 h-10 cursor-pointer group">
                    <Image
                      alt={course.title}
                      className="w-full h-full object-cover rounded-md"
                      src={course.img}
                      width={50}
                      height={50}
                    />
                    <div className=" w-[250px] z-[999] absolute bottom-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                      The Complete Web Development Bootcamp
                    </div>
                  </div>
                  <div className="relative w-10 h-10 cursor-pointer group">
                    <Image
                      alt={course.title}
                      className="w-full h-full object-cover rounded-md"
                      src={course.img}
                      width={50}
                      height={50}
                    />
                    <div className="w-[250px] z-[999] absolute bottom-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                      The Complete Web Development Bootcamp
                    </div>
                  </div>
                  <div className="relative w-10 h-10 cursor-pointer group">
                    <Image
                      alt={course.title}
                      className="w-full h-full object-cover rounded-md"
                      src={course.img}
                      width={50}
                      height={50}
                    />
                    <div className="w-[250px] z-[999] absolute bottom-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                      The Complete Web Development Bootcamp
                    </div>
                  </div>
                </div>
                <ViewBundles />
              </div> */}

              <div className="bg-gray-50 mb-3 w-full rounded-lg p-2">
  <div className="flex gap-2 no-scrollbar overflow-x-auto pb-2">
    {[1, 2, 3, 4, 5,6].map((item) => (
      <div key={item} className="relative flex-shrink-0 w-10 h-10">
        <Image
          alt={course.title}
          className="w-full h-full object-cover rounded-md"
          src={course.img}
          width={40}
          height={40}
        />
       
        <div className="hidden md:block absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
          The Complete Web Development Bootcamp
        </div>
      </div>
    ))}
  </div>
  <ViewBundles />
</div>

              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-semibold text-cyan-500">
                  $499.99
                </span>
                <span className="text-sm text-gray-500 line-through">
                  $899.99
                </span>
              </div>

              <div className="flex rounded-md overflow-hidden bg-[#13C4CC] text-white shadow-md">
                <button className="flex justify-center items-center p-2 font-semibold w-full hover:bg-teal-500 transition-colors">
                  <CartSvg className="size-4 mr-1" /> Buy Now{" "}
                  <ChevronDown className="size-4" />
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

              <div className="flex justify-between items-center text-sm bg-gray-100 p-2 mt-3">
                <div className="flex items-center gap-1">
                  <div className="text-[#4287C4]">{course.icon.courseSvg}</div>
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="text-[#4287C4] w-4 h-4">
                    {course.icon.studentSvg}
                  </div>
                  <span>{course.students}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="text-[#4287C4] w-4 h-4">
                    {course.icon.starSvg}
                  </div>
                  <span>{course.reviews}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isOpen && isMobile && (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent>
            <DrawerHeader className="flex justify-between items-center border-b px-6 py-4">
              <DrawerTitle>Payment Plans</DrawerTitle>
              <Button onClick={() => setIsOpen(false)} variant="secondary">
                <X className="size-4" />
              </Button>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};
