"use client";

import { useState, type ReactNode } from "react";
import { DesktopAdminSidebar } from "@/features/admin/ui/desktop-admin-sidebar";
import { MobileAdminSidebar } from "@/features/admin/ui/mobile-admin-sidebar";

interface AdminSidebarProviderProps {
  children: ReactNode;
}

export function AdminSidebarProvider({ children }: AdminSidebarProviderProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={
        isCollapsed
          ? "min-h-screen md:grid md:grid-cols-[5rem_minmax(0,1fr)]"
          : "min-h-screen md:grid md:grid-cols-[15rem_minmax(0,1fr)]"
      }
    >
      <MobileAdminSidebar />
      <DesktopAdminSidebar
        isCollapsed={isCollapsed}
        onToggleCollapsed={() => setIsCollapsed((current) => !current)}
      />
      <main className="min-w-0 px-4 py-6 md:px-8 md:py-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
