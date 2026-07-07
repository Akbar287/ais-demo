/* eslint-disable */
// @ts-nocheck
// Generated from js/views_landing.jsx by scripts/port-js-ssot.mjs.
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
// SIAKAD ITI — Landing Page Institut Teknologi Indonesia
// Hero, Program Studi, Berita, Event, Banner, Statistik, Footer
// ============================================================

const PRODI_LIST = [
  { nama: "Teknik Informatika", fakultas: "Teknologi Informasi", akreditasi: "Unggul", jenjang: "S1", mhs: 642, icon: "server" },
  { nama: "Teknik Elektro", fakultas: "Rekayasa Elektro", akreditasi: "Baik Sekali", jenjang: "S1", mhs: 414, icon: "activity" },
  { nama: "Teknik Mesin", fakultas: "Rekayasa Mesin", akreditasi: "Baik Sekali", jenjang: "S1", mhs: 386, icon: "wrench" },
  { nama: "Teknik Industri", fakultas: "Sistem Industri", akreditasi: "Unggul", jenjang: "S1", mhs: 518, icon: "layers" },
  { nama: "Teknik Kimia", fakultas: "Rekayasa Proses", akreditasi: "Baik Sekali", jenjang: "S1", mhs: 352, icon: "beaker" },
  { nama: "Teknik Sipil", fakultas: "Rekayasa Infrastruktur", akreditasi: "Baik Sekali", jenjang: "S1", mhs: 441, icon: "building" },
  { nama: "Arsitektur", fakultas: "Desain & Lingkungan Binaan", akreditasi: "Baik Sekali", jenjang: "S1", mhs: 304, icon: "home" },
  { nama: "Perencanaan Wilayah dan Kota", fakultas: "Perencanaan", akreditasi: "Baik Sekali", jenjang: "S1", mhs: 288, icon: "pin" },
  { nama: "Teknologi Industri Pertanian", fakultas: "Teknologi Industri", akreditasi: "Baik Sekali", jenjang: "S1", mhs: 266, icon: "beaker" },
  { nama: "Manajemen", fakultas: "Bisnis & Manajemen", akreditasi: "Baik Sekali", jenjang: "S1", mhs: 560, icon: "briefcase" },
];

const PENGUMUMAN = [
  "Pendaftaran wisuda periode II dibuka hingga 10 Juli 2026",
  "Jadwal UAS semester genap: 5–16 Januari 2027",
  "Beasiswa KIP-Kuliah 2026 — kuota 120 mahasiswa",
  "Layanan akademik Idul Adha libur 7–11 Juli 2026",
];

// Berita & event bersumber dari js/data_content.js (window.AIS_CONTENT)
const EVT_TONE = window.AIS_CONTENT.EVT_TONE;
const KAT_TONE = window.AIS_CONTENT.KAT_TONE;

function Landing({ onLogin, onModul, nav }) {
  const go = nav || {};
  const BERITA = window.AIS_CONTENT.berita;
  const EVENTS = window.AIS_CONTENT.events.filter((e) => !e.lampau);
  const [prodiOpen, setProdiOpen] = useState(false);

  // ---------- Navbar ----------
  const navbar = (
    <nav className="ld-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "var(--topbar-bg)", backdropFilter: "blur(18px)", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 32px", height: 62, gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginRight: 32 }}>
        <BrandLogo size={38} priority />
        <div><b style={{ fontSize: 15.5, fontWeight: 800, display: "block", lineHeight: 1.1, letterSpacing: 0 }}>Institut Teknologi Indonesia</b><span style={{ fontSize: 10.5, color: "var(--ink-3)", fontWeight: 600, letterSpacing: ".03em" }}>SISTEM INFORMASI AKADEMIK</span></div>
      </div>
      <div className="ld-nav-links" style={{ display: "flex", gap: 6, flex: 1 }}>
        {["Beranda", "Program Studi", "Berita", "Agenda", "Tentang"].map((l) => (
          <button key={l} style={{ border: "none", background: "none", padding: "8px 14px", fontSize: 13.5, fontWeight: 600, color: "var(--ink-2)", cursor: "pointer", borderRadius: 10, fontFamily: "var(--sans)" }}
            onClick={() => { if (l === "Berita") return go.berita(); if (l === "Agenda") return go.events(); const id = l === "Program Studi" ? "prodi" : l === "Tentang" ? "tentang" : "hero"; document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }}>{l}</button>
        ))}
      </div>
      <button className="btn btn-ghost btn-sm" style={{ marginRight: 6 }}>EN</button>
      <button className="btn btn-primary" onClick={onLogin}><Icon name="user" size={15} /> Portal Akademik</button>
    </nav>
  );

  // ---------- Hero ----------
  const hero = (
    <section id="hero" style={{ minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden", padding: "120px 48px 80px" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #17110c 0%, #3a2518 48%, #0f172a 100%)", zIndex: 0 }} />
      <div style={{ position: "absolute", right: "-8%", top: "-15%", width: "55%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle, rgba(217,126,52,.2) 0%, transparent 70%)", zIndex: 0 }} />
      <div style={{ position: "absolute", left: "-5%", bottom: "-20%", width: "40%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle, rgba(45,125,210,.12) 0%, transparent 70%)", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 720 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "rgba(255,255,255,.1)", borderRadius: 8, fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.8)", marginBottom: 22, border: "1px solid rgba(255,255,255,.1)" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399" }} /> Pendaftaran 2026/2027 Dibuka
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.08, letterSpacing: 0, color: "#fff", margin: "0 0 18px" }}>Kuliah di <span style={{ color: "var(--orange)" }}>Institut Teknologi Indonesia</span></h1>
        <p style={{ fontSize: 17.5, lineHeight: 1.65, color: "rgba(255,255,255,.72)", margin: "0 0 32px", maxWidth: 600 }}>Kampus teknologi di bawah Yayasan Pengembangan Teknologi Indonesia dengan 10 program studi dan layanan akademik digital terpadu.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button className="btn btn-primary" style={{ padding: "14px 28px", fontSize: 15 }} onClick={onLogin}><Icon name="user" size={17} /> Portal Akademik</button>
          <button className="btn" style={{ padding: "14px 28px", fontSize: 15, background: "rgba(255,255,255,.12)", color: "#fff", border: "1px solid rgba(255,255,255,.2)" }} onClick={() => document.getElementById("prodi")?.scrollIntoView({ behavior: "smooth" })}>Jelajahi Program Studi</button>
        </div>
      </div>
      <div className="ld-hero-stats" style={{ position: "relative", zIndex: 1, display: "flex", gap: 32, marginTop: 64, flexWrap: "wrap" }}>
        {[["10", "Program Studi"], ["453", "Modul Akademik"], ["34", "Layanan Digital"], ["YPTI", "Yayasan Pengelola"]].map(([v, l]) => (
          <div key={l}><div style={{ fontSize: 30, fontWeight: 900, color: "var(--orange)", fontFamily: "var(--mono)" }}>{v}</div><div style={{ fontSize: 12.5, color: "rgba(255,255,255,.55)", fontWeight: 600, marginTop: 2 }}>{l}</div></div>
        ))}
      </div>
    </section>
  );

  // ---------- Pengumuman ticker ----------
  const ticker = (
    <div style={{ background: "var(--orange-50)", borderBottom: "1px solid var(--line)", padding: "13px 40px", display: "flex", alignItems: "center", gap: 14, overflow: "hidden" }}>
      <div style={{ background: "var(--orange)", color: "#fff", padding: "4px 12px", borderRadius: 7, fontSize: 11.5, fontWeight: 800, flexShrink: 0 }}>INFO</div>
      <div style={{ display: "flex", gap: 40, animation: "ticker 26s linear infinite", whiteSpace: "nowrap" }}>
        {PENGUMUMAN.map((p, i) => (<span key={i} style={{ fontSize: 13.5, fontWeight: 600, color: "var(--orange-600)" }}>{p}<span style={{ margin: "0 20px", color: "var(--line-2)" }}>•</span></span>))}
        {PENGUMUMAN.map((p, i) => (<span key={"d" + i} style={{ fontSize: 13.5, fontWeight: 600, color: "var(--orange-600)" }}>{p}<span style={{ margin: "0 20px", color: "var(--line-2)" }}>•</span></span>))}
      </div>
      <style>{`@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );

  // ---------- Program Studi ----------
  const prodiSection = (
    <section id="prodi" style={{ padding: "72px 40px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--orange-600)", marginBottom: 8 }}>PROGRAM STUDI</div>
        <h2 style={{ fontSize: 34, fontWeight: 900, letterSpacing: "-.025em", margin: "0 0 10px" }}>Pilihan Studi yang Tepat untuk Masa Depan</h2>
        <p style={{ color: "var(--ink-2)", fontSize: 15, maxWidth: 600, margin: "0 auto" }}>10 program studi ITI untuk bidang rekayasa, teknologi, perencanaan, industri, dan manajemen.</p>
      </div>
      <div className="ld-grid ld-grid-prodi" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>
        {PRODI_LIST.map((p) => (
          <div key={p.nama} style={{ border: "1px solid var(--line)", borderRadius: 16, padding: 22, display: "flex", flexDirection: "column", gap: 12, transition: "box-shadow .2s", cursor: "default" }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,.08)"}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "var(--orange-50)", color: "var(--orange-600)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name={p.icon} size={20} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 14.5, lineHeight: 1.2 }}>{p.nama}</div>
                <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{p.fakultas}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Badge tone={p.akreditasi === "Unggul" ? "green" : "blue"}>{p.akreditasi}</Badge>
              <Badge tone="gray">{p.jenjang}</Badge>
              <span style={{ fontSize: 12, color: "var(--ink-3)", marginLeft: "auto" }}>{p.mhs} mhs</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  // ---------- Berita & Artikel ----------
  const beritaSection = (
    <section id="berita" style={{ background: "var(--surface-2)", padding: "72px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--orange-600)", marginBottom: 8 }}>BERITA & ARTIKEL</div>
            <h2 style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-.025em", margin: 0 }}>Kabar Terkini</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => go.berita()}>Lihat Semua <Icon name="arrowR" size={15} /></button>
        </div>
        <div className="ld-berita-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 18 }}>
          {/* featured */}
          <div className="pub-card" style={{ borderRadius: 18, overflow: "hidden", position: "relative", minHeight: 360 }} onClick={() => go.beritaDetail(BERITA[0].id)}>
            <div className="pub-thumb" style={{ position: "absolute", inset: 0, background: BERITA[0].img }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(0,0,0,.72) 0%, transparent 60%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 28px 26px", color: "#fff" }}>
              <Badge tone={KAT_TONE[BERITA[0].kategori]} style={{ marginBottom: 10 }}>{BERITA[0].kategori}</Badge>
              <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px", lineHeight: 1.25 }}>{BERITA[0].judul}</h3>
              <p style={{ fontSize: 13.5, opacity: .8, margin: 0, lineHeight: 1.5 }}>{BERITA[0].ringkas}</p>
              <div style={{ fontSize: 12, opacity: .55, marginTop: 10 }}>{BERITA[0].tgl}</div>
            </div>
          </div>
          {/* side list */}
          <div style={{ display: "grid", gap: 14 }}>
            {BERITA.slice(1, 4).map((b, i) => (
              <div key={i} className="pub-card" style={{ display: "flex", gap: 16, padding: 18, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14, alignItems: "center" }} onClick={() => go.beritaDetail(b.id)}>
                <div style={{ width: 72, height: 72, borderRadius: 12, background: b.img, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Badge tone={KAT_TONE[b.kategori]} style={{ marginBottom: 6 }}>{b.kategori}</Badge>
                  <div style={{ fontWeight: 800, fontSize: 13.5, lineHeight: 1.3, marginBottom: 4 }}>{b.judul}</div>
                  <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{b.tgl}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  // ---------- Events / Agenda ----------
  const eventsSection = (
    <section id="events" style={{ padding: "72px 40px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--orange-600)", marginBottom: 8 }}>AGENDA</div>
        <h2 style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-.025em", margin: "0 0 10px" }}>Kegiatan Mendatang</h2>
      </div>
      <div className="ld-grid ld-grid-events" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {EVENTS.slice(0, 6).map((e, i) => {
          const parts = e.tgl.split(" ");
          return (
            <div key={i} className="pub-card" style={{ display: "flex", gap: 18, padding: 22, border: "1px solid var(--line)", borderRadius: 16, alignItems: "center" }} onClick={() => go.eventDetail(e.id)}>
              <div style={{ width: 60, minHeight: 60, borderRadius: 14, background: "var(--orange-50)", display: "grid", placeItems: "center", textAlign: "center", flexShrink: 0, padding: 6 }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: "var(--orange-600)", lineHeight: 1 }}>{parts[0]}</div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--orange-600)", textTransform: "uppercase" }}>{parts[1]} {parts[2]}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 14, lineHeight: 1.3, marginBottom: 5 }}>{e.nama}</div>
                <div style={{ fontSize: 12, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 6 }}><Icon name="building" size={12} /> {e.lokasi}</div>
              </div>
              <Badge tone={EVT_TONE[e.jenis]}>{e.jenis}</Badge>
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "center", marginTop: 34 }}>
        <button className="btn btn-ghost" style={{ padding: "12px 24px", fontSize: 14.5 }} onClick={() => go.events()}>Lihat Semua Agenda <Icon name="arrowR" size={16} /></button>
      </div>
    </section>
  );

  // ---------- Tentang / Keunggulan ----------
  const tentangSection = (
    <section id="tentang" style={{ background: "#0f172a", color: "#fff", padding: "72px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="ld-tentang" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 8 }}>MENGAPA ITI</div>
            <h2 style={{ fontSize: 30, fontWeight: 900, letterSpacing: 0, margin: "0 0 16px" }}>Kampus Teknologi Berbasis Entrepreneur</h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,.65)", margin: "0 0 28px" }}>SIAKAD ITI menyatukan layanan akademik, PMB, MBKM, riset, keuangan, dan administrasi kampus dalam satu pengalaman digital resmi.</p>
            <div className="ld-tentang-feat" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["Akreditasi Unggul", "BAN-PT 2026", "award"], ["34 Microservice", "Infrastruktur cloud-native", "server"], ["Kerjasama Global", "5 negara mitra riset", "link"], ["96% Serapan Lulusan", "Masa tunggu < 3 bulan", "userCheck"]].map(([t, s, ic]) => (
                <div key={t} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(217,126,52,.15)", color: "var(--orange)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name={ic} size={18} /></div>
                  <div><div style={{ fontWeight: 800, fontSize: 13.5 }}>{t}</div><div style={{ fontSize: 11.5, color: "rgba(255,255,255,.45)" }}>{s}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="ld-tentang-gauge" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[["var(--blue)", "78%", "Kelulusan Tepat Waktu"], ["var(--green)", "84%", "Kepuasan Layanan"], ["var(--purple)", "71%", "Realisasi Renstra"], ["var(--orange)", "96%", "Serapan Lulusan"]].map(([c, v, l]) => (
              <div key={l} style={{ background: "rgba(255,255,255,.06)", borderRadius: 16, padding: 22, textAlign: "center", border: "1px solid rgba(255,255,255,.08)" }}>
                <div style={{ width: 78, height: 78, borderRadius: "50%", background: `conic-gradient(${c} ${parseFloat(v) * 3.6}deg, rgba(255,255,255,.08) 0deg)`, display: "grid", placeItems: "center", margin: "0 auto 12px" }}>
                  <div style={{ width: 58, height: 58, borderRadius: "50%", background: "#0f172a", display: "grid", placeItems: "center" }}>
                    <span className="mono" style={{ fontWeight: 800, fontSize: 16, color: c }}>{v}</span>
                  </div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.6)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  // ---------- CTA ----------
  const cta = (
    <section className="ld-cta" style={{ padding: "64px 40px", textAlign: "center", background: "linear-gradient(135deg, var(--orange-50), var(--surface))" }}>
      <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: 0, margin: "0 0 10px" }}>Siap Bergabung dengan ITI?</h2>
      <p style={{ color: "var(--ink-2)", fontSize: 15, margin: "0 0 24px" }}>Daftarkan diri melalui portal PMB atau masuk ke Sistem Informasi Akademik ITI.</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <button className="btn btn-primary" style={{ padding: "14px 28px", fontSize: 15 }} onClick={onLogin}><Icon name="user" size={17} /> Portal Akademik</button>
        <button className="btn btn-ghost" style={{ padding: "14px 28px", fontSize: 15 }} onClick={() => document.getElementById("prodi")?.scrollIntoView({ behavior: "smooth" })}>Lihat Program Studi</button>
      </div>
    </section>
  );

  // ---------- Footer ----------
  const footer = (
    <footer style={{ background: "#0f172a", color: "rgba(255,255,255,.55)", padding: "48px 40px 32px" }}>
      <div className="ld-footer" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 1fr", gap: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 14 }}>
            <BrandLogo size={38} />
            <b style={{ fontSize: 15, color: "#fff" }}>Institut Teknologi Indonesia</b>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.65, margin: 0 }}>Jl. Raya Puspiptek, Setu, Tangerang Selatan 15314<br />081360090013 · iti.ac.id</p>
        </div>
        {[["Akademik", ["Kalender Akademik", "Kurikulum", "Perpustakaan", "Penelitian"]], ["Layanan", ["PMB Online", "Portal Mahasiswa", "E-Learning", "Tracer Study"]], ["Informasi", ["Berita", "Agenda", "PPID", "Karir & Alumni"]]].map(([title, items]) => (
          <div key={title}>
            <div style={{ fontWeight: 800, fontSize: 13, color: "#fff", marginBottom: 14 }}>{title}</div>
            {items.map((it) => (<div key={it} style={{ fontSize: 13, marginBottom: 8, cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--orange)"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,.55)"}>{it}</div>))}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1200, margin: "28px auto 0", paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.1)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12 }}>
        <span>© 2026 Yayasan Pengembangan Teknologi Indonesia | Institut Teknologi Indonesia.</span>
        <span>Ditenagai oleh <b style={{ color: "rgba(255,255,255,.7)" }}>SIAKAD ITI — 34 Microservice</b></span>
      </div>
    </footer>
  );

  const newsModal = null;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {navbar}
      {hero}
      {ticker}
      {prodiSection}
      {beritaSection}
      {eventsSection}
      {tentangSection}
      {cta}
      {footer}
      {newsModal}
    </div>
  );
}

export { Landing };
