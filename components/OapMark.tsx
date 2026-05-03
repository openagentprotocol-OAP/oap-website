type Props = {
  size?: number;
  className?: string;
};

export function OapMark({ size = 32, className = '' }: Props) {
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
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="55%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <radialGradient id="oapMarkCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C7D2FE" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="128" cy="128" r="80" fill="url(#oapMarkCore)" opacity="0.45" />
      <circle cx="128" cy="128" r="92" fill="none" stroke="url(#oapMarkStroke)" strokeWidth="14" strokeLinecap="round" />
      <circle cx="128" cy="128" r="58" fill="none" stroke="url(#oapMarkStroke)" strokeWidth="3" strokeDasharray="2 6" opacity="0.75" />
      <g fill="url(#oapMarkStroke)">
        <circle cx="128" cy="36" r="9" />
        <circle cx="207.7" cy="174" r="9" />
        <circle cx="48.3" cy="174" r="9" />
      </g>
      <g stroke="url(#oapMarkStroke)" strokeWidth="1.25" opacity="0.55">
        <line x1="128" y1="36" x2="207.7" y2="174" />
        <line x1="207.7" y1="174" x2="48.3" y2="174" />
        <line x1="48.3" y1="174" x2="128" y2="36" />
      </g>
      <circle cx="128" cy="128" r="8" fill="#FFFFFF" />
    </svg>
  );
}
