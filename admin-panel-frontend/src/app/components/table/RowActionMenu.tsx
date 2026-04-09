import type { TableAction } from "@/app/components/types/ui";

type RowActionMenuProps<Row> = {
  row: Row;
  actions: TableAction<Row>[];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  onAction?: (message: string) => void;
};

export function RowActionMenu<Row>({
  row,
  actions,
  open,
  onToggle,
  onClose,
  onAction,
}: RowActionMenuProps<Row>) {
  return (
    <div className="relative flex justify-end">
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition hover:bg-surface-muted hover:text-text-primary"
        aria-label="Open row actions"
      >
        ...
      </button>
      {open ? (
        <div className="absolute right-0 top-[calc(100%+6px)] z-20 min-w-[220px] rounded-lg border border-surface-line bg-white py-2 shadow-lg">
          {actions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={() => {
                const message =
                  typeof action.message === "function" ? action.message(row) : action.message ?? action.label;
                onAction?.(message);
                onClose();
              }}
              className="block w-full px-4 py-2 text-left text-sm text-text-primary transition hover:bg-surface-muted"
            >
              {action.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
