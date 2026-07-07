# siakad-frontend-guide

Panduan & kerangka konfigurasi frontend SIAKAD (Next.js + TypeScript).

- **CLAUDE.md** — panduan lengkap (stack, struktur, BFF, Redux, next-auth, yup, TanStack SSR, framer-motion, Modul Level-3).
- **AGENTS.md** — panduan operasional ringkas untuk agen AI.
- **src/config/modules.ts** — ★ registry **453 Modul Level-3** (sumber tunggal navigasi + tolok ukur selesai).
- **src/config/navigation.ts** — `buildNav`/`canAccess` (menu & RBAC diturunkan dari registry).
- **src/types/module.ts** — tipe `ModuleL3`.

## Penempatan
Salin `CLAUDE.md` & `AGENTS.md` ke root repo frontend; salin `src/config/*` dan `src/types/module.ts` ke `src/` aplikasi. Sesuaikan alias `@/` ke `src/` di `tsconfig.json`.

## Prinsip inti
Setiap menu **wajib** mengacu ke entri Modul Level-3. Aplikasi dinyatakan **selesai** ketika seluruh `status` pada `MODULES` = `done` (`completion().percent === 100`).
