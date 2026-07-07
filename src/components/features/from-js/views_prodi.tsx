/* eslint-disable */
// @ts-nocheck
// Generated from js/views_prodi.jsx by scripts/port-js-ssot.mjs.
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
// AIS — Views: AKADEMIK PRODI / KAPRODI (BAA)
// ============================================================

const TAWARAN_PRODI = [
  { kode: "TIF6101", nama: "Pemrograman Mobile", sks: 3, sem: 6, kelas: 2, kuota: 40, terisi: 38, dosen: "Dr. Imam Marzuki", status: "published" },
  { kode: "TIF6102", nama: "Keamanan Informasi", sks: 3, sem: 6, kelas: 2, kuota: 40, terisi: 31, dosen: "Bambang Sutejo, M.Kom", status: "published" },
  { kode: "TIF6103", nama: "Data Mining", sks: 3, sem: 6, kelas: 1, kuota: 35, terisi: 35, dosen: "Dewi Lestari, M.Kom", status: "published" },
  { kode: "TIF6104", nama: "Komputasi Awan", sks: 3, sem: 6, kelas: 1, kuota: 35, terisi: 12, dosen: "—", status: "draft" },
  { kode: "TIF4201", nama: "Rekayasa Perangkat Lunak", sks: 3, sem: 4, kelas: 2, kuota: 40, terisi: 40, dosen: "Hendra Wijaya, M.T", status: "published" },
  { kode: "TIF4202", nama: "Basis Data Lanjut", sks: 3, sem: 4, kelas: 2, kuota: 40, terisi: 37, dosen: "Dr. Hj. Rina Mahmudah", status: "published" },
  { kode: "TIF8101", nama: "Kapita Selekta", sks: 2, sem: 8, kelas: 1, kuota: 30, terisi: 8, dosen: "—", status: "draft" },
];

function ProdiDashboard({ nav }) {
  const R = window.AIS_ROLES;
  const p = R.personas.kaprodi;
  const published = TAWARAN_PRODI.filter((t) => t.status === "published");
  const draft = TAWARAN_PRODI.filter((t) => t.status === "draft");
  const totalKuota = TAWARAN_PRODI.reduce((a, b) => a + b.kuota * b.kelas, 0);
  const totalTerisi = TAWARAN_PRODI.reduce((a, b) => a + b.terisi, 0);

  const tiles = [
    { label: "Mahasiswa Aktif", value: 642, meta: "Prodi Teknik Informatika", ic: "users", c: "var(--purple)", bg: "var(--purple-bg)" },
    { label: "MK Ditawarkan", value: TAWARAN_PRODI.length, meta: draft.length + " draf belum publish", ic: "book", c: "var(--blue)", bg: "var(--blue-bg)" },
    { label: "Keterisian Kelas", value: Math.round(totalTerisi / totalKuota * 100) + "%", meta: totalTerisi + " / " + totalKuota + " kursi", ic: "chart", c: "var(--green)", bg: "var(--green-bg)" },
    { label: "Sinkron PDDikti", value: "98.7%", meta: "terakhir 09:58 hari ini", ic: "report", c: "var(--orange-600)", bg: "var(--orange-50)" },
  ];

  return (
    <div className="anim-in">
      <StaffHero persona={p} role="kaprodi" sub="Kelola penawaran mata kuliah, penjadwalan, validasi akademik, dan pelaporan prodi."
        action={<button className="btn btn-primary" onClick={() => nav("prd_tawaran")}><Icon name="book" size={17} /> Penawaran MK</button>} />

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

      <div className="grid" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="book" size={19} style={{ color: "var(--blue)" }} /><h3>Keterisian Kelas</h3>
            <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("prd_tawaran")}>Kelola</button></div>
          <div className="card-pad" style={{ display: "grid", gap: 13 }}>
            {published.slice(0, 5).map((t) => {
              const pct = Math.round(t.terisi / t.kuota * 100);
              return (
                <div key={t.kode}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 13 }}>
                    <span style={{ fontWeight: 600 }}><span className="mono" style={{ color: "var(--ink-3)" }}>{t.kode}</span> {t.nama}</span>
                    <b className="mono">{t.terisi}/{t.kuota}</b>
                  </div>
                  <div className="prog"><i style={{ width: pct + "%", background: pct >= 95 ? "var(--red)" : pct >= 70 ? "var(--green)" : "var(--amber)" }} /></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="flag" size={19} style={{ color: "var(--orange-600)" }} /><h3>Perlu Tindakan</h3></div>
          <div style={{ padding: "6px 0" }}>
            {[
              ["KRS menunggu rekap prodi", "23 mahasiswa belum tervalidasi PA", "check", "prd_krs", "amber"],
              [draft.length + " MK masih draf", "Belum punya dosen / belum publish", "book", "prd_tawaran", "blue"],
              ["Ruang bentrok jadwal", "TIF6103 & TIF4202 — Rabu 13:00", "calendar", "prd_jadwal", "red"],
              ["Sinkronisasi PDDikti", "71 record menunggu validasi", "report", "prd_feeder", "purple"],
            ].map(([t, d, ic, target, tone], i, arr) => (
              <button key={i} onClick={() => nav(target)} style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 22px", width: "100%", textAlign: "left", border: "none", background: "none", cursor: "pointer", borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none", fontFamily: "var(--sans)" }}>
                <div style={{ width: 36, height: 36, borderRadius: 11, background: `var(--${tone}-bg)`, color: `var(--${tone})`, display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name={ic} size={18} /></div>
                <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 13.5 }}>{t}</div><div style={{ fontSize: 12, color: "var(--ink-3)" }}>{d}</div></div>
                <Icon name="chevR" size={16} style={{ color: "var(--ink-3)" }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProdiTawaran() {
  const toast = useToast();
  const [list, setList] = useState(TAWARAN_PRODI.map((t) => ({ ...t })));
  const [add, setAdd] = useState(false);
  function publish(kode) { setList((l) => l.map((t) => t.kode === kode ? { ...t, status: "published" } : t)); toast("MK " + kode + " dipublikasikan ke KRS", "ok"); }
  return (
    <div className="anim-in">
      <PageHead title="Penawaran Mata Kuliah" desc="Atur mata kuliah yang dibuka semester 2026/2027 Ganjil. Publikasi membuat MK tampil di KRS mahasiswa (Class Service)."
        actions={<button className="btn btn-primary" onClick={() => setAdd(true)}><Icon name="plus" size={16} /> Tawarkan MK</button>} />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Kode</th><th>Mata Kuliah</th><th style={{ textAlign: "center" }}>SKS</th><th style={{ textAlign: "center" }}>Smt</th><th style={{ textAlign: "center" }}>Kelas</th><th>Dosen Pengampu</th><th style={{ textAlign: "center" }}>Kuota</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map((t) => (
                <tr key={t.kode}>
                  <td className="mono" style={{ fontWeight: 600 }}>{t.kode}</td>
                  <td style={{ fontWeight: 700 }}>{t.nama}</td>
                  <td style={{ textAlign: "center" }}>{t.sks}</td>
                  <td style={{ textAlign: "center" }}>{t.sem}</td>
                  <td style={{ textAlign: "center" }}>{t.kelas}</td>
                  <td style={{ color: t.dosen === "—" ? "var(--red)" : "var(--ink-2)", fontWeight: t.dosen === "—" ? 700 : 500 }}>{t.dosen === "—" ? "Belum ditentukan" : t.dosen}</td>
                  <td style={{ textAlign: "center" }} className="mono">{t.terisi}/{t.kuota}</td>
                  <td><Badge tone={t.status === "published" ? "green" : "gray"} dot>{t.status === "published" ? "Terbit" : "Draf"}</Badge></td>
                  <td>{t.status === "draft" ? <button className="btn btn-soft btn-sm" disabled={t.dosen === "—"} onClick={() => publish(t.kode)}>Publish</button> : <button className="btn btn-ghost btn-sm">Edit</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {add && (
        <Modal title="Tawarkan Mata Kuliah" subtitle="Buat penawaran kelas baru" onClose={() => setAdd(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setAdd(false)}>Batal</button><button className="btn btn-primary" onClick={() => { setAdd(false); toast("Penawaran MK disimpan sebagai draf"); }}><Icon name="check" size={16} /> Simpan Draf</button></>}>
          <div className="field"><label>Mata Kuliah (dari kurikulum)</label><select><option>TIF6104 — Komputasi Awan (3 SKS)</option><option>TIF8101 — Kapita Selekta (2 SKS)</option><option>TIF6105 — IoT &amp; Sistem Tertanam (3 SKS)</option></select></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field"><label>Jumlah Kelas</label><input type="number" defaultValue={1} /></div>
            <div className="field"><label>Kuota / Kelas</label><input type="number" defaultValue={40} /></div>
          </div>
          <div className="field" style={{ margin: 0 }}><label>Dosen Pengampu</label><select><option>Dr. Imam Marzuki, M.Kom</option><option>Bambang Sutejo, M.Kom</option><option>Dewi Lestari, M.Kom</option></select></div>
        </Modal>
      )}
    </div>
  );
}

function ProdiJadwal() {
  const slots = ["08:00", "10:00", "13:00", "15:00"];
  const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
  const grid = {
    "Senin-08:00": { mk: "Pemrograman Mobile", k: "6A", r: "FST-301", t: "blue" },
    "Selasa-08:00": { mk: "RPL", k: "4A", r: "FST-305", t: "green" },
    "Rabu-13:00": { mk: "Data Mining", k: "6A", r: "Lab-AI", t: "red", bentrok: true },
    "Rabu-13:00b": { mk: "Basis Data Lanjut", k: "4B", r: "Lab-AI", t: "red", bentrok: true },
    "Kamis-10:00": { mk: "Keamanan Informasi", k: "6A", r: "FST-302", t: "purple" },
    "Jumat-08:00": { mk: "Komputasi Awan", k: "6A", r: "FST-303", t: "amber" },
  };
  return (
    <div className="anim-in">
      <PageHead title="Penjadwalan Kelas" desc="Tata letak jadwal mingguan prodi. Sistem menandai bentrok ruang/dosen otomatis (Class & Scheduling Service)." />
      <div className="card card-pad" style={{ marginBottom: 14, display: "flex", gap: 14, alignItems: "center" }}>
        <Badge tone="red" dot>1 bentrok ruang terdeteksi</Badge>
        <span style={{ fontSize: 13, color: "var(--ink-3)" }}>Data Mining &amp; Basis Data Lanjut memakai Lab-AI pada Rabu 13:00.</span>
      </div>
      <div className="card card-pad" style={{ overflowX: "auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "70px repeat(5,1fr)", gap: 8, minWidth: 720 }}>
          <div></div>
          {hari.map((h) => <div key={h} style={{ textAlign: "center", fontWeight: 800, fontSize: 13, padding: "6px 0" }}>{h}</div>)}
          {slots.map((s) => (
            <React.Fragment key={s}>
              <div style={{ fontSize: 12, fontWeight: 700, fontFamily: "var(--mono)", color: "var(--ink-3)", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 8 }}>{s}</div>
              {hari.map((h) => {
                const cells = Object.entries(grid).filter(([k]) => k.startsWith(h + "-" + s));
                return (
                  <div key={h + s} style={{ minHeight: 64, borderRadius: 12, background: cells.length ? "transparent" : "var(--surface-2)", display: "grid", gap: 4 }}>
                    {cells.map(([key, c]) => (
                      <div key={key} style={{ padding: 9, borderRadius: 11, background: `var(--${c.t}-bg)`, border: c.bentrok ? "1.5px solid var(--red)" : `1px solid var(--${c.t}-bg)` }}>
                        <div style={{ fontWeight: 700, fontSize: 11.5, color: `var(--${c.t})`, lineHeight: 1.2 }}>{c.mk}</div>
                        <div style={{ fontSize: 10.5, color: "var(--ink-3)", marginTop: 2 }}>{c.k} · {c.r}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProdiKurikulum() {
  const D = window.AIS_DATA;
  const kur = [
    { sem: 1, mk: ["Kalkulus I", "Algoritma & Pemrograman", "Pengantar TI", "Bahasa Indonesia", "Pendidikan Agama"], sks: 20 },
    { sem: 2, mk: ["Kalkulus II", "Struktur Data", "Sistem Digital", "Statistika", "Pancasila"], sks: 21 },
    { sem: 3, mk: ["Basis Data", "Pemrograman Berorientasi Objek", "Arsitektur Komputer", "Matematika Diskret"], sks: 21 },
    { sem: 4, mk: ["Rekayasa Perangkat Lunak", "Basis Data Lanjut", "Jaringan Komputer", "Sistem Operasi"], sks: 21 },
    { sem: 5, mk: ["Kecerdasan Buatan", "Pemrograman Web", "Interaksi Manusia Komputer", "Metode Numerik"], sks: 20 },
    { sem: 6, mk: ["Pemrograman Mobile", "Data Mining", "Keamanan Informasi", "Komputasi Awan"], sks: 20 },
  ];
  return (
    <div className="anim-in">
      <PageHead title="Kurikulum & RPS" desc="Struktur kurikulum 2023 Prodi Teknik Informatika — 144 SKS. Tiap MK terhubung RPS di Curriculum Service." />
      <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        {kur.map((s) => (
          <div key={s.sem} className="card" style={{ alignSelf: "start" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "1px solid var(--line)" }}>
              <b style={{ fontSize: 14 }}>Semester {s.sem}</b><Badge tone="gray">{s.sks} SKS</Badge>
            </div>
            <div style={{ padding: "6px 0" }}>
              {s.mk.map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 18px", fontSize: 13 }}>
                  <Icon name="doc" size={15} style={{ color: "var(--purple)", flexShrink: 0 }} />
                  <span style={{ flex: 1, fontWeight: 600 }}>{m}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProdiMahasiswa() {
  const [q, setQ] = useState("");
  const rows = [];
  const angk = [2023, 2022, 2021, 2020];
  const namaP = ["Ahmad Fauzi", "Siti Rahma", "Budi Santoso", "Dewi Anggraini", "Rizki Pratama", "Putri Maharani", "Fajar Nugraha", "Nadia Salsabila", "Arif Wibowo", "Lia Kusuma", "Dimas Saputra", "Sari Indah"];
  namaP.forEach((n, i) => rows.push({ nim: "112" + angk[i % 4] + "0910000" + String(10 + i).padStart(3, "0"), nama: n, angkatan: angk[i % 4], sem: [2, 4, 6, 8][i % 4], ipk: (2.4 + (i * 0.13) % 1.5).toFixed(2), status: i === 5 ? "Cuti" : i === 9 ? "Nonaktif" : "Aktif" }));
  const list = rows.filter((r) => r.nama.toLowerCase().includes(q.toLowerCase()) || r.nim.includes(q));
  const st = { Aktif: "green", Cuti: "amber", Nonaktif: "red" };
  return (
    <div className="anim-in">
      <PageHead title="Data Mahasiswa Prodi" desc="Seluruh mahasiswa Prodi Teknik Informatika — bersumber dari Student Service." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <div className="tb-search" style={{ margin: 0, width: 300 }}><Icon name="search" size={16} /><input placeholder="Cari nama / NIM…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--ink-3)" }}>{list.length} dari 642 mahasiswa</span>
      </div>
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>NIM</th><th>Nama</th><th style={{ textAlign: "center" }}>Angkatan</th><th style={{ textAlign: "center" }}>Smt</th><th style={{ textAlign: "center" }}>IPK</th><th>Status</th></tr></thead>
            <tbody>
              {list.map((r) => (
                <tr key={r.nim}>
                  <td className="mono">{r.nim}</td>
                  <td style={{ fontWeight: 700 }}>{r.nama}</td>
                  <td style={{ textAlign: "center" }}>{r.angkatan}</td>
                  <td style={{ textAlign: "center" }}>{r.sem}</td>
                  <td style={{ textAlign: "center", fontWeight: 800, fontFamily: "var(--mono)", color: +r.ipk < 2.5 ? "var(--red)" : "var(--ink)" }}>{r.ipk}</td>
                  <td><Badge tone={st[r.status]} dot>{r.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ProdiKRS() {
  const data = [
    { angk: 2023, total: 168, validasi: 168, menunggu: 0 },
    { angk: 2022, total: 162, validasi: 139, menunggu: 23 },
    { angk: 2021, total: 158, validasi: 151, menunggu: 7 },
    { angk: 2020, total: 154, validasi: 154, menunggu: 0 },
  ];
  const totMenunggu = data.reduce((a, b) => a + b.menunggu, 0);
  return (
    <div className="anim-in">
      <PageHead title="Rekap & Validasi KRS" desc="Pantau progres validasi KRS per angkatan. Mahasiswa yang sudah disetujui PA masuk rekap final prodi." />
      <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)", marginBottom: 20 }}>
        <div className="stat card" style={{ background: "var(--green-bg)", border: "none" }}><div className="label" style={{ color: "var(--green)" }}>Tervalidasi</div><div className="value" style={{ color: "var(--green)" }}>612</div><div className="meta" style={{ color: "var(--green)" }}>dari 642 mahasiswa</div></div>
        <div className="stat card" style={{ background: "var(--orange-50)", border: "none" }}><div className="label" style={{ color: "var(--orange-600)" }}>Menunggu PA</div><div className="value" style={{ color: "var(--orange-600)" }}>{totMenunggu}</div><div className="meta" style={{ color: "var(--orange-600)" }}>belum disetujui wali</div></div>
        <div className="stat card" style={{ background: "var(--blue-bg)", border: "none" }}><div className="label" style={{ color: "var(--blue)" }}>Progres</div><div className="value" style={{ color: "var(--blue)" }}>95%</div><div className="meta" style={{ color: "var(--blue)" }}>periode ditutup 5 hari lagi</div></div>
      </div>
      <div className="card">
        <div className="card-head"><Icon name="check" size={19} style={{ color: "var(--purple)" }} /><h3>Rekap per Angkatan</h3></div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Angkatan</th><th style={{ textAlign: "center" }}>Total</th><th style={{ textAlign: "center" }}>Tervalidasi</th><th style={{ textAlign: "center" }}>Menunggu</th><th style={{ width: 220 }}>Progres</th></tr></thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.angk}>
                  <td style={{ fontWeight: 800, fontFamily: "var(--mono)" }}>{d.angk}</td>
                  <td style={{ textAlign: "center" }}>{d.total}</td>
                  <td style={{ textAlign: "center", color: "var(--green)", fontWeight: 700 }}>{d.validasi}</td>
                  <td style={{ textAlign: "center" }}>{d.menunggu ? <Badge tone="amber">{d.menunggu}</Badge> : <span style={{ color: "var(--ink-3)" }}>0</span>}</td>
                  <td><div className="prog"><i style={{ width: (d.validasi / d.total * 100) + "%", background: d.menunggu ? "var(--amber)" : "var(--green)" }} /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ProdiNilai() {
  const rows = TAWARAN_PRODI.filter((t) => t.status === "published").map((t) => ({ ...t, terisi: Math.random() > 0.4 ? t.terisi : Math.floor(t.terisi * 0.6) }));
  return (
    <div className="anim-in">
      <PageHead title="Rekap Nilai" desc="Pantau kelengkapan input nilai dosen per kelas. Nilai belum lengkap menahan penerbitan KHS." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Kode</th><th>Mata Kuliah</th><th>Dosen</th><th style={{ textAlign: "center" }}>Mahasiswa</th><th style={{ width: 200 }}>Kelengkapan Nilai</th><th>Status</th></tr></thead>
            <tbody>
              {TAWARAN_PRODI.filter((t) => t.status === "published").map((t, i) => {
                const lengkap = i % 3 !== 1;
                const terisi = lengkap ? t.terisi : Math.floor(t.terisi * 0.55);
                return (
                  <tr key={t.kode}>
                    <td className="mono">{t.kode}</td>
                    <td style={{ fontWeight: 700 }}>{t.nama}</td>
                    <td style={{ color: "var(--ink-2)" }}>{t.dosen}</td>
                    <td style={{ textAlign: "center" }}>{t.terisi}</td>
                    <td><div className="prog"><i style={{ width: (terisi / t.terisi * 100) + "%", background: lengkap ? "var(--green)" : "var(--amber)" }} /></div><div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4 }}>{terisi}/{t.terisi}</div></td>
                    <td><Badge tone={lengkap ? "green" : "amber"} dot>{lengkap ? "Lengkap" : "Belum lengkap"}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ProdiFeeder() {
  const toast = useToast();
  const [sync, setSync] = useState(false);
  const items = [
    { label: "Data Mahasiswa", total: 642, ok: 642, status: "ok" },
    { label: "Aktivitas Perkuliahan (AKM)", total: 64, ok: 64, status: "ok" },
    { label: "Nilai Semester", total: 5482, ok: 5411, status: "warn" },
    { label: "Dosen & Pengajaran", total: 38, ok: 38, status: "ok" },
    { label: "KRS Mahasiswa", total: 612, ok: 612, status: "ok" },
  ];
  return (
    <div className="anim-in">
      <PageHead title="Sinkronisasi PDDikti (Feeder)" desc="Pelaporan data ke Pangkalan Data Pendidikan Tinggi via PDDikti Feeder Service (Neo Feeder)."
        actions={<button className="btn btn-primary" onClick={() => { setSync(true); toast("Sinkronisasi feeder dimulai…"); setTimeout(() => toast("71 record tersinkron ke Neo Feeder", "ok"), 900); }}><Icon name="refresh" size={16} /> Sinkronkan Sekarang</button>} />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
        <div><div style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>Status Feeder</div><div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}><span className="dot" style={{ background: "var(--green)" }} /><b style={{ fontSize: 15 }}>Terhubung</b></div></div>
        <div style={{ borderLeft: "1px solid var(--line)", paddingLeft: 24 }}><div style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>Sinkron Terakhir</div><div style={{ fontWeight: 700, fontSize: 15, marginTop: 3 }}>Hari ini 09:58</div></div>
        <div style={{ borderLeft: "1px solid var(--line)", paddingLeft: 24 }}><div style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>Periode</div><div style={{ fontWeight: 700, fontSize: 15, marginTop: 3 }}>2025/2026 Genap</div></div>
        <Badge tone="amber" dot>71 record menunggu</Badge>
      </div>
      <div className="card">
        <div className="card-head"><Icon name="report" size={19} style={{ color: "var(--orange-600)" }} /><h3>Status Pelaporan</h3></div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Jenis Data</th><th style={{ textAlign: "center" }}>Total</th><th style={{ textAlign: "center" }}>Tersinkron</th><th style={{ width: 220 }}>Progres</th><th>Status</th></tr></thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.label}>
                  <td style={{ fontWeight: 700 }}>{it.label}</td>
                  <td style={{ textAlign: "center" }} className="mono">{it.total.toLocaleString("id")}</td>
                  <td style={{ textAlign: "center" }} className="mono">{(sync && it.status === "warn" ? it.total : it.ok).toLocaleString("id")}</td>
                  <td><div className="prog"><i style={{ width: ((sync && it.status === "warn" ? it.total : it.ok) / it.total * 100) + "%", background: it.status === "ok" || sync ? "var(--green)" : "var(--amber)" }} /></div></td>
                  <td><Badge tone={it.status === "ok" || sync ? "green" : "amber"} dot>{it.status === "ok" || sync ? "Lengkap" : "Sebagian"}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export { ProdiDashboard, ProdiTawaran, ProdiJadwal, ProdiKurikulum, ProdiMahasiswa, ProdiKRS, ProdiNilai, ProdiFeeder };
