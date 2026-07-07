import { Icon, IconButton } from "../atoms";
import { SearchBox, ThemeToggle } from "../molecules";
import { PeriodSelect } from "../molecules/period";
import type { TopbarProps } from "@/types/ui";

export function Topbar({ crumbGroup, crumbPage, onOpenNav }: TopbarProps) {
  return (
    <header className="topbar">
      <button className="tb-burger" onClick={onOpenNav} aria-label="Buka menu">
        <Icon name="menu" size={22} />
      </button>
      <div className="tb-title"><span className="tb-crumb">{crumbGroup} / </span>{crumbPage}</div>
      <SearchBox />
      <PeriodSelect />
      <ThemeToggle />
      <IconButton icon="bell">
        <span className="tb-dot" />
      </IconButton>
    </header>
  );
}
