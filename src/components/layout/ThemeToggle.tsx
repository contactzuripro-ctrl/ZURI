"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_STORAGE_KEY = "zuri-theme";

/** Observe la classe `dark` de <html>, source de vérité du thème. */
function subscribeToThemeClass(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

/**
 * Bouton mode nuit du menu : bascule la classe `dark` sur <html> et
 * mémorise le choix dans localStorage (relu au chargement par un script
 * inline du layout pour éviter tout flash).
 */
interface ThemeToggleProps {
  /** Menu replié en rail (desktop) : icône seule, centrée, sans libellé. */
  collapsed?: boolean;
}

export function ThemeToggle({ collapsed = false }: ThemeToggleProps) {
  const isDark = useSyncExternalStore(
    subscribeToThemeClass,
    () => document.documentElement.classList.contains("dark"),
    () => false, // rendu serveur : mode jour par défaut
  );

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark", !isDark);
    localStorage.setItem(THEME_STORAGE_KEY, !isDark ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={collapsed ? (isDark ? "Mode jour" : "Mode nuit") : undefined}
      className={`flex w-full items-center gap-3 rounded-[1.6rem_1.1rem_1.7rem_1rem/1.1rem_1.7rem_1rem_1.6rem] px-4 py-3 text-[15px] text-cream-200 transition-colors hover:bg-accent-500/25 hover:text-accent-400 active:bg-accent-500/50 active:text-white ${
        collapsed ? "lg:justify-center lg:px-0" : ""
      }`}
    >
      {isDark ? (
        <Sun size={20} strokeWidth={1.8} className="shrink-0" />
      ) : (
        <Moon size={20} strokeWidth={1.8} className="shrink-0" />
      )}
      <span className={collapsed ? "lg:hidden" : ""}>
        {isDark ? "Mode jour" : "Mode nuit"}
      </span>
    </button>
  );
}
