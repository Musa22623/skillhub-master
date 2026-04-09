import { Badge } from "@/app/components/ui/Badge";
import { Card } from "@/app/components/ui/Card";
import { Icon } from "@/app/components/ui/Icon";
import type { StatConfig } from "@/app/components/types/ui";

type StatsGridProps = {
  stats: StatConfig[];
  density?: "compact" | "comfortable";
};

export function StatsGrid({ stats, density = "compact" }: StatsGridProps) {
  const comfortable = density === "comfortable";

  return (
    <div className={`${comfortable ? "mb-6 gap-4" : "mb-4 gap-3"} grid md:grid-cols-2 xl:grid-cols-4`}>
      {stats.map((stat) => (
        <Card
          key={stat.id}
          className="h-full"
          bodyClassName={`flex items-center ${comfortable ? "gap-4 p-5" : "gap-3 p-4"}`}
        >
          <div className={`flex shrink-0 items-center justify-center rounded-full bg-surface-muted text-text-icon ${comfortable ? "h-12 w-12" : "h-10 w-10"}`}>
            <Icon name={stat.icon} className={comfortable ? "h-6 w-6" : "h-5 w-5"} />
          </div>
          <div className="min-w-0">
            <p className={`${comfortable ? "text-xs" : "text-[11px]"} font-semibold uppercase tracking-wide text-text-secondary`}>{stat.label}</p>
            <div className="mt-1 flex items-center gap-2">
              <p className={`${comfortable ? "text-2xl" : "text-[24px]"} font-bold leading-none text-text-primary`}>{stat.value}</p>
              {stat.change ? <Badge tone={stat.tone}>{stat.change}</Badge> : null}
            </div>
            {stat.helper ? <p className={`mt-1 ${comfortable ? "text-xs" : "text-[11px]"} text-text-secondary`}>{stat.helper}</p> : null}
          </div>
        </Card>
      ))}
    </div>
  );
}
