/**
 * Halos de couleur fixés derrière la sidebar : c'est eux que le verre
 * dépoli (backdrop-blur) floute, rendant l'effet glassmorphism visible.
 */
export function GlassBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-y-0 left-0 -z-10 w-96 overflow-hidden bg-plum-900">
      <div className="absolute -top-24 -left-24 size-80 rounded-full bg-gold-500/50 blur-3xl" />
      <div className="absolute top-1/3 -left-10 size-72 rounded-full bg-plum-600/70 blur-3xl" />
      <div className="absolute bottom-0 left-16 size-80 rounded-full bg-gold-400/30 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-plum-950 blur-2xl" />
    </div>
  );
}
