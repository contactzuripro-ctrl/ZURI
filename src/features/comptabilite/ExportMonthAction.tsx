"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Modal } from "@/components/ui/Modal";
import { ModalFooter } from "@/components/ui/ModalFooter";
import { FormField } from "@/components/ui/FormField";
import { SelectField } from "@/components/ui/SelectField";

/** Bouton « Exporter le mois » de la Comptabilité + sa modale (UI seule pour l'instant). */
export function ExportMonthAction() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <PrimaryButton icon={<Download size={18} />} onClick={() => setOpen(true)}>
        Exporter le mois
      </PrimaryButton>
      <Modal
        open={open}
        onClose={close}
        title="Exporter le mois"
        subtitle="Générer le rapport comptable du mois choisi."
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            close();
          }}
        >
          <div className="space-y-4">
            <FormField label="Mois" name="month" type="month" defaultValue="2026-07" />
            <SelectField
              label="Format"
              name="format"
              options={["PDF", "Excel (.xlsx)"]}
            />
            <SelectField
              label="Contenu"
              name="content"
              options={[
                "Recettes et dépenses",
                "Recettes seulement",
                "Dépenses seulement",
              ]}
            />
          </div>
          <ModalFooter submitLabel="Exporter" onCancel={close} />
        </form>
      </Modal>
    </>
  );
}
