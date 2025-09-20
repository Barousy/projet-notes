import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  tenantName?: string;
  tenantSlug?: string;
}

export default function Layout({ children, tenantName, tenantSlug }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header tenantName={tenantName} tenantSlug={tenantSlug} />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
