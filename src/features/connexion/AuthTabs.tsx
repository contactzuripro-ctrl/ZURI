export type AuthTab = "connexion" | "inscription";

interface AuthTabsProps {
  activeTab: AuthTab;
  onTabChange: (tab: AuthTab) => void;
}

const tabs: { id: AuthTab; label: string }[] = [
  { id: "connexion", label: "Connexion" },
  { id: "inscription", label: "Inscription" },
];

/**
 * Onglets Connexion / Inscription : l'actif en pilule rose pleine (comme le
 * menu du back-office), l'inactif discret sur le fond blanc de la page.
 */
export function AuthTabs({ activeTab, onTabChange }: AuthTabsProps) {
  return (
    <div className="flex rounded-full border border-plum-900/10 bg-plum-900/5 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 rounded-full py-2 text-[15px] font-semibold transition ${
            activeTab === tab.id
              ? "bg-accent-500 text-plum-950"
              : "text-plum-900/60 hover:bg-accent-500/15 hover:text-plum-900"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
