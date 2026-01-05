import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies',
};

export default function CookiesPage() {
  return (
    <>
      <section className="relative py-20 bg-primary text-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <h1 className="text-5xl font-heading font-bold">Política de Cookies</h1>
        </div>
      </section>
      <section className="section">
        <div className="max-w-4xl mx-auto px-6 prose prose-lg">
          <h2>¿Qué son las cookies?</h2>
          <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web.</p>
          <h2>Cookies que utilizamos</h2>
          <p>Este sitio web utiliza únicamente cookies técnicas necesarias para su funcionamiento.</p>
        </div>
      </section>
    </>
  );
}

