import Link from 'next/link';
import { listRfcs } from '@/lib/rfcs';

export default async function HomePage() {
  const rfcs = await listRfcs();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-900 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-xs text-white/65 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Specification v1.0 published · {rfcs.length} RFCs in flight
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
            <span className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
              An open standard for
            </span>
            <br />
            <span className="bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              AI agent communication.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-[17px] text-white/60 leading-relaxed mb-10">
            The Open Agent Protocol (OAP) is a vendor neutral specification for verifiable identity,
            discovery, invocation, governance, and accountability between autonomous AI agents and the
            tools they use. Identifiable. Verifiable. Enforceable.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/spec"
              className="px-5 py-2.5 rounded-lg bg-white text-ink-900 font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              Read the specification
            </Link>
            <Link
              href="/rfcs"
              className="px-5 py-2.5 rounded-lg border border-white/15 bg-white/[0.02] text-white font-semibold text-sm hover:bg-white/[0.06] transition-colors"
            >
              Browse RFCs
            </Link>
            <a
              href="https://github.com/openagentprotocol-OAP/oap-spec"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg border border-white/15 bg-white/[0.02] text-white/85 font-semibold text-sm hover:bg-white/[0.06] transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="text-xs font-semibold tracking-[0.18em] text-indigo-300/80 mb-3 uppercase">Seven planes</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Built around the questions every agent must answer.
          </h2>
          <p className="text-white/55 max-w-2xl mx-auto">
            OAP separates the seven concerns that platform local APIs entangle. Each plane is independently
            specified, independently testable, and independently extensible.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-xl border border-white/8 bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/15 transition-all">
              <div className="text-xs font-mono text-indigo-300/80 mb-2">{p.code}</div>
              <h3 className="text-base font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MANIFEST EXAMPLE */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-semibold tracking-[0.18em] text-indigo-300/80 mb-3 uppercase">Quickstart</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">Publish a manifest. Become discoverable.</h2>
            <p className="text-white/60 leading-relaxed mb-6">
              Any tool, agent, or service becomes part of the agent web by serving a single signed JSON
              document at a well known URL. No registration, no platform lock in, no proprietary client.
            </p>
            <div className="flex gap-3">
              <Link href="/sdks" className="text-sm text-indigo-300 hover:text-indigo-200 underline underline-offset-4">Get the SDK →</Link>
              <Link href="/spec#section-7" className="text-sm text-white/55 hover:text-white">Read action schema →</Link>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-ink-800 overflow-hidden shadow-2xl shadow-indigo-500/5">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02] text-[11px] font-mono text-white/45">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              <span className="ml-2">/.well-known/oap-tool.json</span>
            </div>
            <pre className="p-5 text-[12.5px] leading-relaxed font-mono text-white/80 overflow-x-auto"><code>{`{
  "oap_version": "1.0",
  "did": "did:web:tool.example",
  "name": "Example Tool",
  "conformance_level": "L2",
  "actions": [
    {
      "id": "create_task",
      "intent": "create a task with title and due date",
      "input_schema": { "$ref": "..." },
      "output_schema": { "$ref": "..." },
      "risk_class": "low",
      "cost": { "currency": "EUR", "amount": "0.001" }
    }
  ],
  "endpoints": {
    "discover": "https://tool.example/oap/discover",
    "invoke":   "https://tool.example/oap/invoke",
    "audit":    "https://tool.example/oap/audit"
  }
}`}</code></pre>
          </div>
        </div>
      </section>

      {/* RFC ROADMAP */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold tracking-[0.18em] text-indigo-300/80 mb-3 uppercase">Roadmap</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              {rfcs.length} active RFCs extending the standard.
            </h2>
            <p className="text-white/55 max-w-xl">
              Drafted from production deployments. Contributions welcome through the public RFC process.
            </p>
          </div>
          <Link href="/rfcs" className="text-sm text-indigo-300 hover:text-indigo-200 self-start md:self-auto">
            View all RFCs →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {rfcs.slice(0, 8).map((r) => (
            <Link
              key={r.id}
              href={`/rfcs/${r.id}`}
              className="block p-5 rounded-xl border border-white/8 bg-white/[0.02] hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10.5px] font-mono font-semibold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded">RFC {r.id}</span>
                <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">{r.status}</span>
                {r.targetVersion && <span className="ml-auto text-[10px] font-mono text-white/35">v{r.targetVersion}</span>}
              </div>
              <div className="text-[15px] font-semibold text-white mb-1">{r.title}</div>
              {r.workingGroup && <div className="text-xs text-white/45">{r.workingGroup} WG</div>}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="rounded-2xl border border-indigo-500/25 bg-gradient-to-br from-indigo-500/[0.07] via-purple-500/[0.05] to-transparent p-10 md:p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Standards win when implementations exist.</h2>
          <p className="text-white/65 max-w-2xl mx-auto mb-7 leading-relaxed">
            OAP ships with reference servers, JSON Schemas, and SDKs from day one. Adopt the spec, list
            your implementation, and join the working groups shaping the next generation of agent
            interoperability.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/sdks" className="px-5 py-2.5 rounded-lg bg-white text-ink-900 font-semibold text-sm hover:bg-white/90 transition-colors">Get an SDK</Link>
            <Link href="/governance" className="px-5 py-2.5 rounded-lg border border-white/15 bg-white/[0.02] font-semibold text-sm hover:bg-white/[0.06] transition-colors">Join a working group</Link>
          </div>
        </div>
      </section>
    </>
  );
}

const pillars = [
  { code: 'PLANE 1', title: 'Identity', desc: 'Verifiable agent identity via W3C DIDs. did:web by default, did:key, did:plc, did:ion supported.' },
  { code: 'PLANE 2', title: 'Discovery', desc: 'Intent based action lookup. Manifests describe what an agent or tool does, what it costs, what it risks.' },
  { code: 'PLANE 3', title: 'Invocation', desc: 'Signed request and response envelopes with replay protection, idempotency, and capability checks.' },
  { code: 'PLANE 4', title: 'Commercial', desc: 'Per call pricing, usage based billing, and signed agreements without a payment processor in the loop.' },
  { code: 'PLANE 5', title: 'Governance', desc: 'Four layer policy stack: platform, organization, scope, personal. Every decision recorded.' },
  { code: 'PLANE 6', title: 'Accountability', desc: 'Hash chained receipts. Complete, tamper evident audit trail across the entire invocation tree.' },
  { code: 'PLANE 7', title: 'Foundation', desc: 'GDPR primitives, deletion endpoints, transparency reports, dispute resolution. Built in, not bolted on.' },
];
