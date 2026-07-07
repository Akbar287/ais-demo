// ============================================================
// AIS — Views: Administrator Sistem tambahan — Sequence-Admin-Sistem
// Melengkapi admin dasar: Keamanan & Sesi (iam), Workflow Engine (wf),
// Parameter/Feature-flag/Penomoran/Scheduler (cfg), Notifikasi (ntf),
// Integrasi & API (intg), Pelaporan PDDikti (fdr)
// ============================================================

// ---------- FLOW 2: Keamanan & Sesi (iam) ----------
function AdminSecurity() {
  const toast = useToast();
  const [tab, setTab] = useState("policy");
  const [mfa, setMfa] = useState({ admin: true, keuangan: true, dosen: false, mahasiswa: false });
  const sesi = [
    { user: "admin.sistem", ip: "10.10.2.15", device: "Chrome · Windows", aktif: "baru saja", status: "aktif" },
    { user: "hesti.akuntansi", ip: "10.10.4.22", device: "Edge · Windows", aktif: "3 mnt lalu", status: "aktif" },
    { user: "imam.marzuki", ip: "182.1.x.x", device: "Safari · iOS", aktif: "20 mnt lalu", status: "aktif" },
  ];
  const attempts = [
    { user: "unknown", ip: "45.9.x.x", waktu: "09:41", hasil: "gagal", alasan: "Password salah (5×)" },
    { user: "bayu.pratama", ip: "182.1.x.x", waktu: "08:22", hasil: "sukses", alasan: "—" },
    { user: "unknown", ip: "103.x.x.x", waktu: "07:55", hasil: "gagal", alasan: "Akun terkunci" },
  ];
  const ipList = [["10.10.0.0/16", "Jaringan Kampus", "Endpoint sensitif"], ["182.1.10.0/24", "VPN Pegawai", "Semua"]];
  return (
    <div className="anim-in">
      <PageHead title="Keamanan & Sesi" desc="Kebijakan kata sandi, MFA per peran, IP allowlist, sesi aktif, dan riwayat percobaan login (subjek 30 — IAM)." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[["policy", "Password & MFA"], ["ip", "IP Allowlist"], ["sesi", "Sesi Aktif"], ["attempt", "Percobaan Login"]].map(([k, l]) => <button key={k} className={"btn btn-sm " + (tab === k ? "btn-soft" : "btn-ghost")} onClick={() => setTab(k)}>{l}</button>)}
      </div>
      {tab === "policy" && (
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="card card-pad" style={{ alignSelf: "start" }}>
            <b style={{ fontSize: 14, display: "block", marginBottom: 14 }}>Kebijakan Kata Sandi</b>
            {[["Panjang minimum", "12 karakter"], ["Wajib huruf besar & angka", "Ya"], ["Wajib simbol", "Ya"], ["Riwayat (tidak boleh sama)", "5 terakhir"], ["Kedaluwarsa", "90 hari"], ["Lockout setelah", "5 percobaan"]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--line)", fontSize: 13.5 }}><span style={{ color: "var(--ink-2)" }}>{l}</span><b>{v}</b></div>
            ))}
            <button className="btn btn-soft btn-sm" style={{ marginTop: 14 }} onClick={() => toast("Kebijakan kata sandi disimpan", "ok")}><Icon name="check" size={14} /> Simpan Kebijakan</button>
          </div>
          <div className="card card-pad" style={{ alignSelf: "start" }}>
            <b style={{ fontSize: 14, display: "block", marginBottom: 14 }}>MFA Wajib per Peran</b>
            {Object.keys(mfa).map((r) => (
              <div key={r} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                <span style={{ fontSize: 13.5, fontWeight: 600, textTransform: "capitalize" }}>{r}</span>
                <button onClick={() => { setMfa((m) => ({ ...m, [r]: !m[r] })); toast("MFA " + r + (!mfa[r] ? " diaktifkan" : " dinonaktifkan"), "ok"); }} style={{ width: 44, height: 25, borderRadius: 999, border: "none", cursor: "pointer", background: mfa[r] ? "var(--green)" : "var(--line-2)", position: "relative", transition: "background .18s" }}><span style={{ position: "absolute", top: 3, left: mfa[r] ? 22 : 3, width: 19, height: 19, borderRadius: "50%", background: "#fff", transition: "left .18s" }} /></button>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab === "ip" && <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl"><thead><tr><th>Rentang IP</th><th>Keterangan</th><th>Berlaku untuk</th><th>Status</th></tr></thead><tbody>{ipList.map(([ip, ket, ap], i) => (<tr key={i}><td className="mono" style={{ fontWeight: 600 }}>{ip}</td><td>{ket}</td><td style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{ap}</td><td><Badge tone="green" dot>Aktif</Badge></td></tr>))}</tbody></table></div></div>}
      {tab === "sesi" && <div className="card">
        <div className="card-pad" style={{ display: "flex", justifyContent: "flex-end", borderBottom: "1px solid var(--line)" }}><button className="btn btn-ghost btn-sm" style={{ color: "var(--red)" }} onClick={() => toast("Semua sesi dicabut (revoke-all) — insiden tercatat di audit", "")}><Icon name="lock" size={14} /> Cabut Semua Sesi</button></div>
        <div style={{ overflowX: "auto" }}><table className="tbl"><thead><tr><th>Pengguna</th><th>IP</th><th>Perangkat</th><th>Aktivitas</th><th></th></tr></thead><tbody>{sesi.map((s, i) => (<tr key={i}><td style={{ fontWeight: 700 }} className="mono">{s.user}</td><td className="mono" style={{ fontSize: 12 }}>{s.ip}</td><td style={{ fontSize: 12.5 }}>{s.device}</td><td style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{s.aktif}</td><td><button className="btn btn-ghost btn-sm" onClick={() => toast("Sesi dicabut", "ok")}>Cabut</button></td></tr>))}</tbody></table></div>
      </div>}
      {tab === "attempt" && <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl"><thead><tr><th>Pengguna</th><th>IP</th><th>Waktu</th><th>Hasil</th><th>Keterangan</th></tr></thead><tbody>{attempts.map((a, i) => (<tr key={i}><td className="mono" style={{ fontSize: 12.5 }}>{a.user}</td><td className="mono" style={{ fontSize: 12 }}>{a.ip}</td><td style={{ fontSize: 12.5 }}>{a.waktu}</td><td><Badge tone={a.hasil === "sukses" ? "green" : "red"} dot>{a.hasil}</Badge></td><td style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{a.alasan}</td></tr>))}</tbody></table></div></div>}
    </div>
  );
}

// ---------- FLOW 4: Workflow Engine (wf) ----------
function AdminWorkflow() {
  const toast = useToast();
  const def = [
    { kode: "WF-CUTI", nama: "Cuti Pegawai", modul: "SDM", langkah: 3, sla: "48 jam", versi: "2.1", aktif: true },
    { kode: "WF-RKAT", nama: "Revisi Anggaran (RKAT)", modul: "Keuangan", langkah: 4, sla: "72 jam", versi: "1.3", aktif: true },
    { kode: "WF-PO", nama: "Purchase Order", modul: "Pengadaan", langkah: 4, sla: "48 jam", versi: "3.0", aktif: true },
    { kode: "WF-KRS", nama: "Persetujuan KRS", modul: "Akademik", langkah: 2, sla: "120 jam", versi: "1.0", aktif: true },
    { kode: "WF-PPID", nama: "Permohonan Informasi (PPID)", modul: "Humas", langkah: 3, sla: "10 hari", versi: "1.1", aktif: false },
  ];
  const inst = [
    { id: "INS-3041", def: "Cuti Pegawai", pemohon: "Dewi Lestari", tahap: "Kepala Biro SDM", umur: "5 jam", sla: "ok" },
    { id: "INS-3040", def: "Purchase Order", pemohon: "Unit Pengadaan", tahap: "Wakil Rektor II", umur: "51 jam", sla: "warn" },
    { id: "INS-3037", def: "Revisi Anggaran", pemohon: "Bagian Keuangan", tahap: "Rektor", umur: "80 jam", sla: "over" },
  ];
  const slaTone = { ok: ["Dalam SLA", "green"], warn: ["Mendekati SLA", "amber"], over: ["Lewat SLA", "red"] };
  return (
    <div className="anim-in">
      <PageHead title="Workflow & Persetujuan (Engine)" desc="Definisi alur per jenis proses (langkah, peran, routing kondisi, SLA) dan pemantauan instance berjalan + eskalasi (subjek 34)."
        actions={<button className="btn btn-primary" onClick={() => toast("Editor definisi workflow dibuka")}><Icon name="plus" size={16} /> Definisi Baru</button>} />
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-head"><Icon name="workflow" size={19} style={{ color: "var(--purple)" }} /><h3>Definisi Workflow</h3></div>
        <div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>Kode</th><th>Proses</th><th>Modul</th><th style={{ textAlign: "center" }}>Langkah</th><th style={{ textAlign: "center" }}>SLA</th><th style={{ textAlign: "center" }}>Versi</th><th>Status</th></tr></thead>
          <tbody>{def.map((d) => (<tr key={d.kode}><td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{d.kode}</td><td style={{ fontWeight: 700 }}>{d.nama}</td><td><Badge tone="gray">{d.modul}</Badge></td><td style={{ textAlign: "center" }}>{d.langkah}</td><td style={{ textAlign: "center", fontSize: 12.5 }}>{d.sla}</td><td style={{ textAlign: "center", fontFamily: "var(--mono)" }}>{d.versi}</td><td><Badge tone={d.aktif ? "green" : "gray"} dot>{d.aktif ? "Aktif" : "Nonaktif"}</Badge></td></tr>))}</tbody>
        </table></div>
      </div>
      <div className="card">
        <div className="card-head"><Icon name="activity" size={19} style={{ color: "var(--blue)" }} /><h3>Instance Berjalan & SLA</h3></div>
        <div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>Instance</th><th>Proses</th><th>Pemohon</th><th>Tahap Kini</th><th style={{ textAlign: "center" }}>Umur</th><th>SLA</th><th></th></tr></thead>
          <tbody>{inst.map((x) => (<tr key={x.id}><td className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{x.id}</td><td style={{ fontWeight: 700 }}>{x.def}</td><td style={{ fontSize: 12.5 }}>{x.pemohon}</td><td style={{ fontSize: 12.5 }}>{x.tahap}</td><td style={{ textAlign: "center", fontFamily: "var(--mono)" }}>{x.umur}</td><td><Badge tone={slaTone[x.sla][1]} dot={x.sla !== "ok"}>{slaTone[x.sla][0]}</Badge></td><td>{x.sla === "over" ? <button className="btn btn-soft btn-sm" onClick={() => toast("Eskalasi dikirim ke atasan + notifikasi", "ok")}>Eskalasi</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>—</span>}</td></tr>))}</tbody>
        </table></div>
      </div>
    </div>
  );
}

// ---------- FLOW 5: Konfigurasi, Feature Flag, Penomoran, Scheduler (cfg) ----------
function AdminConfig() {
  const toast = useToast();
  const [tab, setTab] = useState("setting");
  const [flags, setFlags] = useState([
    { code: "krs_waitlist", nama: "Waitlist Kelas Otomatis", on: true, rollout: 100 },
    { code: "payment_qris", nama: "Pembayaran QRIS", on: true, rollout: 100 },
    { code: "new_dashboard", nama: "Dashboard Eksekutif Baru", on: false, rollout: 25 },
    { code: "ai_advisor", nama: "AI Academic Advisor (beta)", on: false, rollout: 5 },
  ]);
  const setting = [["akademik.krs.maks_sks", "24", "Batas SKS per semester"], ["keuangan.tenggat_bayar", "14", "Hari tenggat pembayaran"], ["umum.zona_waktu", "Asia/Jakarta", "Zona waktu institusi"], ["sesi.timeout_menit", "30", "Timeout sesi idle"]];
  const seq = [["NIM", "{prodi}{YY}{####}", "11210910000045", "Per angkatan"], ["SURAT", "{no}/UN/{RM}/{YYYY}", "0451/UN/VII/2026", "Per tahun"], ["SK", "SK-{####}/{YYYY}", "SK-0231/2026", "Per tahun"]];
  const jobs = [["sync-pddikti", "0 2 * * *", "Sinkron AKM ke Feeder", "02:00", "sukses"], ["backup-db", "0 1 * * *", "Backup harian database", "01:00", "sukses"], ["reminder-ukt", "0 8 * * 1", "Pengingat tagihan UKT", "Sen 08:00", "sukses"], ["kontrak-h60", "0 6 * * *", "Cek kontrak H-60", "06:00", "gagal"]];
  return (
    <div className="anim-in">
      <PageHead title="Parameter, Flag & Penjadwalan" desc="System setting, feature flag (rollout bertahap), penomoran resmi (NIM/surat/SK), dan scheduled job terpusat (subjek 36 — cfg)." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[["setting", "Parameter Sistem"], ["flag", "Feature Flag"], ["seq", "Penomoran"], ["job", "Scheduled Job"]].map(([k, l]) => <button key={k} className={"btn btn-sm " + (tab === k ? "btn-soft" : "btn-ghost")} onClick={() => setTab(k)}>{l}</button>)}
      </div>
      {tab === "setting" && <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl"><thead><tr><th>Key</th><th>Nilai</th><th>Keterangan</th><th></th></tr></thead><tbody>{setting.map(([k, v, d], i) => (<tr key={i}><td className="mono" style={{ fontSize: 12, color: "var(--blue)" }}>{k}</td><td style={{ fontWeight: 700, fontFamily: "var(--mono)" }}>{v}</td><td style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{d}</td><td><button className="btn btn-ghost btn-sm" onClick={() => toast("Parameter " + k + " diperbarui → event cfg.parameter.diperbarui", "ok")}><Icon name="edit" size={14} /></button></td></tr>))}</tbody></table></div></div>}
      {tab === "flag" && <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl"><thead><tr><th>Kode</th><th>Fitur</th><th style={{ textAlign: "center" }}>Rollout</th><th>Status</th><th></th></tr></thead><tbody>{flags.map((f, i) => (<tr key={f.code}><td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{f.code}</td><td style={{ fontWeight: 700 }}>{f.nama}</td><td style={{ textAlign: "center" }}><span className="mono">{f.rollout}%</span></td><td><Badge tone={f.on ? "green" : "gray"} dot>{f.on ? "Aktif" : "Nonaktif"}</Badge></td><td><button className="btn btn-ghost btn-sm" onClick={() => { setFlags((l) => l.map((x, j) => j === i ? { ...x, on: !x.on } : x)); toast("Flag " + f.code + " di-toggle", "ok"); }}>{f.on ? "Matikan" : "Nyalakan"}</button></td></tr>))}</tbody></table></div></div>}
      {tab === "seq" && <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl"><thead><tr><th>Tipe</th><th>Format</th><th>Contoh</th><th>Reset</th></tr></thead><tbody>{seq.map(([t, f, c, r], i) => (<tr key={i}><td><Badge tone="purple">{t}</Badge></td><td className="mono" style={{ fontSize: 12 }}>{f}</td><td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{c}</td><td style={{ fontSize: 12.5 }}>{r}</td></tr>))}</tbody></table></div></div>}
      {tab === "job" && <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl"><thead><tr><th>Job</th><th>Cron</th><th>Deskripsi</th><th style={{ textAlign: "center" }}>Jadwal</th><th>Eksekusi Terakhir</th><th></th></tr></thead><tbody>{jobs.map(([code, cron, desc, next, st], i) => (<tr key={i}><td className="mono" style={{ fontSize: 12, fontWeight: 600 }}>{code}</td><td className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{cron}</td><td style={{ fontSize: 12.5 }}>{desc}</td><td style={{ textAlign: "center", fontSize: 12 }}>{next}</td><td><Badge tone={st === "sukses" ? "green" : "red"} dot>{st === "sukses" ? "Sukses" : "Gagal"}</Badge></td><td><button className="btn btn-ghost btn-sm" onClick={() => toast("Job dijalankan manual", "ok")}><Icon name="play" size={13} /></button></td></tr>))}</tbody></table></div></div>}
    </div>
  );
}

// ---------- FLOW 6: Notifikasi (ntf) ----------
function AdminNotif() {
  const toast = useToast();
  const channels = [
    { kanal: "Email (SMTP)", provider: "Postfix Relay", rate: "500/mnt", status: true },
    { kanal: "WhatsApp", provider: "WA Business API", rate: "80/mnt", status: true },
    { kanal: "Push (Mobile)", provider: "Firebase FCM", rate: "1000/mnt", status: true },
    { kanal: "SMS", provider: "Zenziva", rate: "60/mnt", status: false },
  ];
  const tpl = [
    { kode: "TAGIHAN_TERBIT", kanal: "Email + WA", subjek: "Tagihan UKT periode baru", versi: "3" },
    { kode: "KRS_DISETUJUI", kanal: "Push + Email", subjek: "KRS Anda telah disetujui", versi: "2" },
    { kode: "SIDANG_JADWAL", kanal: "Email", subjek: "Jadwal sidang tugas akhir", versi: "1" },
  ];
  return (
    <div className="anim-in">
      <PageHead title="Notifikasi (Konfigurasi)" desc="Konfigurasi kanal (SMTP/WA/push/SMS) + rate limit, dan template pesan ber-versi dengan uji kirim (subjek 32 — ntf)." />
      <div className="grid" style={{ gridTemplateColumns: "1fr 1.2fr", gap: 16 }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="bell" size={19} style={{ color: "var(--orange-600)" }} /><h3>Kanal</h3></div>
          <div>{channels.map((c, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: i < channels.length - 1 ? "1px solid var(--line)" : "none" }}><span className="dot" style={{ background: c.status ? "var(--green)" : "var(--ink-3)", width: 9, height: 9 }} /><div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 13.5 }}>{c.kanal}</div><div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{c.provider} · {c.rate}</div></div><Badge tone={c.status ? "green" : "gray"} dot>{c.status ? "Aktif" : "Nonaktif"}</Badge></div>))}</div>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="doc" size={19} style={{ color: "var(--blue)" }} /><h3>Template Pesan</h3><button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => toast("Editor template dibuka")}><Icon name="plus" size={13} /> Baru</button></div>
          <div style={{ overflowX: "auto" }}><table className="tbl"><thead><tr><th>Kode</th><th>Subjek</th><th>Kanal</th><th style={{ textAlign: "center" }}>v</th><th></th></tr></thead><tbody>{tpl.map((t) => (<tr key={t.kode}><td className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{t.kode}</td><td style={{ fontWeight: 700 }}>{t.subjek}</td><td style={{ fontSize: 12 }}>{t.kanal}</td><td style={{ textAlign: "center", fontFamily: "var(--mono)" }}>{t.versi}</td><td><button className="btn btn-ghost btn-sm" onClick={() => toast("Uji kirim ke sandbox terkirim", "ok")}>Uji Kirim</button></td></tr>))}</tbody></table></div>
        </div>
      </div>
    </div>
  );
}

// ---------- FLOW 8: Integrasi & API (intg) ----------
function AdminIntegration() {
  const toast = useToast();
  const [tab, setTab] = useState("ext");
  const ext = [
    { kode: "PDDIKTI", nama: "Neo Feeder PDDikti", tipe: "SOAP/REST", status: "terhubung", cb: "closed" },
    { kode: "BSRE", nama: "BSrE (TTE)", tipe: "REST", status: "terhubung", cb: "closed" },
    { kode: "TURNITIN", nama: "Turnitin", tipe: "REST", status: "terhubung", cb: "half" },
    { kode: "PG_BANK", nama: "Payment Gateway", tipe: "REST/Webhook", status: "terhubung", cb: "closed" },
    { kode: "SISTER", nama: "SISTER Kemdikbud", tipe: "REST", status: "gangguan", cb: "open" },
  ];
  const clients = [
    { nama: "Mobile App Mahasiswa", id: "cli_mhs_9f2a", rate: "5000/hari", status: "aktif" },
    { nama: "Portal Alumni", id: "cli_alm_71bc", rate: "2000/hari", status: "aktif" },
    { nama: "Dashboard Yayasan", id: "cli_ysn_33de", rate: "1000/hari", status: "pending" },
  ];
  const cbTone = { closed: ["Normal", "green"], half: ["Half-Open", "amber"], open: ["Terbuka (fault)", "red"] };
  return (
    <div className="anim-in">
      <PageHead title="Integrasi & API" desc="Registry sistem eksternal (circuit breaker, rotasi kredensial) dan API client pihak ketiga (persetujuan, kuota, rate limit) — subjek 35 (intg)." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        {[["ext", "Sistem Eksternal"], ["client", "API Client"]].map(([k, l]) => <button key={k} className={"btn btn-sm " + (tab === k ? "btn-soft" : "btn-ghost")} onClick={() => setTab(k)}>{l}</button>)}
      </div>
      {tab === "ext" ? (
        <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>Kode</th><th>Sistem</th><th>Tipe</th><th>Koneksi</th><th style={{ textAlign: "center" }}>Circuit Breaker</th><th></th></tr></thead>
          <tbody>{ext.map((e) => (<tr key={e.kode}><td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{e.kode}</td><td style={{ fontWeight: 700 }}>{e.nama}</td><td style={{ fontSize: 12 }}>{e.tipe}</td><td><Badge tone={e.status === "terhubung" ? "green" : "red"} dot>{e.status === "terhubung" ? "Terhubung" : "Gangguan"}</Badge></td><td style={{ textAlign: "center" }}><Badge tone={cbTone[e.cb][1]} dot={e.cb !== "closed"}>{cbTone[e.cb][0]}</Badge></td><td><button className="btn btn-ghost btn-sm" onClick={() => toast("Kredensial " + e.kode + " dirotasi", "ok")}>Rotasi Kunci</button></td></tr>))}</tbody>
        </table></div></div>
      ) : (
        <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>Aplikasi Klien</th><th>Client ID</th><th style={{ textAlign: "center" }}>Kuota</th><th>Status</th><th></th></tr></thead>
          <tbody>{clients.map((c) => (<tr key={c.id}><td style={{ fontWeight: 700 }}>{c.nama}</td><td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{c.id}</td><td style={{ textAlign: "center", fontSize: 12.5 }}>{c.rate}</td><td><Badge tone={c.status === "aktif" ? "green" : "amber"} dot>{c.status === "aktif" ? "Aktif" : "Menunggu"}</Badge></td><td>{c.status === "pending" ? <button className="btn btn-soft btn-sm" onClick={() => toast("API client disetujui + kuota diberikan", "ok")}>Setujui</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>—</span>}</td></tr>))}</tbody>
        </table></div></div>
      )}
    </div>
  );
}

// ---------- FLOW 10: Pelaporan PDDikti — Mapping & Sinkron (fdr) ----------
function AdminFeeder() {
  const toast = useToast();
  const mapping = [
    { entitas: "Mahasiswa", feeder: "mahasiswa", fields: 24, versi: "Feeder 3.1", status: "ok" },
    { entitas: "AKM (Aktivitas Kuliah)", feeder: "akm", fields: 8, versi: "Feeder 3.1", status: "ok" },
    { entitas: "Nilai", feeder: "nilai_transkrip", fields: 6, versi: "Feeder 3.1", status: "ok" },
    { entitas: "Dosen Pengampu", feeder: "ajar_dosen", fields: 7, versi: "Feeder 3.1", status: "warn" },
  ];
  const selisih = [
    { entitas: "Nilai", record: "TIF6103 · 11210910000033", siakad: "A", feeder: "(kosong)", jenis: "Belum tersinkron" },
    { entitas: "Mahasiswa", record: "11220910000155", siakad: "AKTIF", feeder: "CUTI", jenis: "Beda status" },
  ];
  return (
    <div className="anim-in">
      <PageHead title="Pelaporan PDDikti — Mapping & Sinkron" desc="Mapping SIAKAD↔Feeder per entitas, jadwal batch, dan rekonsiliasi selisih data (subjek 11 — fdr)."
        actions={<button className="btn btn-primary" onClick={() => toast("Sinkronisasi batch ke Neo Feeder dimulai", "ok")}><Icon name="refresh" size={16} /> Jalankan Sinkron</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 18 }}>
        {[["Sinkron Terakhir", "09:58", "green"], ["Record Terkirim", "12.480", "blue"], ["Selisih Data", selisih.length, "amber"], ["Kelengkapan", "98,7%", "purple"]].map(([l, v, t]) => (<div key={l} className="stat card" style={{ background: `var(--${t}-bg)`, border: "none" }}><div className="label" style={{ color: `var(--${t})` }}>{l}</div><div className="value" style={{ color: `var(--${t})`, fontSize: 24 }}>{v}</div></div>))}
      </div>
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-head"><Icon name="link" size={19} style={{ color: "var(--blue)" }} /><h3>Mapping Format Feeder</h3></div>
        <div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>Entitas Lokal</th><th>Tabel Feeder</th><th style={{ textAlign: "center" }}>Field</th><th>Versi</th><th>Status</th><th></th></tr></thead>
          <tbody>{mapping.map((m, i) => (<tr key={i}><td style={{ fontWeight: 700 }}>{m.entitas}</td><td className="mono" style={{ fontSize: 12 }}>{m.feeder}</td><td style={{ textAlign: "center" }}>{m.fields}</td><td style={{ fontSize: 12.5 }}>{m.versi}</td><td><Badge tone={m.status === "ok" ? "green" : "amber"} dot>{m.status === "ok" ? "Valid" : "Perlu Cek"}</Badge></td><td><button className="btn btn-ghost btn-sm" onClick={() => toast("Editor mapping dibuka")}><Icon name="edit" size={14} /></button></td></tr>))}</tbody>
        </table></div>
      </div>
      <div className="card">
        <div className="card-head"><Icon name="flag" size={19} style={{ color: "var(--amber)" }} /><h3>Rekonsiliasi Selisih</h3></div>
        <div style={{ overflowX: "auto" }}><table className="tbl">
          <thead><tr><th>Entitas</th><th>Record</th><th>SIAKAD</th><th>Feeder</th><th>Jenis Selisih</th><th></th></tr></thead>
          <tbody>{selisih.map((s, i) => (<tr key={i}><td><Badge tone="gray">{s.entitas}</Badge></td><td className="mono" style={{ fontSize: 12 }}>{s.record}</td><td style={{ fontFamily: "var(--mono)", fontWeight: 700 }}>{s.siakad}</td><td style={{ fontFamily: "var(--mono)", color: "var(--red)" }}>{s.feeder}</td><td style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{s.jenis}</td><td><button className="btn btn-soft btn-sm" onClick={() => toast("Record disinkronkan ulang ke Feeder", "ok")}>Sinkron Ulang</button></td></tr>))}</tbody>
        </table></div>
      </div>
    </div>
  );
}

Object.assign(window, { AdminSecurity, AdminWorkflow, AdminConfig, AdminNotif, AdminIntegration, AdminFeeder });
