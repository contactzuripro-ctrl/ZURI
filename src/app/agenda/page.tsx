import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Calendar } from "@/features/agenda/Calendar";

/** Agenda — vrai calendrier : vue Mois et vue Jour par employée. */
export default function AgendaPage() {
  return (
    <>
      <PageHeader
        title="Agenda"
        action={
          <PrimaryButton icon={<Plus size={18} />}>
            Nouveau rendez-vous
          </PrimaryButton>
        }
      />
      <div className="px-10 py-8">
        <Calendar />
      </div>
    </>
  );
}
