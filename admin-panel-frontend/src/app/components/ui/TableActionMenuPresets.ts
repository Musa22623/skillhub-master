import type { TableActionMenuItem } from "@/app/components/ui/TableActionMenu";
import { renderTableGlyph, type TableGlyphName } from "@/app/components/ui/TableGlyphs";

const dangerPattern = /(delete|remove|revoke|reject|cancel|unpublish|deactivate|archive)/i;

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function inferActionGlyph(label: string): TableGlyphName {
  const normalized = label.trim().toLowerCase();

  if (/(preview|view)/.test(normalized)) {
    return "preview";
  }
  if (/(approve|publish|accept)/.test(normalized)) {
    return "approve";
  }
  if (/(reject|decline)/.test(normalized)) {
    return "reject";
  }
  if (/(delete|remove|revoke)/.test(normalized)) {
    return "delete";
  }
  if (/(manage|assign|invite|member|instructor|owner|user)/.test(normalized)) {
    return "users";
  }
  if (/(edit|change|update)/.test(normalized)) {
    return "edit";
  }
  if (/(sync|cancel|unpublish|deactivate|activate|retry|resend|mark)/.test(normalized)) {
    return "sync";
  }

  return "document";
}

export function buildPresetTableActionItems(labels: string[]): TableActionMenuItem[] {
  return labels.map((label, index) => ({
    id: `${slugify(label) || "action"}-${index + 1}`,
    label,
    icon: renderTableGlyph(inferActionGlyph(label)),
    tone: dangerPattern.test(label) ? "danger" : "default",
  }));
}
