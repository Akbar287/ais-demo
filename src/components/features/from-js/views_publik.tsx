/* eslint-disable */
// @ts-nocheck
// Generated from js/views_publik.jsx by scripts/port-js-ssot.mjs.
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
// SIAKAD ITI — Halaman Publik: Berita (index + detail) & Agenda/Event (index + detail)
// Dipakai App router: nav.berita(), nav.beritaDetail(id), nav.events(), nav.eventDetail(id)
// Data: window.AIS_CONTENT
// ============================================================

// ---------- Shell publik (navbar + footer konsisten dgn landing) ----------
function PubNav({ nav, active }) {
  const links = [
    ["Beranda", () => nav.home()],
    ["Program Studi", () => nav.home("prodi")],
    ["Berita", () => nav.berita()],
    ["Agenda", () => nav.events()],
    ["Tentang", () => nav.home("tentang")],
  ];
  const activeMap = { Berita: "Berita", Agenda: "Agenda" };
  return (
    <nav className="ld-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "var(--topbar-bg)", backdropFilter: "blur(18px)", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 32px", height: 62, gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginRight: 32, cursor: "pointer" }} onClick={() => nav.home()}>
        <BrandLogo size={38} priority />
        <div><b style={{ fontSize: 15.5, fontWeight: 800, display: "block", lineHeight: 1.1, letterSpacing: 0 }}>Institut Teknologi Indonesia</b><span style={{ fontSize: 10.5, color: "var(--ink-3)", fontWeight: 600, letterSpacing: ".03em" }}>SISTEM INFORMASI AKADEMIK</span></div>
      </div>
      <div className="ld-nav-links" style={{ display: "flex", gap: 6, flex: 1 }}>
        {links.map(([l, fn]) => {
          const on = activeMap[l] === active;
          return (
            <button key={l} onClick={fn} style={{ border: "none", background: on ? "var(--orange-50)" : "none", padding: "8px 14px", fontSize: 13.5, fontWeight: on ? 800 : 600, color: on ? "var(--orange-600)" : "var(--ink-2)", cursor: "pointer", borderRadius: 10, fontFamily: "var(--sans)" }}>{l}</button>
          );
        })}
      </div>
      <button className="btn btn-ghost btn-sm" style={{ marginRight: 6 }}>EN</button>
      <button className="btn btn-primary" onClick={nav.login}><Icon name="user" size={15} /> Portal Akademik</button>
    </nav>
  );
}

function PubFooter({ nav }) {
  return (
    <footer style={{ background: "#0f172a", color: "rgba(255,255,255,.55)", padding: "48px 40px 32px" }}>
      <div className="ld-footer" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 1fr", gap: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 14 }}>
            <BrandLogo size={38} />
            <b style={{ fontSize: 15, color: "#fff" }}>Institut Teknologi Indonesia</b>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.65, margin: 0 }}>Jl. Raya Puspiptek, Setu, Tangerang Selatan 15314<br />081360090013 · iti.ac.id</p>
        </div>
        {[["Akademik", ["Kalender Akademik", "Kurikulum", "Perpustakaan", "Penelitian"]], ["Layanan", ["PMB Online", "Portal Mahasiswa", "E-Learning", "Tracer Study"]], ["Informasi", [["Berita", () => nav.berita()], ["Agenda", () => nav.events()], ["PPID", null], ["Karir & Alumni", null]]]].map(([title, items]) => (
          <div key={title}>
            <div style={{ fontWeight: 800, fontSize: 13, color: "#fff", marginBottom: 14 }}>{title}</div>
            {items.map((it) => {
              const label = Array.isArray(it) ? it[0] : it;
              const fn = Array.isArray(it) ? it[1] : null;
              return (<div key={label} onClick={fn || undefined} style={{ fontSize: 13, marginBottom: 8, cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--orange)"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,.55)"}>{label}</div>);
            })}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1200, margin: "28px auto 0", paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.1)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12 }}>
        <span>© 2026 Yayasan Pengembangan Teknologi Indonesia | Institut Teknologi Indonesia.</span>
        <span>Ditenagai oleh <b style={{ color: "rgba(255,255,255,.7)" }}>SIAKAD ITI — 34 Microservice</b></span>
      </div>
    </footer>
  );
}

function PubHero({ eyebrow, title, desc, kicker }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "128px 40px 56px", background: "linear-gradient(135deg, #17110c 0%, #3a2518 55%, #0f172a 100%)" }}>
      <div style={{ position: "absolute", right: "-6%", top: "-30%", width: "45%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle, rgba(217,126,52,.2) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", left: "-6%", bottom: "-40%", width: "34%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle, rgba(45,125,210,.14) 0%, transparent 70%)" }} />
      <div className="pub-fadeup" style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 12 }}>{eyebrow}</div>
        <h1 style={{ fontSize: 42, fontWeight: 900, letterSpacing: 0, color: "#fff", margin: "0 0 12px", lineHeight: 1.1 }}>{title}</h1>
        {desc && <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,.7)", margin: 0, maxWidth: 620 }}>{desc}</p>}
        {kicker}
      </div>
    </section>
  );
}

// tombol chip filter
function Chip({ label, on, tone, onClick }) {
  return (
    <button className="pub-chip" onClick={onClick} style={{
      border: on ? "1.5px solid transparent" : "1.5px solid var(--line-2)",
      background: on ? `var(--${tone || "orange"})` : "var(--surface)",
      color: on ? "#fff" : "var(--ink-2)", padding: "8px 16px", borderRadius: 999,
      fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)", whiteSpace: "nowrap",
    }}>{label}</button>
  );
}

// ==================== BERITA — INDEX ====================
function BeritaIndex({ nav }) {
  const C = window.AIS_CONTENT;
  const [kat, setKat] = useState("Semua");
  const [q, setQ] = useState("");
  const filtered = C.berita.filter((b) =>
    (kat === "Semua" || b.kategori === kat) &&
    (b.judul.toLowerCase().includes(q.toLowerCase()) || b.ringkas.toLowerCase().includes(q.toLowerCase()))
  );
  const featured = (kat === "Semua" && !q) ? (filtered.find((b) => b.unggulan) || filtered[0]) : null;
  const rest = featured ? filtered.filter((b) => b.id !== featured.id) : filtered;

  const search = (
    <div style={{ display: "flex", gap: 10, marginTop: 26, flexWrap: "wrap", alignItems: "center" }}>
      <div className="tb-search" style={{ margin: 0, width: 320, maxWidth: "100%", background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)" }}>
        <Icon name="search" size={16} style={{ color: "rgba(255,255,255,.6)" }} />
        <input placeholder="Cari berita…" value={q} onChange={(e) => setQ(e.target.value)} style={{ color: "#fff" }} />
      </div>
    </div>
  );

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <PubNav nav={nav} active="Berita" />
      <PubHero eyebrow="BERITA & ARTIKEL" title="Kabar & Cerita dari Kampus" desc="Ikuti perkembangan terbaru seputar prestasi, riset, kerjasama, dan kehidupan akademik Institut Teknologi Indonesia." kicker={search} />

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 40px 72px" }}>
        {/* Filter chips */}
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 6, marginBottom: 28 }}>
          <Chip label="Semua" on={kat === "Semua"} onClick={() => setKat("Semua")} />
          {C.KAT_LIST.map((k) => <Chip key={k} label={k} tone={C.KAT_TONE[k]} on={kat === k} onClick={() => setKat(k)} />)}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "72px 20px", color: "var(--ink-3)" }}>
            <Icon name="search" size={40} style={{ marginBottom: 12, opacity: .5 }} />
            <div style={{ fontWeight: 700, fontSize: 15 }}>Tidak ada berita yang cocok</div>
            <div style={{ fontSize: 13.5, marginTop: 4 }}>Coba ubah kata kunci atau kategori.</div>
          </div>
        )}

        {/* Featured */}
        {featured && (
          <div className="pub-card pub-fadeup" onClick={() => nav.beritaDetail(featured.id)} style={{ borderRadius: 20, overflow: "hidden", position: "relative", minHeight: 380, marginBottom: 28, display: "flex", alignItems: "flex-end" }}>
            <div className="pub-thumb" style={{ position: "absolute", inset: 0, background: featured.img }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(0,0,0,.78) 0%, rgba(0,0,0,.1) 65%)" }} />
            <div style={{ position: "relative", padding: "36px 40px", color: "#fff", maxWidth: 720 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                <Badge tone={C.KAT_TONE[featured.kategori]}>{featured.kategori}</Badge>
                <span style={{ fontSize: 12.5, fontWeight: 700, opacity: .8, background: "rgba(255,255,255,.15)", padding: "3px 10px", borderRadius: 6 }}>UNGGULAN</span>
              </div>
              <h2 style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-.02em", margin: "0 0 10px", lineHeight: 1.15 }}>{featured.judul}</h2>
              <p style={{ fontSize: 14.5, opacity: .82, margin: "0 0 14px", lineHeight: 1.55, maxWidth: 620 }}>{featured.ringkas}</p>
              <div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 12.5, opacity: .72 }}>
                <span>{featured.tgl}</span><span>·</span><span>{featured.baca} mnt baca</span><span>·</span><span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Icon name="eye" size={14} /> {featured.views.toLocaleString("id")}</span>
                <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 800, color: "var(--orange)" }}>Baca <Icon name="arrowR" size={15} /></span>
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: 22 }}>
          {rest.map((b, i) => (
            <article key={b.id} className="pub-card pub-fadeup" onClick={() => nav.beritaDetail(b.id)} style={{ border: "1px solid var(--line)", borderRadius: 18, overflow: "hidden", background: "var(--surface)", display: "flex", flexDirection: "column", animationDelay: (i * 0.05) + "s" }}>
              <div style={{ height: 168, position: "relative", overflow: "hidden" }}>
                <div className="pub-thumb" style={{ position: "absolute", inset: 0, background: b.img }} />
                <div style={{ position: "absolute", top: 12, left: 12 }}><Badge tone={C.KAT_TONE[b.kategori]}>{b.kategori}</Badge></div>
              </div>
              <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-.01em", margin: "0 0 8px", lineHeight: 1.3 }}>{b.judul}</h3>
                <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, margin: "0 0 16px", flex: 1 }}>{b.ringkas}</p>
                <div style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 12, color: "var(--ink-3)", paddingTop: 12, borderTop: "1px solid var(--line)" }}>
                  <span>{b.tgl}</span><span>·</span><span>{b.baca} mnt</span>
                  <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 5 }}><Icon name="eye" size={13} /> {b.views.toLocaleString("id")}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <PubFooter nav={nav} />
    </div>
  );
}

// ==================== BERITA — DETAIL ====================
function BeritaDetail({ id, nav }) {
  const C = window.AIS_CONTENT;
  const toast = useToast();
  const idx = C.berita.findIndex((b) => b.id === id);
  const b = C.berita[idx] || C.berita[0];
  const related = C.berita.filter((x) => x.kategori === b.kategori && x.id !== b.id).slice(0, 3);
  const popular = [...C.berita].sort((a, c) => c.views - a.views).filter((x) => x.id !== b.id).slice(0, 4);
  const prev = C.berita[idx - 1];
  const next = C.berita[idx + 1];

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <PubNav nav={nav} active="Berita" />

      {/* Hero image */}
      <section style={{ position: "relative", height: 460, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <div style={{ position: "absolute", inset: 0, background: b.img }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(0,0,0,.82) 0%, rgba(0,0,0,.15) 55%, rgba(0,0,0,.35) 100%)" }} />
        <div className="pub-fadeup" style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", width: "100%", padding: "0 40px 40px", color: "#fff" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14, fontSize: 12.5, fontWeight: 600 }}>
            <button onClick={() => nav.home()} style={{ background: "none", border: "none", color: "rgba(255,255,255,.7)", cursor: "pointer", fontFamily: "var(--sans)", fontWeight: 600, padding: 0 }}>Beranda</button>
            <Icon name="chevR" size={13} style={{ opacity: .5 }} />
            <button onClick={() => nav.berita()} style={{ background: "none", border: "none", color: "rgba(255,255,255,.7)", cursor: "pointer", fontFamily: "var(--sans)", fontWeight: 600, padding: 0 }}>Berita</button>
          </div>
          <Badge tone={C.KAT_TONE[b.kategori]} style={{ marginBottom: 14 }}>{b.kategori}</Badge>
          <h1 style={{ fontSize: 38, fontWeight: 900, letterSpacing: "-.03em", margin: "0 0 16px", lineHeight: 1.12, maxWidth: 800 }}>{b.judul}</h1>
          <div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 13, opacity: .82, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="user" size={15} /> {b.penulis}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="calendar" size={15} /> {b.tgl}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="clock" size={15} /> {b.baca} mnt baca</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="eye" size={15} /> {b.views.toLocaleString("id")}</span>
          </div>
        </div>
      </section>

      {/* Body + sidebar */}
      <section className="pub-detail-grid" style={{ maxWidth: 1080, margin: "0 auto", padding: "48px 40px 72px", display: "grid", gridTemplateColumns: "1fr 300px", gap: 48, alignItems: "start" }}>
        <article className="pub-fadeup">
          <button onClick={() => nav.berita()} className="btn btn-ghost btn-sm" style={{ marginBottom: 22 }}><Icon name="chevL" size={15} /> Semua Berita</button>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--ink)", fontWeight: 500, margin: "0 0 20px" }}>{b.ringkas}</p>
          {b.body.map((para, i) => (
            <p key={i} style={{ fontSize: 15.5, lineHeight: 1.85, color: "var(--ink-2)", margin: "0 0 18px" }}>{para}</p>
          ))}

          {/* Tags + share */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", margin: "28px 0", paddingTop: 22, borderTop: "1px solid var(--line)" }}>
            <Icon name="tag" size={16} style={{ color: "var(--ink-3)" }} />
            {b.tags.map((t) => <span key={t} style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink-2)", background: "var(--surface-2)", padding: "5px 12px", borderRadius: 999 }}>#{t}</span>)}
            <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto" }} onClick={() => toast("Tautan berita disalin", "ok")}><Icon name="share" size={15} /> Bagikan</button>
          </div>

          {/* Prev / next */}
          <div className="pub-prevnext" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 8 }}>
            {prev ? (
              <button onClick={() => nav.beritaDetail(prev.id)} className="pub-card" style={{ textAlign: "left", border: "1px solid var(--line)", borderRadius: 14, padding: 16, background: "var(--surface)", fontFamily: "var(--sans)" }}>
                <div style={{ fontSize: 11.5, color: "var(--ink-3)", fontWeight: 700, display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}><Icon name="chevL" size={13} /> SEBELUMNYA</div>
                <div style={{ fontSize: 13.5, fontWeight: 800, lineHeight: 1.3 }}>{prev.judul}</div>
              </button>
            ) : <div />}
            {next ? (
              <button onClick={() => nav.beritaDetail(next.id)} className="pub-card" style={{ textAlign: "right", border: "1px solid var(--line)", borderRadius: 14, padding: 16, background: "var(--surface)", fontFamily: "var(--sans)" }}>
                <div style={{ fontSize: 11.5, color: "var(--ink-3)", fontWeight: 700, display: "flex", alignItems: "center", gap: 5, marginBottom: 6, justifyContent: "flex-end" }}>SELANJUTNYA <Icon name="chevR" size={13} /></div>
                <div style={{ fontSize: 13.5, fontWeight: 800, lineHeight: 1.3 }}>{next.judul}</div>
              </button>
            ) : <div />}
          </div>
        </article>

        {/* Sidebar */}
        <aside className="pub-sidebar" style={{ position: "sticky", top: 84, display: "flex", flexDirection: "column", gap: 24 }}>
          {related.length > 0 && (
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ink-3)", margin: "0 0 14px" }}>Berita Terkait</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {related.map((r) => (
                  <div key={r.id} className="pub-card" onClick={() => nav.beritaDetail(r.id)} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 60, height: 60, borderRadius: 11, background: r.img, flexShrink: 0 }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 800, lineHeight: 1.3, marginBottom: 3 }}>{r.judul}</div>
                      <div style={{ fontSize: 11, color: "var(--ink-3)" }}>{r.tgl}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ink-3)", margin: "0 0 14px" }}>Terpopuler</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {popular.map((p, i) => (
                <div key={p.id} className="pub-pop" onClick={() => nav.beritaDetail(p.id)} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 0", borderBottom: i < popular.length - 1 ? "1px solid var(--line)" : "none", cursor: "pointer" }}>
                  <span style={{ fontSize: 20, fontWeight: 900, color: "var(--line-2)", lineHeight: 1, fontFamily: "var(--mono)" }}>{i + 1}</span>
                  <div style={{ fontSize: 12.5, fontWeight: 700, lineHeight: 1.35 }}>{p.judul}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "linear-gradient(135deg, var(--orange-50), var(--surface))", borderRadius: 16, padding: 20 }}>
            <div style={{ fontWeight: 800, fontSize: 14.5, marginBottom: 6 }}>Ingin kabar terbaru?</div>
            <div style={{ fontSize: 12.5, color: "var(--ink-2)", marginBottom: 12, lineHeight: 1.5 }}>Masuk ke portal untuk notifikasi & layanan akademik lengkap.</div>
            <button className="btn btn-primary btn-sm" style={{ width: "100%" }} onClick={nav.login}><Icon name="user" size={14} /> Portal Akademik</button>
          </div>
        </aside>
      </section>
      <PubFooter nav={nav} />
    </div>
  );
}

// ==================== AGENDA / EVENT — INDEX ====================
function EventIndex({ nav }) {
  const C = window.AIS_CONTENT;
  const [jenis, setJenis] = useState("Semua");
  const [q, setQ] = useState("");
  const match = (e) => (jenis === "Semua" || e.jenis === jenis) && (e.nama.toLowerCase().includes(q.toLowerCase()) || e.lokasi.toLowerCase().includes(q.toLowerCase()));
  const upcoming = C.events.filter((e) => !e.lampau && match(e));
  const lampau = C.events.filter((e) => e.lampau && match(e));

  const search = (
    <div style={{ display: "flex", gap: 10, marginTop: 26, flexWrap: "wrap" }}>
      <div className="tb-search" style={{ margin: 0, width: 320, maxWidth: "100%", background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)" }}>
        <Icon name="search" size={16} style={{ color: "rgba(255,255,255,.6)" }} />
        <input placeholder="Cari agenda…" value={q} onChange={(e) => setQ(e.target.value)} style={{ color: "#fff" }} />
      </div>
    </div>
  );

  const card = (e, i) => {
    const [d, m, y] = e.tgl.split(" ");
    const pct = Math.min(100, Math.round(e.terdaftar / e.kuota * 100));
    return (
      <article key={e.id} className="pub-card pub-fadeup" onClick={() => nav.eventDetail(e.id)} style={{ border: "1px solid var(--line)", borderRadius: 18, overflow: "hidden", background: "var(--surface)", display: "flex", flexDirection: "column", animationDelay: (i * 0.05) + "s", opacity: e.lampau ? .82 : 1 }}>
        <div style={{ height: 90, position: "relative", overflow: "hidden" }}>
          <div className="pub-thumb" style={{ position: "absolute", inset: 0, background: e.img }} />
          <div style={{ position: "absolute", top: 12, right: 12 }}><Badge tone={C.EVT_TONE[e.jenis]}>{e.jenis}</Badge></div>
          <div style={{ position: "absolute", bottom: -22, left: 20, width: 58, background: "var(--surface)", borderRadius: 13, boxShadow: "var(--shadow)", textAlign: "center", padding: "8px 0" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: "var(--orange-600)", lineHeight: 1 }}>{d}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--orange-600)", textTransform: "uppercase" }}>{m} {y}</div>
          </div>
        </div>
        <div style={{ padding: "30px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-.01em", margin: "0 0 10px", lineHeight: 1.3 }}>{e.nama}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12.5, color: "var(--ink-2)", marginBottom: 14 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><Icon name="clock" size={13} style={{ color: "var(--ink-3)" }} /> {e.waktu}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><Icon name="pin" size={13} style={{ color: "var(--ink-3)" }} /> {e.lokasi}</span>
          </div>
          <div style={{ marginTop: "auto" }}>
            {!e.lampau ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--ink-3)", marginBottom: 5 }}><span>{e.terdaftar.toLocaleString("id")} / {e.kuota.toLocaleString("id")} kursi</span><span style={{ fontWeight: 700 }}>{e.biaya}</span></div>
                <div style={{ height: 6, borderRadius: 4, background: "var(--surface-2)", overflow: "hidden" }}><div style={{ width: pct + "%", height: "100%", background: pct >= 90 ? "var(--red)" : "var(--green)" }} /></div>
              </>
            ) : <Badge tone="gray">Telah berlangsung</Badge>}
          </div>
        </div>
      </article>
    );
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <PubNav nav={nav} active="Agenda" />
      <PubHero eyebrow="AGENDA & KEGIATAN" title="Agenda Kampus" desc="Seminar, workshop, kompetisi, hingga acara seremonial — temukan dan ikuti kegiatan yang akan datang." kicker={search} />

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 40px 72px" }}>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 6, marginBottom: 28 }}>
          <Chip label="Semua" on={jenis === "Semua"} onClick={() => setJenis("Semua")} />
          {C.EVT_LIST.map((k) => <Chip key={k} label={k} tone={C.EVT_TONE[k]} on={jenis === k} onClick={() => setJenis(k)} />)}
        </div>

        {upcoming.length === 0 && lampau.length === 0 && (
          <div style={{ textAlign: "center", padding: "72px 20px", color: "var(--ink-3)" }}>
            <Icon name="calendar" size={40} style={{ marginBottom: 12, opacity: .5 }} />
            <div style={{ fontWeight: 700, fontSize: 15 }}>Tidak ada agenda yang cocok</div>
          </div>
        )}

        {upcoming.length > 0 && (
          <>
            <h2 style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-.02em", margin: "0 0 20px" }}>Kegiatan Mendatang</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: 22, marginBottom: 44 }}>
              {upcoming.map((e, i) => card(e, i))}
            </div>
          </>
        )}
        {lampau.length > 0 && (
          <>
            <h2 style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-.02em", margin: "0 0 20px" }}>Kegiatan Terdahulu</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: 22 }}>
              {lampau.map((e, i) => card(e, i))}
            </div>
          </>
        )}
      </section>
      <PubFooter nav={nav} />
    </div>
  );
}

// ==================== AGENDA / EVENT — DETAIL ====================
function EventDetail({ id, nav }) {
  const C = window.AIS_CONTENT;
  const toast = useToast();
  const e = C.events.find((x) => x.id === id) || C.events[0];
  const [d, m, y] = e.tgl.split(" ");
  const pct = Math.min(100, Math.round(e.terdaftar / e.kuota * 100));
  const related = C.events.filter((x) => x.jenis === e.jenis && x.id !== e.id && !x.lampau).slice(0, 3);
  const [reg, setReg] = useState(false);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <PubNav nav={nav} active="Agenda" />

      {/* Hero */}
      <section style={{ position: "relative", height: 400, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <div style={{ position: "absolute", inset: 0, background: e.img }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(0,0,0,.82) 0%, rgba(0,0,0,.12) 60%, rgba(0,0,0,.3) 100%)" }} />
        <div className="pub-fadeup" style={{ position: "relative", zIndex: 1, maxWidth: 1080, margin: "0 auto", width: "100%", padding: "0 40px 40px", color: "#fff" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14, fontSize: 12.5, fontWeight: 600 }}>
            <button onClick={() => nav.home()} style={{ background: "none", border: "none", color: "rgba(255,255,255,.7)", cursor: "pointer", fontFamily: "var(--sans)", fontWeight: 600, padding: 0 }}>Beranda</button>
            <Icon name="chevR" size={13} style={{ opacity: .5 }} />
            <button onClick={() => nav.events()} style={{ background: "none", border: "none", color: "rgba(255,255,255,.7)", cursor: "pointer", fontFamily: "var(--sans)", fontWeight: 600, padding: 0 }}>Agenda</button>
          </div>
          <Badge tone={C.EVT_TONE[e.jenis]} style={{ marginBottom: 14 }}>{e.jenis}</Badge>
          <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-.03em", margin: "0 0 14px", lineHeight: 1.12, maxWidth: 800 }}>{e.nama}</h1>
          <div style={{ display: "flex", gap: 18, alignItems: "center", fontSize: 13.5, opacity: .85, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="calendar" size={16} /> {e.tgl}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="clock" size={16} /> {e.waktu}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="pin" size={16} /> {e.lokasi}</span>
          </div>
        </div>
      </section>

      <section className="pub-detail-grid" style={{ maxWidth: 1080, margin: "0 auto", padding: "48px 40px 72px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 44, alignItems: "start" }}>
        {/* Main */}
        <div className="pub-fadeup">
          <button onClick={() => nav.events()} className="btn btn-ghost btn-sm" style={{ marginBottom: 22 }}><Icon name="chevL" size={15} /> Semua Agenda</button>
          <h2 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 12px" }}>Tentang Kegiatan</h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--ink-2)", margin: "0 0 32px" }}>{e.deskripsi}</p>

          {/* Agenda timeline */}
          <h2 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 18px" }}>Susunan Acara</h2>
          <div style={{ position: "relative", paddingLeft: 28, marginBottom: 32 }}>
            <div style={{ position: "absolute", left: 7, top: 6, bottom: 6, width: 2, background: "var(--line)" }} />
            {e.agenda.map(([jam, judul], i) => (
              <div key={i} style={{ position: "relative", paddingBottom: i < e.agenda.length - 1 ? 20 : 0 }}>
                <div style={{ position: "absolute", left: -28, top: 2, width: 16, height: 16, borderRadius: "50%", background: "var(--surface)", border: "3px solid var(--orange)" }} />
                <div style={{ fontSize: 12.5, fontWeight: 800, color: "var(--orange-600)", fontFamily: "var(--mono)", marginBottom: 2 }}>{jam}</div>
                <div style={{ fontSize: 14.5, fontWeight: 700 }}>{judul}</div>
              </div>
            ))}
          </div>

          {/* Narasumber */}
          {e.narasumber && e.narasumber.length > 0 && (
            <>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 16px" }}>Narasumber</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: 14 }}>
                {e.narasumber.map(([nama, jabatan], i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", border: "1px solid var(--line)", borderRadius: 14, padding: 14 }}>
                    <div style={{ width: 46, height: 46, borderRadius: "50%", background: "var(--orange-50)", color: "var(--orange-600)", display: "grid", placeItems: "center", flexShrink: 0, fontWeight: 800 }}>{nama.split(" ").filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("")}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 800, lineHeight: 1.25 }}>{nama}</div>
                      <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{jabatan}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Sidebar registration */}
        <aside className="pub-sidebar" style={{ position: "sticky", top: 84, display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ border: "1px solid var(--line)", borderRadius: 18, padding: 22, boxShadow: "var(--shadow)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18, paddingBottom: 18, borderBottom: "1px solid var(--line)" }}>
              <div style={{ width: 58, background: "var(--orange-50)", borderRadius: 13, textAlign: "center", padding: "10px 0" }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: "var(--orange-600)", lineHeight: 1 }}>{d}</div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--orange-600)", textTransform: "uppercase" }}>{m} {y}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>Biaya pendaftaran</div>
                <div style={{ fontSize: 19, fontWeight: 900, color: e.biaya === "Gratis" ? "var(--green)" : "var(--ink)" }}>{e.biaya}</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13, marginBottom: 18 }}>
              {[["clock", "Waktu", e.waktu], ["pin", "Lokasi", e.lokasi], ["users", "Penyelenggara", e.penyelenggara]].map(([ic, l, v]) => (
                <div key={l} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <Icon name={ic} size={16} style={{ color: "var(--ink-3)", marginTop: 1, flexShrink: 0 }} />
                  <div><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{l}</div><div style={{ fontWeight: 700 }}>{v}</div></div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--ink-3)", marginBottom: 5 }}><span>Kuota terisi</span><span style={{ fontWeight: 700 }}>{e.terdaftar.toLocaleString("id")} / {e.kuota.toLocaleString("id")}</span></div>
              <div style={{ height: 8, borderRadius: 5, background: "var(--surface-2)", overflow: "hidden" }}><div style={{ width: pct + "%", height: "100%", background: pct >= 90 ? "var(--red)" : "var(--green)" }} /></div>
            </div>
            {reg ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 13, background: "var(--green-bg)", borderRadius: 12, color: "var(--green)", fontWeight: 700, fontSize: 13 }}><Icon name="check" size={18} /> Terdaftar! Cek email Anda.</div>
            ) : (
              <button className="btn btn-primary" style={{ width: "100%", padding: 13 }} disabled={pct >= 100} onClick={() => { setReg(true); toast("Pendaftaran berhasil — konfirmasi dikirim ke email", "ok"); }}>{pct >= 100 ? "Kuota Penuh" : <>Daftar Sekarang <Icon name="arrowR" size={16} /></>}</button>
            )}
            <button className="btn btn-ghost btn-sm" style={{ width: "100%", marginTop: 8 }} onClick={() => toast("Tautan agenda disalin", "ok")}><Icon name="share" size={14} /> Bagikan</button>
          </div>
        </aside>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ maxWidth: 1080, margin: "0 auto", padding: "0 40px 72px" }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-.02em", margin: "0 0 20px" }}>Agenda Serupa</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: 22 }}>
            {related.map((r) => {
              const [rd, rm] = r.tgl.split(" ");
              return (
                <div key={r.id} className="pub-card" onClick={() => nav.eventDetail(r.id)} style={{ display: "flex", gap: 14, border: "1px solid var(--line)", borderRadius: 16, padding: 18, alignItems: "center" }}>
                  <div style={{ width: 54, background: "var(--orange-50)", borderRadius: 12, textAlign: "center", padding: "8px 0", flexShrink: 0 }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: "var(--orange-600)", lineHeight: 1 }}>{rd}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "var(--orange-600)", textTransform: "uppercase" }}>{rm}</div>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, lineHeight: 1.3, marginBottom: 4 }}>{r.nama}</div>
                    <div style={{ fontSize: 12, color: "var(--ink-3)", display: "inline-flex", alignItems: "center", gap: 5 }}><Icon name="pin" size={12} /> {r.lokasi}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
      <PubFooter nav={nav} />
    </div>
  );
}

export { BeritaIndex, BeritaDetail, EventIndex, EventDetail };
