import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const jsDir = path.join(root, "js");
const srcDir = path.join(root, "src");
const fromJsDir = path.join(srcDir, "components/features/from-js");

function read(rel) {
  return readFileSync(path.join(root, rel), "utf8").replace(/\r\n/g, "\n");
}

function write(rel, content) {
  const abs = path.join(root, rel);
  mkdirSync(path.dirname(abs), { recursive: true });
  writeFileSync(abs, content.endsWith("\n") ? content : `${content}\n`);
}

function header(from, client = false) {
  return `${[
    "/* eslint-disable */",
    "// @ts-nocheck",
    `// Generated from ${from} by scripts/port-js-ssot.mjs.`,
    client ? '"use client";' : "",
  ].filter(Boolean).join("\n")}\n\n`;
}

function portData(sourceRel, globalName, outRel) {
  const source = read(sourceRel);
  const needle = `window.${globalName} =`;
  if (!source.includes(needle)) {
    throw new Error(`${sourceRel} does not contain ${needle}`);
  }
  write(outRel, header(sourceRel) + source.replace(needle, `export const ${globalName} =`));
}

function parseExports(source) {
  const exports = [];
  const assignRe = /Object\.assign\(window,\s*\{([\s\S]*?)\}\);/g;
  let match;
  while ((match = assignRe.exec(source))) {
    const cleaned = match[1]
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/.*$/gm, "");
    for (const raw of cleaned.split(",")) {
      const name = raw.trim();
      if (/^[A-Za-z_$][\w$]*$/.test(name) && !exports.includes(name)) {
        exports.push(name);
      }
    }
  }
  return exports;
}

function stripWindowAssign(source) {
  return source.replace(/Object\.assign\(window,\s*\{[\s\S]*?\}\);\s*/g, "").trim();
}

function portView(filename) {
  const sourceRel = `js/${filename}`;
  const original = read(sourceRel);
  const exports = parseExports(original);
  const body = stripWindowAssign(original);
  const moduleName = filename.replace(/\.jsx$/, "");
  const imports = [
    'import * as React from "react";',
    'import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";',
    'import { Badge, Barcode, Icon, ImgPlaceholder } from "@/components/atoms";',
    'import { Modal, PageHead } from "@/components/molecules";',
    body.includes("<StaffHero") && !/\bfunction\s+StaffHero\b/.test(body)
      ? 'import { StaffHero, useToast } from "@/components/organisms";'
      : 'import { useToast } from "@/components/organisms";',
    'import { AIS_CONTENT } from "@/data/content";',
    'import { AIS_ERD } from "@/data/erd";',
    'import { AIS_EXP } from "@/data/exp";',
    'import { AIS_ROLES } from "@/data/roles";',
    'import { AIS_DATA } from "@/data/mock-data";',
    'import { initials, rupiah } from "@/lib/format";',
    'import { useSharedList } from "@/lib/sharedStore";',
  ];

  if (filename === "views_erd.jsx") {
    imports.push('import { EntityCrud } from "./views_erd_crud";');
  }

  const windowShim = [
    "",
    "const window = { AIS_CONTENT, AIS_DATA, AIS_ERD, AIS_EXP, AIS_ROLES } as any;",
    "",
  ].join("\n");
  const exportLine = exports.length ? `\nexport { ${exports.join(", ")} };\n` : "";
  const content = [
    header(sourceRel, true),
    imports.join("\n"),
    windowShim,
    body,
    exportLine,
  ].join("\n");
  write(`src/components/features/from-js/${moduleName}.tsx`, content);
  return { moduleName, exports };
}

function extractViewRegistry(appSource) {
  const match = appSource.match(/const VIEW_REGISTRY = \{([\s\S]*?)\n\};\n\nconst HOME_OF/);
  if (!match) throw new Error("Cannot extract VIEW_REGISTRY from js/app.jsx");
  return match[1];
}

function extractHomeOf(appSource) {
  const match = appSource.match(/const HOME_OF = (\{[^\n]+?\});/);
  if (!match) throw new Error("Cannot extract HOME_OF from js/app.jsx");
  return match[1];
}

function buildViewRegistry(appSource, exportMap) {
  const block = extractViewRegistry(appSource);
  const components = [...block.matchAll(/<([A-Z][A-Za-z0-9_]*)\b/g)].map((m) => m[1]);
  const uniqueComponents = [...new Set(components)].sort();
  const byModule = new Map();
  const missing = [];

  for (const component of uniqueComponents) {
    const mod = exportMap.get(component);
    if (!mod) {
      missing.push(component);
      continue;
    }
    if (!byModule.has(mod)) byModule.set(mod, []);
    byModule.get(mod).push(component);
  }

  if (missing.length) {
    throw new Error(`Missing component exports for registry: ${missing.join(", ")}`);
  }

  const imports = [...byModule.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([mod, names]) => `import { ${names.sort().join(", ")} } from "@/components/features/from-js/${mod}";`)
    .join("\n");

  const content = [
    "/* eslint-disable */",
    'import type { ReactNode } from "react";',
    imports,
    "",
    "export type ViewContext = {",
    "  nav: (view: string) => void;",
    "  role: string;",
    "  krsState: any;",
    "  setKrsState: (next: any) => void;",
    "  period: any;",
    "  isArchived: boolean;",
    "};",
    "",
    "export const VIEW_REGISTRY = {",
    block,
    "} as const satisfies Record<string, (ctx: ViewContext) => ReactNode>;",
    "",
    "export type ViewId = keyof typeof VIEW_REGISTRY;",
    "",
  ].join("\n");
  write("src/config/viewRegistry.tsx", content);
}

function buildRoleRouting(appSource) {
  const homeOf = extractHomeOf(appSource);
  const content = [
    'import type { DemoRole } from "@/types/demo";',
    'import type { ViewId } from "./viewRegistry";',
    "",
    `export const HOME_VIEW_BY_ROLE = ${homeOf} as const satisfies Record<DemoRole, ViewId>;`,
    "",
  ].join("\n");
  write("src/config/roleRouting.ts", content);
}

mkdirSync(fromJsDir, { recursive: true });

portData("js/data.js", "AIS_DATA", "src/data/mock-data.ts");
portData("js/data_roles.js", "AIS_ROLES", "src/data/roles.ts");
portData("js/data_erd.js", "AIS_ERD", "src/data/erd.ts");
portData("js/data_content.js", "AIS_CONTENT", "src/data/content.ts");
portData("js/data_exp.js", "AIS_EXP", "src/data/exp.ts");

const exportMap = new Map();
const views = readdirSync(jsDir)
  .filter((name) => /^views_.*\.jsx$/.test(name))
  .sort();

for (const view of views) {
  const result = portView(view);
  for (const exported of result.exports) {
    exportMap.set(exported, result.moduleName);
  }
}

const appSource = read("js/app.jsx");
buildViewRegistry(appSource, exportMap);
buildRoleRouting(appSource);

console.log(`Ported ${views.length} view files and ${exportMap.size} exported symbols from js/ to src/.`);
