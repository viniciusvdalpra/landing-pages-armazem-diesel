import { useEffect, useState } from 'react';
import { TESTIMONIALS } from '../lib/content';
import { Star } from './atoms';

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 820);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, [isMobile]);

  return (
    <section className="sec-off sec-pad">
      <div className="container">
        <div className="testi-head">
          <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: 10 }}>Depoimentos</div>
          <h2 className="h2">Quem já voltou<br />a rodar com a gente</h2>
        </div>
        <div className={isMobile ? 'testi-carousel' : ''}>
          <div className="testi-track">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`testi-card ${isMobile && i === idx ? 'is-on' : ''}`}
              >
                <div className="stars">
                  {[0, 1, 2, 3, 4].map((n) => <Star key={n} />)}
                </div>
                <div className="testi-q">{t.q}</div>
                <div className="testi-who">
                  <b>— {t.name}</b>
                  {t.role}
                </div>
              </div>
            ))}
          </div>
          {isMobile && (
            <div className="testi-dots">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`testi-dot ${i === idx ? 'is-on' : ''}`}
                  onClick={() => setIdx(i)}
                  aria-label={`Depoimento ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
