export const metadata = { title: 'Conformance Levels' };

const levels = [
  { code: 'L0', name: 'Compatible', desc: 'Reads and parses OAP manifests. May invoke actions but does not publish one. Suitable for clients and crawlers.' },
  { code: 'L1', name: 'Identifiable', desc: 'Publishes a signed manifest with a verifiable DID. Static identity only, no live invocation endpoint.' },
  { code: 'L2', name: 'Discoverable', desc: 'L1 plus live discover and invoke endpoints. Returns receipts. Honors GDPR data export. Default for production tools.' },
  { code: 'L3', name: 'Auditable', desc: 'L2 plus tamper evident hash chained receipts, public audit endpoint, incident reporting endpoint.' },
  { code: 'L4', name: 'Collaborative', desc: 'L3 plus support for the optional collaboration RFCs (sessions, negotiation, delegation, projections).' },
  { code: 'L5', name: 'Certified', desc: 'L4 plus passing the official Conformance Test Suite operated by the Foundation. Renewed annually.' },
];

export default function ConformancePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="text-xs font-semibold tracking-[0.18em] text-indigo-300/80 mb-3 uppercase">Conformance</div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Six levels, no compromises.</h1>
        <p className="text-white/60 leading-relaxed max-w-3xl">
          OAP defines six progressive Conformance Levels. Each higher level adds testable obligations
          without removing capabilities from lower levels. Implementations declare a level in their
          manifest, and the Foundation publishes an open Conformance Test Suite to verify it.
        </p>
      </div>

      <div className="space-y-3 mb-12">
        {levels.map((l) => (
          <div key={l.code} className="grid grid-cols-[80px_1fr] gap-6 p-6 rounded-xl border border-white/8 bg-white/[0.02]">
            <div>
              <div className="text-3xl font-bold text-white">{l.code}</div>
              <div className="text-xs uppercase tracking-wider text-indigo-300/80 mt-1">{l.name}</div>
            </div>
            <div className="text-sm text-white/65 leading-relaxed self-center">{l.desc}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-6">
        <div className="text-sm font-semibold text-white mb-3">Test Suite</div>
        <p className="text-sm text-white/60 leading-relaxed mb-4">
          The official Conformance Test Suite is published as an OSS repository under the Foundation
          GitHub organization. Run it locally against your manifest URL to certify your implementation.
        </p>
        <a
          href="https://github.com/openagentprotocol-OAP/oap-spec/tree/main/test-suite"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-indigo-300 hover:text-indigo-200 underline underline-offset-4"
        >
          oap-spec / test-suite →
        </a>
      </div>
    </div>
  );
}
