export const metadata = {
  title: 'OAP Registry',
  description:
    'The OAP Registry is an append-only Git repository that anchors Conformance Receipts and revocations. It replaces the centralized certification authority of conventional standards with a transparency log every developer can audit.',
};

export default function RegistryPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <div className="text-xs font-semibold tracking-[0.18em] text-indigo-300/80 mb-3 uppercase">Registry</div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">A transparency log, not a certification authority.</h1>
        <p className="text-white/60 leading-relaxed">
          The OAP Registry is the public, append-only Git repository that anchors every Conformance Receipt produced under RFC 0019. It lives at <a className="underline underline-offset-4 text-indigo-300" href="https://github.com/openagentprotocol-OAP/oap-registry">openagentprotocol-OAP/oap-registry</a>. Its history is the canonical transparency log. Anyone may operate a mirror.
        </p>
      </div>

      <h2 className="text-xl font-bold text-white mb-3 tracking-tight">What the Registry stores</h2>
      <ul className="list-disc pl-5 space-y-2 text-white/65 text-[15px] leading-relaxed mb-10">
        <li><code className="font-mono text-xs">implementations/&lt;slug&gt;.json</code>: one file per implementation, listing its DID, Manifest URI, claimed Conformance Level, Receipt URI, Receipt SHA-256, and validity window.</li>
        <li><code className="font-mono text-xs">revocations/&lt;slug&gt;-&lt;hash&gt;.json</code>: one file per revocation event, signed by the implementation\'s DID or by three peer witnesses (forced revocation).</li>
        <li><code className="font-mono text-xs">peer-witnesses/&lt;witness-slug&gt;.json</code>: optional self-attested entries used to discover potential peer witnesses for L4 and L5 candidates.</li>
      </ul>

      <h2 className="text-xl font-bold text-white mb-3 tracking-tight">CI gate (RFC 0026 section 6)</h2>
      <p className="text-white/65 text-[15px] leading-relaxed mb-3">
        Every Pull Request to the Registry runs the following checks. The PR is merge-able only if every check passes:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-white/65 text-[15px] leading-relaxed mb-10">
        <li><strong>Schema.</strong> All listings validate against the Registry schema (Ajv 2020).</li>
        <li><strong>DID resolution.</strong> The listing\'s <code className="font-mono text-xs">tool_did</code> resolves to a valid DID Document.</li>
        <li><strong>Manifest reachability.</strong> The Manifest URI returns 200 within 10 seconds and the Manifest\'s <code className="font-mono text-xs">tool_did</code> matches the listing.</li>
        <li><strong>Receipt fetch and hash.</strong> The Receipt URI returns 200, body SHA-256 matches the listing.</li>
        <li><strong>Receipt signature.</strong> The Receipt signature verifies against the public key in the DID Document.</li>
        <li><strong>Receipt validity.</strong> Current time is before <code className="font-mono text-xs">expires_at</code>; validity window is at most 90 days.</li>
        <li><strong>Peer witnesses (L4+).</strong> At least one (L4) or three (L5) signatures by listed peer-witness DIDs that themselves hold valid L4+ Receipts.</li>
        <li><strong>Sybil filter.</strong> The DID domain is at least 30 days old (whois). Newer implementations may be added with a <code className="font-mono text-xs">provisional: true</code> flag.</li>
        <li><strong>Append-only.</strong> The PR does not modify or delete previously merged files except the implementation\'s own current listing.</li>
      </ul>

      <h2 className="text-xl font-bold text-white mb-3 tracking-tight">How to submit</h2>
      <ol className="list-decimal pl-5 space-y-2 text-white/65 text-[15px] leading-relaxed mb-10">
        <li>Generate a signed Conformance Receipt: see <a className="underline underline-offset-4 text-indigo-300" href="/certification">Certification</a>.</li>
        <li>Publish the Receipt at a stable URL on your own domain.</li>
        <li>Fork <a className="underline underline-offset-4 text-indigo-300" href="https://github.com/openagentprotocol-OAP/oap-registry">openagentprotocol-OAP/oap-registry</a>.</li>
        <li>Add <code className="font-mono text-xs">implementations/&lt;your-slug&gt;.json</code>. The schema is in <code className="font-mono text-xs">schemas/implementation.schema.json</code>.</li>
        <li>Open a Pull Request. CI runs every check above. A Maintainer reviews and merges if everything passes.</li>
        <li>Re-submit a new Receipt before <code className="font-mono text-xs">expires_at</code> to remain listed.</li>
      </ol>

      <h2 className="text-xl font-bold text-white mb-3 tracking-tight">Why a Git repository</h2>
      <p className="text-white/65 text-[15px] leading-relaxed mb-3">
        A centralized server would meet the discovery, verification, and revocation goals but would reintroduce the central authority that the OAP community has explicitly rejected. A blockchain would meet all four (including sybil resistance) but would force every participant to operate or trust a chain. A Git repository under a public organization, with branch protection, CI-enforced validation, and standard mirroring, meets all four with tooling every developer already uses, and yields a transparency log that any verifier can re-validate from any clone in seconds.
      </p>
      <p className="text-white/55 text-sm">
        References: <a className="underline underline-offset-4 text-indigo-300" href="/rfcs/RFC-0026-registry-protocol">RFC 0026</a>, <a className="underline underline-offset-4 text-indigo-300" href="/rfcs/RFC-0019-conformance-testing-and-implementability">RFC 0019</a>, <a className="underline underline-offset-4 text-indigo-300" href="/conformance">Conformance Levels</a>, <a className="underline underline-offset-4 text-indigo-300" href="/certification">Certification</a>.
      </p>
    </div>
  );
}
