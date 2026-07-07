import { useState } from "react";
import { Badge, Icon } from "@/components/atoms";
import { PageHead } from "@/components/molecules";
import { useToast } from "@/components/organisms";

// ============================================================
// AIS — Views: LMS / Ruang Belajar (Moodle/Classroom-style)
// Learning Delivery Service (lrn) · mahasiswa + dosen
// ============================================================

const LMS_COURSES = [
  { kode: "TIF5101", nama: "Kecerdasan Buatan", kelas: "5A", dosen: "Dr. Imam Marzuki, M.Kom", warna: "var(--blue)", bg: "var(--blue-bg)", progress: 64, tugasOpen: 1, materi: 9 },
  { kode: "TIF3105", nama: "Pemrograman Web", kelas: "3A", dosen: "Dr. Imam Marzuki, M.Kom", warna: "var(--green)", bg: "var(--green-bg)", progress: 88, tugasOpen: 0, materi: 12 },
  { kode: "TIF6102", nama: "Keamanan Informasi", kelas: "6A", dosen: "Bambang Sutejo, M.Kom", warna: "var(--purple)", bg: "var(--purple-bg)", progress: 41, tugasOpen: 2, materi: 6 },
  { kode: "TIF4202", nama: "Basis Data Lanjut", kelas: "4B", dosen: "Dr. Hj. Rina Mahmudah, M.T", warna: "var(--orange-600)", bg: "var(--orange-50)", progress: 73, tugasOpen: 1, materi: 10 },
];

const LMS_STREAM = [
  { tipe: "pengumuman", oleh: "Dr. Imam Marzuki", waktu: "2 jam lalu", isi: "Materi pertemuan 10 (Neural Networks) sudah diunggah. Silakan dipelajari sebelum kuis minggu depan.", ic: "bell" },
  { tipe: "tugas", oleh: "Dr. Imam Marzuki", waktu: "Kemarin", isi: "Tugas 4 — Implementasi Perceptron dibuka. Tenggat 28 Juni 2026, 23:59.", ic: "clipboard", due: "28 Jun" },
  { tipe: "materi", oleh: "Dr. Imam Marzuki", waktu: "3 hari lalu", isi: "Slide & rekaman pertemuan 9 (Decision Tree) tersedia di tab Materi.", ic: "play" },
];

const LMS_MATERI = [
  { judul: "Pertemuan 10 — Neural Networks", tipe: "Slide PDF", ukuran: "3.2 MB", ic: "doc", baru: true },
  { judul: "Rekaman Kuliah — Decision Tree", tipe: "Video · 48 mnt", ukuran: "Streaming", ic: "play", baru: false },
  { judul: "Pertemuan 9 — Decision Tree", tipe: "Slide PDF", ukuran: "2.8 MB", ic: "doc", baru: false },
  { judul: "Dataset Latihan (CSV)", tipe: "Lampiran", ukuran: "640 KB", ic: "file", baru: false },
  { judul: "Bahan Bacaan — Russell & Norvig Ch.18", tipe: "Tautan eksternal", ukuran: "Link", ic: "link", baru: false },
];

const LMS_TUGAS = [
  { judul: "Tugas 4 — Implementasi Perceptron", due: "28 Jun 2026", status: "open", nilai: null, terkumpul: 12, total: 32 },
  { judul: "Kuis 3 — Searching & Heuristik", due: "20 Jun 2026", status: "graded", nilai: 88, terkumpul: 32, total: 32 },
  { judul: "Tugas 3 — Algoritma A*", due: "14 Jun 2026", status: "graded", nilai: 92, terkumpul: 31, total: 32 },
  { judul: "Tugas 2 — Representasi Pengetahuan", due: "31 Mei 2026", status: "graded", nilai: 79, terkumpul: 32, total: 32 },
];

// ---------- Ruang kursus (dipakai mahasiswa & dosen) ----------
function CourseRoom({ course, role, onBack }) {
  const toast = useToast();
  const [tab, setTab] = useState("stream");
  const teacher = role === "dosen";
  const tabs = [["stream", "Forum Kelas"], ["materi", "Materi"], ["tugas", teacher ? "Tugas & Kuis" : "Tugas Saya"], ["nilai", "Nilai"]];

  return (
    <div className="anim-in">
      <button className="btn btn-ghost btn-sm" onClick={onBack} style={{ marginBottom: 14 }}><Icon name="chevL" size={15} /> Semua Kelas</button>

      {/* Banner */}
      <div className="card" style={{ overflow: "hidden", marginBottom: 18, border: "none" }}>
        <div style={{ background: `linear-gradient(115deg, ${course.warna}, ${course.warna} 55%, color-mix(in srgb, ${course.warna} 60%, #000))`, padding: "30px 30px 26px", color: "#fff", position: "relative" }}>
          <div style={{ position: "absolute", right: -30, top: -30, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,.12)" }} />
          <div className="mono" style={{ fontSize: 12, fontWeight: 700, opacity: .85 }}>{course.kode} · Kelas {course.kelas}</div>
          <h1 style={{ margin: "6px 0 10px", fontSize: 27, fontWeight: 800, letterSpacing: "-.02em" }}>{course.nama}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13.5, opacity: .9 }}><Icon name="user" size={15} /> {course.dosen}</div>
        </div>
      </div>

      <div className="seg" style={{ marginBottom: 18 }}>{tabs.map(([k, l]) => <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{l}</button>)}</div>

      {tab === "stream" && (
        <div className="grid" style={{ gridTemplateColumns: "1fr", maxWidth: 760 }}>
          {teacher && (
            <div className="card card-pad" style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div className="sb-ava" style={{ width: 38, height: 38, background: course.bg, color: course.warna }}>DI</div>
              <input placeholder="Umumkan sesuatu ke kelas…" style={{ flex: 1, padding: "11px 14px", borderRadius: 11, border: "1px solid var(--line-2)", fontFamily: "var(--sans)", fontSize: 14 }} />
              <button className="btn btn-primary btn-sm" onClick={() => toast("Pengumuman diposting ke kelas")}>Posting</button>
            </div>
          )}
          {LMS_STREAM.map((s, i) => (
            <div key={i} className="card card-pad" style={{ display: "flex", gap: 13 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: course.bg, color: course.warna, display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name={s.ic} size={20} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <b style={{ fontSize: 13.5 }}>{s.oleh}</b><span style={{ fontSize: 12, color: "var(--ink-3)" }}>· {s.waktu}</span>
                  {s.due && <Badge tone="amber" dot>Tenggat {s.due}</Badge>}
                </div>
                <div style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.55 }}>{s.isi}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "materi" && (
        <div className="card">
          <div className="card-head"><Icon name="bookOpen" size={19} style={{ color: course.warna }} /><h3>Materi Pembelajaran</h3><span className="sub">· {course.materi} item</span>
            {teacher && <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => toast("Unggah materi baru")}><Icon name="upload" size={14} /> Unggah</button>}</div>
          <div style={{ padding: "6px 0" }}>
            {LMS_MATERI.map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 24px", borderBottom: i < LMS_MATERI.length - 1 ? "1px solid var(--line)" : "none" }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: "var(--surface-2)", color: course.warna, display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name={m.ic} size={19} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5, display: "flex", alignItems: "center", gap: 8 }}>{m.judul} {m.baru && <Badge tone="green">Baru</Badge>}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{m.tipe} · {m.ukuran}</div>
                </div>
                <button className="btn btn-ghost btn-sm"><Icon name={m.ic === "play" ? "play" : "download"} size={14} /> {m.ic === "play" ? "Putar" : "Buka"}</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "tugas" && (
        <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
          {teacher && <div className="card card-pad" style={{ display: "flex", alignItems: "center", gap: 12 }}><Icon name="clipboard" size={18} style={{ color: course.warna }} /><span style={{ fontWeight: 700, fontSize: 14 }}>Kelola tugas & kuis kelas</span><button className="btn btn-primary btn-sm" style={{ marginLeft: "auto" }} onClick={() => toast("Buat tugas / kuis baru")}><Icon name="plus" size={14} /> Buat Tugas</button></div>}
          {LMS_TUGAS.map((t, i) => (
            <div key={i} className="card card-pad" style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: course.bg, color: course.warna, display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="clipboard" size={21} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{t.judul}</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>Tenggat {t.due}{teacher ? ` · ${t.terkumpul}/${t.total} terkumpul` : ""}</div>
              </div>
              {teacher ? (
                <>
                  {t.status === "open" ? <Badge tone="amber" dot>Berlangsung</Badge> : <Badge tone="green" dot>Dinilai</Badge>}
                  <button className="btn btn-ghost btn-sm" onClick={() => toast("Buka pengumpulan & penilaian")}>Periksa</button>
                </>
              ) : (
                t.status === "graded"
                  ? <Badge tone={(t.nilai ?? 0) >= 80 ? "green" : (t.nilai ?? 0) >= 60 ? "amber" : "red"}>Nilai {t.nilai}</Badge>
                  : <button className="btn btn-primary btn-sm" onClick={() => toast("Buka halaman pengumpulan")}><Icon name="upload" size={14} /> Kumpulkan</button>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "nilai" && (
        <div className="card">
          <div className="card-head"><Icon name="award" size={19} style={{ color: course.warna }} /><h3>{teacher ? "Buku Nilai Kelas" : "Nilai Saya"}</h3></div>
          <div style={{ overflowX: "auto" }}>
            <table className="tbl">
              <thead><tr><th>Komponen</th><th style={{ textAlign: "center" }}>Bobot</th><th style={{ textAlign: "center" }}>{teacher ? "Rata-rata Kelas" : "Nilai Anda"}</th></tr></thead>
              <tbody>
                {[["Tugas & Kuis", "30%", teacher ? 84 : 86], ["Partisipasi Forum", "10%", teacher ? 90 : 95], ["UTS", "30%", teacher ? 76 : 82], ["UAS", "30%", teacher ? "—" : "—"]].map(([k, b, v], i) => (
                  <tr key={i}><td style={{ fontWeight: 600 }}>{k}</td><td style={{ textAlign: "center" }}>{b}</td><td style={{ textAlign: "center", fontWeight: 800, fontFamily: "var(--mono)" }}>{v}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function LMSGrid({ role }) {
  const [open, setOpen] = useState<(typeof LMS_COURSES)[number] | null>(null);
  const teacher = role === "dosen";
  if (open) return <CourseRoom course={open} role={role} onBack={() => setOpen(null)} />;
  return (
    <div className="anim-in">
      <PageHead title={teacher ? "Ruang Kelas (LMS)" : "Ruang Belajar"} desc={teacher ? "Kelola materi, tugas, kuis, dan forum tiap kelas yang Anda ampu." : "Kelas daring Anda semester ini — materi, tugas, kuis, dan forum diskusi."} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: 16 }}>
        {LMS_COURSES.map((c) => (
          <button key={c.kode} className="card" onClick={() => setOpen(c)} style={{ textAlign: "left", cursor: "pointer", padding: 0, overflow: "hidden", fontFamily: "var(--sans)", border: "1px solid var(--line)" }}>
            <div style={{ height: 76, background: `linear-gradient(115deg, ${c.warna}, color-mix(in srgb, ${c.warna} 65%, #000))`, padding: "16px 18px", color: "#fff", position: "relative" }}>
              <div className="mono" style={{ fontSize: 11, fontWeight: 700, opacity: .85 }}>{c.kode} · {c.kelas}</div>
              <div style={{ fontSize: 16, fontWeight: 800, marginTop: 3, letterSpacing: "-.01em" }}>{c.nama}</div>
            </div>
            <div style={{ padding: "14px 18px" }}>
              <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginBottom: 12 }}>{teacher ? `${c.materi} materi diunggah` : c.dosen}</div>
              {!teacher && <><div className="prog" style={{ marginBottom: 6 }}><i style={{ width: c.progress + "%", background: c.warna }} /></div>
                <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>Progres {c.progress}%</div></>}
              <div style={{ display: "flex", gap: 7, marginTop: 12 }}>
                {c.tugasOpen > 0 && <Badge tone="amber" dot>{c.tugasOpen} tugas aktif</Badge>}
                <Badge tone="gray"><Icon name="bookOpen" size={12} /> {c.materi} materi</Badge>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function LMSMahasiswa() { return <LMSGrid role="mahasiswa" />; }
function LMSDosen() { return <LMSGrid role="dosen" />; }

export { LMSMahasiswa, LMSDosen, CourseRoom };
