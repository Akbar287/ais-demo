import { useState } from "react";
import { Badge, Icon } from "@/components/atoms";
import { PageHead } from "@/components/molecules";
import { StaffHero, useToast } from "@/components/organisms";
import { AIS_DATA } from "@/data/mock-data";
import { AIS_ROLES } from "@/data/roles";

// ============================================================
// AIS — Views: MBKM + KKN
// Service: exp (Experiential Learning)
// ============================================================

// ---------------- MBKM ----------------
const MBKM_PROGRAM = [
  { nama: "Magang Bersertifikat — Gojek", jenis: "Magang", mitra: "PT GoTo", sks: 20, kuota: 8, terisi: 6, lokasi: "Jakarta", status: "Dibuka" },
  { nama: "Studi Independen — Dicoding ML", jenis: "Studi Independen", mitra: "Dicoding", sks: 20, kuota: 15, terisi: 15, lokasi: "Daring", status: "Penuh" },
  { nama: "Kampus Mengajar Angkatan 8", jenis: "Asistensi Mengajar", mitra: "Kemdikbud", sks: 20, kuota: 12, terisi: 4, lokasi: "Jawa Barat", status: "Dibuka" },
  { nama: "Pertukaran Mahasiswa Merdeka", jenis: "Pertukaran", mitra: "PMM Nasional", sks: 20, kuota: 10, terisi: 7, lokasi: "Luar Pulau", status: "Dibuka" },
  { nama: "Riset — BRIN Kecerdasan Buatan", jenis: "Penelitian", mitra: "BRIN", sks: 20, kuota: 5, terisi: 2, lokasi: "Bandung", status: "Dibuka" },
];

const MBKM_PENDAFTAR = [
  { nim: "11210910000045", nama: "Aisyah Nur Ramadhani", program: "Magang Bersertifikat — Gojek", ipk: 3.71, tahap: "diterima", konversi: "menunggu" },
  { nim: "11210910000033", nama: "Bayu Pratama", program: "Kampus Mengajar Angkatan 8", ipk: 3.12, tahap: "seleksi", konversi: "-" },
  { nim: "11210910000052", nama: "Citra Lestari", program: "Riset — BRIN AI", ipk: 3.55, tahap: "diterima", konversi: "selesai" },
  { nim: "11200910000018", nama: "Dimas Hidayat", program: "Pertukaran Mahasiswa Merdeka", ipk: 3.30, tahap: "seleksi", konversi: "-" },
  { nim: "11210910000061", nama: "Galang Maulana", program: "Magang Bersertifikat — Gojek", ipk: 3.48, tahap: "daftar", konversi: "-" },
];
const TAHAP_TONE = { daftar: ["Mendaftar", "gray"], seleksi: ["Seleksi", "amber"], diterima: ["Diterima", "green"], ditolak: ["Ditolak", "red"] };

const MBKM_KONVERSI = [
  { mk: "Praktik Kerja Lapangan", sks: 4, setara: "Aktivitas Magang Inti" },
  { mk: "Kecerdasan Buatan", sks: 3, setara: "Proyek ML Production" },
  { mk: "Manajemen Proyek TI", sks: 3, setara: "Sprint & Delivery" },
  { mk: "Interaksi Manusia-Komputer", sks: 3, setara: "Riset UX Produk" },
  { mk: "Kewirausahaan Digital", sks: 2, setara: "Studi Kasus Bisnis" },
  { mk: "Etika Profesi", sks: 2, setara: "Kode Etik Perusahaan" },
  { mk: "Magang Industri", sks: 3, setara: "Logbook & Laporan" },
];

const MBKM_MITRA = [
  { nama: "PT GoTo Gojek Tokopedia", bidang: "Teknologi", program: 2, mou: "Aktif s.d 2027" },
  { nama: "Dicoding Indonesia", bidang: "EdTech", program: 1, mou: "Aktif s.d 2026" },
  { nama: "BRIN", bidang: "Riset", program: 1, mou: "Aktif s.d 2028" },
  { nama: "Kemdikbudristek", bidang: "Pemerintah", program: 2, mou: "Aktif s.d 2027" },
];

function MbkmDashboard({ nav }) {
  const R = AIS_ROLES; const p = R.personas.mbkm;
  const totalKuota = MBKM_PROGRAM.reduce((a, b) => a + b.kuota, 0);
  const totalTerisi = MBKM_PROGRAM.reduce((a, b) => a + b.terisi, 0);
  const tiles = [
    { label: "Program Aktif", value: MBKM_PROGRAM.filter((x) => x.status === "Dibuka").length, meta: "dari " + MBKM_PROGRAM.length + " program", ic: "link", c: "var(--orange-600)", bg: "var(--orange-50)" },
    { label: "Mahasiswa Terdaftar", value: MBKM_PENDAFTAR.length * 9, meta: "lintas program", ic: "users", c: "var(--blue)", bg: "var(--blue-bg)" },
    { label: "Keterisian Kuota", value: Math.round(totalTerisi / totalKuota * 100) + "%", meta: totalTerisi + "/" + totalKuota + " kursi", ic: "chart", c: "var(--green)", bg: "var(--green-bg)" },
    { label: "Mitra Kerjasama", value: MBKM_MITRA.length, meta: "MoU aktif", ic: "handshake", c: "var(--purple)", bg: "var(--purple-bg)" },
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="mbkm" sub="Kelola program Merdeka Belajar, pendaftaran mahasiswa, konversi SKS, dan mitra."
        action={<button className="btn btn-primary" onClick={() => nav("mbkm_pendaftar")}><Icon name="users" size={17} /> Kelola Pendaftar</button>} />
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
        <div className="card-head"><Icon name="link" size={19} style={{ color: "var(--orange-600)" }} /><h3>Keterisian Program</h3>
          <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("mbkm_program")}>Kelola</button></div>
        <div className="card-pad" style={{ display: "grid", gap: 14 }}>
          {MBKM_PROGRAM.map((m) => {
            const pct = Math.round(m.terisi / m.kuota * 100);
            return (
              <div key={m.nama}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 13 }}>
                  <span style={{ fontWeight: 600 }}>{m.nama} <span style={{ color: "var(--ink-3)" }}>· {m.jenis}</span></span>
                  <b className="mono">{m.terisi}/{m.kuota}</b>
                </div>
                <div className="prog"><i style={{ width: pct + "%", background: pct >= 100 ? "var(--red)" : "var(--orange)" }} /></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MbkmProgram() {
  const tone = { Dibuka: "green", Penuh: "amber" };
  return (
    <div className="anim-in">
      <PageHead title="Program & Lowongan MBKM" desc="8 bentuk kegiatan MBKM yang dibuka beserta mitra dan bobot SKS (setara 20 SKS/semester)." />
      <div className="grid" style={{ gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
        {MBKM_PROGRAM.map((m, i) => (
          <div key={i} className="card card-pad">
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 13 }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: "var(--orange-50)", color: "var(--orange-600)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="link" size={22} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 14.5, lineHeight: 1.3 }}>{m.nama}</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>{m.mitra} · {m.lokasi}</div>
              </div>
              <Badge tone={tone[m.status]} dot>{m.status}</Badge>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 13 }}>
              <Badge tone="blue">{m.jenis}</Badge><Badge tone="gray">{m.sks} SKS</Badge>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 6 }}><span style={{ color: "var(--ink-3)" }}>Kuota terisi</span><b className="mono">{m.terisi}/{m.kuota}</b></div>
            <div className="prog"><i style={{ width: (m.terisi / m.kuota * 100) + "%", background: "var(--orange)" }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MbkmPendaftar() {
  const toast = useToast();
  const [list, setList] = useState(MBKM_PENDAFTAR.map((x) => ({ ...x })));
  function decide(nim, tahap) { setList((l) => l.map((x) => x.nim === nim ? { ...x, tahap } : x)); toast(tahap === "diterima" ? "Mahasiswa diterima di program MBKM" : "Pendaftaran ditolak", tahap === "diterima" ? "ok" : "err"); }
  return (
    <div className="anim-in">
      <PageHead title="Pendaftar MBKM" desc="Seleksi mahasiswa pendaftar program. Penerimaan memicu konversi SKS dan pencatatan di transkrip." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Mahasiswa</th><th>Program</th><th style={{ textAlign: "center" }}>IPK</th><th>Konversi SKS</th><th>Tahap</th><th></th></tr></thead>
            <tbody>
              {list.map((x) => (
                <tr key={x.nim}>
                  <td><div style={{ fontWeight: 700 }}>{x.nama}</div><div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{x.nim}</div></td>
                  <td style={{ maxWidth: 240, color: "var(--ink-2)" }}>{x.program}</td>
                  <td style={{ textAlign: "center", fontWeight: 800, fontFamily: "var(--mono)", color: x.ipk < 3 ? "var(--amber)" : "var(--ink)" }}>{x.ipk.toFixed(2)}</td>
                  <td>{x.konversi === "selesai" ? <Badge tone="green" dot>Selesai</Badge> : x.konversi === "menunggu" ? <Badge tone="amber">Menunggu</Badge> : <span style={{ color: "var(--ink-3)" }}>—</span>}</td>
                  <td><Badge tone={TAHAP_TONE[x.tahap][1]} dot>{TAHAP_TONE[x.tahap][0]}</Badge></td>
                  <td>{x.tahap === "seleksi" || x.tahap === "daftar" ? (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => decide(x.nim, "ditolak")}>Tolak</button>
                      <button className="btn btn-soft btn-sm" onClick={() => decide(x.nim, "diterima")}><Icon name="check" size={13} /></button>
                    </div>
                  ) : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MbkmKonversi() {
  const total = MBKM_KONVERSI.reduce((a, b) => a + b.sks, 0);
  return (
    <div className="anim-in">
      <PageHead title="Konversi SKS" desc="Pemetaan aktivitas MBKM ke mata kuliah (rekognisi). Contoh: Magang Bersertifikat = 20 SKS." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
        <div><div style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>Program</div><div style={{ fontWeight: 800, fontSize: 15 }}>Magang Bersertifikat — Gojek</div></div>
        <div style={{ borderLeft: "1px solid var(--line)", paddingLeft: 22 }}><div style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>Total Dikonversi</div><div style={{ fontWeight: 800, fontSize: 15, color: "var(--orange-600)" }}>{total} SKS</div></div>
        <Badge tone={total === 20 ? "green" : "amber"} dot style={{ marginLeft: "auto" }}>{total === 20 ? "Sesuai 20 SKS" : "Perlu penyesuaian"}</Badge>
      </div>
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Mata Kuliah (Kurikulum)</th><th style={{ textAlign: "center" }}>SKS</th><th>Setara Aktivitas MBKM</th></tr></thead>
            <tbody>
              {MBKM_KONVERSI.map((k, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700 }}>{k.mk}</td>
                  <td style={{ textAlign: "center", fontWeight: 700, fontFamily: "var(--mono)" }}>{k.sks}</td>
                  <td style={{ color: "var(--ink-2)" }}><Icon name="refresh" size={13} style={{ color: "var(--orange)", marginRight: 6 }} />{k.setara}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MbkmMitra() {
  return (
    <div className="anim-in">
      <PageHead title="Mitra MBKM" desc="Mitra industri, pemerintah, dan lembaga riset penyelenggara program." />
      <div className="grid" style={{ gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
        {MBKM_MITRA.map((m, i) => (
          <div key={i} className="card card-pad" style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 46, height: 46, borderRadius: 13, background: "var(--purple-bg)", color: "var(--purple)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="handshake" size={22} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 14.5 }}>{m.nama}</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{m.bidang} · {m.program} program</div>
            </div>
            <Badge tone="green" dot>{m.mou}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- KKN ----------------
const KKN_LOKASI = [
  { desa: "Desa Cibening", kec: "Pamijahan, Bogor", kelompok: 3, mhs: 30, dpl: "Dr. Hadi Nugroho", tema: "Digitalisasi UMKM" },
  { desa: "Desa Sukamaju", kec: "Cisarua, Bogor", kelompok: 2, mhs: 20, dpl: "Dewi Lestari, M.Kom", tema: "Literasi Digital" },
  { desa: "Desa Tugu Utara", kec: "Megamendung", kelompok: 2, mhs: 21, dpl: "Bambang Sutejo, M.Kom", tema: "Ketahanan Pangan" },
  { desa: "Desa Cileungsi", kec: "Cileungsi, Bogor", kelompok: 3, mhs: 28, dpl: "Hendra Wijaya, M.T", tema: "Energi Terbarukan" },
];

const KKN_KELOMPOK = [
  { kode: "KKN-01", desa: "Cibening", ketua: "Aisyah Nur R.", anggota: 10, dpl: "Dr. Hadi Nugroho", progress: 75 },
  { kode: "KKN-02", desa: "Cibening", ketua: "Bayu Pratama", anggota: 10, dpl: "Dr. Hadi Nugroho", progress: 60 },
  { kode: "KKN-03", desa: "Sukamaju", ketua: "Citra Lestari", anggota: 10, dpl: "Dewi Lestari, M.Kom", progress: 82 },
  { kode: "KKN-04", desa: "Tugu Utara", ketua: "Dimas Hidayat", anggota: 11, dpl: "Bambang Sutejo", progress: 45 },
];

const KKN_NILAI = [
  { kode: "KKN-01", desa: "Cibening", dpl: 88, lapangan: 90, laporan: 85, status: "menunggu" },
  { kode: "KKN-02", desa: "Cibening", dpl: 82, lapangan: 85, laporan: 0, status: "menunggu" },
  { kode: "KKN-03", desa: "Sukamaju", dpl: 90, lapangan: 92, laporan: 90, status: "final" },
  { kode: "KKN-04", desa: "Tugu Utara", dpl: 0, lapangan: 0, laporan: 0, status: "berjalan" },
];

function KknDashboard({ nav }) {
  const R = AIS_ROLES; const p = R.personas.kkn;
  const totalMhs = KKN_LOKASI.reduce((a, b) => a + b.mhs, 0);
  const totalKel = KKN_LOKASI.reduce((a, b) => a + b.kelompok, 0);
  const tiles = [
    { label: "Lokasi KKN", value: KKN_LOKASI.length, meta: "desa penempatan", ic: "flag", c: "var(--green)", bg: "var(--green-bg)" },
    { label: "Kelompok", value: totalKel, meta: "dengan DPL", ic: "users", c: "var(--blue)", bg: "var(--blue-bg)" },
    { label: "Mahasiswa Peserta", value: totalMhs, meta: "periode ini", ic: "grad", c: "var(--purple)", bg: "var(--purple-bg)" },
    { label: "Penilaian Final", value: KKN_NILAI.filter((x) => x.status === "final").length + "/" + KKN_NILAI.length, meta: "kelompok dinilai", ic: "award", c: "var(--orange-600)", bg: "var(--orange-50)" },
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="kkn" sub="Kelola periode & lokasi KKN, kelompok dan DPL, serta penilaian peserta."
        action={<button className="btn btn-primary" onClick={() => nav("kkn_kelompok")}><Icon name="users" size={17} /> Kelola Kelompok</button>} />
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
        <div className="card-head"><Icon name="users" size={19} style={{ color: "var(--blue)" }} /><h3>Progres Kelompok</h3>
          <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("kkn_kelompok")}>Semua</button></div>
        <div className="card-pad" style={{ display: "grid", gap: 14 }}>
          {KKN_KELOMPOK.map((k) => (
            <div key={k.kode}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 13 }}>
                <span style={{ fontWeight: 600 }}><span className="mono" style={{ color: "var(--ink-3)" }}>{k.kode}</span> {k.desa} · {k.ketua}</span>
                <b className="mono">{k.progress}%</b>
              </div>
              <div className="prog"><i style={{ width: k.progress + "%", background: k.progress >= 75 ? "var(--green)" : k.progress >= 50 ? "var(--blue)" : "var(--amber)" }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KknPeriode() {
  return (
    <div className="anim-in">
      <PageHead title="Periode & Lokasi KKN" desc="Penempatan lokasi KKN tematik periode 2025/2026 Genap." />
      <div className="grid" style={{ gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
        {KKN_LOKASI.map((l, i) => (
          <div key={i} className="card card-pad">
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 13 }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: "var(--green-bg)", color: "var(--green)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="flag" size={22} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 15 }}>{l.desa}</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{l.kec}</div>
              </div>
              <Badge tone="green">{l.tema}</Badge>
            </div>
            <div style={{ display: "flex", gap: 20, paddingTop: 12, borderTop: "1px solid var(--line)" }}>
              {[["Kelompok", l.kelompok], ["Mahasiswa", l.mhs], ["DPL", l.dpl]].map(([k, v]) => (
                <div key={k}><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{k}</div><div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>{v}</div></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KknKelompok() {
  return (
    <div className="anim-in">
      <PageHead title="Kelompok & DPL" desc="Daftar kelompok KKN, ketua, jumlah anggota, dan Dosen Pembimbing Lapangan." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Kode</th><th>Desa</th><th>Ketua</th><th style={{ textAlign: "center" }}>Anggota</th><th>DPL</th><th style={{ width: 160 }}>Progres Program</th></tr></thead>
            <tbody>
              {KKN_KELOMPOK.map((k) => (
                <tr key={k.kode}>
                  <td className="mono" style={{ fontWeight: 600 }}>{k.kode}</td>
                  <td style={{ fontWeight: 700 }}>{k.desa}</td>
                  <td>{k.ketua}</td>
                  <td style={{ textAlign: "center" }}>{k.anggota}</td>
                  <td style={{ color: "var(--ink-2)", fontSize: 13 }}>{k.dpl}</td>
                  <td><div className="prog"><i style={{ width: k.progress + "%", background: k.progress >= 75 ? "var(--green)" : "var(--blue)" }} /></div><div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4 }}>{k.progress}%</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KknPenilaian() {
  const toast = useToast();
  const [list, setList] = useState(KKN_NILAI.map((x) => ({ ...x })));
  function finalize(kode) { setList((l) => l.map((x) => x.kode === kode ? { ...x, status: "final" } : x)); toast("Nilai KKN difinalisasi & dikirim ke transkrip", "ok"); }
  function akhir(x) { if (!x.dpl || !x.lapangan || !x.laporan) return null; return Math.round(x.dpl * 0.4 + x.lapangan * 0.35 + x.laporan * 0.25); }
  const D = AIS_DATA;
  return (
    <div className="anim-in">
      <PageHead title="Penilaian KKN" desc="Komponen: DPL (40%) · Lapangan (35%) · Laporan (25%). Finalisasi mengirim nilai ke KHS." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Kelompok</th><th>Desa</th><th style={{ textAlign: "center" }}>DPL</th><th style={{ textAlign: "center" }}>Lapangan</th><th style={{ textAlign: "center" }}>Laporan</th><th style={{ textAlign: "center" }}>Akhir</th><th style={{ textAlign: "center" }}>Huruf</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map((x) => {
                const a = akhir(x);
                const h = a != null ? D.nilaiHuruf(a) : null;
                return (
                  <tr key={x.kode}>
                    <td className="mono" style={{ fontWeight: 600 }}>{x.kode}</td>
                    <td style={{ fontWeight: 700 }}>{x.desa}</td>
                    {["dpl", "lapangan", "laporan"].map((k) => (<td key={k} style={{ textAlign: "center", fontFamily: "var(--mono)" }}>{x[k] || "—"}</td>))}
                    <td style={{ textAlign: "center", fontWeight: 800, fontFamily: "var(--mono)" }}>{a ?? "—"}</td>
                    <td style={{ textAlign: "center" }}>{h ? <Badge tone={h.bobot >= 3 ? "green" : "amber"}>{h.huruf}</Badge> : <span style={{ color: "var(--ink-3)" }}>—</span>}</td>
                    <td><Badge tone={x.status === "final" ? "green" : x.status === "menunggu" ? "amber" : "gray"} dot>{x.status === "final" ? "Final" : x.status === "menunggu" ? "Menunggu" : "Berjalan"}</Badge></td>
                    <td>{x.status === "menunggu" && a != null ? <button className="btn btn-soft btn-sm" onClick={() => finalize(x.kode)}>Finalisasi</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>—</span>}</td>
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

export {
  MbkmDashboard, MbkmProgram, MbkmPendaftar, MbkmKonversi, MbkmMitra,
  KknDashboard, KknPeriode, KknKelompok, KknPenilaian,
};
