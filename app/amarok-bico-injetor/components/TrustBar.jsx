import { useEffect, useRef, useState } from 'react';
import CFG from '../config.json';
import { TrustIcon } from './atoms';

export default function TrustBar({ style }) {
  const cells = [
    { icon: 'shield', ttl: 'Peças Originais', sub: `OEM ${CFG.peca.fabricante_principal_short}`, num: '100%' },
    { icon: 'box', ttl: 'Despacho Rápido', sub: 'Saída em até 24h úteis', num: '24h' },
    { icon: 'gear', ttl: 'Compatibilidade Confirmada', sub: 'FIPE/Denatran', num: 'OEM' },
    { icon: 'factory', ttl: 'Bicos Vendidos', sub: 'Pra todo o Brasil', num: '10K+' },
  ];

  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setSeen(true); });
    }, { rootMargin: '0px 0px -15% 0px', threshold: 0 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`trust ${style === 'minimal' ? 'is-minimal' : ''} ${style === 'numbers' ? 'is-numbers' : ''}`}>
      <div className="container">
        <div className="trust-row">
          {cells.map((c, i) => (
            <div className={`trust-cell reveal reveal-delay-${i % 4} ${seen ? 'is-visible' : ''}`} key={i}>
              {style === 'numbers'
                ? <div className="num">{c.num}</div>
                : <TrustIcon kind={c.icon} />}
              <div className="ttl">{c.ttl}</div>
              <div className="sub">{c.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
