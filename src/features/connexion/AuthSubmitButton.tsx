interface AuthSubmitButtonProps {
  label: string;
}

/** Bouton de validation des formulaires de connexion : prune plein, coins galet. */
export function AuthSubmitButton({ label }: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      className="mt-2 w-full rounded-tl-3xl rounded-tr-xl rounded-br-3xl rounded-bl-xl bg-plum-900 py-3 text-[15px] font-semibold text-white transition hover:bg-plum-800 active:scale-[0.99]"
    >
      {label}
    </button>
  );
}
