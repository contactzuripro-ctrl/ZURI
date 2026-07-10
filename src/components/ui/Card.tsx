import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Conteneur minimaliste à la forme organique : gris très clair, sans ombre
 * ni bordure, coins asymétriques très arrondis (galet).
 */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-[2.2rem_1.5rem_2.2rem_1.5rem/1.5rem_2.2rem_1.5rem_2.2rem] bg-surface ${className}`}
    >
      {children}
    </div>
  );
}
