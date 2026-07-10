import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";

/** Paramètres — informations du salon (écran à compléter). */
export default function ParametresPage() {
  return (
    <>
      <PageHeader title="Paramètres" />
      <div className="p-8">
        <Card className="p-6">
          <h2 className="text-lg font-bold">Informations du salon</h2>
          <dl className="mt-4 space-y-3 text-[15px]">
            <div className="flex justify-between border-b border-cream-200 pb-3">
              <dt className="text-ink-600">Nom du salon</dt>
              <dd className="font-semibold">Zuri</dd>
            </div>
            <div className="flex justify-between border-b border-cream-200 pb-3">
              <dt className="text-ink-600">Devise</dt>
              <dd className="font-semibold">Franc CFA (F)</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-600">Moyens de paiement</dt>
              <dd className="font-semibold">Orange Money · Wave · Espèces</dd>
            </div>
          </dl>
        </Card>
      </div>
    </>
  );
}
