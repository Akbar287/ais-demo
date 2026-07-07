import { Icon } from "./Icon";
import type { IconButtonProps } from "@/types/ui";

export function IconButton({ icon, size = 19, className = "tb-icon-btn", children, ...props }: IconButtonProps) {
  return (
    <button className={className} {...props}>
      <Icon name={icon} size={size} />
      {children}
    </button>
  );
}
