// @ts-nocheck
const { React, useState, useEffect, useRef, Icon, useToast, Modal, Badge, PageHead, Barcode, ImgPlaceholder, rupiah, initials, StaffHero } = window as any;

// ============================================================
// AIS — Views: Kalender, Beasiswa, Bantuan
// ============================================================

// ===================== KALENDER PERKULIAHAN =====================
function Kalender() {
  const D = window.AIS_DATA;
  const [ta, setTa] = useState("2025/2026");
  const [jenis, setJenis] = useState("Ganjil");
  const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
  const START = 7 * 60, END = 16 * 60, H = 620;
  const toMinL = (t) => { const [h, m] = t.trim().split(":").map(Number); return h * 60 + m; };
  const colors = {
    TIF5101: "var(--orange)", TIF5102: "var(--blue)", TIF5103: "var(--green)",
    TIF5104: "var(--purple)", TIF5105: "var(--red)", TIF5106: "var(--amber)",
  };
  const bgColors = {
    TIF5101: "var(--orange-50)", TIF5102: "var(--blue-bg)", TIF5103: "var(--green-bg)",
    TIF5104: "var(--purple-bg)", TIF5105: "var(--red-bg)", TIF5106: "var(--amber-bg)",
  };
  const hours = [];
  for (let h = 7; h <= 16; h++) hours.push(h);

  return (
    <div className="anim-in">
      <PageHead title="Kalender Perkuliahan" desc="Jadwal mingguan beserta ruang dan dosen pengampu. Riwayat dari semester 1 hingga wisuda." />

      <div className="card" style={{ marginBottom: 18, padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <Icon name="filter" size={18} style={{ color: "var(--ink-3)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-2)" }}>Tahun Akademik</span>
          <select value={ta} onChange={(e) => setTa(e.target.value)} style={{ padding: "8px 12px", border: "1px solid var(--line-2)", borderRadius: 10, fontFamily: "var(--sans)", fontWeight: 600, fontSize: 13, background: "var(--surface)" }}>
            <option>2025/2026</option><option>2024/2025</option><option>2023/2024</option>
          </select>
        </div>
        <div className="seg">
          {["Ganjil", "Genap"].map((j) => <button key={j} className={jenis === j ? "on" : ""} onClick={() => setJenis(j)}>{j}</button>)}
        </div>
        <Badge tone="green" dot>6 mata kuliah · 16 SKS</Badge>
      </div>

      <div className="card card-pad" style={{ overflowX: "auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "56px repeat(5, 1fr)", minWidth: 760 }}>
          {/* header */}
          <div />
          {hari.map((h) => (
            <div key={h} style={{ textAlign: "center", fontWeight: 700, fontSize: 13.5, paddingBottom: 12, color: "var(--ink)" }}>{h}</div>
          ))}
          {/* body */}
          <div style={{ position: "relative", height: H }}>
            {hours.map((h) => (
              <div key={h} style={{ position: "absolute", top: ((h * 60 - START) / (END - START)) * H - 7, right: 8, fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>{String(h).padStart(2, "0")}:00</div>
            ))}
          </div>
          {hari.map((h) => {
            const classes = D.jadwal.filter((j) => j.hari === h);
            return (
              <div key={h} style={{ position: "relative", height: H, borderLeft: "1px solid var(--line)" }}>
                {hours.map((hr) => (
                  <div key={hr} style={{ position: "absolute", top: ((hr * 60 - START) / (END - START)) * H, left: 0, right: 0, borderTop: "1px solid var(--line)" }} />
                ))}
                {classes.map((c, i) => {
                  const top = ((toMinL(c.jam.split(" - ")[0]) - START) / (END - START)) * H;
                  const bot = ((toMinL(c.jam.split(" - ")[1]) - START) / (END - START)) * H;
                  return (
                    <div key={i} style={{ position: "absolute", top: top + 2, height: bot - top - 4, left: 4, right: 4, background: bgColors[c.kode], borderLeft: `3px solid ${colors[c.kode]}`, borderRadius: 8, padding: "7px 9px", overflow: "hidden", cursor: "default" }}>
                      <div style={{ fontWeight: 700, fontSize: 11.5, lineHeight: 1.2, color: "var(--ink)" }}>{c.nama}</div>
                      <div style={{ fontSize: 10, color: "var(--ink-2)", fontFamily: "var(--mono)", marginTop: 2 }}>{c.jam}</div>
                      <div style={{ fontSize: 10, color: "var(--ink-3)", marginTop: 1 }}>{c.ruang}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ===================== BEASISWA =====================
function Beasiswa() {
  const D = window.AIS_DATA;
  const toast = useToast();
  const [openBs, setOpenBs] = useState(null);
  const [checks, setChecks] = useState({});
  const [registered, setRegistered] = useState({});
  const [bukti, setBukti] = useState(null);

  function open(bs) { setOpenBs(bs); setChecks({}); }
  function submit() {
    const all = openBs.syarat.every((_, i) => checks[i]);
    if (!all) { toast("Centang semua persyaratan terlebih dahulu", "err"); return; }
    setRegistered({ ...registered, [openBs.id]: true });
    const b = openBs; setOpenBs(null);
    setBukti(b);
    toast("Pendaftaran beasiswa berhasil 🎉");
  }

  return (
    <div className="anim-in">
      <PageHead title="Beasiswa" desc="Daftar program beasiswa yang tersedia. Lengkapi persyaratan untuk mendaftar." />

      <div className="grid" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
        {D.beasiswa.map((bs) => {
          const dibuka = bs.status === "Dibuka";
          const reg = registered[bs.id];
          return (
            <div key={bs.id} className="card card-pad" style={{ opacity: dibuka ? 1 : .7 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: 13, background: "linear-gradient(135deg, var(--purple), #a986d8)", color: "#fff", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="gift" size={23} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 15.5, lineHeight: 1.25 }}>{bs.nama}</div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{bs.penyelenggara}</div>
                </div>
                <Badge tone={dibuka ? "green" : "gray"} dot>{bs.status}</Badge>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                <div style={{ flex: 1, background: "var(--surface-2)", borderRadius: 11, padding: "9px 12px", minWidth: 120 }}>
                  <div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>Nominal</div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{bs.nominal}</div>
                </div>
                <div style={{ flex: 1, background: "var(--surface-2)", borderRadius: 11, padding: "9px 12px", minWidth: 100 }}>
                  <div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>Kuota</div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{bs.kuota} orang</div>
                </div>
                <div style={{ flex: 1, background: "var(--surface-2)", borderRadius: 11, padding: "9px 12px", minWidth: 110 }}>
                  <div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>Deadline</div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{bs.deadline}</div>
                </div>
              </div>
              {reg ? (
                <button className="btn btn-soft" style={{ width: "100%" }} disabled><Icon name="check" size={16} /> Sudah Terdaftar</button>
              ) : (
                <button className="btn btn-primary" style={{ width: "100%" }} disabled={!dibuka} onClick={() => open(bs)}>
                  {dibuka ? <>Daftar Beasiswa <Icon name="chevR" size={15} /></> : "Pendaftaran Ditutup"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal daftar */}
      {openBs && (
        <Modal title={openBs.nama} subtitle={`${openBs.penyelenggara} · ${openBs.nominal}`} onClose={() => setOpenBs(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setOpenBs(null)}>Batal</button><button className="btn btn-primary" onClick={submit}><Icon name="check" size={16} /> Daftar Sekarang</button></>}>
          <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 12 }}>Centang persyaratan yang telah Anda penuhi:</div>
          <div style={{ display: "grid", gap: 10 }}>
            {openBs.syarat.map((s, i) => (
              <label key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "12px 14px", border: "1px solid var(--line-2)", borderRadius: 12, cursor: "pointer", background: checks[i] ? "var(--orange-50)" : "var(--surface)" }}>
                <button type="button" onClick={() => setChecks({ ...checks, [i]: !checks[i] })} style={{ width: 22, height: 22, borderRadius: 7, border: checks[i] ? "none" : "2px solid var(--line-2)", background: checks[i] ? "var(--orange)" : "#fff", display: "grid", placeItems: "center", color: "#fff", flexShrink: 0, cursor: "pointer", padding: 0 }}>
                  {checks[i] && <Icon name="check" size={14} />}
                </button>
                <span style={{ fontSize: 13.5, fontWeight: 600 }}>{s}</span>
              </label>
            ))}
          </div>
          <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 14, display: "flex", gap: 8 }}>
            <Icon name="info" size={16} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>Bukti pendaftaran dikumpulkan bersama berkas ke Bagian Kemahasiswaan.</span>
          </div>
        </Modal>
      )}

      {/* Bukti pendaftaran */}
      {bukti && (
        <Modal title="Bukti Pendaftaran Beasiswa" subtitle="Simpan / cetak bukti ini sebagai tanda pendaftaran." onClose={() => setBukti(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setBukti(null)}>Tutup</button><button className="btn btn-primary" onClick={() => toast("Mencetak bukti pendaftaran")}><Icon name="print" size={16} /> Cetak Bukti</button></>}>
          <div style={{ border: "1px solid var(--line)", borderRadius: 16, padding: 22, textAlign: "center" }}>
            <div style={{ width: 54, height: 54, borderRadius: 16, background: "var(--green-bg)", color: "var(--green)", display: "grid", placeItems: "center", margin: "0 auto 14px" }}><Icon name="check" size={28} /></div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>Pendaftaran Berhasil</div>
            <div style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 4, marginBottom: 18 }}>{bukti.nama}</div>
            <div style={{ display: "grid", gap: 2, textAlign: "left", marginBottom: 18 }}>
              {[["Nama", D.mahasiswa.nama], ["NIM", D.mahasiswa.nim], ["Program Studi", D.mahasiswa.prodi], ["Tgl Daftar", "07 Jun 2026"], ["No. Registrasi", "BS/2026/" + bukti.id.toUpperCase() + "/0045"]].map(([k, v], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--line)", fontSize: 13 }}>
                  <span style={{ color: "var(--ink-3)", fontWeight: 600 }}>{k}</span><span style={{ fontWeight: 700 }}>{v}</span>
                </div>
              ))}
            </div>
            <Barcode width={180} />
          </div>
        </Modal>
      )}
    </div>
  );
}

// ===================== BANTUAN =====================
function Bantuan() {
  const D = window.AIS_DATA;
  const toast = useToast();
  const [tab, setTab] = useState("faq");
  const [open, setOpen] = useState(0);

  return (
    <div className="anim-in">
      <PageHead title="Bantuan" desc="Pertanyaan umum, prosedur standar (SOP), dan panduan penggunaan AIS." />

      <div className="grid" style={{ gridTemplateColumns: "1fr 300px", alignItems: "start" }}>
        <div>
          <div className="seg" style={{ marginBottom: 18 }}>
            <button className={tab === "faq" ? "on" : ""} onClick={() => setTab("faq")}>FAQ</button>
            <button className={tab === "sop" ? "on" : ""} onClick={() => setTab("sop")}>SOP</button>
          </div>

          {tab === "faq" && (
            <div className="card">
              {D.faq.map((f, i) => (
                <div key={i} style={{ borderBottom: i < D.faq.length - 1 ? "1px solid var(--line)" : "none" }}>
                  <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "16px 22px", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "var(--sans)" }}>
                    <div style={{ width: 26, height: 26, borderRadius: 8, background: "var(--orange-50)", color: "var(--orange-600)", display: "grid", placeItems: "center", flexShrink: 0, fontWeight: 800, fontSize: 13 }}>Q</div>
                    <span style={{ flex: 1, fontWeight: 700, fontSize: 14 }}>{f.q}</span>
                    <Icon name="chevD" size={18} style={{ color: "var(--ink-3)", transform: open === i ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0 }} />
                  </button>
                  {open === i && (
                    <div style={{ padding: "0 22px 18px 60px", fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.6 }} className="anim-in">{f.a}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {tab === "sop" && (
            <div className="grid">
              {D.sop.map((s, i) => (
                <div key={i} className="card">
                  <div className="card-head"><Icon name="doc" size={19} style={{ color: "var(--orange)" }} /><h3>{s.judul}</h3></div>
                  <div className="card-pad">
                    <div style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600, marginBottom: 14 }}><b style={{ color: "var(--ink-2)" }}>Pihak terkait:</b> {s.pihak}</div>
                    <div style={{ display: "grid", gap: 12 }}>
                      {s.langkah.map((l, j) => (
                        <div key={j} style={{ display: "flex", gap: 12 }}>
                          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--orange)", color: "#fff", display: "grid", placeItems: "center", flexShrink: 0, fontWeight: 800, fontSize: 12 }}>{j + 1}</div>
                          <span style={{ fontSize: 13.5, lineHeight: 1.5, paddingTop: 2 }}>{l}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar bantuan */}
        <div className="grid">
          <div className="card card-pad" style={{ textAlign: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--orange-50)", color: "var(--orange)", display: "grid", placeItems: "center", margin: "0 auto 12px" }}><Icon name="download" size={24} /></div>
            <div style={{ fontWeight: 800, fontSize: 14.5 }}>Panduan Penggunaan AIS</div>
            <div style={{ fontSize: 12.5, color: "var(--ink-3)", margin: "6px 0 14px" }}>Unduh dokumen panduan lengkap untuk mahasiswa (PDF).</div>
            <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => toast("Mengunduh panduan AIS (PDF)")}><Icon name="download" size={16} /> Unduh Panduan</button>
          </div>
          <div className="card card-pad">
            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>Butuh bantuan lain?</div>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}><Icon name="mail" size={17} style={{ color: "var(--ink-3)" }} /><span>servicedesk@kampus.ac.id</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}><Icon name="phone" size={17} style={{ color: "var(--ink-3)" }} /><span>(021) 740-1925 ext. 1842</span></div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13 }}><Icon name="pin" size={17} style={{ color: "var(--ink-3)", flexShrink: 0, marginTop: 1 }} /><span>Gedung Pusat TI Lt. 1, Kampus Utama</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Kalender, Beasiswa, Bantuan });

export {};
