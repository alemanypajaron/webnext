export const SITE_URL = 'https://www.alemanypajaron.es';

export const AREA_SERVED_CITIES = [
  'Murcia',
  'Alcantarilla',
  'Molina de Segura',
  'Las Torres de Cotillas',
  'Santomera',
  'Beniel',
] as const;

export const COBERTURA_CORTA =
  'Dirección de obra, licencias y reformas en Murcia capital, pedanías (El Palmar, La Alberca, Beniaján, Torreagüera…) y un radio de 50 km: Alcantarilla, Molina de Segura, Las Torres de Cotillas, Santomera y Beniel.';

export const BUSINESS = {
  name: 'Alemán y Pajarón',
  url: `${SITE_URL}/`,
  telephone: '+34650075842',
  email: 'ivan@alemanypajaron.es',
  // We intentionally do NOT include streetAddress/postalCode because we don't have it.
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Murcia',
    addressRegion: 'Región de Murcia',
    addressCountry: 'ES',
  },
};

function areaServedJsonLd() {
  return [
    { '@type': 'City', name: 'Murcia' },
    ...AREA_SERVED_CITIES.filter((name) => name !== 'Murcia').map((name) => ({
      '@type': 'City',
      name,
    })),
    { '@type': 'AdministrativeArea', name: 'Región de Murcia' },
  ];
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    url: BUSINESS.url,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    address: BUSINESS.address,
    areaServed: areaServedJsonLd(),
    inLanguage: 'es-ES',
    image: `${SITE_URL}/opengraph-image`,
    knowsAbout: [
      'Dirección de obra',
      'Gestión de proyectos',
      'Licencias de obra',
      'Reformas integrales',
      'Asesoramiento técnico',
      'Diseño de espacios',
    ],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: BUSINESS.name,
    inLanguage: 'es-ES',
    publisher: { '@id': `${SITE_URL}/#business` },
  };
}

export function serviceJsonLd(args: {
  slug: string;
  serviceType: string;
  name: string;
  description: string;
}) {
  const url = `${SITE_URL}/servicios/${args.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: args.name,
    description: args.description,
    serviceType: args.serviceType,
    url,
    areaServed: areaServedJsonLd(),
    provider: {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#business`,
      name: BUSINESS.name,
      url: BUSINESS.url,
      telephone: BUSINESS.telephone,
      email: BUSINESS.email,
      address: BUSINESS.address,
      areaServed: areaServedJsonLd(),
    },
    inLanguage: 'es-ES',
  };
}

export function breadcrumbJsonLd(args: {
  items: Array<{ name: string; url: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: args.items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}


