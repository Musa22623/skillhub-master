import { Fragment, useState, type ReactNode } from "react";
import { useToast } from "@/app/providers/ToastProvider";
import { StatsGrid } from "@/app/components/page/StatsGrid";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";

type ContentUnit = {
  id: string;
  title: string;
  type: "Video" | "PDF" | "Assignment" | "Quiz";
  duration: string;
  preview: string;
  view: Array<{ id: string; label: string; icon: ReactNode }>;
  linkedTo: Array<{ id: string; label: string; icon: ReactNode }>;
  actions: string[];
};

type ContentSection = {
  id: string;
  title: string;
  access: "Public" | "Premium" | "Draft";
  drip: string;
  count: string;
  actions: string[];
  units: ContentUnit[];
};

const stats = [
  { id: "sections", label: "Total Sections", value: "12", icon: "products" as const },
  { id: "units", label: "Total Units", value: "48", icon: "document" as const },
  { id: "duration", label: "Total Duration", value: "18h 22m", icon: "calendar" as const },
  { id: "average", label: "Avg. Units/Section", value: "4.0", icon: "chart" as const },
];

const sections: ContentSection[] = [
  {
    id: "sec-1",
    title: "1. Introduction to UX Design",
    access: "Public",
    drip: "Immediate",
    count: "4 Units",
    actions: ["Edit Section", "Add Unit", "Delete"],
    units: [
      {
        id: "sec-1-unit-1",
        title: "1.1 What is User Experience?",
        type: "Video",
        duration: "04:25",
        preview: "Preview Available",
        view: [
          {
            id: "unit-details",
            label: "Unit Details",
            icon: (
              <>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 10V16" />
                <path d="M12 7.5H12.01" />
              </>
            ),
          },
          {
            id: "analytics",
            label: "Analytics",
            icon: (
              <>
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </>
            ),
          },
        ],
        linkedTo: [
          {
            id: "user-progress",
            label: "User Progress",
            icon: (
              <>
                <path d="M22 11.08V12A10 10 0 1 1 12 2" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </>
            ),
          },
        ],
        actions: ["Edit Unit", "View as Student", "Delete"],
      },
    ],
  },
  {
    id: "sec-2",
    title: "2. Research Methods",
    access: "Premium",
    drip: "Drip: 7 Days",
    count: "2 Units",
    actions: ["Edit Section", "Delete"],
    units: [
      {
        id: "sec-2-unit-1",
        title: "2.1 Research Guidelines",
        type: "PDF",
        duration: "15 pages",
        preview: "-",
        view: [
          {
            id: "unit-details",
            label: "Unit Details",
            icon: (
              <>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 10V16" />
                <path d="M12 7.5H12.01" />
              </>
            ),
          },
        ],
        linkedTo: [
          {
            id: "user-progress",
            label: "User Progress",
            icon: (
              <>
                <path d="M22 11.08V12A10 10 0 1 1 12 2" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </>
            ),
          },
        ],
        actions: ["Edit Unit", "Delete"],
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

function renderTooltip(label: string) {
  return (
    <span className="pointer-events-none invisible absolute bottom-[calc(100%+8px)] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-[4px] bg-text-primary px-[10px] py-[6px] text-[12px] font-medium leading-none text-white opacity-0 shadow-[0_8px_18px_rgba(15,23,42,0.18)] transition-all duration-200 group-hover:visible group-hover:-translate-y-0.5 group-hover:opacity-100">
      {label}
    </span>
  );
}

function CircularIconButton({ label, icon, onClick }: { label: string; icon: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F4F9FC] text-[#03314B] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand hover:text-white"
      aria-label={label}
      title={label}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[14px] w-[14px]"
        aria-hidden="true"
      >
        {icon}
      </svg>
      {renderTooltip(label)}
    </button>
  );
}

function OptionsMenu({
  items,
  open,
  onToggle,
  onAction,
}: {
  items: string[];
  open: boolean;
  onToggle: () => void;
  onAction: (action: string) => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#666666] transition-colors hover:bg-[#F4F9FC] hover:text-text-primary"
        aria-label="Actions"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z" />
        </svg>
      </button>
      {open ? (
        <div className="absolute right-0 top-[calc(100%+4px)] z-20 min-w-[170px] rounded-[8px] bg-white py-1 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
          {items.map((item, index) => {
            const danger = item.toLowerCase().includes("delete");
            const showDivider =
              index === items.length - 2 && items.some((value) => value.toLowerCase().includes("delete"));

            return (
              <Fragment key={item}>
                <button
                  type="button"
                  onClick={() => onAction(item)}
                  className={`flex w-full items-center px-4 py-2 text-left text-[13px] transition-colors hover:bg-[#F4F9FC] ${danger ? "text-[#FF4D4F]" : "text-text-primary"}`}
                >
                  {item}
                </button>
                {showDivider ? <div className="my-1 h-px bg-surface-line" /> : null}
              </Fragment>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function CourseContentPage() {
  const { notify } = useToast();
  const [expandedSectionIds, setExpandedSectionIds] = useState<string[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSectionIds((current) =>
      current.includes(sectionId) ? current.filter((id) => id !== sectionId) : [...current, sectionId],
    );
  };

  const runAction = (scope: string, action: string) => {
    setOpenMenuId(null);
    notify(`${scope}: ${action}`);
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

      <Card className="mb-6" bodyClassName="flex flex-col gap-3 p-5 md:flex-row md:items-center md:gap-4">
        <div className="relative w-full max-w-[400px]">
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
            className="flex min-h-10 w-full items-center rounded-md border border-surface-line bg-white pl-10 pr-10 text-left text-[14px] text-text-primary"
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
      </Card>

      <StatsGrid stats={stats} />

      <Card bodyClassName="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="w-[50px] border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase text-[#03314B]" />
                <th className="min-w-[350px] border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase text-[#03314B]">
                  Section / Unit Title
                </th>
                <th className="min-w-[120px] border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase text-[#03314B]">
                  Access / Type
                </th>
                <th className="min-w-[180px] border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase text-[#03314B]">
                  Drip / Duration
                </th>
                <th className="min-w-[120px] border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase text-[#03314B]">
                  Count / Preview
                </th>
                <th className="min-w-[120px] border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase text-[#03314B]">
                  View
                </th>
                <th className="min-w-[120px] border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase text-[#03314B]">
                  Linked To
                </th>
                <th className="w-[80px] border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase text-[#03314B]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section) => {
                const expanded = expandedSectionIds.includes(section.id);

                return (
                  <Fragment key={section.id}>
                    <tr>
                      <td className="border-b border-surface-line bg-[#FAFAFA] px-4 py-3 align-middle">
                        <button
                          type="button"
                          onClick={() => toggleSection(section.id)}
                          className={`inline-flex h-6 w-6 items-center justify-center text-[#666666] transition-transform ${expanded ? "rotate-90 text-brand" : ""}`}
                          aria-label={expanded ? "Collapse section" : "Expand section"}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>
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
                      <td className="border-b border-surface-line bg-[#FAFAFA] px-4 py-3 text-[13px] text-[#666666]">{section.count}</td>
                      <td className="border-b border-surface-line bg-[#FAFAFA] px-4 py-3" />
                      <td className="border-b border-surface-line bg-[#FAFAFA] px-4 py-3" />
                      <td className="border-b border-surface-line bg-[#FAFAFA] px-4 py-3">
                        <OptionsMenu
                          items={section.actions}
                          open={openMenuId === section.id}
                          onToggle={() => setOpenMenuId((current) => (current === section.id ? null : section.id))}
                          onAction={(action) => runAction(section.title, action)}
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
                                  {unit.type === "Video" ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                                      <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                  ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                      <polyline points="14 2 14 8 20 8" />
                                      <line x1="16" y1="13" x2="8" y2="13" />
                                      <line x1="16" y1="17" x2="8" y2="17" />
                                    </svg>
                                  )}
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
                                <span className="group relative inline-flex cursor-default text-[#52C41A]">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                                    <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12Z" />
                                    <circle cx="12" cy="12" r="3" />
                                  </svg>
                                  {renderTooltip(unit.preview)}
                                </span>
                              ) : (
                                <span className="text-[13px] text-[#666666]">{unit.preview}</span>
                              )}
                            </td>
                            <td className="border-b border-surface-line bg-white px-4 py-3">
                              <div className="flex items-center gap-1.5">
                                {unit.view.map((item) => (
                                  <CircularIconButton
                                    key={item.id}
                                    label={item.label}
                                    icon={item.icon}
                                    onClick={() => notify(item.label)}
                                  />
                                ))}
                              </div>
                            </td>
                            <td className="border-b border-surface-line bg-white px-4 py-3">
                              <div className="flex items-center gap-1.5">
                                {unit.linkedTo.map((item) => (
                                  <CircularIconButton
                                    key={item.id}
                                    label={item.label}
                                    icon={item.icon}
                                    onClick={() => notify(item.label)}
                                  />
                                ))}
                              </div>
                            </td>
                            <td className="border-b border-surface-line bg-white px-4 py-3">
                              <OptionsMenu
                                items={unit.actions}
                                open={openMenuId === unit.id}
                                onToggle={() => setOpenMenuId((current) => (current === unit.id ? null : unit.id))}
                                onAction={(action) => runAction(unit.title, action)}
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
