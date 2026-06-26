// @ts-nocheck
// ============================================================
// AIS — Data Multi-Role (RBAC), Microservices, Audit
// Diturunkan dari System-Design.docx, Arsitektur-Microservices.xlsx,
// ERD-Relasi-SIM.xlsx
// ============================================================
window.AIS_ROLES = (function () {
  // ---------------- Persona per role ----------------
  const personas = {
    mahasiswa: { nama: "Aisyah Nur Ramadhani", id: "11210910000045", idLabel: "NIM", jabatan: "Mahasiswa S1 Teknik Informatika", unit: "Fakultas Sains dan Teknologi", ava: "var(--orange)", avaBg: "var(--orange-50)" },
    dosen:     { nama: "Dr. Imam Marzuki, M.Kom", id: "0312088203", idLabel: "NIDN", jabatan: "Dosen Tetap · Lektor Kepala", unit: "Prodi Teknik Informatika", ava: "var(--blue)", avaBg: "var(--blue-bg)" },
    pa:        { nama: "Dr. Imam Marzuki, M.Kom", id: "0312088203", idLabel: "NIDN", jabatan: "Dosen Penasihat Akademik", unit: "Prodi Teknik Informatika", ava: "var(--green)", avaBg: "var(--green-bg)" },
    kaprodi:   { nama: "Dr. Hj. Rina Mahmudah, M.T", id: "0408107505", idLabel: "NIDN", jabatan: "Ketua Program Studi · Akademik (BAA)", unit: "Prodi Teknik Informatika", ava: "var(--purple)", avaBg: "var(--purple-bg)" },
    keuangan:  { nama: "Drs. Bambang Santoso", id: "1987031245", idLabel: "NIP", jabatan: "Staf Keuangan · Billing & Piutang", unit: "Biro Keuangan", ava: "var(--amber)", avaBg: "var(--amber-bg)" },
    admin:     { nama: "Yusuf Ramli, M.Kom", id: "1990110078", idLabel: "NIP", jabatan: "Administrator Sistem", unit: "Pusat Teknologi Informasi & Pangkalan Data (PUSTIPANDA)", ava: "var(--red)", avaBg: "var(--red-bg)" },
    pustakawan:{ nama: "Hj. Maryam Saidah, S.IP", id: "1983052011", idLabel: "NIP", jabatan: "Pustakawan Madya", unit: "Perpustakaan Utama", ava: "var(--blue)", avaBg: "var(--blue-bg)" },
    pmb:       { nama: "Drs. Hasan Basri, M.M", id: "1979091502", idLabel: "NIP", jabatan: "Sekretaris Panitia PMB", unit: "Panitia Penerimaan Mahasiswa Baru", ava: "var(--green)", avaBg: "var(--green-bg)" },
    hr:        { nama: "Ir. Endang Wahyuni, M.M", id: "1976031408", idLabel: "NIP", jabatan: "Kepala Biro SDM", unit: "Biro Sumber Daya Manusia", ava: "var(--purple)", avaBg: "var(--purple-bg)" },
    pengadaan: { nama: "Ahmad Subhan, S.E", id: "1988072233", idLabel: "NIP", jabatan: "Staf Unit Layanan Pengadaan", unit: "Unit Layanan Pengadaan (ULP)", ava: "var(--amber)", avaBg: "var(--amber-bg)" },
    aset:      { nama: "Slamet Riyadi, S.T", id: "1985011990", idLabel: "NIP", jabatan: "Pengelola BMN & Sarana-Prasarana", unit: "Biro Administrasi Umum (BAU)", ava: "var(--orange)", avaBg: "var(--orange-50)" },
    calon:     { nama: "Reyhan Pratama", id: "PMB26-00144", idLabel: "No. Daftar", jabatan: "Calon Mahasiswa Baru", unit: "Pilihan: Teknik Informatika", ava: "var(--blue)", avaBg: "var(--blue-bg)" },
    lppm:      { nama: "Prof. Dr. Ahmad Fauzi, M.Sc", id: "0021076510", idLabel: "NIDN", jabatan: "Ketua LPPM", unit: "Lembaga Penelitian & Pengabdian Masyarakat", ava: "var(--blue)", avaBg: "var(--blue-bg)" },
    lpm:       { nama: "Dr. Sri Wahyuni, M.Si", id: "0014058203", idLabel: "NIDN", jabatan: "Ketua Lembaga Penjaminan Mutu", unit: "Lembaga Penjaminan Mutu (LPM)", ava: "var(--green)", avaBg: "var(--green-bg)" },
    mbkm:      { nama: "Faisal Rahman, M.M", id: "1986042210", idLabel: "NIP", jabatan: "Koordinator MBKM", unit: "Pusat Karier & MBKM", ava: "var(--orange)", avaBg: "var(--orange-50)" },
    kkn:       { nama: "Dr. Hadi Nugroho, M.Si", id: "0009117408", idLabel: "NIDN", jabatan: "Koordinator KKN", unit: "Pusat Pengabdian Masyarakat (LPPM)", ava: "var(--green)", avaBg: "var(--green-bg)" },
    tu:        { nama: "Nurlaila Hasanah, S.A.P", id: "1991052033", idLabel: "NIP", jabatan: "Staf Tata Usaha & Persuratan", unit: "Bagian Tata Usaha", ava: "var(--purple)", avaBg: "var(--purple-bg)" },
    itsm:      { nama: "Rian Hidayat, S.Kom", id: "1993081144", idLabel: "NIP", jabatan: "IT Helpdesk & Service Desk", unit: "PUSTIPANDA", ava: "var(--red)", avaBg: "var(--red-bg)" },
    kemahasiswaan: { nama: "Dra. Siti Maryam, M.Si", id: "1979062045", idLabel: "NIP", jabatan: "Kepala Biro Kemahasiswaan & Alumni", unit: "Biro Kemahasiswaan", ava: "var(--green)", avaBg: "var(--green-bg)" },
    kerjasama: { nama: "Dr. Reza Pratama, M.A", id: "0518088301", idLabel: "NIDN", jabatan: "Kepala Kantor Kerjasama (WR IV)", unit: "Kantor Urusan Internasional & Kerjasama", ava: "var(--blue)", avaBg: "var(--blue-bg)" },
    humas:     { nama: "Andini Kusuma, S.I.Kom", id: "1990041188", idLabel: "NIP", jabatan: "Kepala Humas & PPID", unit: "Biro Administrasi Umum & Humas", ava: "var(--blue)", avaBg: "var(--blue-bg)" },
    bau:       { nama: "Drs. Suparno", id: "1975112033", idLabel: "NIP", jabatan: "Kepala Bagian Umum & Rumah Tangga", unit: "Biro Administrasi Umum (BAU)", ava: "var(--amber)", avaBg: "var(--amber-bg)" },
    dokumen:   { nama: "Fitri Handayani, S.Kom", id: "1992073055", idLabel: "NIP", jabatan: "Pengelola Dokumen & TTE", unit: "PUSTIPANDA", ava: "var(--purple)", avaBg: "var(--purple-bg)" },
    workflow:  { nama: "Ir. Bambang Wijaya, M.M", id: "1972054088", idLabel: "NIP", jabatan: "Sekretaris Pelaksana (Approval Center)", unit: "Biro Administrasi Akademik", ava: "var(--blue)", avaBg: "var(--blue-bg)" },
  };

  const roleMeta = {
    mahasiswa: { label: "Mahasiswa", ic: "grad", color: "var(--orange)", bg: "var(--orange-50)", desc: "KRS, perkuliahan, nilai, pembayaran & layanan akademik mandiri.", svc: "Student · KRS · Billing", cat: "Akademik" },
    dosen:     { label: "Dosen", ic: "presentation", color: "var(--blue)", bg: "var(--blue-bg)", desc: "Kelas yang diampu, presensi, materi, input nilai & bimbingan TA.", svc: "Learning · Assessment · Thesis", cat: "Akademik" },
    pa:        { label: "Dosen Penasihat Akademik", ic: "userCheck", color: "var(--green)", bg: "var(--green-bg)", desc: "Validasi/perwalian KRS dan pemantauan mahasiswa bimbingan.", svc: "Enrollment (KRS) · Student", cat: "Akademik" },
    kaprodi:   { label: "Akademik Prodi / Kaprodi", ic: "building", color: "var(--purple)", bg: "var(--purple-bg)", desc: "Penawaran MK, penjadwalan kelas, rekap KRS, nilai & pelaporan PDDikti.", svc: "Class · Curriculum · Feeder", cat: "Akademik" },
    keuangan:  { label: "Keuangan", ic: "wallet", color: "var(--amber)", bg: "var(--amber-bg)", desc: "Tagihan UKT, validasi pembayaran, piutang & pencairan beasiswa.", svc: "Billing · Accounting", cat: "Layanan & Operasional" },
    admin:     { label: "Administrator Sistem", ic: "shield", color: "var(--red)", bg: "var(--red-bg)", desc: "Pengguna, peran & hak akses, master data, monitoring service & audit.", svc: "IAM · Config · Audit", cat: "Platform & Sistem" },
    pustakawan:{ label: "Perpustakaan", ic: "bookOpen", color: "var(--blue)", bg: "var(--blue-bg)", desc: "Sirkulasi koleksi, katalog, keanggotaan, denda & repositori karya ilmiah.", svc: "Library Service", cat: "Layanan & Operasional" },
    pmb:       { label: "Panitia PMB", ic: "grad", color: "var(--green)", bg: "var(--green-bg)", desc: "Pendaftaran calon mahasiswa, penjadwalan tes, penilaian, hasil & daftar ulang.", svc: "Admissions Service", cat: "Layanan & Operasional" },
    hr:        { label: "SDM / Kepegawaian", ic: "idcard", color: "var(--purple)", bg: "var(--purple-bg)", desc: "Data pegawai, kehadiran & cuti, penggajian, jabatan & kepangkatan.", svc: "HR Service", cat: "Layanan & Operasional" },
    pengadaan: { label: "Pengadaan (ULP)", ic: "cart", color: "var(--amber)", bg: "var(--amber-bg)", desc: "Permintaan pembelian, vendor/rekanan, purchase order & kontrak.", svc: "Procurement Service", cat: "Layanan & Operasional" },
    aset:      { label: "Aset & Fasilitas", ic: "box", color: "var(--orange-600)", bg: "var(--orange-50)", desc: "Inventaris aset (BMN), pemeliharaan, serta ruang & fasilitas kampus.", svc: "Asset & Facility Service", cat: "Layanan & Operasional" },
    calon:     { label: "Calon Mahasiswa", ic: "clipboard", color: "var(--blue)", bg: "var(--blue-bg)", desc: "Portal pendaftar: kartu ujian, tes masuk berbasis komputer (CBT), dan hasil seleksi.", svc: "Admissions · Assessment", cat: "Pendaftaran" },
    lppm:      { label: "LPPM / Penelitian", ic: "beaker", color: "var(--blue)", bg: "var(--blue-bg)", desc: "Hibah penelitian & pengabdian, proposal, luaran/publikasi, dan HKI.", svc: "Research & Community (LPPM)", cat: "Riset & Mutu" },
    lpm:       { label: "Penjaminan Mutu (LPM)", ic: "shield", color: "var(--green)", bg: "var(--green-bg)", desc: "Audit mutu internal (AMI), akreditasi, monev, standar & temuan.", svc: "Quality Assurance Service", cat: "Riset & Mutu" },
    mbkm:      { label: "MBKM", ic: "link", color: "var(--orange)", bg: "var(--orange-50)", desc: "Program Merdeka Belajar, pendaftaran, konversi SKS & mitra.", svc: "Experiential Learning", cat: "Riset & Mutu" },
    kkn:       { label: "KKN", ic: "flag", color: "var(--green)", bg: "var(--green-bg)", desc: "Periode KKN, kelompok & DPL, lokasi penempatan, dan penilaian.", svc: "Experiential Learning", cat: "Riset & Mutu" },
    tu:        { label: "Persuratan & Arsip (TU)", ic: "mail", color: "var(--purple)", bg: "var(--purple-bg)", desc: "Surat masuk & keluar, disposisi, serta arsip digital.", svc: "Correspondence & Archive", cat: "Layanan & Operasional" },
    itsm:      { label: "Layanan TI (ITSM)", ic: "ticket", color: "var(--red)", bg: "var(--red-bg)", desc: "Tiket layanan TI, SLA, eskalasi, dan basis pengetahuan.", svc: "IT Service Management", cat: "Platform & Sistem" },
    kemahasiswaan: { label: "Kemahasiswaan & Alumni", ic: "users", color: "var(--green)", bg: "var(--green-bg)", desc: "Organisasi mahasiswa, beasiswa, tracer study, dan pusat karier.", svc: "Student Affairs Service", cat: "Riset & Mutu" },
    kerjasama: { label: "Kerjasama", ic: "handshake", color: "var(--blue)", bg: "var(--blue-bg)", desc: "MoU/MoA, mitra dalam & luar negeri, dan implementasi kerjasama.", svc: "Partnership Service", cat: "Layanan & Operasional" },
    humas:     { label: "Humas & PPID", ic: "megaphone", color: "var(--blue)", bg: "var(--blue-bg)", desc: "Berita & informasi publik, layanan PPID, serta pengaduan.", svc: "Public Relations Service", cat: "Layanan & Operasional" },
    bau:       { label: "Umum & Rumah Tangga (BAU)", ic: "car", color: "var(--amber)", bg: "var(--amber-bg)", desc: "Kendaraan dinas, kebersihan, rumah tangga, dan keamanan.", svc: "General Affairs Service", cat: "Layanan & Operasional" },
    dokumen:   { label: "Dokumen & TTE", ic: "signature", color: "var(--purple)", bg: "var(--purple-bg)", desc: "Pusat dokumen, tanda tangan elektronik, dan verifikasi QR.", svc: "Document & E-Signature", cat: "Platform & Sistem" },
    workflow:  { label: "Workflow & Persetujuan", ic: "workflow", color: "var(--blue)", bg: "var(--blue-bg)", desc: "Kotak masuk persetujuan terpusat untuk proses lintas modul.", svc: "Workflow & Approval", cat: "Platform & Sistem" },
  };

  // ---------------- Navigasi per role (menu yang dapat dibuka) ----------------
  // Menu mahasiswa cocok dengan view lama agar kompatibel.
  const navByRole = {
    mahasiswa: [
      { group: null, items: [{ id: "dashboard", label: "Beranda", ic: "home" }] },
      { group: "Akademik", items: [
        { id: "krs", label: "Isi KRS", ic: "book", badge: "Buka" },
        { id: "lms", label: "Ruang Belajar", ic: "bookOpen" },
        { id: "kehadiran", label: "Perkuliahan", ic: "presentation" },
        { id: "nilai", label: "Penilaian", ic: "award" },
        { id: "kalender", label: "Kalender", ic: "calendar" },
      ]},
      { group: "Keuangan & Layanan", items: [
        { id: "pembayaran", label: "Pembayaran", ic: "wallet" },
        { id: "beasiswa", label: "Beasiswa", ic: "gift" },
        { id: "perpus", label: "Perpustakaan", ic: "bookOpen" },
        { id: "wisuda", label: "Pendaftaran Wisuda", ic: "grad" },
      ]},
      { group: "Akun", items: [
        { id: "profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    dosen: [
      { group: null, items: [{ id: "dsn_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Mengajar", items: [
        { id: "dsn_kelas", label: "Kelas Diampu", ic: "presentation" },
        { id: "dsn_lms", label: "Ruang Kelas (LMS)", ic: "bookOpen" },
        { id: "dsn_presensi", label: "Presensi & Materi", ic: "check" },
        { id: "dsn_nilai", label: "Input Nilai", ic: "award", badge: "UAS" },
        { id: "dsn_jadwal", label: "Jadwal Mengajar", ic: "calendar" },
      ]},
      { group: "Bimbingan", items: [
        { id: "dsn_ta", label: "Bimbingan Tugas Akhir", ic: "doc" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil Dosen", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    pa: [
      { group: null, items: [{ id: "pa_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Perwalian", items: [
        { id: "pa_validasi", label: "Validasi KRS", ic: "check", badge: "8" },
        { id: "pa_mahasiswa", label: "Mahasiswa Bimbingan", ic: "users" },
        { id: "pa_monitoring", label: "Monitoring Akademik", ic: "chart" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    kaprodi: [
      { group: null, items: [{ id: "prd_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Penyelenggaraan", items: [
        { id: "prd_tawaran", label: "Penawaran MK", ic: "book" },
        { id: "prd_jadwal", label: "Penjadwalan Kelas", ic: "calendar" },
        { id: "prd_kurikulum", label: "Kurikulum & RPS", ic: "doc" },
      ]},
      { group: "Akademik", items: [
        { id: "prd_mahasiswa", label: "Data Mahasiswa", ic: "users" },
        { id: "prd_krs", label: "Rekap & Validasi KRS", ic: "check", badge: "Buka" },
        { id: "prd_nilai", label: "Rekap Nilai", ic: "award" },
      ]},
      { group: "Pelaporan", items: [
        { id: "prd_feeder", label: "Pelaporan PDDikti", ic: "report" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    keuangan: [
      { group: null, items: [{ id: "keu_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Billing & Piutang", items: [
        { id: "keu_tagihan", label: "Tagihan & UKT", ic: "wallet" },
        { id: "keu_validasi", label: "Validasi Pembayaran", ic: "check", badge: "5" },
        { id: "keu_piutang", label: "Piutang Mahasiswa", ic: "chart" },
      ]},
      { group: "Layanan", items: [
        { id: "keu_beasiswa", label: "Pencairan Beasiswa", ic: "gift" },
        { id: "keu_laporan", label: "Laporan Keuangan", ic: "report" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    admin: [
      { group: null, items: [{ id: "adm_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Identity & Access (IAM)", items: [
        { id: "adm_users", label: "Manajemen Pengguna", ic: "users" },
        { id: "adm_rbac", label: "Peran & Hak Akses", ic: "key" },
      ]},
      { group: "Platform", items: [
        { id: "adm_services", label: "Monitoring Microservice", ic: "server", badge: "34" },
        { id: "adm_erd", label: "Kamus Data & ERD", ic: "database", badge: "453" },
        { id: "adm_master", label: "Master Data & Referensi", ic: "sliders" },
        { id: "adm_audit", label: "Audit Log", ic: "report" },
      ]},
      { group: "Komunikasi", items: [
        { id: "adm_pengumuman", label: "Pengumuman", ic: "bell" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    pustakawan: [
      { group: null, items: [{ id: "lib_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Sirkulasi", items: [
        { id: "lib_sirkulasi", label: "Peminjaman & Pengembalian", ic: "refresh", badge: "3" },
        { id: "lib_katalog", label: "Katalog & Koleksi", ic: "bookOpen" },
      ]},
      { group: "Keanggotaan", items: [
        { id: "lib_anggota", label: "Anggota", ic: "users" },
        { id: "lib_denda", label: "Denda & Sanksi", ic: "wallet" },
      ]},
      { group: "Repositori", items: [
        { id: "lib_repo", label: "Repositori Karya Ilmiah", ic: "doc" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    pmb: [
      { group: null, items: [{ id: "pmb_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Seleksi", items: [
        { id: "pmb_pendaftar", label: "Pendaftar", ic: "users", badge: "Baru" },
        { id: "pmb_tes", label: "Jadwal & Tes", ic: "calendar" },
        { id: "pmb_hasil", label: "Penilaian & Hasil", ic: "award" },
      ]},
      { group: "Registrasi", items: [
        { id: "pmb_daftarulang", label: "Daftar Ulang", ic: "check" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    hr: [
      { group: null, items: [{ id: "hr_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Kepegawaian", items: [
        { id: "hr_pegawai", label: "Data Pegawai", ic: "idcard" },
        { id: "hr_kehadiran", label: "Kehadiran & Cuti", ic: "check", badge: "7" },
      ]},
      { group: "Remunerasi", items: [
        { id: "hr_payroll", label: "Penggajian", ic: "wallet" },
      ]},
      { group: "Pengembangan", items: [
        { id: "hr_karir", label: "Jabatan & Kepangkatan", ic: "chart" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    pengadaan: [
      { group: null, items: [{ id: "pgd_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Pengadaan", items: [
        { id: "pgd_permintaan", label: "Permintaan Pembelian", ic: "clipboard", badge: "4" },
        { id: "pgd_po", label: "Purchase Order", ic: "cart" },
      ]},
      { group: "Mitra", items: [
        { id: "pgd_vendor", label: "Vendor / Rekanan", ic: "building" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    aset: [
      { group: null, items: [{ id: "ast_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Aset (BMN)", items: [
        { id: "ast_inventaris", label: "Inventaris Aset", ic: "box" },
        { id: "ast_pemeliharaan", label: "Pemeliharaan", ic: "wrench", badge: "5" },
      ]},
      { group: "Fasilitas", items: [
        { id: "ast_ruang", label: "Ruang & Fasilitas", ic: "building" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    calon: [
      { group: null, items: [{ id: "calon_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Seleksi Masuk", items: [
        { id: "calon_kartu", label: "Kartu Ujian", ic: "idcard" },
        { id: "calon_tes", label: "Ujian Masuk (CBT)", ic: "clipboard", badge: "Mulai" },
        { id: "calon_hasil", label: "Hasil Seleksi", ic: "award" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    lppm: [
      { group: null, items: [{ id: "lppm_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Penelitian & PkM", items: [
        { id: "lppm_hibah", label: "Skema Hibah", ic: "gift" },
        { id: "lppm_proposal", label: "Proposal & Review", ic: "doc", badge: "6" },
        { id: "lppm_luaran", label: "Luaran & Publikasi", ic: "beaker" },
        { id: "lppm_hki", label: "HKI & Paten", ic: "award" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    lpm: [
      { group: null, items: [{ id: "lpm_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Penjaminan Mutu", items: [
        { id: "lpm_audit", label: "Audit Mutu Internal", ic: "check", badge: "3" },
        { id: "lpm_akreditasi", label: "Akreditasi", ic: "shield" },
        { id: "lpm_temuan", label: "Temuan & Tindak Lanjut", ic: "flag" },
        { id: "lpm_standar", label: "Standar Mutu", ic: "target" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    mbkm: [
      { group: null, items: [{ id: "mbkm_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Program MBKM", items: [
        { id: "mbkm_program", label: "Program & Lowongan", ic: "link" },
        { id: "mbkm_pendaftar", label: "Pendaftar", ic: "users", badge: "12" },
        { id: "mbkm_konversi", label: "Konversi SKS", ic: "refresh" },
        { id: "mbkm_mitra", label: "Mitra", ic: "handshake" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    kkn: [
      { group: null, items: [{ id: "kkn_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Penyelenggaraan KKN", items: [
        { id: "kkn_periode", label: "Periode & Lokasi", ic: "flag" },
        { id: "kkn_kelompok", label: "Kelompok & DPL", ic: "users" },
        { id: "kkn_penilaian", label: "Penilaian", ic: "award", badge: "4" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    tu: [
      { group: null, items: [{ id: "tu_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Persuratan", items: [
        { id: "tu_masuk", label: "Surat Masuk", ic: "mail", badge: "7" },
        { id: "tu_keluar", label: "Surat Keluar", ic: "upload" },
        { id: "tu_disposisi", label: "Disposisi", ic: "check", badge: "3" },
        { id: "tu_arsip", label: "Arsip Digital", ic: "box" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    itsm: [
      { group: null, items: [{ id: "itsm_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Layanan TI", items: [
        { id: "itsm_tiket", label: "Tiket Layanan", ic: "ticket", badge: "9" },
        { id: "itsm_sla", label: "SLA & Kinerja", ic: "activity" },
        { id: "itsm_kb", label: "Basis Pengetahuan", ic: "bookOpen" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    kemahasiswaan: [
      { group: null, items: [{ id: "kmhs_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Kemahasiswaan", items: [
        { id: "kmhs_ormawa", label: "Organisasi Mahasiswa", ic: "users" },
        { id: "kmhs_beasiswa", label: "Beasiswa", ic: "gift", badge: "4" },
      ]},
      { group: "Alumni & Karir", items: [
        { id: "kmhs_tracer", label: "Tracer Study & Alumni", ic: "userCheck" },
        { id: "kmhs_karir", label: "Pusat Karir", ic: "briefcase" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    kerjasama: [
      { group: null, items: [{ id: "ks_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Kerjasama", items: [
        { id: "ks_mou", label: "MoU / MoA", ic: "handshake", badge: "1" },
        { id: "ks_mitra", label: "Mitra", ic: "building" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    humas: [
      { group: null, items: [{ id: "hms_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Informasi Publik", items: [
        { id: "hms_berita", label: "Berita & Informasi", ic: "megaphone" },
        { id: "hms_ppid", label: "Layanan PPID", ic: "doc" },
        { id: "hms_pengaduan", label: "Pengaduan & Aspirasi", ic: "bell", badge: "2" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    bau: [
      { group: null, items: [{ id: "bau_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Umum & Rumah Tangga", items: [
        { id: "bau_kendaraan", label: "Kendaraan Dinas", ic: "car", badge: "1" },
        { id: "bau_rt", label: "Rumah Tangga", ic: "home" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    dokumen: [
      { group: null, items: [{ id: "dok_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Dokumen & TTE", items: [
        { id: "dok_pusat", label: "Pusat Dokumen", ic: "doc" },
        { id: "dok_tte", label: "Tanda Tangan Elektronik", ic: "signature", badge: "2" },
        { id: "dok_verifikasi", label: "Verifikasi QR", ic: "shield" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
    workflow: [
      { group: null, items: [{ id: "wf_dashboard", label: "Beranda", ic: "home" }] },
      { group: "Persetujuan", items: [
        { id: "wf_inbox", label: "Kotak Persetujuan", ic: "workflow", badge: "5" },
        { id: "wf_alur", label: "Definisi Alur", ic: "sliders" },
      ]},
      { group: "Akun", items: [
        { id: "dsn_profil", label: "Profil", ic: "user" },
        { id: "bantuan", label: "Bantuan", ic: "help" },
      ]},
    ],
  };

  const titles = {
    // mahasiswa (sinkron dengan app lama)
    dashboard: ["Beranda", "Ringkasan akademik Anda"], krs: ["Akademik", "Isi KRS"],
    kehadiran: ["Akademik", "Perkuliahan"], nilai: ["Akademik", "Penilaian"],
    kalender: ["Akademik", "Kalender Perkuliahan"], pembayaran: ["Keuangan", "Rekap Pembayaran"],
    beasiswa: ["Layanan", "Beasiswa"], profil: ["Akun", "Profil Saya"], bantuan: ["Akun", "Bantuan"],
    // dosen
    dsn_dashboard: ["Dosen", "Beranda"], dsn_kelas: ["Mengajar", "Kelas Diampu"],
    dsn_presensi: ["Mengajar", "Presensi & Materi"], dsn_nilai: ["Mengajar", "Input Nilai"],
    dsn_jadwal: ["Mengajar", "Jadwal Mengajar"], dsn_ta: ["Bimbingan", "Tugas Akhir"], dsn_profil: ["Akun", "Profil"],
    // pa
    pa_dashboard: ["Penasihat Akademik", "Beranda"], pa_validasi: ["Perwalian", "Validasi KRS"],
    pa_mahasiswa: ["Perwalian", "Mahasiswa Bimbingan"], pa_monitoring: ["Perwalian", "Monitoring Akademik"],
    // kaprodi
    prd_dashboard: ["Akademik Prodi", "Beranda"], prd_tawaran: ["Penyelenggaraan", "Penawaran Mata Kuliah"],
    prd_jadwal: ["Penyelenggaraan", "Penjadwalan Kelas"], prd_kurikulum: ["Penyelenggaraan", "Kurikulum & RPS"],
    prd_mahasiswa: ["Akademik", "Data Mahasiswa"], prd_krs: ["Akademik", "Rekap & Validasi KRS"],
    prd_nilai: ["Akademik", "Rekap Nilai"], prd_feeder: ["Pelaporan", "Sinkronisasi PDDikti"],
    // keuangan
    keu_dashboard: ["Keuangan", "Beranda"], keu_tagihan: ["Billing", "Tagihan & UKT"],
    keu_validasi: ["Billing", "Validasi Pembayaran"], keu_piutang: ["Billing", "Piutang Mahasiswa"],
    keu_beasiswa: ["Layanan", "Pencairan Beasiswa"], keu_laporan: ["Pelaporan", "Laporan Keuangan"],
    // admin
    adm_dashboard: ["Administrator", "Beranda"], adm_users: ["IAM", "Manajemen Pengguna"],
    adm_rbac: ["IAM", "Peran & Hak Akses"], adm_services: ["Platform", "Monitoring Microservice"],
    adm_erd: ["Platform", "Kamus Data & ERD"],
    adm_master: ["Platform", "Master Data & Referensi"], adm_audit: ["Platform", "Audit Log"],
    adm_pengumuman: ["Komunikasi", "Pengumuman"],
    // mahasiswa tambahan
    lms: ["Akademik", "Ruang Belajar"], perpus: ["Layanan", "Perpustakaan Saya"], wisuda: ["Layanan", "Pendaftaran Wisuda"],
    // dosen tambahan
    dsn_lms: ["Mengajar", "Ruang Kelas (LMS)"],
    // perpustakaan
    lib_dashboard: ["Perpustakaan", "Beranda"], lib_sirkulasi: ["Sirkulasi", "Peminjaman & Pengembalian"],
    lib_katalog: ["Sirkulasi", "Katalog & Koleksi"], lib_anggota: ["Keanggotaan", "Anggota"],
    lib_denda: ["Keanggotaan", "Denda & Sanksi"], lib_repo: ["Repositori", "Karya Ilmiah"],
    // pmb
    pmb_dashboard: ["Panitia PMB", "Beranda"], pmb_pendaftar: ["Seleksi", "Pendaftar"],
    pmb_tes: ["Seleksi", "Jadwal & Tes"], pmb_hasil: ["Seleksi", "Penilaian & Hasil"], pmb_daftarulang: ["Registrasi", "Daftar Ulang"],
    // hr
    hr_dashboard: ["SDM", "Beranda"], hr_pegawai: ["Kepegawaian", "Data Pegawai"],
    hr_kehadiran: ["Kepegawaian", "Kehadiran & Cuti"], hr_payroll: ["Remunerasi", "Penggajian"], hr_karir: ["Pengembangan", "Jabatan & Kepangkatan"],
    // pengadaan
    pgd_dashboard: ["Pengadaan", "Beranda"], pgd_permintaan: ["Pengadaan", "Permintaan Pembelian"],
    pgd_po: ["Pengadaan", "Purchase Order"], pgd_vendor: ["Mitra", "Vendor / Rekanan"],
    // aset
    ast_dashboard: ["Aset & Fasilitas", "Beranda"], ast_inventaris: ["Aset", "Inventaris Aset (BMN)"],
    ast_pemeliharaan: ["Aset", "Pemeliharaan"], ast_ruang: ["Fasilitas", "Ruang & Fasilitas"],
    // calon mahasiswa
    calon_dashboard: ["Calon Mahasiswa", "Beranda"], calon_kartu: ["Seleksi Masuk", "Kartu Ujian"],
    calon_tes: ["Seleksi Masuk", "Ujian Masuk (CBT)"], calon_hasil: ["Seleksi Masuk", "Hasil Seleksi"],
    // lppm
    lppm_dashboard: ["LPPM", "Beranda"], lppm_hibah: ["Penelitian & PkM", "Skema Hibah"],
    lppm_proposal: ["Penelitian & PkM", "Proposal & Review"], lppm_luaran: ["Penelitian & PkM", "Luaran & Publikasi"], lppm_hki: ["Penelitian & PkM", "HKI & Paten"],
    // lpm
    lpm_dashboard: ["Penjaminan Mutu", "Beranda"], lpm_audit: ["Penjaminan Mutu", "Audit Mutu Internal (AMI)"],
    lpm_akreditasi: ["Penjaminan Mutu", "Akreditasi"], lpm_temuan: ["Penjaminan Mutu", "Temuan & Tindak Lanjut"], lpm_standar: ["Penjaminan Mutu", "Standar Mutu"],
    // mbkm
    mbkm_dashboard: ["MBKM", "Beranda"], mbkm_program: ["Program MBKM", "Program & Lowongan"],
    mbkm_pendaftar: ["Program MBKM", "Pendaftar"], mbkm_konversi: ["Program MBKM", "Konversi SKS"], mbkm_mitra: ["Program MBKM", "Mitra"],
    // kkn
    kkn_dashboard: ["KKN", "Beranda"], kkn_periode: ["KKN", "Periode & Lokasi"],
    kkn_kelompok: ["KKN", "Kelompok & DPL"], kkn_penilaian: ["KKN", "Penilaian"],
    // tu
    tu_dashboard: ["Tata Usaha", "Beranda"], tu_masuk: ["Persuratan", "Surat Masuk"],
    tu_keluar: ["Persuratan", "Surat Keluar"], tu_disposisi: ["Persuratan", "Disposisi"], tu_arsip: ["Persuratan", "Arsip Digital"],
    // itsm
    itsm_dashboard: ["Layanan TI", "Beranda"], itsm_tiket: ["Layanan TI", "Tiket Layanan"],
    itsm_sla: ["Layanan TI", "SLA & Kinerja"], itsm_kb: ["Layanan TI", "Basis Pengetahuan"],
    // kemahasiswaan
    kmhs_dashboard: ["Kemahasiswaan", "Beranda"], kmhs_ormawa: ["Kemahasiswaan", "Organisasi Mahasiswa"],
    kmhs_beasiswa: ["Kemahasiswaan", "Beasiswa"], kmhs_tracer: ["Alumni & Karir", "Tracer Study & Alumni"], kmhs_karir: ["Alumni & Karir", "Pusat Karir"],
    // kerjasama
    ks_dashboard: ["Kerjasama", "Beranda"], ks_mou: ["Kerjasama", "MoU / MoA"], ks_mitra: ["Kerjasama", "Mitra"],
    // humas
    hms_dashboard: ["Humas", "Beranda"], hms_berita: ["Informasi Publik", "Berita & Informasi"],
    hms_ppid: ["Informasi Publik", "Layanan PPID"], hms_pengaduan: ["Informasi Publik", "Pengaduan & Aspirasi"],
    // bau
    bau_dashboard: ["BAU", "Beranda"], bau_kendaraan: ["Umum & Rumah Tangga", "Kendaraan Dinas"], bau_rt: ["Umum & Rumah Tangga", "Rumah Tangga & Kebersihan"],
    // dokumen
    dok_dashboard: ["Dokumen & TTE", "Beranda"], dok_pusat: ["Dokumen & TTE", "Pusat Dokumen"],
    dok_tte: ["Dokumen & TTE", "Tanda Tangan Elektronik"], dok_verifikasi: ["Dokumen & TTE", "Verifikasi Keaslian (QR)"],
    // workflow
    wf_dashboard: ["Workflow", "Beranda"], wf_inbox: ["Persetujuan", "Kotak Persetujuan"], wf_alur: ["Persetujuan", "Definisi Alur"],
  };

  // ================= 34 MICROSERVICE (Daftar Service) =================
  const services = [
    { no: 1, kode: "adm", nama: "Admissions Service (PMB)", domain: "Core", db: "PostgreSQL", tipe: "SQL", replica: "×2–10", run: 4, owner: "BAA/Panitia PMB", entitas: 24, status: "up", rps: 86, lat: 42, cpu: 38 },
    { no: 2, kode: "cur", nama: "Curriculum Service", domain: "Core", db: "PostgreSQL", tipe: "SQL", replica: "×2", run: 2, owner: "Prodi/BAA", entitas: 14, status: "up", rps: 41, lat: 28, cpu: 21 },
    { no: 3, kode: "std", nama: "Student Service", domain: "Core", db: "PostgreSQL", tipe: "SQL", replica: "×4–8", run: 6, owner: "BAA", entitas: 9, status: "up", rps: 240, lat: 35, cpu: 54 },
    { no: 4, kode: "cls", nama: "Class & Scheduling Service", domain: "Core", db: "PostgreSQL", tipe: "SQL", replica: "×2–5", run: 3, owner: "BAA/Prodi", entitas: 9, status: "up", rps: 120, lat: 31, cpu: 44 },
    { no: 5, kode: "krs", nama: "Enrollment / KRS Service", domain: "Core", db: "PostgreSQL", tipe: "SQL", replica: "×4–20", run: 14, owner: "BAA", entitas: 9, status: "degraded", rps: 980, lat: 187, cpu: 88 },
    { no: 6, kode: "lrn", nama: "Learning Delivery & Attendance", domain: "Core", db: "MongoDB", tipe: "NoSQL", replica: "×3–8", run: 5, owner: "Prodi/Dosen", entitas: 12, status: "up", rps: 310, lat: 46, cpu: 51 },
    { no: 7, kode: "asm", nama: "Assessment & Grading Service", domain: "Core", db: "PostgreSQL", tipe: "SQL", replica: "×3–8", run: 5, owner: "Prodi/Dosen", entitas: 14, status: "up", rps: 175, lat: 52, cpu: 60 },
    { no: 8, kode: "sts", nama: "Student Status Service", domain: "Core", db: "PostgreSQL", tipe: "SQL", replica: "×2", run: 2, owner: "BAA", entitas: 10, status: "up", rps: 28, lat: 22, cpu: 18 },
    { no: 9, kode: "tha", nama: "Thesis / Final Project Service", domain: "Core", db: "PostgreSQL", tipe: "SQL", replica: "×2", run: 2, owner: "Prodi", entitas: 15, status: "up", rps: 33, lat: 40, cpu: 24 },
    { no: 10, kode: "grd", nama: "Graduation & Credential Service", domain: "Core", db: "PostgreSQL", tipe: "SQL", replica: "×2–4", run: 2, owner: "BAA", entitas: 15, status: "up", rps: 19, lat: 38, cpu: 16 },
    { no: 11, kode: "fdr", nama: "PDDikti Feeder Service", domain: "Core", db: "PostgreSQL", tipe: "SQL", replica: "×2", run: 2, owner: "BAA/TIK", entitas: 8, status: "up", rps: 12, lat: 210, cpu: 33 },
    { no: 12, kode: "lppm", nama: "Research & Community (LPPM)", domain: "Core", db: "PostgreSQL", tipe: "SQL", replica: "×2", run: 2, owner: "LPPM", entitas: 24, status: "up", rps: 17, lat: 30, cpu: 20 },
    { no: 13, kode: "saf", nama: "Student Affairs Service", domain: "Core", db: "PostgreSQL", tipe: "SQL", replica: "×2", run: 2, owner: "Kemahasiswaan", entitas: 16, status: "up", rps: 44, lat: 27, cpu: 23 },
    { no: 14, kode: "exp", nama: "Experiential Learning (MBKM)", domain: "Core", db: "PostgreSQL", tipe: "SQL", replica: "×2", run: 2, owner: "BAA/MBKM", entitas: 22, status: "up", rps: 21, lat: 33, cpu: 19 },
    { no: 15, kode: "ref", nama: "Reference & Academic Structure", domain: "Core", db: "PostgreSQL", tipe: "SQL", replica: "×2–4", run: 3, owner: "BAA/PDDikti", entitas: 12, status: "up", rps: 420, lat: 12, cpu: 30 },
    { no: 16, kode: "bil", nama: "Billing & Receivables Service", domain: "Support", db: "PostgreSQL", tipe: "SQL", replica: "×3–8", run: 5, owner: "Keuangan", entitas: 8, status: "up", rps: 260, lat: 48, cpu: 57 },
    { no: 17, kode: "acc", nama: "Accounting & Budget Service", domain: "Support", db: "PostgreSQL", tipe: "SQL", replica: "×2", run: 2, owner: "Keuangan", entitas: 28, status: "up", rps: 36, lat: 41, cpu: 26 },
    { no: 18, kode: "hr", nama: "HR Service (SDM)", domain: "Support", db: "PostgreSQL", tipe: "SQL", replica: "×2", run: 2, owner: "SDM", entitas: 35, status: "up", rps: 30, lat: 37, cpu: 22 },
    { no: 19, kode: "lib", nama: "Library Service", domain: "Support", db: "PostgreSQL", tipe: "SQL", replica: "×2", run: 2, owner: "Perpustakaan", entitas: 17, status: "up", rps: 58, lat: 25, cpu: 28 },
    { no: 20, kode: "qa", nama: "Quality Assurance Service", domain: "Support", db: "PostgreSQL", tipe: "SQL", replica: "×2", run: 2, owner: "LPM", entitas: 18, status: "up", rps: 14, lat: 44, cpu: 17, cache: "Elasticsearch" },
    { no: 21, kode: "ast", nama: "Asset & Facility Service", domain: "Support", db: "PostgreSQL", tipe: "SQL", replica: "×2", run: 2, owner: "BAU/Sarpras", entitas: 15, status: "up", rps: 22, lat: 29, cpu: 19 },
    { no: 22, kode: "pcr", nama: "Procurement Service", domain: "Support", db: "PostgreSQL", tipe: "SQL", replica: "×2", run: 2, owner: "Pengadaan", entitas: 16, status: "up", rps: 11, lat: 35, cpu: 15 },
    { no: 23, kode: "par", nama: "Partnership Service", domain: "Support", db: "PostgreSQL", tipe: "SQL", replica: "×1–2", run: 1, owner: "Kerjasama/WR4", entitas: 7, status: "up", rps: 6, lat: 31, cpu: 11 },
    { no: 24, kode: "tu", nama: "Correspondence & Archive (TU)", domain: "Support", db: "PostgreSQL", tipe: "SQL", replica: "×2", run: 2, owner: "TU/Sekretariat", entitas: 8, status: "up", rps: 18, lat: 34, cpu: 16 },
    { no: 25, kode: "hms", nama: "Public Relations Service (Humas)", domain: "Support", db: "PostgreSQL", tipe: "SQL", replica: "×1–2", run: 1, owner: "Humas", entitas: 7, status: "up", rps: 9, lat: 28, cpu: 12 },
    { no: 26, kode: "itsm", nama: "IT Service Management", domain: "Support", db: "PostgreSQL", tipe: "SQL", replica: "×2", run: 2, owner: "TIK/Helpdesk", entitas: 7, status: "up", rps: 24, lat: 33, cpu: 20 },
    { no: 27, kode: "bau", nama: "General Affairs Service (BAU)", domain: "Support", db: "PostgreSQL", tipe: "SQL", replica: "×1–2", run: 1, owner: "BAU", entitas: 7, status: "up", rps: 7, lat: 30, cpu: 10 },
    { no: 28, kode: "iam", nama: "Identity & Access Service (IAM)", domain: "Platform", db: "PostgreSQL", tipe: "SQL", replica: "×3–6", run: 4, owner: "TIK/Security", entitas: 20, status: "up", rps: 640, lat: 9, cpu: 47, cache: "Redis" },
    { no: 29, kode: "ntf", nama: "Notification Service", domain: "Platform", db: "MongoDB", tipe: "NoSQL", replica: "×2–4", run: 3, owner: "TIK", entitas: 8, status: "up", rps: 190, lat: 18, cpu: 34, cache: "Redis" },
    { no: 30, kode: "doc", nama: "Document & E-Signature Service", domain: "Platform", db: "MongoDB", tipe: "NoSQL", replica: "×2–4", run: 2, owner: "TIK", entitas: 8, status: "up", rps: 47, lat: 56, cpu: 29, cache: "MinIO" },
    { no: 31, kode: "wf", nama: "Workflow & Approval Service", domain: "Platform", db: "PostgreSQL", tipe: "SQL", replica: "×2", run: 2, owner: "TIK", entitas: 7, status: "up", rps: 52, lat: 26, cpu: 25 },
    { no: 32, kode: "intg", nama: "Integration Hub / API Gateway", domain: "Platform", db: "PostgreSQL", tipe: "SQL", replica: "×2–4", run: 3, owner: "TIK", entitas: 8, status: "degraded", rps: 1120, lat: 73, cpu: 71, cache: "Redis" },
    { no: 33, kode: "aud", nama: "Audit & Log Service", domain: "Platform", db: "Elasticsearch", tipe: "NoSQL", replica: "×3–6", run: 4, owner: "TIK/Security", entitas: 7, status: "up", rps: 520, lat: 22, cpu: 49 },
    { no: 34, kode: "cfg", nama: "Configuration & Master-Data", domain: "Platform", db: "PostgreSQL", tipe: "SQL", replica: "×2", run: 2, owner: "TIK", entitas: 9, status: "up", rps: 305, lat: 11, cpu: 27, cache: "Redis" },
  ];

  // ================= Pengguna (IAM) =================
  const users = [
    { nama: "Aisyah Nur Ramadhani", username: "11210910000045", role: "Mahasiswa", unit: "TI · FST", status: "Aktif", terakhir: "Hari ini 08:42", mfa: true },
    { nama: "Dr. Imam Marzuki, M.Kom", username: "0312088203", role: "Dosen, Dosen PA", unit: "TI · FST", status: "Aktif", terakhir: "Hari ini 07:55", mfa: true },
    { nama: "Dr. Hj. Rina Mahmudah, M.T", username: "0408107505", role: "Kaprodi", unit: "TI · FST", status: "Aktif", terakhir: "Kemarin 16:20", mfa: true },
    { nama: "Bambang Sutejo, M.Kom", username: "0421067908", role: "Dosen", unit: "TI · FST", status: "Aktif", terakhir: "Hari ini 09:10", mfa: false },
    { nama: "Drs. Bambang Santoso", username: "1987031245", role: "Keuangan", unit: "Biro Keuangan", status: "Aktif", terakhir: "Hari ini 08:05", mfa: true },
    { nama: "Yusuf Ramli, M.Kom", username: "1990110078", role: "Administrator", unit: "PUSTIPANDA", status: "Aktif", terakhir: "Hari ini 06:30", mfa: true },
    { nama: "Dewi Lestari, M.Kom", username: "0415099002", role: "Dosen", unit: "TI · FST", status: "Aktif", terakhir: "3 hari lalu", mfa: false },
    { nama: "Rahmat Hidayat", username: "11220910000112", role: "Mahasiswa", unit: "TI · FST", status: "Nonaktif", terakhir: "2 minggu lalu", mfa: false },
    { nama: "Siti Aminah, S.Kom", username: "1995080033", role: "Operator BAA", unit: "BAA", status: "Aktif", terakhir: "Hari ini 10:02", mfa: true },
    { nama: "Hendra Wijaya, M.T", username: "0419088104", role: "Dosen", unit: "TI · FST", status: "Terkunci", terakhir: "1 bulan lalu", mfa: false },
  ];

  // ================= Matriks RBAC: peran × modul =================
  const modules = [
    "Profil & Akun", "KRS / Enrollment", "Perkuliahan & Presensi", "Penilaian", "Kurikulum",
    "Penjadwalan Kelas", "Data Mahasiswa", "Billing & Pembayaran", "Beasiswa", "Pelaporan PDDikti",
    "Manajemen Pengguna", "Peran & Hak Akses", "Master Data", "Monitoring & Audit",
  ];
  // levels: '-' none, 'R' read, 'W' read+write, 'A' admin/full
  const rbac = {
    Mahasiswa:   ["W","W","R","R","R","-","-","R","W","-","-","-","-","-"],
    Dosen:       ["W","-","W","W","R","R","R","-","-","-","-","-","-","-"],
    "Dosen PA":  ["W","W","R","R","R","-","R","-","-","-","-","-","-","-"],
    Kaprodi:     ["W","R","R","W","W","W","W","-","R","W","-","-","R","R"],
    Keuangan:    ["W","-","-","-","-","-","R","A","W","-","-","-","R","R"],
    Administrator:["W","R","R","R","R","R","R","R","R","R","A","A","A","A"],
  };

  // ================= Audit Log =================
  const auditLog = [
    { ts: "2026-06-23 10:42:17", actor: "Dr. Hj. Rina Mahmudah", role: "Kaprodi", svc: "cls", act: "CLASS_OFFERING_PUBLISHED", obj: "TIF6101 Kelas 6A", ip: "10.21.4.88", level: "info" },
    { ts: "2026-06-23 10:31:02", actor: "Aisyah Nur Ramadhani", role: "Mahasiswa", svc: "krs", act: "KRS_SUBMITTED", obj: "KRS 2026/2027-Ganjil", ip: "182.1.55.210", level: "info" },
    { ts: "2026-06-23 10:12:55", actor: "Dr. Imam Marzuki", role: "Dosen PA", svc: "krs", act: "KRS_APPROVED", obj: "NIM 11220910000087", ip: "10.21.4.51", level: "info" },
    { ts: "2026-06-23 09:58:41", actor: "system", role: "scheduler", svc: "fdr", act: "FEEDER_SYNC_BATCH", obj: "5.482 record → Neo Feeder", ip: "10.21.9.2", level: "info" },
    { ts: "2026-06-23 09:40:09", actor: "Drs. Bambang Santoso", role: "Keuangan", svc: "bil", act: "PAYMENT_VALIDATED", obj: "VA 8810•••0045", ip: "10.21.6.12", level: "info" },
    { ts: "2026-06-23 09:21:33", actor: "intg-gateway", role: "service", svc: "intg", act: "RATE_LIMIT_TRIGGERED", obj: "POST /krs/enroll (980 rps)", ip: "10.21.0.4", level: "warn" },
    { ts: "2026-06-23 09:03:18", actor: "Hendra Wijaya", role: "Dosen", svc: "iam", act: "LOGIN_FAILED ×5 — ACCOUNT_LOCKED", obj: "user 0419088104", ip: "114.4.78.9", level: "error" },
    { ts: "2026-06-23 08:47:50", actor: "Yusuf Ramli", role: "Administrator", svc: "iam", act: "ROLE_GRANTED", obj: "Operator BAA → Siti Aminah", ip: "10.21.0.10", level: "info" },
    { ts: "2026-06-23 08:30:11", actor: "krs-svc", role: "service", svc: "krs", act: "HPA_SCALE_UP", obj: "replica 8 → 14", ip: "10.21.5.0", level: "warn" },
    { ts: "2026-06-23 08:05:44", actor: "Drs. Bambang Santoso", role: "Keuangan", svc: "bil", act: "INVOICE_GENERATED", obj: "Batch UKT 2026-Ganjil (3.214)", ip: "10.21.6.12", level: "info" },
  ];

  // ================= Master Data / Referensi (cfg + ref) =================
  const master = {
    tahunAkademik: [
      { kode: "20261", label: "2026/2027 Ganjil", status: "Aktif", krs: "Dibuka", mulai: "01 Sep 2026" },
      { kode: "20252", label: "2025/2026 Genap", status: "Selesai", krs: "Tutup", mulai: "01 Feb 2026" },
      { kode: "20251", label: "2025/2026 Ganjil", status: "Berjalan", krs: "Tutup", mulai: "01 Sep 2025" },
    ],
    fakultas: [
      { kode: "FST", nama: "Sains dan Teknologi", prodi: 7, dekan: "Prof. Dr. Lily Surayya, M.Env" },
      { kode: "FEB", nama: "Ekonomi dan Bisnis", prodi: 5, dekan: "Dr. Amilin, S.E., M.Si" },
      { kode: "FDK", nama: "Dakwah dan Ilmu Komunikasi", prodi: 4, dekan: "Dr. Suhaimi, M.Si" },
    ],
    prodi: [
      { kode: "55201", nama: "Teknik Informatika", jenjang: "S1", akreditasi: "Unggul", kaprodi: "Dr. Hj. Rina Mahmudah, M.T" },
      { kode: "57201", nama: "Sistem Informasi", jenjang: "S1", akreditasi: "Baik Sekali", kaprodi: "Nurul Aini, M.Kom" },
      { kode: "48201", nama: "Teknik Elektro", jenjang: "S1", akreditasi: "Baik Sekali", kaprodi: "Hendra Wijaya, M.T" },
    ],
    penomoran: [
      { jenis: "NIM", format: "TTPPPFFFFFNNNN", contoh: "11210910000045", svc: "cfg" },
      { jenis: "No. Ijazah", format: "NN/PT/THN/NNNN", contoh: "07/UIN/2026/0451", svc: "grd" },
      { jenis: "No. Invoice", format: "INV/THN/BLN/NNNN", contoh: "INV/2026/06/3214", svc: "bil" },
      { jenis: "No. Surat", format: "NN/KODE/THN", contoh: "112/Un.01/2026", svc: "tu" },
    ],
  };

  return { personas, roleMeta, navByRole, titles, services, users, modules, rbac, auditLog, master };
})();

export {};
