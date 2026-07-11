import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/components/layout/SidebarContext";
import { OrganicBackdrop } from "@/components/layout/OrganicBackdrop";
import { AssistantLauncher } from "@/features/assistant/AssistantLauncher";

/**
 * Layout du back-office (toutes les pages de gestion) : sidebar en verre,
 * blobs de fond et assistant flottant. La page d'accueil publique
 * (`/accueil`) vit hors de ce groupe et n'hérite de rien de tout ça.
 */
export default function BackOfficeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <OrganicBackdrop />
      <SidebarProvider>
        <Sidebar />
        <main className="flex-1 overflow-x-hidden">{children}</main>
        <AssistantLauncher />
      </SidebarProvider>
    </div>
  );
}
