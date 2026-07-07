// ============================================================
// AIS — Mock Data
// ============================================================
window.AIS_DATA = (function () {
  const mahasiswa = {
    nama: "Aisyah Nur Ramadhani",
    nim: "11210910000045",
    fakultas: "Sains dan Teknologi",
    prodi: "Teknik Informatika",
    jenjang: "S1",
    angkatan: "2023",
    semester: 5,
    tahunAjaran: "2025/2026 Ganjil",
    status: "Aktif",
    ipk: 3.62,
    sksLulus: 92,
    sksMax: 24,
    dosenPA: "Dr. Imam Marzuki, M.Kom",
    email: "aisyah.ramadhani23@mhs.uin.ac.id",
    telepon: "0812-3456-7890",
    tempatLahir: "Bogor",
    tanggalLahir: "14 Maret 2005",
    jenisKelamin: "Perempuan",
    agama: "Islam",
    alamat: "Jl. Kenanga No. 17, Ciputat, Tangerang Selatan",
    golonganDarah: "B",
    namaAyah: "Ahmad Ramadhani",
    namaIbu: "Siti Khadijah",
    pekerjaanAyah: "Wiraswasta",
    statusUKT: "Golongan III",
    ukt: 4200000,
  };

  // IP -> batas SKS
  const aturanSKS = [
    { min: 3.0, max: 4.0, sks: 24 },
    { min: 2.5, max: 2.99, sks: 21 },
    { min: 2.0, max: 2.49, sks: 18 },
    { min: 1.5, max: 1.99, sks: 16 },
    { min: 1.0, max: 1.49, sks: 14 },
  ];

  // Mata kuliah yang ditawarkan untuk KRS semester 5
  const tawaranMK = [
    { kode: "TIF5101", nama: "Kecerdasan Buatan", sks: 3, kelas: "5A", dosen: "Dr. Imam Marzuki, M.Kom", hari: "Senin", jam: "08:00 - 10:30", ruang: "FST-301", kuota: 40, terisi: 32, wajib: true },
    { kode: "TIF5102", nama: "Pemrograman Web Lanjut", sks: 3, kelas: "5A", dosen: "Rina Mahmudah, M.T", hari: "Senin", jam: "13:00 - 15:30", ruang: "Lab-Komputer 2", kuota: 35, terisi: 30, wajib: true },
    { kode: "TIF5103", nama: "Basis Data Lanjut", sks: 3, kelas: "5A", dosen: "Bambang Sutejo, M.Kom", hari: "Selasa", jam: "08:00 - 10:30", ruang: "FST-205", kuota: 40, terisi: 28, wajib: true },
    { kode: "TIF5104", nama: "Jaringan Komputer", sks: 3, kelas: "5B", dosen: "Hendra Wijaya, M.T", hari: "Selasa", jam: "13:00 - 15:30", ruang: "Lab-Jaringan", kuota: 35, terisi: 25, wajib: true },
    { kode: "TIF5105", nama: "Interaksi Manusia & Komputer", sks: 2, kelas: "5A", dosen: "Dewi Lestari, M.Kom", hari: "Rabu", jam: "08:00 - 09:40", ruang: "FST-302", kuota: 40, terisi: 35, wajib: true },
    { kode: "TIF5106", nama: "Metodologi Penelitian", sks: 2, kelas: "5A", dosen: "Dr. Fauzan Hakim, M.Si", hari: "Rabu", jam: "10:00 - 11:40", ruang: "FST-110", kuota: 45, terisi: 40, wajib: true },
    { kode: "TIF5107", nama: "Statistika & Probabilitas", sks: 3, kelas: "5A", dosen: "Nurul Aini, M.Stat", hari: "Kamis", jam: "08:00 - 10:30", ruang: "FST-201", kuota: 40, terisi: 22, wajib: false },
    { kode: "TIF5108", nama: "Sistem Operasi", sks: 3, kelas: "5B", dosen: "Yusuf Ramli, M.Kom", hari: "Kamis", jam: "13:00 - 15:30", ruang: "Lab-Komputer 1", kuota: 35, terisi: 18, wajib: false },
    { kode: "TIF5109", nama: "Kewirausahaan Digital", sks: 2, kelas: "5A", dosen: "Andi Pratama, M.M", hari: "Jumat", jam: "08:00 - 09:40", ruang: "FST-115", kuota: 50, terisi: 44, wajib: false },
    { kode: "TIF5110", nama: "Bahasa Inggris untuk TI", sks: 2, kelas: "5A", dosen: "Sarah Johnson, M.A", hari: "Jumat", jam: "13:00 - 14:40", ruang: "FST-120", kuota: 40, terisi: 30, wajib: false },
  ];

  // Mata kuliah aktif semester ini (sudah di-KRS & disetujui) untuk perkuliahan/kehadiran/nilai
  const mkAktif = [
    { kode: "TIF5101", nama: "Kecerdasan Buatan", sks: 3, kelas: "5A", dosen: "Dr. Imam Marzuki, M.Kom", hadir: 11, total: 14, alpha: 1, izin: 1, sakit: 0 },
    { kode: "TIF5102", nama: "Pemrograman Web Lanjut", sks: 3, kelas: "5A", dosen: "Rina Mahmudah, M.T", hadir: 12, total: 14, alpha: 0, izin: 2, sakit: 0 },
    { kode: "TIF5103", nama: "Basis Data Lanjut", sks: 3, kelas: "5A", dosen: "Bambang Sutejo, M.Kom", hadir: 13, total: 14, alpha: 0, izin: 0, sakit: 1 },
    { kode: "TIF5104", nama: "Jaringan Komputer", sks: 3, kelas: "5B", dosen: "Hendra Wijaya, M.T", hadir: 10, total: 14, alpha: 2, izin: 1, sakit: 1 },
    { kode: "TIF5105", nama: "Interaksi Manusia & Komputer", sks: 2, kelas: "5A", dosen: "Dewi Lestari, M.Kom", hadir: 14, total: 14, alpha: 0, izin: 0, sakit: 0 },
    { kode: "TIF5106", nama: "Metodologi Penelitian", sks: 2, kelas: "5A", dosen: "Dr. Fauzan Hakim, M.Si", hadir: 13, total: 14, alpha: 0, izin: 1, sakit: 0 },
  ];

  // Detail pertemuan untuk satu MK contoh (Kecerdasan Buatan)
  const pertemuan = [
    { ke: 1, tanggal: "08 Sep 2025", topik: "Pengantar Kecerdasan Buatan", status: "Hadir", materi: "Bab1-Pengantar-AI.pdf" },
    { ke: 2, tanggal: "15 Sep 2025", topik: "Intelligent Agents", status: "Hadir", materi: "Bab2-Agents.pdf" },
    { ke: 3, tanggal: "22 Sep 2025", topik: "Problem Solving & Search", status: "Hadir", materi: "Bab3-Search.pdf" },
    { ke: 4, tanggal: "29 Sep 2025", topik: "Informed Search (A*)", status: "Izin", materi: "Bab4-Astar.pdf" },
    { ke: 5, tanggal: "06 Okt 2025", topik: "Constraint Satisfaction", status: "Hadir", materi: "Bab5-CSP.pdf" },
    { ke: 6, tanggal: "13 Okt 2025", topik: "Adversarial Search", status: "Hadir", materi: "Bab6-Game.pdf" },
    { ke: 7, tanggal: "20 Okt 2025", topik: "Review & Kuis", status: "Hadir", materi: null },
    { ke: 8, tanggal: "27 Okt 2025", topik: "Ujian Tengah Semester", status: "Hadir", materi: null },
    { ke: 9, tanggal: "03 Nov 2025", topik: "Knowledge Representation", status: "Alpha", materi: "Bab7-KR.pdf" },
    { ke: 10, tanggal: "10 Nov 2025", topik: "Machine Learning Dasar", status: "Hadir", materi: "Bab8-ML.pdf" },
    { ke: 11, tanggal: "17 Nov 2025", topik: "Neural Networks", status: "Hadir", materi: "Bab9-NN.pdf" },
    { ke: 12, tanggal: "24 Nov 2025", topik: "Natural Language Processing", status: "Hadir", materi: "Bab10-NLP.pdf" },
    { ke: 13, tanggal: "01 Des 2025", topik: "Etika AI", status: "Belum", materi: null },
    { ke: 14, tanggal: "08 Des 2025", topik: "Ujian Akhir Semester", status: "Belum", materi: null },
  ];

  function nilaiHuruf(angka) {
    if (angka >= 80) return { huruf: "A", bobot: 4.0 };
    if (angka >= 75) return { huruf: "A-", bobot: 3.7 };
    if (angka >= 70) return { huruf: "B+", bobot: 3.3 };
    if (angka >= 65) return { huruf: "B", bobot: 3.0 };
    if (angka >= 60) return { huruf: "B-", bobot: 2.7 };
    if (angka >= 55) return { huruf: "C+", bobot: 2.3 };
    if (angka >= 50) return { huruf: "C", bobot: 2.0 };
    if (angka >= 40) return { huruf: "D", bobot: 1.0 };
    return { huruf: "E", bobot: 0.0 };
  }

  // Nilai semester ini (parsial — sebagian sudah ada)
  const nilaiSemester = [
    { kode: "TIF5101", nama: "Kecerdasan Buatan", sks: 3, formatif: 85, uts: 78, uas: null },
    { kode: "TIF5102", nama: "Pemrograman Web Lanjut", sks: 3, formatif: 90, uts: 82, uas: null },
    { kode: "TIF5103", nama: "Basis Data Lanjut", sks: 3, formatif: 88, uts: 80, uas: null },
    { kode: "TIF5104", nama: "Jaringan Komputer", sks: 3, formatif: 75, uts: 70, uas: null },
    { kode: "TIF5105", nama: "Interaksi Manusia & Komputer", sks: 2, formatif: 92, uts: 88, uas: null },
    { kode: "TIF5106", nama: "Metodologi Penelitian", sks: 2, formatif: 80, uts: 76, uas: null },
  ];

  // Riwayat KHS per semester (untuk transkrip)
  const riwayatSemester = [
    {
      semester: 1, tahun: "2023/2024 Ganjil", ips: 3.45, sks: 20,
      mk: [
        { kode: "UIN1101", nama: "Pancasila", sks: 2, nilai: 82 },
        { kode: "UIN1102", nama: "Bahasa Indonesia", sks: 2, nilai: 78 },
        { kode: "TIF1101", nama: "Algoritma & Pemrograman", sks: 4, nilai: 85 },
        { kode: "TIF1102", nama: "Matematika Diskrit", sks: 3, nilai: 70 },
        { kode: "TIF1103", nama: "Pengantar Teknologi Informasi", sks: 3, nilai: 88 },
        { kode: "TIF1104", nama: "Kalkulus I", sks: 3, nilai: 65 },
        { kode: "UIN1103", nama: "Studi Keislaman", sks: 3, nilai: 90 },
      ],
    },
    {
      semester: 2, tahun: "2023/2024 Genap", ips: 3.58, sks: 21,
      mk: [
        { kode: "TIF1201", nama: "Struktur Data", sks: 4, nilai: 88 },
        { kode: "TIF1202", nama: "Pemrograman Berorientasi Objek", sks: 4, nilai: 85 },
        { kode: "TIF1203", nama: "Kalkulus II", sks: 3, nilai: 72 },
        { kode: "TIF1204", nama: "Aljabar Linear", sks: 3, nilai: 80 },
        { kode: "TIF1205", nama: "Organisasi Komputer", sks: 3, nilai: 82 },
        { kode: "UIN1201", nama: "Bahasa Arab", sks: 2, nilai: 75 },
        { kode: "UIN1202", nama: "Bahasa Inggris", sks: 2, nilai: 90 },
      ],
    },
    {
      semester: 3, tahun: "2024/2025 Ganjil", ips: 3.70, sks: 22,
      mk: [
        { kode: "TIF2101", nama: "Basis Data", sks: 4, nilai: 90 },
        { kode: "TIF2102", nama: "Pemrograman Web", sks: 3, nilai: 92 },
        { kode: "TIF2103", nama: "Sistem Digital", sks: 3, nilai: 78 },
        { kode: "TIF2104", nama: "Statistika Dasar", sks: 3, nilai: 80 },
        { kode: "TIF2105", nama: "Teori Bahasa & Otomata", sks: 3, nilai: 85 },
        { kode: "TIF2106", nama: "Pemrograman Mobile", sks: 3, nilai: 88 },
        { kode: "UIN2101", nama: "Fiqih", sks: 3, nilai: 86 },
      ],
    },
    {
      semester: 4, tahun: "2024/2025 Genap", ips: 3.68, sks: 22,
      mk: [
        { kode: "TIF2201", nama: "Rekayasa Perangkat Lunak", sks: 4, nilai: 88 },
        { kode: "TIF2202", nama: "Analisis & Desain Sistem", sks: 3, nilai: 85 },
        { kode: "TIF2203", nama: "Pemrograman Visual", sks: 3, nilai: 90 },
        { kode: "TIF2204", nama: "Komputer Grafis", sks: 3, nilai: 76 },
        { kode: "TIF2205", nama: "Sistem Informasi Manajemen", sks: 3, nilai: 82 },
        { kode: "TIF2206", nama: "Keamanan Informasi", sks: 3, nilai: 84 },
        { kode: "UIN2201", nama: "Kewarganegaraan", sks: 3, nilai: 80 },
      ],
    },
  ];

  // Rekap pembayaran
  const pembayaran = [
    { semester: "Semester 5 — 2025/2026 Ganjil", jenis: "UKT Golongan III", nominal: 4200000, jatuhTempo: "20 Agu 2025", tglBayar: "15 Agu 2025", bank: "Bank Syariah Indonesia", status: "Lunas", va: "8810 1121 0910 0045" },
    { semester: "Semester 4 — 2024/2025 Genap", jenis: "UKT Golongan III", nominal: 4200000, jatuhTempo: "18 Feb 2025", tglBayar: "10 Feb 2025", bank: "Bank Syariah Indonesia", status: "Lunas", va: "8810 1121 0910 0045" },
    { semester: "Semester 3 — 2024/2025 Ganjil", jenis: "UKT Golongan III", nominal: 4200000, jatuhTempo: "22 Agu 2024", tglBayar: "20 Agu 2024", bank: "Bank Mandiri", status: "Lunas", va: "8810 1121 0910 0045" },
    { semester: "Semester 2 — 2023/2024 Genap", jenis: "UKT Golongan III", nominal: 4200000, jatuhTempo: "15 Feb 2024", tglBayar: "12 Feb 2024", bank: "Bank Syariah Indonesia", status: "Lunas", va: "8810 1121 0910 0045" },
    { semester: "Semester 1 — 2023/2024 Ganjil", jenis: "UKT Golongan III", nominal: 4200000, jatuhTempo: "25 Agu 2023", tglBayar: "21 Agu 2023", bank: "Bank Mandiri", status: "Lunas", va: "8810 1121 0910 0045" },
  ];

  // Jadwal mingguan (untuk kalender)
  const jadwal = [
    { hari: "Senin", kode: "TIF5101", nama: "Kecerdasan Buatan", jam: "08:00 - 10:30", ruang: "FST-301", dosen: "Dr. Imam Marzuki, M.Kom" },
    { hari: "Senin", kode: "TIF5102", nama: "Pemrograman Web Lanjut", jam: "13:00 - 15:30", ruang: "Lab-Komputer 2", dosen: "Rina Mahmudah, M.T" },
    { hari: "Selasa", kode: "TIF5103", nama: "Basis Data Lanjut", jam: "08:00 - 10:30", ruang: "FST-205", dosen: "Bambang Sutejo, M.Kom" },
    { hari: "Selasa", kode: "TIF5104", nama: "Jaringan Komputer", jam: "13:00 - 15:30", ruang: "Lab-Jaringan", dosen: "Hendra Wijaya, M.T" },
    { hari: "Rabu", kode: "TIF5105", nama: "Interaksi Manusia & Komputer", jam: "08:00 - 09:40", ruang: "FST-302", dosen: "Dewi Lestari, M.Kom" },
    { hari: "Rabu", kode: "TIF5106", nama: "Metodologi Penelitian", jam: "10:00 - 11:40", ruang: "FST-110", dosen: "Dr. Fauzan Hakim, M.Si" },
  ];

  // Beasiswa
  const beasiswa = [
    { id: "bs1", nama: "Beasiswa Bidikmisi / KIP-Kuliah", penyelenggara: "Kemendikbud", kuota: 50, deadline: "30 Jun 2026", nominal: "Rp 6.600.000 / semester", syarat: ["IPK minimal 3.00", "Tidak mampu secara ekonomi", "Surat Keterangan Tidak Mampu (SKTM)", "Aktif organisasi kampus"], status: "Dibuka" },
    { id: "bs2", nama: "Beasiswa Prestasi Akademik", penyelenggara: "Universitas", kuota: 30, deadline: "15 Jul 2026", nominal: "Rp 5.000.000 / semester", syarat: ["IPK minimal 3.50", "Semester 3 ke atas", "Sertifikat prestasi", "Surat rekomendasi dosen PA"], status: "Dibuka" },
    { id: "bs3", nama: "Beasiswa Tahfidz Al-Qur'an", penyelenggara: "Yayasan Mitra", kuota: 20, deadline: "10 Jul 2026", nominal: "Rp 4.500.000 / semester", syarat: ["Hafal minimal 10 juz", "IPK minimal 3.00", "Sertifikat tahfidz", "Tes hafalan"], status: "Dibuka" },
    { id: "bs4", nama: "Beasiswa Bank Indonesia (GenBI)", penyelenggara: "Bank Indonesia", kuota: 25, deadline: "01 Jun 2026", nominal: "Rp 1.000.000 / bulan", syarat: ["IPK minimal 3.00", "Semester 4-6", "Aktif organisasi", "Esai motivasi"], status: "Ditutup" },
  ];

  const pengumuman = [
    { tanggal: "05 Jun 2026", judul: "Pengisian KRS Semester Ganjil 2026/2027 Dibuka", isi: "Periode pengisian KRS dimulai 10 Juni s.d. 24 Juni 2026. Pastikan pembayaran UKT sudah lunas.", tag: "KRS", penting: true },
    { tanggal: "02 Jun 2026", judul: "Jadwal Ujian Akhir Semester (UAS)", isi: "UAS akan dilaksanakan pada 15 - 26 Juni 2026. Cek jadwal di menu Kalender Perkuliahan.", tag: "Ujian", penting: false },
    { tanggal: "28 Mei 2026", judul: "Pendaftaran Beasiswa Prestasi Akademik", isi: "Dibuka pendaftaran beasiswa prestasi bagi mahasiswa dengan IPK ≥ 3.50. Lihat menu Beasiswa.", tag: "Beasiswa", penting: false },
    { tanggal: "20 Mei 2026", judul: "Maintenance Sistem AIS", isi: "Sistem akan maintenance pada Sabtu, 24 Mei 2026 pukul 22.00 - 02.00 WIB.", tag: "Sistem", penting: false },
  ];

  const faq = [
    { q: "Mengapa saat saya mengisi KRS, tidak muncul mata kuliah yang akan saya ambil?", a: "Hal tersebut bisa dikarenakan Program Studi Anda belum melakukan penjadwalan terkait mata kuliah yang ditawarkan. Silakan langsung konfirmasi ke Program Studi Anda." },
    { q: "Saya sudah membayar, tapi muncul \"Anda belum melakukan pembayaran semester ini\"?", a: "Silakan menghubungi Bagian Keuangan di Gedung Rektorat Lt.3 untuk melakukan validasi pembayaran dengan membawa bukti pembayaran dari Bank." },
    { q: "Kenapa saya tidak bisa mengisi KRS?", a: "Salah satu syarat mengisi KRS adalah sudah melakukan pembayaran daftar ulang. Kemungkinan lain karena belum ada Dosen PA. Hubungi akademik fakultas/Prodi untuk menginput Dosen PA Anda." },
    { q: "Mengapa saya tidak bisa mengambil SKS lebih dari batas, padahal IP saya tinggi?", a: "Cek dulu IP semester sebelumnya — pastikan semua nilai sudah masuk. Batas SKS mengikuti IP semester sebelumnya. Jika belum sesuai, konfirmasi ke Program Studi." },
    { q: "Berapa batas pengambilan SKS berdasarkan IP?", a: "IP 3,00–4,00 = 24 SKS · IP 2,50–2,99 = 21 SKS · IP 2,00–2,49 = 18 SKS · IP 1,50–1,99 = 16 SKS · IP 1,00–1,49 = 14 SKS." },
  ];

  const sop = [
    {
      judul: "SOP Pengisian KRS",
      pihak: "Mahasiswa, Dosen Penasihat Akademik, Akademik Jurusan/Prodi",
      langkah: [
        "Pihak Prodi/Jurusan membuat penawaran mata kuliah pada sistem AIS.",
        "Mahasiswa mengisi KRS menggunakan login masing-masing.",
        "Mahasiswa yang telah membayar uang kuliah dapat mengisi KRS.",
        "Mahasiswa memilih mata kuliah yang ditawarkan. Jumlah SKS disesuaikan dengan IP semester sebelumnya.",
        "Setelah mengisi KRS, mahasiswa dapat mencetak KRS.",
        "Dosen PA wajib memvalidasi KRS bimbingannya agar masuk absen & penilaian.",
        "Setelah divalidasi, akademik Prodi dapat mencetak absensi perkuliahan.",
      ],
    },
    {
      judul: "SOP Absensi dan Perkuliahan",
      pihak: "Mahasiswa, Dosen, Akademik Jurusan/Prodi",
      langkah: [
        "Setelah validasi Dosen PA, akademik Prodi mencetak absensi perkuliahan.",
        "Dosen meng-upload file perkuliahan dan mengisi absensi mahasiswa.",
        "Mahasiswa dapat mengunduh file dan melihat absen masing-masing.",
      ],
    },
    {
      judul: "SOP Penilaian",
      pihak: "Dosen, Mahasiswa, Akademik Jurusan/Prodi",
      langkah: [
        "Dosen memilih mata kuliah & kelas, lalu mengisi nilai sesuai waktu yang ditentukan.",
        "Nilai meliputi Formatif, UTS, dan UAS yang totalnya 100.",
        "Dosen yang tidak mengisi nilai membuat nilai mahasiswa otomatis \"E\".",
        "Mahasiswa melihat nilai dan IP melalui login masing-masing.",
        "Akademik Jurusan dapat mencetak nilai yang telah diisi dosen.",
      ],
    },
  ];

  return {
    mahasiswa, aturanSKS, tawaranMK, mkAktif, pertemuan, nilaiSemester,
    riwayatSemester, pembayaran, jadwal, beasiswa, pengumuman, faq, sop, nilaiHuruf,
  };
})();
