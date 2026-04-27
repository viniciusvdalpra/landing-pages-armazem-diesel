import CFG from '../config.json';
import OEMS from '@/data/oems.json';

const _veiculo_data = OEMS[CFG.categoria]?.[CFG.veiculo_key];
if (!_veiculo_data) {
  throw new Error(`Config inválida: "${CFG.categoria}" + "${CFG.veiculo_key}" não encontrado em oems.json`);
}

export const YEAR_VARIANTS = _veiculo_data.variants_por_ano;
export const VEICULO_MODELO = _veiculo_data.veiculo.modelo;

export function resolvePart(motor, ano, cv) {
  const oemUnknown = CFG.result_messages.default_oem_unknown;
  const defaultPart = {
    name: CFG.peca.nome,
    oem: oemUnknown,
    brand: CFG.peca.fabricante_label,
    bullets: CFG.peca.bullets_unknown,
    hasLine1a: CFG.peca.tem_primeira_linha,
  };
  const variants = YEAR_VARIANTS[ano] || [];
  if (!variants.length) return defaultPart;

  const motorUp = String(motor || '').toUpperCase();
  const cvNum = parseInt(cv, 10) || 0;
  let match;
  if (motorUp.includes('V6') || motorUp.includes('3.0') || cvNum >= 224) {
    match = variants.find((v) => v.motor.toUpperCase().includes('V6'));
  } else if (motorUp.includes('BITURBO') || motorUp.includes('BI-TURBO') || motorUp.includes('BI TURBO') || cvNum >= 170) {
    match = variants.find((v) => v.motor.toUpperCase().includes('BITURBO'));
  } else {
    match = variants.find((v) => !v.motor.toUpperCase().includes('BITURBO') && !v.motor.toUpperCase().includes('V6')) || variants[0];
  }
  if (!match) return defaultPart;

  const isV6 = match.motor.toUpperCase().includes('V6');
  return {
    ...defaultPart,
    oem: match.oem.includes('XXX') ? oemUnknown : match.oem,
    hasLine1a: !isV6 && CFG.peca.tem_primeira_linha,
    bullets: isV6 && CFG.peca.bullets_v6 ? CFG.peca.bullets_v6 : CFG.peca.bullets_default,
  };
}

export function enrichMotor(vehicle) {
  const map = CFG.veiculo?.motor_por_cv;
  if (!vehicle || vehicle.motor || !map || !vehicle.cv) return vehicle;
  const fromCv = map[String(vehicle.cv)];
  if (!fromCv) return vehicle;
  return { ...vehicle, motor: fromCv };
}

export function isSupported(vehicle) {
  const marcas = CFG.veiculo?.marca_aliases || [];
  const modelos = CFG.veiculo?.modelo_aliases || [];
  if (!marcas.length || !modelos.length) return true;
  const marcaUp = String(vehicle.marca || '').toUpperCase();
  const modeloUp = String(vehicle.modelo || '').toUpperCase();
  const marcaOk = marcas.some((a) => marcaUp === String(a).toUpperCase());
  const modeloOk = modelos.some((a) => modeloUp.includes(String(a).toUpperCase()));
  return marcaOk && modeloOk;
}
