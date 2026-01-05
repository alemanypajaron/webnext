import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import PresupuestoForm from '@/components/forms/PresupuestoForm';

export const metadata: Metadata = {
  title: 'Solicitar Presupuesto',
  description: 'Solicita un presupuesto sin compromiso para tu proyecto en Murcia. Arquitectos técnicos especializados.',
};

export default function PresupuestoPage() {
  return (
    <>
      <PageHeader
        badge="Presupuesto sin compromiso"
        title="Solicitar Presupuesto"
        subtitle="Sin compromiso. Respuesta en menos de 24 horas"
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Solicitar presupuesto arquitectos Murcia"
      />

      <section className="section">
        <div className="max-w-3xl mx-auto px-6">
          <PresupuestoForm />
        </div>
      </section>
    </>
  );
}

