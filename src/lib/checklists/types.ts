export type ChecklistPriority = "high" | "medium" | "low";

export interface SelfCheckItem {
  id: string;
  title: string;
  why: string;
  whatToCheck: string;
  howToFix: string;
  estimatedTime: string;
  priority: ChecklistPriority;
  appliesTo: string[];
}

export interface ChecklistTemplate {
  category: string;
  items: SelfCheckItem[];
}
