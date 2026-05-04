import { listPapers } from '@/lib/rfcs';
import Link from 'next/link';

export const metadata = { title: 'Papers' };

export default async function PapersPage() {
  const papers = await listPapers();
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <div className="text-xs font-semibold tracking-[0.18em] text-indigo-300/80 mb-3 uppercase">Community Publications</div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Whitepapers</h1>
        <p className="text-white/60 leading-relaxed max-w-2xl">
          Long form publications of the Open Agent Protocol community. Whitepapers describe the rationale and architectural commitments behind the protocol. They are normative only where they reference an accepted RFC or the core specification.
        </p>
      </div>
      <ul className="divide-y divide-white/5 border border-white/10 rounded-lg overflow-hidden">
        {papers.length === 0 ? (
          <li className="p-6 text-white/50 text-sm">No papers have been synced to this build. Run <code className="font-mono">npm run sync-rfcs</code> from the website root.</li>
        ) : papers.map((p) => (
          <li key={p.slug}>
            <Link href={`/papers/${p.slug}`} className="block p-6 hover:bg-white/[0.03] transition-colors">
              <div className="text-lg font-semibold text-white mb-1">{p.title}</div>
              <div className="text-xs text-white/40 font-mono">{p.filename}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
