import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({
  children,
  ...props
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </IconBase>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 4 4" />
    </IconBase>
  );
}

export function BookmarkIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6.5 4.5h11v15l-5.5-3-5.5 3z" />
    </IconBase>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2" />
    </IconBase>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 11v5M12 8h.01" />
    </IconBase>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 4v11M8 8l4-4 4 4M5 12v7h14v-7" />
    </IconBase>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4.5" y="6" width="15" height="13" rx="1.5" />
      <path d="M8 4v4M16 4v4M4.5 10h15" />
    </IconBase>
  );
}

export function TagIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4.5 11V5.5H10L19 14.5 14.5 19z" />
      <circle cx="8" cy="8.5" r=".75" />
    </IconBase>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.5 19c.8-3.2 3-5 6.5-5s5.7 1.8 6.5 5z" />
    </IconBase>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 16h12l-1.5-2.5V10a4.5 4.5 0 0 0-9 0v3.5zM10 19h4" />
    </IconBase>
  );
}

export function SlidersIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 7h5M13 7h7M4 12h10M18 12h2M4 17h2M10 17h10" />
      <circle cx="11" cy="7" r="2" />
      <circle cx="16" cy="12" r="2" />
      <circle cx="8" cy="17" r="2" />
    </IconBase>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="m8.5 12 2.25 2.25L15.75 9" />
    </IconBase>
  );
}

export function MoreIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="6" cy="12" r=".75" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r=".75" fill="currentColor" stroke="none" />
      <circle cx="18" cy="12" r=".75" fill="currentColor" stroke="none" />
    </IconBase>
  );
}
