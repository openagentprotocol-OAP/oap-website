'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { OapMark } from './OapMark';

const nav = [
  { href: '/spec', label: 'Spec' },
  { href: '/rfcs', label: 'RFCs' },
  { href: '/papers', label: 'Papers' },
  { href: '/conformance', label: 'Conformance' },
  { href: '/certification', label: 'Certification' },
  { href: '/sdks', label: 'SDKs' },
  { href: '/implementations', label: 'Implementations' },
  { href: '/governance', label: 'Governance' },
  { href: '/community', label: 'Community' },
];

export function Header() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-ink-900/70 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <OapMark size={28} className="drop-shadow-[0_0_12px_rgba(99,102,241,0.35)]" />
          <span className="font-semibold text-[15px] tracking-tight">
            Open Agent Protocol
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {nav.map((item) => {
            const active = path === item.href || path.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  active
                    ? 'text-white bg-white/5'
                    : 'text-white/55 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <a
          href="https://github.com/openagentprotocol-OAP/oap-spec"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs text-white/55 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub
        </a>
      </div>
    </header>
  );
}
