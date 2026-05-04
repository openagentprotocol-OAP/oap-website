#!/usr/bin/env node
// Sync RFCs, core spec, and papers from oap-spec into content/.
// Run via: npm run sync-rfcs
//
// Resolution order for the source:
//   1. If SPEC_REPO env var is set, treat it as a local checkout path.
//   2. If a sibling ../oap-spec checkout exists, use it.
//   3. Otherwise, fall back to fetching from GitHub raw on the
//      SPEC_BRANCH branch (default: main) of SPEC_GH_REPO
//      (default: openagentprotocol-OAP/oap-spec).
//
// Fallback (3) is what runs on Vercel build, where the oap-spec repo
// is not checked out alongside this one.

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SPEC_GH_REPO = process.env.SPEC_GH_REPO || 'openagentprotocol-OAP/oap-spec';
const SPEC_BRANCH = process.env.SPEC_BRANCH || 'main';
const RAW_BASE = `https://raw.githubusercontent.com/${SPEC_GH_REPO}/${SPEC_BRANCH}`;
const API_BASE = `https://api.github.com/repos/${SPEC_GH_REPO}/contents`;

async function pathExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function resolveLocalSpecRepo() {
  if (process.env.SPEC_REPO) {
    const p = path.resolve(process.env.SPEC_REPO);
    if (await pathExists(path.join(p, 'rfcs'))) return p;
    console.warn(`SPEC_REPO=${p} does not contain an rfcs/ directory; trying fallback.`);
  }
  const sibling = path.resolve(ROOT, '..', 'oap-spec');
  if (await pathExists(path.join(sibling, 'rfcs'))) return sibling;
  return null;
}

async function copyLocalDir(src, dst, filter = () => true) {
  await fs.mkdir(dst, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    if (!filter(entry.name)) continue;
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) await copyLocalDir(s, d, filter);
    else await fs.copyFile(s, d);
  }
}

async function fetchJson(url) {
  const headers = { 'User-Agent': 'oap-website-sync', Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status} ${res.statusText}`);
  return res.json();
}

async function fetchText(url) {
  const headers = { 'User-Agent': 'oap-website-sync' };
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status} ${res.statusText}`);
  return res.text();
}

async function listRemoteDir(dirPath) {
  const url = `${API_BASE}/${dirPath}?ref=${encodeURIComponent(SPEC_BRANCH)}`;
  const items = await fetchJson(url);
  return items.filter((it) => it.type === 'file' && it.name.endsWith('.md'));
}

async function syncRemoteDir(dirPath, dst) {
  await fs.rm(dst, { recursive: true, force: true });
  await fs.mkdir(dst, { recursive: true });
  const files = await listRemoteDir(dirPath);
  await Promise.all(files.map(async (f) => {
    const text = await fetchText(`${RAW_BASE}/${dirPath}/${f.name}`);
    await fs.writeFile(path.join(dst, f.name), text, 'utf8');
  }));
  console.log(`Synced ${files.length} file(s) from ${SPEC_GH_REPO}@${SPEC_BRANCH}:${dirPath} to ${dst}`);
}

async function syncRemoteFile(srcPath, dst) {
  await fs.mkdir(path.dirname(dst), { recursive: true });
  const text = await fetchText(`${RAW_BASE}/${srcPath}`);
  await fs.writeFile(dst, text, 'utf8');
  console.log(`Synced ${SPEC_GH_REPO}@${SPEC_BRANCH}:${srcPath} to ${dst}`);
}

async function syncFromLocal(specRepo) {
  const rfcSrc = path.join(specRepo, 'rfcs');
  const rfcDst = path.join(ROOT, 'content', 'rfcs');
  await fs.rm(rfcDst, { recursive: true, force: true });
  await copyLocalDir(rfcSrc, rfcDst, (n) => n.endsWith('.md'));
  console.log('Synced RFCs (local) to', rfcDst);

  const specSrc = path.join(specRepo, 'spec', 'v1.0', 'OAP-CORE-1.0.md');
  const specDst = path.join(ROOT, 'content', 'spec', 'OAP-CORE-1.0.md');
  await fs.mkdir(path.dirname(specDst), { recursive: true });
  if (await pathExists(specSrc)) {
    await fs.copyFile(specSrc, specDst);
    console.log('Synced spec (local) to', specDst);
  } else {
    console.warn('Spec source not found at', specSrc, '- skipping');
  }

  const papersSrc = path.join(specRepo, 'papers');
  const papersDst = path.join(ROOT, 'content', 'papers');
  if (await pathExists(papersSrc)) {
    await fs.rm(papersDst, { recursive: true, force: true });
    await copyLocalDir(papersSrc, papersDst, (n) => n.endsWith('.md'));
    console.log('Synced papers (local) to', papersDst);
  } else {
    console.warn('Papers source not found at', papersSrc, '- skipping');
  }
}

async function syncFromRemote() {
  console.log(`Fetching spec from ${SPEC_GH_REPO}@${SPEC_BRANCH} via GitHub raw.`);
  await syncRemoteDir('rfcs', path.join(ROOT, 'content', 'rfcs'));
  try {
    await syncRemoteFile('spec/v1.0/OAP-CORE-1.0.md', path.join(ROOT, 'content', 'spec', 'OAP-CORE-1.0.md'));
  } catch (e) {
    console.warn('Spec OAP-CORE-1.0.md not available remotely:', e.message);
  }
  try {
    await syncRemoteDir('papers', path.join(ROOT, 'content', 'papers'));
  } catch (e) {
    console.warn('Papers not available remotely:', e.message);
  }
}

async function main() {
  const local = await resolveLocalSpecRepo();
  if (local) {
    await syncFromLocal(local);
  } else {
    await syncFromRemote();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
