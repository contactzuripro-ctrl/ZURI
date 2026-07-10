"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Modal } from "@/components/ui/Modal";
import { ModalFooter } from "@/components/ui/ModalFooter";
import { FormField } from "@/components/ui/FormField";
import { SelectField } from "@/components/ui/SelectField";
import { employees } from "@/features/agenda/data";

/** Bouton « Nouveau rendez-vous » de l'Agenda + sa modale (UI seule pour l'instant). */
export function NewAppointmentAction() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <PrimaryButton icon={<Plus size={18} />} onClick={() => setOpen(true)}>
        Nouveau rendez-vous
      </PrimaryButton>
      <Modal
        open={open}
        onClose={close}
        title="Nouveau rendez-vous"
        subtitle="Planifier un rendez-vous pour une cliente."
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            close();
          }}
        >
          <div className="space-y-4">
            <FormField label="Cliente" name="clientName" placeholder="Aya Kouassi" />
            <SelectField
              label="Prestation"
              name="serviceName"
              options={[
                "Tresses box braids",
                "Tresses collées",
                "Coupe et brushing",
                "Coloration",
                "Défrisage + soin",
                "Manucure",
              ]}
            />
            <SelectField label="Employée" name="employeeName" options={[...employees]} />
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Date" name="date" type="date" defaultValue="2026-07-10" />
              <FormField label="Heure" name="startTime" type="time" defaultValue="09:00" />
            </div>
          </div>
          <ModalFooter submitLabel="Planifier" onCancel={close} />
        </form>
      </Modal>
    </>
  );
}
