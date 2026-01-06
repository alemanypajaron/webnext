import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  alternates: {
    canonical: 'https://www.alemanypajaron.es/legal/privacidad',
  },
};

export default function PrivacidadPage() {
  return (
    <>
      <section className="relative py-20 bg-primary text-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <h1 className="text-5xl font-heading font-bold">Política de Privacidad</h1>
        </div>
      </section>
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 prose prose-lg">
          <h2>Responsable del Tratamiento</h2>
          <p><strong>Alemán y Pajarón</strong></p>
          <h2>Finalidad</h2>
          <p>Los datos personales que nos proporciones serán utilizados únicamente para gestionar tu consulta o solicitud de presupuesto.</p>
        </div>
      </section>
    </>
  );
}

