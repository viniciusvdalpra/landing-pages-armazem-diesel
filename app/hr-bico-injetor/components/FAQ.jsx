import { useState } from 'react';
import CFG from '../config.json';
import { getContent } from '@/lib/content';

const { FAQS } = getContent(CFG);

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="sec-off sec-pad" style={{ paddingTop: 20 }}>
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: 10 }}>Dúvidas frequentes</div>
          <h2 className="h2">Perguntas rápidas</h2>
        </div>
        <div className="faq-wrap">
          {FAQS.map((f, i) => (
            <div className={`faq-item ${open === i ? 'is-open' : ''}`} key={i}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{f.q}</span>
                <span className="plus" aria-hidden />
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
