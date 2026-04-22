import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const RATE_LIMIT = 5;
const RATE_WINDOW = 70;
const CACHE_TTL = 60 * 60 * 24;

const MOTOR_BY_CV_AMAROK = {
  140: "2.0 TDI Diesel",
  163: "2.0 TDI Diesel",
  180: "2.0 BiTDI Diesel",
  224: "3.0 V6 TDI Diesel",
  258: "3.0 V6 TDI Diesel",
};

function normalizePlate(s) {
  return String(s || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
}

function normalizeChassi(s) {
  return String(s || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 17);
}

function clientIp(req) {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.length) return xf.split(",")[0].trim();
  return req.headers["x-real-ip"] || "unknown";
}

async function checkRateLimit(ip) {
  const key = `rl:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, RATE_WINDOW);
  return count <= RATE_LIMIT;
}

function extractPayload(raw) {
  const arr = Array.isArray(raw) ? raw[0] : raw;
  if (!arr || typeof arr !== "object") return null;
  if (arr.error) return null;
  return arr.chassi || arr.data || arr;
}

function normalizeVehicle(p, { plate, chassi }) {
  const marcaRaw = String(p.marca || "").toUpperCase().trim();
  const modeloRaw = String(p.modelo || "").toUpperCase().trim();
  const marca = marcaRaw === "VW" ? "VOLKSWAGEN" : marcaRaw;

  const cv = parseInt(p.potencia || p.cv || "0", 10) || null;
  let motor = String(p.motor || "").trim();
  const combust = String(p.combustivel || "").toUpperCase();

  if (!motor && cv && MOTOR_BY_CV_AMAROK[cv]) {
    motor = MOTOR_BY_CV_AMAROK[cv];
  } else if (motor && combust && !motor.toUpperCase().includes(combust)) {
    motor = `${motor} ${combust[0] + combust.slice(1).toLowerCase()}`;
  }

  const ano = parseInt(p.anoModelo || p.ano || "0", 10) || null;

  const plateOut = plate
    ? `${plate.slice(0, 3)}-${plate.slice(3)}`
    : (p.placa_modelo_novo || p.placa || "");

  const chassiFull = p.chassi_completo || p.chassi || chassi || "";
  const chassiTail = String(chassiFull).slice(-6);

  return {
    plate: plateOut,
    chassi_tail: chassiTail,
    marca,
    modelo: modeloRaw,
    motor,
    ano,
    cv,
  };
}

function isAmarok(v) {
  const marcaOk = v.marca === "VOLKSWAGEN" || v.marca === "VW";
  const modeloOk = (v.modelo || "").includes("AMAROK");
  return marcaOk && modeloOk;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const body = req.body || {};
  const placaIn = body.placa ? normalizePlate(body.placa) : null;
  const chassiIn = body.chassi ? normalizeChassi(body.chassi) : null;

  let kind, query;
  if (placaIn && placaIn.length === 7) {
    kind = "placa";
    query = placaIn;
  } else if (chassiIn && chassiIn.length >= 6 && chassiIn.length <= 17) {
    kind = "chassi";
    query = chassiIn;
  } else {
    return res.status(400).json({ error: "invalid_input", message: "Informe uma placa (7 caracteres) ou chassi (6-17 caracteres)." });
  }

  const ip = clientIp(req);
  try {
    const ok = await checkRateLimit(ip);
    if (!ok) return res.status(429).json({ error: "rate_limited", message: "Muitas consultas. Tente novamente em 1 minuto." });
  } catch (e) {
    console.error("rate_limit_error", e);
  }

  const cacheKey = `veiculo:${kind}:${query}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) return res.status(200).json({ ...cached, cached: true });
  } catch (e) {
    console.error("cache_read_error", e);
  }

  const webhookUrl = kind === "placa" ? process.env.N8N_WEBHOOK_PLATE : process.env.N8N_WEBHOOK_CHASSI;
  if (!webhookUrl) return res.status(500).json({ error: "config_missing" });

  const payload = kind === "placa" ? { placa: query } : { chassi: query };

  let raw;
  try {
    const r = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      return res.status(502).json({ error: "upstream_error", status: r.status });
    }
    raw = await r.json();
  } catch (e) {
    console.error("webhook_fetch_error", e);
    return res.status(502).json({ error: "upstream_unreachable" });
  }

  const data = extractPayload(raw);
  if (!data) {
    const resp = { found: false, reason: "not_found", kind, query };
    try { await redis.set(cacheKey, resp, { ex: 60 * 60 }); } catch {}
    return res.status(200).json(resp);
  }

  const vehicle = normalizeVehicle(data, {
    plate: kind === "placa" ? query : null,
    chassi: kind === "chassi" ? query : null,
  });

  if (!isAmarok(vehicle)) {
    const resp = {
      found: true,
      supported: false,
      reason: "not_amarok",
      vehicle: { marca: vehicle.marca, modelo: vehicle.modelo, ano: vehicle.ano },
      message: "Esta LP é específica para VW Amarok. Fale com a gente no WhatsApp pra consultar peças do seu veículo.",
    };
    try { await redis.set(cacheKey, resp, { ex: CACHE_TTL }); } catch {}
    return res.status(200).json(resp);
  }

  const resp = { found: true, supported: true, vehicle };
  try { await redis.set(cacheKey, resp, { ex: CACHE_TTL }); } catch {}
  return res.status(200).json(resp);
}
