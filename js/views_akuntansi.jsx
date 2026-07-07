// ============================================================
// AIS — Views: AKUNTANSI lengkap (Sequence-Akuntansi.md)
// FLOW 1 CoA/GL · FLOW 2 Rekonsiliasi · FLOW 3 Belanja/AP/Pencairan
// FLOW 4 Pajak · FLOW 5 Anggaran/Neraca/Laporan/Closing
// ============================================================
const rpA = (n) => "Rp " + Math.abs(n).toLocaleString("id");

// ---------- FLOW 1: Chart of Accounts ----------
const COA = [
  { kode: "1", nama: "ASET", tipe: "Aset", level: 1, saldo: 96400000000, n: "Debit" },
  { kode: "1.1", nama: "Kas & Setara Kas", tipe: "Aset", level: 2, saldo: 38200000000, n: "Debit" },
  { kode: "1.2", nama: "Piutang Mahasiswa (AR)", tipe: "Aset", level: 2, saldo: 7100000000, n: "Debit" },
  { kode: "1.3", nama: "Uang Muka / Panjar Kerja", tipe: "Aset", level: 2, saldo: 412000000, n: "Debit" },
  { kode: "1.5", nama: "Aset Tetap", tipe: "Aset", level: 2, saldo: 50688000000, n: "Debit" },
  { kode: "2", nama: "LIABILITAS", tipe: "Liabilitas", level: 1, saldo: 5566000000, n: "Kredit" },
  { kode: "2.1", nama: "Utang Vendor (AP)", tipe: "Liabilitas", level: 2, saldo: 1240000000, n: "Kredit" },
  { kode: "2.2", nama: "Utang Gaji", tipe: "Liabilitas", level: 2, saldo: 3840000000, n: "Kredit" },
  { kode: "2.3", nama: "Utang Pajak", tipe: "Liabilitas", level: 2, saldo: 486000000, n: "Kredit" },
  { kode: "3", nama: "ASET NETO", tipe: "Aset Neto", level: 1, saldo: 86600000000, n: "Kredit" },
  { kode: "3.1", nama: "Aset Neto Tanpa Pembatasan", tipe: "Aset Neto", level: 2, saldo: 71200000000, n: "Kredit" },
  { kode: "3.2", nama: "Aset Neto Dengan Pembatasan", tipe: "Aset Neto", level: 2, saldo: 15400000000, n: "Kredit" },
  { kode: "4", nama: "PENDAPATAN", tipe: "Pendapatan", level: 1, saldo: 90800000000, n: "Kredit" },
  { kode: "4.1", nama: "Pendapatan UKT/SPP", tipe: "Pendapatan", level: 2, saldo: 78200000000, n: "Kredit" },
  { kode: "4.2", nama: "Hibah & Kerjasama", tipe: "Pendapatan", level: 2, saldo: 12600000000, n: "Kredit" },
  { kode: "5", nama: "BEBAN", tipe: "Beban", level: 1, saldo: 69700000000, n: "Debit" },
  { kode: "5.1", nama: "Beban Gaji & Tunjangan", tipe: "Beban", level: 2, saldo: 46100000000, n: "Debit" },
  { kode: "5.2", nama: "Beban Operasional Pendidikan", tipe: "Beban", level: 2, saldo: 19400000000, n: "Debit" },
  { kode: "5.3", nama: "Beban Penyusutan", tipe: "Beban", level: 2, saldo: 4200000000, n: "Debit" },
];
const COA_TONE = { Aset: "blue", Liabilitas: "red", "Aset Neto": "purple", Pendapatan: "green", Beban: "amber" };

function AkunCoA() {
  const toast = useToast();
  const [f, setF] = useState("Semua");
  const [rows, setRows] = useState(COA.map((c) => ({ ...c })));
  const [form, setForm] = useState(null); // {} = create
  const [del, setDel] = useState(null);
  const tipes = ["Semua", "Aset", "Liabilitas", "Aset Neto", "Pendapatan", "Beban"];
  const list = rows.filter((c) => f === "Semua" || c.tipe === f);
  function save(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const rec = { kode: fd.get("kode"), nama: fd.get("nama"), tipe: fd.get("tipe"), n: fd.get("n"), level: 2, saldo: 0 };
    if (!rec.kode || !rec.nama) { toast("Kode & nama akun wajib diisi"); return; }
    setRows((l) => form.kode ? l.map((x) => x.kode === form.kode ? { ...x, ...rec } : x) : [...l, rec]);
    toast(form.kode ? "Akun diperbarui" : "Akun baru ditambahkan ke CoA", "ok"); setForm(null);
  }
  return (
    <div className="anim-in">
      <PageHead title="Chart of Accounts (CoA)" desc="Bagan akun ber-Aset-Neto (PSAK yayasan / ISAK 35). Jurnal posted immutable — koreksi via jurnal balik."
        actions={<button className="btn btn-primary" onClick={() => setForm({})}><Icon name="plus" size={16} /> Tambah Akun</button>} />
      <div className="card card-pad" style={{ marginBottom: 14 }}>
        <div className="seg">{tipes.map((t) => <button key={t} className={f === t ? "on" : ""} onClick={() => setF(t)}>{t}</button>)}</div>
      </div>
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Kode</th><th>Nama Akun</th><th>Tipe</th><th style={{ textAlign: "center" }}>Saldo Normal</th><th style={{ textAlign: "right" }}>Saldo Berjalan</th><th></th></tr></thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.kode}>
                  <td className="mono" style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{c.kode}</td>
                  <td style={{ fontWeight: c.level === 1 ? 800 : 600, paddingLeft: c.level === 2 ? 34 : undefined }}>{c.nama}</td>
                  <td><Badge tone={COA_TONE[c.tipe]}>{c.tipe}</Badge></td>
                  <td style={{ textAlign: "center", fontSize: 12.5 }}>{c.n}</td>
                  <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: c.level === 1 ? 800 : 600 }}>{rpA(c.saldo)}</td>
                  <td>{c.level === 2 ? (
                    <div style={{ display: "flex", gap: 4 }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => setForm(c)}><Icon name="edit" size={13} /></button>
                      <button className="btn btn-ghost btn-sm" onClick={() => setDel(c)}><Icon name="trash" size={13} /></button>
                    </div>) : null}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {form && (
        <Modal title={form.kode ? "Ubah Akun — " + form.kode : "Tambah Akun Baru"} subtitle="Configuration & Master-Data (CoA)" onClose={() => setForm(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(null)}>Batal</button><button className="btn btn-primary" type="submit" form="coa-form"><Icon name="check" size={15} /> Simpan</button></>}>
          <form id="coa-form" onSubmit={save}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12 }}>
              <div className="field"><label>Kode Akun *</label><input name="kode" defaultValue={form.kode || ""} placeholder="cth. 5.4" required /></div>
              <div className="field"><label>Nama Akun *</label><input name="nama" defaultValue={form.nama || ""} placeholder="cth. Beban Pemeliharaan" required /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="field"><label>Tipe</label><select name="tipe" defaultValue={form.tipe || "Beban"}>{["Aset", "Liabilitas", "Aset Neto", "Pendapatan", "Beban"].map((t) => <option key={t}>{t}</option>)}</select></div>
              <div className="field"><label>Saldo Normal</label><select name="n" defaultValue={form.n || "Debit"}><option>Debit</option><option>Kredit</option></select></div>
            </div>
            <div style={{ fontSize: 12.5, color: "var(--ink-3)", display: "flex", gap: 7, alignItems: "center" }}><Icon name="info" size={14} /> Perubahan CoA dicatat di Audit Log.</div>
          </form>
        </Modal>
      )}
      {del && (
        <Modal title="Nonaktifkan Akun?" subtitle={del.kode + " — " + del.nama} onClose={() => setDel(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setDel(null)}>Batal</button>
            <button className="btn btn-primary" style={{ background: "var(--red)" }} onClick={() => { setRows((l) => l.filter((x) => x.kode !== del.kode)); toast("Akun dinonaktifkan (soft-delete)", "ok"); setDel(null); }}><Icon name="trash" size={15} /> Ya, Nonaktifkan</button></>}>
          <div style={{ display: "flex", gap: 12, padding: 14, background: "var(--red-bg)", borderRadius: 12 }}>
            <Icon name="warn" size={22} style={{ color: "var(--red)", flexShrink: 0 }} />
            <div style={{ fontSize: 13.5, lineHeight: 1.55 }}>Akun dengan saldo berjalan <b>{rpA(del.saldo)}</b> akan dinonaktifkan (soft-delete). Histori jurnal tetap tersimpan; akun tidak bisa dipakai untuk entri baru.</div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ---------- FLOW 1: Buku Besar ----------
const GL_MUT = [
  { tgl: "05 Jun", ref: "AUTO·bil.pembayaran", ket: "Penerimaan UKT batch VA", d: 2140000000, k: 0 },
  { tgl: "12 Jun", ref: "AUTO·hr.payroll", ket: "Pembayaran gaji Juni", d: 0, k: 3840000000 },
  { tgl: "18 Jun", ref: "JU-2606-028", ket: "Transfer ke rekening operasional", d: 0, k: 500000000 },
  { tgl: "23 Jun", ref: "AUTO·bil.pembayaran", ket: "Penerimaan UKT batch VA", d: 184500000, k: 0 },
];
function AkunGL() {
  const [akun, setAkun] = useState("1.1");
  const a = COA.find((c) => c.kode === akun);
  const saldoAwal = a.saldo - GL_MUT.reduce((s, m) => s + m.d - m.k, 0);
  let run = saldoAwal;
  return (
    <div className="anim-in">
      <PageHead title="Buku Besar (GL)" desc="Drill-down saldo per akun ke bukti sumber via referensi event (auto-journal idempoten by eventId)." />
      <div className="card card-pad" style={{ marginBottom: 14, display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
        <div className="field" style={{ margin: 0, minWidth: 280 }}>
          <label>Akun</label>
          <select value={akun} onChange={(e) => setAkun(e.target.value)}>
            {COA.filter((c) => c.level === 2).map((c) => <option key={c.kode} value={c.kode}>{c.kode} — {c.nama}</option>)}
          </select>
        </div>
        <Badge tone="green" dot style={{ marginLeft: "auto", marginBottom: 8 }}>Periode Juni 2026 · OPEN</Badge>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)", marginBottom: 14 }}>
        {[["Saldo Awal", saldoAwal, ""], ["Mutasi Debit", GL_MUT.reduce((s, m) => s + m.d, 0), "green"], ["Mutasi Kredit", GL_MUT.reduce((s, m) => s + m.k, 0), "red"]].map(([l, v, t]) => (
          <div key={l} className="stat card"><div className="label">{l}</div><div className="value" style={{ fontSize: 19, color: t ? `var(--${t})` : undefined }}>{rpA(v)}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-head"><Icon name="scale" size={19} style={{ color: "var(--blue)" }} /><h3>{a.kode} — {a.nama}</h3></div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Tgl</th><th>Referensi</th><th>Keterangan</th><th style={{ textAlign: "right" }}>Debit</th><th style={{ textAlign: "right" }}>Kredit</th><th style={{ textAlign: "right" }}>Saldo</th></tr></thead>
            <tbody>
              {GL_MUT.map((m, i) => { run += m.d - m.k; return (
                <tr key={i}>
                  <td style={{ fontSize: 12.5 }}>{m.tgl}</td>
                  <td className="mono" style={{ fontSize: 11.5, color: m.ref.startsWith("AUTO") ? "var(--blue)" : "var(--ink-3)" }}>{m.ref}</td>
                  <td style={{ fontSize: 13 }}>{m.ket}</td>
                  <td style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{m.d ? rpA(m.d) : "—"}</td>
                  <td style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{m.k ? rpA(m.k) : "—"}</td>
                  <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{rpA(run)}</td>
                </tr>); })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------- FLOW 2: Rekonsiliasi GL vs Subledger ----------
function AkunRekon() {
  const toast = useToast();
  const [jenis, setJenis] = useState("AR");
  const [fixed, setFixed] = useState(false);
  const [conf, setConf] = useState(false);
  const data = jenis === "AR"
    ? { gl: 7100000000, sub: 7085500000, src: "bil (AR aging)", rows: [["Pembayaran VA 22 Jun belum terjurnal", 12500000, "Event tanpa jurnal"], ["Keringanan UKT a.n. Eka P. (belum posting)", 2000000, "Jurnal tertunda"]] }
    : { gl: 38200000000, sub: 38196800000, src: "rekening bank", rows: [["Biaya admin transfer antar rekening", 200000, "Jurnal tanpa sumber"], ["Mutasi bank 21 Jun belum match", 3000000, "Unmatched"]] };
  const selisih = fixed ? 0 : data.gl - data.sub;
  return (
    <div className="anim-in">
      <PageHead title="Rekonsiliasi GL vs Subledger" desc="Saldo Piutang GL = Σ AR aging · Kas GL = saldo rekening. Selisih → jurnal koreksi ber-persetujuan, hasil dikunci." />
      <div className="card card-pad" style={{ marginBottom: 14, display: "flex", gap: 12, alignItems: "center" }}>
        <div className="seg"><button className={jenis === "AR" ? "on" : ""} onClick={() => { setJenis("AR"); setFixed(false); }}>Piutang (AR)</button><button className={jenis === "KAS" ? "on" : ""} onClick={() => { setJenis("KAS"); setFixed(false); }}>Kas &amp; Bank</button></div>
        <Badge tone="gray" style={{ marginLeft: "auto" }}>Sumber: {data.src}</Badge>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)", marginBottom: 14 }}>
        <div className="stat card" style={{ background: "var(--blue-bg)", border: "none" }}><div className="label" style={{ color: "var(--blue)" }}>Saldo GL</div><div className="value" style={{ color: "var(--blue)", fontSize: 19 }}>{rpA(data.gl)}</div></div>
        <div className="stat card" style={{ background: "var(--purple-bg)", border: "none" }}><div className="label" style={{ color: "var(--purple)" }}>Saldo Subledger</div><div className="value" style={{ color: "var(--purple)", fontSize: 19 }}>{rpA(fixed ? data.gl : data.sub)}</div></div>
        <div className="stat card" style={{ background: selisih === 0 ? "var(--green-bg)" : "var(--red-bg)", border: "none" }}><div className="label" style={{ color: selisih === 0 ? "var(--green)" : "var(--red)" }}>Selisih</div><div className="value" style={{ color: selisih === 0 ? "var(--green)" : "var(--red)", fontSize: 19 }}>{selisih === 0 ? "Rp 0 ✓" : rpA(selisih)}</div></div>
      </div>
      <div className="card">
        <div className="card-head"><Icon name="flag" size={19} style={{ color: "var(--amber)" }} /><h3>Rincian Selisih</h3>
          {!fixed && <button className="btn btn-primary btn-sm" style={{ marginLeft: "auto" }} onClick={() => setConf(true)}><Icon name="check" size={14} /> Buat Jurnal Koreksi</button>}
        </div>
        {fixed ? (
          <div className="empty" style={{ padding: "36px 24px" }}><Icon name="check" size={30} style={{ color: "var(--green)", marginBottom: 8 }} /><div style={{ fontWeight: 700, color: "var(--ink-2)" }}>Rekonsiliasi seimbang &amp; dikunci (diverifikasi oleh Hesti Rahayu, S.E., M.Ak)</div></div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="tbl">
              <thead><tr><th>Transaksi Tak Berpasangan</th><th style={{ textAlign: "right" }}>Nominal</th><th>Kategori</th></tr></thead>
              <tbody>
                {data.rows.map(([k, v, c], i) => (
                  <tr key={i}><td style={{ fontWeight: 600 }}>{k}</td><td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{rpA(v)}</td><td><Badge tone="amber">{c}</Badge></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {conf && (
        <Modal title="Buat Jurnal Koreksi?" subtitle={"Rekonsiliasi " + (jenis === "AR" ? "Piutang" : "Kas & Bank") + " · Juni 2026"} onClose={() => setConf(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setConf(false)}>Batal</button>
            <button className="btn btn-primary" onClick={() => { setFixed(true); setConf(false); toast("Jurnal koreksi diposting → persetujuan Kepala Biro → hasil rekonsiliasi dikunci", "ok"); }}><Icon name="check" size={15} /> Posting Koreksi</button></>}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            {data.rows.map(([k, v], i) => (
              <div key={i} style={{ padding: 12, background: "var(--surface-2)", borderRadius: 11 }}><div style={{ fontSize: 11.5, color: "var(--ink-3)", fontWeight: 600 }}>{k}</div><div className="mono" style={{ fontWeight: 700, marginTop: 3 }}>{rpA(v)}</div></div>
            ))}
          </div>
          <div className="field" style={{ margin: 0 }}><label>Catatan koreksi (wajib)</label><textarea rows={2} placeholder="Dasar koreksi, no. bukti…" /></div>
        </Modal>
      )}
    </div>
  );
}

// ---------- FLOW 3: Belanja, AP & Pencairan Dana ----------
const PENCAIRAN = [
  { no: "PB-2606-114", unit: "Fakultas Sains & Teknologi", uraian: "Pencairan termin 2 PO server (BAST diterima)", akun: "5.2 · Beban Operasional", nominal: 199000000, jenis: "Pengadaan", status: "menunggu" },
  { no: "PB-2606-113", unit: "LPPM", uraian: "Pencairan hibah PDP tahap 2 a.n. B. Sutejo", akun: "5.2 · Dana Riset", nominal: 8000000, jenis: "Hibah Riset", status: "menunggu" },
  { no: "PB-2606-112", unit: "BEM Universitas", uraian: "Panjar kegiatan PKKMB 2026", akun: "1.3 · Uang Muka", nominal: 35000000, jenis: "Panjar", status: "menunggu" },
  { no: "PB-2606-110", unit: "Biro SDM", uraian: "Honor narasumber pelatihan pegawai", akun: "5.1 · Beban Gaji", nominal: 12000000, jenis: "Honor", status: "dicairkan" },
];
const UTANG_V = [
  { vendor: "PT Sinar Komputindo", po: "PO-2026-018", nominal: 199000000, tempo: "30 Jun 2026", umur: 12, status: "jatuh-tempo" },
  { vendor: "CV Media Pustaka", po: "PO-2026-015", nominal: 46000000, tempo: "15 Jul 2026", umur: 4, status: "normal" },
  { vendor: "PT Grha Konstruksi", po: "PO-2026-009", nominal: 320000000, tempo: "10 Jun 2026", umur: 41, status: "lewat" },
];
const PANJAR = [
  { pemohon: "BEM Universitas", keperluan: "Panjar PKKMB", nominal: 35000000, umur: 3, spj: "Belum" },
  { pemohon: "Prodi TI", keperluan: "Kunjungan industri", nominal: 8500000, umur: 18, spj: "Draft" },
  { pemohon: "UKM Robotika", keperluan: "Kontes robot nasional", nominal: 12000000, umur: 37, spj: "Belum" },
];
function AkunAP() {
  const toast = useToast();
  const [list, setList] = useState(PENCAIRAN.map((x) => ({ ...x })));
  const [conf, setConf] = useState(null); // {row, aksi}
  const [tab, setTab] = useState("pencairan");
  function decide() {
    const { row, aksi } = conf;
    setList((l) => l.map((x) => x.no === row.no ? { ...x, status: aksi === "setuju" ? "dicairkan" : "ditolak" } : x));
    toast(aksi === "setuju" ? "Disetujui → SPM diterbitkan → transfer bank → jurnal Dr Beban/UM — Cr Kas" : "Ditolak & dikembalikan ke unit pemohon", aksi === "setuju" ? "ok" : "");
    setConf(null);
  }
  const ST = { menunggu: ["Menunggu Verifikasi", "amber"], dicairkan: ["Dicairkan", "green"], ditolak: ["Ditolak", "red"] };
  return (
    <div className="anim-in">
      <PageHead title="Belanja, Utang & Pencairan Dana" desc="Verifikasi pengajuan belanja & persetujuan pencairan (SPP → SPM → transfer). Utang diakui saat BAST; panjar >30 hari tanpa SPJ → temuan." />
      <div className="card card-pad" style={{ marginBottom: 14 }}>
        <div className="seg">
          <button className={tab === "pencairan" ? "on" : ""} onClick={() => setTab("pencairan")}>Persetujuan Pencairan</button>
          <button className={tab === "utang" ? "on" : ""} onClick={() => setTab("utang")}>Utang Vendor (AP)</button>
          <button className={tab === "panjar" ? "on" : ""} onClick={() => setTab("panjar")}>Panjar &amp; SPJ</button>
        </div>
      </div>
      {tab === "pencairan" && (
        <div className="card">
          <div style={{ overflowX: "auto" }}>
            <table className="tbl">
              <thead><tr><th>No.</th><th>Unit</th><th>Uraian</th><th>Akun</th><th style={{ textAlign: "right" }}>Nominal</th><th>Jenis</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {list.map((x) => (
                  <tr key={x.no}>
                    <td className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{x.no}</td>
                    <td style={{ fontSize: 12.5, fontWeight: 600 }}>{x.unit}</td>
                    <td style={{ fontSize: 13, maxWidth: 240 }}>{x.uraian}</td>
                    <td className="mono" style={{ fontSize: 11.5, color: "var(--ink-2)" }}>{x.akun}</td>
                    <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{rpA(x.nominal)}</td>
                    <td><Badge tone="gray">{x.jenis}</Badge></td>
                    <td><Badge tone={ST[x.status][1]} dot>{ST[x.status][0]}</Badge></td>
                    <td>{x.status === "menunggu" ? (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => setConf({ row: x, aksi: "tolak" })}>Tolak</button>
                        <button className="btn btn-soft btn-sm" onClick={() => setConf({ row: x, aksi: "setuju" })}><Icon name="check" size={13} /> Cairkan</button>
                      </div>) : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {tab === "utang" && (
        <div className="card">
          <div style={{ overflowX: "auto" }}>
            <table className="tbl">
              <thead><tr><th>Vendor</th><th>Referensi PO</th><th style={{ textAlign: "right" }}>Nominal</th><th>Jatuh Tempo</th><th style={{ textAlign: "center" }}>Umur (hari)</th><th>Status</th></tr></thead>
              <tbody>
                {UTANG_V.map((u, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700 }}>{u.vendor}</td>
                    <td className="mono" style={{ fontSize: 12 }}>{u.po}</td>
                    <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{rpA(u.nominal)}</td>
                    <td style={{ fontSize: 13 }}>{u.tempo}</td>
                    <td style={{ textAlign: "center", fontFamily: "var(--mono)" }}>{u.umur}</td>
                    <td><Badge tone={u.status === "lewat" ? "red" : u.status === "jatuh-tempo" ? "amber" : "green"} dot>{u.status === "lewat" ? "Lewat Tempo" : u.status === "jatuh-tempo" ? "≤ 14 hari" : "Normal"}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {tab === "panjar" && (
        <div className="card">
          <div className="card-head"><Icon name="clock" size={19} style={{ color: "var(--amber)" }} /><h3>Umur Panjar</h3><span className="sub">· &gt;30 hari tanpa SPJ → memo temuan ke Audit/Pimpinan</span></div>
          <div style={{ overflowX: "auto" }}>
            <table className="tbl">
              <thead><tr><th>Pemohon</th><th>Keperluan</th><th style={{ textAlign: "right" }}>Nominal</th><th style={{ textAlign: "center" }}>Umur (hari)</th><th>SPJ</th><th></th></tr></thead>
              <tbody>
                {PANJAR.map((p, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700 }}>{p.pemohon}</td>
                    <td style={{ fontSize: 13 }}>{p.keperluan}</td>
                    <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{rpA(p.nominal)}</td>
                    <td style={{ textAlign: "center", fontFamily: "var(--mono)", color: p.umur > 30 ? "var(--red)" : undefined, fontWeight: p.umur > 30 ? 800 : 400 }}>{p.umur}</td>
                    <td><Badge tone={p.spj === "Draft" ? "amber" : "gray"}>{p.spj}</Badge></td>
                    <td>{p.umur > 30 ? <button className="btn btn-soft btn-sm" onClick={() => toast("Memo temuan diterbitkan ke Audit & Pimpinan", "ok")}><Icon name="flag" size={13} /> Memo Temuan</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {conf && (
        <Modal title={conf.aksi === "setuju" ? "Setujui Pencairan Dana?" : "Tolak Pengajuan?"} subtitle={conf.row.no + " · " + conf.row.unit} onClose={() => setConf(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setConf(null)}>Batal</button>
            <button className="btn btn-primary" style={conf.aksi === "tolak" ? { background: "var(--red)" } : undefined} onClick={decide}><Icon name={conf.aksi === "setuju" ? "check" : "close"} size={15} /> {conf.aksi === "setuju" ? "Ya, Cairkan" : "Ya, Tolak"}</button></>}>
          <div style={{ display: "flex", gap: 12, padding: 14, background: conf.aksi === "setuju" ? "var(--green-bg)" : "var(--red-bg)", borderRadius: 12, marginBottom: 12 }}>
            <Icon name={conf.aksi === "setuju" ? "wallet" : "warn"} size={22} style={{ color: conf.aksi === "setuju" ? "var(--green)" : "var(--red)", flexShrink: 0 }} />
            <div style={{ fontSize: 13.5, lineHeight: 1.55 }}>
              {conf.aksi === "setuju"
                ? <span>Pencairan <b>{rpA(conf.row.nominal)}</b> akan diproses: SPM terbit → transfer bank → jurnal otomatis (Dr {conf.row.akun.split("·")[1]} — Cr Kas) → notifikasi unit.</span>
                : <span>Pengajuan <b>{rpA(conf.row.nominal)}</b> dikembalikan ke unit pemohon dengan catatan. Tidak ada jurnal yang dibuat.</span>}
            </div>
          </div>
          <div className="field" style={{ margin: 0 }}><label>Catatan {conf.aksi === "tolak" ? "(wajib)" : "(opsional)"}</label><textarea rows={2} placeholder="Tambahkan catatan…" /></div>
        </Modal>
      )}
    </div>
  );
}

// ---------- FLOW 4: Pajak ----------
const SPT = [
  { jenis: "PPh 21", masa: "Mei 2026", dpp: 3840000000, pajak: 192000000, status: "Dilaporkan", bukti: "NTTE-260610-081" },
  { jenis: "PPh 23", masa: "Mei 2026", dpp: 58000000, pajak: 1160000, status: "Dilaporkan", bukti: "NTTE-260610-082" },
  { jenis: "PPN", masa: "Mei 2026", dpp: 412000000, pajak: 45320000, status: "Dilaporkan", bukti: "NTTE-260611-014" },
  { jenis: "PPh 21", masa: "Juni 2026", dpp: 3840000000, pajak: 192000000, status: "Draft", bukti: "—" },
  { jenis: "PPh 22", masa: "Juni 2026", dpp: 199000000, pajak: 2985000, status: "Draft", bukti: "—" },
];
function AkunPajak() {
  const toast = useToast();
  const [form, setForm] = useState(false);
  return (
    <div className="anim-in">
      <PageHead title="Pajak — Posting & Kepatuhan" desc="Utang pajak GL = bukti potong terbit − setoran. SPT Masa & faktur diverifikasi sebelum lapor (DJP)."
        actions={<button className="btn btn-primary" onClick={() => setForm(true)}><Icon name="plus" size={15} /> Siapkan SPT Masa</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 14 }}>
        {[["Utang Pajak (GL)", "Rp 486 jt", "red"], ["Bukti Potong Terbit", "Rp 512 jt", "blue"], ["Setoran s.d. Juni", "Rp 26 jt", "green"], ["Selisih Rekonsiliasi", "Rp 0 ✓", "purple"]].map(([l, v, t]) => (
          <div key={l} className="stat card" style={{ background: `var(--${t}-bg)`, border: "none" }}><div className="label" style={{ color: `var(--${t})` }}>{l}</div><div className="value" style={{ color: `var(--${t})`, fontSize: 19 }}>{v}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-head"><Icon name="report" size={19} style={{ color: "var(--purple)" }} /><h3>SPT Masa / Pelaporan</h3></div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Jenis Pajak</th><th>Masa</th><th style={{ textAlign: "right" }}>Total DPP</th><th style={{ textAlign: "right" }}>Total Pajak</th><th>Status</th><th>No. Bukti Lapor</th></tr></thead>
            <tbody>
              {SPT.map((s, i) => (
                <tr key={i}>
                  <td><Badge tone="purple">{s.jenis}</Badge></td>
                  <td style={{ fontSize: 13 }}>{s.masa}</td>
                  <td style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{rpA(s.dpp)}</td>
                  <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{rpA(s.pajak)}</td>
                  <td><Badge tone={s.status === "Dilaporkan" ? "green" : "amber"} dot>{s.status}</Badge></td>
                  <td className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{s.bukti}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {form && (
        <Modal title="Siapkan SPT Masa" subtitle="Dihimpun dari bukti potong & faktur periode berjalan" onClose={() => setForm(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(false)}>Batal</button>
            <button className="btn btn-primary" onClick={() => { setForm(false); toast("SPT Masa Juni disiapkan → verifikasi → lapor DJP", "ok"); }}><Icon name="check" size={15} /> Buat Draft SPT</button></>}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field"><label>Jenis Pajak</label><select defaultValue="PPh 21">{["PPh 21", "PPh 22", "PPh 23", "PPN"].map((t) => <option key={t}>{t}</option>)}</select></div>
            <div className="field"><label>Masa Pajak</label><select defaultValue="Juni 2026"><option>Juni 2026</option><option>Juli 2026</option></select></div>
          </div>
          <div style={{ fontSize: 12.5, color: "var(--ink-3)", display: "flex", gap: 7, alignItems: "center" }}><Icon name="info" size={14} /> DPP & pajak dihitung otomatis dari bukti potong terbit periode terkait.</div>
        </Modal>
      )}
    </div>
  );
}

// ---------- FLOW 5: Anggaran (RKAT) ----------
const RKAT = [
  { unit: "Fakultas Sains & Teknologi", pagu: 28400000000, realisasi: 19100000000, revisi: 1 },
  { unit: "Fakultas Ekonomi & Bisnis", pagu: 21800000000, realisasi: 14600000000, revisi: 0 },
  { unit: "LPPM (Riset & PkM)", pagu: 9600000000, realisasi: 5000000000, revisi: 2 },
  { unit: "Biro SDM (Gaji & Diklat)", pagu: 52200000000, realisasi: 38600000000, revisi: 0 },
  { unit: "PUSTIPANDA (TI)", pagu: 7400000000, realisasi: 4500000000, revisi: 1 },
  { unit: "BAU (Umum & RT)", pagu: 6100000000, realisasi: 4100000000, revisi: 0 },
];
function AkunAnggaran() {
  const toast = useToast();
  const [form, setForm] = useState(false);
  const tp = RKAT.reduce((s, r) => s + r.pagu, 0), tr = RKAT.reduce((s, r) => s + r.realisasi, 0);
  return (
    <div className="anim-in">
      <PageHead title="Anggaran vs Realisasi (RKAT)" desc="RKAT tahun anggaran 2026 per unit/cost center & sumber dana. Realisasi ter-update dari setiap pencairan."
        actions={<button className="btn btn-primary" onClick={() => setForm(true)}><Icon name="edit" size={15} /> Ajukan Revisi</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)", marginBottom: 14 }}>
        <div className="stat card" style={{ background: "var(--blue-bg)", border: "none" }}><div className="label" style={{ color: "var(--blue)" }}>Total Pagu 2026</div><div className="value" style={{ color: "var(--blue)", fontSize: 19 }}>{rpA(tp)}</div></div>
        <div className="stat card" style={{ background: "var(--green-bg)", border: "none" }}><div className="label" style={{ color: "var(--green)" }}>Realisasi YTD</div><div className="value" style={{ color: "var(--green)", fontSize: 19 }}>{rpA(tr)}</div></div>
        <div className="stat card" style={{ background: "var(--amber-bg)", border: "none" }}><div className="label" style={{ color: "#a6760e" }}>Serapan</div><div className="value" style={{ color: "#a6760e", fontSize: 19 }}>{Math.round(tr / tp * 100)}%</div></div>
      </div>
      <div className="card">
        <div className="card-head"><Icon name="chart" size={19} style={{ color: "var(--green)" }} /><h3>Per Unit / Cost Center</h3></div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Unit</th><th style={{ textAlign: "right" }}>Pagu</th><th style={{ textAlign: "right" }}>Realisasi</th><th style={{ textAlign: "right" }}>Sisa Pagu</th><th style={{ width: 150 }}>Serapan</th><th style={{ textAlign: "center" }}>Revisi</th></tr></thead>
            <tbody>
              {RKAT.map((r, i) => { const p = Math.round(r.realisasi / r.pagu * 100); return (
                <tr key={i}>
                  <td style={{ fontWeight: 700 }}>{r.unit}</td>
                  <td style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{rpA(r.pagu)}</td>
                  <td style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{rpA(r.realisasi)}</td>
                  <td style={{ textAlign: "right", fontFamily: "var(--mono)", color: "var(--ink-2)" }}>{rpA(r.pagu - r.realisasi)}</td>
                  <td><div className="prog"><i style={{ width: p + "%", background: p > 85 ? "var(--red)" : p > 60 ? "var(--green)" : "var(--blue)" }} /></div><div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 3 }}>{p}%</div></td>
                  <td style={{ textAlign: "center" }}>{r.revisi ? <Badge tone="amber">{r.revisi}×</Badge> : <span style={{ color: "var(--ink-3)" }}>—</span>}</td>
                </tr>); })}
            </tbody>
          </table>
        </div>
      </div>
      {form && (
        <Modal title="Ajukan Revisi Anggaran" subtitle="Persetujuan berjenjang: Kepala Biro → WR II" onClose={() => setForm(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(false)}>Batal</button>
            <button className="btn btn-primary" onClick={() => { setForm(false); toast("Revisi anggaran diajukan → Workflow persetujuan WR II", "ok"); }}><Icon name="check" size={15} /> Ajukan</button></>}>
          <div className="field"><label>Unit / Cost Center</label><select>{RKAT.map((r) => <option key={r.unit}>{r.unit}</option>)}</select></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field"><label>Jenis Revisi</label><select><option>Geser antar mata anggaran</option><option>Tambahan pagu</option><option>Pengurangan pagu</option></select></div>
            <div className="field"><label>Nominal (Rp)</label><input type="number" placeholder="cth. 250000000" /></div>
          </div>
          <div className="field" style={{ margin: 0 }}><label>Justifikasi (wajib)</label><textarea rows={2} placeholder="Alasan revisi anggaran…" /></div>
        </Modal>
      )}
    </div>
  );
}

// ---------- FLOW 5: Neraca Saldo ----------
function AkunNeraca() {
  const rows = COA.filter((c) => c.level === 2);
  const td = rows.filter((r) => r.n === "Debit").reduce((s, r) => s + r.saldo, 0);
  const tk = rows.filter((r) => r.n === "Kredit").reduce((s, r) => s + r.saldo, 0);
  return (
    <div className="anim-in">
      <PageHead title="Neraca Saldo (Trial Balance)" desc="Prasyarat closing: total debit = total kredit. Drill-down per akun ke buku besar." />
      <div className="card">
        <div className="card-head"><Icon name="scale" size={19} style={{ color: "var(--blue)" }} /><h3>Periode Juni 2026</h3>
          <Badge tone={td === tk ? "green" : "red"} dot style={{ marginLeft: "auto" }}>{td === tk ? "SEIMBANG ✓" : "SELISIH " + rpA(td - tk)}</Badge></div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Kode</th><th>Akun</th><th style={{ textAlign: "right" }}>Debit</th><th style={{ textAlign: "right" }}>Kredit</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.kode}>
                  <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{r.kode}</td>
                  <td style={{ fontWeight: 600 }}>{r.nama}</td>
                  <td style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{r.n === "Debit" ? rpA(r.saldo) : "—"}</td>
                  <td style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{r.n === "Kredit" ? rpA(r.saldo) : "—"}</td>
                </tr>
              ))}
              <tr style={{ background: "var(--surface-2)" }}>
                <td colSpan={2} style={{ fontWeight: 800 }}>TOTAL</td>
                <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 800 }}>{rpA(td)}</td>
                <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 800 }}>{rpA(tk)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------- FLOW 5: Laporan Keuangan PSAK ----------
function AkunLaporan() {
  const toast = useToast();
  const laporan = [
    ["Laporan Posisi Keuangan", "Neraca ber-Aset-Neto (ISAK 35)", "Terbit · TTE"],
    ["Laporan Penghasilan Komprehensif", "Pendapatan & beban periode", "Terbit · TTE"],
    ["Laporan Perubahan Aset Neto", "Dengan/tanpa pembatasan", "Terbit · TTE"],
    ["Laporan Arus Kas", "Metode langsung", "Draft"],
    ["CALK (Catatan atas LK)", "Kebijakan & rincian akun", "Draft"],
  ];
  return (
    <div className="anim-in">
      <PageHead title="Laporan Keuangan (PSAK / ISAK 35)" desc="Lima laporan wajib yayasan pendidikan, disahkan ber-TTE, tersedia untuk pimpinan & auditor."
        actions={<button className="btn btn-primary" onClick={() => toast("Generate laporan periode Juni → dokumen ber-TTE", "ok")}><Icon name="report" size={15} /> Generate Periode Juni</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 13 }}>
        {laporan.map(([n, d, s], i) => (
          <div key={i} className="card card-pad" style={{ display: "flex", gap: 13, alignItems: "flex-start" }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: s.includes("TTE") ? "var(--green-bg)" : "var(--amber-bg)", color: s.includes("TTE") ? "var(--green)" : "#a6760e", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="report" size={20} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 14 }}>{n}</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-3)", margin: "3px 0 8px" }}>{d}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Badge tone={s.includes("TTE") ? "green" : "amber"} dot>{s}</Badge>
                {s.includes("TTE") && <button className="btn btn-ghost btn-sm" onClick={() => toast("Unduh PDF ber-TTE")}><Icon name="download" size={13} /> PDF</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- FLOW 5: Tutup Buku ----------
function AkunClosing() {
  const toast = useToast();
  const [confirm, setConfirm] = useState(false);
  const [closed, setClosed] = useState(false);
  const checklist = [
    ["Rekonsiliasi bank & subledger selesai", true],
    ["Neraca saldo seimbang (Dr = Cr)", true],
    ["Panjar > 30 hari sudah ditindaklanjuti", true],
    ["Penyusutan aset terposting (ast)", true],
    ["SPT Masa bulan berjalan disiapkan", false],
  ];
  return (
    <div className="anim-in">
      <PageHead title="Penutupan Buku (Closing)" desc="Checklist → jurnal penutup ke Aset Neto → periode CLOSED (terkunci). Reopen butuh otorisasi ganda." />
      <div className="grid" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="check" size={19} style={{ color: "var(--green)" }} /><h3>Checklist Closing — Juni 2026</h3></div>
          <div>
            {checklist.map(([k, ok], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 22px", borderBottom: i < checklist.length - 1 ? "1px solid var(--line)" : "none" }}>
                <div style={{ width: 26, height: 26, borderRadius: 8, background: ok ? "var(--green-bg)" : "var(--amber-bg)", color: ok ? "var(--green)" : "#a6760e", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name={ok ? "check" : "clock"} size={15} /></div>
                <span style={{ fontWeight: 600, fontSize: 13.5, flex: 1 }}>{k}</span>
                <Badge tone={ok ? "green" : "amber"}>{ok ? "Selesai" : "Menunggu"}</Badge>
              </div>
            ))}
          </div>
          <div className="card-pad" style={{ borderTop: "1px solid var(--line)" }}>
            <button className="btn btn-primary" disabled={closed} style={{ width: "100%", opacity: closed ? .5 : 1 }} onClick={() => setConfirm(true)}>
              <Icon name="lock" size={16} /> {closed ? "Periode Juni CLOSED" : "Tutup Buku Periode Juni"}
            </button>
          </div>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="calendar" size={19} style={{ color: "var(--purple)" }} /><h3>Status Periode</h3></div>
          <div>
            {[["Apr 2026", "CLOSED"], ["Mei 2026", "CLOSED"], ["Jun 2026", closed ? "CLOSED" : "OPEN"], ["Jul 2026", "FUTURE"]].map(([p, s], i, arr) => (
              <div key={p} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 22px", borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none" }}>
                <span className="mono" style={{ fontWeight: 700, fontSize: 13, flex: 1 }}>{p}</span>
                <Badge tone={s === "CLOSED" ? "gray" : s === "OPEN" ? "green" : "blue"} dot={s === "OPEN"}>{s}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
      {confirm && (
        <Modal title="Tutup Buku Periode Juni 2026?" subtitle="acc.periode.ditutup → notifikasi seluruh unit" onClose={() => setConfirm(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setConfirm(false)}>Batal</button>
            <button className="btn btn-primary" onClick={() => { setClosed(true); setConfirm(false); toast("Jurnal penutup diposting ke Aset Neto → periode Juni CLOSED & terkunci", "ok"); }}><Icon name="lock" size={15} /> Ya, Tutup Buku</button></>}>
          <div style={{ display: "flex", gap: 12, padding: 14, background: "var(--amber-bg)", borderRadius: 12 }}>
            <Icon name="warn" size={22} style={{ color: "#a6760e", flexShrink: 0 }} />
            <div style={{ fontSize: 13.5, lineHeight: 1.6 }}>
              Setelah ditutup: jurnal penutup pendapatan/beban diposting ke <b>Aset Neto</b>, periode <b>terkunci</b> (tidak menerima jurnal baru), dan pembukaan kembali memerlukan <b>otorisasi ganda</b> (Kepala Biro + WR II).
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

Object.assign(window, { AkunCoA, AkunGL, AkunRekon, AkunAP, AkunPajak, AkunAnggaran, AkunNeraca, AkunLaporan, AkunClosing });
