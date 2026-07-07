import { useState } from "react";
import { Badge, Icon } from "@/components/atoms";
import { Modal, PageHead } from "@/components/molecules";
import { StaffHero, useToast } from "@/components/organisms";
import { AIS_ROLES } from "@/data/roles";
import { rupiah } from "@/lib/format";

// ============================================================
// AIS — Views: KEMAHASISWAAN, ALUMNI & KARIR (subjek 14)
// Service: saf (Student Affairs)
// ============================================================
const ORMAWA = [
  { nama: "BEM Universitas", jenis: "Eksekutif", ketua: "Galang Maulana", anggota: 48, dana: 45000000, status: "Aktif" },
  { nama: "HMTI (Himpunan Teknik Informatika)", jenis: "Himpunan", ketua: "Aisyah Nur R.", anggota: 120, dana: 18000000, status: "Aktif" },
  { nama: "UKM Robotika", jenis: "UKM", ketua: "Doni Kusuma", anggota: 64, dana: 25000000, status: "Aktif" },
  { nama: "UKM Pramuka", jenis: "UKM", ketua: "Vina Permata", anggota: 52, dana: 12000000, status: "Aktif" },
  { nama: "DPM (Dewan Perwakilan Mhs)", jenis: "Legislatif", ketua: "Bayu Pratama", anggota: 30, dana: 15000000, status: "Reorganisasi" },
];
const BEASISWA = [
  { nama: "Beasiswa KIP-Kuliah", penyedia: "Pemerintah", kuota: 120, pendaftar: 210, nominal: "UKT + 700rb/bln", status: "Dibuka" },
  { nama: "Beasiswa Prestasi Akademik", penyedia: "Internal", kuota: 40, pendaftar: 88, nominal: "50% UKT", status: "Dibuka" },
  { nama: "Beasiswa Bank Indonesia", penyedia: "Mitra", kuota: 15, pendaftar: 64, nominal: "Rp 6 jt/smt", status: "Seleksi" },
  { nama: "Beasiswa Tahfidz Qur'an", penyedia: "Internal", kuota: 25, pendaftar: 31, nominal: "Rp 2 jt/smt", status: "Dibuka" },
];
const TRACER = [
  { angkatan: 2024, lulus: 312, terlacak: 268, bekerja: 198, lanjutStudi: 24, wirausaha: 30, masaTunggu: "3,2 bln" },
  { angkatan: 2023, lulus: 298, terlacak: 280, bekerja: 224, lanjutStudi: 18, wirausaha: 28, masaTunggu: "2,8 bln" },
  { angkatan: 2022, lulus: 276, terlacak: 270, bekerja: 232, lanjutStudi: 14, wirausaha: 20, masaTunggu: "2,5 bln" },
];
const LOKER = [
  { posisi: "Backend Engineer", perusahaan: "PT GoTo", lokasi: "Jakarta", tipe: "Full-time", pelamar: 24 },
  { posisi: "Data Analyst Intern", perusahaan: "Tokopedia", lokasi: "Jakarta", tipe: "Magang", pelamar: 41 },
  { posisi: "IT Support", perusahaan: "Bank BSI", lokasi: "Tangerang", tipe: "Full-time", pelamar: 12 },
  { posisi: "Mobile Developer", perusahaan: "Telkom", lokasi: "Bandung", tipe: "Kontrak", pelamar: 18 },
];

function KmhsDashboard({ nav }) {
  const R = AIS_ROLES; const p = R.personas.kemahasiswaan;
  const tiles = [
    { label: "Organisasi Mhs", value: ORMAWA.length, meta: ORMAWA.filter((o) => o.status === "Aktif").length + " aktif", ic: "users", c: "var(--green)", bg: "var(--green-bg)" },
    { label: "Penerima Beasiswa", value: 200, meta: "4 skema", ic: "gift", c: "var(--orange-600)", bg: "var(--orange-50)" },
    { label: "Alumni Terlacak", value: "92%", meta: "tracer study 2024", ic: "userCheck", c: "var(--blue)", bg: "var(--blue-bg)" },
    { label: "Lowongan Karir", value: LOKER.length, meta: "mitra perusahaan", ic: "briefcase", c: "var(--purple)", bg: "var(--purple-bg)" },
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="kemahasiswaan" sub="Kelola organisasi mahasiswa, beasiswa, tracer study alumni, dan pusat karier."
        action={<button className="btn btn-primary" onClick={() => nav("kmhs_beasiswa")}><Icon name="gift" size={17} /> Beasiswa</button>} />
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
          <div className="card-head"><Icon name="users" size={19} style={{ color: "var(--green)" }} /><h3>Organisasi Mahasiswa</h3>
            <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("kmhs_ormawa")}>Semua</button></div>
          <div>
            {ORMAWA.slice(0, 4).map((o, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 22px", borderBottom: i < 3 ? "1px solid var(--line)" : "none" }}>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 700, fontSize: 13.5 }}>{o.nama}</div><div style={{ fontSize: 12, color: "var(--ink-3)" }}>{o.ketua} · {o.anggota} anggota</div></div>
                <Badge tone={o.status === "Aktif" ? "green" : "amber"} dot>{o.status}</Badge>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="chart" size={19} style={{ color: "var(--blue)" }} /><h3>Serapan Lulusan (Tracer 2024)</h3></div>
          <div className="card-pad" style={{ display: "grid", gap: 14 }}>
            {[["Bekerja", 198, "green"], ["Lanjut Studi", 24, "blue"], ["Wirausaha", 30, "purple"], ["Belum terlacak", 60, "amber"]].map(([l, v, t]) => (
              <div key={l}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}><span style={{ fontWeight: 600 }}>{l}</span><b className="mono">{v}</b></div><div className="prog"><i style={{ width: (Number(v) / 312 * 100) + "%", background: `var(--${t})` }} /></div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KmhsOrmawa() {
  return (
    <div className="anim-in">
      <PageHead title="Organisasi Mahasiswa" desc="Ormawa, himpunan, dan UKM beserta kepengurusan dan dana kegiatan." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Organisasi</th><th>Jenis</th><th>Ketua</th><th style={{ textAlign: "center" }}>Anggota</th><th style={{ textAlign: "right" }}>Dana Kegiatan</th><th>Status</th></tr></thead>
            <tbody>
              {ORMAWA.map((o, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700 }}>{o.nama}</td>
                  <td><Badge tone="gray">{o.jenis}</Badge></td>
                  <td style={{ color: "var(--ink-2)" }}>{o.ketua}</td>
                  <td style={{ textAlign: "center" }}>{o.anggota}</td>
                  <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{rupiah(o.dana)}</td>
                  <td><Badge tone={o.status === "Aktif" ? "green" : "amber"} dot>{o.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KmhsBeasiswa() {
  const toast = useToast();
  return (
    <div className="anim-in">
      <PageHead title="Beasiswa" desc="Skema beasiswa internal & mitra. Penetapan penerima mengkredit tagihan UKT (Billing)."
        actions={<button className="btn btn-primary" onClick={() => toast("Form skema beasiswa baru dibuka")}><Icon name="plus" size={16} /> Buka Skema</button>} />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Skema Beasiswa</th><th>Penyedia</th><th style={{ textAlign: "center" }}>Kuota</th><th style={{ textAlign: "center" }}>Pendaftar</th><th>Nominal</th><th>Status</th></tr></thead>
            <tbody>
              {BEASISWA.map((b, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700 }}>{b.nama}</td>
                  <td><Badge tone={b.penyedia === "Pemerintah" ? "blue" : b.penyedia === "Mitra" ? "purple" : "gray"}>{b.penyedia}</Badge></td>
                  <td style={{ textAlign: "center", fontWeight: 700 }}>{b.kuota}</td>
                  <td style={{ textAlign: "center" }}><Badge tone={b.pendaftar > b.kuota ? "amber" : "green"}>{b.pendaftar}</Badge></td>
                  <td style={{ fontSize: 13 }}>{b.nominal}</td>
                  <td><Badge tone={b.status === "Dibuka" ? "green" : "amber"} dot>{b.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KmhsTracer() {
  return (
    <div className="anim-in">
      <PageHead title="Tracer Study & Alumni" desc="Pelacakan lulusan: status kerja, masa tunggu, dan kesesuaian bidang." />
      <div className="card">
        <div className="card-head"><Icon name="userCheck" size={19} style={{ color: "var(--blue)" }} /><h3>Rekap Tracer per Angkatan</h3></div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th style={{ textAlign: "center" }}>Angkatan</th><th style={{ textAlign: "center" }}>Lulus</th><th style={{ textAlign: "center" }}>Terlacak</th><th style={{ textAlign: "center" }}>Bekerja</th><th style={{ textAlign: "center" }}>Lanjut Studi</th><th style={{ textAlign: "center" }}>Wirausaha</th><th style={{ textAlign: "center" }}>Masa Tunggu</th></tr></thead>
            <tbody>
              {TRACER.map((t) => (
                <tr key={t.angkatan}>
                  <td style={{ textAlign: "center", fontWeight: 800, fontFamily: "var(--mono)" }}>{t.angkatan}</td>
                  <td style={{ textAlign: "center" }}>{t.lulus}</td>
                  <td style={{ textAlign: "center" }}><Badge tone="blue">{Math.round(t.terlacak / t.lulus * 100)}%</Badge></td>
                  <td style={{ textAlign: "center", color: "var(--green)", fontWeight: 700 }}>{t.bekerja}</td>
                  <td style={{ textAlign: "center" }}>{t.lanjutStudi}</td>
                  <td style={{ textAlign: "center" }}>{t.wirausaha}</td>
                  <td style={{ textAlign: "center", fontFamily: "var(--mono)" }}>{t.masaTunggu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KmhsKarir() {
  const toast = useToast();
  return (
    <div className="anim-in">
      <PageHead title="Pusat Karir" desc="Lowongan dari mitra perusahaan untuk mahasiswa tingkat akhir & alumni."
        actions={<button className="btn btn-primary" onClick={() => toast("Form lowongan baru dibuka")}><Icon name="plus" size={16} /> Pasang Lowongan</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
        {LOKER.map((l, i) => (
          <div key={i} className="card card-pad">
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: "var(--purple-bg)", color: "var(--purple)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="briefcase" size={22} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 15 }}>{l.posisi}</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{l.perusahaan} · {l.lokasi}</div>
              </div>
              <Badge tone={l.tipe === "Magang" ? "blue" : l.tipe === "Kontrak" ? "amber" : "green"}>{l.tipe}</Badge>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--line)" }}>
              <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}><Icon name="users" size={13} /> {l.pelamar} pelamar</span>
              <button className="btn btn-ghost btn-sm" onClick={() => toast("Daftar pelamar dibuka")}>Kelola</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// AIS — Views: KERJASAMA / PARTNERSHIP (subjek 24)
// Service: par (Partnership)
// ============================================================
const MOU = [
  { mitra: "PT GoTo Gojek Tokopedia", jenis: "MoU", bidang: "Magang & Riset", mulai: "2024", akhir: "2027", status: "aktif", impl: 4 },
  { mitra: "Universiti Teknologi Malaysia", jenis: "MoA", bidang: "Pertukaran & Joint Research", mulai: "2025", akhir: "2028", status: "aktif", impl: 2 },
  { mitra: "BRIN", jenis: "MoU", bidang: "Penelitian", mulai: "2025", akhir: "2028", status: "aktif", impl: 1 },
  { mitra: "Pemprov Jawa Barat", jenis: "MoU", bidang: "KKN & Pengabdian", mulai: "2023", akhir: "2026", status: "berakhir", impl: 6 },
  { mitra: "Bank BSI", jenis: "MoA", bidang: "Beasiswa & Magang", mulai: "2024", akhir: "2026", status: "aktif", impl: 3 },
];
const MOU_TONE = { aktif: ["Aktif", "green"], berakhir: ["Segera Berakhir", "amber"], selesai: ["Selesai", "gray"] };

function KsDashboard({ nav }) {
  const R = AIS_ROLES; const p = R.personas.kerjasama;
  const aktif = MOU.filter((m) => m.status === "aktif").length;
  const tiles = [
    { label: "Total Kerjasama", value: MOU.length, meta: aktif + " aktif", ic: "handshake", c: "var(--blue)", bg: "var(--blue-bg)" },
    { label: "Mitra Dalam Negeri", value: 4, meta: "industri & pemerintah", ic: "building", c: "var(--green)", bg: "var(--green-bg)" },
    { label: "Mitra Luar Negeri", value: 1, meta: "joint research", ic: "link", c: "var(--purple)", bg: "var(--purple-bg)" },
    { label: "Implementasi", value: MOU.reduce((a, b) => a + b.impl, 0), meta: "kegiatan turunan", ic: "check", c: "var(--orange-600)", bg: "var(--orange-50)" },
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="kerjasama" sub="Kelola MoU/MoA, mitra dalam & luar negeri, serta pemantauan implementasi kerjasama."
        action={<button className="btn btn-primary" onClick={() => nav("ks_mou")}><Icon name="handshake" size={17} /> Daftar MoU/MoA</button>} />
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
        <div className="card-head"><Icon name="clock" size={19} style={{ color: "var(--amber)" }} /><h3>Perlu Perhatian</h3></div>
        <div>
          {MOU.filter((m) => m.status === "berakhir").map((m, i, arr) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 22px", borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none" }}>
              <Icon name="flag" size={18} style={{ color: "var(--amber)" }} />
              <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 13.5 }}>{m.mitra}</div><div style={{ fontSize: 12, color: "var(--ink-3)" }}>{m.jenis} · {m.bidang} · berakhir {m.akhir}</div></div>
              <button className="btn btn-soft btn-sm" onClick={() => nav("ks_mou")}>Perpanjang</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KsMou() {
  const [detail, setDetail] = useState<(typeof MOU)[number] | null>(null);
  return (
    <div className="anim-in">
      <PageHead title="MoU / MoA" desc="Nota kesepahaman & perjanjian kerjasama beserta masa berlaku dan implementasinya." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Mitra</th><th>Jenis</th><th>Bidang</th><th style={{ textAlign: "center" }}>Berlaku</th><th style={{ textAlign: "center" }}>Implementasi</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {MOU.map((m, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700 }}>{m.mitra}</td>
                  <td><Badge tone={m.jenis === "MoA" ? "purple" : "blue"}>{m.jenis}</Badge></td>
                  <td style={{ color: "var(--ink-2)" }}>{m.bidang}</td>
                  <td style={{ textAlign: "center", fontFamily: "var(--mono)", fontSize: 12.5 }}>{m.mulai}–{m.akhir}</td>
                  <td style={{ textAlign: "center" }}><Badge tone="gray">{m.impl} kegiatan</Badge></td>
                  <td><Badge tone={MOU_TONE[m.status][1]} dot>{MOU_TONE[m.status][0]}</Badge></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => setDetail(m)}>Detail</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {detail && (
        <Modal title={detail.mitra} subtitle={detail.jenis + " · " + detail.bidang} onClose={() => setDetail(null)}
          footer={<button className="btn btn-ghost" onClick={() => setDetail(null)}>Tutup</button>}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            {[["Jenis", detail.jenis], ["Bidang", detail.bidang], ["Masa Berlaku", detail.mulai + "–" + detail.akhir], ["Implementasi", detail.impl + " kegiatan"]].map(([l, v]) => (
              <div key={l} style={{ padding: 12, background: "var(--surface-2)", borderRadius: 11 }}><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{l}</div><div style={{ fontWeight: 700, fontSize: 13.5, marginTop: 3 }}>{v}</div></div>
            ))}
          </div>
          <div style={{ padding: 13, background: "var(--surface-2)", borderRadius: 12, display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="doc" size={18} style={{ color: "var(--blue)" }} /><span style={{ fontSize: 13, fontWeight: 600 }}>Dokumen perjanjian tersedia (PDF, TTE)</span>
            <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto" }}><Icon name="download" size={14} /> Unduh</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function KsMitra() {
  const mitra = [
    { nama: "PT GoTo", kategori: "Industri", negara: "Indonesia", kerjasama: 1 },
    { nama: "Universiti Teknologi Malaysia", kategori: "Perguruan Tinggi", negara: "Malaysia", kerjasama: 1 },
    { nama: "BRIN", kategori: "Lembaga Riset", negara: "Indonesia", kerjasama: 1 },
    { nama: "Pemprov Jawa Barat", kategori: "Pemerintah", negara: "Indonesia", kerjasama: 1 },
    { nama: "Bank BSI", kategori: "Industri", negara: "Indonesia", kerjasama: 1 },
  ];
  return (
    <div className="anim-in">
      <PageHead title="Mitra" desc="Basis data mitra kerjasama dalam dan luar negeri." />
      <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        {mitra.map((m, i) => (
          <div key={i} className="card card-pad" style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <div style={{ width: 44, height: 44, borderRadius: 13, background: "var(--blue-bg)", color: "var(--blue)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="building" size={21} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 13.5 }}>{m.nama}</div>
              <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{m.kategori} · {m.negara}</div>
            </div>
            <Badge tone={m.negara === "Indonesia" ? "green" : "purple"}>{m.negara === "Indonesia" ? "DN" : "LN"}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

export {
  KmhsDashboard, KmhsOrmawa, KmhsBeasiswa, KmhsTracer, KmhsKarir,
  KsDashboard, KsMou, KsMitra,
};
