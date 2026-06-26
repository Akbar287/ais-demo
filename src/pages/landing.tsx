// @ts-nocheck
const { React, useState, useEffect, useRef, Icon, useToast, Modal, Badge, PageHead, Barcode, ImgPlaceholder, rupiah, initials, StaffHero } = window as any;

// ============================================================
// AIS — Landing Page publik (pengunjung) → tombol Masuk ke Login
// ============================================================
function Landing({ onLogin, onModul }) {
  const modules = [
    { ic: "book", t: "Registrasi & KRS", d: "Pengisian KRS daring, validasi perwalian, dan rekap per prodi.", c: "var(--orange)", bg: "var(--orange-50)" },
    { ic: "presentation", t: "Perkuliahan & LMS", d: "Kelas daring ala Classroom: materi, tugas, kuis, presensi.", c: "var(--blue)", bg: "var(--blue-bg)" },
    { ic: "award", t: "Penilaian & Transkrip", d: "Input nilai, KHS, IPK, dan transkrip otomatis.", c: "var(--green)", bg: "var(--green-bg)" },
    { ic: "clipboard", t: "PMB & Ujian Masuk", d: "Pendaftaran calon mahasiswa hingga tes CBT dan hasil seleksi.", c: "var(--purple)", bg: "var(--purple-bg)" },
    { ic: "wallet", t: "Keuangan & UKT", d: "Tagihan, pembayaran, piutang, dan pencairan beasiswa.", c: "var(--amber)", bg: "var(--amber-bg)" },
    { ic: "bookOpen", t: "Perpustakaan", d: "Sirkulasi koleksi, katalog OPAC, anggota, dan repositori karya.", c: "var(--blue)", bg: "var(--blue-bg)" },
    { ic: "grad", t: "Wisuda & Alumni", d: "Pendaftaran wisuda, yudisium, ijazah, dan data alumni.", c: "var(--orange-600)", bg: "var(--orange-50)" },
    { ic: "database", t: "Pelaporan PDDikti", d: "Sinkronisasi Neo Feeder dan pelaporan akademik nasional.", c: "var(--green)", bg: "var(--green-bg)" },
  ];
  const stats = [
    ["34", "Microservice"],
    ["453", "Entitas data"],
    ["4.889", "Field (L4)"],
    ["24", "Peran pengguna"],
  ];
  const roles = [
    ["Akademik", "Mahasiswa · Dosen · Penasihat Akademik · Kaprodi", "grad"],
    ["Layanan & Operasional", "Keuangan · Perpustakaan · PMB · SDM · Pengadaan · Aset", "building"],
    ["Platform & Sistem", "Administrator · IAM · Monitoring · Kamus Data", "shield"],
    ["Pendaftaran", "Calon Mahasiswa — kartu ujian, tes CBT, hasil", "clipboard"],
  ];

  return (
    <div className="lp">
      {/* Navbar */}
      <header className="lp-nav">
        <div className="lp-brand">
          <div className="sb-logo" style={{ width: 40, height: 40, fontSize: 19 }}>A</div>
          <div>
            <b style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-.02em", display: "block", lineHeight: 1.05 }}>AIS</b>
            <span style={{ fontSize: 11, color: "var(--ink-3)" }}>Sistem Informasi Akademik</span>
          </div>
        </div>
        <nav className="lp-links">
          <button onClick={onModul} style={{ border: "none", background: "none", cursor: "pointer", font: "inherit", color: "var(--ink-2)", fontWeight: 600 }}>Modul</button>
          <a href="#peran">Peran</a>
          <a href="#arsitektur">Arsitektur</a>
        </nav>
        <button className="btn btn-primary" onClick={onLogin}><Icon name="lock" size={16} /> Masuk</button>
      </header>

      {/* Hero */}
      <section className="lp-hero">
        <div className="lp-hero-text">
          <div className="lp-eyebrow"><span className="dot" style={{ background: "var(--green)" }} /> Terpadu · Event-driven · On-premise</div>
          <h1>Satu sistem akademik untuk <span style={{ color: "var(--orange-600)" }}>seluruh sivitas</span> kampus.</h1>
          <p>Dari penerimaan mahasiswa baru, perkuliahan, penilaian, keuangan, hingga wisuda — terintegrasi di atas arsitektur 34 microservice. Setiap peran punya menu dan hak aksesnya sendiri.</p>
          <div className="lp-cta">
            <button className="btn btn-primary lp-big" onClick={onLogin}><Icon name="lock" size={17} /> Masuk ke Portal</button>
            <button className="btn btn-ghost lp-big" onClick={onModul}><Icon name="chevR" size={16} /> Lihat Modul</button>
          </div>
          <div className="lp-stats">
            {stats.map(([v, l]) => (
              <div key={l}><div className="lp-stat-v">{v}</div><div className="lp-stat-l">{l}</div></div>
            ))}
          </div>
        </div>

        {/* Mock dashboard visual */}
        <div className="lp-hero-art" aria-hidden="true">
          <div className="lp-window">
            <div className="lp-winbar"><span /><span /><span /></div>
            <div className="lp-winbody">
              <div className="lp-tiles">
                {[["IPK", "3,71", "var(--green)", "var(--green-bg)"], ["SKS", "23", "var(--blue)", "var(--blue-bg)"], ["Tagihan", "Lunas", "var(--purple)", "var(--purple-bg)"]].map(([l, v, c, bg]) => (
                  <div key={l} className="lp-tile" style={{ background: bg }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: c }}>{l}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: c, fontFamily: "var(--mono)" }}>{v}</div>
                  </div>
                ))}
              </div>
              <div className="lp-bars">
                {[62, 88, 45, 73, 95, 58].map((h, i) => (
                  <div key={i} className="lp-bar" style={{ height: h + "%", background: i % 2 ? "var(--orange)" : "var(--orange-100)" }} />
                ))}
              </div>
              <div className="lp-rows">
                {["Kecerdasan Buatan — A", "Pemrograman Web — A-", "Basis Data Lanjut — B+"].map((r, i) => (
                  <div key={i} className="lp-row"><span className="dot" style={{ background: "var(--orange)" }} />{r}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="lp-badge-float lp-bf1"><Icon name="check" size={14} style={{ color: "var(--green)" }} /> KRS disetujui</div>
          <div className="lp-badge-float lp-bf2"><Icon name="award" size={14} style={{ color: "var(--purple)" }} /> Nilai terbit</div>
        </div>
      </section>

      {/* Stat band */}
      <section className="lp-band">
        {[["Akademik", "PMB → KRS → Nilai → Wisuda dalam satu alur"], ["Keuangan", "UKT, beasiswa, dan piutang terintegrasi"], ["Pelaporan", "Sinkron PDDikti & Kamus Data 453 entitas"]].map(([t, d]) => (
          <div key={t}><b>{t}</b><span>{d}</span></div>
        ))}
      </section>

      {/* Modules */}
      <section id="modul" className="lp-section">
        <div className="lp-head">
          <span className="lp-kicker">Modul</span>
          <h2>Semua layanan akademik dalam satu portal</h2>
          <p>Lebih dari 30 subjek data dan puluhan menu, dikelompokkan menjadi modul yang siap dipakai tiap unit.</p>
        </div>
        <div className="lp-grid">
          {modules.map((m) => (
            <div key={m.t} className="card lp-mod">
              <div className="lp-mod-ic" style={{ background: m.bg, color: m.c }}><Icon name={m.ic} size={22} /></div>
              <b>{m.t}</b>
              <p>{m.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section id="peran" className="lp-section lp-section-alt">
        <div className="lp-head">
          <span className="lp-kicker">Peran</span>
          <h2>Menu menyesuaikan peran Anda</h2>
          <p>Kontrol akses (RBAC) memastikan tiap pengguna hanya melihat menu yang relevan.</p>
        </div>
        <div className="lp-roles">
          {roles.map(([t, d, ic]) => (
            <div key={t} className="card lp-role">
              <div className="lp-role-ic"><Icon name={ic} size={20} /></div>
              <div><b>{t}</b><span>{d}</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section id="arsitektur" className="lp-section">
        <div className="lp-arch">
          <div className="lp-arch-text">
            <span className="lp-kicker">Arsitektur</span>
            <h2>Event-driven microservices, siap skala</h2>
            <p>Backend dipecah menjadi 34 microservice dengan database-per-service, berkomunikasi lewat event (Kafka) dan API Gateway. Tahan beban puncak seperti masa pengisian KRS.</p>
            <div className="lp-chips">
              {["Spring Boot", "Kafka", "Kubernetes", "PostgreSQL", "MongoDB", "Elasticsearch", "Redis", "NGINX"].map((c) => (
                <span key={c} className="lp-chip">{c}</span>
              ))}
            </div>
          </div>
          <div className="lp-arch-grid">
            {["Core", "Support", "Platform"].map((dm, i) => (
              <div key={dm} className="lp-dom" style={{ borderColor: ["var(--blue)", "var(--green)", "var(--purple)"][i] }}>
                <b style={{ color: ["var(--blue)", "var(--green)", "var(--purple)"][i] }}>{dm}</b>
                <span>{[15, 12, 7][i]} service</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lp-final">
        <h2>Siap menjelajah portal akademik?</h2>
        <p>Masuk untuk mencoba demo seluruh peran — dari mahasiswa hingga administrator sistem.</p>
        <button className="btn lp-big" onClick={onLogin} style={{ background: "#fff", color: "var(--orange-600)" }}><Icon name="lock" size={17} /> Masuk Sekarang</button>
      </section>

      {/* Footer */}
      <footer className="lp-foot">
        <div className="lp-brand">
          <div className="sb-logo" style={{ width: 34, height: 34, fontSize: 16 }}>A</div>
          <span style={{ fontWeight: 700 }}>AIS — Sistem Informasi Akademik</span>
        </div>
        <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>Demo prototipe · {new Date().getFullYear()}</span>
      </footer>

      <style>{`
        .lp { min-height: 100vh; background: var(--bg); }
        .lp a { text-decoration: none; color: inherit; }
        .lp-nav { position: sticky; top: 0; z-index: 20; display: flex; align-items: center; gap: 18px;
          padding: 14px 7vw; background: rgba(250,246,240,.85); backdrop-filter: blur(12px); border-bottom: 1px solid var(--line); }
        .lp-brand { display: flex; align-items: center; gap: 11px; }
        .lp-links { margin-left: auto; display: flex; gap: 26px; font-size: 14px; font-weight: 600; color: var(--ink-2); }
        .lp-links a:hover { color: var(--orange-600); }
        .lp-nav .btn { margin-left: 8px; }

        .lp-hero { display: grid; grid-template-columns: 1.05fr .95fr; gap: 48px; align-items: center; padding: 64px 7vw 56px; max-width: 1280px; margin: 0 auto; }
        .lp-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; font-weight: 700; color: var(--ink-2);
          background: var(--surface); border: 1px solid var(--line); padding: 6px 13px; border-radius: 999px; margin-bottom: 20px; }
        .lp-hero-text h1 { font-size: 47px; line-height: 1.06; letter-spacing: -.03em; font-weight: 800; margin: 0 0 18px; text-wrap: balance; }
        .lp-hero-text > p { font-size: 16.5px; line-height: 1.6; color: var(--ink-2); max-width: 520px; margin: 0 0 28px; }
        .lp-cta { display: flex; gap: 13px; flex-wrap: wrap; }
        .lp-big { height: 52px; padding: 0 24px; font-size: 15.5px; border-radius: 14px; }
        .lp-stats { display: flex; gap: 36px; margin-top: 40px; flex-wrap: wrap; }
        .lp-stat-v { font-size: 30px; font-weight: 800; font-family: var(--mono); letter-spacing: -.02em; }
        .lp-stat-l { font-size: 12.5px; color: var(--ink-3); font-weight: 600; }

        .lp-hero-art { position: relative; }
        .lp-window { background: var(--surface); border: 1px solid var(--line); border-radius: 20px; box-shadow: var(--shadow-lg); overflow: hidden; }
        .lp-winbar { display: flex; gap: 7px; padding: 14px 16px; border-bottom: 1px solid var(--line); }
        .lp-winbar span { width: 11px; height: 11px; border-radius: 50%; background: var(--line-2); }
        .lp-winbody { padding: 20px; display: grid; gap: 16px; }
        .lp-tiles { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
        .lp-tile { border-radius: 13px; padding: 13px; }
        .lp-bars { display: flex; align-items: flex-end; gap: 10px; height: 120px; padding: 0 4px; }
        .lp-bar { flex: 1; border-radius: 7px 7px 0 0; }
        .lp-rows { display: grid; gap: 9px; }
        .lp-row { display: flex; align-items: center; gap: 9px; font-size: 12.5px; font-weight: 600; color: var(--ink-2); background: var(--surface-2); padding: 9px 12px; border-radius: 11px; }
        .lp-badge-float { position: absolute; display: flex; align-items: center; gap: 7px; font-size: 12.5px; font-weight: 700;
          background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 9px 13px; box-shadow: var(--shadow); }
        .lp-bf1 { top: 18px; right: -14px; }
        .lp-bf2 { bottom: 22px; left: -18px; }

        .lp-band { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; max-width: 1280px; margin: 0 auto; padding: 8px 7vw 44px; }
        .lp-band > div { background: var(--surface); border: 1px solid var(--line); border-radius: 16px; padding: 20px 22px; }
        .lp-band b { display: block; font-size: 15px; margin-bottom: 4px; }
        .lp-band span { font-size: 13px; color: var(--ink-2); }

        .lp-section { max-width: 1280px; margin: 0 auto; padding: 64px 7vw; }
        .lp-section-alt { max-width: none; background: var(--surface); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .lp-section-alt > * { max-width: 1280px; margin-left: auto; margin-right: auto; }
        .lp-head { text-align: center; max-width: 640px; margin: 0 auto 40px; }
        .lp-kicker { font-size: 12.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--orange-600); }
        .lp-head h2 { font-size: 33px; letter-spacing: -.025em; font-weight: 800; margin: 10px 0 12px; text-wrap: balance; }
        .lp-head p { font-size: 15.5px; color: var(--ink-2); line-height: 1.6; margin: 0; }

        .lp-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
        .lp-mod { padding: 22px; }
        .lp-mod-ic { width: 46px; height: 46px; border-radius: 14px; display: grid; place-items: center; margin-bottom: 14px; }
        .lp-mod b { font-size: 15.5px; display: block; margin-bottom: 6px; }
        .lp-mod p { font-size: 13px; color: var(--ink-2); line-height: 1.5; margin: 0; }

        .lp-roles { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; }
        .lp-role { display: flex; align-items: center; gap: 15px; padding: 20px 22px; }
        .lp-role-ic { width: 44px; height: 44px; border-radius: 13px; display: grid; place-items: center; background: var(--orange-50); color: var(--orange-600); flex-shrink: 0; }
        .lp-role b { font-size: 15.5px; display: block; margin-bottom: 3px; }
        .lp-role span { font-size: 13px; color: var(--ink-2); }

        .lp-arch { display: grid; grid-template-columns: 1.1fr .9fr; gap: 44px; align-items: center; }
        .lp-arch h2 { font-size: 31px; letter-spacing: -.025em; font-weight: 800; margin: 10px 0 14px; }
        .lp-arch p { font-size: 15.5px; color: var(--ink-2); line-height: 1.65; margin: 0 0 20px; }
        .lp-chips { display: flex; flex-wrap: wrap; gap: 9px; }
        .lp-chip { font-size: 12.5px; font-weight: 600; font-family: var(--mono); background: var(--surface); border: 1px solid var(--line); padding: 7px 12px; border-radius: 9px; color: var(--ink-2); }
        .lp-arch-grid { display: grid; gap: 14px; }
        .lp-dom { background: var(--surface); border: 1.5px solid; border-radius: 16px; padding: 18px 22px; display: flex; align-items: baseline; justify-content: space-between; }
        .lp-dom b { font-size: 18px; }
        .lp-dom span { font-size: 13px; color: var(--ink-3); font-weight: 600; }

        .lp-final { text-align: center; padding: 72px 7vw; margin: 0 7vw 64px; border-radius: 28px;
          background: linear-gradient(135deg, var(--orange), var(--orange-600)); color: #fff; }
        .lp-final h2 { font-size: 32px; font-weight: 800; letter-spacing: -.02em; margin: 0 0 10px; }
        .lp-final p { font-size: 16px; opacity: .92; margin: 0 0 26px; }

        .lp-foot { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 28px 7vw 40px; max-width: 1280px; margin: 0 auto; flex-wrap: wrap; border-top: 1px solid var(--line); }

        @media (max-width: 960px) {
          .lp-hero { grid-template-columns: 1fr; gap: 36px; padding-top: 44px; }
          .lp-hero-text h1 { font-size: 38px; }
          .lp-arch { grid-template-columns: 1fr; gap: 28px; }
          .lp-grid { grid-template-columns: repeat(2,1fr); }
          .lp-band { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .lp-links { display: none; }
          .lp-hero-text h1 { font-size: 31px; }
          .lp-grid { grid-template-columns: 1fr; }
          .lp-roles { grid-template-columns: 1fr; }
          .lp-final { margin: 0 16px 40px; padding: 52px 24px; }
          .lp-badge-float { display: none; }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { Landing });

export {};
