import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { DailyPlanning } from "@/features/agenda/DailyPlanning";

/** Agenda — planning du jour en colonnes par employée. */
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
      <div className="p-8">
        <DailyPlanning />
      </div>
    </>
  );
}
