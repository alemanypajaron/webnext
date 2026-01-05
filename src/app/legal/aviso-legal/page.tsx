import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso Legal',
};

export default function AvisoLegalPage() {
  return (
    <>
      <section className="relative py-20 bg-primary text-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <h1 className="text-5xl font-heading font-bold">Aviso Legal</h1>
        </div>
      </section>
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 prose prose-lg">
          <h2>Datos Identificativos</h2>
          <p><strong>Alemán y Pajarón</strong><br />
          Email: ivan@alemanypajaron.es<br />
          Teléfono: 650 075 842</p>
          <h2>Objeto</h2>
          <p>El presente aviso legal regula el uso del sitio web alemanypajaron.es</p>
        </div>
      </section>
    </>
  );
}

