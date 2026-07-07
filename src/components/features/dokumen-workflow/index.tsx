import * as React from "react";
import { useState } from "react";
import { Badge, Icon } from "@/components/atoms";
import { Modal, PageHead } from "@/components/molecules";
import { StaffHero, useToast } from "@/components/organisms";
import { AIS_ROLES } from "@/data/roles";

// ============================================================
// AIS — Views: Dokumen & TTE (33) + Workflow & Persetujuan (34)
// Service: doc (Document & E-Signature), wf (Workflow & Approval)
// ============================================================

// ---------------- Dokumen & TTE ----------------
const DOKUMEN = [
  { kode: "DOC-2026-0451", judul: "SK Pengangkatan Dosen Tetap", jenis: "SK", pemilik: "SDM", tte: "Tertandatangani", tgl: "22 Jun 2026" },
  { kode: "DOC-2026-0450", judul: "Surat Tugas Narasumber Seminar", jenis: "Surat Tugas", pemilik: "TU", tte: "Menunggu TTE", tgl: "22 Jun 2026" },
  { kode: "DOC-2026-0448", judul: "Transkrip Nilai — Aisyah Nur R.", jenis: "Transkrip", pemilik: "BAA", tte: "Tertandatangani", tgl: "21 Jun 2026" },
  { kode: "DOC-2026-0447", judul: "Sertifikat Akreditasi Prodi TI", jenis: "Sertifikat", pemilik: "LPM", tte: "Tertandatangani", tgl: "20 Jun 2026" },
  { kode: "DOC-2026-0445", judul: "Kontrak Pengadaan Server", jenis: "Kontrak", pemilik: "ULP", tte: "Menunggu TTE", tgl: "19 Jun 2026" },
];
const TTE_TONE = { "Tertandatangani": "green", "Menunggu TTE": "amber", "Ditolak": "red" };

function DokDashboard({ nav }) {
  const R = AIS_ROLES; const p = R.personas.dokumen;
  const menungguTTE = DOKUMEN.filter((d) => d.tte === "Menunggu TTE").length;
  const tiles = [
    { label: "Total Dokumen", value: "12.480", meta: "tersimpan", ic: "doc", c: "var(--blue)", bg: "var(--blue-bg)", small: true },
    { label: "Menunggu TTE", value: menungguTTE, meta: "perlu tanda tangan", ic: "signature", c: "var(--amber)", bg: "var(--amber-bg)" },
    { label: "TTE Bulan Ini", value: 184, meta: "tersertifikasi BSrE", ic: "check", c: "var(--green)", bg: "var(--green-bg)" },
    { label: "Verifikasi QR", value: "2,1 rb", meta: "pemindaian publik", ic: "shield", c: "var(--purple)", bg: "var(--purple-bg)" },
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="dokumen" sub="Pusat dokumen digital, tanda tangan elektronik (TTE), dan verifikasi keaslian via QR."
        action={<button className="btn btn-primary" onClick={() => nav("dok_tte")}><Icon name="signature" size={17} /> Antrian TTE</button>} />
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
        <div className="card-head"><Icon name="doc" size={19} style={{ color: "var(--blue)" }} /><h3>Dokumen Terbaru</h3>
          <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("dok_pusat")}>Semua</button></div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Kode</th><th>Judul</th><th>Jenis</th><th>Pemilik</th><th>Status TTE</th></tr></thead>
            <tbody>
              {DOKUMEN.slice(0, 4).map((d) => (
                <tr key={d.kode}><td className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{d.kode}</td><td style={{ fontWeight: 700 }}>{d.judul}</td><td><Badge tone="gray">{d.jenis}</Badge></td><td style={{ fontSize: 13 }}>{d.pemilik}</td><td><Badge tone={TTE_TONE[d.tte]} dot>{d.tte}</Badge></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DokPusat() {
  const [q, setQ] = useState("");
  const list = DOKUMEN.filter((d) => d.judul.toLowerCase().includes(q.toLowerCase()) || d.kode.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="anim-in">
      <PageHead title="Pusat Dokumen" desc="Repositori dokumen resmi terpusat dengan klasifikasi dan jejak versi." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <div className="tb-search" style={{ margin: 0, width: 320 }}><Icon name="search" size={16} /><input placeholder="Cari dokumen / kode…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--ink-3)" }}>{list.length} dari 12.480 dokumen</span>
      </div>
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Kode</th><th>Judul</th><th>Jenis</th><th>Pemilik</th><th>Tanggal</th><th>Status TTE</th><th></th></tr></thead>
            <tbody>
              {list.map((d) => (
                <tr key={d.kode}>
                  <td className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{d.kode}</td>
                  <td style={{ fontWeight: 700 }}>{d.judul}</td>
                  <td><Badge tone="gray">{d.jenis}</Badge></td>
                  <td style={{ fontSize: 13 }}>{d.pemilik}</td>
                  <td style={{ fontSize: 13 }}>{d.tgl}</td>
                  <td><Badge tone={TTE_TONE[d.tte]} dot>{d.tte}</Badge></td>
                  <td><button className="btn btn-ghost btn-sm"><Icon name="download" size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DokTTE() {
  const toast = useToast();
  const [list, setList] = useState(DOKUMEN.filter((d) => d.tte === "Menunggu TTE").map((d) => ({ ...d, done: false })));
  function sign(kode) { setList((l) => l.map((d) => d.kode === kode ? { ...d, done: true } : d)); toast("Dokumen ditandatangani elektronik (TTE BSrE)", "ok"); }
  const pending = list.filter((d) => !d.done);
  return (
    <div className="anim-in">
      <PageHead title="Antrian Tanda Tangan Elektronik" desc="Dokumen menunggu TTE tersertifikasi. Penandatanganan menyematkan QR verifikasi." />
      <div className="grid" style={{ gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
        {pending.length ? pending.map((d) => (
          <div key={d.kode} className="card card-pad">
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: "var(--amber-bg)", color: "#a6760e", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="signature" size={22} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 14.5 }}>{d.judul}</div>
                <div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{d.kode}</div>
              </div>
              <Badge tone="gray">{d.jenis}</Badge>
            </div>
            <div style={{ display: "flex", gap: 9 }}>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => toast("Pratinjau dokumen dibuka")}><Icon name="doc" size={14} /> Tinjau</button>
              <button className="btn btn-primary btn-sm" style={{ flex: 2 }} onClick={() => sign(d.kode)}><Icon name="signature" size={14} /> Tanda Tangani (TTE)</button>
            </div>
          </div>
        )) : <div className="card empty" style={{ gridColumn: "1/-1" }}><Icon name="check" size={32} style={{ color: "var(--green)", marginBottom: 10 }} /><div style={{ fontWeight: 700, color: "var(--ink-2)" }}>Semua dokumen sudah ditandatangani 🎉</div></div>}
      </div>
    </div>
  );
}

function DokVerifikasi() {
  const toast = useToast();
  const [kode, setKode] = useState("");
  const [hasil, setHasil] = useState<(typeof DOKUMEN)[number] | null>(null);
  function cek() {
    const found = DOKUMEN.find((d) => d.kode.toLowerCase() === kode.trim().toLowerCase()) || (kode.trim() ? { kode: kode.trim(), judul: "SK Pengangkatan Dosen Tetap", jenis: "SK", pemilik: "SDM", tte: "Tertandatangani", tgl: "22 Jun 2026" } : null);
    setHasil(found); if (found) toast("Dokumen terverifikasi asli", "ok");
  }
  return (
    <div className="anim-in">
      <PageHead title="Verifikasi Keaslian (QR)" desc="Periksa keaslian dokumen ber-TTE dengan memindai QR atau memasukkan kode dokumen." />
      <div className="grid" style={{ gridTemplateColumns: "360px 1fr" }}>
        <div className="card card-pad" style={{ alignSelf: "start" }}>
          <div style={{ width: "100%", aspectRatio: "1", maxWidth: 200, margin: "0 auto 16px", borderRadius: 16, background: "var(--surface-2)", display: "grid", placeItems: "center", border: "2px dashed var(--line-2)" }}>
            <div style={{ textAlign: "center", color: "var(--ink-3)" }}><Icon name="shield" size={36} /><div style={{ fontSize: 12, marginTop: 8, fontWeight: 600 }}>Pindai QR dokumen</div></div>
          </div>
          <div className="field"><label>Atau masukkan kode dokumen</label><input value={kode} onChange={(e) => setKode(e.target.value)} placeholder="cth. DOC-2026-0451" /></div>
          <button className="btn btn-primary" style={{ width: "100%" }} onClick={cek}><Icon name="check" size={16} /> Verifikasi</button>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="shield" size={19} style={{ color: "var(--green)" }} /><h3>Hasil Verifikasi</h3></div>
          {hasil ? (
            <div className="card-pad">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, padding: 13, background: "var(--green-bg)", borderRadius: 12 }}>
                <Icon name="check" size={20} style={{ color: "var(--green)" }} /><b style={{ color: "var(--green)", fontSize: 14 }}>Dokumen ASLI &amp; sah tertandatangani elektronik</b>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[["Kode", hasil.kode], ["Judul", hasil.judul], ["Jenis", hasil.jenis], ["Penerbit", hasil.pemilik], ["Tanggal", hasil.tgl], ["Status", hasil.tte]].map(([l, v]) => (
                  <div key={l} style={{ padding: 12, background: "var(--surface-2)", borderRadius: 11 }}><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{l}</div><div style={{ fontWeight: 700, fontSize: 13, marginTop: 3 }} className={l === "Kode" ? "mono" : ""}>{v}</div></div>
                ))}
              </div>
            </div>
          ) : <div className="empty" style={{ padding: "48px 24px" }}><Icon name="doc" size={30} style={{ color: "var(--ink-3)", marginBottom: 10 }} /><div style={{ color: "var(--ink-3)", fontSize: 13 }}>Masukkan kode lalu klik Verifikasi.</div></div>}
        </div>
      </div>
    </div>
  );
}

// ---------------- Workflow & Persetujuan ----------------
const APPROVALS = [
  { kode: "WF-3041", proses: "Persetujuan Cuti Akademik", pemohon: "Eka Permata (NIM 11220910000120)", asal: "Student Status", nominal: "—", level: "Kaprodi", prioritas: "sedang", umur: "2 jam" },
  { kode: "WF-3040", proses: "Pencairan Hibah PDP", pemohon: "Bambang Sutejo, M.Kom", asal: "LPPM", nominal: "Rp 19,5 jt", level: "Keuangan", prioritas: "tinggi", umur: "5 jam" },
  { kode: "WF-3039", proses: "Purchase Order Server", pemohon: "Unit Pengadaan", asal: "Procurement", nominal: "Rp 398 jt", level: "Wakil Rektor II", prioritas: "tinggi", umur: "1 hari" },
  { kode: "WF-3038", proses: "Pengajuan Cuti Pegawai", pemohon: "Dewi Lestari, M.Kom", asal: "HR", nominal: "—", level: "Kepala Biro SDM", prioritas: "rendah", umur: "1 hari" },
  { kode: "WF-3037", proses: "Perpanjangan MoU GoTo", pemohon: "Bagian Kerjasama", asal: "Partnership", nominal: "—", level: "Rektor", prioritas: "sedang", umur: "2 hari" },
];
const PRIO_W = { tinggi: "red", sedang: "amber", rendah: "gray" };

function WfDashboard({ nav }) {
  const R = AIS_ROLES; const p = R.personas.workflow;
  const tiles = [
    { label: "Menunggu Persetujuan", value: APPROVALS.length, meta: "lintas modul", ic: "workflow", c: "var(--blue)", bg: "var(--blue-bg)" },
    { label: "Prioritas Tinggi", value: APPROVALS.filter((a) => a.prioritas === "tinggi").length, meta: "perlu segera", ic: "flag", c: "var(--red)", bg: "var(--red-bg)" },
    { label: "Disetujui Hari Ini", value: 38, meta: "rata-rata 3,4 jam", ic: "check", c: "var(--green)", bg: "var(--green-bg)" },
    { label: "Definisi Alur", value: 24, meta: "proses bisnis aktif", ic: "sliders", c: "var(--purple)", bg: "var(--purple-bg)" },
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="workflow" sub="Kotak masuk persetujuan terpusat untuk semua proses bisnis lintas modul."
        action={<button className="btn btn-primary" onClick={() => nav("wf_inbox")}><Icon name="workflow" size={17} /> Kotak Persetujuan</button>} />
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
        <div className="card-head"><Icon name="flag" size={19} style={{ color: "var(--red)" }} /><h3>Persetujuan Prioritas Tinggi</h3>
          <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("wf_inbox")}>Semua</button></div>
        <div>
          {APPROVALS.filter((a) => a.prioritas === "tinggi").map((a, i, arr) => (
            <div key={a.kode} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 22px", borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none" }}>
              <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)", width: 58 }}>{a.kode}</span>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 700, fontSize: 13.5 }}>{a.proses}</div><div style={{ fontSize: 12, color: "var(--ink-3)" }}>{a.pemohon} · {a.asal}{a.nominal !== "—" ? " · " + a.nominal : ""}</div></div>
              <Badge tone="gray">{a.level}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WfInbox() {
  const toast = useToast();
  const [list, setList] = useState(APPROVALS.map((a) => ({ ...a, st: "pending" })));
  const [detail, setDetail] = useState<((typeof APPROVALS)[number] & { st: string }) | null>(null);
  function act(kode, st) { setList((l) => l.map((a) => a.kode === kode ? { ...a, st } : a)); setDetail(null); toast(st === "approved" ? "Disetujui — alur dilanjutkan ke tahap berikutnya" : "Ditolak — dikembalikan ke pemohon", st === "approved" ? "ok" : "err"); }
  const pending = list.filter((a) => a.st === "pending");
  return (
    <div className="anim-in">
      <PageHead title="Kotak Persetujuan" desc="Antrean persetujuan dari seluruh modul (KRS, keuangan, pengadaan, SDM, kerjasama)." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
        <Badge tone="blue" dot>{pending.length} menunggu</Badge>
        <Badge tone="green">{list.filter((a) => a.st === "approved").length} disetujui</Badge>
        <span style={{ marginLeft: "auto", fontSize: 12.5, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 7 }}><Icon name="workflow" size={15} /> Workflow & Approval Service</span>
      </div>
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Kode</th><th>Proses</th><th>Pemohon</th><th>Asal Modul</th><th style={{ textAlign: "right" }}>Nominal</th><th>Tahap</th><th>Prioritas</th><th></th></tr></thead>
            <tbody>
              {list.map((a) => (
                <tr key={a.kode}>
                  <td className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{a.kode}</td>
                  <td style={{ fontWeight: 700 }}>{a.proses}</td>
                  <td style={{ color: "var(--ink-2)", fontSize: 13, maxWidth: 200 }}>{a.pemohon}</td>
                  <td><Badge tone="gray">{a.asal}</Badge></td>
                  <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{a.nominal}</td>
                  <td style={{ fontSize: 12.5 }}>{a.level}</td>
                  <td>{a.st === "pending" ? <Badge tone={PRIO_W[a.prioritas]} dot={a.prioritas === "tinggi"}>{a.prioritas}</Badge> : <Badge tone={a.st === "approved" ? "green" : "red"} dot>{a.st === "approved" ? "Disetujui" : "Ditolak"}</Badge>}</td>
                  <td>{a.st === "pending" ? (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => setDetail(a)}>Tinjau</button>
                      <button className="btn btn-soft btn-sm" onClick={() => act(a.kode, "approved")}><Icon name="check" size={13} /></button>
                    </div>
                  ) : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>{a.umur}</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {detail && (
        <Modal title={detail.proses} subtitle={detail.kode + " · dari " + detail.asal} onClose={() => setDetail(null)}
          footer={<>
            <button className="btn btn-ghost" onClick={() => act(detail.kode, "rejected")}>Tolak</button>
            <button className="btn btn-primary" onClick={() => act(detail.kode, "approved")}><Icon name="check" size={16} /> Setujui</button>
          </>}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            {[["Pemohon", detail.pemohon], ["Asal Modul", detail.asal], ["Nominal", detail.nominal], ["Tahap Persetujuan", detail.level], ["Prioritas", detail.prioritas], ["Umur Permintaan", detail.umur]].map(([l, v]) => (
              <div key={l} style={{ padding: 12, background: "var(--surface-2)", borderRadius: 11 }}><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{l}</div><div style={{ fontWeight: 700, fontSize: 13.5, marginTop: 3 }}>{v}</div></div>
            ))}
          </div>
          <div className="field" style={{ margin: 0 }}><label>Catatan Persetujuan (opsional)</label><textarea rows={2} placeholder="Tambahkan catatan…" /></div>
        </Modal>
      )}
    </div>
  );
}

function WfAlur() {
  const alur = [
    { proses: "Persetujuan KRS", tahap: ["Mahasiswa", "Dosen PA", "Prodi"], svc: "krs" },
    { proses: "Pencairan Hibah", tahap: ["LPPM", "Reviewer", "Keuangan"], svc: "lppm" },
    { proses: "Purchase Order", tahap: ["Unit", "ULP", "Wakil Rektor II"], svc: "pcr" },
    { proses: "Cuti Pegawai", tahap: ["Pegawai", "Atasan", "SDM"], svc: "hr" },
    { proses: "Perpanjangan MoU", tahap: ["Kerjasama", "Wakil Rektor IV", "Rektor"], svc: "par" },
  ];
  return (
    <div className="anim-in">
      <PageHead title="Definisi Alur" desc="Konfigurasi rantai persetujuan tiap proses bisnis (BPMN sederhana)." />
      <div className="grid" style={{ gridTemplateColumns: "1fr", gap: 12 }}>
        {alur.map((a, i) => (
          <div key={i} className="card card-pad">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <Icon name="workflow" size={18} style={{ color: "var(--purple)" }} />
              <b style={{ fontSize: 14.5 }}>{a.proses}</b>
              <Badge tone="gray" style={{ marginLeft: "auto" }}><span className="mono">{a.svc}</span></Badge>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" }}>
              {a.tahap.map((t, j) => (
                <React.Fragment key={j}>
                  <div style={{ padding: "8px 14px", borderRadius: 10, background: "var(--surface-2)", fontWeight: 700, fontSize: 13 }}>{t}</div>
                  {j < a.tahap.length - 1 && <div style={{ padding: "0 8px", color: "var(--ink-3)" }}><Icon name="chevR" size={16} /></div>}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export {
  DokDashboard, DokPusat, DokTTE, DokVerifikasi,
  WfDashboard, WfInbox, WfAlur,
};
