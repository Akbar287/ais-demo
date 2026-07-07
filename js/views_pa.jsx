// ============================================================
// AIS — Views: DOSEN PENASIHAT AKADEMIK (PA) / Perwalian
// ============================================================

const MHS_BIMBINGAN = [
  { nim: "11220910000087", nama: "Rangga Saputra", angkatan: 2022, sem: 4, ipk: 3.62, sks: 72, status: "Aktif", krs: "menunggu", sksKrs: 22, risk: "low" },
  { nim: "11220910000091", nama: "Salsabila Putri", angkatan: 2022, sem: 4, ipk: 3.85, sks: 76, status: "Aktif", krs: "menunggu", sksKrs: 24, risk: "low" },
  { nim: "11220910000104", nama: "Fahmi Nuraini", angkatan: 2022, sem: 4, ipk: 2.41, sks: 58, status: "Aktif", krs: "menunggu", sksKrs: 21, risk: "high" },
  { nim: "11210910000045", nama: "Aisyah Nur Ramadhani", angkatan: 2021, sem: 6, ipk: 3.71, sks: 110, status: "Aktif", krs: "menunggu", sksKrs: 23, risk: "low" },
  { nim: "11210910000033", nama: "Bayu Pratama", angkatan: 2021, sem: 6, ipk: 2.78, sks: 98, status: "Aktif", krs: "menunggu", sksKrs: 20, risk: "mid" },
  { nim: "11210910000052", nama: "Citra Lestari", angkatan: 2021, sem: 6, ipk: 3.44, sks: 105, status: "Aktif", krs: "disetujui", sksKrs: 22, risk: "low" },
  { nim: "11200910000018", nama: "Dimas Hidayat", angkatan: 2020, sem: 8, ipk: 3.10, sks: 138, status: "Aktif", krs: "disetujui", sksKrs: 12, risk: "mid" },
  { nim: "11220910000120", nama: "Eka Permata", angkatan: 2022, sem: 4, ipk: 1.95, sks: 42, status: "Terancam DO", krs: "menunggu", sksKrs: 18, risk: "high" },
  { nim: "11210910000061", nama: "Galang Maulana", angkatan: 2021, sem: 6, ipk: 3.55, sks: 108, status: "Aktif", krs: "menunggu", sksKrs: 24, risk: "low" },
];

const riskMap = { low: ["Aman", "green"], mid: ["Perlu perhatian", "amber"], high: ["Berisiko", "red"] };

function PADashboard({ nav }) {
  const R = window.AIS_ROLES;
  const p = R.personas.pa;
  const menunggu = MHS_BIMBINGAN.filter((m) => m.krs === "menunggu");
  const berisiko = MHS_BIMBINGAN.filter((m) => m.risk === "high");
  const avgIpk = (MHS_BIMBINGAN.reduce((a, b) => a + b.ipk, 0) / MHS_BIMBINGAN.length).toFixed(2);

  const tiles = [
    { label: "Mahasiswa Bimbingan", value: MHS_BIMBINGAN.length, meta: "3 angkatan", ic: "users", c: "var(--green)", bg: "var(--green-bg)" },
    { label: "KRS Menunggu Validasi", value: menunggu.length, meta: "perlu persetujuan", ic: "check", c: "var(--orange-600)", bg: "var(--orange-50)" },
    { label: "IPK Rata-rata", value: avgIpk, meta: "perwalian Anda", ic: "chart", c: "var(--blue)", bg: "var(--blue-bg)" },
    { label: "Mahasiswa Berisiko", value: berisiko.length, meta: "IPK < 2.5 / terancam DO", ic: "flag", c: "var(--red)", bg: "var(--red-bg)" },
  ];

  return (
    <div className="anim-in">
      <StaffHero persona={p} role="pa" sub="Validasi KRS dan pantau perkembangan akademik mahasiswa bimbingan Anda."
        action={<button className="btn btn-primary" onClick={() => nav("pa_validasi")}><Icon name="check" size={17} /> Validasi KRS ({menunggu.length})</button>} />

      <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 22 }}>
        {tiles.map((t) => (
          <div key={t.label} className="stat card" style={{ background: t.bg, border: "none" }}>
            <Icon name={t.ic} size={26} className="si" style={{ color: t.c }} />
            <div className="label" style={{ color: t.c }}>{t.label}</div>
            <div className="value" style={{ color: t.c }}>{t.value}</div>
            <div className="meta" style={{ color: t.c }}>{t.meta}</div>
          </div>
        ))}
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="check" size={19} style={{ color: "var(--orange-600)" }} /><h3>Perlu Validasi KRS</h3>
            <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("pa_validasi")}>Buka Semua</button></div>
          <div>
            {menunggu.slice(0, 4).map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 22px", borderBottom: i < 3 ? "1px solid var(--line)" : "none" }}>
                <div className="sb-ava" style={{ width: 36, height: 36, fontSize: 13, background: "var(--green-bg)", color: "var(--green)" }}>{initials(m.nama)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5 }}>{m.nama}</div>
                  <div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{m.nim} · Sem {m.sem}</div>
                </div>
                <Badge tone="gray">{m.sksKrs} SKS</Badge>
                <Badge tone={riskMap[m.risk][1]} dot>{riskMap[m.risk][0]}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="flag" size={19} style={{ color: "var(--red)" }} /><h3>Mahasiswa Perlu Perhatian</h3></div>
          <div>
            {MHS_BIMBINGAN.filter((m) => m.risk !== "low").map((m, i, arr) => (
              <div key={i} style={{ padding: "13px 22px", borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 13.5 }}>{m.nama}</span>
                  <Badge tone={riskMap[m.risk][1]}>{riskMap[m.risk][0]}</Badge>
                  {m.status !== "Aktif" && <Badge tone="red" dot>{m.status}</Badge>}
                </div>
                <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--ink-3)" }}>
                  <span>IPK <b style={{ color: m.ipk < 2.5 ? "var(--red)" : "var(--ink)" }}>{m.ipk.toFixed(2)}</b></span>
                  <span>SKS lulus <b style={{ color: "var(--ink)" }}>{m.sks}</b></span>
                  <span className="mono">{m.nim}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PAValidasi() {
  const toast = useToast();
  const D = window.AIS_DATA;
  const [list, setList] = useState(MHS_BIMBINGAN.map((m) => ({ ...m })));
  const [detail, setDetail] = useState(null);
  const menunggu = list.filter((m) => m.krs === "menunggu");

  function act(nim, status) {
    setList((l) => l.map((m) => m.nim === nim ? { ...m, krs: status } : m));
    setDetail(null);
    toast(status === "disetujui" ? "KRS disetujui & dikirim ke Enrollment Service" : "KRS dikembalikan ke mahasiswa", status === "disetujui" ? "ok" : "");
  }

  const tone = { menunggu: ["Menunggu", "amber"], disetujui: ["Disetujui", "green"], ditolak: ["Dikembalikan", "red"] };

  return (
    <div className="anim-in">
      <PageHead title="Validasi KRS (Perwalian)" desc="Setujui atau kembalikan KRS mahasiswa bimbingan. Persetujuan mempublikasikan event KRS_APPROVED ke Enrollment Service." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 22, flexWrap: "wrap" }}>
        <div><div style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>Periode</div><div style={{ fontWeight: 800, fontSize: 15 }}>2026/2027 Ganjil</div></div>
        <div style={{ borderLeft: "1px solid var(--line)", paddingLeft: 22 }}><div style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>Menunggu</div><div style={{ fontWeight: 800, fontSize: 15, color: "var(--orange-600)" }}>{menunggu.length} mahasiswa</div></div>
        <div style={{ marginLeft: "auto", alignSelf: "center" }}>
          <button className="btn btn-soft" disabled={!menunggu.length} onClick={() => { setList((l) => l.map((m) => m.krs === "menunggu" ? { ...m, krs: "disetujui" } : m)); toast("Semua KRS yang aman disetujui", "ok"); }}>
            <Icon name="check" size={16} /> Setujui Massal (aman)
          </button>
        </div>
      </div>

      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Mahasiswa</th><th style={{ textAlign: "center" }}>Sem</th><th style={{ textAlign: "center" }}>IPK</th><th style={{ textAlign: "center" }}>SKS Diambil</th><th>Risiko</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map((m) => {
                const maxSks = m.ipk >= 3 ? 24 : m.ipk >= 2.5 ? 22 : m.ipk >= 2 ? 20 : 18;
                const over = m.sksKrs > maxSks;
                return (
                  <tr key={m.nim}>
                    <td><div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="sb-ava" style={{ width: 34, height: 34, fontSize: 12, background: "var(--green-bg)", color: "var(--green)" }}>{initials(m.nama)}</div>
                      <div><div style={{ fontWeight: 700 }}>{m.nama}</div><div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{m.nim}</div></div>
                    </div></td>
                    <td style={{ textAlign: "center", fontWeight: 700 }}>{m.sem}</td>
                    <td style={{ textAlign: "center", fontWeight: 800, fontFamily: "var(--mono)", color: m.ipk < 2.5 ? "var(--red)" : "var(--ink)" }}>{m.ipk.toFixed(2)}</td>
                    <td style={{ textAlign: "center" }}><span style={{ fontWeight: 700, color: over ? "var(--red)" : "var(--ink)" }}>{m.sksKrs}</span><span style={{ color: "var(--ink-3)", fontSize: 12 }}> / {maxSks}</span>{over && <div style={{ fontSize: 10.5, color: "var(--red)", fontWeight: 700 }}>melebihi batas</div>}</td>
                    <td><Badge tone={riskMap[m.risk][1]} dot>{riskMap[m.risk][0]}</Badge></td>
                    <td><Badge tone={tone[m.krs][1]} dot={m.krs !== "menunggu"}>{tone[m.krs][0]}</Badge></td>
                    <td>
                      {m.krs === "menunggu" ? (
                        <div style={{ display: "flex", gap: 6 }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => setDetail(m)}>Tinjau</button>
                          <button className="btn btn-soft btn-sm" onClick={() => act(m.nim, "disetujui")}><Icon name="check" size={13} /></button>
                        </div>
                      ) : <button className="btn btn-ghost btn-sm" onClick={() => setDetail(m)}>Lihat</button>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {detail && (() => {
        const maxSks = detail.ipk >= 3 ? 24 : detail.ipk >= 2.5 ? 22 : detail.ipk >= 2 ? 20 : 18;
        const mk = D.tawaranMK.slice(0, 7);
        return (
          <Modal wide title={"KRS — " + detail.nama} subtitle={detail.nim + " · Semester " + detail.sem + " · IPK " + detail.ipk.toFixed(2)} onClose={() => setDetail(null)}
            footer={detail.krs === "menunggu" ? <>
              <button className="btn btn-ghost" onClick={() => act(detail.nim, "ditolak")}>Kembalikan</button>
              <button className="btn btn-primary" onClick={() => act(detail.nim, "disetujui")}><Icon name="check" size={16} /> Setujui KRS</button>
            </> : <button className="btn btn-ghost" onClick={() => setDetail(null)}>Tutup</button>}>
            <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
              <Badge tone={detail.sksKrs > maxSks ? "red" : "green"}>{detail.sksKrs} SKS diambil (maks {maxSks})</Badge>
              <Badge tone={riskMap[detail.risk][1]} dot>{riskMap[detail.risk][0]}</Badge>
            </div>
            <table className="tbl" style={{ border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden" }}>
              <thead><tr><th>Kode</th><th>Mata Kuliah</th><th style={{ textAlign: "center" }}>SKS</th><th>Kelas</th></tr></thead>
              <tbody>{mk.map((c) => (<tr key={c.kode}><td className="mono">{c.kode}</td><td style={{ fontWeight: 600 }}>{c.nama}</td><td style={{ textAlign: "center" }}>{c.sks}</td><td>{c.kelas || "A"}</td></tr>))}</tbody>
            </table>
          </Modal>
        );
      })()}
    </div>
  );
}

function PAMahasiswa() {
  const [q, setQ] = useState("");
  const [angk, setAngk] = useState("semua");
  const list = MHS_BIMBINGAN.filter((m) => (angk === "semua" || m.angkatan === +angk) && (m.nama.toLowerCase().includes(q.toLowerCase()) || m.nim.includes(q)));
  return (
    <div className="anim-in">
      <PageHead title="Mahasiswa Bimbingan" desc="Seluruh mahasiswa di bawah perwalian Anda lintas angkatan." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div className="tb-search" style={{ margin: 0, width: 280 }}><Icon name="search" size={16} /><input placeholder="Cari nama / NIM…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <div className="seg">
          {["semua", "2022", "2021", "2020"].map((a) => <button key={a} className={angk === a ? "on" : ""} onClick={() => setAngk(a)}>{a === "semua" ? "Semua" : a}</button>)}
        </div>
        <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--ink-3)" }}>{list.length} mahasiswa</span>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        {list.map((m) => (
          <div key={m.nim} className="card card-pad">
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 13 }}>
              <div className="sb-ava" style={{ width: 42, height: 42, fontSize: 15, background: "var(--green-bg)", color: "var(--green)" }}>{initials(m.nama)}</div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.nama}</div>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{m.nim}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
              <Badge tone="gray">Sem {m.sem}</Badge>
              <Badge tone={m.status === "Aktif" ? "green" : "red"} dot>{m.status}</Badge>
              <Badge tone={riskMap[m.risk][1]}>{riskMap[m.risk][0]}</Badge>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "11px 0 0", borderTop: "1px solid var(--line)" }}>
              <div><div style={{ fontSize: 11, color: "var(--ink-3)" }}>IPK</div><div style={{ fontWeight: 800, fontFamily: "var(--mono)", color: m.ipk < 2.5 ? "var(--red)" : "var(--ink)" }}>{m.ipk.toFixed(2)}</div></div>
              <div><div style={{ fontSize: 11, color: "var(--ink-3)" }}>SKS Lulus</div><div style={{ fontWeight: 800, fontFamily: "var(--mono)" }}>{m.sks}</div></div>
              <div><div style={{ fontSize: 11, color: "var(--ink-3)" }}>Angkatan</div><div style={{ fontWeight: 800, fontFamily: "var(--mono)" }}>{m.angkatan}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PAMonitoring() {
  const byAngk = {};
  MHS_BIMBINGAN.forEach((m) => { (byAngk[m.angkatan] = byAngk[m.angkatan] || []).push(m); });
  const dist = [["3.50–4.00", "green"], ["3.00–3.49", "blue"], ["2.50–2.99", "amber"], ["< 2.50", "red"]];
  function bucket(ipk) { return ipk >= 3.5 ? 0 : ipk >= 3 ? 1 : ipk >= 2.5 ? 2 : 3; }
  const counts = [0, 0, 0, 0];
  MHS_BIMBINGAN.forEach((m) => counts[bucket(m.ipk)]++);
  const max = Math.max(...counts);

  return (
    <div className="anim-in">
      <PageHead title="Monitoring Akademik" desc="Sebaran IPK dan progres studi mahasiswa bimbingan Anda." />
      <div className="grid" style={{ gridTemplateColumns: "1fr 1.3fr" }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="chart" size={19} style={{ color: "var(--blue)" }} /><h3>Distribusi IPK</h3></div>
          <div className="card-pad" style={{ display: "grid", gap: 16 }}>
            {dist.map(([label, tone], i) => (
              <div key={label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                  <span style={{ fontWeight: 600 }}>{label}</span><b className="mono">{counts[i]} mhs</b>
                </div>
                <div className="prog" style={{ height: 12 }}><i style={{ width: (counts[i] / max * 100) + "%", background: `var(--${tone})` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="users" size={19} style={{ color: "var(--green)" }} /><h3>Progres per Angkatan</h3></div>
          <div style={{ padding: "6px 0" }}>
            {Object.entries(byAngk).sort().reverse().map(([angk, arr], i, all) => {
              const avg = (arr.reduce((a, b) => a + b.ipk, 0) / arr.length).toFixed(2);
              const avgSks = Math.round(arr.reduce((a, b) => a + b.sks, 0) / arr.length);
              return (
                <div key={angk} style={{ display: "flex", alignItems: "center", gap: 16, padding: "15px 24px", borderBottom: i < all.length - 1 ? "1px solid var(--line)" : "none" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: "var(--surface-2)", display: "grid", placeItems: "center", fontWeight: 800, fontFamily: "var(--mono)", fontSize: 15 }}>{angk}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>Angkatan {angk} <span style={{ color: "var(--ink-3)", fontWeight: 600 }}>· {arr.length} mahasiswa</span></div>
                    <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>Rata-rata SKS lulus {avgSks}</div>
                  </div>
                  <div style={{ textAlign: "right" }}><div style={{ fontSize: 11, color: "var(--ink-3)" }}>IPK rata-rata</div><div style={{ fontWeight: 800, fontFamily: "var(--mono)", fontSize: 18, color: "var(--green)" }}>{avg}</div></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PADashboard, PAValidasi, PAMahasiswa, PAMonitoring, MHS_BIMBINGAN });
