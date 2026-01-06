import Link from 'next/link';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import NewsletterForm from '@/components/forms/NewsletterForm';
import BlogFilters from '@/components/blog/BlogFilters';
import { getBlogArticulos, getCategoriasBlog } from '@/lib/data';

// ISR: Regenerar cada hora
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog de arquitectura técnica en Murcia. Consejos, guías y novedades sobre construcción, reformas y licencias.',
  alternates: {
    canonical: 'https://www.alemanypajaron.es/blog',
  },
};

export default async function BlogPage() {
  const articulos = await getBlogArticulos();
  const categorias = await getCategoriasBlog();

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
        <div className="max-w-[1400px] mx-auto px-6">
          {articulos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-8">
                Blog en construcción. Próximamente publicaremos artículos sobre arquitectura técnica en Murcia.
              </p>
              <Link href="/contacto" className="btn btn-primary">
                Contacta con nosotros
              </Link>
            </div>
          ) : (
            <BlogFilters articulos={articulos} categorias={categorias} />
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section bg-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
            ¿Quieres recibir nuestros artículos?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Suscríbete a nuestro newsletter y mantente al día con consejos, guías y novedades sobre reformas y arquitectura técnica en Murcia.
          </p>
          <NewsletterForm variant="inline" />
        </div>
      </section>
    </>
  );
}
