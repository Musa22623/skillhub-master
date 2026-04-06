/** @format */

"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { X, Plus } from "lucide-react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/app/components/ui/drawer";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface CreateSchoolFormProps {
  onClose: () => void;
}

export default function CreateSchoolForm({ onClose }: CreateSchoolFormProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [links, setLinks] = useState<{ text: string; url: string }[]>([]);
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [schoolName, setSchoolName] = useState<string>("");
  const isMobile = useIsMobile();
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  const handleEmojiSelect = (emoji: EmojiClickData) => {
    setSelectedEmoji(emoji.emoji);
    setIsEmojiPickerOpen(false);
  };

  const handleRemoveEmoji = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEmoji(null);
  };

  const handleAddLink = () => {
    setLinks([...links, { text: "", url: "" }]);
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  const handleLinkChange = (
    index: number,
    field: "text" | "url",
    value: string
  ) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const handleBannerUpload = () => {
    bannerInputRef.current?.click();
  };

  const handleThumbnailUpload = () => {
    thumbnailInputRef.current?.click();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formValues = Object.fromEntries(formData.entries());

    // Add links to form data
    formValues.links = JSON.stringify(links);

    console.log("Form submitted", formValues);
    // Here you would typically send the data to your API
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  if (isOpen && isMobile) {
    return (
      <>
        <Drawer open={isOpen} onOpenChange={onClose}>
          <DrawerContent className="h-full  !max-h-[100vh]">
            <DrawerTitle className="hidden">Create School</DrawerTitle>
            <DrawerHeader className="">
              <div className="p-2 flex items-center justify-between border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 pr-6">
                  Create School
                </h2>
                <button
                  className=" p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={handleClose}
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </DrawerHeader>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-132px)]">
              <form id="schoolForm" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2 ">
                    {/* Label */}
                    <label
                      className="font-semibold text-gray-700 text-sm pl-1 "
                      htmlFor="schoolName"
                    >
                      Name
                    </label>

                    {/* Character Counter */}
                    <label className="text-xs text-gray-500 relative right-15 pr-0.5" >
                      {schoolName.length} / 140 characters
                    </label>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="text"
                      id="schoolName"
                      name="schoolName"
                      placeholder="School Name"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-teal-500"
                      required
                    />
                    <div className="relative">
                      <div className="absolute -top-7 right-2 text-xs font-semibold text-gray-700">
                        Emoji
                      </div>
                      <button
                        type="button"
                        ref={emojiButtonRef}
                        className="h-[45px] min-w-[45px] flex items-center justify-center bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100"
                        onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
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
                            <svg viewBox="0 0 448 512" width={13} height={13}>
                              <path
                                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                        )}
                      </button>

                      {isEmojiPickerOpen && (
                        <div className="absolute z-100 top-full right-0 mt-1">
                          <EmojiPicker
                            open={isEmojiPickerOpen}
                            onEmojiClick={handleEmojiSelect}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    className="block font-semibold text-gray-700 mb-2 text-sm pl-1"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="A space for discussing the latest insights.."
                    className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm min-h-[100px] resize-vertical focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block font-semibold text-gray-700 mb-2 text-sm pl-1"
                    htmlFor="banner"
                  >
                    Banner
                  </label>
                  <div className="border border-gray-300 rounded-md overflow-hidden">
                    <div className="h-[160px] bg-gray-50 flex items-center justify-center overflow-hidden">
                      {bannerPreview ? (
                        <Image
                          src={bannerPreview}
                          alt="Banner preview"
                          width={600}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="120"
                            height="120"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-image-icon lucide-image text-gray-300"
                          >
                            <rect
                              width="18"
                              height="18"
                              x="3"
                              y="3"
                              rx="2"
                              ry="2"
                            />
                            <circle cx="9" cy="9" r="2" />
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-6 p-4">
                      <div className="flex-1">
                        <div className="text-xs  text-gray-700 mb-2">
                          Recommended dimensions of <strong>1280×720</strong>
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 px-4 py-1 border border-gray-300 rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-50"
                          onClick={handleBannerUpload}
                        >
                          <svg
                            fill="none"
                            viewBox="0 0 48 48"
                            width="24"
                            height="24"
                          >
                            <rect
                              fill="#F0F9FF"
                              rx="24"
                              height="48"
                              width="48"
                            ></rect>
                            <path
                              fill="#283593"
                              d="M17.3307 13C16.8887 13 16.4648 13.1756 16.1522 13.4882C15.8397 13.8007 15.6641 14.2246 15.6641 14.6667V33.3333C15.6641 33.7754 15.8397 34.1993 16.1522 34.5118C16.4648 34.8244 16.8887 35 17.3307 35H30.6641C31.1061 35 31.53 34.8244 31.8426 34.5118C32.1551 34.1993 32.3307 33.7754 32.3307 33.3333V19.6667H27.9974C27.3786 19.6667 26.7851 19.4208 26.3475 18.9832C25.9099 18.5457 25.6641 17.9522 25.6641 17.3333V13H17.3307ZM27.6641 14.4142L30.9165 17.6667H27.9974C27.909 17.6667 27.8242 17.6315 27.7617 17.569C27.6992 17.5065 27.6641 17.4217 27.6641 17.3333V14.4142Z"
                              clipRule="evenodd"
                              fillRule="evenodd"
                            ></path>
                          </svg>
                          Choose Banner
                        </button>
                      </div>
                    </div>
                    <input
                      type="file"
                      id="bannerInput"
                      name="banner"
                      ref={bannerInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setBannerPreview)}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    className="block font-semibold text-gray-700 mb-2 text-sm pl-1"
                    htmlFor="thumbnail"
                  >
                    Thumbnail
                  </label>
                  <div className="border border-gray-300 rounded-md overflow-hidden">
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-[100px] h-[80px] bg-gray-50 rounded flex items-center justify-center overflow-hidden">
                        {thumbnailPreview ? (
                          <Image
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            width={600}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="  flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="80"
                              height="73"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-image-icon lucide-image text-gray-300"
                            >
                              <rect
                                width="18"
                                height="18"
                                x="3"
                                y="3"
                                rx="2"
                                ry="2"
                              />
                              <circle cx="9" cy="9" r="2" />
                              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm  text-gray-700 mb-2  line-clamp-1">
                          Recommended dimensions of{" "}
                          <span className="font-semibold">1280×720</span>
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center gap-2  py-1 font-semibold text-xs border border-gray-300 rounded-full  text-gray-700 hover:bg-gray-50"
                          onClick={handleThumbnailUpload}
                        >
                          <svg
                            fill="none"
                            viewBox="0 0 48 48"
                            width="24"
                            height="24"
                          >
                            <rect
                              fill="#F0F9FF"
                              rx="24"
                              height="48"
                              width="48"
                            ></rect>
                            <path
                              fill="#283593"
                              d="M17.3307 13C16.8887 13 16.4648 13.1756 16.1522 13.4882C15.8397 13.8007 15.6641 14.2246 15.6641 14.6667V33.3333C15.6641 33.7754 15.8397 34.1993 16.1522 34.5118C16.4648 34.8244 16.8887 35 17.3307 35H30.6641C31.1061 35 31.53 34.8244 31.8426 34.5118C32.1551 34.1993 32.3307 33.7754 32.3307 33.3333V19.6667H27.9974C27.3786 19.6667 26.7851 19.4208 26.3475 18.9832C25.9099 18.5457 25.6641 17.9522 25.6641 17.3333V13H17.3307ZM27.6641 14.4142L30.9165 17.6667H27.9974C27.909 17.6667 27.8242 17.6315 27.7617 17.569C27.6992 17.5065 27.6641 17.4217 27.6641 17.3333V14.4142Z"
                              clipRule="evenodd"
                              fillRule="evenodd"
                            ></path>
                          </svg>
                          <span className="text-xs pr-3">Choose Thumbnail</span>
                        </button>
                      </div>
                    </div>
                    <input
                      type="file"
                      id="thumbnailInput"
                      name="thumbnail"
                      ref={thumbnailInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setThumbnailPreview)}
                    />
                  </div>
                </div>

                <div className="mb-4 overflow-x-hidden">
                  <div className="flex justify-between items-center">
                    <label className="block font-semibold text-gray-700 mb-2 text-sm pl-1.5">
                      Links
                    </label>
                    {links.length > 0 && (
                      <span className="text-xs font-semibold text-gray-600 mr-11">
                        {links.length}/ 5 links
                      </span>
                    )}
                  </div>
                  <div className="space-y-3 mb-2">
                    {links.map((link, index) => (
                      <div
                        key={index}
                        className="flex gap-2 w-full items-center "
                      >
                        <input
                          type="text"
                          placeholder="Link Text"
                          className="px-3 py-2 min-w-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-teal-500"
                          value={link.text}
                          onChange={(e) =>
                            handleLinkChange(index, "text", e.target.value)
                          }
                          required
                        />
                        <input
                          type="text"
                          placeholder="Link URL"
                          className="px-3 py-2 min-w-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-teal-500"
                          value={link.url}
                          onChange={(e) =>
                            handleLinkChange(index, "url", e.target.value)
                          }
                          required
                        />
                        <button
                          type="button"
                          className="p-2  text-red-500 hover:bg-red-50 rounded-md"
                          onClick={() => handleRemoveLink(index)}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-3 py-2 text-teal-500 font-semibold text-sm hover:bg-teal-50 rounded-md"
                    onClick={handleAddLink}
                    disabled={links.length > 4}
                  >
                    <Plus className="w-4 h-4" />
                    Add Link
                  </button>
                </div>
              </form>
            </div>

            <DrawerFooter>
              <div className="p-4 border-t border-gray-200 flex w-full">
                <button
                  type="submit"
                  form="schoolForm"
                  className="px-6 w-full py-3 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition-colors"
                >
                  Create School
                </button>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  } else {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white rounded-xl w-full max-w-[500px] max-h-[92vh] shadow-xl  overflow-hidden my-4">
          <div className="p-4 relative border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 pr-6">
              Create School
            </h2>
            <button
              className=" p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={handleClose}
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <div className="p-4.5 overflow-y-auto max-h-[calc(90vh-132px)]">
            <form id="schoolForm" onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="flex   items-center mb-2">
                  {/* Label */}
                  <label
                    className="font-semibold text-gray-700 text-sm"
                    htmlFor="schoolName"
                  >
                    Name
                  </label>

                  {/* Character Counter */}
                  <span className="text-xs text-gray-500 ml-[calc(var(--spacing)*60)]">
                    {schoolName.length} / 140 characters
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <input
                    type="text"
                    id="schoolName"
                    name="schoolName"
                    maxLength={140}
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="School Name"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-teal-500"
                    required
                  />

                  <div className="relative">
                    <div className="absolute -top-7 right-2 text-xs font-semibold text-gray-700">
                      Emoji
                    </div>
                    <button
                      type="button"
                      ref={emojiButtonRef}
                      className="h-[42px] min-w-[42px] flex items-center justify-center bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100"
                      onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
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
                          <svg viewBox="0 0 448 512" width={13} height={13}>
                            <path
                              d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      )}
                    </button>

                    {isEmojiPickerOpen && (
                      <div className="absolute top-full right-0 mt-1">
                        <EmojiPicker
                          open={isEmojiPickerOpen}
                          onEmojiClick={handleEmojiSelect}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block font-semibold text-gray-700 mb-2 text-sm"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="A space for discussing the latest insights.."
                  className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm min-h-[100px] resize-vertical focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block font-semibold text-gray-700 mb-2 text-sm"
                  htmlFor="banner"
                >
                  Banner
                </label>
                <div className="border border-gray-300 rounded-md overflow-hidden">
                  <div className="h-[160px] bg-gray-50 flex items-center justify-center overflow-hidden">
                    {bannerPreview ? (
                      <Image
                        src={bannerPreview}
                        alt="Banner preview"
                        width={600}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="120"
                          height="120"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-image-icon lucide-image text-gray-300"
                        >
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="3"
                            rx="2"
                            ry="2"
                          />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-6 p-4">
                    <div className="flex-1">
                      <div className="text-xs  text-gray-700 mb-2">
                        Recommended dimensions of <strong>1280×720</strong>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 px-4 py-1 border border-gray-300 rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-50"
                        onClick={handleBannerUpload}
                      >
                        <svg
                          fill="none"
                          viewBox="0 0 48 48"
                          width="24"
                          height="24"
                        >
                          <rect
                            fill="#F0F9FF"
                            rx="24"
                            height="48"
                            width="48"
                          ></rect>
                          <path
                            fill="#283593"
                            d="M17.3307 13C16.8887 13 16.4648 13.1756 16.1522 13.4882C15.8397 13.8007 15.6641 14.2246 15.6641 14.6667V33.3333C15.6641 33.7754 15.8397 34.1993 16.1522 34.5118C16.4648 34.8244 16.8887 35 17.3307 35H30.6641C31.1061 35 31.53 34.8244 31.8426 34.5118C32.1551 34.1993 32.3307 33.7754 32.3307 33.3333V19.6667H27.9974C27.3786 19.6667 26.7851 19.4208 26.3475 18.9832C25.9099 18.5457 25.6641 17.9522 25.6641 17.3333V13H17.3307ZM27.6641 14.4142L30.9165 17.6667H27.9974C27.909 17.6667 27.8242 17.6315 27.7617 17.569C27.6992 17.5065 27.6641 17.4217 27.6641 17.3333V14.4142Z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                        Choose Banner
                      </button>
                    </div>
                  </div>
                  <input
                    type="file"
                    id="bannerInput"
                    name="banner"
                    ref={bannerInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setBannerPreview)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block font-semibold text-gray-700 mb-2 text-sm"
                  htmlFor="thumbnail"
                >
                  Thumbnail
                </label>
                <div className="border border-gray-300 rounded-md overflow-hidden">
                  <div className="flex items-center gap-6 p-4">
                    <div className="w-[120px] h-[80px] bg-gray-50 rounded flex items-center justify-center overflow-hidden">
                      {thumbnailPreview ? (
                        <Image
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          width={600}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-image-icon lucide-image text-gray-300"
                          >
                            <rect
                              width="18"
                              height="18"
                              x="3"
                              y="3"
                              rx="2"
                              ry="2"
                            />
                            <circle cx="9" cy="9" r="2" />
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs  text-gray-700 mb-2">
                        Recommended dimensions of <strong>1280×720</strong>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 px-4 py-1 font-semibold text-xs border border-gray-300 rounded-full  text-gray-700 hover:bg-gray-50"
                        onClick={handleThumbnailUpload}
                      >
                        <svg
                          fill="none"
                          viewBox="0 0 48 48"
                          width="24"
                          height="24"
                        >
                          <rect
                            fill="#F0F9FF"
                            rx="24"
                            height="48"
                            width="48"
                          ></rect>
                          <path
                            fill="#283593"
                            d="M17.3307 13C16.8887 13 16.4648 13.1756 16.1522 13.4882C15.8397 13.8007 15.6641 14.2246 15.6641 14.6667V33.3333C15.6641 33.7754 15.8397 34.1993 16.1522 34.5118C16.4648 34.8244 16.8887 35 17.3307 35H30.6641C31.1061 35 31.53 34.8244 31.8426 34.5118C32.1551 34.1993 32.3307 33.7754 32.3307 33.3333V19.6667H27.9974C27.3786 19.6667 26.7851 19.4208 26.3475 18.9832C25.9099 18.5457 25.6641 17.9522 25.6641 17.3333V13H17.3307ZM27.6641 14.4142L30.9165 17.6667H27.9974C27.909 17.6667 27.8242 17.6315 27.7617 17.569C27.6992 17.5065 27.6641 17.4217 27.6641 17.3333V14.4142Z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                        Choose Thumbnail
                      </button>
                    </div>
                  </div>
                  <input
                    type="file"
                    id="thumbnailInput"
                    name="thumbnail"
                    ref={thumbnailInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setThumbnailPreview)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <label className="block font-semibold text-gray-700 mb-2 text-sm">
                    Links
                  </label>
                  {links.length > 0 && (
                    <span className="text-xs font-semibold text-gray-600 mr-11">
                      {links.length}/ 5 links
                    </span>
                  )}
                </div>
                <div className="space-y-3 mb-2">
                  {links.map((link, index) => (
                    <div
                      key={index}
                      className="flex gap-3 items-center max-sm:flex-wrap"
                    >
                      <input
                        type="text"
                        placeholder="Link Text"
                        className="flex-1 px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-teal-500"
                        value={link.text}
                        onChange={(e) =>
                          handleLinkChange(index, "text", e.target.value)
                        }
                        required
                      />
                      <input
                        type="text"
                        placeholder="Link URL"
                        className="flex-1 px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-teal-500"
                        value={link.url}
                        onChange={(e) =>
                          handleLinkChange(index, "url", e.target.value)
                        }
                        required
                      />
                      <button
                        type="button"
                        className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                        onClick={() => handleRemoveLink(index)}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="disabled:opacity-50 inline-flex items-center gap-2 px-3 py-2 text-teal-500 font-semibold text-sm hover:bg-teal-50 rounded-md"
                  onClick={handleAddLink}
                  disabled={links.length > 4}
                >
                  <Plus className="w-4 h-4" />
                  Add Link
                </button>
              </div>
            </form>
          </div>

          <div className="py-4 px-6 border-t border-gray-200 flex justify-end">
            <button
              type="submit"
              form="schoolForm"
              className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition-colors"
            >
              Create School
            </button>
          </div>
        </div>
      </div>
    );
  }
}
