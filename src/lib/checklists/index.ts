import { cafeChecklist } from "./cafe";
import { genericChecklist } from "./generic";
import type { ChecklistTemplate } from "./types";

const categoryAliases: Array<{ aliases: string[]; template: ChecklistTemplate }> = [
  {
    aliases: ["cafe", "café", "kedai kopi", "coffee shop", "coffeehouse", "coffee house"],
    template: cafeChecklist,
  },
];

function normalizeCategory(category: string): string {
  return category
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Resolve a user-facing business category to a deterministic checklist.
 * Unknown or empty categories always receive the generic checklist.
 */
export function getChecklistForCategory(category: string): ChecklistTemplate {
  const normalized = normalizeCategory(category);

  for (const entry of categoryAliases) {
    if (entry.aliases.some((alias) => {
      const normalizedAlias = normalizeCategory(alias);
      return normalized === normalizedAlias ||
        normalized.startsWith(`${normalizedAlias} `) ||
        normalized.includes(` ${normalizedAlias} `);
    })) {
      return entry.template;
    }
  }

  return genericChecklist;
}

export type { ChecklistTemplate, SelfCheckItem, ChecklistPriority } from "./types";
