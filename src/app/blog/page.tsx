import Link from 'next/link';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog de arquitectura técnica en Murcia. Consejos, guías y novedades sobre construcción, reformas y licencias.',
};

export default function BlogPage() {
  const articulos = [
    { slug: 'licencia-obra-murcia', title: 'Cómo solicitar licencia de obra en Murcia', excerpt: 'Guía completa para tramitar tu licencia de obra en el Ayuntamiento de Murcia.' },
    { slug: 'precio-reforma-murcia', title: 'Precio de reforma integral en Murcia 2024', excerpt: 'Descubre cuánto cuesta reformar un piso en Murcia y qué factores influyen en el precio.' },
    { slug: 'direccion-obra-murcia', title: 'Qué es la dirección de obra y por qué es importante', excerpt: 'Todo lo que necesitas saber sobre la dirección de obra en proyectos de construcción.' },
  ];

  return (
    <>
      <PageHeader
        badge="Recursos y guías"
        title="Blog de Arquitectura"
        subtitle="Consejos y guías sobre arquitectura técnica en Murcia"
        image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Blog de arquitectura técnica en Murcia"
        highlightedWord="Blog"
      />

      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articulos.map((articulo) => (
              <Link key={articulo.slug} href={`/blog/${articulo.slug}`} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="p-8">
                  <h3 className="text-xl font-heading font-semibold text-primary mb-3 group-hover:text-accent transition-colors">{articulo.title}</h3>
                  <p className="text-gray-600 mb-4">{articulo.excerpt}</p>
                  <span className="text-accent font-semibold group-hover:translate-x-2 inline-block transition-transform">Leer más →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

