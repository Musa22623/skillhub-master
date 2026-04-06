"use client";

import type React from "react";

import { useState } from "react";

import {
  CalendarSvg,
  CheckCircleSvg,
  ChevronDownSvg,
  EmailIconSvg,
  HomeOutlinedSvg,
  ImageIconSvg,
  ListSvg,
  SalesDollerSvg,
  UserCircleSvg,
  UserSvg,
  VideoIconSvg,
  XSvg,
  VideoIcon,
  CategoryIcon,
  Course3Icon,
  Learners,
  CpeIcon,
  ListIcon,
  BlackTrainingIcon,
  ChatIcon,
  CertificateIcon,
  SkillIcon,
  PaypalIcon,
  BioIcon,
  PlanPurchaseIcon,
  YoutubeContectIcon,
 
  ClockIcon1,

} from "../../../../svg";

export default function CourseChecklist() {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [showIssuesOnly, setShowIssuesOnly] = useState(false);
  const [expandMenuOpen, setExpandMenuOpen] = useState(false);
  const [expandState, setExpandState] = useState("");

  // Initialize progress data
  const [progress, setProgress] = useState({
    courseRequirements: { total: 16, completed: 2 },
    profileRequirements: { total: 6, completed: 0 },
    sessionRequirements: { total: 10, completed: 2 },
    communityRequirements: { total: 4, completed: 0 },
  });

  // Calculate overall progress
  const totalItems = Object.values(progress).reduce(
    (sum, section) => sum + section.total,
    0
  );
  const completedItems = Object.values(progress).reduce(
    (sum, section) => sum + section.completed,
    0
  );
  const overallProgress = Math.round((completedItems / totalItems) * 100);

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Toggle item expansion
  const toggleItem = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Handle expand menu actions
  const handleExpandAction = (action: string) => {
    if (expandState === action) {
      // Collapse all if the same action is clicked again
      setExpandedSections([]);
      setExpandedItems([]);
      setExpandState("");
    } else {
      switch (action) {
        case "expand-all":
          setExpandedSections(["course", "profile", "session", "community"]);
          setExpandedItems([
            "school",
            "video",
            "price",
            "youtube",
            "sessions",
            "duration",
            "category",
            "image",
            "promo",
            "bullets",
            "requirements",
            "learners",
            "cpe",
            "sections",
            "title",
            "keywords",
            "community",
            "certificate",
            "paypal",
            "name",
            "avatar",
            "bio",
            "credentials",
            "plan",
            "community-title",
            "spaces",
            "cover",
            "error",
          ]);
          break;
        case "expand-issues":
          setExpandedSections(["course", "profile", "session", "community"]);
          // Only expand items with issues (not completed)
          setExpandedItems([
            "school",
            "video",
            "youtube",
            "sessions",
            "duration",
            "category",
            "image",
            "promo",
            "bullets",
            "requirements",
            "learners",
            "cpe",
            "title",
            "keywords",
            "community",
            "certificate",
            "paypal",
            "name",
            "avatar",
            "bio",
            "credentials",
            "plan",
            "community-title",
            "spaces",
            "cover",
            "error",
          ]);
          break;
        case "expand-completed":
          setExpandedSections(["course", "profile", "session", "community"]);
          // Only expand completed items
          setExpandedItems(["price", "sections"]);
          break;
      }
      setExpandState(action);
    }
    setExpandMenuOpen(false);
  };

  // Simulate completing an item
  const completeItem = async (
    sectionKey: keyof typeof progress,
    itemId: string
  ) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update progress
    setProgress((prev) => {
      const section = { ...prev[sectionKey] };
      if (section.completed < section.total) {
        section.completed += 1;
      }
      return { ...prev, [sectionKey]: section };
    });

    // Add to completed items list (would be handled differently in a real app)
    // This is just for demo purposes
    const itemElement = document.getElementById(itemId);
    if (itemElement) {
      const fixButton = itemElement.querySelector(".fix-button");
      if (fixButton) {
        fixButton.classList.add("hidden");
        const statusElement = itemElement.querySelector(".item-status");
        if (statusElement) {
          statusElement.classList.remove("hidden");
        }
      }
    }
  };

  // Progress circle component
  const ProgressCircle = ({ percent }: { percent: number }) => {
    const circumference = 2 * Math.PI * 10;
    const offset = circumference - (percent / 100) * circumference;

    return (
      <div className="relative w-6 h-6 mr-3">
        <svg
          className="transform -rotate-90"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <circle
            className="stroke-gray-200"
            cx="12"
            cy="12"
            r="10"
            strokeWidth="2.5"
            fill="none"
          />
          <circle
            className="stroke-primary transition-all duration-300"
            cx="12"
            cy="12"
            r="10"
            strokeWidth="2.5"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity top-[-30px] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-20">
          {percent}% Complete
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center p-5 md:p-10">
      <div className="w-full ">
        <div className="bg-white mb-3 rounded-lg shadow-sm pb-4">
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <h1 className="text-xl font-semibold text-gray-800">
                Course Checklist
              </h1>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="h-2 bg-gray-200 rounded-full w-full md:w-[200px]">
                  <div
                    className="h-full bg-primary transition-all rounded-full duration-300"
                    style={{ width: `${overallProgress}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500 font-semibold whitespace-nowrap">
                  {totalItems - completedItems} issues left
                </span>
              </div>
            </div>

            <div className="hidden xs:flex items-center">
              <div className="flex items-center gap-2 mr-4 ">
                <span className="text-sm text-gray-500">Show Issues</span>

                <label className="flex cursor-pointer select-none items-center">
                  <div className="relative">
                    {/* Hidden Checkbox */}
                    <input
                      type="checkbox"
                      checked={showIssuesOnly}
                      onChange={() => setShowIssuesOnly(!showIssuesOnly)}
                      className="sr-only peer"
                    />
                    {/* Toggle Background */}
                    <div
                      className={`block h-6 w-12 rounded-full transition ${
                        showIssuesOnly ? "bg-teal-500" : "bg-gray-300"
                      }`}
                    ></div>
                    {/* Moving Dot */}
                    <div
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                        showIssuesOnly ? "translate-x-6" : "translate-x-1"
                      }`}
                    ></div>
                  </div>
                </label>
              </div>

              <div className="relative">
                <button
                  className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-semibold text-gray-800 flex items-center gap-2 hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandMenuOpen(!expandMenuOpen)}
                >
                  Expand
                  <ChevronDownSvg
                    fill="white"
                    className="w-5 h-5 flex items-center"
                  />
                </button>

                {expandMenuOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md min-w-[160px] z-10">
                    <button
                      className="w-full px-4 py-2 text-left font-medium text-sm text-gray-900 hover:bg-gray-50"
                      onClick={() => handleExpandAction("expand-all")}
                    >
                      Expand All
                    </button>
                    <button
                      className="w-full px-4 py-2 text-left  font-medium text-sm text-gray-900 hover:bg-gray-50"
                      onClick={() => handleExpandAction("expand-issues")}
                    >
                      Expand Issues
                    </button>
                    <button
                      className="w-full px-4 py-2 text-left font-medium text-sm text-gray-900 hover:bg-gray-50"
                      onClick={() => handleExpandAction("expand-completed")}
                    >
                      Expand Completed
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Course Requirements Section */}
          <div className="m-4">
            <div className="border border-gray-200 rounded-lg ">
              <div
                className="p-4 md:px-6 bg-gray-50 rounded-t-lg flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("course")}
              >
                <div className="flex items-center gap-4">
                  <div className="text-base font-semibold text-gray-800">
                    Course Requirements
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 bg-red-50 text-red-500 min-w-[95px] whitespace-nowrap">
                    <XSvg className="w-4 h-4" />
                    {progress.courseRequirements.total -
                      progress.courseRequirements.completed}{" "}
                    issues
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <ProgressCircle
                    percent={Math.round(
                      (progress.courseRequirements.completed /
                        progress.courseRequirements.total) *
                        100
                    )}
                  />
                  <ChevronDownSvg
                    fill="white"
                    className={`  transition-transform duration-200 h-5 w-5 ${
                      expandedSections.includes("course") ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {expandedSections.includes("course") && (
                <div className="p-4">
                  {/* Link to School */}
                  <ChecklistItem
                    id="school"
                    icon={
                      <HomeOutlinedSvg className="w-6 h-6 text-primary fill-teal-500" />
                    }
                    title="Link to School"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("school")}
                    onToggle={() => toggleItem("school")}
                    // onFix={() => completeItem("courseRequirements", "school")}
                    fixButtonText="Add School Link"
                    description="Course must be linked to a school. Please select or create a school for this course."
                  />

                  {/* Video Learning Activities */}
                  <ChecklistItem
                    id="video"
                    icon={
                      <VideoIconSvg
                        className="w-6 h-6 text-primary"
                        fill="white"
                      />
                    }
                    title="Video Learning Activities (Min: 3, Max: 15)"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("video")}
                    onToggle={() => toggleItem("video")}
                    // onFix={() => completeItem("courseRequirements", "video")}
                    fixButtonText="Add Videos"
                    description={
                      <div>
                        Course requires minimum 3 video learning activities.
                        Current count: 1
                        <div className="mt-3 flex gap-2 flex-wrap">
                          Current videos:
                          <a
                            href="#"
                            className="text-sky-500 text-xs font-semibold flex items-center gap-1 hover:underline"
                          >
                            <VideoIcon className="h-6 w-6 text-sky-600" />
                            Introduction Video
                          </a>
                        </div>
                      </div>
                    }
                  />

                  {/* Price Range Check */}
                  <ChecklistItem
                    id="price"
                    icon={
                      <SalesDollerSvg className="w-6 h-6 text-primary fill-teal-500" />
                    }
                    title="Price Range ($9.99 - $199.99)"
                    isCompleted={true}
                    isExpanded={expandedItems.includes("price")}
                    onToggle={() => toggleItem("price")}
                    description={
                      <div>
                        Course price is within the allowed range. Current price:{" "}
                        <span className="bg-green-100 text-green-600 px-1 py-0.5 rounded font-semibold">
                          $49.99
                        </span>
                      </div>
                    }
                  />

                  {/* YouTube Content Check */}
                  <ChecklistItem
                    id="youtube"
                    icon={
                      <YoutubeContectIcon
                        fill="white"
                        className="w-6 h-6 text-primary"
                      />
                    }
                    title="YouTube Content Check"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("youtube")}
                    onToggle={() => toggleItem("youtube")}
                    // onFix={() => completeItem("courseRequirements", "youtube")}
                    fixButtonText="Remove YouTube Content"
                    description={
                      <div>
                        Course contains YouTube learning activities which are
                        not allowed. Please remove or replace with native video
                        content.
                        <div className="mt-4 flex gap-2 flex-wrap">
                          Affected activities:
                          <a
                            href="#"
                            className="text-sky-600 pt-1text-sm font-semibold hover:underline"
                          >
                            Introduction Video
                          </a>
                          <a
                            href="#"
                            className="text-sky-600 pt-1text-sm font-semibold hover:underline"
                          >
                            Module 2 Tutorial
                          </a>
                          <a
                            href="#"
                            className="text-sky-600 pt-1text-sm font-semibold hover:underline"
                          >
                            Final Project Guide
                          </a>
                        </div>
                      </div>
                    }
                  />

                  {/* Max Sessions Check */}
                  <ChecklistItem
                    id="sessions"
                    icon={
                      <CalendarSvg className="w-6 h-6 text-primaryc fill-teal-500" />
                    }
                    title="Session/Meeting Activities (Max: 3)"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("sessions")}
                    onToggle={() => toggleItem("sessions")}
                    // onFix={() => completeItem("courseRequirements", "sessions")}
                    fixButtonText="Review Sessions"
                    description={
                      <div>
                        Course exceeds maximum allowed session/meeting
                        activities (Max: 3). Current count: 5
                        <div className="mt-3 flex gap-2 flex-wrap">
                          Affected sessions:
                          <a
                            href="#"
                            className="text-sky-600 pt-1text-sm font-semibold hover:underline"
                          >
                            Week 1 Meeting
                          </a>
                          <a
                            href="#"
                            className="text-sky-600 pt-1text-sm font-semibold hover:underline"
                          >
                            Week 2 Workshop
                          </a>
                          <a
                            href="#"
                            className="text-sky-600 pt-1text-sm font-semibold hover:underline"
                          >
                            Week 3 Q&A
                          </a>
                          <a
                            href="#"
                            className="text-sky-600 pt-1text-sm font-semibold hover:underline"
                          >
                            Week 4 Review
                          </a>
                          <a
                            href="#"
                            className="text-sky-600 pt-1text-sm font-semibold hover:underline"
                          >
                            Final Session
                          </a>
                        </div>
                      </div>
                    }
                  />

                  {/* Duration Range Check */}
                  <ChecklistItem
                    id="duration"
                    icon={
                      <ClockIcon1
                        fill="white"
                        className="w-6 h-6 text-primary"
                      />
                    }
                    title="Course Duration (FREE: Min 15min)"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("duration")}
                    onToggle={() => toggleItem("duration")}
                    // onFix={() => completeItem("courseRequirements", "duration")}
                    fixButtonText="Adjust Duration"
                    description={
                      <div>
                        Course duration does not meet the minimum requirement
                        for FREE courses (15 minutes minimum). Current duration:{" "}
                        <span className="bg-red-100 text-red-500 px-1 py-0.5 rounded font-semibold">
                          8 minutes
                        </span>
                      </div>
                    }
                  />

                  {/* Category Check */}
                  <ChecklistItem
                    id="category"
                    icon={
                      // <ListSvg className="w-6 h-6 text-primary fill-teal-500" />
                      <CategoryIcon className="h-6 w-6 text-primary fill-teal-500" />
                    }
                    title="Category Selection"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("category")}
                    onToggle={() => toggleItem("category")}
                    // onFix={() => completeItem("courseRequirements", "category")}
                    fixButtonText="Select Category"
                    description="Course category is required. Please select an appropriate category for your course."
                  />

                  {/* Featured Image Check */}
                  <ChecklistItem
                    id="image"
                    icon={
                      <ImageIconSvg
                        className="w-6 h-6 text-primary"
                        fill="white"
                      />
                    }
                    title="Featured Image (500x200 minimum)"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("image")}
                    onToggle={() => toggleItem("image")}
                    // onFix={() => completeItem("courseRequirements", "image")}
                    fixButtonText="Upload Image"
                    description="Current featured image (300x150) does not meet minimum size requirements. Please upload an image that is at least 500x200 pixels."
                  />

                  {/* Promo Video */}
                  <ChecklistItem
                    id="promo"
                    icon={
                      <VideoIconSvg
                        className="w-6 h-6 text-primary"
                        fill="white"
                      />
                    }
                    title="Promotional Video"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("promo")}
                    onToggle={() => toggleItem("promo")}
                    // onFix={() => completeItem("courseRequirements", "promo")}
                    fixButtonText="Add Promo Video"
                    description="Course promotional video is missing. Adding a promotional video can increase course engagement and enrollment rates."
                  />

                  {/* Bullet Points */}
                  <ChecklistItem
                    id="bullets"
                    icon={
                      <ListSvg className="w-6 h-6 text-primary fill-teal-500" />
                    }
                    title="Course Bullet Points (4+ Required)"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("bullets")}
                    onToggle={() => toggleItem("bullets")}
                    // onFix={() => completeItem("courseRequirements", "bullets")}
                    fixButtonText="Add Bullet Points"
                    description={
                      <div>
                        Course requires at least{" "}
                        <span className="font-semibold text-gray-800">4</span>{" "}
                        bullet points describing key learning outcomes. Current
                        count:{" "}
                        <span className="font-normal text-gray-500">2</span>
                        <div className="mt-3 flex gap-2 flex-wrap">
                          Current bullet points:
                          <a
                            href="#"
                            className="text-sky-600 text-sm font-semibold hover:underline"
                          >
                            Learn programming fundamentals
                          </a>
                          <a
                            href="#"
                            className="text-sky-600 text-sm font-semibold hover:underline"
                          >
                            Build real-world applications
                          </a>
                        </div>
                      </div>
                    }
                  />

                  {/* Course Requirements */}
                  <ChecklistItem
                    id="requirements"
                    icon={
                      <Course3Icon
                        className="w-6 h-6 text-primary"
                        fill="white"
                      />
                    }
                    title="Course Requirements (1+ Required)"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("requirements")}
                    onToggle={() => toggleItem("requirements")}
                    // onFix={() =>
                    //   completeItem("courseRequirements", "requirements")
                    // }
                    fixButtonText="Add Requirements"
                    description={
                      <div>
                        Please specify at least{" "}
                        <span className="font-semibold text-gray-800">1</span>{" "}
                        prerequisite or requirement for taking this course.
                        Current count:{" "}
                        <span className="font-normal text-gray-500">0</span>
                      </div>
                    }
                  />

                  {/* Intended Learners */}
                  <ChecklistItem
                    id="learners"
                    icon={<Learners className="w-6 h-6 text-primary" />}
                    title="Intended Learners (1+ Required)"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("learners")}
                    onToggle={() => toggleItem("learners")}
                    // onFix={() => completeItem("courseRequirements", "learners")}
                    fixButtonText="Add Target Audience"
                    description={
                      <div>
                        Specify at least{" "}
                        <span className="font-semibold text-gray-800">1</span>{" "}
                        target audience or intended learner type for your
                        course. Current count:{" "}
                        <span className="font-normal text-gray-500">0</span>
                      </div>
                    }
                  />

                  {/* CPE Info */}
                  <ChecklistItem
                    id="cpe"
                    icon={
                      <CpeIcon className="w-6 h-6 text-primary" fill="WHITE" />
                    }
                    title="CPE Information"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("cpe")}
                    onToggle={() => toggleItem("cpe")}
                    // onFix={() => completeItem("courseRequirements", "cpe")}
                    fixButtonText="Add CPE Details"
                    description="CPE information is required for this course. Please provide necessary continuing professional education details."
                  />

                  {/* Section Count */}
                  <ChecklistItem
                    id="sections"
                    icon={
                      <ListIcon className="w-6 h-6 text-primary fill-teal-500" />
                    }
                    title="Section Count (Min: 2, Max: 12)"
                    isCompleted={true}
                    isExpanded={expandedItems.includes("sections")}
                    onToggle={() => toggleItem("sections")}
                    description={
                      <div>
                        Course sections are within the allowed range. Current:{" "}
                        <span className="bg-green-100 text-green-600 px-1 py-0.5 rounded font-semibold">
                          8 sections
                        </span>{" "}
                        (Min: 2, Max: 12)
                      </div>
                    }
                  />

                  {/* Title Regex */}
                  <ChecklistItem
                    id="title"
                    icon={
                      <EmailIconSvg
                        className="w-6 h-6 text-primary "
                        fill="white"
                      />
                    }
                    title="Title Format Check"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("title")}
                    onToggle={() => toggleItem("title")}
                    // onFix={() => completeItem("courseRequirements", "title")}
                    fixButtonText="Fix Title Format"
                    description={
                      <div>
                        Course title contains invalid characters. The following
                        part needs to be fixed:
                        <div className="bg-red-100 text-red-500 px-1 py-0.5 rounded font-semibold my-2">
                          Learn Python [2024]!
                        </div>
                        Title must only contain letters, numbers, spaces, and
                        basic punctuation (.,-)
                      </div>
                    }
                  />

                  {/* Blacklisted Keywords */}
                  <ChecklistItem
                    id="keywords"
                    icon={
                      <BlackTrainingIcon
                        className="w-6 h-6 text-primary"
                        fill="white"
                      />
                    }
                    title="Blacklisted Keywords Check"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("keywords")}
                    onToggle={() => toggleItem("keywords")}
                    // onFix={() => completeItem("courseRequirements", "keywords")}
                    fixButtonText="Review Content"
                    description={
                      <div>
                        Course title or description contains blacklisted
                        keywords:
                        <div className="bg-red-100 text-red-500 px-1 py-0.5 rounded font-semibold my-2">
                          masterclass, best course, guaranteed
                        </div>
                        <div className="mt-3 flex gap-2 flex-wrap">
                          Affected units:
                          <a
                            href="#"
                            className="text-blue-500 text-xs font-semibold hover:underline"
                          >
                            Section 2: Python Masterclass
                          </a>
                          <a
                            href="#"
                            className="text-blue-500 text-xs font-semibold hover:underline"
                          >
                            Section 4: Best Course Guarantee
                          </a>
                        </div>
                      </div>
                    }
                  />

                  {/* Community Link */}
                  <ChecklistItem
                    id="community"
                    icon={
                      <ChatIcon className="w-6 h-6 text-primary" fill="WHITE" />
                    }
                    title="Community Link"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("community")}
                    onToggle={() => toggleItem("community")}
                    // onFix={() =>
                    //   completeItem("courseRequirements", "community")
                    // }
                    fixButtonText="Add Community Link"
                    description="Community link is required for this course type. Please add a link to your course community."
                  />

                  {/* Certificate Setup */}
                  <ChecklistItem
                    id="certificate"
                    icon={
                      <CertificateIcon
                        className="w-6 h-6 text-primary"
                        fill="white"
                      />
                    }
                    title="Certificate Configuration"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("certificate")}
                    onToggle={() => toggleItem("certificate")}
                    // onFix={() =>
                    //   completeItem("courseRequirements", "certificate")
                    // }
                    fixButtonText="Setup Certificate"
                    description="Course certificate needs to be configured. Please set up completion certificate requirements and design."
                  />

                  {/* Skill Assessment */}
                  <ChecklistItem
                    id="certificate"
                    icon={
                      <SkillIcon
                        className="w-6 h-6 text-primary"
                        fill="white"
                      />
                    }
                    title="Skill Assessments (1+ Required)"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("certificate")}
                    onToggle={() => toggleItem("certificate")}
                    // onFix={() =>
                    //   completeItem("courseRequirements", "certificate")
                    // }
                    fixButtonText="Add Assessment"
                    description="Course requires at least 1 skill assessment. Current count: 0"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Profile Requirements Section */}
          <div className="m-4">
            <div className="border border-gray-200 rounded-lg ">
              <div
                className="p-4 md:px-6 bg-gray-50 rounded-t-lg flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("profile")}
              >
                <div className="flex items-center gap-4">
                  <div className="text-base font-semibold text-gray-800">
                    Profile Requirements
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 bg-red-50 text-red-500 min-w-[95px] whitespace-nowrap">
                    <XSvg className="w-4 h-4" />
                    {progress.profileRequirements.total -
                      progress.profileRequirements.completed}{" "}
                    issues
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <ProgressCircle
                    percent={Math.round(
                      (progress.profileRequirements.completed /
                        progress.profileRequirements.total) *
                        100
                    )}
                  />
                  <ChevronDownSvg
                    fill="white"
                    className={`transition-transform duration-200 w-5 h-5 ${
                      expandedSections.includes("profile") ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {expandedSections.includes("profile") && (
                <div className="p-4">
                  {/* PayPal Connection */}
                  <ChecklistItem
                    id="paypal"
                    icon={
                      <PaypalIcon
                        className="w-6 h-6 text-primary"
                        fill="white"
                      />
                    }
                    title="PayPal Connection"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("paypal")}
                    onToggle={() => toggleItem("paypal")}
                    // onFix={() => completeItem("profileRequirements", "paypal")}
                    fixButtonText="Connect PayPal"
                    description="PayPal account connection is required to receive payments. Please connect your PayPal account."
                  />

                  {/* First and Last Name */}
                  <ChecklistItem
                    id="name"
                    icon={
                      <UserSvg className="w-6 h-6 text-primary" fill="white" />
                    }
                    title="First and Last Name"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("name")}
                    onToggle={() => toggleItem("name")}
                    // onFix={() => completeItem("profileRequirements", "name")}
                    fixButtonText="Complete Profile"
                    description="Please provide your full name (first and last name) in your profile."
                  />

                  {/* Avatar */}
                  <ChecklistItem
                    id="avatar"
                    icon={
                      <UserCircleSvg
                        className="w-6 h-6 text-primary"
                        fill="white"
                      />
                    }
                    title="Profile Avatar"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("avatar")}
                    onToggle={() => toggleItem("avatar")}
                    // onFix={() => completeItem("profileRequirements", "avatar")}
                    fixButtonText="Upload Avatar"
                    description="A profile avatar is required. Please upload a profile picture."
                  />

                  {/* Bio */}
                  <ChecklistItem
                    id="bio"
                    icon={
                      <BioIcon className="w-6 h-6 text-primary" fill="white" />
                    }
                    title="Profile Bio (200+ characters)"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("bio")}
                    onToggle={() => toggleItem("bio")}
                    onFix={() => completeItem("profileRequirements", "bio")}
                    fixButtonText="Add Bio"
                    description={
                      <div>
                        Profile bio must be at least{" "}
                        <span className="font-semibold text-gray-800">200</span>{" "}
                        characters. Current length:{" "}
                        <span className="font-normal text-gray-500">85</span>{" "}
                        characters (115 more needed).
                      </div>
                    }
                  />

                  {/* CPE Credentials */}
                  <ChecklistItem
                    id="credentials"
                    icon={
                      <CertificateIcon
                        className="w-6 h-6 text-primary"
                        fill="white"
                      />
                    }
                    title="CPE Credentials"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("credentials")}
                    onToggle={() => toggleItem("credentials")}
                    onFix={() =>
                      completeItem("profileRequirements", "credentials")
                    }
                    fixButtonText="Add Credentials"
                    description="CPE credentials are required since CPE is enabled for this course. Please add your professional credentials."
                  />

                  {/* Plan Purchase */}
                  <ChecklistItem
                    id="plan"
                    icon={
                      <PlanPurchaseIcon
                        className="w-6 h-6 text-primary"
                        fill="white"
                      />
                    }
                    title="Plan Purchase Required"
                    isCompleted={false}
                    isExpanded={expandedItems.includes("plan")}
                    onToggle={() => toggleItem("plan")}
                    onFix={() => completeItem("profileRequirements", "plan")}
                    fixButtonText="View Plans"
                    description={
                      <div>
                        A paid plan is required to publish this type of course.
                        Please{" "}
                        <a
                          href="#pricing"
                          className="text-blue-500 hover:underline font-semibold"
                        >
                          visit our pricing page
                        </a>{" "}
                        to select a plan.
                      </div>
                    }
                  />
                </div>
              )}
            </div>
          </div>

        
        </div>
      </div>
    </div>
  );
}

// Checklist Item Component
interface ChecklistItemProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  isCompleted: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onFix?: () => Promise<void>;
  fixButtonText?: string;
  description: React.ReactNode;
}

function ChecklistItem({
  id,
  icon,
  title,
  isCompleted,
  isExpanded,
  onToggle,
  onFix,
  fixButtonText,
  description,
}: ChecklistItemProps) {
  const [isFixing, setIsFixing] = useState(false);

  const handleFix = async () => {
    if (!onFix) return;

    setIsFixing(true);
    try {
      await onFix();
    } catch (error) {
      console.error("Error fixing item:", error);
    } finally {
      setIsFixing(false);
    }
  };

  return (
    <div id={id} className="border border-gray-200 rounded-lg mb-4 last:mb-0 ">
      <div className="p-4 grid  xs:grid-cols-[48px_1fr_auto_24px]  gap-4 items-center bg-white rounded-5xl">
        <div className=" hidden xs:flex items-center justify-center">
          {icon}
        </div>
        <div className="hidden xs:block text-sm font-semibold text-gray-800">
          {title}
        </div>
        <div className="flex xs:hidden gap-3">
          <div className="flex items-center justify-center">{icon}</div>
          <div className="text-sm font-semibold text-gray-800">{title}</div>
        </div>
        {isCompleted ? (
          <div className="item-status flex items-center gap-2 text-sm font-semibold text-green-600">
            <CheckCircleSvg className="h-4 w-4" fill="white" />
            Completed
          </div>
        ) : (
          <button
            className="fix-button px-4 py-2 rounded-md text-xs font-semibold  bg-gray-100 border border-gray-200 text-gray-800 hover:bg-gray-200 transition-colors"
            onClick={handleFix}
            disabled={isFixing}
          >
            {isFixing ? "Processing..." : fixButtonText}
          </button>
        )}
        <div
          className="cursor-pointer flex items-center justify-center"
          onClick={onToggle}
        >
          <ChevronDownSvg
            fill="white"
            className={`hidden xs:inline transition-transform duration-200 h-5 w-5 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>
      {isExpanded && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="p-3 bg-white border border-gray-200 rounded-md text-sm leading-relaxed text-gray-700">
            {description}
          </div>
        </div>
      )}
    </div>
  );
}
