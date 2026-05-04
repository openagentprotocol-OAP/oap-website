export const metadata = { title: 'Governance' };

export default function GovernancePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="text-xs font-semibold tracking-[0.18em] text-indigo-300/80 mb-3 uppercase">Governance</div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Open process. No legal entity. No single owner.</h1>
        <p className="text-white/60 leading-relaxed">
          The Open Agent Protocol is maintained by an open community of contributors through a public RFC process and CI-enforced quality gates. There is no foundation, association, corporation, or other legal entity that owns, controls, or speaks for OAP. There are no membership dues, no licensing fees, and no central treasury.
        </p>
      </div>

      <Section title="Status of governance">
        <ul className="list-none space-y-2 text-[14px]">
          <li><span className="text-emerald-300">Active</span>{' '}<span className="text-white/70">RFC process (governance/RFC-PROCESS.md)</span></li>
          <li><span className="text-emerald-300">Active</span>{' '}<span className="text-white/70">Working Groups as GitHub Discussion categories (governance/WORKING-GROUPS.md)</span></li>
          <li><span className="text-emerald-300">Active</span>{' '}<span className="text-white/70">Maintainer roster and Peer Review Quorum (governance/MAINTAINERS.md)</span></li>
          <li><span className="text-emerald-300">Active</span>{' '}<span className="text-white/70">Conformance test suite + signed Receipts (RFC 0019)</span></li>
          <li><span className="text-emerald-300">Active</span>{' '}<span className="text-white/70">OAP Registry repository (RFC 0026) at <code className="font-mono text-xs">openagentprotocol-OAP/oap-registry</code></span></li>
          <li><span className="text-amber-300">Bootstrap</span>{' '}<span className="text-white/70">Maintainer roster: 1 (looking for the next 3+)</span></li>
          <li><span className="text-white/40">Not planned</span>{' '}<span className="text-white/40">Foundation, board, association, or any legal entity. OAP will never have one.</span></li>
        </ul>
      </Section>

      <Section title="How decisions are made">
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>Anyone</strong> may open an RFC pull request against <code className="font-mono text-xs">oap-spec/rfcs/</code>.</li>
          <li><strong>Public discussion</strong> for at least 14 days on the PR thread.</li>
          <li><strong>Final Comment Period</strong> of 7 days, opened by a Working Group Coordinator.</li>
          <li><strong>Peer Review Quorum:</strong> at least 3 Maintainer approvals from at least 3 distinct organizations, no unresolved blocking objections.</li>
          <li><strong>Merge.</strong> The PR is merged. CI gates (schema validation, conformance test suite, backward-compatibility check) must all pass.</li>
        </ol>
        <p className="text-white/55 text-sm mt-3">
          Charter-affecting RFCs (anything that touches the User Sovereignty Charter, RFC 0016) require one extra approval from a Maintainer who has self-identified as a User Advocate.
        </p>
      </Section>

      <Section title="Working Groups">
        <p>
          Working Groups are GitHub Discussion categories. Anyone may participate. Each Working Group has a self-nominated Coordinator with a 6-month rotating term. Coordinators triage and facilitate; they have no veto. Decisions belong to the Peer Review Quorum, not to any individual.
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

      <Section title="Conformance is mechanical, not bureaucratic">
        <p>
          Implementations attest their Conformance Level by running the open-source OAP test suite against their own deployment, signing the resulting Conformance Receipt with their DID key, and (for L4 and L5) collecting peer-witness signatures from other already-conformant implementations. The signed Receipt is anchored in the OAP Registry, an append-only Git repository at <code className="font-mono text-xs">openagentprotocol-OAP/oap-registry</code>.
        </p>
        <p>
          There is no certification authority. There is no fee. There is no application process. The Registry's CI gate enforces every check that a centralized authority would otherwise perform: schema validation, signature verification, peer-witness verification, manifest reachability, and a 30-day domain-age sybil filter (RFC 0026).
        </p>
      </Section>

      <Section title="Code of conduct">
        <p>
          The project adopts the Contributor Covenant 2.1 across all repositories and discussion channels. Reports go to <a href="mailto:conduct@openagentprotocol.eu" className="underline underline-offset-4 text-indigo-300">conduct@openagentprotocol.eu</a> and are handled by a rotating panel of three Maintainers that excludes any Maintainer involved in the report.
        </p>
      </Section>

      <Section title="Anti-capture provisions">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>No legal entity may be chartered</strong> to own, license, or control the OAP specification or the <code className="font-mono text-xs">openagentprotocol-OAP</code> GitHub organization.</li>
          <li><strong>The OAP Registry is append-only and mirrored.</strong> Any community member may operate a mirror.</li>
          <li><strong>Conformance Receipts expire after 90 days.</strong> Implementations must re-attest through the public test suite.</li>
          <li><strong>Multiple competing Marketplaces, Wallets, Trust Services, and Verifiers</strong> are presumed and encouraged. No service in the spec grants its operator monopoly status.</li>
          <li><strong>Marketplace ranking algorithms MUST be open source.</strong></li>
        </ul>
      </Section>

      <Section title="Anti-abuse and Sybil resistance">
        <p>
          OAP is built around the assumption that some agents will attempt to manipulate Reputation, Marketplace rankings, Negotiations, or Projections by spawning large numbers of Sub Agents. RFC 0011 defines the protocol-level defense.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Sub-Tree Aggregation.</strong> All agents reachable from one Principal through Delegation Tokens count as a single Actor for rate limits, budgets, and reputation weighting.</li>
          <li><strong>Restricted Actions.</strong> Reputation issuance, marketplace voting, negotiation bids, and governance polls MUST NOT be invoked by Sub Agents. They require direct Principal action or an explicit named Standing Permission.</li>
          <li><strong>Coordinated Behavior Score.</strong> Tools detect and may throttle clusters of invocations from the same Sub Tree that exhibit identical inputs, identical targets, or temporal clustering.</li>
          <li><strong>Sibling Decay.</strong> Performance Records issued by sibling Sub Agents about the same Subject are weighted down geometrically with sibling count.</li>
          <li><strong>Anti-Sybil Proof.</strong> High-risk Actions may require a Verified Principal credential, a refundable Delegation Stake, or a Verifiable Computation proof at spawn time.</li>
        </ul>
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
  { code: 'wg-core',         name: 'Core Protocol',                  scope: 'Architecture, Identity, Manifest, Action, Invocation, Streaming, Versioning.' },
  { code: 'wg-ccc',          name: 'Confidentiality and Compliance', scope: 'CCC, Policy Engine, professional codes, NDA enforcement, Chinese Wall.' },
  { code: 'wg-commerce',     name: 'Wallet, Subscription, Settlement', scope: 'Commerce plane (sections 14 through 17).' },
  { code: 'wg-conformance',  name: 'Conformance and Testing',        scope: 'Conformance Levels, RFC 0019, the test suite.' },
  { code: 'wg-registry',     name: 'Registry',                       scope: 'RFC 0026, the oap-registry repository.' },
  { code: 'wg-adapters',     name: 'Adapters',                       scope: 'MCP, A2A, OpenAI Functions, LangGraph adapters.' },
  { code: 'wg-accessibility',name: 'Accessibility',                  scope: 'WCAG mapping, accessible consent and dispute interfaces.' },
  { code: 'wg-security',     name: 'Security and Privacy',           scope: 'Key rotation, threat modelling, sections 28 and 29.' },
];
