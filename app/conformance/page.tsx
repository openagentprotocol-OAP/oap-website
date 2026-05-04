export const metadata = {
  title: 'Conformance levels',
  description:
    'OAP defines six Conformance Levels (L0 through L5) plus Non-Commercial Profile suffixes (-NC) for BYOK and self-hosted implementations.',
};

const levels = [
  { code: 'L0',    name: 'Compatible',     probe: 'machine-verifiable', desc: 'Implements MCP or A2A and publishes a minimal OAP Manifest mapping. Self-attested.' },
  { code: 'L1',    name: 'Discoverable',   probe: 'machine-verifiable', desc: 'Full Manifest, categories, examples, machine-validated by the OAP test suite. Self-signed Conformance Receipt.' },
  { code: 'L2',    name: 'Billable',       probe: 'machine-verifiable', desc: 'L1 plus Pricing, Auth, Subscription, Wallet, refund endpoint. Self-signed.' },
  { code: 'L3',    name: 'Trusted',        probe: 'machine-verifiable', desc: 'L2 plus Audit Log, Data Policy, CCC, Verified Publisher, Multi-Party Review for high-risk Actions. DNS or DID-based publisher verification.' },
  { code: 'L4',    name: 'Collaborative',  probe: 'machine-verifiable', desc: 'L3 plus Multi-Agent Coordination, Conflict Resolution, Change Broadcast, Coordination Sessions. Requires at least one independent peer-witness signature, anchored in the OAP Registry.' },
  { code: 'L5',    name: 'Peer-Certified', probe: 'machine-verifiable', desc: 'L4 plus an independent third-party security audit (SOC 2 Type II, ISO 27001, or equivalent). Requires at least three independent peer-witness signatures from L4+ implementations, anchored in the OAP Registry.' },
];

const profiles = [
  { code: 'L1-NC', name: 'L1 Non-Commercial', probe: 'machine-verifiable', desc: 'L1 with Wallet, Subscription, and refund waived. For BYOK platforms, self-hosted deployments, and grant- or donation-funded services.' },
  { code: 'L3-NC', name: 'L3 Non-Commercial', probe: 'machine-verifiable', desc: 'L3 with the Commerce Plane requirements waived. Trust requirements (Audit Log, Data Policy, CCC, Verified Publisher) still apply in full.' },
];

export default function ConformancePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <div className="text-xs font-semibold tracking-[0.18em] text-indigo-300/80 mb-3 uppercase">Conformance</div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Six levels. Mechanically verified. No certification authority.</h1>
        <p className="text-white/60 leading-relaxed">
          OAP defines six Conformance Levels (L0 through L5). Implementations declare their Level through a signed Conformance Receipt produced by the open-source test suite. There is no certification authority and no fee. L4 and L5 require independent peer-witness signatures from already-conformant implementations and an anchor in the OAP Registry, an append-only Git repository (RFC 0026).
        </p>
      </div>

      <div className="space-y-3 mb-12">
        {levels.map((l) => (
          <div key={l.code} className="p-5 rounded-xl border border-white/8 bg-white/[0.02]">
            <div className="flex items-baseline gap-3 mb-2 flex-wrap">
              <div className="text-sm font-mono text-indigo-300">{l.code}</div>
              <div className="text-base font-semibold text-white">{l.name}</div>
              <ProbeBadge state={l.probe} />
            </div>
            <div className="text-sm text-white/60 leading-relaxed">{l.desc}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-white mb-3 tracking-tight">Non-Commercial Profile (RFC 0025)</h2>
      <p className="text-white/60 leading-relaxed mb-4">
        Implementations that do not collect revenue from their users (BYOK platforms, self-hosted deployments, grant-funded services) MAY claim a Non-Commercial Profile. The <code className="font-mono text-xs">-NC</code> suffix waives the Commerce Plane requirements but preserves every other requirement of the base level.
      </p>
      <div className="space-y-3 mb-12">
        {profiles.map((l) => (
          <div key={l.code} className="p-5 rounded-xl border border-white/8 bg-white/[0.02]">
            <div className="flex items-baseline gap-3 mb-2 flex-wrap">
              <div className="text-sm font-mono text-indigo-300">{l.code}</div>
              <div className="text-base font-semibold text-white">{l.name}</div>
              <ProbeBadge state={l.probe} />
            </div>
            <div className="text-sm text-white/60 leading-relaxed">{l.desc}</div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-lg border border-emerald-400/20 bg-emerald-500/[0.04] mb-12 text-[13px] leading-relaxed text-emerald-100/80">
        <strong className="text-emerald-200">Probe coverage status.</strong> Every level from L0 through L5, plus L1-NC and L3-NC, has machine-verifiable probes in <code className="font-mono text-xs">test-suite/behavior/</code>. The reference server claims L0 and L1 honestly and currently passes 58 out of 58 probes (44 active checks plus 14 not-applicable PASSes for capabilities the reference does not claim). Probes for L2 through L5 activate the moment an implementation’s Conformance Receipt claims those levels, and <code className="font-mono text-xs">attest.js</code> ignores not-applicable PASSes when computing credit, so an L1 implementation cannot silently inherit L2..L5 attestation. Probe sources: <a className="underline underline-offset-4 text-emerald-200" href="https://github.com/openagentprotocol-OAP/oap-spec/tree/main/test-suite/behavior" target="_blank" rel="noopener noreferrer">test-suite/behavior</a>, requirements: <a className="underline underline-offset-4 text-emerald-200" href="https://github.com/openagentprotocol-OAP/oap-spec/blob/main/test-suite/levels/levels.json" target="_blank" rel="noopener noreferrer">levels.json</a>, audited Receipt format: <a className="underline underline-offset-4 text-emerald-200" href="/rfcs/0019">RFC 0019</a>.
      </div>

      <h2 className="text-xl font-bold text-white mb-3 tracking-tight">How to claim a level</h2>
      <ol className="list-decimal pl-5 space-y-2 text-white/65 text-[15px] leading-relaxed">
        <li>Run <code className="font-mono text-xs">node test-suite/runner.js</code> against your deployment.</li>
        <li>Run <code className="font-mono text-xs">node test-suite/attest.js --target ... --signing-key ...</code> to produce a signed Conformance Receipt.</li>
        <li>Publish the Receipt at a stable URL and reference it from your Manifest's <code className="font-mono text-xs">conformance.receipt_uri</code>.</li>
        <li>For L4 and L5: send your Receipt to peer witnesses (other L4+ implementations) and ask each to run <code className="font-mono text-xs">attest.js --peer-witness</code>.</li>
        <li>Submit a Pull Request to <a className="underline underline-offset-4 text-indigo-300" href="https://github.com/openagentprotocol-OAP/oap-registry" target="_blank" rel="noopener noreferrer"><code className="font-mono text-xs">openagentprotocol-OAP/oap-registry</code></a> with your <code className="font-mono text-xs">implementations/&lt;slug&gt;.json</code>. Browse current entries in the <a className="underline underline-offset-4 text-indigo-300" href="/registry">OAP Registry</a>.</li>
        <li>The Registry CI gate validates schema, signatures, manifest reachability, peer witnesses, and the 30-day domain-age sybil filter. If everything passes, a Maintainer merges. The merge commit is your anchor.</li>
      </ol>

      <p className="text-white/55 text-sm mt-10">
        Conformance Receipts are valid for 90 days and MUST be re-issued before expiry. The full procedure is normative in <a className="underline underline-offset-4 text-indigo-300" href="/rfcs/0019">RFC 0019</a> and <a className="underline underline-offset-4 text-indigo-300" href="/rfcs/0026">RFC 0026</a>. The Non-Commercial Profile is defined in <a className="underline underline-offset-4 text-indigo-300" href="/rfcs/0025">RFC 0025</a>.
      </p>
    </div>
  );
}

function ProbeBadge({ state }: { state: string }) {
  const machineVerifiable = state === 'machine-verifiable';
  const cls = machineVerifiable
    ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20'
    : 'text-amber-200 bg-amber-500/10 border-amber-500/20';
  return (
    <span className={`text-[10px] uppercase tracking-[0.14em] font-semibold px-2 py-0.5 rounded border ${cls}`}>
      {state}
    </span>
  );
}
