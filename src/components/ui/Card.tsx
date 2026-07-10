import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Conteneur neumorphique à la forme organique : même couleur que le fond,
 * relief par double ombre, coins asymétriques très arrondis (galet).
 */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-[2.2rem_1.5rem_2.2rem_1.5rem/1.5rem_2.2rem_1.5rem_2.2rem] bg-cream-100 shadow-neu ${className}`}
    >
      {children}
    </div>
  );
}
