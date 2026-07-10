"use client";

import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { fieldLabelClass } from "@/components/ui/FormField";

interface PhotoFieldProps {
  label?: string;
  /** « galet » pour les photos de personnes, « arrondi » pour les prestations. */
  shape?: "galet" | "arrondi";
}

const shapeClasses = {
  galet: "rounded-[55%_45%_62%_38%/48%_60%_40%_52%]",
  arrondi: "rounded-2xl",
};

/**
 * Champ photo d'une modale : pastille cliquable (appareil photo, puis aperçu
 * de l'image choisie) + bouton. Aperçu local uniquement — rien n'est envoyé
 * tant qu'il n'y a pas de vraie API.
 */
export function PhotoField({
  label = "Photo de profil",
  shape = "galet",
}: PhotoFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const openPicker = () => inputRef.current?.click();

  const showPreview = (file: File | undefined) => {
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <div>
      <span className={fieldLabelClass}>{label}</span>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={openPicker}
          aria-label="Choisir une photo"
          className={`flex size-16 shrink-0 items-center justify-center overflow-hidden ${shapeClasses[shape]} border border-dashed border-ink-400 text-ink-400 transition-colors hover:border-accent-400 hover:text-accent-500`}
        >
          {previewUrl ? (
            /* Aperçu d'un blob local : next/image ne s'applique pas ici */
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="Aperçu de la photo choisie"
              className="size-full object-cover"
            />
          ) : (
            <Camera size={22} strokeWidth={1.6} />
          )}
        </button>
        <div>
          <button
            type="button"
            onClick={openPicker}
            className="rounded-full border border-hairline px-4 py-2 text-sm font-medium text-ink-900 transition-colors hover:border-accent-400 hover:text-accent-500"
          >
            {previewUrl ? "Changer la photo" : "Choisir une photo"}
          </button>
          <p className="mt-1.5 text-xs text-ink-400">JPG ou PNG</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          name="photo"
          accept="image/*"
          className="hidden"
          onChange={(event) => showPreview(event.target.files?.[0])}
        />
      </div>
    </div>
  );
}
