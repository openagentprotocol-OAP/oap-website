'use client';

// Browser port of the AQL evaluator + projection. Mirrors
// reference/aql/src/{evaluator,projection}.js without the ajv schema check,
// which is intentional: this playground is a learning surface, not a
// conformance gate. The full reference implementation lives at
// https://github.com/openagentprotocol-OAP/oap-spec/tree/main/reference/aql

import { useMemo, useState } from 'react';

const SAMPLE_INTENT = `{
  "intent_id": "urn:oap:intent:demo-discovery-1",
  "issuer_did": "did:web:agent.example",
  "category": "discovery",
  "constraints": {
    "all_of": [
      { "path": "/category", "operator": "eq", "value": "running_shoes" },
      { "path": "/inventory/available", "operator": "gt", "value": 0 },
      { "path": "/price/amount", "operator": "lte", "value": "100.00" }
    ]
  },
  "projection": {
    "include": ["/manifest_id", "/seller_did", "/price", "/inventory"],
    "exclude": ["/internal_metadata"]
  },
  "validity": { "from": "2026-05-03T00:00:00Z", "to": "2026-08-03T00:00:00Z" },
  "resolution_policy": "ranked_set",
  "signature": { "alg": "EdDSA", "value": "demo-signature" }
}`;

const SAMPLE_CANDIDATES = `[
  {
    "id": "shop-a:sku-001",
    "score": 0.92,
    "record": {
      "manifest_id": "manifest:shop-a:sku-001",
      "seller_did": "did:web:shop-a.example",
      "category": "running_shoes",
      "price": { "amount": "79.99", "currency": "EUR" },
      "inventory": { "available": 14 },
      "internal_metadata": { "warehouse_zone": "DE-3" }
    }
  },
  {
    "id": "shop-b:sku-077",
    "score": 0.88,
    "record": {
      "manifest_id": "manifest:shop-b:sku-077",
      "seller_did": "did:web:shop-b.example",
      "category": "running_shoes",
      "price": { "amount": "94.50", "currency": "EUR" },
      "inventory": { "available": 3 }
    }
  },
  {
    "id": "shop-c:sku-200",
    "score": 0.71,
    "record": {
      "manifest_id": "manifest:shop-c:sku-200",
      "seller_did": "did:web:shop-c.example",
      "category": "running_shoes",
      "price": { "amount": "120.00", "currency": "EUR" },
      "inventory": { "available": 30 }
    }
  },
  {
    "id": "shop-d:sku-101",
    "score": 0.65,
    "record": {
      "manifest_id": "manifest:shop-d:sku-101",
      "seller_did": "did:web:shop-d.example",
      "category": "hiking_boots",
      "price": { "amount": "55.00", "currency": "EUR" },
      "inventory": { "available": 8 }
    }
  }
]`;

// ---------- Evaluator ----------
function resolvePath(doc: any, pointer: string): any[] {
  if (pointer === '' || pointer === '/') return [doc];
  const segments = pointer.replace(/^\//, '').split('/');
  return walk([doc], segments);
}
function walk(nodes: any[], segments: string[]): any[] {
  if (segments.length === 0) return nodes;
  const [head, ...rest] = segments;
  const next: any[] = [];
  for (const node of nodes) {
    if (head === '*') {
      if (Array.isArray(node)) next.push(...node);
      else if (node && typeof node === 'object') next.push(...Object.values(node));
    } else if (head === '**') {
      collectAll(node, next);
    } else if (Array.isArray(node)) {
      const idx = Number(head);
      if (Number.isInteger(idx) && idx >= 0 && idx < node.length) next.push(node[idx]);
    } else if (node && typeof node === 'object' && head in node) {
      next.push(node[head]);
    }
  }
  return walk(next, rest);
}
function collectAll(node: any, sink: any[]) {
  if (node === null || node === undefined) return;
  sink.push(node);
  if (Array.isArray(node)) for (const v of node) collectAll(v, sink);
  else if (typeof node === 'object') for (const v of Object.values(node)) collectAll(v, sink);
}
function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a && b && typeof a === 'object') {
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    const ka = Object.keys(a), kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    return ka.every((k) => deepEqual(a[k], b[k]));
  }
  return false;
}
function compareLeaf(values: any[], operator: string, expected: any) {
  const sample = values[0];
  const decide = (cond: boolean, fail: string) => ({
    passed: cond, reason: cond ? null : fail, candidate_value: sample,
  });
  if (operator === 'exists') {
    const passed = expected ? values.length > 0 : values.length === 0;
    return { passed, reason: passed ? null : `expected exists=${expected}, got ${values.length} values`, candidate_value: sample };
  }
  if (values.length === 0) return { passed: false, reason: 'path resolved to no values', candidate_value: undefined };
  switch (operator) {
    case 'eq': return decide(values.some((v) => deepEqual(v, expected)), 'no value equals expected');
    case 'ne': return decide(values.every((v) => !deepEqual(v, expected)), 'a value equaled expected');
    case 'lt': case 'lte': case 'gt': case 'gte': {
      const e = Number(expected);
      const cmp = { lt: (a:number,b:number)=>a<b, lte:(a:number,b:number)=>a<=b, gt:(a:number,b:number)=>a>b, gte:(a:number,b:number)=>a>=b }[operator]!;
      for (const v of values) { const n = Number(v); if (Number.isFinite(n) && cmp(n, e)) return { passed: true, reason: null, candidate_value: v }; }
      return { passed: false, reason: `no value satisfied ${operator} ${expected}`, candidate_value: sample };
    }
    case 'in': return decide(Array.isArray(expected) && values.some((v) => expected.some((e: any) => deepEqual(v, e))), 'no value in set');
    case 'not_in': return decide(Array.isArray(expected) && values.every((v) => !expected.some((e: any) => deepEqual(v, e))), 'a value in excluded set');
    case 'contains': return decide(values.some((v) => (typeof v === 'string' && typeof expected === 'string' && v.includes(expected)) || (Array.isArray(v) && v.some((el) => deepEqual(el, expected)))), 'no value contained expected');
    case 'matches': {
      try { const re = new RegExp(expected); return decide(values.some((v) => typeof v === 'string' && re.test(v)), 'no value matched regex'); }
      catch (err: any) { return { passed: false, reason: `invalid regex: ${err.message}`, candidate_value: sample }; }
    }
    case 'before': case 'after': {
      const e = Date.parse(expected);
      const cmp = operator === 'before' ? (a:number,b:number)=>a<b : (a:number,b:number)=>a>b;
      for (const v of values) { const t = Date.parse(v); if (Number.isFinite(t) && cmp(t, e)) return { passed: true, reason: null, candidate_value: v }; }
      return { passed: false, reason: `no value ${operator} ${expected}`, candidate_value: sample };
    }
    case 'within': case 'outside': {
      if (!expected || typeof expected !== 'object' || !('from' in expected) || !('to' in expected)) return { passed: false, reason: `${operator} requires {from,to}`, candidate_value: sample };
      const from = Date.parse(expected.from); const to = Date.parse(expected.to);
      const inWin = (v: any) => { const t = Date.parse(v); return Number.isFinite(t) && t >= from && t <= to; };
      return operator === 'within'
        ? decide(values.some(inWin), 'no value within window')
        : decide(values.every((v) => !inWin(v)), 'a value was within window');
    }
    default: return { passed: false, reason: `unknown operator ${operator}`, candidate_value: sample };
  }
}
function evalNode(node: any, candidate: any, evaluations: any[]): boolean {
  if ('all_of' in node) return node.all_of.every((c: any) => evalNode(c, candidate, evaluations) || (false));
  if ('any_of' in node) {
    let passed = false;
    for (const c of node.any_of) if (evalNode(c, candidate, evaluations)) passed = true;
    return passed;
  }
  if ('not' in node) {
    const sub: any[] = [];
    const inner = evalNode(node.not, candidate, sub);
    evaluations.push(...sub.map((e) => ({ ...e, negated: true })));
    return !inner;
  }
  const values = resolvePath(candidate, node.path);
  const r = compareLeaf(values, node.operator, node.value);
  evaluations.push({ path: node.path, operator: node.operator, value: node.value, candidate_value: r.candidate_value, passed: r.passed, reason: r.reason || undefined });
  return r.passed;
}

// fix all_of short-circuit so all evaluations are collected
function evalAll(node: any, candidate: any, evaluations: any[]): boolean {
  if ('all_of' in node) {
    let allPassed = true;
    for (const c of node.all_of) if (!evalAll(c, candidate, evaluations)) allPassed = false;
    return allPassed;
  }
  if ('any_of' in node) {
    let any = false;
    for (const c of node.any_of) if (evalAll(c, candidate, evaluations)) any = true;
    return any;
  }
  if ('not' in node) {
    const sub: any[] = [];
    const inner = evalAll(node.not, candidate, sub);
    evaluations.push(...sub.map((e) => ({ ...e, negated: true })));
    return !inner;
  }
  const values = resolvePath(candidate, node.path);
  const r = compareLeaf(values, node.operator, node.value);
  evaluations.push({ path: node.path, operator: node.operator, value: node.value, candidate_value: r.candidate_value, passed: r.passed, reason: r.reason || undefined });
  return r.passed;
}

// ---------- Projection ----------
function deepClone<T>(v: T): T { if (v === null || typeof v !== 'object') return v; return JSON.parse(JSON.stringify(v)); }
function matchesPointer(path: string, pattern: string): boolean {
  const ps = path.replace(/^\//, '').split('/');
  const qs = pattern.replace(/^\//, '').split('/');
  return matchSeg(ps, qs);
}
function matchSeg(ps: string[], qs: string[]): boolean {
  if (qs.length === 0) return ps.length === 0;
  const [q, ...qrest] = qs;
  if (q === '**') {
    if (qrest.length === 0) return true;
    for (let i = 0; i <= ps.length; i++) if (matchSeg(ps.slice(i), qrest)) return true;
    return false;
  }
  if (ps.length === 0) return false;
  const [p, ...prest] = ps;
  if (q === '*' || q === p) return matchSeg(prest, qrest);
  return false;
}
function collectFragments(node: any, pointer: string): { path: string; value: any }[] {
  if (pointer === '' || pointer === '/') return [{ path: '/', value: node }];
  const segments = pointer.replace(/^\//, '').split('/');
  const out: { path: string; value: any }[] = [];
  function rec(n: any, segs: string[], acc: string[]) {
    if (segs.length === 0) { out.push({ path: '/' + acc.join('/'), value: deepClone(n) }); return; }
    const [head, ...rest] = segs;
    if (n === null || n === undefined) return;
    if (head === '*') {
      if (Array.isArray(n)) n.forEach((v, i) => rec(v, rest, [...acc, String(i)]));
      else if (typeof n === 'object') for (const [k, v] of Object.entries(n)) rec(v, rest, [...acc, k]);
      return;
    }
    if (head === '**') {
      if (rest.length === 0) { out.push({ path: '/' + acc.join('/'), value: deepClone(n) }); return; }
      if (Array.isArray(n)) n.forEach((v, i) => rec(v, segs, [...acc, String(i)]));
      else if (typeof n === 'object') for (const [k, v] of Object.entries(n)) rec(v, segs, [...acc, k]);
      rec(n, rest, acc);
      return;
    }
    if (Array.isArray(n)) { const idx = Number(head); if (Number.isInteger(idx) && idx >= 0 && idx < n.length) rec(n[idx], rest, [...acc, head]); }
    else if (typeof n === 'object' && head in n) rec(n[head], rest, [...acc, head]);
  }
  rec(node, segments, []);
  return out;
}
function assign(target: any, path: string, value: any) {
  if (path === '/') {
    if (value && typeof value === 'object' && !Array.isArray(value)) Object.assign(target, deepClone(value));
    return;
  }
  const segments = path.replace(/^\//, '').split('/');
  let cur = target;
  for (let i = 0; i < segments.length - 1; i++) {
    const seg = segments[i];
    if (!(seg in cur)) cur[seg] = /^\d+$/.test(segments[i + 1]) ? [] : {};
    cur = cur[seg];
  }
  cur[segments[segments.length - 1]] = deepClone(value);
}
function project(record: any, projection: any) {
  const include = projection.include || ['/'];
  const exclude = projection.exclude || [];
  const result: any = {};
  for (const ptr of include) {
    for (const { path, value } of collectFragments(record, ptr)) {
      if (path === '/') {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          for (const [k, v] of Object.entries(value)) {
            const childPath = `/${k}`;
            if (exclude.some((e: string) => matchesPointer(childPath, e))) continue;
            assign(result, childPath, v);
          }
        }
        continue;
      }
      if (exclude.some((e: string) => matchesPointer(path, e))) continue;
      assign(result, path, value);
    }
  }
  return result;
}

// ---------- Resolve ----------
function resolveIntent(intent: any, candidates: any[]) {
  const accepted: any[] = [];
  const rejected: any[] = [];
  for (const c of candidates) {
    const evaluations: any[] = [];
    const passed = evalAll(intent.constraints, c.record, evaluations);
    const decision = {
      decision_id: `urn:oap:decision:demo-${c.id}`,
      evaluated_at: new Date().toISOString(),
      outcome: passed ? 'accept' : 'reject',
      constraint_evaluations: evaluations,
      explanation: passed ? 'all constraints satisfied' : 'one or more constraints failed',
    };
    if (passed) {
      accepted.push({
        candidate_id: c.id, rank: 0, score: c.score ?? 0,
        payload: project(c.record, intent.projection),
        decision_record: decision,
      });
    } else {
      rejected.push({ candidate_id: c.id, decision_record: decision });
    }
  }
  accepted.sort((a, b) => (b.score || 0) - (a.score || 0));
  if (intent.resolution_policy === 'single_best') accepted.splice(1);
  accepted.forEach((c, i) => { c.rank = i + 1; });
  return {
    response_id: `urn:oap:intent-response:demo-${Date.now()}`,
    intent_id: intent.intent_id,
    resolver_did: 'did:web:playground.openagentprotocol.org',
    resolver_role: 'match_broker',
    evaluated_at: new Date().toISOString(),
    candidates: accepted,
    rejected,
    signature: { alg: 'EdDSA', value: 'playground-unsigned' },
  };
}

// ---------- Component ----------
export default function AqlPlayground() {
  const [intentText, setIntentText] = useState(SAMPLE_INTENT);
  const [candidatesText, setCandidatesText] = useState(SAMPLE_CANDIDATES);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const summary = useMemo(() => {
    if (!result) return null;
    return { accepted: result.candidates.length, rejected: result.rejected.length };
  }, [result]);

  function run() {
    setError(null);
    setResult(null);
    let intent: any, candidates: any;
    try { intent = JSON.parse(intentText); } catch (e: any) { setError(`Intent JSON: ${e.message}`); return; }
    try { candidates = JSON.parse(candidatesText); } catch (e: any) { setError(`Candidates JSON: ${e.message}`); return; }
    if (!Array.isArray(candidates)) { setError('Candidates must be an array.'); return; }
    if (!intent || !intent.constraints || !intent.projection) { setError('Intent must have constraints and projection.'); return; }
    try { setResult(resolveIntent(intent, candidates)); }
    catch (e: any) { setError(`Resolution failed: ${e.message}`); }
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold tracking-wider text-white/50 uppercase mb-2">Intent</label>
          <textarea
            value={intentText}
            onChange={(e) => setIntentText(e.target.value)}
            rows={22}
            spellCheck={false}
            className="w-full p-3 rounded-lg border border-white/10 bg-ink-800 font-mono text-[12.5px] text-white/90 leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-400/50"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-wider text-white/50 uppercase mb-2">Candidates</label>
          <textarea
            value={candidatesText}
            onChange={(e) => setCandidatesText(e.target.value)}
            rows={22}
            spellCheck={false}
            className="w-full p-3 rounded-lg border border-white/10 bg-ink-800 font-mono text-[12.5px] text-white/90 leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-400/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={run}
          className="px-5 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm transition-colors"
        >
          Resolve Intent
        </button>
        {summary && (
          <div className="text-sm text-white/60">
            <span className="text-emerald-300 font-semibold">{summary.accepted} accepted</span>
            <span className="mx-2 text-white/20">|</span>
            <span className="text-rose-300 font-semibold">{summary.rejected} rejected</span>
          </div>
        )}
        {error && <div className="text-sm text-rose-300">{error}</div>}
      </div>

      {result && (
        <div>
          <label className="block text-xs font-semibold tracking-wider text-white/50 uppercase mb-2">Intent Response</label>
          <pre className="p-4 rounded-lg border border-white/10 bg-ink-900 font-mono text-[12px] text-white/85 overflow-x-auto leading-relaxed max-h-[600px]">
{JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
