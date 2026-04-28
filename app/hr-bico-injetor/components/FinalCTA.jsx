import CFG from '../config.json';
import { waLink, WA_NUMBER_DISPLAY } from '../lib/wa';
import { WhatsAppIcon } from './atoms';

export default function FinalCTA() {
  return (
    <section className="sec-navy">
      <div className="container final-cta">
        <h2 className="h2">{CFG.final_cta.h2_l1} <span className="red">{CFG.final_cta.h2_l2_red_l1}<br />{CFG.final_cta.h2_l2_red_l2}</span>?</h2>
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
