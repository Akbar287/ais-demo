// ============================================================
// AIS — Views: MAHASISWA · MBKM, PKL & KKN (Experiential Learning)
// Sisi mahasiswa: lihat lowongan → daftar → pantau status → logbook
// Tersambung ke pengelola (MBKM/KKN) via store "exp_pendaftaran".
// Sequence-Mahasiswa FLOW 18 (MBKM) · 19 (PKL) · 20 (KKN)
// ============================================================
function MhsExp({ nav }) {
  const E = window.AIS_EXP;
  const toast = useToast();
  const mhs = (window.AIS_DATA && window.AIS_DATA.mahasiswa) || { nama: "Aisyah Nur Ramadhani", nim: "11210910000045", prodi: "Teknik Informatika", ipk: 3.71 };
  const [tab, setTab] = useState("mbkm");
  const [list, setList] = useSharedList("exp_pendaftaran", E.seed.slice());
  const [detail, setDetail] = useState(null);      // offer detail + daftar
  const [motiv, setMotiv] = useState("");
  const [logFor, setLogFor] = useState(null);      // pendaftaran utk logbook
  const [logText, setLogText] = useState("");

  const mine = list.filter((x) => x.nim === mhs.nim);
  const daftarUntuk = (jenis, offer) => mine.find((x) => x.offerId === offer.id && x.status !== "ditolak");

  function submitDaftar() {
    const { jenis, offer } = detail;
    setList((l) => [...l, {
      id: Date.now(), jenis, nim: mhs.nim, nama: mhs.nama, prodi: mhs.prodi || "Teknik Informatika",
      program: offer.nama || offer.instansi, offerId: offer.id, tgl: "05 Jul 2026", ipk: mhs.ipk || 3.5,
      status: "daftar", sks: offer.sks, logbook: [], nilai: null, motivasi: motiv,
    }]);
    setDetail(null); setMotiv("");
    toast("Pendaftaran terkirim — menunggu seleksi pengelola", "ok");
  }
  function addLog() {
    if (!logText.trim()) { toast("Aktivitas wajib diisi"); return; }
    setList((l) => l.map((x) => x.id === logFor.id ? { ...x, logbook: [...x.logbook, { tgl: "05 Jul", isi: logText.trim() }] } : x));
    setLogFor(null); setLogText("");
    toast("Logbook tersimpan & dikirim ke pembimbing", "ok");
  }

  // ---- kartu lowongan generik ----
  const offerCard = (jenis, o, i) => {
    const sudah = daftarUntuk(jenis, o);
    const penuh = o.status === "Penuh" || (o.terisi >= o.kuota);
    const pct = Math.round((o.terisi / o.kuota) * 100);
    return (
      <div key={o.id} className="card card-pad anim-in" style={{ display: "flex", flexDirection: "column", animationDelay: (i * 0.04) + "s" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: `var(--${E.JENIS_TONE[jenis]}-bg)`, color: `var(--${E.JENIS_TONE[jenis]})`, display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name={jenis === "KKN" ? "flag" : jenis === "PKL" ? "briefcase" : "link"} size={22} /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: 14.5, lineHeight: 1.3 }}>{o.nama || o.instansi}</div>
            <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>{o.mitra || o.bidang} · {o.lokasi}</div>
          </div>
          <Badge tone={penuh ? "amber" : "green"} dot>{penuh ? "Penuh" : "Dibuka"}</Badge>
        </div>
        <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, margin: "0 0 12px", flex: 1 }}>{o.desc}</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          {o.jenis && <Badge tone="gray">{o.jenis}</Badge>}
          <Badge tone={E.JENIS_TONE[jenis]}>{o.sks} SKS</Badge>
          {o.durasi && <Badge tone="gray">{o.durasi}</Badge>}
          {o.ipkMin && <Badge tone="gray">Min IPK {o.ipkMin.toFixed(2)}</Badge>}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--ink-3)", marginBottom: 5 }}><span>Kuota terisi</span><b className="mono">{o.terisi}/{o.kuota}</b></div>
        <div className="prog" style={{ marginBottom: 14 }}><i style={{ width: pct + "%", background: penuh ? "var(--amber)" : `var(--${E.JENIS_TONE[jenis]})` }} /></div>
        {sudah ? (
          <button className="btn btn-soft btn-sm" disabled style={{ width: "100%", opacity: .85 }}><Icon name="check" size={14} /> Sudah mendaftar · {E.STATUS_LABEL[sudah.status][0]}</button>
        ) : (
          <button className="btn btn-primary btn-sm" style={{ width: "100%" }} disabled={penuh} onClick={() => { setDetail({ jenis, offer: o }); setMotiv(""); }}>{penuh ? "Kuota Penuh" : <>Lihat & Daftar <Icon name="chevR" size={14} /></>}</button>
        )}
      </div>
    );
  };

  const catalog = { mbkm: ["MBKM", E.mbkm], pkl: ["PKL", E.pkl], kkn: ["KKN", E.kkn] };

  // ---- Kegiatan Saya (timeline status + logbook) ----
  const kegiatanSaya = (
    <div className="anim-in">
      {mine.length === 0 ? (
        <div className="card empty" style={{ padding: "56px 24px", textAlign: "center" }}>
          <Icon name="link" size={34} style={{ color: "var(--ink-3)", marginBottom: 10 }} />
          <div style={{ fontWeight: 700, color: "var(--ink-2)" }}>Belum ada kegiatan</div>
          <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 4 }}>Daftar dari tab Lowongan MBKM, PKL, atau KKN.</div>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {mine.map((x) => {
            const flow = x.status === "ditolak" ? ["daftar", "seleksi", "ditolak"] : E.STATUS_FLOW;
            const curIdx = flow.indexOf(x.status);
            return (
              <div key={x.id} className="card">
                <div className="card-pad" style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid var(--line)" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: `var(--${E.JENIS_TONE[x.jenis]}-bg)`, color: `var(--${E.JENIS_TONE[x.jenis]})`, display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name={x.jenis === "KKN" ? "flag" : x.jenis === "PKL" ? "briefcase" : "link"} size={20} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: 14 }}>{x.program}</div>
                    <div style={{ fontSize: 12, color: "var(--ink-3)" }}><Badge tone={E.JENIS_TONE[x.jenis]}>{x.jenis}</Badge> · {x.sks} SKS · daftar {x.tgl}</div>
                  </div>
                  <Badge tone={E.STATUS_LABEL[x.status][1]} dot>{E.STATUS_LABEL[x.status][0]}</Badge>
                  {x.nilai && <Badge tone="green">Nilai {x.nilai}</Badge>}
                </div>
                {/* Timeline status */}
                <div className="card-pad" style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap", paddingBottom: x.status === "berjalan" || x.status === "selesai" ? 8 : 18 }}>
                  {flow.map((s, i) => (
                    <React.Fragment key={s}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, minWidth: 70 }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", display: "grid", placeItems: "center", background: i <= curIdx ? (s === "ditolak" ? "var(--red)" : "var(--green)") : "var(--surface-2)", color: i <= curIdx ? "#fff" : "var(--ink-3)", border: i <= curIdx ? "none" : "1.5px solid var(--line-2)" }}>{i <= curIdx ? <Icon name={s === "ditolak" ? "x" : "check"} size={12} /> : <span style={{ fontSize: 10, fontWeight: 800 }}>{i + 1}</span>}</div>
                        <span style={{ fontSize: 10.5, fontWeight: 700, color: i <= curIdx ? "var(--ink)" : "var(--ink-3)", textAlign: "center" }}>{E.STATUS_LABEL[s][0]}</span>
                      </div>
                      {i < flow.length - 1 && <div style={{ flex: 1, height: 2, minWidth: 20, background: i < curIdx ? "var(--green)" : "var(--line-2)", marginBottom: 16 }} />}
                    </React.Fragment>
                  ))}
                </div>
                {/* Logbook (saat berjalan) */}
                {(x.status === "berjalan" || x.status === "selesai") && (
                  <div className="card-pad" style={{ borderTop: "1px solid var(--line)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <Icon name="edit" size={15} style={{ color: "var(--blue)" }} /><b style={{ fontSize: 13 }}>Logbook</b><Badge tone="gray">{x.logbook.length} entri</Badge>
                      {x.status === "berjalan" && <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => { setLogFor(x); setLogText(""); }}><Icon name="plus" size={13} /> Tambah</button>}
                    </div>
                    {x.logbook.length ? (
                      <div style={{ display: "grid", gap: 6 }}>
                        {x.logbook.map((lg, i) => (<div key={i} style={{ display: "flex", gap: 10, fontSize: 12.5, padding: "7px 11px", background: "var(--surface-2)", borderRadius: 9 }}><span className="mono" style={{ color: "var(--ink-3)", flexShrink: 0 }}>{lg.tgl}</span><span>{lg.isi}</span></div>))}
                      </div>
                    ) : <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>Belum ada catatan aktivitas.</div>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const tabs = [["mbkm", "Lowongan MBKM"], ["pkl", "PKL / Magang"], ["kkn", "KKN"], ["saya", "Kegiatan Saya" + (mine.length ? " (" + mine.length + ")" : "")]];

  return (
    <div className="anim-in">
      <PageHead title="MBKM, PKL & KKN" desc="Jelajahi penawaran program pengalaman belajar (Merdeka Belajar, praktik kerja, KKN), daftar, dan pantau tindak lanjutnya hingga konversi SKS." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {tabs.map(([k, l]) => <button key={k} className={"btn btn-sm " + (tab === k ? "btn-soft" : "btn-ghost")} onClick={() => setTab(k)}>{l}</button>)}
      </div>

      {tab === "saya" ? kegiatanSaya : (
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))", gap: 16 }}>
          {catalog[tab][1].map((o, i) => offerCard(catalog[tab][0], o, i))}
        </div>
      )}

      {/* Modal daftar */}
      {detail && (
        <Modal wide title={detail.offer.nama || detail.offer.instansi} subtitle={detail.jenis + " · " + (detail.offer.mitra || detail.offer.bidang) + " · " + detail.offer.lokasi} onClose={() => setDetail(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setDetail(null)}>Batal</button><button className="btn btn-primary" onClick={submitDaftar}><Icon name="check" size={16} /> Kirim Pendaftaran</button></>}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
            <Badge tone={E.JENIS_TONE[detail.jenis]}>{detail.offer.sks} SKS</Badge>
            {detail.offer.durasi && <Badge tone="gray">{detail.offer.durasi}</Badge>}
            {detail.offer.jenis && <Badge tone="blue">{detail.offer.jenis}</Badge>}
            <Badge tone="gray">Kuota {detail.offer.terisi}/{detail.offer.kuota}</Badge>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ink-2)", margin: "0 0 16px" }}>{detail.offer.desc}</p>
          {detail.offer.syarat && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 8 }}>Persyaratan</div>
              <div style={{ display: "grid", gap: 6 }}>
                {detail.offer.syarat.map((s, i) => (<div key={i} style={{ display: "flex", gap: 9, alignItems: "center", fontSize: 13.5 }}><Icon name="check" size={15} style={{ color: "var(--green)" }} /> {s}</div>))}
              </div>
            </div>
          )}
          <div style={{ padding: 13, background: "var(--surface-2)", borderRadius: 12, marginBottom: 16, display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[["Pendaftar", mhs.nama], ["NIM", mhs.nim], ["IPK", (mhs.ipk || 3.71).toFixed ? (mhs.ipk || 3.71).toFixed(2) : mhs.ipk]].map(([l, v]) => (<div key={l}><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{l}</div><div style={{ fontWeight: 700, fontSize: 13.5, marginTop: 2 }} className={l === "NIM" || l === "IPK" ? "mono" : ""}>{v}</div></div>))}
          </div>
          <div className="field" style={{ margin: 0 }}><label>Motivasi / Alasan mendaftar</label><textarea rows={3} value={motiv} onChange={(e) => setMotiv(e.target.value)} placeholder="Ceritakan singkat motivasi Anda…" /></div>
          <div style={{ fontSize: 11.5, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}><Icon name="info" size={13} /> Transkrip & IPK diverifikasi otomatis. Pendaftaran diteruskan ke pengelola untuk seleksi.</div>
        </Modal>
      )}

      {/* Modal logbook */}
      {logFor && (
        <Modal title="Tambah Logbook" subtitle={logFor.program} onClose={() => setLogFor(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setLogFor(null)}>Batal</button><button className="btn btn-primary" onClick={addLog}><Icon name="check" size={16} /> Simpan</button></>}>
          <div className="field" style={{ margin: 0 }}><label>Aktivitas hari ini</label><textarea rows={3} value={logText} autoFocus onChange={(e) => setLogText(e.target.value)} placeholder="cth. Analisis kebutuhan sistem bersama mentor…" /></div>
        </Modal>
      )}
    </div>
  );
}

Object.assign(window, { MhsExp });
