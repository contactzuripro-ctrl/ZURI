"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
}

/**
 * Texte tapé à la machine en boucle : lettre par lettre, pause, effacement,
 * puis on recommence — curseur clignotant au bout. Le texte complet reste
 * présent en invisible pour réserver la place (aucun saut de ligne pendant
 * la frappe).
 */
export function TypewriterText({ text, className = "" }: TypewriterTextProps) {
  const [visibleLength, setVisibleLength] = useState(0);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    let delay: number;
    if (!isErasing) {
      if (visibleLength < text.length) {
        delay = 70; // frappe
      } else {
        delay = 2400; // pause, phrase complète
      }
    } else {
      delay = visibleLength > 0 ? 30 : 600; // effacement, puis pause vide
    }

    const timer = window.setTimeout(() => {
      if (!isErasing) {
        if (visibleLength < text.length) setVisibleLength(visibleLength + 1);
        else setIsErasing(true);
      } else {
        if (visibleLength > 0) setVisibleLength(visibleLength - 1);
        else setIsErasing(false);
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [visibleLength, isErasing, text]);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Réserve l'espace du texte complet */}
      <span aria-hidden className="invisible">
        {text}
      </span>
      <span className="absolute inset-0">
        {text.slice(0, visibleLength)}
        <span className="animate-cursor-blink ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.12em] bg-accent-400" />
      </span>
    </span>
  );
}
