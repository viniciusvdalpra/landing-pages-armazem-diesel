import CFG from './config.json';
import './styles.css';
import LandingClient from './LandingClient';

export const dynamic = 'force-static';

const SITE_URL = 'https://landing-pages-armazem-diesel.vercel.app';
const PAGE_URL = `${SITE_URL}${CFG.seo.canonical_path}`;
const OG_IMAGE = `${SITE_URL}${CFG.seo.canonical_path}${CFG.seo.og_image}`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: CFG.seo.title,
  description: CFG.seo.description,
  alternates: { canonical: CFG.seo.canonical_path },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Armazém Auto Peças',
    title: CFG.seo.title,
    description: CFG.seo.description,
    url: PAGE_URL,
    images: [{ url: OG_IMAGE, alt: CFG.seo.og_image_alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: CFG.seo.title,
    description: CFG.seo.twitter_description,
    images: [OG_IMAGE],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
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
    },
    {
      '@type': 'Product',
      name: 'Bico Injetor Bosch para VW Amarok 2.0 TDI e 3.0 V6',
      description: 'Bico injetor original Bosch ou primeira linha para VW Amarok 2.0 TDI (140cv/163cv/180cv Biturbo) e 3.0 V6 TDI (224cv/258cv), anos 2010-2024. Código OEM confirmado por consulta FIPE/Denatran.',
      brand: { '@type': 'Brand', name: 'Bosch' },
      category: 'Peça automotiva — sistema de injeção diesel',
      isRelatedTo: [
        { '@type': 'Vehicle', name: 'Volkswagen Amarok 2.0 TDI' },
        { '@type': 'Vehicle', name: 'Volkswagen Amarok 3.0 V6 TDI' },
      ],
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'BRL',
        seller: { '@id': 'https://armazemautopecas.com.br/#business' },
        url: PAGE_URL,
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <link rel="preload" as="font" type="font/woff2" crossOrigin="" href={`/${CFG.slug}/assets/fonts/fC1_PZJEZG-e9gHhdI4-NBbfd2ys3SjJCx1czNDu.woff2`} />
      <link rel="preload" as="image" href={`/${CFG.slug}/${CFG.hero.foto_static}`} type="image/webp" fetchPriority="high" />
      <LandingClient />
    </>
  );
}
