import Image from "next/image";

interface ClientAvatarProps {
  fullName: string;
  color: string;
  /** Photo de profil (dans /public) ; à défaut, initiales sur fond coloré. */
  photoUrl?: string;
  /** Taille Tailwind, ex. "size-10" (liste) ou "size-16" (fiche). */
  sizeClass?: string;
}

/** Initiales d'un nom complet : "Aya Kouassi" -> "AK". */
function initialsOf(fullName: string): string {
  return fullName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** Avatar de la cliente en forme de galet : photo, ou initiales en repli. */
export function ClientAvatar({
  fullName,
  color,
  photoUrl,
  sizeClass = "size-10",
}: ClientAvatarProps) {
  const pebbleShape = "rounded-[55%_45%_62%_38%/48%_60%_40%_52%]";

  if (photoUrl) {
    return (
      <span
        className={`relative shrink-0 overflow-hidden ${pebbleShape} ${sizeClass}`}
      >
        <Image
          src={photoUrl}
          alt={`Photo de ${fullName}`}
          fill
          sizes="64px"
          className="object-cover"
        />
      </span>
    );
  }

  return (
    <span
      className={`flex shrink-0 items-center justify-center ${pebbleShape} font-semibold text-white ${color} ${sizeClass}`}
    >
      {initialsOf(fullName)}
    </span>
  );
}
