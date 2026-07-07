/* eslint-disable */
// @ts-nocheck
// Generated from js/views_sdm.jsx by scripts/port-js-ssot.mjs.
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
// AIS — Views: SDM/Kepegawaian tambahan (service: hr) — Sequence-SDM
// Melengkapi HR dasar (views_operasional): Kontrak & H-60, Dosen (SISTER/JAFA/
// Serdos/BKD), Rekrutmen, Kinerja & Pengembangan, Kesejahteraan (BPJS/Pinjaman/THR)
// ============================================================
const sdmRp = (n) => "Rp " + Math.round(n).toLocaleString("id");

// ---------- FLOW 1: Kontrak & Penugasan (17.1.2) + pengingat H-60 ----------
const HR_KONTRAK = [
  { nip: "0312088203", nama: "Dr. Imam Marzuki, M.Kom", jenis: "Tetap (PNS)", mulai: "01 Jan 2015", akhir: "—", unit: "TI · FST", sisa: null, status: "aktif" },
  { nip: "0415099002", nama: "Dewi Lestari, M.Kom", jenis: "Kontrak (Dosen)", mulai: "01 Sep 2023", akhir: "31 Agu 2026", unit: "TI · FST", sisa: 57, status: "perpanjangan" },
  { nip: "1987031245", nama: "Drs. Bambang Santoso", jenis: "PPPK", mulai: "01 Mar 2022", akhir: "28 Feb 2027", unit: "Biro Keuangan", sisa: 238, status: "aktif" },
  { nip: "1993081144", nama: "Rian Hidayat, S.Kom", jenis: "Kontrak (Tendik)", mulai: "01 Jul 2024", akhir: "30 Jun 2026", unit: "PUSTIPANDA", sisa: 25, status: "perpanjangan" },
  { nip: "0518088301", nama: "Yusuf Ramli, M.Kom", jenis: "Kontrak (Dosen)", mulai: "01 Feb 2024", akhir: "31 Jan 2027", unit: "SI · FST", sisa: 210, status: "aktif" },
];
function HrKontrak() {
  const toast = useToast();
  const [rows, setRows] = useState(HR_KONTRAK.map((x, i) => ({ __id: i, ...x })));
  const [pp, setPp] = useState(null);
  const perlu = rows.filter((r) => r.status === "perpanjangan");
  return (
    <div className="anim-in">
      <PageHead title="Kontrak & Penugasan" desc="Kontrak kerja ber-masa dengan pengingat perpanjangan otomatis H-60 sebelum berakhir (17.1.2)." />
      {perlu.length > 0 && (
        <div className="card" style={{ marginBottom: 16, borderLeft: "3px solid var(--amber)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 20px" }}>
            <Icon name="clock" size={18} style={{ color: "#a6760e" }} />
            <span style={{ fontSize: 13.5, fontWeight: 600 }}>{perlu.length} kontrak mendekati berakhir (H-60):</span>
            <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{perlu.map((p) => p.nama.split(",")[0]).join(", ")}</span>
          </div>
        </div>
      )}
      <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th>Pegawai</th><th>Jenis Kontrak</th><th>Unit</th><th style={{ textAlign: "center" }}>Berlaku s.d.</th><th style={{ textAlign: "center" }}>Sisa</th><th>Status</th><th></th></tr></thead>
        <tbody>{rows.map((r) => (
          <tr key={r.__id}>
            <td><div style={{ fontWeight: 700 }}>{r.nama}</div><div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{r.nip}</div></td>
            <td><Badge tone={r.jenis.includes("Tetap") ? "green" : r.jenis.includes("PPPK") ? "blue" : "amber"}>{r.jenis}</Badge></td>
            <td style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{r.unit}</td>
            <td style={{ textAlign: "center", fontSize: 13 }}>{r.akhir}</td>
            <td style={{ textAlign: "center" }}>{r.sisa != null ? <span className="mono" style={{ color: r.sisa <= 60 ? "var(--red)" : "var(--ink-3)", fontWeight: 700 }}>{r.sisa} hr</span> : <span style={{ color: "var(--ink-3)" }}>—</span>}</td>
            <td><Badge tone={r.status === "aktif" ? "green" : "amber"} dot>{r.status === "aktif" ? "Aktif" : "Perlu Perpanjangan"}</Badge></td>
            <td>{r.status === "perpanjangan" ? <button className="btn btn-soft btn-sm" onClick={() => setPp(r)}>Perpanjang</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>—</span>}</td>
          </tr>
        ))}</tbody>
      </table></div></div>
      {pp && (
        <Modal title="Perpanjangan Kontrak" subtitle={pp.nama} onClose={() => setPp(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setPp(null)}>Batal</button><button className="btn btn-primary" onClick={() => { setRows((l) => l.map((x) => x.__id === pp.__id ? { ...x, status: "aktif", sisa: 730, akhir: "31 Agu 2028" } : x)); setPp(null); toast("Kontrak diperpanjang — SK dibuat & menunggu TTE", "ok"); }}><Icon name="check" size={16} /> Proses Perpanjangan</button></>}>
          <div className="field"><label>Durasi Perpanjangan</label><select><option>2 tahun</option><option>1 tahun</option><option>3 tahun</option></select></div>
          <div className="field" style={{ margin: 0 }}><label>Catatan</label><textarea rows={2} placeholder="Pertimbangan kinerja, kebutuhan unit…" /></div>
        </Modal>
      )}
    </div>
  );
}

// ---------- FLOW 3: Dosen — SISTER, JAFA, Serdos, BKD ----------
const HR_SISTER = [
  { nidn: "0312088203", nama: "Dr. Imam Marzuki, M.Kom", jafung: "Lektor Kepala", ak: 452, serdos: "Tersertifikasi", sinkron: "hari ini", bkd: "sah" },
  { nidn: "0408107505", nama: "Dr. Hj. Rina Mahmudah, M.T", jafung: "Lektor", ak: 328, serdos: "Tersertifikasi", sinkron: "hari ini", bkd: "verifikasi" },
  { nidn: "0415099002", nama: "Dewi Lestari, M.Kom", jafung: "Asisten Ahli", ak: 152, serdos: "Proses", sinkron: "2 hari lalu", bkd: "verifikasi" },
  { nidn: "0518088301", nama: "Yusuf Ramli, M.Kom", jafung: "Asisten Ahli", ak: 168, serdos: "Belum", sinkron: "hari ini", bkd: "draf" },
];
function HrDosen() {
  const toast = useToast();
  const [tab, setTab] = useState("sister");
  const [rows, setRows] = useState(HR_SISTER.map((x, i) => ({ __id: i, ...x })));
  const bkdTone = { sah: ["Disahkan", "green"], verifikasi: ["Perlu Verifikasi", "amber"], draf: ["Draf", "gray"] };
  return (
    <div className="anim-in">
      <PageHead title="Kepegawaian Dosen" desc="Sinkronisasi SISTER, jabatan fungsional (angka kredit), sertifikasi dosen (Serdos), dan verifikasi Beban Kerja Dosen (BKD)."
        actions={<button className="btn btn-primary" onClick={() => toast("Sinkronisasi SISTER dimulai (batch NIDN)", "ok")}><Icon name="refresh" size={16} /> Sinkron SISTER</button>} />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[["sister", "SISTER & JAFA"], ["serdos", "Serdos"], ["bkd", "Verifikasi BKD"]].map(([k, l]) => <button key={k} className={"btn btn-sm " + (tab === k ? "btn-soft" : "btn-ghost")} onClick={() => setTab(k)}>{l}</button>)}
      </div>
      <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        {tab === "sister" && <>
          <thead><tr><th>Dosen</th><th>NIDN</th><th>Jabatan Fungsional</th><th style={{ textAlign: "center" }}>Angka Kredit</th><th style={{ textAlign: "center" }}>Sinkron</th></tr></thead>
          <tbody>{rows.map((r) => (<tr key={r.__id}><td style={{ fontWeight: 700 }}>{r.nama}</td><td className="mono" style={{ fontSize: 12 }}>{r.nidn}</td><td><Badge tone="blue">{r.jafung}</Badge></td><td style={{ textAlign: "center", fontFamily: "var(--mono)", fontWeight: 700 }}>{r.ak}</td><td style={{ textAlign: "center", fontSize: 12, color: "var(--ink-3)" }}>{r.sinkron}</td></tr>))}</tbody>
        </>}
        {tab === "serdos" && <>
          <thead><tr><th>Dosen</th><th>NIDN</th><th>Status Serdos</th><th></th></tr></thead>
          <tbody>{rows.map((r) => (<tr key={r.__id}><td style={{ fontWeight: 700 }}>{r.nama}</td><td className="mono" style={{ fontSize: 12 }}>{r.nidn}</td><td><Badge tone={r.serdos === "Tersertifikasi" ? "green" : r.serdos === "Proses" ? "amber" : "gray"} dot>{r.serdos}</Badge></td><td>{r.serdos === "Belum" && <button className="btn btn-soft btn-sm" onClick={() => toast("Usulan Serdos didaftarkan", "ok")}>Usulkan</button>}</td></tr>))}</tbody>
        </>}
        {tab === "bkd" && <>
          <thead><tr><th>Dosen</th><th>Semester</th><th style={{ textAlign: "center" }}>SKS Setara</th><th>Status BKD</th><th></th></tr></thead>
          <tbody>{rows.map((r) => (<tr key={r.__id}><td style={{ fontWeight: 700 }}>{r.nama}</td><td style={{ fontSize: 13 }}>2025/2026 Genap</td><td style={{ textAlign: "center", fontFamily: "var(--mono)", fontWeight: 700 }}>{(12 + r.__id).toFixed(1)}</td><td><Badge tone={bkdTone[r.bkd][1]} dot>{bkdTone[r.bkd][0]}</Badge></td><td>{r.bkd === "verifikasi" ? <button className="btn btn-soft btn-sm" onClick={() => { setRows((l) => l.map((x) => x.__id === r.__id ? { ...x, bkd: "sah" } : x)); toast("BKD disahkan → tunjangan profesi diproses", "ok"); }}>Sahkan</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>—</span>}</td></tr>))}</tbody>
        </>}
      </table></div></div>
    </div>
  );
}

// ---------- FLOW 4: Rekrutmen ----------
function HrRekrutmen() {
  const toast = useToast();
  const [tab, setTab] = useState("lowongan");
  const lowongan = [
    { kode: "FRM-01", posisi: "Dosen Tetap Teknik Informatika", unit: "FST", kuota: 2, pelamar: 34, status: "Dibuka" },
    { kode: "FRM-02", posisi: "Staf Administrasi Keuangan", unit: "Biro Keuangan", kuota: 1, pelamar: 58, status: "Seleksi" },
    { kode: "FRM-03", posisi: "Pranata Laboratorium", unit: "Lab Terpadu", kuota: 3, pelamar: 21, status: "Dibuka" },
  ];
  const [pelamar, setPelamar] = useState([
    { nama: "Andi Wijaya, M.Kom", posisi: "Dosen Tetap TI", tahap: "Wawancara", skor: 86, status: "proses" },
    { nama: "Sarah Amelia, S.E", posisi: "Staf Keuangan", tahap: "Tes Tulis", skor: 78, status: "proses" },
    { nama: "Budi Hartono, S.Si", posisi: "Pranata Lab", tahap: "Administrasi", skor: null, status: "baru" },
    { nama: "Nia Kurnia, M.T", posisi: "Dosen Tetap TI", tahap: "Wawancara", skor: 91, status: "lulus" },
  ]);
  return (
    <div className="anim-in">
      <PageHead title="Rekrutmen Pegawai" desc="Formasi/lowongan → pelamar → tahapan seleksi → penawaran. Penetapan memicu onboarding & pembuatan akun otomatis."
        actions={<button className="btn btn-primary" onClick={() => toast("Form formasi baru dibuka")}><Icon name="plus" size={16} /> Buka Formasi</button>} />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        {[["lowongan", "Lowongan & Formasi"], ["pelamar", "Pelamar & Seleksi"]].map(([k, l]) => <button key={k} className={"btn btn-sm " + (tab === k ? "btn-soft" : "btn-ghost")} onClick={() => setTab(k)}>{l}</button>)}
      </div>
      {tab === "lowongan" ? (
        <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>Kode</th><th>Posisi</th><th>Unit</th><th style={{ textAlign: "center" }}>Kuota</th><th style={{ textAlign: "center" }}>Pelamar</th><th>Status</th></tr></thead>
          <tbody>{lowongan.map((l) => (<tr key={l.kode}><td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{l.kode}</td><td style={{ fontWeight: 700 }}>{l.posisi}</td><td style={{ fontSize: 12.5 }}>{l.unit}</td><td style={{ textAlign: "center" }}>{l.kuota}</td><td style={{ textAlign: "center" }}><Badge tone="blue">{l.pelamar}</Badge></td><td><Badge tone={l.status === "Dibuka" ? "green" : "amber"} dot>{l.status}</Badge></td></tr>))}</tbody>
        </table></div></div>
      ) : (
        <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>Pelamar</th><th>Posisi</th><th>Tahap</th><th style={{ textAlign: "center" }}>Skor</th><th>Status</th><th></th></tr></thead>
          <tbody>{pelamar.map((p, i) => (<tr key={i}><td style={{ fontWeight: 700 }}>{p.nama}</td><td style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{p.posisi}</td><td><Badge tone="gray">{p.tahap}</Badge></td><td style={{ textAlign: "center", fontFamily: "var(--mono)", fontWeight: 700 }}>{p.skor ?? "—"}</td><td><Badge tone={p.status === "lulus" ? "green" : p.status === "baru" ? "amber" : "blue"} dot>{p.status === "lulus" ? "Lulus" : p.status === "baru" ? "Baru" : "Proses"}</Badge></td><td>{p.status === "lulus" ? <button className="btn btn-soft btn-sm" onClick={() => toast("Surat penawaran (offering) dikirim ke pelamar", "ok")}>Kirim Offering</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>—</span>}</td></tr>))}</tbody>
        </table></div></div>
      )}
    </div>
  );
}

// ---------- FLOW 4: Kinerja & Pengembangan ----------
function HrKinerja() {
  const toast = useToast();
  const [tab, setTab] = useState("skp");
  const [skp, setSkp] = useState([
    { nama: "Dr. Imam Marzuki, M.Kom", periode: "2025", target: 100, capaian: 96, predikat: "Sangat Baik", status: "final" },
    { nama: "Dewi Lestari, M.Kom", periode: "2025", target: 100, capaian: 88, predikat: "Baik", status: "final" },
    { nama: "Drs. Bambang Santoso", periode: "2025", target: 100, capaian: 74, predikat: "Cukup", status: "review" },
  ]);
  const diklat = [
    { nama: "Pelatihan AA (Applied Approach)", penyelenggara: "LP3M", tanggal: "12–16 Agu 2026", kuota: "30", status: "Dibuka" },
    { nama: "Sertifikasi Cloud Computing", penyelenggara: "Mitra Industri", tanggal: "01–05 Sep 2026", kuota: "15", status: "Dibuka" },
  ];
  const tubel = [
    { nama: "Yusuf Ramli, M.Kom", jenjang: "S3 Ilmu Komputer", institusi: "ITB", sumber: "BPPT", status: "Berjalan" },
    { nama: "Nia Kurnia, M.T", jenjang: "S3 Teknik Elektro", institusi: "UI", sumber: "Mandiri", status: "Usulan" },
  ];
  return (
    <div className="anim-in">
      <PageHead title="Kinerja & Pengembangan" desc="Penilaian kinerja (SKP/KPI), diklat/pelatihan, dan tugas belajar/studi lanjut. Nilai kinerja memberi komponen tunjangan kinerja." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[["skp", "Penilaian Kinerja (SKP)"], ["diklat", "Diklat / Pelatihan"], ["tubel", "Tugas Belajar"]].map(([k, l]) => <button key={k} className={"btn btn-sm " + (tab === k ? "btn-soft" : "btn-ghost")} onClick={() => setTab(k)}>{l}</button>)}
      </div>
      {tab === "skp" && <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th>Pegawai</th><th>Periode</th><th style={{ textAlign: "center" }}>Capaian</th><th>Predikat</th><th>Status</th><th></th></tr></thead>
        <tbody>{skp.map((s, i) => (<tr key={i}><td style={{ fontWeight: 700 }}>{s.nama}</td><td style={{ fontSize: 13 }}>{s.periode}</td><td style={{ textAlign: "center", fontFamily: "var(--mono)", fontWeight: 700, color: s.capaian >= 90 ? "var(--green)" : s.capaian >= 76 ? "var(--blue)" : "var(--amber)" }}>{s.capaian}%</td><td><Badge tone={s.predikat === "Sangat Baik" ? "green" : s.predikat === "Baik" ? "blue" : "amber"}>{s.predikat}</Badge></td><td><Badge tone={s.status === "final" ? "green" : "amber"} dot>{s.status === "final" ? "Final" : "Review"}</Badge></td><td>{s.status === "review" ? <button className="btn btn-soft btn-sm" onClick={() => { setSkp((l) => l.map((x, j) => j === i ? { ...x, status: "final" } : x)); toast("Penilaian kinerja difinalisasi", "ok"); }}>Finalisasi</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>—</span>}</td></tr>))}</tbody>
      </table></div></div>}
      {tab === "diklat" && <div className="grid" style={{ gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>{diklat.map((d, i) => (<div key={i} className="card card-pad"><div style={{ display: "flex", gap: 12, marginBottom: 10 }}><div style={{ width: 42, height: 42, borderRadius: 12, background: "var(--blue-bg)", color: "var(--blue)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="award" size={20} /></div><div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 14 }}>{d.nama}</div><div style={{ fontSize: 12, color: "var(--ink-3)" }}>{d.penyelenggara} · {d.tanggal}</div></div><Badge tone="green" dot>{d.status}</Badge></div><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: "1px solid var(--line)" }}><span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>Kuota {d.kuota}</span><button className="btn btn-ghost btn-sm" onClick={() => toast("Peserta didaftarkan")}>Daftarkan Pegawai</button></div></div>))}</div>}
      {tab === "tubel" && <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th>Pegawai</th><th>Jenjang</th><th>Institusi</th><th>Sumber Biaya</th><th>Status</th><th></th></tr></thead>
        <tbody>{tubel.map((t, i) => (<tr key={i}><td style={{ fontWeight: 700 }}>{t.nama}</td><td>{t.jenjang}</td><td style={{ fontSize: 12.5 }}>{t.institusi}</td><td><Badge tone="gray">{t.sumber}</Badge></td><td><Badge tone={t.status === "Berjalan" ? "blue" : "amber"} dot>{t.status}</Badge></td><td>{t.status === "Usulan" ? <button className="btn btn-soft btn-sm" onClick={() => toast("Tugas belajar disetujui → SK dibuat", "ok")}>Setujui</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>—</span>}</td></tr>))}</tbody>
      </table></div></div>}
    </div>
  );
}

// ---------- FLOW 5: Kesejahteraan (BPJS, Pinjaman, THR) ----------
function HrSejahtera() {
  const toast = useToast();
  const [tab, setTab] = useState("bpjs");
  const bpjs = [
    { nama: "Dr. Imam Marzuki, M.Kom", kes: "Aktif", tk: "Aktif", iuran: 640000 },
    { nama: "Dewi Lestari, M.Kom", kes: "Aktif", tk: "Aktif", iuran: 420000 },
    { nama: "Drs. Bambang Santoso", kes: "Aktif", tk: "Nonaktif", iuran: 380000 },
  ];
  const [pinjaman, setPinjaman] = useState([
    { nama: "Drs. Bambang Santoso", nominal: 24000000, tenor: 24, angsuran: 1100000, sisa: 13200000, status: "berjalan" },
    { nama: "Rian Hidayat, S.Kom", nominal: 10000000, tenor: 12, angsuran: 900000, sisa: 10000000, status: "usulan" },
  ]);
  const thr = [
    { nama: "Dr. Imam Marzuki, M.Kom", jenis: "THR Idulfitri", periode: "2026", nominal: 9500000 },
    { nama: "Dewi Lestari, M.Kom", jenis: "THR Idulfitri", periode: "2026", nominal: 6200000 },
    { nama: "Drs. Bambang Santoso", jenis: "THR Idulfitri", periode: "2026", nominal: 5400000 },
  ];
  return (
    <div className="anim-in">
      <PageHead title="Kesejahteraan Pegawai" desc="BPJS Kesehatan & Ketenagakerjaan, pinjaman pegawai (potong gaji), serta THR/bonus — komponen yang mengalir ke payroll." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[["bpjs", "BPJS"], ["pinjaman", "Pinjaman Pegawai"], ["thr", "THR / Bonus"]].map(([k, l]) => <button key={k} className={"btn btn-sm " + (tab === k ? "btn-soft" : "btn-ghost")} onClick={() => setTab(k)}>{l}</button>)}
      </div>
      {tab === "bpjs" && <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th>Pegawai</th><th style={{ textAlign: "center" }}>BPJS Kesehatan</th><th style={{ textAlign: "center" }}>BPJS TK</th><th style={{ textAlign: "right" }}>Iuran/bln</th></tr></thead>
        <tbody>{bpjs.map((b, i) => (<tr key={i}><td style={{ fontWeight: 700 }}>{b.nama}</td><td style={{ textAlign: "center" }}><Badge tone="green" dot>{b.kes}</Badge></td><td style={{ textAlign: "center" }}><Badge tone={b.tk === "Aktif" ? "green" : "gray"} dot>{b.tk}</Badge></td><td style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{sdmRp(b.iuran)}</td></tr>))}</tbody>
      </table></div></div>}
      {tab === "pinjaman" && <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th>Pegawai</th><th style={{ textAlign: "right" }}>Pinjaman</th><th style={{ textAlign: "center" }}>Tenor</th><th style={{ textAlign: "right" }}>Angsuran/bln</th><th style={{ textAlign: "right" }}>Sisa</th><th>Status</th><th></th></tr></thead>
        <tbody>{pinjaman.map((p, i) => (<tr key={i}><td style={{ fontWeight: 700 }}>{p.nama}</td><td style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{sdmRp(p.nominal)}</td><td style={{ textAlign: "center" }}>{p.tenor} bln</td><td style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{sdmRp(p.angsuran)}</td><td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{sdmRp(p.sisa)}</td><td><Badge tone={p.status === "berjalan" ? "blue" : "amber"} dot>{p.status === "berjalan" ? "Berjalan" : "Usulan"}</Badge></td><td>{p.status === "usulan" ? <button className="btn btn-soft btn-sm" onClick={() => { setPinjaman((l) => l.map((x, j) => j === i ? { ...x, status: "berjalan" } : x)); toast("Pinjaman disetujui → potong gaji otomatis", "ok"); }}>Setujui</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>—</span>}</td></tr>))}</tbody>
      </table></div></div>}
      {tab === "thr" && <div className="card">
        <div className="card-pad" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--line)" }}><b style={{ fontSize: 14 }}>THR Idulfitri 2026</b><button className="btn btn-primary btn-sm" onClick={() => toast("Batch THR diproses → payroll run khusus", "ok")}><Icon name="wallet" size={14} /> Proses THR Massal</button></div>
        <div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>Pegawai</th><th>Jenis</th><th>Periode</th><th style={{ textAlign: "right" }}>Nominal</th></tr></thead>
          <tbody>{thr.map((t, i) => (<tr key={i}><td style={{ fontWeight: 700 }}>{t.nama}</td><td><Badge tone="purple">{t.jenis}</Badge></td><td style={{ fontSize: 13 }}>{t.periode}</td><td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{sdmRp(t.nominal)}</td></tr>))}</tbody>
        </table></div>
      </div>}
    </div>
  );
}

export { HrKontrak, HrDosen, HrRekrutmen, HrKinerja, HrSejahtera };
