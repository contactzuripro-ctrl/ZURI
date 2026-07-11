import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
