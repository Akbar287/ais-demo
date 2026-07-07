/* eslint-disable */
// @ts-nocheck
// Generated from js/views_akademik2.jsx by scripts/port-js-ssot.mjs.
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
// AIS — Views: Pelengkap proses akademik sesuai Sequence-*.md
// Mahasiswa: EDOM, Banding Nilai, Layanan Status, Tugas Akhir
// Calon: Pendaftaran & Berkas + Pembayaran Tes
// Dosen: Hasil EDOM, Sanggah Nilai, BKD & Kinerja
// PA: Riwayat Perwalian | Kaprodi: TA Prodi, Yudisium, Evaluasi Studi
// ============================================================

// ---------------- MAHASISWA: EDOM (Flow 6) ----------------
const EDOM_MK = [
  { kode: "TIF6101", nama: "Pemrograman Mobile", dosen: "Dr. Imam Marzuki, M.Kom", done: false },
  { kode: "TIF6102", nama: "Keamanan Informasi", dosen: "Bambang Sutejo, M.Kom", done: false },
  { kode: "TIF6103", nama: "Data Mining", dosen: "Dewi Lestari, M.Kom", done: true },
];
const EDOM_ASPEK = ["Penguasaan materi", "Kejelasan penyampaian", "Ketepatan waktu & disiplin", "Umpan balik tugas/ujian", "Pemanfaatan media/LMS"];

function MhsEdom() {
  const toast = useToast();
  const [list, setList] = useState(EDOM_MK.map((m) => ({ ...m })));
  const [aktif, setAktif] = useState(null);
  const [skor, setSkor] = useState({});
  function kirim() {
    setList((l) => l.map((m) => m.kode === aktif.kode ? { ...m, done: true } : m));
    setAktif(null); setSkor({});
    toast("EDOM terkirim (anonim) — terima kasih atas penilaian Anda", "ok");
  }
  const selesai = list.filter((m) => m.done).length;
  return (
    <div className="anim-in">
      <PageHead title="EDOM — Evaluasi Dosen" desc="Wajib diisi sebelum melihat nilai akhir. Jawaban bersifat anonim (Assessment & QA Service)." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 14, alignItems: "center" }}>
        <div className="prog" style={{ flex: 1, height: 10 }}><i style={{ width: (selesai / list.length * 100) + "%", background: "var(--green)" }} /></div>
        <b style={{ fontSize: 13 }}>{selesai}/{list.length} selesai</b>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "1fr", gap: 12 }}>
        {list.map((m) => (
          <div key={m.kode} className="card card-pad" style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{m.nama} <span className="mono" style={{ color: "var(--ink-3)", fontSize: 12 }}>({m.kode})</span></div>
              <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{m.dosen}</div>
            </div>
            {m.done ? <Badge tone="green" dot>Selesai</Badge> : <button className="btn btn-primary btn-sm" onClick={() => setAktif(m)}>Isi EDOM</button>}
          </div>
        ))}
      </div>
      {aktif && (
        <Modal title={"EDOM — " + aktif.nama} subtitle={aktif.dosen + " · anonim"} onClose={() => setAktif(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setAktif(null)}>Batal</button>
            <button className="btn btn-primary" disabled={Object.keys(skor).length < EDOM_ASPEK.length} onClick={kirim}><Icon name="check" size={16} /> Kirim</button></>}>
          {EDOM_ASPEK.map((a, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 7 }}>{i + 1}. {a}</div>
              <div style={{ display: "flex", gap: 6 }}>
                {[1, 2, 3, 4, 5].map((v) => (
                  <button key={v} onClick={() => setSkor((s) => ({ ...s, [i]: v }))}
                    style={{ width: 40, height: 36, borderRadius: 9, border: skor[i] === v ? "1.5px solid var(--orange)" : "1px solid var(--line-2)", background: skor[i] === v ? "var(--orange-50)" : "var(--surface)", color: skor[i] === v ? "var(--orange-600)" : "var(--ink-2)", fontWeight: 800, cursor: "pointer", fontFamily: "var(--sans)" }}>{v}</button>
                ))}
              </div>
            </div>
          ))}
          <div style={{ fontSize: 12, color: "var(--ink-3)" }}>1 = sangat kurang · 5 = sangat baik</div>
        </Modal>
      )}
    </div>
  );
}

// ---------------- MAHASISWA: Sanggah / Banding Nilai (Flow 9) ----------------
function MhsBanding() {
  const toast = useToast();
  const [list, setList] = useState([
    { mk: "TIF6103 — Data Mining", jenis: "Sanggah Nilai", alasan: "Nilai UAS belum masuk komponen", tgl: "20 Jun 2026", status: "diproses" },
    { mk: "TIF4202 — Basis Data Lanjut", jenis: "Remedial", alasan: "Nilai D — ajukan remedial", tgl: "12 Jun 2026", status: "disetujui" },
  ]);
  const [form, setForm] = useState(false);
  const tone = { diproses: ["Diproses Dosen", "amber"], disetujui: ["Disetujui", "green"], ditolak: ["Ditolak", "red"] };
  return (
    <div className="anim-in">
      <PageHead title="Sanggah & Banding Nilai" desc="Ajukan sanggah (masa sanggah 7 hari setelah publikasi), banding, atau remedial. Diteruskan ke dosen pengampu → Kaprodi."
        actions={<button className="btn btn-primary" onClick={() => setForm(true)}><Icon name="plus" size={16} /> Ajukan</button>} />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Mata Kuliah</th><th>Jenis</th><th>Alasan</th><th>Tanggal</th><th>Status</th></tr></thead>
            <tbody>
              {list.map((x, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700 }}>{x.mk}</td>
                  <td><Badge tone={x.jenis === "Remedial" ? "blue" : "purple"}>{x.jenis}</Badge></td>
                  <td style={{ color: "var(--ink-2)", fontSize: 13, maxWidth: 260 }}>{x.alasan}</td>
                  <td style={{ fontSize: 13 }}>{x.tgl}</td>
                  <td><Badge tone={tone[x.status][1]} dot>{tone[x.status][0]}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {form && (
        <Modal title="Ajukan Sanggah / Banding / Remedial" subtitle="Masa sanggah: ≤ 7 hari sejak nilai terbit" onClose={() => setForm(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(false)}>Batal</button>
            <button className="btn btn-primary" onClick={() => { setList((l) => [{ mk: "TIF6101 — Pemrograman Mobile", jenis: "Sanggah Nilai", alasan: "Komponen tugas 4 belum dinilai", tgl: "03 Jul 2026", status: "diproses" }, ...l]); setForm(false); toast("Pengajuan terkirim ke dosen pengampu", "ok"); }}><Icon name="check" size={16} /> Kirim</button></>}>
          <div className="field"><label>Mata Kuliah</label><select><option>TIF6101 — Pemrograman Mobile (A-)</option><option>TIF6102 — Keamanan Informasi (B+)</option></select></div>
          <div className="field"><label>Jenis</label><select><option>Sanggah Nilai</option><option>Banding Nilai</option><option>Remedial</option></select></div>
          <div className="field" style={{ margin: 0 }}><label>Alasan & Bukti</label><textarea rows={3} placeholder="Jelaskan alasan disertai bukti (mis. tugas terkumpul di LMS)…" /></div>
        </Modal>
      )}
    </div>
  );
}

// ---------------- MAHASISWA: Layanan Status Studi (Flow 10) ----------------
function MhsLayanan() {
  const toast = useToast();
  const [list, setList] = useState([
    { jenis: "Surat Keterangan Aktif", tgl: "18 Jun 2026", status: "selesai", ket: "No. 512/Un.01/2026 · TTE" },
  ]);
  const layanan = [
    ["Surat Keterangan Aktif", "doc", "Terbit otomatis ber-TTE"],
    ["Cuti Akademik", "clock", "Perlu persetujuan PA → BAA"],
    ["Aktif Kembali (Reaktivasi)", "refresh", "Setelah masa cuti selesai"],
    ["Pindah Program Studi", "building", "Perlu rapat prodi tujuan"],
    ["Konseling Akademik", "userCheck", "Jadwal dengan konselor"],
  ];
  return (
    <div className="anim-in">
      <PageHead title="Layanan Status Studi" desc="Pengajuan surat, cuti, reaktivasi, pindah prodi, dan konseling — alur Student Status Service + Workflow." />
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12, marginBottom: 20 }}>
        {layanan.map(([nama, ic, ket]) => (
          <button key={nama} className="card card-pad" onClick={() => { setList((l) => [{ jenis: nama, tgl: "03 Jul 2026", status: "diproses", ket: "Menunggu persetujuan" }, ...l]); toast("Pengajuan \"" + nama + "\" terkirim", "ok"); }}
            style={{ textAlign: "left", cursor: "pointer", fontFamily: "var(--sans)", border: "1px solid var(--line)" }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--orange-50)", color: "var(--orange-600)", display: "grid", placeItems: "center", marginBottom: 10 }}><Icon name={ic} size={20} /></div>
            <div style={{ fontWeight: 800, fontSize: 13.5, marginBottom: 3 }}>{nama}</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{ket}</div>
          </button>
        ))}
      </div>
      <div className="card">
        <div className="card-head"><Icon name="clock" size={19} style={{ color: "var(--blue)" }} /><h3>Riwayat Pengajuan</h3></div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Layanan</th><th>Tanggal</th><th>Status</th><th>Keterangan</th></tr></thead>
            <tbody>
              {list.map((x, i) => (
                <tr key={i}><td style={{ fontWeight: 700 }}>{x.jenis}</td><td style={{ fontSize: 13 }}>{x.tgl}</td><td><Badge tone={x.status === "selesai" ? "green" : "amber"} dot>{x.status === "selesai" ? "Selesai" : "Diproses"}</Badge></td><td style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{x.ket}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------- MAHASISWA: Tugas Akhir (Flow 11) ----------------
function MhsTA() {
  const toast = useToast();
  const [log, setLog] = useState([
    { tgl: "28 Jun 2026", topik: "Revisi Bab 3 — metodologi disetujui", status: "acc" },
    { tgl: "20 Jun 2026", topik: "Diskusi dataset & rencana eksperimen", status: "acc" },
    { tgl: "12 Jun 2026", topik: "Pengajuan outline Bab 3", status: "revisi" },
  ]);
  const tahap = ["Pengajuan Judul", "Proposal & Seminar", "Bimbingan", "Siap Sidang", "Sidang & Revisi"];
  const now = 2;
  return (
    <div className="anim-in">
      <PageHead title="Tugas Akhir Saya" desc="Siklus TA: judul → proposal → bimbingan (logbook) → sidang. Pembimbing: Dr. Imam Marzuki, M.Kom (Thesis Service)." />
      <div className="card card-pad" style={{ marginBottom: 18 }}>
        <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Optimasi Penjadwalan Kuliah dengan Algoritma Genetika</div>
        <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginBottom: 16 }}>Diajukan 02 Mar 2026 · Pembimbing I: Dr. Imam Marzuki · Pembimbing II: Dewi Lestari, M.Kom</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {tahap.map((t, i) => (
            <React.Fragment key={t}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 800, background: i <= now ? "var(--orange)" : "var(--surface-2)", color: i <= now ? "#fff" : "var(--ink-3)" }}>{i < now ? "✓" : i + 1}</div>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: i <= now ? "var(--ink)" : "var(--ink-3)" }}>{t}</span>
              </div>
              {i < tahap.length - 1 && <div style={{ width: 22, height: 2, background: i < now ? "var(--orange)" : "var(--line)" }} />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="card-head"><Icon name="doc" size={19} style={{ color: "var(--green)" }} /><h3>Logbook Bimbingan</h3>
          <button className="btn btn-primary btn-sm" style={{ marginLeft: "auto" }} onClick={() => { setLog((l) => [{ tgl: "03 Jul 2026", topik: "Pengajuan draft Bab 4 — hasil eksperimen", status: "menunggu" }, ...l]); toast("Entri logbook dikirim ke pembimbing", "ok"); }}><Icon name="plus" size={14} /> Tambah Entri</button></div>
        <div>
          {log.map((x, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 22px", borderBottom: i < log.length - 1 ? "1px solid var(--line)" : "none" }}>
              <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)", width: 86 }}>{x.tgl}</span>
              <span style={{ flex: 1, fontWeight: 600, fontSize: 13.5 }}>{x.topik}</span>
              <Badge tone={x.status === "acc" ? "green" : x.status === "revisi" ? "amber" : "gray"} dot>{x.status === "acc" ? "ACC" : x.status === "revisi" ? "Revisi" : "Menunggu"}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------- CALON: Pendaftaran, Berkas & Pembayaran Tes (PMB Flow 1&3) ----------------
function CalonDaftar() {
  const toast = useToast();
  const [berkas, setBerkas] = useState({ ijazah: true, rapor: true, foto: true, kk: false });
  const [paid, setPaid] = useState(false);
  const lengkap = Object.values(berkas).every(Boolean);
  return (
    <div className="anim-in">
      <PageHead title="Pendaftaran & Berkas" desc="Lengkapi biodata, unggah berkas, lalu bayar biaya pendaftaran untuk menerbitkan kartu ujian (Admissions + Billing)." />
      <div className="grid" style={{ gridTemplateColumns: "1.3fr 1fr" }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="doc" size={19} style={{ color: "var(--blue)" }} /><h3>Berkas Persyaratan</h3>
            <Badge tone={lengkap ? "green" : "amber"} style={{ marginLeft: "auto" }} dot>{lengkap ? "Lengkap" : "Belum lengkap"}</Badge></div>
          <div>
            {[["ijazah", "Ijazah / SKL"], ["rapor", "Rapor Semester 1–5"], ["foto", "Pas Foto 3×4"], ["kk", "Kartu Keluarga"]].map(([k, l], i, arr) => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 22px", borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none" }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: berkas[k] ? "var(--green-bg)" : "var(--surface-2)", color: berkas[k] ? "var(--green)" : "var(--ink-3)", display: "grid", placeItems: "center" }}><Icon name={berkas[k] ? "check" : "upload"} size={17} /></div>
                <span style={{ flex: 1, fontWeight: 700, fontSize: 13.5 }}>{l}</span>
                {berkas[k] ? <Badge tone="green">Terunggah</Badge> : <button className="btn btn-soft btn-sm" onClick={() => { setBerkas((b) => ({ ...b, [k]: true })); toast(l + " terunggah — menunggu verifikasi panitia", "ok"); }}><Icon name="upload" size={13} /> Unggah</button>}
              </div>
            ))}
          </div>
        </div>
        <div className="card card-pad" style={{ alignSelf: "start" }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 15 }}>Biaya Pendaftaran</h3>
          <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "var(--mono)", margin: "6px 0 2px" }}>Rp 350.000</div>
          <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginBottom: 14 }}>Jalur Reguler · Gel. 2</div>
          <div style={{ padding: 13, background: "var(--surface-2)", borderRadius: 12, marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 700 }}>VIRTUAL ACCOUNT (BSI)</div>
            <div className="mono" style={{ fontSize: 17, fontWeight: 800, letterSpacing: ".04em" }}>8810 4200 0144</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>a.n. Reyhan Pratama · berlaku 2×24 jam</div>
          </div>
          {paid ? (
            <div style={{ display: "flex", alignItems: "center", gap: 9, padding: 12, background: "var(--green-bg)", borderRadius: 11 }}>
              <Icon name="check" size={18} style={{ color: "var(--green)" }} /><b style={{ fontSize: 13, color: "var(--green)" }}>Lunas — kartu ujian terbit otomatis</b>
            </div>
          ) : (
            <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => { setPaid(true); toast("Pembayaran diterima (webhook gateway) — kartu ujian terbit", "ok"); }}><Icon name="wallet" size={16} /> Simulasi Bayar</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------- DOSEN: Hasil EDOM (Flow 5) ----------------
function DsnEdom() {
  const data = [
    { mk: "TIF5101 Kecerdasan Buatan (5A)", resp: 30, skor: [4.6, 4.4, 4.7, 4.1, 4.5] },
    { mk: "TIF3105 Pemrograman Web (3A)", resp: 33, skor: [4.8, 4.7, 4.6, 4.4, 4.8] },
    { mk: "TIF7203 Machine Learning (7A)", resp: 21, skor: [4.3, 4.2, 4.5, 3.9, 4.4] },
  ];
  return (
    <div className="anim-in">
      <PageHead title="Hasil EDOM Saya" desc="Rekap evaluasi mahasiswa (anonim) per kelas. Skor skala 1–5, aspek: materi, penyampaian, disiplin, umpan balik, media." />
      <div className="grid" style={{ gridTemplateColumns: "1fr", gap: 14 }}>
        {data.map((d) => {
          const avg = (d.skor.reduce((a, b) => a + b, 0) / d.skor.length).toFixed(2);
          return (
            <div key={d.mk} className="card card-pad">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <b style={{ fontSize: 14.5, flex: 1 }}>{d.mk}</b>
                <Badge tone="gray">{d.resp} responden</Badge>
                <Badge tone={+avg >= 4.5 ? "green" : +avg >= 4 ? "blue" : "amber"}>Rata² {avg}</Badge>
              </div>
              <div style={{ display: "grid", gap: 9 }}>
                {EDOM_ASPEK.map((a, i) => (
                  <div key={a} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 200, fontSize: 12.5, color: "var(--ink-2)" }}>{a}</span>
                    <div className="prog" style={{ flex: 1 }}><i style={{ width: (d.skor[i] / 5 * 100) + "%", background: d.skor[i] >= 4.5 ? "var(--green)" : d.skor[i] >= 4 ? "var(--blue)" : "var(--amber)" }} /></div>
                    <b className="mono" style={{ fontSize: 12.5, width: 32, textAlign: "right" }}>{d.skor[i].toFixed(1)}</b>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------- DOSEN: Sanggah Nilai Masuk (Flow 7) ----------------
function DsnBanding() {
  const toast = useToast();
  const [list, setList] = useState([
    { nim: "11210910000033", nama: "Bayu Pratama", mk: "TIF6103 Data Mining", jenis: "Sanggah", alasan: "Nilai UAS belum masuk komponen", status: "baru" },
    { nim: "11220910000087", nama: "Rangga Saputra", mk: "TIF5101 Kecerdasan Buatan", jenis: "Remedial", alasan: "Nilai D — mohon remedial", status: "baru" },
    { nim: "11210910000052", nama: "Citra Lestari", mk: "TIF3105 Pemrograman Web", jenis: "Banding", alasan: "Selisih rekap tugas", status: "selesai" },
  ]);
  function act(nim, ok) { setList((l) => l.map((x) => x.nim === nim ? { ...x, status: ok ? "selesai" : "ditolak" } : x)); toast(ok ? "Sanggah diterima — nilai dikoreksi (perlu kunci Kaprodi)" : "Sanggah ditolak dengan catatan", ok ? "ok" : ""); }
  return (
    <div className="anim-in">
      <PageHead title="Sanggah & Banding Masuk" desc="Sanggahan nilai dari mahasiswa kelas Anda. Koreksi nilai setelah publikasi memerlukan persetujuan Kaprodi." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Mahasiswa</th><th>Mata Kuliah</th><th>Jenis</th><th>Alasan</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map((x) => (
                <tr key={x.nim}>
                  <td><div style={{ fontWeight: 700 }}>{x.nama}</div><div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{x.nim}</div></td>
                  <td style={{ fontSize: 13 }}>{x.mk}</td>
                  <td><Badge tone={x.jenis === "Remedial" ? "blue" : "purple"}>{x.jenis}</Badge></td>
                  <td style={{ color: "var(--ink-2)", fontSize: 13, maxWidth: 220 }}>{x.alasan}</td>
                  <td><Badge tone={x.status === "baru" ? "amber" : x.status === "selesai" ? "green" : "red"} dot>{x.status === "baru" ? "Baru" : x.status === "selesai" ? "Selesai" : "Ditolak"}</Badge></td>
                  <td>{x.status === "baru" ? <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => act(x.nim, false)}>Tolak</button>
                    <button className="btn btn-soft btn-sm" onClick={() => act(x.nim, true)}><Icon name="check" size={13} /> Terima</button>
                  </div> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------- DOSEN: BKD & Kinerja (Flow 11) ----------------
function DsnBKD() {
  const toast = useToast();
  const komponen = [
    { bidang: "Pendidikan & Pengajaran", sks: 9.5, min: 9, bukti: 4 },
    { bidang: "Penelitian", sks: 3.0, min: 3, bukti: 2 },
    { bidang: "Pengabdian Masyarakat", sks: 1.5, min: 1, bukti: 1 },
    { bidang: "Penunjang", sks: 1.0, min: 1, bukti: 2 },
  ];
  const total = komponen.reduce((a, b) => a + b.sks, 0);
  return (
    <div className="anim-in">
      <PageHead title="BKD & Kinerja" desc="Beban Kerja Dosen semester berjalan — lapor ke SISTER. Minimal 12 SKS, maksimal 16 SKS."
        actions={<button className="btn btn-primary" onClick={() => toast("Laporan BKD dikirim ke asesor (SISTER)", "ok")}><Icon name="upload" size={16} /> Kirim ke SISTER</button>} />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
        <div><div style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>Total BKD</div><div style={{ fontSize: 24, fontWeight: 800, fontFamily: "var(--mono)", color: total >= 12 ? "var(--green)" : "var(--red)" }}>{total.toFixed(1)} SKS</div></div>
        <div className="prog" style={{ flex: 1, height: 12, minWidth: 160 }}><i style={{ width: Math.min(total / 16 * 100, 100) + "%", background: total >= 12 ? "var(--green)" : "var(--amber)" }} /></div>
        <Badge tone={total >= 12 ? "green" : "amber"} dot>{total >= 12 ? "Memenuhi (≥12)" : "Belum memenuhi"}</Badge>
      </div>
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Bidang</th><th style={{ textAlign: "center" }}>SKS</th><th style={{ textAlign: "center" }}>Minimal</th><th style={{ textAlign: "center" }}>Bukti Dokumen</th><th>Status</th></tr></thead>
            <tbody>
              {komponen.map((k) => (
                <tr key={k.bidang}>
                  <td style={{ fontWeight: 700 }}>{k.bidang}</td>
                  <td style={{ textAlign: "center", fontFamily: "var(--mono)", fontWeight: 800 }}>{k.sks.toFixed(1)}</td>
                  <td style={{ textAlign: "center", color: "var(--ink-3)" }}>{k.min}</td>
                  <td style={{ textAlign: "center" }}><Badge tone="gray">{k.bukti} berkas</Badge></td>
                  <td><Badge tone={k.sks >= k.min ? "green" : "red"} dot>{k.sks >= k.min ? "Terpenuhi" : "Kurang"}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------- PA: Riwayat Perwalian & Konseling (Dosen Flow 3) ----------------
function PAPerwalian() {
  const toast = useToast();
  const [sesi, setSesi] = useState([
    { tgl: "01 Jul 2026", mhs: "Fahmi Nuraini", topik: "Strategi perbaikan IPK — ambil ulang 2 MK", tindak: "Kurangi beban ke 18 SKS", status: "selesai" },
    { tgl: "28 Jun 2026", mhs: "Eka Permata", topik: "Kendala ekonomi — pertimbangan cuti", tindak: "Rujuk beasiswa + konselor", status: "tindak-lanjut" },
    { tgl: "20 Jun 2026", mhs: "Bayu Pratama", topik: "Konsultasi rencana MBKM magang", tindak: "ACC daftar magang GoTo", status: "selesai" },
  ]);
  return (
    <div className="anim-in">
      <PageHead title="Riwayat Perwalian" desc="Catatan sesi perwalian & konseling mahasiswa bimbingan — terekam sebagai bukti pembinaan akademik."
        actions={<button className="btn btn-primary" onClick={() => { setSesi((l) => [{ tgl: "03 Jul 2026", mhs: "Salsabila Putri", topik: "Konsultasi rencana studi semester 5", tindak: "—", status: "terjadwal" }, ...l]); toast("Sesi perwalian dijadwalkan", "ok"); }}><Icon name="plus" size={16} /> Jadwalkan Sesi</button>} />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Tanggal</th><th>Mahasiswa</th><th>Topik</th><th>Tindak Lanjut</th><th>Status</th></tr></thead>
            <tbody>
              {sesi.map((s, i) => (
                <tr key={i}>
                  <td className="mono" style={{ fontSize: 12 }}>{s.tgl}</td>
                  <td style={{ fontWeight: 700 }}>{s.mhs}</td>
                  <td style={{ color: "var(--ink-2)", fontSize: 13, maxWidth: 260 }}>{s.topik}</td>
                  <td style={{ fontSize: 12.5 }}>{s.tindak}</td>
                  <td><Badge tone={s.status === "selesai" ? "green" : s.status === "terjadwal" ? "blue" : "amber"} dot>{s.status === "selesai" ? "Selesai" : s.status === "terjadwal" ? "Terjadwal" : "Tindak Lanjut"}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------- KAPRODI: Manajemen TA (Flow 7) ----------------
function PrdTA() {
  const toast = useToast();
  const [list, setList] = useState([
    { nim: "11210910000007", nama: "Vina Permata", judul: "Optimasi Penjadwalan dengan Algoritma Genetika", status: "usul", p1: "", p2: "" },
    { nim: "11200910000021", nama: "Galih Firmansyah", judul: "Deteksi Penyakit Daun Padi (CNN)", status: "bimbingan", p1: "Dr. Imam Marzuki", p2: "Dewi Lestari, M.Kom" },
    { nim: "11200910000034", nama: "Maya Anggraini", judul: "Rekomendasi MK Collaborative Filtering", status: "sidang", p1: "Dr. Imam Marzuki", p2: "Bambang Sutejo, M.Kom" },
  ]);
  const [assign, setAssign] = useState(null);
  const tone = { usul: ["Usulan Judul", "amber"], bimbingan: ["Bimbingan", "blue"], sidang: ["Jadwal Sidang", "purple"], lulus: ["Lulus", "green"] };
  return (
    <div className="anim-in">
      <PageHead title="Manajemen Tugas Akhir" desc="Setujui judul, tetapkan pembimbing, dan bentuk panel penguji sidang (Thesis Service)." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Mahasiswa</th><th>Judul</th><th>Pembimbing</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map((x) => (
                <tr key={x.nim}>
                  <td><div style={{ fontWeight: 700 }}>{x.nama}</div><div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{x.nim}</div></td>
                  <td style={{ maxWidth: 260, color: "var(--ink-2)" }}>{x.judul}</td>
                  <td style={{ fontSize: 12.5 }}>{x.p1 ? <>{x.p1}<br />{x.p2}</> : <span style={{ color: "var(--ink-3)" }}>Belum ditetapkan</span>}</td>
                  <td><Badge tone={tone[x.status][1]} dot>{tone[x.status][0]}</Badge></td>
                  <td>{x.status === "usul" ? <button className="btn btn-soft btn-sm" onClick={() => setAssign(x)}>Setujui & Tetapkan</button>
                    : x.status === "sidang" ? <button className="btn btn-ghost btn-sm" onClick={() => toast("Panel penguji: Dr. Rina M. (ketua), H. Wijaya, N. Aini — undangan terkirim", "ok")}>Panel Penguji</button>
                    : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {assign && (
        <Modal title={"Tetapkan Pembimbing — " + assign.nama} subtitle={assign.judul} onClose={() => setAssign(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setAssign(null)}>Batal</button>
            <button className="btn btn-primary" onClick={() => { setList((l) => l.map((x) => x.nim === assign.nim ? { ...x, status: "bimbingan", p1: "Dr. Imam Marzuki", p2: "Dewi Lestari, M.Kom" } : x)); setAssign(null); toast("Judul disetujui — SK pembimbing terbit (TTE)", "ok"); }}><Icon name="check" size={16} /> Setujui Judul</button></>}>
          <div className="field"><label>Pembimbing I (kuota bimbingan)</label><select><option>Dr. Imam Marzuki, M.Kom (4/8)</option><option>Dr. Hj. Rina Mahmudah, M.T (6/8)</option></select></div>
          <div className="field" style={{ margin: 0 }}><label>Pembimbing II</label><select><option>Dewi Lestari, M.Kom (3/6)</option><option>Bambang Sutejo, M.Kom (5/6)</option></select></div>
        </Modal>
      )}
    </div>
  );
}

// ---------------- KAPRODI: Yudisium (Flow 8) ----------------
function PrdYudisium() {
  const toast = useToast();
  const [list, setList] = useState([
    { nim: "11200910000034", nama: "Maya Anggraini", ipk: 3.82, sks: 146, ta: "A", bebas: true, status: "menunggu" },
    { nim: "11200910000021", nama: "Galih Firmansyah", ipk: 3.55, sks: 144, ta: "A-", bebas: true, status: "menunggu" },
    { nim: "11200910000052", nama: "Doni Kusuma", ipk: 3.41, sks: 145, ta: "B+", bebas: false, status: "menunggu" },
  ]);
  function tetapkan() {
    setList((l) => l.map((x) => x.bebas ? { ...x, status: "yudisium" } : x));
    toast("Rapat yudisium ditetapkan — SK terbit, data ke Graduation & Feeder", "ok");
  }
  return (
    <div className="anim-in">
      <PageHead title="Yudisium Prodi" desc="Verifikasi kelayakan (SKS, IPK, TA, bebas tanggungan) lalu tetapkan dalam rapat yudisium."
        actions={<button className="btn btn-primary" onClick={tetapkan}><Icon name="grad" size={16} /> Tetapkan Yudisium</button>} />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Mahasiswa</th><th style={{ textAlign: "center" }}>IPK</th><th style={{ textAlign: "center" }}>SKS</th><th style={{ textAlign: "center" }}>Nilai TA</th><th>Bebas Tanggungan</th><th>Status</th></tr></thead>
            <tbody>
              {list.map((x) => (
                <tr key={x.nim}>
                  <td><div style={{ fontWeight: 700 }}>{x.nama}</div><div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{x.nim}</div></td>
                  <td style={{ textAlign: "center", fontFamily: "var(--mono)", fontWeight: 800 }}>{x.ipk.toFixed(2)}</td>
                  <td style={{ textAlign: "center" }}>{x.sks}</td>
                  <td style={{ textAlign: "center" }}><Badge tone="green">{x.ta}</Badge></td>
                  <td><Badge tone={x.bebas ? "green" : "red"} dot>{x.bebas ? "Lunas semua" : "Perpustakaan belum"}</Badge></td>
                  <td><Badge tone={x.status === "yudisium" ? "green" : "amber"} dot>{x.status === "yudisium" ? "Yudisium ✓" : "Menunggu rapat"}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------- KAPRODI: Evaluasi Status Studi (Flow 6) ----------------
function PrdStatus() {
  const toast = useToast();
  const [list, setList] = useState([
    { nim: "11220910000120", nama: "Eka Permata", ipk: 1.95, sks: 42, evaluasi: "2 semester IPK < 2.00", usul: "SP-2", status: "baru" },
    { nim: "11230910000088", nama: "Rio Ananda", ipk: 1.72, sks: 18, evaluasi: "Evaluasi 2 semester pertama", usul: "SP-1", status: "baru" },
    { nim: "11190910000041", nama: "Joko Prasetyo", ipk: 2.10, sks: 96, evaluasi: "Melebihi masa studi 14 smt", usul: "DO", status: "proses" },
  ]);
  function act(nim) { setList((l) => l.map((x) => x.nim === nim ? { ...x, status: "terbit" } : x)); toast("Surat peringatan/SK terbit → mahasiswa, PA & BAA dinotifikasi", "ok"); }
  return (
    <div className="anim-in">
      <PageHead title="Evaluasi & Status Studi" desc="Deteksi mahasiswa berisiko (SP-1/SP-2/DO) berdasarkan evaluasi IPK & masa studi — sesuai peraturan akademik." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Mahasiswa</th><th style={{ textAlign: "center" }}>IPK</th><th style={{ textAlign: "center" }}>SKS</th><th>Hasil Evaluasi</th><th style={{ textAlign: "center" }}>Usulan</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map((x) => (
                <tr key={x.nim}>
                  <td><div style={{ fontWeight: 700 }}>{x.nama}</div><div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{x.nim}</div></td>
                  <td style={{ textAlign: "center", fontFamily: "var(--mono)", fontWeight: 800, color: "var(--red)" }}>{x.ipk.toFixed(2)}</td>
                  <td style={{ textAlign: "center" }}>{x.sks}</td>
                  <td style={{ color: "var(--ink-2)", fontSize: 13 }}>{x.evaluasi}</td>
                  <td style={{ textAlign: "center" }}><Badge tone={x.usul === "DO" ? "red" : "amber"} dot>{x.usul}</Badge></td>
                  <td><Badge tone={x.status === "terbit" ? "green" : x.status === "proses" ? "blue" : "gray"} dot>{x.status === "terbit" ? "SK Terbit" : x.status === "proses" ? "Rapat Prodi" : "Baru"}</Badge></td>
                  <td>{x.status !== "terbit" ? <button className="btn btn-soft btn-sm" onClick={() => act(x.nim)}>Terbitkan {x.usul}</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>✓</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export { MhsEdom, MhsBanding, MhsLayanan, MhsTA, CalonDaftar, DsnEdom, DsnBanding, DsnBKD, PAPerwalian, PrdTA, PrdYudisium, PrdStatus };
