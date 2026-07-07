// ============================================================
// AIS — Views: Ajukan Permintaan (dipakai lintas peran/unit)
// Dua jalur: Permintaan Pembelian/PR → Pengadaan (ULP, service pcr)
//            Permintaan Barang Habis Pakai → Aset & Fasilitas (service ast)
// ============================================================
const UP_BHP_OPSI = ["Kertas HVS A4 80gr (Rim)", "Toner Printer HP 85A (Pcs)", "Spidol Whiteboard (Pcs)", "Cairan Pembersih Lantai (Liter)", "Sarung Tangan Lab Nitrile (Box)", "Tinta Printer Inkjet (Botol)"];

function UnitPermintaan({ role }) {
  const toast = useToast();
  const unitName = (window.AIS_ROLES.personas[role] || {}).unit || "Unit Pemohon";
  const [tab, setTab] = useState("pr");

  // ---- Permintaan Pembelian (PR → ULP) ----
  const [prList, setPrList] = useState([
    { no: "PR-2606-118", item: "Lisensi Antivirus Endpoint (50 seat)", jumlah: 1, est: 45000000, tgl: "18 Jun 2026", status: "diproses" },
    { no: "PR-2606-101", item: "Kursi Ergonomis Ruang Rapat (10 unit)", jumlah: 10, est: 18000000, tgl: "05 Jun 2026", status: "po" },
  ]);
  const [prForm, setPrForm] = useState(false);
  const [pf, setPf] = useState({ item: "", jumlah: 1, est: "", justifikasi: "" });
  function ajukanPR() {
    if (!pf.item.trim() || !pf.est) { toast("Nama barang/jasa & estimasi biaya wajib diisi"); return; }
    setPrList((l) => [{ no: "PR-2606-" + (119 + l.length), item: pf.item, jumlah: +pf.jumlah || 1, est: +pf.est, tgl: "24 Jun 2026", status: "diajukan" }, ...l]);
    setPrForm(false); setPf({ item: "", jumlah: 1, est: "", justifikasi: "" });
    toast("Permintaan pembelian terkirim ke Unit Layanan Pengadaan (ULP)", "ok");
  }
  const PR_ST = { diajukan: ["Diajukan", "amber"], diproses: ["Diproses ULP", "blue"], po: ["PO Diterbitkan", "green"], ditolak: ["Ditolak", "red"] };

  // ---- Permintaan Barang Habis Pakai (BHP → Aset) ----
  const [bhpList, setBhpList] = useState([
    { no: "PMB-0233", barang: "Kertas HVS A4 80gr (Rim)", jumlah: 8, keperluan: "Cetak berkas semester", tgl: "20 Jun 2026", status: "menunggu" },
  ]);
  const [bhpForm, setBhpForm] = useState(false);
  const [bf, setBf] = useState({ barang: UP_BHP_OPSI[0], jumlah: 1, keperluan: "" });
  function ajukanBHP() {
    if (!bf.keperluan.trim()) { toast("Keperluan wajib diisi"); return; }
    setBhpList((l) => [{ no: "PMB-02" + (34 + l.length), barang: bf.barang, jumlah: +bf.jumlah || 1, keperluan: bf.keperluan, tgl: "24 Jun 2026", status: "menunggu" }, ...l]);
    setBhpForm(false); setBf({ barang: UP_BHP_OPSI[0], jumlah: 1, keperluan: "" });
    toast("Permintaan barang terkirim ke Aset & Fasilitas (gudang)", "ok");
  }
  const BHP_ST = { menunggu: ["Menunggu Persetujuan", "amber"], disetujui: ["Disetujui", "blue"], didistribusikan: ["Didistribusikan", "green"] };

  return (
    <div className="anim-in">
      <PageHead title="Ajukan Permintaan" desc={"Ajukan kebutuhan pembelian ke Unit Layanan Pengadaan (ULP) atau permintaan barang habis pakai ke Aset & Fasilitas, atas nama " + unitName + "."} />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        <button className={"btn btn-sm " + (tab === "pr" ? "btn-soft" : "btn-ghost")} onClick={() => setTab("pr")}><Icon name="cart" size={14} /> Permintaan Pembelian (ke ULP)</button>
        <button className={"btn btn-sm " + (tab === "bhp" ? "btn-soft" : "btn-ghost")} onClick={() => setTab("bhp")}><Icon name="box" size={14} /> Barang Habis Pakai (ke Aset)</button>
      </div>

      {tab === "pr" ? (
        <div className="card">
          <div className="card-head"><Icon name="cart" size={19} style={{ color: "var(--amber)" }} /><h3>Permintaan Pembelian Saya</h3>
            <button className="btn btn-primary btn-sm" style={{ marginLeft: "auto" }} onClick={() => setPrForm(true)}><Icon name="plus" size={14} /> Ajukan Baru</button></div>
          <div style={{ overflowX: "auto" }}><table className="tbl">
            <thead><tr><th>No. PR</th><th>Barang / Jasa</th><th style={{ textAlign: "center" }}>Jumlah</th><th style={{ textAlign: "right" }}>Estimasi</th><th>Tanggal</th><th>Status</th></tr></thead>
            <tbody>{prList.map((x) => (<tr key={x.no}>
              <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{x.no}</td>
              <td style={{ fontWeight: 700 }}>{x.item}</td>
              <td style={{ textAlign: "center" }}>{x.jumlah}</td>
              <td style={{ textAlign: "right", fontFamily: "var(--mono)" }}>{"Rp " + x.est.toLocaleString("id")}</td>
              <td style={{ fontSize: 12.5 }}>{x.tgl}</td>
              <td><Badge tone={PR_ST[x.status][1]} dot>{PR_ST[x.status][0]}</Badge></td>
            </tr>))}</tbody>
          </table></div>
        </div>
      ) : (
        <div className="card">
          <div className="card-head"><Icon name="box" size={19} style={{ color: "var(--green)" }} /><h3>Permintaan Barang Habis Pakai Saya</h3>
            <button className="btn btn-primary btn-sm" style={{ marginLeft: "auto" }} onClick={() => setBhpForm(true)}><Icon name="plus" size={14} /> Ajukan Baru</button></div>
          <div style={{ overflowX: "auto" }}><table className="tbl">
            <thead><tr><th>No.</th><th>Barang</th><th style={{ textAlign: "center" }}>Jumlah</th><th>Keperluan</th><th>Tanggal</th><th>Status</th></tr></thead>
            <tbody>{bhpList.map((x) => (<tr key={x.no}>
              <td className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{x.no}</td>
              <td style={{ fontWeight: 700 }}>{x.barang}</td>
              <td style={{ textAlign: "center" }}>{x.jumlah}</td>
              <td style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{x.keperluan}</td>
              <td style={{ fontSize: 12.5 }}>{x.tgl}</td>
              <td><Badge tone={BHP_ST[x.status][1]} dot>{BHP_ST[x.status][0]}</Badge></td>
            </tr>))}</tbody>
          </table></div>
        </div>
      )}

      {prForm && (
        <Modal title="Ajukan Permintaan Pembelian (PR)" subtitle="Dikirim ke Unit Layanan Pengadaan (ULP)" onClose={() => setPrForm(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setPrForm(false)}>Batal</button><button className="btn btn-primary" onClick={ajukanPR}><Icon name="check" size={16} /> Kirim ke ULP</button></>}>
          <div className="field"><label>Nama Barang / Jasa <span style={{ color: "var(--red)" }}>*</span></label><input value={pf.item} onChange={(e) => setPf({ ...pf, item: e.target.value })} placeholder="cth. Laptop untuk staf baru" /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <div className="field"><label>Jumlah</label><input type="number" value={pf.jumlah} onChange={(e) => setPf({ ...pf, jumlah: e.target.value })} /></div>
            <div className="field"><label>Estimasi Biaya (Rp) <span style={{ color: "var(--red)" }}>*</span></label><input type="number" value={pf.est} onChange={(e) => setPf({ ...pf, est: e.target.value })} placeholder="0" /></div>
          </div>
          <div className="field"><label>Justifikasi Kebutuhan</label><textarea rows={2} value={pf.justifikasi} onChange={(e) => setPf({ ...pf, justifikasi: e.target.value })} placeholder="Alasan pengadaan…" /></div>
          <div style={{ fontSize: 11.5, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 6 }}><Icon name="info" size={13} /> ULP akan memproses menjadi Purchase Order setelah persetujuan anggaran.</div>
        </Modal>
      )}
      {bhpForm && (
        <Modal title="Ajukan Permintaan Barang Habis Pakai" subtitle="Dikirim ke Aset & Fasilitas (gudang)" onClose={() => setBhpForm(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setBhpForm(false)}>Batal</button><button className="btn btn-primary" onClick={ajukanBHP}><Icon name="check" size={16} /> Kirim ke Aset</button></>}>
          <div className="field"><label>Barang</label><select value={bf.barang} onChange={(e) => setBf({ ...bf, barang: e.target.value })}>{UP_BHP_OPSI.map((o) => <option key={o}>{o}</option>)}</select></div>
          <div className="field"><label>Jumlah</label><input type="number" value={bf.jumlah} onChange={(e) => setBf({ ...bf, jumlah: e.target.value })} /></div>
          <div className="field"><label>Keperluan <span style={{ color: "var(--red)" }}>*</span></label><input value={bf.keperluan} onChange={(e) => setBf({ ...bf, keperluan: e.target.value })} placeholder="cth. cetak berkas semester" /></div>
        </Modal>
      )}
    </div>
  );
}

Object.assign(window, { UnitPermintaan });
