import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Conteneur neumorphique : même couleur que le fond, relief par double ombre.
 * Utilisé par toutes les sections du dashboard.
 */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-3xl bg-cream-100 shadow-neu ${className}`}>
      {children}
    </div>
  );
}
