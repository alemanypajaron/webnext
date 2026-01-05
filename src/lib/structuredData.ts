export const SITE_URL = 'https://alemanypajaron.es';

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
    areaServed: [
      { '@type': 'City', name: 'Murcia' },
      { '@type': 'AdministrativeArea', name: 'Región de Murcia' },
    ],
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
    areaServed: { '@type': 'City', name: 'Murcia' },
    provider: {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#business`,
      name: BUSINESS.name,
      url: BUSINESS.url,
      telephone: BUSINESS.telephone,
      email: BUSINESS.email,
      address: BUSINESS.address,
      areaServed: [{ '@type': 'City', name: 'Murcia' }],
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


