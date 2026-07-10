import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Conteneur en verre à la forme organique : translucide avec flou
 * d'arrière-plan et bords lumineux (utilitaire `glass` de globals.css),
 * coins asymétriques très arrondis (galet).
 */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`glass rounded-[2.2rem_1.5rem_2.2rem_1.5rem/1.5rem_2.2rem_1.5rem_2.2rem] ${className}`}
    >
      {children}
    </div>
  );
}
