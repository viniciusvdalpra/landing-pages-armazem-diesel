export function NozzleSVG({ color = 'rgba(245,245,245,0.85)', size = 180 }) {
  return (
    <svg className="nozzle-svg" width={size} height={size * 1.3} viewBox="0 0 100 130" fill="none" aria-hidden>
      <rect x="38" y="6" width="24" height="10" rx="2" fill={color} opacity="0.85" />
      <rect x="36" y="16" width="28" height="4" fill={color} opacity="0.6" />
      <rect x="34" y="22" width="32" height="38" rx="3" fill={color} opacity="0.9" />
      <rect x="64" y="28" width="14" height="14" rx="2" fill={color} opacity="0.55" />
      <rect x="78" y="32" width="6" height="6" fill={color} opacity="0.45" />
      <rect x="42" y="60" width="16" height="6" fill={color} opacity="0.75" />
      <rect x="40" y="66" width="20" height="4" fill={color} opacity="0.6" />
      <rect x="44" y="70" width="12" height="42" rx="1.5" fill={color} opacity="0.95" />
      <rect x="45" y="80" width="10" height="1" fill={color} opacity="0.3" />
      <rect x="45" y="86" width="10" height="1" fill={color} opacity="0.3" />
      <rect x="45" y="92" width="10" height="1" fill={color} opacity="0.3" />
      <path d="M46 112 L50 122 L54 112 Z" fill={color} opacity="0.8" />
    </svg>
  );
}

export function TrustIcon({ kind }) {
  const common = { width: 28, height: 28, fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (kind === 'shield') return (
    <svg className="icon" viewBox="0 0 24 24" {...common}>
      <path d="M12 2l8 3v7c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
  if (kind === 'box') return (
    <svg className="icon" viewBox="0 0 24 24" {...common}>
      <path d="M21 8l-9-5-9 5 9 5 9-5z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </svg>
  );
  if (kind === 'gear') return (
    <svg className="icon" viewBox="0 0 24 24" {...common}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </svg>
  );
  if (kind === 'factory') return (
    <svg className="icon" viewBox="0 0 24 24" {...common}>
      <path d="M3 21V11l5 3V11l5 3V11l5 3V6h2v15H3z" />
      <path d="M7 17h2M12 17h2M17 17h2" />
    </svg>
  );
  if (kind === 'star') return (
    <svg className="icon" viewBox="0 0 24 24" fill="currentColor" stroke="none" width="28" height="28">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
  return null;
}

export function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.3 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.2.2 2.1 3.2 5.1 4.5 3 1.2 3 .8 3.5.8.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 4.9L2 22l5.2-1.3c1.4.8 3 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3-.4-4.3-1.1l-.3-.2-3.2.8.9-3.1-.2-.3C4.3 15 4 13.5 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z" />
    </svg>
  );
}

export function Star({ filled = true, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 2l3.1 6.3 7 1-5 4.9 1.2 6.8L12 17.8 5.7 21l1.2-6.8-5-4.9 7-1z" />
    </svg>
  );
}
