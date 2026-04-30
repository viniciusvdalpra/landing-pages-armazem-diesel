const AUTOPARTS_STORE = {
  '@type': 'AutoPartsStore',
  '@id': 'https://armazemautopecas.com.br/#business',
  name: 'Armazém Auto Peças',
  url: 'https://armazemautopecas.com.br',
  telephone: '+5549999484754',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chapecó',
    addressRegion: 'SC',
    addressCountry: 'BR',
  },
  sameAs: ['https://wa.me/5549999484754'],
};

function brandNode(brands) {
  if (!brands || !brands.length) return undefined;
  const nodes = brands.map((name) => ({ '@type': 'Brand', name }));
  return nodes.length === 1 ? nodes[0] : nodes;
}

export function buildJsonLd(cfg, pageUrl) {
  const product = cfg.seo?.product;
  if (!product) {
    throw new Error(`config.json sem cfg.seo.product (slug="${cfg.slug}")`);
  }

  const productNode = {
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: brandNode(product.brands),
    category: 'Peça automotiva — sistema de injeção diesel',
    isRelatedTo: (product.vehicles || []).map((name) => ({ '@type': 'Vehicle', name })),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'BRL',
      seller: { '@id': AUTOPARTS_STORE['@id'] },
      url: pageUrl,
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [AUTOPARTS_STORE, productNode],
  };
}
