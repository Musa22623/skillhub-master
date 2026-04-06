/** @format */

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Bold, Italic, Undo, Redo, Underline } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import myImage from "@/assets/img5.jpg";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import {
  CheckIcon,
  CloseIcon,
  SerchIcon,
  ThreeDotIcon,
  CircleHelpIcon,
  EyeIcon,
  ChevronDown,
  PlusIcon,
  OrderedListSvg,
  UnorderedListSvg,
} from "@/app/components/svg";
import img5 from "@/assets/img5.jpg";
import img1 from "@/assets/img-3.webp";
import Avatar1 from "@/assets/avatar/AVATAR-1.png";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/app/components/ui/drawer";
import CheckList from "../Ckecklist";
import Outline from "../Outline";
import Setting from "../Setting";
import Pricing from "../Pricing";

interface Session {
  id: string;
  image: string;
  title: string;
  type: string;
  status?: string;
  price?: string;
  students?: string;
  lastActivity: string;
  action?: string;
}

interface EditSessionModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  session: Session;
}

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
export default function CreateSessionEdit({
  open,
  setOpen,
  session,
}: EditSessionModalProps) {
  // console.log("session112324", session);
  const [activeTab, setActiveTab] = useState("landing");
  const [agendaItems, setAgendaItems] = useState(["Item 1", "Item 2"]);
  const [sessionData, setSessionData] = useState(session);
  const [eventTitle, setEventTitle] = useState("");
  const [content, setContent] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  const addAgendaItem = () => {
    setAgendaItems([...agendaItems, `Item ${agendaItems.length + 1}`]);
  };
   const [user, setuser] = useState("");
     const [userCard, setUserCard] = useState(card);
   
  const userSelectedCard = userCard.filter((u) => u.selected);

   const searchUserCard = userCard.filter(
    (u) =>
      u.name.toLowerCase().includes(user.toLowerCase()) ||
      u.title.toLowerCase().includes(user.toLowerCase())
  );

  const toggleUserCard = (id: number) => {
    setUserCard(
      userCard.map((u) => (u.id === id ? { ...u, selected: !u.selected } : u))
    );
  };


   useEffect(() => {
    if (session?.type) {
      setEventTitle(session.type); // auto-populate on load
      setSessionData(session);

    }
  }, [session?.type]);
    useEffect(() => {
    setContent(sessionData?.title || "");
  }, [sessionData?.title]);
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
            <div className="overflow-y-auto no-scrollbar flex-1">
              <div className=" bg-white">
                {/* Main Content */}
                <div className="py-2">
                  <div className="space-y-8">
                    {/* Event Details */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">
                          Event Details
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                          Enter the basic event details such as the title and
                          description. We'll use your title to generate the URL.
                        </p>
                      </div>

                      <div className=" bg-white rounded-lg ">
                        <h3 className="text-base font-semibold mb-4">
                          Event Details
                        </h3>

                        <div className="space-y-4">
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
                              defaultValue="e.g UX Design Masterclass"
                              className="w-full px-2 py-5"
                              value={sessionData.type}
                              maxLength={60}
                              onChange={(e) => setEventTitle(e.target.value)}
                            />
                          </div>

                          <div>
                            <label className="text-sm font-semibold block mb-1">
                              Event URL
                            </label>
                            <Input
                              className="w-full px-2 py-5"
                              value={sessionData.image}
                            />
                          </div>
                          {/* description */}
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
                                dangerouslySetInnerHTML={{ __html: content }}
                                className="min-h-[120px] max-h-[240px] custom-list overflow-y-auto p-3 text-[15px] leading-relaxed outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Access Settings */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <h2 className="text-lg font-semibold text-gray-800">
                          Access Settings
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Configure event access options.
                        </p>
                      </div>

                      <div className=" bg-white rounded-lg ">
                        <h3 className="text-base font-semibold mb-4">
                          Include This Event Free
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Select the courses that will include this event for
                          free.
                        </p>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between bg-white p-5 rounded-lg border border-gray-300">
                            <div className="flex items-center gap-6">
                              <div className="w-full md:w-25 h-15 bg-gray-200 rounded-lg flex items-center justify-center">
                                <div className="w-8 h-8 text-gray-900">
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
                                    ></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <polyline points="21 15 16 10 5 21"></polyline>
                                  </svg>
                                </div>
                              </div>
                              <span className="text-sm">Course XYZ</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                            >
                              <CloseIcon className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="relative mb-6 mt-8">
                            <SerchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search Courses..."
                              className="pl-10 py-5"
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                              <div className="flex items-center gap-4">
                                <div>
                                  <ThreeDotIcon className="w-5 h-5 text-gray-500" />
                                </div>
                                <div className="w-20 h-15 bg-gray-200 rounded-lg overflow-hidden">
                                  <Image
                                    src={img5}
                                    alt="Course thumbnail"
                                    width={100}
                                    height={100}
                                    className="object-cover"
                                  />
                                </div>
                                <span className="text-sm">
                                  How to Get Funded
                                </span>
                              </div>
                              <div className="flex items-center mr-4">
                                <CheckIcon className="h-5 w-5 text-gray-500 ml-auto" />
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-2 border rounded-lg hover:bg-gray-50">
                              <div className="flex items-center gap-4">
                                <div>
                                  <ThreeDotIcon className="w-5 h-5 text-gray-500" />
                                </div>
                                <div className="w-20 h-15 bg-gray-200 rounded-lg overflow-hidden">
                                  <Image
                                    src={img1}
                                    alt="Course thumbnail"
                                    width={100}
                                    height={100}
                                    className="object-cover"
                                  />
                                </div>
                                <span className="text-sm">
                                  Best Coaching Practices
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Agenda */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <h2 className="text-lg font-semibold text-gray-800">
                          Agenda
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          List all the items you plan to cover in this session.
                        </p>
                      </div>
                      <div className="md:w-2/3 bg-white p-6 rounded-lg border">
                        <h3 className="text-base font-semibold mb-4">
                          List all the items you plan to cover
                        </h3>

                        <div className="space-y-3">
                          {agendaItems.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <Input defaultValue={item} className="flex-1" />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                                onClick={() => removeAgendaItem(index)}
                              >
                                <CloseIcon className="h-4 w-4 " />
                              </Button>
                            </div>
                          ))}

                          <Button
                            variant="outline"
                            className="flex items-center justify-center gap-2 mt-2 px-4 py-4 bg-black"
                            onClick={addAgendaItem}
                          >
                            <PlusIcon className="h-4 w-4" fill="#FFFFFF" />
                            <span className="text-white text-md">Add Item</span>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* General Information */}
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <h2 className="text-lg font-semibold text-gray-800">
                          General Information
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Configure the basic settings for your course including
                          language, level, and categories.
                        </p>
                      </div>

                      <div className="md:w-2/3 bg-white p-6 rounded-lg border">
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
                              <label className="text-sm font-semibold block mb-1">
                                {item.label}
                              </label>
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
                                          <div className="md:w-1/3">
                                            <h2 className="text-lg font-semibold text-gray-800">
                                              Co-Instructors
                                            </h2>
                                            <p className="text-sm text-gray-500 mt-1">
                                              Add instructors and hosts.
                                            </p>
                                          </div>
                    
                                          <div className="md:w-2/3 bg-white p-5 rounded-lg border">
                                            <h3 className="text-base font-semibold mb-4">
                                              Co-Instructors
                                            </h3>
                    
                                            <div className="space-y-4">
                                              {/* {Selected Card} */}
                    
                                              {userSelectedCard.map((u) => (
                                                <div
                                                  key={u.id}
                                                  className="flex items-center justify-between p-2 border border-gray-400 rounded-xl bg-white w-full"
                                                  onClick={() => toggleUserCard(u.id)}
                                                >
                                                  <div className="flex items-center gap-5">
                                                    <div className="w-[60px] h-[60px] border border-gray-400 rounded-lg overflow-hidden flex items-center justify-center">
                                                      <Image
                                                        src={u.avatar}
                                                        alt="Steve Karbra"
                                                        width={35}
                                                        height={35}
                                                        className="object-cover"
                                                      />
                                                    </div>
                                                    <div className="flex flex-col ml-2">
                                                      <span className="font-semibold text-gray-800">
                                                        {u.name}
                                                      </span>
                                                      <div className="flex items-center gap-2 mt-1">
                                                        <input
                                                          type="checkbox"
                                                          id="host1"
                                                          className="w-4 h-4 accent-blue-500"
                                                          defaultChecked
                                                        />
                                                        <label
                                                          htmlFor="host1"
                                                          className="text-gray-900 text-sm"
                                                        >
                                                          {u.title}
                                                        </label>
                                                      </div>
                                                    </div>
                                                  </div>
                    
                                                  <button className="text-gray-400 hover:text-gray-600">
                                                    <CloseIcon className="h-4 w-4" />
                                                  </button>
                                                </div>
                                              ))}
                    
                                              {/* {Search User} */}
                    
                                              <div className="relative mb-6 mt-5">
                                                <SerchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                  placeholder="Search Co-instructors..."
                                                  className="pl-10 py-5"
                                                  value={user}
                                                  onChange={(e) => setuser(e.target.value)}
                                                />
                                              </div>
                    
                                              {/* {Card List} */}
                                              {searchUserCard.length > 0 ? (
                                                searchUserCard.map((u) => (
                                                  <div
                                                    className="space-y-2"
                                                    key={u.id}
                                                    onClick={() => toggleUserCard(u.id)}
                                                  >
                                                    <div className="flex items-center justify-between p-2 border border-gray-400 rounded-xl bg-white w-full mt-5">
                                                      <div className="flex items-center gap-5">
                                                        <div className="w-[60px] h-[60px] border border-gray-400 rounded-lg overflow-hidden flex items-center justify-center">
                                                          <Image
                                                            src={u.avatar}
                                                            alt="Steve Karbra"
                                                            width={35}
                                                            height={35}
                                                            className="object-cover"
                                                          />
                                                        </div>
                                                        <div className="flex flex-col ml-2">
                                                          <span className="font-semibold text-gray-800">
                                                            {u.name}
                                                          </span>
                                                          <div className="flex items-center gap-2 mt-1">
                                                            <input
                                                              type="checkbox"
                                                              id="host1"
                                                              className="w-4 h-4 accent-blue-500"
                                                              defaultChecked
                                                            />
                                                            <label
                                                              htmlFor="host1"
                                                              className="text-gray-900 text-sm"
                                                            >
                                                              {u.title}
                                                            </label>
                                                          </div>
                                                        </div>
                                                      </div>
                    
                                                      <button className="text-gray-400 hover:text-gray-600">
                                                        <CheckIcon className="h-5 w-5" />
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

  const removeAgendaItem = (index: number) => {
    setAgendaItems(agendaItems.filter((_, i) => i !== index));
  };
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="bg-background sm:max-w-[90%] mx-auto p-0 gap-0 h-[95vh] max-h-[95vh] flex flex-col px-4 xl:px-0">
        {/* Fixed Header */}
        <DrawerHeader className="p-0 pt-2 border-b">
          <DrawerTitle>
            <div className="flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between w-full mx-auto">
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
                    <h2 className="text-xl font-semibold">UX Design</h2>
                            <CircleHelpIcon className="h-5 w-5 fill-gray-500 hover:fill-black" />
                  </div>
                </div>
                <div className="hidden xs:flex items-center gap-2">
                  <div className="flex items-center gap-2 rounded-md border px-3 py-1">
                    <EyeIcon className="h-5 w-5 text-gray-500 " />
                    <span className="text-sm">Preview</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Button size="sm" className="px-6">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </DrawerTitle>
          <div className="  w-full ">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full overflow-x-auto no-scrollbar  px-0"
            >
              <TabsList className="bg-transparent gap-6 ">
                <TabsTrigger
                  value="outline"
                  className="rounded-none px-0 py-2 bg-transparent data-[state=active]:shadow-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary "
                >
                  Outline
                </TabsTrigger>
                <TabsTrigger
                  value="Setting"
                  className="rounded-none px-0 py-2 bg-transparent data-[state=active]:shadow-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary "
                >
                  Settings
                </TabsTrigger>
                <TabsTrigger
                  value="landing"
                  className="rounded-none px-0 py-2 bg-transparent data-[state=active]:shadow-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  Landing Page
                </TabsTrigger>
                <TabsTrigger
                  value="pricing"
                  className="rounded-none px-0 py-2 bg-transparent data-[state=active]:shadow-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  Pricing
                </TabsTrigger>
                <TabsTrigger
                  value="checklist"
                  className="rounded-none px-0 py-2 bg-transparent data-[state=active]:shadow-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  Checklist
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </DrawerHeader>
        {/* Render the tab content */}
        <div className="overflow-y-auto">{renderTabContent()}</div>

        <DrawerFooter className="py-2 border-t ">
          <Button className="">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
