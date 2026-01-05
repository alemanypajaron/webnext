import Image from 'next/image';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  imageAlt: string;
  highlightedWord?: string; // Palabra del título que queremos en amarillo
}

export default function PageHeader({
  title,
  subtitle,
  badge,
  image,
  imageAlt,
  highlightedWord,
}: PageHeaderProps) {
  // Función para resaltar una palabra específica en el título
  const renderTitle = () => {
    if (!highlightedWord) {
      return <span className="text-accent drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{title}</span>;
    }

    // Si el título contiene la palabra a resaltar, la dividimos
    const parts = title.split(highlightedWord);
    if (parts.length === 1) {
      // No se encontró la palabra, devolver todo en amarillo
      return <span className="text-accent drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{title}</span>;
    }

    return (
      <>
        {parts[0]}
        <span className="text-accent drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{highlightedWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src={image} alt={imageAlt} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/85" />
      </div>
      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <span className="inline-block px-4 py-2 bg-accent text-primary rounded-full text-sm font-bold mb-4">
          {badge}
        </span>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-white drop-shadow-lg">
          {renderTitle()}
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl">{subtitle}</p>
      </div>
    </section>
  );
}

