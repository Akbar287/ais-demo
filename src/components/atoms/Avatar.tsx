import { initials } from "../../lib/format";
import type { AvatarProps } from "@/types/ui";

export function Avatar({ name, background, color, className = "sb-ava", style }: AvatarProps) {
  return (
    <div className={className} style={{ background, color, ...style }}>
      {initials(name)}
    </div>
  );
}
