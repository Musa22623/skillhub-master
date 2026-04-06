"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronDown,
  Plus,
  DollarSign,
  Clock,
  LayoutList,
  FileText,
  ImageIcon,
  List,
  CreditCard,
  User,
 
} from "lucide-react"

export default function CourseChecklist() {
  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    courseRequirements: false,
    profileRequirements: false,
    sessionRequirements: false,
    communityRequirements: false,
  })

  // State for expanded items
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  // State for completed items
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({
    priceRange: true,
    maxCourseSections: true,
    alternativeLearningActivities: true,
  })

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Toggle item details
  const toggleItemDetails = (itemId: string, event: React.MouseEvent) => {
    // Don't toggle if clicking on the fix button
    if ((event.target as HTMLElement).tagName === "BUTTON") return

    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }))
  }

  // Mark item as completed
  const completeItem = (itemId: string) => {
    setCompletedItems((prev) => ({
      ...prev,
      [itemId]: true,
    }))
  }

  // Calculate progress
  const totalItems = 16
  const completedItemsCount = Object.values(completedItems).filter(Boolean).length
  const progressPercentage = (completedItemsCount / totalItems) * 100
  const remainingIssues = totalItems - completedItemsCount

  // Calculate section issues
  const courseIssues =
    7 -
    Object.keys(completedItems).filter(
      (key) =>
        completedItems[key] &&
        [
          "priceRange",
          "learningActivities",
          "youtubeContent",
          "durationRange",
          "categorySelection",
          "featuredImage",
          "courseBulletPoints",
        ].includes(key),
    ).length

  const profileIssues =
    4 -
    Object.keys(completedItems).filter(
      (key) => completedItems[key] && ["paypalConnection", "nameFields", "avatar", "bio"].includes(key),
    ).length

  
  return (
    <div className="w-full flex justify-center  bg-gray-100 py-5" >
      <div className="w-full bg-white overflow-hidden mb-10  rounded-lg">
        <div className="h-full overflow-y-auto overflow-x-hidden relative bg-gray-50 scrollbar-hide">
          {/* Header */}
          {/* <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
            <div className="p-4 flex items-center gap-3">
              <Image
                src="https://i.ibb.co/jJ4GHXP/img1.jpg"
                alt="Course"
                width={48}
                height={48}
                className="rounded-lg object-cover"
              />
              <h1 className="text-base font-semibold text-gray-800">Intro to UX Design</h1>
            </div>

            <nav className="px-4 overflow-x-auto whitespace-nowrap scrollbar-hide mb-2">
              <div className="inline-flex gap-6 pb-2">
                <Link href="#outline" className="text-gray-500 text-sm font-semibold">
                  Outline
                </Link>
                <Link href="#settings" className="text-gray-500 text-sm font-semibold">
                  Settings
                </Link>
                <Link href="#landing" className="text-gray-500 text-sm font-semibold">
                  Landing Page
                </Link>
                <Link href="#pricing" className="text-gray-500 text-sm font-semibold">
                  Pricing
                </Link>
                <Link
                  href="#checklist"
                  className="text-cyan-500 text-sm font-semibold relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-cyan-500"
                >
                  Checklist
                </Link>
              </div>
            </nav>
          </div> */}

          {/* Progress Header */}
          <div className="p-4 bg-white border-b border-gray-200 flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-[calc(100%-100px)]">
              <div
                className="h-full bg-cyan-500 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-500 font-semibold whitespace-nowrap">
              {remainingIssues} {remainingIssues === 1 ? "issue" : "issues"} left
            </span>
          </div>

          {/* Course Requirements Section */}
          <div className="bg-white mb-2">
            <div
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("courseRequirements")}
            >
              <div className="flex items-center gap-3">
                <div className="text-base font-semibold text-gray-800">Course Requirements</div>
                <div
                  className={`py-1 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 ${courseIssues > 0 ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"}`}
                >
                  {courseIssues > 0 ? (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 15 15" fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                          fill="currentColor"
                        />
                      </svg>
                      {courseIssues} issues
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
                      </svg>
                      0 issues
                    </>
                  )}
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${expandedSections.courseRequirements ? "rotate-180" : ""}`}
              />
            </div>
            {expandedSections.courseRequirements && (
              <div className="p-4 border-t border-gray-200">
                {/* Learning Activity Item */}
                <div className="bg-white border border-gray-200 rounded-lg mb-3 last:mb-0">
                  <div
                    className="p-4 grid grid-cols-[32px_1fr] gap-3"
                    onClick={(e) => toggleItemDetails("learningActivities", e)}
                  >
                    <div className="flex items-center justify-center">
                      <Plus className="w-6 h-6 text-cyan-500" />
                    </div>
                    <div className="text-sm text-gray-800 font-semibold self-center">
                      Learning Activities (1+ Required)
                    </div>
                    {completedItems.learningActivities ? (
                      <div className="col-span-2 flex items-center justify-center gap-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-green-100 border border-green-300 text-green-600">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
                        </svg>
                        Completed
                      </div>
                    ) : (
                      <button
                        className="col-span-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-800 hover:bg-gray-200"
                        onClick={() => completeItem("learningActivities")}
                      >
                        Add Learning Activity
                      </button>
                    )}
                  </div>
                  {expandedItems.learningActivities && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-500 leading-relaxed">
                        Your course needs at least one learning activity. Currently no learning activities have been
                        added. Learning activities are essential components that help students achieve the course
                        objectives.
                      </p>
                    </div>
                  )}
                </div>

                {/* Price Range Item */}
                <div className="bg-white border border-gray-200 rounded-lg mb-3 last:mb-0">
                  <div
                    className="p-4 grid grid-cols-[32px_1fr] gap-3"
                    onClick={(e) => toggleItemDetails("priceRange", e)}
                  >
                    <div className="flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-cyan-500" />
                    </div>
                    <div className="text-sm text-gray-800 font-semibold self-center">Price Range</div>
                    <div className="col-span-2 flex items-center justify-center gap-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-green-100 border border-green-300 text-green-600">
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
                      </svg>
                      Completed
                    </div>
                  </div>
                  {expandedItems.priceRange && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-500 leading-relaxed">
                        Course price is within the allowed range ($9.99 - $199.99). Current price: $49.99
                      </p>
                    </div>
                  )}
                </div>

                {/* YouTube Content Check */}
                <div className="bg-white border border-gray-200 rounded-lg mb-3 last:mb-0">
                  <div
                    className="p-4 grid grid-cols-[32px_1fr] gap-3"
                    onClick={(e) => toggleItemDetails("youtubeContent", e)}
                  >
                    <div className="flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-cyan-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19.938 8.003c-.108-1.003-.457-1.912-1.374-2.819-.917-.907-1.83-1.25-2.837-1.357C14.365 3.664 12 3.664 12 3.664s-2.365 0-3.727.163c-1.007.107-1.92.45-2.837 1.357-.917.907-1.266 1.816-1.374 2.819-.164 1.353-.164 2.486-.164 2.486s0 1.133.164 2.486c.108 1.003.457 1.912 1.374 2.819.917.907 1.83 1.25 2.837 1.357 1.362.163 3.727.163 3.727.163s2.365 0 3.727-.163c1.007-.107 1.92-.45 2.837-1.357.917-.907 1.266-1.816 1.374-2.819.164-1.353.164-2.486.164-2.486s0-1.133-.164-2.486z" />
                      </svg>
                    </div>
                    <div className="text-sm text-gray-800 font-semibold self-center">YouTube Content Check</div>
                    {completedItems.youtubeContent ? (
                      <div className="col-span-2 flex items-center justify-center gap-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-green-100 border border-green-300 text-green-600">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
                        </svg>
                        Completed
                      </div>
                    ) : (
                      <button
                        className="col-span-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-800 hover:bg-gray-200"
                        onClick={() => completeItem("youtubeContent")}
                      >
                        Remove YouTube Content
                      </button>
                    )}
                  </div>
                  {expandedItems.youtubeContent && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-500 leading-relaxed">
                        Course contains YouTube learning activities which are not allowed. Please remove or replace with
                        native video content.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        Affected activities:
                        <Link href="#" className="text-cyan-500 text-xs font-semibold hover:underline">
                          Introduction Video
                        </Link>
                        <Link href="#" className="text-cyan-500 text-xs font-semibold hover:underline">
                          Module 2 Tutorial
                        </Link>
                        <Link href="#" className="text-cyan-500 text-xs font-semibold hover:underline">
                          Final Project Guide
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Duration Range Check */}
                <div className="bg-white border border-gray-200 rounded-lg mb-3 last:mb-0">
                  <div
                    className="p-4 grid grid-cols-[32px_1fr] gap-3"
                    onClick={(e) => toggleItemDetails("durationRange", e)}
                  >
                    <div className="flex items-center justify-center">
                      <Clock className="w-6 h-6 text-cyan-500" />
                    </div>
                    <div className="text-sm text-gray-800 font-semibold self-center">
                      Duration Range Check (FREE/PAID)
                    </div>
                    {completedItems.durationRange ? (
                      <div className="col-span-2 flex items-center justify-center gap-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-green-100 border border-green-300 text-green-600">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
                        </svg>
                        Completed
                      </div>
                    ) : (
                      <button
                        className="col-span-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-800 hover:bg-gray-200"
                        onClick={() => completeItem("durationRange")}
                      >
                        Adjust Duration
                      </button>
                    )}
                  </div>
                  {expandedItems.durationRange && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-500 leading-relaxed">
                        Course duration does not meet the minimum requirement for FREE courses (15 minutes minimum).
                        Current duration: 8 minutes.
                      </p>
                    </div>
                  )}
                </div>

                {/* Category Selection */}
                <div className="bg-white border border-gray-200 rounded-lg mb-3 last:mb-0">
                  <div
                    className="p-4 grid grid-cols-[32px_1fr] gap-3"
                    onClick={(e) => toggleItemDetails("categorySelection", e)}
                  >
                    <div className="flex items-center justify-center">
                      <LayoutList className="w-6 h-6 text-cyan-500" />
                    </div>
                    <div className="text-sm text-gray-800 font-semibold self-center">Category Selection</div>
                    {completedItems.categorySelection ? (
                      <div className="col-span-2 flex items-center justify-center gap-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-green-100 border border-green-300 text-green-600">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
                        </svg>
                        Completed
                      </div>
                    ) : (
                      <button
                        className="col-span-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-800 hover:bg-gray-200"
                        onClick={() => completeItem("categorySelection")}
                      >
                        Select Category
                      </button>
                    )}
                  </div>
                  {expandedItems.categorySelection && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-500 leading-relaxed">
                        Course category is required. Please select an appropriate category for your course.
                      </p>
                    </div>
                  )}
                </div>

                {/* Featured Image */}
                <div className="bg-white border border-gray-200 rounded-lg mb-3 last:mb-0">
                  <div
                    className="p-4 grid grid-cols-[32px_1fr] gap-3"
                    onClick={(e) => toggleItemDetails("featuredImage", e)}
                  >
                    <div className="flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-cyan-500" />
                    </div>
                    <div className="text-sm text-gray-800 font-semibold self-center">
                      Featured Image (500x200 minimum)
                    </div>
                    {completedItems.featuredImage ? (
                      <div className="col-span-2 flex items-center justify-center gap-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-green-100 border border-green-300 text-green-600">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
                        </svg>
                        Completed
                      </div>
                    ) : (
                      <button
                        className="col-span-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-800 hover:bg-gray-200"
                        onClick={() => completeItem("featuredImage")}
                      >
                        Upload Image
                      </button>
                    )}
                  </div>
                  {expandedItems.featuredImage && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-500 leading-relaxed">
                        Featured image is missing or does not meet minimum size requirements (500x200 pixels).
                      </p>
                    </div>
                  )}
                </div>

                {/* Course Bullet Points */}
                <div className="bg-white border border-gray-200 rounded-lg mb-3 last:mb-0">
                  <div
                    className="p-4 grid grid-cols-[32px_1fr] gap-3"
                    onClick={(e) => toggleItemDetails("courseBulletPoints", e)}
                  >
                    <div className="flex items-center justify-center">
                      <List className="w-6 h-6 text-cyan-500" />
                    </div>
                    <div className="text-sm text-gray-800 font-semibold self-center">
                      Course Bullet Points (4+ Required)
                    </div>
                    {completedItems.courseBulletPoints ? (
                      <div className="col-span-2 flex items-center justify-center gap-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-green-100 border border-green-300 text-green-600">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
                        </svg>
                        Completed
                      </div>
                    ) : (
                      <button
                        className="col-span-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-800 hover:bg-gray-200"
                        onClick={() => completeItem("courseBulletPoints")}
                      >
                        Add Bullet Points
                      </button>
                    )}
                  </div>
                  {expandedItems.courseBulletPoints && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-500 leading-relaxed">
                        Course requires at least 4 bullet points describing key learning outcomes. Currently: 2 bullet
                        points.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Requirements Section */}
          <div className="bg-white mb-2">
            <div
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("profileRequirements")}
            >
              <div className="flex items-center gap-3">
                <div className="text-base font-semibold text-gray-800">Profile Requirements</div>
                <div
                  className={`py-1 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 ${profileIssues > 0 ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"}`}
                >
                  {profileIssues > 0 ? (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 15 15" fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                          fill="currentColor"
                        />
                      </svg>
                      {profileIssues} issues
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
                      </svg>
                      0 issues
                    </>
                  )}
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${expandedSections.profileRequirements ? "rotate-180" : ""}`}
              />
            </div>
            {expandedSections.profileRequirements && (
              <div className="p-4 border-t border-gray-200">
                {/* PayPal Connection */}
                <div className="bg-white border border-gray-200 rounded-lg mb-3 last:mb-0">
                  <div
                    className="p-4 grid grid-cols-[32px_1fr] gap-3"
                    onClick={(e) => toggleItemDetails("paypalConnection", e)}
                  >
                    <div className="flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-cyan-500" />
                    </div>
                    <div className="text-sm text-gray-800 font-semibold self-center">PayPal Connection</div>
                    {completedItems.paypalConnection ? (
                      <div className="col-span-2 flex items-center justify-center gap-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-green-100 border border-green-300 text-green-600">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
                        </svg>
                        Completed
                      </div>
                    ) : (
                      <button
                        className="col-span-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-800 hover:bg-gray-200"
                        onClick={() => completeItem("paypalConnection")}
                      >
                        Connect PayPal
                      </button>
                    )}
                  </div>
                  {expandedItems.paypalConnection && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-500 leading-relaxed">
                        PayPal account connection is required to receive payments. Please connect your PayPal account.
                      </p>
                    </div>
                  )}
                </div>

                {/* Name Fields */}
                <div className="bg-white border border-gray-200 rounded-lg mb-3 last:mb-0">
                  <div
                    className="p-4 grid grid-cols-[32px_1fr] gap-3"
                    onClick={(e) => toggleItemDetails("nameFields", e)}
                  >
                    <div className="flex items-center justify-center">
                      <User className="w-6 h-6 text-cyan-500" />
                    </div>
                    <div className="text-sm text-gray-800 font-semibold self-center">First and Last Name</div>
                    {completedItems.nameFields ? (
                      <div className="col-span-2 flex items-center justify-center gap-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-green-100 border border-green-300 text-green-600">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
                        </svg>
                        Completed
                      </div>
                    ) : (
                      <button
                        className="col-span-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-800 hover:bg-gray-200"
                        onClick={() => completeItem("nameFields")}
                      >
                        Complete Profile
                      </button>
                    )}
                  </div>
                  {expandedItems.nameFields && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-500 leading-relaxed">
                        Please provide your full name (first and last name) in your profile.
                      </p>
                    </div>
                  )}
                </div>

                {/* Avatar */}
                <div className="bg-white border border-gray-200 rounded-lg mb-3 last:mb-0">
                  <div className="p-4 grid grid-cols-[32px_1fr] gap-3" onClick={(e) => toggleItemDetails("avatar", e)}>
                    <div className="flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-cyan-500" />
                    </div>
                    <div className="text-sm text-gray-800 font-semibold self-center">Profile Avatar</div>
                    {completedItems.avatar ? (
                      <div className="col-span-2 flex items-center justify-center gap-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-green-100 border border-green-300 text-green-600">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
                        </svg>
                        Completed
                      </div>
                    ) : (
                      <button
                        className="col-span-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-800 hover:bg-gray-200"
                        onClick={() => completeItem("avatar")}
                      >
                        Upload Avatar
                      </button>
                    )}
                  </div>
                  {expandedItems.avatar && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-500 leading-relaxed">
                        A profile avatar is required. Please upload a profile picture.
                      </p>
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div className="bg-white border border-gray-200 rounded-lg mb-3 last:mb-0">
                  <div className="p-4 grid grid-cols-[32px_1fr] gap-3" onClick={(e) => toggleItemDetails("bio", e)}>
                    <div className="flex items-center justify-center">
                      <FileText className="w-6 h-6 text-cyan-500" />
                    </div>
                    <div className="text-sm text-gray-800 font-semibold self-center">Profile Bio (200+ characters)</div>
                    {completedItems.bio ? (
                      <div className="col-span-2 flex items-center justify-center gap-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-green-100 border border-green-300 text-green-600">
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
                        </svg>
                        Completed
                      </div>
                    ) : (
                      <button
                        className="col-span-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-800 hover:bg-gray-200"
                        onClick={() => completeItem("bio")}
                      >
                        Add Bio
                      </button>
                    )}
                  </div>
                  {expandedItems.bio && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-500 leading-relaxed">
                        Profile bio must be at least 200 characters. Current length: 85 characters.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

       
        </div>
      </div>
    </div>
  )
}

