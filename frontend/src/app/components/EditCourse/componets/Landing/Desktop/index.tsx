/** @format */

"use client";

import React, { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import {
  ChevronDown,
  X,
  Plus,
  Underline,
  Italic,
  Bold,
  Redo,
  Undo,
  Trash2Icon,
} from "lucide-react";

import { Input } from "@/app/components/ui/input";
import { Switch } from "@/app/components/ui/switch";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { cn } from "@/lib/utils";
import {
  OrderedListSvg,
  SerchIcon,
  SixDot,
  UnorderedListSvg,
} from "@/app/components/svg";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import Avatar2 from "@/assets/avatar/AVATAR-2.jpg";
import img5 from "@/assets/img5.jpg";
import img1 from "@/assets/img-3.webp";
import VideoPlayer from "../../VideoPlayer";

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

const DesktopLanding = () => {
  const [bulletPoints, setBulletPoints] = useState<string[]>(["", "", "", ""]);
  const [requirements, setRequirements] = useState<string[]>([
    "Example: No photography experience needed. You will learn everything from A-Z",
    "",
  ]);
  const [intendedLearners, setIntendedLearners] = useState<string[]>([
    "Example: Amateur photographers curious about lighting",
  ]);
  const [showFullPlayer, setShowFullPlayer] = useState(false);
  const [forwardShipping, setForwardShipping] = useState(true);
  const [shippingItems, setShippingItems] = useState([
    "Hands-on learning experience",
    "Course kit be included",
  ]);

  // Q&A State
  const [questions, setQuestions] = useState([
    { id: 1, title: "Question 1", answer: "", isOpen: false },
  ]);
  const editorRef = useRef<HTMLDivElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  // Testimonials State
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      occupation: "Head of Impact Academy",
      testimonial: "",
      avatarUrl: Avatar2,
      thumbnailUrl: "",
      isOpen: false,
    },
  ]);
  const [avatar, setAvatar] = useState("/img/person.jpeg");
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  //CPE State
  const [cpeCredits, setCpeCredits] = useState("");
  const [subject, setSubject] = useState("");
  const [qualification, setQualification] = useState("");

  // Learning Paths State
  const [SelectedSession, setSelectedSession] = useState(SesssionCard);

  // Remove bundle from selection
  const removeBundle = (id: number) => {
    setSelectedSession(
      SelectedSession.map((card) =>
        card.id === id ? { ...card, selected: false } : card
      )
    );
  };

  const SelectedSessionCard = SelectedSession.filter((card) => card.selected);
  const [searchCard, setsearchCard] = useState("");



  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const addBulletPoint = () => {
    setBulletPoints([...bulletPoints, ""]);
  };

  const removeBulletPoint = (index: number) => {
    const newBulletPoints = [...bulletPoints];
    newBulletPoints.splice(index, 1);
    setBulletPoints(newBulletPoints);
  };

  const updateBulletPoint = (index: number, value: string) => {
    const newBulletPoints = [...bulletPoints];
    newBulletPoints[index] = value;
    setBulletPoints(newBulletPoints);
  };

  const addRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const removeRequirement = (index: number) => {
    const newRequirements = [...requirements];
    newRequirements.splice(index, 1);
    setRequirements(newRequirements);
  };

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  const addIntendedLearner = () => {
    setIntendedLearners([...intendedLearners, ""]);
  };

  const removeIntendedLearner = (index: number) => {
    const newIntendedLearners = [...intendedLearners];
    newIntendedLearners.splice(index, 1);
    setIntendedLearners(newIntendedLearners);
  };

  const updateIntendedLearner = (index: number, value: string) => {
    const newIntendedLearners = [...intendedLearners];
    newIntendedLearners[index] = value;
    setIntendedLearners(newIntendedLearners);
  };

  // Forward Shipping Functions
  const addShippingItem = () => {
    setShippingItems([...shippingItems, ""]);
  };

  const removeShippingItem = (index: number) => {
    const newItems = [...shippingItems];
    newItems.splice(index, 1);
    setShippingItems(newItems);
  };

  const updateShippingItem = (index: number, value: string) => {
    const newItems = [...shippingItems];
    newItems[index] = value;
    setShippingItems(newItems);
  };

  //  Q&A Functions
  const addQuestion = () => {
    const newId =
      questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
    setQuestions([
      ...questions,
      { id: newId, title: `Question ${newId}`, answer: "", isOpen: false },
    ]);
  };

  const toggleQuestion = (id: number) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, isOpen: !q.isOpen } : q))
    );
  };

  const updateQuestionTitle = (id: number, title: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, title } : q)));
  };

  // const updateQuestionAnswer = (id: number, answer: string) => {
  //   setQuestions(questions.map((q) => (q.id === id ? { ...q, answer } : q)));
  // };

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
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

  // Testimonials Functions
  const addTestimonial = () => {
    const newId =
      testimonials.length > 0
        ? Math.max(...testimonials.map((t) => t.id)) + 1
        : 1;
    setTestimonials([
      ...testimonials,
      {
        id: newId,
        firstName: "",
        lastName: "",
        occupation: "",
        testimonial: "",
        avatarUrl: Avatar2,
        thumbnailUrl: "",
        isOpen: false,
      },
    ]);
  };

  const toggleTestimonial = (id: number) => {
    setTestimonials(
      testimonials.map((t) => (t.id === id ? { ...t, isOpen: !t.isOpen } : t))
    );
  };

  const updateTestimonial = (id: number, field: string, value: string) => {
    setTestimonials(
      testimonials.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const deleteTestimonial = (id: number) => {
    setTestimonials(testimonials.filter((t) => t.id !== id));
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

  return (
    <>
      <div className="flex flex-col gap-8">
        {/* Promotional Video Section */}
        <div className="overflow-y-auto flex-1">
          <div className="flex flex-col md:flex-row gap-4 p-8 pb-0">
            <div className="md:w-1/3 space-y-2">
              <h2 className="text-xl font-medium text-gray-700">
                Promotional Video
              </h2>
              <p className="text-gray-600 text-sm">
                Your promo video is a quick and compelling way for students to
                preview what they&apos;ll learn in your course. Students
                considering your course are more likely to enroll if your promo
                video is well-made.
              </p>
            </div>
            <Card className="md:w-2/3 p-6 shadow-sm">
              <div className="space-y-4">
                <h3 className="text-gray-700 font-medium">Promotional video</h3>
                <div className="flex items-center gap-4">
                  <div className="relative w-32 h-18 overflow-hidden rounded">
                    <VideoPlayer miniPlayer />
                  </div>
                  {/* Edit Video Button */}
                  <div className="relative">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 rounded-full px-8"
                      onClick={() => setShowFullPlayer(!showFullPlayer)}
                    >
                      Edit Video <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Full Video Player */}
                {showFullPlayer && (
                  <div className="mt-4 w-full">
                    <div className="rounded-md overflow-hidden">
                      <VideoPlayer showControls height="360px" />
                    </div>

                    {/* Video Actions */}
                    <div className="flex justify-between items-center">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        Video Actions <ChevronDown className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        Use current frame as thumbnail
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Bullet Points Section */}
        <div className="flex flex-col md:flex-row gap-4 p-8 py-0">
          <div className="md:w-1/3 space-y-2">
            <h2 className="text-xl font-medium text-gray-700">Bullet Points</h2>
            <p className="text-gray-600 text-sm">
              You must write at least 4 learning objectives or outcomes that
              learners can expect to achieve after completing your course.
            </p>
          </div>
          <Card className="md:w-2/3 p-4 shadow-sm bg-white text-neutral-950">
            <div className="space-y-4">
              <h3 className="text-gray-700 font-medium">
                What will students learn in your course?
              </h3>
              <div className="space-y-3">
                {bulletPoints.map((point, index) => (
                  <div key={index} className="relative">
                    <Input
                      value={point}
                      onChange={(e) => updateBulletPoint(index, e.target.value)}
                      placeholder={`Bullet Point ${index + 1}`}
                      className="pr-10"
                    />
                    <button
                      onClick={() => removeBulletPoint(index)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addBulletPoint}
                  className="bg-gray-900 text-white hover:bg-gray-800 py-5 px-4"
                >
                  <Plus size={16} className="mr-2" /> Add more to your response
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Course Requirements Section */}
        <div className="flex flex-col md:flex-row gap-4 p-8 py-0">
          <div className="md:w-1/3 space-y-2">
            <h2 className="text-xl font-medium text-gray-700">
              Course Requirements
            </h2>
            <p className="text-gray-600 text-sm">
              List the required skills, experience, tools or equipment learners
              should have prior to taking your course. If there are no
              requirements, use this space as an opportunity to lower the
              barrier for beginners.
            </p>
          </div>
          <Card className="md:w-2/3 p-4 shadow-sm bg-white text-neutral-950">
            <div className="space-y-4">
              <h3 className="text-gray-700 font-medium">
                What are the requirements or prerequisites for taking your
                course?
              </h3>
              <div className="space-y-3">
                {requirements.map((requirement, index) => (
                  <div key={index} className="relative">
                    <Input
                      value={requirement}
                      onChange={(e) => updateRequirement(index, e.target.value)}
                      placeholder="Add another requirement"
                      className="pr-10"
                    />
                    <button
                      onClick={() => removeRequirement(index)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addRequirement}
                  className="bg-gray-900 text-white hover:bg-gray-800 py-5 px-4"
                >
                  <Plus size={16} className="mr-2" /> Add more to your response
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Intended Learners Section */}
        <div className="flex flex-col md:flex-row gap-4 p-8 py-0">
          <div className="md:w-1/3 space-y-2">
            <h2 className="text-xl font-medium text-gray-700">
              Intended Learners
            </h2>
            <p className="text-gray-600 text-sm">
              Write a short description of the intended learners for your course
              who will find your course content valuable.
            </p>
          </div>
          <Card className="md:w-2/3 p-6 shadow-sm">
            <div className="space-y-4">
              <h3 className="text-gray-700 font-medium">
                Who is this course for?
              </h3>
              <div className="space-y-3">
                {intendedLearners.map((learner, index) => (
                  <div key={index} className="relative">
                    <Input
                      value={learner}
                      onChange={(e) =>
                        updateIntendedLearner(index, e.target.value)
                      }
                      placeholder="Example: Amateur photographers curious about lighting"
                      className="pr-10"
                    />
                    <button
                      onClick={() => removeIntendedLearner(index)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addIntendedLearner}
                  className="bg-gray-900 text-white hover:bg-gray-800 py-5 px-4"
                >
                  <Plus size={16} className="mr-2" /> Add more to your response
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* General Information */}
        <div className="flex flex-col md:flex-row gap-4 p-8 py-0">
          <div className="md:w-1/3 space-y-2">
            <h2 className="text-xl font-medium text-gray-700">
              General Information
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Configure the basic settings for your course including language,
              level, and categories.
            </p>
          </div>

          <Card className="md:w-2/3 p-6 shadow-sm">
            <div className="md: bg-white rounded-lg">
              <h3 className="text-gray-700 font-medium mb-4">
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
                    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
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
                    label: "Select Subcategory",
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
                            value={option.toLowerCase().replace(/\s/g, "-")}
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
          </Card>
        </div>

        {/*  Forward Shipping Section */}
        <div className="flex flex-col md:flex-row gap-4 p-8 py-0">
          <div className="md:w-1/3 space-y-2">
            <h2 className="text-xl font-medium text-gray-700">
              Forward Shipping
            </h2>
            <p className="text-gray-600 text-sm">
              Enhance your student's experience with hand-picked supplies needed
              to bring your project to life.
            </p>
          </div>
          <Card className="md:w-2/3 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <Switch
                checked={forwardShipping}
                onCheckedChange={setForwardShipping}
                className={cn(
                  "data-[state=checked]:bg-black",
                  "data-[state=unchecked]:bg-gray-300",
                  "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
                )}
              />
              <span className="text-gray-700 font-medium">
                Forward Shipping
              </span>
            </div>
            <div className="space-y-3">
              {shippingItems.map((item, index) => (
                <div key={index} className="relative">
                  <Input
                    value={item}
                    onChange={(e) => updateShippingItem(index, e.target.value)}
                    placeholder="Add item needed for your course"
                    className="pr-10 py-2"
                  />
                  <button
                    onClick={() => removeShippingItem(index)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <Button
                variant="default"
                onClick={addShippingItem}
                className="bg-gray-900 text-white hover:bg-gray-800 py-5 px-4 w-full md:w-auto"
              >
                <Plus size={16} className="mr-2" /> Add more to your response
              </Button>
            </div>
          </Card>
        </div>

        {/* Add Question */}
        <div className="flex flex-col md:flex-row gap-4 p-8 py-0">
          {/* Left Section */}
          <div className="md:w-1/3 space-y-2">
            <h2 className="text-xl font-medium text-gray-700">Q&A</h2>
            <p className="text-sm text-gray-600">
              Add frequently asked questions and their answers to help students
              better understand your course.
            </p>
          </div>

          {/* Right Section */}
          <Card className="md:w-2/3 p-6 shadow-sm">
            <h3 className="text-gray-700 font-medium">Q/A</h3>
            <div className="space-y-4">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className={`rounded-md border transition-all ${
                    question.isOpen ? "shadow-md" : "border-transparen "
                  }`}
                >
                  {/* Question Header */}
                  <div
                    className="flex items-center justify-between p-4 bg-gray-100 rounded-t-md cursor-pointer"
                    onClick={() => toggleQuestion(question.id)}
                  >
                    <input
                      type="text"
                      value={question.title}
                      onChange={(e) =>
                        updateQuestionTitle(question.id, e.target.value)
                      }
                      onClick={(e) => e.stopPropagation()}
                      placeholder="Enter question title"
                      className="flex-1 bg-transparent outline-none text-base font-medium text-gray-800 placeholder:text-gray-500 mr-2"
                    />
                    <ChevronDown
                      size={20}
                      className={`transition-transform text-gray-600 ${
                        question.isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Answer Section */}
                  {question.isOpen && (
                    <div className="space-y-6">
                      {/* Toolbar + Editor */}
                      <div className="space-y-2">
                        <div className="border border-gray-200 rounded-md overflow-hidden">
                          <div className="flex gap-1 overflow-x-auto bg-gray-50 p-2 scrollbar-hide">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted"
                              onClick={() => execCommand("undo")}
                            >
                              <Undo className="h-5 w-5" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted"
                              onClick={() => execCommand("redo")}
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
                              onClick={() => execCommand("insertOrderedList")}
                            >
                              <OrderedListSvg />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted"
                              onClick={() => execCommand("insertUnorderedList")}
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

                      {/* Action Buttons */}
                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          type="button"
                          className="text-red-500 border-red-200 hover:bg-red-50"
                          onClick={() => deleteQuestion(question.id)}
                        >
                          <Trash2Icon className="h-4 w-4 mr-2" />
                          Delete Question
                        </Button>
                        <Button
                          type="button"
                          className="bg-gray-900 text-white hover:bg-gray-800"
                          onClick={() => toggleQuestion(question.id)}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Button
                variant="default"
                onClick={addQuestion}
                className="bg-gray-900 text-white hover:bg-gray-800 py-5 px-4"
              >
                <Plus size={16} className="mr-2" /> Add Question
              </Button>
            </div>
          </Card>
        </div>

        {/*  Testimonials Section */}
        <div className="flex flex-col md:flex-row gap-4 p-8 py-0">
          <div className="md:w-1/3 space-y-2">
            <h2 className="text-xl font-medium text-gray-700">Testimonials</h2>
            <p className="text-gray-600 text-sm">
              Share reviews and feedback from your previous students to build
              trust with potential learners.
            </p>
          </div>
          <Card className="md:w-2/3 p-6 shadow-sm">
            <h3 className="text-xl font-medium text-gray-700 ">Testimonials</h3>
            <div className="space-y-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="border rounded-md">
                  <div
                    className={`flex items-center justify-between p-4 bg-gray-100 rounded-t-md cursor-pointer ${
                      testimonial.isOpen ? "border-b border-gray-300" : ""
                    }`}
                    onClick={() => toggleTestimonial(testimonial.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={
                            typeof testimonial.avatarUrl === "string"
                              ? testimonial.avatarUrl
                              : testimonial.avatarUrl?.src || "/placeholder.svg"
                          }
                          alt={`${testimonial.firstName} ${testimonial.lastName}`}
                        />
                        <AvatarFallback>
                          {testimonial.firstName.charAt(0)}
                          {testimonial.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {testimonial.firstName} {testimonial.lastName}
                      </span>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${
                        testimonial.isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {testimonial.isOpen && (
                    <div className="p-4 pt-4">
                      <div className="space-y-6">
                        <div>
                          <label
                            htmlFor={`firstName-${testimonial.id}`}
                            className="block text-sm font-bold text-gray-900 mb-2"
                          >
                            First Name
                          </label>
                          <Input
                            id={`firstName-${testimonial.id}`}
                            value={testimonial.firstName}
                            onChange={(e) =>
                              updateTestimonial(
                                testimonial.id,
                                "firstName",
                                e.target.value
                              )
                            }
                            placeholder="First Name"
                            className="py-5 border-gray-300"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`lastName-${testimonial.id}`}
                            className="block text-sm font-bold text-gray-900 mb-2"
                          >
                            Last Name
                          </label>
                          <Input
                            id={`lastName-${testimonial.id}`}
                            value={testimonial.lastName}
                            onChange={(e) =>
                              updateTestimonial(
                                testimonial.id,
                                "lastName",
                                e.target.value
                              )
                            }
                            placeholder="Last Name"
                            className="py-5 border-gray-300"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`occupation-${testimonial.id}`}
                            className="block text-sm font-bold text-gray-900 mb-2"
                          >
                            Occupation
                          </label>
                          <Input
                            id={`occupation-${testimonial.id}`}
                            value={testimonial.occupation}
                            onChange={(e) =>
                              updateTestimonial(
                                testimonial.id,
                                "occupation",
                                e.target.value
                              )
                            }
                            placeholder="Occupation"
                            className="py-5 border-gray-300"
                          />
                        </div>

                        <div className="sm:border border-gray-300 sm:rounded-lg p-5 flex items-center gap-6 w-full bg-white max-sm:flex-col">
                          {/* Left Section - Label & Avatar */}
                          <div className="flex flex-col items-center max-sm:w-full">
                            <label className="text-gray-700 font-bold max-sm:self-start mb-6">
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
                              Recommended dimensions of <strong>100×100</strong>
                            </p>

                            <label className="flex max-sm:justify-center text-gray-700 text-md">
                              <span className="font-bold text-md ">
                                Change Avatar
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

                        <div className="mb-4">
                          <label
                            className="block font-bold text-gray-900 mb-2 text-sm"
                            htmlFor="thumbnail"
                          >
                            Thumbnail
                          </label>
                          <div className="border border-gray-300 rounded-md overflow-hidden">
                            <div className="flex items-center gap-6 p-4">
                              <div className="w-[150px] h-[90px] bg-gray-50-lg rounded flex items-center justify-center overflow-hidden">
                                {thumbnailPreview ? (
                                  <Image
                                    src={thumbnailPreview}
                                    alt="Thumbnail preview"
                                    width={600}
                                    height={200}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full rounded-md flex items-center justify-center bg-gray-100">
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
                              <div className="flex-1 mt-5">
                                <div className="text-sm  text-gray-900 mb-5">
                                  Recommended dimensions of{" "}
                                  <strong>1280×720</strong>
                                </div>
                                <button
                                  type="button"
                                  className="inline-flex items-center gap-2 px-4 py-3 font-semibold text-xs border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
                                  onClick={handleThumbnailUpload}
                                >
                                  Choose Testimonials image or video
                                  <ChevronDown className="w-4 h-4" />
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
                              onChange={(e) =>
                                handleFileChange(e, setThumbnailPreview)
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor={`testimonial-${testimonial.id}`}
                            className="block text-sm font-bold text-gray-900 mb-2"
                          >
                            Testimonial
                          </label>

                          <div className="space-y-6">
                            {/* Toolbar + Editor */}
                            <div className="space-y-2">
                              <div className="border border-gray-200 rounded-md overflow-hidden">
                                <div className="flex gap-1 overflow-x-auto bg-gray-50 p-2 scrollbar-hide">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted"
                                    onClick={() => execCommand("undo")}
                                  >
                                    <Undo className="h-5 w-5" />
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-9 min-w-9 rounded-md p-2 text-[#4F4F4F] hover:bg-muted"
                                    onClick={() => execCommand("redo")}
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

                        <div className="flex justify-between">
                          <Button
                            variant="outline"
                            type="button"
                            className="text-red-500 border-red-200 hover:bg-red-50"
                            onClick={() => deleteTestimonial(testimonial.id)}
                          >
                            <Trash2Icon className="h-4 w-4 mr-2" />
                            Delete Testimonial
                          </Button>
                          <Button
                            type="button"
                            className="bg-gray-900 text-white hover:bg-gray-800"
                            onClick={() => toggleTestimonial(testimonial.id)}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Button
                variant="default"
                onClick={addTestimonial}
                className="bg-gray-900 text-white hover:bg-gray-800 py-5 px-4"
              >
                <Plus size={16} className="mr-2" /> Add Testimonial
              </Button>
            </div>
          </Card>
        </div>

        {/*CPE Section */}
        <div className="flex flex-col md:flex-row gap-4 p-8 py-0">
          <div className="md:w-1/3 space-y-2">
            <h2 className="text-xl font-medium text-gray-700">CPE</h2>
            <p className="text-gray-600 text-sm">
              Configure Continuing Professional Education credits and
              requirements for your course.
            </p>
          </div>
          <Card className="md:w-2/3 p-6 shadow-sm">
            <h3 className="text-xl font-medium text-gray-700">CPE</h3>
            <div className="space-y-4">
              <div>
                <Input
                  id="cpe-credits"
                  value={cpeCredits}
                  onChange={(e) => setCpeCredits(e.target.value)}
                  placeholder="CPE credits"
                />
              </div>
              <div>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger className="w-full py-3">
                    {" "}
                    {/* Adjust py-3 as needed */}
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accounting">Accounting</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="management">Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={qualification} onValueChange={setQualification}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cpa">CPA</SelectItem>
                    <SelectItem value="cfa">CFA</SelectItem>
                    <SelectItem value="cma">CMA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </div>

   

        {/* Access Settings */}
        <div className="flex flex-col md:flex-row gap-4 p-8 py-0">
          <div className="md:w-1/3 pt-4">
           <h2 className='text-xl font-medium text-gray-700'>
							Learning Paths
						</h2>
            <p className="text-sm text-gray-500 mt-1">
              Create a structured learning journey by combining multiple courses
              into a comprehensive path.
            </p>
          </div>

          <div className="md:w-2/3 bg-white border p-4 px-6 rounded-lg ">
          	<h3 className='text-xl font-medium text-gray-700'>
							Learning Paths
						</h3>
          
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
                  <div className="space-y-4 mt-4">
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

              <div className="relative mb-4 mt-2">
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
      </div>
    </>
  );
};

export default DesktopLanding;
