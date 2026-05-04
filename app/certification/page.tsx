export const metadata = {
  title: 'Certification',
  description:
    'OAP has no certification authority. Implementations self-attest by running the open-source test suite, sign their Conformance Receipt with their own DID key, and (for L4 and L5) collect peer-witness signatures anchored in the OAP Registry.',
};

const tiers = [
  {
    code: 'L1 to L3',
    name: 'Self-attested',
    issuer: 'Implementation itself',
    proof: 'Signed Conformance Receipt produced by the open-source test suite',
    desc: 'Run the suite. Sign the Receipt with your DID key. Publish the Receipt at a stable URL. Reference it from your Manifest. Anyone can re-verify by running the same suite against your deployment and checking the signature against your published DID Document. Optional but recommended: anchor the Receipt in the OAP Registry.',
  },
  {
    code: 'L4',
    name: 'Peer-witnessed',
    issuer: 'Implementation + at least 1 independent L4+ peer',
    proof: 'Implementation signature plus at least one peer-witness signature, anchored in the OAP Registry (RFC 0026)',
    desc: 'After self-attestation, send your Receipt to any other implementation that itself currently holds a valid L4 or L5 Receipt. The peer witness re-runs the suite against your live deployment and counter-signs the Receipt. Submit the resulting multi-signed Receipt to the OAP Registry as a Pull Request. The Registry CI gate verifies every signature mechanically.',
  },
  {
    code: 'L5',
    name: 'Peer-Certified',
    issuer: 'Implementation + at least 3 independent L4+ peers + third-party security audit',
    proof: 'Implementation signature plus three independent peer-witness signatures, plus a machine-readable third-party security audit attestation (SOC 2 Type II, ISO 27001, or equivalent), anchored in the OAP Registry',
    desc: 'L5 is the highest level OAP defines. It requires (a) every L4 requirement, (b) three independent peer-witness signatures whose witnesses themselves currently hold valid L4 or L5 Receipts and do not share a controlling organization, and (c) a third-party security audit. There is no central body that issues L5; it is a mechanical claim that any verifier can check against the Registry transparency log.',
  },
];

const threats = [
  { t: 'Forged Receipt', m: 'Receipts are signed with the implementation\'s DID key. Verifiers resolve the public key from the DID Document and check the Ed25519 signature mechanically. The OAP Registry CI gate enforces this on every Pull Request: the signature-verify job fetches the listed Receipt, recomputes the canonical bytes, fetches the listing\'s did:web Document, and rejects the listing unless at least one signature verifies against a published verificationMethod.' },
  { t: 'Placeholder signatures', m: 'RFC 0019 section 7.3 forbids any signature value matching PLACEHOLDER_NOT_FOR_PRODUCTION, unsigned-reference, or placeholder:* prefixes. The reference verifier rejects them. The Registry CI gate rejects them. attest.js will not emit them: it requires --signing-key.' },
  { t: 'Expired Receipt replay', m: 'Every Receipt declares not_after. Verifiers reject Receipts past expiry. Maximum validity is 90 days. The Registry tracks expiry and surfaces stale listings.' },
  { t: 'Sybil-attacker peer-witness farm', m: 'Peer witnesses must themselves hold valid L4+ Receipts. The Registry CI peer-witnesses job iterates every witness in the candidate Receipt, looks the witness DID up in the live Registry, and falls back to fetching the witness\' own Receipt to confirm it currently claims L4 or L5 within an unexpired validity window. The OAP Registry also applies a 30-day domain-age sybil filter (whois) before merging any new listing.' },
  { t: 'Non-independent L5 witnesses', m: 'L5 listings additionally require at least three peer witnesses with three distinct DIDs AND three distinct controller domains (the controller domain is derived from did:web hostnames). The Registry CI peer-witnesses job rejects any L5 candidate whose witnesses share a controller. The same independence check runs as the peer-witness-independence behavior probe in the conformance suite.' },
  { t: 'Missing L5 external audit', m: 'L5 listings must reference a current external_audit attestation in their Receipt. The Registry CI l5-external-audit job rejects any L5 candidate whose Receipt is missing the external_audit block, has an audit framework outside SOC2-Type-II, ISO-27001, ISO-42001, or equivalent, lacks an auditor_did, or whose attestation has expired.' },
  { t: 'Captured Maintainer roster', m: 'The Registry is append-only. Historic Receipts cannot be retroactively forged. Mirroring is encouraged; the canonical state is reconstructible from any mirror. A community fork remains viable in the event of a hostile takeover.' },
  { t: 'Compromised signing key', m: 'Implementations publish a revocation entry in the OAP Registry signed by their DID Document\'s recovery key, or by three peer witnesses (forced revocation). Receipts signed after the suspected compromise time are flagged. Revocation evaluator is in active development; current state of the gate is documented in the registry repository.' },
];

export default function CertificationPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <div className="text-xs font-semibold tracking-[0.18em] text-indigo-300/80 mb-3 uppercase">Certification</div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">There is no certification authority.</h1>
        <p className="text-white/60 leading-relaxed">
          OAP does not have a certification body. There is no fee. There is no application process. Conformance is a mechanical property: an implementation runs the open-source test suite, signs the resulting Receipt, and (for L4 and L5) collects peer-witness signatures from other already-conformant implementations. Every step is reproducible by every verifier, against the same code that produced the original Receipt.
        </p>
      </div>

      <div className="space-y-3 mb-12">
        {tiers.map((t) => (
          <div key={t.code} className="p-5 rounded-xl border border-white/8 bg-white/[0.02]">
            <div className="flex items-baseline gap-3 mb-2">
              <div className="text-sm font-mono text-indigo-300">{t.code}</div>
              <div className="text-base font-semibold text-white">{t.name}</div>
            </div>
            <div className="text-xs text-white/50 mb-1"><span className="text-white/70">Issuer:</span> {t.issuer}</div>
            <div className="text-xs text-white/50 mb-3"><span className="text-white/70">Proof:</span> {t.proof}</div>
            <div className="text-sm text-white/60 leading-relaxed">{t.desc}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-white mb-3 tracking-tight">How to certify your implementation</h2>
      <ol className="list-decimal pl-5 space-y-2 text-white/65 text-[15px] leading-relaxed mb-10">
        <li><strong>Run the suite.</strong> <code className="font-mono text-xs">node test-suite/runner.js</code> against your deployment until the level you want passes.</li>
        <li><strong>Generate an Ed25519 key</strong> if you do not already have one: <code className="font-mono text-xs">openssl genpkey -algorithm ED25519 -out signing-key.pem</code>. Publish the public key in your <code className="font-mono text-xs">/.well-known/did.json</code>.</li>
        <li><strong>Sign the Receipt.</strong> <code className="font-mono text-xs">node test-suite/attest.js --target https://you --did did:web:you --name "You" --version 1.0.0 --signing-key signing-key.pem --out conformance-receipt.json</code>. For Non-Commercial Profiles add <code className="font-mono text-xs">--profile non-commercial --revenue-source byok</code>.</li>
        <li><strong>Publish the Receipt</strong> at a stable URL on your domain. Add <code className="font-mono text-xs">conformance.receipt_uri</code> to your Manifest pointing at it.</li>
        <li><strong>(L4 and L5 only.)</strong> Identify peer witnesses among current L4+ implementations listed in the OAP Registry. Send each your Receipt and ask them to run <code className="font-mono text-xs">attest.js --peer-witness --in your-receipt.json --did their:did --signing-key their.pem --witness-receipt-uri https://them/...</code>. Concatenate the returned witnesses into your Receipt.</li>
        <li><strong>Submit to the Registry.</strong> Open a Pull Request against <a className="underline underline-offset-4 text-indigo-300" href="https://github.com/openagentprotocol-OAP/oap-registry">openagentprotocol-OAP/oap-registry</a> adding <code className="font-mono text-xs">implementations/&lt;slug&gt;.json</code> per the schema. The CI gate will validate every check from RFC 0026 section 6. If everything passes, a Maintainer merges the PR. The merge commit is your anchor.</li>
        <li><strong>Renew every 90 days.</strong> Re-run the suite, re-attest, re-collect witnesses, update the Registry entry. The Registry rejects expired Receipts.</li>
      </ol>

      <h2 className="text-xl font-bold text-white mb-3 tracking-tight">Threat model</h2>
      <ul className="space-y-3 text-[15px] text-white/65 leading-relaxed mb-10">
        {threats.map((t) => (
          <li key={t.t}><strong className="text-white">{t.t}.</strong> {t.m}</li>
        ))}
      </ul>

      <p className="text-white/55 text-sm">
        References: <a className="underline underline-offset-4 text-indigo-300" href="/rfcs/0019">RFC 0019</a>, <a className="underline underline-offset-4 text-indigo-300" href="/rfcs/0025">RFC 0025</a>, <a className="underline underline-offset-4 text-indigo-300" href="/rfcs/0026">RFC 0026</a>, <a className="underline underline-offset-4 text-indigo-300" href="/conformance">Conformance Levels</a>, <a className="underline underline-offset-4 text-indigo-300" href="/registry">OAP Registry</a>.
      </p>
    </div>
  );
}
