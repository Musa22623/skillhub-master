/** @format */

"use client";

import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Bold, Italic, Redo, Underline, Undo, X } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Button } from "@/app/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import myImage from "@/assets/img5.jpg";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import {
  // CheckIcon,
  CloseIcon,
  SerchIcon,
  // ThreeDotIcon,
  CircleHelpIcon,
  ChevronDown,
  PlusIcon,
  VerticalDotsIcon,
  OrderedListSvg,
  UnorderedListSvg,
  SixDot,
} from "@/app/components/svg";
import img5 from "@/assets/img5.jpg";
import img1 from "@/assets/img-3.webp";
import Avatar1 from "@/assets/avatar/AVATAR-1.png";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/app/components/ui/hover-card";
import Outline from "../Outline";
import Pricing from "../Pricing";
import CheckList from "../Ckecklist";
import Setting from "../Setting";

interface SessionModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface SessionCard {
  id: number;
  name: string;
  image: StaticImageData;
  selected: boolean;
}

const SesssionCard: SessionCard[] = [
  {
    id: 1,
    name: "How to Get Funded",
    image: img1,

    selected: false,
  },
  {
    id: 2,
    name: "Design System Workshop 2024",

    image: img5,
    selected: false,
  },
  {
    id: 3,
    name: "Advanced UI/UX Design Masterclass",

    image: img5,
    selected: false,
  },
];

const card = [
  {
    id: 1,
    name: "Jon Jose",
    title: "Assign as Host.",
    avatar: Avatar1,
    selected: false,
  },
  {
    id: 2,
    name: "Steve Karbra",
    title: "Assign as Host.",
    avatar: Avatar1,
    selected: false,
  },
  {
    id: 3,
    name: "Sam Max",
    title: "Assign as Host.",
    avatar: Avatar1,
    selected: false,
  },
];

interface SortableSessionCardProps {
  card: SessionCard;
  onRemove: (id: number) => void;
}

function SortableSessionCard({ card, onRemove }: SortableSessionCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-3 border rounded-lg ${
        isDragging ? "bg-gray-100 opacity-50" : "hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-4">
        <div {...attributes} {...listeners}>
          <SixDot className="size-4.5 cursor-move" />
        </div>
        <div className="w-20 h-15 bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src={card.image}
            alt={card.name}
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
        <span className="text-sm font-semibold">{card.name}</span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(card.id);
        }}
        className="text-gray-400 hover:text-gray-600"
      >
        <X />
      </button>
    </div>
  );
}

export default function CreateSession({ open, setOpen }: SessionModalProps) {
  const [activeTab, setActiveTab] = useState("landing");

  const [eventTitle, setEventTitle] = useState("");
  const [eventUrl, setEventUrl] = useState("");
  const [agendaItems, setAgendaItems] = useState(["Item 1", "Item 2"]);
  const [searchCard, setsearchCard] = useState("");
  const [SelectedSession, setSelectedSession] = useState(SesssionCard);

  const [useCard, setUserCard] = useState("");
  const [serachUsercard, setSearchCard] = useState(card);
  const editorRef = useRef<HTMLDivElement>(null);

  // user search

  const searchUser = serachUsercard.filter((card) => {
    if (card.selected) return false; // Don't show selected cards in search results

    const searchTerms = useCard.toLowerCase().split(" ");
    const cardName = card.name.toLowerCase();
    const cardTitle = card.title.toLowerCase();

    return searchTerms.every(
      (term) =>
        cardName.includes(term) ||
        cardName.split(" ").some((word) => word.includes(term)) ||
        cardTitle.includes(term) ||
        cardTitle.split(" ").some((word) => word.includes(term))
    );
  });
  const removeSelectedUser = (id: number) => {
    setSearchCard((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, selected: false } : card
      )
    );
  };

  const UserSearchCard = (id: number) => {
    const selectedCard = serachUsercard.find((card) => card.id === id);
    if (selectedCard) {
      // If card is in selected state, remove from selected and add back to search
      if (selectedCard.selected) {
        setSearchCard((prevCards) =>
          prevCards.map((card) =>
            card.id === id ? { ...card, selected: false } : card
          )
        );
      }
      // If card is not selected, remove from search and add to selected
      else {
        setSearchCard((prevCards) =>
          prevCards.map((card) =>
            card.id === id ? { ...card, selected: true } : card
          )
        );
      }
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const items = Array.from(SelectedSession);
      const oldIndex = items.findIndex((item) => item.id.toString() === active.id);
      const newIndex = items.findIndex((item) => item.id.toString() === over?.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setSelectedSession(newItems);
    }
  };

  // user search

  const selectedUser = serachUsercard.filter((card) => card.selected);

  // Remove bundle from selection
  const removeBundle = (id: number) => {
    setSelectedSession(
      SelectedSession.map((card) =>
        card.id === id ? { ...card, selected: false } : card
      )
    );
  };

  const SelectedSessionCard = SelectedSession.filter((card) => card.selected);

  const filterSession = SelectedSession.filter((card) => {
    if (card.selected) return false;
    const searchTerms = searchCard.toLowerCase().split(" ");
    const cardName = card.name.toLowerCase();
    return searchTerms.every(
      (term) =>
        cardName.includes(term) ||
        cardName.split(" ").some((word) => word.includes(term))
    );
  });

  const toggleSession = (id: number) => {
    setSelectedSession(
      SelectedSession.map((card) =>
        card.id === id ? { ...card, selected: !card.selected } : card
      )
    );
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
      const baseUrl = "https://skillhub.com/sessions/";
      // Add random suffix like in your example
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      setEventUrl(`${baseUrl}${slug}-${randomSuffix}`);
    } else {
      setEventUrl("");
    }
  }, [eventTitle]);

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

    // setActiveFormats(formats);
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

  // Drag and Drop functionality
  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "outline":
        return <Outline />;
      case "Setting":
        return <Setting />;
      case "pricing":
        return <Pricing />;
      case "landing":
        return (
          <>
            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 pt-8">
              <div className="max-w-6xl mx-auto bg-gray-100">
                {/* Main Content */}
                <div className="py-8">
                  <div className="space-y-8">
                    {/* Event Details */}
                    <div className="flex flex-col md:flex-row gap-[25px]">
                      <div className="md:w-1/3">
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">
                          Event Details
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                          Enter the basic event details such as the title and
                          description. We'll use your title to generate the URL.
                        </p>
                      </div>

                      <div className="md:w-2/3 bg-white border py-8 pb-6 px-8 rounded-lg ">
                        <h3 className="text-base font-semibold mb-4">
                          Event Details
                        </h3>

                        <div className="space-y-6">
                          <div>
                            <div className="flex justify-between mb-1">
                              <label className="text-sm font-semibold mb-1">
                                Event Title
                              </label>
                              <span className="text-xs text-gray-400">
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

                          <div>
                            <label className="text-sm font-semibold block mb-1">
                              Event URL
                            </label>
                            <Input
                              className="w-full px-2 py-5 bg-gray-50"
                              value={eventUrl}
                              readOnly
                            />
                          </div>

                          {/* Description */}

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

                    {/* Access Settings */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3 pt-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                          Access Settings
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Configure event access options.
                        </p>
                      </div>

                      <div className="md:w-2/3 bg-white border p-4 px-6 rounded-lg ">
                        <h3 className="text-base font-semibold mb-1">
                          Include This Event Free
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Select the courses that will include this event for
                          free.
                        </p>

                        <div className="space-y-4">
                          {/* {Selected Session Card } */}

                          <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                          >
                            <SortableContext
                              items={SelectedSessionCard.map((card) => card.id.toString())}
                              strategy={verticalListSortingStrategy}
                            >
                              <div className="space-y-4">
                                {SelectedSessionCard.map((card) => (
                                  <SortableSessionCard
                                    key={card.id}
                                    card={card}
                                    onRemove={removeBundle}
                                  />
                                ))}
                              </div>
                            </SortableContext>
                          </DndContext>

                          {/* {Session Search bar} */}

                          <div className="relative mb-6 mt-8">
                            <SerchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search Courses..."
                              className="pl-10 py-5"
                              value={searchCard}
                              onChange={(e) => setsearchCard(e.target.value)}
                            />
                          </div>

                          {/* {Session Caed List} */}

                          <div className="space-y-2">
                            {filterSession.length > 0 ? (
                              filterSession.map((card) => (
                                <div
                                  key={card.id}
                                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                                  onClick={() => toggleSession(card.id)}
                                >
                                  <div className="flex items-center gap-4">
                                    <div className="w-20 h-15 ml-8 bg-gray-200 rounded-lg overflow-hidden">
                                      <Image
                                        src={card.image}
                                        alt={card.name}
                                        width={100}
                                        height={100}
                                        className="object-cover"
                                      />
                                    </div>
                                    <span className="text-sm font-semibold">
                                      {card.name}
                                    </span>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500 text-center py-4">
                                No Session found matching your search.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Agenda */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3 pt-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                          Agenda
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          List all the items you plan to cover in this session.
                        </p>
                      </div>
                      <div className="md:w-2/3 bg-white border p-6 rounded-lg ">
                        <h3 className="text-base font-semibold mb-4">
                          List all the items you plan to cover
                        </h3>

                        <div className="space-y-3">
                          {agendaItems.map((item, index) => (
                            <div
                              key={index}
                              className="flex border rounded-lg items-center gap-2"
                            >
                              <Input
                                placeholder={item}
                                className="flex-1 border-none focus-visible:ring-0 shadow-none"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                                onClick={() => removeAgendaItem(index)}
                              >
                                <CloseIcon className="h-4 w-4 fill-red-500" />
                              </Button>
                            </div>
                          ))}

                          <Button
                            variant="default"
                            onClick={addAgendaItem}
                            className="bg-gray-900 text-white hover:bg-gray-800 py-5 px-4 w-full md:w-auto"
                          >
                            <PlusIcon className="h-4 w-4" fill="#FFFFFF" />
                            Add Item
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* General Information */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3 pt-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                          General Information
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Configure the basic settings for your course including
                          language, level, and categories.
                        </p>
                      </div>

                      <div className="md:w-2/3 bg-white border p-6 rounded-lg">
                        <h3 className="text-base font-semibold mb-4">
                          General Information
                        </h3>

                        <div className="space-y-4">
                          {[
                            {
                              label: "Select Language",
                              options: [
                                "English",
                                "Spanish",
                                "French",
                                "German",
                                "Chinese",
                                "Japanese",
                              ],
                            },
                            {
                              label: "Select Level",
                              options: [
                                "Beginner",
                                "Intermediate",
                                "Advanced",
                                "Expert",
                              ],
                            },
                            {
                              label: "Select Category",
                              options: [
                                "Programming",
                                "Design",
                                "Marketing",
                                "Business",
                                "Science",
                              ],
                            },
                            {
                              label: "Select Topic",
                              options: [
                                "Web Development",
                                "Mobile Apps",
                                "AI",
                                "Data Science",
                                "UX/UI",
                              ],
                            },
                          ].map((item, index) => (
                            <div key={index}>
                              <div className="relative">
                                <select className="w-full h-10 pl-3 pr-10 border rounded-md appearance-none bg-white">
                                  <option value="">{item.label}</option>
                                  {item.options.map((option, optIndex) => (
                                    <option
                                      key={optIndex}
                                      value={option
                                        .toLowerCase()
                                        .replace(/\s/g, "-")}
                                    >
                                      {option}
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Constructors */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3 pt-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                          Co-Instructors
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Add instructors and hosts.
                        </p>
                      </div>

                      <div className="md:w-2/3 bg-white border p-6 rounded-lg">
                        <h3 className="text-base font-semibold mb-4">
                          Co-Instructors
                        </h3>

                        <div className="">
                          {/* Selected Card */}
                          {selectedUser.map((card) => (
                            <div
                              key={card.id}
                              className="flex items-center justify-between p-2 border border-gray-400 rounded-xl bg-white w-full mb-3"
                              onClick={() => UserSearchCard(card.id)}
                            >
                              <div className="flex items-center  gap-5">
                                <div className="w-[60px] h-[60px] border border-gray-400 rounded-lg overflow-hidden flex items-center justify-center">
                                  <Image
                                    src={card.avatar}
                                    alt={card.name}
                                    width={35}
                                    height={35}
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex flex-col ml-2">
                                  <span className="font-semibold text-gray-800">
                                    {card.name}
                                  </span>
                                  <div className="flex items-center gap-2 mt-1">
                                    <input
                                      type="checkbox"
                                      id={`host${card.id}`}
                                      className="w-4 h-4 accent-blue-500"
                                      defaultChecked={card.selected}
                                    />
                                    <label
                                      htmlFor={`host${card.id}`}
                                      className="text-gray-900 text-sm"
                                    >
                                      {card.title}
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <button
                                className="text-gray-400 hover:text-gray-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeSelectedUser(card.id);
                                }}
                              >
                                <CloseIcon className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                          {/* {Search Card} */}
                          <div className="relative mb-6 mt-5">
                            <SerchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search Co-instructor..."
                              className="pl-10 py-5"
                              value={useCard}
                              onChange={(e) => setUserCard(e.target.value)}
                            />
                          </div>

                          {/* {User List} */}

                          {searchUser.length > 0 ? (
                            searchUser.map((card) => (
                              <div
                                key={card.id}
                                className="space-y-2 "
                                onClick={() => UserSearchCard(card.id)}
                              >
                                <div className="flex items-center justify-between p-2 border border-gray-400 rounded-xl bg-white w-full mt-5">
                                  <div className="flex items-center gap-5">
                                    <div className="w-[60px] h-[60px] border border-gray-400 rounded-lg overflow-hidden flex items-center justify-center">
                                      <Image
                                        src={card.avatar}
                                        alt="Steve Karbra"
                                        width={35}
                                        height={35}
                                        className="object-cover"
                                      />
                                    </div>
                                    <div className="flex flex-col ml-2">
                                      <span className="font-semibold text-gray-800">
                                        {card.name}
                                      </span>
                                      <div className="flex items-center gap-2 mt-1">
                                        <input
                                          type="checkbox"
                                          id="host1"
                                          className="w-4 h-4 accent-blue-500 "
                                          // todo
                                          defaultChecked
                                        />
                                        <label
                                          htmlFor="host1"
                                          className="text-gray-900 text-sm"
                                        >
                                          {card.title}
                                        </label>
                                      </div>
                                    </div>
                                  </div>

                                  <button className="text-gray-400 hover:text-gray-600">
                                    {/* {item === 1 && (
                                                        <CheckIcon className="h-5 w-5" />
                                                      )} */}
                                  </button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-center py-4">
                              No matching your search.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case "checklist":
        return (
          <div>
            <CheckList />
          </div>
        );
      default:
        return null;
    }
  };

  const addAgendaItem = () => {
    setAgendaItems([...agendaItems, `Item ${agendaItems.length + 1}`]);
  };

  const removeAgendaItem = (index: number) => {
    setAgendaItems(agendaItems.filter((_, i) => i !== index));
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        closeButtonClassName="top-0 right-6 shadow-lg -mt-4 z-100 size-8 bg-white rounded-full opacity-100 flex items-center justify-center"
        className="bg-gray-100 mt-5 sm:max-w-[100%] mx-auto p-0 gap-0 h-[100vh] max-h-[100vh] rounded-none flex flex-col px-4 xl:px-0"
      >
        {/* Fixed Header */}
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col py-4">
            {/* Header */}
            <div className="flex items-center justify-between w-full mx-auto pt-8">
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

                <div className="flex gap-2 h-fit items-center">
                  <h2 className="text-xl font-semibold">UX Design Hub</h2>
                  <CircleHelpIcon className="h-5 w-5 fill-gray-500 hover:fill-black" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="flex items-center gap-2 rounded-md border px-3 py-1.5 bg-white">
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span className="text-sm">Preview</span>
                      <svg
                        className="transition-transform"
                        height="16"
                        aria-hidden="true"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M19 9l-7 7-7-7"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        ></path>
                      </svg>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="p-0 py-2" asChild align="end">
                    <div className="">
                      <div className="flex items-center gap-2 py-2 px-3 hover:bg-accent">
                        <div className="size-5">
                          <svg viewBox="0 0 20 20">
                            <path
                              fill="#4F4F4F"
                              d="M4.16671 4.08331C4.14461 4.08331 4.12341 4.09209 4.10778 4.10772C4.09215 4.12335 4.08337 4.14455 4.08337 4.16665V5.91665H5.91671V4.08331H4.16671ZM4.16671 2.58331C3.74678 2.58331 3.34405 2.75013 3.04712 3.04706C2.75019 3.34399 2.58337 3.74672 2.58337 4.16665V15.8333C2.58337 16.2532 2.75019 16.656 3.04712 16.9529C3.34406 17.2498 3.74678 17.4166 4.16671 17.4166H15.8334C16.2533 17.4166 16.656 17.2498 16.953 16.9529C17.2499 16.656 17.4167 16.2532 17.4167 15.8333V4.16665C17.4167 3.74672 17.2499 3.34399 16.953 3.04706C16.656 2.75013 16.2533 2.58331 15.8334 2.58331H4.16671ZM7.41671 4.08331V5.91665H15.9167V4.16665C15.9167 4.14454 15.9079 4.12335 15.8923 4.10772C15.8767 4.09209 15.8555 4.08331 15.8334 4.08331H7.41671ZM15.9167 7.41665H4.08337V15.8333C4.08337 15.8554 4.09215 15.8766 4.10778 15.8922C4.12341 15.9079 4.1446 15.9166 4.16671 15.9166H15.8334C15.8555 15.9166 15.8767 15.9079 15.8923 15.8922C15.9079 15.8766 15.9167 15.8554 15.9167 15.8333V7.41665Z"
                              clipRule="evenodd"
                              fillRule="evenodd"
                            ></path>
                            <path
                              fill="#4F4F4F"
                              d="M7.6529 11.25C8.54057 12.2158 9.3248 12.5834 9.99996 12.5834C10.6751 12.5834 11.4593 12.2158 12.347 11.25C11.4593 10.2842 10.6751 9.91669 9.99996 9.91669C9.3248 9.91669 8.54057 10.2842 7.6529 11.25ZM9.99996 8.41669C11.4473 8.41669 12.7509 9.32129 13.919 10.7815C14.1381 11.0554 14.1381 11.4446 13.919 11.7185C12.7509 13.1787 11.4473 14.0834 9.99996 14.0834C8.55263 14.0834 7.24902 13.1787 6.08095 11.7185C5.86185 11.4446 5.86185 11.0554 6.08095 10.7815C7.24902 9.32129 8.55263 8.41669 9.99996 8.41669ZM9.24329 11.2502C9.24329 10.8359 9.57907 10.5002 9.99329 10.5002H9.99995C10.4142 10.5002 10.75 10.8359 10.75 11.2502C10.75 11.6644 10.4142 12.0002 9.99995 12.0002H9.99329C9.57907 12.0002 9.24329 11.6644 9.24329 11.2502Z"
                              clipRule="evenodd"
                              fillRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <span>Preview Course Page</span>
                      </div>
                      <div className="flex items-center gap-2 py-2 px-3 hover:bg-accent">
                        <div className="size-5">
                          <svg fill="none" viewBox="0 0 20 20">
                            <path
                              fill="#4F4F4F"
                              d="M5.00004 4.08331C4.75693 4.08331 4.52377 4.17989 4.35186 4.3518C4.17995 4.52371 4.08337 4.75686 4.08337 4.99998V6.66665C4.08337 7.08086 3.74759 7.41665 3.33337 7.41665C2.91916 7.41665 2.58337 7.08086 2.58337 6.66665V4.99998C2.58337 4.35904 2.83799 3.74435 3.2912 3.29114C3.74441 2.83793 4.3591 2.58331 5.00004 2.58331H6.66671C7.41671 2.58331 7.41671 2.9191 7.41671 3.33331C7.41671 3.74753 7.08092 4.08331 6.66671 4.08331H5.00004ZM12.5834 3.33331C12.5834 2.9191 12.9192 2.58331 13.3334 2.58331H15C15.641 2.58331 16.2557 2.83793 16.7089 3.29114C17.1621 3.74435 17.4167 4.35904 17.4167 4.99998V6.66665C17.4167 7.08086 17.0809 7.41665 16.6667 7.41665C16.2525 7.41665 15.9167 7.08086 15.9167 6.66665V4.99998C15.9167 4.75686 15.8201 4.52371 15.6482 4.3518C15.4763 4.17989 15.2432 4.08331 15 4.08331H13.3334C12.9192 4.08331 12.5834 3.74753 12.5834 3.33331ZM3.33337 12.5833C3.74759 12.5833 4.08337 12.9191 4.08337 13.3333V15C4.08337 15.2431 4.17995 15.4763 4.35186 15.6482C4.52377 15.8201 4.75693 15.9166 5.00004 15.9166H6.66671C7.08092 15.9166 7.41671 16.2524 7.41671 16.6666C7.41671 17.0809 7.08092 17.4166 6.66671 17.4166H5.00004C4.3591 17.4166 3.74441 17.162 3.2912 16.7088C2.83799 16.2556 2.58337 15.6409 2.58337 15V13.3333C2.58337 12.9191 2.91916 12.5833 3.33337 12.5833ZM16.6667 12.5833C17.0809 12.5833 17.4167 12.9191 17.4167 13.3333V15C17.4167 15.6409 17.1621 16.2556 16.7089 16.7088C16.2557 17.162 15.641 17.4166 15 17.4166H13.3334C12.9192 17.4166 12.5834 17.0809 12.5834 16.6666C12.5834 16.2524 12.9192 15.9166 13.3334 15.9166H15C15.2432 15.9166 15.4763 15.8201 15.6482 15.6482C15.8201 15.4763 15.9167 15.2431 15.9167 15V13.3333C15.9167 12.9191 16.2525 12.5833 16.6667 12.5833Z"
                              clipRule="evenodd"
                              fillRule="evenodd"
                            ></path>
                            <path
                              fill="#4F4F4F"
                              d="M7.63052 6.34733C7.86565 6.2142 8.15421 6.21784 8.38591 6.35686L13.3859 9.35686C13.6118 9.4924 13.75 9.73653 13.75 9.99998C13.75 10.2634 13.6118 10.5076 13.3859 10.6431L8.38591 13.6431C8.15421 13.7821 7.86565 13.7858 7.63052 13.6526C7.39538 13.5195 7.25004 13.2702 7.25004 13V6.99998C7.25004 6.72978 7.39538 6.48046 7.63052 6.34733ZM8.75004 8.32462V11.6753L11.5423 9.99998L8.75004 8.32462Z"
                              clipRule="evenodd"
                              fillRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <span>Preview Course Player</span>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <Button size="sm" className="px-6">
                  Save
                </Button>
                <button>
                  <VerticalDotsIcon className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Below section for Tabs */}
          <div className="w-full mx-auto px-33 border-b ">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full -mt-12 bg-gray-100"
            >
              <TabsList className=" gap-6 bg-gray-100">
                <TabsTrigger
                  value="outline"
                  className="rounded-none px-0 py-2 bg-gray-100 data-[state=active]:bg-gray-100 data-[state=active]:text-teal-500 data-[state=active]:shadow-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary "
                >
                  Outline
                </TabsTrigger>

                <TabsTrigger
                  value="Setting"
                  className="rounded-none px-0 py-2 bg-gray-100 data-[state=active]:bg-gray-100 data-[state=active]:text-teal-500 data-[state=active]:shadow-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary "
                >
                  Settings
                </TabsTrigger>
                <TabsTrigger
                  value="landing"
                  className="rounded-none px-0 py-2 bg-gray-100 data-[state=active]:bg-gray-100 data-[state=active]:text-teal-500 data-[state=active]:shadow-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary "
                >
                  Landing Page
                </TabsTrigger>
                <TabsTrigger
                  value="pricing"
                  className="rounded-none px-0 py-2 bg-gray-100 data-[state=active]:bg-gray-100 data-[state=active]:text-teal-500 data-[state=active]:shadow-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary "
                >
                  Pricing
                </TabsTrigger>
                <TabsTrigger
                  value="checklist"
                  className="rounded-none px-0 py-2 bg-gray-100 data-[state=active]:bg-gray-100 data-[state=active]:text-teal-500 data-[state=active]:shadow-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary "
                >
                  Checklist
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Render the tab content */}
        <div className="overflow-y-auto">{renderTabContent()}</div>
      </DialogContent>
    </Dialog>
  );
}
