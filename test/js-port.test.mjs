import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";

const root = process.cwd();

function read(rel) {
  return readFileSync(path.join(root, rel), "utf8");
}

function viewIds() {
  const registry = read("src/config/viewRegistry.tsx");
  const match = registry.match(/export const VIEW_REGISTRY = \{([\s\S]*?)\n\} as const/);
  assert.ok(match, "VIEW_REGISTRY block must be present");
  return [...match[1].matchAll(/^\s*([A-Za-z0-9_]+):\s*\(/gm)].map((m) => m[1]);
}

function rolesData() {
  const source = read("src/data/roles.ts").replace(
    "export const AIS_ROLES =",
    "globalThis.AIS_ROLES =",
  );
  const context = { globalThis: {} };
  vm.runInNewContext(source, context);
  return context.globalThis.AIS_ROLES;
}

function homeByRole() {
  const source = read("src/config/roleRouting.ts");
  const match = source.match(/export const HOME_VIEW_BY_ROLE = (\{[\s\S]*?\}) as const/);
  assert.ok(match, "HOME_VIEW_BY_ROLE object must be present");
  return vm.runInNewContext(`(${match[1]})`);
}

function viewToSegment(view) {
  return view.replaceAll("_", "-");
}

function walk(dir, files = []) {
  for (const name of readdirSync(path.join(root, dir))) {
    const rel = path.join(dir, name);
    const abs = path.join(root, rel);
    if (statSync(abs).isDirectory()) {
      walk(rel, files);
    } else if (/\.[cm]?[jt]sx?$/.test(name)) {
      files.push(rel);
    }
  }
  return files;
}

test("ported role navigation is fully backed by the view registry", () => {
  const views = new Set(viewIds());
  const roles = rolesData();
  const home = homeByRole();

  const roleKeys = Object.keys(roles.roleMeta).sort();
  assert.deepEqual(Object.keys(roles.personas).sort(), roleKeys, "personas must match roleMeta");
  assert.deepEqual(Object.keys(roles.navByRole).sort(), roleKeys, "navByRole must match roleMeta");
  assert.deepEqual(Object.keys(home).sort(), roleKeys, "HOME_VIEW_BY_ROLE must match roleMeta");

  const missingHome = Object.entries(home)
    .filter(([, id]) => !views.has(id))
    .map(([role, id]) => `${role}:${id}`);
  assert.deepEqual(missingHome, [], "every role home view must exist");

  const missingNav = [];
  for (const [role, sections] of Object.entries(roles.navByRole)) {
    assert.ok(sections.length > 0, `${role} must have at least one nav section`);
    for (const section of sections) {
      for (const item of section.items) {
        if (!views.has(item.id)) missingNav.push(`${role}:${item.id}`);
      }
    }
  }
  assert.deepEqual(missingNav, [], "every nav item must point to an existing view");
});

test("public and role menu routes are addressable by full URLs", () => {
  const requiredPages = [
    "src/app/page.tsx",
    "src/app/login/page.tsx",
    "src/app/modul/page.tsx",
    "src/app/berita/page.tsx",
    "src/app/berita/[id]/page.tsx",
    "src/app/agenda/page.tsx",
    "src/app/agenda/[id]/page.tsx",
    "src/app/[role]/[[...menu]]/page.tsx",
  ];

  for (const page of requiredPages) {
    assert.ok(existsSync(path.join(root, page)), `${page} must exist`);
  }

  const roles = rolesData();
  const paths = [];
  for (const [role, sections] of Object.entries(roles.navByRole)) {
    for (const section of sections) {
      for (const item of section.items) {
        paths.push(`/${role}/${viewToSegment(item.id)}`);
      }
    }
  }

  assert.ok(paths.includes("/mahasiswa/krs"));
  assert.ok(paths.includes("/admin/adm-users"));
  assert.ok(paths.includes("/pimpinan/pimp-dashboard"));
  assert.equal(new Set(paths).size, paths.length, "role/menu URLs must be unique");
});

test("ported app no longer imports the legacy js folder at runtime", () => {
  const hits = [];
  for (const file of walk("src")) {
    const source = read(file);
    for (const match of source.matchAll(/(?:from\s+|import\()(['"])(.*?)\1/g)) {
      const specifier = match[2];
      const legacy =
        specifier === "js" ||
        specifier.startsWith("js/") ||
        specifier.startsWith("./js") ||
        specifier.startsWith("../js") ||
        specifier.includes("/js/");
      if (legacy) hits.push(`${file} -> ${specifier}`);
    }
  }

  assert.deepEqual(hits, [], "src must not import from legacy js folder");
});

test("official ITI branding assets and metadata are present", () => {
  assert.ok(existsSync(path.join(root, "public/images/logo.png")), "ITI logo asset must exist");
  assert.ok(existsSync(path.join(root, "public/icon/favicon.ico")), "favicon asset must exist");

  const appConfig = read("src/config/app.ts");
  const layout = read("src/app/layout.tsx");
  const styles = read("src/styles/global.css");

  assert.match(appConfig, /SIAKAD ITI/);
  assert.match(appConfig, /Institut Teknologi Indonesia/);
  assert.match(appConfig, /Yayasan Pengembangan Teknologi Indonesia/);
  assert.match(layout, /\/icon\/favicon\.ico/);
  assert.match(styles, /--orange:\s*#d97e34;/);
});
