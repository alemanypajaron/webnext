import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';

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
          <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                  <input type="text" required className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Apellidos *</label>
                  <input type="text" required className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input type="email" required className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
                  <input type="tel" required className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Proyecto *</label>
                <select required className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent">
                  <option value="">Selecciona una opción</option>
                  <option value="direccion-obra">Dirección de Obra</option>
                  <option value="reforma-integral">Reforma Integral</option>
                  <option value="licencias">Licencias y Permisos</option>
                  <option value="gestion-proyectos">Gestión de Proyectos</option>
                  <option value="asesoramiento">Asesoramiento Técnico</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación del Proyecto</label>
                <input type="text" placeholder="Murcia" className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Presupuesto Estimado</label>
                <select className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent">
                  <option value="">Selecciona un rango</option>
                  <option value="menos-10k">Menos de 10.000€</option>
                  <option value="10k-30k">10.000€ - 30.000€</option>
                  <option value="30k-50k">30.000€ - 50.000€</option>
                  <option value="50k-100k">50.000€ - 100.000€</option>
                  <option value="mas-100k">Más de 100.000€</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción del Proyecto *</label>
                <textarea required rows={6} placeholder="Cuéntanos sobre tu proyecto..." className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"></textarea>
              </div>

              <div className="flex items-start">
                <input type="checkbox" required className="mt-1 mr-3" />
                <label className="text-sm text-gray-600">
                  Acepto la <a href="/legal/privacidad" className="text-accent hover:underline">política de privacidad</a> y el tratamiento de mis datos
                </label>
              </div>

              <button type="submit" className="w-full btn btn-primary text-lg py-4">Solicitar Presupuesto</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

