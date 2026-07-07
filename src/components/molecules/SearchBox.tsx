import { Icon } from "../atoms/Icon";
import type { SearchBoxProps } from "@/types/ui";

export function SearchBox({ placeholder = "Cari menu, data...", className = "tb-search", style }: SearchBoxProps) {
  return (
    <div className={className} style={style}>
      <Icon name="search" size={17} />
      <input placeholder={placeholder} />
    </div>
  );
}
