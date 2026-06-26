// @ts-nocheck
import "../data/mock-data";
import "../data/roles";
import "../data/erd";
import "../components/shared";
import "../pages/academic";
import "../pages/krs";
import "../pages/nilai";
import "../pages/layanan";
import "../pages/login";
import "../pages/landing";
import "../pages/modules";
import "../pages/dosen";
import "../pages/pa";
import "../pages/prodi";
import "../pages/keuangan";
import "../pages/admin";
import "../pages/erd";
import "../pages/lms";
import "../pages/perpustakaan";
import "../pages/pmb";
import "../pages/wisuda";
import "../pages/operasional";
import "../pages/lppm";
import "../pages/mbkm";
import "../pages/tu-itsm";
import "../pages/kemahasiswaan";
import "../pages/humas-bau";
import "../pages/dokumen-workflow";
import "../pages/calon";

const {
  React, useState, useContext, Icon, initials,
  Dashboard, KRS, Perkuliahan, Nilai, Kalender, Pembayaran, Beasiswa, Profil, Bantuan,
  LMSMahasiswa, LMSDosen, Wisuda, DosenDashboard, DosenKelas, DosenPresensi, DosenNilai,
  DosenJadwal, DosenTA, ProfilStaff, PADashboard, PAValidasi, PAMahasiswa, PAMonitoring,
  ProdiDashboard, ProdiTawaran, ProdiJadwal, ProdiKurikulum, ProdiMahasiswa, ProdiKRS,
  ProdiNilai, ProdiFeeder, KeuDashboard, KeuTagihan, KeuValidasi, KeuPiutang, KeuBeasiswa,
  KeuLaporan, AdminDashboard, AdminUsers, AdminRBAC, AdminServices, AdminERD, AdminMaster,
  AdminAudit, AdminPengumuman, LibDashboard, LibSirkulasi, LibKatalog, LibAnggota, LibDenda,
  LibRepo, PerpusMahasiswa, PMBDashboard, PMBPendaftar, PMBTes, PMBHasil, PMBDaftarUlang,
  HRDashboard, HRPegawai, HRKehadiran, HRPayroll, HRKarir, PgdDashboard, PgdPermintaan,
  PgdPO, PgdVendor, AstDashboard, AstInventaris, AstPemeliharaan, AstRuang, CalonDashboard,
  CalonKartu, CalonTes, CalonHasil, LppmDashboard, LppmHibah, LppmProposal, LppmLuaran,
  LppmHKI, LpmDashboard, LpmAudit, LpmAkreditasi, LpmTemuan, LpmStandar, MbkmDashboard,
  MbkmProgram, MbkmPendaftar, MbkmKonversi, MbkmMitra, KknDashboard, KknPeriode, KknKelompok,
  KknPenilaian, TuDashboard, TuMasuk, TuKeluar, TuDisposisi, TuArsip, ItsmDashboard, ItsmTiket,
  ItsmSLA, ItsmKB, KmhsDashboard, KmhsOrmawa, KmhsBeasiswa, KmhsTracer, KmhsKarir, KsDashboard,
  KsMou, KsMitra, HumasDashboard, HumasBerita, HumasPPID, HumasPengaduan, BauDashboard,
  BauKendaraan, BauRT, DokDashboard, DokPusat, DokTTE, DokVerifikasi, WfDashboard, WfInbox,
  WfAlur, Login, Landing, Modules
} = window as any;

// ============================================================
// AIS — App Shell: multi-role login, per-role nav & routing
// ============================================================

const VIEW_REGISTRY = {
  // ---- Mahasiswa ----
  dashboard: (ctx) => <Dashboard nav={ctx.nav} krsState={ctx.krsState} />,
  krs: (ctx) => <KRS krsState={ctx.krsState} setKrsState={ctx.setKrsState} />,
  kehadiran: () => <Perkuliahan />,
  nilai: () => <Nilai />,
  kalender: () => <Kalender />,
  pembayaran: () => <Pembayaran />,
  beasiswa: () => <Beasiswa />,
  profil: () => <Profil />,
  bantuan: () => <Bantuan />,
  lms: () => <LMSMahasiswa />,
  perpus: () => <PerpusMahasiswa />,
  wisuda: () => <Wisuda />,
  // ---- Dosen ----
  dsn_dashboard: (ctx) => <DosenDashboard nav={ctx.nav} />,
  dsn_kelas: (ctx) => <DosenKelas nav={ctx.nav} />,
  dsn_lms: () => <LMSDosen />,
  dsn_presensi: () => <DosenPresensi />,
  dsn_nilai: () => <DosenNilai />,
  dsn_jadwal: () => <DosenJadwal />,
  dsn_ta: () => <DosenTA />,
  dsn_profil: (ctx) => <ProfilStaff role={ctx.role} />,
  // ---- Dosen PA ----
  pa_dashboard: (ctx) => <PADashboard nav={ctx.nav} />,
  pa_validasi: () => <PAValidasi />,
  pa_mahasiswa: () => <PAMahasiswa />,
  pa_monitoring: () => <PAMonitoring />,
  // ---- Kaprodi ----
  prd_dashboard: (ctx) => <ProdiDashboard nav={ctx.nav} />,
  prd_tawaran: () => <ProdiTawaran />,
  prd_jadwal: () => <ProdiJadwal />,
  prd_kurikulum: () => <ProdiKurikulum />,
  prd_mahasiswa: () => <ProdiMahasiswa />,
  prd_krs: () => <ProdiKRS />,
  prd_nilai: () => <ProdiNilai />,
  prd_feeder: () => <ProdiFeeder />,
  // ---- Keuangan ----
  keu_dashboard: (ctx) => <KeuDashboard nav={ctx.nav} />,
  keu_tagihan: () => <KeuTagihan />,
  keu_validasi: () => <KeuValidasi />,
  keu_piutang: () => <KeuPiutang />,
  keu_beasiswa: () => <KeuBeasiswa />,
  keu_laporan: () => <KeuLaporan />,
  // ---- Admin ----
  adm_dashboard: (ctx) => <AdminDashboard nav={ctx.nav} />,
  adm_users: () => <AdminUsers />,
  adm_rbac: () => <AdminRBAC />,
  adm_services: () => <AdminServices />,
  adm_erd: () => <AdminERD />,
  adm_master: () => <AdminMaster />,
  adm_audit: () => <AdminAudit />,
  adm_pengumuman: () => <AdminPengumuman />,
  // ---- Perpustakaan ----
  lib_dashboard: (ctx) => <LibDashboard nav={ctx.nav} />,
  lib_sirkulasi: () => <LibSirkulasi />,
  lib_katalog: () => <LibKatalog />,
  lib_anggota: () => <LibAnggota />,
  lib_denda: () => <LibDenda />,
  lib_repo: () => <LibRepo />,
  // ---- PMB ----
  pmb_dashboard: (ctx) => <PMBDashboard nav={ctx.nav} />,
  pmb_pendaftar: () => <PMBPendaftar />,
  pmb_tes: () => <PMBTes />,
  pmb_hasil: () => <PMBHasil />,
  pmb_daftarulang: () => <PMBDaftarUlang />,
  // ---- HR ----
  hr_dashboard: (ctx) => <HRDashboard nav={ctx.nav} />,
  hr_pegawai: () => <HRPegawai />,
  hr_kehadiran: () => <HRKehadiran />,
  hr_payroll: () => <HRPayroll />,
  hr_karir: () => <HRKarir />,
  // ---- Pengadaan ----
  pgd_dashboard: (ctx) => <PgdDashboard nav={ctx.nav} />,
  pgd_permintaan: () => <PgdPermintaan />,
  pgd_po: () => <PgdPO />,
  pgd_vendor: () => <PgdVendor />,
  // ---- Aset ----
  ast_dashboard: (ctx) => <AstDashboard nav={ctx.nav} />,
  ast_inventaris: () => <AstInventaris />,
  ast_pemeliharaan: () => <AstPemeliharaan />,
  ast_ruang: () => <AstRuang />,
  // ---- Calon Mahasiswa ----
  calon_dashboard: (ctx) => <CalonDashboard nav={ctx.nav} />,
  calon_kartu: () => <CalonKartu />,
  calon_tes: (ctx) => <CalonTes nav={ctx.nav} />,
  calon_hasil: (ctx) => <CalonHasil nav={ctx.nav} />,
  // ---- LPPM ----
  lppm_dashboard: (ctx) => <LppmDashboard nav={ctx.nav} />,
  lppm_hibah: () => <LppmHibah />,
  lppm_proposal: () => <LppmProposal />,
  lppm_luaran: () => <LppmLuaran />,
  lppm_hki: () => <LppmHKI />,
  // ---- Penjaminan Mutu (LPM) ----
  lpm_dashboard: (ctx) => <LpmDashboard nav={ctx.nav} />,
  lpm_audit: () => <LpmAudit />,
  lpm_akreditasi: () => <LpmAkreditasi />,
  lpm_temuan: () => <LpmTemuan />,
  lpm_standar: () => <LpmStandar />,
  // ---- MBKM ----
  mbkm_dashboard: (ctx) => <MbkmDashboard nav={ctx.nav} />,
  mbkm_program: () => <MbkmProgram />,
  mbkm_pendaftar: () => <MbkmPendaftar />,
  mbkm_konversi: () => <MbkmKonversi />,
  mbkm_mitra: () => <MbkmMitra />,
  // ---- KKN ----
  kkn_dashboard: (ctx) => <KknDashboard nav={ctx.nav} />,
  kkn_periode: () => <KknPeriode />,
  kkn_kelompok: () => <KknKelompok />,
  kkn_penilaian: () => <KknPenilaian />,
  // ---- Persuratan (TU) ----
  tu_dashboard: (ctx) => <TuDashboard nav={ctx.nav} />,
  tu_masuk: () => <TuMasuk />,
  tu_keluar: () => <TuKeluar />,
  tu_disposisi: () => <TuDisposisi />,
  tu_arsip: () => <TuArsip />,
  // ---- ITSM ----
  itsm_dashboard: (ctx) => <ItsmDashboard nav={ctx.nav} />,
  itsm_tiket: () => <ItsmTiket />,
  itsm_sla: () => <ItsmSLA />,
  itsm_kb: () => <ItsmKB />,
  // ---- Kemahasiswaan ----
  kmhs_dashboard: (ctx) => <KmhsDashboard nav={ctx.nav} />,
  kmhs_ormawa: () => <KmhsOrmawa />,
  kmhs_beasiswa: () => <KmhsBeasiswa />,
  kmhs_tracer: () => <KmhsTracer />,
  kmhs_karir: () => <KmhsKarir />,
  // ---- Kerjasama ----
  ks_dashboard: (ctx) => <KsDashboard nav={ctx.nav} />,
  ks_mou: () => <KsMou />,
  ks_mitra: () => <KsMitra />,
  // ---- Humas ----
  hms_dashboard: (ctx) => <HumasDashboard nav={ctx.nav} />,
  hms_berita: () => <HumasBerita />,
  hms_ppid: () => <HumasPPID />,
  hms_pengaduan: () => <HumasPengaduan />,
  // ---- BAU ----
  bau_dashboard: (ctx) => <BauDashboard nav={ctx.nav} />,
  bau_kendaraan: () => <BauKendaraan />,
  bau_rt: () => <BauRT />,
  // ---- Dokumen & TTE ----
  dok_dashboard: (ctx) => <DokDashboard nav={ctx.nav} />,
  dok_pusat: () => <DokPusat />,
  dok_tte: () => <DokTTE />,
  dok_verifikasi: () => <DokVerifikasi />,
  // ---- Workflow ----
  wf_dashboard: (ctx) => <WfDashboard nav={ctx.nav} />,
  wf_inbox: () => <WfInbox />,
  wf_alur: () => <WfAlur />,
};

const HOME_OF = { mahasiswa: "dashboard", dosen: "dsn_dashboard", pa: "pa_dashboard", kaprodi: "prd_dashboard", keuangan: "keu_dashboard", admin: "adm_dashboard", pustakawan: "lib_dashboard", pmb: "pmb_dashboard", hr: "hr_dashboard", pengadaan: "pgd_dashboard", aset: "ast_dashboard", calon: "calon_dashboard", lppm: "lppm_dashboard", lpm: "lpm_dashboard", mbkm: "mbkm_dashboard", kkn: "kkn_dashboard", tu: "tu_dashboard", itsm: "itsm_dashboard", kemahasiswaan: "kmhs_dashboard", kerjasama: "ks_dashboard", humas: "hms_dashboard", bau: "bau_dashboard", dokumen: "dok_dashboard", workflow: "wf_dashboard" };

function RoleSwitcher({ role, onPick, onClose }) {
  const R = window.AIS_ROLES;
  const order = ["mahasiswa", "dosen", "pa", "kaprodi", "keuangan", "admin", "pustakawan", "pmb", "hr", "pengadaan", "aset", "calon", "lppm", "lpm", "mbkm", "kkn", "tu", "itsm", "kemahasiswaan", "kerjasama", "humas", "bau", "dokumen", "workflow"];
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(44,36,28,.52)", backdropFilter: "blur(7px)", WebkitBackdropFilter: "blur(7px)", display: "grid", placeItems: "center", padding: 20 }}>
      <div className="card" onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: "min(440px, 100%)", maxHeight: "85vh", display: "flex", flexDirection: "column", zIndex: 10001, boxShadow: "var(--shadow-lg)", padding: 8, animation: "pop .18s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-3)", padding: "10px 10px 8px", flexShrink: 0 }}>
          <span style={{ flex: 1 }}>Beralih Peran (demo)</span>
          <button onClick={onClose} aria-label="Tutup" style={{ border: "none", background: "var(--surface-2)", borderRadius: 8, width: 26, height: 26, cursor: "pointer", display: "grid", placeItems: "center", color: "var(--ink-2)" }}><Icon name="x" size={15} /></button>
        </div>
        <div style={{ overflowY: "auto", flex: 1 }}>
        {order.map((rid) => {
          const meta = R.roleMeta[rid];
          const on = rid === role;
          return (
            <button key={rid} onClick={() => { onPick(rid); onClose(); }}
              style={{ display: "flex", alignItems: "center", gap: 11, width: "100%", padding: "9px 10px", border: "none", borderRadius: 11, cursor: "pointer", background: on ? meta.bg : "transparent", fontFamily: "var(--sans)", textAlign: "left" }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: meta.bg, color: meta.color, display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name={meta.ic} size={17} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: on ? meta.color : "var(--ink)" }}>{meta.label}</div>
                <div style={{ fontSize: 11, color: "var(--ink-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{R.personas[rid].nama}</div>
              </div>
              {on && <Icon name="check" size={16} style={{ color: meta.color }} />}
            </button>
          );
        })}
        <div style={{ borderTop: "1px solid var(--line)", marginTop: 6, paddingTop: 6 }}>
          <button onClick={() => onPick(null)} style={{ display: "flex", alignItems: "center", gap: 11, width: "100%", padding: "9px 10px", border: "none", borderRadius: 11, cursor: "pointer", background: "transparent", fontFamily: "var(--sans)", color: "var(--ink-2)", fontWeight: 600, fontSize: 13 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "var(--surface-2)", display: "grid", placeItems: "center" }}><Icon name="logout" size={16} /></div>
            Keluar / Pilih peran
          </button>
        </div>
        </div>
      </div>
      </div>
    </>
  );
}

// ============================================================
// Periode Akademik — selector global (default: periode aktif)
// ============================================================
window.AIS_PERIODS = [
  { id: "2026-1", ta: "2026/2027", smt: "Ganjil", status: "planning" },
  { id: "2025-2", ta: "2025/2026", smt: "Genap", status: "active" },
  { id: "2025-1", ta: "2025/2026", smt: "Ganjil", status: "archived" },
  { id: "2024-2", ta: "2024/2025", smt: "Genap", status: "archived" },
  { id: "2024-1", ta: "2024/2025", smt: "Ganjil", status: "archived" },
];
const PERIOD_STATUS = {
  active: ["Aktif", "var(--green)", "var(--green-bg)"],
  planning: ["Mendatang", "var(--blue)", "var(--blue-bg)"],
  archived: ["Arsip", "var(--ink-3)", "var(--surface-2)"],
};
const PeriodCtx = React.createContext(null);
const usePeriod = () => useContext(PeriodCtx);
window.AIS_usePeriod = usePeriod;

function PeriodSelect() {
  const { period, setPeriod } = usePeriod();
  const [open, setOpen] = useState(false);
  const periods = window.AIS_PERIODS;
  const groups = [
    ["Aktif", periods.filter((p) => p.status === "active")],
    ["Mendatang", periods.filter((p) => p.status === "planning")],
    ["Arsip", periods.filter((p) => p.status === "archived")],
  ];
  const [, dotColor] = PERIOD_STATUS[period.status];
  return (
    <div style={{ position: "relative" }} className="period-wrap">
      <button className="period-btn" onClick={() => setOpen((o) => !o)} aria-label="Pilih periode">
        <Icon name="calendar" size={16} style={{ color: "var(--ink-3)", flexShrink: 0 }} />
        <span className="period-text">
          <span className="period-cap">Periode</span>
          <span className="period-val">{period.ta} {period.smt}</span>
        </span>
        <span className="dot" style={{ background: dotColor, width: 7, height: 7, flexShrink: 0 }} />
        <Icon name="chevR" size={14} style={{ color: "var(--ink-3)", transform: open ? "rotate(90deg)" : "none", transition: "transform .18s", flexShrink: 0 }} />
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 40 }} />
          <div className="card" style={{ position: "absolute", top: 52, right: 0, zIndex: 50, width: 248, padding: 7, boxShadow: "var(--shadow-lg)", animation: "pop .16s" }}>
            {groups.map(([label, items]) =>
              items.length ? (
                <div key={label}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-3)", padding: "8px 10px 5px" }}>{label}</div>
                  {items.map((p) => {
                    const on = p.id === period.id;
                    const [stLabel, stColor, stBg] = PERIOD_STATUS[p.status];
                    return (
                      <button key={p.id} onClick={() => { setPeriod(p); setOpen(false); }}
                        style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 10px", border: "none", borderRadius: 10, cursor: "pointer", background: on ? "var(--surface-2)" : "transparent", fontFamily: "var(--sans)", textAlign: "left" }}>
                        <span className="dot" style={{ background: stColor, width: 8, height: 8, flexShrink: 0 }} />
                        <span style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ display: "block", fontWeight: 700, fontSize: 13 }}>{p.ta} {p.smt}</span>
                          <span style={{ fontSize: 11, color: "var(--ink-3)" }}>{stLabel}</span>
                        </span>
                        {on && <Icon name="check" size={16} style={{ color: "var(--green)" }} />}
                      </button>
                    );
                  })}
                </div>
              ) : null
            )}
          </div>
        </>
      )}
    </div>
  );
}

function PeriodBanner() {
  const { period } = usePeriod();
  if (period.status === "active") return null;
  const archived = period.status === "archived";
  const tone = archived ? "amber" : "blue";
  return (
    <div className="card card-pad anim-in" style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 13, padding: "13px 18px", background: archived ? "var(--amber-bg)" : "var(--blue-bg)", border: "none" }}>
      <Icon name={archived ? "lock" : "calendar"} size={19} style={{ color: archived ? "#a6760e" : "var(--blue)", flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <b style={{ fontSize: 13.5, color: archived ? "#8a5e0c" : "var(--blue)" }}>
          {archived ? "Mode Arsip" : "Periode Mendatang"} — {period.ta} {period.smt}
        </b>
        <span style={{ fontSize: 12.5, color: "var(--ink-2)", marginLeft: 8 }}>
          {archived ? "Periode ini sudah ditutup. Data hanya dapat dilihat (read-only)." : "Periode dalam perencanaan. Sebagian data belum final."}
        </span>
      </div>
      <Badge tone={tone} dot>{archived ? "Read-only" : "Draf"}</Badge>
    </div>
  );
}

function Shell({ role, setRole }) {
  const R = window.AIS_ROLES;
  const persona = R.personas[role];
  const meta = R.roleMeta[role];
  const nav = R.navByRole[role];
  const [view, setView] = useState(HOME_OF[role]);
  const [krsState, setKrsState] = useState({ selected: [], submitted: false, approved: false, sks: 0 });
  const [switcher, setSwitcher] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [period, setPeriodState] = useState(() => {
    const saved = localStorage.getItem("ais_period");
    return window.AIS_PERIODS.find((p) => p.id === saved) || window.AIS_PERIODS.find((p) => p.status === "active");
  });
  function setPeriod(p) { setPeriodState(p); try { localStorage.setItem("ais_period", p.id); } catch (e) {} }

  function go(id) { setView(id); setNavOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }
  const [crumbGroup, crumbPage] = R.titles[view] || ["", ""];
  const ctx = { nav: go, role, krsState, setKrsState, period, isArchived: period.status !== "active" };
  const renderFn = VIEW_REGISTRY[view] || VIEW_REGISTRY[HOME_OF[role]];

  return (
    <PeriodCtx.Provider value={{ period, setPeriod }}>
    <div className={"app" + (navOpen ? " nav-open" : "")}>
      <div className="nav-overlay" onClick={() => setNavOpen(false)} />
      <aside className="sidebar">
        <div className="sb-brand">
          <div className="sb-logo">A</div>
          <div className="sb-brand-text"><b>AIS</b><span>Sistem Informasi Akademik</span></div>
        </div>

        {/* Active-role chip */}
        <div style={{ padding: "0 14px 4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 11px", borderRadius: 12, background: meta.bg }}>
            <div style={{ width: 28, height: 28, borderRadius: 9, background: "#fff", color: meta.color, display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name={meta.ic} size={16} /></div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: meta.color, opacity: .75 }}>Masuk sebagai</div>
              <div style={{ fontWeight: 800, fontSize: 12.5, color: meta.color, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{meta.label}</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          {nav.map((sec, i) => (
            <div className="sb-section" key={i}>
              {sec.group && <div className="sb-label">{sec.group}</div>}
              {sec.items.map((it) => (
                <button key={it.id} className={"sb-item" + (view === it.id ? " active" : "")} onClick={() => go(it.id)}>
                  <Icon name={it.ic} size={19} className="sb-ic" />
                  <span>{it.label}</span>
                  {it.badge && <span className="sb-badge" style={{ background: meta.color }}>{it.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sb-foot" style={{ position: "relative" }}>
          <div className="sb-user" onClick={() => setSwitcher((s) => !s)}>
            <div className="sb-ava" style={{ background: persona.avaBg, color: persona.ava }}>{initials(persona.nama)}</div>
            <div className="sb-user-text">
              <b>{persona.nama.split(" ").slice(0, 2).join(" ")}</b>
              <span>{persona.idLabel} {persona.id}</span>
            </div>
            <Icon name="chevR" size={16} style={{ marginLeft: "auto", color: "var(--ink-3)", transform: switcher ? "rotate(90deg)" : "none", transition: "transform .18s" }} />
          </div>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <button className="tb-burger" onClick={() => setNavOpen(true)} aria-label="Buka menu"><Icon name="menu" size={22} /></button>
          <div className="tb-title"><span className="tb-crumb">{crumbGroup} / </span>{crumbPage}</div>
          <div className="tb-search"><Icon name="search" size={17} /><input placeholder="Cari menu, data…" /></div>
          <PeriodSelect />
          <button className="tb-icon-btn"><Icon name="bell" size={19} /><span className="tb-dot" /></button>
        </header>
        <main className="content" key={role + view}>
          <PeriodBanner />
          {renderFn(ctx)}
        </main>
      </div>
    </div>
    {switcher && <RoleSwitcher role={role} onPick={setRole} onClose={() => setSwitcher(false)} />}
    </PeriodCtx.Provider>
  );
}

function App() {
  const [role, setRole] = useState(null);
  const [entered, setEntered] = useState(false);
  const [pub, setPub] = useState("home");
  if (role) return <Shell key={role} role={role} setRole={setRole} />;
  if (entered) return <Login onLogin={setRole} />;
  if (pub === "modul") return <Modules onLogin={() => setEntered(true)} onHome={() => setPub("home")} />;
  return <Landing onLogin={() => setEntered(true)} onModul={() => setPub("modul")} />;
}

export default App;
