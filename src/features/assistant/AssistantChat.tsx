"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { SendHorizontal } from "lucide-react";

interface ChatMessage {
  from: "zuri" | "user";
  text: string;
}

const welcomeMessage: ChatMessage = {
  from: "zuri",
  text: "Bonjour ! Je suis l'assistant du salon Zuri. Posez-moi une question sur l'agenda, les clientes, les paiements ou le stock.",
};

/* Réponse de démonstration — le vrai assistant (API) viendra plus tard. */
const demoReply: ChatMessage = {
  from: "zuri",
  text: "Merci pour votre message ! Je suis encore en apprentissage : bientôt, je saurai vous répondre pour de vrai.",
};

/**
 * Mini-chat de la modale assistant : fil de bulles (Zuri à gauche,
 * utilisatrice à droite) + champ « Écrivez à Zuri… » avec envoi par
 * Entrée ou bouton. UI seule : la réponse est un message de démonstration.
 */
export function AssistantChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [draft, setDraft] = useState("");
  const threadEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // block: "nearest" — ne fait défiler que le fil, pas la page derrière
    threadEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setMessages((current) => [...current, { from: "user", text }]);
    setDraft("");
    window.setTimeout(() => {
      setMessages((current) => [...current, demoReply]);
    }, 600);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[85%] rounded-[1.4rem_1rem_1.4rem_1rem/1rem_1.4rem_1rem_1.4rem] px-4 py-2.5 text-sm leading-relaxed ${
              message.from === "user"
                ? "self-end bg-plum-800 text-white"
                : "self-start bg-surface text-ink-900"
            }`}
          >
            {message.text}
          </div>
        ))}
        <div ref={threadEndRef} />
      </div>

      <form onSubmit={sendMessage} className="flex items-center gap-2">
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Écrivez à Zuri…"
          aria-label="Écrivez à Zuri"
          className="min-w-0 flex-1 rounded-full border border-hairline bg-surface px-4 py-2.5 text-sm text-ink-900 outline-none placeholder:text-ink-400 focus:border-accent-500"
        />
        <button
          type="submit"
          aria-label="Envoyer"
          disabled={!draft.trim()}
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-plum-800 text-white transition-all hover:bg-plum-700 active:scale-95 disabled:opacity-40"
        >
          <SendHorizontal size={17} strokeWidth={2} />
        </button>
      </form>
    </div>
  );
}
