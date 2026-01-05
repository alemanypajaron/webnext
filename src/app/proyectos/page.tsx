import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Proyectos',
  description: 'Portfolio de proyectos de arquitectura técnica en Murcia. Reformas integrales, dirección de obra y más.',
};

export default function ProyectosPage() {
  return (
    <>
      <PageHeader
        badge="Portfolio"
        title="Nuestros Proyectos"
        subtitle="Más de 250 proyectos completados en Murcia"
        image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Proyectos de arquitectura en Murcia"
        highlightedWord="Proyectos"
      />

      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <p className="text-xl text-gray-600 mb-8">Portfolio en construcción. Próximamente mostraremos nuestros mejores proyectos.</p>
        </div>
      </section>
    </>
  );
}

