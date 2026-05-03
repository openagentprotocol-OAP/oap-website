export const metadata = { title: 'Trademark' };

export default function TrademarkPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-xs font-semibold tracking-[0.18em] text-indigo-300/80 mb-3 uppercase">Trademark</div>
      <h1 className="text-4xl font-bold tracking-tight mb-6">Trademark policy</h1>
      <div className="text-[15px] text-white/70 leading-relaxed space-y-4">
        <p>
          The terms <strong>Open Agent Protocol</strong>, <strong>OAP</strong>, the OAP wordmark, and the OAP logo are
          trademarks of the OAP Foundation. The Foundation grants a free, non transferable license to
          use these marks subject to the rules below.
        </p>
        <h2 className="text-xl font-bold text-white mt-6 mb-2 tracking-tight">Permitted use</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Stating that your product implements the Open Agent Protocol.</li>
          <li>Linking to <code className="font-mono text-xs">openagentprotocol.org</code>.</li>
          <li>Reproducing the wordmark in articles, talks, and academic work.</li>
        </ul>
        <h2 className="text-xl font-bold text-white mt-6 mb-2 tracking-tight">Not permitted</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Implying endorsement by, or affiliation with, the OAP Foundation without written consent.</li>
          <li>Using <strong>OAP</strong> as part of a product name (e.g. "OAP Pro", "OAPCloud").</li>
          <li>Modifying the logo or recoloring it outside the official palette.</li>
          <li>Claiming OAP conformance at a level the Conformance Test Suite has not certified.</li>
        </ul>
        <p className="text-sm">
          Questions: <a href="mailto:trademark@openagentprotocol.org" className="text-indigo-300 underline underline-offset-4">trademark@openagentprotocol.org</a>.
        </p>
      </div>
    </div>
  );
}
