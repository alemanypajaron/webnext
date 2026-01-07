import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import PresupuestoForm from '@/components/forms/PresupuestoForm';

export const metadata: Metadata = {
  title: 'Presupuesto de Obras y Reformas en Murcia | Sin Compromiso 24h',
  description: 'Solicita presupuesto sin compromiso para tu obra o reforma en Murcia. Técnicos de edificación especializados. Respuesta en menos de 24 horas. Dirección de obra, reformas integrales, licencias y más.',
  keywords: 'presupuesto obras murcia, presupuesto reforma murcia, presupuesto dirección obra murcia, presupuesto arquitecto técnico murcia, coste reforma murcia, precio dirección obra murcia',
  alternates: {
    canonical: 'https://www.alemanypajaron.es/presupuesto',
  },
  openGraph: {
    title: 'Solicitar Presupuesto Sin Compromiso | Alemán y Pajarón Murcia',
    description: 'Presupuesto gratuito para tu obra o reforma en Murcia. Respuesta en 24h.',
    url: 'https://www.alemanypajaron.es/presupuesto',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Presupuesto Sin Compromiso | Alemán y Pajarón',
    description: 'Solicita presupuesto para tu obra en Murcia. Respuesta en 24h.',
  },
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

