/* eslint-disable */
// @ts-nocheck
// Generated from js/views_admin.jsx by scripts/port-js-ssot.mjs.
"use client";


import * as React from "react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Badge, Barcode, Icon, ImgPlaceholder } from "@/components/atoms";
import { Modal, PageHead } from "@/components/molecules";
import { StaffHero, useToast } from "@/components/organisms";
import { AIS_CONTENT } from "@/data/content";
import { AIS_ERD } from "@/data/erd";
import { AIS_EXP } from "@/data/exp";
import { AIS_ROLES } from "@/data/roles";
import { AIS_DATA } from "@/data/mock-data";
import { initials, rupiah } from "@/lib/format";
import { useSharedList } from "@/lib/sharedStore";

const window = { AIS_CONTENT, AIS_DATA, AIS_ERD, AIS_EXP, AIS_ROLES } as any;

// ============================================================
// AIS — Views: ADMINISTRATOR SISTEM (IAM, RBAC, Services, Master, Audit)
// ============================================================

function AdminDashboard({ nav }) {
  const R = window.AIS_ROLES; const p = R.personas.admin;
  const svc = R.services;
  const up = svc.filter((s) => s.status === "up").length;
  const degraded = svc.filter((s) => s.status === "degraded");
  const totalReplica = svc.reduce((a, b) => a + b.run, 0);
  const tiles = [
    { label: "Microservice Aktif", value: up + "/" + svc.length, meta: degraded.length + " degraded", ic: "server", c: "var(--green)", bg: "var(--green-bg)" },
    { label: "Pod Berjalan", value: totalReplica, meta: "auto-scaling (HPA) aktif", ic: "layers", c: "var(--blue)", bg: "var(--blue-bg)" },
    { label: "Pengguna Aktif", value: R.users.filter((u) => u.status === "Aktif").length + " / " + R.users.length, meta: "lintas " + new Set(R.users.map((u) => u.role.split(",")[0])).size + " peran", ic: "users", c: "var(--purple)", bg: "var(--purple-bg)" },
    { label: "Event/Audit Hari Ini", value: "48.2k", meta: "Kafka + Audit Service", ic: "activity", c: "var(--orange-600)", bg: "var(--orange-50)" },
  ];
  const domains = ["Core", "Support", "Platform"];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="admin" sub="Kelola pengguna & hak akses, pantau 34 microservice, master data, dan audit sistem."
        action={<button className="btn btn-primary" onClick={() => nav("adm_services")}><Icon name="server" size={17} /> Monitoring</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 22 }}>
        {tiles.map((t) => (
          <div key={t.label} className="stat card" style={{ background: t.bg, border: "none" }}>
            <Icon name={t.ic} size={26} className="si" style={{ color: t.c }} />
            <div className="label" style={{ color: t.c }}>{t.label}</div>
            <div className="value" style={{ color: t.c, fontSize: 26 }}>{t.value}</div>
            <div className="meta" style={{ color: t.c }}>{t.meta}</div>
          </div>
        ))}
      </div>
      {degraded.length > 0 && (
        <div className="card card-pad" style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 14, borderLeft: "3px solid var(--red)" }}>
          <Icon name="flag" size={20} style={{ color: "var(--red)" }} />
          <div style={{ flex: 1 }}><b style={{ fontSize: 14 }}>Peringatan performa.</b> <span style={{ color: "var(--ink-2)", fontSize: 13.5 }}>{degraded.map((d) => d.nama).join(", ")} mengalami latensi tinggi (KRS dibuka — beban puncak).</span></div>
          <button className="btn btn-soft btn-sm" onClick={() => nav("adm_services")}>Tinjau</button>
        </div>
      )}
      <div className="grid" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="layers" size={19} style={{ color: "var(--blue)" }} /><h3>Kesehatan per Domain</h3>
            <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("adm_services")}>Detail 34 Service</button></div>
          <div className="card-pad" style={{ display: "grid", gap: 16 }}>
            {domains.map((dm) => {
              const ds = svc.filter((s) => s.domain === dm);
              const dup = ds.filter((s) => s.status === "up").length;
              const tone = dup === ds.length ? "green" : "amber";
              return (
                <div key={dm}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13.5 }}>
                    <span style={{ fontWeight: 700 }}>{dm} <span style={{ color: "var(--ink-3)", fontWeight: 500 }}>· {ds.length} service</span></span>
                    <b className="mono" style={{ color: `var(--${tone})` }}>{dup}/{ds.length} sehat</b>
                  </div>
                  <div className="prog" style={{ height: 10 }}><i style={{ width: (dup / ds.length * 100) + "%", background: `var(--${tone})` }} /></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="report" size={19} style={{ color: "var(--orange-600)" }} /><h3>Aktivitas Terakhir</h3>
            <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("adm_audit")}>Audit Log</button></div>
          <div style={{ padding: "4px 0" }}>
            {R.auditLog.slice(0, 5).map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 22px", borderBottom: i < 4 ? "1px solid var(--line)" : "none" }}>
                <span className="dot" style={{ background: a.level === "error" ? "var(--red)" : a.level === "warn" ? "var(--amber)" : "var(--green)", width: 8, height: 8, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, fontFamily: "var(--mono)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.act}</div>
                  <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{a.actor} · {a.ts.slice(11)}</div>
                </div>
                <Badge tone="gray"><span className="mono">{a.svc}</span></Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminUsers() {
  const R = window.AIS_ROLES; const toast = useToast();
  const [q, setQ] = useState(""); const [add, setAdd] = useState(false);
  const list = R.users.filter((u) => u.nama.toLowerCase().includes(q.toLowerCase()) || u.username.includes(q) || u.role.toLowerCase().includes(q.toLowerCase()));
  const stTone = { Aktif: "green", Nonaktif: "gray", Terkunci: "red" };
  return (
    <div className="anim-in">
      <PageHead title="Manajemen Pengguna" desc="Kelola akun pengguna lintas peran. Akun & kredensial tersentral di Identity & Access Service (IAM)."
        actions={<button className="btn btn-primary" onClick={() => setAdd(true)}><Icon name="plus" size={16} /> Tambah Pengguna</button>} />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <div className="tb-search" style={{ margin: 0, width: 320 }}><Icon name="search" size={16} /><input placeholder="Cari nama, username, atau peran…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--ink-3)" }}>{list.length} pengguna</span>
      </div>
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Pengguna</th><th>Username</th><th>Peran</th><th>Unit</th><th style={{ textAlign: "center" }}>MFA</th><th>Login Terakhir</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map((u) => (
                <tr key={u.username}>
                  <td><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div className="sb-ava" style={{ width: 34, height: 34, fontSize: 12, background: "var(--surface-2)", color: "var(--ink-2)" }}>{initials(u.nama)}</div><div style={{ fontWeight: 700 }}>{u.nama}</div></div></td>
                  <td className="mono" style={{ color: "var(--ink-3)" }}>{u.username}</td>
                  <td><div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>{u.role.split(",").map((r) => <Badge key={r} tone="blue">{r.trim()}</Badge>)}</div></td>
                  <td style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{u.unit}</td>
                  <td style={{ textAlign: "center" }}>{u.mfa ? <Icon name="shield" size={16} style={{ color: "var(--green)" }} /> : <span style={{ color: "var(--ink-3)", fontSize: 12 }}>—</span>}</td>
                  <td style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{u.terakhir}</td>
                  <td><Badge tone={stTone[u.status]} dot>{u.status}</Badge></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => toast("Kelola akun " + u.nama)}><Icon name="edit" size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {add && (
        <Modal title="Tambah Pengguna" subtitle="Akun baru akan dibuat di IAM Service" onClose={() => setAdd(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setAdd(false)}>Batal</button><button className="btn btn-primary" onClick={() => { setAdd(false); toast("Pengguna dibuat & email aktivasi dikirim", "ok"); }}><Icon name="check" size={16} /> Buat Akun</button></>}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field"><label>Nama Lengkap</label><input placeholder="cth. Andi Saputra" /></div>
            <div className="field"><label>Username / NIP / NIDN</label><input placeholder="cth. 19900110" /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field"><label>Peran</label><select><option>Mahasiswa</option><option>Dosen</option><option>Dosen PA</option><option>Kaprodi</option><option>Keuangan</option><option>Operator BAA</option><option>Administrator</option></select></div>
            <div className="field"><label>Unit Kerja</label><input placeholder="cth. TI · FST" /></div>
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13.5, fontWeight: 600 }}><input type="checkbox" defaultChecked style={{ width: 16, height: 16 }} /> Wajibkan MFA &amp; reset kata sandi saat login pertama</label>
        </Modal>
      )}
    </div>
  );
}

function AdminRBAC() {
  const R = window.AIS_ROLES;
  const roles = Object.keys(R.rbac);
  const [sel, setSel] = useState(roles[0]);
  const levelMeta = { "-": ["Tidak ada", "var(--ink-3)", "var(--surface-2)"], R: ["Lihat", "var(--blue)", "var(--blue-bg)"], W: ["Lihat + Ubah", "var(--green)", "var(--green-bg)"], A: ["Penuh", "var(--purple)", "var(--purple-bg)"] };
  return (
    <div className="anim-in">
      <PageHead title="Peran & Hak Akses (RBAC)" desc="Matriks kendali akses peran terhadap modul. Menu yang tampil untuk tiap pengguna ditentukan oleh kebijakan ini di IAM Service." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, fontWeight: 700 }}>Legenda:</span>
        {Object.entries(levelMeta).map(([k, [lbl, c, bg]]) => (
          <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5 }}>
            <span style={{ width: 22, height: 22, borderRadius: 7, background: bg, color: c, display: "grid", placeItems: "center", fontWeight: 800, fontSize: 11 }}>{k === "-" ? "·" : k}</span>{lbl}
          </span>
        ))}
      </div>
      <div className="card" style={{ overflowX: "auto" }}>
        <table className="tbl" style={{ minWidth: 900 }}>
          <thead>
            <tr>
              <th style={{ position: "sticky", left: 0, background: "var(--surface-2)", zIndex: 2, minWidth: 200 }}>Modul / Fitur</th>
              {roles.map((r) => <th key={r} style={{ textAlign: "center", minWidth: 96 }}>{r}</th>)}
            </tr>
          </thead>
          <tbody>
            {R.modules.map((mod, mi) => (
              <tr key={mod}>
                <td style={{ position: "sticky", left: 0, background: "var(--surface)", fontWeight: 700, zIndex: 1 }}>{mod}</td>
                {roles.map((r) => {
                  const lvl = R.rbac[r][mi];
                  const [lbl, c, bg] = levelMeta[lvl];
                  return (
                    <td key={r} style={{ textAlign: "center" }}>
                      <span title={lbl} style={{ display: "inline-grid", placeItems: "center", width: 30, height: 30, borderRadius: 9, background: bg, color: c, fontWeight: 800, fontSize: 12.5 }}>{lvl === "-" ? "·" : lvl}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 12, fontSize: 12.5, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 8 }}><Icon name="info" size={15} /> Perubahan kebijakan dipublikasikan sebagai event <span className="mono" style={{ color: "var(--ink-2)" }}>ROLE_POLICY_UPDATED</span> dan langsung berlaku di seluruh service.</div>
    </div>
  );
}

function AdminServices() {
  const R = window.AIS_ROLES;
  const [domain, setDomain] = useState("Semua");
  const [detail, setDetail] = useState(null);
  const domains = ["Semua", "Core", "Support", "Platform"];
  const list = R.services.filter((s) => domain === "Semua" || s.domain === domain);
  const stTone = { up: ["Sehat", "green"], degraded: ["Degraded", "amber"], down: ["Mati", "red"] };
  const dbTone = { PostgreSQL: "blue", MongoDB: "green", Elasticsearch: "purple" };
  return (
    <div className="anim-in">
      <PageHead title="Monitoring Microservice" desc="34 microservice event-driven di atas Kubernetes on-premise. Tiap service punya database sendiri (database-per-service)." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
        <div className="seg">{domains.map((d) => <button key={d} className={domain === d ? "on" : ""} onClick={() => setDomain(d)}>{d}</button>)}</div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 16, fontSize: 12.5 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span className="dot" style={{ background: "var(--green)" }} /> {R.services.filter((s) => s.status === "up").length} sehat</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span className="dot" style={{ background: "var(--amber)" }} /> {R.services.filter((s) => s.status === "degraded").length} degraded</span>
        </div>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 13 }}>
        {list.map((s) => (
          <button key={s.no} className="card" onClick={() => setDetail(s)} style={{ textAlign: "left", cursor: "pointer", padding: 16, fontFamily: "var(--sans)", border: s.status === "degraded" ? "1.5px solid var(--amber)" : "1px solid var(--line)", background: "var(--surface)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 11 }}>
              <span className="dot" style={{ background: `var(--${stTone[s.status][1]})`, width: 9, height: 9, flexShrink: 0, boxShadow: s.status === "up" ? "0 0 0 3px var(--green-bg)" : "0 0 0 3px var(--amber-bg)" }} />
              <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-3)", textTransform: "uppercase" }}>{s.kode}</span>
              <Badge tone="gray" style={{ marginLeft: "auto" }}>{s.replica}</Badge>
            </div>
            <div style={{ fontWeight: 800, fontSize: 13.5, lineHeight: 1.25, marginBottom: 4, minHeight: 34 }}>{s.nama}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <Badge tone={dbTone[s.db] || "gray"}><Icon name="database" size={11} /> {s.db}</Badge>
              {s.cache && <Badge tone="gray">{s.cache}</Badge>}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 11, borderTop: "1px solid var(--line)" }}>
              {[["RPS", s.rps], ["Latency", s.lat + "ms"], ["CPU", s.cpu + "%"]].map(([l, v]) => (
                <div key={l}><div style={{ fontSize: 10, color: "var(--ink-3)", fontWeight: 600 }}>{l}</div><div style={{ fontWeight: 800, fontFamily: "var(--mono)", fontSize: 13, color: l === "CPU" && +v.toString().replace("%", "") > 80 ? "var(--red)" : "var(--ink)" }}>{v}</div></div>
              ))}
            </div>
          </button>
        ))}
      </div>
      {detail && (
        <Modal title={detail.nama} subtitle={"Service " + detail.kode.toUpperCase() + " · Domain " + detail.domain} onClose={() => setDetail(null)}
          footer={<button className="btn btn-ghost" onClick={() => setDetail(null)}>Tutup</button>}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <Badge tone={stTone[detail.status][1]} dot>{stTone[detail.status][0]}</Badge>
            <Badge tone={dbTone[detail.db] || "gray"}><Icon name="database" size={12} /> {detail.db} · {detail.tipe}</Badge>
            {detail.cache && <Badge tone="gray">Cache/Store: {detail.cache}</Badge>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
            {[["Replica (HPA)", detail.replica], ["Pod aktif", detail.run], ["Entitas data", detail.entitas], ["Throughput", detail.rps + " rps"], ["Latensi p95", detail.lat + " ms"], ["CPU", detail.cpu + "%"]].map(([l, v]) => (
              <div key={l} style={{ padding: 12, background: "var(--surface-2)", borderRadius: 11 }}><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{l}</div><div style={{ fontWeight: 800, fontFamily: "var(--mono)", fontSize: 15, marginTop: 3 }}>{v}</div></div>
            ))}
          </div>
          <div style={{ padding: 14, background: "var(--surface-2)", borderRadius: 12 }}>
            <div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 700, marginBottom: 4 }}>PEMILIK / BOUNDED CONTEXT</div>
            <div style={{ fontWeight: 700, fontSize: 13.5 }}>{detail.owner}</div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function AdminMaster() {
  const M = window.AIS_ROLES.master;
  const [tab, setTab] = useState("tahun");
  const tabs = [["tahun", "Tahun Akademik"], ["fakultas", "Fakultas"], ["prodi", "Program Studi"], ["penomoran", "Format Penomoran"]];
  return (
    <div className="anim-in">
      <PageHead title="Master Data & Referensi" desc="Data referensi inti yang dipakai lintas service — dari Configuration & Master-Data Service." />
      <div className="seg" style={{ marginBottom: 18 }}>{tabs.map(([k, l]) => <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{l}</button>)}</div>
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          {tab === "tahun" && (
            <table className="tbl"><thead><tr><th>Kode</th><th>Tahun Akademik</th><th>Status</th><th>KRS</th><th>Mulai</th></tr></thead>
              <tbody>{M.tahunAkademik.map((t) => (<tr key={t.kode}><td className="mono">{t.kode}</td><td style={{ fontWeight: 700 }}>{t.label}</td><td><Badge tone={t.status === "Aktif" ? "green" : t.status === "Berjalan" ? "blue" : "gray"} dot>{t.status}</Badge></td><td><Badge tone={t.krs === "Dibuka" ? "green" : "gray"}>{t.krs}</Badge></td><td style={{ fontSize: 13 }}>{t.mulai}</td></tr>))}</tbody></table>
          )}
          {tab === "fakultas" && (
            <table className="tbl"><thead><tr><th>Kode</th><th>Fakultas</th><th style={{ textAlign: "center" }}>Prodi</th><th>Dekan</th></tr></thead>
              <tbody>{M.fakultas.map((f) => (<tr key={f.kode}><td className="mono">{f.kode}</td><td style={{ fontWeight: 700 }}>{f.nama}</td><td style={{ textAlign: "center" }}>{f.prodi}</td><td style={{ color: "var(--ink-2)" }}>{f.dekan}</td></tr>))}</tbody></table>
          )}
          {tab === "prodi" && (
            <table className="tbl"><thead><tr><th>Kode</th><th>Program Studi</th><th>Jenjang</th><th>Akreditasi</th><th>Kaprodi</th></tr></thead>
              <tbody>{M.prodi.map((p) => (<tr key={p.kode}><td className="mono">{p.kode}</td><td style={{ fontWeight: 700 }}>{p.nama}</td><td>{p.jenjang}</td><td><Badge tone={p.akreditasi === "Unggul" ? "green" : "blue"}>{p.akreditasi}</Badge></td><td style={{ color: "var(--ink-2)" }}>{p.kaprodi}</td></tr>))}</tbody></table>
          )}
          {tab === "penomoran" && (
            <table className="tbl"><thead><tr><th>Jenis</th><th>Format</th><th>Contoh</th><th>Service</th></tr></thead>
              <tbody>{M.penomoran.map((p) => (<tr key={p.jenis}><td style={{ fontWeight: 700 }}>{p.jenis}</td><td className="mono" style={{ color: "var(--ink-2)" }}>{p.format}</td><td className="mono">{p.contoh}</td><td><Badge tone="gray"><span className="mono">{p.svc}</span></Badge></td></tr>))}</tbody></table>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminAudit() {
  const R = window.AIS_ROLES;
  const [lvl, setLvl] = useState("semua");
  const list = R.auditLog.filter((a) => lvl === "semua" || a.level === lvl);
  const lvlTone = { info: "green", warn: "amber", error: "red" };
  return (
    <div className="anim-in">
      <PageHead title="Audit Log" desc="Jejak audit imutabel seluruh sistem — dari Audit & Log Service (Elasticsearch). Semua aksi penting terekam." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
        <div className="seg">{[["semua", "Semua"], ["info", "Info"], ["warn", "Warning"], ["error", "Error"]].map(([k, l]) => <button key={k} className={lvl === k ? "on" : ""} onClick={() => setLvl(k)}>{l}</button>)}</div>
        <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--ink-3)" }}>{list.length} entri · 48.2k hari ini</span>
      </div>
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th style={{ width: 50 }}></th><th>Waktu</th><th>Aktor</th><th>Service</th><th>Aksi</th><th>Objek</th><th>IP</th></tr></thead>
            <tbody>
              {list.map((a, i) => (
                <tr key={i}>
                  <td><span className="dot" style={{ background: `var(--${lvlTone[a.level]})`, width: 9, height: 9, margin: "0 auto", display: "block" }} /></td>
                  <td className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)", whiteSpace: "nowrap" }}>{a.ts}</td>
                  <td><div style={{ fontWeight: 700, fontSize: 13 }}>{a.actor}</div><div style={{ fontSize: 11, color: "var(--ink-3)" }}>{a.role}</div></td>
                  <td><Badge tone="gray"><span className="mono">{a.svc}</span></Badge></td>
                  <td className="mono" style={{ fontSize: 12, fontWeight: 700, color: a.level === "error" ? "var(--red)" : a.level === "warn" ? "#a6760e" : "var(--ink)" }}>{a.act}</td>
                  <td style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{a.obj}</td>
                  <td className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{a.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminPengumuman() {
  const toast = useToast();
  const [list, setList] = useState([
    { judul: "Pembukaan KRS Semester Ganjil 2026/2027", target: "Mahasiswa", tgl: "20 Jun 2026", status: "Terbit" },
    { judul: "Batas Akhir Input Nilai UAS", target: "Dosen", tgl: "18 Jun 2026", status: "Terbit" },
    { judul: "Pemeliharaan Sistem — Gateway", target: "Semua", tgl: "25 Jun 2026", status: "Terjadwal" },
  ]);
  const [add, setAdd] = useState(false);
  return (
    <div className="anim-in">
      <PageHead title="Pengumuman" desc="Siarkan pengumuman ke peran tertentu. Terkirim via Notification Service (in-app, email, WA)."
        actions={<button className="btn btn-primary" onClick={() => setAdd(true)}><Icon name="plus" size={16} /> Buat Pengumuman</button>} />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Judul</th><th>Target Peran</th><th>Tanggal</th><th>Status</th><th></th></tr></thead>
            <tbody>{list.map((p, i) => (<tr key={i}><td style={{ fontWeight: 700 }}>{p.judul}</td><td><Badge tone="blue">{p.target}</Badge></td><td style={{ fontSize: 13 }}>{p.tgl}</td><td><Badge tone={p.status === "Terbit" ? "green" : "amber"} dot>{p.status}</Badge></td><td><button className="btn btn-ghost btn-sm"><Icon name="edit" size={14} /></button></td></tr>))}</tbody>
          </table>
        </div>
      </div>
      {add && (
        <Modal title="Buat Pengumuman" subtitle="Disiarkan via Notification Service" onClose={() => setAdd(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setAdd(false)}>Batal</button><button className="btn btn-primary" onClick={() => { setList((l) => [{ judul: "Pengumuman Baru", target: "Semua", tgl: "23 Jun 2026", status: "Terbit" }, ...l]); setAdd(false); toast("Pengumuman disiarkan", "ok"); }}><Icon name="bell" size={16} /> Siarkan</button></>}>
          <div className="field"><label>Judul</label><input placeholder="cth. Jadwal Ujian Akhir Semester" /></div>
          <div className="field"><label>Target Peran</label><select><option>Semua Pengguna</option><option>Mahasiswa</option><option>Dosen</option><option>Kaprodi</option><option>Keuangan</option></select></div>
          <div className="field" style={{ margin: 0 }}><label>Isi</label><textarea rows={3} placeholder="Tulis isi pengumuman…" /></div>
        </Modal>
      )}
    </div>
  );
}

export { AdminDashboard, AdminUsers, AdminRBAC, AdminServices, AdminMaster, AdminAudit, AdminPengumuman };
