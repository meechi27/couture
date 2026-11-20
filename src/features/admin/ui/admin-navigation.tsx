"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavigationItems } from "@/features/admin/admin-navigation";
import { AdminIcon } from "@/features/admin/ui/admin-icons";

interface AdminNavigationProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

function isActivePath(pathname: string, href: string) {
  return href === "/admin"
    ? pathname === "/admin"
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminNavigation({
  collapsed = false,
  onNavigate,
}: AdminNavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin navigation" className="mt-8">
      <ul className="space-y-1">
        {adminNavigationItems.map((item) => {
          const isActive = isActivePath(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                aria-label={collapsed ? item.label : undefined}
                title={collapsed ? item.label : undefined}
                onClick={onNavigate}
                className={
                  isActive
                    ? `flex min-h-11 items-center rounded-md bg-neutral-900 text-sm font-medium text-white ${collapsed ? "justify-center px-2" : "gap-3 px-3"}`
                    : `flex min-h-11 items-center rounded-md text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 ${collapsed ? "justify-center px-2" : "gap-3 px-3"}`
                }
              >
                <AdminIcon name={item.icon} />
                {collapsed ? null : item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
