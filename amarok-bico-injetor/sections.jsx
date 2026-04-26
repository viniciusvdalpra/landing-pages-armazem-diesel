// sections.jsx — Hero, Trust, Results, Why, Testimonials, FAQ, Final+Footer

const { useState, useEffect, useRef } = React;
const CFG = window.LP_CONFIG;
const OEMS = window.OEMS_DATA;

// ─── Reusable Selector (extracted so it can render inside Hero on desktop and inside SearchSection on mobile) ─
function Selector({ onSearch, isSearching, selectorStyle }) {
  const [mode, setMode] = useState("plate");
  const [plate, setPlate] = useState("");
  const [year, setYear] = useState("");
  const [motor, setMotor] = useState("");
  const [err, setErr] = useState("");

  const motors = year ? YEAR_VARIANTS[parseInt(year, 10)] || [] : [];

  const submitPlate = (e) => {
    e?.preventDefault();
    const clean = plate.replace(/[^A-Z0-9]/gi, "").toUpperCase();
    if (clean.length < 6) {
      setErr("Digite uma placa (7 caracteres) ou final de chassi.");
      return;
    }
    setErr("");
    setMode("plate");
    onSearch({ kind: "plate", plate: clean });
  };

  const submitYear = (e) => {
    e?.preventDefault();
    if (!year) { setErr("Selecione o ano."); return; }
    setErr("");
    setMode("year");
    onSearch({ kind: "year", year: parseInt(year, 10), motor: motor || null });
  };

  const isOutline = selectorStyle === "outline";
  const isFlat = selectorStyle === "flat";

  return (
    <div className={`selector ${isOutline ? "is-outline" : ""} ${isFlat ? "is-flat" : ""}`}>
      <h2 className="sel-title">{CFG.selector.titulo_l1}<br/>{CFG.selector.titulo_l2}</h2>
      <p className="sel-small">{CFG.selector.subtexto}</p>

      <form className="sel-fieldset" onSubmit={submitPlate}>
        <label>Mais preciso</label>
        <div className="sel-row">
          <input
            className="sel-input"
            type="text"
            placeholder="Informe a placa ou chassi"
            value={plate}
            onChange={(e) => setPlate(e.target.value.toUpperCase())}
            maxLength={17}
            aria-label="Placa ou chassi"
          />
          <button className="btn btn-red btn-block" type="submit" disabled={isSearching}>
            {isSearching && mode === "plate" ? <><span className="loader"/> BUSCANDO</> : "BUSCAR"}
          </button>
        </div>
      </form>

      <div className="divider-or"><span>ou</span></div>

      <form className="sel-fieldset" onSubmit={submitYear}>
        <label>Selecione</label>
        <div className="sel-row-2">
          <select
            className="sel-select"
            value={year}
            onChange={(e) => { setYear(e.target.value); setMotor(""); }}
            aria-label="Ano do veículo"
          >
            <option value="">Ano do veículo</option>
            {Object.keys(YEAR_VARIANTS).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {year && (
            <select
              className="sel-select fade-in"
              value={motor}
              onChange={(e) => setMotor(e.target.value)}
              aria-label="Motor"
            >
              <option value="">Motor (opcional)</option>
              {motors.map((m, i) => (
                <option key={i} value={m.motor}>{m.motor} — {m.cv}</option>
              ))}
            </select>
          )}
        </div>
        <button className="btn btn-navy btn-block" type="submit" style={{ marginTop: 10 }} disabled={isSearching}>
          {isSearching && mode === "year" ? <><span className="loader"/> BUSCANDO</> : "VER PEÇAS"}
        </button>
      </form>

      {err && <p style={{ color: "#c1121f", fontSize: 12, marginTop: 10 }}>{err}</p>}

      <p className="sel-note">
        <b style={{ color: isOutline ? "rgba(245,245,245,0.85)" : "var(--ink)" }}>Consultamos FIPE/Denatran pra você</b> —
        comprar a peça certa, sem achismo.
      </p>
    </div>
  );
}

// ─── SECTION 1: HERO ──────────────────────────────────────────────
function Hero({ heroLayout, selectorStyle, heroImage, onSearch, isSearching }) {
  const imgSrc = heroImage === "dust" ? CFG.hero.foto_dust : CFG.hero.foto_static;
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = imgSrc;
  }, [imgSrc]);

  return (
    <section className={`hero sec-navy sec-pad ${loaded ? "is-loaded" : ""} ${heroImage === "dust" ? "is-dust" : ""}`}>
      <div className="hero-bg" style={{ backgroundImage: `url('${imgSrc}')` }} />
      <div className="hero-overlay" />
      <div className="hero-swipe" />
      <div className="container">
        <div className={`hero-grid ${heroLayout === "stack" ? "is-stack" : ""}`}>
          <div>
            <div className="eyebrow hero-tag">{CFG.hero.eyebrow}</div>
            <h1 className="h1 hero-h1">
              {CFG.hero.h1_linha1}<br/>{CFG.hero.h1_linha2}<span className="red-dot" />
              <span className="line-2">{CFG.hero.h1_sub}</span>
            </h1>
            <p className="hero-sub">{CFG.hero.sub}</p>
            <a className="wa-link"
               href={waLink(CFG.wa.hero_link)}
               target="_blank" rel="noreferrer">
              Prefere falar direto com o vendedor? Chamar no WhatsApp →
            </a>
            <a className="hero-cta-mobile" href="#buscar">
              <span>{CFG.hero.cta_mobile_label}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="13 6 19 12 13 18" />
              </svg>
            </a>
            <ul className="hero-trusts-desktop" aria-label="Garantias">
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF021E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                FIPE/Denatran oficial
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF021E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                NF-e + 7 dias troca
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF021E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Garantia {CFG.peca.fabricante_principal_short}
              </li>
            </ul>
          </div>

          <Selector onSearch={onSearch} isSearching={isSearching} selectorStyle={selectorStyle} />
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 2: TRUST BAR ─────────────────────────────────────────
function TrustBar({ style }) {
  const cells = [
    { icon: "shield", ttl: "Peças Originais", sub: `OEM ${CFG.peca.fabricante_principal_short}`, num: "100%" },
    { icon: "box", ttl: "Entrega Garantida", sub: "Rastreada ponta a ponta", num: "48h" },
    { icon: "gear", ttl: "Compatibilidade Confirmada", sub: "FIPE/Denatran", num: "OEM" },
    { icon: "factory", ttl: "Anos de Mercado", sub: "Chapecó/SC", num: "11" },
  ];
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setSeen(true); });
    }, { rootMargin: "0px 0px -15% 0px", threshold: 0 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className={`trust ${style === "minimal" ? "is-minimal" : ""} ${style === "numbers" ? "is-numbers" : ""}`}>
      <div className="container">
        <div className="trust-row">
          {cells.map((c, i) => (
            <div className={`trust-cell reveal reveal-delay-${i % 4} ${seen ? "is-visible" : ""}`} key={i}>
              {style === "numbers"
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

// ─── SECTION 3: RESULT ────────────────────────────────────────────
function ResultPlate({ vehicle }) {
  const p = vehicle.part;
  const msg = fmt(CFG.wa.result_plate_template, {
    plate: vehicle.plate, oem: p.oem,
    modelo: vehicle.modelo, ano: vehicle.ano, motor: vehicle.motor,
  });
  return (
    <div className="result-wrap fade-in">
      <div className="result-head">
        <span className="check">✓</span> Veículo Identificado
      </div>
      <div className="vehicle-name">{vehicle.marca} {vehicle.modelo}</div>
      <div className="vehicle-spec">
        {vehicle.motor} · {vehicle.ano} · {vehicle.cv}cv<br/>
        Placa: {vehicle.plate} · Chassi final: {vehicle.chassi_tail}
      </div>
      <hr className="hr-dashed" />
      <div className="part-label">Peça compatível com seu veículo</div>
      <div className="part-card">
        <div className="part-photo">
          <img src={CFG.peca.foto_default} alt={`${p.name} — ${p.oem}`} loading="lazy" />
          <div className="ph-label">{p.name} · {p.oem}</div>
        </div>
        <div>
          <div className="part-title">{p.name}</div>
          <div className="part-oem">Cód. OEM: {p.oem}</div>
          <div className="brand-tag">{p.brand}</div>
          <ul className="part-bullets">
            {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
          <a className="btn btn-red btn-lg" style={{ marginTop: 18 }}
             href={waLink(msg)} target="_blank" rel="noreferrer">
            <WhatsAppIcon /> Falar no WhatsApp
          </a>
        </div>
      </div>
      {p.hasLine1a && CFG.peca.tem_primeira_linha && (
        <div className="hint-row">
          💡 <b>{CFG.result_messages.hint_primeira_linha_bold}</b> {CFG.result_messages.hint_primeira_linha_tail}
        </div>
      )}
    </div>
  );
}

function ResultYear({ year, variants }) {
  const veiculoModelo = OEMS[CFG.categoria][CFG.veiculo_key].veiculo.modelo;
  return (
    <div className="result-wrap fade-in">
      <div className="vehicle-name">{veiculoModelo} {year} — escolha a variação do motor</div>
      <div className="vehicle-spec">Selecione o motor do seu veículo para ver a peça exata.</div>
      <div className="variant-grid">
        {variants.map((v, i) => {
          const msg = fmt(CFG.wa.result_year_template, { oem: v.oem, year, motor: v.motor });
          return (
            <div className="variant-card" key={i}>
              <div className="variant-photo">
                <img src={CFG.peca.foto_default} alt={`${CFG.peca.nome} ${v.oem}`} loading="lazy" />
              </div>
              <div className="v-motor">{v.motor}</div>
              <div className="v-hp">{v.cv}</div>
              <div className="v-part">
                <div className="v-part-name">{CFG.peca.short_label}</div>
                <div className="v-part-oem">Cód. OEM: {v.oem}</div>
                <div className="brand-tag" style={{ marginTop: 10 }}>{CFG.peca.fabricante_label}</div>
              </div>
              <a className="btn btn-navy btn-block" style={{ marginTop: 16 }}
                 href={waLink(msg)} target="_blank" rel="noreferrer">
                Ver detalhes
              </a>
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 18 }}>
        Não sabe qual é o seu? Insira a placa no seletor ↑ ou <a href={waLink(CFG.wa.result_dontknow_motor)} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>chame o vendedor no WhatsApp</a>.
      </p>
    </div>
  );
}

function ResultNotFound({ query }) {
  return (
    <div className="result-wrap fade-in">
      <div className="vehicle-name" style={{ color: "#c1121f" }}>Não encontramos</div>
      <div className="vehicle-spec" style={{ marginTop: 8 }}>
        Não localizamos um veículo para <b style={{ color: "var(--ink)" }}>{query}</b>. Verifique a placa ou fale com um vendedor pra gente conferir pela nota do carro.
      </div>
      <a className="btn btn-red btn-lg" style={{ marginTop: 18 }}
         href={waLink(fmt(CFG.wa.result_notfound_template, { query }))}
         target="_blank" rel="noreferrer">
        <WhatsAppIcon /> Chamar o vendedor
      </a>
    </div>
  );
}

function ResultNotSupported({ vehicle, query, message }) {
  const ident = [vehicle?.marca, vehicle?.modelo, vehicle?.ano].filter(Boolean).join(" ") || query;
  const waMsg = fmt(CFG.wa.result_notsupported_template, { query, ident });
  return (
    <div className="result-wrap fade-in">
      <div className="vehicle-name">Identificamos: {ident}</div>
      <div className="vehicle-spec" style={{ marginTop: 8 }}>
        {message || CFG.result_messages.not_supported_default}
      </div>
      <a className="btn btn-red btn-lg" style={{ marginTop: 18 }}
         href={waLink(waMsg)} target="_blank" rel="noreferrer">
        <WhatsAppIcon /> Falar com o vendedor
      </a>
    </div>
  );
}

function ResultError({ query, message }) {
  return (
    <div className="result-wrap fade-in">
      <div className="vehicle-name" style={{ color: "#c1121f" }}>Ops</div>
      <div className="vehicle-spec" style={{ marginTop: 8 }}>
        {message || "Não conseguimos consultar agora. Fale com um vendedor."}
      </div>
      <a className="btn btn-red btn-lg" style={{ marginTop: 18 }}
         href={waLink(fmt(CFG.wa.result_error_template, { query }))}
         target="_blank" rel="noreferrer">
        <WhatsAppIcon /> Chamar o vendedor
      </a>
    </div>
  );
}

function SearchSection({ result, onSearch, isSearching, selectorStyle }) {
  const hasResult = !!result;
  return (
    <section className={`sec-off sec-pad search-section ${hasResult ? "has-result" : "is-empty"}`} id="buscar">
      <div className="container">
        {hasResult ? (
          <>
            <div className="eyebrow" style={{ color: "var(--muted)", marginBottom: 16 }}>Resultado da busca</div>
            {result.kind === "plate" && result.vehicle && <ResultPlate vehicle={result.vehicle} />}
            {result.kind === "year" && <ResultYear year={result.year} variants={result.variants} />}
            {result.kind === "notfound" && <ResultNotFound query={result.query} />}
            {result.kind === "notsupported" && <ResultNotSupported vehicle={result.vehicle} query={result.query} message={result.message} />}
            {result.kind === "error" && <ResultError query={result.query} message={result.message} />}
          </>
        ) : (
          <div className="search-section-empty-wrap">
            <Selector onSearch={onSearch} isSearching={isSearching} selectorStyle={selectorStyle} />
          </div>
        )}
      </div>
    </section>
  );
}

// ─── SECTION 4: WHY ───────────────────────────────────────────────
function WhySection({ style }) {
  const items = CFG.why.items;
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setSeen(true); });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="sec-navy sec-pad">
      <div className="container">
        <h2 className="h2" style={{ color: "var(--off)", maxWidth: 18 + "ch" }}>
          {CFG.why.h2_l1}<br/>{CFG.why.h2_l2} <span style={{ color: "var(--red)" }}>{CFG.why.h2_l2_red}</span>.
        </h2>
        <div className={`why-grid ${style === "stacked" ? "is-stacked" : ""}`}>
          {items.map((it, i) => (
            <div className={`why-card reveal reveal-delay-${i} ${seen ? "is-visible" : ""}`} key={i}>
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

// ─── SECTION 5: TESTIMONIALS ──────────────────────────────────────
function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 820);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
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
          <div className="eyebrow" style={{ color: "var(--muted)", marginBottom: 10 }}>Depoimentos</div>
          <h2 className="h2">Quem já voltou<br/>a rodar com a gente</h2>
        </div>
        <div className={isMobile ? "testi-carousel" : ""}>
          <div className="testi-track">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`testi-card ${isMobile && i === idx ? "is-on" : ""}`}
              >
                <div className="stars">
                  {[0,1,2,3,4].map((n) => <Star key={n} />)}
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
                  className={`testi-dot ${i === idx ? "is-on" : ""}`}
                  onClick={() => setIdx(i)}
                  aria-label={`Depoimento ${i+1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 6: FAQ ───────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="sec-off sec-pad" style={{ paddingTop: 20 }}>
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <div className="eyebrow" style={{ color: "var(--muted)", marginBottom: 10 }}>Dúvidas frequentes</div>
          <h2 className="h2">Perguntas rápidas</h2>
        </div>
        <div className="faq-wrap">
          {FAQS.map((f, i) => (
            <div className={`faq-item ${open === i ? "is-open" : ""}`} key={i}>
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

// ─── SECTION 7: FINAL CTA + FOOTER ────────────────────────────────
function FinalCTA() {
  return (
    <section className="sec-navy">
      <div className="container final-cta">
        <h2 className="h2">{CFG.final_cta.h2_l1} <span className="red">{CFG.final_cta.h2_l2_red_l1}<br/>{CFG.final_cta.h2_l2_red_l2}</span>?</h2>
        <p>{CFG.final_cta.sub_pre} <a href="#buscar" className="cta-anchor">{CFG.final_cta.sub_anchor}</a> {CFG.final_cta.sub_post}</p>
        <a className="btn btn-red btn-lg" href={waLink(CFG.wa.final_cta)} target="_blank" rel="noreferrer">
          <WhatsAppIcon /> {CFG.final_cta.btn}
        </a>
        <div className="microtext">
          {CFG.final_cta.microtext_pre} {WA_NUMBER_DISPLAY} {CFG.final_cta.microtext_post}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="logo">Armazém Auto Peças</div>
            <div className="tl">Compra segura. Entrega garantida.</div>
            <div className="tl" style={{ marginTop: 20, fontFamily: "var(--f-mono)", fontSize: 11 }}>
              CNPJ 20.195.765/0001-31
            </div>
          </div>
          <div className="foot-col">
            <h3>Contato</h3>
            <ul>
              <li>WhatsApp {WA_NUMBER_DISPLAY}</li>
              <li>Telefone (49) 3025-8380</li>
              <li>sac@armazemautopecas.com.br</li>
              <li>Chapecó/SC</li>
            </ul>
          </div>
          <div className="foot-col">
            <h3>Institucional</h3>
            <ul>
              <li><a href="https://www.armazemautopecas.com.br/trocas-e-devolucoes" target="_blank" rel="noreferrer">Trocas e Devoluções</a></li>
              <li><a href="https://www.armazemautopecas.com.br/privacidade" target="_blank" rel="noreferrer">Política de Privacidade</a></li>
              <li><a href="https://www.armazemautopecas.com.br/termos-de-uso" target="_blank" rel="noreferrer">Termos de Uso</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h3>Redes</h3>
            <ul>
              <li><a href="https://www.instagram.com/armazemautopecas/" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://www.facebook.com/ArmazemAutopecasImportados" target="_blank" rel="noreferrer">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bot">
          <div>© 2026 Armazém Auto Peças Ltda.</div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Hero, TrustBar, SearchSection, WhySection, Testimonials, FAQ, FinalCTA, Footer,
});
