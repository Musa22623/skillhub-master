"use client";

import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/components/ui/tabs";
import React from "react";
import Calendar from "../Calender/components/tabs/Calendar";
import Courses from "./components/tabs/Courses";
import Discussions from "./components/tabs/Discussions";
import Events from "./components/tabs/Events";
import Certificates from "./components/tabs/Certificates";
import Members from "./components/tabs/Members";
import About from "./components/tabs/About";
import { UpdownSVG } from "../../svg";

import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/app/components/ui/drawer";
import { Button } from "@/app/components/ui/button";

import { X } from "lucide-react";
import PopupDrawer from "./components/PopupDrawer";
export default function CommunityTabs() {
  const [activeTab, setActiveTab] = useState("calendar");
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-sm relative overflow-hidden">
      <header className="flex items-center relative bg-white">
        <div className="flex items-center p-3 gap-3">
          <header className="flex items-center relative bg-white pb-5 border-b border-gray-300">
            <div className="relative w-16 h-14 mr-3 rounded-sm overflow-hidden">
              <Image
                src="https://i.ibb.co/jJ4GHXP/img1.jpg"
                alt="img"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              The 4D Copywriting Community
              <button
                className="focus:outline-none"
                onClick={() => setIsOpen(true)}
              >
                <UpdownSVG />
              </button>
            </h1>
            {/* Popup */}

            {isOpen && !isMobile && (
              <div className="fixed inset-0 bg-black/30  flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[95%] max-w-7xl relative z-50">
                  {/* Close button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-8 right-8 text-black-500 hover:text-gray-700"
                  >
                    <X />
                  </button>

                  {/* Title */}
                  <h2 className="text-2xl font-bold mb-6">Payment History</h2>

                  <hr className="border border-gray-200" />

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <PopupDrawer />
                  </div>
                </div>
              </div>
            )}

            {isMobile && (
              <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerContent className="mb-4 ">
                  <DrawerHeader className="flex-row items-center justify-between border-b">
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant={"secondary"}
                    >
                      <X className="size-4" />
                    </Button>
                    <DrawerTitle />
                  </DrawerHeader>
                  <section className="p-4 overflow-auto no-scrollbar">
                    <PopupDrawer />
                  </section>
                </DrawerContent>
              </Drawer>
            )}
          </header>
          

        </div>
      </header>

      {/* Tabs */}
      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="w-full "
      >
        <TabsList className=" flex overflow-x-auto no-scrollbar xs:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 xs:border-b border-gray-200 relative bg-white w-full justify-start rounded-none h-auto py-0">
          <TabsTrigger
            value="courses"
            className="text-base font-semibold data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 text-gray-500  rounded-none border-0 data-[state=active]:shadow-none"
          >
            Courses
          </TabsTrigger>
          <TabsTrigger
            value="discussions"
            className="text-base font-semibold data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 text-gray-500  rounded-none border-0 data-[state=active]:shadow-none"
          >
            Discussions
          </TabsTrigger>
          <TabsTrigger
            value="calendar"
            className="text-base font-semibold data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 text-gray-500  rounded-none border-0 data-[state=active]:shadow-none"
          >
            Calendar
          </TabsTrigger>
          <TabsTrigger
            value="events"
            className="text-base font-semibold data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 text-gray-500  rounded-none border-0 data-[state=active]:shadow-none"
          >
            Events
          </TabsTrigger>
          <TabsTrigger
            value="certificates"
            className="text-base font-semibold data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 text-gray-500  rounded-none border-0 data-[state=active]:shadow-none"
          >
            Certificates
          </TabsTrigger>
          <TabsTrigger
            value="members"
            className="text-base font-semibold data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 text-gray-500  rounded-none border-0 data-[state=active]:shadow-none"
          >
            Members
          </TabsTrigger>
          <TabsTrigger
            value="about"
            className="text-base font-semibold data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 text-gray-500  rounded-none border-0 data-[state=active]:shadow-none"
          >
            About
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="mt-0">
          <Courses />
        </TabsContent>

        <TabsContent value="discussions" className="mt-0">
          <Discussions />
        </TabsContent>

        <TabsContent value="calendar" className="mt-0">
          <Calendar open={isOpen} setOpen={setIsOpen} />
        </TabsContent>

        <TabsContent value="events" className="mt-0">
          <Events />
        </TabsContent>

        <TabsContent value="certificates" className="mt-0">
          <Certificates />
        </TabsContent>

        <TabsContent value="members" className="mt-0">
          <Members />
        </TabsContent>

        <TabsContent value="about" className="mt-0">
          <About />
        </TabsContent>
      </Tabs>
    </div>
  );
}
