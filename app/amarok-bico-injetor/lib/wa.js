export const WA_NUMBER = '5549999484754';
export const WA_NUMBER_DISPLAY = '(49) 99948-4754';

export function waLink(msg) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function fmt(template, vars) {
  return String(template).replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? vars[k] : ''));
}
