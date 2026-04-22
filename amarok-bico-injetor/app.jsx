// app.jsx — top-level LP composition + state + Tweaks

const { useState: useS, useEffect: useE, useRef: useR } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroLayout": "split",
  "selectorStyle": "elevated",
  "trustStyle": "numbers",
  "whyStyle": "stacked",
  "heroImage": "static"
}/*EDITMODE-END*/;

function TweaksPanel({ open, tweaks, setTweaks, onClose }) {
  const groups = [
    { key: "heroImage", label: "Hero photo", opts: [["static","estática"],["dust","com poeira"]] },
    { key: "heroLayout", label: "Hero layout", opts: [["split","split"],["stack","stacked"]] },
    { key: "selectorStyle", label: "Selector card", opts: [["elevated","elevated"],["flat","flat"],["outline","outline on navy"]] },
    { key: "trustStyle", label: "Trust bar", opts: [["icons","icons"],["numbers","numbers"],["minimal","minimal"]] },
    { key: "whyStyle", label: "Why section", opts: [["columns","3 columns"],["stacked","stacked list"]] },
  ];
  const update = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
  };
  return (
    <div className={`tweaks ${open ? "is-open" : ""}`}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <h4 style={{ margin: 0 }}>Tweaks</h4>
        <button onClick={onClose} style={{ background: "transparent", fontSize: 18, color: "var(--muted)" }} aria-label="Fechar">×</button>
      </div>
      {groups.map((g) => (
        <div className="tweak-group" key={g.key}>
          <label>{g.label}</label>
          <div className="tweak-opts">
            {g.opts.map(([v, l]) => (
              <button
                key={v}
                className={tweaks[g.key] === v ? "is-on" : ""}
                onClick={() => update(g.key, v)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4, lineHeight: 1.4 }}>
        Try presets: plate <b>ABC-1234</b> (2013 2.0 TDI), <b>DEF-5678</b> (2016 Biturbo), <b>GHI-9012</b> (2020 V6).
      </div>
    </div>
  );
}

function App() {
  const [tweaks, setTweaks] = useS(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = useS(false);
  const [searching, setSearching] = useS(false);
  const [result, setResult] = useS(null);
  const resultRef = useR(null);

  // tweaks protocol — listener FIRST, then announce
  useE(() => {
    const onMsg = (e) => {
      const d = e.data;
      if (!d || typeof d !== "object") return;
      if (d.type === "__activate_edit_mode") setTweaksOpen(true);
      if (d.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // scroll to result when it appears
  useE(() => {
    if (result && resultRef.current) {
      setTimeout(() => {
        const top = resultRef.current.getBoundingClientRect().top + window.scrollY - 20;
        window.scrollTo({ top, behavior: "smooth" });
      }, 80);
    }
  }, [result]);

  const handleSearch = ({ kind, plate, year, motor }) => {
    setSearching(true);
    setResult(null);
    setTimeout(() => {
      if (kind === "plate") {
        const key = plate.slice(0, 7);
        const v = PRESET_VEHICLES[key];
        if (v) {
          setResult({ kind: "plate", vehicle: v });
        } else if (plate.length >= 6) {
          // unknown plate — fall back to the demo vehicle with the user's plate stamped in
          setResult({
            kind: "plate",
            vehicle: { ...FALLBACK_VEHICLE, plate: plate.slice(0,3) + "-" + plate.slice(3), chassi_tail: plate.slice(-6) },
          });
        } else {
          setResult({ kind: "notfound", query: plate });
        }
      } else if (kind === "year") {
        const variants = YEAR_VARIANTS[year] || [];
        const filtered = motor ? variants.filter((v) => v.motor === motor) : variants;
        setResult({ kind: "year", year, variants: filtered.length ? filtered : variants });
      }
      setSearching(false);
    }, 900);
  };

  const waMsg = "Olá, cheguei pelo site e quero falar sobre bico injetor pra Amarok.";

  return (
    <div>
      <Hero
        heroLayout={tweaks.heroLayout}
        selectorStyle={tweaks.selectorStyle}
        heroImage={tweaks.heroImage}
        onSearch={handleSearch}
        isSearching={searching}
      />
      <TrustBar style={tweaks.trustStyle} />
      <div ref={resultRef}>
        <ResultSection result={result} />
      </div>
      <WhySection style={tweaks.whyStyle} />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />

      {/* Floating WhatsApp */}
      <a className="wa-fab" href={waLink(waMsg)} target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <WhatsAppIcon size={24} />
      </a>

      <TweaksPanel
        open={tweaksOpen}
        tweaks={tweaks}
        setTweaks={setTweaks}
        onClose={() => setTweaksOpen(false)}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
