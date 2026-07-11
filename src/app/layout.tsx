import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/components/layout/SidebarContext";
import { OrganicBackdrop } from "@/components/layout/OrganicBackdrop";
import { AssistantLauncher } from "@/features/assistant/AssistantLauncher";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zuri — Back-office",
  description: "Gestion du salon Zuri : agenda, clients, paiements, stock…",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Applique le thème mémorisé avant le premier rendu (pas de flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(localStorage.getItem("zuri-theme")==="dark")document.documentElement.classList.add("dark");`,
          }}
        />
      </head>
      <body className="flex min-h-screen">
        <OrganicBackdrop />
        <SidebarProvider>
          <Sidebar />
          <main className="flex-1 overflow-x-hidden">{children}</main>
          <AssistantLauncher />
        </SidebarProvider>
      </body>
    </html>
  );
}
