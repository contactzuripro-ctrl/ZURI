import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

/** Conteneur blanc arrondi utilisé par toutes les sections du dashboard. */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-cream-200 bg-white ${className}`}
    >
      {children}
    </div>
  );
}
