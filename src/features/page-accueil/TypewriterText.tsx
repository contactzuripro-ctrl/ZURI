"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  /** Portion de `text` mise en boîte (fond plein) — la boîte grandit avec
      la frappe et disparaît à l'effacement. */
  highlight?: string;
  /** Classes de la boîte (fond, padding, couleur du texte). */
  highlightClassName?: string;
  className?: string;
}

/**
 * Texte tapé à la machine en boucle : lettre par lettre, pause, effacement,
 * puis on recommence — curseur clignotant au bout. Le texte complet reste
 * présent en invisible pour réserver la place (aucun saut de ligne pendant
 * la frappe).
 */
export function TypewriterText({
  text,
  highlight,
  highlightClassName = "",
  className = "",
}: TypewriterTextProps) {
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

  const highlightStart = highlight ? text.indexOf(highlight) : -1;
  const highlightEnd =
    highlightStart === -1 ? -1 : highlightStart + (highlight?.length ?? 0);

  const typedBefore = text.slice(
    0,
    highlightStart === -1 ? visibleLength : Math.min(visibleLength, highlightStart)
  );
  const typedHighlight =
    highlightStart === -1
      ? ""
      : text.slice(highlightStart, Math.min(visibleLength, highlightEnd));
  const typedAfter =
    highlightEnd === -1 ? "" : text.slice(highlightEnd, Math.max(visibleLength, highlightEnd));

  // Le curseur suit la couleur du texte courant (bg-current) : il reste
  // visible aussi bien hors de la boîte qu'à l'intérieur.
  const cursor = (
    <span className="animate-cursor-blink ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.12em] bg-current" />
  );
  const cursorInsideHighlight =
    typedHighlight.length > 0 && visibleLength <= highlightEnd;

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Réserve l'espace du texte complet — mêmes classes sur le fragment
          en boîte pour que son padding compte dans la réservation. */}
      <span aria-hidden className="invisible">
        {highlightStart === -1 ? (
          text
        ) : (
          <>
            {text.slice(0, highlightStart)}
            <span className={highlightClassName}>
              {text.slice(highlightStart, highlightEnd)}
            </span>
            {text.slice(highlightEnd)}
          </>
        )}
      </span>
      <span className="absolute inset-0">
        {typedBefore}
        {typedHighlight && (
          <span className={highlightClassName}>
            {typedHighlight}
            {cursorInsideHighlight && cursor}
          </span>
        )}
        {typedAfter}
        {!cursorInsideHighlight && cursor}
      </span>
    </span>
  );
}
