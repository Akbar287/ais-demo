/* eslint-disable */
// @ts-nocheck
// Generated from js/views_calon.jsx by scripts/port-js-ssot.mjs.
"use client";


import * as React from "react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Badge, Barcode, BrandLogo, Icon, ImgPlaceholder } from "@/components/atoms";
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
// AIS — Views: CALON MAHASISWA (Admissions + Assessment)
// Portal pendaftar: kartu ujian, Ujian Masuk CBT per mata pelajaran, hasil
// ============================================================

// ---------------- Bank Soal (per mata pelajaran) ----------------
const CBT_BANK = [
  {
    mapel: "Tes Potensi Akademik", kode: "TPA", ic: "activity", durasi: 20,
    soal: [
      { q: "DOKTER : RUMAH SAKIT = GURU : ...", opt: ["Murid", "Sekolah", "Buku", "Papan Tulis"], a: 1, pem: "Dokter bekerja di rumah sakit, sebagaimana guru bekerja di sekolah." },
      { q: "Lengkapi deret bilangan: 2, 4, 8, 16, ...", opt: ["20", "24", "32", "64"], a: 2, pem: "Setiap suku dikalikan 2: 16 × 2 = 32." },
      { q: "Semua siswa kelas A pandai. Badu adalah siswa kelas A. Kesimpulan yang tepat:", opt: ["Badu belum tentu pandai", "Badu pandai", "Badu tidak pandai", "Sebagian siswa pandai"], a: 1, pem: "Premis umum berlaku untuk semua anggota, maka Badu pasti pandai." },
      { q: "Lengkapi deret huruf: A, C, E, G, ...", opt: ["H", "I", "J", "K"], a: 1, pem: "Lompat satu huruf (A,_,C,_,E,_,G,_,I)." },
      { q: "Antonim (lawan kata) dari ABSTRAK adalah ...", opt: ["Maya", "Konkret", "Semu", "Khayal"], a: 1, pem: "Abstrak (tak berwujud) berlawanan dengan konkret (nyata/berwujud)." },
    ],
  },
  {
    mapel: "Matematika Dasar", kode: "MAT", ic: "chart", durasi: 25,
    soal: [
      { q: "15% dari 240 adalah ...", opt: ["24", "30", "36", "40"], a: 2, pem: "15/100 × 240 = 36." },
      { q: "Jika 3x + 7 = 22, maka nilai x adalah ...", opt: ["3", "4", "5", "6"], a: 2, pem: "3x = 15 → x = 5." },
      { q: "Luas lingkaran berjari-jari 7 cm (π = 22/7) adalah ...", opt: ["132 cm²", "144 cm²", "154 cm²", "168 cm²"], a: 2, pem: "L = πr² = 22/7 × 49 = 154 cm²." },
      { q: "Rata-rata dari 6, 8, 10, dan 12 adalah ...", opt: ["8", "9", "10", "11"], a: 1, pem: "(6+8+10+12)/4 = 36/4 = 9." },
      { q: "Hasil dari 2³ + 3² adalah ...", opt: ["15", "16", "17", "18"], a: 2, pem: "8 + 9 = 17." },
    ],
  },
  {
    mapel: "Bahasa Indonesia", kode: "IND", ic: "book", durasi: 20,
    soal: [
      { q: "Penulisan kata baku yang benar adalah ...", opt: ["apotik", "apotek", "aktifitas", "nasehat"], a: 1, pem: "Bentuk baku menurut KBBI adalah 'apotek'." },
      { q: "Sinonim dari kata MAJEMUK adalah ...", opt: ["Tunggal", "Kompleks", "Sederhana", "Ringkas"], a: 1, pem: "Majemuk berarti terdiri atas banyak bagian = kompleks." },
      { q: "Kalimat berikut yang paling efektif adalah ...", opt: ["Para hadirin sekalian dimohon berdiri", "Hadirin dimohon berdiri", "Semua para hadirin berdiri", "Para hadirin semua berdiri"], a: 1, pem: "'Hadirin' sudah jamak, tak perlu 'para/sekalian/semua'." },
      { q: "Kata dasar dari kata 'menulis' adalah ...", opt: ["nulis", "tulis", "tulisan", "penulis"], a: 1, pem: "Imbuhan me(N)- + tulis → menulis." },
      { q: "Gagasan pokok sebuah paragraf terdapat pada ...", opt: ["kalimat penjelas", "kalimat utama", "kalimat tanya", "kalimat perintah"], a: 1, pem: "Ide pokok berada di kalimat utama." },
    ],
  },
  {
    mapel: "Bahasa Inggris", kode: "ENG", ic: "bookOpen", durasi: 20,
    soal: [
      { q: "She ___ to school every day.", opt: ["go", "goes", "going", "gone"], a: 1, pem: "Subjek 'she' (orang ketiga tunggal) → kata kerja + s: goes." },
      { q: "Choose the synonym of 'happy'.", opt: ["sad", "glad", "angry", "tired"], a: 1, pem: "'Glad' bermakna sama dengan 'happy' (senang)." },
      { q: "I have lived here ___ 2010.", opt: ["since", "for", "at", "in"], a: 0, pem: "'Since' dipakai untuk titik waktu (tahun 2010)." },
      { q: "What is the antonym of 'increase'?", opt: ["rise", "grow", "decrease", "expand"], a: 2, pem: "Lawan dari increase (naik) adalah decrease (turun)." },
      { q: "The past tense of 'buy' is ...", opt: ["buyed", "bought", "buys", "buying"], a: 1, pem: "Kata kerja tak beraturan: buy → bought." },
    ],
  },
  {
    mapel: "Wawasan Keislaman & Kebangsaan", kode: "WIK", ic: "shield", durasi: 15,
    soal: [
      { q: "Jumlah rakaat salat Subuh adalah ...", opt: ["2 rakaat", "3 rakaat", "4 rakaat", "5 rakaat"], a: 0, pem: "Salat Subuh terdiri atas 2 rakaat." },
      { q: "Rukun Islam berjumlah ...", opt: ["4", "5", "6", "7"], a: 1, pem: "Rukun Islam ada 5: syahadat, salat, zakat, puasa, haji." },
      { q: "Kitab suci umat Islam adalah ...", opt: ["Taurat", "Injil", "Al-Qur'an", "Zabur"], a: 2, pem: "Al-Qur'an adalah kitab suci umat Islam." },
      { q: "Proklamasi Kemerdekaan Indonesia diumumkan pada ...", opt: ["1 Juni 1945", "17 Agustus 1945", "28 Oktober 1928", "10 November 1945"], a: 1, pem: "Indonesia merdeka 17 Agustus 1945." },
      { q: "Dasar negara Republik Indonesia adalah ...", opt: ["UUD 1945", "Pancasila", "Bhinneka Tunggal Ika", "Sumpah Pemuda"], a: 1, pem: "Pancasila adalah dasar (ideologi) negara." },
    ],
  },
];

const CBT_TOTAL_SOAL = CBT_BANK.reduce((a, s) => a + s.soal.length, 0);
const CBT_DURASI = CBT_BANK.reduce((a, s) => a + s.durasi, 0); // menit
const CBT_KEY = "ais_cbt_v1";

function cbtLoad() {
  try { return JSON.parse(localStorage.getItem(CBT_KEY)) || null; } catch (e) { return null; }
}
function cbtSave(s) { try { localStorage.setItem(CBT_KEY, JSON.stringify(s)); } catch (e) {} }
function fmtTime(sec) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}
function cbtScore(answers) {
  // per-subject correct count + total
  return CBT_BANK.map((sub, si) => {
    let benar = 0;
    sub.soal.forEach((q, qi) => { if (answers[si + "-" + qi] === q.a) benar++; });
    return { mapel: sub.mapel, kode: sub.kode, ic: sub.ic, benar, total: sub.soal.length, nilai: Math.round(benar / sub.soal.length * 100) };
  });
}

// ===================== DASHBOARD =====================
function CalonDashboard({ nav }) {
  const R = window.AIS_ROLES; const p = R.personas.calon;
  const saved = cbtLoad();
  const status = saved && saved.submitted ? "selesai" : saved && saved.started ? "berjalan" : "belum";
  const tiles = [
    { label: "Status Berkas", value: "Terverifikasi", meta: "siap mengikuti tes", ic: "check", c: "var(--green)", bg: "var(--green-bg)", small: true },
    { label: "Jadwal Ujian", value: "26 Jun", meta: "08:00 · CBT Lab 1", ic: "calendar", c: "var(--blue)", bg: "var(--blue-bg)" },
    { label: "Mata Uji", value: CBT_BANK.length, meta: CBT_TOTAL_SOAL + " soal · " + CBT_DURASI + " menit", ic: "clipboard", c: "var(--purple)", bg: "var(--purple-bg)" },
    { label: "Status Ujian", value: status === "selesai" ? "Selesai" : status === "berjalan" ? "Berjalan" : "Belum", meta: status === "selesai" ? "lihat hasil" : "belum dikerjakan", ic: "award", c: "var(--orange-600)", bg: "var(--orange-50)", small: true },
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="calon" sub="Selesaikan tahapan seleksi: pelajari kartu ujian, ikuti tes masuk (CBT), dan pantau hasil."
        action={<button className="btn btn-primary" onClick={() => nav("calon_tes")}><Icon name="clipboard" size={17} /> {status === "selesai" ? "Lihat Hasil" : "Mulai Ujian"}</button>} />

      <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 22 }}>
        {tiles.map((t) => (
          <div key={t.label} className="stat card" style={{ background: t.bg, border: "none" }}>
            <Icon name={t.ic} size={26} className="si" style={{ color: t.c }} />
            <div className="label" style={{ color: t.c }}>{t.label}</div>
            <div className="value" style={{ color: t.c, fontSize: t.small ? 20 : 30 }}>{t.value}</div>
            <div className="meta" style={{ color: t.c }}>{t.meta}</div>
          </div>
        ))}
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.3fr 1fr" }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="flag" size={19} style={{ color: "var(--blue)" }} /><h3>Tahapan Seleksi Anda</h3></div>
          <div style={{ padding: "6px 0" }}>
            {[
              ["Pendaftaran & unggah berkas", "Selesai", "green", true],
              ["Verifikasi berkas oleh panitia", "Terverifikasi", "green", true],
              ["Ujian masuk berbasis komputer (CBT)", status === "selesai" ? "Selesai" : status === "berjalan" ? "Sedang berjalan" : "Menunggu dikerjakan", status === "selesai" ? "green" : "amber", status === "selesai"],
              ["Pengumuman hasil seleksi", "8 Juli 2026", "gray", false],
              ["Daftar ulang & pembayaran UKT", "Setelah lulus", "gray", false],
            ].map(([t, s, tone, done], i, arr) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 24px", borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", display: "grid", placeItems: "center", background: done ? "var(--green-bg)" : tone === "amber" ? "var(--amber-bg)" : "var(--surface-2)", color: done ? "var(--green)" : tone === "amber" ? "#a6760e" : "var(--ink-3)", flexShrink: 0, fontWeight: 800, fontSize: 12 }}>{done ? "✓" : i + 1}</div>
                <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 13.5 }}>{t}</div></div>
                <Badge tone={tone} dot={tone !== "gray"}>{s}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ alignSelf: "start", background: "linear-gradient(135deg, var(--blue-bg), #fff)" }}>
          <div className="card-pad">
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "var(--blue)", color: "#fff", display: "grid", placeItems: "center" }}><Icon name="clipboard" size={22} /></div>
              <div><div style={{ fontWeight: 800, fontSize: 15 }}>Ujian Masuk (CBT)</div><div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{CBT_BANK.length} mata uji · {CBT_TOTAL_SOAL} soal</div></div>
            </div>
            <div style={{ display: "grid", gap: 7, marginBottom: 14 }}>
              {CBT_BANK.map((s) => (
                <div key={s.kode} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, padding: "7px 0" }}>
                  <Icon name={s.ic} size={16} style={{ color: "var(--blue)" }} />
                  <span style={{ flex: 1, fontWeight: 600 }}>{s.mapel}</span>
                  <span style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{s.soal.length} soal</span>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => nav("calon_tes")}>{status === "selesai" ? "Lihat Hasil Ujian" : status === "berjalan" ? "Lanjutkan Ujian" : "Mulai Ujian"} <Icon name="chevR" size={15} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================== KARTU UJIAN =====================
function CalonKartu() {
  const R = window.AIS_ROLES; const p = R.personas.calon;
  const toast = useToast();
  return (
    <div className="anim-in">
      <PageHead title="Kartu Peserta Ujian" desc="Tunjukkan kartu ini (cetak atau digital) saat memasuki ruang ujian."
        actions={<button className="btn btn-ghost" onClick={() => toast("Kartu ujian diunduh (PDF)")}><Icon name="download" size={16} /> Unduh PDF</button>} />
      <div className="card" style={{ maxWidth: 620, overflow: "hidden" }}>
        <div style={{ background: "linear-gradient(115deg, var(--blue), color-mix(in srgb, var(--blue) 62%, #000))", color: "#fff", padding: "22px 26px", display: "flex", alignItems: "center", gap: 14 }}>
          <BrandLogo size={44} />
          <div><div style={{ fontWeight: 800, fontSize: 16 }}>Kartu Ujian Masuk 2026</div><div style={{ fontSize: 12.5, opacity: .85 }}>Penerimaan Mahasiswa Baru · Jalur Reguler</div></div>
        </div>
        <div className="card-pad" style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
          <div style={{ width: 96, height: 120, borderRadius: 12, background: "var(--surface-2)", display: "grid", placeItems: "center", color: "var(--ink-3)", flexShrink: 0 }}><Icon name="user" size={40} /></div>
          <div style={{ flex: 1, minWidth: 220, display: "grid", gap: 11 }}>
            {[["No. Peserta", p.id], ["Nama", p.nama], ["Pilihan 1", "Teknik Informatika"], ["Pilihan 2", "Sistem Informasi"]].map(([l, v]) => (
              <div key={l} style={{ display: "grid", gridTemplateColumns: "100px 1fr", fontSize: 13.5 }}><span style={{ color: "var(--ink-3)", fontWeight: 600 }}>{l}</span><b className={l === "No. Peserta" ? "mono" : ""}>{v}</b></div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--line)", padding: "16px 26px", display: "flex", gap: 24, flexWrap: "wrap", background: "var(--surface-2)" }}>
          {[["Tanggal", "26 Juni 2026"], ["Sesi", "08:00–10:00 WIB"], ["Lokasi", "Lab Komputer 1, Gd. FST"], ["Token", "7F2A-9K"]].map(([l, v]) => (
            <div key={l}><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{l}</div><div style={{ fontWeight: 700, fontSize: 13.5, marginTop: 2 }} className={l === "Token" ? "mono" : ""}>{v}</div></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===================== UJIAN CBT =====================
function CalonTes({ nav }) {
  const toast = useToast();
  const [state, setState] = useState(() => cbtLoad() || { started: false, submitted: false, answers: {}, flags: {}, sisa: CBT_DURASI * 60, sub: 0, qi: 0 });

  // persist
  useEffect(() => { cbtSave(state); }, [state]);

  // timer
  useEffect(() => {
    if (!state.started || state.submitted) return;
    const t = setInterval(() => {
      setState((s) => {
        if (!s.started || s.submitted) return s;
        if (s.sisa <= 1) { return { ...s, sisa: 0, submitted: true }; }
        return { ...s, sisa: s.sisa - 1 };
      });
    }, 1000);
    return () => clearInterval(t);
  }, [state.started, state.submitted]);

  const [confirm, setConfirm] = useState(false);
  function patch(p) { setState((s) => ({ ...s, ...p })); }
  function start() { patch({ started: true, sisa: CBT_DURASI * 60 }); }
  function pilih(idx) { setState((s) => ({ ...s, answers: { ...s.answers, [s.sub + "-" + s.qi]: idx } })); }
  function toggleFlag() { setState((s) => { const k = s.sub + "-" + s.qi; const f = { ...s.flags }; if (f[k]) delete f[k]; else f[k] = 1; return { ...s, flags: f }; }); }
  function goTo(sub, qi) { patch({ sub, qi }); }
  function submit() { setConfirm(false); patch({ submitted: true }); toast("Jawaban Anda telah dikirim", "ok"); }
  function resetUlang() { const fresh = { started: false, submitted: false, answers: {}, flags: {}, sisa: CBT_DURASI * 60, sub: 0, qi: 0 }; setState(fresh); }

  const jumlahDijawab = Object.keys(state.answers).length;

  // ---------- RESULT ----------
  if (state.submitted) {
    const hasil = cbtScore(state.answers);
    const totalBenar = hasil.reduce((a, b) => a + b.benar, 0);
    const nilaiAkhir = Math.round(totalBenar / CBT_TOTAL_SOAL * 100);
    const lulus = nilaiAkhir >= 65;
    return (
      <div className="anim-in">
        <PageHead title="Hasil Ujian Masuk" desc="Rangkuman jawaban Anda per mata uji. Hasil resmi kelulusan diumumkan oleh panitia." />
        <div className="card card-pad" style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap", background: `linear-gradient(120deg, ${lulus ? "var(--green-bg)" : "var(--amber-bg)"}, #fff)` }}>
          <div style={{ width: 76, height: 76, borderRadius: "50%", display: "grid", placeItems: "center", background: lulus ? "var(--green)" : "var(--amber)", color: "#fff", flexShrink: 0 }}><Icon name={lulus ? "award" : "activity"} size={36} /></div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 13, color: "var(--ink-2)", fontWeight: 600 }}>Skor gabungan Anda</div>
            <div style={{ fontSize: 40, fontWeight: 800, fontFamily: "var(--mono)", lineHeight: 1.1, color: lulus ? "var(--green)" : "#a6760e" }}>{nilaiAkhir}</div>
            <div style={{ fontSize: 13, color: "var(--ink-3)" }}>{totalBenar} benar dari {CBT_TOTAL_SOAL} soal · ambang lulus 65</div>
          </div>
          <Badge tone={lulus ? "green" : "amber"} dot>{lulus ? "Memenuhi ambang batas" : "Di bawah ambang batas"}</Badge>
        </div>

        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14, marginBottom: 18 }}>
          {hasil.map((h) => (
            <div key={h.kode} className="card card-pad">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--blue-bg)", color: "var(--blue)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name={h.ic} size={18} /></div>
                <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>{h.mapel}</div>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 28, fontWeight: 800, fontFamily: "var(--mono)", color: h.nilai >= 65 ? "var(--green)" : h.nilai >= 50 ? "#a6760e" : "var(--red)" }}>{h.nilai}</span>
                <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>/ 100</span>
              </div>
              <div className="prog" style={{ marginBottom: 6 }}><i style={{ width: h.nilai + "%", background: h.nilai >= 65 ? "var(--green)" : h.nilai >= 50 ? "var(--amber)" : "var(--red)" }} /></div>
              <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{h.benar} dari {h.total} benar</div>
            </div>
          ))}
        </div>

        {/* Pembahasan */}
        <div className="card">
          <div className="card-head"><Icon name="book" size={19} style={{ color: "var(--purple)" }} /><h3>Pembahasan</h3></div>
          <div style={{ padding: "4px 0" }}>
            {CBT_BANK.map((sub, si) => (
              <div key={si}>
                <div style={{ padding: "10px 24px", fontWeight: 800, fontSize: 12.5, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".04em", background: "var(--surface-2)" }}>{sub.mapel}</div>
                {sub.soal.map((q, qi) => {
                  const ans = state.answers[si + "-" + qi];
                  const benar = ans === q.a;
                  return (
                    <div key={qi} style={{ padding: "13px 24px", borderBottom: "1px solid var(--line)" }}>
                      <div style={{ display: "flex", gap: 9, marginBottom: 7 }}>
                        <Icon name={benar ? "check" : "x"} size={17} style={{ color: benar ? "var(--green)" : "var(--red)", flexShrink: 0, marginTop: 1 }} />
                        <div style={{ fontWeight: 600, fontSize: 13.5 }}>{q.q}</div>
                      </div>
                      <div style={{ fontSize: 12.5, color: "var(--ink-2)", paddingLeft: 26, lineHeight: 1.5 }}>
                        Jawaban Anda: <b style={{ color: benar ? "var(--green)" : "var(--red)" }}>{ans != null ? String.fromCharCode(65 + ans) + ". " + q.opt[ans] : "Kosong"}</b>
                        {!benar && <> · Kunci: <b style={{ color: "var(--green)" }}>{String.fromCharCode(65 + q.a)}. {q.opt[q.a]}</b></>}
                        <div style={{ color: "var(--ink-3)", marginTop: 3 }}>{q.pem}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <button className="btn btn-ghost" onClick={resetUlang}><Icon name="refresh" size={16} /> Ulangi Simulasi</button>
          <button className="btn btn-soft" onClick={() => nav("calon_hasil")}>Lihat Hasil Seleksi <Icon name="chevR" size={15} /></button>
        </div>
      </div>
    );
  }

  // ---------- INTRO ----------
  if (!state.started) {
    return (
      <div className="anim-in">
        <PageHead title="Ujian Masuk Berbasis Komputer" desc="Simulasi tes seleksi. Bacalah ketentuan berikut sebelum memulai." />
        <div className="grid" style={{ gridTemplateColumns: "1.3fr 1fr" }}>
          <div className="card" style={{ alignSelf: "start" }}>
            <div className="card-head"><Icon name="info" size={19} style={{ color: "var(--blue)" }} /><h3>Ketentuan Ujian</h3></div>
            <div style={{ padding: "8px 24px 20px" }}>
              <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.9, fontSize: 13.5, color: "var(--ink-2)" }}>
                <li>Total <b>{CBT_TOTAL_SOAL} soal</b> dari <b>{CBT_BANK.length} mata uji</b>, dikerjakan dalam <b>{CBT_DURASI} menit</b>.</li>
                <li>Waktu berjalan otomatis. Ujian dikumpulkan sendiri saat waktu habis.</li>
                <li>Anda dapat berpindah antar soal & menandai soal ragu (flag).</li>
                <li>Setiap jawaban benar bernilai sama; tidak ada pengurangan nilai.</li>
                <li>Jawaban tersimpan otomatis — aman bila halaman dimuat ulang.</li>
              </ul>
            </div>
          </div>
          <div className="card" style={{ alignSelf: "start" }}>
            <div className="card-head"><Icon name="clipboard" size={19} style={{ color: "var(--purple)" }} /><h3>Mata Uji</h3></div>
            <div style={{ padding: "4px 0" }}>
              {CBT_BANK.map((s, i) => (
                <div key={s.kode} style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 24px", borderBottom: i < CBT_BANK.length - 1 ? "1px solid var(--line)" : "none" }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--blue-bg)", color: "var(--blue)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name={s.ic} size={17} /></div>
                  <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 13 }}>{s.mapel}</div></div>
                  <span style={{ fontSize: 11.5, color: "var(--ink-3)", fontWeight: 600 }}>{s.soal.length} soal · {s.durasi}′</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid var(--line)" }}>
              <button className="btn btn-primary" style={{ width: "100%", padding: 13 }} onClick={start}><Icon name="play" size={16} /> Mulai Ujian Sekarang</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- EXAM ----------
  const sub = CBT_BANK[state.sub];
  const q = sub.soal[state.qi];
  const key = state.sub + "-" + state.qi;
  const flagged = !!state.flags[key];
  const low = state.sisa <= 60;
  // flat index for footer prev/next across all
  const isFirst = state.sub === 0 && state.qi === 0;
  const isLastOverall = state.sub === CBT_BANK.length - 1 && state.qi === sub.soal.length - 1;
  function nextQ() {
    if (state.qi < sub.soal.length - 1) goTo(state.sub, state.qi + 1);
    else if (state.sub < CBT_BANK.length - 1) goTo(state.sub + 1, 0);
  }
  function prevQ() {
    if (state.qi > 0) goTo(state.sub, state.qi - 1);
    else if (state.sub > 0) goTo(state.sub - 1, CBT_BANK[state.sub - 1].soal.length - 1);
  }

  return (
    <div className="anim-in">
      {/* sticky timer bar */}
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", position: "sticky", top: 0, zIndex: 5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: low ? "var(--red-bg)" : "var(--blue-bg)", color: low ? "var(--red)" : "var(--blue)", display: "grid", placeItems: "center", animation: low ? "pulse 1s infinite" : "none" }}><Icon name="clock" size={22} /></div>
          <div>
            <div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>Sisa waktu</div>
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--mono)", lineHeight: 1, color: low ? "var(--red)" : "var(--ink)" }}>{fmtTime(state.sisa)}</div>
          </div>
        </div>
        <div style={{ height: 36, width: 1, background: "var(--line)" }} />
        <div><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>Terjawab</div><div style={{ fontWeight: 800, fontFamily: "var(--mono)", fontSize: 17 }}>{jumlahDijawab}<span style={{ color: "var(--ink-3)", fontSize: 13 }}>/{CBT_TOTAL_SOAL}</span></div></div>
        <button className="btn btn-primary" style={{ marginLeft: "auto" }} onClick={() => setConfirm(true)}><Icon name="check" size={16} /> Selesai &amp; Kumpulkan</button>
      </div>

      {/* subject tabs */}
      <div className="seg" style={{ marginBottom: 16, flexWrap: "wrap" }}>
        {CBT_BANK.map((s, i) => {
          const done = s.soal.filter((_, qi) => state.answers[i + "-" + qi] != null).length;
          return <button key={i} className={state.sub === i ? "on" : ""} onClick={() => goTo(i, 0)}>{s.kode} <span style={{ opacity: .6, fontSize: 11 }}>{done}/{s.soal.length}</span></button>;
        })}
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 260px", alignItems: "start" }}>
        {/* Question */}
        <div className="card card-pad">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <Badge tone="blue">{sub.mapel}</Badge>
            <span style={{ fontWeight: 800, fontSize: 14 }}>Soal {state.qi + 1} <span style={{ color: "var(--ink-3)", fontWeight: 600 }}>dari {sub.soal.length}</span></span>
            <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto", color: flagged ? "#a6760e" : "var(--ink-3)" }} onClick={toggleFlag}><Icon name="flag" size={14} /> {flagged ? "Ditandai" : "Tandai ragu"}</button>
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.55, marginBottom: 20, textWrap: "pretty" }}>{q.q}</div>
          <div style={{ display: "grid", gap: 10 }}>
            {q.opt.map((o, oi) => {
              const on = state.answers[key] === oi;
              return (
                <button key={oi} onClick={() => pilih(oi)} style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px 16px", borderRadius: 13, border: on ? "1.5px solid var(--blue)" : "1px solid var(--line-2)", background: on ? "var(--blue-bg)" : "var(--surface)", cursor: "pointer", textAlign: "left", fontFamily: "var(--sans)", transition: "all .12s" }}>
                  <span style={{ width: 30, height: 30, borderRadius: 9, display: "grid", placeItems: "center", background: on ? "var(--blue)" : "var(--surface-2)", color: on ? "#fff" : "var(--ink-2)", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{String.fromCharCode(65 + oi)}</span>
                  <span style={{ fontSize: 14.5, fontWeight: on ? 700 : 500, color: "var(--ink)" }}>{o}</span>
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "space-between" }}>
            <button className="btn btn-ghost" disabled={isFirst} onClick={prevQ}><Icon name="chevL" size={15} /> Sebelumnya</button>
            {isLastOverall
              ? <button className="btn btn-soft" onClick={() => setConfirm(true)}>Selesai <Icon name="check" size={15} /></button>
              : <button className="btn btn-soft" onClick={nextQ}>Berikutnya <Icon name="chevR" size={15} /></button>}
          </div>
        </div>

        {/* Navigator */}
        <div className="card card-pad" style={{ alignSelf: "start" }}>
          <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 12 }}>Navigasi Soal</div>
          <div style={{ display: "grid", gap: 14 }}>
            {CBT_BANK.map((s, si) => (
              <div key={si}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-3)", marginBottom: 7 }}>{s.kode}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
                  {s.soal.map((_, qi) => {
                    const k = si + "-" + qi;
                    const answered = state.answers[k] != null;
                    const fl = state.flags[k];
                    const cur = state.sub === si && state.qi === qi;
                    return (
                      <button key={qi} onClick={() => goTo(si, qi)} title={fl ? "Ditandai ragu" : answered ? "Terjawab" : "Belum"}
                        style={{ aspectRatio: "1", borderRadius: 9, border: cur ? "2px solid var(--ink)" : "1px solid var(--line-2)", background: fl ? "var(--amber-bg)" : answered ? "var(--blue)" : "var(--surface)", color: answered && !fl ? "#fff" : fl ? "#a6760e" : "var(--ink-2)", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "var(--mono)" }}>
                        {qi + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--line)", display: "grid", gap: 8, fontSize: 11.5, color: "var(--ink-3)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 16, height: 16, borderRadius: 5, background: "var(--blue)" }} /> Terjawab</span>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 16, height: 16, borderRadius: 5, background: "var(--amber-bg)", border: "1px solid var(--amber)" }} /> Ditandai ragu</span>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 16, height: 16, borderRadius: 5, background: "var(--surface)", border: "1px solid var(--line-2)" }} /> Belum dijawab</span>
          </div>
        </div>
      </div>

      {confirm && (
        <Modal title="Kumpulkan Jawaban?" subtitle={jumlahDijawab + " dari " + CBT_TOTAL_SOAL + " soal terjawab"} onClose={() => setConfirm(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setConfirm(false)}>Periksa Lagi</button><button className="btn btn-primary" onClick={submit}><Icon name="check" size={16} /> Ya, Kumpulkan</button></>}>
          <p style={{ margin: 0, fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6 }}>
            {jumlahDijawab < CBT_TOTAL_SOAL
              ? <>Masih ada <b style={{ color: "var(--red)" }}>{CBT_TOTAL_SOAL - jumlahDijawab} soal</b> yang belum dijawab. Setelah dikumpulkan, jawaban tidak dapat diubah.</>
              : <>Semua soal sudah terjawab. Setelah dikumpulkan, jawaban tidak dapat diubah lagi.</>}
          </p>
        </Modal>
      )}
    </div>
  );
}

// ===================== HASIL SELEKSI =====================
function CalonHasil({ nav }) {
  const saved = cbtLoad();
  if (!saved || !saved.submitted) {
    return (
      <div className="anim-in">
        <PageHead title="Hasil Seleksi" desc="Hasil akan tampil setelah Anda menyelesaikan ujian masuk." />
        <div className="card empty">
          <Icon name="clipboard" size={34} style={{ color: "var(--ink-3)", marginBottom: 12 }} />
          <div style={{ fontWeight: 700, color: "var(--ink-2)", marginBottom: 4 }}>Belum ada hasil ujian</div>
          <div style={{ fontSize: 13, marginBottom: 16 }}>Selesaikan dulu ujian masuk berbasis komputer.</div>
          <button className="btn btn-primary" onClick={() => nav("calon_tes")}><Icon name="play" size={15} /> Kerjakan Ujian</button>
        </div>
      </div>
    );
  }
  const hasil = cbtScore(saved.answers);
  const totalBenar = hasil.reduce((a, b) => a + b.benar, 0);
  const nilai = Math.round(totalBenar / CBT_TOTAL_SOAL * 100);
  const lulus = nilai >= 65;
  return (
    <div className="anim-in">
      <PageHead title="Hasil Seleksi" desc="Skor sementara berdasarkan simulasi ujian. Status kelulusan final diumumkan panitia pada 8 Juli 2026." />
      <div className="card" style={{ maxWidth: 640, overflow: "hidden", marginBottom: 18 }}>
        <div style={{ background: lulus ? "linear-gradient(120deg, var(--green), #1f6e48)" : "linear-gradient(120deg, var(--amber), #b07d10)", color: "#fff", padding: "30px 30px", textAlign: "center" }}>
          <div style={{ fontSize: 13, opacity: .9, fontWeight: 600 }}>Skor Gabungan</div>
          <div style={{ fontSize: 54, fontWeight: 800, fontFamily: "var(--mono)", lineHeight: 1.05 }}>{nilai}</div>
          <Badge tone="gray" style={{ background: "rgba(255,255,255,.25)", color: "#fff" }}>{lulus ? "Memenuhi ambang batas (≥65)" : "Belum memenuhi ambang (65)"}</Badge>
        </div>
        <div style={{ padding: "6px 0" }}>
          {hasil.map((h, i) => (
            <div key={h.kode} style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 24px", borderBottom: i < hasil.length - 1 ? "1px solid var(--line)" : "none" }}>
              <Icon name={h.ic} size={18} style={{ color: "var(--blue)", flexShrink: 0 }} />
              <span style={{ flex: 1, fontWeight: 700, fontSize: 13.5 }}>{h.mapel}</span>
              <div style={{ width: 90 }}><div className="prog"><i style={{ width: h.nilai + "%", background: h.nilai >= 65 ? "var(--green)" : "var(--amber)" }} /></div></div>
              <span style={{ fontFamily: "var(--mono)", fontWeight: 800, fontSize: 14, minWidth: 34, textAlign: "right" }}>{h.nilai}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="btn btn-ghost" onClick={() => nav("calon_tes")}><Icon name="book" size={16} /> Lihat Pembahasan</button>
    </div>
  );
}

export { CalonDashboard, CalonKartu, CalonTes, CalonHasil };
