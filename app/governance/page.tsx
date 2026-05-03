export const metadata = { title: 'Governance' };

export default function GovernancePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="text-xs font-semibold tracking-[0.18em] text-indigo-300/80 mb-3 uppercase">Governance</div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Open process. No single owner.</h1>
        <p className="text-white/60 leading-relaxed">
          The Open Agent Protocol is stewarded by the OAP Foundation and developed in the open through
          numbered Working Groups. The protocol does not belong to any company, lab, or government. The
          governance model below is designed to keep it that way.
        </p>
      </div>

      <Section title="Working Groups">
        <p>
          Each Working Group owns a coherent area of the specification. Membership is open: anyone who
          has contributed at least one substantive review or pull request to that area becomes an
          implicit member. Decisions are taken by rough consensus, recorded in public meeting notes.
        </p>
        <ul className="mt-4 grid sm:grid-cols-2 gap-2">
          {workingGroups.map((wg) => (
            <li key={wg.code} className="p-4 rounded-lg border border-white/8 bg-white/[0.02]">
              <div className="text-[11px] font-mono text-indigo-300 mb-1">{wg.code}</div>
              <div className="text-sm font-semibold text-white">{wg.name}</div>
              <div className="text-xs text-white/50 mt-1">{wg.scope}</div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Steering Committee">
        <p>
          The Steering Committee resolves cross Working Group disputes, ratifies new Working Groups,
          and signs off on numbered specification releases. The Committee operates by simple majority,
          publishes minutes within seven days, and rotates one third of its seats annually.
        </p>
        <p>
          Initial seats are reserved for the founding contributors and rotate to elected
          representatives of the implementer community as the ecosystem grows.
        </p>
      </Section>

      <Section title="RFC Process">
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>Draft.</strong> Anyone may open a PR against <code className="font-mono text-xs">oap-spec/rfcs/</code> using the published template.</li>
          <li><strong>Review.</strong> Public comment period of at least fourteen days. Working Group chair facilitates.</li>
          <li><strong>Last Call.</strong> Working Group declares intent to ratify. Final two week objection window.</li>
          <li><strong>Ratified.</strong> Merged into a numbered release. Implementations have at least 90 days before conformance is checked against new requirements.</li>
        </ol>
      </Section>

      <Section title="Decision making principles">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Rough consensus.</strong> Loud minorities are heard but not granted veto. Working Group chairs adjudicate.</li>
          <li><strong>Running code.</strong> A working implementation outweighs a clever argument. Every RFC must reference at least one prototype.</li>
          <li><strong>Vendor neutrality.</strong> No feature is added to advantage one implementer. Conflicts of interest must be declared.</li>
          <li><strong>Transparent accounting.</strong> Foundation finances, sponsors, and trademark decisions are published quarterly.</li>
        </ul>
      </Section>

      <Section title="Code of conduct">
        <p>
          The Foundation adopts the Contributor Covenant 2.1 across all repositories, working groups,
          and community channels. Reports go to <a href="mailto:conduct@openagentprotocol.org" className="underline underline-offset-4 text-indigo-300">conduct@openagentprotocol.org</a> and are handled by a rotating
          three person panel that excludes the reported party's Working Group.
        </p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h2>
      <div className="text-[15px] text-white/65 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

const workingGroups = [
  { code: 'WG-CORE',  name: 'Core Protocol',           scope: 'Identity, Discovery, Invocation, Receipts.' },
  { code: 'WG-CCC',   name: 'Confidentiality and Compliance', scope: 'Personas, Projections, GDPR.' },
  { code: 'WG-MARK',  name: 'Marketplace and Discovery', scope: 'Workflows, ranking, search.' },
  { code: 'WG-TRUST', name: 'Trust and Reputation',    scope: 'Performance Records, dispute resolution.' },
  { code: 'WG-COMM',  name: 'Commercial',              scope: 'Pricing, billing, agreements.' },
  { code: 'WG-TEST',  name: 'Conformance and Testing', scope: 'Test suite, certification programme.' },
];
