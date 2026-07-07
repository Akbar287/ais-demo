/* eslint-disable */
import type { ReactNode } from "react";
import { AdminAudit, AdminDashboard, AdminMaster, AdminPengumuman, AdminRBAC, AdminServices, AdminUsers } from "@/components/features/from-js/views_admin";
import { AdminConfig, AdminFeeder, AdminIntegration, AdminNotif, AdminSecurity, AdminWorkflow } from "@/components/features/from-js/views_admin2";
import { CalonDaftar, DsnBKD, DsnBanding, DsnEdom, MhsBanding, MhsEdom, MhsLayanan, MhsTA, PAPerwalian, PrdStatus, PrdTA, PrdYudisium } from "@/components/features/from-js/views_akademik2";
import { AkunAP, AkunAnggaran, AkunClosing, AkunCoA, AkunGL, AkunLaporan, AkunNeraca, AkunPajak, AkunRekon } from "@/components/features/from-js/views_akuntansi";
import { AstBHP, AstDashboard, AstDistribusi, AstInventaris, AstKategori, AstLabel, AstLokasi, AstMutasi, AstOpname, AstPemeliharaan, AstPenghapusan, AstPenyusutan, AstPermintaan, AstRuang } from "@/components/features/from-js/views_aset";
import { CalonDashboard, CalonHasil, CalonKartu, CalonTes } from "@/components/features/from-js/views_calon";
import { DokDashboard, DokPusat, DokTTE, DokVerifikasi, WfAlur, WfDashboard, WfInbox } from "@/components/features/from-js/views_dokumen_wf";
import { DosenDashboard, DosenJadwal, DosenKelas, DosenNilai, DosenPresensi, DosenTA, ProfilStaff } from "@/components/features/from-js/views_dosen";
import { AdminERD } from "@/components/features/from-js/views_erd";
import { BauDashboard, BauKendaraan, BauRT, HumasDashboard, HumasPPID, HumasPengaduan } from "@/components/features/from-js/views_humas_bau";
import { HumasBerita, HumasEvent, HumasKategori } from "@/components/features/from-js/views_humas_crud";
import { BaaJadwal, BaaNilai, BaaYudisium, HumasBroadcast, HumasPengumuman, HumasSurvei, ItsmAset, ItsmChange, ItsmPermintaan } from "@/components/features/from-js/views_humas_itsm_baa";
import { KmhsBeasiswa, KmhsDashboard, KmhsKarir, KmhsOrmawa, KmhsTracer, KsDashboard, KsMitra, KsMou } from "@/components/features/from-js/views_kemahasiswaan";
import { KeuBeasiswa, KeuDashboard, KeuLaporan, KeuPiutang, KeuTagihan, KeuValidasi } from "@/components/features/from-js/views_keuangan";
import { KRS } from "@/components/features/from-js/views_krs";
import { Bantuan, Beasiswa, Kalender } from "@/components/features/from-js/views_lain";
import { LMSDosen, LMSMahasiswa } from "@/components/features/from-js/views_lms";
import { LpmAkreditasi, LpmAudit, LpmDashboard, LpmStandar, LpmTemuan, LppmDashboard, LppmHKI, LppmHibah, LppmLuaran, LppmProposal } from "@/components/features/from-js/views_lppm";
import { Dashboard, Pembayaran, Profil } from "@/components/features/from-js/views_main";
import { KknDashboard, KknKelompok, KknPendaftar, KknPenilaian, KknPeriode, MbkmDashboard, MbkmKonversi, MbkmMitra, MbkmPendaftar, MbkmProgram } from "@/components/features/from-js/views_mbkm";
import { MhsExp } from "@/components/features/from-js/views_mhs_experience";
import { LpmAsesmen, LpmDokumen, LpmRisiko, LpmSasaran, LpmSurvei } from "@/components/features/from-js/views_mutu";
import { Nilai, Perkuliahan } from "@/components/features/from-js/views_nilai";
import { HRDashboard, HRKarir, HRKehadiran, HRPayroll, HRPegawai, PgdDashboard, PgdPO, PgdPermintaan, PgdVendor } from "@/components/features/from-js/views_operasional";
import { PADashboard, PAMahasiswa, PAMonitoring, PAValidasi } from "@/components/features/from-js/views_pa";
import { LibAnggota, LibDashboard, LibDenda, LibKatalog, LibRepo, LibReservasi, LibSirkulasi, PerpusMahasiswa } from "@/components/features/from-js/views_perpustakaan";
import { PimpAkademik, PimpKeuangan, PimpMutu, PimpPersetujuan, PimpRiset, PimpSDM } from "@/components/features/from-js/views_pimpinan";
import { PMBDaftarUlang, PMBDashboard, PMBHasil, PMBPendaftar, PMBTes } from "@/components/features/from-js/views_pmb";
import { ProdiDashboard, ProdiFeeder, ProdiJadwal, ProdiKRS, ProdiKurikulum, ProdiMahasiswa, ProdiNilai, ProdiTawaran } from "@/components/features/from-js/views_prodi";
import { HrDosen, HrKinerja, HrKontrak, HrRekrutmen, HrSejahtera } from "@/components/features/from-js/views_sdm";
import { AkunDashboard, AkunJurnal, BaaDashboard, BaaKalender, BaaStatus, FdrOpDashboard, KeuGateway, KeuUKT, PimpDashboard, PimpSearch } from "@/components/features/from-js/views_tambahan";
import { ItsmDashboard, ItsmKB, ItsmSLA, ItsmTiket, TuArsip, TuDashboard, TuDisposisi, TuKeluar, TuMasuk } from "@/components/features/from-js/views_tu_itsm";
import { UnitPermintaan } from "@/components/features/from-js/views_unit_permintaan";
import { Wisuda } from "@/components/features/from-js/views_wisuda";

export type ViewContext = {
  nav: (view: string) => void;
  role: string;
  krsState: any;
  setKrsState: (next: any) => void;
  period: any;
  isArchived: boolean;
};

export const VIEW_REGISTRY = {

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
  adm_security: () => <AdminSecurity />,
  adm_workflow: () => <AdminWorkflow />,
  adm_config: () => <AdminConfig />,
  adm_notif: () => <AdminNotif />,
  adm_integration: () => <AdminIntegration />,
  adm_feeder: () => <AdminFeeder />,
  adm_pengumuman: () => <AdminPengumuman />,
  // ---- Perpustakaan ----
  lib_dashboard: (ctx) => <LibDashboard nav={ctx.nav} />,
  lib_sirkulasi: () => <LibSirkulasi />,
  lib_katalog: () => <LibKatalog />,
  lib_anggota: () => <LibAnggota />,
  lib_reservasi: () => <LibReservasi />,
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
  hr_kontrak: () => <HrKontrak />,
  hr_dosen: () => <HrDosen />,
  hr_rekrutmen: () => <HrRekrutmen />,
  hr_kinerja: () => <HrKinerja />,
  hr_sejahtera: () => <HrSejahtera />,
  // ---- Pengadaan ----
  pgd_dashboard: (ctx) => <PgdDashboard nav={ctx.nav} />,
  pgd_permintaan: () => <PgdPermintaan />,
  pgd_po: () => <PgdPO />,
  pgd_vendor: () => <PgdVendor />,
  // ---- Aset & Fasilitas (14 entitas / 4 flow) ----
  ast_dashboard: (ctx) => <AstDashboard nav={ctx.nav} />,
  ast_inventaris: () => <AstInventaris />,
  ast_penyusutan: () => <AstPenyusutan />,
  ast_penghapusan: () => <AstPenghapusan />,
  ast_kategori: () => <AstKategori />,
  ast_lokasi: () => <AstLokasi />,
  ast_label: () => <AstLabel />,
  ast_pemeliharaan: () => <AstPemeliharaan />,
  ast_mutasi: () => <AstMutasi />,
  ast_opname: () => <AstOpname />,
  ast_ruang: () => <AstRuang />,
  ast_bhp: () => <AstBHP />,
  ast_permintaan: () => <AstPermintaan />,
  ast_distribusi: () => <AstDistribusi />,
  // ---- Ajukan Permintaan (lintas peran) ----
  unit_pengadaan: (ctx) => <UnitPermintaan role={ctx.role} />,
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
  lpm_sasaran: () => <LpmSasaran />,
  lpm_asesmen: () => <LpmAsesmen />,
  lpm_survei: () => <LpmSurvei />,
  lpm_dokumen: () => <LpmDokumen />,
  lpm_risiko: () => <LpmRisiko />,
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
  kkn_pendaftar: () => <KknPendaftar />,
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
  itsm_permintaan: () => <ItsmPermintaan />,
  itsm_aset: () => <ItsmAset />,
  itsm_change: () => <ItsmChange />,
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
  hms_event: () => <HumasEvent />,
  hms_kategori: () => <HumasKategori />,
  hms_pengumuman: () => <HumasPengumuman />,
  hms_broadcast: () => <HumasBroadcast />,
  hms_survei: () => <HumasSurvei />,
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
  // ---- Tambahan: UKT/Gateway, Akuntansi, Pimpinan, BAA, PDDikti ----
  keu_ukt: () => <KeuUKT />,
  keu_gateway: () => <KeuGateway />,
  akun_dashboard: (ctx) => <AkunDashboard nav={ctx.nav} />,
  akun_jurnal: () => <AkunJurnal />,
  akun_coa: () => <AkunCoA />,
  akun_gl: () => <AkunGL />,
  akun_rekon: () => <AkunRekon />,
  akun_ap: () => <AkunAP />,
  akun_pajak: () => <AkunPajak />,
  akun_anggaran: () => <AkunAnggaran />,
  akun_neraca: () => <AkunNeraca />,
  akun_laporan: () => <AkunLaporan />,
  akun_closing: () => <AkunClosing />,
  pimp_dashboard: (ctx) => <PimpDashboard nav={ctx.nav} />,
  pimp_akademik: () => <PimpAkademik />,
  pimp_keuangan: () => <PimpKeuangan />,
  pimp_riset: () => <PimpRiset />,
  pimp_mutu: () => <PimpMutu />,
  pimp_sdm: () => <PimpSDM />,
  pimp_persetujuan: () => <PimpPersetujuan />,
  pimp_search: () => <PimpSearch />,
  baa_dashboard: (ctx) => <BaaDashboard nav={ctx.nav} />,
  baa_status: () => <BaaStatus />,
  baa_kalender: () => <BaaKalender />,
  baa_jadwal: () => <BaaJadwal />,
  baa_nilai: () => <BaaNilai />,
  baa_yudisium: () => <BaaYudisium />,
  fdrop_dashboard: (ctx) => <FdrOpDashboard nav={ctx.nav} />,
  // ---- Proses akademik tambahan (Sequence flows) ----
  mhs_edom: () => <MhsEdom />,
  mhs_banding: () => <MhsBanding />,
  mhs_layanan: () => <MhsLayanan />,
  mhs_ta: () => <MhsTA />,
  mhs_exp: (ctx) => <MhsExp nav={ctx.nav} />,
  calon_daftar: () => <CalonDaftar />,
  dsn_edom: () => <DsnEdom />,
  dsn_banding: () => <DsnBanding />,
  dsn_bkd: () => <DsnBKD />,
  pa_perwalian: () => <PAPerwalian />,
  prd_ta: () => <PrdTA />,
  prd_yudisium: () => <PrdYudisium />,
  prd_status: () => <PrdStatus />,
} as const satisfies Record<string, (ctx: ViewContext) => ReactNode>;

export type ViewId = keyof typeof VIEW_REGISTRY;
