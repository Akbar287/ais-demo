import type { BadgeProps } from "@/types/ui";

export function Badge({ tone = "gray", children, dot, className = "", ...props }: BadgeProps) {
  return <span className={`badge ${tone} ${className}`.trim()} {...props}>{dot && <span className="dot" style={{ background: "currentColor" }} />}{children}</span>;
}
