export interface AdminNavigationItem {
  label: string;
  href: string;
  icon: "grid" | "store";
}

export const adminNavigationItems: readonly AdminNavigationItem[] = [
  { label: "Overview", href: "/admin", icon: "grid" },
  { label: "View store", href: "/products", icon: "store" },
];
