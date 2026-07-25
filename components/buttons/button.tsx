import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "text";
type ButtonSize = "small" | "medium";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-text-primary bg-text-primary text-surface hover:border-[#494949] hover:bg-[#494949] active:bg-[#242424]",
  secondary:
    "border-border bg-framing-center text-text-primary hover:bg-[#dadddf] active:bg-[#cdd0d4]",
  outline:
    "border-border bg-surface text-text-primary hover:bg-canvas active:bg-surface-secondary",
  text:
    "border-transparent bg-transparent text-text-primary hover:bg-surface-secondary active:bg-[#ebe4d2]",
};

const sizeStyles: Record<ButtonSize, string> = {
  small: "min-h-9 px-3 py-1.5 text-[11px]",
  medium: "min-h-11 px-4 py-2 text-[13px]",
};

export function Button({
  className,
  size = "small",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "inline-flex items-center justify-center rounded-[var(--radius-small)] border font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:border-border disabled:bg-divider disabled:text-text-muted disabled:opacity-70",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
