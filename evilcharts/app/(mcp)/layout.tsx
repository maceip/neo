import { DocsSidebar } from "@/components/docs/layout/sidebar/docs-sidebar";
import DocsHeader from "@/components/docs/layout/header/docs-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DocsSidebar />
      <SidebarInset>
        {/* Header */}
        <DocsHeader />
        {/* Childrens */}
        <div className="p-6 w-full">{children}</div>
        {/* Request more charts */}
      </SidebarInset>
    </SidebarProvider>
  );
}
