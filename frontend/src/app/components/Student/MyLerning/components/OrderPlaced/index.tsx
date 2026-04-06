"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Otherdata from "./components/Otherdata";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  FileText,
  GraduationCapIcon as Graduation,
  Home,
  MessageSquare,
  MoreVertical,
  Play,
  RefreshCw,
  School,
  Users,
} from "lucide-react";
import BookReviewModal from "./components/AddReview";

export interface BillingInfo {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export interface Product {
  id: string;
  type: "course" | "community" | "certificate";
  title: string;
  image: string;
  stats: {
    [key: string]: {
      value: string | number;
      icon: string;
    };
  };
  labels: {
    text: string;
    color: string;
  }[];
  actions: {
    primary: {
      text: string;
      href: string;
    };
  };
  progress?: number;
}

export interface OrderAction {
  text: string;
  icon: string;
  onClick?: () => void; // Made optional since we'll set it dynamically
}

export interface FooterLink {
  icon: string;
  linkedTo: string;
  title: string;
  count?: string;
  href: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  total: string;
  billing: BillingInfo;
  products: Product[];
  actions: OrderAction[];
  footerLinks: FooterLink[];
}

export const sampleOrder: Order = {
  id: "1",
  orderNumber: "114-1803331-5761012",
  date: "December 24, 2024",
  total: "$55.62",
  billing: {
    name: "Mike Pence",
    address: {
      street: "123 Main Street",
      city: "Washington",
      state: "DC",
      zip: "20001",
      country: "United States",
    },
  },
  products: [
    {
      id: "course-1",
      type: "course",
      title: "How to Write Better Prompts",
      image: "https://i.ibb.co/jZjZ7ZRd/butterfly.webp",
      progress: 40,
      labels: [
        {
          text: "Course",
          color: "blue",
        },
      ],
      stats: {
        students: {
          value: "695 students",
          icon: "graduation",
        },
        created: {
          value: "Created Nov 1, 2024",
          icon: "calendar",
        },
      },
      actions: {
        primary: {
          text: "Go to Course",
          href: "#",
        },
      },
    },
    {
      id: "community-1",
      type: "community",
      title: "The Prompt Collective",
      image: "https://i.ibb.co/jZjZ7ZRd/butterfly.webp",
      labels: [
        {
          text: "Community",
          color: "amber",
        },
      ],
      stats: {
        members: {
          value: "1.6k",
          icon: "users",
        },
        messages: {
          value: "4.2k",
          icon: "messageSquare",
        },
        sessions: {
          value: "9",
          icon: "play",
        },
        created: {
          value: "Created Jan 25, 2024",
          icon: "calendar",
        },
      },
      actions: {
        primary: {
          text: "Go to Community",
          href: "#",
        },
      },
    },
    {
      id: "certificate-1",
      type: "certificate",
      title: "Certificate of Prompt Mastery",
      image: "https://i.ibb.co/jZjZ7ZRd/butterfly.webp",
      labels: [
        {
          text: "Certificate",
          color: "green",
        },
      ],
      stats: {
        issued: {
          value: "67 certificates issued",
          icon: "fileText",
        },
        date: {
          value: "Issued Oct 15, 2024",
          icon: "calendar",
        },
      },
      actions: {
        primary: {
          text: "View Certificate",
          href: "#",
        },
      },
    },
  ],
  actions: [
    {
      text: "View School",
      icon: "school",
      onClick: () => console.log("View School clicked"),
    },
    {
      text: "Request Refund",
      icon: "refreshCw",
      onClick: () => console.log("Request Refund clicked"),
    },
    {
      text: "Leave Review",
      icon: "messageSquare",
      onClick: undefined, // We'll set this dynamically in the component
    },
    {
      text: "Archive",
      icon: "home",
      onClick: () => console.log("Archive clicked"),
    },
  ],
  footerLinks: [
    {
      icon: "play",
      linkedTo: "Design Fundamentals • UX Principles",
      count: "5 sessions",
      title: "Linked to",
      href: "#",
    },
    {
      icon: "messageSquare",
      linkedTo: "Prompt Engineering Hub",
      title: "Linked to",
      href: "#",
    },
  ],
};

export default function OrderPlaced() {
  const [showBillingTooltip, setShowBillingTooltip] = useState(false);
  const [showReview, setShowReview] = useState(false);

  // Create a copy of the order to modify the onClick function safely
  const order = {...sampleOrder};
  
  // Find the "Leave Review" action and update its onClick handler
  const reviewActionIndex = order.actions.findIndex(action => action.text === "Leave Review");
  if (reviewActionIndex >= 0) {
    order.actions[reviewActionIndex] = {
      ...order.actions[reviewActionIndex],
      onClick: () => setShowReview(true)
    };
  }

  // Helper function to get the right icon component
  const getIcon = (iconName: string, className = "w-4 h-4 text-gray-600") => {
    switch (iconName) {
      case "graduation":
        return <Graduation className={className} />;
      case "calendar":
        return <Calendar className={className} />;
      case "users":
        return <Users className={className} />;
      case "messageSquare":
        return <MessageSquare className={className} />;
      case "play":
        return <Play className={className} />;
      case "fileText":
        return <FileText className={className} />;
      case "school":
        return <School className={className} />;
      case "refreshCw":
        return <RefreshCw className={className} />;
      case "home":
        return <Home className={className} />;
      default:
        return null;
    }
  };

  // Helper function to get the right color for labels
  const getLabelColor = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-700";
      case "amber":
        return "bg-amber-100 text-amber-700";
      case "green":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Order Header */}
      <div className="flex flex-col md:flex-row justify-between p-5 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">ORDER PLACED</span>
            <span className="text-sm font-semibold">{order.date}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">TOTAL</span>
            <span className="text-sm font-semibold">{order.total}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">BILLING</span>
            <div
              className="flex items-center gap-1 cursor-pointer relative"
              onMouseEnter={() => setShowBillingTooltip(true)}
              onMouseLeave={() => setShowBillingTooltip(false)}
            >
              <span className="text-sm font-semibold">{order.billing.name}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />

              {showBillingTooltip && (
                <div className="absolute top-full left-0 mt-2 bg-white p-4 rounded-lg shadow-lg z-10 min-w-60">
                  <div className="font-semibold mb-2">{order.billing.name}</div>
                  <div className="text-sm text-gray-500 leading-relaxed">
                    {order.billing.address.street}
                    <br />
                    {order.billing.address.city}, {order.billing.address.state}{" "}
                    {order.billing.address.zip}
                    <br />
                    {order.billing.address.country}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="text-right mt-4 md:mt-0">
          <div className="text-sm mb-1">ORDER # {order.orderNumber}</div>
          <Link href="#" className="text-sm text-cyan-600 hover:underline">
            View invoice
          </Link>
        </div>
      </div>

      {/* Products Container */}
      <div className="flex flex-col lg:flex-row p-6">
        <div className="flex-1">
          {order.products.map((product, index) => (
            <div
              key={product.id}
              className={`flex flex-col md:flex-row gap-4 py-5 ${
                index < order.products.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <div className="w-full md:w-[150px] h-[80px] flex-shrink-0">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={`${product.title} Image`}
                  width={150}
                  height={80}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between min-h-[80px]">
                <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                  {product.title}
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-2">
                      {product.labels.map((label, i) => (
                        <span
                          key={i}
                          className={`px-3.5 py-1 text-xs font-semibold rounded-full ${getLabelColor(
                            label.color
                          )}`}
                        >
                          {label.text}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-2 md:mt-0">
                      {product.progress !== undefined && (
                        <div className="flex items-center gap-3">
                          <div className="relative w-6 h-6">
                            <svg
                              viewBox="0 0 24 24"
                              className="w-6 h-6 -rotate-90"
                            >
                              <circle
                                className="stroke-gray-200"
                                cx="12"
                                cy="12"
                                r="10"
                                fill="none"
                                strokeWidth="2.5"
                              />
                              <circle
                                className="stroke-cyan-500"
                                cx="12"
                                cy="12"
                                r="10"
                                fill="none"
                                strokeWidth="2.5"
                                strokeDasharray="62.8318530718"
                                strokeDashoffset={`${
                                  62.8318530718 * (1 - product.progress / 100)
                                }`}
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                          <span className="text-sm font-semibold text-cyan-500">
                            {product.progress}% Progress
                          </span>
                        </div>
                      )}

                      {Object.entries(product.stats).map(([key, stat]) => (
                        <div key={key} className="flex items-center gap-1.5">
                          {getIcon(stat.icon)}
                          <span className="text-sm text-gray-700">
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Link
                      href={product.actions.primary.href}
                      className="px-4 py-1.5 text-sm bg-cyan-500 hover:bg-cyan-600 text-white rounded-md transition-colors flex items-center gap-2"
                    >
                      {product.actions.primary.text}
                    </Link>
                    <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Actions */}
        <div className="lg:border-l border-gray-200 lg:pl-6 mt-6 justify-center lg:mt-0 flex flex-col gap-3 lg:min-w-40">
          {order.actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              {getIcon(action.icon)}
              <span>{action.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Review popup */}
      {showReview && (
        <div className="fixed inset-0 z-50">
          <BookReviewModal onClose={() => setShowReview(false)} />
        </div>
      )}

      {/* Card Footer */}
      <div className="bg-gray-50 border-t border-gray-200 p-3 flex flex-wrap gap-4">
        {order.footerLinks.map((link, index) => (
          <div key={index} className="flex items-center">
            <Link
              href={link.href}
              className="group cursor-pointer flex items-center gap-4 px-1 py-0.5 rounded hover:bg-cyan-50 transition-colors"
            >
              <div className="relative w-[18px] h-[18px] bg-white rounded-full flex items-center justify-center">
                <div className="absolute inset-0 border-[1.5px] border-cyan-500 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent"></div>
                {getIcon(link.icon, "w-3.5 h-3.5 text-cyan-500")}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500">{link.title} </span>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-800 group-hover:text-cyan-500 group-hover:underline">
                    {link.linkedTo}
                  </span>
                  {link.count && (
                    <span className="text-gray-500 pl-2 border-l border-gray-300 group-hover:text-cyan-500 group-hover:underline">
                      {link.count}
                    </span>
                  )}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500" />
            </Link>
          </div>
        ))}
      </div>
    </div>
          <Otherdata/>
  </>

  );
}