"use client";

import Link from "next/link";
import { AdminNavigation } from "@/features/admin/ui/admin-navigation";
import { CollapseIcon } from "@/features/admin/ui/admin-icons";

interface DesktopAdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapsed: () => void;
}

export function DesktopAdminSidebar({
  isCollapsed,
  onToggleCollapsed,
}: DesktopAdminSidebarProps) {
  return (
    <aside className="relative sticky top-0 hidden h-screen border-r border-neutral-200 bg-white px-4 py-6 md:block">
      {isCollapsed ? (
        <Link
          href="/admin"
          aria-label="Couture Admin overview"
          title="Couture Admin"
          className="mx-auto flex size-11 items-center justify-center rounded-md text-sm font-bold text-neutral-950 hover:bg-neutral-100"
        >
          CA
        </Link>
      ) : (
        <Link
          href="/admin"
          className="block px-3 text-lg font-semibold tracking-tight text-neutral-950"
        >
          Couture Admin
        </Link>
      )}

      <AdminNavigation collapsed={isCollapsed} />

      <button
        type="button"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-expanded={!isCollapsed}
        onClick={onToggleCollapsed}
        className="absolute -right-5 top-20 inline-flex size-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
      >
        <CollapseIcon isCollapsed={isCollapsed} />
      </button>
    </aside>
  );
}
