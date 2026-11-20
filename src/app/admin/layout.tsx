import { AdminSidebarProvider } from "@/features/admin/ui/admin-sidebar-provider";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <AdminSidebarProvider>
      {children}
    </AdminSidebarProvider>
  );
}
