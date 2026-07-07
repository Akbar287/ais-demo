import { Badge, Icon } from "../../atoms";
import { usePeriod } from "./PeriodContext";

export function PeriodBanner() {
  const { period } = usePeriod();
  if (period.status === "active") return null;
  const archived = period.status === "archived";
  const tone = archived ? "amber" : "blue";

  return (
    <div className="card card-pad anim-in" style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 13, padding: "13px 18px", background: archived ? "var(--amber-bg)" : "var(--blue-bg)", border: "none" }}>
      <Icon name={archived ? "lock" : "calendar"} size={19} style={{ color: archived ? "#a6760e" : "var(--blue)", flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <b style={{ fontSize: 13.5, color: archived ? "#8a5e0c" : "var(--blue)" }}>
          {archived ? "Mode Arsip" : "Periode Mendatang"} - {period.ta} {period.smt}
        </b>
        <span style={{ fontSize: 12.5, color: "var(--ink-2)", marginLeft: 8 }}>
          {archived ? "Periode ini sudah ditutup. Data hanya dapat dilihat (read-only)." : "Periode dalam perencanaan. Sebagian data belum final."}
        </span>
      </div>
      <Badge tone={tone} dot>{archived ? "Read-only" : "Draf"}</Badge>
    </div>
  );
}
