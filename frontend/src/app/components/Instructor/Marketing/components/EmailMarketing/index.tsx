"use client";
import React, { ChangeEvent } from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Bold, ChevronDown, Italic, Redo, Search, Undo, X, Plus, Mail, ChevronLeft, ChevronRight, MoreVertical, Users, Check, FileText } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/app/components/ui/drawer";
import { PRODUCT_DATA } from "@/constants";
import {
  MailIcon,
  MailSvg,
  MegaPhoneSvg,
  PlatformSvg,
} from "@/app/components/svg";
import CalendarPopup from "./CalendarPopup";
import { toast } from "react-toastify";

// Sample email data
const sampleEmails = [
  {
    id: 1,
    type: "marketing",
    title: "Welcome to Our Platform",
    status: "SENT",
    sentDate: "Fri, Dec 25, 2024 4:22 PM",
    products: [
      {
        id: 1,
        name: "AI for Beginners",
        image: "https://i.ibb.co/XkdtT1Yj/product2.png",
      },
      {
        id: 2,
        name: "Machine Learning Basics",
        image: "https://i.ibb.co/5NTkykV/product3.jpg",
      },
      {
        id: 3,
        name: "Deep Learning Masterclass",
        image: "https://i.ibb.co/60MjrnYw/product1.webp",
      },
      {
        id: 4,
        name: "Python for Data Science",
        image: "https://i.ibb.co/XkdtT1Yj/product2.png",
      },
      {
        id: 5,
        name: "JavaScript Fundamentals",
        image: "https://i.ibb.co/5NTkykV/product3.jpg",
      },
      {
        id: 6,
        name: "Web Development Bootcamp",
        image: "https://i.ibb.co/60MjrnYw/product1.webp",
      },
    ],
    stats: {
      sent: 104,
      opened: 33,
      clicked: 15,
      unsubscribed: 2,
    },
  },
  {
    id: 2,
    type: "announcement",
    title: "New Course Announcement",
    status: "SCHEDULED",
    sentDate: "Fri, Dec 30, 2024 10:00 AM",
    products: [
      {
        id: 1,
        name: "Python Programming",
        image: "https://i.ibb.co/XkdtT1Yj/product2.png",
      },
      {
        id: 2,
        name: "Web Development",
        image: "https://i.ibb.co/5NTkykV/product3.jpg",
      },
      {
        id: 3,
        name: "Mobile App Development",
        image: "https://i.ibb.co/60MjrnYw/product1.webp",
      },
      {
        id: 4,
        name: "UI/UX Design",
        image: "https://i.ibb.co/XkdtT1Yj/product2.png",
      },
    ],
    stats: {
      sent: null,
      opened: null,
      clicked: null,
      unsubscribed: null,
    },
  },
  {
    id: 3,
    type: "marketing",
    title: "Summer Sale Promotion",
    status: "DRAFT",
    sentDate: null,
    savedDate: "Fri, Dec 15, 2024 2:30 PM",
    products: [
      {
        id: 1,
        name: "Data Science Bootcamp",
        image: "https://i.ibb.co/XkdtT1Yj/product2.png",
      },
      {
        id: 2,
        name: "Full Stack Development",
        image: "https://i.ibb.co/60MjrnYw/product1.webp",
      },
    ],
    stats: {
      sent: null,
      opened: null,
      clicked: null,
      unsubscribed: null,
    },
  },
  {
    id: 4,
    type: "announcement",
    title: "Platform Updates",
    status: "SENT",
    sentDate: "Fri, Dec 20, 2024 9:15 AM",
    products: [
      { id: 1, name: "All Users", image: "https://i.ibb.co/5NTkykV/product3.jpg" },
    ],
    stats: {
      sent: 4761,
      opened: 2103,
      clicked: 892,
      unsubscribed: 12,
    },
  },
  {
    id: 5,
    type: "marketing",
    title: "Black Friday Deals",
    status: "SCHEDULED",
    sentDate: "Fri, Nov 29, 2024 6:00 AM",
    products: [
      {
        id: 1,
        name: "All Courses",
        image: "https://i.ibb.co/XkdtT1Yj/product2.png",
      },
    ],
    stats: {
      sent: null,
      opened: null,
      clicked: null,
      unsubscribed: null,
    },
  },
  {
    id: 6,
    type: "announcement",
    title: "New Instructor Onboarding",
    status: "DRAFT",
    sentDate: null,
    savedDate: "Fri, Dec 10, 2024 1:15 PM",
    products: [
      {
        id: 1,
        name: "Instructor Community",
        image: "https://i.ibb.co/60MjrnYw/product1.webp",
      },
    ],
    stats: {
      sent: null,
      opened: null,
      clicked: null,
      unsubscribed: null,
    },
  },
  {
    id: 7,
    type: "marketing",
    title: "Course Completion Certificates",
    status: "SENT",
    sentDate: "Fri, Dec 15, 2024 3:30 PM",
    products: [
      {
        id: 1,
        name: "Active Students",
        image: "https://i.ibb.co/XkdtT1Yj/product2.png",
      },
    ],
    stats: {
      sent: 1243,
      opened: 987,
      clicked: 756,
      unsubscribed: 3,
    },
  },
  {
    id: 8,
    type: "announcement",
    title: "Maintenance Notification",
    status: "SCHEDULED",
    sentDate: "Fri, Jan 5, 2025 2:00 AM",
    products: [
      { id: 1, name: "All Users", image: "https://i.ibb.co/5NTkykV/product3.jpg" },
    ],
    stats: {
      sent: null,
      opened: null,
      clicked: null,
      unsubscribed: null,
    },
  },
];

// Enhanced search function for flexible matching
const searchMatches = (searchQuery: string, title: string): boolean => {
  if (!searchQuery.trim()) return true;

  const query = searchQuery.toLowerCase().trim();
  const titleLower = title.toLowerCase();

  // Direct substring match (original behavior)
  if (titleLower.includes(query)) {
    return true;
  }

  // Split search query into individual words
  const searchWords = query.split(/\s+/).filter((word) => word.length > 0);
  const titleWords = titleLower.split(/\s+/);

  // Check if all search words are found in the title (in any order)
  const allWordsMatch = searchWords.every((searchWord) =>
    titleWords.some((titleWord) => titleWord.includes(searchWord))
  );

  if (allWordsMatch) {
    return true;
  }

  // Check for partial word matches (fuzzy matching)
  const partialMatches = searchWords.filter((searchWord) =>
    titleWords.some(
      (titleWord) =>
        titleWord.includes(searchWord) || searchWord.includes(titleWord)
    )
  );

  // Return true if at least 70% of search words have partial matches
  return partialMatches.length >= Math.ceil(searchWords.length * 0.7);
};

// Custom PaginationMenu component
const PaginationMenu = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[#3B6E91]">Show</span>
      <select className="border border-gray-300 rounded px-2 py-1 text-sm text-[#3B6E91] focus:outline-none focus:border-[#13C4CC]">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
      <span className="text-sm text-[#3B6E91]">per page</span>
    </div>
  );
};

type Product = {
  id: number;
  name?: string;
  title: string;
  type: string;
  image: string;
  status: string;
  price: string;
  students: string;
  lastActivity: string;
  action: string;
  createdAt: string;
  updatedAt: string;
  enrolled?: number;
  emailsRemaining?: string;
};

const EmailMarketing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCalender, setIsOpenCalender] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [isNewEmailDrawerOpen, setIsNewEmailDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const itemsPerPage = 8;
  const [emails, setEmails] = useState(sampleEmails);
  const modalRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [productId, setProductId] = useState<number | null>(null);
  const [sampleProducts, setProduct] = useState<Product[]>(PRODUCT_DATA);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [foundProduct, setFoundProduct] = useState<Product | null>(null);
  const searchParams = useSearchParams();
  const encryptedId = searchParams.get("product_id");

  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    subject: string;
    products: Product[];
    type: string;
    content: string;
  }>({
    title: "",
    subject: "",
    products: [],
    type: "Announcement",
    content: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveDraft = () => {
    const { type, title, products } = formData;

    // 🔍 Validate required fields
    if (!title?.trim()) {
      toast.error("Title is required.");
      return;
    }

    if (!type?.trim()) {
      toast.error("Type is required.");
      return;
    }

    if (!products || !products.length) {
      toast.error("At least one product is required.");
      return;
    }

    // Optional: check if any product is missing an ID or name
    const invalidProduct = products.find((p) => !p.id || !(p.title || p.name));
    if (invalidProduct) {
      toast.error("Each product must have an ID and a name.");
      return;
    }
    const newDraft = {
      id: emails.length + 1, // Consider using uuid or nanoid for production
      type: formData.type,
      title: formData.title,
      status: "DRAFT",
      savedDate: new Date().toISOString(),
      sentDate: null,
      products: formData.products.map((p) => ({
        id: p.id,
        name: (p.title || p.name || "Untitled Product").toString(), // Ensure name is always a string
        image: p.image || "https://i.ibb.co/5NTkykV/product3.jpg",
      })),
      stats: {
        sent: null,
        opened: null,
        clicked: null,
        unsubscribed: null,
      },
    };

    setEmails((prevEmails) => [...prevEmails, newDraft]);
    toast.success(newDraft.status + " saved successfully.");
    setIsOpen(false);
    setIsNewEmailDrawerOpen(false)
    setSelectedProducts([]);
  };
  const handleConfirmDate = () => {
    console.log(selectedDateTime)

    if (selectedDateTime) {
      const formattedDate = selectedDateTime.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      
      const { type, title, products } = formData;
      // 🔍 Validate required fields
      if (!title?.trim()) {
        toast.error("Title is required.");
        return;
      }

      if (!type?.trim()) {
        toast.error("Type is required.");
        return;
      }

      if (!products || !products.length) {
        toast.error("At least one product is required.");
        return;
      }
      const newDraft = {
        id: emails.length + 1, // Consider using uuid or nanoid for production
        type: formData.type,
        title: formData.title,
        status: "SCHEDULED",
        savedDate: formattedDate,
        sentDate: null,
        products: formData.products.map((p) => ({
          id: p.id,
          name: (p.title || p.name || "Untitled Product").toString(), // Ensure name is always a string
          image: p.image || "https://i.ibb.co/5NTkykV/product3.jpg",
        })),
        stats: {
          sent: null,
          opened: null,
          clicked: null,
          unsubscribed: null,
        },
      };

      setEmails((prevEmails) => [...prevEmails, newDraft]);
      toast.success(newDraft.status + " saved successfully.");
      console.log(emails);
      setIsOpenCalender(false);
      setIsNewEmailDrawerOpen(false)
      setIsOpen(false);
      setSelectedProducts([]);
    }
    setIsOpenCalender(false);
  };

  // Decode product ID from URL if present
  useEffect(() => {
    if (encryptedId) {
      try {
        const decoded = atob(encryptedId);
        const numericId = Number(decoded);
        if (!isNaN(numericId)) {
          setProductId(numericId);
          setProduct([]);
          console.log("Decoded product_id:", numericId);
        } else {
          console.error("Decoded product_id is not a valid number:", decoded);
        }
      } catch (error) {
        console.error("Failed to decode product_id:", error);
      }
    } else {
      console.warn("No product_id found in search params");
    }
  }, [encryptedId]);

  // Find product by ID
  useEffect(() => {
    if (productId !== null) {
      const product = PRODUCT_DATA.find((p) => p.id === productId);
      if (product) {
        setFoundProduct(product);
        // Auto-select the product if found
        if (!selectedProducts.some((p) => p.id === product.id)) {
          setSelectedProducts([...selectedProducts, product]);
        }
      }
    }
  }, [productId, selectedProducts]);

  useEffect(() => {
    if (productId !== null) {
      setIsNewEmailDrawerOpen(true);
    }
  }, [productId]);

  const router = useRouter();

  const removeParam = () => {
    setProductId(null);
    setSelectedProducts([]);
    router.replace(window.location.pathname + window.location.hash);
  };

  // Initialize emails
  useEffect(() => {
    const fetchData = async () => {
      setEmails(sampleEmails);
    };
    fetchData();
  }, []);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen || isNewEmailDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, isNewEmailDrawerOpen]);

  const openNewEmailDrawer = () => {
    setIsNewEmailDrawerOpen(true);
  };

  const closeNewEmailDrawer = () => {
    setIsNewEmailDrawerOpen(false);
    setSelectedProducts([]);
    setProductSearchQuery("");
  };

  // Filter products based on search query with enhanced matching and exclude selected products
  const filteredProducts = sampleProducts.filter((product) => {
    // First check if product matches search query
    const matchesSearch = searchMatches(productSearchQuery, product.title);

    // Then check if product is not already selected
    const notSelected = !selectedProducts.some(
      (selected) => selected.id === product.id
    );

    return matchesSearch && notSelected;
  });

  // Handle product selection
  const toggleProductSelection = (product: Product) => {
    if (selectedProducts.some((p) => p.id === product.id)) {
      // Remove from selected products
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else {
      // Add to selected products
      setSelectedProducts([...selectedProducts, product]);
    }
    setFormData((prev) => {
      const isSelected = prev.products.some((p) => p.id === product.id);
      const updatedProducts = isSelected
        ? prev.products.filter((p) => p.id !== product.id)
        : [...prev.products, product];

      return {
        ...prev,
        products: updatedProducts,
      };
    });
  };

  // Filter and sort emails based on active tab, search query, and filter status with enhanced search
  const filteredEmails = emails
    .filter((email) => {
      // Filter by tab
      if (activeTab !== "All" && email.status !== activeTab.toUpperCase()) {
        return false;
      }

      // Filter by search query using enhanced matching
      if (searchQuery && !searchMatches(searchQuery, email.title)) {
        return false;
      }

      // Filter by status dropdown
      if (filterStatus && email.status !== filterStatus) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Get the relevant date for sorting
      type Email = {
        id: number;
        type: string;
        title: string;
        status: string;
        sentDate?: string | null;
        savedDate?: string | null;
        products: { id: number; name: string; image: string }[];
        stats: {
          sent: number | null;
          opened: number | null;
          clicked: number | null;
          unsubscribed: number | null;
        };
      };

      const getDateForSorting = (email: Email) => {
        if (email.status === "DRAFT" && email.savedDate) {
          return new Date(email.savedDate).getTime();
        } else if (email.sentDate) {
          return new Date(email.sentDate).getTime();
        }
        return email.id; // fallback to ID
      };

      if (sortOrder === "Newest") {
        return getDateForSorting(b) - getDateForSorting(a);
      } else {
        return getDateForSorting(a) - getDateForSorting(b);
      }
    });

  // Get current page emails
  const indexOfLastEmail = currentPage * itemsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - itemsPerPage;
  const currentEmails = filteredEmails.slice(
    indexOfFirstEmail,
    indexOfLastEmail
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, filterStatus, sortOrder]);

  // Handle individual email selection
  const toggleEmailSelection = (emailId: number) => {
    if (selectedEmails.includes(emailId)) {
      setSelectedEmails(selectedEmails.filter((id) => id !== emailId));
      setSelectAll(false);
    } else {
      setSelectedEmails([...selectedEmails, emailId]);
      if (selectedEmails.length + 1 === filteredEmails.length) {
        setSelectAll(true);
      }
    }
  };

  // Handle click outside calendar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpenCalender &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        modalRef.current &&
        modalRef.current.contains(event.target as Node)
      ) {
        setIsOpenCalender(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenCalender]);

  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <>
        <div className="mb-20">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-[1.5rem] font-semibold text-[#142E53] tracking-[-0.025em]">
              Email Marketing
            </h1>
            <button
              className="flex items-center gap-1.5 rounded-md bg-[#13C4CC] px-4 py-2 text-sm font-semibold text-white"
              onClick={openNewEmailDrawer}
            >
              <Plus className="h-4 w-4" />
              New Email
            </button>
          </div>

          {/* Search Section */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3B6E91]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm"
              placeholder="Search emails..."
            />
            {searchQuery.length > 0 && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="mb-4 grid grid-cols-2 gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex items-center justify-center gap-1 rounded-md border border-gray-200 bg-white py-2 text-xs text-[#3B6E91] appearance-none pl-4 pr-8 relative"
            >
              <option value="">Filter by Status</option>
              <option value="SENT">Sent</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="DRAFT">Draft</option>
            </select>
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="flex items-center justify-center gap-1 rounded-md border border-gray-200 bg-white py-2 text-xs text-[#3B6E91] appearance-none pl-4 pr-8 w-full"
              >
                <option value="Newest">Sort: Newest</option>
                <option value="Oldest">Sort: Oldest</option>
              </select>
              <ChevronDown className="h-3 w-3 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#3B6E91]" />
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-4 flex gap-4 overflow-x-auto border-b border-gray-200 pb-0.5">
            {["All", "Sent", "Scheduled", "Draft"].map((tab) => (
              <button
                key={tab}
                className={`whitespace-nowrap px-1 py-2 text-sm font-semibold ${
                  activeTab === tab
                    ? "relative text-[#13C4CC] after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-0.5 after:bg-[#13C4CC]"
                    : "text-[#343332]"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Email Cards */}
          {currentEmails.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No emails found matching your criteria.
            </div>
          ) : (
            currentEmails.map((email) => (
              <div
                key={email.id}
                className={`${
                  email.id !== currentEmails[0].id ? "mt-3" : ""
                } cursor-pointer rounded-xl bg-white p-4 shadow-sm`}
              >
                <div className="mb-3">
                  <div className="flex gap-3">
                    <div
                      className="w-[40px] h-[40px] items-center justify-center relative inline-flex rounded-lg group 
                             bg-[#D3F8DF]"
                    >
                      {email.type === "marketing" ? (
                        <PlatformSvg className="h-5 w-5 fill-green-900" />
                      ) : (
                        <MailIcon className="h-7 w-7  fill-green-900" />
                      )}
                    </div>

                    <div className="mb-1 text-sm font-semibold text-[#343332]">
                      {email.title}

                      <div className=" items-center gap-6 relative flex ">
                        <span
                          className={`rounded-full ${
                            email.status === "SENT"
                              ? "bg-[rgba(2,197,175,0.1)] text-[#02C5AF]"
                              : email.status === "SCHEDULED"
                              ? "bg-[rgba(19,196,204,0.1)] text-[#13C4CC]"
                              : "bg-[rgba(107,114,128,0.1)] text-[#6B7280]"
                          } px-2 py-1 text-xs font-semibold`}
                        >
                          {email.status === "SENT"
                            ? "SENT"
                            : email.status === "SCHEDULED"
                            ? "SCHEDULED"
                            : "DRAFT"}
                        </span>
                        <div className="flex items-center  my-3">
                          <div className="flex -space-x-2">
                            {email.products.slice(0, 3).map((product, idx) => (
                              <div
                                key={idx}
                                className="h-6 w-6 overflow-hidden rounded-full border-2 border-white shadow-sm"
                              >
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={`Product ${idx + 1}`}
                                  width={24}
                                  height={24}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            ))}
                            {email.products.length > 3 && (
                              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#F1F3F6] text-xs font-semibold text-[#3B6E91] shadow-sm">
                                +{email.products.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex items-center ml-7 my-3">
                    <div className="flex -space-x-2">
                      {email.products.slice(0, 3).map((product, idx) => (
                        <div
                          key={idx}
                          className="h-6 w-6 overflow-hidden rounded-full border-2 border-white shadow-sm"
                        >
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={`Product ${idx + 1}`}
                            width={24}
                            height={24}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                      {email.products.length > 3 && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#F1F3F6] text-xs font-semibold text-[#3B6E91] shadow-sm">
                          +{email.products.length - 3}
                        </div>
                      )}
                    </div>
                  </div> */}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-md bg-[#F9FAFB] p-2 text-center">
                    <div className="text-xs text-[#64748B]">Sent</div>
                    <div className="text-sm font-semibold text-[#343332]">
                      {email.stats.sent ?? "-"}
                    </div>
                  </div>
                  <div className="rounded-md bg-[#F9FAFB] p-2 text-center">
                    <div className="text-xs text-[#64748B]">Opened</div>
                    <div className="text-sm font-semibold text-[#343332]">
                      {email.stats.opened ?? "-"}
                    </div>
                  </div>
                  <div className="rounded-md bg-[#F9FAFB] p-2 text-center">
                    <div className="text-xs text-[#64748B]">Clicked</div>
                    <div className="text-sm font-semibold text-[#343332]">
                      {email.stats.clicked ?? "-"}
                    </div>
                  </div>
                  <div className="rounded-md bg-[#F9FAFB] p-2 text-center">
                    <div className="text-xs text-[#64748B]">Unsubscribed</div>
                    <div className="text-sm font-semibold text-[#343332]">
                      {email.stats.unsubscribed ?? "-"}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Mobile Pagination */}
          {filteredEmails.length > itemsPerPage && (
            <div className="flex justify-center mt-4">
              <div className="flex items-center gap-2">
                <button
                  className="w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333] transition-all duration-200 hover:bg-[#f5f5f5]"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from({
                  length: Math.ceil(filteredEmails.length / itemsPerPage) || 1,
                }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 border rounded-md flex items-center justify-center cursor-pointer transition-all duration-200 ${
                      currentPage === index + 1
                        ? "bg-[#333] text-white border-[#333]"
                        : "bg-white text-[#333] border-[#e0e0e0] hover:bg-[#f5f5f5]"
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className="w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333] transition-all duration-200 hover:bg-[#f5f5f5]"
                  onClick={() =>
                    setCurrentPage(
                      Math.min(
                        Math.ceil(filteredEmails.length / itemsPerPage) || 1,
                        currentPage + 1
                      )
                    )
                  }
                  disabled={
                    currentPage ===
                    (Math.ceil(filteredEmails.length / itemsPerPage) || 1)
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* New Email Drawer */}
        {isNewEmailDrawerOpen && (
          <>
            {/* Calendar Popup */}

            <Drawer open={isNewEmailDrawerOpen} onClose={closeNewEmailDrawer}>
              <DrawerContent>
                <DrawerHeader className="border-b py-0 mb-4">
                  <div className="mb-5 flex items-center justify-between">
                    <DrawerTitle className="text-lg font-semibold text-[#142E53]">
                      Create New Email
                    </DrawerTitle>
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-[#3B6E91]"
                      onClick={closeNewEmailDrawer}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </DrawerHeader>
                <section className="overflow-y-auto px-4">
                  <div className="mb-4">
                    <label className="mb-1.5 block text-sm font-semibold text-[#142E53]">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-[#13C4CC] focus:outline-none focus:ring-2 focus:ring-[#13C4CC] focus:ring-opacity-10"
                      placeholder="Enter email name"
                      onChange={handleChange}
                      name="title"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="mb-1.5 block text-sm font-semibold text-[#142E53]">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-[#13C4CC] focus:outline-none focus:ring-2 focus:ring-[#13C4CC] focus:ring-opacity-10"
                      placeholder="Enter email subject"
                      onChange={handleChange}
                      name="subject"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="mb-1.5 block text-sm font-semibold text-[#142E53]">
                      Products
                    </label>
                    <div className="mb-2 flex flex-wrap gap-2">
                      {selectedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-1 bg-[#F1F5F9] px-2 py-1 rounded-md"
                        >
                          <span className="text-xs font-medium">
                            {product.title}
                          </span>
                          <button
                            onClick={() => toggleProductSelection(product)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3B6E91]" />
                      <input
                        type="text"
                        value={productSearchQuery}
                        onChange={(e) => setProductSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 p-3 pl-10 pr-10 text-sm focus:border-[#13C4CC] focus:outline-none focus:ring-2 focus:ring-[#13C4CC] focus:ring-opacity-10"
                        placeholder="Search products..."
                      />
                      {productSearchQuery.length > 0 && (
                        <button
                          onClick={() => setProductSearchQuery("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-gray-200">
                      {filteredProducts.length === 0 ? (
                        <div className="p-4 text-center text-gray-500 text-sm">
                          {productSearchQuery
                            ? "No products found matching your search."
                            : "No products available."}
                        </div>
                      ) : (
                        filteredProducts.map((product) => (
                          <div
                            key={product.id}
                            className="gap-3 border-b border-gray-200 p-3 cursor-pointer hover:bg-gray-50 last:border-b-0"
                            onClick={() => toggleProductSelection(product)}
                          >
                            <div className="flex gap-2">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.title}
                                width={48}
                                height={48}
                                className="h-12 w-12 rounded-md object-cover"
                              />
                              <div>
                                <div className="text-sm font-semibold text-gray-900">
                                  {product.title}
                                </div>
                                <span
                                  className={`inline-flex px-2.5 py-1 rounded-[4px] text-[0.75rem] leading-none ${
                                    product.type === "Course"
                                      ? "text-[#1C4ED8] bg-[#DBE9FE]"
                                      : product.type === "Event"
                                      ? "text-[#059669] bg-[#D1FAE5]"
                                      : product.type === "School"
                                      ? "text-[#DC2626] bg-[#FEE2E2]"
                                      : "text-[#1C4ED8] bg-[#DBE9FE]"
                                  }`}
                                >
                                  {product.type}
                                </span>
                                <div className="flex gap-5 mt-1">
                                  <div className="flex items-center gap-2 px-3 py-1 rounded text-xs text-gray-700 relative group">
                                    <span className="w-[16px] h-[16px] text-[#6B7280]">
                                      <Users className="h-4 w-4" />
                                    </span>
                                    <span>{product.enrolled}</span>
                                    <span className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#142e53] text-white px-3 py-2 rounded-md text-[0.75rem] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                      {product.enrolled} students enrolled
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded text-xs text-gray-700 relative group">
                                    <span className="w-[16px] h-[16px] text-[#6B7280]">
                                      <Mail className="h-4 w-4" />
                                    </span>
                                    <span>
                                      {product.emailsRemaining} emails
                                    </span>
                                    <span className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#142e53] text-white px-3 py-2 rounded-md text-[0.75rem] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                      emails remaining
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-1.5 block text-sm font-semibold text-[#142E53]">
                      Email Type
                    </label>
                    <select
                      onChange={handleChange}
                      name="type"
                      className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-[#13C4CC] focus:outline-none focus:ring-2 focus:ring-[#13C4CC] focus:ring-opacity-10"
                    >
                      <option value="Announcement">Announcement</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="mb-1.5 block text-sm font-semibold text-[#142E53]">
                      Content
                    </label>
                    <div className="flex gap-2 overflow-x-auto rounded-t-lg bg-[#F9FAFB] p-2 border border-gray-200">
                      <button
                        className="p-1.5 text-[#3B6E91] hover:bg-gray-200 rounded"
                        onClick={() => document.execCommand("bold")}
                      >
                        <Bold className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 text-[#3B6E91] hover:bg-gray-200 rounded"
                        onClick={() => document.execCommand("italic")}
                      >
                        <Italic className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 text-[#3B6E91] hover:bg-gray-200 rounded"
                        onClick={() => document.execCommand("undo")}
                      >
                        <Undo className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 text-[#3B6E91] hover:bg-gray-200 rounded"
                        onClick={() => document.execCommand("redo")}
                      >
                        <Redo className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 text-[#3B6E91] hover:bg-gray-200 rounded"
                        onClick={() =>
                          document.execCommand("formatBlock", false, "<p>")
                        }
                      >
                        <FileText className="h-4 w-4" />
                      </button>
                    </div>
                    <textarea
                      className="w-full min-h-[200px] p-4 border border-[#E5E7EB] rounded-b-[6px] text-sm leading-6 transition-all duration-200 focus:outline-none focus:border-[#13C4CC] focus:ring-4 focus:ring-[#13C4CC]/10"
                      onChange={handleChange}
                      name="content"
                      style={{ outline: "none", resize: "vertical" }}
                    >
                      Hello,
                      Write your email content here...
                    </textarea>
                  </div>
                </section>
                {isOpenCalender && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999]">
                    <div className="bg-white border shadow-md min-w-[300px] p-4 rounded-md mx-4">
                      <CalendarPopup
                        onDateSelect={(date) => setSelectedDateTime(date)}
                      />
                      <div className="flex justify-end gap-2 mt-4">
                        <button
                          className="bg-white border text-[#3B6E91] px-5 py-2.5 rounded-[6px] text-sm font-semibold cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsOpenCalender(false);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="text-white px-5 py-2.5 rounded-md bg-[#13C4CC] text-sm font-semibold cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleConfirmDate();
                          }}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <DrawerFooter>
                  <div className="flex gap-2 border-t border-gray-200 pt-4">
                    {/* <button className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-semibold text-[#3B6E91]">
                      Preview
                    </button> */}
                    <button
                      className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-semibold text-[#3B6E91]"
                      onClick={() => setIsOpenCalender(true)}
                    >
                      Schedules
                    </button>
                    <button
                      className="hover:border-[#13C4CC] hover:text-[#13C4CC] bg-white border-[#E5E7EB] text-[#3B6E91] px-5 py-2 rounded-[6px] text-sm font-semibold cursor-pointer transition-all duration-200 border inline-flex items-center justify-center gap-2 mr-[6px]"
                      id="saveBtn"
                      onClick={() => {
                        handleSaveDraft();
                      }}
                    >
                      Save Draft
                    </button>
                    <button className="flex-1 rounded-lg bg-[#13C4CC] py-2 text-sm font-semibold text-white">
                      Send
                    </button>
                  </div>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        )}
      </>
    );
  } else {
    return (
      <div className="bg-white rounded-[8px] overflow-hidden border border-[#e5e7eb] p-6 min-md:mr-1">
        <div className="mb-6">
          <div className="box-border flex justify-between items-center mb-6">
            <h1 className="text-[1.5rem] font-semibold text-[#142E53] tracking-[-0.025em]">
              Email Marketing
            </h1>
            <button
              className="flex items-center gap-2 bg-[#13C4CC] text-white border-none px-4 py-2 rounded-[6px] font-medium cursor-pointer transition-colors duration-200"
              onClick={() => setIsOpen(true)}
            >
              <Plus />
              New Email
            </button>
          </div>
          <div className="box-border mb-6">
            <div className="relative">
              <div className="absolute sm:left-3 top-6 -translate-y-1/2 text-[#3B6E91]">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search emails..."
                className="focus:outline-none focus:border-teal-500 focus:shadow-[0_0_0_3px_rgba(19,196,204,.1)] w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg text-sm mb-4"
              />
              {searchQuery.length > 0 && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-6 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="box-border flex justify-between items-center text-sm text-[#3B6E91]">
              <div>
                Showing{" "}
                <span className="font-semibold text-[#142E53]">
                  {filteredEmails.length > 0
                    ? `1-${Math.min(filteredEmails.length, itemsPerPage)}`
                    : "0"}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#142E53]">
                  {filteredEmails.length}
                </span>{" "}
                emails
              </div>
              <div className="controls md:mb-0 flex flex-col sm:flex-row w-full sm:w-fit gap-4">
                {/* Bulk Actions Dropdown (Hidden on small screens) */}
                <div className="relative hidden sm:block">
                  <select
                    value=""
                    onChange={(e) => {
                      if (selectedEmails.length > 0) {
                        if (e.target.value === "delete") {
                          if (
                            window.confirm(
                              `Are you sure you want to delete ${selectedEmails.length} email(s)?`
                            )
                          ) {
                            setEmails(
                              emails.filter(
                                (email) => !selectedEmails.includes(email.id)
                              )
                            );
                            setSelectedEmails([]);
                            setSelectAll(false);
                          }
                        } else if (e.target.value === "archive") {
                          if (
                            window.confirm(
                              `Are you sure you want to archive ${selectedEmails.length} email(s)?`
                            )
                          ) {
                            alert(`Archived ${selectedEmails.length} emails`);
                            setSelectedEmails([]);
                            setSelectAll(false);
                          }
                        }
                      }
                      e.target.value = "";
                    }}
                    className="hover:border-teal-500 hover:text-teal-500 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-[#3b6e91] cursor-pointer duration-200 appearance-none pr-10 
                         focus:outline-none focus:ring-0 focus:ring-teal-500 focus:border-teal-500 focus:border-1"
                    disabled={selectedEmails.length === 0}
                  >
                    <option value="">Bulk Actions</option>
                    <option value="delete">Delete</option>
                    <option value="archive">Archive</option>
                  </select>
                  <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-[#3B6E91]" />
                  </div>
                </div>

                <div className="flex gap-3 w-full justify-between sm:justify-normal">
                  <div className="relative w-full sm:w-auto">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="hover:border-teal-500 hover:text-teal-500 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-[#3b6e91] cursor-pointer duration-200 appearance-none pr-10 
                         focus:outline-none focus:ring-0 focus:ring-teal-500 focus:border-teal-500 focus:border-1"
                    >
                      <option value="">Filter by Status</option>
                      <option value="SENT">Sent</option>
                      <option value="SCHEDULED">Scheduled</option>
                      <option value="DRAFT">Draft</option>
                    </select>
                    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                      <ChevronDown className="h-4 w-4 text-[#3B6E91]" />
                    </div>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative w-full sm:w-auto">
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="hover:border-teal-500 hover:text-teal-500 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-[#3b6e91] cursor-pointer duration-200 appearance-none pr-10 
                         focus:outline-none focus:ring-0 focus:ring-teal-500 focus:border-teal-500 focus:border-1"
                    >
                      <option value="Newest">Sort: Newest</option>
                      <option value="Oldest">Sort: Oldest</option>
                    </select>
                    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                      <ChevronDown className="h-4 w-4 text-[#3B6E91]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-8 mb-6 border-b border-gray-300">
            {["All", "Sent", "Scheduled", "Draft"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-semibold text-sm cursor-pointer py-4 ${
                  activeTab === tab
                    ? "text-[#13C4CC] border-b-2 border-[#13C4CC]"
                    : "text-[#343332]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <table className="box-border w-full border-spacing-0 mb-4 border-separate">
            <thead>
              <tr>
                <th className='bg-gray-100 text-[#3B6E91] font-semibold text-xs uppercase tracking-wider w-[40px] text-center px-4 py-3 mb-6 border-b border-gray-300 font-family-[-apple-system,BlinkMacSystemFont,"Segoe_UI",Roboto,Helvetica,Arial,sans-serif]'>
                  <div className="inline-flex items-center justify-center">
                    <div
                      className={`relative w-[18px] h-[18px] cursor-pointer transition-all duration-200 rounded border-2 ${
                        selectAll
                          ? "bg-[#13C4CC] border-[#13C4CC]"
                          : "border-gray-300 bg-white"
                      }`}
                      id="selectAll"
                      role="checkbox"
                      aria-checked={selectAll}
                      tabIndex={0}
                      onClick={() => {
                        setSelectAll(!selectAll);
                        setSelectedEmails(
                          selectAll
                            ? []
                            : filteredEmails.map((email) => email.id)
                        );
                      }}
                    >
                      {selectAll && (
                        <Check
                          className="absolute inset-0 w-full h-full text-white"
                          size={16}
                        />
                      )}
                    </div>
                  </div>
                </th>
                <th className='bg-gray-100 text-left text-[#3B6E91] font-semibold text-xs uppercase tracking-wider px-4 py-3 mb-6 border-b border-gray-300 font-family-[-apple-system,BlinkMacSystemFont,"Segoe_UI",Roboto,Helvetica,Arial,sans-serif]'>
                  TYPE
                </th>
                <th className='bg-gray-100 text-left text-[#3B6E91] font-semibold text-xs uppercase tracking-wider px-4 py-3 mb-6 border-b border-gray-300 font-family-[-apple-system,BlinkMacSystemFont,"Segoe_UI",Roboto,Helvetica,Arial,sans-serif]'>
                  TITLE
                </th>
                <th className='bg-gray-100 text-left text-[#3B6E91] font-semibold text-xs uppercase tracking-wider px-4 py-3 mb-6 border-b border-gray-300 font-family-[-apple-system,BlinkMacSystemFont,"Segoe_UI",Roboto,Helvetica,Arial,sans-serif]'>
                  STATUS
                </th>
                <th className='bg-gray-100 text-left text-[#3B6E91] font-semibold text-xs uppercase tracking-wider px-4 py-3 mb-6 border-b border-gray-300 font-family-[-apple-system,BlinkMacSystemFont,"Segoe_UI",Roboto,Helvetica,Arial,sans-serif]'>
                  PRODUCTS
                </th>
                <th className='bg-gray-100 text-left text-[#3B6E91] font-semibold text-xs uppercase tracking-wider px-4 py-3 mb-6 border-b border-gray-300 font-family-[-apple-system,BlinkMacSystemFont,"Segoe_UI",Roboto,Helvetica,Arial,sans-serif]'>
                  STATS
                </th>
                <th className='bg-gray-100 text-left text-[#3B6E91] font-semibold text-xs uppercase tracking-wider px-4 py-3 mb-6 border-b border-gray-300 font-family-[-apple-system,BlinkMacSystemFont,"Segoe_UI",Roboto,Helvetica,Arial,sans-serif]'></th>
              </tr>
            </thead>
            <tbody>
              {currentEmails.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No emails found matching your criteria.
                  </td>
                </tr>
              ) : (
                currentEmails.map((email) => (
                  <tr key={email.id}>
                    <td className="align-middle text-center p-4 mb-6 border-b border-gray-300 bg-white">
                      <div className="inline-flex items-center justify-center">
                        <div
                          className={`relative w-[18px] h-[18px] cursor-pointer transition-all duration-200 rounded border-2 ${
                            selectedEmails.includes(email.id)
                              ? "bg-[#13C4CC] border-[#13C4CC]"
                              : "border-gray-300 bg-white"
                          }`}
                          role="checkbox"
                          aria-checked={selectedEmails.includes(email.id)}
                          tabIndex={0}
                          onClick={() => toggleEmailSelection(email.id)}
                        >
                          {selectedEmails.includes(email.id) && (
                            <Check
                              className="absolute inset-0 w-full h-full text-white"
                              size={16}
                            />
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="align-middle p-4 mb-6 border-b border-gray-300 bg-white">
                      <div
                        className={`w-[40px] h-[40px] items-center justify-center relative inline-flex rounded-lg group ${
                          email.type === "marketing"
                            ? "bg-[#D3F8DF]"
                            : "bg-[#DBE9FE]"
                        }`}
                        style={{
                          backgroundColor:
                            email.type === "marketing"
                              ? "#D3F8DF !important"
                              : "#DBE9FE !important",
                        }}
                      >
                        {email.type === "marketing" ? (
                          <MailSvg
                            className="h-5 w-5"
                            // style={{ fill: "#085C37" }}
                          />
                        ) : (
                          <MegaPhoneSvg
                            className="h-5 w-5 "
                            // {{ fill: "#1C4ED8" }}
                          />
                        )}

                        <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
                          {email.type === "marketing"
                            ? "Marketing"
                            : "Announcement"}
                          <div className="absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                        </span>
                      </div>
                    </td>
                    <td className="font-semibold text-sm text-[#343332] align-middle p-4 mb-6 border-b border-gray-300 bg-white">
                      {email.title}
                    </td>
                    <td className="align-middle p-4 mb-6 border-b border-gray-300 bg-white">
                      <span
                        className={`relative inline-block px-3 py-1.5 rounded-2xl ${
                          email.status === "SENT"
                            ? "bg-[rgba(2,197,175,0.1)] text-[#02C5AF]"
                            : email.status === "SCHEDULED"
                            ? "bg-[rgba(19,196,204,0.1)] text-[#13C4CC]"
                            : "bg-[rgba(107,114,128,0.1)] text-[#6B7280]"
                        } text-xs font-semibold group`}
                      >
                        {email.status}
                        {(email.sentDate || email.savedDate) && (
                          <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
                            {email.status === "SENT"
                              ? `Sent on ${email.sentDate}`
                              : email.status === "SCHEDULED"
                              ? `Scheduled for ${
                                  email.sentDate || email.savedDate
                                }`
                              : `Saved on ${email.savedDate}`}
                            <div className="absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="align-middle p-4 mb-6 border-b border-gray-300 bg-white">
                      <div className="flex items-center">
                        {email.products.slice(0, 3).map((product, idx) => (
                          <div
                            key={idx}
                            className={`relative w-[32px] h-[32px] shadow-md z-[1] ${
                              idx > 0 ? "-ml-2" : ""
                            } rounded-full border-2 border-white group`}
                          >
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={`Product ${idx + 1}`}
                              className="w-full h-full object-cover rounded-full"
                              width={32}
                              height={32}
                            />
                            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
                              {product.name}
                              <div className="absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                            </span>
                          </div>
                        ))}

                        {email.products.length > 3 && (
                          <div className="w-[32px] h-[32px] text-[#3B6E91] text-xs font-semibold flex items-center justify-center shadow-md -ml-2 rounded-full border-2 border-white bg-[#F1F3F6]">
                            +{email.products.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="align-middle p-4 mb-6 border-b border-gray-300 bg-white">
                      <div className="bg-gray-100 whitespace-nowrap grid grid-cols-[repeat(4,1fr)] gap-0 p-3 rounded-lg">
                        <div className="flex flex-col gap-1 text-center px-4 py-0 relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[70%] after:w-[1px] after:bg-[#E5E7EB] last:after:hidden">
                          <span className="text-xs text-gray-500 mb-1">
                            Sent
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {email.stats.sent ?? "-"}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 text-center px-4 py-0 relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[70%] after:w-[1px] after:bg-[#E5E7EB] last:after:hidden">
                          <span className="text-xs text-gray-500 mb-1">
                            Opened
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {email.stats.opened ?? "-"}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 text-center px-4 py-0 relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[70%] after:w-[1px] after:bg-[#E5E7EB] last:after:hidden">
                          <span className="text-xs text-gray-500 mb-1">
                            Clicked
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {email.stats.clicked ?? "-"}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 text-center px-4 py-0 relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[70%] after:w-[1px] after:bg-[#E5E7EB] last:after:hidden">
                          <span className="text-xs text-gray-500 mb-1">
                            Unsubscribed
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {email.stats.unsubscribed ?? "-"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle p-4 mb-6 border-b border-gray-300 bg-white">
                      <button className="w-[32px] h-[32px] border-2 border-gray-300 flex items-center justify-center cursor-pointer transition-all duration-200 ml-[12px] rounded-md bg-white">
                        <MoreVertical className="h-4 w-4 text-[#3B6E91]" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* model start */}
        {(isOpen || productId !== null) && (
          <div className="fixed inset-0 bg-[rgba(20,46,83,0.5)] flex items-center justify-center z-[1000]">
            <div
              ref={modalRef}
              // className="bg-[white] justify-content-center rounded-[12px] w-[90%] max-w-[800px] max-h-[85vh] p-8  overflow-y-auto relative"
              className={`bg-[white] justify-content-center rounded-[12px] w-[90%] max-w-[800px] max-h-[85vh] p-8 relative ${
                isOpenCalender ? "overflow-hidden" : "overflow-y-auto"
              }`}
            >
              <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-300">
                <h2 className="text-xl font-semibold text-[#142E53]">
                  Create New Email
                </h2>
                <button
                  className="text-[#3B6E91] cursor-pointer text-2xl leading-none transition-colors duration-200 p-2 border-none"
                  onClick={() => {
                    setIsOpenCalender(false);
                    setProductSearchQuery("");
                    removeParam();
                    setIsOpen(false);
                  }}
                >
                  ×
                </button>
              </div>
              <div className="mb-6">
                <label className="block text-[0.875rem] font-semibold text-[#142E53] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3.5 py-2.5 border-[1px] border-[#E5E7EB] rounded-[6px] text-[0.875rem] [transition:all_0.2s] focus:outline-none focus:border-[#13C4CC] focus:ring-4 focus:ring-[#13C4CC]/10"
                  placeholder="Enter email name"
                  onChange={handleChange}
                  name="title"
                />
              </div>
              <div className="mb-6">
                <label className="block text-[0.875rem] font-semibold text-[#142E53] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-3.5 py-2.5 border-[1px] border-[#E5E7EB] rounded-[6px] text-[0.875rem] [transition:all_0.2s] focus:outline-none focus:border-[#13C4CC] focus:ring-4 focus:ring-[#13C4CC]/10"
                  placeholder="Enter email subject"
                  onChange={handleChange}
                  name="subject"
                />
              </div>
              <div className="mb-6">
                <label className="block text-[0.875rem] font-semibold text-[#142E53] mb-2">
                  Products
                </label>
                <div className="relative">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-1 bg-[#F1F5F9] px-2 py-1 rounded-md"
                      >
                        <span className="text-xs font-medium">
                          {product.title}
                        </span>
                        <button
                          onClick={() => toggleProductSelection(product)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3B6E91]" />
                    <input
                      type="text"
                      value={productSearchQuery}
                      onChange={(e) => setProductSearchQuery(e.target.value)}
                      className="w-full px-3.5 py-2.5 border-[1px] border-[#E5E7EB] rounded-[6px] text-[0.875rem] [transition:all_0.2s] focus:outline-none focus:border-[#13C4CC] focus:ring-4 focus:ring-[#13C4CC]/10 pl-10 pr-10"
                      placeholder="Search products..."
                    />
                    {productSearchQuery.length > 0 && (
                      <button
                        onClick={() => setProductSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="border border-gray-300 rounded-md mt-2 max-h-[300px] overflow-y-auto">
                    {filteredProducts.length === 0 ? (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        {productSearchQuery
                          ? "No products found matching your search."
                          : "No products available."}
                      </div>
                    ) : (
                      filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          className="border-b border-gray-200 flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 last:border-b-0"
                          onClick={() => toggleProductSelection(product)}
                        >
                          <Image
                            src={product.image || "/placeholder.svg"}
                            className="w-12 h-12 rounded-md object-cover"
                            width={48}
                            height={48}
                            alt="Product"
                          />

                          {/* Course Info */}
                          <div className="flex-col">
                            <div className="text-sm font-semibold text-gray-900 mb-1.5 tracking-tight">
                              {product.title}
                            </div>
                            <span
                              className={`inline-flex px-2.5 py-1 rounded-[4px] text-[0.75rem] leading-none ${
                                product.type === "Course"
                                  ? "text-[#1C4ED8] bg-[#DBE9FE]"
                                  : product.type === "Event"
                                  ? "text-[#059669] bg-[#D1FAE5]"
                                  : product.type === "School"
                                  ? "text-[#DC2626] bg-[#FEE2E2]"
                                  : "text-[#1C4ED8] bg-[#DBE9FE]"
                              }`}
                            >
                              {product.type}
                            </span>
                          </div>

                          <div className="flex gap-3 items-center ml-auto">
                            {/* Students Enrolled */}
                            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded text-xs text-gray-700 relative group">
                              <span className="w-[16px] h-[16px] text-[#6B7280]">
                                <Users className="h-4 w-4" />
                              </span>
                              <span>{product.enrolled} enrolled</span>

                              <div className="absolute -left-18 -top-1 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
                                {product.enrolled} students enrolled
                                <div className="absolute top-[40%] -right-2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                              </div>
                            </div>

                            {/* Email Count */}
                            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded text-xs text-gray-700 relative group">
                              <span className="w-[16px] h-[16px] text-[#6B7280]">
                                <Mail className="h-4 w-4" />
                              </span>
                              <span>{product.emailsRemaining} emails</span>
                              <div className="absolute -left-18 -top-1 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
                                emails remaining
                                <div className="absolute top-[40%] -right-2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-[0.875rem] font-semibold text-[#142E53] mb-2">
                  Email Type
                </label>
                <select
                  onChange={handleChange}
                  name="type"
                  className="w-full px-3.5 py-2.5 border-[1px] border-[#E5E7EB] rounded-[6px] text-[0.875rem] [transition:all_0.2s] focus:outline-none focus:border-[#13C4CC] focus:ring-4 focus:ring-[#13C4CC]/10"
                >
                  <option value="Announcement">Announcement</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-[0.875rem] font-semibold text-[#142E53] mb-2">
                  Content
                </label>
                <div className="flex gap-2 p-3 border border-[#E5E7EB] rounded-t-[6px] bg-[#F9FAFB]">
                  <button
                    className="p-1.5 text-slate-500 cursor-pointer rounded hover:bg-gray-200"
                    title="Select"
                    onClick={() =>
                      document.execCommand("formatBlock", false, "<p>")
                    }
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button
                    className="p-1.5 text-slate-500 cursor-pointer rounded hover:bg-gray-200"
                    title="Bold"
                    onClick={() => document.execCommand("bold")}
                  >
                    <Bold className="h-4 w-4" />
                  </button>
                  <button
                    className="p-1.5 text-slate-500 cursor-pointer rounded hover:bg-gray-200"
                    title="Italic"
                    onClick={() => document.execCommand("italic")}
                  >
                    <Italic className="h-4 w-4" />
                  </button>
                  <button
                    className="p-1.5 text-slate-500 cursor-pointer rounded hover:bg-gray-200"
                    title="Undo"
                    onClick={() => document.execCommand("undo")}
                  >
                    <Undo className="h-4 w-4" />
                  </button>
                  <button
                    className="p-1.5 text-slate-500 cursor-pointer rounded hover:bg-gray-200"
                    title="Redo"
                    onClick={() => document.execCommand("redo")}
                  >
                    <Redo className="h-4 w-4" />
                  </button>
                </div>
                <textarea
                  className="w-full min-h-[200px] p-4 border border-[#E5E7EB] rounded-b-[6px] text-sm leading-6 transition-all duration-200 focus:outline-none focus:border-[#13C4CC] focus:ring-4 focus:ring-[#13C4CC]/10"
                  onChange={handleChange}
                  name="content"
                  style={{ outline: "none", resize: "vertical" }}
                >
                  {selectedProducts && selectedProducts[0]?.title
                    ? selectedProducts[0]?.title
                    : "Hello,\nWrite your email content here..."}
                </textarea>
              </div>
              <div>
                <button
                  className="hover:border-[#13C4CC] hover:text-[#13C4CC] bg-white border-[#E5E7EB] text-[#3B6E91] px-5 py-2 rounded-[6px] text-sm font-semibold cursor-pointer transition-all duration-200 border inline-flex items-center justify-center gap-2 mr-[6px]"
                  id="previewBtn"
                >
                  Preview
                </button>
                <button
                  className="hover:border-[#13C4CC] hover:text-[#13C4CC] bg-white border-[#E5E7EB] text-[#3B6E91] px-5 py-2 rounded-[6px] text-sm font-semibold cursor-pointer transition-all duration-200 border inline-flex items-center justify-center gap-2 mr-[6px]"
                  onClick={() => setIsOpenCalender(true)}
                >
                  Schedule
                </button>
                <button
                  className="hover:border-[#13C4CC] hover:text-[#13C4CC] bg-white border-[#E5E7EB] text-[#3B6E91] px-5 py-2 rounded-[6px] text-sm font-semibold cursor-pointer transition-all duration-200 border inline-flex items-center justify-center gap-2 mr-[6px]"
                  id="saveBtn"
                  onClick={() => {
                    handleSaveDraft();
                  }}
                >
                  Save Draft
                </button>
                <button
                  className="hover:bg-[#11b3ba] text-sm font-semibold cursor-pointer transition-all duration-200 border inline-flex items-center justify-center gap-2 text-white px-4 py-2 rounded-md bg-[#13C4CC] mr-[6px]"
                  id="sendBtn"
                >
                  Send
                </button>
              </div>

              {/* Calendar Popup */}
              {isOpenCalender && (
                <div
                  ref={calendarRef}
                  className="absolute top-[65%] left-[35%] border shadow-md z-[99999] min-w-[300px] p-4 rounded-md bg-white"
                >
                  <CalendarPopup
                    onDateSelect={(date) => setSelectedDateTime(date)}
                  />
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      className="bg-white border text-[#3B6E91] px-5 py-2.5 rounded-[6px] text-sm font-semibold cursor-pointer"
                      onClick={() => setIsOpenCalender(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="text-white px-5 py-2.5 rounded-md bg-[#13C4CC] text-sm font-semibold cursor-pointer"
                      onClick={handleConfirmDate}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* model end */}

        <div className="flex justify-between items-center mt-6 pt-6 max-sm:hidden">
          <div className="flex items-center gap-6">
            <div className="text-[#666] text-sm">
              Showing{" "}
              <strong className="text-[#333] font-semibold">
                {filteredEmails.length > 0
                  ? `1-${Math.min(filteredEmails.length, itemsPerPage)}`
                  : "0"}
              </strong>{" "}
              of{" "}
              <strong className="text-[#333] font-semibold">
                {filteredEmails.length}
              </strong>{" "}
              emails
            </div>
            <PaginationMenu />
          </div>

          <div className="flex items-center gap-2">
            <button
              className="w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333] transition-all duration-200 hover:bg-[#f5f5f5]"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({
              length: Math.ceil(filteredEmails.length / itemsPerPage) || 1,
            }).map((_, index) => (
              <button
                key={index}
                className={`w-8 h-8 border rounded-md flex items-center justify-center cursor-pointer transition-all duration-200 ${
                  currentPage === index + 1
                    ? "bg-[#333] text-white border-[#333]"
                    : "bg-white text-[#333] border-[#e0e0e0] hover:bg-[#f5f5f5]"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333] transition-all duration-200 hover:bg-[#f5f5f5]"
              onClick={() =>
                setCurrentPage(
                  Math.min(
                    Math.ceil(filteredEmails.length / itemsPerPage) || 1,
                    currentPage + 1
                  )
                )
              }
              disabled={
                currentPage ===
                (Math.ceil(filteredEmails.length / itemsPerPage) || 1)
              }
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default EmailMarketing;