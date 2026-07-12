"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Décalage de départ en ms (pour un effet cascade entre blocs voisins). */
  delay?: number;
  className?: string;
}

/**
 * Fade-up au défilement, rejouable : le bloc apparaît en montant quand il
 * entre dans l'écran et se réarme quand il en sort (IntersectionObserver +
 * transition, pas de keyframe — l'animation se rejoue à chaque passage).
 */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
