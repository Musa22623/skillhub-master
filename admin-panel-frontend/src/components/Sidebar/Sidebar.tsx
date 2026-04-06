"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { menuConfig, MenuItem } from "./menu.config";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const [collapsedParents, setCollapsedParents] = useState<Set<string>>(
    () => new Set(),
  );

  useEffect(() => {
    setCollapsedParents(new Set());
  }, [pathname]);

  const toggleMenu = (key: string) => {
    setOpenMenu((prev) => {
      const closing = prev === key;
      setCollapsedParents((s) => {
        const next = new Set(s);
        if (closing) {
          next.add(key);
        } else {
          next.delete(key);
        }
        return next;
      });
      return closing ? null : key;
    });
  };

  const isActivePath = (path?: string) =>
    !!path && (pathname === path || pathname.startsWith(`${path}/`));

  const activeParentKey = useMemo(() => {
    for (const item of menuConfig) {
      if (!item.children) {
        continue;
      }

      for (const child of item.children) {
        if (isActivePath(child.path)) {
          return item.key;
        }

        if (child.children?.some((nested) => isActivePath(nested.path))) {
          return item.key;
        }
      }
    }

    return null;
  }, [pathname]);

  const handleClick = (item: MenuItem) => {
    if (item.path) {
      router.push(item.path);
    }
  };

  const renderMenu = (items: MenuItem[], depth = 0) => {
    return items.map((item) => {
      const isOpen =
        openMenu === item.key ||
        (openMenu === null &&
          activeParentKey === item.key &&
          !collapsedParents.has(item.key));
      const hasNestedGroups = depth === 0 && item.children?.some((child) => child.children);
      const isActive = isActivePath(item.path);
      const isParentActive = activeParentKey === item.key;

      if (item.children) {
        return (
          <div key={item.key} className="mb-0.5">
            <div
              className={`group flex cursor-pointer items-center justify-between rounded-[10px] px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
                isActive || isParentActive
                  ? "bg-gradient-to-r from-[var(--menu-active-bg-start)] to-[var(--menu-active-bg-end)] text-[var(--icon-default)]"
                  : "text-[var(--menu-text)] hover:bg-[var(--menu-hover-bg)] hover:text-[var(--icon-default)]"
              }`}
              onClick={() => toggleMenu(item.key)}
            >
              <div className="flex items-center">
                <span
                  className={`mr-3 h-5 w-5 shrink-0 ${
                    isActive || isParentActive
                      ? "text-[var(--icon-active)]"
                      : "text-[var(--mobile-secondary)] group-hover:text-[var(--button-glow)]"
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                  isActive || isParentActive
                    ? "text-[var(--icon-active)]"
                    : "text-[var(--mobile-secondary)] group-hover:text-[var(--button-glow)]"
                } ${isOpen ? "rotate-90" : ""}`}
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>

            <div
              className={`ml-5 overflow-hidden border-l-[3px] border-[var(--button-line)] pl-3 transition-all duration-300 ${
                isOpen ? "max-h-[1000px] py-1" : "max-h-0"
              }`}
            >
              <div className="space-y-0.5">
                {hasNestedGroups
                  ? item.children.map((child) =>
                      child.children ? (
                        <div key={child.key}>
                          <div className="px-3.5 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.5px] text-[var(--mobile-secondary)]">
                            {child.label}
                          </div>
                          {renderMenu(child.children, depth + 1)}
                        </div>
                      ) : (
                        <div key={child.key} className="mb-0.5">
                          {renderMenu([child], depth + 1)}
                        </div>
                      ),
                    )
                  : renderMenu(item.children, depth + 1)}
              </div>
            </div>
          </div>
        );
      }

      return (
        <div
          key={item.key}
          className={`group cursor-pointer rounded-lg px-3.5 py-2.5 text-[13px] font-medium transition-all duration-200 ${
            isActive
              ? "bg-[var(--menu-active-bg-start)] font-semibold text-[var(--button-glow)]"
              : "text-[var(--mobile-secondary)] hover:bg-[var(--mobile-hover)] hover:text-[var(--icon-default)]"
          }`}
          onClick={() => handleClick(item)}
        >
          <div className="flex items-center">
            {item.icon ? (
              <span
                className={`mr-3 h-5 w-5 shrink-0 ${
                  isActive
                    ? "text-[var(--button-glow)]"
                    : "text-[var(--mobile-secondary)] group-hover:text-[var(--icon-default)]"
                }`}
              >
                {item.icon}
              </span>
            ) : null}
            <span>{item.label}</span>
          </div>
        </div>
      );
    });
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-[100] hidden w-[280px] flex-col overflow-hidden border-r border-[var(--button-line)] bg-white shadow-[2px_0_12px_rgba(0,0,0,0.03)] lg:flex">
      <div className="border-b border-[var(--button-line)] bg-gradient-to-br from-[var(--dark-bg)] to-[var(--dark-button)] px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-gradient-to-br from-[var(--button-glow)] to-[var(--mobile-active)] text-xl font-bold text-white shadow-[0_4px_12px_rgba(69,139,193,0.25)]">
            P
          </div>
          <div>
            <div className="text-[18px] font-bold tracking-[-0.5px] text-white">Platform Admin</div>
            <div className="mt-0.5 text-[11px] uppercase tracking-[0.5px] text-white/75">Management Console</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {renderMenu(menuConfig)}
      </nav>

      <div className="border-t border-[var(--button-line)] bg-gradient-to-b from-white to-[var(--secondary-bg)] p-3">
        <div className="flex cursor-pointer items-center rounded-[10px] border border-[var(--button-line)] bg-white p-3 transition-all duration-200 hover:border-[var(--button-glow)] hover:shadow-[0_4px_12px_rgba(69,139,193,0.12)]">
          <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--button-glow)] to-[var(--mobile-active)] text-base font-semibold text-white">
            AD
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-[var(--menu-text)]">Admin User</div>
            <div className="truncate text-xs text-[var(--mobile-secondary)]">Super Administrator</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;