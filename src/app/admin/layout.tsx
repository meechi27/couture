"use client";

import { useState } from "react";
import { AdminSidebar } from "@/features/admin/ui/admin-sidebar";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div
      className={
        isSidebarCollapsed
          ? "min-h-screen md:grid md:grid-cols-[5rem_minmax(0,1fr)]"
          : "min-h-screen md:grid md:grid-cols-[15rem_minmax(0,1fr)]"
      }
    >
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapsed={() => setIsSidebarCollapsed((current) => !current)}
      />
      <main className="min-w-0 px-4 py-6 md:px-8 md:py-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
