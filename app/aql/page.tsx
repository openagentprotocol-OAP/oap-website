import Link from 'next/link';
import AqlPlayground from '../../components/AqlPlayground';

export const metadata = {
  title: 'AQL: Agent Query Language',
  description: 'The Agent Query Language is the canonical query surface of the Open Agent Protocol. Try it in the browser playground.',
};

export default function AqlPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="text-xs font-semibold tracking-[0.18em] text-indigo-300/80 mb-3 uppercase">RFC 0020</div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Agent Query Language</h1>
        <p className="text-white/60 leading-relaxed max-w-3xl">
          The canonical query surface of the Open Agent Protocol. Agents express what they
          want as a signed Intent with constraints, a projection, a budget, and a quality
          floor. Resolvers evaluate the Intent against their indexed Manifests and return
          ranked candidates with per candidate Decision Records.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-12">
        <FactCard title="One language" body="Discovery, commerce, knowledge, action, delegation, and subscription all use the same Intent shape." />
        <FactCard title="Closed operator set" body="15 operators. Predicates a Resolver cannot evaluate are not expressible." />
        <FactCard title="Verifiable result" body="Every candidate carries a Decision Record. Match Brokers add Inclusion Proofs." />
      </div>

      <Section title="Try it">
        <p className="mb-6 text-white/60">
          The playground runs the reference evaluator and projection in your browser. No
          server roundtrip and no policy stack. The Decision Record signature shown in the
          output is a placeholder string and is not a verifiable Ed25519 value. For the full
          reference implementation with real signing, see <a href="https://github.com/openagentprotocol-OAP/oap-spec/tree/main/reference/aql" className="underline underline-offset-4 text-indigo-300" target="_blank" rel="noreferrer">reference/aql</a> in the spec repository.
        </p>
        <AqlPlayground />
      </Section>

      <Section title="Intent shape">
        <p>
          An Intent is a JSON document conforming to <a href="https://github.com/openagentprotocol-OAP/oap-spec/blob/main/schemas/v1.0/oap-intent.schema.json" className="underline underline-offset-4 text-indigo-300" target="_blank" rel="noreferrer">oap-intent.schema.json</a>. The required and optional blocks are listed below. The full normative description lives in <Link href="/rfcs/0020" className="underline underline-offset-4 text-indigo-300">RFC 0020</Link>.
        </p>
        <h3 className="mt-6 mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-white/55">Required</h3>
        <ul className="grid sm:grid-cols-2 gap-2">
          {requiredIntentFields.map((f) => (
            <li key={f.name} className="p-4 rounded-lg border border-white/8 bg-white/[0.02]">
              <div className="font-mono text-[13px] text-indigo-300 mb-1">{f.name}</div>
              <div className="text-sm text-white/60">{f.desc}</div>
            </li>
          ))}
        </ul>
        <h3 className="mt-6 mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-white/55">Optional, with defaults</h3>
        <ul className="grid sm:grid-cols-2 gap-2">
          {optionalIntentFields.map((f) => (
            <li key={f.name} className="p-4 rounded-lg border border-white/8 bg-white/[0.02]">
              <div className="font-mono text-[13px] text-indigo-300 mb-1">{f.name}</div>
              <div className="text-sm text-white/60">{f.desc}</div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Operator set">
        <p className="mb-4">
          The closed operator set defined by RFC 0020 section 3.2. Operators outside this
          set are introduced through additive minor versions of the RFC.
        </p>
        <div className="grid sm:grid-cols-3 gap-2">
          {operators.map((o) => (
            <div key={o.op} className="p-3 rounded-lg border border-white/8 bg-white/[0.02]">
              <div className="font-mono text-[13px] text-indigo-300 mb-0.5">{o.op}</div>
              <div className="text-xs text-white/55">{o.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Categories">
        <p className="mb-4">
          Six normative Intent categories. Additional categories are introduced through
          additive minor versions of the RFC.
        </p>
        <ul className="space-y-2">
          {categories.map((c) => (
            <li key={c.cat} className="p-4 rounded-lg border border-white/8 bg-white/[0.02]">
              <div className="font-mono text-[13px] text-indigo-300 mb-1">{c.cat}</div>
              <div className="text-sm text-white/65">{c.desc}</div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Reference implementation">
        <p>
          The reference implementation is <strong>open source under Apache 2.0</strong> and
          published in the spec repository at <a href="https://github.com/openagentprotocol-OAP/oap-spec/tree/main/reference/aql" className="underline underline-offset-4 text-indigo-300" target="_blank" rel="noreferrer">reference/aql</a>. It includes a parser, an evaluator, a projection engine, a resolution helper, a CLI tool, and a unit test suite covering the full operator set. Implementers MAY vendor or fork the package without restriction.
        </p>
        <pre className="mt-4 p-4 rounded-lg border border-white/10 bg-ink-800 font-mono text-[12.5px] text-white/85 overflow-x-auto"><code>{`# Install and run
git clone https://github.com/openagentprotocol-OAP/oap-spec
cd oap-spec/reference/aql && npm install
node bin/oap-aql.js validate ../../examples/aql/discovery-intent.json
node bin/oap-aql.js resolve  ../../examples/aql/discovery-intent.json \\
                              ../../examples/aql/candidates.json`}</code></pre>
      </Section>

      <Section title="See also">
        <ul className="space-y-2">
          <li><Link href="/rfcs/0020" className="text-indigo-300 underline underline-offset-4">RFC 0020 Agent Query Language</Link>, normative specification.</li>
          <li><Link href="/rfcs/0021" className="text-indigo-300 underline underline-offset-4">RFC 0021 Verifiable Indexes</Link>, Match Broker conformance and Inclusion Proofs.</li>
          <li><Link href="/rfcs/0022" className="text-indigo-300 underline underline-offset-4">RFC 0022 Manifest Subscription Protocol</Link>, push delivery for AQL subscription Intents.</li>
          <li><Link href="/rfcs/0023" className="text-indigo-300 underline underline-offset-4">RFC 0023 Agent Native Storage Substrate</Link>, the data layer queried through AQL.</li>
          <li><Link href="/papers/databases-for-the-agent-economy" className="text-indigo-300 underline underline-offset-4">Databases for the Agent Economy</Link>, the database surface AQL targets.</li>
          <li><Link href="/papers/from-storefront-to-manifest" className="text-indigo-300 underline underline-offset-4">From Storefront to Manifest</Link>, what the commercial web becomes when buyers are agents.</li>
        </ul>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h2>
      <div className="text-[15px] text-white/65 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function FactCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="p-5 rounded-xl border border-white/8 bg-white/[0.02]">
      <div className="text-sm font-semibold text-white mb-1.5">{title}</div>
      <div className="text-[13px] text-white/60 leading-relaxed">{body}</div>
    </div>
  );
}

const requiredIntentFields = [
  { name: 'intent_id', desc: 'URN minted by the issuer.' },
  { name: 'issuer_did', desc: 'Decentralized identifier of the signing Principal.' },
  { name: 'category', desc: 'commercial, knowledge, action, delegation, discovery, subscription.' },
  { name: 'constraints', desc: 'Constraint tree built from leaves and the boolean combinators all_of, any_of, not.' },
  { name: 'projection', desc: 'Include and exclude pointer sets that bound what data crosses the boundary.' },
  { name: 'validity', desc: 'Window during which the Intent is open for response.' },
  { name: 'signature', desc: 'EdDSA, ES256, or ES384 signature over the canonicalized body.' },
];

const optionalIntentFields = [
  { name: 'budget', desc: 'Cost ceiling, currency, and allocation policy across candidates. Omit for non commercial Intents.' },
  { name: 'quality_floor', desc: 'Minimum acceptable performance, conformance, latency, reputation. Omit when any Resolver is acceptable.' },
  { name: 'resolution_policy', desc: 'single_best, ranked_set, or full_set. Defaults to ranked_set when omitted.' },
];

const operators = [
  { op: 'eq',       desc: 'equals' },
  { op: 'ne',       desc: 'not equals' },
  { op: 'lt',       desc: 'less than' },
  { op: 'lte',      desc: 'less than or equal' },
  { op: 'gt',       desc: 'greater than' },
  { op: 'gte',      desc: 'greater than or equal' },
  { op: 'in',       desc: 'value in array' },
  { op: 'not_in',   desc: 'value not in array' },
  { op: 'contains', desc: 'string or array contains' },
  { op: 'matches',  desc: 'regex match' },
  { op: 'before',   desc: 'date before' },
  { op: 'after',    desc: 'date after' },
  { op: 'within',   desc: 'date within {from,to}' },
  { op: 'outside',  desc: 'date outside {from,to}' },
  { op: 'exists',   desc: 'path resolves to a value' },
];

const categories = [
  { cat: 'commercial',   desc: 'Procurement Intent of RFC 0013, generalized with the AQL constraint, projection, budget, and quality semantics.' },
  { cat: 'knowledge',    desc: 'Request for Knowledge Nodes that satisfy the constraints, with metering and Citation Attribution.' },
  { cat: 'action',       desc: 'Invocation of an Action class on any conformant Provider, gated by the four layer Policy Stack.' },
  { cat: 'delegation',   desc: 'Delegation of a sub task under the cost attribution model of RFC 0004.' },
  { cat: 'discovery',    desc: 'Enumeration of Providers whose Manifests satisfy the constraints.' },
  { cat: 'subscription', desc: 'Subscription to a feed of Manifest changes that satisfy the constraints, with backpressure.' },
];
