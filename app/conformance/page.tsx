export const metadata = { title: 'Conformance Levels' };

const coreLevels = [
  { code: 'L0', name: 'Compatible', desc: 'Reads and parses OAP manifests. May invoke actions but does not publish one. Suitable for clients and crawlers.' },
  { code: 'L1', name: 'Identifiable', desc: 'Publishes a signed manifest with a verifiable DID. Static identity only, no live invocation endpoint.' },
  { code: 'L2', name: 'Discoverable', desc: 'L1 plus live discover and invoke endpoints. Returns receipts. Honors GDPR data export. Default for production tools.' },
  { code: 'L3', name: 'Auditable', desc: 'L2 plus tamper evident hash chained receipts, public audit endpoint, incident reporting endpoint.' },
  { code: 'L4', name: 'Collaborative', desc: 'L3 plus support for the optional collaboration RFCs (sessions, negotiation, delegation, projections). Requires RFC 0016 User Sovereignty Charter compliance.' },
  { code: 'L5', name: 'Certified', desc: 'L4 plus passing the official Conformance Test Suite operated by the Stewards. Renewed annually.' },
];

const webLevels = [
  { code: 'W1', name: 'Manifest', desc: 'Origin publishes a minimal manifest at /.well-known/oap/manifest.json with identity, actions, and schemas. Agents can discover the origin without scraping.' },
  { code: 'W2', name: 'Surfaces', desc: 'W1 plus at least one Knowledge Node per data class declared in the manifest. Human surface and agent surface coexist at the same origin.' },
  { code: 'W3', name: 'Federated', desc: 'W2 plus DID bound to a Verifiable Credential, participation in a public registry, and Asset Descriptors for all modality assets.' },
];

const commerceLevels = [
  { code: 'C1', name: 'Priced', desc: 'Provider publishes machine readable cost information on every action. Commerce model declared in the manifest.' },
  { code: 'C2', name: 'Comparable', desc: 'C1 plus cost disclosure (Build versus Buy Decision Protocol). Consumers can compare token equivalent cost, latency, and quality evidence across providers.' },
  { code: 'C3', name: 'Auditable', desc: 'C2 plus Settlement Statements anchored in a Reconciliation Log. Full consumption proof chain for every billable unit.' },
];

export default function ConformancePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="text-xs font-semibold tracking-[0.18em] text-indigo-300/80 mb-3 uppercase">Conformance</div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Progressive levels, domain profiles.</h1>
        <p className="text-white/60 leading-relaxed max-w-3xl">
          OAP defines six core Conformance Levels (L0 through L5) plus domain specific profiles for the
          Agent Native Web (W1 through W3, per RFC 0012) and the Commercial Layer (C1 through C3, per
          RFC 0013). Each higher level adds testable obligations without removing capabilities from lower
          levels. Implementations declare their levels in the manifest, and the Stewards publish an
          open Conformance Test Suite to verify them.
        </p>
      </div>

      <h2 className="text-xl font-bold text-white mb-4 tracking-tight">Core Levels</h2>
      <div className="space-y-3 mb-12">
        {coreLevels.map((l) => (
          <div key={l.code} className="grid grid-cols-[80px_1fr] gap-6 p-6 rounded-xl border border-white/8 bg-white/[0.02]">
            <div>
              <div className="text-3xl font-bold text-white">{l.code}</div>
              <div className="text-xs uppercase tracking-wider text-indigo-300/80 mt-1">{l.name}</div>
            </div>
            <div className="text-sm text-white/65 leading-relaxed self-center">{l.desc}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-white mb-4 tracking-tight">Web Integration Profile (RFC 0012)</h2>
      <div className="space-y-3 mb-12">
        {webLevels.map((l) => (
          <div key={l.code} className="grid grid-cols-[80px_1fr] gap-6 p-6 rounded-xl border border-white/8 bg-white/[0.02]">
            <div>
              <div className="text-3xl font-bold text-white">{l.code}</div>
              <div className="text-xs uppercase tracking-wider text-emerald-300/80 mt-1">{l.name}</div>
            </div>
            <div className="text-sm text-white/65 leading-relaxed self-center">{l.desc}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-white mb-4 tracking-tight">Commercial Layer Profile (RFC 0013)</h2>
      <div className="space-y-3 mb-12">
        {commerceLevels.map((l) => (
          <div key={l.code} className="grid grid-cols-[80px_1fr] gap-6 p-6 rounded-xl border border-white/8 bg-white/[0.02]">
            <div>
              <div className="text-3xl font-bold text-white">{l.code}</div>
              <div className="text-xs uppercase tracking-wider text-amber-300/80 mt-1">{l.name}</div>
            </div>
            <div className="text-sm text-white/65 leading-relaxed self-center">{l.desc}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-6 mb-6">
        <div className="text-sm font-semibold text-white mb-3">Conformance Test Suite</div>
        <p className="text-sm text-white/60 leading-relaxed mb-4">
          The official Conformance Test Suite lives in the spec repository under <code className="text-white/80">test-suite/</code>.
          It is composed of four sub suites: schema validation against all 19 normative JSON Schemas,
          behavior tests against a live target server, conformance level coverage maps, and Charter
          conformance tests that verify the user sovereignty mandates of RFC 0016 are honored at
          runtime. Run <code className="text-white/80">npm test</code> against your manifest URL to
          certify your implementation, then run <code className="text-white/80">npm run attest</code>
          to produce a signed Conformance Receipt that other Agents can verify autonomously.
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

      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-6 mb-6">
        <div className="text-sm font-semibold text-white mb-3">Self Verification by Agents (RFC 0019)</div>
        <p className="text-sm text-white/60 leading-relaxed mb-4">
          Every Manifest MAY publish a signed Conformance Receipt under <code className="text-white/80">conformance.receipt_uri</code>.
          Any consuming Agent fetches the receipt, validates the signature against the implementation
          DID, checks that the validity window has not elapsed, and OPTIONALLY re executes a
          randomized sample of behavior tests against the live target. The reference implementation
          of this verifier is published as <code className="text-white/80">reference/agent/conformance-verifier.js</code>
          and is callable as a library function. The procedure is fully autonomous and requires no
          third party certifier.
        </p>
      </div>

      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-6">
        <div className="text-sm font-semibold text-white mb-3">How the Protocol Stays Implementable</div>
        <p className="text-sm text-white/60 leading-relaxed">
          RFC 0019 binds every future change to three governance gates enforced by Continuous
          Integration. The <strong className="text-white/85">Implementability Gate</strong> rejects
          any pull request that modifies a normative artifact without a corresponding test suite or
          reference implementation update. The <strong className="text-white/85">Backward Compatibility Gate</strong>
          rejects any silent edit to a v1.0 schema, forcing additive only changes or a clean v1.1
          versioning. The <strong className="text-white/85">Charter Review Gate</strong> requires two
          explicit sign offs, including one from a User Advocacy Voter, before any RFC that touches a
          user right can enter Last Call. Together these gates make the protocol mechanically
          unable to drift into theory and procedurally unable to silently weaken user rights.
        </p>
      </div>
    </div>
  );
}
