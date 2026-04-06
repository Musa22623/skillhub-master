import React, { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import {
  Bold,
  Italic,
  X,
  Underline,
  Search,
  Check,
  Undo,
  Redo,
} from "lucide-react";
import img2 from "@/assets/img2.jpg";
import img3 from "@/assets/img3.png";
import img1 from "@/assets/img-3.webp";
import img5 from "@/assets/img5.jpg";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import { Switch } from "@/app/components/ui/switch";
import { Checkbox } from "@/app/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { ShieldStarIcon, ChatIcon, SchoolSvg, OrderedListSvg, UnorderedListSvg } from "@/app/components/svg";

interface School {
  id: string;
  name: string;
  imageUrl: StaticImageData | string;
}

// Mock data for schools
const mockSchools: School[] = [
  {
    id: "1",
    name: "Prompts School",
    imageUrl: img5,
  },
  {
    id: "2",
    name: "Writing School",
    imageUrl: img1,
  },
  {
    id: "3",
    name: "Art School",
    imageUrl: img3,
  },
  {
    id: "4",
    name: "My UX School",
    imageUrl: img2,
  },
];

interface Community {
  id: string;
  name: string;
  image: StaticImageData | string;
}

// Dummy data for communities
const communities: Community[] = [
  {
    id: "1",
    name: "Design Community",
    image: img5,
  },
  {
    id: "2",
    name: "Development Hub",
    image: img5,
  },
  {
    id: "3",
    name: "Marketing Masters",
    image: img5,
  },
  {
    id: "4",
    name: "Product Management",
    image: img5,
  },
  {
    id: "5",
    name: "UX Research Group",
    image: img5,
  },
  {
    id: "6",
    name: "Data Science Network",
    image: img5,
  },
];

function SettingComponent() {
  const [title, setTitle] = useState("");
  const [communityEnabled, setCommunityEnabled] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredCommunities, setFilteredCommunities] =
    useState<Community[]>(communities);
  const [features, setFeatures] = useState({
    all: true,
    announcements: true,
    news: true,
    weeklyReview: true,
    askQuestions: true,
    chat: true,
  });

  const [isSchoolEnabled, setIsSchoolEnabled] = useState(true);

  // State for linked school
  const [linkedSchool, setLinkedSchool] = useState<School | null>(null);

  // State for showing school selection
  const [showSchoolSelection, setShowSchoolSelection] = useState(false);

  // State for filter text
  const [filterText, setFilterText] = useState("");

  const [provideCertificates, setProvideCertificates] = useState(false);

  // Individual certificate toggles
  const [standardCertEnabled, setStandardCertEnabled] = useState(false);
  const [premiumCertEnabled, setPremiumCertEnabled] = useState(false);

  // Select values
  const [standardCertOption, setStandardCertOption] = useState("include");
  const [premiumCertOption, setPremiumCertOption] = useState("sell");

  // Filtered schools based on search text
  const filteredSchools = mockSchools.filter((school) =>
    school.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Handle toggle change
  const handleToggleChange = (checked: boolean) => {
    setIsSchoolEnabled(checked);
    if (!checked) {
      setLinkedSchool(null);
      setShowSchoolSelection(false);
    }
  };

  // Handle link school button click
  const handleLinkSchoolClick = () => {
    setShowSchoolSelection(true);
  };

  // Handle school selection
  const handleSchoolSelect = (school: School) => {
    setLinkedSchool(school);
    setShowSchoolSelection(false);
  };

  // Handle remove linked school
  const handleRemoveLinkedSchool = () => {
    setLinkedSchool(null);
  };

  // Handle toggle change
  const handleToggle = (checked: boolean) => {
    setCommunityEnabled(checked);
    if (!checked) {
      setSelectedCommunity(null);
    } else if (!selectedCommunity && !isSearching) {
      setIsSearching(true);
    }
  };

  // Handle community selection
  const handleSelectCommunity = (community: Community) => {
    setSelectedCommunity(community);
    setIsSearching(false);
  };

  // Handle clearing selection
  const handleClearSelection = () => {
    setSelectedCommunity(null);
    setIsSearching(true);
  };

  // Filter communities based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = communities.filter((community) =>
        community.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCommunities(filtered);
    } else {
      setFilteredCommunities(communities);
    }
  }, [searchQuery]);

  // Handle "All" checkbox change
  const handleAllChange = (checked: boolean) => {
    setFeatures({
      all: checked,
      announcements: checked,
      news: checked,
      weeklyReview: checked,
      askQuestions: checked,
      chat: checked,
    });
  };

  // Handle individual feature checkbox change
  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFeatures((prev) => {
      const newFeatures = { ...prev, [feature]: checked };

      // Check if all individual features are checked
      const allChecked =
        newFeatures.announcements &&
        newFeatures.news &&
        newFeatures.weeklyReview &&
        newFeatures.askQuestions &&
        newFeatures.chat;

      return { ...newFeatures, all: allChecked };
    });
  };

  const editorRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeFormats, setActiveFormats] = useState<string[]>([]);



  const updateActiveFormats = () => {
    const selection = window.getSelection();
    const formats: string[] = [];

    if (selection && selection.anchorNode) {
      const el = selection.anchorNode.parentElement;

      if (!el) return;

      if (el.closest("b, strong")) formats.push("bold");
      if (el.closest("i, em")) formats.push("italic");
      if (el.closest("ul")) formats.push("unorderedList");
      if (el.closest("ol")) formats.push("orderedList");
      if (getComputedStyle(el).textAlign === "left") formats.push("alignLeft");
    }

    setActiveFormats(formats);
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      if (document.activeElement === editorRef.current) {
        updateActiveFormats();
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);
      const execCommand = (command: string) => {
    // Make sure the editor has focus first
    if (editorRef.current) {
      editorRef.current.focus();

      // Small delay to ensure focus is properly set
      setTimeout(() => {
        document.execCommand(command, false);
      }, 10);
    }
  };
  

  return (
    <div className="overflow-y-auto flex-1">
      <div className="max-w-6xl mx-auto ">
        {/* Main Content */}
        <div className="py-4 mb-5">
          <div className="space-y-4">
            {/* Event Details */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="px-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  Details
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Give Your Product a title and add a description
                </p>
              </div>

              <div className=" bg-white px-4">
                <h3 className="text-sm font-semibold mb-1">Title</h3>

                <div className="">
                  <div className="">
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={100}
                      placeholder="Intro to UX Design"
                      className="w-full px-2 py-4 text-sm"
                    />
                  </div>
                  <span className=" text-gray-500 text-xs pl-2 mb-3">
                    {title.length}/100 charaters
                  </span>

                     <div className="space-y-6">
                            <label className="text-sm font-semibold block mb-1 mt-3">
                              Description
                            </label>

                            <div className="border border-gray-200 rounded-md overflow-hidden">
                              <div className="flex gap-1 overflow-x-auto bg-gray-50 p-2 scrollbar-hide">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted"
                                  onClick={() => execCommand("undo")}
                                  title="Undo"
                                >
                                  <Undo className="h-5 w-5" />
                                </Button>

                                {/* Redo Button */}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted"
                                  onClick={() => execCommand("redo")}
                                  title="Redo"
                                >
                                  <Redo className="h-5 w-5" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted"
                                  onClick={() => execCommand("bold")}
                                >
                                  <Bold className="h-5 w-5" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted"
                                  onClick={() => execCommand("italic")}
                                >
                                  <Italic className="h-5 w-5" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted"
                                  onClick={() => execCommand("underline")}
                                >
                                  <Underline className="h-5 w-5" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted"
                                  onClick={() =>
                                    execCommand("insertOrderedList")
                                  }
                                >
                                  <OrderedListSvg />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted"
                                  onClick={() =>
                                    execCommand("insertUnorderedList")
                                  }
                                >
                                  <UnorderedListSvg />
                                </Button>
                              </div>
                              <div
                                ref={editorRef}
                                contentEditable
                                className="min-h-[120px] max-h-[240px] custom-list overflow-y-auto p-3 text-[15px] leading-relaxed outline-none"
                              />
                            </div>
                          </div>
                </div>
              </div>
            </div>

            <div className="flex-grow border-t border-gray-200"></div>
            {/* Access Settings */}
            <div className="flex flex-col md:flex-row px-4 gap-6">
              <div className="md:w-1/3">
                <h2 className="text-lg  font-semibold text-gray-800">
                  Community
                </h2>
                <p className="text-sm text-gray-500">
                  Like your coures to a community to create a more engaging
                  student experience.This will add an existing community your
                  course students's experience{" "}
                  <span className="ml-1 underline">Learn More</span>
                </p>
              </div>
              {/* Community */}

              <div className=" bg-white p-3 rounded-lg border">
                <div className="">
                  {/* Toggle Switch */}
                  <div className="flex items-center justify-between rounded">
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={communityEnabled}
                        onCheckedChange={handleToggle}
                        className={cn(
                          "data-[state=checked]:bg-black",
                          "data-[state=unchecked]:bg-gray-300",
                          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
                        )}
                      >
                        <span
                          className={cn(
                            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
                            communityEnabled ? "translate-x-5" : "translate-x-0"
                          )}
                        />
                      </Switch>
                      <span className="text-sm font-semibold">
                        Enable community for this course
                      </span>
                    </div>
                  </div>

                  {communityEnabled && (
                    <div className="mt-4">
                      {isSearching ? (
                        // Search Interface
                        <div className="mt-2">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <Search className="h-4 w-4 text-gray-500" />
                            </div>
                            <input
                              type="text"
                              className="block w-full pl-10 pr-3 py-2 bg-gray-100 text-sm rounded-md focus:outline-none"
                              placeholder="Search communities..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              autoFocus
                            />
                          </div>

                          <div className="mt-2 border border-gray-200 rounded-md overflow-hidden">
                            {filteredCommunities.map((community) => (
                              <div
                                key={community.id}
                                className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-200 last:border-b-0"
                                onClick={() => handleSelectCommunity(community)}
                              >
                                <div className="flex-shrink-0 mr-3">
                                  <div className="w-10 h-10 rounded overflow-hidden">
                                    <Image
                                      src={
                                        community.image || "/placeholder.svg"
                                      }
                                      height={40}
                                      width={40}
                                      alt={community.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="inline-block text-xs text-[#db7303] font-semibold bg-[#fff3c6] rounded-md px-2 py-0.5">
                                    Community
                                  </div>
                                  <div className="font-semibold">
                                    {community.name}
                                  </div>
                                </div>
                                <div className="ml-2">
                                  <Check className="h-5 w-5 text-green-500 opacity-0" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        // Selected Community Features
                        selectedCommunity && (
                          <div className="border border-gray-200 rounded-md overflow-hidden">
                            <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 mr-3">
                                  <div className="w-10 h-10 rounded overflow-hidden">
                                    <Image
                                      src={
                                        selectedCommunity.image ||
                                        "/placeholder.svg"
                                      }
                                      alt={selectedCommunity.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="inline-flex items-center text-xs text-[#db7303] font-semibold bg-[#fff3c6] rounded-md px-2 py-0.5">
                                    <ChatIcon className="w-3 h-3 mr-1" />{" "}
                                    {/* Add the icon */}
                                    Community
                                  </div>
                                  <div className="font-semibold">
                                    {selectedCommunity.name}
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={handleClearSelection}
                                className="text-gray-400 hover:text-gray-500"
                              >
                                <X className="h-3 w-4 text-black" />
                              </button>
                            </div>

                            <div className="p-3">
                              <div className="flex flex-wrap gap-2">
                                <div className="text-xs">
                                  <label className="flex items-center  space-x-2 cursor-pointer bg-gray-900 text-white px-4 py-2 rounded-full font-semibold">
                                    <Checkbox
                                      checked={features.all}
                                      onCheckedChange={(checked) =>
                                        handleAllChange(checked as boolean)
                                      }
                                    />
                                    <span>All</span>
                                  </label>
                                </div>

                                {/* Feature filters */}
                                <div>
                                  <label className="flex items-center space-x-2 cursor-pointer border px-4 py-2 rounded-full">
                                    <Checkbox
                                      checked={features.announcements}
                                      onCheckedChange={(checked) =>
                                        handleFeatureChange(
                                          "announcements",
                                          checked as boolean
                                        )
                                      }
                                    />
                                    <span>📢 Announcements</span>
                                  </label>
                                </div>

                                <div>
                                  <label className="flex items-center space-x-2 cursor-pointer border px-4 py-2 rounded-full">
                                    <Checkbox
                                      checked={features.news}
                                      onCheckedChange={(checked) =>
                                        handleFeatureChange(
                                          "news",
                                          checked as boolean
                                        )
                                      }
                                    />
                                    <span>📰 News</span>
                                  </label>
                                </div>

                                <div>
                                  <label className="flex items-center space-x-2 cursor-pointer border px-4 py-2 rounded-full">
                                    <Checkbox
                                      checked={features.weeklyReview}
                                      onCheckedChange={(checked) =>
                                        handleFeatureChange(
                                          "weeklyReview",
                                          checked as boolean
                                        )
                                      }
                                    />
                                    <span>⭐ Weekly Review</span>
                                  </label>
                                </div>

                                <div>
                                  <label className="flex items-center space-x-2 cursor-pointer border px-4 py-2 rounded-full">
                                    <Checkbox
                                      checked={features.askQuestions}
                                      onCheckedChange={(checked) =>
                                        handleFeatureChange(
                                          "askQuestions",
                                          checked as boolean
                                        )
                                      }
                                    />
                                    <span>❓ Ask Questions</span>
                                  </label>
                                </div>

                                <div>
                                  <label className="flex items-center space-x-2 cursor-pointer border px-4 py-2 rounded-full">
                                    <Checkbox
                                      checked={features.chat}
                                      onCheckedChange={(checked) =>
                                        handleFeatureChange(
                                          "chat",
                                          checked as boolean
                                        )
                                      }
                                    />
                                    <span>💬 Chat</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-grow border-t border-gray-200"></div>

            {/* Certificate Section */}

            <div className="flex flex-col md:flex-row gap-6 px-4">
              <div className="md:w-1/3">
                <h2 className="text-lg font-semibold text-gray-800">
                  Certificates
                </h2>
                <p className="text-sm text-gray-500 mt-1 mb-1">
                  Celebrate your costomers by offering them a certificates upon
                  coures completion
                </p>
                <p className="text-sm text-gray-500">
                  The certificate will be emailed upon course completion.{" "}
                  <span className="text-semibold ">Learn More</span>
                </p>
              </div>

              <div className="md:w-2/3 bg-white p-2 rounded-lg border">
                {/* Main toggle */}
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={provideCertificates}
                    onCheckedChange={setProvideCertificates}
                    className={cn(
                      "data-[state=checked]:bg-black",
                      "data-[state=unchecked]:bg-gray-300",
                      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
                    )}
                  />
                  <span className="text-base font-semibold">
                    Provide certificates for this course
                  </span>
                </div>

                {/* Certificate options - only visible when main toggle is enabled */}
                {provideCertificates && (
                  <div className="space-y-6">
                    {" "}
                    {/* Increased space between certificate options */}
                    {/* Standard Certificate */}
                    <div className="space-y-3 mt-4 bg-gray-50 p-2 rounded-md border border-gray-200">
                      <div className="flex items-center p-4 -my-2">
                        {" "}
                        {/* Adjusted padding */}
                        <div className="text-gray-400 mr-2">
                          <ShieldStarIcon />
                        </div>
                        <Switch
                          checked={standardCertEnabled}
                          onCheckedChange={setStandardCertEnabled}
                          className={cn(
                            "data-[state=checked]:bg-black",
                            "data-[state=unchecked]:bg-gray-300",
                            "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
                          )}
                        >
                          <span
                            className={cn(
                              "block h-5 w-5 rounded-full bg-white shadow transition-transform",
                              standardCertEnabled
                                ? "translate-x-5"
                                : "translate-x-0"
                            )}
                          />
                        </Switch>
                        <span className="text-base font-semibold pl-3">
                          Standard Certificate
                        </span>
                      </div>

                      {/* Horizontal border that appears when standard cert is enabled */}
                      {standardCertEnabled && (
                        <div className="border-t border-gray-300 mt-3 ml-12"></div>
                      )}

                      {standardCertEnabled && (
                        <div className="space-y-4">
                          {" "}
                          {/* Added space-y for internal spacing */}
                          <div className="text-sm text-gray-500 ml-12">
                            Basic course completion certificate. Can be included
                            with free courses.
                          </div>
                          <div className="ml-12">
                            <Select
                              value={standardCertOption}
                              onValueChange={setStandardCertOption}
                            >
                              <SelectTrigger className="w-full bg-white">
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="include">
                                  Include with Course
                                </SelectItem>
                                <SelectItem value="dont-include">
                                  Don't Include
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Premium Certificate */}
                    <div className="space-y-3 bg-gray-50 p-2 rounded-md border border-gray-200">
                      <div className="flex items-center p-4 -my-2">
                        <div className="text-gray-400 mr-2">
                          <ShieldStarIcon className="w-6 h-6" />
                        </div>
                        <Switch
                          checked={premiumCertEnabled}
                          onCheckedChange={setPremiumCertEnabled}
                          className={cn(
                            "data-[state=checked]:bg-black",
                            "data-[state=unchecked]:bg-gray-300",
                            "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
                          )}
                        >
                          <span
                            className={cn(
                              "block h-5 w-5 rounded-full bg-white shadow transition-transform",
                              premiumCertEnabled
                                ? "translate-x-5"
                                : "translate-x-0"
                            )}
                          />
                        </Switch>
                        <span className="text-base font-semibold pl-3">
                          Premium Certificate
                        </span>
                      </div>

                      {/* Horizontal border that appears when premium cert is enabled */}
                      {premiumCertEnabled && (
                        <div className="border-t border-gray-300 mt-3 ml-12"></div>
                      )}

                      {premiumCertEnabled && (
                        <div className="space-y-4">
                          <div className="text-sm text-gray-500 ml-12">
                            Enhanced certificate with additional features.
                            Minimum price: $5
                          </div>
                          <div className="ml-12">
                            <Select
                              value={premiumCertOption}
                              onValueChange={setPremiumCertOption}
                            >
                              <SelectTrigger className="w-full bg-white">
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sell">
                                  Sell Separately
                                </SelectItem>
                                <SelectItem value="dont-include">
                                  Don't Include
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-grow border-t border-gray-200"></div>
            {/* School section */}

            <div className="flex flex-col md:flex-row gap-6 px-4">
              <div className="md:w-1/3">
                <h2 className="text-lg font-semibold text-gray-800">
                  School Setting
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Set the school to provide students with a unified learning
                  experienc. This allows to them to access all courses, events,
                  sessions,and certificates from your school in a single
                  deshboard.
                  <span className="font-bold ml-2">Learn More</span>
                </p>
              </div>

              <div className="md:w-2/3 bg-white  rounded-lg border">
                <div className="">
                  {/* Enable School Toggle */}
                  <div className="flex items-center justify-between p-4 rounded">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={isSchoolEnabled}
                        onCheckedChange={handleToggleChange}
                        className={cn(
                          "data-[state=checked]:bg-black",
                          "data-[state=unchecked]:bg-gray-300",
                          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
                        )}
                      >
                        <span
                          className={cn(
                            "block h-5 w-5 rounded-full bg-white shadow transition-transform",
                            isSchoolEnabled ? "translate-x-5" : "translate-x-0"
                          )}
                        />
                      </Switch>
                      <div>
                        <div className="text-base font-semibold pl-2">
                          Enable School
                        </div>
                        <div className="text-sm pl-2 text-gray-500">
                          School is enabled by default for each course.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Linked School Section */}
                  {isSchoolEnabled && (
                    <div className="">
                      <div className="px-4">
                        <div className="text-lg font-semibold">
                          Linked School
                        </div>
                        <div className="text-sm text-gray-500">
                          Choose the School you'd like to link to this course.
                        </div>
                      </div>

                      {/* Show linked school if exists */}
                      {linkedSchool ? (
                        <div className="flex m-4 items-center justify-between bg-gray-50 rounded-lg border">
                          <div className="flex items-center gap-2 py-2 pl-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden">
                              <Image
                                src={
                                  linkedSchool.imageUrl || "/placeholder.svg"
                                }
                                alt={linkedSchool.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-sm font-semibold">
                              {linkedSchool.name}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 mr-1"
                            onClick={handleRemoveLinkedSchool}
                          >
                            <X className="h-5 w-5" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center space-y-2 p-4">
                          <div className="w-16 h-16 bg-[#50aeec] rounded-full flex items-center justify-center my-3">
                            <SchoolSvg className="h-8 w-8" fill="white" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-800">
                            Link School to this Course
                          </h3>
                          <p className="text-gray-500">
                            Your linked School will appear once it is added
                          </p>
                          <Button
                            variant="ghost"
                            className="text-black flex items-center  gap-1"
                            onClick={handleLinkSchoolClick}
                          >
                            <span className="text-xl text-[#50aeec]">+</span>{" "}
                            Link School
                          </Button>
                        </div>
                      )}

                      {/* School Selection */}
                      {showSchoolSelection && (
                        <div className="space-y-4 p-4 pt-0">
                          <Input
                            type="text"
                            placeholder="Filter School..."
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            className="block w-full pl-4 pr-3 py-2 text-sm rounded-md focus:outline-none"
                          />

                          <div className="space-y-2 max-h-80 overflow-y-auto">
                            {filteredSchools.map((school) => (
                              <div
                                key={school.id}
                                className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                                onClick={() => handleSchoolSelect(school)}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                                    <Image
                                      src={
                                        school.imageUrl || "/placeholder.svg"
                                      }
                                      alt={school.name}
                                      width={48}
                                      height={48}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <span className="text-base font-semibold">
                                    {school.name}
                                  </span>
                                </div>
                              </div>
                            ))}
                            {filteredSchools.length === 0 && (
                              <div className="text-center py-4 text-gray-500">
                                No schools found matching your filter
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between w-full mx-auto">
          <div className="flex gap-3">
            <div className="flex gap-1 h-fit items-center">
              <h2 className="text-xl font-semibold"></h2>
            </div>
          </div>
          <div className="flex items-center gap-2 mr-2">
            <Button size="sm" className="px-4">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingComponent;
