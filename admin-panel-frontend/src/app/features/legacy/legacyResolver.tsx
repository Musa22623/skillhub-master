import { useState, type ReactNode } from "react";
import { useToast } from "@/app/providers/ToastProvider";
import { Badge } from "@/app/components/ui/Badge";
import { legacyData } from "@/app/features/legacy/legacyData";
import { TableActionMenu } from "@/app/components/ui/TableActionMenu";
import { buildPresetTableActionItems } from "@/app/components/ui/TableActionMenuPresets";
import type { BadgeTone, IconName, StatConfig, TableColumn } from "@/app/components/types/ui";

export type LegacyRow = {
  id: string;
  [key: string]: string;
};

type DatasetField = {
  key: string;
  header: string;
  imageKey?: string;
  subtitleKey?: string;
};

const datasetFieldMap: Record<string, { datasetKey: string; fields: DatasetField[] }> = {
  "user-management": {
    datasetKey: "usersData",
    fields: [
      { key: "name", header: "User", imageKey: "avatar", subtitleKey: "internalId" },
      { key: "email", header: "Email" },
      { key: "role", header: "Role" },
      { key: "joined", header: "Joined" },
      { key: "status", header: "Status" },
      { key: "ip", header: "Register IP" },
      { key: "tags", header: "Tags" },
      { key: "viewLinks", header: "View" },
      { key: "linkedTo", header: "Linked To" },
    ],
  },
  "all-instructors": {
    datasetKey: "instructorsData",
    fields: [
      { key: "name", header: "Instructor", imageKey: "avatar", subtitleKey: "internalId" },
      { key: "email", header: "Email" },
      { key: "approvedDate", header: "Approved Date" },
      { key: "products.total", header: "Products" },
      { key: "totalSales", header: "Total Sales" },
      { key: "payoutStatus", header: "Payout Status" },
      { key: "pending", header: "Pending" },
    ],
  },
  applications: {
    datasetKey: "applicationsData",
    fields: [
      { key: "appId", header: "Application ID" },
      { key: "name", header: "Applicant", imageKey: "avatar", subtitleKey: "email" },
      { key: "email", header: "Email" },
      { key: "category", header: "Category" },
      { key: "experience", header: "Experience" },
      { key: "status", header: "Status" },
      { key: "applied", header: "Applied" },
    ],
  },
  "team-contacts": {
    datasetKey: "contractsData",
    fields: [
      { key: "contractId", header: "Contract ID" },
      { key: "name", header: "Plan" },
      { key: "manager", header: "Manager" },
      { key: "model", header: "Model" },
      { key: "utilization", header: "Utilization" },
      { key: "status", header: "Status" },
      { key: "expiry", header: "Expiry" },
    ],
  },
  "team-members": {
    datasetKey: "membersData",
    fields: [
      { key: "name", header: "Member", imageKey: "avatar", subtitleKey: "planName" },
      { key: "email", header: "Email" },
      { key: "planName", header: "Plan" },
      { key: "role", header: "Role" },
      { key: "status", header: "Status" },
      { key: "joined", header: "Joined" },
    ],
  },
  "all-products": {
    datasetKey: "productsData",
    fields: [
      { key: "productId", header: "Product ID" },
      { key: "title", header: "Product", imageKey: "thumbnail", subtitleKey: "productId" },
      { key: "instructor.name", header: "Instructor" },
      { key: "type", header: "Type" },
      { key: "price", header: "Price" },
      { key: "status", header: "Status" },
      { key: "enrollments", header: "Enrollments" },
      { key: "created", header: "Created" },
    ],
  },
};

const excludedDatasetKeys = new Set([
  "id",
  "avatar",
  "thumbnail",
  "viewLinks",
  "linkedTo",
  "socialMedia",
  "notes",
  "motivation",
  "videoUrl",
  "joinedFull",
  "createdFull",
  "updatedFull",
  "appliedFull",
  "lastIp",
  "lastLogin",
  "lwId",
  "reviewer",
]);

function getByPath(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((current, part) => {
    if (!current || typeof current !== "object") {
      return undefined;
    }
    return (current as Record<string, unknown>)[part];
  }, source);
}

function normalizeText(value: string) {
  return value
    .replace(/â€”/g, "--")
    .replace(/ðŸ‘/g, "Like")
    .replace(/ðŸ”¼/g, "Upvote")
    .replace(/ðŸ“¢/g, "[Announcement]")
    .replace(/ðŸŽ“/g, "[Cohort]")
    .replace(/ðŸš€/g, "[Beta]")
    .replace(/ðŸŽ¨/g, "[Design]")
    .replace(/ðŸ’»/g, "[Tech]")
    .replace(/ðŸ“£/g, "[Marketing]")
    .replace(/ðŸ“š/g, "[Bookmark]")
    .replace(/ðŸ‘©â€ðŸ’»/g, "[Learning]")
    .replace(/\s+/g, " ")
    .replace(/^User Avatar\s+/i, "")
    .replace(/^Avatar\s+/i, "")
    .trim();
}

function stringifyValue(value: unknown): string {
  if (value == null) {
    return "";
  }

  if (Array.isArray(value)) {
    return value.map((item) => stringifyValue(item)).filter(Boolean).join(", ");
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record.name === "string") {
      return record.name;
    }
    if (typeof record.amount === "string" && typeof record.date === "string") {
      return `${record.amount} (${record.date})`;
    }
    if (typeof record.total === "number") {
      return String(record.total);
    }

    return Object.values(record).map((item) => stringifyValue(item)).filter(Boolean).join(" ");
  }

  return normalizeText(String(value));
}

function toneForValue(value: string): BadgeTone {
  const normalized = value.toLowerCase();

  if (
    normalized.includes("success") ||
    normalized.includes("active") ||
    normalized.includes("approved") ||
    normalized.includes("published") ||
    normalized.includes("eligible") ||
    normalized.includes("delivered") ||
    normalized.includes("paid")
  ) {
    return "success";
  }

  if (
    normalized.includes("pending") ||
    normalized.includes("review") ||
    normalized.includes("processing") ||
    normalized.includes("scheduled") ||
    normalized.includes("warning")
  ) {
    return "warning";
  }

  if (
    normalized.includes("failed") ||
    normalized.includes("error") ||
    normalized.includes("rejected") ||
    normalized.includes("suspended") ||
    normalized.includes("inactive") ||
    normalized.includes("cancel")
  ) {
    return "danger";
  }

  if (
    normalized.includes("draft") ||
    normalized.includes("refunded") ||
    normalized.includes("info") ||
    normalized.includes("idle")
  ) {
    return "info";
  }

  return "neutral";
}

function toneFromTrend(value: unknown): BadgeTone | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const trend = value as Record<string, unknown>;
  const type = typeof trend.type === "string" ? trend.type.toLowerCase() : "";

  if (type.includes("positive")) {
    return "success";
  }
  if (type.includes("negative")) {
    return "danger";
  }
  if (type.includes("warning")) {
    return "warning";
  }

  return "info";
}

function iconFromLegacyKey(value: string): IconName {
  const normalized = value.toLowerCase();

  if (normalized.includes("user") || normalized.includes("member") || normalized.includes("instructor")) {
    return "users";
  }
  if (normalized.includes("sale") || normalized.includes("bill") || normalized.includes("revenue") || normalized.includes("payout")) {
    return "money";
  }
  if (normalized.includes("course") || normalized.includes("product") || normalized.includes("certificate")) {
    return "products";
  }
  if (normalized.includes("community") || normalized.includes("review") || normalized.includes("collection")) {
    return "community";
  }
  if (normalized.includes("mail") || normalized.includes("message") || normalized.includes("notification")) {
    return "mail";
  }
  if (normalized.includes("health") || normalized.includes("incident") || normalized.includes("error")) {
    return "system";
  }
  if (normalized.includes("calendar") || normalized.includes("renewal")) {
    return "calendar";
  }
  if (normalized.includes("search")) {
    return "search";
  }
  if (normalized.includes("progress") || normalized.includes("enrollment") || normalized.includes("completion")) {
    return "chart";
  }

  return "activity";
}

function isThumbnailToken(header: string, alt: string, text: string) {
  const source = `${header} ${alt} ${text}`.toLowerCase();
  const avatarPattern = /(avatar|user|author|host|inst|owner|member|applicant|manager)/;
  const thumbPattern = /(thumb|thumbnail|product|prod|course|event|item)/;

  if (thumbPattern.test(source) && !avatarPattern.test(source)) {
    return true;
  }

  return false;
}

function isGenericImageAlt(value: string) {
  return /^(thumb|thumbnail|avatar|user|user avatar|author|host|inst|prod|product|course|event|owner|member)$/i.test(
    value.trim(),
  );
}

function splitPrimaryAndMeta(value: string) {
  const separators = [
    " Internal:",
    " School Name:",
    " Primary:",
    " Co-owners:",
    " Type:",
    " Plan:",
    " Provider:",
    " Target:",
    " Posted:",
    " Created:",
    " Paid On:",
    " Next Bill:",
    " Click to view",
  ];

  for (const separator of separators) {
    const index = value.indexOf(separator);
    if (index > 0) {
      return {
        primary: value.slice(0, index).trim(),
        meta: value.slice(index).trim(),
      };
    }
  }

  return {
    primary: value,
    meta: "",
  };
}

const actionPhraseTokens = [
  "Manage Instructors",
  "Mark as Read",
  "Cancel Schedule",
  "View in Resend",
  "New Coupon",
  "Edit Promotion",
  "Unpublish",
  "Preview",
  "User Progress",
  "Checklist API Log",
  "View in LearnWorlds",
  "Sync with LearnWorlds",
  "Cancel at Period End",
  "Cancel Immediately",
  "Change Plan",
  "Force Update",
  "Mark as Complete",
  "View Online",
  "Delete / Revoke",
  "Re-issue",
  "Manage Members Sync MSO",
  "Adjust Credits",
  "FAQ & Testimonials",
  "Pricing History",
  "Course Content",
  "Detailed Status",
  "Edit Entity Settings",
  "Edit Profile Settings",
  "Force Re-check",
  "Notify Owner",
  "View Email Delivery Logs",
  "Delivery Logs",
  "View Sync Log",
  "Force Re-sync",
  "View Invoices",
  "Cancel Subscription",
  "Adjust Credits",
  "Sync Members to MSO",
  "Manage Members",
  "Go to Transaction",
  "Instructor Profile",
  "Host Profile",
  "Parent Product",
  "View Item",
  "User Subscriptions",
  "Included Courses",
  "Included Events",
  "Recipient Profile",
  "Enrolled Course",
  "Comment",
  "Payout",
  "Payload Details",
  "Payment History",
  "Access Details",
  "Progress Breakdown",
  "Product Page",
  "Included Items",
  "Payment Plans",
  "Attendee List",
  "General Info",
  "Plan Details",
  "Payout Details",
  "Error Details",
  "Unit Details",
  "Product Details",
  "Details",
  "Sessions",
  "Users",
  "Sales",
  "Coupons",
  "Redemptions",
  "Analytics",
  "Transaction",
  "Info",
  "CPE",
  "CPF",
  "View Public Page",
  "Usage / Links",
  "School Details",
  "Space Details",
  "Full Details",
  "View Details",
  "View Application",
  "Update Billing",
  "Included Products",
  "Manage Members",
  "Change Status",
  "Assign to Me",
  "Invite Users",
  "Delete Space",
  "Delete School",
  "Delete Post",
  "Unhide Post",
  "Hide Post",
  "Edit Space",
  "Edit School",
  "Leaderboard",
  "Parent Space",
  "Applicant Profile",
  "User Profile",
  "Author Profile",
  "Team Members",
  "Sync with LW",
  "API Log",
  "View",
  "Edit",
  "Update",
  "Cancel",
  "Refund",
  "Approve",
  "Reject",
  "Delete",
  "Reply",
  "Author",
  "Posts",
  "Members",
  "Courses",
  "Events",
  "Invited",
  "Profile",
  "Collection",
  "Certificates",
];

function isActionMenuHeader(header: string) {
  const normalized = header.trim().toLowerCase();
  return normalized.includes("action") || /^column\s+\d+$/i.test(normalized);
}

function splitActionLikeText(value: string) {
  const normalized = normalizeText(value);
  if (!normalized) {
    return [];
  }

  const phrases = [...actionPhraseTokens].sort((left, right) => right.length - left.length);
  const tokens: string[] = [];

  const parseSegment = (segment: string) => {
    let remaining = segment;

    while (remaining.length > 0) {
      remaining = remaining.replace(/^[,\s]+/, "");
      if (!remaining) {
        break;
      }

      const plusMatch = remaining.match(/^\+\d+/);
      if (plusMatch) {
        tokens.push(plusMatch[0]);
        remaining = remaining.slice(plusMatch[0].length);
        continue;
      }

      const matchedPhrase = phrases.find((phrase) => remaining.toLowerCase().startsWith(phrase.toLowerCase()));
      if (matchedPhrase) {
        tokens.push(matchedPhrase);
        remaining = remaining.slice(matchedPhrase.length);
        continue;
      }

      const fallbackMatch = remaining.match(/^[^,]+?(?=\s(?:[A-Z][a-z]|\+\d)|,|$)/);
      if (fallbackMatch?.[0]) {
        tokens.push(fallbackMatch[0].trim());
        remaining = remaining.slice(fallbackMatch[0].length);
        continue;
      }

      tokens.push(remaining.trim());
      break;
    }
  };

  normalized
    .split(",")
    .map((segment) => segment.trim())
    .filter(Boolean)
    .forEach(parseSegment);

  return tokens.filter(Boolean);
}

type UserLinkIconName =
  | "accountDetails"
  | "preferences"
  | "billing"
  | "loginHistory"
  | "activityStats"
  | "posts"
  | "subscriptions"
  | "enrollments"
  | "certificates"
  | "transactions"
  | "reviews"
  | "spaces"
  | "apiLog";

const userLinkMeta: Record<UserLinkIconName, { label: string; title: string }> = {
  accountDetails: { label: "AD", title: "Account Details" },
  preferences: { label: "PF", title: "Preferences" },
  billing: { label: "$", title: "Billing Information" },
  loginHistory: { label: "LH", title: "Login History" },
  activityStats: { label: "AS", title: "User Activity Stats" },
  posts: { label: "P", title: "Posts Created" },
  subscriptions: { label: "S", title: "Enrolled Subscriptions" },
  enrollments: { label: "E", title: "Enrollments" },
  certificates: { label: "C", title: "Certificates" },
  transactions: { label: "T", title: "Transactions" },
  reviews: { label: "R", title: "Reviews Left" },
  spaces: { label: "SP", title: "Spaces" },
  apiLog: { label: "API", title: "API Log" },
};

type GenericActionGlyphName =
  | "view"
  | "links"
  | "profile"
  | "members"
  | "users"
  | "courses"
  | "events"
  | "collection"
  | "posts"
  | "certificates"
  | "transactions"
  | "sales"
  | "coupon"
  | "info"
  | "analytics"
  | "document"
  | "apiLog"
  | "edit"
  | "delete"
  | "approve"
  | "reject"
  | "reply"
  | "sync"
  | "status"
  | "invite"
  | "billing"
  | "leaderboard"
  | "checklist"
  | "mail";

const genericActionMeta: Record<string, { title: string; glyph: GenericActionGlyphName }> = {
  "View Item": { title: "View Item", glyph: "view" },
  "Go to Transaction": { title: "Go to Transaction", glyph: "transactions" },
  "View Email": { title: "View Email", glyph: "mail" },
  "View Email Delivery Logs": { title: "View Email Delivery Logs", glyph: "mail" },
  "Delivery Logs": { title: "Delivery Logs", glyph: "mail" },
  "View Sync Log": { title: "View Sync Log", glyph: "view" },
  "View in LearnWorlds": { title: "View in LearnWorlds", glyph: "view" },
  "View Online": { title: "View Online", glyph: "view" },
  Details: { title: "Details", glyph: "view" },
  "Product Details": { title: "Product Details", glyph: "view" },
  "Plan Details": { title: "Plan Details", glyph: "view" },
  "Payout Details": { title: "Payout Details", glyph: "view" },
  "Payload Details": { title: "Payload Details", glyph: "view" },
  "Error Details": { title: "Error Details", glyph: "view" },
  "Access Details": { title: "Access Details", glyph: "view" },
  "Unit Details": { title: "Unit Details", glyph: "view" },
  "Detailed Status": { title: "Detailed Status", glyph: "view" },
  View: { title: "View", glyph: "view" },
  "View Details": { title: "View Details", glyph: "view" },
  "View Application": { title: "View Application", glyph: "view" },
  "View Public Page": { title: "View Public Page", glyph: "view" },
  "Full Details": { title: "Full Details", glyph: "view" },
  "School Details": { title: "School Details", glyph: "view" },
  "Space Details": { title: "Space Details", glyph: "view" },
  "Usage / Links": { title: "Usage / Links", glyph: "links" },
  Profile: { title: "Profile", glyph: "profile" },
  "Recipient Profile": { title: "Recipient Profile", glyph: "profile" },
  "User Profile": { title: "User Profile", glyph: "profile" },
  "Author Profile": { title: "Author Profile", glyph: "profile" },
  "Applicant Profile": { title: "Applicant Profile", glyph: "profile" },
  "Instructor Profile": { title: "Instructor Profile", glyph: "profile" },
  "Host Profile": { title: "Host Profile", glyph: "profile" },
  Author: { title: "Author", glyph: "profile" },
  Users: { title: "Users", glyph: "users" },
  Members: { title: "Members", glyph: "members" },
  "Team Members": { title: "Team Members", glyph: "members" },
  "Manage Members": { title: "Manage Members", glyph: "members" },
  Attendees: { title: "Attendees", glyph: "members" },
  "Attendee List": { title: "Attendee List", glyph: "members" },
  Courses: { title: "Courses", glyph: "courses" },
  "Course Content": { title: "Course Content", glyph: "courses" },
  "Product Page": { title: "Product Page", glyph: "courses" },
  "Parent Product": { title: "Parent Product", glyph: "courses" },
  "Included Courses": { title: "Included Courses", glyph: "courses" },
  "User Progress": { title: "User Progress", glyph: "analytics" },
  Sessions: { title: "Sessions", glyph: "events" },
  "Enrolled Course": { title: "Enrolled Course", glyph: "courses" },
  Events: { title: "Events", glyph: "events" },
  "Included Events": { title: "Included Events", glyph: "events" },
  Collection: { title: "Collection", glyph: "collection" },
  "Parent Space": { title: "Parent Space", glyph: "collection" },
  "Included Products": { title: "Included Products", glyph: "courses" },
  "Included Items": { title: "Included Items", glyph: "courses" },
  Posts: { title: "Posts", glyph: "posts" },
  Comment: { title: "Comment", glyph: "posts" },
  Invited: { title: "Invited", glyph: "invite" },
  Certificates: { title: "Certificates", glyph: "certificates" },
  Transactions: { title: "Transactions", glyph: "transactions" },
  Transaction: { title: "Transaction", glyph: "transactions" },
  "User Subscriptions": { title: "User Subscriptions", glyph: "transactions" },
  Payout: { title: "Payout", glyph: "transactions" },
  Sales: { title: "Sales", glyph: "sales" },
  Coupons: { title: "Coupons", glyph: "coupon" },
  Redemptions: { title: "Redemptions", glyph: "coupon" },
  Analytics: { title: "Analytics", glyph: "analytics" },
  "Pricing History": { title: "Pricing History", glyph: "analytics" },
  "Progress Breakdown": { title: "Progress Breakdown", glyph: "analytics" },
  Info: { title: "Info", glyph: "info" },
  "General Info": { title: "General Info", glyph: "info" },
  "Payment History": { title: "Payment History", glyph: "transactions" },
  "Payment Plans": { title: "Payment Plans", glyph: "billing" },
  Plan: { title: "Plan", glyph: "billing" },
  "Change Plan": { title: "Change Plan", glyph: "billing" },
  CPE: { title: "CPE", glyph: "document" },
  CPF: { title: "CPF", glyph: "document" },
  Checklist: { title: "Checklist", glyph: "checklist" },
  "Checklist API Log": { title: "Checklist & API Log", glyph: "apiLog" },
  "FAQ & Testimonials": { title: "FAQ & Testimonials", glyph: "document" },
  "API Log": { title: "API Log", glyph: "apiLog" },
  Edit: { title: "Edit", glyph: "edit" },
  "Edit Entity Settings": { title: "Edit Entity Settings", glyph: "edit" },
  "Edit Profile Settings": { title: "Edit Profile Settings", glyph: "edit" },
  "Edit Space": { title: "Edit Space", glyph: "edit" },
  "Edit School": { title: "Edit School", glyph: "edit" },
  Delete: { title: "Delete", glyph: "delete" },
  "Delete Space": { title: "Delete Space", glyph: "delete" },
  "Delete School": { title: "Delete School", glyph: "delete" },
  "Delete Post": { title: "Delete Post", glyph: "delete" },
  "Hide Post": { title: "Hide Post", glyph: "reject" },
  "Unhide Post": { title: "Unhide Post", glyph: "view" },
  Approve: { title: "Approve", glyph: "approve" },
  Reject: { title: "Reject", glyph: "reject" },
  Reply: { title: "Reply", glyph: "reply" },
  "Sync with LW": { title: "Sync with LW", glyph: "sync" },
  "Sync with LearnWorlds": { title: "Sync with LearnWorlds", glyph: "sync" },
  "Sync Members to MSO": { title: "Sync Members to MSO", glyph: "sync" },
  "Force Re-sync": { title: "Force Re-sync", glyph: "sync" },
  "Force Update": { title: "Force Update", glyph: "sync" },
  "Change Status": { title: "Change Status", glyph: "status" },
  "Force Re-check": { title: "Force Re-check", glyph: "status" },
  "Notify Owner": { title: "Notify Owner", glyph: "mail" },
  "Assign to Me": { title: "Assign to Me", glyph: "profile" },
  "Invite Users": { title: "Invite Users", glyph: "invite" },
  "Update Billing": { title: "Update Billing", glyph: "billing" },
  "Adjust Credits": { title: "Adjust Credits", glyph: "billing" },
  Refund: { title: "Refund", glyph: "billing" },
  Cancel: { title: "Cancel", glyph: "status" },
  "Cancel Immediately": { title: "Cancel Immediately", glyph: "status" },
  "Cancel at Period End": { title: "Cancel at Period End", glyph: "status" },
  "Cancel Subscription": { title: "Cancel Subscription", glyph: "status" },
  "View Invoices": { title: "View Invoices", glyph: "billing" },
  "Mark as Complete": { title: "Mark as Complete", glyph: "status" },
  "Delete / Revoke": { title: "Delete / Revoke", glyph: "delete" },
  "Re-issue": { title: "Re-issue", glyph: "document" },
  "Manage Members Sync MSO": { title: "Manage Members & Sync MSO", glyph: "sync" },
  Leaderboard: { title: "Leaderboard", glyph: "leaderboard" },
};

function isUserLinkToken(value: string): value is UserLinkIconName {
  return value in userLinkMeta;
}

function isGenericActionToken(value: string): value is keyof typeof genericActionMeta {
  return value in genericActionMeta;
}

function renderUserLinkGlyph(name: UserLinkIconName) {
  switch (name) {
    case "accountDetails":
      return (
        <>
          <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" />
          <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" />
        </>
      );
    case "preferences":
      return (
        <>
          <path d="M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4Z" />
          <path d="M7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7Z" />
          <path d="M19.0277 15.6255C18.6859 15.5646 18.1941 15.6534 17.682 16.1829C17.4936 16.3777 17.2342 16.4877 16.9632 16.4877C16.6922 16.4877 16.4328 16.3777 16.2444 16.1829C15.7322 15.6534 15.2405 15.5646 14.8987 15.6255C14.5381 15.6897 14.2179 15.9384 14.0623 16.3275C13.8048 16.9713 13.9014 18.662 16.9632 20.4617C20.0249 18.662 20.1216 16.9713 19.864 16.3275C19.7084 15.9384 19.3882 15.6897 19.0277 15.6255Z" />
          <path d="M21.721 15.5847C22.5748 17.7191 21.2654 20.429 17.437 22.4892C17.1412 22.6484 16.7852 22.6484 16.4893 22.4892C12.6609 20.4291 11.3516 17.7191 12.2053 15.5847C12.6117 14.5689 13.4917 13.8446 14.5481 13.6565C15.3567 13.5125 16.2032 13.6915 16.9632 14.1924C17.7232 13.6915 18.5697 13.5125 19.3783 13.6565C20.4347 13.8446 21.3147 14.5689 21.721 15.5847Z" />
          <path d="M9.92597 14.2049C10.1345 14.7163 9.889 15.2999 9.3776 15.5084C7.06131 16.453 5.5 18.5813 5.5 20.9999" />
        </>
      );
    case "billing":
      return (
        <>
          <path d="M6.25 6h11.5" />
          <path d="M4.5 6h13c.8284 0 1.5.67157 1.5 1.5V16.5c0 .8284-.6716 1.5-1.5 1.5h-13c-.82843 0-1.5-.6716-1.5-1.5v-9C3 6.67157 3.67157 6 4.5 6Z" />
          <path d="M14.5 11h3" />
          <circle cx="13.2" cy="11" r="0.75" fill="currentColor" stroke="none" />
          <path d="m10.6 6-2.3-3-4.2 2.7" />
        </>
      );
    case "transactions":
      return (
        <>
          <path d="M21.6389 14.3957H17.5906C16.1042 14.3948 14.8993 13.1909 14.8984 11.7045C14.8984 10.218 16.1042 9.01409 17.5906 9.01318H21.6389" />
          <path d="M18.0485 11.6429H17.7369" />
          <path d="M7.74766 3H16.3911C19.2892 3 21.6388 5.34951 21.6388 8.24766V15.4247C21.6388 18.3229 19.2892 20.6724 16.3911 20.6724H7.74766C4.84951 20.6724 2.5 18.3229 2.5 15.4247V8.24766C2.5 5.34951 4.84951 3 7.74766 3Z" />
        </>
      );
    case "loginHistory":
      return (
        <>
          <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" />
          <path d="M3.41003 22C3.41003 18.13 7.26003 15 12 15C12.96 15 13.89 15.13 14.76 15.37" />
          <path d="M22 18C22 18.75 21.79 19.46 21.42 20.06C21.21 20.42 20.94 20.74 20.63 21C19.93 21.63 19.01 22 18 22C16.54 22 15.27 21.22 14.58 20.06C14.21 19.46 14 18.75 14 18C14 16.74 14.58 15.61 15.5 14.88C16.19 14.33 17.06 14 18 14C20.21 14 22 15.79 22 18Z" />
          <path d="M16 18H20M20 18L18 16M20 18L18 20" />
        </>
      );
    case "activityStats":
      return (
        <>
          <path d="M8 22H16C20 22 22 20 22 16V8C22 4 20 2 16 2H8C4 2 2 4 2 8V16C2 20 4 22 8 22Z" />
          <path d="M7 10.7402V16.0002" />
          <path d="M12 7V16" />
          <path d="M17 13.2402V16.0002" />
        </>
      );
    case "posts":
      return (
        <>
          <path d="M8 2V5" />
          <path d="M16 2V5" />
          <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" />
          <path d="M8 11H16" />
          <path d="M8 16H12" />
        </>
      );
    case "subscriptions":
      return (
        <>
          <path d="M8 2V5" />
          <path d="M16 2V5" />
          <path d="M3.5 9.09H20.5" />
          <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" />
        </>
      );
    case "enrollments":
      return (
        <>
          <path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" />
          <path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" />
          <path d="M7 13H13" />
          <path d="M7 17H11" />
        </>
      );
    case "certificates":
      return (
        <>
          <path d="M10.8 12.5 11.1 11.6C11.15 11.47 11.24 11.35 11.35 11.27C11.46 11.19 11.59 11.15 11.73 11.15H12.48C12.61 11.15 12.74 11.11 12.85 11.04L13.46 10.62C13.57 10.54 13.7 10.5 13.84 10.5C13.98 10.5 14.11 10.54 14.22 10.62L14.83 11.04C14.94 11.11 15.07 11.15 15.2 11.15H15.95C16.09 11.15 16.22 11.19 16.33 11.27C16.44 11.35 16.53 11.46 16.58 11.59L16.84 12.32C16.88 12.45 16.96 12.56 17.06 12.64L17.64 13.12C17.75 13.21 17.83 13.33 17.87 13.46C17.91 13.6 17.91 13.74 17.87 13.87L17.67 14.58C17.63 14.71 17.63 14.85 17.67 14.98L17.89 15.72C17.93 15.85 17.93 15.99 17.89 16.13C17.85 16.26 17.77 16.38 17.66 16.47L16.9 17.04L16.59 17.95C16.54 18.08 16.46 18.2 16.34 18.28C16.22 18.37 16.09 18.41 15.95 18.41H14.99L14.18 18.98C14.07 19.06 13.94 19.1 13.8 19.1C13.66 19.1 13.53 19.06 13.42 18.98L12.63 18.43H11.67C11.53 18.42 11.39 18.38 11.28 18.3C11.17 18.22 11.08 18.1 11.03 17.97L10.71 17.06L9.94 16.47C9.83 16.38 9.75 16.26 9.71 16.12C9.67 15.99 9.67 15.84 9.71 15.71L9.92 14.98C9.96 14.85 9.96 14.71 9.92 14.58L9.7 13.85C9.67 13.72 9.68 13.58 9.72 13.45C9.77 13.32 9.85 13.2 9.96 13.12L10.8 12.5Z" />
          <path d="M11.1 17.1 9.5 19.9l1.6-.17.9 1.34 1-2.55" />
          <path d="M16.9 17.1 18.5 19.9l-1.6-.17-.9 1.34-1-2.55" />
        </>
      );
    case "reviews":
      return (
        <path d="M22.954 9.395C22.832 9.017 22.481 8.756 22.058 8.747L15.298 8.823L12.878 1.628C12.746 1.252 12.39 1 11.992 1H11.99C11.591 1 11.236 1.254 11.103 1.639L8.72301 8.822L1.92101 8.686C1.52101 8.693 1.16901 8.953 1.04601 9.333C0.922011 9.714 1.05401 10.132 1.36001 10.361L6.82101 14.607L4.55601 21.791C4.44101 22.173 4.58101 22.588 4.90501 22.821C5.23101 23.056 5.66501 23.056 5.99101 22.829L12.121 18.526L17.994 22.83C18.155 22.942 18.343 22.998 18.531 22.998C18.726 22.998 18.919 22.938 19.083 22.819C19.406 22.583 19.544 22.169 19.424 21.777L17.129 14.74L22.628 10.43C22.946 10.189 23.077 9.772 22.954 9.393V9.395Z" />
      );
    case "spaces":
      return (
        <>
          <rect x="3" y="3" width="5.4" height="5.4" rx="1.2" />
          <rect x="11.6" y="3" width="5.4" height="5.4" rx="1.2" />
          <rect x="3" y="11.6" width="5.4" height="5.4" rx="1.2" />
          <rect x="11.6" y="11.6" width="5.4" height="5.4" rx="1.2" />
        </>
      );
    case "apiLog":
      return (
        <>
          <path d="M5 9.897c0-1.714 1.46-3.104 3.26-3.104c.275-1.22 1.255-2.215 2.572-2.611c1.317-.397 2.77-.134 3.811 .69c1.042 .822 1.514 2.08 1.239 3.3h.693a2.42 2.42 0 0 1 2.425 2.414a2.42 2.42 0 0 1 -2.425 2.414h-8.315c-1.8 0-3.26-1.39-3.26-3.103z" />
          <path d="M12 13v3" />
          <path d="M12 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M14 18h7" />
          <path d="M3 18h7" />
        </>
      );
  }
}

function renderGenericActionGlyph(name: GenericActionGlyphName) {
  switch (name) {
    case "view":
      return (
        <>
          <path d="M2.5 12S6 5.5 12 5.5S21.5 12 21.5 12S18 18.5 12 18.5S2.5 12 2.5 12Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      );
    case "links":
      return (
        <>
          <path d="M10 14L14 10" />
          <path d="M8.5 16.5L6.4 18.6C5.1 19.9 3 19.9 1.7 18.6C0.4 17.3 0.4 15.2 1.7 13.9L3.8 11.8" />
          <path d="M15.5 7.5L17.6 5.4C18.9 4.1 21 4.1 22.3 5.4C23.6 6.7 23.6 8.8 22.3 10.1L20.2 12.2" />
        </>
      );
    case "profile":
      return (
        <>
          <path d="M12 12C14.7614 12 17 9.7614 17 7S14.7614 2 12 2S7 4.2386 7 7S9.2386 12 12 12Z" />
          <path d="M4 21C4 17.6863 7.5817 15 12 15C16.4183 15 20 17.6863 20 21" />
        </>
      );
    case "members":
      return (
        <>
          <path d="M9 11C10.6569 11 12 9.6569 12 8S10.6569 5 9 5S6 6.3431 6 8S7.3431 11 9 11Z" />
          <path d="M17 10C18.3807 10 19.5 8.8807 19.5 7.5S18.3807 5 17 5S14.5 6.1193 14.5 7.5S15.6193 10 17 10Z" />
          <path d="M3.5 19.5C3.5 17.0147 5.9624 15 9 15C12.0376 15 14.5 17.0147 14.5 19.5" />
          <path d="M14.5 18.5C14.8603 17.0041 16.2897 16 18 16C20.2091 16 22 17.567 22 19.5" />
        </>
      );
    case "courses":
      return (
        <>
          <path d="M4 6.5L12 3L20 6.5L12 10L4 6.5Z" />
          <path d="M4 12L12 15.5L20 12" />
          <path d="M4 17.5L12 21L20 17.5" />
        </>
      );
    case "users":
      return (
        <>
          <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" />
          <path d="M5.5 20C5.5 16.9624 8.41015 14.5 12 14.5C15.5899 14.5 18.5 16.9624 18.5 20" />
        </>
      );
    case "events":
      return (
        <>
          <path d="M8 2V5" />
          <path d="M16 2V5" />
          <path d="M3 9H21" />
          <rect x="3" y="4.5" width="18" height="16.5" rx="2.5" />
        </>
      );
    case "collection":
      return (
        <>
          <rect x="3" y="4" width="7" height="7" rx="1.5" />
          <rect x="14" y="4" width="7" height="7" rx="1.5" />
          <rect x="3" y="15" width="7" height="7" rx="1.5" />
          <rect x="14" y="15" width="7" height="7" rx="1.5" />
        </>
      );
    case "posts":
      return renderUserLinkGlyph("posts");
    case "certificates":
      return renderUserLinkGlyph("certificates");
    case "transactions":
      return renderUserLinkGlyph("transactions");
    case "sales":
      return (
        <>
          <path d="M12 3V21" />
          <path d="M16.5 7.5H10a2.5 2.5 0 0 0 0 5h4a2.5 2.5 0 0 1 0 5H7.5" />
        </>
      );
    case "coupon":
      return (
        <>
          <path d="M8 7.5H18.5V12C17.12 12 16 13.12 16 14.5S17.12 17 18.5 17V21.5H8C6.62 21.5 5.5 20.38 5.5 19V17.5C6.88 17.5 8 16.38 8 15S6.88 12.5 5.5 12.5V10C5.5 8.62 6.62 7.5 8 7.5Z" />
          <path d="M12 9.5V11" />
          <path d="M12 14V15.5" />
          <path d="M12 18.5V19.5" />
        </>
      );
    case "info":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10.5V16" />
          <circle cx="12" cy="7.5" r="0.75" fill="currentColor" stroke="none" />
        </>
      );
    case "analytics":
      return (
        <>
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M8 15.5V12" />
          <path d="M12 15.5V8.5" />
          <path d="M16 15.5V10.5" />
        </>
      );
    case "document":
      return (
        <>
          <path d="M8 3.5H14L18.5 8V18.5C18.5 19.8807 17.3807 21 16 21H8C6.61929 21 5.5 19.8807 5.5 18.5V6C5.5 4.61929 6.61929 3.5 8 3.5Z" />
          <path d="M14 3.5V8H18.5" />
          <path d="M8.8 12H15.2" />
          <path d="M8.8 15H13.2" />
        </>
      );
    case "checklist":
      return (
        <>
          <rect x="5.5" y="4" width="13" height="16.5" rx="2.5" />
          <path d="M9 9.2L10.4 10.6L13 8" />
          <path d="M9 14.2L10.4 15.6L13 13" />
          <path d="M14.8 9H16.5" />
          <path d="M14.8 14H16.5" />
        </>
      );
    case "mail":
      return (
        <>
          <rect x="4" y="6" width="16" height="12" rx="2.5" />
          <path d="M4.5 7L12 12.5L19.5 7" />
        </>
      );
    case "apiLog":
      return renderUserLinkGlyph("apiLog");
    case "edit":
      return (
        <>
          <path d="M4 20H8L18 10C18.5304 9.4696 18.8284 8.7502 18.8284 8C18.8284 7.2498 18.5304 6.5304 18 6C17.4696 5.4696 16.7502 5.1716 16 5.1716C15.2498 5.1716 14.5304 5.4696 14 6L4 16V20Z" />
          <path d="M13 7L17 11" />
        </>
      );
    case "delete":
      return (
        <>
          <path d="M4 7H20" />
          <path d="M9 7V4H15V7" />
          <path d="M7 7L8 20H16L17 7" />
        </>
      );
    case "approve":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 12.5L10.8 14.8L15.8 9.8" />
        </>
      );
    case "reject":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M9 9L15 15" />
          <path d="M15 9L9 15" />
        </>
      );
    case "reply":
      return (
        <>
          <path d="M10 8L5 12L10 16" />
          <path d="M6 12H13C17.4183 12 21 15.134 21 19" />
        </>
      );
    case "sync":
      return (
        <>
          <path d="M20 7V3H16" />
          <path d="M4 17V21H8" />
          <path d="M20 3C18.1124 4.6245 15.7163 5.5359 13.2308 5.5759C10.7452 5.6159 8.3211 4.7821 6.382 3.2198L4 1" />
          <path d="M4 21C5.8876 19.3755 8.2837 18.4641 10.7692 18.4241C13.2548 18.3841 15.6789 19.2179 17.618 20.7802L20 23" />
        </>
      );
    case "status":
      return (
        <>
          <path d="M6 12H18" />
          <path d="M12 6V18" />
          <circle cx="12" cy="12" r="9" />
        </>
      );
    case "invite":
      return (
        <>
          <path d="M12 12C14.7614 12 17 9.7614 17 7S14.7614 2 12 2S7 4.2386 7 7S9.2386 12 12 12Z" />
          <path d="M4 21C4 17.6863 7.5817 15 12 15C16.4183 15 20 17.6863 20 21" />
          <path d="M19 8H23" />
          <path d="M21 6V10" />
        </>
      );
    case "billing":
      return renderUserLinkGlyph("billing");
    case "leaderboard":
      return (
        <>
          <path d="M12 3L14.9 8.2L20.7 9.1L16.6 13.2L17.5 19L12 16.2L6.5 19L7.4 13.2L3.3 9.1L9.1 8.2L12 3Z" />
        </>
      );
  }
}

function renderTooltipLabel(label: string) {
  return (
    <span className="pointer-events-none invisible absolute bottom-[calc(100%+6px)] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-[4px] bg-text-primary px-[10px] py-[6px] text-[12px] font-medium leading-none text-white opacity-0 shadow-[0_8px_18px_rgba(15,23,42,0.18)] transition-all duration-200 group-hover:visible group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-within:visible group-focus-within:-translate-y-0.5 group-focus-within:opacity-100">
      {label}
    </span>
  );
}

function isDateLikeHeader(header: string) {
  const normalized = header.toLowerCase();
  return (
    normalized.includes("date") ||
    normalized.includes("time") ||
    normalized.includes("joined") ||
    normalized.includes("updated") ||
    normalized.includes("created") ||
    normalized.includes("applied") ||
    normalized.includes("renewal") ||
    normalized.includes("issued") ||
    normalized.includes("expires") ||
    normalized.includes("expiry") ||
    normalized.includes("submitted") ||
    normalized.includes("start") ||
    normalized.includes("last active") ||
    normalized.includes("last activity")
  );
}

function splitDateTimeValue(value: string) {
  const normalized = normalizeText(value);
  if (!normalized) {
    return null;
  }

  const dateMatches = normalized.match(
    /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:,\s*\d{4})?(?:\s+\d{1,2}:\d{2}(?::\d{2})?\s*(?:AM|PM)?)?/gi,
  );

  if (!dateMatches?.length) {
    return null;
  }

  const preferredMatch = dateMatches.find((match) => /\d{4}/.test(match)) ?? dateMatches[0];
  const display = preferredMatch
    .replace(/\s+\d{1,2}:\d{2}(?::\d{2})?\s*(?:AM|PM)?$/i, "")
    .replace(/,\s*$/, "")
    .trim();
  const timeMatch = preferredMatch.match(/(\d{1,2}:\d{2}(?::\d{2})?\s*(?:AM|PM)?)/i);
  const tooltip = timeMatch?.[1]?.trim() ?? (display !== normalized ? normalized : "");

  if (!display || display === normalized) {
    return null;
  }

  return {
    display,
    tooltip,
  };
}

function renderDateCell(value: string) {
  const normalized = normalizeText(value);
  const parsed = splitDateTimeValue(normalized);

  if (!parsed) {
    return <span className="text-text-secondary">{normalized || "--"}</span>;
  }

  return (
    <span className="group relative inline-flex text-text-secondary">
      <span>{parsed.display}</span>
      {parsed.tooltip ? renderTooltipLabel(parsed.tooltip) : null}
    </span>
  );
}

function renderIconGrid<T>(
  items: T[],
  getKey: (item: T) => string,
  getTitle: (item: T) => string,
  renderGlyph: (item: T) => ReactNode,
  options?: { maxVisible?: number; firstRowCount?: number; extraHiddenCount?: number },
) {
  const maxVisible = options?.maxVisible ?? 5;
  const firstRowCount = options?.firstRowCount ?? 3;
  const visibleItems = items.slice(0, maxVisible);
  const hiddenCount = items.length - visibleItems.length + (options?.extraHiddenCount ?? 0);
  const row1 = visibleItems.slice(0, firstRowCount);
  const row2 = visibleItems.slice(firstRowCount, maxVisible);
  const chipClassName =
    "inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F7FAFD] text-text-icon transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-soft";
  const moreChipClassName =
    "inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-line text-[12px] font-semibold leading-none text-text-icon transition-colors duration-200 hover:bg-brand hover:text-white";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        {row1.map((item) => (
          <span key={getKey(item)} className="group relative inline-flex">
            <span className={chipClassName}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                {renderGlyph(item)}
              </svg>
            </span>
            {renderTooltipLabel(getTitle(item))}
          </span>
        ))}
      </div>
      {row2.length > 0 || hiddenCount > 0 ? (
        <div className="flex items-center gap-1.5">
          {row2.map((item) => (
            <span key={getKey(item)} className="group relative inline-flex">
              <span className={chipClassName}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  {renderGlyph(item)}
                </svg>
              </span>
              {renderTooltipLabel(getTitle(item))}
            </span>
          ))}
          {hiddenCount > 0 ? (
            <span className="group relative inline-flex">
              <span className={moreChipClassName}>+{hiddenCount}</span>
              {renderTooltipLabel(
                items.length > maxVisible
                  ? items.slice(maxVisible).map((item) => getTitle(item)).join(", ")
                  : `${hiddenCount} more item${hiddenCount > 1 ? "s" : ""}`,
              )}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function renderUserLinkGrid(items: UserLinkIconName[]) {
  return renderIconGrid(
    items,
    (item) => item,
    (item) => userLinkMeta[item].title,
    (item) => renderUserLinkGlyph(item),
  );
}

function renderGenericActionGrid(items: (keyof typeof genericActionMeta)[], extraHiddenCount = 0) {
  return renderIconGrid(
    items,
    (item) => item,
    (item) => genericActionMeta[item].title,
    (item) => renderGenericActionGlyph(genericActionMeta[item].glyph),
    { maxVisible: 5, firstRowCount: 3, extraHiddenCount },
  );
}

function renderMixedActionGrid(
  items: Array<{ id: string; title: string; kind: "user" | "generic"; glyph: ReactNode }>,
  extraHiddenCount = 0,
) {
  return renderIconGrid(
    items,
    (item) => item.id,
    (item) => item.title,
    (item) => item.glyph,
    { maxVisible: 5, firstRowCount: 3, extraHiddenCount },
  );
}

function parseProgressValue(value: string) {
  const match = value.match(/(\d{1,3})\s*%/);
  if (!match) {
    return null;
  }

  const rawValue = Number(match[1]);
  return Math.max(0, Math.min(100, rawValue));
}

function progressTone(percent: number) {
  if (percent >= 100) {
    return "bg-[#52C41A]";
  }
  return "bg-[#1F8FFF]";
}

function renderProgressCell(value: string) {
  const normalized = normalizeText(value);
  const percent = parseProgressValue(normalized);
  const detail = normalized.replace(/(\d{1,3})\s*%/, "").trim();

  if (percent == null) {
    return <span className="text-text-primary">{normalized || "--"}</span>;
  }

  return (
    <div className="group relative min-w-[130px]">
      <div className="mb-2 inline-flex text-[18px] font-medium leading-none text-text-primary">{percent}%</div>
      {detail ? (
        <span className="pointer-events-none invisible absolute bottom-[calc(100%+8px)] left-0 z-20 max-w-[220px] rounded-[6px] bg-text-primary px-3 py-2 text-[12px] font-medium leading-snug text-white opacity-0 shadow-[0_8px_18px_rgba(15,23,42,0.18)] transition-all duration-200 group-hover:visible group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-within:visible group-focus-within:-translate-y-0.5 group-focus-within:opacity-100">
          {detail}
        </span>
      ) : null}
      <div className="h-[6px] rounded-full bg-[#E6EAF0]">
        <div className={`h-[6px] rounded-full ${progressTone(percent)}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function LegacyActionMenuCell({ header, value }: { header: string; value: string }) {
  const { notify } = useToast();
  const [open, setOpen] = useState(false);
  const items = buildPresetTableActionItems(splitActionLikeText(value));

  if (items.length === 0) {
    return <span className="text-text-secondary">--</span>;
  }

  return (
    <TableActionMenu
      items={items}
      open={open}
      onToggle={() => setOpen((current) => !current)}
      onAction={(item) => {
        setOpen(false);
        notify(`${header}: ${item.label}`);
      }}
    />
  );
}

function renderCellValue(header: string, value: string) {
  const normalizedHeader = header.toLowerCase();
  const normalizedValue = normalizeText(value);
  const imageMatch = normalizedValue.match(/\[\[img:([^|\]]+)\|([^\]]*)\]\]/i);
  const inlineImage = imageMatch?.[1] ? imageMatch[1] : "";
  const inlineAlt = imageMatch?.[2] ? normalizeText(imageMatch[2]) : "";
  const textValue = normalizeText(normalizedValue.replace(/\[\[img:[^\]]+\]\]/gi, ""));

  if (!textValue && !inlineImage) {
    return <span className="text-text-secondary">--</span>;
  }

  if (inlineImage) {
    const thumbnail = isThumbnailToken(header, inlineAlt, textValue);
    const splitValue = splitPrimaryAndMeta(textValue || inlineAlt);
    const secondary = !isGenericImageAlt(inlineAlt) && inlineAlt !== splitValue.primary ? inlineAlt : splitValue.meta;

    return (
      <div className="flex items-center gap-3">
        <img
          src={inlineImage}
          alt={inlineAlt || textValue || header}
          className={thumbnail ? "h-10 w-14 rounded-md object-cover" : "h-10 w-10 rounded-full object-cover"}
        />
        <div className="min-w-0">
          <div className="truncate font-medium text-text-primary">{splitValue.primary || inlineAlt}</div>
          {secondary ? (
            <div className="truncate text-xs text-text-secondary">{secondary}</div>
          ) : null}
        </div>
      </div>
    );
  }

  if (
    normalizedHeader.includes("status") ||
    normalizedHeader.includes("severity") ||
    normalizedHeader.includes("result") ||
    normalizedHeader === "code"
  ) {
    return <Badge tone={toneForValue(textValue)}>{textValue}</Badge>;
  }

    if (
      normalizedHeader.includes("role") ||
      normalizedHeader.includes("type") ||
      normalizedHeader.includes("method") ||
      normalizedHeader.includes("model")
  ) {
    return (
      <span className="inline-flex rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-text-primary">
        {textValue}
      </span>
        );
      }

      if (isDateLikeHeader(normalizedHeader)) {
        return renderDateCell(textValue);
      }

      if (normalizedHeader.includes("progress")) {
        return renderProgressCell(textValue);
      }

    if (normalizedHeader.includes("tag")) {
    const items = textValue.split(",").map((item) => item.trim()).filter(Boolean);
    if (items.length === 0) {
      return <span className="text-text-secondary">--</span>;
    }

    const visibleItems = items.slice(0, 2);
    const hiddenItems = items.slice(2);

    return (
      <div className="flex min-w-[74px] flex-col items-start gap-1.5">
        {visibleItems.map((item) => (
          <span key={item} className="inline-flex min-h-7 items-center rounded-full bg-surface-muted px-3 text-[12px] font-medium leading-none text-text-primary">
            {item}
          </span>
        ))}
        {hiddenItems.length > 0 ? (
          <span
            title={hiddenItems.join(", ")}
            className="inline-flex min-h-7 cursor-pointer items-center rounded-full bg-surface-line px-3 text-[12px] font-semibold leading-none text-text-icon transition-colors duration-200 hover:bg-brand hover:text-white"
          >
            +{hiddenItems.length}
          </span>
        ) : null}
      </div>
    );
  }

  if (normalizedHeader.includes("engag")) {
    const items = textValue
      .replace(/ Like/gi, "| Like")
      .replace(/ Upvote/gi, "| Upvote")
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean);

    return (
      <div className="flex max-w-[180px] flex-wrap gap-1.5">
        {items.map((item) => (
          <span key={item} className="inline-flex rounded-full bg-surface-muted px-2 py-1 text-[11px] font-medium text-text-icon">
            {item}
          </span>
        ))}
      </div>
    );
  }

  if (normalizedHeader.includes("attach")) {
    return (
      <span className="inline-flex rounded-full bg-surface-page px-2.5 py-1 text-xs font-medium text-text-icon">
        {textValue}
      </span>
    );
  }

  if (isActionMenuHeader(header)) {
    return <LegacyActionMenuCell header={header} value={textValue} />;
  }

  if (normalizedHeader === "view" || normalizedHeader === "linked to" || normalizedHeader === "linked") {
    const items = splitActionLikeText(textValue);
    if (items.length === 0) {
      return <span className="text-text-secondary">--</span>;
    }

    const explicitMoreCount = items.reduce((total, item) => {
      const match = item.match(/^\+(\d+)$/);
      return total + Number(match?.[1] ?? 0);
    }, 0);
    const visibleItems = items.filter((item) => !/^\+\d+$/.test(item));

    const userLinkItems = visibleItems.filter(isUserLinkToken);
    if (userLinkItems.length === visibleItems.length && userLinkItems.length > 0) {
      return renderUserLinkGrid(userLinkItems);
    }

    const genericActionItems = visibleItems.filter(isGenericActionToken);
    if (genericActionItems.length === visibleItems.length && genericActionItems.length > 0) {
      return renderGenericActionGrid(genericActionItems, explicitMoreCount);
    }

    const recognizedItems: Array<{ id: string; title: string; kind: "user" | "generic"; glyph: ReactNode }> = [];

    visibleItems.forEach((item) => {
      if (isUserLinkToken(item)) {
        recognizedItems.push({
          id: item,
          title: userLinkMeta[item].title,
          kind: "user",
          glyph: renderUserLinkGlyph(item),
        });
        return;
      }

      if (isGenericActionToken(item)) {
        recognizedItems.push({
          id: item,
          title: genericActionMeta[item].title,
          kind: "generic",
          glyph: renderGenericActionGlyph(genericActionMeta[item].glyph),
        });
      }
    });

    if (recognizedItems.length > 0) {
      const unrecognizedCount = visibleItems.length - recognizedItems.length;
      return renderMixedActionGrid(recognizedItems, explicitMoreCount + unrecognizedCount);
    }

    return (
      <div className="flex max-w-[180px] flex-wrap gap-1.5">
        {items.slice(0, 4).map((item) => (
          <span
            key={item}
            className={`inline-flex rounded-md px-2 py-1 text-[11px] font-medium ${
              normalizedHeader.includes("action")
                ? "bg-surface-muted text-text-primary"
                : "bg-surface-page text-text-icon"
            }`}
          >
            {item}
          </span>
        ))}
        {items.length > 4 ? (
          <span className="inline-flex rounded-md bg-surface-line px-2 py-1 text-[11px] font-medium text-text-icon">
            +{items.length - 4}
          </span>
        ) : null}
      </div>
    );
  }

  return <span className="text-text-primary">{textValue}</span>;
}

function inferDatasetFields(dataset: Record<string, unknown>[]): DatasetField[] {
  const firstRow = dataset[0] ?? {};
  const priority = [
    "name",
    "title",
    "productId",
    "appId",
    "contractId",
    "email",
    "manager",
    "owner",
    "role",
    "type",
    "model",
    "status",
    "price",
    "amount",
    "utilization",
    "joined",
    "approvedDate",
    "applied",
    "created",
    "updated",
    "expiry",
  ];

  const keys = Object.keys(firstRow).filter((key) => !excludedDatasetKeys.has(key));
  const ordered = [
    ...priority.filter((key) => keys.includes(key)),
    ...keys.filter((key) => !priority.includes(key)),
  ].slice(0, 7);

  return ordered.map((key) => ({
    key,
    header: key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (value) => value.toUpperCase())
      .trim(),
  }));
}

function buildColumns(headers: readonly string[]): TableColumn<LegacyRow>[] {
  return headers.map((header, index) => ({
    id: `col_${index}`,
    header,
    cell: (row) =>
      renderCellValue(
        header,
        row[`col_${index}`] ?? "",
      ),
    sortValue: (row) => row[`col_${index}`] ?? "",
    searchValue: (row) => row[`col_${index}`] ?? "",
    className: index === 0 ? "min-w-[220px]" : "",
  }));
}

function buildTableRows(headers: readonly string[], rows: readonly (readonly string[])[]): LegacyRow[] {
  return rows.map((cells, rowIndex) => {
    const row: LegacyRow = { id: `legacy-row-${rowIndex + 1}` };
    headers.forEach((_, columnIndex) => {
      row[`col_${columnIndex}`] = normalizeText(cells[columnIndex] ?? "");
    });
    return row;
  });
}

function buildDatasetRows(dataset: Record<string, unknown>[], fields: DatasetField[]): LegacyRow[] {
  return dataset.map((entry, index) => {
    const row: LegacyRow = { id: String(entry.id ?? `${index + 1}`) };
    fields.forEach((field, fieldIndex) => {
      const imageValue = field.imageKey ? stringifyValue(getByPath(entry, field.imageKey)) : "";
      const subtitleValue = field.subtitleKey ? stringifyValue(getByPath(entry, field.subtitleKey)) : "";
      const mainValue = stringifyValue(getByPath(entry, field.key));
      row[`col_${fieldIndex}`] = imageValue
        ? `[[img:${imageValue}|${subtitleValue || mainValue}]] ${mainValue}`
        : mainValue;
    });
    return row;
  });
}

export function resolveLegacyTable(pageId: string, _tabId?: string, tabIndex = 0) {
  const page = legacyData[pageId as keyof typeof legacyData];
  if (!page) {
    return null;
  }

  const datasetConfig = datasetFieldMap[pageId];
  if (datasetConfig) {
    const dataset = page.datasets[datasetConfig.datasetKey as keyof typeof page.datasets] as
      | Record<string, unknown>[]
      | undefined;

    if (dataset?.length) {
      const headers = datasetConfig.fields.map((field) => field.header);
      return {
        columns: buildColumns(headers),
        rows: buildDatasetRows(dataset, datasetConfig.fields),
      };
    }
  }

  const datasetEntries = Object.entries(page.datasets).filter(
    ([key, value]) => key !== "statsData" && Array.isArray(value) && value.length > 0,
  ) as Array<[string, Record<string, unknown>[]]>;

  if (!page.tables.length && datasetEntries.length) {
    const [, dataset] = datasetEntries.sort((left, right) => right[1].length - left[1].length)[0];
    const fields = inferDatasetFields(dataset);
    return {
      columns: buildColumns(fields.map((field) => field.header)),
      rows: buildDatasetRows(dataset, fields),
    };
  }

  const selectedTable = page.tables[tabIndex] ?? page.tables[0];
  if (!selectedTable) {
    return null;
  }

  return {
    columns: buildColumns(selectedTable.headers.map((header) => normalizeText(header))),
    rows: buildTableRows(selectedTable.headers, selectedTable.rows),
  };
}

export function resolveLegacyStats(pageId: string): StatConfig[] | null {
  const page = legacyData[pageId as keyof typeof legacyData];
  const datasets = page?.datasets as { statsData?: readonly unknown[] } | undefined;
  const statsData = datasets?.statsData;

  if (!Array.isArray(statsData) || statsData.length === 0) {
    return null;
  }

  return statsData.map((item, index) => {
    const record = item as Record<string, unknown>;
    const label = stringifyValue(record.title) || `Metric ${index + 1}`;
    const iconSource = stringifyValue(record.icon) || label;
    const trendValue = stringifyValue((record.trend as Record<string, unknown> | undefined)?.value);

    return {
      id: stringifyValue(record.id) || `${pageId}-stat-${index + 1}`,
      label,
      value: stringifyValue(record.value) || "--",
      change: trendValue || undefined,
      tone: toneFromTrend(record.trend),
      icon: iconFromLegacyKey(iconSource),
    };
  });
}
