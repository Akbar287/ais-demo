import { Dialog } from "../molecules";
import { Icon } from "../atoms";
import { AIS_ROLES } from "@/data/roles";
import type { DemoRole } from "@/types/demo";
import type { RoleSwitcherDialogProps } from "@/types/ui";

const ROLE_ORDER: DemoRole[] = [
  "mahasiswa", "dosen", "pa", "kaprodi", "pimpinan", "baa", "keuangan", "akuntansi",
  "admin", "pustakawan", "pmb", "hr", "pengadaan", "aset", "calon", "lppm", "lpm",
  "mbkm", "kkn", "tu", "itsm", "kemahasiswaan", "kerjasama", "humas", "bau",
  "dokumen", "workflow", "pddikti",
];

export function RoleSwitcherDialog({ role, onPick, onClose }: RoleSwitcherDialogProps) {
  const R = AIS_ROLES;

  return (
    <Dialog onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-3)", padding: "10px 10px 8px", flexShrink: 0 }}>
        <span style={{ flex: 1 }}>Beralih Peran (demo)</span>
        <button onClick={onClose} aria-label="Tutup" style={{ border: "none", background: "var(--surface-2)", borderRadius: 8, width: 26, height: 26, cursor: "pointer", display: "grid", placeItems: "center", color: "var(--ink-2)" }}>
          <Icon name="x" size={15} />
        </button>
      </div>
      <div style={{ overflowY: "auto", flex: 1 }}>
        {ROLE_ORDER.map((rid) => {
          const meta = R.roleMeta[rid];
          const on = rid === role;
          return (
            <button
              key={rid}
              onClick={() => { onPick(rid); onClose(); }}
              style={{ display: "flex", alignItems: "center", gap: 11, width: "100%", padding: "9px 10px", border: "none", borderRadius: 11, cursor: "pointer", background: on ? meta.bg : "transparent", fontFamily: "var(--sans)", textAlign: "left" }}
            >
              <div style={{ width: 32, height: 32, borderRadius: 10, background: meta.bg, color: meta.color, display: "grid", placeItems: "center", flexShrink: 0 }}>
                <Icon name={meta.ic} size={17} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: on ? meta.color : "var(--ink)" }}>{meta.label}</div>
                <div style={{ fontSize: 11, color: "var(--ink-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{R.personas[rid].nama}</div>
              </div>
              {on && <Icon name="check" size={16} style={{ color: meta.color }} />}
            </button>
          );
        })}
        <div style={{ borderTop: "1px solid var(--line)", marginTop: 6, paddingTop: 6 }}>
          <button onClick={() => onPick(null)} style={{ display: "flex", alignItems: "center", gap: 11, width: "100%", padding: "9px 10px", border: "none", borderRadius: 11, cursor: "pointer", background: "transparent", fontFamily: "var(--sans)", color: "var(--ink-2)", fontWeight: 600, fontSize: 13 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "var(--surface-2)", display: "grid", placeItems: "center" }}>
              <Icon name="logout" size={16} />
            </div>
            Keluar / Pilih peran
          </button>
        </div>
      </div>
    </Dialog>
  );
}
