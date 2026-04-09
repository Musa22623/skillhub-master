import Link from "next/link";
import { Icon } from "@/app/components/ui/Icon";
import type { NavItem } from "@/app/components/types/ui";

type SidebarProps = {
  mobileOpen: boolean;
  sections: NavItem[];
  expandedSections: Record<string, boolean>;
  isPathActive: (path?: string) => boolean;
  isSectionActive: (paths: Array<string | undefined>) => boolean;
  resolvePath: (path?: string) => string;
  onToggleMobile: () => void;
  onCloseMobile: () => void;
  onToggleSection: (sectionId: string) => void;
};

export function Sidebar({
  mobileOpen,
  sections,
  expandedSections,
  isPathActive,
  isSectionActive,
  resolvePath,
  onToggleMobile,
  onCloseMobile,
  onToggleSection,
}: SidebarProps) {
  return (
    <>
      <button
        type="button"
        aria-label="Open navigation"
        onClick={onToggleMobile}
        className="fixed left-4 top-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-surface-line bg-white text-text-icon shadow-lg md:hidden"
      >
        <span className="space-y-1">
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
        </span>
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-[280px] flex-col border-r border-surface-line bg-white shadow-panel transition-transform md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-surface-line bg-gradient-to-br from-brand-dark to-brand-deep px-5 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-gradient-to-br from-brand to-[#4FBAE9] text-xl font-bold text-white shadow-lg">
              P
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight text-white">Platform Admin</div>
              <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-white/75">Management Console</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {sections.map((section) => (
            <div key={section.id} className="mb-3">
              {section.children ? (
                <>
                  <button
                    type="button"
                    onClick={() => onToggleSection(section.id)}
                    className={`mb-2 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition ${
                      isSectionActive(section.children.map((child) => child.path))
                        ? "bg-gradient-to-r from-brand-soft to-[#F2F7FF] text-text-icon"
                        : "text-text-menu hover:bg-[#F5F5F5]"
                    }`}
                  >
                    {section.icon ? (
                      <Icon
                        name={section.icon}
                        className={`h-5 w-5 ${
                          isSectionActive(section.children.map((child) => child.path))
                            ? "text-brand"
                            : "text-text-secondary"
                        }`}
                      />
                    ) : null}
                    <span className="flex-1 text-left">{section.label}</span>
                    <span
                      className={`transition-transform ${
                        expandedSections[section.id] ? "rotate-90 text-brand" : "text-text-secondary"
                      }`}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </span>
                  </button>

                  {expandedSections[section.id] ? (
                    <div className="ml-5 border-l-[3px] border-surface-line pl-3">
                      {section.children.map((child, childIndex) => {
                        const previousGroup = childIndex > 0 ? section.children?.[childIndex - 1]?.group : undefined;
                        const showGroup = child.group && child.group !== previousGroup;

                        return (
                          <div key={child.id}>
                            {showGroup ? (
                              <div className="px-3 pb-1 pt-3 text-[11px] font-bold uppercase tracking-[0.08em] text-text-secondary">
                                {child.group}
                              </div>
                            ) : null}
                            <Link
                              href={resolvePath(child.path)}
                              onClick={onCloseMobile}
                              className={`relative mb-1 flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                                isPathActive(child.path)
                                  ? "bg-brand-soft text-brand before:absolute before:-left-[15px] before:top-0 before:h-full before:w-[3px] before:rounded-r before:bg-brand before:content-['']"
                                  : "text-text-secondary hover:bg-[#F5F5F5] hover:text-text-icon"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </>
              ) : (
                <Link
                  href={resolvePath(section.path)}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                    isPathActive(section.path)
                      ? "bg-gradient-to-r from-brand-soft to-[#F2F7FF] font-semibold text-text-icon"
                      : "text-text-menu hover:bg-[#F1F6F4]"
                  }`}
                >
                  {section.icon ? <Icon name={section.icon} className="h-5 w-5 text-text-secondary" /> : null}
                  <span>{section.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="border-t border-surface-line bg-gradient-to-b from-white to-surface-muted px-3 py-4">
          <div className="flex items-center gap-3 rounded-lg border border-surface-line bg-white px-3 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand to-[#4FBAE9] text-sm font-semibold text-white">
              AD
            </div>
            <div>
              <div className="text-sm font-semibold text-text-menu">Admin User</div>
              <div className="text-xs text-text-secondary">Super Administrator</div>
            </div>
          </div>
        </div>
      </aside>

      {mobileOpen ? (
        <button
          type="button"
          onClick={onCloseMobile}
          className="fixed inset-0 z-20 bg-black/30 md:hidden"
          aria-label="Close navigation"
        />
      ) : null}
    </>
  );
}
