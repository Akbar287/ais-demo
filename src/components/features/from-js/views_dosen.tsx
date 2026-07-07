/* eslint-disable */
// @ts-nocheck
// Generated from js/views_dosen.jsx by scripts/port-js-ssot.mjs.
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
// AIS — Views: DOSEN (mengajar, presensi, nilai, TA) + Profil Staf
// ============================================================

// ---- mock roster generator (deterministik) ----
const NAMA_DEPAN = ["Ahmad","Siti","Budi","Dewi","Rizki","Putri","Fajar","Nia","Arif","Lia","Dimas","Sari","Bayu","Indah","Yoga","Mega","Galih","Tari","Hadi","Wulan","Reza","Fitri","Andi","Maya","Iqbal","Nadia","Doni","Rina","Eka","Vina","Teguh","Citra"];
const NAMA_BLK = ["Pratama","Lestari","Saputra","Anggraini","Maulana","Wijaya","Nuraini","Hidayat","Permata","Ramadhan","Kusuma","Santoso","Halim","Pertiwi","Firmansyah","Oktaviani"];
function buatRoster(prefix, n, seed) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = (seed * 7 + i * 13) % NAMA_DEPAN.length;
    const b = (seed * 3 + i * 5) % NAMA_BLK.length;
    const nim = prefix + String(1000 + ((seed * 131 + i * 37) % 8999)).padStart(4, "0");
    out.push({ no: i + 1, nim, nama: NAMA_DEPAN[a] + " " + NAMA_BLK[b] });
  }
  return out;
}

const KELAS_DIAMPU = [
  { kode: "TIF5101", nama: "Kecerdasan Buatan", kelas: "5A", sks: 3, hari: "Senin", jam: "08:00–10:30", ruang: "FST-301", mhs: 32, pertemuan: 12, total: 14, nilaiTerisi: 0, semester: "2025/2026 Ganjil" },
  { kode: "TIF5101", nama: "Kecerdasan Buatan", kelas: "5B", sks: 3, hari: "Rabu", jam: "13:00–15:30", ruang: "FST-302", mhs: 29, pertemuan: 12, total: 14, nilaiTerisi: 0, semester: "2025/2026 Ganjil" },
  { kode: "TIF3105", nama: "Pemrograman Web", kelas: "3A", sks: 3, hari: "Selasa", jam: "08:00–10:30", ruang: "Lab-Komputer 2", mhs: 35, pertemuan: 13, total: 14, nilaiTerisi: 35, semester: "2025/2026 Ganjil" },
  { kode: "TIF7203", nama: "Machine Learning", kelas: "7A", sks: 3, hari: "Kamis", jam: "10:00–12:30", ruang: "Lab-AI", mhs: 24, pertemuan: 12, total: 14, nilaiTerisi: 12, semester: "2025/2026 Ganjil" },
];

const BIMBINGAN_TA = [
  { nim: "11200910000021", nama: "Galih Firmansyah", judul: "Deteksi Dini Penyakit Daun Padi Menggunakan CNN", tahap: "Bimbingan Bab 4", progress: 70, peran: "Pembimbing I", terakhir: "2 hari lalu", jadwalSidang: null },
  { nim: "11200910000034", nama: "Maya Anggraini", judul: "Sistem Rekomendasi Mata Kuliah dengan Collaborative Filtering", tahap: "Siap Sidang", progress: 95, peran: "Pembimbing I", terakhir: "Kemarin", jadwalSidang: "28 Jun 2026" },
  { nim: "11200910000052", nama: "Doni Kusuma", judul: "Analisis Sentimen Ulasan E-Commerce Berbasis BERT", tahap: "Bimbingan Bab 3", progress: 55, peran: "Pembimbing II", terakhir: "5 hari lalu", jadwalSidang: null },
  { nim: "11210910000007", nama: "Vina Permata", judul: "Optimasi Penjadwalan Kuliah dengan Algoritma Genetika", tahap: "Proposal Disetujui", progress: 30, peran: "Pembimbing I", terakhir: "1 minggu lalu", jadwalSidang: null },
];

// ===================== DOSEN — DASHBOARD =====================
function DosenDashboard({ nav }) {
  const R = window.AIS_ROLES;
  const p = R.personas.dosen;
  const totalMhs = KELAS_DIAMPU.reduce((a, b) => a + b.mhs, 0);
  const belumNilai = KELAS_DIAMPU.filter((k) => k.nilaiTerisi < k.mhs).length;
  const hariIni = KELAS_DIAMPU.filter((k) => k.hari === "Senin");

  const tiles = [
    { label: "Kelas Diampu", value: KELAS_DIAMPU.length, meta: "Semester ganjil", ic: "presentation", c: "var(--blue)", bg: "var(--blue-bg)" },
    { label: "Total Mahasiswa", value: totalMhs, meta: "lintas kelas", ic: "users", c: "var(--purple)", bg: "var(--purple-bg)" },
    { label: "Nilai Belum Lengkap", value: belumNilai + " kelas", meta: "input sebelum 26 Jun", ic: "award", c: "var(--orange-600)", bg: "var(--orange-50)", small: true },
    { label: "Bimbingan TA", value: BIMBINGAN_TA.length, meta: "1 siap sidang", ic: "doc", c: "var(--green)", bg: "var(--green-bg)" },
  ];

  return (
    <div className="anim-in">
      <StaffHero persona={p} role="dosen" sub="Kelola perkuliahan, presensi, dan penilaian kelas Anda."
        action={<button className="btn btn-primary" onClick={() => nav("dsn_nilai")}><Icon name="award" size={17} /> Input Nilai</button>} />

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

      <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr" }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="clock" size={19} style={{ color: "var(--blue)" }} /><h3>Mengajar Hari Ini · Senin</h3>
            <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("dsn_jadwal")}>Jadwal Penuh</button></div>
          <div style={{ padding: "8px 0" }}>
            {hariIni.length ? hariIni.map((k, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "13px 24px" }}>
                <div style={{ textAlign: "center", minWidth: 58 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, fontFamily: "var(--mono)" }}>{k.jam.split("–")[0]}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>{k.jam.split("–")[1]}</div>
                </div>
                <div style={{ width: 3, alignSelf: "stretch", borderRadius: 4, background: "var(--blue)" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{k.nama} <span style={{ color: "var(--ink-3)", fontWeight: 600 }}>· {k.kelas}</span></div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{k.mhs} mahasiswa · pertemuan {k.pertemuan + 1} dari {k.total}</div>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => nav("dsn_presensi")}><Icon name="check" size={14} /> Presensi</button>
              </div>
            )) : <div className="empty">Tidak ada jadwal mengajar hari ini.</div>}
          </div>
        </div>

        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="doc" size={19} style={{ color: "var(--green)" }} /><h3>Bimbingan Terbaru</h3></div>
          <div>
            {BIMBINGAN_TA.slice(0, 3).map((b, i) => (
              <div key={i} style={{ padding: "13px 22px", borderBottom: i < 2 ? "1px solid var(--line)" : "none", cursor: "pointer" }} onClick={() => nav("dsn_ta")}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <span style={{ fontWeight: 700, fontSize: 13 }}>{b.nama}</span>
                  {b.jadwalSidang && <Badge tone="green">Sidang {b.jadwalSidang}</Badge>}
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-2)", lineHeight: 1.4, marginBottom: 7 }}>{b.judul}</div>
                <div className="prog"><i style={{ width: b.progress + "%", background: "var(--green)" }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================== DOSEN — KELAS DIAMPU =====================
function DosenKelas({ nav }) {
  return (
    <div className="anim-in">
      <PageHead title="Kelas Diampu" desc="Daftar kelas yang Anda ampu pada semester berjalan — sumber dari Class & Learning Service." />
      <div className="grid" style={{ gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
        {KELAS_DIAMPU.map((k, i) => {
          const lengkap = k.nilaiTerisi >= k.mhs;
          return (
            <div key={i} className="card card-pad">
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 13, display: "grid", placeItems: "center", background: "var(--blue-bg)", color: "var(--blue)", flexShrink: 0 }}><Icon name="presentation" size={22} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: 15.5 }}>{k.nama}</div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}><span className="mono">{k.kode}</span> · Kelas {k.kelas} · {k.sks} SKS</div>
                </div>
                <Badge tone={lengkap ? "green" : "amber"}>{lengkap ? "Nilai lengkap" : "Nilai " + k.nilaiTerisi + "/" + k.mhs}</Badge>
              </div>
              <div style={{ display: "flex", gap: 18, margin: "16px 0", flexWrap: "wrap" }}>
                {[["Jadwal", k.hari + " " + k.jam], ["Ruang", k.ruang], ["Mahasiswa", k.mhs], ["Pertemuan", k.pertemuan + "/" + k.total]].map(([l, v]) => (
                  <div key={l}><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{l}</div><div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>{v}</div></div>
                ))}
              </div>
              <div className="prog" style={{ marginBottom: 14 }}><i style={{ width: (k.pertemuan / k.total * 100) + "%", background: "var(--blue)" }} /></div>
              <div style={{ display: "flex", gap: 9 }}>
                <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => nav("dsn_presensi")}><Icon name="check" size={14} /> Presensi</button>
                <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => nav("dsn_nilai")}><Icon name="award" size={14} /> Nilai</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===================== DOSEN — PRESENSI & MATERI =====================
function DosenPresensi() {
  const toast = useToast();
  const [kelasIdx, setKelasIdx] = useState(0);
  const k = KELAS_DIAMPU[kelasIdx];
  const roster = buatRoster("1121091000", k.mhs, kelasIdx + 3).slice(0, 10);
  const [hadir, setHadir] = useState(() => roster.map(() => "H"));
  const [materi, setMateri] = useState(false);

  function setAll(v) { setHadir(roster.map(() => v)); }
  const statuses = { H: ["Hadir", "green"], I: ["Izin", "blue"], S: ["Sakit", "amber"], A: ["Alpha", "red"] };
  const rekap = hadir.reduce((a, s) => (a[s] = (a[s] || 0) + 1, a), {});

  return (
    <div className="anim-in">
      <PageHead title="Presensi & Materi" desc="Isi kehadiran mahasiswa dan unggah materi tiap pertemuan. Presensi tulis-tinggi disimpan di Learning Delivery Service (MongoDB)."
        actions={<select value={kelasIdx} onChange={(e) => { setKelasIdx(+e.target.value); setHadir(buatRoster("1121091000", KELAS_DIAMPU[+e.target.value].mhs, +e.target.value + 3).slice(0, 10).map(() => "H")); }}
          style={{ padding: "10px 14px", borderRadius: 11, border: "1px solid var(--line-2)", fontFamily: "var(--sans)", fontWeight: 600, fontSize: 13.5, background: "var(--surface)" }}>
          {KELAS_DIAMPU.map((kk, i) => <option key={i} value={i}>{kk.kode} · {kk.nama} ({kk.kelas})</option>)}
        </select>} />

      <div className="card card-pad" style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>Pertemuan ke-{k.pertemuan + 1} · {k.hari}, {k.jam}</div>
          <div style={{ fontWeight: 800, fontSize: 16, marginTop: 2 }}>{k.nama} — Kelas {k.kelas}</div>
        </div>
        <div className="field" style={{ margin: 0, minWidth: 240 }}>
          <input placeholder="Topik pertemuan, mis. Neural Networks" defaultValue="" />
        </div>
        <button className={"btn " + (materi ? "btn-soft" : "btn-ghost")} onClick={() => { setMateri(true); toast("Materi 'Bab9-NN.pdf' diunggah"); }}>
          <Icon name={materi ? "check" : "upload"} size={16} /> {materi ? "Materi terunggah" : "Unggah Materi"}
        </button>
      </div>

      <div className="card">
        <div className="card-head">
          <Icon name="check" size={19} style={{ color: "var(--blue)" }} /><h3>Daftar Hadir</h3>
          <span className="sub">· {k.mhs} mahasiswa</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 7 }}>
            <button className="btn btn-soft btn-sm" onClick={() => setAll("H")}>Tandai Semua Hadir</button>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, padding: "12px 24px", borderBottom: "1px solid var(--line)", flexWrap: "wrap" }}>
          {Object.entries(statuses).map(([code, [lbl, tone]]) => (
            <Badge key={code} tone={tone}>{lbl}: {rekap[code] || 0}</Badge>
          ))}
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th style={{ width: 50 }}>No</th><th>NIM</th><th>Nama Mahasiswa</th><th style={{ textAlign: "center" }}>Status Kehadiran</th></tr></thead>
            <tbody>
              {roster.map((s, i) => (
                <tr key={i}>
                  <td className="mono" style={{ color: "var(--ink-3)" }}>{String(i + 1).padStart(2, "0")}</td>
                  <td className="mono">{s.nim}</td>
                  <td style={{ fontWeight: 600 }}>{s.nama}</td>
                  <td>
                    <div style={{ display: "flex", gap: 5, justifyContent: "center" }}>
                      {Object.entries(statuses).map(([code, [lbl, tone]]) => {
                        const on = hadir[i] === code;
                        return (
                          <button key={code} onClick={() => setHadir((h) => h.map((x, j) => j === i ? code : x))}
                            title={lbl}
                            style={{ width: 34, height: 34, borderRadius: 9, border: on ? `1.5px solid var(--${tone === "amber" ? "amber" : tone})` : "1px solid var(--line-2)", background: on ? `var(--${tone}-bg, var(--amber-bg))` : "var(--surface)", color: on ? `var(--${tone})` : "var(--ink-3)", fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "var(--sans)" }}>
                            {code}
                          </button>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: "16px 24px", display: "flex", justifyContent: "flex-end", gap: 10, borderTop: "1px solid var(--line)" }}>
          <button className="btn btn-ghost" onClick={() => toast("Draf presensi disimpan")}>Simpan Draf</button>
          <button className="btn btn-primary" onClick={() => toast("Presensi pertemuan ke-" + (k.pertemuan + 1) + " dikirim")}><Icon name="check" size={16} /> Kirim Presensi</button>
        </div>
      </div>
    </div>
  );
}

// ===================== DOSEN — INPUT NILAI =====================
function DosenNilai() {
  const toast = useToast();
  const D = window.AIS_DATA;
  const [kelasIdx, setKelasIdx] = useState(0);
  const k = KELAS_DIAMPU[kelasIdx];
  const roster = buatRoster("1121091000", Math.min(k.mhs, 10), kelasIdx + 7).slice(0, 10);
  const [nilai, setNilai] = useState(() => roster.map((_, i) => ({ formatif: 70 + (i * 3) % 25, uts: 65 + (i * 5) % 30, uas: i % 3 === 0 ? "" : 70 + (i * 7) % 25 })));
  const [submitted, setSubmitted] = useState(false);

  function akhir(n) {
    if (n.uas === "" || n.uts === "" || n.formatif === "") return null;
    return Math.round(n.formatif * 0.3 + n.uts * 0.3 + n.uas * 0.4);
  }
  function upd(i, key, val) {
    val = val === "" ? "" : Math.max(0, Math.min(100, +val));
    setNilai((arr) => arr.map((x, j) => j === i ? { ...x, [key]: val } : x));
  }
  const terisi = nilai.filter((n) => akhir(n) !== null).length;

  return (
    <div className="anim-in">
      <PageHead title="Input Nilai" desc="Komponen Formatif (30%) · UTS (30%) · UAS (40%). Dosen yang tidak mengisi membuat nilai otomatis E. Dipublikasi ke Assessment & Grading Service."
        actions={<select value={kelasIdx} onChange={(e) => { const idx = +e.target.value; setKelasIdx(idx); const r = buatRoster("1121091000", Math.min(KELAS_DIAMPU[idx].mhs, 10), idx + 7).slice(0, 10); setNilai(r.map((_, i) => ({ formatif: 70 + (i * 3) % 25, uts: 65 + (i * 5) % 30, uas: i % 3 === 0 ? "" : 70 + (i * 7) % 25 }))); setSubmitted(false); }}
          style={{ padding: "10px 14px", borderRadius: 11, border: "1px solid var(--line-2)", fontFamily: "var(--sans)", fontWeight: 600, fontSize: 13.5, background: "var(--surface)" }}>
          {KELAS_DIAMPU.map((kk, i) => <option key={i} value={i}>{kk.kode} · {kk.nama} ({kk.kelas})</option>)}
        </select>} />

      <div className="card card-pad" style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>{k.nama} — Kelas {k.kelas}</div>
          <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}><span className="mono">{k.kode}</span> · {k.semester}</div>
        </div>
        <Badge tone={terisi === roster.length ? "green" : "amber"}>{terisi}/{roster.length} nilai akhir terisi</Badge>
        <Badge tone={submitted ? "green" : "gray"} dot>{submitted ? "Terpublikasi" : "Draf"}</Badge>
      </div>

      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th style={{ width: 50 }}>No</th><th>NIM</th><th>Nama</th><th style={{ width: 110, textAlign: "center" }}>Formatif</th><th style={{ width: 110, textAlign: "center" }}>UTS</th><th style={{ width: 110, textAlign: "center" }}>UAS</th><th style={{ textAlign: "center" }}>Akhir</th><th style={{ textAlign: "center" }}>Huruf</th></tr></thead>
            <tbody>
              {roster.map((s, i) => {
                const n = nilai[i];
                const a = akhir(n);
                const h = a !== null ? D.nilaiHuruf(a) : null;
                const tone = h ? (h.bobot >= 3 ? "green" : h.bobot >= 2 ? "amber" : "red") : "gray";
                return (
                  <tr key={i}>
                    <td className="mono" style={{ color: "var(--ink-3)" }}>{String(i + 1).padStart(2, "0")}</td>
                    <td className="mono">{s.nim}</td>
                    <td style={{ fontWeight: 600 }}>{s.nama}</td>
                    {["formatif", "uts", "uas"].map((key) => (
                      <td key={key} style={{ textAlign: "center" }}>
                        <input value={n[key]} disabled={submitted} onChange={(e) => upd(i, key, e.target.value)}
                          style={{ width: 64, textAlign: "center", padding: "7px 4px", borderRadius: 9, border: "1px solid var(--line-2)", fontFamily: "var(--mono)", fontSize: 13, background: submitted ? "var(--surface-2)" : "var(--surface)" }} />
                      </td>
                    ))}
                    <td style={{ textAlign: "center", fontWeight: 800, fontFamily: "var(--mono)" }}>{a ?? "—"}</td>
                    <td style={{ textAlign: "center" }}>{h ? <Badge tone={tone}>{h.huruf}</Badge> : <Badge tone="red">E</Badge>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--line)", flexWrap: "wrap", gap: 10 }}>
          <div style={{ fontSize: 12, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 7 }}><Icon name="info" size={15} /> Nilai akhir dihitung otomatis. Setelah dipublikasi, perubahan perlu persetujuan Kaprodi.</div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost" onClick={() => toast("Draf nilai disimpan")}>Simpan Draf</button>
            <button className="btn btn-primary" disabled={submitted} onClick={() => { setSubmitted(true); toast("Nilai " + k.kode + " " + k.kelas + " dipublikasikan"); }}><Icon name="check" size={16} /> Publikasikan Nilai</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================== DOSEN — JADWAL MENGAJAR =====================
function DosenJadwal() {
  const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
  return (
    <div className="anim-in">
      <PageHead title="Jadwal Mengajar" desc="Jadwal mingguan kelas yang Anda ampu semester ini." />
      <div className="grid" style={{ gridTemplateColumns: "repeat(5,1fr)", gap: 14 }}>
        {hari.map((h) => {
          const kls = KELAS_DIAMPU.filter((k) => k.hari === h);
          return (
            <div key={h} className="card" style={{ alignSelf: "start", minHeight: 130 }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--line)", fontWeight: 800, fontSize: 13.5 }}>{h}</div>
              <div style={{ padding: 10, display: "grid", gap: 8 }}>
                {kls.length ? kls.map((k, i) => (
                  <div key={i} style={{ padding: 11, borderRadius: 11, background: "var(--blue-bg)", border: "1px solid #d4e3f1" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, color: "var(--blue)" }}>{k.jam}</div>
                    <div style={{ fontWeight: 700, fontSize: 12.5, margin: "3px 0 2px" }}>{k.nama}</div>
                    <div style={{ fontSize: 11, color: "var(--ink-3)" }}>{k.kelas} · {k.ruang}</div>
                  </div>
                )) : <div style={{ fontSize: 11.5, color: "var(--ink-3)", textAlign: "center", padding: "16px 0" }}>—</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===================== DOSEN — BIMBINGAN TA =====================
function DosenTA() {
  const toast = useToast();
  const [detail, setDetail] = useState(null);
  return (
    <div className="anim-in">
      <PageHead title="Bimbingan Tugas Akhir" desc="Mahasiswa bimbingan skripsi/TA Anda — dari Thesis / Final Project Service." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Mahasiswa</th><th>Judul</th><th>Peran</th><th>Tahap</th><th style={{ width: 140 }}>Progress</th><th></th></tr></thead>
            <tbody>
              {BIMBINGAN_TA.map((b, i) => (
                <tr key={i}>
                  <td><div style={{ fontWeight: 700 }}>{b.nama}</div><div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{b.nim}</div></td>
                  <td style={{ maxWidth: 280, color: "var(--ink-2)" }}>{b.judul}</td>
                  <td><Badge tone={b.peran === "Pembimbing I" ? "purple" : "gray"}>{b.peran}</Badge></td>
                  <td>{b.jadwalSidang ? <Badge tone="green" dot>{b.tahap}</Badge> : <span style={{ fontSize: 13 }}>{b.tahap}</span>}</td>
                  <td><div className="prog"><i style={{ width: b.progress + "%", background: b.progress >= 90 ? "var(--green)" : "var(--blue)" }} /></div><div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4 }}>{b.progress}% · update {b.terakhir}</div></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => setDetail(b)}>Detail</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {detail && (
        <Modal title={detail.nama} subtitle={detail.nim + " · " + detail.peran} onClose={() => setDetail(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setDetail(null)}>Tutup</button>
            <button className="btn btn-primary" onClick={() => { toast("Catatan bimbingan disimpan"); setDetail(null); }}><Icon name="check" size={16} /> Setujui Lanjut</button></>}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600, marginBottom: 4 }}>Judul Tugas Akhir</div>
            <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.4 }}>{detail.judul}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            {[["Tahap", detail.tahap], ["Progress", detail.progress + "%"], ["Bimbingan terakhir", detail.terakhir], ["Jadwal sidang", detail.jadwalSidang || "Belum dijadwalkan"]].map(([l, v]) => (
              <div key={l} style={{ padding: 12, background: "var(--surface-2)", borderRadius: 11 }}><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{l}</div><div style={{ fontWeight: 700, fontSize: 13.5, marginTop: 3 }}>{v}</div></div>
            ))}
          </div>
          <div className="field" style={{ margin: 0 }}><label>Catatan Bimbingan</label><textarea rows={3} placeholder="Tuliskan arahan revisi…" /></div>
        </Modal>
      )}
    </div>
  );
}

// ===================== PROFIL STAF (generik: dosen/pa/kaprodi/keuangan/admin) =====================
function StaffHero({ persona, role, sub, action }) {
  const R = window.AIS_ROLES;
  const meta = R.roleMeta[role];
  return (
    <div className="card staff-hero" style={{ marginBottom: 22, overflow: "hidden", position: "relative", background: `linear-gradient(120deg, var(--hero-surface), ${meta.bg})`, border: `1px solid ${meta.bg}` }}>
      <div style={{ position: "absolute", right: -40, top: -40, width: 220, height: 220, borderRadius: "50%", background: `radial-gradient(circle, color-mix(in srgb, ${meta.color} 20%, transparent), transparent 70%)` }} />
      <div className="card-pad sh-row" style={{ display: "flex", alignItems: "center", gap: 22, padding: 30 }}>
        <div className="sb-ava" style={{ width: 64, height: 64, fontSize: 24, borderRadius: 18, background: persona.avaBg, color: persona.ava }}>{initials(persona.nama)}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, color: "var(--ink-2)", fontWeight: 600 }}>Selamat datang kembali 👋</div>
          <h1 style={{ margin: "3px 0 7px", fontSize: 25, fontWeight: 800, letterSpacing: "-.025em" }}>{persona.nama}</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span className="badge" style={{ background: meta.bg, color: meta.color }}><Icon name={meta.ic} size={13} /> {meta.label}</span>
            <Badge tone="gray"><span className="mono">{persona.idLabel} {persona.id}</span></Badge>
            <Badge tone="gray">{persona.unit}</Badge>
          </div>
          {sub && <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 9 }}>{sub}</div>}
        </div>
        {action}
      </div>
    </div>
  );
}

function ProfilStaff({ role }) {
  const R = window.AIS_ROLES;
  const p = R.personas[role] || R.personas.dosen;
  const meta = R.roleMeta[role] || R.roleMeta.dosen;
  const toast = useToast();
  const rows = [
    ["Nama Lengkap", p.nama], [p.idLabel, p.id, true], ["Jabatan", p.jabatan],
    ["Unit Kerja", p.unit], ["Peran Sistem", meta.label], ["Email", p.id + "@uin.ac.id", true],
  ];
  return (
    <div className="anim-in">
      <PageHead title="Profil" desc="Data akun dan peran Anda di sistem." />
      <div className="grid" style={{ gridTemplateColumns: "300px 1fr" }}>
        <div className="card card-pad" style={{ textAlign: "center", alignSelf: "start" }}>
          <div className="sb-ava" style={{ width: 96, height: 96, fontSize: 36, borderRadius: 28, margin: "8px auto 16px", background: p.avaBg, color: p.ava }}>{initials(p.nama)}</div>
          <div style={{ fontSize: 17, fontWeight: 800 }}>{p.nama}</div>
          <div className="mono" style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>{p.idLabel} {p.id}</div>
          <div style={{ margin: "14px 0" }}><span className="badge" style={{ background: meta.bg, color: meta.color }}><Icon name={meta.ic} size={13} /> {meta.label}</span></div>
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: 14, fontSize: 12.5, color: "var(--ink-2)", textAlign: "left", lineHeight: 1.6 }}>{p.jabatan} — {p.unit}.</div>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="user" size={19} style={{ color: meta.color }} /><h3>Data Akun</h3>
            <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto" }} onClick={() => toast("Pengaturan akun dibuka")}><Icon name="edit" size={15} /> Kelola</button></div>
          <div style={{ padding: "6px 0" }}>
            {rows.map(([k, v, mono], i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "200px 1fr", padding: "12px 24px", borderBottom: i < rows.length - 1 ? "1px solid var(--line)" : "none", fontSize: 13.5, alignItems: "center" }}>
                <span style={{ color: "var(--ink-3)", fontWeight: 600 }}>{k}</span>
                <span className={mono ? "mono" : ""} style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { DosenDashboard, DosenKelas, DosenPresensi, DosenNilai, DosenJadwal, DosenTA, StaffHero, ProfilStaff, buatRoster, KELAS_DIAMPU, BIMBINGAN_TA };
