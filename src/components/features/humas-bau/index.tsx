import { useState } from "react";
import { Badge, Icon } from "@/components/atoms";
import { PageHead } from "@/components/molecules";
import { StaffHero, useToast } from "@/components/organisms";
import { AIS_ROLES } from "@/data/roles";
import { formatNumber } from "@/lib/format";

// ============================================================
// AIS — Views: HUMAS & Layanan Informasi (26) + BAU (28)
// Service: hms (Public Relations), bau (General Affairs)
// ============================================================

// ---------------- HUMAS ----------------
const BERITA = [
  { judul: "Universitas Raih Akreditasi Unggul dari BAN-PT", kategori: "Prestasi", tgl: "22 Jun 2026", dibaca: 3420, status: "Terbit" },
  { judul: "Pendaftaran Wisuda Periode II Dibuka", kategori: "Pengumuman", tgl: "20 Jun 2026", dibaca: 1880, status: "Terbit" },
  { judul: "Mahasiswa TI Juara Hackathon Nasional", kategori: "Prestasi", tgl: "18 Jun 2026", dibaca: 2640, status: "Terbit" },
  { judul: "Kuliah Umum Bersama Praktisi Industri AI", kategori: "Kegiatan", tgl: "25 Jun 2026", dibaca: 0, status: "Draf" },
];
const PPID = [
  { perkara: "Permohonan data jumlah mahasiswa aktif", pemohon: "Wartawan Media X", tgl: "21 Jun 2026", sifat: "Berkala", status: "selesai" },
  { perkara: "Salinan laporan keuangan (ringkasan publik)", pemohon: "LSM Transparansi", tgl: "20 Jun 2026", sifat: "Setiap saat", status: "proses" },
  { perkara: "Data serapan lulusan 2024", pemohon: "Mahasiswa Peneliti", tgl: "19 Jun 2026", sifat: "Berkala", status: "proses" },
];
const PENGADUAN = [
  { kode: "ADU-0231", topik: "AC ruang kuliah FST-301 rusak", pelapor: "Mahasiswa", kategori: "Sarana", prioritas: "sedang", status: "diteruskan" },
  { kode: "ADU-0230", topik: "Antrean layanan akademik terlalu lama", pelapor: "Mahasiswa", kategori: "Layanan", prioritas: "rendah", status: "baru" },
  { kode: "ADU-0229", topik: "Parkir motor penuh jam sibuk", pelapor: "Umum", kategori: "Fasilitas", prioritas: "rendah", status: "selesai" },
  { kode: "ADU-0228", topik: "Website lambat saat KRS", pelapor: "Mahasiswa", kategori: "TI", prioritas: "tinggi", status: "diteruskan" },
];
const ADU_TONE = { baru: ["Baru", "blue"], diteruskan: ["Diteruskan", "amber"], selesai: ["Selesai", "green"] };

function HumasDashboard({ nav }) {
  const R = AIS_ROLES; const p = R.personas.humas;
  const tiles = [
    { label: "Berita Terbit", value: BERITA.filter((b) => b.status === "Terbit").length, meta: "bulan ini", ic: "megaphone", c: "var(--blue)", bg: "var(--blue-bg)" },
    { label: "Permohonan PPID", value: PPID.length, meta: PPID.filter((x) => x.status === "proses").length + " diproses", ic: "doc", c: "var(--purple)", bg: "var(--purple-bg)" },
    { label: "Pengaduan Masuk", value: PENGADUAN.length, meta: PENGADUAN.filter((x) => x.status !== "selesai").length + " aktif", ic: "bell", c: "var(--amber)", bg: "var(--amber-bg)" },
    { label: "Total Pembaca", value: "7,9 rb", meta: "artikel publik", ic: "users", c: "var(--green)", bg: "var(--green-bg)" },
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="humas" sub="Kelola berita & informasi publik, layanan PPID, serta pengaduan dan aspirasi."
        action={<button className="btn btn-primary" onClick={() => nav("hms_pengaduan")}><Icon name="bell" size={17} /> Pengaduan</button>} />
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
        <div className="card-head"><Icon name="megaphone" size={19} style={{ color: "var(--blue)" }} /><h3>Berita Terbaru</h3>
          <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("hms_berita")}>Kelola</button></div>
        <div>
          {BERITA.slice(0, 4).map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 22px", borderBottom: i < 3 ? "1px solid var(--line)" : "none" }}>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 700, fontSize: 13.5 }}>{b.judul}</div><div style={{ fontSize: 12, color: "var(--ink-3)" }}>{b.kategori} · {b.tgl} · {formatNumber(b.dibaca)} dibaca</div></div>
              <Badge tone={b.status === "Terbit" ? "green" : "amber"} dot>{b.status}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HumasBerita() {
  const toast = useToast();
  const tone = { Prestasi: "green", Pengumuman: "blue", Kegiatan: "purple" };
  return (
    <div className="anim-in">
      <PageHead title="Berita & Informasi Publik" desc="Kelola konten berita situs resmi kampus."
        actions={<button className="btn btn-primary" onClick={() => toast("Editor berita dibuka")}><Icon name="plus" size={16} /> Tulis Berita</button>} />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Judul</th><th>Kategori</th><th>Tanggal</th><th style={{ textAlign: "center" }}>Dibaca</th><th>Status</th></tr></thead>
            <tbody>
              {BERITA.map((b, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700, maxWidth: 320 }}>{b.judul}</td>
                  <td><Badge tone={tone[b.kategori] || "gray"}>{b.kategori}</Badge></td>
                  <td style={{ fontSize: 13 }}>{b.tgl}</td>
                  <td style={{ textAlign: "center", fontFamily: "var(--mono)" }}>{formatNumber(b.dibaca)}</td>
                  <td><Badge tone={b.status === "Terbit" ? "green" : "amber"} dot>{b.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function HumasPPID() {
  const tone = { selesai: ["Selesai", "green"], proses: ["Diproses", "amber"], ditolak: ["Ditolak", "red"] };
  return (
    <div className="anim-in">
      <PageHead title="Layanan Informasi (PPID)" desc="Permohonan informasi publik sesuai UU Keterbukaan Informasi Publik." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Perkara</th><th>Pemohon</th><th>Tanggal</th><th>Klasifikasi</th><th>Status</th></tr></thead>
            <tbody>
              {PPID.map((x, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700, maxWidth: 300 }}>{x.perkara}</td>
                  <td style={{ color: "var(--ink-2)" }}>{x.pemohon}</td>
                  <td style={{ fontSize: 13 }}>{x.tgl}</td>
                  <td><Badge tone="gray">{x.sifat}</Badge></td>
                  <td><Badge tone={tone[x.status][1]} dot>{tone[x.status][0]}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function HumasPengaduan() {
  const toast = useToast();
  const [list, setList] = useState(PENGADUAN.map((x) => ({ ...x })));
  const prio = { tinggi: "red", sedang: "amber", rendah: "gray" };
  function advance(kode) { setList((l) => l.map((x) => x.kode === kode ? { ...x, status: x.status === "baru" ? "diteruskan" : "selesai" } : x)); toast("Status pengaduan diperbarui", "ok"); }
  return (
    <div className="anim-in">
      <PageHead title="Pengaduan & Aspirasi" desc="Kanal pengaduan masyarakat & sivitas. Pengaduan diteruskan ke unit terkait (Workflow)." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Kode</th><th>Topik</th><th>Pelapor</th><th>Kategori</th><th>Prioritas</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map((x) => (
                <tr key={x.kode}>
                  <td className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{x.kode}</td>
                  <td style={{ fontWeight: 700, maxWidth: 240 }}>{x.topik}</td>
                  <td style={{ color: "var(--ink-2)", fontSize: 13 }}>{x.pelapor}</td>
                  <td><Badge tone="gray">{x.kategori}</Badge></td>
                  <td><Badge tone={prio[x.prioritas]} dot={x.prioritas === "tinggi"}>{x.prioritas}</Badge></td>
                  <td><Badge tone={ADU_TONE[x.status][1]} dot>{ADU_TONE[x.status][0]}</Badge></td>
                  <td>{x.status !== "selesai" ? <button className="btn btn-soft btn-sm" onClick={() => advance(x.kode)}>{x.status === "baru" ? "Teruskan" : "Selesai"}</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>✓</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------- BAU (Umum & Rumah Tangga) ----------------
const KENDARAAN = [
  { plat: "B 1234 UIN", jenis: "Minibus", merk: "Toyota Hiace", status: "tersedia", kir: "Berlaku" },
  { plat: "B 5678 UIN", jenis: "Sedan", merk: "Toyota Camry", status: "dipakai", kir: "Berlaku" },
  { plat: "B 9012 UIN", jenis: "Bus", merk: "Hino R260", status: "tersedia", kir: "Segera habis" },
  { plat: "B 3456 UIN", jenis: "Pickup", merk: "Mitsubishi L300", status: "perawatan", kir: "Berlaku" },
];
const PEMINJAMAN_KEND = [
  { pemohon: "BEM Universitas", kendaraan: "Bus Hino R260", keperluan: "Studi banding", tgl: "27 Jun 2026", status: "menunggu" },
  { pemohon: "Prodi TI", kendaraan: "Minibus Hiace", keperluan: "Kunjungan industri", tgl: "28 Jun 2026", status: "disetujui" },
];
const RUMAH_TANGGA = [
  { layanan: "Kebersihan Gedung FST", jadwal: "Harian", petugas: 8, status: "Berjalan" },
  { layanan: "Perawatan Taman", jadwal: "Mingguan", petugas: 4, status: "Berjalan" },
  { layanan: "Jamuan Rapat Senat", jadwal: "Sesuai jadwal", petugas: 3, status: "Terjadwal" },
  { layanan: "Keamanan (Satpam) 3 Shift", jadwal: "24 jam", petugas: 18, status: "Berjalan" },
];

function BauDashboard({ nav }) {
  const R = AIS_ROLES; const p = R.personas.bau;
  const tiles = [
    { label: "Kendaraan Dinas", value: KENDARAAN.length, meta: KENDARAAN.filter((k) => k.status === "tersedia").length + " tersedia", ic: "car", c: "var(--blue)", bg: "var(--blue-bg)" },
    { label: "Peminjaman", value: PEMINJAMAN_KEND.filter((x) => x.status === "menunggu").length, meta: "menunggu persetujuan", ic: "check", c: "var(--amber)", bg: "var(--amber-bg)" },
    { label: "Layanan RT", value: RUMAH_TANGGA.length, meta: "kebersihan, taman, dll", ic: "home", c: "var(--green)", bg: "var(--green-bg)" },
    { label: "Petugas Aktif", value: RUMAH_TANGGA.reduce((a, b) => a + b.petugas, 0), meta: "tenaga harian lepas", ic: "users", c: "var(--purple)", bg: "var(--purple-bg)" },
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="bau" sub="Kelola kendaraan dinas, layanan kebersihan & rumah tangga, serta keamanan kampus."
        action={<button className="btn btn-primary" onClick={() => nav("bau_kendaraan")}><Icon name="car" size={17} /> Kendaraan</button>} />
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
        <div className="card-head"><Icon name="home" size={19} style={{ color: "var(--green)" }} /><h3>Layanan Rumah Tangga</h3>
          <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("bau_rt")}>Detail</button></div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Layanan</th><th>Jadwal</th><th style={{ textAlign: "center" }}>Petugas</th><th>Status</th></tr></thead>
            <tbody>
              {RUMAH_TANGGA.map((r, i) => (
                <tr key={i}><td style={{ fontWeight: 700 }}>{r.layanan}</td><td>{r.jadwal}</td><td style={{ textAlign: "center" }}>{r.petugas}</td><td><Badge tone={r.status === "Berjalan" ? "green" : "amber"} dot>{r.status}</Badge></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BauKendaraan() {
  const toast = useToast();
  const tone = { tersedia: ["Tersedia", "green"], dipakai: ["Dipakai", "blue"], perawatan: ["Perawatan", "amber"] };
  return (
    <div className="anim-in">
      <PageHead title="Kendaraan Dinas" desc="Armada kendaraan dinas, status KIR, dan persetujuan peminjaman." />
      <div className="grid" style={{ gridTemplateColumns: "1.3fr 1fr" }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="car" size={19} style={{ color: "var(--blue)" }} /><h3>Armada</h3></div>
          <div style={{ overflowX: "auto" }}>
            <table className="tbl">
              <thead><tr><th>Plat</th><th>Jenis</th><th>Merk</th><th>KIR</th><th>Status</th></tr></thead>
              <tbody>
                {KENDARAAN.map((k) => (
                  <tr key={k.plat}>
                    <td className="mono" style={{ fontWeight: 600 }}>{k.plat}</td>
                    <td>{k.jenis}</td>
                    <td style={{ color: "var(--ink-2)" }}>{k.merk}</td>
                    <td><Badge tone={k.kir === "Berlaku" ? "green" : "amber"}>{k.kir}</Badge></td>
                    <td><Badge tone={tone[k.status][1]} dot>{tone[k.status][0]}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="check" size={19} style={{ color: "var(--amber)" }} /><h3>Permohonan Peminjaman</h3></div>
          <div>
            {PEMINJAMAN_KEND.map((x, i) => (
              <div key={i} style={{ padding: "14px 22px", borderBottom: i < PEMINJAMAN_KEND.length - 1 ? "1px solid var(--line)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <span style={{ fontWeight: 700, fontSize: 13.5 }}>{x.pemohon}</span>
                  <Badge tone={x.status === "disetujui" ? "green" : "amber"} dot style={{ marginLeft: "auto" }}>{x.status === "disetujui" ? "Disetujui" : "Menunggu"}</Badge>
                </div>
                <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginBottom: x.status === "menunggu" ? 9 : 0 }}>{x.kendaraan} · {x.keperluan} · {x.tgl}</div>
                {x.status === "menunggu" && <button className="btn btn-soft btn-sm" onClick={() => toast("Peminjaman disetujui", "ok")}>Setujui</button>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BauRT() {
  return (
    <div className="anim-in">
      <PageHead title="Rumah Tangga & Kebersihan" desc="Layanan kebersihan, taman, jamuan, dan keamanan kampus." />
      <div className="grid" style={{ gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
        {RUMAH_TANGGA.map((r, i) => (
          <div key={i} className="card card-pad" style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 13, background: "var(--green-bg)", color: "var(--green)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="home" size={21} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{r.layanan}</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{r.jadwal} · {r.petugas} petugas</div>
            </div>
            <Badge tone={r.status === "Berjalan" ? "green" : "amber"} dot>{r.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

export {
  HumasDashboard, HumasBerita, HumasPPID, HumasPengaduan,
  BauDashboard, BauKendaraan, BauRT,
};
