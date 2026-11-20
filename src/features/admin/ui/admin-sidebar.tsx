"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface AdminNavItem {
  label: string;
  href: string;
  icon: "grid" | "store";
}

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapsed: () => void;
}

const adminNavItems: readonly AdminNavItem[] = [
  { label: "Overview", href: "/admin", icon: "grid" },
  { label: "View store", href: "/products", icon: "store" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === "/admin";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function AdminIcon({ name }: { name: AdminNavItem["icon"] }) {
  if (name === "store") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="size-5 shrink-0"
      >
        <path d="M3 9.5 5 3h14l2 6.5" />
        <path d="M5 13.5V21h14v-7.5" />
        <path d="M3 9.5a3 3 0 0 0 5.5 1.7A3 3 0 0 0 12 12a3 3 0 0 0 3.5-0.8 3 3 0 0 0 5.5-1.7" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="size-5 shrink-0"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-5"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-5"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function CollapseIcon({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-5"
    >
      {isCollapsed ? (
        <path d="m9 18 6-6-6-6" />
      ) : (
        <path d="m15 18-6-6 6-6" />
      )}
    </svg>
  );
}

interface AdminNavigationProps {
  pathname: string;
  collapsed?: boolean;
  onNavigate: () => void;
}

function AdminNavigation({
  pathname,
  collapsed = false,
  onNavigate,
}: AdminNavigationProps) {
  return (
    <nav aria-label="Admin navigation" className="mt-8">
      <ul className="space-y-1">
        {adminNavItems.map((item) => {
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

export function AdminSidebar({
  isCollapsed,
  onToggleCollapsed,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileSidebarRef = useRef<HTMLElement>(null);
  const mobileCloseButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMobileOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileCloseButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileOpen(false);
        window.requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = Array.from(
        mobileSidebarRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ) ?? [],
      );

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileOpen]);

  function closeMobileNavigation() {
    setIsMobileOpen(false);
  }

  function closeMobileNavigationAndRestoreFocus() {
    setIsMobileOpen(false);
    window.requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 md:hidden">
        <Link
          href="/admin"
          className="font-semibold tracking-tight text-neutral-950"
        >
          Couture Admin
        </Link>
        <button
          type="button"
          ref={mobileMenuButtonRef}
          aria-label="Open admin navigation"
          aria-expanded={isMobileOpen}
          aria-controls="mobile-admin-sidebar"
          onClick={() => setIsMobileOpen(true)}
          className="inline-flex size-10 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
        >
          <MenuIcon />
        </button>
      </header>

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
        <AdminNavigation
          pathname={pathname}
          collapsed={isCollapsed}
          onNavigate={closeMobileNavigation}
        />
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

      {isMobileOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            aria-label="Close admin navigation"
            tabIndex={-1}
            onClick={closeMobileNavigationAndRestoreFocus}
            className="absolute inset-0 bg-neutral-950/30"
          />
          <aside
            ref={mobileSidebarRef}
            id="mobile-admin-sidebar"
            role="dialog"
            aria-modal="true"
            aria-label="Admin navigation"
            className="absolute inset-y-0 left-0 w-[min(20rem,85vw)] border-r border-neutral-200 bg-white px-4 py-4 shadow-xl"
          >
            <div className="flex h-12 items-center justify-between">
              <Link
                href="/admin"
                className="font-semibold tracking-tight text-neutral-950"
                onClick={() => setIsMobileOpen(false)}
              >
                Couture Admin
              </Link>
              <button
                type="button"
                ref={mobileCloseButtonRef}
                aria-label="Close admin navigation"
                onClick={closeMobileNavigationAndRestoreFocus}
                className="inline-flex size-10 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
              >
                <CloseIcon />
              </button>
            </div>
            <AdminNavigation
              pathname={pathname}
              onNavigate={closeMobileNavigation}
            />
          </aside>
        </div>
      ) : null}
    </>
  );
}
