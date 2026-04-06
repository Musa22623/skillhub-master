import { ReactNode } from "react";

export type MenuItem = {
  key: string;
  label: string;
  path?: string;
  icon?: ReactNode;
  children?: MenuItem[];
};

export const menuConfig: MenuItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },

  {
    key: "users",
    label: "User & Access Mgt",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    children: [
      {
        key: "user-management",
        label: "User Management",
        path: "/users",
      },

      {
        key: "instructor-group",
        label: "Instructor Management",
        children: [
          {
            key: "all-instructors",
            label: "All Instructors",
            path: "/instructors",
          },
          {
            key: "instructor-applications",
            label: "Applications",
            path: "",
          },
        ],
      },

      {
        key: "team-group",
        label: "Teams",
        children: [
          {
            key: "team-contracts",
            label: "Team Contracts",
            path: "/teams",
          },
          {
            key: "team-members",
            label: "Team Members",
            path: "/teams",
          },
        ],
      },
    ],
  },

  {
    key: "products",
    label: "Products",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    children: [
      { key: "all-products", label: "All Products", path: "/products" },
      { key: "courses", label: "Courses", path: "/products/courses" },
      { key: "event-products", label: "Event Products", path: "/products/events" },
      { key: "session-instances", label: "Session Instances", path: "/products/sessions" },
      { key: "bundles", label: "Bundles", path: "/products/bundles" },
      { key: "course-content", label: "Course Content", path: "/products/content" },
    ],
  },

  {
    key: "enrollment",
    label: "Enrollment & Progress",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    children: [
      { key: "enrollments", label: "Enrollments", path: "/enrollments" },
      { key: "user-subscriptions", label: "User Subscriptions", path: "/subscriptions" },
      { key: "user-progress", label: "User Progress & Analytics", path: "/" },
      { key: "certificate-management", label: "Certificate Management", path: "/certificates" },
    ],
  },

  {
    key: "financials",
    label: "Financials",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    children: [
      { key: "transactions", label: "Transactions", path: "/subscriptions" },
      { key: "subscription-plans", label: "Subscription Plans", path: "/subscriptions/plans" },
      { key: "payouts", label: "Payouts", path: "/payouts" },
      { key: "coupons", label: "Coupons & Promotions", path: "/marketing" },
    ],
  },

  {
    key: "community",
    label: "Community & Engagement",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    children: [
      { key: "communities", label: "Communities", path: "/communities" },
      { key: "reviews", label: "Reviews & Ratings", path: "/reviews" },
      { key: "schools", label: "Schools", path: "/schools" },
    ],
  },

  {
    key: "platform",
    label: "Platform",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
      </svg>
    ),
    children: [
      { key: "platform-settings", label: "Platform Settings", path: "/settings" },
      { key: "form-submissions", label: "Form Submissions", path: "/forms" },
      { key: "team-plans", label: "Team Plans", path: "/teams" },
      { key: "notifications", label: "Notifications", path: "/notifications" },
    ],
  },

  {
    key: "system",
    label: "System & Operations",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    children: [
      { key: "checklist-instances", label: "Checklist Instances", path: "/compliance" },
      { key: "search-management", label: "Search Management", path: "/search" },
      { key: "marketing-emails", label: "Marketing Emails", path: "/marketing" },
      { key: "system-health", label: "System Health & Logs", path: "/logs" },
    ],
  },
];
