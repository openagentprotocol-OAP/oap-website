type Props = {
  size?: number;
  className?: string;
};

/**
 * The OAP brand mark. Designed as a miniature of the OAP Verified seal so that
 * the header lockup, favicon, social avatar, and certification badge all read
 * as the same family of marks at a glance.
 */
export function OapMark({ size = 28, className = '' }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Open Agent Protocol"
    >
      <defs>
        <linearGradient id="oapMarkStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A5B4FC" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="oapMarkRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E1B4B" />
          <stop offset="100%" stopColor="#0A0A0B" />
        </linearGradient>
        <radialGradient id="oapMarkCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#312E81" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0A0A0B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="128" cy="128" r="124" fill="url(#oapMarkRing)" />
      <circle cx="128" cy="128" r="124" fill="none" stroke="url(#oapMarkStroke)" strokeWidth="2" opacity="0.75" />
      <circle cx="128" cy="128" r="116" fill="none" stroke="url(#oapMarkStroke)" strokeWidth="0.6" opacity="0.4" />

      <circle cx="128" cy="128" r="74" fill="url(#oapMarkCore)" />

      <circle cx="128" cy="128" r="56" fill="none" stroke="url(#oapMarkStroke)" strokeWidth="7" strokeLinecap="round" />
      <circle cx="128" cy="128" r="34" fill="none" stroke="url(#oapMarkStroke)" strokeWidth="1.5" strokeDasharray="2 5" opacity="0.7" />

      <g fill="url(#oapMarkStroke)">
        <circle cx="128" cy="72" r="6" />
        <circle cx="176.5" cy="156" r="6" />
        <circle cx="79.5" cy="156" r="6" />
      </g>
      <g stroke="url(#oapMarkStroke)" strokeWidth="0.8" opacity="0.5">
        <line x1="128" y1="72" x2="176.5" y2="156" />
        <line x1="176.5" y1="156" x2="79.5" y2="156" />
        <line x1="79.5" y1="156" x2="128" y2="72" />
      </g>

      <circle cx="128" cy="128" r="5" fill="#FFFFFF" />
    </svg>
  );
}
