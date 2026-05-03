type Props = {
  size?: number;
  level?: string;
  fingerprint?: string;
  className?: string;
};

export function OapSeal({
  size = 320,
  level = 'L5 · CERTIFIED',
  fingerprint = 'FP · 3F2A91 · 4C7B0E',
  className = '',
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`OAP Verified · ${level}`}
    >
      <defs>
        <linearGradient id="sealStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A5B4FC" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="sealRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E1B4B" />
          <stop offset="100%" stopColor="#0A0A0B" />
        </linearGradient>
        <radialGradient id="sealCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#312E81" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0A0A0B" stopOpacity="0" />
        </radialGradient>
        <path id="sealTopArc" d="M 70 256 A 186 186 0 0 1 442 256" fill="none" />
        <path id="sealBottomArc" d="M 70 256 A 186 186 0 0 0 442 256" fill="none" />
      </defs>

      <circle cx="256" cy="256" r="248" fill="url(#sealRing)" />
      <circle cx="256" cy="256" r="248" fill="none" stroke="url(#sealStroke)" strokeWidth="2" opacity="0.55" />
      <circle cx="256" cy="256" r="232" fill="none" stroke="url(#sealStroke)" strokeWidth="0.75" opacity="0.4" />

      <g stroke="url(#sealStroke)" strokeWidth="0.5" opacity="0.28" fill="none">
        <circle cx="256" cy="256" r="220" />
        <circle cx="256" cy="256" r="214" />
        <circle cx="256" cy="256" r="208" />
        <circle cx="256" cy="256" r="202" />
      </g>

      <g fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" fontWeight="600" fontSize="14" letterSpacing="6" fill="#E0E7FF">
        <text>
          <textPath href="#sealTopArc" startOffset="50%" textAnchor="middle">
            OPEN AGENT PROTOCOL · VERIFIED
          </textPath>
        </text>
        <text fontSize="11" letterSpacing="5" fill="#A5B4FC">
          <textPath href="#sealBottomArc" startOffset="50%" textAnchor="middle">
            CONFORMANCE RECEIPT · ED25519 · DID BOUND
          </textPath>
        </text>
      </g>

      <g transform="translate(256 256)">
        <g stroke="url(#sealStroke)" strokeWidth="0.6" opacity="0.45">
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1="-188"
              x2="0"
              y2="-148"
              transform={`rotate(${i * 15})`}
            />
          ))}
        </g>
      </g>

      <circle cx="256" cy="256" r="148" fill="url(#sealCore)" />
      <circle cx="256" cy="256" r="148" fill="none" stroke="url(#sealStroke)" strokeWidth="1.25" opacity="0.7" />

      <g transform="translate(256 256)">
        <circle r="92" fill="none" stroke="url(#sealStroke)" strokeWidth="9" strokeLinecap="round" />
        <circle r="58" fill="none" stroke="url(#sealStroke)" strokeWidth="2" strokeDasharray="2 6" opacity="0.7" />
        <g fill="url(#sealStroke)">
          <circle cx="0" cy="-92" r="6.5" />
          <circle cx="79.7" cy="46" r="6.5" />
          <circle cx="-79.7" cy="46" r="6.5" />
        </g>
        <g stroke="url(#sealStroke)" strokeWidth="0.9" opacity="0.5">
          <line x1="0" y1="-92" x2="79.7" y2="46" />
          <line x1="79.7" y1="46" x2="-79.7" y2="46" />
          <line x1="-79.7" y1="46" x2="0" y2="-92" />
        </g>
        <circle r="7" fill="#FFFFFF" />
      </g>

      <g transform="translate(256 372)" textAnchor="middle">
        <rect x="-66" y="-14" width="132" height="28" rx="6" fill="#0A0A0B" stroke="url(#sealStroke)" strokeWidth="1" />
        <text y="6" fontFamily="ui-sans-serif, system-ui, -apple-system, Inter, sans-serif" fontWeight="800" fontSize="13" letterSpacing="3" fill="#FFFFFF">
          {level}
        </text>
      </g>

      <g transform="translate(256 412)" textAnchor="middle" fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">
        <text fontSize="10" letterSpacing="2" fill="#A5B4FC">{fingerprint}</text>
      </g>
    </svg>
  );
}
