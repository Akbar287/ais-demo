// @ts-nocheck
const { React, useState, useEffect, useRef, Icon, useToast, Modal, Badge, PageHead, Barcode, ImgPlaceholder, rupiah, initials, StaffHero } = window as any;

// ============================================================
// AIS — Views: PERPUSTAKAAN (Library Service) + Perpustakaan Saya (mhs)
// ============================================================

const LIB_KOLEKSI = [
  { kode: "005.133 RUS a", judul: "Artificial Intelligence: A Modern Approach", penulis: "Russell & Norvig", eks: 8, tersedia: 3, kat: "Buku Teks" },
  { kode: "005.74 SIL d", judul: "Database System Concepts", penulis: "Silberschatz", eks: 6, tersedia: 0, kat: "Buku Teks" },
  { kode: "006.31 GER h", judul: "Hands-On Machine Learning", penulis: "Aurélien Géron", eks: 5, tersedia: 2, kat: "Buku Teks" },
  { kode: "004.6 TAN c", judul: "Computer Networks", penulis: "Tanenbaum", eks: 4, tersedia: 4, kat: "Buku Teks" },
  { kode: "JTI 2024 014", judul: "Jurnal Teknik Informatika Vol. 14", penulis: "FST UIN", eks: 2, tersedia: 1, kat: "Jurnal" },
  { kode: "005.1 SOM s", judul: "Software Engineering", penulis: "Ian Sommerville", eks: 7, tersedia: 5, kat: "Buku Teks" },
];

const LIB_PINJAM = [
  { anggota: "Aisyah Nur Ramadhani", nim: "11210910000045", buku: "Hands-On Machine Learning", pinjam: "16 Jun 2026", tempo: "30 Jun 2026", status: "aktif" },
  { anggota: "Bayu Pratama", nim: "11210910000033", buku: "Database System Concepts", pinjam: "02 Jun 2026", tempo: "16 Jun 2026", status: "telat" },
  { anggota: "Citra Lestari", nim: "11210910000052", buku: "Software Engineering", pinjam: "19 Jun 2026", tempo: "03 Jul 2026", status: "aktif" },
  { anggota: "Dimas Hidayat", nim: "11200910000018", buku: "Computer Networks", pinjam: "10 Jun 2026", tempo: "24 Jun 2026", status: "aktif" },
];

function LibDashboard({ nav }) {
  const R = window.AIS_ROLES; const p = R.personas.pustakawan;
  const telat = LIB_PINJAM.filter((x) => x.status === "telat");
  const tiles = [
    { label: "Total Koleksi", value: "18.420", meta: "judul · 32 rb eksemplar", ic: "bookOpen", c: "var(--blue)", bg: "var(--blue-bg)", small: true },
    { label: "Dipinjam Aktif", value: LIB_PINJAM.length * 71, meta: "sedang beredar", ic: "refresh", c: "var(--green)", bg: "var(--green-bg)" },
    { label: "Terlambat", value: telat.length + 23, meta: "perlu penagihan", ic: "clock", c: "var(--red)", bg: "var(--red-bg)" },
    { label: "Anggota Aktif", value: "4.182", meta: "mahasiswa + dosen", ic: "users", c: "var(--purple)", bg: "var(--purple-bg)" },
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="pustakawan" sub="Layani sirkulasi koleksi, kelola katalog, keanggotaan, dan repositori karya ilmiah."
        action={<button className="btn btn-primary" onClick={() => nav("lib_sirkulasi")}><Icon name="refresh" size={17} /> Sirkulasi</button>} />
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
        <div className="card-head"><Icon name="clock" size={19} style={{ color: "var(--red)" }} /><h3>Pinjaman Jatuh Tempo & Terlambat</h3><button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("lib_sirkulasi")}>Sirkulasi</button></div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Anggota</th><th>Judul Buku</th><th>Tgl Pinjam</th><th>Jatuh Tempo</th><th>Status</th></tr></thead>
            <tbody>{LIB_PINJAM.map((x, i) => (<tr key={i}><td><div style={{ fontWeight: 700 }}>{x.anggota}</div><div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{x.nim}</div></td><td style={{ fontWeight: 600 }}>{x.buku}</td><td style={{ fontSize: 13 }}>{x.pinjam}</td><td style={{ fontSize: 13 }}>{x.tempo}</td><td><Badge tone={x.status === "telat" ? "red" : "green"} dot>{x.status === "telat" ? "Terlambat" : "Aktif"}</Badge></td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LibSirkulasi() {
  const toast = useToast();
  const [tab, setTab] = useState("pinjam");
  return (
    <div className="anim-in">
      <PageHead title="Peminjaman & Pengembalian" desc="Catat sirkulasi koleksi. Setiap transaksi memperbarui ketersediaan eksemplar di Library Service." />
      <div className="seg" style={{ marginBottom: 18 }}>
        <button className={tab === "pinjam" ? "on" : ""} onClick={() => setTab("pinjam")}>Peminjaman</button>
        <button className={tab === "kembali" ? "on" : ""} onClick={() => setTab("kembali")}>Pengembalian</button>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "340px 1fr" }}>
        <div className="card card-pad" style={{ alignSelf: "start" }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 15 }}>{tab === "pinjam" ? "Pinjam Buku" : "Kembalikan Buku"}</h3>
          <div className="field"><label>{tab === "pinjam" ? "NIM / Kartu Anggota" : "Kode / Barcode Buku"}</label><input placeholder={tab === "pinjam" ? "Pindai kartu anggota…" : "Pindai barcode buku…"} /></div>
          <div className="field"><label>{tab === "pinjam" ? "Kode / Barcode Buku" : "Kondisi Buku"}</label>{tab === "pinjam" ? <input placeholder="Pindai barcode buku…" /> : <select><option>Baik</option><option>Rusak ringan</option><option>Rusak berat</option></select>}</div>
          <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => toast(tab === "pinjam" ? "Peminjaman dicatat · tempo 14 hari" : "Pengembalian dicatat", "ok")}><Icon name="check" size={16} /> {tab === "pinjam" ? "Catat Peminjaman" : "Catat Pengembalian"}</button>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="refresh" size={19} style={{ color: "var(--blue)" }} /><h3>Pinjaman Aktif</h3></div>
          <div style={{ overflowX: "auto" }}>
            <table className="tbl">
              <thead><tr><th>Anggota</th><th>Buku</th><th>Jatuh Tempo</th><th>Status</th><th></th></tr></thead>
              <tbody>{LIB_PINJAM.map((x, i) => (<tr key={i}><td style={{ fontWeight: 700 }}>{x.anggota}</td><td>{x.buku}</td><td style={{ fontSize: 13 }}>{x.tempo}</td><td><Badge tone={x.status === "telat" ? "red" : "green"} dot>{x.status === "telat" ? "Terlambat" : "Aktif"}</Badge></td><td><button className="btn btn-ghost btn-sm" onClick={() => toast("Pengembalian " + x.buku + " dicatat", "ok")}>Kembalikan</button></td></tr>))}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function LibKatalog() {
  const [q, setQ] = useState("");
  const list = LIB_KOLEKSI.filter((k) => k.judul.toLowerCase().includes(q.toLowerCase()) || k.penulis.toLowerCase().includes(q.toLowerCase()) || k.kode.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="anim-in">
      <PageHead title="Katalog & Koleksi" desc="Telusuri katalog (OPAC) dan pantau ketersediaan eksemplar tiap koleksi." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <div className="tb-search" style={{ margin: 0, width: 340 }}><Icon name="search" size={16} /><input placeholder="Cari judul, penulis, atau kode…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--ink-3)" }}>{list.length} koleksi</span>
      </div>
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Kode Klasifikasi</th><th>Judul</th><th>Penulis</th><th>Kategori</th><th style={{ textAlign: "center" }}>Tersedia</th><th>Status</th></tr></thead>
            <tbody>
              {list.map((k) => (
                <tr key={k.kode}>
                  <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{k.kode}</td>
                  <td style={{ fontWeight: 700 }}>{k.judul}</td>
                  <td style={{ color: "var(--ink-2)" }}>{k.penulis}</td>
                  <td><Badge tone="gray">{k.kat}</Badge></td>
                  <td style={{ textAlign: "center" }} className="mono">{k.tersedia}/{k.eks}</td>
                  <td><Badge tone={k.tersedia > 0 ? "green" : "red"} dot>{k.tersedia > 0 ? "Tersedia" : "Dipinjam semua"}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LibAnggota() {
  const anggota = [
    { nama: "Aisyah Nur Ramadhani", id: "11210910000045", tipe: "Mahasiswa", pinjam: 1, status: "Aktif" },
    { nama: "Dr. Imam Marzuki, M.Kom", id: "0312088203", tipe: "Dosen", pinjam: 3, status: "Aktif" },
    { nama: "Bayu Pratama", id: "11210910000033", tipe: "Mahasiswa", pinjam: 2, status: "Diblokir" },
    { nama: "Citra Lestari", id: "11210910000052", tipe: "Mahasiswa", pinjam: 1, status: "Aktif" },
    { nama: "Dewi Lestari, M.Kom", id: "0415099002", tipe: "Dosen", pinjam: 0, status: "Aktif" },
  ];
  return (
    <div className="anim-in">
      <PageHead title="Anggota Perpustakaan" desc="Keanggotaan tersinkron dengan Student & HR Service. Status blokir menahan peminjaman baru." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Nama</th><th>ID</th><th>Tipe</th><th style={{ textAlign: "center" }}>Pinjaman Aktif</th><th>Status</th></tr></thead>
            <tbody>{anggota.map((a) => (<tr key={a.id}><td style={{ fontWeight: 700 }}>{a.nama}</td><td className="mono" style={{ color: "var(--ink-3)" }}>{a.id}</td><td><Badge tone={a.tipe === "Dosen" ? "blue" : "gray"}>{a.tipe}</Badge></td><td style={{ textAlign: "center", fontWeight: 700 }}>{a.pinjam}</td><td><Badge tone={a.status === "Aktif" ? "green" : "red"} dot>{a.status}</Badge></td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LibDenda() {
  const rupiah = window.AIS_DATA.rupiah || ((n) => "Rp " + n.toLocaleString("id"));
  const toast = useToast();
  const [list, setList] = useState([
    { nama: "Bayu Pratama", nim: "11210910000033", buku: "Database System Concepts", telat: 7, denda: 7000, status: "belum" },
    { nama: "Rangga Saputra", nim: "11220910000087", buku: "Computer Networks", telat: 3, denda: 3000, status: "belum" },
    { nama: "Eka Permata", nim: "11220910000120", buku: "Software Engineering (hilang)", telat: 0, denda: 185000, status: "belum", ket: "Ganti buku" },
  ]);
  function bayar(nim) { setList((l) => l.map((d) => d.nim === nim ? { ...d, status: "lunas" } : d)); toast("Denda dilunasi", "ok"); }
  return (
    <div className="anim-in">
      <PageHead title="Denda & Sanksi" desc="Denda keterlambatan Rp 1.000/hari/buku. Tunggakan denda memblokir peminjaman & dapat menahan layanan akademik." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Anggota</th><th>Buku</th><th style={{ textAlign: "center" }}>Telat (hari)</th><th style={{ textAlign: "right" }}>Denda</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map((d) => (
                <tr key={d.nim}>
                  <td><div style={{ fontWeight: 700 }}>{d.nama}</div><div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{d.nim}</div></td>
                  <td>{d.buku}{d.ket && <Badge tone="red" style={{ marginLeft: 6 }}>{d.ket}</Badge>}</td>
                  <td style={{ textAlign: "center", fontWeight: 700 }}>{d.telat || "—"}</td>
                  <td style={{ textAlign: "right", fontWeight: 700, fontFamily: "var(--mono)" }}>{rupiah(d.denda)}</td>
                  <td><Badge tone={d.status === "lunas" ? "green" : "amber"} dot>{d.status === "lunas" ? "Lunas" : "Belum bayar"}</Badge></td>
                  <td>{d.status === "belum" ? <button className="btn btn-soft btn-sm" onClick={() => bayar(d.nim)}>Lunasi</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>Selesai</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LibRepo() {
  const repo = [
    { judul: "Deteksi Dini Penyakit Daun Padi Menggunakan CNN", penulis: "Galih Firmansyah", tahun: 2026, tipe: "Skripsi", prodi: "TI", unduh: 142 },
    { judul: "Sistem Rekomendasi Mata Kuliah dengan Collaborative Filtering", penulis: "Maya Anggraini", tahun: 2026, tipe: "Skripsi", prodi: "TI", unduh: 88 },
    { judul: "Optimasi Penjadwalan Kuliah dengan Algoritma Genetika", penulis: "Tim Peneliti FST", tahun: 2025, tipe: "Jurnal", prodi: "TI", unduh: 311 },
    { judul: "Analisis Sentimen Ulasan E-Commerce Berbasis BERT", penulis: "Doni Kusuma", tahun: 2026, tipe: "Skripsi", prodi: "TI", unduh: 53 },
  ];
  return (
    <div className="anim-in">
      <PageHead title="Repositori Karya Ilmiah" desc="Arsip digital skripsi, tesis, dan publikasi — terhubung dengan Thesis & LPPM Service." />
      <div className="grid" style={{ gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
        {repo.map((r, i) => (
          <div key={i} className="card card-pad">
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}><Badge tone={r.tipe === "Jurnal" ? "purple" : "blue"}>{r.tipe}</Badge><Badge tone="gray">{r.tahun}</Badge><Badge tone="gray">{r.prodi}</Badge></div>
            <div style={{ fontWeight: 700, fontSize: 14.5, lineHeight: 1.4, marginBottom: 8 }}>{r.judul}</div>
            <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginBottom: 14 }}>{r.penulis}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid var(--line)" }}>
              <span style={{ fontSize: 12, color: "var(--ink-3)" }}><Icon name="download" size={13} /> {r.unduh} unduhan</span>
              <button className="btn btn-ghost btn-sm"><Icon name="doc" size={14} /> Buka</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Perpustakaan Saya (sisi mahasiswa) ----------
function PerpusMahasiswa() {
  const rupiah = window.AIS_DATA.rupiah || ((n) => "Rp " + n.toLocaleString("id"));
  const toast = useToast();
  const [q, setQ] = useState("");
  const list = LIB_KOLEKSI.filter((k) => k.judul.toLowerCase().includes(q.toLowerCase()) || k.penulis.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="anim-in">
      <PageHead title="Perpustakaan Saya" desc="Pinjaman aktif, riwayat, dan pencarian katalog OPAC." />
      <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)", marginBottom: 20 }}>
        <div className="stat card" style={{ background: "var(--blue-bg)", border: "none" }}><div className="label" style={{ color: "var(--blue)" }}>Sedang Dipinjam</div><div className="value" style={{ color: "var(--blue)" }}>1</div><div className="meta" style={{ color: "var(--blue)" }}>maks 4 buku</div></div>
        <div className="stat card" style={{ background: "var(--green-bg)", border: "none" }}><div className="label" style={{ color: "var(--green)" }}>Riwayat Pinjam</div><div className="value" style={{ color: "var(--green)" }}>23</div><div className="meta" style={{ color: "var(--green)" }}>sepanjang studi</div></div>
        <div className="stat card" style={{ background: "var(--green-bg)", border: "none" }}><div className="label" style={{ color: "var(--green)" }}>Denda</div><div className="value" style={{ color: "var(--green)" }}>Rp 0</div><div className="meta" style={{ color: "var(--green)" }}>tidak ada tunggakan</div></div>
      </div>
      <div className="card" style={{ marginBottom: 18 }}>
        <div className="card-head"><Icon name="refresh" size={19} style={{ color: "var(--blue)" }} /><h3>Pinjaman Aktif Saya</h3></div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Judul</th><th>Tgl Pinjam</th><th>Jatuh Tempo</th><th></th></tr></thead>
            <tbody><tr><td style={{ fontWeight: 700 }}>Hands-On Machine Learning</td><td style={{ fontSize: 13 }}>16 Jun 2026</td><td style={{ fontSize: 13 }}>30 Jun 2026</td><td><button className="btn btn-soft btn-sm" onClick={() => toast("Perpanjangan diajukan (+7 hari)", "ok")}>Perpanjang</button></td></tr></tbody>
          </table>
        </div>
      </div>
      <div className="card card-pad" style={{ marginBottom: 14, display: "flex", gap: 12 }}>
        <div className="tb-search" style={{ margin: 0, flex: 1 }}><Icon name="search" size={16} /><input placeholder="Cari koleksi (OPAC)…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
      </div>
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Judul</th><th>Penulis</th><th style={{ textAlign: "center" }}>Tersedia</th><th></th></tr></thead>
            <tbody>{list.map((k) => (<tr key={k.kode}><td style={{ fontWeight: 700 }}>{k.judul}</td><td style={{ color: "var(--ink-2)" }}>{k.penulis}</td><td style={{ textAlign: "center" }} className="mono">{k.tersedia}/{k.eks}</td><td>{k.tersedia > 0 ? <button className="btn btn-ghost btn-sm" onClick={() => toast("Buku dipesan — ambil di loket", "ok")}>Pesan</button> : <Badge tone="red">Habis</Badge>}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LibDashboard, LibSirkulasi, LibKatalog, LibAnggota, LibDenda, LibRepo, PerpusMahasiswa });

export {};
