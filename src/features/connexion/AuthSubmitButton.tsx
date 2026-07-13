interface AuthSubmitButtonProps {
  label: string;
  /** Vrai pendant l'appel à l'API : bouton désactivé + libellé d'attente. */
  pending?: boolean;
}

/** Bouton de validation des formulaires de connexion : prune plein, coins galet. */
export function AuthSubmitButton({ label, pending = false }: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 w-full rounded-tl-3xl rounded-tr-xl rounded-br-3xl rounded-bl-xl bg-plum-900 py-3 text-[15px] font-semibold text-white transition hover:bg-plum-800 active:scale-[0.99] disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? "Un instant…" : label}
    </button>
  );
}
