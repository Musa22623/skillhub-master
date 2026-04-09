"use client";

type TabItem = {
  id: string;
  label: string;
};

type TabsProps = {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
};

export function Tabs({ items, activeId, onChange }: TabsProps) {
  return (
    <div className="mb-6 border-b border-surface-line">
      <div className="flex flex-wrap gap-6">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`relative pb-3 text-sm font-medium transition ${
                active ? "font-semibold text-brand" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {item.label}
              {active ? <span className="absolute inset-x-0 bottom-[-1px] h-0.5 rounded-full bg-brand" /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
