/**
 * Blobs organiques très discrets fixés derrière le contenu du dashboard :
 * teintes rose/prune à faible opacité pour l'aspect naturel, sans gêner
 * la lecture — compatibles mode jour et mode nuit.
 */
export function OrganicBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-24 right-[-8rem] size-[26rem] rounded-[58%_42%_65%_35%/45%_60%_40%_55%] bg-accent-500/10" />
      <div className="absolute top-1/2 right-1/4 size-72 rounded-[45%_55%_38%_62%/60%_42%_58%_40%] bg-plum-600/5" />
      <div className="absolute -bottom-28 right-12 size-80 rounded-[52%_48%_60%_40%/55%_45%_62%_38%] bg-accent-400/10" />
    </div>
  );
}
