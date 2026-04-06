/** @format */

"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Bold, Italic, Underline, X, Undo, Redo } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Input } from "@/app/components/ui/input";
import myImage from "@/assets/img5.jpg";
import {
  ChatIcon,
  CircleHelpIcon,
  EyeIcon,
  GradeIcon,
  ThumbIcon,
  ChevronUp,
  ChevronDown,
  CourseIcon,
  VideoSvg,
  OrderedListSvg,
  UnorderedListSvg,
} from "@/app/components/svg";
import Avatar1 from "@/assets/avatar/AVATAR-1.png";
import Avatar2 from "@/assets/avatar/AVATAR-2.jpg";
import Avatar3 from "@/assets/avatar/AVATAR-3.jpg";
import img2 from "@/assets/img2.jpg";
import img3 from "@/assets/img3.png";
import img5 from "@/assets/img5.jpg";
import CheckList from "../Ckecklist";

interface CommunityModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

type Product = {
  id: string;
  title: string;
  price: number;
  type: "Course" | "Event";
  imageUrl: StaticImageData;
};

// Sample product data
const products: Product[] = [
  {
    id: "1",
    title: "Advanced UI/UX Design Masterclass",
    price: 199,
    type: "Course",
    imageUrl: img5,
  },
  {
    id: "2",
    title: "Responsive Web Design Fundamentals",
    price: 149,
    type: "Course",
    imageUrl: img2,
  },
  {
    id: "3",
    title: "Design Systems Workshop 2024",
    price: 299,
    type: "Event",
    imageUrl: img3,
  },
];

const spaces = [
  {
    id: 1,
    name: "Space A",
    icon: "⭐",
    members: 797,
    comments: 199,
    likes: 55,
    avatars: [Avatar1, Avatar2, Avatar3],
  },
  {
    id: 2,
    name: "Space B",
    icon: "❓",
    members: 0,
    comments: 0,
    likes: 0,
    avatars: [],
  },
  {
    id: 3,
    name: "Space C",
    icon: "💬",
    members: 0,
    comments: 0,
    likes: 0,
    avatars: [],
  },
];

export default function CreateCommunity({
  open,
  setOpen,
}: CommunityModalProps) {

    const [eventTitle, setEventTitle] = useState("");
  const [eventUrl, setEventUrl] = useState("");
  
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("details");
  const [avatar, setAvatar] = useState("/img/person.jpeg");
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const handleBannerUpload = () => {
    bannerInputRef.current?.click();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPreview: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const emojiCategories = {
    frequent: ["🕐", "😊", "🐱", "🍔", "🚗", "⚽", "👕", "🎵"],
    smileys: [
      "😀",
      "😃",
      "😄",
      "😁",
      "😆",
      "😅",
      "😂",
      "🤣",
      "😊",
      "😇",
      "🙂",
      "🙃",
      "😉",
      "😌",
      "😍",
      "🥰",
      "😘",
      "😗",
      "😙",
      "😚",
      "😋",
      "😛",
      "😝",
      "😜",
      "🤪",
      "🤨",
      "🧐",
      "🤓",
      "😎",
      "🤩",
    ],
    nature: ["🐱", "🐶", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯"],
    food: ["🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒"],
    activities: ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🎱", "🏓"],
    travel: ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎", "🚓", "🚑", "🚒", "🚐"],
    objects: ["👕", "👚", "👖", "👔", "👗", "👙", "👘", "👠", "👡", "👢"],
    symbols: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "💔", "💕", "💞"],
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        emojiButtonRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setIsEmojiPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
    setIsEmojiPickerOpen(false);
  };

  const handleRemoveEmoji = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEmoji(null);
  };

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

    // Function to generate URL slug from title
    const generateSlug = (title: string) => {
      return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // Remove special characters
        .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
        .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
    };
  
    // Auto-generate URL when title changes
    useEffect(() => {
      if (eventTitle) {
        const slug = generateSlug(eventTitle);
        const baseUrl = "https://skillhub.com/communities/";
        // Add random suffix like in your example
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        setEventUrl(`${baseUrl}${slug}-${randomSuffix}`);
      } else {
        setEventUrl("");
      }
    }, [eventTitle]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        closeButtonClassName="top-0 right-6 shadow-lg -mt-4 z-100 size-8 bg-white rounded-full opacity-100 flex items-center justify-center"
        className="bg-gray-100 mt-5 sm:max-w-[100%] mx-auto p-0 gap-0 h-[100vh] max-h-[100vh] rounded-none flex flex-col px-4 xl:px-0">
        <div className="flex flex-col flex-1 overflow-hidden max-w-6xl w-full m-auto no-scrollbar">
          <div className="flex flex-col py-4">
            {/* Header */}
            <div className="flex items-center justify-between w-full mx-auto  pt-8">
              <div className="flex gap-3">
                <div className="h-18 w-30 overflow-hidden rounded-md">
                  <Image
                    src={myImage}
                    alt="UX Design Hub"
                    width={120}
                    height={72}
                    className="object-center"
                  />
                </div>

                <div className="flex gap-1 h-fit items-center">
                  <h2 className="text-xl font-semibold">UX Design Hub</h2>
                  <CircleHelpIcon className="h-5 w-5 fill-gray-500 hover:fill-black" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-md border px-3 py-1">
                  <EyeIcon className="size-5 text-gray-500 " />
                  <span className="text-sm">Preview</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
                <Button size="sm" className="px-4">
                  Save
                </Button>
              </div>
            </div>
          </div>

          {/* Below section for Tabs */}
          <div className="w-full mx-auto px-33 border-b ">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full -mt-12"
            >
              <TabsList className=" gap-6 bg-gray-100 ">
                <TabsTrigger
                  value="details"
                  className="rounded-none px-0 py-2 bg-gray-100 data-[state=active]:bg-gray-100 data-[state=active]:text-teal-500 data-[state=active]:shadow-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary "
                >
                  Details
                </TabsTrigger>

                <TabsTrigger
                  value="checklist"
                  className="rounded-none px-0 py-2 bg-gray-100 data-[state=active]:bg-gray-100 data-[state=active]:text-teal-500 data-[state=active]:shadow-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  Checklist
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar mb-5">
            {activeTab === "details" ? (
              <div>
                <div className="max-w-6xl w-full mx-auto  mt-10">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Column */}
                    <div className="w-full lg:w-1/2 pr-4 mb-6 lg:mb-0">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          Community Details
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Enter the basic community details such as the title
                          and description. We'll use your title to generate the
                          URL.
                        </p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-full lg:w-4/4 bg-white sm:p-6 sm:rounded-lg sm:border sm:border-gray-200">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">
                          Community Details
                        </h3>

                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <label
                                htmlFor="title"
                                className="text-sm font-semibold mb-2"
                              >
                                Title
                              </label>
                              <span className="text-xs text-muted-foreground">
                                {eventTitle.length}/60
                              </span>
                            </div>
                            <Input
                              placeholder="e.g UX Design Masterclass"
                              className="w-full px-2 py-5"
                              value={eventTitle}
                              maxLength={60}
                              onChange={(e) => setEventTitle(e.target.value)}
                            />
                          </div>

                          {/* URL Input */}
                          <div>
                            <div className="flex justify-between mb-1">
                              <label
                                htmlFor="title"
                                className="text-sm font-semibold mb-2"
                              >
                                Url
                              </label>
                            </div>
                             <Input
                              className="w-full px-2 py-5 bg-gray-50"
                              value={eventUrl}
                              readOnly
                              
                            />
                          </div>

                          {/* Description Input */}
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

                          {/* Avatar */}
                          <div className="sm:border border-gray-300 sm:rounded-lg p-3 flex items-center gap-6 w-full bg-white max-sm:flex-col">
                            {/* Left Section - Label & Avatar */}
                            <div className="flex flex-col items-center max-sm:w-full">
                              <label className="text-gray-700 font-bold max-sm:self-start mb-2">
                                Avatar
                              </label>
                              <div className="w-24 h-24 overflow-hidden rounded-full ">
                                <Image
                                  src={avatar}
                                  alt="User Avatar"
                                  width={100}
                                  height={100}
                                  className="object-cover"
                                />
                              </div>
                            </div>

                            {/* Right Section - Upload Button */}
                            <div className="flex flex-col-reverse sm:flex-col gap-2">
                              <p className="text-gray-600">
                                Recommended dimensions of{" "}
                                <strong>100×100</strong>
                              </p>

                              <label className="flex max-sm:justify-center max-sm:self-center items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full w-fit sm:w-50 cursor-pointer border border-gray-300 text-gray-700 text-xs">
                                <Image
                                  src="/img/blank-page.png"
                                  alt="password icon"
                                  width={24}
                                  height={24}
                                  className="rounded-md"
                                />
                                <span className="font-bold text-md ">
                                  Upload Avatar
                                </span>
                                <input
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                />
                              </label>
                            </div>
                          </div>

                          {/* Cover Image */}

                          <div className="w-full max-w-4xl p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                              {/* Placeholder image area */}
                              <div className="w-full md:w-60 h-30 bg-gray-200 rounded-lg flex items-center justify-center">
                                {bannerPreview ? (
                                  <Image
                                    src={bannerPreview}
                                    alt="Selected image"
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                ) : (
                                  <div className="w-16 h-16 text-gray-400">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="w-full h-full"
                                    >
                                      <rect
                                        x="3"
                                        y="3"
                                        width="18"
                                        height="18"
                                        rx="2"
                                        ry="2"
                                      />
                                      <circle cx="8.5" cy="8.5" r="1.5" />
                                      <polyline points="21 15 16 10 5 21" />
                                    </svg>
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-col items-start gap-6">
                                {/* Recommended dimensions text */}
                                <p className="text-gray-600 text-md font-normal">
                                  Recommended dimensions of{" "}
                                  <strong>1280×720</strong>
                                </p>

                                {/* Choose image button */}
                                <button
                                  type="button"
                                  className="bg-white text-gray-700 border border-gray-300 rounded-full px-4 py-1 h-10 text-base font-normal hover:bg-gray-50 flex items-center"
                                  onClick={handleBannerUpload}
                                >
                                  Choose Image
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="ml-2 h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                  >
                                    <polyline points="6 9 12 15 18 9" />
                                  </svg>
                                </button>

                                {/* Hidden file input */}
                                <input
                                  type="file"
                                  id="bannerInput"
                                  name="banner"
                                  ref={bannerInputRef}
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) =>
                                    handleFileChange(e, setBannerPreview)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Second section */}

                <div className="max-w-6xl w-full mx-auto ">
                  <div className="flex flex-col md:flex-row gap-6 py-6">
                    {/* Left Column */}
                    <div className="w-full lg:w-1/2 pr-4 mb-6 lg:mb-0">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Spaces</h3>
                        <p className="text-sm text-muted-foreground">
                          Manage space details and view Access Options.
                        </p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-full lg:w-4/4 bg-white sm:p-6 sm:rounded-lg sm:border sm:border-gray-200">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Spaces</h3>

                        <div className="space-y-3">
                          {spaces.map((space, index) => (
                            <div
                              key={space.id}
                              className={`
                                bg-gray-50 
                                shadow-sm 
                                border 
                                border-gray-200 
                                px-4 py-8 
                                flex items-center 
                                justify-between 
                                mb-5
                                rounded-t-xl
                                ${
                                  space.id === 3
                                    ? " border-b-gray-400 border-b-[1px]"
                                    : "rounded-b-xl"
                                }
                              `}
                            >
                              {/* Left side */}
                              <div className="flex items-center gap-3 bg-white px-4 py-1 rounded-full border border-gray-300">
                                <span className="text-lg">{space.icon}</span>
                                <span className="text-sm font-semibold text-gray-800">
                                  {space.name}
                                </span>
                              </div>

                              {/* Right side */}
                              <div className="flex items-center gap-4">
                                {space.members > 0 && (
                                  <>
                                    <div className="flex items-center text-sm text-gray-500 gap-2">
                                      <GradeIcon
                                        className="size-5"
                                        fill="#808080"
                                      />

                                      {space.members}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 gap-2">
                                      <ChatIcon className="size-4" />
                                      {space.comments}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 gap-2">
                                      <ThumbIcon
                                        className="size-4"
                                        fill="#808080"
                                      />
                                      {space.likes}
                                    </div>

                                    {/* Avatar Group */}
                                    <div className="flex -space-x-2">
                                      {space.avatars.map((avatar, i) => (
                                        <Image
                                          key={i}
                                          src={avatar}
                                          alt="avatar"
                                          width={24}
                                          height={24}
                                          className="rounded-sm border border-white"
                                        />
                                      ))}
                                    </div>
                                  </>
                                )}

                                {/* Chevron Icon */}
                                <button
                                  onClick={() =>
                                    setOpenIndex(
                                      openIndex === index ? null : index
                                    )
                                  }
                                >
                                  {openIndex === index ? (
                                    <ChevronUp
                                      fill="#333333"
                                      className="w-5 h-5"
                                    />
                                  ) : (
                                    <ChevronDown
                                      fill="#000000"
                                      className="size-4"
                                    />
                                  )}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* emoji */}

                        <div className="mb-4">
                          <label
                            className="block font-semibold text-gray-700 mb-2 text-sm"
                            htmlFor="schoolName"
                          >
                            Name
                          </label>
                          <div className="flex items-start gap-3">
                            <input
                              type="text"
                              id="schoolName"
                              name="schoolName"
                              placeholder="School Name"
                              className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-teal-500"
                              required
                            />
                            <div className="relative">
                              <div className="absolute -top-5 right-2 text-xs font-semibold text-gray-700">
                                Emoji
                              </div>
                              <button
                                type="button"
                                ref={emojiButtonRef}
                                className="h-[42px] min-w-[42px] flex items-center justify-center bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100"
                                onClick={() =>
                                  setIsEmojiPickerOpen(!isEmojiPickerOpen)
                                }
                              >
                                {selectedEmoji ? (
                                  <span className="text-xl relative">
                                    {selectedEmoji}
                                    <span
                                      className="absolute -top-1.5 -right-1.5 bg-white border border-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs cursor-pointer"
                                      onClick={handleRemoveEmoji}
                                    >
                                      <X className="w-2 h-2 text-gray-500" />
                                    </span>
                                  </span>
                                ) : (
                                  <div className="size-5 border-2 border-gray-800 flex items-center justify-center rounded-full ">
                                    <svg
                                      viewBox="0 0 448 512"
                                      width={13}
                                      height={13}
                                    >
                                      <path
                                        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                  </div>
                                )}
                              </button>

                              {isEmojiPickerOpen && (
                                <div
                                  ref={emojiPickerRef}
                                  className="absolute top-full right-0 mt-1 bg-white border border-gray-300 rounded-xl p-4 shadow-lg w-[300px] max-h-[300px] overflow-y-auto z-10"
                                >
                                  <input
                                    type="text"
                                    className="w-full px-3 py-2.5 mb-4 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none"
                                    placeholder="Search emojis..."
                                  />

                                  <div className="flex gap-2 mb-3 pb-2 border-b border-gray-200">
                                    {emojiCategories.frequent
                                      .slice(0, 8)
                                      .map((emoji, i) => (
                                        <button
                                          key={i}
                                          type="button"
                                          className="p-1 hover:bg-gray-100 rounded"
                                          onClick={() =>
                                            handleEmojiSelect(emoji)
                                          }
                                        >
                                          {emoji}
                                        </button>
                                      ))}
                                  </div>

                                  <div className="space-y-5">
                                    <div>
                                      <div className="text-sm text-gray-700 font-semibold mb-3">
                                        Frequently Used
                                      </div>
                                      <div className="flex flex-wrap gap-2">
                                        {emojiCategories.frequent.map(
                                          (emoji, i) => (
                                            <button
                                              key={i}
                                              type="button"
                                              className="w-10 h-10 text-xl flex items-center justify-center hover:bg-gray-100 rounded-lg"
                                              onClick={() =>
                                                handleEmojiSelect(emoji)
                                              }
                                            >
                                              {emoji}
                                            </button>
                                          )
                                        )}
                                      </div>
                                    </div>

                                    <div>
                                      <div className="text-sm text-gray-700 font-semibold mb-3">
                                        Smileys & People
                                      </div>
                                      <div className="flex flex-wrap gap-2">
                                        {emojiCategories.smileys.map(
                                          (emoji, i) => (
                                            <button
                                              key={i}
                                              type="button"
                                              className="w-10 h-10 text-xl flex items-center justify-center hover:bg-gray-100 rounded-lg"
                                              onClick={() =>
                                                handleEmojiSelect(emoji)
                                              }
                                            >
                                              {emoji}
                                            </button>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Description Input */}
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
                        {/* Horizontal Border */}
                        <div className="border-b border-b-gray-300"></div>

                        {/* Linked products */}
                        <div className="mx-auto p-6">
                          <h2 className="text-xl font-semibold text-gray-800 mb-6">
                            Linked Products
                          </h2>

                          <div className="space-y-6">
                            {products.map((product) => (
                              <div
                                key={product.id}
                                className="flex items-center justify-between"
                              >
                                <div className="flex items-center gap-6">
                                  {/* Product image */}
                                  <div className="w-15 h-15 rounded-lg overflow-hidden">
                                    <Image
                                      src={
                                        product.imageUrl || "/placeholder.svg"
                                      }
                                      alt={product.title}
                                      width={80}
                                      height={80}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>

                                  <div>
                                    {/* Product type badge */}
                                    <div
                                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-sm font-bold mb-2 ${
                                        product.type === "Course"
                                          ? "bg-blue-100 text-blue-700"
                                          : "bg-red-50 text-red-700"
                                      }`}
                                    >
                                      {product.type == "Event" ? (
                                        <VideoSvg className="size-5 text-gray-500 " />
                                      ) : (
                                        <CourseIcon className="size-5 text-gray-500 " />
                                      )}

                                      <span>{product.type}</span>
                                    </div>

                                    {/* Product title */}
                                    <h3 className="text-sm font-semibold text-gray-800">
                                      {product.title}
                                    </h3>
                                  </div>
                                </div>

                                {/* Product price */}
                                <div className="text-sm font-semibold text-gray-800">
                                  ${product.price}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-6xl w-full mx-auto">
                <CheckList />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
