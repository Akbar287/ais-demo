import { useState } from "react";
import { Icon } from "../../atoms";
import { AIS_PERIODS, PERIOD_STATUS, usePeriod } from "./PeriodContext";
import type { AcademicPeriod } from "@/types/ui";

export function PeriodSelect() {
  const { period, setPeriod } = usePeriod();
  const [open, setOpen] = useState(false);
  const groups: Array<[string, readonly AcademicPeriod[]]> = [
    ["Aktif", AIS_PERIODS.filter((p) => p.status === "active")],
    ["Mendatang", AIS_PERIODS.filter((p) => p.status === "planning")],
    ["Arsip", AIS_PERIODS.filter((p) => p.status === "archived")],
  ];
  const [, dotColor] = PERIOD_STATUS[period.status];

  return (
    <div style={{ position: "relative" }} className="period-wrap">
      <button className="period-btn" onClick={() => setOpen((o) => !o)} aria-label="Pilih periode">
        <Icon name="calendar" size={16} style={{ color: "var(--ink-3)", flexShrink: 0 }} />
        <span className="period-text">
          <span className="period-cap">Periode</span>
          <span className="period-val">{period.ta} {period.smt}</span>
        </span>
        <span className="dot" style={{ background: dotColor, width: 7, height: 7, flexShrink: 0 }} />
        <Icon name="chevR" size={14} style={{ color: "var(--ink-3)", transform: open ? "rotate(90deg)" : "none", transition: "transform .18s", flexShrink: 0 }} />
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 40 }} />
          <div className="card" style={{ position: "absolute", top: 52, right: 0, zIndex: 50, width: 248, padding: 7, boxShadow: "var(--shadow-lg)", animation: "pop .16s" }}>
            {groups.map(([label, items]) =>
              items.length ? (
                <div key={label}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-3)", padding: "8px 10px 5px" }}>{label}</div>
                  {items.map((p) => {
                    const on = p.id === period.id;
                    const [stLabel, stColor] = PERIOD_STATUS[p.status];
                    return (
                      <button key={p.id} onClick={() => { setPeriod(p); setOpen(false); }}
                        style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 10px", border: "none", borderRadius: 10, cursor: "pointer", background: on ? "var(--surface-2)" : "transparent", fontFamily: "var(--sans)", textAlign: "left" }}>
                        <span className="dot" style={{ background: stColor, width: 8, height: 8, flexShrink: 0 }} />
                        <span style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ display: "block", fontWeight: 700, fontSize: 13 }}>{p.ta} {p.smt}</span>
                          <span style={{ fontSize: 11, color: "var(--ink-3)" }}>{stLabel}</span>
                        </span>
                        {on && <Icon name="check" size={16} style={{ color: "var(--green)" }} />}
                      </button>
                    );
                  })}
                </div>
              ) : null
            )}
          </div>
        </>
      )}
    </div>
  );
}
