# OAP Website

The official website and developer portal for the Open Agent Protocol.

Production URL: `https://openagentprotocol.org`
Repository: `github.com/openagentprotocol-OAP/oap-website`

## Stack

- Next.js 15 (App Router, React Server Components)
- Tailwind CSS 3
- Markdown rendering with `react-markdown`, `remark-gfm`, `rehype-highlight`
- Statically generated; deployable on Cloudflare Pages, Vercel, Netlify, or any Node host

## Local development

```bash
npm install
npm run sync-rfcs   # imports RFCs and OAP-CORE-1.0 from sibling oap-spec repo
npm run dev
```

The site expects the `oap-spec` repository to be checked out as a sibling directory:

```
parent/
├── oap-spec/        # https://github.com/openagentprotocol-OAP/oap-spec
└── oap-website/     # this repo
```

## RFC sync

`scripts/sync-rfcs.mjs` copies all `RFC-*.md` files from `oap-spec/rfcs/` and the
core spec from `oap-spec/spec/v1.0/OAP-CORE-1.0.md` into `content/`. The synced files
are gitignored so the website always reflects the canonical source of truth.

In CI the same script can fetch from `raw.githubusercontent.com` instead of a
sibling checkout. See `.github/workflows/sync-and-deploy.yml`.

## Build

```bash
npm run build
npm run start
```

The output is fully static at the page level and works on any Node host.

---

## Domain registration with full anonymity

OAP is intentionally not attributable to a single founder. Follow these steps so the
domain, hosting, and billing trail cannot be traced back to any individual.

### 1. Register the domain through a privacy first registrar

Recommended:
- **Njalla** (`njal.la`) — registered in your name but Njalla is the legal owner of record. Pays in crypto. No personal data on file beyond an email.
- **Porkbun** with WHOIS Privacy enabled by default. Less anonymous than Njalla but cheaper and reputable.

Domain candidates (in order of preference):
- `openagentprotocol.org` (primary, signals open standard)
- `openagentprotocol.dev`
- `oap.foundation`

### 2. Foundation email

Set up a catch all forwarding inbox at the registered domain via:
- **ProtonMail** custom domain
- **Fastmail** custom domain
- **Migadu** (cheapest for many aliases)

Required addresses:
- `foundation@openagentprotocol.org`
- `security@openagentprotocol.org`
- `conduct@openagentprotocol.org`
- `trademark@openagentprotocol.org`
- `announce@openagentprotocol.org`

### 3. GitHub organization

`openagentprotocol-OAP` already exists. Configure:
- Org name: "OAP Foundation"
- Org email: `foundation@openagentprotocol.org`
- Org website: `https://openagentprotocol.org`
- All commits authored as `openagentprotocol <oap@openagentprotocol.org>`. Set this globally in any clone:
  ```bash
  git config user.name "openagentprotocol"
  git config user.email "oap@openagentprotocol.org"
  ```
- Disable GitHub Pages contributor avatars on org pages.

### 4. Hosting

Recommended: **Cloudflare Pages** (free tier, anonymous billing accepted, fast global CDN).

Alternative: **Vercel** under a Foundation account paid via virtual prepaid card.

Setup steps for Cloudflare Pages:
1. Create a Cloudflare account using the Foundation email.
2. Connect the `openagentprotocol-OAP/oap-website` GitHub repo.
3. Build command: `npm run sync-rfcs && npm run build`.
4. Build output: `.next` (Next.js).
5. Add the custom domain.
6. Disable Cloudflare Web Analytics or replace with self hosted Plausible. Do not enable Google Analytics.

### 5. DNS

Use Cloudflare DNS (or Njalla's anonymous DNS). Records:
- `@` → Pages deployment
- `www` → Pages deployment
- `MX` → email host
- TXT for SPF, DKIM, DMARC

### 6. Voice and brand discipline

Across all OAP repositories and pages:
- Use "the OAP Foundation", "the Working Group", "the Steering Committee" as agents.
- Never use "I", "we built", "founded by", first person plural attached to a real human.
- Refer to AssistNet as "a reference implementation", never as "the home of OAP".
- Author all RFCs as `OAP Foundation, Working Group on X`.

### 7. Sponsorship and funding (optional, later)

When the project needs funds for testing infrastructure, conference attendance, or
legal trademark fees, route donations through:
- **Open Collective** (under a Foundation host such as the Open Collective Foundation),
- or a neutral umbrella such as the **Linux Foundation** project hosting programme,
- or the **OpenSSF**.

All three publish public ledgers, which reinforces the neutrality narrative.

---

## Adding pages

Pages live in `app/`. Each route is a folder with `page.tsx`. To add an article:

1. Create `app/<slug>/page.tsx` exporting a default React component.
2. Add a metadata export with `title`.
3. Add the link to `components/Header.tsx` or `components/Footer.tsx`.

To add an RFC, add the file to the `oap-spec/rfcs/` directory in the spec repo
and re run `npm run sync-rfcs`. The RFC index and viewer pick it up automatically.

## License

Site source: Apache 2.0.
Rendered specification text: CC BY 4.0.
