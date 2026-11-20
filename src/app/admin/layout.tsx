export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <section className="max-w-7xl mx-auto px-4 py-8">{children}</section>;
}
