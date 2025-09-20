import "./globals.css"; import type { Metadata } from "next";
export const metadata: Metadata = { title: "projet-notes", description: "Multi-tenant notes/absences/Qur'an" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="fr"><body className="min-h-screen bg-white text-gray-900">{children}</body></html>);
}
