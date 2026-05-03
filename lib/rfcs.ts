import { promises as fs } from 'fs';
import path from 'path';

const RFC_DIR = path.join(process.cwd(), 'content', 'rfcs');
const SPEC_DIR = path.join(process.cwd(), 'content', 'spec');

export type RfcMeta = {
  id: string;          // "0001"
  slug: string;        // "sessions"
  filename: string;    // "RFC-0001-sessions.md"
  title: string;
  status: string;
  workingGroup?: string;
  targetVersion?: string;
  created?: string;
};

export type Rfc = RfcMeta & { content: string };

function parseFrontMatter(md: string, filename: string, id: string, slug: string): RfcMeta {
  const titleMatch = md.match(/^# RFC \d+:\s*(.+)$/m);
  const statusMatch = md.match(/\*\*Status:\*\*\s*(.+)/);
  const wgMatch = md.match(/\*\*Working Group:\*\*\s*(.+)/);
  const targetMatch = md.match(/\*\*Targets:\*\*\s*(.+)/);
  const createdMatch = md.match(/\*\*Created:\*\*\s*(.+)/);
  return {
    id,
    slug,
    filename,
    title: titleMatch?.[1]?.trim() ?? `RFC ${id}`,
    status: statusMatch?.[1]?.trim() ?? 'Draft',
    workingGroup: wgMatch?.[1]?.trim(),
    targetVersion: targetMatch?.[1]?.trim(),
    created: createdMatch?.[1]?.trim(),
  };
}

export async function listRfcs(): Promise<RfcMeta[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(RFC_DIR);
  } catch {
    return [];
  }
  const metas: RfcMeta[] = [];
  for (const f of files) {
    if (!f.startsWith('RFC-') || !f.endsWith('.md')) continue;
    const m = f.match(/^RFC-(\d+)-(.+)\.md$/);
    if (!m) continue;
    const [, id, slug] = m;
    const md = await fs.readFile(path.join(RFC_DIR, f), 'utf8');
    metas.push(parseFrontMatter(md, f, id, slug));
  }
  metas.sort((a, b) => a.id.localeCompare(b.id));
  return metas;
}

export async function getRfc(id: string): Promise<Rfc | null> {
  const metas = await listRfcs();
  const meta = metas.find((m) => m.id === id || m.id === id.padStart(4, '0'));
  if (!meta) return null;
  const content = await fs.readFile(path.join(RFC_DIR, meta.filename), 'utf8');
  return { ...meta, content };
}

export async function getCoreSpec(): Promise<string | null> {
  try {
    return await fs.readFile(path.join(SPEC_DIR, 'OAP-CORE-1.0.md'), 'utf8');
  } catch {
    return null;
  }
}
