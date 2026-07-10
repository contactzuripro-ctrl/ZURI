"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Modal } from "@/components/ui/Modal";
import { ModalFooter } from "@/components/ui/ModalFooter";
import { FormField } from "@/components/ui/FormField";
import { PhotoField } from "@/components/ui/PhotoField";
import { TextareaField } from "@/components/ui/TextareaField";

/** Bouton « Nouvelle cliente » + sa modale (UI seule pour l'instant). */
export function NewClientAction() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <PrimaryButton icon={<UserPlus size={18} />} onClick={() => setOpen(true)}>
        Nouvelle cliente
      </PrimaryButton>
      <Modal
        open={open}
        onClose={close}
        title="Nouvelle cliente"
        subtitle="Ajouter une cliente au fichier du salon."
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            close();
          }}
        >
          <div className="space-y-4">
            <PhotoField />
            <FormField label="Nom complet" name="fullName" placeholder="Aya Kouassi" />
            <FormField
              label="Téléphone"
              name="phone"
              type="tel"
              placeholder="+225 07 08 09 10 11"
            />
            <FormField
              label="Prestation favorite"
              name="favoriteService"
              placeholder="Tresses box braids"
            />
            <TextareaField
              label="Notes privées (optionnel)"
              name="notes"
              placeholder="Allergies, préférences, produits utilisés…"
            />
          </div>
          <ModalFooter submitLabel="Ajouter la cliente" onCancel={close} />
        </form>
      </Modal>
    </>
  );
}
