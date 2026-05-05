import Link from 'next/link';
import { listRfcs } from '@/lib/rfcs';

export async function Footer() {
  const rfcs = await listRfcs();
  return (
    <footer className="border-t border-white/5 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="text-white/90 font-semibold mb-3">Specification</div>
          <ul className="space-y-1.5 text-white/55">
            <li><Link href="/spec" className="hover:text-white">OAP-CORE-1.0</Link></li>
            <li><Link href="/rfcs" className="hover:text-white">RFCs</Link></li>
            <li><Link href="/conformance" className="hover:text-white">Conformance</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-white/90 font-semibold mb-3">Build</div>
          <ul className="space-y-1.5 text-white/55">
            <li><Link href="/sdks" className="hover:text-white">SDKs</Link></li>
            <li><Link href="/implementations" className="hover:text-white">Implementations</Link></li>
            <li><a href="https://github.com/openagentprotocol-OAP/oap-spec/tree/main/schemas" target="_blank" rel="noopener noreferrer" className="hover:text-white">JSON Schemas</a></li>
          </ul>
        </div>
        <div>
          <div className="text-white/90 font-semibold mb-3">Project</div>
          <ul className="space-y-1.5 text-white/55">
            <li><Link href="/governance" className="hover:text-white">Governance</Link></li>
            <li><Link href="/community" className="hover:text-white">Community</Link></li>
            <li><a href="https://github.com/openagentprotocol-OAP" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub Org</a></li>
          </ul>
        </div>
        <div>
          <div className="text-white/90 font-semibold mb-3">Legal</div>
          <ul className="space-y-1.5 text-white/55">
            <li><Link href="/license" className="hover:text-white">License</Link></li>
            <li><Link href="/trademark" className="hover:text-white">Trademark</Link></li>
            <li><a href="mailto:contact@openagentprotocol.eu" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <div>© Open Agent Protocol contributors. Specification text licensed under CC BY 4.0. Reference code under Apache 2.0.</div>
          <div>v1.0 · <span className="text-white/20">T.F.</span> · {rfcs.length} RFCs in flight</div>
        </div>
      </div>
    </footer>
  );
}
