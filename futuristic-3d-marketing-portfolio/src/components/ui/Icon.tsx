import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

const paths: Record<string, ReactNode> = {
  terminal: (
    <>
      <path d="M4 17l5-5-5-5" />
      <path d="M12 19h8" />
    </>
  ),
  users: (
    <>
      <path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20" />
      <circle cx="10" cy="8" r="3.2" />
      <path d="M20 20v-1.4a3.4 3.4 0 0 0-2.6-3.3" />
      <path d="M15.4 5.2a3.2 3.2 0 0 1 0 5.6" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V5" />
      <path d="M4 20h16" />
      <path d="M8 17V11" />
      <path d="M12.5 17V7.5" />
      <path d="M17 17v-4" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3l1.9 4.9L19 9.8l-4.1 3.1.8 5.1-3.8-2.6-3.7 2.4.6-5-4-3.2 5-1.8z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
      <path d="M12 3.8V1.6M12 22.4v-2.2M3.8 12H1.6M22.4 12h-2.2" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 11.5v-1a1 1 0 0 1 1-1h3l7-4.2v14L7 15.5H4a1 1 0 0 1-1-1v-3z" />
      <path d="M18 9a3.6 3.6 0 0 1 0 6" />
      <path d="M8 15.8V20a1.4 1.4 0 0 0 2.8 0v-2.6" />
    </>
  ),
  robot: (
    <>
      <rect x="4" y="8" width="16" height="11" rx="3" />
      <path d="M12 4.6V8" />
      <circle cx="12" cy="3.4" r="1.2" />
      <path d="M9 12.6v1.6M15 12.6v1.6" />
      <path d="M1.8 12.4v3M22.2 12.4v3" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.4" />
      <path d="M20.4 20.4l-4.3-4.3" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.4" />
      <path d="M3.6 7.2l7.5 5.4a1.6 1.6 0 0 0 1.8 0l7.5-5.4" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="3" />
      <path d="M7.6 10.6V17M7.6 7.4v.1" />
      <path d="M11.6 17v-3.6a2.2 2.2 0 0 1 4.4 0V17" />
      <path d="M11.6 10.6V17" />
    </>
  ),
  download: (
    <>
      <path d="M12 3.6v10.8" />
      <path d="M7.8 10.6L12 14.8l4.2-4.2" />
      <path d="M4.4 19.6h15.2" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M4 12h15" />
      <path d="M13.6 6.4L19.8 12l-6.2 5.6" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7 17L17 7" />
      <path d="M8.6 7H17v8.4" />
    </>
  ),
  chevronDown: <path d="M6 9.5l6 6 6-6" />,
  chevronRight: <path d="M9.5 6l6 6-6 6" />,
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12M18 6L6 18" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.6-6 6.6-10.4A6.6 6.6 0 0 0 5.4 10.6C5.4 15 12 21 12 21z" />
      <circle cx="12" cy="10.4" r="2.4" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3.4l8.2 4.4L12 12.2 3.8 7.8z" />
      <path d="M3.8 12.4L12 16.8l8.2-4.4" />
      <path d="M3.8 16.6L12 21l8.2-4.4" />
    </>
  ),
  brain: (
    <>
      <path d="M9.6 4.4A2.9 2.9 0 0 0 6.8 7a2.6 2.6 0 0 0-2 4.2A2.7 2.7 0 0 0 6 16a2.8 2.8 0 0 0 3.6 2.6V4.4z" />
      <path d="M14.4 4.4A2.9 2.9 0 0 1 17.2 7a2.6 2.6 0 0 1 2 4.2A2.7 2.7 0 0 1 18 16a2.8 2.8 0 0 1-3.6 2.6V4.4z" />
      <path d="M12 4v16" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 18a8.6 8.6 0 1 1 16 0" />
      <path d="M12 18l4.2-5.4" />
      <circle cx="12" cy="18" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  funnel: (
    <>
      <path d="M3.6 5h16.8l-6.4 7.4V20l-4-2.4v-5.2z" />
    </>
  ),
  hash: (
    <>
      <path d="M9 3.6L7.4 20.4M16.6 3.6L15 20.4M4 8.8h16.4M3.6 15.2H20" />
    </>
  ),
  play: (
    <>
      <path d="M8.4 5.6l10 6.4-10 6.4z" />
    </>
  ),
  check: <path d="M4.8 12.6l4.6 4.4 9.8-10" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M3.8 12h16.4" />
      <path d="M12 3.6c2.4 2.4 3.6 5.2 3.6 8.4S14.4 18 12 20.4C9.6 18 8.4 15.2 8.4 12S9.6 6 12 3.6z" />
    </>
  ),
  cursor: (
    <>
      <path d="M5.4 3.6l13.2 7.6-5.8 1.4 2.6 5.6-2.4 1.1-2.6-5.6-4.4 4z" />
    </>
  ),
  lock: (
    <>
      <rect x="4.6" y="10.4" width="14.8" height="9.6" rx="2.4" />
      <path d="M8.4 10.4V7.8a3.6 3.6 0 0 1 7.2 0v2.6" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 11v5.4" />
      <path d="M12 7.9v.1" />
    </>
  ),
};

export type IconName = keyof typeof paths;

export function Icon({ name, strokeWidth = 1.5, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
