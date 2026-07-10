import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

/** Conteneur minimaliste : gris très clair, sans ombre ni bordure. */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-2xl bg-surface ${className}`}>{children}</div>
  );
}
