import { Fragment, type ReactNode } from "react";

export type TableActionMenuItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  tone?: "default" | "danger";
};

type TableActionMenuProps = {
  items: TableActionMenuItem[];
  open: boolean;
  onToggle: () => void;
  onAction: (item: TableActionMenuItem) => void;
};

export function TableActionMenu({ items, open, onToggle, onAction }: TableActionMenuProps) {
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
        <div className="absolute right-0 top-[calc(100%+4px)] z-20 min-w-[180px] rounded-[8px] bg-white py-1 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
          {items.map((item, index) => {
            const showDivider =
              index === items.length - 2 && items.some((value) => (value.tone ?? "default") === "danger");

            return (
              <Fragment key={item.id}>
                <button
                  type="button"
                  onClick={() => onAction(item)}
                  className={`flex w-full items-center gap-2 px-4 py-2 text-left text-[13px] transition-colors hover:bg-[#F4F9FC] ${
                    item.tone === "danger" ? "text-[#FF4D4F]" : "text-text-primary"
                  }`}
                >
                  {item.icon ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-[14px] w-[14px] shrink-0"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </svg>
                  ) : null}
                  <span>{item.label}</span>
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
