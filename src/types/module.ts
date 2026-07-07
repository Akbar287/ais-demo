// Tipe Modul Level-3 (mengikuti ERD: Kode L1.L2.L3). Lihat src/config/modules.ts.
export type Domain = 'Core' | 'Support' | 'Platform';
export type EntityKind = 'Dokumen' | 'Konfigurasi' | 'Log' | 'Master' | 'Referensi' | 'Transaksi';
export type ModuleStatus = 'planned' | 'in-progress' | 'done';

/** Modul Level-3 = 1 entitas ERD = 1 menu/halaman = 1 unit "selesai". Total 453 modul. */
export interface ModuleL3 {
  code: string;        // Kode L1.L2.L3, mis. '1.1.1'
  id: string;          // nama tabel ERD (tautan ke data model)
  domain: Domain;      // Core | Support | Platform
  subjek: string;      // Level-1 (Subjek Area) = kelompok modul
  label: string;       // Level-3 = nama modul/menu
  jenis: EntityKind;   // sifat data
  owner: string;       // unit pemilik (acuan RBAC)
  roles: string[];     // peran yang boleh akses (diturunkan dari owner)
  route: string;       // path App Router
  status: ModuleStatus;// tolok ukur selesai aplikasi
}
