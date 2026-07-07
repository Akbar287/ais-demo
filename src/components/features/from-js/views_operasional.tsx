/* eslint-disable */
// @ts-nocheck
// Generated from js/views_operasional.jsx by scripts/port-js-ssot.mjs.
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
// AIS — Views: SDM / KEPEGAWAIAN (HR Service)
// ============================================================
const HR_PEGAWAI = [
  { nip: "0312088203", nama: "Dr. Imam Marzuki, M.Kom", jenis: "Dosen", unit: "TI · FST", jabatan: "Lektor Kepala", status: "PNS", masa: "14 thn" },
  { nip: "0408107505", nama: "Dr. Hj. Rina Mahmudah, M.T", jenis: "Dosen", unit: "TI · FST", jabatan: "Lektor", status: "PNS", masa: "11 thn" },
  { nip: "1987031245", nama: "Drs. Bambang Santoso", jenis: "Tendik", unit: "Biro Keuangan", jabatan: "Staf Keuangan", status: "PPPK", masa: "9 thn" },
  { nip: "1990110078", nama: "Yusuf Ramli, M.Kom", jenis: "Tendik", unit: "PUSTIPANDA", jabatan: "Pranata Komputer", status: "PNS", masa: "6 thn" },
  { nip: "0415099002", nama: "Dewi Lestari, M.Kom", jenis: "Dosen", unit: "TI · FST", jabatan: "Asisten Ahli", status: "Kontrak", masa: "3 thn" },
  { nip: "1983052011", nama: "Hj. Maryam Saidah, S.IP", jenis: "Tendik", unit: "Perpustakaan", jabatan: "Pustakawan Madya", status: "PNS", masa: "12 thn" },
];

function HRDashboard({ nav }) {
  const R = window.AIS_ROLES; const p = R.personas.hr;
  const tiles = [
    { label: "Total Pegawai", value: 412, meta: "248 dosen · 164 tendik", ic: "users", c: "var(--purple)", bg: "var(--purple-bg)" },
    { label: "Hadir Hari Ini", value: "96%", meta: "8 cuti · 4 dinas luar", ic: "check", c: "var(--green)", bg: "var(--green-bg)" },
    { label: "Pengajuan Cuti", value: "7 baru", meta: "menunggu persetujuan", ic: "clock", c: "var(--amber)", bg: "var(--amber-bg)" },
    { label: "Kontrak Berakhir", value: "5", meta: "≤ 90 hari ke depan", ic: "warn", c: "var(--red)", bg: "var(--red-bg)" },
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="hr" sub="Kelola data pegawai, kehadiran & cuti, penggajian, serta jabatan dan kepangkatan."
        action={<button className="btn btn-primary" onClick={() => nav("hr_pegawai")}><Icon name="idcard" size={17} /> Data Pegawai</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 22 }}>
        {tiles.map((t) => (<div key={t.label} className="stat card" style={{ background: t.bg, border: "none" }}><Icon name={t.ic} size={26} className="si" style={{ color: t.c }} /><div className="label" style={{ color: t.c }}>{t.label}</div><div className="value" style={{ color: t.c, fontSize: 26 }}>{t.value}</div><div className="meta" style={{ color: t.c }}>{t.meta}</div></div>))}
      </div>
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="chart" size={19} style={{ color: "var(--purple)" }} /><h3>Komposisi Pegawai</h3></div>
          <div className="card-pad" style={{ display: "grid", gap: 14 }}>
            {[["Dosen Tetap (PNS/PPPK)", 72, "purple"], ["Dosen Kontrak/LB", 14, "blue"], ["Tenaga Kependidikan", 38, "green"], ["Pustakawan & Laboran", 9, "amber"]].map(([l, v, t]) => (<div key={l}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}><span style={{ fontWeight: 600 }}>{l}</span><b>{v}%</b></div><div className="prog"><i style={{ width: v + "%", background: `var(--${t})` }} /></div></div>))}
          </div>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="clock" size={19} style={{ color: "var(--amber)" }} /><h3>Pengajuan Cuti Terbaru</h3><button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("hr_kehadiran")}>Kelola</button></div>
          <div style={{ padding: "4px 0" }}>
            {[["Dewi Lestari, M.Kom", "Cuti Tahunan · 3 hari", "amber"], ["Bambang Santoso", "Cuti Sakit · 2 hari", "blue"], ["Hendra Wijaya, M.T", "Cuti Besar · 12 hari", "amber"]].map(([n, d, t], i, arr) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 22px", borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none" }}>
                <div className="sb-ava" style={{ width: 34, height: 34, fontSize: 12, background: "var(--surface-2)", color: "var(--ink-2)" }}>{initials(n)}</div>
                <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 13.5 }}>{n}</div><div style={{ fontSize: 12, color: "var(--ink-3)" }}>{d}</div></div>
                <Badge tone={t} dot>Menunggu</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HRPegawai() {
  const [q, setQ] = useState(""); const [f, setF] = useState("semua");
  const list = HR_PEGAWAI.filter((p) => (f === "semua" || p.jenis === f) && (p.nama.toLowerCase().includes(q.toLowerCase()) || p.nip.includes(q)));
  const stTone = { PNS: "green", PPPK: "blue", Kontrak: "amber" };
  return (
    <div className="anim-in">
      <PageHead title="Data Pegawai" desc="Master data SDM dosen & tenaga kependidikan — bersumber dari HR Service." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <div className="tb-search" style={{ margin: 0, width: 280 }}><Icon name="search" size={16} /><input placeholder="Cari nama / NIP…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <div className="seg">{[["semua", "Semua"], ["Dosen", "Dosen"], ["Tendik", "Tendik"]].map(([k, l]) => <button key={k} className={f === k ? "on" : ""} onClick={() => setF(k)}>{l}</button>)}</div>
        <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--ink-3)" }}>{list.length} dari 412 pegawai</span>
      </div>
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>NIP</th><th>Nama</th><th>Jenis</th><th>Unit</th><th>Jabatan</th><th>Status</th><th style={{ textAlign: "center" }}>Masa Kerja</th></tr></thead>
            <tbody>{list.map((p) => (<tr key={p.nip}><td className="mono" style={{ color: "var(--ink-3)" }}>{p.nip}</td><td style={{ fontWeight: 700 }}>{p.nama}</td><td><Badge tone={p.jenis === "Dosen" ? "blue" : "gray"}>{p.jenis}</Badge></td><td style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{p.unit}</td><td style={{ fontSize: 13 }}>{p.jabatan}</td><td><Badge tone={stTone[p.status]} dot>{p.status}</Badge></td><td style={{ textAlign: "center", fontWeight: 600 }}>{p.masa}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function HRKehadiran() {
  const toast = useToast();
  const [list, setList] = useState([
    { nama: "Dewi Lestari, M.Kom", jenis: "Cuti Tahunan", durasi: "3 hari", mulai: "30 Jun 2026", status: "menunggu" },
    { nama: "Bambang Santoso", jenis: "Cuti Sakit", durasi: "2 hari", mulai: "24 Jun 2026", status: "menunggu" },
    { nama: "Hendra Wijaya, M.T", jenis: "Cuti Besar", durasi: "12 hari", mulai: "01 Jul 2026", status: "menunggu" },
    { nama: "Yusuf Ramli, M.Kom", jenis: "Dinas Luar", durasi: "1 hari", mulai: "23 Jun 2026", status: "disetujui" },
  ]);
  function act(i, s) { setList((l) => l.map((x, j) => j === i ? { ...x, status: s } : x)); toast(s === "disetujui" ? "Cuti disetujui" : "Cuti ditolak", s === "disetujui" ? "ok" : ""); }
  return (
    <div className="anim-in">
      <PageHead title="Kehadiran & Cuti" desc="Rekap presensi pegawai (integrasi mesin absensi) dan persetujuan pengajuan cuti." />
      <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 18 }}>
        {[["Hadir", 388, "green"], ["Cuti", 8, "amber"], ["Dinas Luar", 4, "blue"], ["Tanpa Keterangan", 2, "red"]].map(([l, v, t]) => (<div key={l} className="stat card" style={{ background: `var(--${t}-bg)`, border: "none" }}><div className="label" style={{ color: `var(--${t})` }}>{l} hari ini</div><div className="value" style={{ color: `var(--${t})` }}>{v}</div></div>))}
      </div>
      <div className="card">
        <div className="card-head"><Icon name="clock" size={19} style={{ color: "var(--amber)" }} /><h3>Pengajuan Cuti</h3></div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Pegawai</th><th>Jenis</th><th>Durasi</th><th>Mulai</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map((x, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700 }}>{x.nama}</td><td><Badge tone="gray">{x.jenis}</Badge></td><td>{x.durasi}</td><td style={{ fontSize: 13 }}>{x.mulai}</td>
                  <td><Badge tone={x.status === "disetujui" ? "green" : x.status === "ditolak" ? "red" : "amber"} dot>{x.status === "disetujui" ? "Disetujui" : x.status === "ditolak" ? "Ditolak" : "Menunggu"}</Badge></td>
                  <td>{x.status === "menunggu" ? <div style={{ display: "flex", gap: 6 }}><button className="btn btn-ghost btn-sm" onClick={() => act(i, "ditolak")}>Tolak</button><button className="btn btn-soft btn-sm" onClick={() => act(i, "disetujui")}><Icon name="check" size={13} /></button></div> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function HRPayroll() {
  const rupiah = window.AIS_DATA.rupiah || ((n) => "Rp " + n.toLocaleString("id"));
  const rows = HR_PEGAWAI.map((p) => { const pokok = p.jenis === "Dosen" ? 6500000 : 4200000; const tunj = p.jabatan.includes("Kepala") ? 3500000 : 1800000; return { ...p, pokok, tunj, total: pokok + tunj }; });
  const total = rows.reduce((a, b) => a + b.total, 0);
  return (
    <div className="anim-in">
      <PageHead title="Penggajian" desc="Komponen gaji & tunjangan periode Juni 2026. Pembayaran terhubung Accounting & Budget Service."
        actions={<button className="btn btn-primary"><Icon name="check" size={16} /> Proses Payroll</button>} />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
        <div><div style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>Periode</div><div style={{ fontWeight: 800, fontSize: 15 }}>Juni 2026</div></div>
        <div style={{ borderLeft: "1px solid var(--line)", paddingLeft: 24 }}><div style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>Total Beban Gaji (412 pegawai)</div><div style={{ fontWeight: 800, fontSize: 15, color: "var(--purple)" }}>Rp 3,84 M</div></div>
        <Badge tone="amber" dot style={{ marginLeft: "auto" }}>Menunggu proses</Badge>
      </div>
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Nama</th><th>Jenis</th><th style={{ textAlign: "right" }}>Gaji Pokok</th><th style={{ textAlign: "right" }}>Tunjangan</th><th style={{ textAlign: "right" }}>Take Home Pay</th></tr></thead>
            <tbody>{rows.map((p) => (<tr key={p.nip}><td style={{ fontWeight: 700 }}>{p.nama}</td><td><Badge tone={p.jenis === "Dosen" ? "blue" : "gray"}>{p.jenis}</Badge></td><td style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{rupiah(p.pokok)}</td><td style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{rupiah(p.tunj)}</td><td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 800 }}>{rupiah(p.total)}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function HRKarir() {
  const usul = [
    { nama: "Dr. Imam Marzuki, M.Kom", dari: "Lektor Kepala", ke: "Guru Besar", kum: "tercapai", status: "proses" },
    { nama: "Dewi Lestari, M.Kom", dari: "Asisten Ahli", ke: "Lektor", kum: "tercapai", status: "verifikasi" },
    { nama: "Dr. Hj. Rina Mahmudah, M.T", dari: "Lektor", ke: "Lektor Kepala", kum: "kurang 12 AK", status: "ditahan" },
  ];
  const st = { proses: ["Diproses ke Kemendikti", "blue"], verifikasi: ["Verifikasi LPM", "amber"], ditahan: ["Belum memenuhi", "red"] };
  return (
    <div className="anim-in">
      <PageHead title="Jabatan & Kepangkatan" desc="Pengusulan jabatan fungsional & angka kredit (PAK) dosen." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Dosen</th><th>Jabatan Saat Ini</th><th>Usulan</th><th>Angka Kredit</th><th>Status</th></tr></thead>
            <tbody>{usul.map((u, i) => (<tr key={i}><td style={{ fontWeight: 700 }}>{u.nama}</td><td>{u.dari}</td><td><Badge tone="purple">{u.ke}</Badge></td><td><Badge tone={u.kum === "tercapai" ? "green" : "red"} dot>{u.kum}</Badge></td><td><Badge tone={st[u.status][1]} dot>{st[u.status][0]}</Badge></td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// AIS — Views: PENGADAAN (Procurement Service)
// ============================================================
function PgdDashboard({ nav }) {
  const R = window.AIS_ROLES; const p = R.personas.pengadaan;
  const tiles = [
    { label: "Permintaan (PR) Baru", value: 4, meta: "menunggu telaah", ic: "clipboard", c: "var(--amber)", bg: "var(--amber-bg)" },
    { label: "PO Berjalan", value: 11, meta: "9 vendor aktif", ic: "cart", c: "var(--blue)", bg: "var(--blue-bg)" },
    { label: "Realisasi Anggaran", value: "62%", meta: "Rp 8,4 M dari Rp 13,5 M", ic: "chart", c: "var(--green)", bg: "var(--green-bg)" },
    { label: "Vendor Terdaftar", value: 48, meta: "5 menunggu verifikasi", ic: "building", c: "var(--purple)", bg: "var(--purple-bg)" },
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="pengadaan" sub="Kelola permintaan pembelian, purchase order, dan vendor sesuai LKPP."
        action={<button className="btn btn-primary" onClick={() => nav("pgd_permintaan")}><Icon name="clipboard" size={17} /> Telaah Permintaan</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 22 }}>
        {tiles.map((t) => (<div key={t.label} className="stat card" style={{ background: t.bg, border: "none" }}><Icon name={t.ic} size={26} className="si" style={{ color: t.c }} /><div className="label" style={{ color: t.c }}>{t.label}</div><div className="value" style={{ color: t.c, fontSize: 28 }}>{t.value}</div><div className="meta" style={{ color: t.c }}>{t.meta}</div></div>))}
      </div>
      <div className="card">
        <div className="card-head"><Icon name="chart" size={19} style={{ color: "var(--green)" }} /><h3>Realisasi per Kategori</h3></div>
        <div className="card-pad" style={{ display: "grid", gap: 14 }}>
          {[["Peralatan Lab & TIK", 78, "blue"], ["ATK & Operasional", 54, "green"], ["Pemeliharaan Gedung", 41, "amber"], ["Pengadaan Buku", 33, "purple"]].map(([l, v, t]) => (<div key={l}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}><span style={{ fontWeight: 600 }}>{l}</span><b>{v}%</b></div><div className="prog"><i style={{ width: v + "%", background: `var(--${t})` }} /></div></div>))}
        </div>
      </div>
    </div>
  );
}

function PgdPermintaan() {
  const rupiah = window.AIS_DATA.rupiah || ((n) => "Rp " + n.toLocaleString("id"));
  const toast = useToast();
  const [list, setList] = useState([
    { no: "PR/2026/06/021", unit: "Lab Komputer FST", item: "20 unit PC Workstation", est: 320000000, status: "baru" },
    { no: "PR/2026/06/022", unit: "Perpustakaan", item: "Langganan e-Journal IEEE", est: 145000000, status: "baru" },
    { no: "PR/2026/06/023", unit: "BAU", item: "AC Split 2PK (12 unit)", est: 78000000, status: "telaah" },
    { no: "PR/2026/06/024", unit: "Prodi SI", item: "Proyektor & layar (4 set)", est: 42000000, status: "baru" },
    { no: "PR/2026/06/019", unit: "PUSTIPANDA", item: "Server rack & UPS", est: 410000000, status: "po" },
  ]);
  const st = { baru: ["Baru", "amber"], telaah: ["Ditelaah", "blue"], po: ["Jadi PO", "green"], tolak: ["Ditolak", "red"] };
  function act(no, s) { setList((l) => l.map((x) => x.no === no ? { ...x, status: s } : x)); toast(s === "po" ? "Permintaan disetujui → PO dibuat" : "Permintaan ditolak", s === "po" ? "ok" : ""); }
  return (
    <div className="anim-in">
      <PageHead title="Permintaan Pembelian (PR)" desc="Telaah permintaan dari unit kerja. Persetujuan menerbitkan Purchase Order otomatis." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>No. PR</th><th>Unit Pengaju</th><th>Item</th><th style={{ textAlign: "right" }}>Estimasi</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map((x) => (
                <tr key={x.no}>
                  <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{x.no}</td>
                  <td style={{ fontWeight: 600 }}>{x.unit}</td>
                  <td>{x.item}</td>
                  <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{rupiah(x.est)}</td>
                  <td><Badge tone={st[x.status][1]} dot>{st[x.status][0]}</Badge></td>
                  <td>{(x.status === "baru" || x.status === "telaah") ? <div style={{ display: "flex", gap: 6 }}><button className="btn btn-ghost btn-sm" onClick={() => act(x.no, "tolak")}>Tolak</button><button className="btn btn-soft btn-sm" onClick={() => act(x.no, "po")}>Setujui</button></div> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PgdPO() {
  const rupiah = window.AIS_DATA.rupiah || ((n) => "Rp " + n.toLocaleString("id"));
  const po = [
    { no: "PO/2026/06/011", vendor: "PT Sinar Komputindo", item: "Server rack & UPS", nilai: 398000000, status: "Dikirim" },
    { no: "PO/2026/06/010", vendor: "CV Mitra Pustaka", item: "Pengadaan 1.200 buku", nilai: 215000000, status: "Diterima" },
    { no: "PO/2026/06/009", vendor: "PT Elektronik Jaya", item: "AC & proyektor", nilai: 120000000, status: "Proses" },
  ];
  const st = { Proses: "amber", Dikirim: "blue", Diterima: "green" };
  return (
    <div className="anim-in">
      <PageHead title="Purchase Order" desc="Pesanan pembelian aktif beserta status pengiriman & penerimaan barang." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>No. PO</th><th>Vendor</th><th>Item</th><th style={{ textAlign: "right" }}>Nilai</th><th>Status</th></tr></thead>
            <tbody>{po.map((x) => (<tr key={x.no}><td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{x.no}</td><td style={{ fontWeight: 700 }}>{x.vendor}</td><td>{x.item}</td><td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{rupiah(x.nilai)}</td><td><Badge tone={st[x.status]} dot>{x.status}</Badge></td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PgdVendor() {
  const v = [
    { nama: "PT Sinar Komputindo", bidang: "Perangkat TIK", npwp: "01.234.567.8", rating: 4.8, status: "Terverifikasi" },
    { nama: "CV Mitra Pustaka", bidang: "Buku & Pustaka", npwp: "02.345.678.9", rating: 4.5, status: "Terverifikasi" },
    { nama: "PT Elektronik Jaya", bidang: "Elektronik", npwp: "03.456.789.0", rating: 4.2, status: "Terverifikasi" },
    { nama: "CV Karya Bangun", bidang: "Konstruksi & MEP", npwp: "04.567.890.1", rating: null, status: "Verifikasi" },
  ];
  return (
    <div className="anim-in">
      <PageHead title="Vendor / Rekanan" desc="Daftar penyedia barang/jasa terdaftar beserta kinerja & status verifikasi." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Vendor</th><th>Bidang</th><th>NPWP</th><th style={{ textAlign: "center" }}>Rating</th><th>Status</th></tr></thead>
            <tbody>{v.map((x) => (<tr key={x.nama}><td style={{ fontWeight: 700 }}>{x.nama}</td><td>{x.bidang}</td><td className="mono" style={{ color: "var(--ink-3)" }}>{x.npwp}</td><td style={{ textAlign: "center", fontWeight: 800, fontFamily: "var(--mono)" }}>{x.rating ? "★ " + x.rating : "—"}</td><td><Badge tone={x.status === "Terverifikasi" ? "green" : "amber"} dot>{x.status}</Badge></td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export { HRDashboard, HRPegawai, HRKehadiran, HRPayroll, HRKarir, PgdDashboard, PgdPermintaan, PgdPO, PgdVendor };
