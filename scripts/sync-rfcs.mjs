#!/usr/bin/env node
// Sync RFCs and core spec from sibling oap-spec repo into content/.
// Run via: npm run sync-rfcs
// In CI this can fetch from raw.githubusercontent.com instead.

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SPEC_REPO = process.env.SPEC_REPO
  ? path.resolve(process.env.SPEC_REPO)
  : path.resolve(ROOT, '..', 'oap-spec');

async function copyDir(src, dst, filter = () => true) {
  await fs.mkdir(dst, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    if (!filter(entry.name)) continue;
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) await copyDir(s, d, filter);
    else await fs.copyFile(s, d);
  }
}

async function main() {
  const rfcSrc = path.join(SPEC_REPO, 'rfcs');
  const rfcDst = path.join(ROOT, 'content', 'rfcs');
  await fs.rm(rfcDst, { recursive: true, force: true });
  await copyDir(rfcSrc, rfcDst, (n) => n.endsWith('.md'));
  console.log('Synced RFCs to', rfcDst);

  const specSrc = path.join(SPEC_REPO, 'spec', 'v1.0', 'OAP-CORE-1.0.md');
  const specDst = path.join(ROOT, 'content', 'spec', 'OAP-CORE-1.0.md');
  await fs.mkdir(path.dirname(specDst), { recursive: true });
  try {
    await fs.copyFile(specSrc, specDst);
    console.log('Synced spec to', specDst);
  } catch (e) {
    console.warn('Spec source not found at', specSrc, '- skipping');
  }

  const papersSrc = path.join(SPEC_REPO, 'papers');
  const papersDst = path.join(ROOT, 'content', 'papers');
  try {
    await fs.rm(papersDst, { recursive: true, force: true });
    await copyDir(papersSrc, papersDst, (n) => n.endsWith('.md'));
    console.log('Synced papers to', papersDst);
  } catch (e) {
    console.warn('Papers source not found at', papersSrc, '- skipping');
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
