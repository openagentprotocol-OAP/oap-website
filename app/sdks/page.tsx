export const metadata = { title: 'SDKs' };

const sdks = [
  { lang: 'TypeScript', pkg: '@oap/sdk', install: 'npm install @oap/sdk', status: 'preview' },
  { lang: 'Python',     pkg: 'oap-sdk',  install: 'pip install oap-sdk',  status: 'preview' },
  { lang: 'Go',         pkg: 'github.com/openagentprotocol/oap-go', install: 'go get github.com/openagentprotocol/oap-go', status: 'planned' },
  { lang: 'Rust',       pkg: 'oap',      install: 'cargo add oap',        status: 'planned' },
];

export default function SdksPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="text-xs font-semibold tracking-[0.18em] text-indigo-300/80 mb-3 uppercase">SDKs</div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Build OAP servers and clients.</h1>
        <p className="text-white/60 leading-relaxed max-w-3xl">
          Reference SDKs implement manifest publishing, discovery, signed invocation, receipt
          generation, and the optional protocol extensions. All SDKs are Apache 2.0 licensed and
          maintained by community-operated services (RFC 0019, RFC 0026).
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-12">
        {sdks.map((s) => (
          <div key={s.lang} className="p-6 rounded-xl border border-white/8 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-white">{s.lang}</h3>
              <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${
                s.status === 'preview' ? 'text-amber-300 bg-amber-500/10' : 'text-white/40 bg-white/[0.04]'
              }`}>{s.status}</span>
            </div>
            <pre className="bg-ink-800 border border-white/8 rounded-lg p-3 text-[12.5px] font-mono text-white/85 overflow-x-auto"><code>{s.install}</code></pre>
            <div className="text-xs text-white/45 font-mono mt-3">{s.pkg}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="rounded-xl border border-white/10 bg-ink-800 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-white/5 bg-white/[0.02] text-[11px] font-mono text-white/45">
            server.ts
          </div>
          <pre className="p-5 text-[12.5px] leading-relaxed font-mono text-white/85 overflow-x-auto"><code>{`import { OapServer } from '@oap/sdk';

const server = new OapServer({
  did: 'did:web:tool.example',
  conformance: 'L2',
});

server.action({
  id: 'create_task',
  intent: 'create a task with title and due date',
  inputSchema: TaskInput,
  outputSchema: Task,
  riskClass: 'low',
  handler: async ({ input, context }) => {
    return await db.tasks.create(input);
  },
});

server.serve({ port: 8080 });`}</code></pre>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">What you get</h3>
          <ul className="text-sm text-white/65 space-y-2 leading-relaxed list-disc pl-5">
            <li>Auto generated <code className="font-mono text-xs">/.well-known/oap-tool.json</code> manifest with DID and signatures.</li>
            <li>Built in discovery, invocation, audit, and GDPR endpoints.</li>
            <li>Hash chained receipt generation and storage adapters (in memory, Postgres, S3).</li>
            <li>Pluggable policy hooks for the four layer governance stack.</li>
            <li>Type safe action definitions with JSON Schema generation.</li>
            <li>Conformance Test Suite client to self verify before publishing.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
