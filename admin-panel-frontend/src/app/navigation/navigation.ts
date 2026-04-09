import type { NavItem } from "@/app/components/types/ui";

export const navSections: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "",
    icon: "dashboard",
  },
  {
    id: "users",
    label: "User & Access Management",
    icon: "users",
    children: [
      { id: "user-management", label: "User Management", path: "users/user-management" },
      { id: "all-instructors", label: "All Instructors", path: "users/all-instructors", group: "Instructor Management" },
      { id: "applications", label: "Applications", path: "users/applications", group: "Instructor Management" },
      { id: "team-contacts", label: "Team Contacts", path: "users/team-contacts", group: "Teams" },
      { id: "team-members", label: "Team Members", path: "users/team-members", group: "Teams" },
    ],
  },
  {
    id: "products",
    label: "Products",
    icon: "products",
    children: [
      { id: "all-products", label: "All Products", path: "products/all-products" },
      { id: "courses", label: "Courses", path: "products/courses" },
      { id: "event-products", label: "Event Products", path: "products/event-products" },
      { id: "session-instances", label: "Session Instances", path: "products/session-instances" },
      { id: "bundles", label: "Bundles", path: "products/bundles" },
      { id: "course-content", label: "Course Content", path: "products/course-content" },
    ],
  },
  {
    id: "enrollment",
    label: "Enrollment & Progress",
    icon: "chart",
    children: [
      { id: "enrollments", label: "Enrollments", path: "enrollment/enrollments" },
      { id: "subscriptions", label: "User Subscriptions", path: "enrollment/user-subscriptions" },
      { id: "progress", label: "User Progress & Analytics", path: "enrollment/user-progress" },
      { id: "certificates", label: "Certificate Management", path: "enrollment/certificate-management" },
    ],
  },
  {
    id: "financials",
    label: "Financials",
    icon: "money",
    children: [
      { id: "transactions", label: "Transactions", path: "financials/transactions" },
      { id: "plans", label: "Subscription Plans", path: "financials/subscription-plans" },
      { id: "payouts", label: "Payouts", path: "financials/payouts" },
      { id: "coupons", label: "Coupons & Promotions", path: "financials/coupons" },
    ],
  },
  {
    id: "community",
    label: "Community & Engagement",
    icon: "community",
    children: [
      { id: "communities", label: "Communities", path: "community/communities" },
      { id: "reviews", label: "Reviews & Ratings", path: "community/reviews" },
      { id: "schools", label: "Schools", path: "community/schools" },
    ],
  },
  {
    id: "platform",
    label: "Platform",
    icon: "platform",
    children: [
      { id: "settings", label: "Platform Settings", path: "platform/settings" },
      { id: "forms", label: "Form Submissions", path: "platform/form-submissions" },
      { id: "team-plans", label: "Team Plans", path: "platform/team-plans" },
      { id: "notifications", label: "Notifications", path: "platform/notifications" },
    ],
  },
  {
    id: "system",
    label: "System & Operations",
    icon: "system",
    children: [
      { id: "checklists", label: "Checklist Instances", path: "system/checklist-instances" },
      { id: "search-management", label: "Search Management", path: "system/search-management" },
      { id: "marketing-emails", label: "Marketing Emails", path: "system/marketing-emails" },
      { id: "system-health", label: "System Health & Logs", path: "system/system-health" },
    ],
  },
];
