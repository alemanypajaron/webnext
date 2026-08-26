import Link from 'next/link';
import { COBERTURA_CORTA } from '@/lib/structuredData';

type AreaServicioProps = {
  variant?: 'corta' | 'completa';
  tone?: 'light' | 'dark';
  className?: string;
};

export default function AreaServicio({
  variant = 'corta',
  tone = 'light',
  className = '',
}: AreaServicioProps) {
  const textClass = tone === 'dark' ? 'text-white/85' : 'text-gray-600';
  if (variant === 'completa') {
    return (
      <div className={`space-y-4 leading-relaxed ${textClass} ${className}`}>
        <p>Trabajamos en un radio de unos 50 km desde Murcia capital.</p>
        <p>
          En el municipio de Murcia cubrimos la ciudad y las pedanías: El Palmar, La Alberca, Beniaján,
          Torreagüera, Guadalupe, Sangonera y el resto del término. La licencia se tramita en el Ayuntamiento
          de Murcia.
        </p>
        <p>
          En el área metropolitana vamos a Alcantarilla, Molina de Segura (incluidas Altorreal y La Alcayna),
          Las Torres de Cotillas, Santomera y Beniel. Ahí el trámite es de cada ayuntamiento; lo gestionamos
          igual.
        </p>
        <p>
          Si tu obra está en Alhama, Archena, Fortuna u otro punto dentro de ese radio, pregunta. Si está en
          Cartagena o en la costa, te decimos si encaja o te orientamos.
        </p>
      </div>
    );
  }

  return (
    <p className={`leading-relaxed ${textClass} ${className}`}>
      {COBERTURA_CORTA}{' '}
      <Link href="/contacto#donde-trabajamos" className="text-accent font-semibold hover:underline">
        Ver zona de servicio
      </Link>
    </p>
  );
}
