export const metadata = { title: 'Implementations' };

const implementations = [
  {
    name: 'AssistNet',
    type: 'Reference Server',
    level: 'L2',
    description: 'Production AI assistant network with full OAP server, intent based discovery, four layer policy engine, hash chained receipts, and GDPR primitives.',
    url: 'https://assistant-net.vercel.app/oap',
    manifest: 'https://assistant-net.vercel.app/.well-known/oap-tool.json',
    language: 'JavaScript',
    status: 'live',
  },
];

export default function ImplementationsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="text-xs font-semibold tracking-[0.18em] text-indigo-300/80 mb-3 uppercase">Implementations</div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Where OAP runs in production.</h1>
        <p className="text-white/60 leading-relaxed max-w-3xl">
          A growing list of OAP conformant tools, agents, and platforms. Listings are unvetted
          self declarations until certified at L5. Add yours via a pull request to the website
          repository.
        </p>
      </div>

      <div className="space-y-3 mb-12">
        {implementations.map((i) => (
          <a
            key={i.name}
            href={i.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 rounded-xl border border-white/8 bg-white/[0.02] hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all"
          >
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <h3 className="text-lg font-semibold text-white">{i.name}</h3>
              <span className="text-[10px] font-mono font-semibold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded">{i.level}</span>
              <span className="text-[10px] uppercase tracking-wider text-white/45 font-semibold">{i.type}</span>
              {i.status === 'live' && (
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                </span>
              )}
              <span className="ml-auto text-xs text-white/40 font-mono">{i.language}</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-3">{i.description}</p>
            <div className="text-xs font-mono text-white/40 truncate">{i.manifest}</div>
          </a>
        ))}
      </div>

      <div className="p-6 rounded-xl border border-white/8 bg-white/[0.02]">
        <div className="text-sm font-semibold text-white mb-2">List your implementation</div>
        <p className="text-sm text-white/60 leading-relaxed mb-4">
          Open a pull request against the website repository with a single entry containing your name,
          conformance level, manifest URL, and a one sentence description. Listings are first come,
          first served.
        </p>
        <a
          href="https://github.com/openagentprotocol-OAP/oap-website/edit/main/app/implementations/page.tsx"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-indigo-300 hover:text-indigo-200 underline underline-offset-4"
        >
          Submit a PR →
        </a>
      </div>
    </div>
  );
}
