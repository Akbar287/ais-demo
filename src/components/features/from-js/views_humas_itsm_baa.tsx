/* eslint-disable */
// @ts-nocheck
// Generated from js/views_humas_itsm_baa.jsx by scripts/port-js-ssot.mjs.
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
// AIS — Views tambahan: HUMAS, ITSM, BAA (lengkapi sesuai Sequence)
// Humas: Pengumuman, Agenda & FAQ, Survei, Broadcast/Kampanye
// ITSM: Katalog Permintaan, Aset TI & Lisensi, Manajemen Perubahan
// BAA: Penjadwalan Terpusat, Kunci Nilai & Transkrip, Yudisium & Ijazah
// ============================================================

/* =====================================================================
   HUMAS
===================================================================== */

// FLOW 1 — Pengumuman (26.1.1) + Agenda (26.1.3) + FAQ (26.1.4)
function HumasPengumuman() {
  const toast = useToast();
  const [tab, setTab] = useState("pengumuman");
  const [peng, setPeng] = useState([
    { id: 1, judul: "Libur Idul Adha 7–11 Juli 2026", target: "Semua", mulai: "01 Jul", akhir: "11 Jul", broadcast: true, status: "Terbit" },
    { id: 2, judul: "Batas Akhir Pembayaran UKT Semester Ganjil", target: "Mahasiswa", mulai: "20 Jun", akhir: "31 Jul", broadcast: true, status: "Terbit" },
    { id: 3, judul: "Rapat Koordinasi Dosen Wali", target: "Dosen", mulai: "28 Jun", akhir: "30 Jun", broadcast: false, status: "Draf" },
  ]);
  const faq = [
    { q: "Bagaimana cara reset password portal?", kat: "Akun", urut: 1 },
    { q: "Kapan jadwal pengisian KRS dibuka?", kat: "Akademik", urut: 2 },
    { q: "Bagaimana prosedur pengajuan cuti akademik?", kat: "Akademik", urut: 3 },
    { q: "Di mana melihat tagihan UKT?", kat: "Keuangan", urut: 4 },
  ];
  const [form, setForm] = useState(false);
  const [nf, setNf] = useState({ judul: "", target: "Semua", broadcast: true });
  function simpan() {
    if (!nf.judul.trim()) { toast("Judul wajib diisi"); return; }
    setPeng((l) => [{ id: Date.now(), judul: nf.judul, target: nf.target, mulai: "05 Jul", akhir: "12 Jul", broadcast: nf.broadcast, status: "Terbit" }, ...l]);
    setForm(false); setNf({ judul: "", target: "Semua", broadcast: true });
    toast(nf.broadcast ? "Pengumuman terbit → broadcast dikirim (ntf)" : "Pengumuman terbit", "ok");
  }
  return (
    <div className="anim-in">
      <PageHead title="Pengumuman, Agenda & FAQ" desc="Konten publik ber-alur draft → publish. Pengumuman penting memicu broadcast; agenda & FAQ tampil di portal (26.1.1/26.1.3/26.1.4)."
        actions={tab === "pengumuman" ? <button className="btn btn-primary" onClick={() => setForm(true)}><Icon name="plus" size={16} /> Buat Pengumuman</button> : null} />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[["pengumuman", "Pengumuman"], ["agenda", "Agenda / Event"], ["faq", "FAQ"]].map(([k, l]) => <button key={k} className={"btn btn-sm " + (tab === k ? "btn-soft" : "btn-ghost")} onClick={() => setTab(k)}>{l}</button>)}
      </div>
      {tab === "pengumuman" && <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th>Judul</th><th>Target</th><th style={{ textAlign: "center" }}>Tayang</th><th style={{ textAlign: "center" }}>Broadcast</th><th>Status</th></tr></thead>
        <tbody>{peng.map((p) => (<tr key={p.id}><td style={{ fontWeight: 700 }}>{p.judul}</td><td><Badge tone="gray">{p.target}</Badge></td><td style={{ textAlign: "center", fontSize: 12.5 }}>{p.mulai}–{p.akhir}</td><td style={{ textAlign: "center" }}>{p.broadcast ? <Icon name="check" size={15} style={{ color: "var(--green)" }} /> : <span style={{ color: "var(--ink-3)" }}>—</span>}</td><td><Badge tone={p.status === "Terbit" ? "green" : "amber"} dot>{p.status}</Badge></td></tr>))}</tbody>
      </table></div></div>}
      {tab === "agenda" && <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
        {window.AIS_CONTENT.events.filter((e) => !e.lampau).slice(0, 6).map((e) => (
          <div key={e.id} className="card card-pad"><div style={{ display: "flex", gap: 10, marginBottom: 8 }}><Icon name="calendar" size={18} style={{ color: "var(--purple)" }} /><Badge tone="purple" style={{ marginLeft: "auto" }}>{e.jenis}</Badge></div><div style={{ fontWeight: 800, fontSize: 14, marginBottom: 6 }}>{e.nama}</div><div style={{ fontSize: 12, color: "var(--ink-3)" }}>{e.tgl} · {e.lokasi}</div></div>
        ))}
      </div>}
      {tab === "faq" && <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th style={{ width: 50, textAlign: "center" }}>#</th><th>Pertanyaan</th><th>Kategori</th><th></th></tr></thead>
        <tbody>{faq.map((f) => (<tr key={f.urut}><td style={{ textAlign: "center", fontFamily: "var(--mono)", color: "var(--ink-3)" }}>{f.urut}</td><td style={{ fontWeight: 700 }}>{f.q}</td><td><Badge tone="gray">{f.kat}</Badge></td><td><button className="btn btn-ghost btn-sm" onClick={() => toast("Editor FAQ dibuka")}><Icon name="edit" size={14} /></button></td></tr>))}</tbody>
      </table></div></div>}
      {form && (
        <Modal title="Buat Pengumuman" subtitle="26.1.1" onClose={() => setForm(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(false)}>Batal</button><button className="btn btn-primary" onClick={simpan}><Icon name="check" size={16} /> Terbitkan</button></>}>
          <div className="field"><label>Judul <span style={{ color: "var(--red)" }}>*</span></label><input value={nf.judul} onChange={(e) => setNf({ ...nf, judul: e.target.value })} placeholder="Judul pengumuman" /></div>
          <div className="field"><label>Target Penerima</label><select value={nf.target} onChange={(e) => setNf({ ...nf, target: e.target.value })}><option>Semua</option><option>Mahasiswa</option><option>Dosen</option><option>Tendik</option></select></div>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}><input type="checkbox" checked={nf.broadcast} onChange={(e) => setNf({ ...nf, broadcast: e.target.checked })} style={{ width: 15, height: 15, accentColor: "var(--orange)" }} /> Kirim broadcast (email/WA/push) saat terbit</label>
        </Modal>
      )}
    </div>
  );
}

// FLOW 2 — Survei Layanan Publik (26.2.3)
function HumasSurvei() {
  const toast = useToast();
  const survei = [
    { nama: "Kepuasan Layanan Akademik", periode: "2025/2026 Ganjil", responden: 1840, indeks: 3.36, status: "Berjalan" },
    { nama: "Kepuasan Layanan Perpustakaan", periode: "2025/2026 Ganjil", responden: 640, indeks: 3.42, status: "Berjalan" },
    { nama: "Survei Layanan PMB", periode: "2026", responden: 2100, indeks: 3.28, status: "Selesai" },
  ];
  const dim = [["Keandalan", 3.4], ["Daya Tanggap", 3.2], ["Jaminan", 3.5], ["Empati", 3.3], ["Bukti Fisik", 3.38]];
  return (
    <div className="anim-in">
      <PageHead title="Survei Layanan Publik" desc="Instrumen survei kepuasan; hasil diagregasi ke indeks kepuasan (dikirim ke qa) (26.2.3)."
        actions={<button className="btn btn-primary" onClick={() => toast("Instrumen survei baru dibuka")}><Icon name="plus" size={16} /> Buat Survei</button>} />
      <div className="grid" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="star" size={19} style={{ color: "var(--orange-600)" }} /><h3>Instrumen & Indeks</h3></div>
          <div style={{ overflowX: "auto" }}><table className="tbl">
            <thead><tr><th>Survei</th><th>Periode</th><th style={{ textAlign: "center" }}>Responden</th><th style={{ textAlign: "center" }}>Indeks</th><th>Status</th></tr></thead>
            <tbody>{survei.map((s, i) => (<tr key={i}><td style={{ fontWeight: 700 }}>{s.nama}</td><td style={{ fontSize: 12.5 }}>{s.periode}</td><td style={{ textAlign: "center" }}>{s.responden.toLocaleString("id")}</td><td style={{ textAlign: "center" }}><Badge tone={s.indeks >= 3.25 ? "green" : "amber"}>{s.indeks.toFixed(2)}</Badge></td><td><Badge tone={s.status === "Selesai" ? "gray" : "green"} dot>{s.status}</Badge></td></tr>))}</tbody>
          </table></div>
        </div>
        <div className="card card-pad" style={{ alignSelf: "start" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}><Icon name="chart" size={17} style={{ color: "var(--blue)" }} /><b style={{ fontSize: 13.5 }}>Dimensi Kepuasan</b></div>
          <div style={{ display: "grid", gap: 12 }}>{dim.map(([l, v]) => (<div key={l}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 4 }}><span style={{ fontWeight: 600 }}>{l}</span><b className="mono">{v.toFixed(2)}</b></div><div className="prog"><i style={{ width: (v / 4 * 100) + "%", background: v >= 3.25 ? "var(--green)" : "var(--amber)" }} /></div></div>))}</div>
        </div>
      </div>
    </div>
  );
}

// FLOW 3 — Broadcast / Kampanye (32.1.6) + delivery log
function HumasBroadcast() {
  const toast = useToast();
  const [rows, setRows] = useState([
    { id: 1, judul: "Info Pembayaran UKT", target: "Mahasiswa Aktif", kanal: "Email + WA", penerima: 12480, terkirim: 12310, dibuka: 8420, status: "selesai" },
    { id: 2, judul: "Undangan Dies Natalis ke-68", target: "Semua Sivitas", kanal: "Email + Push", penerima: 12892, terkirim: 12892, dibuka: 6740, status: "selesai" },
    { id: 3, judul: "Reminder Batas KRS", target: "Mhs belum KRS", kanal: "WA + Push", penerima: 1240, terkirim: 0, dibuka: 0, status: "terjadwal" },
  ]);
  const [form, setForm] = useState(false);
  const [nf, setNf] = useState({ judul: "", target: "Semua Sivitas", email: true, wa: true, push: false });
  function kirim() {
    if (!nf.judul.trim()) { toast("Judul kampanye wajib diisi"); return; }
    const kanal = [nf.email && "Email", nf.wa && "WA", nf.push && "Push"].filter(Boolean).join(" + ");
    setRows((l) => [{ id: Date.now(), judul: nf.judul, target: nf.target, kanal, penerima: 3200, terkirim: 0, dibuka: 0, status: "terjadwal" }, ...l]);
    setForm(false); setNf({ judul: "", target: "Semua Sivitas", email: true, wa: true, push: false });
    toast("Kampanye diantrekan → resolve target & rate-limit per kanal (ntf)", "ok");
  }
  return (
    <div className="anim-in">
      <PageHead title="Broadcast & Kampanye" desc="Kampanye tersegmen (peran/prodi/angkatan) via platform ntf: render template → antrean per kanal → delivery log (32.1.6)."
        actions={<button className="btn btn-primary" onClick={() => setForm(true)}><Icon name="megaphone" size={16} /> Kampanye Baru</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 18 }}>
        {[["Kampanye Bulan Ini", "8", "blue"], ["Total Terkirim", "38,2 rb", "green"], ["Rata Open Rate", "62%", "purple"], ["Antrean Aktif", "1", "amber"]].map(([l, v, t]) => (<div key={l} className="stat card" style={{ background: `var(--${t}-bg)`, border: "none" }}><div className="label" style={{ color: `var(--${t})` }}>{l}</div><div className="value" style={{ color: `var(--${t})`, fontSize: 24 }}>{v}</div></div>))}
      </div>
      <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th>Kampanye</th><th>Target</th><th>Kanal</th><th style={{ textAlign: "center" }}>Penerima</th><th style={{ textAlign: "center" }}>Open Rate</th><th>Status</th></tr></thead>
        <tbody>{rows.map((r) => (<tr key={r.id}><td style={{ fontWeight: 700 }}>{r.judul}</td><td style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{r.target}</td><td style={{ fontSize: 12.5 }}>{r.kanal}</td><td style={{ textAlign: "center" }}>{r.penerima.toLocaleString("id")}</td><td style={{ textAlign: "center" }}>{r.terkirim ? <Badge tone="purple">{Math.round(r.dibuka / r.terkirim * 100)}%</Badge> : <span style={{ color: "var(--ink-3)" }}>—</span>}</td><td><Badge tone={r.status === "selesai" ? "green" : "amber"} dot>{r.status === "selesai" ? "Selesai" : "Terjadwal"}</Badge></td></tr>))}</tbody>
      </table></div></div>
      {form && (
        <Modal title="Kampanye Broadcast Baru" subtitle="32.1.6" onClose={() => setForm(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(false)}>Batal</button><button className="btn btn-primary" onClick={kirim}><Icon name="megaphone" size={16} /> Antrekan Kirim</button></>}>
          <div className="field"><label>Judul Kampanye <span style={{ color: "var(--red)" }}>*</span></label><input value={nf.judul} onChange={(e) => setNf({ ...nf, judul: e.target.value })} placeholder="cth. Info Wisuda Periode II" /></div>
          <div className="field"><label>Segmen Target</label><select value={nf.target} onChange={(e) => setNf({ ...nf, target: e.target.value })}><option>Semua Sivitas</option><option>Mahasiswa Aktif</option><option>Dosen & Tendik</option><option>Alumni</option><option>Angkatan 2026</option></select></div>
          <div className="field" style={{ margin: 0 }}><label>Kanal Pengiriman</label>
            <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
              {[["email", "Email"], ["wa", "WhatsApp"], ["push", "Push"]].map(([k, l]) => (<label key={k} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}><input type="checkbox" checked={nf[k]} onChange={(e) => setNf({ ...nf, [k]: e.target.checked })} style={{ width: 15, height: 15, accentColor: "var(--orange)" }} /> {l}</label>))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* =====================================================================
   ITSM
===================================================================== */

// FLOW 1 — Katalog Permintaan Layanan TI (27.1.2)
function ItsmPermintaan() {
  const toast = useToast();
  const katalog = [
    { nama: "Pembuatan akun email kampus", sla: "1 hari kerja", approval: "Atasan", ic: "mail" },
    { nama: "Akses VPN / jaringan", sla: "2 hari kerja", approval: "Kepala Unit", ic: "shield" },
    { nama: "Instalasi software berlisensi", sla: "3 hari kerja", approval: "TIK", ic: "box" },
    { nama: "Reset & pemulihan akun", sla: "4 jam", approval: "—", ic: "key" },
  ];
  const [rows, setRows] = useState([
    { no: "REQ-2641", jenis: "Akses VPN", pemohon: "Dewi Lestari", tgl: "24 Jun", status: "approval" },
    { no: "REQ-2639", jenis: "Instalasi software", pemohon: "Lab TI", tgl: "23 Jun", status: "proses" },
    { no: "REQ-2637", jenis: "Pembuatan email", pemohon: "Pegawai Baru (3)", tgl: "22 Jun", status: "selesai" },
  ]);
  const st = { approval: ["Menunggu Approval", "amber"], proses: ["Dikerjakan", "blue"], selesai: ["Selesai", "green"] };
  return (
    <div className="anim-in">
      <PageHead title="Katalog Permintaan Layanan" desc="Layanan TI terstandar (katalog) dengan alur persetujuan & SLA — beda dari insiden (27.1.2)." />
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14, marginBottom: 18 }}>
        {katalog.map((k, i) => (
          <div key={i} className="card card-pad" style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: "var(--blue-bg)", color: "var(--blue)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name={k.ic} size={20} /></div>
            <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 700, fontSize: 13 }}>{k.nama}</div><div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>SLA {k.sla} · {k.approval}</div></div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-head"><Icon name="doc" size={19} style={{ color: "var(--blue)" }} /><h3>Permintaan Berjalan</h3></div>
        <div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>No.</th><th>Jenis Layanan</th><th>Pemohon</th><th>Tanggal</th><th>Status</th><th></th></tr></thead>
          <tbody>{rows.map((r) => (<tr key={r.no}><td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{r.no}</td><td style={{ fontWeight: 700 }}>{r.jenis}</td><td style={{ fontSize: 12.5 }}>{r.pemohon}</td><td style={{ fontSize: 12.5 }}>{r.tgl}</td><td><Badge tone={st[r.status][1]} dot>{st[r.status][0]}</Badge></td><td>{r.status !== "selesai" ? <button className="btn btn-soft btn-sm" onClick={() => { setRows((l) => l.map((x) => x.no === r.no ? { ...x, status: x.status === "approval" ? "proses" : "selesai" } : x)); toast("Status permintaan diperbarui", "ok"); }}>{r.status === "approval" ? "Setujui" : "Selesaikan"}</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>✓</span>}</td></tr>))}</tbody>
        </table></div>
      </div>
    </div>
  );
}

// FLOW 1 — Aset TI (27.2.1) + Lisensi Software (27.2.2)
function ItsmAset() {
  const toast = useToast();
  const [tab, setTab] = useState("aset");
  const aset = [
    { kode: "TI-PC-0231", jenis: "PC Desktop", spesifikasi: "Core i7 / 16GB / SSD 512", lokasi: "Lab Komputer 2", pengguna: "—", garansi: "Aktif" },
    { kode: "TI-SRV-0012", jenis: "Server", spesifikasi: "HPE ProLiant DL380", lokasi: "Data Center", pengguna: "Sistem", garansi: "Habis" },
    { kode: "TI-LT-0088", jenis: "Laptop", spesifikasi: "ThinkPad T14 / 16GB", lokasi: "Biro Akademik", pengguna: "Siti Aminah", garansi: "Aktif" },
    { kode: "TI-NET-0045", jenis: "Switch", spesifikasi: "Cisco Catalyst 48-port", lokasi: "IDF Lantai 3", pengguna: "—", garansi: "Aktif" },
  ];
  const lisensi = [
    { nama: "Microsoft 365 Education", jenis: "Volume", jumlah: 500, berakhir: "31 Des 2026", status: "Aktif" },
    { nama: "Adobe Creative Cloud", jenis: "Named User", jumlah: 40, berakhir: "15 Agu 2026", status: "Segera Habis" },
    { nama: "JetBrains All Products", jenis: "Classroom", jumlah: 120, berakhir: "01 Sep 2026", status: "Aktif" },
    { nama: "Antivirus Endpoint", jenis: "Seat", jumlah: 800, berakhir: "10 Jul 2026", status: "Segera Habis" },
  ];
  return (
    <div className="anim-in">
      <PageHead title="Aset TI & Lisensi Software" desc="Inventaris perangkat TI (garansi) dan lisensi software dengan pengingat kedaluwarsa (27.2.1/27.2.2)." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        {[["aset", "Aset TI (Hardware)"], ["lisensi", "Lisensi Software"]].map(([k, l]) => <button key={k} className={"btn btn-sm " + (tab === k ? "btn-soft" : "btn-ghost")} onClick={() => setTab(k)}>{l}</button>)}
      </div>
      {tab === "aset" ? (
        <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>Kode</th><th>Jenis</th><th>Spesifikasi</th><th>Lokasi</th><th>Pengguna</th><th>Garansi</th></tr></thead>
          <tbody>{aset.map((a) => (<tr key={a.kode}><td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{a.kode}</td><td style={{ fontWeight: 700 }}>{a.jenis}</td><td style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{a.spesifikasi}</td><td style={{ fontSize: 12.5 }}>{a.lokasi}</td><td style={{ fontSize: 12.5 }}>{a.pengguna}</td><td><Badge tone={a.garansi === "Aktif" ? "green" : "gray"} dot>{a.garansi}</Badge></td></tr>))}</tbody>
        </table></div></div>
      ) : (
        <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>Software</th><th>Jenis Lisensi</th><th style={{ textAlign: "center" }}>Jumlah</th><th style={{ textAlign: "center" }}>Berakhir</th><th>Status</th><th></th></tr></thead>
          <tbody>{lisensi.map((s, i) => (<tr key={i}><td style={{ fontWeight: 700 }}>{s.nama}</td><td><Badge tone="gray">{s.jenis}</Badge></td><td style={{ textAlign: "center", fontFamily: "var(--mono)" }}>{s.jumlah}</td><td style={{ textAlign: "center", fontSize: 12.5 }}>{s.berakhir}</td><td><Badge tone={s.status === "Aktif" ? "green" : "amber"} dot={s.status !== "Aktif"}>{s.status}</Badge></td><td>{s.status !== "Aktif" ? <button className="btn btn-soft btn-sm" onClick={() => toast("Perpanjangan lisensi diajukan ke pengadaan", "ok")}>Perpanjang</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>—</span>}</td></tr>))}</tbody>
        </table></div></div>
      )}
    </div>
  );
}

// FLOW 1 — Manajemen Perubahan / Change Log (27.2.4)
function ItsmChange() {
  const toast = useToast();
  const [rows, setRows] = useState([
    { no: "CHG-0091", sistem: "SIAKAD", jenis: "Deploy", deskripsi: "Rilis modul KRS waitlist v2.1", oleh: "Tim Backend", risiko: "Sedang", status: "menunggu", jadwal: "06 Jul 02:00" },
    { no: "CHG-0090", sistem: "Payment Gateway", jenis: "Config", deskripsi: "Tambah kanal VA BNI", oleh: "Tim Integrasi", risiko: "Rendah", status: "disetujui", jadwal: "05 Jul 01:00" },
    { no: "CHG-0089", sistem: "Database", jenis: "Maintenance", deskripsi: "Upgrade PostgreSQL 15→16", oleh: "DBA", risiko: "Tinggi", status: "selesai", jadwal: "01 Jul 00:00" },
  ]);
  const rTone = { Tinggi: "red", Sedang: "amber", Rendah: "green" };
  const sTone = { menunggu: ["Menunggu CAB", "amber"], disetujui: ["Disetujui", "blue"], selesai: ["Selesai", "green"] };
  return (
    <div className="anim-in">
      <PageHead title="Manajemen Perubahan (Change)" desc="Setiap perubahan sistem tercatat: pengajuan → persetujuan CAB → jadwal → pelaksanaan (27.2.4)."
        actions={<button className="btn btn-primary" onClick={() => toast("Form Request for Change dibuka")}><Icon name="plus" size={16} /> Ajukan Perubahan</button>} />
      <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th>No.</th><th>Sistem</th><th>Jenis</th><th>Deskripsi</th><th>Risiko</th><th style={{ textAlign: "center" }}>Jadwal</th><th>Status</th><th></th></tr></thead>
        <tbody>{rows.map((r) => (<tr key={r.no}>
          <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{r.no}</td>
          <td style={{ fontWeight: 700 }}>{r.sistem}</td>
          <td><Badge tone="gray">{r.jenis}</Badge></td>
          <td style={{ fontSize: 12.5, color: "var(--ink-2)", maxWidth: 240 }}>{r.deskripsi}</td>
          <td><Badge tone={rTone[r.risiko]} dot={r.risiko === "Tinggi"}>{r.risiko}</Badge></td>
          <td style={{ textAlign: "center", fontSize: 12, fontFamily: "var(--mono)" }}>{r.jadwal}</td>
          <td><Badge tone={sTone[r.status][1]} dot>{sTone[r.status][0]}</Badge></td>
          <td>{r.status === "menunggu" ? <button className="btn btn-soft btn-sm" onClick={() => { setRows((l) => l.map((x) => x.no === r.no ? { ...x, status: "disetujui" } : x)); toast("Perubahan disetujui CAB — terjadwal", "ok"); }}>Setujui</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>—</span>}</td>
        </tr>))}</tbody>
      </table></div></div>
    </div>
  );
}

/* =====================================================================
   BAA (Operator Institusi)
===================================================================== */

// FLOW 4 — Penjadwalan Terpusat (kelas, ruang, slot)
function BaaJadwal() {
  const toast = useToast();
  const [rows, setRows] = useState([
    { kode: "TIF6103-A", mk: "Kecerdasan Buatan", dosen: "Dr. Imam Marzuki", ruang: "FST-301", slot: "Sen 08:00–10:30", kuota: "40/40", bentrok: false },
    { kode: "SIF5102-B", mk: "Basis Data Lanjut", dosen: "Dewi Lestari, M.Kom", ruang: "Lab Komputer 2", slot: "Sel 13:00–15:30", kuota: "35/35", bentrok: false },
    { kode: "TIF6201-A", mk: "Jaringan Komputer", dosen: "Yusuf Ramli, M.Kom", ruang: "FST-301", slot: "Sen 08:00–10:30", kuota: "38/40", bentrok: true },
  ]);
  const [published, setPublished] = useState(false);
  const bentrok = rows.filter((r) => r.bentrok).length;
  return (
    <div className="anim-in">
      <PageHead title="Penjadwalan Terpusat" desc="Generate & publikasi jadwal dengan validasi bentrok global (dosen/ruang/slot) sebelum dibuka ke KRS (FLOW 4)."
        actions={<button className="btn btn-primary" disabled={bentrok > 0 || published} onClick={() => { setPublished(true); toast("Jadwal dipublikasikan → tersedia untuk KRS", "ok"); }}>{published ? "Terpublikasi" : bentrok ? "Selesaikan bentrok dulu" : "Publikasikan Jadwal"}</button>} />
      {bentrok > 0 && <div className="card" style={{ marginBottom: 16, borderLeft: "3px solid var(--red)" }}><div style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 20px" }}><Icon name="warn" size={18} style={{ color: "var(--red)" }} /><span style={{ fontSize: 13.5, fontWeight: 600 }}>{bentrok} bentrok terdeteksi:</span><span style={{ fontSize: 13, color: "var(--ink-2)" }}>ruang & slot sama (FST-301, Sen 08:00)</span></div></div>}
      <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th>Kode Kelas</th><th>Mata Kuliah</th><th>Dosen</th><th>Ruang</th><th>Slot</th><th style={{ textAlign: "center" }}>Kuota</th><th></th></tr></thead>
        <tbody>{rows.map((r) => (<tr key={r.kode} style={{ background: r.bentrok ? "var(--red-bg)" : "transparent" }}>
          <td className="mono" style={{ fontSize: 12, fontWeight: 600 }}>{r.kode}</td>
          <td style={{ fontWeight: 700 }}>{r.mk}</td>
          <td style={{ fontSize: 12.5 }}>{r.dosen}</td>
          <td style={{ fontSize: 12.5 }}>{r.ruang}</td>
          <td style={{ fontSize: 12.5, fontFamily: "var(--mono)" }}>{r.slot}</td>
          <td style={{ textAlign: "center", fontFamily: "var(--mono)" }}>{r.kuota}</td>
          <td>{r.bentrok ? <button className="btn btn-soft btn-sm" onClick={() => { setRows((l) => l.map((x) => x.kode === r.kode ? { ...x, ruang: "FST-305", slot: "Rab 10:30–13:00", bentrok: false } : x)); toast("Slot dialihkan — bentrok teratasi", "ok"); }}>Alihkan</button> : <Badge tone="green" dot>OK</Badge>}</td>
        </tr>))}</tbody>
      </table></div></div>
    </div>
  );
}

// FLOW 7 — Kunci Nilai & Transkrip
function BaaNilai() {
  const toast = useToast();
  const [rows, setRows] = useState([
    { kelas: "TIF6103-A", mk: "Kecerdasan Buatan", dosen: "Dr. Imam Marzuki", input: 40, total: 40, status: "lengkap" },
    { kelas: "SIF5102-B", mk: "Basis Data Lanjut", dosen: "Dewi Lestari", input: 35, total: 35, status: "lengkap" },
    { kelas: "TIF6201-A", mk: "Jaringan Komputer", dosen: "Yusuf Ramli", input: 30, total: 38, status: "belum" },
    { kelas: "ELE4102-A", mk: "Sistem Kendali", dosen: "Bambang Sutejo", input: 0, total: 32, status: "belum" },
  ]);
  const lengkap = rows.filter((r) => r.status === "lengkap").length;
  return (
    <div className="anim-in">
      <PageHead title="Kunci Nilai & Transkrip" desc="Monitoring input nilai per kelas, kunci nilai massal (eskalasi kelas belum input), penerbitan KHS/transkrip resmi (FLOW 7)."
        actions={<button className="btn btn-primary" onClick={() => toast("KHS periode diterbitkan untuk kelas terkunci", "ok")}><Icon name="award" size={16} /> Terbitkan KHS</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)", marginBottom: 18 }}>
        {[["Kelas Lengkap", lengkap + "/" + rows.length, "green"], ["Belum Input", rows.length - lengkap, "amber"], ["Periode", "2025/2026 Genap", "blue"]].map(([l, v, t]) => (<div key={l} className="stat card" style={{ background: `var(--${t}-bg)`, border: "none" }}><div className="label" style={{ color: `var(--${t})` }}>{l}</div><div className="value" style={{ color: `var(--${t})`, fontSize: 22 }}>{v}</div></div>))}
      </div>
      <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th>Kelas</th><th>Mata Kuliah</th><th>Dosen</th><th style={{ textAlign: "center" }}>Input Nilai</th><th>Status</th><th></th></tr></thead>
        <tbody>{rows.map((r) => (<tr key={r.kelas}>
          <td className="mono" style={{ fontSize: 12, fontWeight: 600 }}>{r.kelas}</td>
          <td style={{ fontWeight: 700 }}>{r.mk}</td>
          <td style={{ fontSize: 12.5 }}>{r.dosen}</td>
          <td style={{ textAlign: "center", fontFamily: "var(--mono)" }}>{r.input}/{r.total}</td>
          <td><Badge tone={r.status === "lengkap" ? "green" : "amber"} dot>{r.status === "lengkap" ? "Lengkap" : "Belum"}</Badge></td>
          <td>{r.status === "lengkap" ? <button className="btn btn-soft btn-sm" onClick={() => { setRows((l) => l.map((x) => x.kelas === r.kelas ? { ...x, status: "terkunci" } : x)); toast("Nilai dikunci — tidak dapat diubah dosen", "ok"); }}>Kunci</button> : <button className="btn btn-ghost btn-sm" onClick={() => toast("Pengingat dikirim ke dosen (eskalasi)", "ok")}>Ingatkan</button>}</td>
        </tr>))}</tbody>
      </table></div></div>
    </div>
  );
}

// FLOW 10 — Yudisium & Ijazah
function BaaYudisium() {
  const toast = useToast();
  const [tab, setTab] = useState("yudisium");
  const [cal, setCal] = useState([
    { nim: "11210910000045", nama: "Aisyah Nur Ramadhani", prodi: "Teknik Informatika", ipk: 3.71, sks: 146, clearance: true, status: "layak" },
    { nim: "11210910000033", nama: "Bayu Pratama", prodi: "Teknik Informatika", ipk: 3.12, sks: 144, clearance: true, status: "layak" },
    { nim: "11200910000018", nama: "Dimas Hidayat", prodi: "Teknik Elektro", ipk: 3.30, sks: 148, clearance: false, status: "tertahan" },
  ]);
  const ijazah = [
    { nim: "11210910000052", nama: "Citra Lestari", pin: "PIN-2026-00841", tte: "Tertandatangani", sivil: "Terbit" },
    { nim: "11190910000041", nama: "Joko Prasetyo", pin: "PIN-2026-00840", tte: "Proses TTE", sivil: "—" },
  ];
  return (
    <div className="anim-in">
      <PageHead title="Yudisium & Ijazah" desc="Finalisasi kelayakan yudisium (clearance bebas tanggungan), SK yudisium, PIN batch, dan penerbitan ijazah digital ber-TTE + QR/SIVIL (FLOW 10)." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        {[["yudisium", "Kelayakan Yudisium"], ["ijazah", "Penerbitan Ijazah"]].map(([k, l]) => <button key={k} className={"btn btn-sm " + (tab === k ? "btn-soft" : "btn-ghost")} onClick={() => setTab(k)}>{l}</button>)}
      </div>
      {tab === "yudisium" ? (
        <div className="card">
          <div className="card-pad" style={{ display: "flex", justifyContent: "flex-end", borderBottom: "1px solid var(--line)" }}><button className="btn btn-primary btn-sm" onClick={() => toast("SK Yudisium diterbitkan untuk mahasiswa layak", "ok")}><Icon name="award" size={14} /> Terbitkan SK Yudisium</button></div>
          <div style={{ overflowX: "auto" }}><table className="tbl">
            <thead><tr><th>Mahasiswa</th><th>Prodi</th><th style={{ textAlign: "center" }}>IPK</th><th style={{ textAlign: "center" }}>SKS</th><th style={{ textAlign: "center" }}>Clearance</th><th>Status</th></tr></thead>
            <tbody>{cal.map((c) => (<tr key={c.nim}>
              <td><div style={{ fontWeight: 700 }}>{c.nama}</div><div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{c.nim}</div></td>
              <td style={{ fontSize: 12.5 }}>{c.prodi}</td>
              <td style={{ textAlign: "center", fontFamily: "var(--mono)", fontWeight: 700 }}>{c.ipk.toFixed(2)}</td>
              <td style={{ textAlign: "center", fontFamily: "var(--mono)" }}>{c.sks}</td>
              <td style={{ textAlign: "center" }}>{c.clearance ? <Icon name="check" size={15} style={{ color: "var(--green)" }} /> : <Icon name="warn" size={15} style={{ color: "var(--red)" }} />}</td>
              <td>{c.status === "layak" ? <Badge tone="green" dot>Layak</Badge> : <Badge tone="red" dot>Tertahan (tanggungan)</Badge>}</td>
            </tr>))}</tbody>
          </table></div>
        </div>
      ) : (
        <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>Lulusan</th><th>PIN</th><th>TTE Ijazah</th><th>SIVIL / QR</th><th></th></tr></thead>
          <tbody>{ijazah.map((z) => (<tr key={z.nim}>
            <td><div style={{ fontWeight: 700 }}>{z.nama}</div><div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{z.nim}</div></td>
            <td className="mono" style={{ fontSize: 12 }}>{z.pin}</td>
            <td><Badge tone={z.tte === "Tertandatangani" ? "green" : "amber"} dot>{z.tte}</Badge></td>
            <td>{z.sivil === "Terbit" ? <Badge tone="green">Terbit</Badge> : <span style={{ color: "var(--ink-3)" }}>—</span>}</td>
            <td>{z.tte !== "Tertandatangani" ? <button className="btn btn-soft btn-sm" onClick={() => toast("TTE berantai diproses (BSrE) → SIVIL", "ok")}>Proses TTE</button> : <button className="btn btn-ghost btn-sm"><Icon name="download" size={14} /></button>}</td>
          </tr>))}</tbody>
        </table></div></div>
      )}
    </div>
  );
}

export { HumasPengumuman, HumasSurvei, HumasBroadcast, ItsmPermintaan, ItsmAset, ItsmChange, BaaJadwal, BaaNilai, BaaYudisium };
