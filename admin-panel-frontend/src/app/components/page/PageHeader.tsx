import { Button } from "@/app/components/ui/Button";
import type { HeaderAction } from "@/app/components/types/ui";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: HeaderAction[];
  onAction?: (message: string) => void;
  density?: "compact" | "comfortable";
};

export function PageHeader({ title, description, actions = [], onAction, density = "compact" }: PageHeaderProps) {
  const comfortable = density === "comfortable";

  return (
    <header className={`${comfortable ? "mb-6 gap-4" : "mb-4 gap-3"} flex flex-col md:flex-row md:items-center md:justify-between`}>
      <div>
        <h1 className={`${comfortable ? "text-2xl" : "text-[26px]"} font-semibold leading-tight text-text-primary`}>{title}</h1>
        {description ? <p className={`mt-1 ${comfortable ? "text-sm" : "text-[13px]"} text-text-secondary`}>{description}</p> : null}
      </div>
      {actions.length > 0 ? (
        <div className={`flex flex-wrap ${comfortable ? "gap-3" : "gap-2.5"}`}>
          {actions.map((action) => (
            <Button
              key={action.id}
              variant={action.variant ?? "primary"}
              icon={action.icon}
              onClick={() => onAction?.(action.message ?? `${action.label} triggered`)}
            >
              {action.label}
            </Button>
          ))}
        </div>
      ) : null}
    </header>
  );
}
