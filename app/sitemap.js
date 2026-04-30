import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SITE_URL = 'https://landing-pages-armazem-diesel.vercel.app';

// Descobre LPs olhando subdirs de app/ que contêm config.json (convenção do projeto).
// Próxima LP nasce auto-listada — sem editar sitemap.
function findLandingSlugs() {
  const appDir = join(process.cwd(), 'app');
  const entries = readdirSync(appDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory())
    .filter((e) => !e.name.startsWith('_') && e.name !== 'api')
    .filter((e) => existsSync(join(appDir, e.name, 'config.json')))
    .map((e) => e.name)
    .sort();
}

export default function sitemap() {
  const now = new Date();
  return findLandingSlugs().map((slug) => ({
    url: `${SITE_URL}/${slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));
}
