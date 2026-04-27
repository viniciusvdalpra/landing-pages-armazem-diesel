'use client';

import { useEffect, useRef, useState } from 'react';
import CFG from './config.json';
import { waLink } from './lib/wa';
import { enrichMotor, isSupported, resolvePart, YEAR_VARIANTS } from './lib/parts';
import { WhatsAppIcon } from './components/atoms';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import SearchSection from './components/SearchSection';
import WhySection from './components/WhySection';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

const TWEAK_DEFAULTS = {
  heroLayout: 'split',
  selectorStyle: 'elevated',
  trustStyle: 'numbers',
  whyStyle: 'stacked',
  heroImage: 'static',
};

export default function LandingClient() {
  const [tweaks] = useState(TWEAK_DEFAULTS);
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  useEffect(() => {
    if (result && resultRef.current) {
      setTimeout(() => {
        const top = resultRef.current.getBoundingClientRect().top + window.scrollY - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 80);
    }
  }, [result]);

  const handleSearch = async ({ kind, plate, year, motor }) => {
    setSearching(true);
    setResult(null);

    if (kind === 'year') {
      setTimeout(() => {
        const variants = YEAR_VARIANTS[year] || [];
        const filtered = motor ? variants.filter((v) => v.motor === motor) : variants;
        setResult({ kind: 'year', year, variants: filtered.length ? filtered : variants });
        setSearching(false);
      }, 300);
      return;
    }

    const clean = String(plate || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    const body = clean.length === 7 ? { placa: clean } : { chassi: clean };

    try {
      const r = await fetch('/api/consulta-veiculo/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (r.status === 429) {
        setResult({ kind: 'error', query: clean, message: 'Muitas consultas. Tente de novo em 1 minuto.' });
        return;
      }
      if (!r.ok) {
        setResult({ kind: 'error', query: clean, message: 'Não conseguimos consultar agora. Fale com um vendedor no WhatsApp.' });
        return;
      }

      const data = await r.json();
      if (!data.found) {
        setResult({ kind: 'notfound', query: clean });
        return;
      }

      const v = enrichMotor(data.vehicle || {});
      if (!isSupported(v)) {
        setResult({
          kind: 'notsupported',
          query: clean,
          vehicle: v,
          message: data.message,
        });
        return;
      }

      setResult({
        kind: 'plate',
        vehicle: {
          plate: v.plate,
          chassi_tail: v.chassi_tail,
          marca: v.marca,
          modelo: v.modelo,
          motor: v.motor,
          ano: v.ano,
          cv: v.cv,
          part: resolvePart(v.motor, v.ano, v.cv),
        },
      });
    } catch (e) {
      console.error('consulta_veiculo_error', e);
      setResult({ kind: 'error', query: clean, message: 'Erro de conexão. Tente novamente ou fale com um vendedor no WhatsApp.' });
    } finally {
      setSearching(false);
    }
  };

  const waMsg = CFG.wa.fab_default;

  return (
    <>
      <Hero
        heroLayout={tweaks.heroLayout}
        selectorStyle={tweaks.selectorStyle}
        heroImage={tweaks.heroImage}
        onSearch={handleSearch}
        isSearching={searching}
      />
      <TrustBar style={tweaks.trustStyle} />
      <div ref={resultRef}>
        <SearchSection
          result={result}
          onSearch={handleSearch}
          isSearching={searching}
          selectorStyle={tweaks.selectorStyle}
        />
      </div>
      <WhySection style={tweaks.whyStyle} />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />

      <a className="wa-fab" href={waLink(waMsg)} target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <WhatsAppIcon size={24} />
      </a>
    </>
  );
}
