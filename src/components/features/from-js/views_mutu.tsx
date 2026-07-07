/* eslint-disable */
// @ts-nocheck
// Generated from js/views_mutu.jsx by scripts/port-js-ssot.mjs.
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
// AIS — Views: Penjaminan Mutu (LPM) tambahan (service: qa) — Sequence-Mutu
// Melengkapi LPM dasar (views_lppm): Sasaran & Capaian, Asesor & Asesmen,
// Survei Kepuasan, Dokumen Mutu (SOP), Register Risiko & ISO
// ============================================================

// ---------- FLOW 1: Sasaran Mutu & Monitoring Capaian (19.4.2/19.4.3) ----------
function LpmSasaran() {
  const S = [
    { standar: "Pendidikan", indikator: "Kelulusan tepat waktu", target: 80, capaian: 78, satuan: "%" },
    { standar: "Pendidikan", indikator: "Rata-rata IPK lulusan", target: 3.25, capaian: 3.38, satuan: "" },
    { standar: "Penelitian", indikator: "Publikasi Scopus / dosen", target: 1, capaian: 0.82, satuan: "/thn" },
    { standar: "Pengabdian", indikator: "PkM ber-luaran", target: 60, capaian: 71, satuan: "%" },
    { standar: "SDM", indikator: "Dosen berkualifikasi S3", target: 40, capaian: 32, satuan: "%" },
    { standar: "Tata Kelola", indikator: "Indeks kepuasan layanan", target: 3.2, capaian: 3.36, satuan: "/4" },
  ];
  return (
    <div className="anim-in">
      <PageHead title="Sasaran & Capaian Mutu" desc="Sasaran mutu (indikator + target) per standar dengan monitoring capaian periodik dan gap analysis (PPEPP)." />
      <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th>Standar</th><th>Indikator</th><th style={{ textAlign: "center" }}>Target</th><th style={{ textAlign: "center" }}>Capaian</th><th style={{ width: 180 }}>Progres</th><th style={{ textAlign: "center" }}>Status</th></tr></thead>
        <tbody>{S.map((s, i) => {
          const pct = Math.min(100, Math.round((s.capaian / s.target) * 100));
          const ok = s.capaian >= s.target;
          return (<tr key={i}>
            <td><Badge tone="gray">{s.standar}</Badge></td>
            <td style={{ fontWeight: 700 }}>{s.indikator}</td>
            <td style={{ textAlign: "center", fontFamily: "var(--mono)" }}>{s.target}{s.satuan}</td>
            <td style={{ textAlign: "center", fontFamily: "var(--mono)", fontWeight: 700, color: ok ? "var(--green)" : "var(--amber)" }}>{s.capaian}{s.satuan}</td>
            <td><div className="prog"><i style={{ width: pct + "%", background: ok ? "var(--green)" : "var(--amber)" }} /></div></td>
            <td style={{ textAlign: "center" }}><Badge tone={ok ? "green" : "amber"} dot>{ok ? "Tercapai" : "Gap"}</Badge></td>
          </tr>);
        })}</tbody>
      </table></div></div>
    </div>
  );
}

// ---------- FLOW 2: Asesor & Jadwal Asesmen + Hasil + Tindak Lanjut ----------
function LpmAsesmen() {
  const toast = useToast();
  const asesor = [
    { nama: "Prof. Dr. Ahmad Fauzi", instansi: "Univ. Indonesia", bidang: "Informatika", reg: "AS-4471", status: "Aktif" },
    { nama: "Dr. Ir. Sri Wahyuni, M.T", instansi: "ITS", bidang: "Elektro", reg: "AS-3320", status: "Aktif" },
  ];
  const [jadwal, setJadwal] = useState([
    { prodi: "Teknik Informatika", jenis: "Asesmen Lapangan", tanggal: "18–19 Agu 2026", asesor: "Prof. Ahmad Fauzi", status: "terjadwal" },
    { prodi: "Teknik Elektro", jenis: "Asesmen Kecukupan", tanggal: "05 Sep 2026", asesor: "Dr. Sri Wahyuni", status: "usulan" },
  ]);
  const hasil = [
    { prodi: "Teknik Informatika", peringkat: "Unggul", sk: "1123/SK/BAN-PT/2026", berlaku: "2031", tl: 2 },
    { prodi: "Sistem Informasi", peringkat: "Baik Sekali", sk: "0987/SK/LAM/2025", berlaku: "2030", tl: 3 },
  ];
  return (
    <div className="anim-in">
      <PageHead title="Asesor & Asesmen Akreditasi" desc="Master asesor, penjadwalan asesmen lapangan/kecukupan, hasil akreditasi (peringkat & SK), serta tindak lanjut rekomendasi." />
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="userCheck" size={19} style={{ color: "var(--blue)" }} /><h3>Asesor</h3></div>
          <div style={{ overflowX: "auto" }}><table className="tbl">
            <thead><tr><th>Nama</th><th>Bidang</th><th>Reg.</th></tr></thead>
            <tbody>{asesor.map((a, i) => (<tr key={i}><td><div style={{ fontWeight: 700 }}>{a.nama}</div><div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{a.instansi}</div></td><td><Badge tone="gray">{a.bidang}</Badge></td><td className="mono" style={{ fontSize: 12 }}>{a.reg}</td></tr>))}</tbody>
          </table></div>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="calendar" size={19} style={{ color: "var(--amber)" }} /><h3>Jadwal Asesmen</h3></div>
          <div>{jadwal.map((j, i) => (
            <div key={i} style={{ padding: "13px 22px", borderBottom: i < jadwal.length - 1 ? "1px solid var(--line)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}><b style={{ fontSize: 13.5 }}>{j.prodi}</b><Badge tone={j.status === "terjadwal" ? "green" : "amber"} dot style={{ marginLeft: "auto" }}>{j.status === "terjadwal" ? "Terjadwal" : "Usulan"}</Badge></div>
              <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginBottom: j.status === "usulan" ? 8 : 0 }}>{j.jenis} · {j.tanggal} · {j.asesor}</div>
              {j.status === "usulan" && <button className="btn btn-soft btn-sm" onClick={() => { setJadwal((l) => l.map((x, k) => k === i ? { ...x, status: "terjadwal" } : x)); toast("Jadwal asesmen dikonfirmasi", "ok"); }}>Konfirmasi</button>}
            </div>
          ))}</div>
        </div>
      </div>
      <div className="card">
        <div className="card-head"><Icon name="shield" size={19} style={{ color: "var(--green)" }} /><h3>Hasil Akreditasi & Tindak Lanjut</h3></div>
        <div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>Program Studi</th><th>Peringkat</th><th>Nomor SK</th><th style={{ textAlign: "center" }}>Berlaku s.d.</th><th style={{ textAlign: "center" }}>Tindak Lanjut</th></tr></thead>
          <tbody>{hasil.map((h, i) => (<tr key={i}><td style={{ fontWeight: 700 }}>{h.prodi}</td><td><Badge tone={h.peringkat === "Unggul" ? "green" : "blue"}>{h.peringkat}</Badge></td><td className="mono" style={{ fontSize: 12 }}>{h.sk}</td><td style={{ textAlign: "center" }}>{h.berlaku}</td><td style={{ textAlign: "center" }}><Badge tone={h.tl > 0 ? "amber" : "green"}>{h.tl} rekomendasi</Badge></td></tr>))}</tbody>
        </table></div>
      </div>
    </div>
  );
}

// ---------- FLOW 3: Survei Kepuasan ----------
function LpmSurvei() {
  const toast = useToast();
  const instrumen = [
    { nama: "Kepuasan Layanan Akademik", target: "Mahasiswa", responden: 1840, indeks: 3.36, periode: "2025/2026 Ganjil" },
    { nama: "Kepuasan Layanan Kepegawaian", target: "Dosen & Tendik", responden: 312, indeks: 3.18, periode: "2025/2026 Ganjil" },
    { nama: "Kepuasan Mitra Kerjasama", target: "Mitra", responden: 42, indeks: 3.52, periode: "2025" },
    { nama: "Survei Pengguna Lulusan", target: "Perusahaan", responden: 88, indeks: 3.44, periode: "2025" },
  ];
  const dim = [["Keandalan", 3.4], ["Daya Tanggap", 3.2], ["Jaminan", 3.5], ["Empati", 3.3], ["Bukti Fisik", 3.38]];
  return (
    <div className="anim-in">
      <PageHead title="Survei Kepuasan & Indeks" desc="Instrumen survei kepuasan (mahasiswa, dosen/tendik, mitra, pengguna lulusan). EDOM & tracer study masuk sebagai sumber data."
        actions={<button className="btn btn-primary" onClick={() => toast("Instrumen survei baru dibuka")}><Icon name="plus" size={16} /> Buat Instrumen</button>} />
      <div className="grid" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="star" size={19} style={{ color: "var(--orange-600)" }} /><h3>Instrumen & Indeks</h3></div>
          <div style={{ overflowX: "auto" }}><table className="tbl">
            <thead><tr><th>Instrumen</th><th>Target</th><th style={{ textAlign: "center" }}>Responden</th><th style={{ textAlign: "center" }}>Indeks</th></tr></thead>
            <tbody>{instrumen.map((s, i) => (<tr key={i}><td style={{ fontWeight: 700 }}>{s.nama}<div style={{ fontSize: 11.5, color: "var(--ink-3)", fontWeight: 400 }}>{s.periode}</div></td><td><Badge tone="gray">{s.target}</Badge></td><td style={{ textAlign: "center" }}>{s.responden.toLocaleString("id")}</td><td style={{ textAlign: "center" }}><Badge tone={s.indeks >= 3.25 ? "green" : "amber"}>{s.indeks.toFixed(2)}</Badge></td></tr>))}</tbody>
          </table></div>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="chart" size={19} style={{ color: "var(--blue)" }} /><h3>Dimensi Layanan Akademik</h3></div>
          <div className="card-pad" style={{ display: "grid", gap: 13 }}>
            {dim.map(([l, v]) => (<div key={l}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}><span style={{ fontWeight: 600 }}>{l}</span><b className="mono">{v.toFixed(2)}</b></div><div className="prog"><i style={{ width: (v / 4 * 100) + "%", background: v >= 3.25 ? "var(--green)" : "var(--amber)" }} /></div></div>))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- FLOW 3: Dokumen Mutu (SOP/Manual) ----------
function LpmDokumen() {
  const toast = useToast();
  const [rows, setRows] = useState([
    { kode: "MM-01", jenis: "Manual Mutu", judul: "Manual Mutu SPMI", versi: "4.0", sah: "10 Jan 2026", status: "Berlaku" },
    { kode: "SOP-AKD-12", jenis: "SOP", judul: "SOP Pengisian KRS", versi: "3.1", sah: "05 Jun 2026", status: "Berlaku" },
    { kode: "SOP-KEU-04", jenis: "SOP", judul: "SOP Pembayaran UKT & Cicilan", versi: "2.0", sah: "01 Mar 2026", status: "Berlaku" },
    { kode: "SOP-SDM-07", jenis: "SOP", judul: "SOP Rekrutmen Pegawai", versi: "1.2", sah: "—", status: "Review" },
    { kode: "FRM-AMI-01", jenis: "Formulir", judul: "Instrumen Audit Mutu Internal", versi: "2.3", sah: "12 Feb 2026", status: "Berlaku" },
  ]);
  return (
    <div className="anim-in">
      <PageHead title="Dokumen Mutu" desc="Manual mutu, SOP, dan formulir ber-versi & ber-status pengesahan (kendali dokumen SPMI)."
        actions={<button className="btn btn-primary" onClick={() => toast("Unggah dokumen mutu baru")}><Icon name="plus" size={16} /> Tambah Dokumen</button>} />
      <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th>Kode</th><th>Judul</th><th>Jenis</th><th style={{ textAlign: "center" }}>Versi</th><th style={{ textAlign: "center" }}>Disahkan</th><th>Status</th><th></th></tr></thead>
        <tbody>{rows.map((d, i) => (<tr key={i}>
          <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{d.kode}</td>
          <td style={{ fontWeight: 700 }}>{d.judul}</td>
          <td><Badge tone={d.jenis === "SOP" ? "blue" : d.jenis === "Manual Mutu" ? "purple" : "gray"}>{d.jenis}</Badge></td>
          <td style={{ textAlign: "center", fontFamily: "var(--mono)" }}>{d.versi}</td>
          <td style={{ textAlign: "center", fontSize: 12.5 }}>{d.sah}</td>
          <td><Badge tone={d.status === "Berlaku" ? "green" : "amber"} dot>{d.status}</Badge></td>
          <td>{d.status === "Review" ? <button className="btn btn-soft btn-sm" onClick={() => { setRows((l) => l.map((x, j) => j === i ? { ...x, status: "Berlaku", sah: "05 Jul 2026" } : x)); toast("Dokumen disahkan & diberlakukan", "ok"); }}>Sahkan</button> : <button className="btn btn-ghost btn-sm"><Icon name="download" size={14} /></button>}</td>
        </tr>))}</tbody>
      </table></div></div>
    </div>
  );
}

// ---------- FLOW 3: Register Risiko & ISO ----------
function LpmRisiko() {
  const risiko = [
    { kode: "RSK-01", unit: "FST", deskripsi: "Penurunan jumlah pendaftar prodi tertentu", kategori: "Strategis", prob: "Sedang", dampak: "Tinggi", level: "Tinggi", mitigasi: "berjalan" },
    { kode: "RSK-02", unit: "PUSTIPANDA", deskripsi: "Gangguan layanan SIAKAD saat KRS", kategori: "Operasional", prob: "Rendah", dampak: "Tinggi", level: "Sedang", mitigasi: "berjalan" },
    { kode: "RSK-03", unit: "Keuangan", deskripsi: "Keterlambatan pelaporan keuangan", kategori: "Kepatuhan", prob: "Rendah", dampak: "Sedang", level: "Rendah", mitigasi: "selesai" },
  ];
  const iso = [
    { jenis: "ISO 9001:2015", lembaga: "SGS", nomor: "ID-9001-2231", berlaku: "2027", status: "Berlaku" },
    { jenis: "ISO 21001:2018", lembaga: "TUV", nomor: "ID-21001-0455", berlaku: "2026", status: "Surveilans" },
  ];
  const lvlTone = { Tinggi: "red", Sedang: "amber", Rendah: "green" };
  return (
    <div className="anim-in">
      <PageHead title="Register Risiko & Sertifikasi ISO" desc="Register risiko unit (probabilitas × dampak → level), mitigasi, dan sertifikasi ISO/eksternal (audit surveilans)." />
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-head"><Icon name="warn" size={19} style={{ color: "var(--red)" }} /><h3>Register Risiko</h3></div>
        <div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>Kode</th><th>Unit</th><th>Deskripsi Risiko</th><th>Kategori</th><th style={{ textAlign: "center" }}>Level</th><th>Mitigasi</th></tr></thead>
          <tbody>{risiko.map((r) => (<tr key={r.kode}><td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{r.kode}</td><td style={{ fontSize: 12.5 }}>{r.unit}</td><td style={{ fontWeight: 700, maxWidth: 280 }}>{r.deskripsi}</td><td><Badge tone="gray">{r.kategori}</Badge></td><td style={{ textAlign: "center" }}><Badge tone={lvlTone[r.level]} dot={r.level === "Tinggi"}>{r.level}</Badge></td><td><Badge tone={r.mitigasi === "selesai" ? "green" : "blue"} dot>{r.mitigasi === "selesai" ? "Selesai" : "Berjalan"}</Badge></td></tr>))}</tbody>
        </table></div>
      </div>
      <div className="card">
        <div className="card-head"><Icon name="award" size={19} style={{ color: "var(--purple)" }} /><h3>Sertifikasi ISO / Eksternal</h3></div>
        <div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>Sertifikasi</th><th>Lembaga</th><th>Nomor</th><th style={{ textAlign: "center" }}>Berlaku s.d.</th><th>Status</th></tr></thead>
          <tbody>{iso.map((s, i) => (<tr key={i}><td style={{ fontWeight: 700 }}>{s.jenis}</td><td style={{ fontSize: 12.5 }}>{s.lembaga}</td><td className="mono" style={{ fontSize: 12 }}>{s.nomor}</td><td style={{ textAlign: "center" }}>{s.berlaku}</td><td><Badge tone={s.status === "Berlaku" ? "green" : "amber"} dot>{s.status}</Badge></td></tr>))}</tbody>
        </table></div>
      </div>
    </div>
  );
}

export { LpmSasaran, LpmAsesmen, LpmSurvei, LpmDokumen, LpmRisiko };
