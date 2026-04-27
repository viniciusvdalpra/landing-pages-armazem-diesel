import { useEffect, useRef, useState } from 'react';
import CFG from '../config.json';

export default function WhySection({ style }) {
  const items = CFG.why.items;
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setSeen(true); });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="sec-navy sec-pad">
      <div className="container">
        <h2 className="h2" style={{ color: 'var(--off)', maxWidth: 18 + 'ch' }}>
          {CFG.why.h2_l1}<br />{CFG.why.h2_l2} <span style={{ color: 'var(--red)' }}>{CFG.why.h2_l2_red}</span>.
        </h2>
        <div className={`why-grid ${style === 'stacked' ? 'is-stacked' : ''}`}>
          {items.map((it, i) => (
            <div className={`why-card reveal reveal-delay-${i} ${seen ? 'is-visible' : ''}`} key={i}>
              <div className="why-num">{it.num}</div>
              <div>
                <h3 className="why-ttl">{it.ttl}</h3>
                <p className="why-body">{it.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
