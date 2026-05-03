import { OapSeal } from '@/components/OapSeal';

export const metadata = {
  title: 'Certification',
  description:
    'OAP Verified is a self issued, cryptographically signed conformance receipt that any agent can verify autonomously. Optional stewards witnessing produces OAP Certified at L5.',
};

const tiers = [
  {
    code: 'L1 to L4',
    name: 'OAP Verified',
    issuer: 'Self issued by the implementation',
    validity: '90 days',
    proof: 'Ed25519 signature bound to the implementation DID',
    desc: 'The implementation runs the official Conformance Test Suite against its own live target, signs the canonical result JSON, and publishes the receipt at manifest.conformance.receipt_uri. Any consuming Agent verifies it autonomously in milliseconds.',
  },
  {
    code: 'L5',
    name: 'OAP Certified',
    issuer: 'Stewards witnessed',
    validity: '12 months',
    proof: 'Implementation signature plus a stewards counter signature anchored in the public Transparency Log',
    desc: 'The Stewards re execute the full suite against the implementation in a witnessed run, counter signs the receipt with its own DID, and writes the inclusion proof into the public append only Transparency Log. This is the highest level of mechanical and procedural assurance OAP defines.',
  },
];

const threats = [
  { t: 'Forged receipt', m: 'Ed25519 signature bound to a DID. Public key resolved through the DID document at verification time. Forgery requires the implementation\u2019s private key.' },
  { t: 'Silent rewrite', m: 'Each receipt carries previous_receipt_hash, forming a tamper evident chain. L5 receipts are additionally written into a Merkle Transparency Log so any inconsistency between published and historical state is detectable.' },
  { t: 'Stale or replayed result', m: 'Every receipt declares valid_from and valid_until. L1 to L4 windows are capped at 90 days, L5 at 12 months. Verifiers MUST reject expired receipts.' },
  { t: 'Stolen signing key', m: 'DID documents publish a key history with rotation events. A revocation list endpoint allows immediate invalidation. Short windows bound the blast radius.' },
  { t: 'Test environment differs from production', m: 'Receipts record the exact target_uri tested. Verifying Agents MAY re run a randomised sample of behaviour tests against the live endpoint and refuse the receipt on mismatch.' },
  { t: 'Tampered test suite', m: 'Receipts pin the exact suite commit (sha256 of the test suite tree) and the engine version. Independent re execution detects divergence.' },
  { t: 'Counterfeit visual badge', m: 'The seal image is visual only. Trust always flows from the signed JSON receipt referenced by the manifest. The badge embeds a fingerprint and verify URL so any human or scraper can confirm authenticity in one click.' },
  { t: 'Issuer impersonation', m: 'L5 counter signatures are made by a stewards DID whose key set is published at openagentprotocol.org/.well-known/oap-stewards-keys. Verifiers MUST resolve stewards keys from this canonical location.' },
];

export default function CertificationPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-[1fr_360px] gap-12 items-start mb-16">
        <div>
          <div className="text-xs font-semibold tracking-[0.18em] text-indigo-300/80 mb-3 uppercase">Certification</div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Verifiable conformance, at machine speed.</h1>
          <p className="text-white/65 leading-relaxed text-lg max-w-2xl">
            OAP defines two trust tiers. <strong className="text-white">OAP Verified</strong> is a self
            issued, cryptographically signed Conformance Receipt that any Agent can verify in
            milliseconds. <strong className="text-white">OAP Certified</strong> elevates the highest
            Conformance Level (L5) with a stewards witnessed run anchored in a public Transparency
            Log. Both tiers are open, free, and produce machine readable evidence rather than paper.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <OapSeal size={320} className="drop-shadow-[0_0_60px_rgba(99,102,241,0.25)]" />
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mb-4 tracking-tight">Two Trust Tiers</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {tiers.map((t) => (
          <div key={t.code} className="rounded-xl border border-white/8 bg-white/[0.02] p-6">
            <div className="flex items-baseline justify-between mb-3">
              <div>
                <div className="text-3xl font-bold text-white">{t.name}</div>
                <div className="text-xs uppercase tracking-wider text-indigo-300/80 mt-1">{t.code}</div>
              </div>
            </div>
            <p className="text-sm text-white/65 leading-relaxed mb-4">{t.desc}</p>
            <dl className="text-xs space-y-1.5">
              <div className="flex gap-2">
                <dt className="w-20 text-white/40 uppercase tracking-wider">Issuer</dt>
                <dd className="text-white/80 flex-1">{t.issuer}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-20 text-white/40 uppercase tracking-wider">Validity</dt>
                <dd className="text-white/80 flex-1">{t.validity}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-20 text-white/40 uppercase tracking-wider">Proof</dt>
                <dd className="text-white/80 flex-1">{t.proof}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-white mb-4 tracking-tight">How a Receipt is Issued</h2>
      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-6 mb-12">
        <ol className="space-y-4 text-sm text-white/70 leading-relaxed">
          <li><span className="text-indigo-300 font-semibold mr-2">1.</span><span className="text-white font-semibold">Run the suite.</span> <code className="text-white/85">npm test</code> in the spec repo runs schema, behaviour, level coverage, and Charter tests against your live target.</li>
          <li><span className="text-indigo-300 font-semibold mr-2">2.</span><span className="text-white font-semibold">Canonicalise.</span> The runner serialises results in deterministic JSON, pins the test suite commit hash, and records target_uri, engine_version, and timestamps.</li>
          <li><span className="text-indigo-300 font-semibold mr-2">3.</span><span className="text-white font-semibold">Chain.</span> The receipt embeds previous_receipt_hash, linking it to your prior receipt in a tamper evident chain.</li>
          <li><span className="text-indigo-300 font-semibold mr-2">4.</span><span className="text-white font-semibold">Sign.</span> <code className="text-white/85">npm run attest</code> produces an Ed25519 signature using the key bound to your implementation DID.</li>
          <li><span className="text-indigo-300 font-semibold mr-2">5.</span><span className="text-white font-semibold">Publish.</span> Host the JSON at <code className="text-white/85">manifest.conformance.receipt_uri</code>. Mirror is automatic via the public registry.</li>
          <li><span className="text-indigo-300 font-semibold mr-2">6.</span><span className="text-white font-semibold">L5 only.</span> The Stewards re execute the suite in a witnessed run, counter signs, and anchors the inclusion proof in the public Transparency Log.</li>
        </ol>
      </div>

      <h2 className="text-xl font-bold text-white mb-4 tracking-tight">How an Agent Verifies</h2>
      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-6 mb-12">
        <pre className="text-xs text-white/80 leading-relaxed overflow-x-auto"><code>{`import { verifyConformance } from 'oap-conformance-verifier';

const result = await verifyConformance({
  manifestUrl: 'https://tool.example.com/.well-known/oap-tool.json',
  reExecuteSample: 0.2,            // Re run 20% of behaviour tests live
  requireTier: 'verified',         // Or 'certified' for L5 only
  maxAgeDays: 90,                  // Reject stale receipts
});

if (!result.valid) throw new Error(result.reason);
// result.tier         -> 'verified' | 'certified'
// result.level        -> 'L1' | ... | 'L5'
// result.fingerprint  -> short hash for UI display
// result.transparency -> Merkle inclusion proof URL (L5 only)`}</code></pre>
      </div>

      <h2 className="text-xl font-bold text-white mb-4 tracking-tight">Tamper Resistance</h2>
      <div className="space-y-3 mb-12">
        {threats.map((row) => (
          <div key={row.t} className="grid md:grid-cols-[260px_1fr] gap-6 p-5 rounded-xl border border-white/8 bg-white/[0.02]">
            <div className="text-sm font-semibold text-white">{row.t}</div>
            <div className="text-sm text-white/65 leading-relaxed">{row.m}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-white mb-4 tracking-tight">The Visual Seal</h2>
      <div className="grid md:grid-cols-[1fr_280px] gap-8 items-center rounded-xl border border-white/8 bg-white/[0.02] p-6 mb-12">
        <div className="text-sm text-white/65 leading-relaxed space-y-3">
          <p>
            The seal is a vector mark in deep indigo with a guilloche style ray pattern, three orbital
            nodes representing the protocol\u2019s three core obligations (Identity, Accountability,
            Interoperability), and an inscribed dual ring carrying the cryptographic provenance text.
            The level pill is interchangeable between L1 and L5.
          </p>
          <p>
            The fingerprint at the base of the seal is the first six bytes of the receipt hash, paired
            with the first six bytes of the signature. It allows a human to spot mismatches in seconds
            without running the verifier. The seal is intentionally untrusted on its own. Trust always
            originates from the signed receipt. The visual exists for human readability and brand
            recognition only.
          </p>
          <div className="flex gap-3 pt-2">
            <a href="/oap-seal.svg" download className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/15 bg-white/5 text-sm text-white hover:bg-white/10 transition-colors">Download SVG</a>
            <a href="/oap-mark.svg" download className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/15 bg-white/5 text-sm text-white hover:bg-white/10 transition-colors">Download Mark</a>
          </div>
        </div>
        <div className="flex justify-center">
          <OapSeal size={240} level="L3 · VERIFIED" fingerprint="FP · 9C81F2 · 0AB47D" />
        </div>
      </div>

      <div className="rounded-xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/8 to-purple-500/5 p-6">
        <div className="text-sm font-semibold text-white mb-2">Why this design instead of a classic auditor</div>
        <p className="text-sm text-white/70 leading-relaxed">
          A traditional ISO style certificate works on quarterly timescales, charges five figures per
          audit, and produces a PDF that no Agent can parse. OAP operates at machine speed across
          millions of implementations. The certification model therefore mirrors the protocol itself:
          machine readable, cryptographically verifiable, openly governed, and free to anyone willing
          to run the test suite. Stewards witnessing exists for the highest tier so that critical
          implementations carry independent corroboration, but the system never depends on a single
          authority to function.
        </p>
      </div>
    </div>
  );
}
