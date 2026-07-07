// ============================================================
// AIS — Views: KEUANGAN (Billing & Receivables, Accounting)
// ============================================================

const TAGIHAN = [
  { nim: "11210910000045", nama: "Aisyah Nur Ramadhani", prodi: "TI", komponen: "UKT Gol. IV", jumlah: 7500000, jatuhTempo: "10 Sep 2026", status: "lunas", va: "8810420000045" },
  { nim: "11210910000033", nama: "Bayu Pratama", prodi: "TI", komponen: "UKT Gol. III", jumlah: 5500000, jatuhTempo: "10 Sep 2026", status: "menunggu", va: "8810420000033" },
  { nim: "11220910000087", nama: "Rangga Saputra", prodi: "TI", komponen: "UKT Gol. V", jumlah: 9000000, jatuhTempo: "10 Sep 2026", status: "belum", va: "8810420000087" },
  { nim: "11220910000120", nama: "Eka Permata", prodi: "TI", komponen: "UKT Gol. II", jumlah: 4000000, jatuhTempo: "10 Sep 2026", status: "cicilan", va: "8810420000120" },
  { nim: "11200910000018", nama: "Dimas Hidayat", prodi: "TI", komponen: "UKT Gol. IV + SKS TA", jumlah: 8200000, jatuhTempo: "10 Sep 2026", status: "menunggu", va: "8810420000018" },
  { nim: "11210910000052", nama: "Citra Lestari", prodi: "TI", komponen: "UKT Gol. III", jumlah: 5500000, jatuhTempo: "10 Sep 2026", status: "lunas", va: "8810420000052" },
  { nim: "11220910000091", nama: "Salsabila Putri", prodi: "TI", komponen: "UKT Gol. IV (Beasiswa 50%)", jumlah: 3750000, jatuhTempo: "10 Sep 2026", status: "belum", va: "8810420000091" },
  { nim: "11210910000061", nama: "Galang Maulana", prodi: "TI", komponen: "UKT Gol. III", jumlah: 5500000, jatuhTempo: "10 Sep 2026", status: "menunggu", va: "8810420000061" },
];
const stTagihan = { lunas: ["Lunas", "green"], menunggu: ["Menunggu Validasi", "amber"], belum: ["Belum Bayar", "red"], cicilan: ["Cicilan", "blue"] };

function KeuDashboard({ nav }) {
  const R = window.AIS_ROLES; const p = R.personas.keuangan;
  const rupiah = window.AIS_DATA.rupiah || ((n) => "Rp " + n.toLocaleString("id"));
  const totalTagih = TAGIHAN.reduce((a, b) => a + b.jumlah, 0);
  const lunas = TAGIHAN.filter((t) => t.status === "lunas").reduce((a, b) => a + b.jumlah, 0);
  const menunggu = TAGIHAN.filter((t) => t.status === "menunggu");

  const tiles = [
    { label: "Total Tagihan Periode", value: rupiah(24850000000).replace("Rp ", "Rp "), meta: "3.214 mahasiswa", ic: "wallet", c: "var(--amber)", bg: "var(--amber-bg)", small: true },
    { label: "Terkumpul", value: "71.4%", meta: "Rp 17,7 M masuk", ic: "chart", c: "var(--green)", bg: "var(--green-bg)" },
    { label: "Menunggu Validasi", value: menunggu.length + " trx", meta: "perlu konfirmasi manual", ic: "check", c: "var(--orange-600)", bg: "var(--orange-50)" },
    { label: "Piutang Tertunggak", value: "Rp 7,1 M", meta: "918 mahasiswa belum bayar", ic: "flag", c: "var(--red)", bg: "var(--red-bg)" },
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="keuangan" sub="Kelola tagihan UKT, validasi pembayaran, piutang, dan pencairan beasiswa mahasiswa."
        action={<button className="btn btn-primary" onClick={() => nav("keu_validasi")}><Icon name="check" size={17} /> Validasi ({menunggu.length})</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 22 }}>
        {tiles.map((t) => (
          <div key={t.label} className="stat card" style={{ background: t.bg, border: "none" }}>
            <Icon name={t.ic} size={26} className="si" style={{ color: t.c }} />
            <div className="label" style={{ color: t.c }}>{t.label}</div>
            <div className="value" style={{ color: t.c, fontSize: t.small ? 21 : 32 }}>{t.value}</div>
            <div className="meta" style={{ color: t.c }}>{t.meta}</div>
          </div>
        ))}
      </div>
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="check" size={19} style={{ color: "var(--orange-600)" }} /><h3>Pembayaran Menunggu Validasi</h3>
            <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("keu_validasi")}>Buka</button></div>
          <div>
            {menunggu.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 22px", borderBottom: i < menunggu.length - 1 ? "1px solid var(--line)" : "none" }}>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 700, fontSize: 13.5 }}>{t.nama}</div><div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>VA {t.va}</div></div>
                <b className="mono" style={{ fontSize: 13 }}>{rupiah(t.jumlah)}</b>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="chart" size={19} style={{ color: "var(--green)" }} /><h3>Penerimaan per Komponen</h3></div>
          <div className="card-pad" style={{ display: "grid", gap: 14 }}>
            {[["UKT Reguler", 78, "green"], ["UKT + SKS Tugas Akhir", 64, "blue"], ["Cicilan/Keringanan", 41, "amber"], ["Mahasiswa Baru (PMB)", 92, "purple"]].map(([l, v, t]) => (
              <div key={l}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}><span style={{ fontWeight: 600 }}>{l}</span><b>{v}%</b></div><div className="prog"><i style={{ width: v + "%", background: `var(--${t})` }} /></div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KeuTagihan() {
  const rupiah = window.AIS_DATA.rupiah || ((n) => "Rp " + n.toLocaleString("id"));
  const [q, setQ] = useState(""); const [f, setF] = useState("semua");
  const toast = useToast();
  const list = TAGIHAN.filter((t) => (f === "semua" || t.status === f) && (t.nama.toLowerCase().includes(q.toLowerCase()) || t.nim.includes(q)));
  return (
    <div className="anim-in">
      <PageHead title="Tagihan & UKT" desc="Daftar tagihan mahasiswa periode 2026/2027 Ganjil — dari Billing & Receivables Service."
        actions={<button className="btn btn-primary" onClick={() => toast("Batch tagihan UKT digenerate (3.214 invoice)", "ok")}><Icon name="plus" size={16} /> Generate Tagihan</button>} />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <div className="tb-search" style={{ margin: 0, width: 280 }}><Icon name="search" size={16} /><input placeholder="Cari nama / NIM…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <div className="seg">
          {[["semua", "Semua"], ["menunggu", "Menunggu"], ["belum", "Belum"], ["lunas", "Lunas"]].map(([k, l]) => <button key={k} className={f === k ? "on" : ""} onClick={() => setF(k)}>{l}</button>)}
        </div>
        <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--ink-3)" }}>{list.length} tagihan</span>
      </div>
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Mahasiswa</th><th>Komponen</th><th>Virtual Account</th><th style={{ textAlign: "right" }}>Jumlah</th><th>Jatuh Tempo</th><th>Status</th></tr></thead>
            <tbody>
              {list.map((t) => (
                <tr key={t.nim}>
                  <td><div style={{ fontWeight: 700 }}>{t.nama}</div><div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{t.nim}</div></td>
                  <td style={{ color: "var(--ink-2)" }}>{t.komponen}</td>
                  <td className="mono" style={{ color: "var(--ink-3)" }}>{t.va}</td>
                  <td style={{ textAlign: "right", fontWeight: 700, fontFamily: "var(--mono)" }}>{rupiah(t.jumlah)}</td>
                  <td style={{ fontSize: 13 }}>{t.jatuhTempo}</td>
                  <td><Badge tone={stTagihan[t.status][1]} dot>{stTagihan[t.status][0]}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KeuValidasi() {
  const rupiah = window.AIS_DATA.rupiah || ((n) => "Rp " + n.toLocaleString("id"));
  const toast = useToast();
  const [list, setList] = useState(TAGIHAN.filter((t) => t.status === "menunggu").map((t) => ({ ...t, bank: ["BSI", "Mandiri", "BNI"][Math.floor(Math.random() * 3)], waktu: "23 Jun 09:" + (10 + Math.floor(Math.random() * 40)) })));
  const [done, setDone] = useState([]);
  function act(nim, ok) { setDone((d) => [...d, { nim, ok }]); toast(ok ? "Pembayaran divalidasi — status mahasiswa diperbarui" : "Pembayaran ditolak (bukti tidak sesuai)", ok ? "ok" : "err"); }
  const pending = list.filter((t) => !done.find((d) => d.nim === t.nim));
  return (
    <div className="anim-in">
      <PageHead title="Validasi Pembayaran" desc="Konfirmasi pembayaran masuk dari rekonsiliasi bank. Validasi memicu event PAYMENT_VALIDATED → Student Status diperbarui." />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
        <Badge tone="amber" dot>{pending.length} menunggu validasi</Badge>
        <Badge tone="green">{done.filter((d) => d.ok).length} tervalidasi hari ini</Badge>
        <div style={{ marginLeft: "auto", fontSize: 12.5, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 7 }}><Icon name="refresh" size={15} /> Rekonsiliasi bank otomatis · sinkron 5 menit lalu</div>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
        {pending.length ? pending.map((t) => (
          <div key={t.nim} className="card card-pad">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: "var(--amber-bg)", color: "#a6760e", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="wallet" size={22} /></div>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 800, fontSize: 15 }}>{t.nama}</div><div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{t.nim}</div></div>
              <div style={{ textAlign: "right" }}><div style={{ fontWeight: 800, fontFamily: "var(--mono)", fontSize: 16 }}>{rupiah(t.jumlah)}</div></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14, padding: "12px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
              {[["Bank", t.bank], ["Waktu", t.waktu], ["VA", "•••" + t.va.slice(-4)]].map(([l, v]) => (<div key={l}><div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{l}</div><div style={{ fontWeight: 700, fontSize: 12.5, marginTop: 2 }} className={l === "VA" ? "mono" : ""}>{v}</div></div>))}
            </div>
            <div style={{ display: "flex", gap: 9 }}>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => act(t.nim, false)}>Tolak</button>
              <button className="btn btn-primary btn-sm" style={{ flex: 2 }} onClick={() => act(t.nim, true)}><Icon name="check" size={14} /> Validasi Pembayaran</button>
            </div>
          </div>
        )) : <div className="card empty" style={{ gridColumn: "1/-1" }}><Icon name="check" size={32} style={{ color: "var(--green)", marginBottom: 10 }} /><div style={{ fontWeight: 700, color: "var(--ink-2)" }}>Semua pembayaran sudah divalidasi 🎉</div></div>}
      </div>
    </div>
  );
}

function KeuPiutang() {
  const rupiah = window.AIS_DATA.rupiah || ((n) => "Rp " + n.toLocaleString("id"));
  const aging = [
    { bucket: "Belum jatuh tempo", jml: 412, nilai: 3100000000, tone: "green" },
    { bucket: "1–30 hari", jml: 318, nilai: 2400000000, tone: "amber" },
    { bucket: "31–60 hari", jml: 124, nilai: 980000000, tone: "orange" },
    { bucket: "> 60 hari", jml: 64, nilai: 620000000, tone: "red" },
  ];
  const maxN = Math.max(...aging.map((a) => a.nilai));
  return (
    <div className="anim-in">
      <PageHead title="Piutang Mahasiswa" desc="Aging piutang UKT — dasar penetapan keringanan, cicilan, dan blokir layanan akademik." />
      <div className="grid" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="chart" size={19} style={{ color: "var(--red)" }} /><h3>Aging Piutang</h3></div>
          <div className="card-pad" style={{ display: "grid", gap: 18 }}>
            {aging.map((a) => (
              <div key={a.bucket}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontWeight: 600, fontSize: 13.5 }}>{a.bucket}</span><span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{a.jml} mhs · <b className="mono" style={{ color: "var(--ink)" }}>{rupiah(a.nilai)}</b></span></div>
                <div className="prog" style={{ height: 12 }}><i style={{ width: (a.nilai / maxN * 100) + "%", background: `var(--${a.tone === "orange" ? "orange" : a.tone})` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="flag" size={19} style={{ color: "var(--orange-600)" }} /><h3>Tindakan Piutang</h3></div>
          <div style={{ padding: "6px 0" }}>
            {[["64 mahasiswa > 60 hari", "Usulkan blokir KRS semester depan", "red"], ["28 pengajuan cicilan", "Menunggu persetujuan keuangan", "blue"], ["12 pengajuan keringanan UKT", "Verifikasi dokumen pendukung", "amber"]].map(([t, d, tone], i, arr) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px 22px", borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none" }}>
                <span className="dot" style={{ background: `var(--${tone})`, width: 9, height: 9 }} />
                <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 13.5 }}>{t}</div><div style={{ fontSize: 12, color: "var(--ink-3)" }}>{d}</div></div>
                <button className="btn btn-ghost btn-sm">Proses</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KeuBeasiswa() {
  const rupiah = window.AIS_DATA.rupiah || ((n) => "Rp " + n.toLocaleString("id"));
  const toast = useToast();
  const [list, setList] = useState([
    { nama: "Salsabila Putri", nim: "11220910000091", jenis: "Beasiswa Prestasi Akademik", nominal: 3750000, status: "menunggu" },
    { nama: "Fahmi Nuraini", nim: "11220910000104", jenis: "Beasiswa KIP-Kuliah", nominal: 4400000, status: "menunggu" },
    { nama: "Eka Permata", nim: "11220910000120", jenis: "Beasiswa Tahfidz", nominal: 2000000, status: "cair" },
    { nama: "Galang Maulana", nim: "11210910000061", jenis: "Beasiswa Bank Indonesia", nominal: 6000000, status: "menunggu" },
  ]);
  function cairkan(nim) { setList((l) => l.map((b) => b.nim === nim ? { ...b, status: "cair" } : b)); toast("Beasiswa dicairkan & dikreditkan ke tagihan UKT", "ok"); }
  return (
    <div className="anim-in">
      <PageHead title="Pencairan Beasiswa" desc="Verifikasi dan cairkan beasiswa mahasiswa. Pencairan otomatis mengkredit tagihan UKT (Billing Service)." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Mahasiswa</th><th>Jenis Beasiswa</th><th style={{ textAlign: "right" }}>Nominal</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map((b) => (
                <tr key={b.nim}>
                  <td><div style={{ fontWeight: 700 }}>{b.nama}</div><div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{b.nim}</div></td>
                  <td><Badge tone="purple">{b.jenis}</Badge></td>
                  <td style={{ textAlign: "right", fontWeight: 700, fontFamily: "var(--mono)" }}>{rupiah(b.nominal)}</td>
                  <td><Badge tone={b.status === "cair" ? "green" : "amber"} dot>{b.status === "cair" ? "Dicairkan" : "Menunggu"}</Badge></td>
                  <td>{b.status === "menunggu" ? <button className="btn btn-soft btn-sm" onClick={() => cairkan(b.nim)}><Icon name="check" size={13} /> Cairkan</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>Selesai</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KeuLaporan() {
  const rupiah = window.AIS_DATA.rupiah || ((n) => "Rp " + n.toLocaleString("id"));
  const bln = [["Jan", 2.1], ["Feb", 4.8], ["Mar", 1.2], ["Apr", 0.9], ["Mei", 0.6], ["Jun", 0.4], ["Jul", 0.3], ["Agu", 3.2], ["Sep", 5.4], ["Okt", 1.1], ["Nov", 0.7], ["Des", 0.5]];
  const max = Math.max(...bln.map((b) => b[1]));
  return (
    <div className="anim-in">
      <PageHead title="Laporan Keuangan" desc="Ringkasan penerimaan akademik tahun berjalan — Accounting & Budget Service."
        actions={<button className="btn btn-ghost"><Icon name="report" size={16} /> Ekspor PDF</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)", marginBottom: 20 }}>
        {[["Total Penerimaan", "Rp 21,2 M", "green"], ["Target Tahunan", "Rp 28,5 M", "blue"], ["Capaian", "74,4%", "purple"]].map(([l, v, t]) => (
          <div key={l} className="stat card" style={{ background: `var(--${t}-bg)`, border: "none" }}><div className="label" style={{ color: `var(--${t})` }}>{l}</div><div className="value" style={{ color: `var(--${t})`, fontSize: 26 }}>{v}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-head"><Icon name="chart" size={19} style={{ color: "var(--green)" }} /><h3>Penerimaan Bulanan (Rp Miliar)</h3><span className="sub">· TA 2025/2026</span></div>
        <div className="card-pad" style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 220 }}>
          {bln.map(([m, v]) => (
            <div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 7, height: "100%", justifyContent: "flex-end" }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, fontFamily: "var(--mono)", color: "var(--ink-3)" }}>{v}</div>
              <div style={{ width: "100%", maxWidth: 30, height: (v / max * 150) + "px", borderRadius: "7px 7px 0 0", background: v >= 3 ? "var(--green)" : "var(--blue)", transition: "height .4s" }} />
              <div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{m}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { KeuDashboard, KeuTagihan, KeuValidasi, KeuPiutang, KeuBeasiswa, KeuLaporan });
