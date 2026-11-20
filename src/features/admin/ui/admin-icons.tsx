import type { AdminNavigationItem } from "@/features/admin/admin-navigation";

export function AdminIcon({ name }: { name: AdminNavigationItem["icon"] }) {
  if (name === "store") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5 shrink-0">
        <path d="M3 9.5 5 3h14l2 6.5" />
        <path d="M5 13.5V21h14v-7.5" />
        <path d="M3 9.5a3 3 0 0 0 5.5 1.7A3 3 0 0 0 12 12a3 3 0 0 0 3.5-.8 3 3 0 0 0 5.5-1.7" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5 shrink-0">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

export function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function CollapseIcon({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
      {isCollapsed ? <path d="m9 18 6-6-6-6" /> : <path d="m15 18-6-6 6-6" />}
    </svg>
  );
}
