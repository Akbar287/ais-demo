import { Badge, Icon } from "@/components/atoms";
import { AIS_ROLES } from "@/data/roles";
import { initials } from "@/lib/format";
import type { StaffHeroProps } from "@/types/ui";

export function StaffHero({ persona, role, sub, action }: StaffHeroProps) {
  const meta = AIS_ROLES.roleMeta[role];

  return (
    <div
      className="card staff-hero"
      style={{
        marginBottom: 22,
        overflow: "hidden",
        position: "relative",
        background: `linear-gradient(120deg, var(--hero-surface), ${meta.bg})`,
        border: `1px solid ${meta.bg}`,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: -40,
          top: -40,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: `radial-gradient(circle, color-mix(in srgb, ${meta.color} 20%, transparent), transparent 70%)`,
        }}
      />
      <div
        className="card-pad"
        style={{ display: "flex", alignItems: "center", gap: 22, padding: 30 }}
      >
        <div
          className="sb-ava"
          style={{
            width: 64,
            height: 64,
            fontSize: 24,
            borderRadius: 18,
            background: persona.avaBg,
            color: persona.ava,
          }}
        >
          {initials(persona.nama)}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, color: "var(--ink-2)", fontWeight: 600 }}>
            Selamat datang kembali 👋
          </div>
          <h1
            style={{
              margin: "3px 0 7px",
              fontSize: 25,
              fontWeight: 800,
              letterSpacing: "-.025em",
            }}
          >
            {persona.nama}
          </h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span className="badge" style={{ background: meta.bg, color: meta.color }}>
              <Icon name={meta.ic} size={13} /> {meta.label}
            </span>
            <Badge tone="gray">
              <span className="mono">
                {persona.idLabel} {persona.id}
              </span>
            </Badge>
            <Badge tone="gray">{persona.unit}</Badge>
          </div>
          {sub && (
            <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 9 }}>
              {sub}
            </div>
          )}
        </div>
        {action}
      </div>
    </div>
  );
}
