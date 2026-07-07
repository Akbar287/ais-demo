# CLAUDE.md — Frontend SIAKAD (Next.js + TypeScript)

> Panduan untuk Claude/AI & developer saat bekerja di repo **frontend**. Wajib dibaca sebelum menulis kode.
> Dokumen operasional ringkas ada di **AGENTS.md**. Keduanya harus selalu sinkron.

---

## 1. Stack & Keputusan Wajib

| Aspek | Pilihan | Catatan |
|------|---------|---------|
| Framework | **Next.js (App Router)** + **TypeScript** | "app mode" = direktori `app/`. **Dilarang** Pages Router. |
| Pola integrasi | **BFF (Backend for Frontend)** | Semua panggilan ke backend lewat **Route Handlers** `app/api/**`. Browser tidak pernah memanggil microservice langsung. |
| Auth | **next-auth** | OIDC ke IAM/Keycloak. Access token disimpan **server-side**; browser hanya pegang cookie sesi. |
| State | **Redux Toolkit** | UI/global state di `store/`. Data server via **RTK Query** di `services/`. |
| Data fetching | **RTK Query** (ke BFF) | Caching, invalidation, hooks ter-generate. |
| Validasi | **yup** (+ react-hook-form) | Skema di `validation/`. Tipe form diturunkan via `yup.InferType`. |
| Tabel | **TanStack Table** mode **SSR** | `manualPagination/Sorting/Filtering`; data dari BFF. |
| Animasi | **framer-motion** | Hanya di Client Component; hormati `prefers-reduced-motion`. |
| Komponen | **Atomic Design** | `atoms → molecules → organisms → templates`. |

**Aturan Emas (non-negotiable):**
1. **App Router** untuk semua route, layout, dan BFF.
2. **BFF memediasi SEMUA panggilan backend.** Token tidak boleh sampai ke browser.
3. **Setiap menu mengacu ke Modul Level-3** (453 modul = 453 entitas ERD) di `src/config/modules.ts`. Tidak ada route/menu tanpa entri L3.
4. **Atomic Design** ditegakkan: `atoms` murni presentational, tanpa fetch/business logic.
5. **State lewat Redux** (RTK + RTK Query). Tidak ada state global ad-hoc.
6. **Validasi lewat yup** di `validation/`. **Tipe** terpusat di `types/`.
7. **DRY**: fungsi umum di `lib/`, konstanta/konfig di `config/`. Jangan duplikasi fetch/format.

---

## 2. Struktur Folder

```
src/
  app/                      # App Router: route, layout, dan BFF
    (auth)/login/route ...  # alur next-auth
    api/                    # ★ BFF — Route Handlers (server → backend microservice)
      <domain>/route.ts     #   inject token next-auth, agregasi, shaping per-layar
    (mahasiswa)/mahasiswa/...# segмен route per portal (sesuai registry L3)
    (dosen)/dosen/...
    (back-office)/back-office/...
    (pmb)/pmb/...
    (eksekutif)/eksekutif/...
    layout.tsx · middleware proteksi via RBAC registry
  components/               # ★ Atomic Design
    atoms/                  #   Button, Input, Badge — presentational murni
    molecules/              #   FormField, SearchBar — gabungan atoms
    organisms/              #   DataTable, Sidebar, FormSection — boleh pakai store/services
    templates/              #   kerangka layout halaman (tanpa data spesifik)
  lib/                      # fungsi umum: fetcher BFF, format tanggal/uang, guards, util
  config/                   # ★ modules.ts (registry L3), navigation.ts, env.ts, theme
  services/                 # ★ panggilan API (RTK Query) ke BFF, per domain
  store/                    # ★ Redux Toolkit: store.ts + slices UI/global
  validation/               # ★ skema yup per entitas/form
  assets/                   # gambar, ikon, font
  types/                    # ★ seluruh type/interface (termasuk hasil generate OpenAPI)
```

Komposisi halaman (Level "pages" Atomic) **tinggal di `app/`** (RSC), merangkai `templates` + `organisms`.

---

## 3. Modul Level-3 — TOLOK UKUR SELESAI (paling penting)

**Definisi hierarki (mengikuti ERD / Kamus Data):**
- **Level 1 = Subjek Area** — 36 area (mis. *Admisi & Penerimaan (PMB)*, *Master Akademik*, *Keuangan*). Berperan sebagai **kelompok modul**.
- **Level 2 = sub-grup** — digit tengah pada Kode (`1.`**`1`**`.x`, `1.`**`2`**`.x`).
- **Level 3 = entitas/modul** = **satu menu = satu halaman = satu unit "selesai"**. Total **453 modul** (1:1 dengan 453 entitas ERD).

**Registry = sumber tunggal:** `src/config/modules.ts` (`MODULES: ModuleL3[]`) — **453 modul L3**.

Tiap `ModuleL3` memuat: `code` (Kode `L1.L2.L3`, mis. `1.1.1`), `id` (**nama tabel ERD** — tertaut ke data model), `domain` (Core/Support/Platform), `subjek` (L1), `label` (L3), `jenis` (Master/Transaksi/Dokumen/Referensi/Konfigurasi/Log), `owner` (unit pemilik), `roles` (RBAC, diturunkan dari owner), `route`, `status`.

**Aturan keras:**
1. **Tidak ada menu, route, atau halaman tanpa entri Modul Level-3** di registry. Navigasi & RBAC **diturunkan** dari registry (`config/navigation.ts` → `buildNav`/`canAccess`), **bukan** di-hardcode di komponen.
2. **Definition of Done aplikasi = seluruh 453 modul `status === 'done'`** (lengkap test & wiring). Progress via `completion()`.
3. Butuh layar non-entitas (mis. dashboard ringkasan)? Tambahkan entri L3 baru dengan `code` lanjutan pada Subjek terkait — tetap masuk registry.
4. `id` = nama tabel ERD → keterkaitan **frontend ↔ entitas data** terlacak penuh.

## 4. Pola BFF (Backend for Frontend)

```
Browser (Client Component)
   └─ services/ (RTK Query)  →  /api/** (Route Handler = BFF, server)
                                   └─ panggil microservice via NGINX /api/v1/**
                                      (sisipkan Bearer JWT dari sesi next-auth — SERVER-SIDE)
```

**Tugas BFF (`app/api/**`):**
- Ambil access token dari sesi next-auth (`getServerSession`) dan sisipkan ke header backend. **Token tidak pernah dikirim ke browser.**
- **Agregasi**: gabungkan beberapa microservice menjadi satu respons per layar (kurangi chattiness).
- **Shaping**: bentuk DTO sesuai kebutuhan UI; normalisasi error ke format konsisten.
- Validasi input sisi server (boleh pakai yup yang sama dari `validation/`).

**Larangan:** komponen/`services` memanggil `https://.../api/v1/...` backend secara langsung dari browser. Selalu lewat `/api/**`.

---

## 5. Autentikasi (next-auth)

- Provider **OIDC** ke IAM/Keycloak (Authorization Code + PKCE). Satu login (SSO).
- `session.strategy = 'jwt'`. Di callback `jwt`, simpan `access_token` & `roles`; di callback `session`, ekspos **hanya** yang aman untuk UI (nama, peran) — **bukan** access token.
- `middleware.ts` memproteksi route: cek sesi + `canAccess(pathname, session.roles)` dari registry.
- Peran (roles) dari token → dipakai `buildNav` untuk menyusun menu yang boleh dilihat user.

---

## 6. State — Redux Toolkit

- `store/store.ts`: `configureStore`, gabungkan reducer + `api.middleware` (RTK Query).
- `store/slices/*`: state **UI/global** (mis. sidebar, filter aktif, preferensi). Gunakan `createSlice`.
- **Data server**: **RTK Query** di `services/` (lihat §7). Jangan simpan data server di slice manual.
- Komponen membaca state via **selector**; tidak ada business logic di komponen.

---

## 7. Services (RTK Query → BFF)

- Satu `createApi` per domain di `services/<domain>Api.ts`, `baseUrl: '/api'` (BFF, sama-origin).
- Definisikan `endpoints` (query/mutation) + **tag** untuk invalidation. Pakai hooks ter-generate (`useGetXQuery`).
- Tipe request/response dari `types/` (idealnya hasil generate OpenAPI 34 service).
- Tidak ada `fetch` mentah di komponen — semua lewat service.

---

## 8. Atomic Design (components/)

| Tingkat | Boleh | Tidak boleh |
|--------|-------|-------------|
| **atoms** | presentational, props sederhana | fetch, akses store, business logic |
| **molecules** | gabungan atoms, sedikit logika tampilan | fetch data |
| **organisms** | pakai `services`/`store`, blok fungsional | menyimpan business logic domain (taruh di service/BFF) |
| **templates** | kerangka layout | data spesifik |

Komposisi akhir (halaman) di `app/**/page.tsx` (RSC) — ambil data awal server-side, render `templates`+`organisms`.

---

## 9. Validasi (yup)

- Skema per entitas/form di `validation/<entitas>.schema.ts`.
- Form pakai **react-hook-form** + `yupResolver`. Tipe form: `type X = yup.InferType<typeof xSchema>` → re-export ke `types/`.
- Skema yang sama bisa dipakai ulang di **BFF** untuk validasi server.

---

## 10. Tabel SSR (TanStack Table)

- Mode **server**: `manualPagination`, `manualSorting`, `manualFiltering` = true.
- State tabel (page, sort, filter) → diteruskan ke **service** → **BFF** → backend; backend mengembalikan halaman data + total.
- Data awal dirender server (RSC) untuk SSR; interaksi berikutnya lewat RTK Query.
- Definisi kolom (`columns`) diletakkan dekat organism tabelnya; reusable lewat `organisms/DataTable`.

---

## 11. Animasi (framer-motion)

- Hanya di **Client Component** (`'use client'`).
- Pakai `motion.*` + `variants`; transisi halaman via `AnimatePresence`.
- **Wajib** hormati `useReducedMotion()` — matikan animasi non-esensial bila user memintanya.

---

## 12. Types

- **Semua** type/interface di `types/`. Tidak ada `interface` domain yang berserakan di komponen.
- Sumber tipe: (a) generate dari **OpenAPI** 34 service → `types/api/*`; (b) `yup.InferType` dari `validation/`; (c) `ModuleL3` dari `types/module.ts`.

---

## 13. Anti-Spaghetti & DRY

- Fungsi umum (format, fetcher, guard) **hanya** di `lib/`. Dilarang menyalin util antar komponen.
- Konstanta/konfig di `config/`. Endpoint & menu **tidak** di-hardcode di komponen.
- Business logic domain **di BFF/service**, bukan di komponen UI.
- Komponen besar dipecah sesuai Atomic Design; satu file = satu tanggung jawab.

---

## 14. Penamaan & Konvensi

- Komponen `PascalCase`; hook `useCamelCase`; file util/service `camelCase`.
- Route folder mengikuti `route` pada registry L3.
- `id` modul: `<portal>.<group-slug>.<label-slug>`.

---

## 15. Perintah

```bash
pnpm dev            # jalankan dev (App Router)
pnpm build          # build produksi
pnpm lint           # ESLint
pnpm typecheck      # tsc --noEmit
pnpm test           # unit test (Vitest/RTL)
```

---

## 16. Definition of Done

Sebuah Modul Level-3 dianggap **`done`** bila: route ada sesuai registry · UI sesuai Atomic Design · data lewat BFF (token aman) · validasi yup terpasang · state via Redux/RTK Query · tabel SSR (bila relevan) · RBAC benar · test lulus · `status` di `modules.ts` diset `'done'`. **Aplikasi selesai = semua modul `done`** (`completion().percent === 100`).

---

## 17. Instruksi untuk AI Assistant

**Lakukan:** baca registry L3 dulu; tambah entri L3 sebelum membuat menu/route; taruh kode pada folder yang benar (§2); panggil backend hanya via BFF; pakai yup+RTK+framer-motion sesuai konvensi.
**Jangan:** memanggil microservice langsung dari browser; mengekspos access token; hardcode menu/endpoint; menaruh business logic di komponen; membuat type di luar `types/`; memakai Pages Router; memakai state manager selain Redux.

---

## Lampiran A — Registry Modul Level-3 (453 modul, per Subjek Area)

Total **453 modul L3** (= 453 entitas ERD), dikelompokkan ke 36 Subjek Area (L1). Sumber lengkap & otoritatif (dengan seluruh field): `src/config/modules.ts`. Format: `Kode` Nama Modul.

**1. Admisi & Penerimaan (PMB)**  ·  _Core_  ·  24 modul
  `1.1.1` Data Pendaftaran Calon · `1.1.2` Hasil Validasi Identitas · `1.1.3` Pilihan Program Studi · `1.2.1` Virtual Account Pendaftaran · `1.2.2` Pembayaran Pendaftaran · `1.2.3` Kartu Ujian · `1.3.1` Sesi/Jadwal Seleksi · `1.3.2` Instrumen/Soal Seleksi · `1.3.3` Skor Seleksi · `1.3.4` Peringkat Seleksi · `1.4.1` Keputusan Kelulusan PMB · `1.4.2` Pengumuman Kelulusan · `1.5.1` Data Ekonomi Calon · `1.5.2` Golongan UKT · `1.5.3` Tagihan Daftar Ulang · `1.5.4` Pernyataan Kepatuhan (TTE) · `1.5.5` NIM · `1.5.6` Kredensial Akun/SSO · `1.5.7` Pengunduran Diri & Refund · `1.5.8` Registrasi Semester (Herregistrasi) · `1.6.1` Berkas Unggahan Pendaftar · `1.6.2` Checklist Verifikasi Berkas · `1.6.3` Sponsor / Beasiswa Masuk · `1.6.4` Tes Kesehatan / Khusus

**2. Master Akademik**  ·  _Core_  ·  14 modul
  `2.1.1` Kalender Akademik · `2.2.1` Profil Lulusan & CPL · `2.2.2` Matriks CPL x MK · `2.2.3` Struktur Kurikulum (berversi) · `2.3.1` Master Mata Kuliah · `2.3.2` Prasyarat MK · `2.3.3` Tabel Ekuivalensi MK · `2.4.1` RPS · `2.5.1` Bahan Kajian (Body of Knowledge) · `2.5.2` Detail RPS per Pertemuan · `2.5.3` Pemetaan CPMK-CPL · `2.5.4` Rubrik Penilaian (master) · `2.5.5` Konsentrasi / Peminatan Prodi · `2.5.6` Paket Semester (rekomendasi)

**3. Data Induk Mahasiswa**  ·  _Core_  ·  9 modul
  `3.1.1` Biodata Induk Mahasiswa · `3.1.2` Status Akademik Mahasiswa · `3.1.3` Perwalian (Dosen Wali) · `3.2.1` Data Orang Tua / Wali · `3.2.2` Riwayat Pendidikan Sebelumnya · `3.2.3` Berkas / Dokumen Mahasiswa · `3.2.4` Rekening Bank Mahasiswa · `3.2.5` Data Kesehatan / Disabilitas · `3.2.6` Riwayat Perubahan Status (log)

**4. Perkuliahan & Kelas**  ·  _Core_  ·  9 modul
  `4.1.1` Kelas Kuliah · `4.1.2` Penugasan Dosen Pengampu · `4.2.1` Slot Jadwal Kuliah · `4.2.2` Alokasi/Booking Ruang · `4.3.1` Kesediaan / Plotting Dosen · `4.3.2` Kelas / Sesi Praktikum · `4.3.3` Kelompok Praktikum · `4.3.4` Kuliah Pengganti · `4.3.5` Asisten Praktikum

**5. Rencana Studi (KRS)**  ·  _Core_  ·  9 modul
  `5.1.1` Status Pembayaran SPP (Gerbang) · `5.1.2` Draft KRS · `5.1.3` KRS Disetujui · `5.1.4` Perubahan KRS (Add/Drop) · `5.1.5` Roster Kelas / Enrollment · `5.2.1` Kuota & Waitlist Kelas · `5.2.2` Log Persetujuan KRS · `5.2.3` Pembatalan MK Khusus · `5.2.4` Paket KRS Otomatis (maba)

**6. Pelaksanaan & Presensi**  ·  _Core_  ·  12 modul
  `6.1.1` Sesi Perkuliahan · `6.2.1` Presensi Mahasiswa · `6.2.2` Berita Acara Perkuliahan (BAP) · `6.2.3` Rekap Kehadiran · `6.3.1` Kuesioner EDOM · `6.3.2` Hasil EDOM · `6.4.1` Materi / Bahan Ajar · `6.4.2` Penugasan (Assignment) · `6.4.3` Pengumpulan Tugas (Submission) · `6.4.4` Forum Diskusi · `6.4.5` Izin Ketidakhadiran · `6.4.6` Kuliah Tamu / Dosen Tamu

**7. Penilaian & Hasil Studi**  ·  _Core_  ·  14 modul
  `7.1.1` Komponen & Bobot Nilai · `7.1.2` Nilai Komponen · `7.2.1` Daftar Peserta Ujian · `7.2.2` Berita Acara Ujian · `7.2.3` Catatan Kecurangan & Sanksi · `7.3.1` Nilai Akhir / Huruf Mutu · `7.3.2` Kartu Hasil Studi (KHS) · `7.3.3` IPS / IPK · `7.3.4` Transkrip Akademik · `7.3.5` Banding & Koreksi Nilai (log) · `7.4.1` Ujian Perbaikan / Remedial · `7.4.2` Sanggah Nilai · `7.4.3` Skala / Konversi Huruf Mutu (master) · `7.4.4` Statistik / Distribusi Nilai Kelas

**8. Status & Evaluasi Studi**  ·  _Core_  ·  10 modul
  `8.1.1` Pengajuan & SK Cuti · `8.2.1` Indikator Evaluasi Studi · `8.2.2` Surat Peringatan (SP) · `8.2.3` SK Drop Out (DO) · `8.3.1` Pindah Prodi / Undur Diri · `8.4.1` Aktif Kembali (reaktivasi) · `8.4.2` Perpanjangan Masa Studi · `8.4.3` Dispensasi Akademik · `8.4.4` Permohonan Surat Akademik · `8.4.5` Konseling / Bimbingan Akademik

**9. Tugas Akhir**  ·  _Core_  ·  15 modul
  `9.1.1` Pengajuan Judul TA · `9.1.2` Penetapan Pembimbing · `9.2.1` Logbook Bimbingan · `9.2.2` Hasil Cek Plagiarisme · `9.3.1` Pendaftaran Sidang · `9.3.2` Jadwal & Panel Penguji · `9.3.3` Nilai Sidang & Berita Acara · `9.4.1` Lembar Pengesahan TA (TTE) · `9.4.2` Naskah TA Final (Repositori) · `9.4.3` Nilai TA · `9.5.1` Seminar Proposal · `9.5.2` Seminar Hasil · `9.5.3` Berkas Revisi & ACC · `9.5.4` Syarat Publikasi TA · `9.5.5` Penguji Pengganti

**10. Kelulusan, Ijazah & Wisuda**  ·  _Core_  ·  15 modul
  `10.1.1` Kelayakan Yudisium · `10.1.2` Clearance (Bebas Tanggungan) · `10.1.3` Surat Keterangan Lulus (SKL) · `10.1.4` SK Yudisium / Kelulusan · `10.2.1` Transkrip Final · `10.2.2` SKPI · `10.2.3` PIN Ijazah · `10.2.4` Ijazah Digital · `10.3.1` Pendaftaran Wisuda · `10.3.2` Data Alumni (awal) · `10.4.1` Rapat Yudisium · `10.4.2` Legalisir Ijazah / Transkrip · `10.4.3` Surat Keterangan Pengganti Ijazah · `10.4.4` Sesi & Kursi Wisuda / Gladi · `10.4.5` Wisudawan Terbaik

**11. Pelaporan PDDikti**  ·  _Core_  ·  8 modul
  `11.1.1` Data Delta Perubahan · `11.1.2` Mapping Format Feeder · `11.1.3` Log Sinkronisasi Feeder · `11.2.1` Selisih Data (SIAKAD vs Feeder) · `11.2.2` Berita Acara Pelaporan · `11.3.1` Aktivitas Kuliah Mahasiswa (AKM) · `11.3.2` Nilai Transfer / Pengakuan · `11.3.3` Status Mahasiswa per Periode (PDDikti)

**12. Penelitian (LPPM)**  ·  _Core_  ·  16 modul
  `12.1.1` Proposal Penelitian · `12.1.2` RAB Penelitian · `12.1.3` Hasil Cek Similarity Proposal · `12.1.4` Penugasan Reviewer & COI · `12.1.5` Penilaian/Skor Proposal · `12.1.6` Ethical Clearance · `12.2.1` Kontrak/SPP Penelitian · `12.2.2` Logbook Penelitian · `12.2.3` Laporan Kemajuan & Monev · `12.2.4` Pencairan Dana Penelitian (Termin) · `12.3.1` Luaran Publikasi (SINTA) · `12.3.2` HKI/Paten · `12.3.3` Laporan Akhir & SPTB · `12.4.1` Anggota Tim Penelitian · `12.4.2` Kelompok Riset (Research Group) · `12.4.3` Output Tracking & Sitasi

**13. Pengabdian kpd Masyarakat (PkM)**  ·  _Core_  ·  8 modul
  `13.1.1` Proposal PkM & RAB · `13.1.2` Mitra PkM (MoU) · `13.1.3` Tag Indikator SDGs · `13.2.1` Pencairan Dana PkM (Termin) · `13.2.2` Laporan Akhir PkM & Dampak · `13.2.3` Luaran PkM · `13.3.1` Anggota Tim PkM · `13.3.2` Peserta / Sasaran PkM

**14. Kemahasiswaan, Alumni & Karir**  ·  _Core_  ·  16 modul
  `14.1.1` Pengajuan Beasiswa · `14.1.2` SK Penerima & Pencairan Beasiswa · `14.2.1` Prestasi Mahasiswa · `14.2.2` Poin SKKM / Kegiatan · `14.3.1` Calon Pengurus Ormawa (Pemira) · `14.3.2` Surat Suara & Hasil E-Voting · `14.3.3` Proposal & Dana Kegiatan UKM · `14.3.4` LPJ Kegiatan & Reimbursement · `14.4.1` Undangan Tracer Study · `14.4.2` Respons Survei Tracer · `14.4.3` Survei Kepuasan Pengguna Lulusan · `14.4.4` Lowongan & Lamaran (Career) · `14.5.1` Organisasi Mahasiswa (master) · `14.5.2` Keanggotaan Ormawa · `14.5.3` Konseling Mahasiswa · `14.5.4` Pelanggaran & Sanksi Kemahasiswaan

**15. Referensi & Master Lintas-Domain (dikonsumsi Core)**  ·  _Core_  ·  15 modul
  `15.1.1` Program Studi · `15.1.2` Fakultas · `15.1.3` Tahun Akademik / Semester · `15.2.1` Master Tarif / UKT · `15.2.2` Data Induk Dosen (NIDN) · `15.2.3` Master Ruang · `15.3.1` Master Agama · `15.3.2` Master Wilayah · `15.3.3` Master Pekerjaan · `15.3.4` Master Negara · `15.3.5` Master Jenis Kegiatan / Prestasi · `15.3.6` Master Unit Organisasi · `15.3.7` Master Jenis Sanksi · `15.3.8` Master Bank · `15.3.9` Master Jenjang & Gelar

**16. Keuangan (Support)**  ·  _Support_  ·  35 modul
  `16.1.1` RKAT (Rencana Kerja Anggaran Tahunan) · `16.1.2` Detail Pagu Anggaran · `16.1.3` Revisi Anggaran · `16.2.1` Skema Pembayaran · `16.3.1` Tagihan Mahasiswa (header) · `16.3.2` Detail Tagihan · `16.3.3` Pembayaran / Penerimaan · `16.3.4` Rekonsiliasi Bank · `16.3.5` Cicilan / Keringanan · `16.4.1` Pengajuan Belanja (header) · `16.4.2` Detail Belanja · `16.4.3` Pembayaran Vendor/Honor (AP) · `16.4.4` Bukti Potong Pajak · `16.5.1` Chart of Accounts (CoA) · `16.5.2` Jurnal (header) · `16.5.3` Detail Jurnal · `16.5.4` Buku Besar / Saldo (GL) · `16.5.5` Periode Akuntansi · `16.5.6` Laporan Keuangan · `16.6.1` Rekening Bank Institusi (master) · `16.6.2` Mutasi Kas & Bank · `16.6.3` Kas Kecil (Petty Cash) · `16.6.4` Transfer Antar Rekening · `16.7.1` Piutang Mahasiswa (AR) · `16.7.2` Utang Vendor (AP) · `16.7.3` Uang Muka / Panjar Kerja · `16.7.4` Pertanggungjawaban (SPJ) · `16.8.1` Master Tarif Pajak · `16.8.2` SPT Masa / Pelaporan Pajak · `16.8.3` Faktur Pajak · `16.9.1` Sumber Dana (master) · `16.9.2` Unit / Cost Center (master) · `16.9.3` Anggaran vs Realisasi · `16.9.4` Neraca Saldo (Trial Balance) · `16.9.5` Penutupan Buku (Closing)

**17. SDM / Kepegawaian (Support)**  ·  _Support_  ·  34 modul
  `17.1.1` Data Induk Pegawai · `17.1.2` Kontrak / Penugasan · `17.1.3` Riwayat Jabatan / Mutasi · `17.2.1` Data SISTER Dosen · `17.2.2` JAFA / Angka Kredit · `17.2.3` Sertifikasi Dosen (Serdos) · `17.2.4` BKD (header) · `17.2.5` Detail BKD · `17.3.1` Presensi Pegawai · `17.3.2` Pengajuan Cuti · `17.3.3` Saldo Cuti · `17.4.1` Komponen Gaji/Tunjangan · `17.4.2` Payroll Run · `17.4.3` Slip Gaji · `17.4.4` Potongan & Pajak (PPh21) · `17.5.1` Unit Kerja (master) · `17.5.2` Jabatan Struktural (master) · `17.5.3` Golongan / Pangkat (master) · `17.5.4` Riwayat Pendidikan Pegawai · `17.5.5` Riwayat Pelatihan / Sertifikasi · `17.5.6` Keluarga / Tanggungan Pegawai · `17.5.7` Dokumen Pegawai · `17.6.1` Lowongan Pegawai · `17.6.2` Pelamar · `17.6.3` Tahapan Seleksi Pegawai · `17.6.4` Penawaran / Offering · `17.7.1` Penilaian Kinerja (SKP/KPI) · `17.7.2` Diklat / Pelatihan · `17.7.3` Tugas Belajar / Studi Lanjut · `17.7.4` Promosi / Karir · `17.8.1` BPJS (Kesehatan & TK) · `17.8.2` Tunjangan Kinerja · `17.8.3` Pinjaman Pegawai · `17.8.4` THR / Bonus

**18. Perpustakaan (Support)**  ·  _Support_  ·  17 modul
  `18.1.1` Katalog Bibliografi · `18.1.2` Item / Eksemplar · `18.1.3` Klasifikasi / Subjek · `18.2.1` Anggota Perpustakaan · `18.2.2` Transaksi Sirkulasi · `18.2.3` Denda · `18.2.4` Bebas Pustaka · `18.3.1` Repositori Karya · `18.4.1` Pengarang (authority) · `18.4.2` Penerbit (master) · `18.4.3` Akuisisi / Pengadaan Buku · `18.4.4` E-Resources / Jurnal Langganan · `18.4.5` Usulan Buku · `18.5.1` Jenis Keanggotaan (master) · `18.5.2` Reservasi / Booking Buku · `18.5.3` Kunjungan (visitor log) · `18.5.4` Statistik Sirkulasi / Unduh

**19. Penjaminan Mutu & Akreditasi (Support)**  ·  _Support_  ·  18 modul
  `19.1.1` Standar Mutu · `19.1.2` Audit Mutu Internal (header) · `19.1.3` Temuan AMI · `19.1.4` Rencana Tindak Lanjut (RTL) · `19.2.1` Dokumen Akreditasi (LED/LKPS) · `19.2.2` Butir/Indikator LKPS · `19.2.3` Hasil Akreditasi · `19.3.1` Instrumen Survei Kepuasan · `19.3.2` Respons & Indeks Kepuasan · `19.4.1` Dokumen Mutu (SOP/Manual) · `19.4.2` Sasaran Mutu / Target · `19.4.3` Monitoring Capaian Mutu · `19.5.1` Asesor (master) · `19.5.2` Jadwal Asesmen · `19.5.3` Tindak Lanjut Akreditasi · `19.6.1` Register Risiko · `19.6.2` Mitigasi Risiko · `19.6.3` Sertifikasi ISO/Eksternal

**20. Aset & Sarana-Prasarana (Support)**  ·  _Support_  ·  14 modul
  `20.1.1` Data Induk Aset · `20.1.2` Penyusutan · `20.1.3` Pemeliharaan · `20.1.4` Penghapusan Aset · `20.2.1` Peminjaman / Booking Fasilitas · `20.3.1` Kategori Aset (master) · `20.3.2` Lokasi / Gedung (master) · `20.3.3` Mutasi / Transfer Aset · `20.3.4` Stock Opname / Inventarisasi · `20.3.5` Label / Barcode Aset · `20.4.1` Barang Habis Pakai (master) · `20.4.2` Stok Gudang · `20.4.3` Permintaan Barang · `20.4.4` Distribusi / Pengeluaran Barang

**21. Pengadaan (Support)**  ·  _Support_  ·  16 modul
  `21.1.1` Usulan Pengadaan (header) · `21.1.2` Detail Item Pengadaan · `21.1.3` Vendor (master) · `21.1.4` Penawaran Vendor · `21.2.1` Kontrak / PO (header) · `21.2.2` Detail PO · `21.2.3` Penerimaan (BAST) · `21.2.4` Evaluasi Vendor · `21.3.1` Rencana Umum Pengadaan (RUP) · `21.3.2` Kategori Pengadaan (master) · `21.3.3` HPS (Harga Perkiraan Sendiri) · `21.4.1` Adendum Kontrak · `21.4.2` Termin Pembayaran Kontrak · `21.4.3` Berita Acara Pemeriksaan · `21.4.4` Kualifikasi / Dokumen Vendor · `21.4.5` e-Katalog Produk

**22. MBKM (Merdeka Belajar) [Core]**  ·  _Core_  ·  11 modul
  `22.1.1` Program MBKM (BKP) · `22.1.2` Mitra MBKM · `22.1.3` Lowongan / Posisi MBKM · `22.2.1` Pendaftaran MBKM · `22.2.2` Seleksi / Penempatan · `22.2.3` Kontrak / Perjanjian MBKM · `22.2.4` Logbook MBKM · `22.3.1` Penilaian Mitra · `22.3.2` Penilaian Dosen Pembimbing · `22.3.3` Konversi SKS MBKM · `22.3.4` Laporan Akhir MBKM

**23. PKL/Magang & KKN [Core]**  ·  _Core_  ·  11 modul
  `23.1.1` Pendaftaran PKL · `23.1.2` Lokasi / Instansi PKL · `23.1.3` Pembimbing PKL · `23.1.4` Logbook PKL · `23.1.5` Penilaian PKL · `23.1.6` Laporan PKL · `23.2.1` Periode / Gelombang KKN · `23.2.2` Kelompok KKN · `23.2.3` Lokasi & DPL KKN · `23.2.4` Penilaian KKN · `23.2.5` Laporan & Luaran KKN

**24. Kerjasama (Support)**  ·  _Support_  ·  7 modul
  `24.1.1` Mitra Kerjasama (master) · `24.1.2` MoU / Nota Kesepahaman · `24.1.3` MoA / PKS · `24.1.4` IA (Implementation Arrangement) · `24.2.1` Kegiatan Implementasi Kerjasama · `24.2.2` Monitoring & Evaluasi Kerjasama · `24.2.3` Luaran Kerjasama (IKU)

**25. Persuratan & Kearsipan (Support)**  ·  _Support_  ·  8 modul
  `25.1.1` Surat Masuk · `25.1.2` Surat Keluar · `25.1.3` Disposisi · `25.1.4` Nomor Surat (penomoran) · `25.1.5` Template Surat · `25.2.1` Arsip (master) · `25.2.2` Klasifikasi Arsip (master) · `25.2.3` Peminjaman Arsip

**26. Humas & Layanan Informasi (Support)**  ·  _Support_  ·  7 modul
  `26.1.1` Pengumuman · `26.1.2` Berita / Konten · `26.1.3` Agenda / Event · `26.1.4` FAQ · `26.2.1` Tiket Pengaduan / Layanan · `26.2.2` PPID / Permohonan Informasi · `26.2.3` Survei Layanan Publik

**27. Layanan TI / ITSM (Support)**  ·  _Support_  ·  7 modul
  `27.1.1` Tiket Insiden TI · `27.1.2` Permintaan Layanan TI · `27.1.3` Knowledge Base TI · `27.2.1` Aset TI (hardware) · `27.2.2` Lisensi Software · `27.2.3` Pemeliharaan / SLA TI · `27.2.4` Log Perubahan (Change Mgmt)

**28. Umum & Rumah Tangga / BAU (Support)**  ·  _Support_  ·  7 modul
  `28.1.1` Kendaraan Dinas (master) · `28.1.2` Peminjaman Kendaraan · `28.1.3` BBM & Servis Kendaraan · `28.2.1` Pemeliharaan Gedung/Fasilitas · `28.2.2` Keamanan (log) · `28.2.3` Kebersihan · `28.2.4` Konsumsi / Jamuan

**29. Identitas & Akses / IAM (Platform)**  ·  _Platform_  ·  10 modul
  `29.1.1` User (Akun Pengguna) · `29.1.2` Role (Peran) · `29.1.3` Permission (Hak Akses) · `29.1.4` Role-Permission (junction) · `29.1.5` User-Role (junction) · `29.1.6` Group (Grup Pengguna) · `29.1.7` User-Group (junction) · `29.1.8` Module / Permission Category · `29.1.9` Access Request (Permintaan Akses) · `29.1.10` Delegation (Pendelegasian Akses)

**30. Autentikasi & Keamanan (Platform)**  ·  _Platform_  ·  10 modul
  `30.1.1` Identity Provider / SSO Config · `30.1.2` Session (Sesi Login) · `30.1.3` MFA Factor · `30.1.4` OAuth/OIDC Client (App Terdaftar) · `30.1.5` Access Token · `30.1.6` Refresh Token · `30.2.1` Login Attempt (Riwayat Percobaan) · `30.2.2` Password Policy · `30.2.3` Password History · `30.2.4` IP Allowlist / Restriction

**31. Audit & Log (Platform)**  ·  _Platform_  ·  7 modul
  `31.1.1` Audit Trail · `31.1.2` Data Change Log (field-level) · `31.1.3` Activity Log (Aktivitas) · `31.1.4` Login History · `31.1.5` System / Error Log · `31.1.6` Export / Download Log · `31.1.7` API Access Log

**32. Notifikasi & Komunikasi (Platform)**  ·  _Platform_  ·  8 modul
  `32.1.1` Notification (Notifikasi) · `32.1.2` Notification Template · `32.1.3` Channel Config · `32.1.4` Subscription / Preference · `32.1.5` Delivery Log · `32.1.6` Broadcast / Campaign · `32.1.7` Message Queue (Antrian) · `32.1.8` In-App Inbox Thread

**33. Manajemen Dokumen & TTE (Platform)**  ·  _Platform_  ·  8 modul
  `33.1.1` File Storage (Berkas) · `33.1.2` Document (Metadata Dokumen) · `33.1.3` Document Version · `33.1.4` Document Folder / Category · `33.1.5` Document Sharing / ACL · `33.2.1` Digital Signature (TTE) · `33.2.2` Signature Request (Permintaan TTE) · `33.2.3` Document Template

**34. Workflow & Persetujuan (Platform)**  ·  _Platform_  ·  7 modul
  `34.1.1` Workflow Definition · `34.1.2` Workflow Step · `34.1.3` Workflow Instance · `34.1.4` Workflow Task (Tugas) · `34.1.5` Approval Log · `34.1.6` Approval Delegation · `34.1.7` SLA / Escalation

**35. Integrasi & API (Platform)**  ·  _Platform_  ·  8 modul
  `35.1.1` External System Registry · `35.1.2` API Client (Konsumen API) · `35.1.3` API Key · `35.1.4` Webhook Subscription · `35.1.5` Webhook Delivery · `35.1.6` Integration Job (Sinkronisasi) · `35.1.7` Integration Log · `35.1.8` Data Sync Mapping

**36. Konfigurasi & Parameter Sistem (Platform)**  ·  _Platform_  ·  9 modul
  `36.1.1` System Setting (Parameter) · `36.1.2` Feature Flag · `36.1.3` Sequence / Numbering (Penomoran) · `36.1.4` Master Code / Lookup (Referensi Umum) · `36.1.5` Menu / Navigation · `36.1.6` Scheduled Job (Penjadwalan) · `36.1.7` Job Execution Log · `36.1.8` Tenant / Instance Config · `36.1.9` License / Subscription

## Lampiran B — Rekap Subjek Area (L1)

| No | Subjek Area (L1) | Domain | Jumlah Modul L3 |
|----|------------------|--------|-----------------|
| 1 | Admisi & Penerimaan (PMB) | Core | 24 |
| 2 | Master Akademik | Core | 14 |
| 3 | Data Induk Mahasiswa | Core | 9 |
| 4 | Perkuliahan & Kelas | Core | 9 |
| 5 | Rencana Studi (KRS) | Core | 9 |
| 6 | Pelaksanaan & Presensi | Core | 12 |
| 7 | Penilaian & Hasil Studi | Core | 14 |
| 8 | Status & Evaluasi Studi | Core | 10 |
| 9 | Tugas Akhir | Core | 15 |
| 10 | Kelulusan, Ijazah & Wisuda | Core | 15 |
| 11 | Pelaporan PDDikti | Core | 8 |
| 12 | Penelitian (LPPM) | Core | 16 |
| 13 | Pengabdian kpd Masyarakat (PkM) | Core | 8 |
| 14 | Kemahasiswaan, Alumni & Karir | Core | 16 |
| 15 | Referensi & Master Lintas-Domain (dikonsumsi Core) | Core | 15 |
| 16 | Keuangan (Support) | Support | 35 |
| 17 | SDM / Kepegawaian (Support) | Support | 34 |
| 18 | Perpustakaan (Support) | Support | 17 |
| 19 | Penjaminan Mutu & Akreditasi (Support) | Support | 18 |
| 20 | Aset & Sarana-Prasarana (Support) | Support | 14 |
| 21 | Pengadaan (Support) | Support | 16 |
| 22 | MBKM (Merdeka Belajar) [Core] | Core | 11 |
| 23 | PKL/Magang & KKN [Core] | Core | 11 |
| 24 | Kerjasama (Support) | Support | 7 |
| 25 | Persuratan & Kearsipan (Support) | Support | 8 |
| 26 | Humas & Layanan Informasi (Support) | Support | 7 |
| 27 | Layanan TI / ITSM (Support) | Support | 7 |
| 28 | Umum & Rumah Tangga / BAU (Support) | Support | 7 |
| 29 | Identitas & Akses / IAM (Platform) | Platform | 10 |
| 30 | Autentikasi & Keamanan (Platform) | Platform | 10 |
| 31 | Audit & Log (Platform) | Platform | 7 |
| 32 | Notifikasi & Komunikasi (Platform) | Platform | 8 |
| 33 | Manajemen Dokumen & TTE (Platform) | Platform | 8 |
| 34 | Workflow & Persetujuan (Platform) | Platform | 7 |
| 35 | Integrasi & API (Platform) | Platform | 8 |
| 36 | Konfigurasi & Parameter Sistem (Platform) | Platform | 9 |
