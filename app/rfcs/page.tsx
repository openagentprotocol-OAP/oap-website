import Link from 'next/link';
import { listRfcs } from '@/lib/rfcs';

export const metadata = { title: 'Request for Comments' };

export default async function RfcsIndexPage() {
  const rfcs = await listRfcs();
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-10">
        <div className="text-xs font-semibold tracking-[0.18em] text-indigo-300/80 mb-3 uppercase">RFCs</div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Request for Comments</h1>
        <p className="text-white/60 leading-relaxed max-w-2xl">
          OAP evolves through public, numbered Request for Comments. Each RFC is a substantive draft
          authored by a Working Group, reviewed in the open, and ratified into a future version of the
          specification. Anyone may submit an RFC.
        </p>
      </div>

      {rfcs.length === 0 && (
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-6 text-amber-100/80 text-sm">
          No RFCs have been synced yet. Run <code className="font-mono">npm run sync-rfcs</code> to import them from the spec repository.
        </div>
      )}

      <div className="space-y-2">
        {rfcs.map((r) => (
          <Link
            key={r.id}
            href={`/rfcs/${r.id}`}
            className="block p-5 rounded-xl border border-white/8 bg-white/[0.02] hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all"
          >
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[11px] font-mono font-semibold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded">RFC {r.id}</span>
              <span className="text-[15px] font-semibold text-white">{r.title}</span>
              <span className="ml-auto flex items-center gap-3 text-[11px] font-mono text-white/40">
                {r.workingGroup && <span>{r.workingGroup} WG</span>}
                {r.targetVersion && <span>v{r.targetVersion}</span>}
                <span className="text-white/35 uppercase tracking-wider">{r.status}</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-xl border border-white/8 bg-white/[0.02]">
        <div className="text-sm font-semibold text-white mb-2">RFC lifecycle</div>
        <ol className="text-sm text-white/60 space-y-1 list-decimal pl-5">
          <li>Draft: authored by anyone, opened as a PR against <code className="text-xs">oap-spec</code>.</li>
          <li>Review: public comment period of at least 14 days.</li>
          <li>Last Call: Working Group signals intent to ratify.</li>
          <li>Ratified: merged into a numbered specification release.</li>
        </ol>
        <a
          href="https://github.com/openagentprotocol-OAP/oap-spec/blob/main/rfcs/TEMPLATE.md"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-sm text-indigo-300 hover:text-indigo-200 underline underline-offset-4"
        >
          Submit an RFC →
        </a>
      </div>
    </div>
  );
}
