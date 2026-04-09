import { Fragment, useMemo, useState } from "react";
import { useToast } from "@/app/providers/ToastProvider";
import { StatsGrid } from "@/app/components/page/StatsGrid";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { TableActionMenu, type TableActionMenuItem } from "@/app/components/ui/TableActionMenu";
import { TableExpandButton } from "@/app/components/ui/TableExpandButton";
import { renderTableGlyph, type TableGlyphName } from "@/app/components/ui/TableGlyphs";
import { TableIconButton } from "@/app/components/ui/TableIconButton";

type ContentLink = {
  id: string;
  label: string;
  glyph: TableGlyphName;
};

type ContentUnit = {
  id: string;
  title: string;
  type: "Video" | "PDF" | "Assignment" | "Quiz";
  duration: string;
  preview: string;
  view: ContentLink[];
  linkedTo: ContentLink[];
  actions: TableActionMenuItem[];
};

type ContentSection = {
  id: string;
  title: string;
  access: "Public" | "Premium" | "Draft";
  drip: string;
  countLabel?: string;
  actions: TableActionMenuItem[];
  units: ContentUnit[];
};

const sections: ContentSection[] = [
  {
    id: "sec-1",
    title: "1. Introduction to UX Design",
    access: "Public",
    drip: "Immediate",
    actions: [
      { id: "edit-section", label: "Edit Section", icon: renderTableGlyph("edit") },
      { id: "add-unit", label: "Add Unit", icon: renderTableGlyph("add") },
      { id: "delete-section", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
    ],
    units: [
      {
        id: "sec-1-unit-1",
        title: "1.1 What is User Experience?",
        type: "Video",
        duration: "04:25",
        preview: "Preview Available",
        view: [
          { id: "unit-details", label: "Unit Details", glyph: "details" },
          { id: "analytics", label: "Analytics", glyph: "analytics" },
        ],
        linkedTo: [{ id: "user-progress", label: "User Progress", glyph: "userProgress" }],
        actions: [
          { id: "edit-unit", label: "Edit Unit", icon: renderTableGlyph("edit") },
          { id: "view-student", label: "View as Student", icon: renderTableGlyph("studentView") },
          { id: "delete-unit", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
        ],
      },
      {
        id: "sec-1-unit-2",
        title: "1.2 UX vs UI Fundamentals",
        type: "Video",
        duration: "06:40",
        preview: "Preview Available",
        view: [
          { id: "unit-details", label: "Unit Details", glyph: "details" },
          { id: "analytics", label: "Analytics", glyph: "analytics" },
        ],
        linkedTo: [{ id: "user-progress", label: "User Progress", glyph: "userProgress" }],
        actions: [
          { id: "edit-unit", label: "Edit Unit", icon: renderTableGlyph("edit") },
          { id: "view-student", label: "View as Student", icon: renderTableGlyph("studentView") },
          { id: "delete-unit", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
        ],
      },
      {
        id: "sec-1-unit-3",
        title: "1.3 Course Roadmap & Outcomes",
        type: "PDF",
        duration: "8 pages",
        preview: "-",
        view: [{ id: "unit-details", label: "Unit Details", glyph: "details" }],
        linkedTo: [{ id: "user-progress", label: "User Progress", glyph: "userProgress" }],
        actions: [
          { id: "edit-unit", label: "Edit Unit", icon: renderTableGlyph("edit") },
          { id: "delete-unit", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
        ],
      },
      {
        id: "sec-1-unit-4",
        title: "1.4 Reflection Checkpoint",
        type: "Quiz",
        duration: "5 questions",
        preview: "-",
        view: [
          { id: "unit-details", label: "Unit Details", glyph: "details" },
          { id: "analytics", label: "Analytics", glyph: "analytics" },
        ],
        linkedTo: [{ id: "user-progress", label: "User Progress", glyph: "userProgress" }],
        actions: [
          { id: "edit-unit", label: "Edit Unit", icon: renderTableGlyph("edit") },
          { id: "delete-unit", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
        ],
      },
    ],
  },
  {
    id: "sec-2",
    title: "2. Research Methods",
    access: "Premium",
    drip: "Drip: 7 Days",
    actions: [
      { id: "edit-section", label: "Edit Section", icon: renderTableGlyph("edit") },
      { id: "add-unit", label: "Add Unit", icon: renderTableGlyph("add") },
      { id: "delete-section", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
    ],
    units: [
      {
        id: "sec-2-unit-1",
        title: "2.1 Research Guidelines",
        type: "PDF",
        duration: "15 pages",
        preview: "-",
        view: [{ id: "unit-details", label: "Unit Details", glyph: "details" }],
        linkedTo: [{ id: "user-progress", label: "User Progress", glyph: "userProgress" }],
        actions: [
          { id: "edit-unit", label: "Edit Unit", icon: renderTableGlyph("edit") },
          { id: "delete-unit", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
        ],
      },
      {
        id: "sec-2-unit-2",
        title: "2.2 Interview Script Template",
        type: "Assignment",
        duration: "Template + worksheet",
        preview: "-",
        view: [
          { id: "unit-details", label: "Unit Details", glyph: "details" },
          { id: "analytics", label: "Analytics", glyph: "analytics" },
        ],
        linkedTo: [{ id: "user-progress", label: "User Progress", glyph: "userProgress" }],
        actions: [
          { id: "edit-unit", label: "Edit Unit", icon: renderTableGlyph("edit") },
          { id: "view-student", label: "View as Student", icon: renderTableGlyph("studentView") },
          { id: "delete-unit", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
        ],
      },
      {
        id: "sec-2-unit-3",
        title: "2.3 Synthesis Walkthrough",
        type: "Video",
        duration: "08:10",
        preview: "Preview Available",
        view: [
          { id: "unit-details", label: "Unit Details", glyph: "details" },
          { id: "analytics", label: "Analytics", glyph: "analytics" },
        ],
        linkedTo: [{ id: "user-progress", label: "User Progress", glyph: "userProgress" }],
        actions: [
          { id: "edit-unit", label: "Edit Unit", icon: renderTableGlyph("edit") },
          { id: "view-student", label: "View as Student", icon: renderTableGlyph("studentView") },
          { id: "delete-unit", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
        ],
      },
    ],
  },
  {
    id: "sec-3",
    title: "3. Wireframing & Structure",
    access: "Public",
    drip: "Immediate",
    actions: [
      { id: "edit-section", label: "Edit Section", icon: renderTableGlyph("edit") },
      { id: "add-unit", label: "Add Unit", icon: renderTableGlyph("add") },
      { id: "delete-section", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
    ],
    units: [
      {
        id: "sec-3-unit-1",
        title: "3.1 Low-Fidelity Wireframes",
        type: "Video",
        duration: "09:45",
        preview: "Preview Available",
        view: [
          { id: "unit-details", label: "Unit Details", glyph: "details" },
          { id: "analytics", label: "Analytics", glyph: "analytics" },
        ],
        linkedTo: [{ id: "user-progress", label: "User Progress", glyph: "userProgress" }],
        actions: [
          { id: "edit-unit", label: "Edit Unit", icon: renderTableGlyph("edit") },
          { id: "view-student", label: "View as Student", icon: renderTableGlyph("studentView") },
          { id: "delete-unit", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
        ],
      },
      {
        id: "sec-3-unit-2",
        title: "3.2 Navigation Exercise",
        type: "Assignment",
        duration: "30 min activity",
        preview: "-",
        view: [{ id: "unit-details", label: "Unit Details", glyph: "details" }],
        linkedTo: [{ id: "user-progress", label: "User Progress", glyph: "userProgress" }],
        actions: [
          { id: "edit-unit", label: "Edit Unit", icon: renderTableGlyph("edit") },
          { id: "delete-unit", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
        ],
      },
      {
        id: "sec-3-unit-3",
        title: "3.3 Wireframe Review Quiz",
        type: "Quiz",
        duration: "7 questions",
        preview: "-",
        view: [
          { id: "unit-details", label: "Unit Details", glyph: "details" },
          { id: "analytics", label: "Analytics", glyph: "analytics" },
        ],
        linkedTo: [{ id: "user-progress", label: "User Progress", glyph: "userProgress" }],
        actions: [
          { id: "edit-unit", label: "Edit Unit", icon: renderTableGlyph("edit") },
          { id: "delete-unit", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
        ],
      },
    ],
  },
  {
    id: "sec-4",
    title: "4. Final Prototype",
    access: "Draft",
    drip: "Drip: 21 Days",
    actions: [
      { id: "edit-section", label: "Edit Section", icon: renderTableGlyph("edit") },
      { id: "add-unit", label: "Add Unit", icon: renderTableGlyph("add") },
      { id: "delete-section", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
    ],
    units: [
      {
        id: "sec-4-unit-1",
        title: "4.1 Prototype Brief",
        type: "PDF",
        duration: "12 pages",
        preview: "-",
        view: [{ id: "unit-details", label: "Unit Details", glyph: "details" }],
        linkedTo: [{ id: "user-progress", label: "User Progress", glyph: "userProgress" }],
        actions: [
          { id: "edit-unit", label: "Edit Unit", icon: renderTableGlyph("edit") },
          { id: "delete-unit", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
        ],
      },
      {
        id: "sec-4-unit-2",
        title: "4.2 Prototype Submission",
        type: "Assignment",
        duration: "Capstone handoff",
        preview: "-",
        view: [
          { id: "unit-details", label: "Unit Details", glyph: "details" },
          { id: "analytics", label: "Analytics", glyph: "analytics" },
        ],
        linkedTo: [{ id: "user-progress", label: "User Progress", glyph: "userProgress" }],
        actions: [
          { id: "edit-unit", label: "Edit Unit", icon: renderTableGlyph("edit") },
          { id: "view-student", label: "View as Student", icon: renderTableGlyph("studentView") },
          { id: "delete-unit", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
        ],
      },
    ],
  },
];

function pillClassName(value: ContentSection["access"] | ContentUnit["type"]) {
  switch (value) {
    case "Public":
      return "bg-[#F6FFED] text-[#52C41A]";
    case "Premium":
      return "bg-[#FFF2E8] text-[#FA541C]";
    case "Draft":
      return "border border-[#D9D9D9] bg-[#F5F5F5] text-[#595959]";
    case "Video":
      return "bg-[#FFF0F6] text-[#C41D7F]";
    case "Quiz":
      return "bg-[#E6FFFB] text-[#08979C]";
    case "PDF":
      return "bg-[#FFF7E6] text-[#D46B08]";
    case "Assignment":
      return "bg-[#F0F5FF] text-[#2F54EB]";
  }
}

function formatPreviewLabel(value: string) {
  if (value === "Preview Available") {
    return value;
  }
  return value === "-" ? "-" : value;
}

export function CourseContentHierarchyPage() {
  const { notify } = useToast();
  const [expandedSectionIds, setExpandedSectionIds] = useState<string[]>(() => sections.slice(0, 2).map((section) => section.id));
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const totalUnits = useMemo(
    () => sections.reduce((count, section) => count + section.units.length, 0),
    [],
  );

  const averageUnits = (totalUnits / sections.length).toFixed(1);
  const stats = [
    { id: "sections", label: "Total Sections", value: String(sections.length), icon: "products" as const },
    { id: "units", label: "Total Units", value: String(totalUnits), icon: "document" as const },
    { id: "duration", label: "Total Duration", value: "2h 14m", icon: "calendar" as const },
    { id: "average", label: "Avg. Units/Section", value: averageUnits, icon: "chart" as const },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSectionIds((current) =>
      current.includes(sectionId) ? current.filter((id) => id !== sectionId) : [...current, sectionId],
    );
  };

  const runAction = (scope: string, action: TableActionMenuItem) => {
    setOpenMenuId(null);
    notify(`${scope}: ${action.label}`);
  };

  return (
    <div className="page-container max-w-content">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold leading-tight text-text-primary">Course Content</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button icon="document">New Section</Button>
        </div>
      </div>

      <Card className="mb-6" bodyClassName="flex flex-col gap-3 p-6 md:flex-row md:items-center md:justify-between md:gap-5">
        <div className="flex w-full flex-col gap-2 md:max-w-[500px]">
          <div className="relative w-full">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666666]"
              aria-hidden="true"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
            </svg>
            <button
              type="button"
              onClick={() => notify("Course switcher opened.")}
              className="flex min-h-11 w-full items-center rounded-md border border-surface-line bg-white pl-10 pr-10 text-left text-[14px] text-text-primary"
              title="Click to switch course context"
            >
              Complete UX Design Masterclass
            </button>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666666]"
              aria-hidden="true"
            >
              <path d="M6 9L12 15L18 9" />
            </svg>
          </div>
          <p className="text-[13px] text-[#666666]">Select a course to manage its sections and learning units.</p>
        </div>
        <div className="rounded-[10px] bg-[#F8FCFF] px-4 py-3 text-[13px] text-[#4F5D6B]">
          <span className="font-medium text-text-primary">Context:</span> Editing the course outline, drip schedule, and student-facing learning flow.
        </div>
      </Card>

      <StatsGrid stats={stats} />

      <Card bodyClassName="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="w-[52px] border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase text-[#03314B]" />
                <th className="min-w-[360px] border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase text-[#03314B]">
                  Section / Unit Title
                </th>
                <th className="min-w-[140px] border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase text-[#03314B]">
                  Access / Type
                </th>
                <th className="min-w-[180px] border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase text-[#03314B]">
                  Drip / Duration
                </th>
                <th className="min-w-[130px] border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase text-[#03314B]">
                  Count / Preview
                </th>
                <th className="min-w-[120px] border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase text-[#03314B]">
                  View
                </th>
                <th className="min-w-[120px] border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase text-[#03314B]">
                  Linked To
                </th>
                <th className="w-[88px] border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase text-[#03314B]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section) => {
                const expanded = expandedSectionIds.includes(section.id);
                const countLabel = section.countLabel ?? `${section.units.length} Units`;

                return (
                  <Fragment key={section.id}>
                    <tr>
                      <td className="border-b border-surface-line bg-[#FAFAFA] px-4 py-3 align-middle">
                        <TableExpandButton expanded={expanded} onToggle={() => toggleSection(section.id)} />
                      </td>
                      <td className="border-b border-surface-line bg-[#FAFAFA] px-4 py-3 text-[14px] font-semibold text-text-primary">
                        {section.title}
                      </td>
                      <td className="border-b border-surface-line bg-[#FAFAFA] px-4 py-3">
                        <span className={`inline-flex rounded-full px-[10px] py-[4px] text-[11px] font-semibold uppercase ${pillClassName(section.access)}`}>
                          {section.access}
                        </span>
                      </td>
                      <td className="border-b border-surface-line bg-[#FAFAFA] px-4 py-3 text-[13px] text-[#666666]">{section.drip}</td>
                      <td className="border-b border-surface-line bg-[#FAFAFA] px-4 py-3 text-[13px] text-[#666666]">{countLabel}</td>
                      <td className="border-b border-surface-line bg-[#FAFAFA] px-4 py-3" />
                      <td className="border-b border-surface-line bg-[#FAFAFA] px-4 py-3" />
                      <td className="border-b border-surface-line bg-[#FAFAFA] px-4 py-3">
                        <TableActionMenu
                          items={section.actions}
                          open={openMenuId === section.id}
                          onToggle={() => setOpenMenuId((current) => (current === section.id ? null : section.id))}
                          onAction={(item) => runAction(section.title, item)}
                        />
                      </td>
                    </tr>
                    {expanded
                      ? section.units.map((unit) => (
                          <tr key={unit.id}>
                            <td className="border-b border-surface-line bg-white px-4 py-3" />
                            <td className="border-b border-surface-line bg-white px-4 py-3 shadow-[-3px_0_0_0_#458BC1_inset]">
                              <div className="flex items-center gap-3 pl-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#F4F9FC] text-[#03314B]">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                                    {renderTableGlyph(
                                      unit.type === "Video"
                                        ? "video"
                                        : unit.type === "PDF"
                                          ? "document"
                                          : unit.type === "Quiz"
                                            ? "quiz"
                                            : "assignment",
                                    )}
                                  </svg>
                                </div>
                                <span className="text-[14px] text-text-primary">{unit.title}</span>
                              </div>
                            </td>
                            <td className="border-b border-surface-line bg-white px-4 py-3">
                              <span className={`inline-flex rounded-full px-[10px] py-[4px] text-[11px] font-semibold uppercase ${pillClassName(unit.type)}`}>
                                {unit.type}
                              </span>
                            </td>
                            <td className="border-b border-surface-line bg-white px-4 py-3 text-[14px] text-text-primary">{unit.duration}</td>
                            <td className="border-b border-surface-line bg-white px-4 py-3">
                              {unit.preview === "Preview Available" ? (
                                <TableIconButton
                                  label={unit.preview}
                                  icon={renderTableGlyph("preview")}
                                  className="h-6 w-6 bg-transparent text-[#52C41A] hover:bg-transparent hover:text-[#52C41A]"
                                />
                              ) : (
                                <span className="text-[13px] text-[#666666]">{formatPreviewLabel(unit.preview)}</span>
                              )}
                            </td>
                            <td className="border-b border-surface-line bg-white px-4 py-3">
                              <div className="flex items-center gap-1.5">
                                {unit.view.map((item) => (
                                  <TableIconButton
                                    key={item.id}
                                    label={item.label}
                                    icon={renderTableGlyph(item.glyph)}
                                    onClick={() => notify(item.label)}
                                  />
                                ))}
                              </div>
                            </td>
                            <td className="border-b border-surface-line bg-white px-4 py-3">
                              <div className="flex items-center gap-1.5">
                                {unit.linkedTo.map((item) => (
                                  <TableIconButton
                                    key={item.id}
                                    label={item.label}
                                    icon={renderTableGlyph(item.glyph)}
                                    onClick={() => notify(item.label)}
                                  />
                                ))}
                              </div>
                            </td>
                            <td className="border-b border-surface-line bg-white px-4 py-3">
                              <TableActionMenu
                                items={unit.actions}
                                open={openMenuId === unit.id}
                                onToggle={() => setOpenMenuId((current) => (current === unit.id ? null : unit.id))}
                                onAction={(item) => runAction(unit.title, item)}
                              />
                            </td>
                          </tr>
                        ))
                      : null}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
