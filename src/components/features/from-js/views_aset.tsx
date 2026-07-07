/* eslint-disable */
// @ts-nocheck
// Generated from js/views_aset.jsx by scripts/port-js-ssot.mjs.
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
// AIS — Views: ASET & SARANA-PRASARANA (service: ast)
// 14 entitas Level 4 · 4 flow (Sequence-Aset.md):
//  F1 Registrasi & Master: 20.1.1 Data Induk · 20.3.1 Kategori · 20.3.2 Lokasi · 20.3.5 Label
//  F2 Operasional: 20.1.3 Pemeliharaan · 20.3.3 Mutasi · 20.2.1 Booking · 20.3.4 Stock Opname
//  F3 Penyusutan & Penghapusan: 20.1.2 · 20.1.4  (jurnal ⇒ acc)
//  F4 Persediaan BHP: 20.4.1 Master · 20.4.2 Stok · 20.4.3 Permintaan · 20.4.4 Distribusi
// ============================================================
const astRp = (n) => "Rp " + Math.round(n).toLocaleString("id");

// ---------- Master acuan ----------
const AST_KATEGORI = [
  { kode: "KTG-01", nama_kategori: "Perangkat TIK & Komputer", umur_ekonomis_thn: 4, metode_susut: "Garis Lurus", tarif_susut: 25 },
  { kode: "KTG-02", nama_kategori: "Mebel & Furnitur", umur_ekonomis_thn: 8, metode_susut: "Garis Lurus", tarif_susut: 12.5 },
  { kode: "KTG-03", nama_kategori: "Peralatan Laboratorium", umur_ekonomis_thn: 8, metode_susut: "Garis Lurus", tarif_susut: 12.5 },
  { kode: "KTG-04", nama_kategori: "Kendaraan Dinas", umur_ekonomis_thn: 10, metode_susut: "Garis Lurus", tarif_susut: 10 },
  { kode: "KTG-05", nama_kategori: "Gedung & Bangunan", umur_ekonomis_thn: 20, metode_susut: "Garis Lurus", tarif_susut: 5 },
];
const AST_LOKASI = [
  { kode: "GD-FST", nama_gedung: "Gedung FST", alamat: "Kampus 1", jumlah_lantai: 5, penanggung_jawab: "Dr. Imam Marzuki", status: "Aktif" },
  { kode: "GD-LAB", nama_gedung: "Laboratorium Terpadu", alamat: "Kampus 2", jumlah_lantai: 3, penanggung_jawab: "Dewi Lestari, M.Kom", status: "Aktif" },
  { kode: "GD-REK", nama_gedung: "Gedung Rektorat", alamat: "Kampus 1", jumlah_lantai: 4, penanggung_jawab: "Ir. Bambang Wijaya", status: "Aktif" },
  { kode: "GD-PERP", nama_gedung: "Gedung Perpustakaan", alamat: "Kampus 1", jumlah_lantai: 3, penanggung_jawab: "Hj. Maryam, S.IP", status: "Aktif" },
];
// umur → dari kategori
const umurOf = (ktg) => (AST_KATEGORI.find((k) => k.kode === ktg) || {}).umur_ekonomis_thn || 4;
// penyusutan garis lurus (residu 10%), s.d. Jun 2026
function astSusut(perolehan, ktg, thn) {
  const residu = perolehan * 0.1;
  const umurBln = umurOf(ktg) * 12;
  const bebanBln = (perolehan - residu) / umurBln;
  const jalan = Math.max(0, (2026 - thn) * 12 + 6);
  const akum = Math.min(bebanBln * jalan, perolehan - residu);
  return { residu, bebanBln, akum, nilaiBuku: perolehan - akum, umurBln };
}
const AST_KONDISI = { "Baik": "green", "Perlu Kalibrasi": "amber", "Rusak Ringan": "amber", "Rusak Berat": "red" };
const AST_ASET = [
  { kode_aset: "TIK.2024.0451", nama_aset: "PC Workstation Dell OptiPlex 7010", kategori: "KTG-01", lokasi: "GD-LAB · Lab Komputer 2", nilai_perolehan: 14500000, tanggal_perolehan: 2024, sumber_dana: "APBN", kondisi: "Baik", status: "Aktif", bast_id: "BAST-2024-0102" },
  { kode_aset: "TIK.2020.0012", nama_aset: "Server HPE ProLiant DL380", kategori: "KTG-01", lokasi: "GD-FST · Data Center", nilai_perolehan: 96000000, tanggal_perolehan: 2020, sumber_dana: "APBN", kondisi: "Rusak Ringan", status: "Aktif", bast_id: "BAST-2020-0044" },
  { kode_aset: "LAB.2022.0094", nama_aset: "Osiloskop Digital GW Instek", kategori: "KTG-03", lokasi: "GD-LAB · Lab Elektro", nilai_perolehan: 32500000, tanggal_perolehan: 2022, sumber_dana: "PNBP", kondisi: "Perlu Kalibrasi", status: "Aktif", bast_id: "BAST-2022-0071" },
  { kode_aset: "MBL.2021.0623", nama_aset: "Kursi Kuliah Ergonomis (lot 50)", kategori: "KTG-02", lokasi: "GD-FST · Ruang FST-305", nilai_perolehan: 27500000, tanggal_perolehan: 2021, sumber_dana: "PNBP", kondisi: "Baik", status: "Aktif", bast_id: "BAST-2021-0130" },
  { kode_aset: "TIK.2023.0188", nama_aset: "Proyektor Epson EB-X51 (8 unit)", kategori: "KTG-01", lokasi: "GD-FST · Ruang FST-301", nilai_perolehan: 48000000, tanggal_perolehan: 2023, sumber_dana: "APBN", kondisi: "Baik", status: "Aktif", bast_id: "BAST-2023-0088" },
  { kode_aset: "KND.2019.0007", nama_aset: "Minibus Toyota Hiace", kategori: "KTG-04", lokasi: "GD-REK · Garasi", nilai_perolehan: 465000000, tanggal_perolehan: 2019, sumber_dana: "APBN", kondisi: "Baik", status: "Aktif", bast_id: "BAST-2019-0011" },
];

// ---------- Dashboard ----------
function AstDashboard({ nav }) {
  const R = window.AIS_ROLES; const p = R.personas.aset;
  const totPerolehan = AST_ASET.reduce((a, b) => a + b.nilai_perolehan, 0);
  const totBuku = AST_ASET.reduce((a, b) => a + astSusut(b.nilai_perolehan, b.kategori, b.tanggal_perolehan).nilaiBuku, 0);
  const bebanBln = AST_ASET.reduce((a, b) => a + astSusut(b.nilai_perolehan, b.kategori, b.tanggal_perolehan).bebanBln, 0);
  const tiles = [
    { label: "Nilai Perolehan", value: astRp(totPerolehan), meta: AST_ASET.length + " aset aktif", ic: "box", c: "var(--orange-600)", bg: "var(--orange-50)", sm: true },
    { label: "Nilai Buku", value: astRp(totBuku), meta: "setelah akumulasi susut", ic: "scale", c: "var(--blue)", bg: "var(--blue-bg)", sm: true },
    { label: "Penyusutan / Bln", value: astRp(bebanBln), meta: "garis lurus", ic: "chart", c: "var(--purple)", bg: "var(--purple-bg)", sm: true },
    { label: "Perlu Perhatian", value: "3", meta: "susut, opname, BHP", ic: "wrench", c: "var(--red)", bg: "var(--red-bg)" },
  ];
  const alerts = [
    ["Penyusutan periode Jun 2026 belum diposting", "Jalankan batch → jurnal ke Akuntansi", "purple", "ast_penyusutan"],
    ["2 BHP di bawah stok minimum", "Kertas A4 & Toner — usulkan pengadaan", "amber", "ast_bhp"],
    ["Stock opname triwulan II belum selesai", "Lab Komputer 2 — selisih 1 unit", "blue", "ast_opname"],
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="aset" sub="Kelola siklus hidup aset (BMN): registrasi, penyusutan, pemeliharaan, mutasi, penghapusan, booking fasilitas, dan persediaan habis pakai."
        action={<button className="btn btn-primary" onClick={() => nav("ast_inventaris")}><Icon name="box" size={17} /> Data Induk Aset</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 22 }}>
        {tiles.map((t) => (<div key={t.label} className="stat card" style={{ background: t.bg, border: "none" }}><Icon name={t.ic} size={26} className="si" style={{ color: t.c }} /><div className="label" style={{ color: t.c }}>{t.label}</div><div className="value" style={{ color: t.c, fontSize: t.sm ? 21 : 30 }}>{t.value}</div><div className="meta" style={{ color: t.c }}>{t.meta}</div></div>))}
      </div>
      <div className="grid" style={{ gridTemplateColumns: "1.15fr 1fr" }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="box" size={19} style={{ color: "var(--orange-600)" }} /><h3>Nilai Buku per Kategori</h3></div>
          <div className="card-pad" style={{ display: "grid", gap: 13 }}>
            {AST_KATEGORI.slice(0, 4).map((k) => {
              const items = AST_ASET.filter((a) => a.kategori === k.kode);
              const buku = items.reduce((s, a) => s + astSusut(a.nilai_perolehan, a.kategori, a.tanggal_perolehan).nilaiBuku, 0);
              const per = items.reduce((s, a) => s + a.nilai_perolehan, 0);
              const pct = per ? Math.round(buku / per * 100) : 0;
              return (<div key={k.kode}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}><span style={{ fontWeight: 600 }}>{k.nama_kategori}</span><b className="mono">{items.length ? astRp(buku) : "—"}</b></div><div className="prog"><i style={{ width: pct + "%", background: "var(--orange-500, var(--orange-600))" }} /></div></div>);
            })}
          </div>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="flag" size={19} style={{ color: "var(--red)" }} /><h3>Perlu Tindakan</h3></div>
          <div>
            {alerts.map(([t, d, tone, target], i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "13px 22px", borderBottom: i < alerts.length - 1 ? "1px solid var(--line)" : "none", alignItems: "center" }}>
                <span className="dot" style={{ background: `var(--${tone})`, width: 9, height: 9, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 700, fontSize: 13 }}>{t}</div><div style={{ fontSize: 12, color: "var(--ink-3)" }}>{d}</div></div>
                <button className="btn btn-soft btn-sm" onClick={() => nav(target)}>Buka</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- 20.1.1 Data Induk Aset (rich + detail + create/edit/delete) ----------
function AstInventaris() {
  const toast = useToast();
  const [rows, setRows] = useState(AST_ASET.map((a, i) => ({ __id: i, ...a })));
  const [q, setQ] = useState("");
  const [detail, setDetail] = useState(null);
  const [form, setForm] = useState(null);
  const [del, setDel] = useState(null);
  const blank = { nama_aset: "", kategori: "KTG-01", lokasi: "", nilai_perolehan: "", tanggal_perolehan: 2026, sumber_dana: "APBN", kondisi: "Baik", status: "Aktif", bast_id: "" };
  const list = rows.filter((a) => (a.nama_aset + a.kode_aset + a.lokasi).toLowerCase().includes(q.toLowerCase()));
  function save() {
    const d = form.data;
    if (!d.nama_aset.trim() || !d.nilai_perolehan) { toast("Nama aset & nilai perolehan wajib diisi"); return; }
    if (form.mode === "create") {
      const kode = (AST_KATEGORI.find((k) => k.kode === d.kategori)?.nama_kategori.slice(0, 3).toUpperCase() || "AST") + "." + d.tanggal_perolehan + "." + String(1000 + rows.length).slice(1);
      setRows((r) => [...r, { __id: Date.now(), kode_aset: kode, ...d, nilai_perolehan: +d.nilai_perolehan }]);
      toast("Aset dibuat + label QR dicetak (kapitalisasi)", "ok");
    } else {
      setRows((r) => r.map((x) => x.__id === d.__id ? { ...d, nilai_perolehan: +d.nilai_perolehan } : x));
      toast("Data aset diperbarui", "ok");
    }
    setForm(null);
  }
  return (
    <div className="anim-in">
      <PageHead title="Data Induk Aset (BMN)" desc="Registrasi barang milik lembaga — lahir dari BAST pengadaan/hibah, kapitalisasi otomatis, ber-label QR."
        actions={<button className="btn btn-primary" onClick={() => setForm({ mode: "create", data: { __id: -1, ...blank } })}><Icon name="plus" size={16} /> Tambah Aset</button>} />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <div className="tb-search" style={{ margin: 0, width: 340 }}><Icon name="search" size={16} /><input placeholder="Cari nama, kode, atau lokasi…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--ink-3)" }}>{list.length} aset</span>
      </div>
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Kode Aset</th><th>Nama Barang</th><th>Lokasi</th><th style={{ textAlign: "right" }}>Nilai Perolehan</th><th style={{ textAlign: "right" }}>Nilai Buku</th><th>Kondisi</th><th></th></tr></thead>
            <tbody>
              {list.map((a) => {
                const s = astSusut(a.nilai_perolehan, a.kategori, a.tanggal_perolehan);
                return (
                  <tr key={a.__id} style={{ cursor: "pointer" }} onClick={() => setDetail(a)}>
                    <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{a.kode_aset}</td>
                    <td style={{ fontWeight: 700 }}>{a.nama_aset}</td>
                    <td style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{a.lokasi}</td>
                    <td style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{astRp(a.nilai_perolehan)}</td>
                    <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{astRp(s.nilaiBuku)}</td>
                    <td><Badge tone={AST_KONDISI[a.kondisi]} dot={a.kondisi.includes("Rusak")}>{a.kondisi}</Badge></td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: "flex", gap: 4 }}>
                        <button className="btn btn-ghost btn-sm" title="Ubah" onClick={() => setForm({ mode: "edit", data: { ...a } })}><Icon name="edit" size={14} /></button>
                        <button className="btn btn-ghost btn-sm" title="Hapus" style={{ color: "var(--red)" }} onClick={() => setDel(a)}><Icon name="trash" size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {detail && (() => {
        const s = astSusut(detail.nilai_perolehan, detail.kategori, detail.tanggal_perolehan);
        const ktg = AST_KATEGORI.find((k) => k.kode === detail.kategori);
        return (
          <Modal wide title={detail.nama_aset} subtitle={detail.kode_aset + " · " + (ktg ? ktg.nama_kategori : detail.kategori)} onClose={() => setDetail(null)}
            footer={<button className="btn btn-ghost" onClick={() => setDetail(null)}>Tutup</button>}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
              {[["Lokasi", detail.lokasi], ["Sumber Dana", detail.sumber_dana], ["Tahun Perolehan", detail.tanggal_perolehan], ["Umur Ekonomis", umurOf(detail.kategori) + " tahun"], ["Kondisi", detail.kondisi], ["No. BAST", detail.bast_id]].map(([l, v]) => (
                <div key={l} style={{ padding: 12, background: "var(--surface-2)", borderRadius: 11 }}><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{l}</div><div style={{ fontWeight: 700, fontSize: 13, marginTop: 3 }}>{v}</div></div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "0 0 10px" }}><Icon name="chart" size={15} style={{ color: "var(--purple)" }} /><b style={{ fontSize: 13.5 }}>Penyusutan Garis Lurus</b></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
              {[["Nilai Perolehan", astRp(detail.nilai_perolehan), "ink"], ["Beban / Bulan", astRp(s.bebanBln), "purple"], ["Akumulasi Susut", astRp(s.akum), "amber"], ["Nilai Buku", astRp(s.nilaiBuku), "green"]].map(([l, v, c]) => (
                <div key={l} style={{ padding: 13, borderRadius: 11, background: c === "ink" ? "var(--surface-2)" : `var(--${c}-bg)` }}><div style={{ fontSize: 11, color: c === "ink" ? "var(--ink-3)" : `var(--${c})`, fontWeight: 700 }}>{l}</div><div className="mono" style={{ fontWeight: 800, fontSize: 15, marginTop: 3, color: c === "ink" ? "var(--ink)" : `var(--${c})` }}>{v}</div></div>
              ))}
            </div>
          </Modal>
        );
      })()}

      {form && (
        <Modal wide title={(form.mode === "create" ? "Tambah" : "Ubah") + " Aset"} subtitle="Data Induk Aset · 20.1.1" onClose={() => setForm(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(null)}>Batal</button><button className="btn btn-primary" onClick={save}><Icon name="check" size={16} /> {form.mode === "create" ? "Simpan & Kapitalisasi" : "Simpan Perubahan"}</button></>}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <div className="field" style={{ gridColumn: "1 / -1" }}><label>Nama Aset <span style={{ color: "var(--red)" }}>*</span></label><input value={form.data.nama_aset} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, nama_aset: e.target.value } }))} placeholder="cth. PC Workstation Dell" /></div>
            <div className="field"><label>Kategori</label><select value={form.data.kategori} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, kategori: e.target.value } }))}>{AST_KATEGORI.map((k) => <option key={k.kode} value={k.kode}>{k.nama_kategori}</option>)}</select></div>
            <div className="field"><label>Lokasi / Ruang</label><input value={form.data.lokasi} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, lokasi: e.target.value } }))} placeholder="cth. GD-FST · Ruang 301" /></div>
            <div className="field"><label>Nilai Perolehan (Rp) <span style={{ color: "var(--red)" }}>*</span></label><input type="number" value={form.data.nilai_perolehan} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, nilai_perolehan: e.target.value } }))} placeholder="0" /></div>
            <div className="field"><label>Tahun Perolehan</label><input type="number" value={form.data.tanggal_perolehan} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, tanggal_perolehan: +e.target.value } }))} /></div>
            <div className="field"><label>Sumber Dana</label><select value={form.data.sumber_dana} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, sumber_dana: e.target.value } }))}><option>APBN</option><option>PNBP</option><option>Hibah</option><option>Kerjasama</option></select></div>
            <div className="field"><label>Kondisi</label><select value={form.data.kondisi} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, kondisi: e.target.value } }))}>{Object.keys(AST_KONDISI).map((k) => <option key={k}>{k}</option>)}</select></div>
            <div className="field"><label>No. BAST</label><input value={form.data.bast_id} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, bast_id: e.target.value } }))} placeholder="BAST-2026-…" /></div>
          </div>
          <div style={{ fontSize: 11.5, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 6 }}><Icon name="info" size={13} /> Menyimpan aset memicu kapitalisasi & cetak label QR otomatis.</div>
        </Modal>
      )}
      {del && (
        <Modal title="Hapus Aset?" subtitle={del.kode_aset} onClose={() => setDel(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setDel(null)}>Batal</button><button className="btn btn-primary" style={{ background: "var(--red)" }} onClick={() => { setRows((r) => r.filter((x) => x.__id !== del.__id)); toast("Aset dihapus (soft-delete + audit log)", "ok"); setDel(null); }}><Icon name="trash" size={15} /> Ya, Hapus</button></>}>
          <div style={{ display: "flex", gap: 12, padding: 14, background: "var(--red-bg)", borderRadius: 12 }}><Icon name="warn" size={22} style={{ color: "var(--red)", flexShrink: 0 }} /><div style={{ fontSize: 13.5, lineHeight: 1.55 }}>Menghapus <b>{del.nama_aset}</b> ({del.kode_aset}). Untuk aset ber-nilai buku, gunakan <b>Penghapusan</b> (workflow + jurnal). Soft-delete tercatat di Audit Log.</div></div>
        </Modal>
      )}
    </div>
  );
}

// ---------- Master CRUD generik (Kategori 20.3.1, Lokasi 20.3.2) ----------
function MasterTable({ title, desc, cols, seed, mkBlank, labelKey }) {
  const toast = useToast();
  const [rows, setRows] = useState(seed.map((s, i) => ({ __id: i, ...s })));
  const [form, setForm] = useState(null);
  const [del, setDel] = useState(null);
  function save() {
    const d = form.data;
    const req = cols.find((c) => c.req);
    if (req && !String(d[req.k] ?? "").trim()) { toast(req.label + " wajib diisi"); return; }
    if (form.mode === "create") { setRows((r) => [...r, { ...d, __id: Date.now() }]); toast("Data master ditambahkan", "ok"); }
    else { setRows((r) => r.map((x) => x.__id === d.__id ? d : x)); toast("Data master diperbarui", "ok"); }
    setForm(null);
  }
  return (
    <div className="anim-in">
      <PageHead title={title} desc={desc}
        actions={<button className="btn btn-primary" onClick={() => setForm({ mode: "create", data: { __id: -1, ...mkBlank() } })}><Icon name="plus" size={16} /> Tambah</button>} />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr>{cols.map((c) => <th key={c.k} style={c.num ? { textAlign: "center" } : null}>{c.label}</th>)}<th></th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.__id}>
                  {cols.map((c, ci) => <td key={c.k} className={c.mono ? "mono" : ""} style={{ fontWeight: ci === 1 ? 700 : 400, textAlign: c.num ? "center" : "left", fontSize: c.mono ? 12.5 : 13.5 }}>{c.fmt ? c.fmt(r[c.k]) : r[c.k]}</td>)}
                  <td><div style={{ display: "flex", gap: 4 }}><button className="btn btn-ghost btn-sm" onClick={() => setForm({ mode: "edit", data: { ...r } })}><Icon name="edit" size={14} /></button><button className="btn btn-ghost btn-sm" style={{ color: "var(--red)" }} onClick={() => setDel(r)}><Icon name="trash" size={14} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {form && (
        <Modal title={(form.mode === "create" ? "Tambah" : "Ubah") + " — " + title} onClose={() => setForm(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(null)}>Batal</button><button className="btn btn-primary" onClick={save}><Icon name="check" size={16} /> Simpan</button></>}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            {cols.map((c) => (
              <div key={c.k} className="field" style={c.wide ? { gridColumn: "1 / -1" } : null}>
                <label>{c.label}{c.req && <span style={{ color: "var(--red)" }}> *</span>}</label>
                {c.opts ? <select value={form.data[c.k]} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, [c.k]: e.target.value } }))}>{c.opts.map((o) => <option key={o}>{o}</option>)}</select>
                  : <input type={c.num ? "number" : "text"} value={form.data[c.k]} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, [c.k]: c.num ? +e.target.value : e.target.value } }))} />}
              </div>
            ))}
          </div>
        </Modal>
      )}
      {del && (
        <Modal title="Hapus Data Master?" subtitle={del[labelKey]} onClose={() => setDel(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setDel(null)}>Batal</button><button className="btn btn-primary" style={{ background: "var(--red)" }} onClick={() => { setRows((r) => r.filter((x) => x.__id !== del.__id)); toast("Data master dihapus", "ok"); setDel(null); }}><Icon name="trash" size={15} /> Ya, Hapus</button></>}>
          <div style={{ display: "flex", gap: 12, padding: 14, background: "var(--red-bg)", borderRadius: 12 }}><Icon name="warn" size={22} style={{ color: "var(--red)", flexShrink: 0 }} /><div style={{ fontSize: 13.5, lineHeight: 1.55 }}>Menghapus <b>{del[labelKey]}</b> dapat memengaruhi aset yang mereferensikannya. Soft-delete + audit log.</div></div>
        </Modal>
      )}
    </div>
  );
}
function AstKategori() {
  return <MasterTable title="Kategori Aset" desc="Master kategori — acuan umur ekonomis & tarif penyusutan (20.3.1)." labelKey="nama_kategori"
    cols={[{ k: "kode", label: "Kode", mono: true }, { k: "nama_kategori", label: "Nama Kategori", req: true, wide: true }, { k: "umur_ekonomis_thn", label: "Umur (thn)", num: true }, { k: "metode_susut", label: "Metode", opts: ["Garis Lurus", "Saldo Menurun"] }, { k: "tarif_susut", label: "Tarif %", num: true, fmt: (v) => v + "%" }]}
    seed={AST_KATEGORI} mkBlank={() => ({ kode: "KTG-" + String(AST_KATEGORI.length + 1).padStart(2, "0"), nama_kategori: "", umur_ekonomis_thn: 4, metode_susut: "Garis Lurus", tarif_susut: 25 })} />;
}
function AstLokasi() {
  return <MasterTable title="Lokasi & Gedung" desc="Master lokasi/gedung sebagai acuan penempatan aset (20.3.2)." labelKey="nama_gedung"
    cols={[{ k: "kode", label: "Kode", mono: true }, { k: "nama_gedung", label: "Nama Gedung", req: true, wide: true }, { k: "alamat", label: "Alamat" }, { k: "jumlah_lantai", label: "Lantai", num: true }, { k: "penanggung_jawab", label: "Penanggung Jawab" }, { k: "status", label: "Status", opts: ["Aktif", "Renovasi", "Nonaktif"] }]}
    seed={AST_LOKASI} mkBlank={() => ({ kode: "GD-", nama_gedung: "", alamat: "Kampus 1", jumlah_lantai: 1, penanggung_jawab: "", status: "Aktif" })} />;
}

// ---------- 20.3.5 Label / Barcode ----------
function AstLabel() {
  const toast = useToast();
  const [print, setPrint] = useState(null);
  return (
    <div className="anim-in">
      <PageHead title="Label & Barcode Aset" desc="Cetak & lacak label QR aset (20.3.5). Label ditempel saat kapitalisasi dan dipakai saat stock opname." />
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
        {AST_ASET.map((a) => (
          <div key={a.kode_aset} className="card card-pad" style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 62, height: 62, borderRadius: 12, background: "#fff", border: "1px solid var(--line-2)", display: "grid", placeItems: "center", flexShrink: 0 }}>
              <div style={{ width: 46, height: 46, display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 1.5 }}>{Array.from({ length: 25 }).map((_, i) => <span key={i} style={{ background: (i * 7 + a.kode_aset.length) % 3 ? "#111" : "transparent", borderRadius: 1 }} />)}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{a.kode_aset}</div>
              <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.3, marginBottom: 6 }}>{a.nama_aset}</div>
              <button className="btn btn-soft btn-sm" onClick={() => setPrint(a)}><Icon name="doc" size={13} /> Cetak Label</button>
            </div>
          </div>
        ))}
      </div>
      {print && (
        <Modal title="Cetak Label QR" subtitle={print.kode_aset} onClose={() => setPrint(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setPrint(null)}>Tutup</button><button className="btn btn-primary" onClick={() => { setPrint(null); toast("Label QR dikirim ke antrian cetak", "ok"); }}><Icon name="doc" size={15} /> Kirim ke Printer</button></>}>
          <div style={{ border: "2px solid #111", borderRadius: 10, padding: 18, textAlign: "center", maxWidth: 260, margin: "0 auto", background: "#fff", color: "#111" }}>
            <div style={{ fontWeight: 800, fontSize: 13 }}>UNIVERSITAS · BMN</div>
            <div style={{ width: 120, height: 120, margin: "12px auto", display: "grid", gridTemplateColumns: "repeat(9,1fr)", gap: 2 }}>{Array.from({ length: 81 }).map((_, i) => <span key={i} style={{ background: (i * 3 + print.kode_aset.length) % 3 ? "#111" : "transparent" }} />)}</div>
            <div className="mono" style={{ fontSize: 12, fontWeight: 700 }}>{print.kode_aset}</div>
            <div style={{ fontSize: 11, marginTop: 2 }}>{print.nama_aset}</div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ---------- 20.1.3 Pemeliharaan ----------
function AstPemeliharaan() {
  const toast = useToast();
  const [tab, setTab] = useState("tiket");
  const [list, setList] = useState([
    { no: "MNT-0231", aset: "AC Ruang FST-301", jenis: "Korektif", lapor: "Dosen TI", biaya: 850000, prioritas: "tinggi", status: "baru" },
    { no: "MNT-0232", aset: "Proyektor Lab-AI", jenis: "Korektif", lapor: "Laboran", biaya: 1200000, prioritas: "tinggi", status: "baru" },
    { no: "MNT-0230", aset: "Lift Gedung FST", jenis: "Preventif", lapor: "Terjadwal", biaya: 3500000, prioritas: "sedang", status: "proses" },
    { no: "MNT-0228", aset: "Server HPE ProLiant", jenis: "Korektif", lapor: "PUSTIPANDA", biaya: 6000000, prioritas: "tinggi", status: "proses" },
    { no: "MNT-0225", aset: "Genset 250 kVA", jenis: "Preventif", lapor: "Terjadwal", biaya: 2400000, prioritas: "rendah", status: "selesai" },
  ]);
  const [form, setForm] = useState(false);
  const [nf, setNf] = useState({ aset: "", jenis: "Preventif", interval: "Bulanan", vendor: "" });
  const pr = { tinggi: "red", sedang: "amber", rendah: "gray" };
  const st = { baru: ["Baru", "amber"], proses: ["Dikerjakan", "blue"], selesai: ["Selesai", "green"] };
  const jadwal = [["Bulanan", "AC & Genset", "01 Jul 2026"], ["Triwulan", "Lift & Elevator", "15 Jul 2026"], ["Tahunan", "Instalasi Listrik", "01 Sep 2026"]];
  function next(no) { setList((l) => l.map((x) => x.no === no ? { ...x, status: x.status === "baru" ? "proses" : "selesai" } : x)); toast("Status tiket diperbarui", "ok"); }
  return (
    <div className="anim-in">
      <PageHead title="Pemeliharaan" desc="Preventif terjadwal + korektif (tiket dari BAU/ITSM). Biaya tercatat sebagai beban pemeliharaan."
        actions={<button className="btn btn-primary" onClick={() => setForm(true)}><Icon name="plus" size={16} /> Jadwalkan Preventif</button>} />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        <button className={"btn btn-sm " + (tab === "tiket" ? "btn-soft" : "btn-ghost")} onClick={() => setTab("tiket")}>Tiket Korektif</button>
        <button className={"btn btn-sm " + (tab === "jadwal" ? "btn-soft" : "btn-ghost")} onClick={() => setTab("jadwal")}>Jadwal Preventif</button>
      </div>
      {tab === "tiket" ? (
        <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>No. Tiket</th><th>Aset</th><th>Jenis</th><th>Pelapor</th><th style={{ textAlign: "right" }}>Biaya</th><th>Prioritas</th><th>Status</th><th></th></tr></thead>
          <tbody>{list.map((x) => (<tr key={x.no}>
            <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{x.no}</td>
            <td style={{ fontWeight: 700 }}>{x.aset}</td>
            <td><Badge tone={x.jenis === "Preventif" ? "blue" : "gray"}>{x.jenis}</Badge></td>
            <td style={{ fontSize: 13, color: "var(--ink-2)" }}>{x.lapor}</td>
            <td style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{astRp(x.biaya)}</td>
            <td><Badge tone={pr[x.prioritas]} dot={x.prioritas === "tinggi"}>{x.prioritas}</Badge></td>
            <td><Badge tone={st[x.status][1]} dot>{st[x.status][0]}</Badge></td>
            <td>{x.status !== "selesai" ? <button className="btn btn-soft btn-sm" onClick={() => next(x.no)}>{x.status === "baru" ? "Kerjakan" : "Selesaikan"}</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>✓</span>}</td>
          </tr>))}</tbody>
        </table></div></div>
      ) : (
        <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>Interval</th><th>Objek</th><th>Jadwal Berikutnya</th><th>Status</th></tr></thead>
          <tbody>{jadwal.map(([iv, o, t], i) => (<tr key={i}><td><Badge tone="blue">{iv}</Badge></td><td style={{ fontWeight: 700 }}>{o}</td><td className="mono" style={{ fontSize: 12.5 }}>{t}</td><td><Badge tone="green" dot>Terjadwal</Badge></td></tr>))}</tbody>
        </table></div></div>
      )}
      {form && (
        <Modal title="Jadwalkan Pemeliharaan Preventif" subtitle="20.1.3" onClose={() => setForm(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(false)}>Batal</button><button className="btn btn-primary" onClick={() => { if (!nf.aset.trim()) { toast("Objek/aset wajib diisi"); return; } setForm(false); toast("Jadwal preventif dibuat", "ok"); }}><Icon name="check" size={16} /> Simpan Jadwal</button></>}>
          <div className="field"><label>Objek / Aset <span style={{ color: "var(--red)" }}>*</span></label><input value={nf.aset} onChange={(e) => setNf({ ...nf, aset: e.target.value })} placeholder="cth. AC & Genset" /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <div className="field"><label>Jenis</label><select value={nf.jenis} onChange={(e) => setNf({ ...nf, jenis: e.target.value })}><option>Preventif</option><option>Korektif</option></select></div>
            <div className="field"><label>Interval</label><select value={nf.interval} onChange={(e) => setNf({ ...nf, interval: e.target.value })}><option>Bulanan</option><option>Triwulan</option><option>Semester</option><option>Tahunan</option></select></div>
          </div>
          <div className="field"><label>Vendor / Pelaksana</label><input value={nf.vendor} onChange={(e) => setNf({ ...nf, vendor: e.target.value })} placeholder="opsional" /></div>
        </Modal>
      )}
    </div>
  );
}

// ---------- 20.3.3 Mutasi / Transfer ----------
function AstMutasi() {
  const toast = useToast();
  const [rows, setRows] = useState([
    { no: "MUT-0044", aset: "Proyektor Epson (2 unit)", asal: "GD-FST · FST-301", tujuan: "GD-LAB · Lab-AI", tanggal: "20 Jun 2026", alasan: "Kebutuhan praktikum", status: "selesai" },
    { no: "MUT-0045", aset: "PC Workstation Dell", asal: "GD-LAB · Lab Komputer 2", tujuan: "GD-FST · Ruang Dosen", tanggal: "23 Jun 2026", alasan: "Rotasi perangkat", status: "menunggu" },
  ]);
  const [form, setForm] = useState(false);
  const [nf, setNf] = useState({ aset: "", asal: "", tujuan: "", alasan: "" });
  function save() {
    if (!nf.aset.trim() || !nf.tujuan.trim()) { toast("Aset & lokasi tujuan wajib diisi"); return; }
    setRows((r) => [{ no: "MUT-00" + (46 + r.length), ...nf, tanggal: "24 Jun 2026", status: "menunggu" }, ...r]);
    setForm(false); setNf({ aset: "", asal: "", tujuan: "", alasan: "" });
    toast("Mutasi diajukan — menunggu Berita Acara", "ok");
  }
  return (
    <div className="anim-in">
      <PageHead title="Mutasi / Transfer Aset" desc="Perpindahan aset antar unit/lokasi ber-Berita Acara (20.3.3)."
        actions={<button className="btn btn-primary" onClick={() => setForm(true)}><Icon name="plus" size={16} /> Buat Mutasi</button>} />
      <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th>No.</th><th>Aset</th><th>Dari</th><th>Ke</th><th>Alasan</th><th>Tanggal</th><th>Status</th><th></th></tr></thead>
        <tbody>{rows.map((x) => (<tr key={x.no}>
          <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{x.no}</td>
          <td style={{ fontWeight: 700 }}>{x.aset}</td>
          <td style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{x.asal}</td>
          <td style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{x.tujuan}</td>
          <td style={{ fontSize: 12.5 }}>{x.alasan}</td>
          <td style={{ fontSize: 12.5 }}>{x.tanggal}</td>
          <td><Badge tone={x.status === "selesai" ? "green" : "amber"} dot>{x.status === "selesai" ? "Selesai" : "Menunggu BA"}</Badge></td>
          <td>{x.status === "menunggu" ? <button className="btn btn-soft btn-sm" onClick={() => { setRows((r) => r.map((y) => y.no === x.no ? { ...y, status: "selesai" } : y)); toast("Berita Acara mutasi diterbitkan", "ok"); }}>Terbitkan BA</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>✓</span>}</td>
        </tr>))}</tbody>
      </table></div></div>
      {form && (
        <Modal title="Buat Mutasi Aset" subtitle="20.3.3" onClose={() => setForm(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(false)}>Batal</button><button className="btn btn-primary" onClick={save}><Icon name="check" size={16} /> Ajukan Mutasi</button></>}>
          <div className="field"><label>Aset <span style={{ color: "var(--red)" }}>*</span></label><select value={nf.aset} onChange={(e) => { const a = AST_ASET.find((x) => x.nama_aset === e.target.value); setNf({ ...nf, aset: e.target.value, asal: a ? a.lokasi : "" }); }}><option value="">— pilih aset —</option>{AST_ASET.map((a) => <option key={a.kode_aset}>{a.nama_aset}</option>)}</select></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <div className="field"><label>Lokasi Asal</label><input value={nf.asal} readOnly style={{ background: "var(--surface-2)", color: "var(--ink-3)" }} /></div>
            <div className="field"><label>Lokasi Tujuan <span style={{ color: "var(--red)" }}>*</span></label><input value={nf.tujuan} onChange={(e) => setNf({ ...nf, tujuan: e.target.value })} placeholder="cth. GD-LAB · Lab-AI" /></div>
          </div>
          <div className="field"><label>Alasan</label><input value={nf.alasan} onChange={(e) => setNf({ ...nf, alasan: e.target.value })} placeholder="cth. kebutuhan praktikum" /></div>
        </Modal>
      )}
    </div>
  );
}

// ---------- 20.3.4 Stock Opname ----------
function AstOpname() {
  const toast = useToast();
  const [scan, setScan] = useState(0);
  const items = [
    { kode: "TIK.2024.0451", nama: "PC Workstation Dell", found: true },
    { kode: "TIK.2023.0188", nama: "Proyektor Epson (8 unit)", found: true },
    { kode: "LAB.2022.0094", nama: "Osiloskop Digital", found: true },
    { kode: "MBL.2021.0623", nama: "Kursi Kuliah (lot 50)", found: false },
  ];
  const tercatat = items.length, fisik = scan, selisih = tercatat - Math.min(scan, tercatat);
  return (
    <div className="anim-in">
      <PageHead title="Stock Opname / Inventarisasi" desc="Cocokkan fisik vs sistem per lokasi via pindai QR. Selisih ditindaklanjuti (mutasi tak tercatat / usulan hapus) (20.3.4)." />
      <div className="grid" style={{ gridTemplateColumns: "320px 1fr" }}>
        <div className="card card-pad" style={{ alignSelf: "start" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 10 }}>Opname Triwulan II · Lab Komputer 2</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
            {[["Tercatat", tercatat, "ink"], ["Fisik", Math.min(fisik, tercatat), "blue"], ["Selisih", selisih, selisih ? "red" : "green"]].map(([l, v, c]) => (
              <div key={l} style={{ padding: 12, borderRadius: 11, textAlign: "center", background: c === "ink" ? "var(--surface-2)" : `var(--${c}-bg)` }}><div style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--mono)", color: c === "ink" ? "var(--ink)" : `var(--${c})` }}>{v}</div><div style={{ fontSize: 10.5, fontWeight: 700, color: c === "ink" ? "var(--ink-3)" : `var(--${c})` }}>{l}</div></div>
            ))}
          </div>
          <button className="btn btn-primary" style={{ width: "100%", marginBottom: 8 }} disabled={scan >= tercatat} onClick={() => setScan((s) => s + 1)}><Icon name="search" size={15} /> {scan >= tercatat ? "Semua terpindai" : "Pindai QR Berikutnya"}</button>
          {scan >= tercatat && selisih > 0 && <button className="btn btn-soft btn-sm" style={{ width: "100%" }} onClick={() => toast("Selisih diteruskan ke tindak lanjut (usulan penghapusan)", "ok")}>Tindak Lanjuti Selisih</button>}
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="box" size={19} style={{ color: "var(--orange-600)" }} /><h3>Daftar Aset di Lokasi</h3></div>
          <div style={{ overflowX: "auto" }}><table className="tbl">
            <thead><tr><th>Kode</th><th>Nama Aset</th><th style={{ textAlign: "center" }}>Hasil Pindai</th></tr></thead>
            <tbody>{items.map((it, i) => (<tr key={it.kode}>
              <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{it.kode}</td>
              <td style={{ fontWeight: 700 }}>{it.nama}</td>
              <td style={{ textAlign: "center" }}>{i < scan ? (it.found ? <Badge tone="green" dot>Ditemukan</Badge> : <Badge tone="red" dot>Tidak Ditemukan</Badge>) : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>belum</span>}</td>
            </tr>))}</tbody>
          </table></div>
        </div>
      </div>
    </div>
  );
}

// ---------- 20.2.1 Booking Fasilitas ----------
function AstRuang() {
  const toast = useToast();
  const hari = ["Sen", "Sel", "Rab", "Kam", "Jum"];
  const ruang = [{ nama: "FST-301", kap: 40, jenis: "Kelas", pakai: [1, 1, 0, 1, 0] }, { nama: "Lab Komputer 2", kap: 35, jenis: "Lab", pakai: [1, 1, 1, 1, 0] }, { nama: "Aula FST", kap: 300, jenis: "Aula", pakai: [0, 0, 1, 0, 0] }, { nama: "Lab-AI", kap: 24, jenis: "Lab", pakai: [0, 1, 1, 1, 1] }];
  const [pending, setPending] = useState([{ id: 1, pemohon: "BEM ITI", ruang: "Aula FST", tanggal: "27 Jun 2026", jam: "08:00–16:00", keperluan: "Seminar Nasional" }]);
  const [form, setForm] = useState(false);
  const [nf, setNf] = useState({ ruang: "FST-301", tanggal: "", jamMulai: "08:00", jamSelesai: "10:00", keperluan: "" });
  const [bentrok, setBentrok] = useState(false);
  function cek() {
    // demo: bentrok bila Aula FST di 25 Jun (contoh) atau jam tumpang tindih dengan pending
    const b = pending.some((p) => p.ruang === nf.ruang && p.tanggal === nf.tanggal);
    setBentrok(b); return b;
  }
  function save() {
    if (!nf.tanggal || !nf.keperluan.trim()) { toast("Tanggal & keperluan wajib diisi"); return; }
    if (cek()) { toast("Bentrok jadwal terdeteksi pada ruang & tanggal tsb", ""); return; }
    setPending((l) => [...l, { id: Date.now(), pemohon: "Unit Pemohon", ruang: nf.ruang, tanggal: nf.tanggal, jam: nf.jamMulai + "–" + nf.jamSelesai, keperluan: nf.keperluan }]);
    setForm(false); setNf({ ruang: "FST-301", tanggal: "", jamMulai: "08:00", jamSelesai: "10:00", keperluan: "" });
    toast("Booking diajukan — menunggu persetujuan BAU", "ok");
  }
  return (
    <div className="anim-in">
      <PageHead title="Booking Fasilitas" desc="Pemesanan ruang/aula/lapangan dengan deteksi bentrok otomatis; fasilitas terbatas butuh persetujuan BAU (20.2.1)."
        actions={<button className="btn btn-primary" onClick={() => { setBentrok(false); setForm(true); }}><Icon name="plus" size={16} /> Pesan Fasilitas</button>} />
      <div className="grid" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="building" size={19} style={{ color: "var(--blue)" }} /><h3>Okupansi Mingguan</h3></div>
          <div style={{ overflowX: "auto", padding: 4 }}><table className="tbl">
            <thead><tr><th>Ruang</th><th style={{ textAlign: "center" }}>Kap.</th><th>Jenis</th>{hari.map((h) => <th key={h} style={{ textAlign: "center" }}>{h}</th>)}</tr></thead>
            <tbody>{ruang.map((r) => (<tr key={r.nama}><td style={{ fontWeight: 700 }}>{r.nama}</td><td style={{ textAlign: "center" }} className="mono">{r.kap}</td><td><Badge tone="gray">{r.jenis}</Badge></td>{r.pakai.map((p, i) => (<td key={i} style={{ textAlign: "center" }}><span style={{ display: "block", width: 8, height: 8, borderRadius: "50%", margin: "0 auto", background: p ? "var(--blue)" : "var(--green)" }} title={p ? "Terpakai" : "Tersedia"} /></td>))}</tr>))}</tbody>
          </table></div>
          <div style={{ padding: "12px 24px", display: "flex", gap: 16, fontSize: 12, color: "var(--ink-3)", borderTop: "1px solid var(--line)" }}><span style={{ display: "flex", alignItems: "center", gap: 6 }}><span className="dot" style={{ background: "var(--green)" }} /> Tersedia</span><span style={{ display: "flex", alignItems: "center", gap: 6 }}><span className="dot" style={{ background: "var(--blue)" }} /> Terpakai</span></div>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="check" size={19} style={{ color: "var(--amber)" }} /><h3>Menunggu Persetujuan</h3></div>
          <div>
            {pending.length ? pending.map((p, i) => (
              <div key={p.id} style={{ padding: "13px 22px", borderBottom: i < pending.length - 1 ? "1px solid var(--line)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}><b style={{ fontSize: 13.5 }}>{p.pemohon}</b><Badge tone="amber" dot style={{ marginLeft: "auto" }}>Menunggu</Badge></div>
                <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginBottom: 8 }}>{p.ruang} · {p.tanggal} · {p.jam} · {p.keperluan}</div>
                <button className="btn btn-soft btn-sm" onClick={() => { setPending((l) => l.filter((x) => x.id !== p.id)); toast("Booking disetujui", "ok"); }}>Setujui</button>
              </div>
            )) : <div className="empty" style={{ padding: "36px 20px" }}><Icon name="check" size={26} style={{ color: "var(--green)", marginBottom: 8 }} /><div style={{ color: "var(--ink-3)", fontSize: 13 }}>Tidak ada antrean.</div></div>}
          </div>
        </div>
      </div>
      {form && (
        <Modal title="Pesan Fasilitas" subtitle="20.2.1" onClose={() => setForm(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(false)}>Batal</button><button className="btn btn-primary" onClick={save}><Icon name="check" size={16} /> Ajukan Booking</button></>}>
          <div className="field"><label>Fasilitas</label><select value={nf.ruang} onChange={(e) => { setNf({ ...nf, ruang: e.target.value }); setBentrok(false); }}>{ruang.map((r) => <option key={r.nama}>{r.nama}</option>)}</select></div>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: "0 12px" }}>
            <div className="field"><label>Tanggal <span style={{ color: "var(--red)" }}>*</span></label><input type="date" value={nf.tanggal} onChange={(e) => { setNf({ ...nf, tanggal: e.target.value }); setBentrok(false); }} /></div>
            <div className="field"><label>Mulai</label><input type="time" value={nf.jamMulai} onChange={(e) => setNf({ ...nf, jamMulai: e.target.value })} /></div>
            <div className="field"><label>Selesai</label><input type="time" value={nf.jamSelesai} onChange={(e) => setNf({ ...nf, jamSelesai: e.target.value })} /></div>
          </div>
          <div className="field"><label>Keperluan <span style={{ color: "var(--red)" }}>*</span></label><input value={nf.keperluan} onChange={(e) => setNf({ ...nf, keperluan: e.target.value })} placeholder="cth. seminar, rapat, ujian" /></div>
          {bentrok && <div style={{ display: "flex", gap: 9, padding: 11, background: "var(--red-bg)", borderRadius: 10, fontSize: 12.5, color: "var(--red)", fontWeight: 600 }}><Icon name="warn" size={15} /> Bentrok: fasilitas sudah dipesan pada tanggal tersebut.</div>}
        </Modal>
      )}
    </div>
  );
}

// ---------- 20.1.2 Penyusutan ----------
function AstPenyusutan() {
  const toast = useToast();
  const [posted, setPosted] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const rows = AST_ASET.map((a) => ({ ...a, s: astSusut(a.nilai_perolehan, a.kategori, a.tanggal_perolehan) }));
  const total = rows.reduce((x, r) => x + r.s.bebanBln, 0);
  return (
    <div className="anim-in">
      <PageHead title="Penyusutan Aset" desc="Batch bulanan garis lurus per kategori. Posting menerbitkan jurnal Dr Beban Penyusutan / Cr Akumulasi Penyusutan ke Akuntansi (20.1.2)."
        actions={<button className="btn btn-primary" disabled={posted} onClick={() => setConfirm(true)}><Icon name="chart" size={16} /> {posted ? "Sudah Diposting" : "Jalankan Penyusutan"}</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)", marginBottom: 18 }}>
        {[["Periode", "Juni 2026", "blue"], ["Aset Disusutkan", rows.length + " aset", "purple"], ["Total Beban / Bln", astRp(total), "amber"]].map(([l, v, c]) => (
          <div key={l} className="stat card" style={{ background: `var(--${c}-bg)`, border: "none" }}><div className="label" style={{ color: `var(--${c})` }}>{l}</div><div className="value" style={{ color: `var(--${c})`, fontSize: 22 }}>{v}</div></div>
        ))}
      </div>
      <div className="card">
        {posted && <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 22px", background: "var(--green-bg)", color: "var(--green)", fontWeight: 700, fontSize: 13 }}><Icon name="check" size={17} /> Jurnal penyusutan Juni 2026 diposting → event ast.penyusutan.diposting ⇒ Akuntansi</div>}
        <div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>Kode Aset</th><th>Nama</th><th style={{ textAlign: "right" }}>Perolehan</th><th style={{ textAlign: "right" }}>Beban/Bln</th><th style={{ textAlign: "right" }}>Akum. Susut</th><th style={{ textAlign: "right" }}>Nilai Buku</th></tr></thead>
          <tbody>{rows.map((r) => (<tr key={r.kode_aset}>
            <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{r.kode_aset}</td>
            <td style={{ fontWeight: 700 }}>{r.nama_aset}</td>
            <td style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{astRp(r.nilai_perolehan)}</td>
            <td style={{ textAlign: "right", fontFamily: "var(--mono)", color: "var(--purple)" }}>{astRp(r.s.bebanBln)}</td>
            <td style={{ textAlign: "right", fontFamily: "var(--mono)", color: "var(--amber)" }}>{astRp(r.s.akum)}</td>
            <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{astRp(r.s.nilaiBuku)}</td>
          </tr>))}</tbody>
        </table></div>
      </div>
      {confirm && (
        <Modal title="Jalankan Penyusutan Juni 2026?" subtitle="Idempoten per periode (unik aset+periode)" onClose={() => setConfirm(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setConfirm(false)}>Batal</button><button className="btn btn-primary" onClick={() => { setPosted(true); setConfirm(false); toast("Penyusutan diposting → jurnal terkirim ke Akuntansi", "ok"); }}><Icon name="check" size={16} /> Ya, Posting Jurnal</button></>}>
          <div style={{ display: "flex", gap: 12, padding: 14, background: "var(--purple-bg)", borderRadius: 12, marginBottom: 12 }}><Icon name="info" size={22} style={{ color: "var(--purple)", flexShrink: 0 }} /><div style={{ fontSize: 13.5, lineHeight: 1.55 }}>Membuat entri penyusutan untuk <b>{rows.length} aset</b> senilai <b>{astRp(total)}</b> dan mengirim jurnal ke Akuntansi. Aksi ini tidak dapat diulang untuk periode yang sama.</div></div>
        </Modal>
      )}
    </div>
  );
}

// ---------- 20.1.4 Penghapusan ----------
function AstPenghapusan() {
  const toast = useToast();
  const [rows, setRows] = useState([
    { no: "HAP-0012", aset: "Server HPE ProLiant (2018)", alasan: "Rusak berat, tidak ekonomis", nilaiSisa: 0, status: "menunggu" },
    { no: "HAP-0011", aset: "Printer Laser (5 unit)", alasan: "Usang, sparepart langka", nilaiSisa: 250000, status: "disetujui" },
  ]);
  const [form, setForm] = useState(false);
  const [nf, setNf] = useState({ aset: "", alasan: "", metode: "Lelang" });
  const [conf, setConf] = useState(null);
  function ajukan() {
    if (!nf.aset.trim() || !nf.alasan.trim()) { toast("Aset & alasan wajib diisi"); return; }
    setRows((r) => [{ no: "HAP-00" + (13 + r.length), aset: nf.aset, alasan: nf.alasan, nilaiSisa: 0, status: "menunggu" }, ...r]);
    setForm(false); setNf({ aset: "", alasan: "", metode: "Lelang" });
    toast("Usulan penghapusan dikirim ke Workflow (SK)", "ok");
  }
  return (
    <div className="anim-in">
      <PageHead title="Penghapusan Aset" desc="Usulan hapus (rusak/hilang/lelang) via Workflow → SK → aset nonaktif → jurnal write-off nilai buku ke Akuntansi (20.1.4)."
        actions={<button className="btn btn-primary" onClick={() => setForm(true)}><Icon name="plus" size={16} /> Usulkan Penghapusan</button>} />
      <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th>No.</th><th>Aset</th><th>Alasan</th><th style={{ textAlign: "right" }}>Nilai Sisa</th><th>Status</th><th></th></tr></thead>
        <tbody>{rows.map((x) => (<tr key={x.no}>
          <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{x.no}</td>
          <td style={{ fontWeight: 700 }}>{x.aset}</td>
          <td style={{ fontSize: 12.5, color: "var(--ink-2)", maxWidth: 260 }}>{x.alasan}</td>
          <td style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{astRp(x.nilaiSisa)}</td>
          <td><Badge tone={x.status === "disetujui" ? "green" : x.status === "menunggu" ? "amber" : "gray"} dot>{x.status === "disetujui" ? "Disetujui (SK)" : "Menunggu WF"}</Badge></td>
          <td>{x.status === "menunggu" ? <button className="btn btn-soft btn-sm" onClick={() => setConf(x)}>Setujui</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>✓</span>}</td>
        </tr>))}</tbody>
      </table></div></div>
      {form && (
        <Modal title="Usulkan Penghapusan Aset" subtitle="20.1.4" onClose={() => setForm(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(false)}>Batal</button><button className="btn btn-primary" onClick={ajukan}><Icon name="check" size={16} /> Kirim ke Workflow</button></>}>
          <div className="field"><label>Aset <span style={{ color: "var(--red)" }}>*</span></label><select value={nf.aset} onChange={(e) => setNf({ ...nf, aset: e.target.value })}><option value="">— pilih aset —</option>{AST_ASET.map((a) => <option key={a.kode_aset}>{a.nama_aset}</option>)}</select></div>
          <div className="field"><label>Alasan Penghapusan <span style={{ color: "var(--red)" }}>*</span></label><textarea rows={2} value={nf.alasan} onChange={(e) => setNf({ ...nf, alasan: e.target.value })} placeholder="cth. rusak berat / hilang / usang" /></div>
          <div className="field"><label>Metode</label><select value={nf.metode} onChange={(e) => setNf({ ...nf, metode: e.target.value })}><option>Lelang</option><option>Pemusnahan</option><option>Hibah</option><option>Penghapusan (TGR)</option></select></div>
        </Modal>
      )}
      {conf && (
        <Modal title="Setujui Penghapusan?" subtitle={conf.no + " · " + conf.aset} onClose={() => setConf(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setConf(null)}>Batal</button><button className="btn btn-primary" onClick={() => { setRows((r) => r.map((y) => y.no === conf.no ? { ...y, status: "disetujui" } : y)); setConf(null); toast("SK terbit → aset nonaktif → write-off ke Akuntansi", "ok"); }}><Icon name="check" size={16} /> Ya, Terbitkan SK</button></>}>
          <div style={{ display: "flex", gap: 12, padding: 14, background: "var(--amber-bg)", borderRadius: 12 }}><Icon name="warn" size={22} style={{ color: "#a6760e", flexShrink: 0 }} /><div style={{ fontSize: 13.5, lineHeight: 1.55 }}>Menyetujui menerbitkan SK penghapusan, menonaktifkan aset, dan mengirim event <span className="mono" style={{ fontSize: 12 }}>ast.aset.dihapus</span> untuk jurnal write-off nilai buku.</div></div>
        </Modal>
      )}
    </div>
  );
}

// ---------- 20.4.1/20.4.2 Barang Habis Pakai + Stok ----------
const AST_BHP = [
  { kode: "BHP-001", nama_barang: "Kertas HVS A4 80gr", satuan: "Rim", kategori: "ATK", stok_minimal: 100, stok: 42, harga_satuan: 55000 },
  { kode: "BHP-002", nama_barang: "Toner Printer HP 85A", satuan: "Pcs", kategori: "ATK", stok_minimal: 20, stok: 8, harga_satuan: 850000 },
  { kode: "BHP-003", nama_barang: "Spidol Whiteboard", satuan: "Pcs", kategori: "ATK", stok_minimal: 50, stok: 120, harga_satuan: 12000 },
  { kode: "BHP-004", nama_barang: "Cairan Pembersih Lantai", satuan: "Liter", kategori: "Kebersihan", stok_minimal: 30, stok: 65, harga_satuan: 28000 },
  { kode: "BHP-005", nama_barang: "Sarung Tangan Lab Nitrile", satuan: "Box", kategori: "Laboratorium", stok_minimal: 15, stok: 22, harga_satuan: 95000 },
];
function AstBHP() {
  const toast = useToast();
  const [rows, setRows] = useState(AST_BHP.map((b, i) => ({ __id: i, ...b })));
  const [form, setForm] = useState(null);
  const [restock, setRestock] = useState(null);
  const [qty, setQty] = useState("");
  const blank = { nama_barang: "", satuan: "Pcs", kategori: "ATK", stok_minimal: 10, stok: 0, harga_satuan: "" };
  const low = rows.filter((b) => b.stok < b.stok_minimal);
  function save() {
    const d = form.data;
    if (!d.nama_barang.trim() || !d.harga_satuan) { toast("Nama & harga satuan wajib diisi"); return; }
    if (form.mode === "create") { setRows((r) => [...r, { __id: Date.now(), kode: "BHP-" + String(r.length + 1).padStart(3, "0"), ...d, harga_satuan: +d.harga_satuan }]); toast("Barang habis pakai ditambahkan", "ok"); }
    else { setRows((r) => r.map((x) => x.__id === d.__id ? { ...d, harga_satuan: +d.harga_satuan } : x)); toast("Data barang diperbarui", "ok"); }
    setForm(null);
  }
  return (
    <div className="anim-in">
      <PageHead title="Barang Habis Pakai & Stok Gudang" desc="Master BHP (ATK/bahan) + stok gudang. Stok di bawah minimum memicu usulan pengadaan (20.4.1, 20.4.2)."
        actions={<button className="btn btn-primary" onClick={() => setForm({ mode: "create", data: { __id: -1, ...blank } })}><Icon name="plus" size={16} /> Tambah Barang</button>} />
      {low.length > 0 && <div className="card" style={{ marginBottom: 16, borderLeft: "3px solid var(--red)" }}><div style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 20px" }}><Icon name="warn" size={18} style={{ color: "var(--red)" }} /><span style={{ fontSize: 13.5, fontWeight: 600 }}>{low.length} barang di bawah stok minimum:</span><span style={{ fontSize: 13, color: "var(--ink-2)" }}>{low.map((b) => b.nama_barang).join(", ")}</span><button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => toast("Usulan pengadaan dikirim ke ULP", "ok")}>Usulkan Pengadaan</button></div></div>}
      <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th>Kode</th><th>Nama Barang</th><th>Kategori</th><th style={{ textAlign: "center" }}>Stok</th><th style={{ textAlign: "center" }}>Min.</th><th style={{ textAlign: "right" }}>Harga Satuan</th><th></th></tr></thead>
        <tbody>{rows.map((b) => (<tr key={b.__id}>
          <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{b.kode}</td>
          <td style={{ fontWeight: 700 }}>{b.nama_barang}</td>
          <td><Badge tone="gray">{b.kategori}</Badge></td>
          <td style={{ textAlign: "center", fontWeight: 700 }}><span style={{ color: b.stok < b.stok_minimal ? "var(--red)" : "var(--ink)" }}>{b.stok}</span> <span style={{ fontSize: 11, color: "var(--ink-3)" }}>{b.satuan}</span></td>
          <td style={{ textAlign: "center", color: "var(--ink-3)" }}>{b.stok_minimal}</td>
          <td style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{astRp(b.harga_satuan)}</td>
          <td><div style={{ display: "flex", gap: 4 }}>
            <button className="btn btn-ghost btn-sm" title="Restock" onClick={() => { setRestock(b); setQty(""); }}><Icon name="plus" size={14} /></button>
            <button className="btn btn-ghost btn-sm" title="Ubah" onClick={() => setForm({ mode: "edit", data: { ...b } })}><Icon name="edit" size={14} /></button>
          </div></td>
        </tr>))}</tbody>
      </table></div></div>
      {form && (
        <Modal title={(form.mode === "create" ? "Tambah" : "Ubah") + " Barang Habis Pakai"} subtitle="20.4.1" onClose={() => setForm(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(null)}>Batal</button><button className="btn btn-primary" onClick={save}><Icon name="check" size={16} /> Simpan</button></>}>
          <div className="field"><label>Nama Barang <span style={{ color: "var(--red)" }}>*</span></label><input value={form.data.nama_barang} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, nama_barang: e.target.value } }))} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <div className="field"><label>Satuan</label><select value={form.data.satuan} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, satuan: e.target.value } }))}><option>Pcs</option><option>Rim</option><option>Box</option><option>Liter</option><option>Kg</option></select></div>
            <div className="field"><label>Kategori</label><select value={form.data.kategori} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, kategori: e.target.value } }))}><option>ATK</option><option>Kebersihan</option><option>Laboratorium</option><option>Konsumsi</option></select></div>
            <div className="field"><label>Stok Minimal</label><input type="number" value={form.data.stok_minimal} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, stok_minimal: +e.target.value } }))} /></div>
            <div className="field"><label>Harga Satuan (Rp) <span style={{ color: "var(--red)" }}>*</span></label><input type="number" value={form.data.harga_satuan} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, harga_satuan: e.target.value } }))} /></div>
          </div>
        </Modal>
      )}
      {restock && (
        <Modal title="Restock Barang" subtitle={restock.nama_barang + " · stok kini " + restock.stok + " " + restock.satuan} onClose={() => setRestock(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setRestock(null)}>Batal</button><button className="btn btn-primary" onClick={() => { const q = +qty; if (!q) { toast("Jumlah wajib diisi"); return; } setRows((r) => r.map((x) => x.__id === restock.__id ? { ...x, stok: x.stok + q } : x)); setRestock(null); toast("Stok gudang diperbarui (+" + q + " " + restock.satuan + ")", "ok"); }}><Icon name="check" size={16} /> Tambah Stok</button></>}>
          <div className="field"><label>Jumlah Masuk ({restock.satuan})</label><input type="number" value={qty} autoFocus onChange={(e) => setQty(e.target.value)} placeholder="0" /></div>
        </Modal>
      )}
    </div>
  );
}

// ---------- 20.4.3 Permintaan Barang ----------
function AstPermintaan() {
  const toast = useToast();
  const [rows, setRows] = useState([
    { no: "PMB-0231", unit: "Prodi TI", barang: "Kertas HVS A4 (10 rim)", tanggal: "23 Jun 2026", status: "menunggu" },
    { no: "PMB-0230", unit: "Perpustakaan", barang: "Toner HP 85A (3 pcs)", tanggal: "22 Jun 2026", status: "menunggu" },
    { no: "PMB-0229", unit: "Biro Umum", barang: "Cairan Pembersih (20 L)", tanggal: "21 Jun 2026", status: "disetujui" },
  ]);
  return (
    <div className="anim-in">
      <PageHead title="Permintaan Barang" desc="Permintaan BHP dari unit (workflow ringan). Disetujui → diteruskan ke distribusi gudang (20.4.3)." />
      <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th>No.</th><th>Unit Peminta</th><th>Barang & Jumlah</th><th>Tanggal</th><th>Status</th><th></th></tr></thead>
        <tbody>{rows.map((x) => (<tr key={x.no}>
          <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{x.no}</td>
          <td style={{ fontWeight: 700 }}>{x.unit}</td>
          <td style={{ fontSize: 13 }}>{x.barang}</td>
          <td style={{ fontSize: 12.5 }}>{x.tanggal}</td>
          <td><Badge tone={x.status === "disetujui" ? "green" : "amber"} dot>{x.status === "disetujui" ? "Disetujui" : "Menunggu"}</Badge></td>
          <td>{x.status === "menunggu" ? <button className="btn btn-soft btn-sm" onClick={() => { setRows((r) => r.map((y) => y.no === x.no ? { ...y, status: "disetujui" } : y)); toast("Permintaan disetujui → siap distribusi", "ok"); }}>Setujui</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>✓</span>}</td>
        </tr>))}</tbody>
      </table></div></div>
    </div>
  );
}

// ---------- 20.4.4 Distribusi ----------
function AstDistribusi() {
  const toast = useToast();
  const [rows, setRows] = useState([
    { no: "DST-0188", permintaan: "PMB-0229", unit: "Biro Umum", barang: "Cairan Pembersih", keluar: 20, sisa: 45, tanggal: "22 Jun 2026" },
  ]);
  const [form, setForm] = useState(false);
  const [nf, setNf] = useState({ permintaan: "PMB-0231", unit: "Prodi TI", barang: "Kertas HVS A4", keluar: "" });
  function dist() {
    const q = +nf.keluar;
    if (!q) { toast("Jumlah keluar wajib diisi"); return; }
    setRows((r) => [{ no: "DST-01" + (89 + r.length), permintaan: nf.permintaan, unit: nf.unit, barang: nf.barang, keluar: q, sisa: Math.max(0, 42 - q), tanggal: "24 Jun 2026" }, ...r]);
    setForm(false); setNf({ ...nf, keluar: "" });
    toast("Distribusi FIFO tercatat → stok gudang berkurang", "ok");
  }
  return (
    <div className="anim-in">
      <PageHead title="Distribusi / Pengeluaran Barang" desc="Pengeluaran BHP FIFO per batch masuk; mengurangi stok gudang & terjurnal periodik ke Akuntansi (20.4.4)."
        actions={<button className="btn btn-primary" onClick={() => setForm(true)}><Icon name="plus" size={16} /> Distribusikan</button>} />
      <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th>No.</th><th>Ref Permintaan</th><th>Unit Penerima</th><th>Barang</th><th style={{ textAlign: "center" }}>Keluar</th><th style={{ textAlign: "center" }}>Sisa Stok</th><th>Tanggal</th></tr></thead>
        <tbody>{rows.map((x) => (<tr key={x.no}>
          <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{x.no}</td>
          <td className="mono" style={{ fontSize: 12 }}>{x.permintaan}</td>
          <td style={{ fontWeight: 700 }}>{x.unit}</td>
          <td>{x.barang}</td>
          <td style={{ textAlign: "center", fontWeight: 700 }}>{x.keluar}</td>
          <td style={{ textAlign: "center", color: "var(--ink-3)" }}>{x.sisa}</td>
          <td style={{ fontSize: 12.5 }}>{x.tanggal}</td>
        </tr>))}</tbody>
      </table></div></div>
      {form && (
        <Modal title="Distribusikan Barang" subtitle="FIFO · 20.4.4" onClose={() => setForm(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(false)}>Batal</button><button className="btn btn-primary" onClick={dist}><Icon name="check" size={16} /> Keluarkan Barang</button></>}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <div className="field"><label>Ref Permintaan</label><select value={nf.permintaan} onChange={(e) => setNf({ ...nf, permintaan: e.target.value })}><option>PMB-0231</option><option>PMB-0230</option></select></div>
            <div className="field"><label>Barang</label><select value={nf.barang} onChange={(e) => setNf({ ...nf, barang: e.target.value })}>{AST_BHP.map((b) => <option key={b.kode}>{b.nama_barang}</option>)}</select></div>
          </div>
          <div className="field"><label>Jumlah Keluar <span style={{ color: "var(--red)" }}>*</span></label><input type="number" value={nf.keluar} onChange={(e) => setNf({ ...nf, keluar: e.target.value })} placeholder="0" /></div>
        </Modal>
      )}
    </div>
  );
}

export { AstDashboard, AstInventaris, AstKategori, AstLokasi, AstLabel, AstPemeliharaan, AstMutasi, AstOpname, AstRuang, AstPenyusutan, AstPenghapusan, AstBHP, AstPermintaan, AstDistribusi };
