export const metadata = { title: 'Community' };

export default function CommunityPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="text-xs font-semibold tracking-[0.18em] text-indigo-300/80 mb-3 uppercase">Community</div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Build the agent web with us.</h1>
        <p className="text-white/60 leading-relaxed">
          OAP is a living standard. Discussion happens in public, decisions are recorded in public,
          and contributions of any size are welcome.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <Card
          icon="💬"
          title="Matrix"
          desc="Real time discussion. Working Group rooms, an open lobby, no gatekeeping."
          link="https://matrix.to/#/#openagentprotocol:matrix.org"
          cta="Join the space"
        />
        <Card
          icon="✉️"
          title="Mailing list"
          desc="Long form proposals, announcements, and meeting notes. Low traffic."
          link="mailto:announce-subscribe@openagentprotocol.org"
          cta="Subscribe"
        />
        <Card
          icon="🐙"
          title="GitHub"
          desc="Specs, schemas, RFCs, SDKs. Fork the repos, open a PR, file an issue."
          link="https://github.com/openagentprotocol-OAP"
          cta="Browse repositories"
        />
        <Card
          icon="📅"
          title="Working Group calls"
          desc="Each WG meets fortnightly. Public agendas, public minutes, no recording."
          link="https://github.com/openagentprotocol-OAP/oap-spec/blob/main/MEETINGS.md"
          cta="See schedule"
        />
      </div>

      <div className="mt-10 p-6 rounded-xl border border-white/8 bg-white/[0.02]">
        <div className="text-sm font-semibold text-white mb-2">Reporting a security issue</div>
        <p className="text-sm text-white/60 leading-relaxed mb-3">
          Please do not file public issues for security vulnerabilities. Email
          <a href="mailto:security@openagentprotocol.org" className="underline underline-offset-4 text-indigo-300 mx-1">security@openagentprotocol.org</a>
          with details. PGP key fingerprint is published in <code className="font-mono text-xs">oap-spec/SECURITY.md</code>. Acknowledgement within 72 hours.
        </p>
      </div>
    </div>
  );
}

function Card({ icon, title, desc, link, cta }: { icon: string; title: string; desc: string; link: string; cta: string }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 rounded-xl border border-white/8 bg-white/[0.02] hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all"
    >
      <div className="text-2xl mb-3">{icon}</div>
      <div className="text-base font-semibold text-white mb-1.5">{title}</div>
      <div className="text-sm text-white/55 leading-relaxed mb-4">{desc}</div>
      <div className="text-sm text-indigo-300">{cta} →</div>
    </a>
  );
}
