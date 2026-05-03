export const metadata = { title: 'License' };

export default function LicensePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-xs font-semibold tracking-[0.18em] text-indigo-300/80 mb-3 uppercase">License</div>
      <h1 className="text-4xl font-bold tracking-tight mb-6">License</h1>
      <div className="text-[15px] text-white/70 leading-relaxed space-y-4">
        <p>The OAP project distributes content under two complementary licenses.</p>
        <div className="p-5 rounded-xl border border-white/8 bg-white/[0.02]">
          <div className="font-semibold text-white mb-1">Specification text</div>
          <div className="text-sm text-white/60 mb-2">All <code className="font-mono text-xs">.md</code> documents in the <code className="font-mono text-xs">oap-spec</code> repository, including OAP-CORE-1.0 and all RFCs.</div>
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="text-indigo-300 underline underline-offset-4 text-sm">CC BY 4.0 →</a>
        </div>
        <div className="p-5 rounded-xl border border-white/8 bg-white/[0.02]">
          <div className="font-semibold text-white mb-1">Reference code</div>
          <div className="text-sm text-white/60 mb-2">All SDKs, the reference server, the Conformance Test Suite, and example workflows.</div>
          <a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noopener noreferrer" className="text-indigo-300 underline underline-offset-4 text-sm">Apache 2.0 →</a>
        </div>
        <p className="text-sm">
          Contributions are accepted under the same licenses through a Developer Certificate of Origin
          sign off on each commit. No copyright assignment is required.
        </p>
      </div>
    </div>
  );
}
