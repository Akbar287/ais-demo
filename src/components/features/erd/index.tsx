import * as React from "react";
import { useState } from "react";
import { Badge, Icon } from "@/components/atoms";
import { Modal, PageHead } from "@/components/molecules";
import { AIS_ERD } from "@/data/erd";

// ============================================================
// AIS — Views: Kamus Data & ERD Explorer (Administrator)
// Sumber: Kamus Data.xlsx — 453 entitas · 4.889 field (L4) · 36 subjek
// ============================================================
const ERD_ICON = {
  1: "grad", 2: "sliders", 3: "idcard", 4: "presentation", 5: "book", 6: "check", 7: "award",
  8: "userCheck", 9: "doc", 10: "grad", 11: "report", 12: "chart", 13: "users", 14: "gift",
  15: "sliders", 16: "wallet", 17: "idcard", 18: "bookOpen", 19: "shield", 20: "box", 21: "cart",
  22: "link", 23: "flag", 24: "link", 25: "doc", 26: "bell", 27: "wrench", 28: "building",
  29: "key", 30: "lock", 31: "report", 32: "bell", 33: "doc", 34: "check", 35: "server", 36: "sliders",
};
const GRUP_TONE = { Core: "blue", Support: "green", Platform: "purple" };
const JENIS_TONE = { Master: "purple", Transaksi: "blue", Junction: "gray", Log: "amber", Referensi: "green", Konfigurasi: "amber" };
const SENS_TONE = { Pribadi: "red", Rahasia: "red", Internal: "gray", Publik: "green", Finansial: "amber" };
const KEY_TONE = { PK: "purple", FK: "blue", UQ: "green", Y: "gray" };
const E = AIS_ERD;

function AdminERD() {
  const [grup, setGrup] = useState("Semua");
  const [open, setOpen] = useState<number | null>(null); // subject no
  const [q, setQ] = useState("");
  const [detail, setDetail] = useState<(typeof E.entities)[number] | null>(null); // entity object

  const bySubj = React.useMemo(() => {
    const m: Record<number, typeof E.entities> = {};
    E.entities.forEach((e) => { const s = +String(e.kode).split(".")[0]; (m[s] = m[s] || []).push(e); });
    return m;
  }, []);
  const subjMeta = (n) => E.subjects.find((s) => s.no === n)!;

  // global entity search
  const entSearch = q.trim() ? E.entities.filter((e) => e.nama.toLowerCase().includes(q.toLowerCase()) || String(e.kode).includes(q) || (e.subjek || "").toLowerCase().includes(q.toLowerCase())) : null;

  // ---------- Entity detail modal (with full L4 field list) ----------
  const entModal = detail && (() => {
    const fields = E.fieldsByEnt[detail.kode] || [];
    return (
      <Modal wide title={detail.nama} subtitle={"Entitas " + detail.kode + " · " + detail.subjek} onClose={() => setDetail(null)}
        footer={<button className="btn btn-ghost" onClick={() => setDetail(null)}>Tutup</button>}>
        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
          <Badge tone={JENIS_TONE[detail.jenis] || "gray"}>{detail.jenis}</Badge>
          {detail.sens && <Badge tone={SENS_TONE[detail.sens] || "gray"} dot>{detail.sens}</Badge>
          }
          {detail.owner && <Badge tone="gray">Pemilik: {detail.owner}</Badge>}
          {detail.intg && <Badge tone="blue">Integrasi: {detail.intg}</Badge>}
        </div>
        {detail.ket && <div style={{ fontSize: 13, color: "var(--ink-2)", marginBottom: 14, lineHeight: 1.5 }}>{detail.ket}{detail.rel ? <span style={{ color: "var(--ink-3)" }}> · Relasi {detail.rel}</span> : null}</div>}
        <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "0 0 10px" }}>
          <Icon name="database" size={15} style={{ color: "var(--blue)" }} />
          <b style={{ fontSize: 13.5 }}>Field Data (Level 4)</b>
          <Badge tone="gray">{fields.length} field</Badge>
        </div>
        <div style={{ border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden", maxHeight: 420, overflowY: "auto" }}>
          <table className="tbl">
            <thead><tr><th style={{ width: 40 }}>#</th><th>Nama Field</th><th>Tipe</th><th style={{ textAlign: "center" }}>Panjang</th><th style={{ textAlign: "center" }}>Key</th><th style={{ textAlign: "center" }}>Wajib</th><th>Sensitivitas</th><th>Keterangan</th></tr></thead>
            <tbody>
              {fields.map((f, i) => (
                <tr key={i}>
                  <td className="mono" style={{ color: "var(--ink-3)", fontSize: 11.5 }}>{i + 1}</td>
                  <td className="mono" style={{ fontWeight: 700, fontSize: 12.5 }}>{f.n}</td>
                  <td className="mono" style={{ fontSize: 12, color: "var(--ink-2)" }}>{f.t}</td>
                  <td style={{ textAlign: "center", fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-3)" }}>{f.l || "—"}</td>
                  <td style={{ textAlign: "center" }}>{f.k ? <Badge tone={KEY_TONE[f.k] || "gray"}>{f.k}</Badge> : <span style={{ color: "var(--ink-3)" }}>—</span>}</td>
                  <td style={{ textAlign: "center" }}>{f.w ? <Icon name="check" size={14} style={{ color: "var(--green)" }} /> : <span style={{ color: "var(--ink-3)" }}>—</span>}</td>
                  <td>{f.s ? <Badge tone={SENS_TONE[f.s] || "gray"}>{f.s}</Badge> : null}</td>
                  <td style={{ fontSize: 12, color: "var(--ink-2)", maxWidth: 220 }}>{f.ket}{f.i ? <span style={{ color: "var(--blue)" }}> · {f.i}</span> : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    );
  })();

  // ---------- Subject detail (entity list) ----------
  if (open != null) {
    const meta = subjMeta(open);
    const list = bySubj[open] || [];
    const tone = GRUP_TONE[meta.grup] || "blue";
    return (
      <div className="anim-in">
        <button className="btn btn-ghost btn-sm" onClick={() => setOpen(null)} style={{ marginBottom: 14 }}><Icon name="chevL" size={15} /> Semua Subjek Data</button>
        <div className="card" style={{ marginBottom: 18, overflow: "hidden", border: "none" }}>
          <div style={{ background: `linear-gradient(115deg, var(--${tone}), color-mix(in srgb, var(--${tone}) 62%, #000))`, padding: "26px 30px", color: "#fff", position: "relative" }}>
            <div style={{ position: "absolute", right: -30, top: -30, width: 170, height: 170, borderRadius: "50%", background: "rgba(255,255,255,.12)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, opacity: .9, marginBottom: 6 }}><Icon name={ERD_ICON[open] || "database"} size={17} /> Subjek {open} · {meta.grup}</div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: "-.02em" }}>{meta.nama}</h1>
            <div style={{ display: "flex", gap: 26, marginTop: 16, flexWrap: "wrap" }}>
              {[[list.length, "Entitas"], [meta.field, "Field"], [list.filter((e) => e.jenis === "Master").length, "Master"], [list.filter((e) => e.jenis === "Transaksi").length, "Transaksi"]].map(([v, l]) => (
                <div key={l}><div style={{ fontSize: 18, fontWeight: 800, fontFamily: "var(--mono)" }}>{v}</div><div style={{ fontSize: 11, opacity: .75, fontWeight: 600 }}>{l}</div></div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-head"><Icon name="database" size={19} style={{ color: `var(--${tone})` }} /><h3>Daftar Entitas</h3><span className="sub">· klik untuk lihat field</span></div>
          <div style={{ overflowX: "auto" }}>
            <table className="tbl">
              <thead><tr><th>Kode</th><th>Entitas</th><th>Jenis</th><th style={{ textAlign: "center" }}>Field</th><th>Pemilik</th><th>Sensitivitas</th><th></th></tr></thead>
              <tbody>
                {list.map((e) => (
                  <tr key={e.kode} style={{ cursor: "pointer" }} onClick={() => setDetail(e)}>
                    <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{e.kode}</td>
                    <td style={{ fontWeight: 700 }}>{e.nama}</td>
                    <td><Badge tone={JENIS_TONE[e.jenis] || "gray"}>{e.jenis}</Badge></td>
                    <td style={{ textAlign: "center", fontWeight: 700, fontFamily: "var(--mono)" }}>{e.field}</td>
                    <td style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{e.owner}</td>
                    <td>{e.sens ? <Badge tone={SENS_TONE[e.sens] || "gray"} dot={e.sens === "Pribadi" || e.sens === "Rahasia"}>{e.sens}</Badge> : <span style={{ color: "var(--ink-3)" }}>—</span>}</td>
                    <td><Icon name="chevR" size={15} style={{ color: "var(--ink-3)" }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {entModal}
      </div>
    );
  }

  // ---------- Landing ----------
  const grups = ["Semua", "Core", "Support", "Platform"];
  const shown = E.subjects.filter((s) => grup === "Semua" || s.grup === grup);

  return (
    <div className="anim-in">
      <PageHead title="Kamus Data & ERD" desc="Model data lengkap (Level 4): 453 entitas dan 4.889 field dalam 36 subjek lintas 3 domain. Bersumber dari Kamus Data — tab Field Data (L4)." />

      <div className="grid" style={{ gridTemplateColumns: "repeat(5,1fr)", marginBottom: 18 }}>
        {[["Entitas", 453, "blue"], ["Field Data (L4)", "4.889", "purple"], ["Relasi FK→PK", "1.410", "green"], ["Subjek", 36, "orange"], ["Domain", 3, "amber"]].map(([l, v, t]) => (
          <div key={l} className="stat card" style={{ background: `var(--${t === "orange" ? "orange-50" : t + "-bg"})`, border: "none" }}>
            <div className="label" style={{ color: `var(--${t === "orange" ? "orange-600" : t})` }}>{l}</div>
            <div className="value" style={{ color: `var(--${t === "orange" ? "orange-600" : t})`, fontSize: 27 }}>{v}</div>
          </div>
        ))}
      </div>

      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <div className="tb-search" style={{ margin: 0, width: 320 }}><Icon name="search" size={16} /><input placeholder="Cari entitas / subjek…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        {!entSearch && <div className="seg">{grups.map((d) => <button key={d} className={grup === d ? "on" : ""} onClick={() => setGrup(d)}>{d}</button>)}</div>}
        <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--ink-3)" }}>{entSearch ? entSearch.length + " entitas cocok" : shown.length + " subjek"}</span>
      </div>

      {entSearch ? (
        <div className="card">
          <div style={{ overflowX: "auto" }}>
            <table className="tbl">
              <thead><tr><th>Kode</th><th>Entitas</th><th>Subjek</th><th>Jenis</th><th style={{ textAlign: "center" }}>Field</th></tr></thead>
              <tbody>
                {entSearch.slice(0, 100).map((e) => (
                  <tr key={e.kode} style={{ cursor: "pointer" }} onClick={() => setDetail(e)}>
                    <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{e.kode}</td>
                    <td style={{ fontWeight: 700 }}>{e.nama}</td>
                    <td style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{e.subjek}</td>
                    <td><Badge tone={JENIS_TONE[e.jenis] || "gray"}>{e.jenis}</Badge></td>
                    <td style={{ textAlign: "center", fontWeight: 700, fontFamily: "var(--mono)" }}>{e.field}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))", gap: 13 }}>
          {shown.map((s) => {
            const tone = GRUP_TONE[s.grup] || "blue";
            return (
              <button key={s.no} className="card" onClick={() => setOpen(s.no)} style={{ textAlign: "left", cursor: "pointer", padding: 16, fontFamily: "var(--sans)", border: "1px solid var(--line)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 11 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: `var(--${tone}-bg)`, color: `var(--${tone})`, display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name={ERD_ICON[s.no] || "database"} size={19} /></div>
                  <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-3)" }}>#{s.no}</span>
                  <Badge tone={tone} style={{ marginLeft: "auto" }}>{s.grup}</Badge>
                </div>
                <div style={{ fontWeight: 800, fontSize: 13.5, lineHeight: 1.3, marginBottom: 10, minHeight: 36 }}>{s.nama}</div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid var(--line)", fontSize: 12 }}>
                  <span style={{ color: "var(--ink-3)" }}><b className="mono" style={{ color: "var(--ink)" }}>{s.entitas}</b> entitas</span>
                  <span style={{ color: "var(--ink-3)" }}><b className="mono" style={{ color: "var(--ink)" }}>{s.field}</b> field</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
      {entModal}
    </div>
  );
}

export { AdminERD };
