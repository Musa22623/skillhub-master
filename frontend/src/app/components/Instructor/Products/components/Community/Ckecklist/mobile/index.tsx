"use client";

import type React from "react";

import { useState } from "react";
import {
  ChevronDown,
  FileText,
  ImageIcon,
  CreditCard,
  User,
  MessageSquare,
  Users,
} from "lucide-react";

export default function CourseChecklist() {
  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    courseRequirements: false,
    profileRequirements: false,
    sessionRequirements: false,
    communityRequirements: false,
  });

  // State for expanded items
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  // State for completed items
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>(
    {
      priceRange: true,
      maxCourseSections: true,
      alternativeLearningActivities: true,
    }
  );

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Toggle item details
  const toggleItemDetails = (itemId: string, event: React.MouseEvent) => {
    // Don't toggle if clicking on the fix button
    if ((event.target as HTMLElement).tagName === "BUTTON") return;

    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Mark item as completed
  const completeItem = (itemId: string) => {
    setCompletedItems((prev) => ({
      ...prev,
      [itemId]: true,
    }));
  };

  // Calculate progress
  const totalItems = 16;
  const completedItemsCount =
    Object.values(completedItems).filter(Boolean).length;
  const progressPercentage = (completedItemsCount / totalItems) * 100;
  const remainingIssues = totalItems - completedItemsCount;

  // Calculate section issues


  const profileIssues =
    4 -
    Object.keys(completedItems).filter(
      (key) =>
        completedItems[key] &&
        ["paypalConnection", "nameFields", "avatar", "bio"].includes(key)
    ).length;

  const communityIssues =
    2 -
    Object.keys(completedItems).filter(
      (key) =>
        completedItems[key] &&
        ["communityTitle", "communitySpaces"].includes(key)
    ).length;

  return (
    <div className="w-full flex justify-center  bg-gray-100 py-5">
      <div className="w-full bg-white overflow-hidden mb-10  rounded-lg">
        <div className="h-full overflow-y-auto overflow-x-hidden relative bg-gray-50 scrollbar-hide">
         

          {/* Progress Header */}
          <div className="p-4 bg-white border-b border-gray-200 flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-[calc(100%-100px)]">
              <div
                className="h-full bg-cyan-500 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-500 font-semibold whitespace-nowrap">
              {remainingIssues} {remainingIssues === 1 ? "issue" : "issues"}{" "}
              left
            </span>
          </div>

          {/* Profile Requirements Section */}
          <div className="bg-white mb-2">
            <div
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("profileRequirements")}
            >
              <div className="flex items-center gap-3">
                <div className="text-base font-semibold text-gray-800">
                  Profile Requirements
                </div>
                <div
                  className={`py-1 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                    profileIssues > 0
                      ? "bg-red-100 text-red-500"
                      : "bg-green-100 text-green-500"
                  }`}
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
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
                      </svg>
                      0 issues
                    </>
                  )}
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSections.profileRequirements ? "rotate-180" : ""
                }`}
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
                    <div className="text-sm text-gray-800 font-semibold self-center">
                      PayPal Connection
                    </div>
                    {completedItems.paypalConnection ? (
                      <div className="col-span-2 flex items-center justify-center gap-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-green-100 border border-green-300 text-green-600">
                        <svg
                          className="w-5 h-5 flex-shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
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
                        PayPal account connection is required to receive
                        payments. Please connect your PayPal account.
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
                    <div className="text-sm text-gray-800 font-semibold self-center">
                      First and Last Name
                    </div>
                    {completedItems.nameFields ? (
                      <div className="col-span-2 flex items-center justify-center gap-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-green-100 border border-green-300 text-green-600">
                        <svg
                          className="w-5 h-5 flex-shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
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
                        Please provide your full name (first and last name) in
                        your profile.
                      </p>
                    </div>
                  )}
                </div>

                {/* Avatar */}
                <div className="bg-white border border-gray-200 rounded-lg mb-3 last:mb-0">
                  <div
                    className="p-4 grid grid-cols-[32px_1fr] gap-3"
                    onClick={(e) => toggleItemDetails("avatar", e)}
                  >
                    <div className="flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-cyan-500" />
                    </div>
                    <div className="text-sm text-gray-800 font-semibold self-center">
                      Profile Avatar
                    </div>
                    {completedItems.avatar ? (
                      <div className="col-span-2 flex items-center justify-center gap-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-green-100 border border-green-300 text-green-600">
                        <svg
                          className="w-5 h-5 flex-shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
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
                        A profile avatar is required. Please upload a profile
                        picture.
                      </p>
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div className="bg-white border border-gray-200 rounded-lg mb-3 last:mb-0">
                  <div
                    className="p-4 grid grid-cols-[32px_1fr] gap-3"
                    onClick={(e) => toggleItemDetails("bio", e)}
                  >
                    <div className="flex items-center justify-center">
                      <FileText className="w-6 h-6 text-cyan-500" />
                    </div>
                    <div className="text-sm text-gray-800 font-semibold self-center">
                      Profile Bio (200+ characters)
                    </div>
                    {completedItems.bio ? (
                      <div className="col-span-2 flex items-center justify-center gap-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-green-100 border border-green-300 text-green-600">
                        <svg
                          className="w-5 h-5 flex-shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
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
                        Profile bio must be at least 200 characters. Current
                        length: 85 characters.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Community Requirements Section */}
          <div className="bg-white mb-2">
            <div
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("communityRequirements")}
            >
              <div className="flex items-center gap-3">
                <div className="text-base font-semibold text-gray-800">
                  Community Requirements
                </div>
                <div
                  className={`p-1 px-0 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                    communityIssues > 0
                      ? "bg-red-100 text-red-500"
                      : "bg-green-100 text-green-500"
                  }`}
                >
                  {communityIssues > 0 ? (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 15 15" fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                          fill="currentColor"
                        />
                      </svg>
                      {communityIssues} issues
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
                      </svg>
                      0 issues
                    </>
                  )}
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSections.communityRequirements ? "rotate-180" : ""
                }`}
              />
            </div>
            {expandedSections.communityRequirements && (
              <div className="p-4 border-t border-gray-200">
                {/* Community Title */}
                <div className="bg-white border border-gray-200 rounded-lg mb-3 last:mb-0">
                  <div
                    className="p-4 grid grid-cols-[32px_1fr] gap-3"
                    onClick={(e) => toggleItemDetails("communityTitle", e)}
                  >
                    <div className="flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-cyan-500" />
                    </div>
                    <div className="text-sm text-gray-800 font-semibold self-center">
                      Community Title
                    </div>
                    {completedItems.communityTitle ? (
                      <div className="col-span-2 flex items-center justify-center gap-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-green-100 border border-green-300 text-green-600">
                        <svg
                          className="w-5 h-5 flex-shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
                        </svg>
                        Completed
                      </div>
                    ) : (
                      <button
                        className="col-span-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-800 hover:bg-gray-200"
                        onClick={() => completeItem("communityTitle")}
                      >
                        Set Title
                      </button>
                    )}
                  </div>
                  {expandedItems.communityTitle && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-500 leading-relaxed">
                        A title for your course community is required. This
                        helps learners identify and join the correct community
                        space.
                      </p>
                    </div>
                  )}
                </div>

                {/* Community Spaces */}
                <div className="bg-white border border-gray-200 rounded-lg mb-3 last:mb-0">
                  <div
                    className="p-4 grid grid-cols-[32px_1fr] gap-3"
                    onClick={(e) => toggleItemDetails("communitySpaces", e)}
                  >
                    <div className="flex items-center justify-center">
                      <Users className="w-6 h-6 text-cyan-500" />
                    </div>
                    <div className="text-sm text-gray-800 font-semibold self-center">
                      Community Spaces (1+ Required)
                    </div>
                    {completedItems.communitySpaces ? (
                      <div className="col-span-2 flex items-center justify-center gap-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-green-100 border border-green-300 text-green-600">
                        <svg
                          className="w-5 h-5 flex-shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
                        </svg>
                        Completed
                      </div>
                    ) : (
                      <button
                        className="col-span-2 p-2.5 mt-2 w-full rounded-lg text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-800 hover:bg-gray-200"
                        onClick={() => completeItem("communitySpaces")}
                      >
                        Create Space
                      </button>
                    )}
                  </div>
                  {expandedItems.communitySpaces && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-500 leading-relaxed">
                        At least one community space is required. Community
                        spaces provide areas for specific types of discussions
                        and interactions.
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
  );
}
