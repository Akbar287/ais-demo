import type { CardProps } from "@/types/ui";

export function Card({ children, className = "", padded = false, style, ...props }: CardProps) {
  const classes = ["card", padded ? "card-pad" : "", className].filter(Boolean).join(" ");
  return (
    <div className={classes} style={style} {...props}>
      {children}
    </div>
  );
}
