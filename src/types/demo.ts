export type DemoRole =
  | "mahasiswa"
  | "dosen"
  | "pa"
  | "kaprodi"
  | "keuangan"
  | "admin"
  | "pustakawan"
  | "pmb"
  | "hr"
  | "pengadaan"
  | "aset"
  | "calon"
  | "lppm"
  | "lpm"
  | "mbkm"
  | "kkn"
  | "tu"
  | "itsm"
  | "kemahasiswaan"
  | "kerjasama"
  | "humas"
  | "bau"
  | "dokumen"
  | "workflow"
  | "pimpinan"
  | "akuntansi"
  | "baa"
  | "pddikti";

export type PublicView =
  | "home"
  | "modul"
  | "berita"
  | "beritaDetail"
  | "events"
  | "eventDetail";

export type Persona = {
  nama: string;
  id: string;
  idLabel: string;
  jabatan: string;
  unit: string;
  ava: string;
  avaBg: string;
};

export type RoleMeta = {
  label: string;
  ic: string;
  color: string;
  bg: string;
  desc: string;
  svc: string;
  cat: string;
};

export type NavigationItem = {
  id: string;
  label: string;
  ic: string;
  badge?: string;
};

export type NavigationSection = {
  group: string | null;
  items: NavigationItem[];
};
