import { useState } from "react";
import { Badge, Icon } from "@/components/atoms";
import { Modal, PageHead } from "@/components/molecules";
import { StaffHero, useToast } from "@/components/organisms";
import { AIS_ROLES } from "@/data/roles";
import { formatNumber, rupiah } from "@/lib/format";

// ============================================================
// AIS — Views: PANITIA PMB (Admissions Service)
// Pipeline: daftar → verifikasi → tes → hasil → daftar ulang
// ============================================================

const PMB_PENDAFTAR = [
  { no: "PMB26-00142", nama: "Aulia Rahman", asal: "SMAN 8 Jakarta", pilihan1: "Teknik Informatika", pilihan2: "Sistem Informasi", jalur: "Reguler", tahap: "lulus", skor: 84 },
  { no: "PMB26-00143", nama: "Nabila Syifa", asal: "SMA Labschool", pilihan1: "Sistem Informasi", pilihan2: "Teknik Informatika", jalur: "Prestasi", tahap: "daftarulang", skor: 91 },
  { no: "PMB26-00144", nama: "Reyhan Pratama", asal: "MAN 4 Bogor", pilihan1: "Teknik Informatika", pilihan2: "Teknik Elektro", jalur: "Reguler", tahap: "tes", skor: null },
  { no: "PMB26-00145", nama: "Salwa Kirana", asal: "SMAN 1 Depok", pilihan1: "Teknik Informatika", pilihan2: "Sistem Informasi", jalur: "Reguler", tahap: "verifikasi", skor: null },
  { no: "PMB26-00146", nama: "Daffa Maulana", asal: "SMK Telkom", pilihan1: "Sistem Informasi", pilihan2: "Teknik Informatika", jalur: "Mandiri", tahap: "tidak-lulus", skor: 52 },
  { no: "PMB26-00147", nama: "Kayla Azzahra", asal: "SMAN 70 Jakarta", pilihan1: "Teknik Elektro", pilihan2: "Teknik Informatika", jalur: "Reguler", tahap: "tes", skor: null },
  { no: "PMB26-00148", nama: "Fauzan Akbar", asal: "MAN 2 Tangerang", pilihan1: "Teknik Informatika", pilihan2: "Sistem Informasi", jalur: "Prestasi", tahap: "berkas", skor: null },
];
const PMB_TAHAP = { berkas: ["Pendaftaran", "gray"], verifikasi: ["Verifikasi Berkas", "blue"], tes: ["Terjadwal Tes", "amber"], lulus: ["Lulus", "green"], "tidak-lulus": ["Tidak Lulus", "red"], daftarulang: ["Daftar Ulang", "purple"] };

function PMBDashboard({ nav }) {
  const R = AIS_ROLES; const p = R.personas.pmb;
  const funnel: Array<[string, number, string]> = [["Pendaftar", 3214, "blue"], ["Berkas Terverifikasi", 2890, "purple"], ["Ikut Tes", 2640, "amber"], ["Lulus Seleksi", 980, "green"], ["Daftar Ulang", 742, "orange"]];
  const maxF = funnel[0][1];
  const tiles = [
    { label: "Total Pendaftar", value: "3.214", meta: "TA 2026/2027", ic: "users", c: "var(--green)", bg: "var(--green-bg)" },
    { label: "Terjadwal Tes", value: "2.640", meta: "12 sesi · 4 lokasi", ic: "calendar", c: "var(--amber)", bg: "var(--amber-bg)" },
    { label: "Lulus Seleksi", value: "980", meta: "rasio 1 : 3,3", ic: "award", c: "var(--blue)", bg: "var(--blue-bg)" },
    { label: "Sudah Daftar Ulang", value: "742", meta: "dari 980 (75,7%)", ic: "check", c: "var(--purple)", bg: "var(--purple-bg)" },
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="pmb" sub="Kelola alur penerimaan: pendaftaran, verifikasi berkas, tes, kelulusan, dan daftar ulang."
        action={<button className="btn btn-primary" onClick={() => nav("pmb_pendaftar")}><Icon name="users" size={17} /> Kelola Pendaftar</button>} />
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
        <div className="card-head"><Icon name="chart" size={19} style={{ color: "var(--green)" }} /><h3>Corong Seleksi (Funnel)</h3></div>
        <div className="card-pad" style={{ display: "grid", gap: 14 }}>
          {funnel.map(([l, v, t], i) => (
            <div key={l}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13.5 }}><span style={{ fontWeight: 600 }}>{i + 1}. {l}</span><b className="mono">{formatNumber(v)}</b></div>
              <div className="prog" style={{ height: 22, borderRadius: 9 }}><i style={{ width: (v / maxF * 100) + "%", background: `var(--${t === "orange" ? "orange" : t})`, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 8, fontSize: 11, fontWeight: 700, color: "#fff" }}>{Math.round(v / maxF * 100)}%</i></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PMBPendaftar() {
  const [q, setQ] = useState(""); const [f, setF] = useState("semua"); const [detail, setDetail] = useState<(typeof PMB_PENDAFTAR)[number] | null>(null);
  const toast = useToast();
  const list = PMB_PENDAFTAR.filter((p) => (f === "semua" || p.tahap === f) && (p.nama.toLowerCase().includes(q.toLowerCase()) || p.no.toLowerCase().includes(q.toLowerCase())));
  return (
    <div className="anim-in">
      <PageHead title="Pendaftar" desc="Calon mahasiswa baru dan posisi mereka pada alur seleksi (Admissions Service)." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <div className="tb-search" style={{ margin: 0, width: 280 }}><Icon name="search" size={16} /><input placeholder="Cari nama / no. pendaftaran…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <div className="seg">{[["semua", "Semua"], ["verifikasi", "Verifikasi"], ["tes", "Tes"], ["lulus", "Lulus"], ["daftarulang", "Daftar Ulang"]].map(([k, l]) => <button key={k} className={f === k ? "on" : ""} onClick={() => setF(k)}>{l}</button>)}</div>
        <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--ink-3)" }}>{list.length} pendaftar</span>
      </div>
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>No. Pendaftaran</th><th>Nama</th><th>Asal Sekolah</th><th>Pilihan 1</th><th>Jalur</th><th>Tahap</th><th></th></tr></thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.no}>
                  <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{p.no}</td>
                  <td style={{ fontWeight: 700 }}>{p.nama}</td>
                  <td style={{ color: "var(--ink-2)", fontSize: 13 }}>{p.asal}</td>
                  <td>{p.pilihan1}</td>
                  <td><Badge tone="gray">{p.jalur}</Badge></td>
                  <td><Badge tone={PMB_TAHAP[p.tahap][1]} dot>{PMB_TAHAP[p.tahap][0]}</Badge></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => setDetail(p)}>Detail</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {detail && (
        <Modal title={detail.nama} subtitle={detail.no + " · Jalur " + detail.jalur} onClose={() => setDetail(null)}
          footer={detail.tahap === "verifikasi" ? <><button className="btn btn-ghost" onClick={() => { toast("Berkas dikembalikan"); setDetail(null); }}>Minta Perbaikan</button><button className="btn btn-primary" onClick={() => { toast("Berkas terverifikasi · dijadwalkan tes", "ok"); setDetail(null); }}><Icon name="check" size={16} /> Verifikasi Berkas</button></> : <button className="btn btn-ghost" onClick={() => setDetail(null)}>Tutup</button>}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            {[["Asal Sekolah", detail.asal], ["Pilihan 1", detail.pilihan1], ["Pilihan 2", detail.pilihan2], ["Tahap", PMB_TAHAP[detail.tahap][0]], ["Skor Tes", detail.skor ?? "Belum tes"], ["Jalur", detail.jalur]].map(([l, v]) => (
              <div key={l} style={{ padding: 12, background: "var(--surface-2)", borderRadius: 11 }}><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{l}</div><div style={{ fontWeight: 700, fontSize: 13.5, marginTop: 3 }}>{v}</div></div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 700, marginBottom: 8 }}>BERKAS</div>
          <div style={{ display: "grid", gap: 8 }}>{["Ijazah / SKL", "Rapor Semester 1–5", "Pas Foto", "Kartu Keluarga"].map((b, i) => (<div key={b} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: "var(--surface-2)", borderRadius: 10 }}><Icon name="doc" size={16} style={{ color: "var(--blue)" }} /><span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{b}</span><Badge tone={i === 3 ? "amber" : "green"} dot>{i === 3 ? "Perlu cek" : "Lengkap"}</Badge></div>))}</div>
        </Modal>
      )}
    </div>
  );
}

function PMBTes() {
  const sesi = [
    { tgl: "26 Jun 2026", jam: "08:00", lokasi: "Lab Komputer 1–4", tipe: "CBT", kuota: 240, terisi: 240 },
    { tgl: "26 Jun 2026", jam: "13:00", lokasi: "Lab Komputer 1–4", tipe: "CBT", kuota: 240, terisi: 218 },
    { tgl: "27 Jun 2026", jam: "08:00", lokasi: "Lab Komputer 1–4", tipe: "CBT", kuota: 240, terisi: 240 },
    { tgl: "27 Jun 2026", jam: "13:00", lokasi: "Gedung FST Lt.3", tipe: "Wawancara", kuota: 80, terisi: 64 },
  ];
  return (
    <div className="anim-in">
      <PageHead title="Jadwal & Tes Seleksi" desc="Tes berbasis komputer (CBT) dan wawancara. Kartu peserta terbit otomatis setelah berkas terverifikasi." />
      <div className="grid" style={{ gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
        {sesi.map((s, i) => {
          const penuh = s.terisi >= s.kuota;
          return (
            <div key={i} className="card card-pad">
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 46, height: 46, borderRadius: 13, background: "var(--green-bg)", color: "var(--green)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="calendar" size={22} /></div>
                <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 15 }}>{s.tgl} · {s.jam}</div><div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{s.lokasi}</div></div>
                <Badge tone={s.tipe === "CBT" ? "blue" : "purple"}>{s.tipe}</Badge>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}><span style={{ color: "var(--ink-3)" }}>Kuota peserta</span><b className="mono">{s.terisi}/{s.kuota}</b></div>
              <div className="prog"><i style={{ width: (s.terisi / s.kuota * 100) + "%", background: penuh ? "var(--red)" : "var(--green)" }} /></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PMBHasil() {
  const toast = useToast();
  const [published, setPublished] = useState(false);
  const tested = PMB_PENDAFTAR.filter((p) => p.skor != null);
  return (
    <div className="anim-in">
      <PageHead title="Penilaian & Hasil Seleksi" desc="Rekap skor tes dan penetapan kelulusan. Publikasi mengirim notifikasi & menerbitkan akun calon mahasiswa."
        actions={<button className="btn btn-primary" disabled={published} onClick={() => { setPublished(true); toast("Hasil seleksi dipublikasikan · 980 calon mahasiswa lulus", "ok"); }}><Icon name="bell" size={16} /> {published ? "Sudah Dipublikasi" : "Publikasikan Hasil"}</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)", marginBottom: 20 }}>
        <div className="stat card" style={{ background: "var(--green-bg)", border: "none" }}><div className="label" style={{ color: "var(--green)" }}>Ambang Lulus</div><div className="value" style={{ color: "var(--green)" }}>≥ 65</div><div className="meta" style={{ color: "var(--green)" }}>skor gabungan</div></div>
        <div className="stat card" style={{ background: "var(--blue-bg)", border: "none" }}><div className="label" style={{ color: "var(--blue)" }}>Lulus</div><div className="value" style={{ color: "var(--blue)" }}>980</div><div className="meta" style={{ color: "var(--blue)" }}>dari 2.640 peserta</div></div>
        <div className="stat card" style={{ background: published ? "var(--green-bg)" : "var(--amber-bg)", border: "none" }}><div className="label" style={{ color: published ? "var(--green)" : "#a6760e" }}>Status Publikasi</div><div className="value" style={{ color: published ? "var(--green)" : "#a6760e", fontSize: 22 }}>{published ? "Terbit" : "Draf"}</div></div>
      </div>
      <div className="card">
        <div className="card-head"><Icon name="award" size={19} style={{ color: "var(--blue)" }} /><h3>Rekap Hasil Tes</h3></div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>No. Pendaftaran</th><th>Nama</th><th>Pilihan 1</th><th style={{ textAlign: "center" }}>Skor</th><th>Keputusan</th></tr></thead>
            <tbody>
              {tested.map((p) => (
                <tr key={p.no}>
                  <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{p.no}</td>
                  <td style={{ fontWeight: 700 }}>{p.nama}</td>
                  <td>{p.pilihan1}</td>
                  <td style={{ textAlign: "center", fontWeight: 800, fontFamily: "var(--mono)", color: p.skor >= 65 ? "var(--green)" : "var(--red)" }}>{p.skor}</td>
                  <td><Badge tone={p.skor >= 65 ? "green" : "red"} dot>{p.skor >= 65 ? "Lulus" : "Tidak Lulus"}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PMBDaftarUlang() {
  const toast = useToast();
  const [list, setList] = useState([
    { no: "PMB26-00143", nama: "Nabila Syifa", prodi: "Sistem Informasi", ukt: 5500000, bayar: true, berkas: true, status: "selesai" },
    { no: "PMB26-00142", nama: "Aulia Rahman", prodi: "Teknik Informatika", ukt: 7500000, bayar: true, berkas: false, status: "proses" },
    { no: "PMB26-00151", nama: "Gilang Ramadhan", prodi: "Teknik Informatika", ukt: 7500000, bayar: false, berkas: false, status: "proses" },
  ]);
  function terbitkan(no) { setList((l) => l.map((x) => x.no === no ? { ...x, status: "selesai", bayar: true, berkas: true } : x)); toast("NIM diterbitkan & data dikirim ke Student Service", "ok"); }
  return (
    <div className="anim-in">
      <PageHead title="Daftar Ulang" desc="Calon mahasiswa lulus menyelesaikan pembayaran UKT & berkas. Penyelesaian menerbitkan NIM via Student Service." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>No. Pendaftaran</th><th>Nama</th><th>Prodi Diterima</th><th style={{ textAlign: "right" }}>UKT</th><th style={{ textAlign: "center" }}>Bayar</th><th style={{ textAlign: "center" }}>Berkas</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map((x) => (
                <tr key={x.no}>
                  <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{x.no}</td>
                  <td style={{ fontWeight: 700 }}>{x.nama}</td>
                  <td>{x.prodi}</td>
                  <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{rupiah(x.ukt)}</td>
                  <td style={{ textAlign: "center" }}><Icon name={x.bayar ? "check" : "x"} size={16} style={{ color: x.bayar ? "var(--green)" : "var(--ink-3)" }} /></td>
                  <td style={{ textAlign: "center" }}><Icon name={x.berkas ? "check" : "x"} size={16} style={{ color: x.berkas ? "var(--green)" : "var(--ink-3)" }} /></td>
                  <td><Badge tone={x.status === "selesai" ? "green" : "amber"} dot>{x.status === "selesai" ? "Selesai · ber-NIM" : "Proses"}</Badge></td>
                  <td>{x.status !== "selesai" ? <button className="btn btn-soft btn-sm" disabled={!x.bayar} onClick={() => terbitkan(x.no)}>Terbitkan NIM</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export { PMBDashboard, PMBPendaftar, PMBTes, PMBHasil, PMBDaftarUlang };
