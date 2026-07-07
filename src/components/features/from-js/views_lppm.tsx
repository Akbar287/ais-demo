/* eslint-disable */
// @ts-nocheck
// Generated from js/views_lppm.jsx by scripts/port-js-ssot.mjs.
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
// AIS — Views: LPPM (Penelitian & PkM) + Penjaminan Mutu (LPM)
// Service: lppm (Research & Community), qa (Quality Assurance)
// ============================================================

// ---------------- LPPM ----------------
const LPPM_HIBAH = [
  { kode: "PDP", nama: "Penelitian Dosen Pemula", dana: 20000000, kuota: 25, terpakai: 18, jenis: "Penelitian", status: "Dibuka" },
  { kode: "PTU", nama: "Penelitian Terapan Unggulan", dana: 75000000, kuota: 10, terpakai: 10, jenis: "Penelitian", status: "Penuh" },
  { kode: "PKM-M", nama: "Pengabdian kepada Masyarakat", dana: 15000000, kuota: 30, terpakai: 12, jenis: "Pengabdian", status: "Dibuka" },
  { kode: "PDK", nama: "Penelitian Kerjasama Dalam Negeri", dana: 50000000, kuota: 8, terpakai: 3, jenis: "Penelitian", status: "Dibuka" },
];

const LPPM_PROPOSAL = [
  { judul: "Model Deteksi Hoaks Bahasa Indonesia Berbasis LLM", ketua: "Dr. Imam Marzuki", skema: "PTU", dana: 75000000, tahap: "review", reviewer: "2/2", skor: 84 },
  { judul: "Sistem Irigasi Pintar Berbasis IoT untuk Petani", ketua: "Hendra Wijaya, M.T", skema: "PDK", dana: 48000000, tahap: "review", reviewer: "1/2", skor: null },
  { judul: "Literasi Digital bagi UMKM Desa Cibening", ketua: "Dewi Lestari, M.Kom", skema: "PKM-M", dana: 14500000, tahap: "lolos", reviewer: "2/2", skor: 88 },
  { judul: "Analisis Big Data Mobilitas Kota dengan Spark", ketua: "Bambang Sutejo, M.Kom", skema: "PDP", dana: 19500000, tahap: "revisi", reviewer: "2/2", skor: 71 },
  { judul: "Optimasi Rantai Pasok Halal Berbasis Blockchain", ketua: "Dr. Hj. Rina Mahmudah", skema: "PTU", dana: 72000000, tahap: "ditolak", reviewer: "2/2", skor: 58 },
  { judul: "Edukasi Stunting via Aplikasi Mobile", ketua: "Nurul Aini, M.Kom", skema: "PKM-M", dana: 15000000, tahap: "review", reviewer: "0/2", skor: null },
];
const PROP_TONE = { review: ["Sedang Direview", "amber"], lolos: ["Lolos Didanai", "green"], revisi: ["Perlu Revisi", "blue"], ditolak: ["Ditolak", "red"] };

const LPPM_LUARAN = [
  { judul: "A Transformer Approach for Indonesian Fake News", jenis: "Jurnal Q1", venue: "IEEE Access", tahun: 2026, status: "Published" },
  { judul: "IoT-based Smart Irrigation: A Field Study", jenis: "Prosiding", venue: "ICACSIS 2025", tahun: 2025, status: "Published" },
  { judul: "Blockchain for Halal Supply Chain", jenis: "Jurnal Q2", venue: "Heliyon", tahun: 2026, status: "Under Review" },
  { judul: "Buku Ajar: Pembelajaran Mesin Terapan", jenis: "Buku", venue: "Penerbit Kampus", tahun: 2025, status: "Terbit" },
];

const LPPM_HKI = [
  { judul: "Aplikasi Deteksi Hoaks 'CekFakta'", jenis: "Hak Cipta", nomor: "EC00202612345", status: "Granted" },
  { judul: "Alat Irigasi Pintar Surya", jenis: "Paten Sederhana", nomor: "S00202600891", status: "Proses" },
  { judul: "Logo & Merek 'HalalChain'", jenis: "Merek", nomor: "DID2026012345", status: "Granted" },
];

function rupiahJt(n) { return "Rp " + (n / 1000000).toLocaleString("id") + " jt"; }

function LppmDashboard({ nav }) {
  const R = window.AIS_ROLES; const p = R.personas.lppm;
  const totalDana = LPPM_PROPOSAL.filter((x) => x.tahap === "lolos").reduce((a, b) => a + b.dana, 0);
  const tiles = [
    { label: "Skema Hibah Aktif", value: LPPM_HIBAH.filter((h) => h.status === "Dibuka").length, meta: "dari " + LPPM_HIBAH.length + " skema", ic: "gift", c: "var(--blue)", bg: "var(--blue-bg)" },
    { label: "Proposal Masuk", value: LPPM_PROPOSAL.length, meta: "menunggu & diproses", ic: "doc", c: "var(--purple)", bg: "var(--purple-bg)" },
    { label: "Dana Disetujui", value: "Rp 89,5 jt", meta: "tahun berjalan", ic: "wallet", c: "var(--green)", bg: "var(--green-bg)", small: true },
    { label: "Luaran & HKI", value: LPPM_LUARAN.length + LPPM_HKI.length, meta: LPPM_LUARAN.length + " publikasi · " + LPPM_HKI.length + " HKI", ic: "beaker", c: "var(--orange-600)", bg: "var(--orange-50)" },
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="lppm" sub="Kelola hibah penelitian & pengabdian, review proposal, luaran publikasi, dan HKI."
        action={<button className="btn btn-primary" onClick={() => nav("lppm_proposal")}><Icon name="doc" size={17} /> Review Proposal</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 22 }}>
        {tiles.map((t) => (
          <div key={t.label} className="stat card" style={{ background: t.bg, border: "none" }}>
            <Icon name={t.ic} size={26} className="si" style={{ color: t.c }} />
            <div className="label" style={{ color: t.c }}>{t.label}</div>
            <div className="value" style={{ color: t.c, fontSize: t.small ? 22 : 32 }}>{t.value}</div>
            <div className="meta" style={{ color: t.c }}>{t.meta}</div>
          </div>
        ))}
      </div>
      <div className="grid" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="doc" size={19} style={{ color: "var(--purple)" }} /><h3>Proposal Perlu Tindakan</h3>
            <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("lppm_proposal")}>Semua</button></div>
          <div>
            {LPPM_PROPOSAL.filter((x) => x.tahap === "review").map((x, i, arr) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 22px", borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5, lineHeight: 1.35 }}>{x.judul}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{x.ketua} · {x.skema} · {rupiahJt(x.dana)}</div>
                </div>
                <Badge tone={x.reviewer === "2/2" ? "green" : "amber"}>Reviewer {x.reviewer}</Badge>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="chart" size={19} style={{ color: "var(--blue)" }} /><h3>Serapan Hibah</h3></div>
          <div className="card-pad" style={{ display: "grid", gap: 14 }}>
            {LPPM_HIBAH.map((h) => {
              const pct = Math.round(h.terpakai / h.kuota * 100);
              return (
                <div key={h.kode}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 13 }}>
                    <span style={{ fontWeight: 600 }}><span className="mono" style={{ color: "var(--ink-3)" }}>{h.kode}</span> {h.nama}</span>
                    <b className="mono">{h.terpakai}/{h.kuota}</b>
                  </div>
                  <div className="prog"><i style={{ width: pct + "%", background: pct >= 100 ? "var(--red)" : "var(--blue)" }} /></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function LppmHibah() {
  return (
    <div className="anim-in">
      <PageHead title="Skema Hibah" desc="Skema pendanaan penelitian & pengabdian yang dibuka tahun ini — dari Research & Community Service." />
      <div className="grid" style={{ gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
        {LPPM_HIBAH.map((h) => (
          <div key={h.kode} className="card card-pad">
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: h.jenis === "Penelitian" ? "var(--blue-bg)" : "var(--green-bg)", color: h.jenis === "Penelitian" ? "var(--blue)" : "var(--green)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="gift" size={22} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 15 }}>{h.nama}</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}><span className="mono">{h.kode}</span> · {h.jenis}</div>
              </div>
              <Badge tone={h.status === "Dibuka" ? "green" : "amber"} dot>{h.status}</Badge>
            </div>
            <div style={{ display: "flex", gap: 20, marginBottom: 14 }}>
              <div><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>Dana / Judul</div><div style={{ fontWeight: 800, fontFamily: "var(--mono)", fontSize: 15 }}>{rupiahJt(h.dana)}</div></div>
              <div><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>Kuota</div><div style={{ fontWeight: 800, fontFamily: "var(--mono)", fontSize: 15 }}>{h.terpakai}/{h.kuota}</div></div>
            </div>
            <div className="prog"><i style={{ width: (h.terpakai / h.kuota * 100) + "%", background: h.jenis === "Penelitian" ? "var(--blue)" : "var(--green)" }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LppmProposal() {
  const toast = useToast();
  const [list, setList] = useState(LPPM_PROPOSAL.map((x) => ({ ...x })));
  const [detail, setDetail] = useState(null);
  function decide(judul, tahap) { setList((l) => l.map((x) => x.judul === judul ? { ...x, tahap } : x)); setDetail(null); toast(tahap === "lolos" ? "Proposal disetujui untuk didanai" : tahap === "revisi" ? "Proposal diminta revisi" : "Proposal ditolak", tahap === "lolos" ? "ok" : ""); }
  return (
    <div className="anim-in">
      <PageHead title="Proposal & Review" desc="Seleksi proposal hibah. Keputusan memublikasikan event ke pengusul & keuangan untuk pencairan." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Judul</th><th>Ketua</th><th>Skema</th><th style={{ textAlign: "right" }}>Dana</th><th style={{ textAlign: "center" }}>Reviewer</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map((x) => (
                <tr key={x.judul}>
                  <td style={{ fontWeight: 700, maxWidth: 280 }}>{x.judul}</td>
                  <td style={{ color: "var(--ink-2)", fontSize: 13 }}>{x.ketua}</td>
                  <td><Badge tone="gray">{x.skema}</Badge></td>
                  <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{rupiahJt(x.dana)}</td>
                  <td style={{ textAlign: "center" }}><Badge tone={x.reviewer === "2/2" ? "green" : "amber"}>{x.reviewer}</Badge></td>
                  <td><Badge tone={PROP_TONE[x.tahap][1]} dot>{PROP_TONE[x.tahap][0]}</Badge></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => setDetail(x)}>Tinjau</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {detail && (
        <Modal title={detail.judul} subtitle={detail.ketua + " · " + detail.skema} onClose={() => setDetail(null)}
          footer={detail.tahap === "review" ? <>
            <button className="btn btn-ghost" onClick={() => decide(detail.judul, "ditolak")}>Tolak</button>
            <button className="btn btn-ghost" onClick={() => decide(detail.judul, "revisi")}>Minta Revisi</button>
            <button className="btn btn-primary" onClick={() => decide(detail.judul, "lolos")}><Icon name="check" size={16} /> Setujui Danai</button>
          </> : <button className="btn btn-ghost" onClick={() => setDetail(null)}>Tutup</button>}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            {[["Skema", detail.skema], ["Usulan Dana", rupiahJt(detail.dana)], ["Reviewer", detail.reviewer], ["Skor", detail.skor ?? "Belum dinilai"]].map(([l, v]) => (
              <div key={l} style={{ padding: 12, background: "var(--surface-2)", borderRadius: 11 }}><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{l}</div><div style={{ fontWeight: 700, fontSize: 14, marginTop: 3 }}>{v}</div></div>
            ))}
          </div>
          {detail.skor != null && (
            <div><div style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600, marginBottom: 6 }}>Skor reviewer</div>
              <div className="prog" style={{ height: 12 }}><i style={{ width: detail.skor + "%", background: detail.skor >= 75 ? "var(--green)" : detail.skor >= 60 ? "var(--amber)" : "var(--red)" }} /></div>
              <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 5 }}>Ambang lolos ≥ 75</div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

function LppmLuaran() {
  const tone = { "Published": "green", "Terbit": "green", "Under Review": "amber" };
  return (
    <div className="anim-in">
      <PageHead title="Luaran & Publikasi" desc="Capaian luaran penelitian: jurnal, prosiding, dan buku." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Judul</th><th>Jenis</th><th>Venue</th><th style={{ textAlign: "center" }}>Tahun</th><th>Status</th></tr></thead>
            <tbody>
              {LPPM_LUARAN.map((x, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700, maxWidth: 320 }}>{x.judul}</td>
                  <td><Badge tone={x.jenis.includes("Q1") ? "green" : x.jenis.includes("Q2") ? "blue" : "gray"}>{x.jenis}</Badge></td>
                  <td style={{ color: "var(--ink-2)" }}>{x.venue}</td>
                  <td style={{ textAlign: "center" }}>{x.tahun}</td>
                  <td><Badge tone={tone[x.status] || "gray"} dot>{x.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LppmHKI() {
  const tone = { Granted: "green", Proses: "amber" };
  return (
    <div className="anim-in">
      <PageHead title="HKI & Paten" desc="Kekayaan intelektual: hak cipta, paten, dan merek hasil riset sivitas." />
      <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        {LPPM_HKI.map((x, i) => (
          <div key={i} className="card card-pad">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--orange-50)", color: "var(--orange-600)", display: "grid", placeItems: "center" }}><Icon name="award" size={20} /></div>
              <Badge tone={tone[x.status]} dot>{x.status}</Badge>
            </div>
            <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.4, marginBottom: 8 }}>{x.judul}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}><Badge tone="purple">{x.jenis}</Badge></div>
            <div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>No. {x.nomor}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- Penjaminan Mutu (LPM) ----------------
const LPM_AUDIT = [
  { unit: "Prodi Teknik Informatika", auditor: "Dr. Sri Wahyuni", jadwal: "24 Jun 2026", status: "terjadwal", skor: null },
  { unit: "Prodi Sistem Informasi", auditor: "Dr. Bambang H.", jadwal: "20 Jun 2026", status: "berlangsung", skor: null },
  { unit: "Biro Keuangan", auditor: "Hesti Rahayu, M.M", jadwal: "12 Jun 2026", status: "selesai", skor: 88 },
  { unit: "Perpustakaan", auditor: "Dr. Sri Wahyuni", jadwal: "10 Jun 2026", status: "selesai", skor: 92 },
];
const AUDIT_TONE = { terjadwal: ["Terjadwal", "blue"], berlangsung: ["Berlangsung", "amber"], selesai: ["Selesai", "green"] };

const LPM_AKRED = [
  { unit: "Teknik Informatika", lembaga: "LAM INFOKOM", peringkat: "Unggul", berlaku: "2028", sisa: 65 },
  { unit: "Sistem Informasi", lembaga: "LAM INFOKOM", peringkat: "Baik Sekali", berlaku: "2027", sisa: 40 },
  { unit: "Institusi (APT)", lembaga: "BAN-PT", peringkat: "Unggul", berlaku: "2029", sisa: 80 },
  { unit: "Teknik Elektro", lembaga: "LAM Teknik", peringkat: "Baik Sekali", berlaku: "2026", sisa: 18 },
];

const LPM_TEMUAN = [
  { unit: "Sistem Informasi", kategori: "Mayor", temuan: "Dokumen RPS 4 MK belum diperbarui", status: "open", tenggat: "30 Jun 2026" },
  { unit: "Biro Keuangan", kategori: "Minor", temuan: "Belum ada SOP rekonsiliasi bulanan tertulis", status: "proses", tenggat: "15 Jul 2026" },
  { unit: "Teknik Informatika", kategori: "Observasi", temuan: "Tingkatkan keterlibatan alumni dalam kurikulum", status: "closed", tenggat: "—" },
  { unit: "Perpustakaan", kategori: "Minor", temuan: "Rasio koleksi mutakhir di bawah standar", status: "open", tenggat: "31 Jul 2026" },
];
const TEMUAN_TONE = { open: ["Terbuka", "red"], proses: ["Tindak Lanjut", "amber"], closed: ["Selesai", "green"] };
const KAT_TONE = { Mayor: "red", Minor: "amber", Observasi: "blue" };

const LPM_STANDAR = [
  { nama: "Standar Kompetensi Lulusan", capaian: 94 }, { nama: "Standar Isi Pembelajaran", capaian: 88 },
  { nama: "Standar Proses Pembelajaran", capaian: 91 }, { nama: "Standar Penilaian", capaian: 86 },
  { nama: "Standar Dosen & Tendik", capaian: 79 }, { nama: "Standar Sarana & Prasarana", capaian: 82 },
  { nama: "Standar Pengelolaan", capaian: 90 }, { nama: "Standar Pembiayaan", capaian: 95 },
];

function LpmDashboard({ nav }) {
  const R = window.AIS_ROLES; const p = R.personas.lpm;
  const open = LPM_TEMUAN.filter((t) => t.status !== "closed").length;
  const avg = Math.round(LPM_STANDAR.reduce((a, b) => a + b.capaian, 0) / LPM_STANDAR.length);
  const tiles = [
    { label: "Audit Mutu (AMI)", value: LPM_AUDIT.length, meta: LPM_AUDIT.filter((a) => a.status === "selesai").length + " selesai", ic: "check", c: "var(--green)", bg: "var(--green-bg)" },
    { label: "Capaian Standar", value: avg + "%", meta: "rata-rata 8 SN-Dikti", ic: "target", c: "var(--blue)", bg: "var(--blue-bg)" },
    { label: "Temuan Terbuka", value: open, meta: "perlu tindak lanjut", ic: "flag", c: "var(--red)", bg: "var(--red-bg)" },
    { label: "Akreditasi Unggul", value: LPM_AKRED.filter((a) => a.peringkat === "Unggul").length, meta: "dari " + LPM_AKRED.length + " unit", ic: "shield", c: "var(--purple)", bg: "var(--purple-bg)" },
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="lpm" sub="Pantau capaian standar mutu, audit internal, akreditasi, dan tindak lanjut temuan."
        action={<button className="btn btn-primary" onClick={() => nav("lpm_audit")}><Icon name="check" size={17} /> Audit Mutu</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 22 }}>
        {tiles.map((t) => (
          <div key={t.label} className="stat card" style={{ background: t.bg, border: "none" }}>
            <Icon name={t.ic} size={26} className="si" style={{ color: t.c }} />
            <div className="label" style={{ color: t.c }}>{t.label}</div>
            <div className="value" style={{ color: t.c }}>{t.value}</div>
            <div className="meta" style={{ color: t.c }}>{t.meta}</div>
          </div>
        ))}
      </div>
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="target" size={19} style={{ color: "var(--blue)" }} /><h3>Capaian Standar Nasional</h3>
            <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("lpm_standar")}>Detail</button></div>
          <div className="card-pad" style={{ display: "grid", gap: 12 }}>
            {LPM_STANDAR.slice(0, 5).map((s) => (
              <div key={s.nama}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 12.5 }}><span style={{ fontWeight: 600 }}>{s.nama}</span><b className="mono">{s.capaian}%</b></div>
                <div className="prog"><i style={{ width: s.capaian + "%", background: s.capaian >= 90 ? "var(--green)" : s.capaian >= 80 ? "var(--blue)" : "var(--amber)" }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="flag" size={19} style={{ color: "var(--red)" }} /><h3>Temuan Audit Terbuka</h3>
            <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("lpm_temuan")}>Kelola</button></div>
          <div>
            {LPM_TEMUAN.filter((t) => t.status !== "closed").map((t, i, arr) => (
              <div key={i} style={{ padding: "13px 22px", borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <Badge tone={KAT_TONE[t.kategori]} dot>{t.kategori}</Badge>
                  <span style={{ fontSize: 12.5, fontWeight: 700 }}>{t.unit}</span>
                  <span style={{ marginLeft: "auto", fontSize: 11.5, color: "var(--ink-3)" }}>Tenggat {t.tenggat}</span>
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-2)" }}>{t.temuan}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LpmAudit() {
  const toast = useToast();
  return (
    <div className="anim-in">
      <PageHead title="Audit Mutu Internal (AMI)" desc="Jadwal dan hasil audit mutu tiap unit kerja — siklus PPEPP."
        actions={<button className="btn btn-primary" onClick={() => toast("Form jadwal audit dibuka")}><Icon name="plus" size={16} /> Jadwalkan Audit</button>} />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Unit Teraudit</th><th>Auditor</th><th>Jadwal</th><th style={{ textAlign: "center" }}>Skor</th><th>Status</th></tr></thead>
            <tbody>
              {LPM_AUDIT.map((a, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700 }}>{a.unit}</td>
                  <td style={{ color: "var(--ink-2)" }}>{a.auditor}</td>
                  <td style={{ fontSize: 13 }}>{a.jadwal}</td>
                  <td style={{ textAlign: "center", fontWeight: 800, fontFamily: "var(--mono)", color: a.skor ? (a.skor >= 85 ? "var(--green)" : "var(--amber)") : "var(--ink-3)" }}>{a.skor ?? "—"}</td>
                  <td><Badge tone={AUDIT_TONE[a.status][1]} dot>{AUDIT_TONE[a.status][0]}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LpmAkreditasi() {
  const tone = { Unggul: "green", "Baik Sekali": "blue", Baik: "amber" };
  return (
    <div className="anim-in">
      <PageHead title="Akreditasi" desc="Status akreditasi program studi dan institusi beserta masa berlaku." />
      <div className="grid" style={{ gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
        {LPM_AKRED.map((a, i) => (
          <div key={i} className="card card-pad">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: "var(--purple-bg)", color: "var(--purple)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="shield" size={22} /></div>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 15 }}>{a.unit}</div><div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{a.lembaga}</div></div>
              <Badge tone={tone[a.peringkat]} dot>{a.peringkat}</Badge>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 6 }}>
              <span style={{ color: "var(--ink-3)" }}>Berlaku s.d. {a.berlaku}</span>
              <b style={{ color: a.sisa < 25 ? "var(--red)" : "var(--ink)" }}>{a.sisa < 25 ? "Segera reakreditasi" : "Aktif"}</b>
            </div>
            <div className="prog"><i style={{ width: a.sisa + "%", background: a.sisa < 25 ? "var(--red)" : "var(--green)" }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LpmTemuan() {
  const toast = useToast();
  const [list, setList] = useState(LPM_TEMUAN.map((x) => ({ ...x })));
  function advance(idx) { setList((l) => l.map((t, i) => i === idx ? { ...t, status: t.status === "open" ? "proses" : "closed" } : t)); toast("Status tindak lanjut diperbarui", "ok"); }
  return (
    <div className="anim-in">
      <PageHead title="Temuan & Tindak Lanjut" desc="Daftar temuan audit dan rencana tindak lanjut (RTL) tiap unit." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Unit</th><th>Kategori</th><th>Temuan</th><th>Tenggat</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map((t, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700 }}>{t.unit}</td>
                  <td><Badge tone={KAT_TONE[t.kategori]} dot={t.kategori === "Mayor"}>{t.kategori}</Badge></td>
                  <td style={{ color: "var(--ink-2)", maxWidth: 300 }}>{t.temuan}</td>
                  <td style={{ fontSize: 13 }}>{t.tenggat}</td>
                  <td><Badge tone={TEMUAN_TONE[t.status][1]} dot>{TEMUAN_TONE[t.status][0]}</Badge></td>
                  <td>{t.status !== "closed" ? <button className="btn btn-soft btn-sm" onClick={() => advance(i)}>{t.status === "open" ? "Tindak Lanjut" : "Tutup"}</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>✓</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LpmStandar() {
  return (
    <div className="anim-in">
      <PageHead title="Standar Mutu" desc="Capaian terhadap 8 Standar Nasional Pendidikan Tinggi (SN-Dikti)." />
      <div className="card">
        <div className="card-head"><Icon name="target" size={19} style={{ color: "var(--blue)" }} /><h3>Capaian per Standar</h3></div>
        <div className="card-pad" style={{ display: "grid", gap: 16 }}>
          {LPM_STANDAR.map((s) => (
            <div key={s.nama}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13.5 }}><span style={{ fontWeight: 600 }}>{s.nama}</span><b className="mono" style={{ color: s.capaian >= 90 ? "var(--green)" : s.capaian >= 80 ? "var(--blue)" : "var(--amber)" }}>{s.capaian}%</b></div>
              <div className="prog" style={{ height: 12 }}><i style={{ width: s.capaian + "%", background: s.capaian >= 90 ? "var(--green)" : s.capaian >= 80 ? "var(--blue)" : "var(--amber)" }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { LppmDashboard, LppmHibah, LppmProposal, LppmLuaran, LppmHKI, LpmDashboard, LpmAudit, LpmAkreditasi, LpmTemuan, LpmStandar };
