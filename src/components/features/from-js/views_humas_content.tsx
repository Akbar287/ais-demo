/* eslint-disable */
// @ts-nocheck
// Generated from js/views_humas_content.jsx by scripts/port-js-ssot.mjs.
"use client";


import * as React from "react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Badge, Barcode, Icon, ImgPlaceholder } from "@/components/atoms";
import { Modal, PageHead } from "@/components/molecules";
import { useToast } from "@/components/organisms";
import { AIS_CONTENT } from "@/data/content";
import { AIS_ERD } from "@/data/erd";
import { AIS_EXP } from "@/data/exp";
import { AIS_ROLES } from "@/data/roles";
import { AIS_DATA } from "@/data/mock-data";
import { initials, rupiah } from "@/lib/format";
import { useSharedList } from "@/lib/sharedStore";

const window = { AIS_CONTENT, AIS_DATA, AIS_ERD, AIS_EXP, AIS_ROLES } as any;

// ============================================================
// AIS — Views: Humas — CRUD Berita, Event/Agenda & Kategori
// Sumber kebenaran: shared store (useSharedList) di-seed dari AIS_CONTENT.
// Perubahan di sini langsung tercermin di halaman publik Berita/Agenda.
//   humas_berita · humas_event · humas_kat_berita · humas_kat_event
// ============================================================
const HMS_G = {
  blue: "linear-gradient(135deg,#1a4b8c,#2d7dd2)", green: "linear-gradient(135deg,#1b7340,#34d399)",
  purple: "linear-gradient(135deg,#6d28d9,#a78bfa)", orange: "linear-gradient(135deg,#c2410c,#fb923c)",
  red: "linear-gradient(135deg,#9f1239,#fb7185)", teal: "linear-gradient(135deg,#0f766e,#2dd4bf)",
  slate: "linear-gradient(135deg,#0f172a,#475569)", gold: "linear-gradient(135deg,#a16207,#fbbf24)",
};
const HMS_GKEYS = Object.keys(HMS_G);
const HMS_TONES = ["green", "blue", "purple", "orange", "red", "amber", "gray"];
const hmsSlug = (s) => (s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 40) || ("item-" + Date.now());
// tone lookup dari daftar kategori {nama,tone}
const toneOf = (nama, kats) => (kats.find((k) => k.nama === nama) || {}).tone || "gray";

// ---------- BERITA (CRUD penuh: draft → review → terbit) ----------
const BERITA_ST = { Draf: "gray", Review: "amber", Terbit: "green" };
function HumasBerita() {
  const toast = useToast();
  const [rows, setRows] = useSharedList("humas_berita", window.AIS_CONTENT.berita.slice());
  const [kats] = useSharedList("humas_kat_berita", window.AIS_CONTENT.katBeritaSeed());
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [form, setForm] = useState(null);
  const [del, setDel] = useState(null);
  const blank = { judul: "", ringkas: "", kategori: kats[0] ? kats[0].nama : "Prestasi", penulis: "Humas ITI", tgl: "05 Jul 2026", img: "blue", unggulan: false, status: "Draf", tags: "", bodyText: "" };
  const list = rows.filter((b) => (filter === "Semua" || (b.status || "Terbit") === filter) && (b.judul + b.ringkas).toLowerCase().includes(q.toLowerCase()));

  function openCreate() { setForm({ mode: "create", data: { ...blank } }); }
  function openEdit(b) { setForm({ mode: "edit", data: { ...b, tags: (b.tags || []).join(", "), bodyText: (b.body || []).join("\n\n"), img: HMS_GKEYS.find((k) => HMS_G[k] === b.img) || "blue" } }); }
  function save() {
    const d = form.data;
    if (!d.judul.trim() || !d.ringkas.trim()) { toast("Judul & ringkasan wajib diisi"); return; }
    const rec = {
      judul: d.judul.trim(), ringkas: d.ringkas.trim(), kategori: d.kategori, penulis: d.penulis || "Humas ITI",
      tgl: d.tgl, iso: d.iso || "2026-07-05", img: HMS_G[d.img] || HMS_G.blue, unggulan: !!d.unggulan, status: d.status,
      baca: d.baca || Math.max(2, Math.round((d.ringkas.length + (d.bodyText || "").length) / 400)),
      views: d.views || 0, tags: (d.tags || "").split(",").map((t) => t.trim()).filter(Boolean),
      body: (d.bodyText || "").split(/\n\n+/).map((p) => p.trim()).filter(Boolean),
    };
    if (form.mode === "create") { setRows((l) => [{ id: hmsSlug(d.judul), ...rec }, ...l]); toast(d.status === "Terbit" ? "Berita terbit — tampil di halaman publik" : "Berita disimpan sebagai " + d.status, "ok"); }
    else { setRows((l) => l.map((x) => x.id === d.id ? { ...x, ...rec } : x)); toast("Berita diperbarui", "ok"); }
    setForm(null);
  }
  function setStatus(id, status) { setRows((l) => l.map((x) => x.id === id ? { ...x, status } : x)); toast("Status → " + status, "ok"); }

  return (
    <div className="anim-in">
      <PageHead title="Berita & Artikel" desc="Kelola konten berita: buat, ubah, hapus, dan alur draft → review → terbit. Berita berstatus Terbit langsung tampil di situs publik."
        actions={<button className="btn btn-primary" onClick={openCreate}><Icon name="plus" size={16} /> Tulis Berita</button>} />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <div className="tb-search" style={{ margin: 0, width: 300 }}><Icon name="search" size={16} /><input placeholder="Cari berita…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <div className="seg">{["Semua", "Draf", "Review", "Terbit"].map((s) => <button key={s} className={filter === s ? "on" : ""} onClick={() => setFilter(s)}>{s}</button>)}</div>
        <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--ink-3)" }}>{list.length} berita</span>
      </div>
      <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th>Judul</th><th>Kategori</th><th>Tanggal</th><th style={{ textAlign: "center" }}>Dibaca</th><th>Status</th><th style={{ width: 200 }}>Aksi</th></tr></thead>
        <tbody>{list.map((b) => (
          <tr key={b.id}>
            <td style={{ fontWeight: 700, maxWidth: 300 }}>{b.judul}{b.unggulan && <Badge tone="orange" style={{ marginLeft: 6 }}>Unggulan</Badge>}</td>
            <td><Badge tone={toneOf(b.kategori, kats)}>{b.kategori}</Badge></td>
            <td style={{ fontSize: 12.5 }}>{b.tgl}</td>
            <td style={{ textAlign: "center", fontFamily: "var(--mono)" }}>{(b.views || 0).toLocaleString("id")}</td>
            <td><Badge tone={BERITA_ST[b.status || "Terbit"]} dot>{b.status || "Terbit"}</Badge></td>
            <td><div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {(b.status || "Terbit") === "Draf" && <button className="btn btn-ghost btn-sm" onClick={() => setStatus(b.id, "Review")}>Review</button>}
              {(b.status || "Terbit") === "Review" && <button className="btn btn-soft btn-sm" onClick={() => setStatus(b.id, "Terbit")}>Terbitkan</button>}
              {(b.status || "Terbit") === "Terbit" && <button className="btn btn-ghost btn-sm" onClick={() => setStatus(b.id, "Draf")}>Tarik</button>}
              <button className="btn btn-ghost btn-sm" title="Ubah" onClick={() => openEdit(b)}><Icon name="edit" size={14} /></button>
              <button className="btn btn-ghost btn-sm" title="Hapus" style={{ color: "var(--red)" }} onClick={() => setDel(b)}><Icon name="trash" size={14} /></button>
            </div></td>
          </tr>
        ))}</tbody>
      </table></div></div>

      {form && (
        <Modal wide title={form.mode === "create" ? "Tulis Berita" : "Ubah Berita"} subtitle="Konten publik · 26.1.x" onClose={() => setForm(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(null)}>Batal</button><button className="btn btn-primary" onClick={save}><Icon name="check" size={16} /> {form.mode === "create" ? "Simpan" : "Simpan Perubahan"}</button></>}>
          <div className="field"><label>Judul <span style={{ color: "var(--red)" }}>*</span></label><input value={form.data.judul} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, judul: e.target.value } }))} placeholder="Judul berita" /></div>
          <div className="field"><label>Ringkasan <span style={{ color: "var(--red)" }}>*</span></label><textarea rows={2} value={form.data.ringkas} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, ringkas: e.target.value } }))} placeholder="Ringkasan singkat (tampil di kartu & meta)" /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 14px" }}>
            <div className="field"><label>Kategori</label><select value={form.data.kategori} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, kategori: e.target.value } }))}>{kats.map((k) => <option key={k.nama}>{k.nama}</option>)}</select></div>
            <div className="field"><label>Tanggal</label><input value={form.data.tgl} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, tgl: e.target.value } }))} placeholder="05 Jul 2026" /></div>
            <div className="field"><label>Status</label><select value={form.data.status} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, status: e.target.value } }))}><option>Draf</option><option>Review</option><option>Terbit</option></select></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" }}>
            <div className="field"><label>Penulis</label><input value={form.data.penulis} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, penulis: e.target.value } }))} /></div>
            <div className="field"><label>Tags (pisah koma)</label><input value={form.data.tags} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, tags: e.target.value } }))} placeholder="Riset, AI, Mahasiswa" /></div>
          </div>
          <div className="field"><label>Banner (warna gradien)</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{HMS_GKEYS.map((g) => (
              <button key={g} type="button" onClick={() => setForm((s) => ({ ...s, data: { ...s.data, img: g } }))} title={g} style={{ width: 40, height: 28, borderRadius: 8, background: HMS_G[g], border: form.data.img === g ? "2.5px solid var(--ink)" : "2.5px solid transparent", cursor: "pointer" }} />
            ))}</div>
          </div>
          <div className="field" style={{ margin: 0 }}><label>Isi Berita (pisah paragraf dengan baris kosong)</label><textarea rows={5} value={form.data.bodyText} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, bodyText: e.target.value } }))} placeholder="Paragraf 1…\n\nParagraf 2…" /></div>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600, cursor: "pointer", marginTop: 10 }}><input type="checkbox" checked={form.data.unggulan} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, unggulan: e.target.checked } }))} style={{ width: 15, height: 15, accentColor: "var(--orange)" }} /> Jadikan berita unggulan (headline)</label>
        </Modal>
      )}
      {del && (
        <Modal title="Hapus Berita?" subtitle={del.judul} onClose={() => setDel(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setDel(null)}>Batal</button><button className="btn btn-primary" style={{ background: "var(--red)" }} onClick={() => { setRows((l) => l.filter((x) => x.id !== del.id)); toast("Berita dihapus", "ok"); setDel(null); }}><Icon name="trash" size={15} /> Ya, Hapus</button></>}>
          <div style={{ display: "flex", gap: 12, padding: 14, background: "var(--red-bg)", borderRadius: 12 }}><Icon name="warn" size={22} style={{ color: "var(--red)", flexShrink: 0 }} /><div style={{ fontSize: 13.5, lineHeight: 1.55 }}>Menghapus <b>{del.judul}</b> akan menghilangkannya dari situs publik. Tindakan ini tidak dapat dibatalkan.</div></div>
        </Modal>
      )}
    </div>
  );
}

export { HumasBerita };
