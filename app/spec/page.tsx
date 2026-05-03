import { getCoreSpec } from '@/lib/rfcs';
import { Markdown } from '@/components/Markdown';
import Link from 'next/link';

export const metadata = { title: 'OAP-CORE-1.0 Specification' };

export default async function SpecPage() {
  const md = await getCoreSpec();
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <div className="text-xs font-semibold tracking-[0.18em] text-indigo-300/80 mb-3 uppercase">Specification</div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">OAP-CORE-1.0</h1>
        <p className="text-white/60 leading-relaxed">
          The normative core specification of the Open Agent Protocol. Defines the seven planes,
          six core conformance levels (L0 through L5), plus domain specific profiles for the Agent Native Web
          (W1 through W3) and Commerce (C1 through C3). Covers the manifest format, the invocation
          envelope, the receipt schema, and the full set of normative JSON Schemas.
        </p>
        <div className="flex gap-3 mt-5">
          <a
            href="https://github.com/openagentprotocol-OAP/oap-spec/blob/main/spec/v1.0/OAP-CORE-1.0.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-indigo-300 hover:text-indigo-200 underline underline-offset-4"
          >
            Source on GitHub →
          </a>
          <Link href="/rfcs" className="text-sm text-white/55 hover:text-white">Active RFCs →</Link>
        </div>
      </div>
      {md ? (
        <Markdown source={md} />
      ) : (
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-6 text-amber-100/80 text-sm">
          The core specification text has not been synced to this build. Run <code className="font-mono">npm run sync-rfcs</code> from the website root to import OAP-CORE-1.0 from the sibling oap-spec repository.
        </div>
      )}
    </div>
  );
}
