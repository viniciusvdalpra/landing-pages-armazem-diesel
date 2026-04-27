import CFG from '../config.json';
import { fmt, waLink } from '../lib/wa';
import { VEICULO_MODELO } from '../lib/parts';
import { WhatsAppIcon } from './atoms';
import Selector from './Selector';

function pecaSrc(file) {
  return `/${CFG.slug}/${file}`;
}

function ResultPlate({ vehicle }) {
  const p = vehicle.part;
  const msg = fmt(CFG.wa.result_plate_template, {
    plate: vehicle.plate, oem: p.oem,
    modelo: vehicle.modelo, ano: vehicle.ano, motor: vehicle.motor,
  });
  const fotoSrc = pecaSrc(p.foto || CFG.peca.foto_default);

  return (
    <div className="result-wrap fade-in">
      <div className="result-head">
        <span className="check">✓</span> Veículo Identificado
      </div>
      <div className="vehicle-name">{vehicle.marca} {vehicle.modelo}</div>
      <div className="vehicle-spec">
        {vehicle.motor} · {vehicle.ano} · {vehicle.cv}cv<br />
        Placa: {vehicle.plate} · Chassi final: {vehicle.chassi_tail}
      </div>
      <hr className="hr-dashed" />
      <div className="part-label">Peça compatível com seu veículo</div>
      <div className="part-card">
        <div className="part-photo">
          <img src={fotoSrc} alt={`${p.name} — ${p.oem}`} loading="lazy" />
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
  return (
    <div className="result-wrap fade-in">
      <div className="vehicle-name">{VEICULO_MODELO} {year} — escolha a variação do motor</div>
      <div className="vehicle-spec">Selecione o motor do seu veículo para ver a peça exata.</div>
      <div className="variant-grid">
        {variants.map((v, i) => {
          const msg = fmt(CFG.wa.result_year_template, { oem: v.oem, year, motor: v.motor });
          const fotoSrc = pecaSrc(v.foto || CFG.peca.foto_default);
          return (
            <div className="variant-card" key={i}>
              <div className="variant-photo">
                <img src={fotoSrc} alt={`${CFG.peca.nome} ${v.oem}`} loading="lazy" />
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
      <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 18 }}>
        Não sabe qual é o seu? Insira a placa no seletor ↑ ou <a href={waLink(CFG.wa.result_dontknow_motor)} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>chame o vendedor no WhatsApp</a>.
      </p>
    </div>
  );
}

function ResultNotFound({ query }) {
  return (
    <div className="result-wrap fade-in">
      <div className="vehicle-name" style={{ color: '#c1121f' }}>Não encontramos</div>
      <div className="vehicle-spec" style={{ marginTop: 8 }}>
        Não localizamos um veículo para <b style={{ color: 'var(--ink)' }}>{query}</b>. Verifique a placa ou fale com um vendedor pra gente conferir pela nota do carro.
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
  const ident = [vehicle?.marca, vehicle?.modelo, vehicle?.ano].filter(Boolean).join(' ') || query;
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
      <div className="vehicle-name" style={{ color: '#c1121f' }}>Ops</div>
      <div className="vehicle-spec" style={{ marginTop: 8 }}>
        {message || 'Não conseguimos consultar agora. Fale com um vendedor.'}
      </div>
      <a className="btn btn-red btn-lg" style={{ marginTop: 18 }}
         href={waLink(fmt(CFG.wa.result_error_template, { query }))}
         target="_blank" rel="noreferrer">
        <WhatsAppIcon /> Chamar o vendedor
      </a>
    </div>
  );
}

export default function SearchSection({ result, onSearch, isSearching, selectorStyle }) {
  const hasResult = !!result;
  return (
    <section className={`sec-off sec-pad search-section ${hasResult ? 'has-result' : 'is-empty'}`} id="buscar">
      <div className="container">
        {hasResult ? (
          <>
            <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: 16 }}>Resultado da busca</div>
            {result.kind === 'plate' && result.vehicle && <ResultPlate vehicle={result.vehicle} />}
            {result.kind === 'year' && <ResultYear year={result.year} variants={result.variants} />}
            {result.kind === 'notfound' && <ResultNotFound query={result.query} />}
            {result.kind === 'notsupported' && <ResultNotSupported vehicle={result.vehicle} query={result.query} message={result.message} />}
            {result.kind === 'error' && <ResultError query={result.query} message={result.message} />}
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
