/* eslint-disable */
// @ts-nocheck
// Generated from js/views_modules.jsx by scripts/port-js-ssot.mjs.
"use client";


import * as React from "react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Badge, Barcode, BrandLogo, Icon, ImgPlaceholder } from "@/components/atoms";
import { Modal, PageHead } from "@/components/molecules";
import { useToast } from "@/components/organisms";
import { AIS_CONTENT } from "@/data/content";
import { AIS_ERD } from "@/data/erd";
import { AIS_EXP } from "@/data/exp";
import { AIS_ROLES } from "@/data/roles";
import { AIS_DATA } from "@/data/mock-data";
import { initials, rupiah } from "@/lib/format";
import { useSharedList } from "@/lib/sharedStore";

const window = { AIS_CONTENT, AIS_DATA, AIS_ERD, AIS_EXP, AIS_ROLES } as any;

// ============================================================
// SIAKAD ITI — Halaman publik MODUL (levelling L1 → L2 → L3)
// Menunjukkan skala enterprise dari data dictionary (453 entitas).
// ============================================================
const MODUL_L1 = [
  { name: "Akademik Inti", ic: "grad", c: "var(--orange-600)", bg: "var(--orange-50)", subs: [2, 3, 4, 5, 6, 7, 8, 15] },
  { name: "Penerimaan Mahasiswa Baru", ic: "clipboard", c: "var(--green)", bg: "var(--green-bg)", subs: [1] },
  { name: "Tugas Akhir, Kelulusan & Pelaporan", ic: "award", c: "var(--purple)", bg: "var(--purple-bg)", subs: [9, 10, 11] },
  { name: "Penelitian & Pengabdian (LPPM)", ic: "chart", c: "var(--blue)", bg: "var(--blue-bg)", subs: [12, 13] },
  { name: "Kemahasiswaan, MBKM & Alumni", ic: "users", c: "var(--green)", bg: "var(--green-bg)", subs: [14, 22, 23] },
  { name: "Keuangan & Akuntansi", ic: "wallet", c: "var(--amber)", bg: "var(--amber-bg)", subs: [16] },
  { name: "SDM / Kepegawaian", ic: "idcard", c: "var(--purple)", bg: "var(--purple-bg)", subs: [17] },
  { name: "Sarana, Pustaka & Pengadaan", ic: "box", c: "var(--orange-600)", bg: "var(--orange-50)", subs: [18, 20, 21] },
  { name: "Tata Kelola, Mutu & Mitra", ic: "shield", c: "var(--blue)", bg: "var(--blue-bg)", subs: [19, 24, 25, 26, 27, 28] },
  { name: "Platform & Integrasi", ic: "server", c: "var(--red)", bg: "var(--red-bg)", subs: [29, 30, 31, 32, 33, 34, 35, 36] },
];

function ModulLevelBadge({ n, color }) {
  return (
    <span style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: ".06em", color, background: "currentColor", borderRadius: 6, padding: "2px 6px", lineHeight: 1 }}>
      <span style={{ color, mixBlendMode: "normal" }}>L{n}</span>
    </span>
  );
}

function ModulL2({ subjNo, color }) {
  const E = window.AIS_ERD;
  const subj = E.subjects.find((s) => s.no === subjNo);
  const ents = E.entities.filter((e) => Number(String(e.kode).split(".")[0]) === subjNo);
  const [open, setOpen] = useState(false);
  if (!subj) return null;
  return (
    <div className="ml2">
      <button className="ml2-head" onClick={() => setOpen((o) => !o)}>
        <span className="ml-tag" style={{ color, background: "color-mix(in srgb, " + color + " 14%, #fff)" }}>L2</span>
        <span className="ml2-name">{subj.nama}</span>
        <span className="ml2-meta">{ents.length} entitas · {subj.field} field</span>
        <Icon name="chevR" size={15} style={{ color: "var(--ink-3)", transform: open ? "rotate(90deg)" : "none", transition: "transform .18s" }} />
      </button>
      {open && (
        <div className="ml3-wrap">
          <div className="ml3-cap"><span className="ml-tag" style={{ color, background: "color-mix(in srgb, " + color + " 14%, #fff)" }}>L3</span> Entitas / fitur</div>
          <div className="ml3-grid">
            {ents.map((e) => (
              <div key={e.kode} className="ml3-item">
                <span className="dot" style={{ background: color, width: 6, height: 6, flexShrink: 0 }} />
                <span className="ml3-name">{e.nama}</span>
                <span className="mono ml3-kode">{e.kode}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ModulL1Card({ mod, defaultOpen }) {
  const E = window.AIS_ERD;
  const [open, setOpen] = useState(defaultOpen);
  const subjList = mod.subs.map((n) => E.subjects.find((s) => s.no === n)).filter(Boolean);
  const totalEnt = subjList.reduce((a, s) => a + s.entitas, 0);
  const totalField = subjList.reduce((a, s) => a + s.field, 0);
  return (
    <div className="card ml1" style={{ borderColor: open ? mod.c : "var(--line)" }}>
      <button className="ml1-head" onClick={() => setOpen((o) => !o)}>
        <span className="ml1-ic" style={{ background: mod.bg, color: mod.c }}><Icon name={mod.ic} size={22} /></span>
        <span className="ml1-text">
          <span className="ml1-top">
            <span className="ml-tag" style={{ color: mod.c, background: "color-mix(in srgb, " + mod.c + " 14%, #fff)" }}>L1</span>
            <b>{mod.name}</b>
          </span>
          <span className="ml1-meta">{subjList.length} sub-modul · {totalEnt} entitas · {totalField} field</span>
        </span>
        <Icon name="chevR" size={18} style={{ color: mod.c, transform: open ? "rotate(90deg)" : "none", transition: "transform .2s", flexShrink: 0 }} />
      </button>
      {open && (
        <div className="ml1-body">
          {mod.subs.map((n) => <ModulL2 key={n} subjNo={n} color={mod.c} />)}
        </div>
      )}
    </div>
  );
}

function Modules({ onLogin, onHome }) {
  const E = window.AIS_ERD;
  const totalSub = E.subjects.length;
  const totalEnt = E.entities.length;
  const totalField = E.totals ? E.totals.field : 4889;

  return (
    <div className="lp mp">
      {/* Navbar */}
      <header className="lp-nav">
        <button className="lp-brand mp-home" onClick={onHome} style={{ border: "none", background: "none", cursor: "pointer", fontFamily: "var(--sans)" }}>
          <BrandLogo size={40} priority />
          <div style={{ textAlign: "left" }}>
            <b style={{ fontSize: 16, fontWeight: 800, letterSpacing: 0, display: "block", lineHeight: 1.05 }}>SIAKAD ITI</b>
            <span style={{ fontSize: 11, color: "var(--ink-3)" }}>Institut Teknologi Indonesia</span>
          </div>
        </button>
        <nav className="lp-links">
          <button onClick={onHome} style={{ border: "none", background: "none", cursor: "pointer", font: "inherit", color: "var(--ink-2)", fontWeight: 600 }}>Beranda</button>
        </nav>
        <button className="btn btn-primary" onClick={onLogin}><Icon name="lock" size={16} /> Masuk</button>
      </header>

      {/* Hero */}
      <section className="mp-hero">
        <button className="mp-back" onClick={onHome}><Icon name="chevR" size={14} style={{ transform: "rotate(180deg)" }} /> Kembali ke beranda</button>
        <span className="lp-kicker">Peta Modul · Arsitektur Berskala Enterprise</span>
        <h1>Struktur modul tiga tingkat</h1>
        <p>Aplikasi disusun berlapis — <b>Modul (L1)</b> → <b>Sub-modul (L2)</b> → <b>Entitas/Fitur (L3)</b> — mengikuti kamus data resmi. Klik tiap kartu untuk menelusuri hingga level entitas.</p>
        <div className="mp-stats">
          {[[MODUL_L1.length, "Modul (L1)"], [totalSub, "Sub-modul (L2)"], [totalEnt, "Entitas (L3)"], [totalField.toLocaleString("id"), "Field data"]].map(([v, l]) => (
            <div key={l}><div className="mp-stat-v">{v}</div><div className="mp-stat-l">{l}</div></div>
          ))}
        </div>
        <div className="mp-legend">
          {[["L1", "Modul", "var(--orange-600)"], ["L2", "Sub-modul / subjek data", "var(--blue)"], ["L3", "Entitas & fitur", "var(--green)"]].map(([t, d, c]) => (
            <span key={t} className="mp-leg"><span className="ml-tag" style={{ color: c, background: "color-mix(in srgb, " + c + " 14%, #fff)" }}>{t}</span> {d}</span>
          ))}
        </div>
      </section>

      {/* Hierarchy */}
      <section className="mp-list">
        {MODUL_L1.map((mod, i) => <ModulL1Card key={mod.name} mod={mod} defaultOpen={i === 0} />)}
      </section>

      {/* CTA */}
      <section className="lp-final" style={{ marginTop: 24 }}>
        <h2>Jelajahi tiap modul secara langsung</h2>
        <p>Masuk untuk mencoba demo seluruh peran dan menu.</p>
        <button className="btn lp-big" onClick={onLogin} style={{ background: "var(--surface)", color: "var(--orange-600)" }}><Icon name="lock" size={17} /> Masuk ke Portal</button>
      </section>

      <footer className="lp-foot">
        <div className="lp-brand"><BrandLogo size={34} /><span style={{ fontWeight: 700 }}>SIAKAD ITI — Institut Teknologi Indonesia</span></div>
        <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>Demo prototipe · {new Date().getFullYear()}</span>
      </footer>

      <style>{`
        /* Shared chrome (disalin agar tetap berlaku saat Landing tidak ter-mount) */
        .mp.lp { min-height: 100vh; background: var(--bg); }
        .mp a { text-decoration: none; color: inherit; }
        .mp .lp-nav { position: sticky; top: 0; z-index: 20; display: flex; align-items: center; gap: 18px;
          padding: 14px 7vw; background: var(--topbar-bg); backdrop-filter: blur(12px); border-bottom: 1px solid var(--line); }
        .mp .lp-brand { display: flex; align-items: center; gap: 11px; }
        .mp .lp-links { margin-left: auto; display: flex; gap: 26px; font-size: 14px; font-weight: 600; color: var(--ink-2); }
        .mp .lp-links a:hover, .mp .lp-links button:hover { color: var(--orange-600); }
        .mp .lp-nav .btn { margin-left: 8px; }
        .mp .lp-kicker { font-size: 12.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--orange-600); }
        .mp .lp-big { height: 52px; padding: 0 24px; font-size: 15.5px; border-radius: 14px; }
        .mp .lp-final { text-align: center; padding: 72px 7vw; margin: 0 7vw 64px; border-radius: 28px;
          background: linear-gradient(135deg, var(--orange), var(--orange-600)); color: #fff; }
        .mp .lp-final h2 { font-size: 32px; font-weight: 800; letter-spacing: -.02em; margin: 0 0 10px; }
        .mp .lp-final p { font-size: 16px; opacity: .92; margin: 0 0 26px; }
        .mp .lp-foot { display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 28px 7vw 40px; max-width: 1280px; margin: 0 auto; flex-wrap: wrap; border-top: 1px solid var(--line); }
        @media (max-width: 600px) { .mp .lp-links { display: none; } .mp .lp-final { margin: 0 16px 40px; padding: 52px 24px; } }

        .mp .ml-tag { font-size: 9.5px; font-weight: 800; letter-spacing: .05em; border-radius: 6px; padding: 2px 6px; line-height: 1; display: inline-block; }
        .mp-hero { max-width: 1100px; margin: 0 auto; padding: 40px 7vw 26px; text-align: center; }
        .mp-back { border: 1px solid var(--line); background: var(--surface); color: var(--ink-2); font-family: var(--sans); font-weight: 600; font-size: 13px; padding: 7px 13px; border-radius: 10px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; margin-bottom: 20px; }
        .mp-hero h1 { font-size: 38px; letter-spacing: -.03em; font-weight: 800; margin: 10px 0 12px; }
        .mp-hero > p { font-size: 16px; color: var(--ink-2); line-height: 1.6; max-width: 620px; margin: 0 auto 26px; }
        .mp-stats { display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; margin-bottom: 22px; }
        .mp-stat-v { font-size: 30px; font-weight: 800; font-family: var(--mono); letter-spacing: -.02em; }
        .mp-stat-l { font-size: 12.5px; color: var(--ink-3); font-weight: 600; }
        .mp-legend { display: flex; justify-content: center; gap: 22px; flex-wrap: wrap; font-size: 13px; color: var(--ink-2); }
        .mp-leg { display: inline-flex; align-items: center; gap: 8px; }

        .mp-list { max-width: 980px; margin: 0 auto; padding: 8px 7vw 40px; display: grid; gap: 14px; }
        .ml1 { overflow: hidden; transition: border-color .2s; }
        .ml1-head { display: flex; align-items: center; gap: 15px; width: 100%; padding: 18px 22px; border: none; background: none; cursor: pointer; font-family: var(--sans); text-align: left; }
        .ml1-ic { width: 48px; height: 48px; border-radius: 14px; display: grid; place-items: center; flex-shrink: 0; }
        .ml1-text { flex: 1; min-width: 0; }
        .ml1-top { display: flex; align-items: center; gap: 9px; }
        .ml1-top b { font-size: 17px; font-weight: 800; letter-spacing: -.01em; }
        .ml1-meta { display: block; font-size: 13px; color: var(--ink-3); margin-top: 3px; }
        .ml1-body { padding: 4px 18px 18px; display: grid; gap: 8px; }

        .ml2 { border: 1px solid var(--line); border-radius: 13px; overflow: hidden; background: var(--surface); }
        .ml2-head { display: flex; align-items: center; gap: 11px; width: 100%; padding: 12px 16px; border: none; background: var(--surface-2); cursor: pointer; font-family: var(--sans); text-align: left; }
        .ml2-name { font-weight: 700; font-size: 14px; flex: 1; min-width: 0; }
        .ml2-meta { font-size: 12px; color: var(--ink-3); white-space: nowrap; }
        .ml3-wrap { padding: 14px 16px 16px; }
        .ml3-cap { font-size: 11.5px; font-weight: 700; color: var(--ink-3); display: flex; align-items: center; gap: 8px; margin-bottom: 11px; }
        .ml3-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 7px 18px; }
        .ml3-item { display: flex; align-items: center; gap: 9px; font-size: 13px; padding: 4px 0; }
        .ml3-name { flex: 1; min-width: 0; font-weight: 600; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .ml3-kode { font-size: 11px; color: var(--ink-3); flex-shrink: 0; }

        @media (max-width: 760px) {
          .mp-hero h1 { font-size: 30px; }
          .ml3-grid { grid-template-columns: 1fr; }
          .ml2-meta { display: none; }
        }
      `}</style>
    </div>
  );
}

export { Modules };
