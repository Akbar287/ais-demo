/* eslint-disable */
// @ts-nocheck
// Generated from js/data_content.js by scripts/port-js-ssot.mjs.

// ============================================================
// AIS — Konten Publik: Berita/Artikel & Agenda/Event
// Dipakai oleh landing + halaman publik (BeritaIndex/Detail, EventIndex/Detail)
// ============================================================
export const AIS_CONTENT = (function () {

  const KAT_TONE = {
    Prestasi: "green", Kerjasama: "purple", Pengumuman: "amber",
    Akademik: "blue", Kemahasiswaan: "orange", Riset: "red",
  };
  const EVT_TONE = {
    Seremonial: "purple", Akademik: "blue", Karir: "green",
    Workshop: "orange", Kompetisi: "red",
  };
  const G = {
    blue: "linear-gradient(135deg,#1a4b8c,#2d7dd2)",
    green: "linear-gradient(135deg,#1b7340,#34d399)",
    purple: "linear-gradient(135deg,#6d28d9,#a78bfa)",
    orange: "linear-gradient(135deg,#c2410c,#fb923c)",
    red: "linear-gradient(135deg,#9f1239,#fb7185)",
    teal: "linear-gradient(135deg,#0f766e,#2dd4bf)",
    slate: "linear-gradient(135deg,#0f172a,#475569)",
    gold: "linear-gradient(135deg,#a16207,#fbbf24)",
  };

  const P = (t) => t; // paragraf helper (identitas, agar mudah dibaca)

  const berita = [
    {
      id: "akreditasi-unggul", judul: "ITI Raih Akreditasi Unggul dari BAN-PT",
      ringkas: "Pencapaian tertinggi dalam sejarah institusi — seluruh sembilan kriteria memenuhi standar Unggul.",
      kategori: "Prestasi", tgl: "22 Jun 2026", iso: "2026-06-22", penulis: "Humas ITI", baca: 4, views: 3420, img: G.blue, unggulan: true,
      tags: ["Akreditasi", "BAN-PT", "Mutu"],
      body: [
        P("Institut Teknologi Indonesia resmi menyandang predikat Akreditasi Unggul dari Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT) untuk periode 2026–2031. Keputusan ini menempatkan institusi pada jajaran perguruan tinggi terbaik di tingkat nasional."),
        P("Penilaian mencakup sembilan kriteria — mulai dari tata pamong, kemahasiswaan, sumber daya manusia, keuangan dan sarana prasarana, hingga luaran dan capaian tridarma. Seluruh kriteria dinyatakan memenuhi standar Unggul oleh tim asesor."),
        P("Rektor menyampaikan bahwa capaian ini adalah hasil kerja kolektif seluruh sivitas akademika selama bertahun-tahun, dan menjadi pijakan untuk terus meningkatkan kualitas pendidikan, penelitian, dan pengabdian kepada masyarakat."),
        P("Ke depan, ITI menargetkan akreditasi internasional untuk sejumlah program studi unggulan serta memperluas kerjasama riset lintas negara."),
      ],
    },
    {
      id: "hackathon-nasional", judul: "Mahasiswa Teknik Informatika Juara Hackathon Nasional 2026",
      ringkas: "Tim Byte Warriors meraih juara pertama di antara 842 tim dari seluruh Indonesia dengan solusi mitigasi banjir berbasis AI.",
      kategori: "Prestasi", tgl: "18 Jun 2026", iso: "2026-06-18", penulis: "Ditmawa", baca: 3, views: 2640, img: G.green, unggulan: true,
      tags: ["Hackathon", "AI", "Mahasiswa"],
      body: [
        P("Tim Byte Warriors dari Program Studi Teknik Informatika berhasil menjadi juara pertama Hackathon Nasional 2026 yang diselenggarakan secara hybrid dan diikuti 842 tim dari berbagai kampus di Indonesia."),
        P("Dalam waktu 36 jam, tim mengembangkan prototipe sistem peringatan dini banjir yang memanfaatkan data sensor ketinggian air dan model prediksi berbasis machine learning. Solusi ini dinilai juri paling aplikatif dan berdampak sosial."),
        P("Kemenangan ini melengkapi rentetan prestasi mahasiswa di bidang teknologi sepanjang tahun ini, dan membuka peluang inkubasi produk bersama mitra industri kampus."),
      ],
    },
    {
      id: "kerjasama-brin", judul: "Kerjasama Riset dengan BRIN Resmi Ditandatangani",
      ringkas: "Nota kesepahaman joint research bidang kecerdasan buatan dan big data untuk periode 2025–2028.",
      kategori: "Kerjasama", tgl: "15 Jun 2026", iso: "2026-06-15", penulis: "Kantor Kerjasama", baca: 3, views: 1880, img: G.purple,
      tags: ["BRIN", "Riset", "MoU"],
      body: [
        P("Institut Teknologi Indonesia dan Badan Riset dan Inovasi Nasional (BRIN) menandatangani nota kesepahaman kerjasama riset di bidang kecerdasan buatan dan big data. Kolaborasi ini mencakup penelitian bersama, pertukaran periset, dan akses fasilitas laboratorium."),
        P("Program pertama yang akan dijalankan adalah pengembangan model bahasa untuk konteks lokal serta analitik data kependudukan untuk mendukung kebijakan publik berbasis bukti."),
        P("Kerjasama ini diharapkan meningkatkan jumlah publikasi bereputasi serta memperkuat ekosistem riset kampus yang berorientasi pada dampak nyata bagi masyarakat."),
      ],
    },
    {
      id: "pmb-2026", judul: "Pendaftaran Mahasiswa Baru 2026/2027 Resmi Dibuka",
      ringkas: "Jalur prestasi dan jalur reguler kini dapat diakses melalui portal PMB online dengan proses seleksi terintegrasi.",
      kategori: "Pengumuman", tgl: "10 Jun 2026", iso: "2026-06-10", penulis: "Panitia PMB", baca: 2, views: 5120, img: G.orange,
      tags: ["PMB", "Pendaftaran", "Seleksi"],
      body: [
        P("Penerimaan Mahasiswa Baru tahun akademik 2026/2027 resmi dibuka. Calon mahasiswa dapat mendaftar melalui portal PMB online untuk jalur prestasi maupun jalur reguler."),
        P("Seluruh tahapan — mulai pendaftaran, verifikasi berkas, tes berbasis komputer (CBT), hingga pengumuman kelulusan — dilakukan secara daring dan terintegrasi dengan sistem akademik kampus."),
        P("Panitia mengimbau calon mahasiswa memperhatikan jadwal setiap gelombang dan melengkapi dokumen persyaratan sebelum tenggat untuk kelancaran proses seleksi."),
      ],
    },
    {
      id: "paper-q1", judul: "Dosen FST Terbitkan Artikel di Jurnal Q1 Scopus",
      ringkas: "Riset tentang optimasi jaringan sensor nirkabel terbit di jurnal internasional bereputasi kuartil teratas.",
      kategori: "Riset", tgl: "06 Jun 2026", iso: "2026-06-06", penulis: "LPPM", baca: 4, views: 1240, img: G.red,
      tags: ["Publikasi", "Scopus", "Dosen"],
      body: [
        P("Tim dosen Fakultas Sains dan Teknologi berhasil menerbitkan artikel penelitian pada jurnal internasional terindeks Scopus kuartil pertama (Q1). Riset ini membahas metode optimasi konsumsi energi pada jaringan sensor nirkabel."),
        P("Publikasi pada jurnal bereputasi tinggi memperkuat posisi kampus dalam peta riset nasional dan menjadi indikator penting bagi peningkatan mutu akademik."),
        P("LPPM terus mendorong dosen mempublikasikan hasil penelitian melalui skema insentif dan pendampingan penulisan artikel ilmiah."),
      ],
    },
    {
      id: "robotika-emas", judul: "Tim Robotika Sabet Medali Emas Kontes Robot Indonesia",
      ringkas: "Divisi robot pemadam api kampus meraih medali emas pada kontes tingkat regional dan lolos ke final nasional.",
      kategori: "Prestasi", tgl: "02 Jun 2026", iso: "2026-06-02", penulis: "UKM Robotika", baca: 3, views: 1990, img: G.gold,
      tags: ["Robotika", "Kompetisi", "Mahasiswa"],
      body: [
        P("UKM Robotika kampus meraih medali emas pada Kontes Robot Indonesia tingkat regional untuk kategori robot pemadam api. Tim berhasil menyelesaikan misi tercepat dengan tingkat akurasi navigasi tertinggi."),
        P("Dengan kemenangan ini, tim melaju ke babak final nasional yang akan digelar beberapa bulan mendatang. Persiapan intensif tengah dilakukan di Laboratorium Elektro."),
        P("Prestasi ini menjadi bukti kuatnya pembinaan minat dan bakat mahasiswa di bidang rekayasa dan otomasi."),
      ],
    },
    {
      id: "mou-utm", judul: "ITI Jalin Kerjasama dengan Universiti Teknologi Malaysia",
      ringkas: "Kerjasama meliputi pertukaran mahasiswa, joint degree, dan riset kolaboratif lintas negara.",
      kategori: "Kerjasama", tgl: "28 Mei 2026", iso: "2026-05-28", penulis: "Kantor Kerjasama", baca: 3, views: 1460, img: G.teal,
      tags: ["Internasional", "MoA", "Pertukaran"],
      body: [
        P("Institut Teknologi Indonesia menandatangani perjanjian kerjasama (MoA) dengan Universiti Teknologi Malaysia. Ruang lingkup kerjasama mencakup pertukaran mahasiswa dan dosen, program joint degree, serta riset kolaboratif."),
        P("Langkah ini memperluas jejaring internasional kampus dan membuka kesempatan bagi mahasiswa untuk memperoleh pengalaman akademik lintas negara."),
        P("Program pertukaran perdana direncanakan berjalan pada semester ganjil mendatang dengan kuota terbatas melalui seleksi kompetitif."),
      ],
    },
    {
      id: "mbkm-8-skema", judul: "Program MBKM Buka 8 Skema Magang Bersertifikat",
      ringkas: "Mahasiswa dapat mengonversi hingga 20 SKS melalui magang, studi independen, dan asistensi mengajar.",
      kategori: "Akademik", tgl: "20 Mei 2026", iso: "2026-05-20", penulis: "Pusat MBKM", baca: 3, views: 2210, img: G.blue,
      tags: ["MBKM", "Magang", "SKS"],
      body: [
        P("Pusat MBKM membuka delapan skema program Merdeka Belajar Kampus Merdeka untuk semester mendatang, meliputi magang bersertifikat, studi independen, hingga asistensi mengajar di satuan pendidikan."),
        P("Melalui program ini, mahasiswa dapat mengonversi hingga 20 SKS dengan pengalaman belajar di luar kampus bersama mitra industri dan lembaga terkemuka."),
        P("Pendaftaran dilakukan melalui portal akademik dan memerlukan persetujuan dosen pembimbing serta program studi."),
      ],
    },
    {
      id: "pentas-budaya", judul: "UKM Seni Gelar Pentas Budaya Nusantara",
      ringkas: "Ratusan mahasiswa menampilkan tari, musik, dan teater tradisional dalam perayaan keberagaman budaya.",
      kategori: "Kemahasiswaan", tgl: "14 Mei 2026", iso: "2026-05-14", penulis: "Ditmawa", baca: 2, views: 980, img: G.orange,
      tags: ["Seni", "Budaya", "UKM"],
      body: [
        P("Unit Kegiatan Mahasiswa bidang Seni menggelar Pentas Budaya Nusantara di Auditorium Utama. Acara menampilkan beragam tarian daerah, pertunjukan musik tradisional, dan pementasan teater."),
        P("Kegiatan ini menjadi wadah ekspresi kreativitas mahasiswa sekaligus pelestarian budaya bangsa di lingkungan kampus."),
        P("Antusiasme sivitas akademika terlihat dari padatnya kursi penonton sepanjang acara berlangsung."),
      ],
    },
    {
      id: "kip-kuliah", judul: "Beasiswa KIP-Kuliah 2026 Sediakan Kuota 120 Mahasiswa",
      ringkas: "Bantuan biaya pendidikan dan biaya hidup bagi mahasiswa berprestasi dari keluarga kurang mampu.",
      kategori: "Pengumuman", tgl: "08 Mei 2026", iso: "2026-05-08", penulis: "Bagian Kemahasiswaan", baca: 2, views: 3300, img: G.green,
      tags: ["Beasiswa", "KIP-Kuliah"],
      body: [
        P("Program beasiswa KIP-Kuliah tahun 2026 menyediakan kuota bagi 120 mahasiswa. Beasiswa mencakup pembebasan biaya pendidikan sekaligus bantuan biaya hidup setiap bulan."),
        P("Sasaran program adalah mahasiswa berprestasi yang berasal dari keluarga kurang mampu secara ekonomi. Pendaftaran dan verifikasi dilakukan melalui portal kemahasiswaan."),
        P("Penerima ditetapkan melalui seleksi administratif dan verifikasi data yang ketat untuk memastikan bantuan tepat sasaran."),
      ],
    },
    {
      id: "seminar-ai", judul: "Seminar Internasional AI for Sustainability Sukses Digelar",
      ringkas: "Menghadirkan pembicara dari lima negara membahas peran kecerdasan buatan bagi pembangunan berkelanjutan.",
      kategori: "Akademik", tgl: "30 Apr 2026", iso: "2026-04-30", penulis: "Fakultas Sains & Teknologi", baca: 3, views: 1120, img: G.purple,
      tags: ["Seminar", "AI", "Internasional"],
      body: [
        P("Seminar internasional bertema AI for Sustainability sukses diselenggarakan dengan menghadirkan pembicara dari lima negara. Diskusi berfokus pada pemanfaatan kecerdasan buatan untuk mendukung tujuan pembangunan berkelanjutan."),
        P("Peserta yang terdiri atas akademisi, mahasiswa, dan praktisi memperoleh wawasan tentang penerapan AI di sektor energi, lingkungan, dan kesehatan."),
        P("Kegiatan ini memperkuat reputasi kampus sebagai penyelenggara forum ilmiah bertaraf internasional."),
      ],
    },
    {
      id: "deteksi-stunting", judul: "Peneliti Kampus Kembangkan Aplikasi Deteksi Dini Stunting",
      ringkas: "Aplikasi berbasis mobile membantu kader posyandu memantau tumbuh kembang balita secara real-time.",
      kategori: "Riset", tgl: "22 Apr 2026", iso: "2026-04-22", penulis: "LPPM", baca: 4, views: 1540, img: G.red,
      tags: ["Kesehatan", "Aplikasi", "Pengabdian"],
      body: [
        P("Tim peneliti lintas fakultas mengembangkan aplikasi mobile untuk deteksi dini stunting pada balita. Aplikasi ini membantu kader posyandu mencatat dan memantau data tumbuh kembang anak secara real-time."),
        P("Melalui analisis data pertumbuhan, aplikasi memberikan peringatan dini dan rekomendasi rujukan bagi balita yang berisiko mengalami gangguan pertumbuhan."),
        P("Aplikasi telah diujicobakan di beberapa posyandu mitra dan mendapat sambutan positif dari kader serta tenaga kesehatan setempat."),
      ],
    },
  ];

  const events = [
    {
      id: "dies-natalis-68", nama: "Dies Natalis ke-68", jenis: "Seremonial",
      tgl: "01 Jul 2026", iso: "2026-07-01", waktu: "08:00 – 12:00 WIB", lokasi: "Auditorium Utama", penyelenggara: "Panitia Dies Natalis",
      kuota: 800, terdaftar: 640, biaya: "Gratis", img: G.purple,
      deskripsi: "Peringatan hari jadi ke-68 ITI yang menampilkan sidang terbuka senat, orasi ilmiah, penganugerahan penghargaan sivitas, dan ramah tamah.",
      agenda: [["08:00", "Registrasi & ramah tamah"], ["09:00", "Sidang terbuka senat"], ["10:00", "Orasi ilmiah Dies Natalis"], ["11:00", "Penganugerahan penghargaan"]],
      narasumber: [["Prof. Dr. H. Salman Alfarisi, M.A", "Rektor"], ["Prof. Dr. Ir. Widodo, M.Sc", "Orator Ilmiah"]],
    },
    {
      id: "seminar-ai-bigdata", nama: "Seminar Nasional AI & Big Data", jenis: "Akademik",
      tgl: "10 Jul 2026", iso: "2026-07-10", waktu: "09:00 – 15:00 WIB", lokasi: "Aula Fakultas Sains & Teknologi", penyelenggara: "Prodi Teknik Informatika",
      kuota: 300, terdaftar: 214, biaya: "Rp 50.000", img: G.blue,
      deskripsi: "Seminar nasional membahas tren terkini kecerdasan buatan dan big data, disertai sesi paralel presentasi paper dan workshop praktik.",
      agenda: [["09:00", "Keynote: Masa depan AI di Indonesia"], ["10:30", "Sesi paralel presentasi paper"], ["13:00", "Workshop: Praktik model machine learning"], ["14:30", "Penutupan & sertifikat"]],
      narasumber: [["Dr. Imam Marzuki, M.Kom", "Pakar AI"], ["Rina Mahmudah, M.T", "Data Scientist Industri"]],
    },
    {
      id: "job-fair-2026", nama: "Job Fair & Career Expo 2026", jenis: "Karir",
      tgl: "15 Jul 2026", iso: "2026-07-15", waktu: "09:00 – 16:00 WIB", lokasi: "Gedung Student Center", penyelenggara: "Pusat Karir & Alumni",
      kuota: 2000, terdaftar: 1180, biaya: "Gratis", img: G.green,
      deskripsi: "Bursa kerja tahunan menghadirkan lebih dari 40 perusahaan mitra, sesi walk-in interview, dan talkshow pengembangan karir bagi mahasiswa tingkat akhir dan alumni.",
      agenda: [["09:00", "Pembukaan booth perusahaan"], ["10:00", "Talkshow: Menyiapkan karir digital"], ["11:00", "Walk-in interview"], ["14:00", "Sesi CV review & konsultasi karir"]],
      narasumber: [["Andini Kusuma, S.I.Kom", "Praktisi HR"], ["Reza Pratama, M.A", "Career Coach"]],
    },
    {
      id: "wisuda-2", nama: "Wisuda Periode II TA 2025/2026", jenis: "Seremonial",
      tgl: "28 Jul 2026", iso: "2026-07-28", waktu: "08:00 – 13:00 WIB", lokasi: "Convention Hall", penyelenggara: "Biro Administrasi Akademik",
      kuota: 1200, terdaftar: 892, biaya: "Gratis", img: G.gold,
      deskripsi: "Prosesi wisuda periode kedua bagi lulusan program sarjana dan pascasarjana, disertai sambutan rektor dan orasi wisudawan terbaik.",
      agenda: [["07:00", "Registrasi wisudawan"], ["08:00", "Prosesi masuk & pembukaan"], ["09:00", "Penyerahan ijazah"], ["12:00", "Sambutan & foto bersama"]],
      narasumber: [["Prof. Dr. H. Salman Alfarisi, M.A", "Rektor"]],
    },
    {
      id: "workshop-jurnal", nama: "Workshop Penulisan Jurnal Internasional", jenis: "Workshop",
      tgl: "05 Agu 2026", iso: "2026-08-05", waktu: "13:00 – 17:00 WIB", lokasi: "Ruang LPPM", penyelenggara: "LPPM",
      kuota: 60, terdaftar: 47, biaya: "Rp 75.000", img: G.orange,
      deskripsi: "Pelatihan intensif teknik penulisan artikel untuk jurnal internasional bereputasi, mencakup strategi pemilihan jurnal, struktur artikel, dan proses submission.",
      agenda: [["13:00", "Anatomi artikel jurnal Q1"], ["14:30", "Strategi memilih jurnal target"], ["15:30", "Praktik menulis abstrak & intro"], ["16:30", "Tanya jawab & penutup"]],
      narasumber: [["Dr. Hj. Rina Mahmudah, M.T", "Reviewer Jurnal Internasional"]],
    },
    {
      id: "codefest", nama: "Kompetisi Programming Nasional \u201cCodeFest\u201d", jenis: "Kompetisi",
      tgl: "12 Agu 2026", iso: "2026-08-12", waktu: "08:00 – 18:00 WIB", lokasi: "Lab Komputer Terpadu", penyelenggara: "HMTI",
      kuota: 150, terdaftar: 132, biaya: "Rp 100.000 / tim", img: G.red,
      deskripsi: "Kompetisi pemrograman kompetitif tingkat nasional dengan babak penyisihan daring dan final luring, memperebutkan total hadiah puluhan juta rupiah.",
      agenda: [["08:00", "Registrasi & briefing"], ["09:00", "Babak final (5 jam)"], ["15:00", "Penjurian & presentasi"], ["17:00", "Pengumuman pemenang"]],
      narasumber: [["Dewi Lestari, M.Kom", "Ketua Juri"]],
    },
    {
      id: "kuliah-umum-digital", nama: "Kuliah Umum: Transformasi Digital Sektor Publik", jenis: "Akademik",
      tgl: "20 Agu 2026", iso: "2026-08-20", waktu: "09:00 – 11:30 WIB", lokasi: "Auditorium Utama", penyelenggara: "Fakultas Ilmu Sosial & Politik",
      kuota: 500, terdaftar: 268, biaya: "Gratis", img: G.slate,
      deskripsi: "Kuliah umum bersama praktisi dan pembuat kebijakan mengenai transformasi digital layanan publik serta tata kelola pemerintahan berbasis data.",
      agenda: [["09:00", "Pembukaan"], ["09:15", "Kuliah umum sesi 1"], ["10:15", "Diskusi panel"], ["11:00", "Tanya jawab"]],
      narasumber: [["Ir. Bambang Wijaya, M.M", "Praktisi Kebijakan Publik"]],
    },
    {
      id: "bootcamp-datascience", nama: "Bootcamp Data Science 5 Hari", jenis: "Workshop",
      tgl: "25 Agu 2026", iso: "2026-08-25", waktu: "08:30 – 16:00 WIB", lokasi: "Lab AI", penyelenggara: "Prodi Sistem Informasi",
      kuota: 40, terdaftar: 40, biaya: "Rp 350.000", img: G.teal,
      deskripsi: "Pelatihan intensif lima hari mulai dari pengolahan data, visualisasi, hingga pemodelan machine learning dengan studi kasus nyata dan sertifikat kompetensi.",
      agenda: [["Hari 1", "Fondasi Python & data wrangling"], ["Hari 2", "Visualisasi & EDA"], ["Hari 3", "Machine learning dasar"], ["Hari 4", "Model evaluasi & tuning"], ["Hari 5", "Proyek akhir & presentasi"]],
      narasumber: [["Dr. Imam Marzuki, M.Kom", "Instruktur Utama"]],
    },
    {
      id: "porsema", nama: "Pekan Olahraga & Seni Mahasiswa", jenis: "Kompetisi",
      tgl: "05 Apr 2026", iso: "2026-04-05", waktu: "07:00 – 17:00 WIB", lokasi: "Kompleks Olahraga Kampus", penyelenggara: "BEM ITI",
      kuota: 1500, terdaftar: 1500, biaya: "Gratis", img: G.orange, lampau: true,
      deskripsi: "Ajang kompetisi olahraga dan seni antar fakultas yang mempererat kebersamaan sivitas akademika. Telah terselenggara dengan meriah.",
      agenda: [["07:00", "Upacara pembukaan"], ["08:00", "Pertandingan cabang olahraga"], ["13:00", "Lomba seni antar fakultas"], ["16:00", "Penutupan & penyerahan piala"]],
      narasumber: [["Galang Maulana", "Ketua BEM"]],
    },
  ];

  return { berita, events, KAT_TONE, EVT_TONE, KAT_LIST: Object.keys(KAT_TONE), EVT_LIST: Object.keys(EVT_TONE),
    katBeritaSeed: () => Object.keys(KAT_TONE).map((n) => ({ nama: n, tone: KAT_TONE[n] })),
    katEventSeed: () => Object.keys(EVT_TONE).map((n) => ({ nama: n, tone: EVT_TONE[n] })) };
})();
