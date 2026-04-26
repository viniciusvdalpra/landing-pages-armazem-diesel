// scripts/build.mjs — descobre toda LP com config.json e roda esbuild
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import * as esbuild from 'esbuild';

const root = resolve(import.meta.dirname, '..');
const ignore = new Set(['node_modules', 'api', 'data', 'scripts', 'tools', '.git', '.vercel']);

const lps = readdirSync(root)
  .filter((n) => !n.startsWith('.') && !ignore.has(n))
  .filter((n) => statSync(join(root, n)).isDirectory())
  .filter((n) => existsSync(join(root, n, 'config.json')) && existsSync(join(root, n, 'main.jsx')));

if (!lps.length) {
  console.error('Nenhuma LP encontrada (faltando config.json + main.jsx em alguma pasta).');
  process.exit(1);
}

console.log(`Build de ${lps.length} LP(s): ${lps.join(', ')}`);

for (const slug of lps) {
  const dir = join(root, slug);
  await esbuild.build({
    entryPoints: [join(dir, 'main.jsx')],
    bundle: true,
    minify: true,
    sourcemap: true,
    loader: { '.jsx': 'jsx' },
    jsx: 'automatic',
    define: { 'process.env.NODE_ENV': '"production"' },
    outfile: join(dir, 'bundle.js'),
  });
  await esbuild.build({
    entryPoints: [join(dir, 'styles.css')],
    minify: true,
    outfile: join(dir, 'styles.min.css'),
  });
  console.log(`  ✓ ${slug}`);
}
