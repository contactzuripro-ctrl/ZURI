"use client";

import { useState } from "react";
import { PackagePlus } from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Modal } from "@/components/ui/Modal";
import { ModalFooter } from "@/components/ui/ModalFooter";
import { FormField } from "@/components/ui/FormField";
import { SelectField } from "@/components/ui/SelectField";

/** Bouton « Ajouter un produit » du Stock + sa modale (UI seule pour l'instant). */
export function NewProductAction() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <PrimaryButton icon={<PackagePlus size={18} />} onClick={() => setOpen(true)}>
        Ajouter un produit
      </PrimaryButton>
      <Modal
        open={open}
        onClose={close}
        title="Ajouter un produit"
        subtitle="Ajouter un produit à l'inventaire du salon."
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            close();
          }}
        >
          <div className="space-y-4">
            <FormField
              label="Nom du produit"
              name="productName"
              placeholder="Mèches X-Pression"
            />
            <SelectField
              label="Catégorie"
              name="category"
              options={["Extensions", "Soins", "Coloration", "Onglerie", "Matériel"]}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Quantité en stock"
                name="quantity"
                type="number"
                placeholder="24"
              />
              <FormField
                label="Seuil d'alerte"
                name="alertThreshold"
                type="number"
                placeholder="10"
              />
            </div>
          </div>
          <ModalFooter submitLabel="Ajouter au stock" onCancel={close} />
        </form>
      </Modal>
    </>
  );
}
