/* eslint-disable */
// @ts-nocheck
// Generated from js/views_pimpinan.jsx by scripts/port-js-ssot.mjs.
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
// AIS — Views: PIMPINAN — Monitor Eksekutif per Domain (read-only)
// Sequence-Pimpinan: dasbor lintas domain + drill-down detail + persetujuan.
// Reuse chart helpers global: PimpBarChart, PimpDonut, PimpArea, PimpStacked, PimpGauge
// ============================================================
const pmpRp = (n) => "Rp " + Math.round(n).toLocaleString("id");

// mini bar horizontal utk tabel/detail
function PmpBars({ rows }) {
  const max = Math.max(...rows.map((r) => r.v), 1);
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {rows.map((r) => (
        <div key={r.l}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 4 }}><span style={{ fontWeight: 600 }}>{r.l}</span><b className="mono">{r.d || r.v}</b></div>
          <div className="prog"><i style={{ width: (r.v / max * 100) + "%", background: r.c || "var(--blue)" }} /></div>
        </div>
      ))}
    </div>
  );
}
function PmpHead({ title, sub }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}><Icon name={sub || "chart"} size={17} style={{ color: "var(--blue)" }} /><b style={{ fontSize: 13.5 }}>{title}</b></div>;
}
function PmpStat({ tiles }) {
  return (
    <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 18 }}>
      {tiles.map((t) => (
        <div key={t.label} className="stat card" style={{ background: t.bg || "var(--surface)", border: t.bg ? "none" : "1px solid var(--line)" }}>
          <div className="label" style={{ color: t.c }}>{t.label}</div>
          <div className="value" style={{ fontSize: 24, color: t.c }}>{t.value}</div>
          {t.delta && <div className="meta" style={{ color: t.up ? "var(--green)" : t.up === false ? "var(--red)" : "var(--ink-3)", fontWeight: 700 }}>{t.delta}</div>}
        </div>
      ))}
    </div>
  );
}

// ===================== 1) AKADEMIK =====================
function PimpAkademik() {
  const [detail, setDetail] = useState(null);
  const prodi = [
    { nama: "Teknik Informatika", mhs: 642, ipk: 3.42, hadir: 91, lulus: 82, a: 38, b: 42, c: 16, de: 4, akr: "Unggul" },
    { nama: "Sistem Informasi", mhs: 588, ipk: 3.38, hadir: 89, lulus: 79, a: 34, b: 45, c: 17, de: 4, akr: "Baik Sekali" },
    { nama: "Teknik Elektro", mhs: 414, ipk: 3.29, hadir: 86, lulus: 74, a: 28, b: 46, c: 21, de: 5, akr: "Baik Sekali" },
    { nama: "Ekonomi Syariah", mhs: 702, ipk: 3.35, hadir: 90, lulus: 81, a: 33, b: 47, c: 17, de: 3, akr: "Unggul" },
    { nama: "Manajemen", mhs: 560, ipk: 3.31, hadir: 88, lulus: 77, a: 30, b: 46, c: 20, de: 4, akr: "Baik Sekali" },
  ];
  const tren = [{ l: "2022", v: 74 }, { l: "2023", v: 76 }, { l: "2024", v: 78 }, { l: "2025", v: 80 }, { l: "2026", v: 82 }];
  const admisi = [{ l: "Pendaftar", v: 18400, c: "var(--blue)" }, { l: "Lulus Tes", v: 3100, c: "var(--purple)" }, { l: "Diterima", v: 3050, c: "var(--amber)" }, { l: "Registrasi", v: 2710, c: "var(--green)" }];
  const evaluasi = [{ l: "Normal", v: 11480, c: "var(--green)" }, { l: "Terancam (SP)", v: 620, c: "var(--amber)" }, { l: "Risiko DO", v: 210, c: "var(--red)" }, { l: "Cuti", v: 170, c: "var(--blue)" }];
  return (
    <div className="anim-in">
      <PageHead title="Monitor Akademik" desc="Indikator akademik lintas prodi: admisi, kehadiran, distribusi nilai, evaluasi studi. Klik prodi untuk detail. (mewakili Kaprodi/BAA/Dosen)" />
      <PmpStat tiles={[
        { label: "Mahasiswa Aktif", value: "12.480", c: "var(--blue)", bg: "var(--blue-bg)", delta: "+4,2% YoY", up: true },
        { label: "IPK Rata-rata", value: "3,35", c: "var(--green)", bg: "var(--green-bg)", delta: "+0,04", up: true },
        { label: "Kelulusan Tepat Waktu", value: "82%", c: "var(--purple)", bg: "var(--purple-bg)", delta: "+2 pt", up: true },
        { label: "Risiko DO", value: "210", c: "var(--red)", bg: "var(--red-bg)", delta: "perlu perhatian", up: false },
      ]} />
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr 1fr", marginBottom: 18 }}>
        <div className="card card-pad"><PmpHead title="Corong Admisi 2026" sub="clipboard" /><PmpBars rows={admisi.map((a) => ({ ...a, d: a.v.toLocaleString("id") }))} /></div>
        <div className="card card-pad"><PmpHead title="Tren Kelulusan Tepat Waktu (%)" sub="chart" /><PimpArea data={tren} color="var(--purple)" /></div>
        <div className="card card-pad"><PmpHead title="Sebaran Evaluasi Studi" sub="users" /><PimpDonut segs={evaluasi} /></div>
      </div>
      <div className="card">
        <div className="card-head"><Icon name="grad" size={19} style={{ color: "var(--blue)" }} /><h3>Kinerja Akademik per Program Studi</h3><span className="sub">· klik baris untuk detail</span></div>
        <div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>Program Studi</th><th style={{ textAlign: "center" }}>Mhs</th><th style={{ textAlign: "center" }}>IPK</th><th style={{ textAlign: "center" }}>Kehadiran</th><th style={{ textAlign: "center" }}>Lulus Tepat</th><th>Akreditasi</th><th></th></tr></thead>
          <tbody>{prodi.map((p) => (
            <tr key={p.nama} style={{ cursor: "pointer" }} onClick={() => setDetail(p)}>
              <td style={{ fontWeight: 700 }}>{p.nama}</td>
              <td style={{ textAlign: "center" }}>{p.mhs}</td>
              <td style={{ textAlign: "center", fontFamily: "var(--mono)", fontWeight: 700 }}>{p.ipk.toFixed(2)}</td>
              <td style={{ textAlign: "center" }}><Badge tone={p.hadir >= 90 ? "green" : "amber"}>{p.hadir}%</Badge></td>
              <td style={{ textAlign: "center" }}>{p.lulus}%</td>
              <td><Badge tone={p.akr === "Unggul" ? "green" : "blue"}>{p.akr}</Badge></td>
              <td><Icon name="chevR" size={15} style={{ color: "var(--ink-3)" }} /></td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
      {detail && (
        <Modal wide title={detail.nama} subtitle="Detail kinerja akademik prodi" onClose={() => setDetail(null)} footer={<button className="btn btn-ghost" onClick={() => setDetail(null)}>Tutup</button>}>
          <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 18 }}>
            {[["Mahasiswa", detail.mhs, "blue"], ["IPK Rata²", detail.ipk.toFixed(2), "green"], ["Kehadiran", detail.hadir + "%", "amber"], ["Lulus Tepat", detail.lulus + "%", "purple"]].map(([l, v, c]) => (
              <div key={l} style={{ padding: 13, borderRadius: 11, background: `var(--${c}-bg)` }}><div style={{ fontSize: 11, color: `var(--${c})`, fontWeight: 700 }}>{l}</div><div className="mono" style={{ fontWeight: 800, fontSize: 18, color: `var(--${c})` }}>{v}</div></div>
            ))}
          </div>
          <PmpHead title="Distribusi Nilai" sub="award" />
          <PmpBars rows={[{ l: "A", v: detail.a, d: detail.a + "%", c: "var(--green)" }, { l: "B", v: detail.b, d: detail.b + "%", c: "var(--blue)" }, { l: "C", v: detail.c, d: detail.c + "%", c: "var(--amber)" }, { l: "D/E", v: detail.de, d: detail.de + "%", c: "var(--red)" }]} />
        </Modal>
      )}
    </div>
  );
}

// ===================== 2) KEUANGAN =====================
function PimpKeuangan() {
  const [detail, setDetail] = useState(null);
  const unit = [
    { nama: "Fakultas Sains & Teknologi", pagu: 18500, realisasi: 12400, komponen: [["Pegawai", 7200], ["Operasional", 3400], ["Modal/Aset", 1800]] },
    { nama: "Fakultas Ekonomi & Bisnis", pagu: 12200, realisasi: 8600, komponen: [["Pegawai", 5100], ["Operasional", 2600], ["Modal/Aset", 900]] },
    { nama: "Biro Akademik & Umum", pagu: 9800, realisasi: 6900, komponen: [["Pegawai", 3800], ["Operasional", 2500], ["Modal/Aset", 600]] },
    { nama: "LPPM & Penjaminan Mutu", pagu: 7400, realisasi: 4100, komponen: [["Hibah", 2600], ["Operasional", 1100], ["Modal/Aset", 400]] },
  ];
  const kas = [{ l: "Jan", v: 78 }, { l: "Feb", v: 82 }, { l: "Mar", v: 75 }, { l: "Apr", v: 90 }, { l: "Mei", v: 88 }, { l: "Jun", v: 96 }];
  const aging = [{ l: "Belum jatuh tempo", v: 3100, c: "var(--green)" }, { l: "1–30 hari", v: 2400, c: "var(--amber)" }, { l: "31–60 hari", v: 980, c: "var(--orange-600)" }, { l: "> 60 hari", v: 620, c: "var(--red)" }];
  const laporan = [["Laporan Posisi Keuangan", "Jun 2026", "Terbit"], ["Laporan Aktivitas", "Jun 2026", "Terbit"], ["Laporan Arus Kas", "Jun 2026", "Terbit"], ["SPT Masa PPh 21", "Jun 2026", "Lapor"]];
  return (
    <div className="anim-in">
      <PageHead title="Monitor Keuangan & Tata Kelola" desc="Posisi keuangan, realisasi anggaran per unit, piutang (aging), dan laporan resmi ber-TTE. Klik unit untuk rincian. (mewakili Keuangan/Akuntansi)" />
      <PmpStat tiles={[
        { label: "Penerimaan YTD", value: "Rp 96,4 M", c: "var(--green)", bg: "var(--green-bg)", delta: "+8,1% YoY", up: true },
        { label: "Realisasi Anggaran", value: "68%", c: "var(--blue)", bg: "var(--blue-bg)", delta: "Rp 96/141 M", up: true },
        { label: "Piutang > 60 hari", value: "Rp 620 jt", c: "var(--red)", bg: "var(--red-bg)", delta: "64 mahasiswa", up: false },
        { label: "Saldo Kas & Bank", value: "Rp 38,2 M", c: "var(--purple)", bg: "var(--purple-bg)", delta: "6 rekening", up: null },
      ]} />
      <div className="grid" style={{ gridTemplateColumns: "1.3fr 1fr", marginBottom: 18 }}>
        <div className="card card-pad"><PmpHead title="Tren Arus Kas Bulanan (Rp M)" sub="wallet" /><PimpArea data={kas} color="var(--blue)" /></div>
        <div className="card card-pad"><PmpHead title="Umur Piutang (Rp jt)" sub="chart" /><PmpBars rows={aging.map((a) => ({ ...a, d: "Rp " + a.v }))} /></div>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
        <div className="card">
          <div className="card-head"><Icon name="scale" size={19} style={{ color: "var(--green)" }} /><h3>Realisasi Anggaran per Unit (Rp jt)</h3><span className="sub">· klik untuk rincian</span></div>
          <div style={{ overflowX: "auto" }}><table className="tbl">
            <thead><tr><th>Unit</th><th style={{ textAlign: "right" }}>Pagu</th><th style={{ textAlign: "right" }}>Realisasi</th><th style={{ width: 120 }}>%</th><th></th></tr></thead>
            <tbody>{unit.map((u) => { const pct = Math.round(u.realisasi / u.pagu * 100); return (
              <tr key={u.nama} style={{ cursor: "pointer" }} onClick={() => setDetail(u)}>
                <td style={{ fontWeight: 700 }}>{u.nama}</td>
                <td style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{u.pagu.toLocaleString("id")}</td>
                <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{u.realisasi.toLocaleString("id")}</td>
                <td><div className="prog"><i style={{ width: pct + "%", background: pct > 80 ? "var(--amber)" : "var(--green)" }} /></div><div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 3 }}>{pct}%</div></td>
                <td><Icon name="chevR" size={15} style={{ color: "var(--ink-3)" }} /></td>
              </tr>
            ); })}</tbody>
          </table></div>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="doc" size={19} style={{ color: "var(--purple)" }} /><h3>Laporan Resmi</h3></div>
          <div>{laporan.map(([j, p, s], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 22px", borderBottom: i < laporan.length - 1 ? "1px solid var(--line)" : "none" }}>
              <Icon name="doc" size={16} style={{ color: "var(--ink-3)" }} /><div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 13 }}>{j}</div><div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{p}</div></div>
              <Badge tone="green" dot>{s}</Badge>
            </div>
          ))}</div>
        </div>
      </div>
      {detail && (
        <Modal title={detail.nama} subtitle="Rincian realisasi anggaran (Rp jt)" onClose={() => setDetail(null)} footer={<button className="btn btn-ghost" onClick={() => setDetail(null)}>Tutup</button>}>
          <div style={{ display: "flex", gap: 20, marginBottom: 16, flexWrap: "wrap" }}>
            {[["Pagu", detail.pagu], ["Realisasi", detail.realisasi], ["Sisa", detail.pagu - detail.realisasi]].map(([l, v]) => (<div key={l}><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{l}</div><div className="mono" style={{ fontWeight: 800, fontSize: 16 }}>Rp {v.toLocaleString("id")} jt</div></div>))}
          </div>
          <PmpHead title="Komposisi Belanja" sub="scale" />
          <PmpBars rows={detail.komponen.map(([l, v], i) => ({ l, v, d: "Rp " + v.toLocaleString("id"), c: ["var(--blue)", "var(--green)", "var(--amber)"][i] }))} />
        </Modal>
      )}
    </div>
  );
}

// ===================== 3) RISET, PKM & KEMAHASISWAAN =====================
function PimpRiset() {
  const [detail, setDetail] = useState(null);
  const iku = [{ l: "2023", v: 62 }, { l: "2024", v: 68 }, { l: "2025", v: 74 }, { l: "2026", v: 79 }];
  const skema = [{ l: "Penelitian Dasar", v: 42, c: "var(--blue)" }, { l: "Terapan", v: 28, c: "var(--purple)" }, { l: "Pengabdian (PkM)", v: 36, c: "var(--green)" }, { l: "Hibah Eksternal", v: 14, c: "var(--amber)" }];
  const prog = [
    { nama: "MBKM", peserta: 210, selesai: 168, dana: "Rp 2,4 M", detail: [["Magang Bersertifikat", 96], ["Studi Independen", 54], ["Kampus Mengajar", 34], ["Riset/PMM", 26]] },
    { nama: "PKL / Magang", peserta: 340, selesai: 300, dana: "Rp 0,3 M", detail: [["Industri TIK", 140], ["Perbankan", 80], ["Pemerintahan", 70], ["Startup", 50]] },
    { nama: "KKN", peserta: 480, selesai: 452, dana: "Rp 1,1 M", detail: [["Digitalisasi UMKM", 210], ["Literasi Digital", 140], ["Kebangsaan", 130]] },
    { nama: "Beasiswa", peserta: 200, selesai: 200, dana: "Rp 6,8 M", detail: [["KIP-Kuliah", 120], ["Prestasi", 40], ["Mitra (BI/BSI)", 40]] },
  ];
  return (
    <div className="anim-in">
      <PageHead title="Monitor Riset, PkM & Kemahasiswaan" desc="Kinerja riset (proposal/luaran/IKU), pengabdian, beasiswa, dan program MBKM/PKL/KKN. Klik program untuk rincian. (mewakili LPPM/Kemahasiswaan/MBKM/KKN)" />
      <PmpStat tiles={[
        { label: "Proposal Didanai", value: "84", c: "var(--blue)", bg: "var(--blue-bg)", delta: "dari 132 usulan", up: true },
        { label: "Luaran / Publikasi", value: "146", c: "var(--purple)", bg: "var(--purple-bg)", delta: "62 Scopus", up: true },
        { label: "Penerima Beasiswa", value: "200", c: "var(--green)", bg: "var(--green-bg)", delta: "Rp 6,8 M", up: true },
        { label: "Capaian IKU", value: "79%", c: "var(--amber)", bg: "var(--amber-bg)", delta: "+5 pt", up: true },
      ]} />
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: 18 }}>
        <div className="card card-pad"><PmpHead title="Tren Capaian IKU (%)" sub="chart" /><PimpArea data={iku} color="var(--amber)" /></div>
        <div className="card card-pad"><PmpHead title="Komposisi Skema Riset & PkM" sub="beaker" /><PimpDonut segs={skema} /></div>
      </div>
      <div className="card">
        <div className="card-head"><Icon name="link" size={19} style={{ color: "var(--green)" }} /><h3>Program Pengalaman & Beasiswa</h3><span className="sub">· klik untuk rincian</span></div>
        <div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>Program</th><th style={{ textAlign: "center" }}>Peserta</th><th style={{ textAlign: "center" }}>Selesai</th><th style={{ width: 130 }}>Penyelesaian</th><th style={{ textAlign: "right" }}>Dana</th><th></th></tr></thead>
          <tbody>{prog.map((p) => { const pct = Math.round(p.selesai / p.peserta * 100); return (
            <tr key={p.nama} style={{ cursor: "pointer" }} onClick={() => setDetail(p)}>
              <td style={{ fontWeight: 700 }}>{p.nama}</td>
              <td style={{ textAlign: "center" }}>{p.peserta}</td>
              <td style={{ textAlign: "center" }}>{p.selesai}</td>
              <td><div className="prog"><i style={{ width: pct + "%", background: pct >= 90 ? "var(--green)" : "var(--blue)" }} /></div><div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 3 }}>{pct}%</div></td>
              <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{p.dana}</td>
              <td><Icon name="chevR" size={15} style={{ color: "var(--ink-3)" }} /></td>
            </tr>
          ); })}</tbody>
        </table></div>
      </div>
      {detail && (
        <Modal title={detail.nama} subtitle="Rincian peserta program" onClose={() => setDetail(null)} footer={<button className="btn btn-ghost" onClick={() => setDetail(null)}>Tutup</button>}>
          <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
            {[["Peserta", detail.peserta], ["Selesai", detail.selesai], ["Dana", detail.dana]].map(([l, v]) => (<div key={l}><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{l}</div><div className="mono" style={{ fontWeight: 800, fontSize: 16 }}>{v}</div></div>))}
          </div>
          <PmpHead title="Sebaran per Kategori" sub="users" />
          <PmpBars rows={detail.detail.map(([l, v], i) => ({ l, v, c: ["var(--blue)", "var(--green)", "var(--purple)", "var(--amber)"][i % 4] }))} />
        </Modal>
      )}
    </div>
  );
}

// ===================== 4) MUTU & AKREDITASI =====================
function PimpMutu() {
  const [detail, setDetail] = useState(null);
  const akr = [
    { prodi: "Teknik Informatika", peringkat: "Unggul", sk: "1123/BAN-PT/2026", berlaku: 2031, sisa: 60, tl: 2 },
    { prodi: "Sistem Informasi", peringkat: "Baik Sekali", sk: "0987/LAM/2025", berlaku: 2030, sisa: 48, tl: 3 },
    { prodi: "Teknik Elektro", peringkat: "Baik Sekali", sk: "0654/BAN-PT/2022", berlaku: 2026, sisa: 8, tl: 1 },
    { prodi: "Ekonomi Syariah", peringkat: "Unggul", sk: "1201/LAM-EMBA/2027", berlaku: 2032, sisa: 72, tl: 0 },
  ];
  const capaian = [{ l: "Pendidikan", v: 88, c: "var(--green)" }, { l: "Penelitian", v: 74, c: "var(--amber)" }, { l: "Pengabdian", v: 82, c: "var(--blue)" }, { l: "Tata Kelola", v: 90, c: "var(--purple)" }, { l: "SDM", v: 68, c: "var(--red)" }];
  return (
    <div className="anim-in">
      <PageHead title="Monitor Mutu & Akreditasi" desc="Status akreditasi per prodi (peringatan dini kedaluwarsa), capaian sasaran mutu, dan tindak lanjut. (mewakili Penjaminan Mutu/LPM)" />
      <PmpStat tiles={[
        { label: "Prodi Unggul", value: "2 / 8", c: "var(--green)", bg: "var(--green-bg)" },
        { label: "Akreditasi Aktif", value: "100%", c: "var(--blue)", bg: "var(--blue-bg)" },
        { label: "Segera Kedaluwarsa", value: "1", c: "var(--red)", bg: "var(--red-bg)", delta: "Teknik Elektro (2026)", up: false },
        { label: "Capaian Mutu", value: "80%", c: "var(--purple)", bg: "var(--purple-bg)", delta: "rata-rata standar", up: true },
      ]} />
      <div className="grid" style={{ gridTemplateColumns: "1fr 1.4fr", marginBottom: 18 }}>
        <div className="card card-pad"><PmpHead title="Capaian Sasaran Mutu per Standar (%)" sub="target" /><PmpBars rows={capaian} /></div>
        <div className="card card-pad" style={{ display: "flex", flexDirection: "column" }}>
          <PmpHead title="Peringatan Dini Akreditasi" sub="warn" />
          <div style={{ display: "grid", gap: 10 }}>
            {akr.filter((a) => a.sisa <= 12).map((a) => (
              <div key={a.prodi} style={{ display: "flex", alignItems: "center", gap: 12, padding: 13, background: "var(--red-bg)", borderRadius: 12 }}>
                <Icon name="flag" size={18} style={{ color: "var(--red)" }} /><div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 13.5 }}>{a.prodi}</div><div style={{ fontSize: 12, color: "var(--ink-2)" }}>Akreditasi berlaku s.d. {a.berlaku} — siapkan reakreditasi ({a.sisa} bln)</div></div>
              </div>
            ))}
            <div style={{ fontSize: 12.5, color: "var(--ink-3)", padding: "4px 2px" }}>Prodi lain aman (masa berlaku &gt; 1 tahun).</div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-head"><Icon name="shield" size={19} style={{ color: "var(--green)" }} /><h3>Status Akreditasi per Prodi</h3><span className="sub">· klik untuk detail</span></div>
        <div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>Program Studi</th><th>Peringkat</th><th>Nomor SK</th><th style={{ textAlign: "center" }}>Berlaku s.d.</th><th style={{ textAlign: "center" }}>Tindak Lanjut</th><th></th></tr></thead>
          <tbody>{akr.map((a) => (
            <tr key={a.prodi} style={{ cursor: "pointer" }} onClick={() => setDetail(a)}>
              <td style={{ fontWeight: 700 }}>{a.prodi}</td>
              <td><Badge tone={a.peringkat === "Unggul" ? "green" : "blue"}>{a.peringkat}</Badge></td>
              <td className="mono" style={{ fontSize: 12 }}>{a.sk}</td>
              <td style={{ textAlign: "center" }}><Badge tone={a.sisa <= 12 ? "red" : "gray"} dot={a.sisa <= 12}>{a.berlaku}</Badge></td>
              <td style={{ textAlign: "center" }}>{a.tl > 0 ? <Badge tone="amber">{a.tl} rekomendasi</Badge> : <Badge tone="green">Tuntas</Badge>}</td>
              <td><Icon name="chevR" size={15} style={{ color: "var(--ink-3)" }} /></td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
      {detail && (
        <Modal title={detail.prodi} subtitle="Detail akreditasi & tindak lanjut" onClose={() => setDetail(null)} footer={<button className="btn btn-ghost" onClick={() => setDetail(null)}>Tutup</button>}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            {[["Peringkat", detail.peringkat], ["Nomor SK", detail.sk], ["Berlaku sampai", detail.berlaku], ["Sisa masa", detail.sisa + " bulan"]].map(([l, v]) => (<div key={l} style={{ padding: 12, background: "var(--surface-2)", borderRadius: 11 }}><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{l}</div><div style={{ fontWeight: 700, fontSize: 13.5, marginTop: 3 }}>{v}</div></div>))}
          </div>
          <div style={{ padding: 13, background: detail.tl > 0 ? "var(--amber-bg)" : "var(--green-bg)", borderRadius: 12, display: "flex", gap: 10, alignItems: "center" }}>
            <Icon name={detail.tl > 0 ? "flag" : "check"} size={18} style={{ color: detail.tl > 0 ? "#a6760e" : "var(--green)" }} />
            <span style={{ fontSize: 13.5, fontWeight: 600 }}>{detail.tl > 0 ? detail.tl + " rekomendasi asesor sedang ditindaklanjuti" : "Seluruh rekomendasi telah tuntas"}</span>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ===================== 5) SDM =====================
function PimpSDM() {
  const komposisi = [{ l: "PNS", v: 45, c: "var(--blue)" }, { l: "Dosen Tetap Non-PNS", v: 25, c: "var(--purple)" }, { l: "PPPK", v: 20, c: "var(--green)" }, { l: "Kontrak/Honorer", v: 10, c: "var(--amber)" }];
  const jafung = [{ l: "Guru Besar", v: 18, c: "var(--red)" }, { l: "Lektor Kepala", v: 64, c: "var(--purple)" }, { l: "Lektor", v: 112, c: "var(--blue)" }, { l: "Asisten Ahli", v: 96, c: "var(--green)" }];
  const kontrak = [["Dewi Lestari, M.Kom", "TI · FST", "31 Agu 2026", 57], ["Rian Hidayat, S.Kom", "PUSTIPANDA", "30 Jun 2026", 25]];
  return (
    <div className="anim-in">
      <PageHead title="Monitor SDM & Kepegawaian" desc="Komposisi pegawai, jabatan fungsional & serdos dosen, kinerja, serta kontrak yang mendekati berakhir. (mewakili SDM)" />
      <PmpStat tiles={[
        { label: "Total Pegawai", value: "412", c: "var(--blue)", bg: "var(--blue-bg)", delta: "290 dosen · 122 tendik", up: null },
        { label: "Dosen S3", value: "32%", c: "var(--purple)", bg: "var(--purple-bg)", delta: "target 40%", up: false },
        { label: "Serdos", value: "76%", c: "var(--green)", bg: "var(--green-bg)", delta: "220 dosen", up: true },
        { label: "Kontrak Berakhir ≤90h", value: "5", c: "var(--amber)", bg: "var(--amber-bg)", delta: "perlu perpanjangan", up: false },
      ]} />
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: 18 }}>
        <div className="card card-pad"><PmpHead title="Komposisi Status Kepegawaian" sub="idcard" /><PimpStacked segs={komposisi} /></div>
        <div className="card card-pad"><PmpHead title="Jabatan Fungsional Dosen" sub="award" /><PmpBars rows={jafung} /></div>
      </div>
      <div className="card">
        <div className="card-head"><Icon name="clock" size={19} style={{ color: "var(--amber)" }} /><h3>Kontrak Mendekati Berakhir (H-60)</h3></div>
        <div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>Pegawai</th><th>Unit</th><th style={{ textAlign: "center" }}>Berakhir</th><th style={{ textAlign: "center" }}>Sisa</th></tr></thead>
          <tbody>{kontrak.map(([n, u, t, s], i) => (<tr key={i}><td style={{ fontWeight: 700 }}>{n}</td><td style={{ fontSize: 12.5 }}>{u}</td><td style={{ textAlign: "center" }}>{t}</td><td style={{ textAlign: "center" }}><Badge tone="red">{s} hari</Badge></td></tr>))}</tbody>
        </table></div>
      </div>
    </div>
  );
}

// ===================== 6) KOTAK PERSETUJUAN STRATEGIS =====================
function PimpPersetujuan() {
  const toast = useToast();
  const [list, setList] = useState([
    { id: "WF-3039", proses: "Purchase Order Server Data Center", asal: "Pengadaan", nominal: "Rp 398 jt", tenggat: "1 hari", prioritas: "tinggi", st: "pending" },
    { id: "WF-3037", proses: "Perpanjangan MoU PT GoTo", asal: "Kerjasama", nominal: "—", tenggat: "2 hari", prioritas: "sedang", st: "pending" },
    { id: "WF-2990", proses: "SK Yudisium Periode II (312 lulusan)", asal: "Akademik", nominal: "—", tenggat: "3 hari", prioritas: "tinggi", st: "pending" },
    { id: "WF-2988", proses: "Revisi RKAT Fakultas Kedokteran", asal: "Keuangan", nominal: "Rp 1,2 M", tenggat: "4 hari", prioritas: "sedang", st: "pending" },
    { id: "WF-2980", proses: "SK Drop Out (evaluasi studi)", asal: "Akademik", nominal: "—", tenggat: "5 hari", prioritas: "rendah", st: "pending" },
  ]);
  const [detail, setDetail] = useState(null);
  const prio = { tinggi: "red", sedang: "amber", rendah: "gray" };
  function act(id, st) { setList((l) => l.map((x) => x.id === id ? { ...x, st } : x)); setDetail(null); toast(st === "approved" ? "Disetujui — alur dilanjutkan & tercatat di audit" : "Ditolak — dikembalikan ke pengusul", st === "approved" ? "ok" : ""); }
  const pending = list.filter((x) => x.st === "pending");
  return (
    <div className="anim-in">
      <PageHead title="Kotak Persetujuan Strategis" desc="Satu kotak masuk untuk seluruh persetujuan strategis lintas unit (RKAT, PO, SK, MoU) dengan tenggat/SLA. Keputusan tercatat di audit." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
        <Badge tone="blue" dot>{pending.length} menunggu</Badge>
        <Badge tone="green">{list.filter((x) => x.st === "approved").length} disetujui</Badge>
        <Badge tone="red">{list.filter((x) => x.st === "rejected").length} ditolak</Badge>
        <span style={{ marginLeft: "auto", fontSize: 12.5, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 7 }}><Icon name="workflow" size={15} /> Workflow & Approval</span>
      </div>
      <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th>Kode</th><th>Proses</th><th>Asal Unit</th><th style={{ textAlign: "right" }}>Nominal</th><th style={{ textAlign: "center" }}>Tenggat</th><th>Prioritas</th><th></th></tr></thead>
        <tbody>{list.map((x) => (
          <tr key={x.id}>
            <td className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{x.id}</td>
            <td style={{ fontWeight: 700 }}>{x.proses}</td>
            <td><Badge tone="gray">{x.asal}</Badge></td>
            <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{x.nominal}</td>
            <td style={{ textAlign: "center", fontSize: 12.5 }}>{x.tenggat}</td>
            <td>{x.st === "pending" ? <Badge tone={prio[x.prioritas]} dot={x.prioritas === "tinggi"}>{x.prioritas}</Badge> : <Badge tone={x.st === "approved" ? "green" : "red"} dot>{x.st === "approved" ? "Disetujui" : "Ditolak"}</Badge>}</td>
            <td>{x.st === "pending" ? <button className="btn btn-soft btn-sm" onClick={() => setDetail(x)}>Tinjau</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>—</span>}</td>
          </tr>
        ))}</tbody>
      </table></div></div>
      {detail && (
        <Modal title={detail.proses} subtitle={detail.id + " · dari " + detail.asal} onClose={() => setDetail(null)}
          footer={<><button className="btn btn-ghost" onClick={() => act(detail.id, "rejected")}>Tolak</button><button className="btn btn-primary" onClick={() => act(detail.id, "approved")}><Icon name="check" size={16} /> Setujui</button></>}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            {[["Asal Unit", detail.asal], ["Nominal", detail.nominal], ["Tenggat", detail.tenggat], ["Prioritas", detail.prioritas]].map(([l, v]) => (<div key={l} style={{ padding: 12, background: "var(--surface-2)", borderRadius: 11 }}><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{l}</div><div style={{ fontWeight: 700, fontSize: 13.5, marginTop: 3 }}>{v}</div></div>))}
          </div>
          <div className="field" style={{ margin: 0 }}><label>Catatan Keputusan (opsional)</label><textarea rows={2} placeholder="Tambahkan pertimbangan…" /></div>
        </Modal>
      )}
    </div>
  );
}

export { PimpAkademik, PimpKeuangan, PimpRiset, PimpMutu, PimpSDM, PimpPersetujuan };
