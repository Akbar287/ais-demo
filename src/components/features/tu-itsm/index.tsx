import { useState } from "react";
import { Badge, Icon } from "@/components/atoms";
import { Modal, PageHead } from "@/components/molecules";
import { StaffHero, useToast } from "@/components/organisms";
import { AIS_ROLES } from "@/data/roles";
import { formatNumber } from "@/lib/format";

// ============================================================
// AIS — Views: Persuratan & Arsip (TU) + Layanan TI (ITSM)
// Service: tu (Correspondence & Archive), itsm (IT Service Management)
// ============================================================

// ---------------- Persuratan (TU) ----------------
const TU_MASUK = [
  { no: "0451/Un.01/VI/2026", dari: "Kemdikbudristek", perihal: "Undangan Sosialisasi MBKM 2026", tgl: "23 Jun 2026", sifat: "Penting", status: "baru" },
  { no: "112/LLDIKTI4/2026", dari: "LLDIKTI Wilayah IV", perihal: "Pelaporan PDDikti Semester Genap", tgl: "22 Jun 2026", sifat: "Segera", status: "baru" },
  { no: "089/PT-GoTo/2026", dari: "PT GoTo", perihal: "Perpanjangan MoU Magang", tgl: "21 Jun 2026", sifat: "Biasa", status: "disposisi" },
  { no: "234/BANK-BSI/2026", dari: "Bank BSI", perihal: "Rekonsiliasi Virtual Account", tgl: "20 Jun 2026", sifat: "Biasa", status: "selesai" },
  { no: "077/ALUMNI/2026", dari: "Ikatan Alumni", perihal: "Proposal Temu Alumni Akbar", tgl: "19 Jun 2026", sifat: "Biasa", status: "disposisi" },
];
const SIFAT_TONE = { Penting: "amber", Segera: "red", Biasa: "gray", Rahasia: "purple" };
const SURAT_TONE = { baru: ["Baru", "blue"], disposisi: ["Didisposisi", "amber"], selesai: ["Selesai", "green"] };

const TU_KELUAR = [
  { no: "501/Un.01/VI/2026", kepada: "LLDIKTI Wilayah IV", perihal: "Laporan PDDikti Semester Genap", tgl: "23 Jun 2026", status: "Terkirim" },
  { no: "502/Un.01/VI/2026", kepada: "Seluruh Dekan", perihal: "Edaran Batas Input Nilai", tgl: "22 Jun 2026", status: "Terkirim" },
  { no: "503/Un.01/VI/2026", kepada: "PT GoTo", perihal: "Balasan Perpanjangan MoU", tgl: "22 Jun 2026", status: "Draf" },
];

const TU_DISPOSISI = [
  { surat: "Undangan Sosialisasi MBKM 2026", kepada: "Koordinator MBKM", instruksi: "Hadiri & siapkan laporan", tenggat: "26 Jun", status: "menunggu" },
  { surat: "Pelaporan PDDikti Semester Genap", kepada: "Kabag Akademik (BAA)", instruksi: "Proses segera, koordinasi TIK", tenggat: "25 Jun", status: "menunggu" },
  { surat: "Proposal Temu Alumni Akbar", kepada: "Kabag Kemahasiswaan", instruksi: "Telaah & beri pertimbangan", tenggat: "28 Jun", status: "dibaca" },
];

const TU_ARSIP = [
  { kode: "AR-2026-0231", judul: "SK Rektor — Kalender Akademik 2026/2027", klasifikasi: "SK", tahun: 2026 },
  { kode: "AR-2026-0198", judul: "MoU Kerjasama BRIN", klasifikasi: "MoU", tahun: 2026 },
  { kode: "AR-2025-1442", judul: "Notulen Rapat Senat — Kurikulum", klasifikasi: "Notulen", tahun: 2025 },
  { kode: "AR-2025-1100", judul: "Laporan Tahunan Rektor 2025", klasifikasi: "Laporan", tahun: 2025 },
];

function TuDashboard({ nav }) {
  const R = AIS_ROLES; const p = R.personas.tu;
  const baru = TU_MASUK.filter((x) => x.status === "baru").length;
  const tiles = [
    { label: "Surat Masuk Baru", value: baru, meta: "belum diproses", ic: "mail", c: "var(--purple)", bg: "var(--purple-bg)" },
    { label: "Surat Keluar", value: TU_KELUAR.length, meta: TU_KELUAR.filter((x) => x.status === "Draf").length + " draf", ic: "upload", c: "var(--blue)", bg: "var(--blue-bg)" },
    { label: "Disposisi Menunggu", value: TU_DISPOSISI.filter((x) => x.status === "menunggu").length, meta: "perlu tindak lanjut", ic: "check", c: "var(--amber)", bg: "var(--amber-bg)" },
    { label: "Arsip Digital", value: "2.840", meta: "dokumen tersimpan", ic: "box", c: "var(--green)", bg: "var(--green-bg)", small: true },
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="tu" sub="Kelola surat masuk & keluar, disposisi pimpinan, dan arsip digital."
        action={<button className="btn btn-primary" onClick={() => nav("tu_masuk")}><Icon name="mail" size={17} /> Surat Masuk</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 22 }}>
        {tiles.map((t) => (
          <div key={t.label} className="stat card" style={{ background: t.bg, border: "none" }}>
            <Icon name={t.ic} size={26} className="si" style={{ color: t.c }} />
            <div className="label" style={{ color: t.c }}>{t.label}</div>
            <div className="value" style={{ color: t.c, fontSize: t.small ? 26 : 32 }}>{t.value}</div>
            <div className="meta" style={{ color: t.c }}>{t.meta}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-head"><Icon name="mail" size={19} style={{ color: "var(--purple)" }} /><h3>Surat Masuk Terbaru</h3>
          <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("tu_masuk")}>Semua</button></div>
        <div>
          {TU_MASUK.slice(0, 4).map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 22px", borderBottom: i < 3 ? "1px solid var(--line)" : "none" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 13.5 }}>{s.perihal}</div>
                <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{s.dari} · {s.tgl} · <span className="mono">{s.no}</span></div>
              </div>
              <Badge tone={SIFAT_TONE[s.sifat]} dot={s.sifat === "Segera"}>{s.sifat}</Badge>
              <Badge tone={SURAT_TONE[s.status][1]}>{SURAT_TONE[s.status][0]}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TuMasuk() {
  const toast = useToast();
  const [list, setList] = useState(TU_MASUK.map((x) => ({ ...x })));
  const [detail, setDetail] = useState<(typeof TU_MASUK)[number] | null>(null);
  function disposisikan(no) { setList((l) => l.map((x) => x.no === no ? { ...x, status: "disposisi" } : x)); setDetail(null); toast("Surat diteruskan untuk disposisi", "ok"); }
  return (
    <div className="anim-in">
      <PageHead title="Surat Masuk" desc="Agenda surat masuk. Catat, klasifikasikan, dan teruskan ke pimpinan untuk disposisi." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>No. Surat</th><th>Pengirim</th><th>Perihal</th><th>Tanggal</th><th>Sifat</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map((s) => (
                <tr key={s.no}>
                  <td className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{s.no}</td>
                  <td style={{ fontWeight: 600 }}>{s.dari}</td>
                  <td style={{ fontWeight: 700, maxWidth: 260 }}>{s.perihal}</td>
                  <td style={{ fontSize: 13 }}>{s.tgl}</td>
                  <td><Badge tone={SIFAT_TONE[s.sifat]} dot={s.sifat === "Segera"}>{s.sifat}</Badge></td>
                  <td><Badge tone={SURAT_TONE[s.status][1]} dot>{SURAT_TONE[s.status][0]}</Badge></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => setDetail(s)}>Buka</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {detail && (
        <Modal title={detail.perihal} subtitle={"No. " + detail.no} onClose={() => setDetail(null)}
          footer={detail.status === "baru" ? <>
            <button className="btn btn-ghost" onClick={() => setDetail(null)}>Tutup</button>
            <button className="btn btn-primary" onClick={() => disposisikan(detail.no)}><Icon name="check" size={16} /> Teruskan Disposisi</button>
          </> : <button className="btn btn-ghost" onClick={() => setDetail(null)}>Tutup</button>}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            {[["Pengirim", detail.dari], ["Tanggal", detail.tgl], ["Sifat", detail.sifat], ["Status", SURAT_TONE[detail.status][0]]].map(([l, v]) => (
              <div key={l} style={{ padding: 12, background: "var(--surface-2)", borderRadius: 11 }}><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{l}</div><div style={{ fontWeight: 700, fontSize: 13.5, marginTop: 3 }}>{v}</div></div>
            ))}
          </div>
          <div style={{ padding: 14, background: "var(--surface-2)", borderRadius: 12, display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="doc" size={18} style={{ color: "var(--purple)" }} /><span style={{ fontSize: 13, fontWeight: 600 }}>Lampiran: {detail.no.replace(/\//g, "-")}.pdf</span>
            <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto" }}><Icon name="download" size={14} /> Unduh</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function TuKeluar() {
  const toast = useToast();
  return (
    <div className="anim-in">
      <PageHead title="Surat Keluar" desc="Surat keluar dengan penomoran otomatis dari Correspondence Service & e-signature."
        actions={<button className="btn btn-primary" onClick={() => toast("Editor surat keluar dibuka")}><Icon name="plus" size={16} /> Buat Surat</button>} />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>No. Surat</th><th>Tujuan</th><th>Perihal</th><th>Tanggal</th><th>Status</th></tr></thead>
            <tbody>
              {TU_KELUAR.map((s) => (
                <tr key={s.no}>
                  <td className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{s.no}</td>
                  <td style={{ fontWeight: 600 }}>{s.kepada}</td>
                  <td style={{ fontWeight: 700, maxWidth: 280 }}>{s.perihal}</td>
                  <td style={{ fontSize: 13 }}>{s.tgl}</td>
                  <td><Badge tone={s.status === "Terkirim" ? "green" : "amber"} dot>{s.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TuDisposisi() {
  const toast = useToast();
  const [list, setList] = useState(TU_DISPOSISI.map((x) => ({ ...x })));
  function tindak(idx) { setList((l) => l.map((x, i) => i === idx ? { ...x, status: "selesai" } : x)); toast("Disposisi ditandai selesai", "ok"); }
  const tone = { menunggu: ["Menunggu", "amber"], dibaca: ["Dibaca", "blue"], selesai: ["Selesai", "green"] };
  return (
    <div className="anim-in">
      <PageHead title="Disposisi" desc="Instruksi pimpinan atas surat masuk dan pemantauan tindak lanjutnya." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Surat</th><th>Kepada</th><th>Instruksi</th><th>Tenggat</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map((d, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700, maxWidth: 240 }}>{d.surat}</td>
                  <td style={{ color: "var(--ink-2)" }}>{d.kepada}</td>
                  <td style={{ color: "var(--ink-2)", fontSize: 13 }}>{d.instruksi}</td>
                  <td style={{ fontSize: 13 }}>{d.tenggat}</td>
                  <td><Badge tone={tone[d.status][1]} dot>{tone[d.status][0]}</Badge></td>
                  <td>{d.status !== "selesai" ? <button className="btn btn-soft btn-sm" onClick={() => tindak(i)}>Selesai</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>✓</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TuArsip() {
  const [q, setQ] = useState("");
  const list = TU_ARSIP.filter((a) => a.judul.toLowerCase().includes(q.toLowerCase()) || a.kode.toLowerCase().includes(q.toLowerCase()));
  const tone = { SK: "purple", MoU: "blue", Notulen: "amber", Laporan: "green" };
  return (
    <div className="anim-in">
      <PageHead title="Arsip Digital" desc="Repositori dokumen resmi terklasifikasi sesuai jadwal retensi arsip." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <div className="tb-search" style={{ margin: 0, width: 320 }}><Icon name="search" size={16} /><input placeholder="Cari arsip / kode…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--ink-3)" }}>{list.length} dari 2.840 arsip</span>
      </div>
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Kode Arsip</th><th>Judul Dokumen</th><th>Klasifikasi</th><th style={{ textAlign: "center" }}>Tahun</th><th></th></tr></thead>
            <tbody>
              {list.map((a) => (
                <tr key={a.kode}>
                  <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{a.kode}</td>
                  <td style={{ fontWeight: 700 }}>{a.judul}</td>
                  <td><Badge tone={tone[a.klasifikasi] || "gray"}>{a.klasifikasi}</Badge></td>
                  <td style={{ textAlign: "center" }}>{a.tahun}</td>
                  <td><button className="btn btn-ghost btn-sm"><Icon name="download" size={14} /> Unduh</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------- ITSM ----------------
const ITSM_TIKET = [
  { no: "INC-2641", judul: "Tidak bisa login SSO", pelapor: "Dewi Lestari, M.Kom", kategori: "Akses/IAM", prioritas: "tinggi", sla: "2 jam", status: "baru", sisa: 78 },
  { no: "INC-2640", judul: "Email kampus penuh (quota)", pelapor: "Bambang Sutejo", kategori: "Email", prioritas: "sedang", sla: "8 jam", status: "proses", sisa: 45 },
  { no: "REQ-2639", judul: "Permintaan akses VPN", pelapor: "Hendra Wijaya, M.T", kategori: "Jaringan", prioritas: "rendah", sla: "1 hari", status: "proses", sisa: 88 },
  { no: "INC-2638", judul: "Proyektor lab tidak menyala", pelapor: "Laboran TI", kategori: "Perangkat", prioritas: "sedang", sla: "8 jam", status: "baru", sisa: 30 },
  { no: "INC-2635", judul: "Wi-Fi lambat di Gedung FST", pelapor: "BEM Fakultas", kategori: "Jaringan", prioritas: "tinggi", sla: "2 jam", status: "selesai", sisa: 100 },
  { no: "REQ-2634", judul: "Instalasi software statistik", pelapor: "Dr. Rina M.", kategori: "Software", prioritas: "rendah", sla: "2 hari", status: "selesai", sisa: 100 },
];
const PRIO_TONE = { tinggi: "red", sedang: "amber", rendah: "gray" };
const TIKET_TONE = { baru: ["Baru", "blue"], proses: ["Dikerjakan", "amber"], selesai: ["Selesai", "green"] };

const ITSM_KB = [
  { judul: "Cara reset kata sandi SSO mandiri", kategori: "Akses/IAM", dibaca: 1240 },
  { judul: "Menghubungkan VPN kampus (Windows/Mac)", kategori: "Jaringan", dibaca: 880 },
  { judul: "Mengosongkan kuota email kampus", kategori: "Email", dibaca: 642 },
  { judul: "Panduan unggah nilai di portal dosen", kategori: "Aplikasi", dibaca: 1530 },
];

function ItsmDashboard({ nav }) {
  const R = AIS_ROLES; const p = R.personas.itsm;
  const open = ITSM_TIKET.filter((t) => t.status !== "selesai");
  const breach = open.filter((t) => t.sisa < 40).length;
  const tiles = [
    { label: "Tiket Terbuka", value: open.length, meta: ITSM_TIKET.filter((t) => t.status === "baru").length + " baru", ic: "ticket", c: "var(--red)", bg: "var(--red-bg)" },
    { label: "Berisiko Lewat SLA", value: breach, meta: "sisa waktu < 40%", ic: "clock", c: "var(--amber)", bg: "var(--amber-bg)" },
    { label: "Selesai (7 hari)", value: 42, meta: "rata-rata 4,2 jam", ic: "check", c: "var(--green)", bg: "var(--green-bg)" },
    { label: "Kepuasan (CSAT)", value: "94%", meta: "dari 180 respons", ic: "award", c: "var(--blue)", bg: "var(--blue-bg)" },
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="itsm" sub="Tangani tiket layanan TI sesuai SLA, kelola eskalasi, dan basis pengetahuan."
        action={<button className="btn btn-primary" onClick={() => nav("itsm_tiket")}><Icon name="ticket" size={17} /> Antrian Tiket</button>} />
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
      <div className="card">
        <div className="card-head"><Icon name="ticket" size={19} style={{ color: "var(--red)" }} /><h3>Tiket Prioritas</h3>
          <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("itsm_tiket")}>Semua</button></div>
        <div>
          {open.sort((a, b) => a.sisa - b.sisa).slice(0, 4).map((t, i, arr) => (
            <div key={t.no} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 22px", borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none" }}>
              <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)", width: 64 }}>{t.no}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 13.5 }}>{t.judul}</div>
                <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{t.pelapor} · {t.kategori}</div>
              </div>
              <Badge tone={PRIO_TONE[t.prioritas]} dot={t.prioritas === "tinggi"}>{t.prioritas}</Badge>
              <div style={{ width: 70 }}><div className="prog" style={{ height: 6 }}><i style={{ width: t.sisa + "%", background: t.sisa < 40 ? "var(--red)" : "var(--green)" }} /></div><div style={{ fontSize: 10, color: "var(--ink-3)", marginTop: 3, textAlign: "right" }}>SLA {t.sla}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ItsmTiket() {
  const toast = useToast();
  const [list, setList] = useState(ITSM_TIKET.map((x) => ({ ...x })));
  const [f, setF] = useState("semua");
  function advance(no) { setList((l) => l.map((t) => t.no === no ? { ...t, status: t.status === "baru" ? "proses" : "selesai", sisa: t.status === "proses" ? 100 : t.sisa } : t)); toast("Status tiket diperbarui", "ok"); }
  const shown = list.filter((t) => f === "semua" || t.status === f);
  return (
    <div className="anim-in">
      <PageHead title="Tiket Layanan" desc="Antrian insiden (INC) & permintaan layanan (REQ) dengan pelacakan SLA." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <div className="seg">{[["semua", "Semua"], ["baru", "Baru"], ["proses", "Dikerjakan"], ["selesai", "Selesai"]].map(([k, l]) => <button key={k} className={f === k ? "on" : ""} onClick={() => setF(k)}>{l}</button>)}</div>
        <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--ink-3)" }}>{shown.length} tiket</span>
      </div>
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>No.</th><th>Judul</th><th>Pelapor</th><th>Kategori</th><th>Prioritas</th><th style={{ width: 130 }}>SLA</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {shown.map((t) => (
                <tr key={t.no}>
                  <td className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{t.no}</td>
                  <td style={{ fontWeight: 700, maxWidth: 220 }}>{t.judul}</td>
                  <td style={{ color: "var(--ink-2)", fontSize: 13 }}>{t.pelapor}</td>
                  <td><Badge tone="gray">{t.kategori}</Badge></td>
                  <td><Badge tone={PRIO_TONE[t.prioritas]} dot={t.prioritas === "tinggi"}>{t.prioritas}</Badge></td>
                  <td>{t.status === "selesai" ? <Badge tone="green">Terpenuhi</Badge> : <div><div className="prog" style={{ height: 6 }}><i style={{ width: t.sisa + "%", background: t.sisa < 40 ? "var(--red)" : "var(--green)" }} /></div><div style={{ fontSize: 10, color: "var(--ink-3)", marginTop: 3 }}>{t.sla}</div></div>}</td>
                  <td><Badge tone={TIKET_TONE[t.status][1]} dot>{TIKET_TONE[t.status][0]}</Badge></td>
                  <td>{t.status !== "selesai" ? <button className="btn btn-soft btn-sm" onClick={() => advance(t.no)}>{t.status === "baru" ? "Ambil" : "Selesaikan"}</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>✓</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ItsmSLA() {
  const cats: Array<[string, number, number]> = [["Akses/IAM", 96, 38], ["Jaringan", 88, 52], ["Email", 92, 24], ["Perangkat", 81, 31], ["Software", 95, 19], ["Aplikasi", 90, 44]];
  return (
    <div className="anim-in">
      <PageHead title="SLA & Kinerja" desc="Kepatuhan SLA dan volume tiket per kategori layanan (30 hari terakhir)." />
      <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)", marginBottom: 20 }}>
        {[["Kepatuhan SLA", "91%", "green"], ["Waktu Tangani Rata-rata", "4,2 jam", "blue"], ["Tiket / Bulan", "208", "purple"]].map(([l, v, t]) => (
          <div key={l} className="stat card" style={{ background: `var(--${t}-bg)`, border: "none" }}><div className="label" style={{ color: `var(--${t})` }}>{l}</div><div className="value" style={{ color: `var(--${t})`, fontSize: 26 }}>{v}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-head"><Icon name="activity" size={19} style={{ color: "var(--blue)" }} /><h3>Kepatuhan SLA per Kategori</h3></div>
        <div className="card-pad" style={{ display: "grid", gap: 16 }}>
          {cats.map(([nama, sla, vol]) => (
            <div key={nama}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13.5 }}>
                <span style={{ fontWeight: 600 }}>{nama} <span style={{ color: "var(--ink-3)", fontWeight: 500 }}>· {vol} tiket</span></span>
                <b className="mono" style={{ color: sla >= 90 ? "var(--green)" : "var(--amber)" }}>{sla}%</b>
              </div>
              <div className="prog" style={{ height: 12 }}><i style={{ width: sla + "%", background: sla >= 90 ? "var(--green)" : "var(--amber)" }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ItsmKB() {
  const [q, setQ] = useState("");
  const list = ITSM_KB.filter((a) => a.judul.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="anim-in">
      <PageHead title="Basis Pengetahuan" desc="Artikel solusi mandiri (self-service) untuk mengurangi volume tiket." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <div className="tb-search" style={{ margin: 0, width: 340 }}><Icon name="search" size={16} /><input placeholder="Cari artikel solusi…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--ink-3)" }}>{list.length} artikel</span>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
        {list.map((a, i) => (
          <div key={i} className="card card-pad" style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: "var(--blue-bg)", color: "var(--blue)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="bookOpen" size={20} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{a.judul}</div>
              <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{a.kategori} · {formatNumber(a.dibaca)} kali dibaca</div>
            </div>
            <Icon name="chevR" size={16} style={{ color: "var(--ink-3)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export {
  TuDashboard, TuMasuk, TuKeluar, TuDisposisi, TuArsip,
  ItsmDashboard, ItsmTiket, ItsmSLA, ItsmKB,
};
