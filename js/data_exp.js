// ============================================================
// AIS — Data Pengalaman/Experiential Learning (service: exp)
// Katalog LOWONGAN MBKM · PKL/Magang · KKN + seed pendaftaran
// Dipakai bersama sisi MAHASISWA (daftar) & PENGELOLA (tindak lanjut)
// via store lintas peran: useSharedList("exp_pendaftaran", window.AIS_EXP.seed)
// Selaras Sequence-Mahasiswa FLOW 18/19/20 (entitas 22.x & 23.x)
// ============================================================
window.AIS_EXP = (function () {

  // ---- Lowongan MBKM (22.1.1/22.1.2/22.1.3) ----
  const mbkm = [
    { id: "MB-01", nama: "Magang Bersertifikat — Backend Engineer", jenis: "Magang", mitra: "PT GoTo Gojek Tokopedia", lokasi: "Jakarta", sks: 20, kuota: 8, terisi: 6, durasi: "6 bulan", ipkMin: 3.0, status: "Dibuka",
      desc: "Magang penuh waktu sebagai backend engineer pada tim platform pembayaran. Konversi 20 SKS setara satu semester.", syarat: ["Semester ≥ 5", "IPK ≥ 3,00", "Menguasai dasar pemrograman"] },
    { id: "MB-02", nama: "Studi Independen — Machine Learning", jenis: "Studi Independen", mitra: "Dicoding Indonesia", lokasi: "Daring", sks: 20, kuota: 15, terisi: 15, durasi: "5 bulan", ipkMin: 2.75, status: "Penuh",
      desc: "Belajar terstruktur ML engineering dengan proyek akhir ter-mentori. Setara 20 SKS.", syarat: ["Semester ≥ 4", "IPK ≥ 2,75"] },
    { id: "MB-03", nama: "Kampus Mengajar Angkatan 8", jenis: "Asistensi Mengajar", mitra: "Kemdikbudristek", lokasi: "Jawa Barat", sks: 20, kuota: 12, terisi: 4, durasi: "1 semester", ipkMin: 3.0, status: "Dibuka",
      desc: "Membantu proses belajar-mengajar di sekolah dasar/menengah 3T. Setara 20 SKS + tunjangan.", syarat: ["Semester ≥ 5", "IPK ≥ 3,00", "Lulus tes kebhinekaan"] },
    { id: "MB-04", nama: "Pertukaran Mahasiswa Merdeka (PMM)", jenis: "Pertukaran", mitra: "PMM Nasional", lokasi: "Luar Pulau", sks: 20, kuota: 10, terisi: 7, durasi: "1 semester", ipkMin: 2.75, status: "Dibuka",
      desc: "Belajar satu semester di perguruan tinggi lain sambil mengenal keberagaman budaya nusantara.", syarat: ["Semester ≥ 3", "IPK ≥ 2,75"] },
    { id: "MB-05", nama: "Riset — Kecerdasan Buatan (BRIN)", jenis: "Penelitian", mitra: "BRIN", lokasi: "Bandung", sks: 20, kuota: 5, terisi: 2, durasi: "6 bulan", ipkMin: 3.25, status: "Dibuka",
      desc: "Terlibat proyek riset AI bersama periset BRIN, berpotensi menghasilkan publikasi.", syarat: ["Semester ≥ 6", "IPK ≥ 3,25", "Portofolio riset"] },
  ];

  // ---- Instansi/Lowongan PKL / Magang (23.1.1/23.1.2) ----
  const pkl = [
    { id: "PK-01", instansi: "PT Telkom Indonesia — DDB", bidang: "Jaringan & Infrastruktur", lokasi: "Bandung", sks: 4, kuota: 6, terisi: 3, durasi: "2 bulan", status: "Dibuka",
      desc: "Praktik kerja lapangan pada divisi Digital Business & Technology, fokus operasi jaringan." },
    { id: "PK-02", instansi: "Bank Syariah Indonesia — IT", bidang: "Sistem Informasi", lokasi: "Jakarta", sks: 4, kuota: 4, terisi: 1, durasi: "2 bulan", status: "Dibuka",
      desc: "PKL pada tim pengembangan aplikasi mobile banking dan core system." },
    { id: "PK-03", instansi: "Dinas Kominfo Kota", bidang: "Pemerintahan Digital", lokasi: "Kota Ilmu", sks: 3, kuota: 8, terisi: 8, durasi: "1,5 bulan", status: "Penuh",
      desc: "Praktik di layanan pemerintahan digital & smart city." },
    { id: "PK-04", instansi: "Startup EdTech \u2014 Ruang Kelas", bidang: "Pengembangan Produk", lokasi: "Daring/Hybrid", sks: 4, kuota: 5, terisi: 2, durasi: "3 bulan", status: "Dibuka",
      desc: "Terlibat pengembangan fitur platform pembelajaran daring end-to-end." },
  ];

  // ---- Gelombang/Periode KKN (23.2.1/23.2.3) ----
  const kkn = [
    { id: "KK-01", nama: "KKN Tematik 2025/2026 Genap — Gel. 1", periode: "Jul – Agu 2026", sks: 3, kuota: 120, terisi: 84, tema: "Digitalisasi UMKM Desa", lokasi: "Kab. Bogor (4 desa)", status: "Dibuka",
      desc: "KKN tematik selama 40 hari membangun literasi & digitalisasi UMKM desa. Penempatan kelompok oleh panitia.", syarat: ["Semester ≥ 6", "Lulus ≥ 100 SKS", "Sehat jasmani"] },
    { id: "KK-02", nama: "KKN Kebangsaan 2026", periode: "Agu – Sep 2026", sks: 3, kuota: 30, terisi: 12, tema: "Wawasan Kebangsaan", lokasi: "Antar-Provinsi", status: "Dibuka",
      desc: "KKN kolaboratif lintas kampus se-Indonesia. Seleksi ketat + wawancara.", syarat: ["Semester ≥ 6", "IPK ≥ 3,25", "Lulus wawancara"] },
  ];

  // ---- Seed pendaftaran (unified) — mengalir ke pengelola MBKM/KKN ----
  // status: daftar → seleksi → diterima|ditolak → berjalan → selesai
  const seed = [
    { id: 1, jenis: "MBKM", nim: "11210910000045", nama: "Aisyah Nur Ramadhani", prodi: "Teknik Informatika", program: "Magang Bersertifikat — Backend Engineer", offerId: "MB-01", tgl: "22 Jun 2026", ipk: 3.71, status: "diterima", sks: 20, logbook: [], nilai: null },
    { id: 2, jenis: "MBKM", nim: "11210910000033", nama: "Bayu Pratama", prodi: "Teknik Informatika", program: "Kampus Mengajar Angkatan 8", offerId: "MB-03", tgl: "20 Jun 2026", ipk: 3.12, status: "seleksi", sks: 20, logbook: [], nilai: null },
    { id: 3, jenis: "MBKM", nim: "11210910000052", nama: "Citra Lestari", prodi: "Sistem Informasi", program: "Riset — Kecerdasan Buatan (BRIN)", offerId: "MB-05", tgl: "12 Jun 2026", ipk: 3.55, status: "selesai", sks: 20, logbook: [{ tgl: "01 Jun", isi: "Onboarding & studi literatur" }], nilai: "A" },
    { id: 4, jenis: "PKL", nim: "11200910000018", nama: "Dimas Hidayat", prodi: "Teknik Elektro", program: "PT Telkom Indonesia — DDB", offerId: "PK-01", tgl: "18 Jun 2026", ipk: 3.30, status: "berjalan", sks: 4, logbook: [{ tgl: "16 Jun", isi: "Pengenalan unit & K3" }], nilai: null },
    { id: 5, jenis: "KKN", nim: "11210910000061", nama: "Galang Maulana", prodi: "Teknik Informatika", program: "KKN Tematik 2025/2026 Genap — Gel. 1", offerId: "KK-01", tgl: "10 Jun 2026", ipk: 3.48, status: "daftar", sks: 3, logbook: [], nilai: null },
  ];

  const JENIS_TONE = { MBKM: "purple", PKL: "blue", KKN: "green" };
  const STATUS_FLOW = ["daftar", "seleksi", "diterima", "berjalan", "selesai"];
  const STATUS_LABEL = {
    daftar: ["Mendaftar", "gray"], seleksi: ["Seleksi", "amber"], diterima: ["Diterima", "blue"],
    ditolak: ["Ditolak", "red"], berjalan: ["Berjalan", "blue"], selesai: ["Selesai", "green"],
  };

  return { mbkm, pkl, kkn, seed, JENIS_TONE, STATUS_FLOW, STATUS_LABEL };
})();
