"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AdminNavigation } from "@/features/admin/ui/admin-navigation";
import { CloseIcon, MenuIcon } from "@/features/admin/ui/admin-icons";

export function MobileAdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  const closeAndRestoreFocus = useCallback(() => {
    setIsOpen(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeAndRestoreFocus();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = Array.from(
        drawerRef.current?.querySelectorAll<HTMLElement>(
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
  }, [closeAndRestoreFocus, isOpen]);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 md:hidden">
        <Link href="/admin" className="font-semibold tracking-tight text-neutral-950">
          Couture Admin
        </Link>
        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Open admin navigation"
          aria-expanded={isOpen}
          aria-controls="mobile-admin-sidebar"
          onClick={() => setIsOpen(true)}
          className="inline-flex size-10 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
        >
          <MenuIcon />
        </button>
      </header>

      {isOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            aria-label="Close admin navigation"
            tabIndex={-1}
            onClick={closeAndRestoreFocus}
            className="absolute inset-0 bg-neutral-950/30"
          />
          <aside
            ref={drawerRef}
            id="mobile-admin-sidebar"
            role="dialog"
            aria-modal="true"
            aria-label="Admin navigation"
            className="absolute inset-y-0 left-0 w-[min(20rem,85vw)] border-r border-neutral-200 bg-white px-4 py-4 shadow-xl"
          >
            <div className="flex h-12 items-center justify-between">
              <Link href="/admin" className="font-semibold tracking-tight text-neutral-950" onClick={closeAndRestoreFocus}>
                Couture Admin
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close admin navigation"
                onClick={closeAndRestoreFocus}
                className="inline-flex size-10 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
              >
                <CloseIcon />
              </button>
            </div>
            <AdminNavigation onNavigate={closeAndRestoreFocus} />
          </aside>
        </div>
      ) : null}
    </>
  );
}
