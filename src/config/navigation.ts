// Navigasi & RBAC DITURUNKAN dari registry Modul Level-3 — JANGAN hardcode menu.
import { MODULES } from '../config/modules';
import type { ModuleL3, Domain } from '../types/module';

export interface NavGroup { subjek: string; items: ModuleL3[]; }

/** Menu untuk peran user; opsional difilter per domain. Dikelompokkan per Subjek Area (L1). */
export function buildNav(userRoles: string[], domain?: Domain): NavGroup[] {
  const visible = MODULES.filter(
    m => (!domain || m.domain === domain) && m.roles.some(r => userRoles.includes(r)),
  );
  const byS = new Map<string, ModuleL3[]>();
  for (const m of visible) {
    if (!byS.has(m.subjek)) byS.set(m.subjek, []);
    byS.get(m.subjek)!.push(m);
  }
  return Array.from(byS, ([subjek, items]) => ({ subjek, items }));
}

/** Otorisasi akses route berdasarkan registry (dipakai middleware). */
export function canAccess(route: string, userRoles: string[]): boolean {
  const m = MODULES.find(x => x.route === route);
  return !!m && m.roles.some(r => userRoles.includes(r));
}
