import { Avatar, BrandLogo, Icon } from "../atoms";
import type { SidebarProps } from "@/types/ui";

export function Sidebar({ navSections, activeView, meta, persona, switcherOpen, onNavigate, onToggleRoleSwitcher }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <BrandLogo size={42} />
        <div className="sb-brand-text"><b>SIAKAD ITI</b><span>Institut Teknologi Indonesia</span></div>
      </div>

      <div className="sb-role-wrap">
        <div className="sb-role" style={{ background: meta.bg }}>
          <div className="sb-role-icon" style={{ color: meta.color }}>
            <Icon name={meta.ic} size={16} />
          </div>
          <div className="sb-role-text" style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: meta.color, opacity: .75 }}>Masuk sebagai</div>
            <div style={{ fontWeight: 800, fontSize: 12.5, color: meta.color, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{meta.label}</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1 }}>
        {navSections.map((sec, i) => (
          <div className="sb-section" key={i}>
            {sec.group && <div className="sb-label">{sec.group}</div>}
            {sec.items.map((it) => (
              <button key={it.id} className={"sb-item" + (activeView === it.id ? " active" : "")} onClick={() => onNavigate(it.id)} title={it.label}>
                <Icon name={it.ic} size={19} className="sb-ic" />
                <span>{it.label}</span>
                {it.badge && <span className="sb-badge" style={{ background: meta.color }}>{it.badge}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="sb-foot" style={{ position: "relative" }}>
        <div className="sb-user" onClick={onToggleRoleSwitcher}>
          <Avatar name={persona.nama} background={persona.avaBg} color={persona.ava} />
          <div className="sb-user-text">
            <b>{persona.nama.split(" ").slice(0, 2).join(" ")}</b>
            <span>{persona.idLabel} {persona.id}</span>
          </div>
          <Icon name="chevR" size={16} style={{ marginLeft: "auto", color: "var(--ink-3)", transform: switcherOpen ? "rotate(90deg)" : "none", transition: "transform .18s" }} />
        </div>
      </div>
    </aside>
  );
}
