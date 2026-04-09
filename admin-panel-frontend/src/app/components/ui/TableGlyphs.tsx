import type { ReactNode } from "react";

export type TableGlyphName =
  | "details"
  | "analytics"
  | "userProgress"
  | "preview"
  | "approve"
  | "reject"
  | "sync"
  | "money"
  | "products"
  | "users"
  | "edit"
  | "add"
  | "delete"
  | "studentView"
  | "video"
  | "document"
  | "quiz"
  | "assignment";

const glyphs: Record<TableGlyphName, ReactNode> = {
  details: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10V16" />
      <path d="M12 7.5H12.01" />
    </>
  ),
  analytics: (
    <>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </>
  ),
  userProgress: (
    <>
      <path d="M22 11.08V12A10 10 0 1 1 12 2" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </>
  ),
  preview: (
    <>
      <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  approve: (
    <>
      <path d="M22 11.08V12A10 10 0 1 1 12 2" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </>
  ),
  reject: (
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="9" y1="9" x2="15" y2="15" />
      <line x1="15" y1="9" x2="9" y2="15" />
    </>
  ),
  sync: (
    <>
      <path d="M21.5 2v6h-6" />
      <path d="M2.5 22v-6h6" />
      <path d="M2 11.5a10 10 0 0 1 18.8-4.3" />
      <path d="M22 12.5a10 10 0 0 1-18.8 4.3" />
    </>
  ),
  money: (
    <>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </>
  ),
  products: (
    <>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    </>
  ),
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  edit: (
    <>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5A2.121 2.121 0 0 1 21.5 5.5L12 15l-4 1 1-4 9.5-9.5Z" />
    </>
  ),
  add: (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
  delete: (
    <>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </>
  ),
  studentView: (
    <>
      <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  video: <polygon points="5 3 19 12 5 21 5 3" />,
  document: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </>
  ),
  quiz: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.75 9A2.25 2.25 0 0 1 14 10c0 1.5-2 2-2 3.5" />
      <path d="M12 17H12.01" />
    </>
  ),
  assignment: (
    <>
      <path d="M9 3H15" />
      <path d="M10 6H14" />
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 12L11 14L15 10" />
    </>
  ),
};

export function renderTableGlyph(name: TableGlyphName) {
  return glyphs[name];
}
