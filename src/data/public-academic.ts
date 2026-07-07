export type PublicProgramStudy = {
  slug: string;
  nama: string;
  jenjang: string;
  fakultas: string;
  akreditasi: string;
  mahasiswa: number;
  icon: string;
  warna: string;
  website: string;
  ringkas: string;
  deskripsi: string;
  fokus: string[];
  kurikulum: string[];
  mataKuliahSemester: SemesterCoursePlan[];
  biayaSemester: SemesterFeePlan[];
  prospek: string[];
  fasilitas: string[];
};

export type SemesterCoursePlan = {
  semester: number;
  sks: number;
  mataKuliah: string[];
};

export type SemesterFeePlan = {
  semester: number;
  spp: number;
  praktikum: number;
  kegiatan: number;
  lainnya: number;
  catatan: string;
};

export type AdmissionPathway = {
  slug: string;
  nama: string;
  ringkas: string;
  deskripsi: string;
  syarat: string[];
  tahap: string[];
};

export type AcademicCalendarItem = {
  tanggal: string;
  akhir?: string;
  bulan: string;
  tahun: string;
  kategori: "Pendaftaran" | "Tes" | "Hasil";
  jalur: "Jalur Raport" | "Tes Mandiri" | "RPL";
  judul: string;
  deskripsi: string;
};

const SEMESTER_SKS = [20, 20, 20, 20, 20, 20, 16, 8];

const COURSE_PLAN_BY_PRODI: Record<string, string[][]> = {
  "teknik-informatika": [
    ["Pendidikan Agama", "Pancasila", "Matematika Diskrit", "Dasar Pemrograman", "Pengantar Teknologi Informasi"],
    ["Bahasa Indonesia", "Bahasa Inggris Teknik", "Aljabar Linear", "Struktur Data", "Organisasi Komputer"],
    ["Basis Data", "Pemrograman Berorientasi Objek", "Jaringan Komputer", "Sistem Operasi", "Statistika Komputasi"],
    ["Rekayasa Perangkat Lunak", "Analisis dan Desain Sistem", "Pemrograman Web", "Interaksi Manusia dan Komputer", "Komputasi Awan"],
    ["Kecerdasan Buatan", "Keamanan Siber", "Data Mining", "Pemrograman Mobile", "Manajemen Proyek TI"],
    ["Machine Learning", "Big Data", "DevOps", "Arsitektur Enterprise", "Metodologi Penelitian"],
    ["Kerja Praktik", "Kewirausahaan Teknologi", "Etika Profesi TI", "Capstone Project", "Seminar Proposal"],
    ["Tugas Akhir", "Publikasi Ilmiah", "Portofolio Profesional", "Magang Industri"],
  ],
  "teknik-elektro": [
    ["Pendidikan Agama", "Pancasila", "Kalkulus", "Fisika Dasar", "Pengantar Teknik Elektro"],
    ["Bahasa Indonesia", "Bahasa Inggris Teknik", "Rangkaian Listrik", "Elektronika Dasar", "Pemrograman Teknik"],
    ["Medan Elektromagnetik", "Sinyal dan Sistem", "Elektronika Analog", "Pengukuran Listrik", "Matematika Teknik"],
    ["Sistem Kendali", "Elektronika Digital", "Mesin Listrik", "Telekomunikasi Dasar", "Praktikum Sistem Elektro"],
    ["Elektronika Daya", "Sistem Tenaga Listrik", "Mikroprosesor", "Instrumentasi Industri", "Komunikasi Digital"],
    ["Energi Terbarukan", "Otomasi Industri", "Proteksi Sistem Tenaga", "Internet of Things", "Metodologi Penelitian"],
    ["Kerja Praktik", "Etika Profesi Insinyur", "Kewirausahaan Teknologi", "Seminar Proposal", "Proyek Rancang Bangun"],
    ["Tugas Akhir", "Publikasi Ilmiah", "Uji Kompetensi", "Portofolio Profesional"],
  ],
  "teknik-mesin": [
    ["Pendidikan Agama", "Pancasila", "Kalkulus", "Fisika Dasar", "Gambar Teknik"],
    ["Bahasa Indonesia", "Bahasa Inggris Teknik", "Statika Struktur", "Material Teknik", "Proses Manufaktur Dasar"],
    ["Termodinamika", "Mekanika Kekuatan Material", "Dinamika Teknik", "Metrologi Industri", "CAD Dasar"],
    ["Mekanika Fluida", "Perpindahan Panas", "Elemen Mesin", "Teknik Produksi", "Praktikum Fenomena Dasar"],
    ["Sistem Konversi Energi", "Getaran Mekanik", "CAD/CAM", "Perancangan Mesin", "Manajemen Perawatan"],
    ["Otomasi Manufaktur", "Teknik Pendingin", "Material Lanjut", "Analisis Elemen Hingga", "Metodologi Penelitian"],
    ["Kerja Praktik", "Etika Profesi Insinyur", "Kewirausahaan Teknologi", "Seminar Proposal", "Capstone Design"],
    ["Tugas Akhir", "Publikasi Ilmiah", "Uji Kompetensi", "Portofolio Profesional"],
  ],
  "teknik-industri": [
    ["Pendidikan Agama", "Pancasila", "Kalkulus", "Pengantar Teknik Industri", "Dasar Sistem Produksi"],
    ["Bahasa Indonesia", "Bahasa Inggris Teknik", "Statistika Industri", "Ekonomi Teknik", "Gambar Teknik Industri"],
    ["Riset Operasi", "Ergonomi", "Proses Manufaktur", "Perancangan Sistem Kerja", "Analisis Biaya"],
    ["Perencanaan dan Pengendalian Produksi", "Manajemen Kualitas", "Simulasi Sistem", "Sistem Informasi Industri", "Psikologi Industri"],
    ["Supply Chain Management", "Lean Manufacturing", "Analisis Keputusan", "Manajemen Proyek", "Data Analytics Industri"],
    ["Perancangan Tata Letak Fasilitas", "Enterprise Resource Planning", "Manajemen Risiko", "Inovasi Proses Bisnis", "Metodologi Penelitian"],
    ["Kerja Praktik", "Etika Profesi", "Kewirausahaan", "Seminar Proposal", "Capstone Industrial Project"],
    ["Tugas Akhir", "Publikasi Ilmiah", "Portofolio Profesional", "Magang Industri"],
  ],
  "teknik-kimia": [
    ["Pendidikan Agama", "Pancasila", "Kalkulus", "Kimia Dasar", "Pengantar Teknik Kimia"],
    ["Bahasa Indonesia", "Bahasa Inggris Teknik", "Fisika Dasar", "Kimia Analitik", "Stoikiometri"],
    ["Neraca Massa dan Energi", "Termodinamika Kimia", "Mekanika Fluida", "Kimia Fisika", "Praktikum Kimia Dasar"],
    ["Operasi Teknik Kimia", "Perpindahan Panas", "Teknik Reaksi Kimia", "Pengendalian Proses", "Praktikum Operasi"],
    ["Perancangan Alat Proses", "Keselamatan Proses", "Bioproses", "Teknologi Material", "Utilitas Pabrik"],
    ["Perancangan Pabrik Kimia", "Pengolahan Limbah", "Manajemen Energi", "Optimasi Proses", "Metodologi Penelitian"],
    ["Kerja Praktik", "Etika Profesi Insinyur", "Kewirausahaan Industri", "Seminar Proposal", "Pra Rancangan Pabrik"],
    ["Tugas Akhir", "Publikasi Ilmiah", "Uji Kompetensi", "Portofolio Profesional"],
  ],
  "teknik-sipil": [
    ["Pendidikan Agama", "Pancasila", "Kalkulus", "Fisika Dasar", "Gambar Teknik Sipil"],
    ["Bahasa Indonesia", "Bahasa Inggris Teknik", "Mekanika Teknik", "Ilmu Ukur Tanah", "Bahan Bangunan"],
    ["Analisis Struktur", "Mekanika Tanah", "Hidrologi", "Teknologi Beton", "Statistika Rekayasa"],
    ["Beton Bertulang", "Rekayasa Jalan Raya", "Hidrolika", "Manajemen Konstruksi", "Praktikum Mekanika Tanah"],
    ["Struktur Baja", "Rekayasa Pondasi", "Transportasi Perkotaan", "Sistem Drainase", "Estimasi Biaya Konstruksi"],
    ["Perancangan Jembatan", "Rekayasa Gempa", "Sumber Daya Air", "BIM untuk Konstruksi", "Metodologi Penelitian"],
    ["Kerja Praktik", "Etika Profesi Insinyur", "Kewirausahaan Konstruksi", "Seminar Proposal", "Studio Perancangan Infrastruktur"],
    ["Tugas Akhir", "Publikasi Ilmiah", "Uji Kompetensi", "Portofolio Profesional"],
  ],
  arsitektur: [
    ["Pendidikan Agama", "Pancasila", "Dasar Desain", "Gambar Arsitektur", "Pengantar Arsitektur"],
    ["Bahasa Indonesia", "Bahasa Inggris Teknik", "Studio Perancangan 1", "Sejarah Arsitektur", "Struktur Bangunan Dasar"],
    ["Studio Perancangan 2", "Teknologi Bangunan", "Komunikasi Visual", "Arsitektur Tropis", "Material Bangunan"],
    ["Studio Perancangan 3", "Utilitas Bangunan", "Perancangan Tapak", "Digital Modelling", "Metode Riset Desain"],
    ["Studio Perancangan 4", "Perancangan Kota", "Konservasi Bangunan", "Manajemen Proyek Arsitektur", "BIM Arsitektur"],
    ["Studio Perancangan 5", "Arsitektur Berkelanjutan", "Interior dan Furnitur", "Kritik Arsitektur", "Metodologi Penelitian"],
    ["Kerja Praktik", "Etika Profesi Arsitek", "Kewirausahaan Desain", "Seminar Proposal", "Studio Pra Tugas Akhir"],
    ["Tugas Akhir", "Publikasi Ilmiah", "Portofolio Desain", "Pameran Karya"],
  ],
  "perencanaan-wilayah-dan-kota": [
    ["Pendidikan Agama", "Pancasila", "Pengantar Perencanaan", "Statistika Dasar", "Kartografi"],
    ["Bahasa Indonesia", "Bahasa Inggris Teknik", "Sistem Informasi Geografis", "Ekonomi Wilayah", "Studio Pemetaan"],
    ["Analisis Wilayah", "Perencanaan Kota", "Demografi", "Perencanaan Transportasi", "Metode Survei"],
    ["Studio Perencanaan Kota", "Perencanaan Infrastruktur", "Hukum Tata Ruang", "Analisis Lokasi", "Partisipasi Masyarakat"],
    ["Studio Perencanaan Wilayah", "Perencanaan Pesisir", "Pengembangan Perumahan", "Perencanaan Lingkungan", "Data Spasial Lanjut"],
    ["Manajemen Pembangunan", "Evaluasi Kebijakan Publik", "Smart City", "Mitigasi Bencana", "Metodologi Penelitian"],
    ["Kerja Praktik", "Etika Profesi Perencana", "Kewirausahaan Wilayah", "Seminar Proposal", "Studio Rencana Detail"],
    ["Tugas Akhir", "Publikasi Ilmiah", "Portofolio Perencanaan", "Presentasi Publik"],
  ],
  "teknologi-industri-pertanian": [
    ["Pendidikan Agama", "Pancasila", "Kalkulus", "Kimia Dasar", "Pengantar Agroindustri"],
    ["Bahasa Indonesia", "Bahasa Inggris Teknik", "Biologi Dasar", "Fisika Dasar", "Teknologi Bahan Pertanian"],
    ["Mikrobiologi Industri", "Satuan Operasi", "Kimia Pangan", "Statistika Industri", "Praktikum Bahan Hayati"],
    ["Teknologi Pengolahan", "Teknik Pengemasan", "Pengendalian Mutu", "Manajemen Agroindustri", "Praktikum Proses"],
    ["Perancangan Produk Agroindustri", "Keamanan Pangan", "Rantai Pasok Agroindustri", "Analisis Sensori", "Teknologi Fermentasi"],
    ["Perancangan Pabrik Agroindustri", "Kewirausahaan Agroindustri", "Sistem Jaminan Halal", "Inovasi Produk", "Metodologi Penelitian"],
    ["Kerja Praktik", "Etika Profesi", "Seminar Proposal", "Capstone Agroindustri", "Inkubasi Produk"],
    ["Tugas Akhir", "Publikasi Ilmiah", "Portofolio Produk", "Pameran Inovasi"],
  ],
  manajemen: [
    ["Pendidikan Agama", "Pancasila", "Pengantar Manajemen", "Matematika Bisnis", "Pengantar Akuntansi"],
    ["Bahasa Indonesia", "Bahasa Inggris Bisnis", "Ekonomi Mikro", "Statistika Bisnis", "Perilaku Organisasi"],
    ["Manajemen Keuangan", "Manajemen Pemasaran", "Manajemen Operasi", "Sistem Informasi Manajemen", "Akuntansi Manajemen"],
    ["Manajemen SDM", "Riset Pemasaran", "Kewirausahaan", "Business Analytics", "Hukum Bisnis"],
    ["Strategi Bisnis", "Pemasaran Digital", "Manajemen Risiko", "Keuangan Korporat", "Manajemen Proyek"],
    ["Inovasi Bisnis", "Manajemen Rantai Pasok", "Analisis Investasi", "Leadership", "Metodologi Penelitian"],
    ["Magang Bisnis", "Etika Bisnis", "Seminar Proposal", "Business Plan", "Konsultasi UMKM"],
    ["Tugas Akhir", "Publikasi Ilmiah", "Portofolio Bisnis", "Presentasi Investor"],
  ],
};

type FeeProfile = {
  spp: number;
  praktikum: number;
  awal: number;
};

const FEE_PROFILE_BY_PRODI: Record<string, FeeProfile> = {
  "teknik-informatika": { spp: 7600000, praktikum: 950000, awal: 2500000 },
  "teknik-elektro": { spp: 7400000, praktikum: 1000000, awal: 2400000 },
  "teknik-mesin": { spp: 7300000, praktikum: 1000000, awal: 2400000 },
  "teknik-industri": { spp: 7200000, praktikum: 750000, awal: 2300000 },
  "teknik-kimia": { spp: 7400000, praktikum: 1100000, awal: 2500000 },
  "teknik-sipil": { spp: 7300000, praktikum: 900000, awal: 2400000 },
  arsitektur: { spp: 7200000, praktikum: 1100000, awal: 2500000 },
  "perencanaan-wilayah-dan-kota": { spp: 6900000, praktikum: 800000, awal: 2200000 },
  "teknologi-industri-pertanian": { spp: 7000000, praktikum: 950000, awal: 2300000 },
  manajemen: { spp: 6600000, praktikum: 350000, awal: 2000000 },
};

function roundFee(value: number) {
  return Math.round(value / 50000) * 50000;
}

function makeCoursePlan(slug: string): SemesterCoursePlan[] {
  const rows = COURSE_PLAN_BY_PRODI[slug] ?? COURSE_PLAN_BY_PRODI["teknik-informatika"];

  return rows.map((mataKuliah, index) => ({
    semester: index + 1,
    sks: SEMESTER_SKS[index] ?? 18,
    mataKuliah,
  }));
}

function makeFeePlan(slug: string): SemesterFeePlan[] {
  const profile = FEE_PROFILE_BY_PRODI[slug] ?? FEE_PROFILE_BY_PRODI["teknik-informatika"];

  return Array.from({ length: 8 }, (_, index) => {
    const semester = index + 1;
    const awal = semester === 1;
    const akhir = semester === 8;
    const praktikum =
      semester <= 6
        ? profile.praktikum + (semester >= 3 ? 250000 : 0)
        : roundFee(profile.praktikum * 0.45);
    const kegiatan = semester === 7 ? 900000 : 600000;
    const lainnya = awal ? profile.awal : akhir ? 1250000 : 0;

    return {
      semester,
      spp: profile.spp,
      praktikum,
      kegiatan,
      lainnya,
      catatan: awal
        ? "Termasuk biaya awal dan orientasi"
        : akhir
          ? "Termasuk administrasi tugas akhir dan yudisium"
          : semester === 7
            ? "Termasuk kerja praktik atau seminar proposal"
            : "Estimasi biaya semester berjalan",
    };
  });
}

const PRODI_BASE: Omit<PublicProgramStudy, "mataKuliahSemester" | "biayaSemester">[] = [
  {
    slug: "teknik-informatika",
    nama: "Teknik Informatika",
    jenjang: "S1",
    fakultas: "Teknologi Informasi",
    akreditasi: "Unggul",
    mahasiswa: 642,
    icon: "server",
    warna: "var(--blue)",
    website: "https://if.iti.ac.id",
    ringkas: "Membangun talenta rekayasa perangkat lunak, data, keamanan siber, dan kecerdasan buatan.",
    deskripsi: "Program studi ini menyiapkan mahasiswa untuk merancang, membangun, dan mengelola solusi digital modern dengan fondasi komputasi yang kuat dan pengalaman proyek berbasis industri.",
    fokus: ["Software engineering", "Artificial intelligence", "Cyber security", "Data engineering"],
    kurikulum: ["Algoritma dan Struktur Data", "Basis Data", "Rekayasa Perangkat Lunak", "Machine Learning", "Keamanan Aplikasi"],
    prospek: ["Software Engineer", "Data Scientist", "Cyber Security Analyst", "Cloud Engineer"],
    fasilitas: ["Laboratorium Komputasi", "Lab Jaringan", "Studio Proyek Capstone", "Akses repositori riset digital"],
  },
  {
    slug: "teknik-elektro",
    nama: "Teknik Elektro",
    jenjang: "S1",
    fakultas: "Rekayasa Elektro",
    akreditasi: "Baik Sekali",
    mahasiswa: 414,
    icon: "activity",
    warna: "var(--amber)",
    website: "https://el.iti.ac.id",
    ringkas: "Fokus pada sistem tenaga, elektronika, kontrol, telekomunikasi, dan teknologi semikonduktor.",
    deskripsi: "Mahasiswa mempelajari sistem kelistrikan dan elektronika modern melalui praktik laboratorium, simulasi, dan proyek rancang bangun.",
    fokus: ["Sistem tenaga listrik", "Elektronika", "Telekomunikasi", "Kontrol dan instrumentasi"],
    kurikulum: ["Rangkaian Listrik", "Elektronika Daya", "Sistem Kendali", "Mikroprosesor", "Komunikasi Digital"],
    prospek: ["Electrical Engineer", "Automation Engineer", "Telecommunication Engineer", "Instrumentation Engineer"],
    fasilitas: ["Lab Elektronika", "Lab Sistem Tenaga", "Lab Kontrol", "Lab Telekomunikasi"],
  },
  {
    slug: "teknik-mesin",
    nama: "Teknik Mesin",
    jenjang: "S1",
    fakultas: "Rekayasa Mesin",
    akreditasi: "Baik Sekali",
    mahasiswa: 386,
    icon: "wrench",
    warna: "var(--green)",
    website: "https://mesin.iti.ac.id",
    ringkas: "Pembelajaran rekayasa manufaktur, energi, material, otomasi, dan desain mesin.",
    deskripsi: "Teknik Mesin ITI menggabungkan teori mekanika dengan praktik desain, produksi, pengujian, dan pemeliharaan sistem mekanik.",
    fokus: ["Manufaktur", "Konversi energi", "Material teknik", "Desain mekanik"],
    kurikulum: ["Termodinamika", "Mekanika Fluida", "Elemen Mesin", "CAD/CAM", "Teknik Produksi"],
    prospek: ["Mechanical Engineer", "Maintenance Engineer", "Manufacturing Engineer", "Product Designer"],
    fasilitas: ["Workshop Manufaktur", "Lab Fenomena Dasar", "Lab Material", "Studio CAD"],
  },
  {
    slug: "teknik-industri",
    nama: "Teknik Industri",
    jenjang: "S1",
    fakultas: "Sistem Industri",
    akreditasi: "Unggul",
    mahasiswa: 518,
    icon: "layers",
    warna: "var(--purple)",
    website: "https://industri.iti.ac.id",
    ringkas: "Merancang sistem kerja, produksi, logistik, kualitas, dan transformasi bisnis berbasis data.",
    deskripsi: "Mahasiswa dibekali kemampuan mengintegrasikan manusia, mesin, material, informasi, dan energi agar organisasi berjalan efektif.",
    fokus: ["Supply chain", "Quality engineering", "Ergonomi", "Business process improvement"],
    kurikulum: ["Riset Operasi", "Perencanaan Produksi", "Lean Manufacturing", "Simulasi Sistem", "Manajemen Kualitas"],
    prospek: ["Industrial Engineer", "Supply Chain Analyst", "Quality Assurance Lead", "Process Improvement Specialist"],
    fasilitas: ["Lab Sistem Produksi", "Lab Ergonomi", "Studio Simulasi", "Ruang Proyek Industri"],
  },
  {
    slug: "teknik-kimia",
    nama: "Teknik Kimia",
    jenjang: "S1",
    fakultas: "Rekayasa Proses",
    akreditasi: "Baik Sekali",
    mahasiswa: 352,
    icon: "beaker",
    warna: "var(--green)",
    website: "https://tekim.iti.ac.id",
    ringkas: "Rekayasa proses, energi, lingkungan, material, dan industri kimia berkelanjutan.",
    deskripsi: "Program studi ini membentuk lulusan yang mampu merancang proses kimia dan mengelola operasi industri secara aman, efisien, dan ramah lingkungan.",
    fokus: ["Proses kimia", "Bioproses", "Energi terbarukan", "Keselamatan proses"],
    kurikulum: ["Neraca Massa dan Energi", "Operasi Teknik Kimia", "Termodinamika Kimia", "Reaktor Kimia", "Perancangan Pabrik"],
    prospek: ["Process Engineer", "Production Engineer", "HSE Engineer", "Research and Development Staff"],
    fasilitas: ["Lab Operasi Teknik Kimia", "Lab Analisis", "Pilot Plant", "Lab Bioproses"],
  },
  {
    slug: "teknik-sipil",
    nama: "Teknik Sipil",
    jenjang: "S1",
    fakultas: "Rekayasa Infrastruktur",
    akreditasi: "Baik Sekali",
    mahasiswa: 441,
    icon: "building",
    warna: "var(--blue)",
    website: "https://sipil.iti.ac.id",
    ringkas: "Mempelajari struktur, transportasi, geoteknik, sumber daya air, dan manajemen konstruksi.",
    deskripsi: "Teknik Sipil ITI menyiapkan lulusan untuk membangun infrastruktur yang kuat, aman, efisien, dan adaptif terhadap kebutuhan kota modern.",
    fokus: ["Struktur", "Transportasi", "Geoteknik", "Manajemen konstruksi"],
    kurikulum: ["Mekanika Teknik", "Beton Bertulang", "Rekayasa Jalan", "Hidrologi", "Manajemen Proyek"],
    prospek: ["Civil Engineer", "Structural Engineer", "Construction Manager", "Transportation Planner"],
    fasilitas: ["Lab Struktur", "Lab Mekanika Tanah", "Lab Hidrolika", "Studio Perencanaan"],
  },
  {
    slug: "arsitektur",
    nama: "Arsitektur",
    jenjang: "S1",
    fakultas: "Desain dan Lingkungan Binaan",
    akreditasi: "Baik Sekali",
    mahasiswa: 304,
    icon: "home",
    warna: "var(--orange)",
    website: "https://ars.iti.ac.id",
    ringkas: "Desain arsitektur, teknologi bangunan, perancangan kota, dan lingkungan berkelanjutan.",
    deskripsi: "Program studi Arsitektur mengembangkan kemampuan desain, komunikasi visual, riset tapak, dan pemahaman teknologi bangunan.",
    fokus: ["Desain arsitektur", "Arsitektur tropis", "Teknologi bangunan", "Perancangan kawasan"],
    kurikulum: ["Studio Perancangan", "Sejarah Arsitektur", "Struktur Bangunan", "Utilitas Bangunan", "Perancangan Kota"],
    prospek: ["Architectural Designer", "Interior Designer", "Urban Design Assistant", "Building Consultant"],
    fasilitas: ["Studio Gambar", "Maket Workshop", "Lab Komputasi Desain", "Ruang Kritik Studio"],
  },
  {
    slug: "perencanaan-wilayah-dan-kota",
    nama: "Perencanaan Wilayah dan Kota",
    jenjang: "S1",
    fakultas: "Perencanaan",
    akreditasi: "Baik Sekali",
    mahasiswa: 288,
    icon: "pin",
    warna: "var(--purple)",
    website: "https://pwk.iti.ac.id",
    ringkas: "Merancang tata ruang, sistem perkotaan, kebijakan wilayah, dan perencanaan berbasis data spasial.",
    deskripsi: "PWK ITI membekali mahasiswa dengan kemampuan analisis wilayah, pemetaan, penyusunan rencana, dan fasilitasi pembangunan partisipatif.",
    fokus: ["Perencanaan kota", "GIS dan pemetaan", "Transportasi perkotaan", "Kebijakan wilayah"],
    kurikulum: ["Studio Perencanaan", "Sistem Informasi Geografis", "Ekonomi Wilayah", "Perencanaan Transportasi", "Metode Analisis Perencanaan"],
    prospek: ["Urban Planner", "GIS Analyst", "Regional Development Consultant", "Policy Analyst"],
    fasilitas: ["Studio PWK", "Lab GIS", "Ruang Pemetaan", "Perangkat survei lapangan"],
  },
  {
    slug: "teknologi-industri-pertanian",
    nama: "Teknologi Industri Pertanian",
    jenjang: "S1",
    fakultas: "Teknologi Industri",
    akreditasi: "Baik Sekali",
    mahasiswa: 266,
    icon: "beaker",
    warna: "var(--green)",
    website: "https://tip.iti.ac.id",
    ringkas: "Mengolah potensi pertanian menjadi produk industri bernilai tambah melalui teknologi proses dan bisnis.",
    deskripsi: "TIP ITI mengintegrasikan teknologi pengolahan, manajemen agroindustri, mutu, dan inovasi produk berbasis sumber daya hayati.",
    fokus: ["Agroindustri", "Teknologi pangan", "Manajemen mutu", "Inovasi produk"],
    kurikulum: ["Teknologi Pengolahan", "Mikrobiologi Industri", "Manajemen Agroindustri", "Pengendalian Mutu", "Kewirausahaan Agroindustri"],
    prospek: ["Agroindustry Engineer", "Quality Control Analyst", "Product Development Staff", "Food Process Supervisor"],
    fasilitas: ["Lab Pengolahan", "Lab Analisis Mutu", "Pilot Plant Agroindustri", "Ruang Inkubasi Produk"],
  },
  {
    slug: "manajemen",
    nama: "Manajemen",
    jenjang: "S1",
    fakultas: "Bisnis dan Manajemen",
    akreditasi: "Baik Sekali",
    mahasiswa: 560,
    icon: "briefcase",
    warna: "var(--amber)",
    website: "https://mn.iti.ac.id",
    ringkas: "Mempelajari manajemen bisnis, kewirausahaan, pemasaran, keuangan, dan operasi berbasis teknologi.",
    deskripsi: "Program studi Manajemen ITI menyiapkan lulusan yang adaptif dalam mengelola bisnis modern, startup, dan organisasi berbasis inovasi.",
    fokus: ["Kewirausahaan", "Manajemen pemasaran", "Keuangan", "Operasi dan strategi"],
    kurikulum: ["Pengantar Manajemen", "Manajemen Keuangan", "Pemasaran Digital", "Perilaku Organisasi", "Strategi Bisnis"],
    prospek: ["Business Analyst", "Marketing Specialist", "Entrepreneur", "Operations Supervisor"],
    fasilitas: ["Business Lab", "Ruang Inkubasi Bisnis", "Studio Presentasi", "Akses studi kasus industri"],
  },
];

export const PUBLIC_PRODI: PublicProgramStudy[] = PRODI_BASE.map((prodi) => ({
  ...prodi,
  mataKuliahSemester: makeCoursePlan(prodi.slug),
  biayaSemester: makeFeePlan(prodi.slug),
}));

export const ADMISSION_PATHWAYS: AdmissionPathway[] = [
  {
    slug: "jalur-raport",
    nama: "Jalur Raport",
    ringkas: "Seleksi berbasis nilai akademik sekolah tanpa tes tertulis.",
    deskripsi: "Cocok untuk calon mahasiswa yang ingin menggunakan rekam prestasi akademik selama SMA/SMK/MA sebagai dasar seleksi.",
    syarat: ["Rapor semester 1 sampai 5", "Identitas diri", "Pilihan program studi", "Berkas pendukung prestasi bila ada"],
    tahap: ["Pendaftaran online", "Verifikasi nilai raport", "Penetapan kelulusan", "Daftar ulang"],
  },
  {
    slug: "tes-mandiri",
    nama: "Tes Mandiri",
    ringkas: "Seleksi melalui tes masuk/CBT terjadwal.",
    deskripsi: "Jalur ini memberi kesempatan bagi calon mahasiswa untuk mengikuti ujian mandiri sesuai jadwal kampus.",
    syarat: ["Formulir pendaftaran", "Kartu identitas", "Ijazah atau surat keterangan lulus", "Kartu peserta tes"],
    tahap: ["Pendaftaran online", "Cetak kartu ujian", "Tes CBT", "Pengumuman hasil"],
  },
  {
    slug: "rpl",
    nama: "RPL",
    ringkas: "Rekognisi Pembelajaran Lampau untuk pengalaman kerja atau studi sebelumnya.",
    deskripsi: "Ditujukan untuk calon mahasiswa yang memiliki pengalaman kerja, pelatihan, sertifikasi, atau riwayat studi yang dapat direkognisi.",
    syarat: ["Portofolio pengalaman", "Transkrip atau sertifikat pendukung", "CV", "Dokumen asesmen mandiri"],
    tahap: ["Pendaftaran RPL", "Unggah portofolio", "Asesmen dan wawancara", "Hasil rekognisi SKS"],
  },
];

export const ACADEMIC_CALENDAR: AcademicCalendarItem[] = [
  {
    tanggal: "01",
    akhir: "31",
    bulan: "Jul",
    tahun: "2026",
    kategori: "Pendaftaran",
    jalur: "Jalur Raport",
    judul: "Pendaftaran Jalur Raport Gelombang 1",
    deskripsi: "Calon mahasiswa mengisi formulir, memilih program studi, dan mengunggah raport semester 1 sampai 5.",
  },
  {
    tanggal: "05",
    bulan: "Agu",
    tahun: "2026",
    kategori: "Tes",
    jalur: "Jalur Raport",
    judul: "Verifikasi Akademik Jalur Raport",
    deskripsi: "Tim PMB memeriksa kelengkapan berkas, konsistensi nilai, dan pilihan program studi.",
  },
  {
    tanggal: "12",
    bulan: "Agu",
    tahun: "2026",
    kategori: "Hasil",
    jalur: "Jalur Raport",
    judul: "Pengumuman Hasil Jalur Raport",
    deskripsi: "Hasil seleksi dapat dilihat melalui portal PMB dan email calon mahasiswa.",
  },
  {
    tanggal: "01",
    akhir: "20",
    bulan: "Agu",
    tahun: "2026",
    kategori: "Pendaftaran",
    jalur: "Tes Mandiri",
    judul: "Pendaftaran Tes Mandiri",
    deskripsi: "Pendaftaran calon peserta tes mandiri dan pembayaran biaya seleksi bila diperlukan.",
  },
  {
    tanggal: "24",
    bulan: "Sep",
    tahun: "2026",
    kategori: "Tes",
    jalur: "Tes Mandiri",
    judul: "Pelaksanaan Tes CBT Mandiri",
    deskripsi: "Tes masuk mandiri berbasis komputer sesuai sesi yang tercantum pada kartu peserta.",
  },
  {
    tanggal: "28",
    bulan: "Sep",
    tahun: "2026",
    kategori: "Hasil",
    jalur: "Tes Mandiri",
    judul: "Pengumuman Hasil Tes Mandiri",
    deskripsi: "Peserta melihat status kelulusan, program studi diterima, dan instruksi daftar ulang.",
  },
  {
    tanggal: "01",
    akhir: "30",
    bulan: "Sep",
    tahun: "2026",
    kategori: "Pendaftaran",
    jalur: "RPL",
    judul: "Pendaftaran dan Unggah Portofolio RPL",
    deskripsi: "Calon mahasiswa mengunggah portofolio pengalaman, sertifikat, dan dokumen asesmen mandiri.",
  },
  {
    tanggal: "03",
    bulan: "Okt",
    tahun: "2026",
    kategori: "Tes",
    jalur: "RPL",
    judul: "Asesmen dan Wawancara RPL",
    deskripsi: "Asesor program studi menilai portofolio, pengalaman kerja, dan capaian pembelajaran calon mahasiswa.",
  },
  {
    tanggal: "08",
    bulan: "Okt",
    tahun: "2026",
    kategori: "Hasil",
    jalur: "RPL",
    judul: "Hasil Rekognisi RPL",
    deskripsi: "Hasil kelulusan dan rekomendasi rekognisi SKS diumumkan untuk proses daftar ulang.",
  },
];

export function findProgramStudy(slug: string | undefined) {
  return PUBLIC_PRODI.find((item) => item.slug === slug);
}
