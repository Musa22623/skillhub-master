import React from "react";
import Image from "next/image";
import c1 from "@/assets/explore/c1.jpg";
import c2 from "@/assets/explore/c2.jpg";
import c3 from "@/assets/explore/c3.jpg";
import c4 from "@/assets/explore/c4.jpg";
import { TimeDollarSvg, UserSVG, CommunitySvg1 } from "@/app/components/svg";
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

const communities = [
  {
    title: "UI/UX Design Community Hub",
    img: c1,
    instructorimg: c1,
    instructor: "Sarah Anderson",
    position: "Lead Designer at DesignPro",
    content:
      "Join our vibrant community of UI/UX designers. Share insights, get feedback, and stay updated...",
    duration: "24.00",
    members: "12.5k",
    likes: "45.2k",
    icon: {
      clockSvg: <TimeDollarSvg className="w-4 h-4" />,
      memberSvg: <UserSVG className="w-4 h-4" />,
      likeSvg: <CommunitySvg1 className="w-4 h-4" fill="#393A3A" />,
    },
  },
  {
    title: "Frontend Development Collective",
    img: c2,
    instructorimg: c2,
    instructor: "Michael Chen",
    position: "Cofounder of DevStack",
    content:
      "A collaborative space for frontend developers to share knowledge, discuss new technologies, a...",
    duration: "18.99",
    members: "8.2k",
    likes: "32.7k",
    icon: {
      clockSvg: <TimeDollarSvg className="w-4 h-4" />,
      memberSvg: <UserSVG className="w-4 h-4" />,
      likeSvg: <CommunitySvg1 className="w-4 h-4" />,
    },
  },
  {
    title: "UI/UX Design Community Hub",
    img: c3,
    instructorimg: c3,
    instructor: "Sarah Anderson",
    position: "Lead Designer at DesignPro",
    content:
      "Join our vibrant community of UI/UX designers. Share insights, get feedback, and stay updated...",
    duration: "24.00",
    members: "12.5k",
    likes: "45.2k",
    icon: {
      clockSvg: <TimeDollarSvg className="w-4 h-4" />,
      memberSvg: <UserSVG className="w-4 h-4" />,
      likeSvg: <CommunitySvg1 className="w-4 h-4" />,
    },
  },
  {
    title: "Frontend Development Collective",
    img: c4,
    instructorimg: c4,
    instructor: "Michael Chen",
    position: "Cofounder of DevStack",
    content:
      "A collaborative space for frontend developers to share knowledge, discuss new technologies, a...",
    duration: "18.99",
    members: "8.2k",
    likes: "32.7k",
    icon: {
      clockSvg: <TimeDollarSvg className="w-4 h-4" />,
      memberSvg: <UserSVG className="w-4 h-4" />,
      likeSvg: <CommunitySvg1 className="w-4 h-4" />,
    },
  },
];

export const TrendingCommunities = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-4 bg-white px-5 py-6 rounded-2xl">
      {/* Header Section */}
      <div className="flex items-center flex-col md:flex-row gap-3 mb-4">
        <CommunitySvg1 className="size-6" />
        <h1 className="text-2xl font-bold">Trending Communities</h1>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {communities.map((community, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md  transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]"
          >
            {/* Community Image */}
            <div className="relative">
              <Image
                alt={community.title}
                className="w-full h-48 object-cover rounded-md"
                src={community.img}
                width={400}
                height={200}
              />
              {isMobile && (
                <div className="absolute right-3 top-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center cursor-pointer">
                  <span className="text-[#1A1D1F] text-[20px] leading-none">
                    ⋯
                  </span>
                </div>
              )}
            </div>

            {/* Community Details */}
            <div className="pt-4 pl-4 pr-4">
              <h3 className="text-lg font-semibold mb-1">{community.title}</h3>

              <div className="flex items-center gap-2 mb-2 ">
                <Image
                  alt={community.instructor}
                  className="w-6 h-6 rounded-full object-cover"
                  src={community.instructorimg}
                  width={24}
                  height={24}
                />
                <div>
                  <p className="text-sm font-semibold">{community.instructor}</p>
                  <p className="text-xs text-gray-500">{community.position}</p>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                {community.content}
              </p>

              {/* Join Now Button */}
              <div className="flex rounded-md overflow-hidden bg-[#13C4CC] text-white  shadow-md">
                <button className="p-2 flex-grow text-center text-lg font-semibold hover:bg-teal-500 transition-colors">
                  Join Now
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
                      <DrawerTitle>Community Information</DrawerTitle>
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
                          About the Community
                        </h3>
                        <p className="text-gray-700 text-sm">
                          A vibrant community of UI/UX designers focused on
                          sharing knowledge, getting feedback, and staying
                          updated with the latest design trends and best
                          practices. Join us to connect with fellow designers
                          and grow together.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                          What You'll Get
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          • Access to exclusive design resources
                          <br />
                          • Weekly live design critiques
                          <br />
                          • Networking opportunities
                          <br />
                          • Monthly expert workshops
                          <br />• Portfolio reviews
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                          Community Guidelines
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          • Be respectful and supportive
                          <br />
                          • Share constructive feedback
                          <br />
                          • No self-promotion without permission
                          <br />
                          • Keep discussions design-focused
                          <br />• Follow our code of conduct
                        </p>
                      </div>
                    </section>
                  </DrawerContent>
                </Drawer>
              )}
            </div>

            <div className="flex items-center justify-between text-sm bg-[rgb(248,_249,_251)] p-[10px] flex justify-between">
              <div className="relative group flex items-center gap-1">
                <div className="text-[#4287C4] w-4 h-4">
                  {community.icon.clockSvg}
                </div>
                <span className="text-[14px] font-semibold text-[rgb(0, 0, 0)]">
                  {community.duration}
                </span>

                <div className="absolute -top-10 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
                  Price
                  <div className="absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                </div>
              </div>

              <div className="relative group flex items-center gap-1">
                <div className="text-[#4287C4] w-4 h-4">
                  {community.icon.memberSvg}
                </div>
                <span className="text-[14px] font-semibold text-[rgb(0, 0, 0)]">
                  {community.members}
                </span>

                <div className="absolute -top-10 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
                  Member Count
                  <div className="absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                </div>
              </div>

              <div className="relative group flex items-center gap-1">
                <div className="text-[#4287C4] w-4 h-4  flex items-center">
                  {community.icon.likeSvg}
                </div>
                <span className="text-[14px] font-semibold text-[rgb(0, 0, 0)]">
                  {community.likes}
                </span>

                <div className="absolute -top-10 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
                  Post Count
                  <div className="absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
