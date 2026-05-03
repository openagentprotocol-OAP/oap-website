import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRfc, listRfcs } from '@/lib/rfcs';
import { Markdown } from '@/components/Markdown';

export async function generateStaticParams() {
  const rfcs = await listRfcs();
  return rfcs.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rfc = await getRfc(id);
  return { title: rfc ? `RFC ${rfc.id}: ${rfc.title}` : 'RFC' };
}

export default async function RfcPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rfc = await getRfc(id);
  if (!rfc) notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8 flex items-center gap-3 text-sm">
        <Link href="/rfcs" className="text-white/55 hover:text-white">← All RFCs</Link>
        <span className="text-white/20">/</span>
        <span className="text-[11px] font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded">RFC {rfc.id}</span>
        <span className="text-[11px] uppercase tracking-wider text-white/40 font-semibold">{rfc.status}</span>
        {rfc.targetVersion && <span className="text-[11px] font-mono text-white/40">v{rfc.targetVersion}</span>}
        <a
          href={`https://github.com/openagentprotocol-OAP/oap-spec/blob/main/rfcs/${rfc.filename}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs text-white/55 hover:text-white"
        >
          Edit on GitHub →
        </a>
      </div>
      <Markdown source={rfc.content} />
    </div>
  );
}
