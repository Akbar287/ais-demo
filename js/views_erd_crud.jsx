// ============================================================
// AIS — CRUD generik berbasis Kamus Data Level 4
// Untuk SETIAP entitas (453, termasuk transaksi): tabel data demo,
// form Create/Update yang me-render SEMUA field L4 sesuai tipe,
// dan Hapus dengan dialog konfirmasi.
// ============================================================

// ---------- pembangkit nilai contoh per field ----------
const CRUD_NAMA = ["Aisyah Nur Ramadhani", "Bayu Pratama", "Citra Lestari", "Dimas Hidayat", "Eka Permata"];
function crudSample(f, i, entNama) {
  const n = f.n.toLowerCase(), t = (f.t || "").toUpperCase();
  if (f.k === "PK") return 1001 + i;
  if (n === "uuid" || n.endsWith("_uuid")) return "e7b" + (100 + i) + "-4f2a-9c" + (10 + i);
  if (n.includes("nim")) return "112109100000" + (33 + i);
  if (n.includes("nidn") || n.includes("nip")) return "03120882" + (10 + i);
  if (n.includes("email")) return ["aisyah", "bayu", "citra", "dimas", "eka"][i % 5] + "@kampus.ac.id";
  if (n.includes("nama") || n.includes("name")) return n.includes("mata_kuliah") || n.includes("mk") ? ["Data Mining", "Basis Data", "Jaringan", "AI", "PBO"][i % 5] : CRUD_NAMA[i % 5];
  if (n.includes("telepon") || n.includes("phone") || n.includes("hp")) return "0812345678" + (10 + i);
  if (n.includes("status")) return ["aktif", "aktif", "menunggu", "selesai", "aktif"][i % 5];
  if (n.includes("kode")) return entNama.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 3) + "-" + (101 + i);
  if (n.includes("tahun")) return 2026;
  if (n.includes("semester")) return (i % 2) + 1;
  if (n.includes("sks")) return 3;
  if (n.includes("nilai") || n.includes("skor") || n.includes("bobot")) return (3 + (i % 2) * 0.5).toFixed(2);
  if (n.includes("jumlah") || n.includes("total") || n.includes("nominal") || n.includes("biaya") || n.includes("tarif") || n.includes("harga")) return (i + 1) * 1500000;
  if (t.includes("BOOL")) return i % 2 === 0;
  if (t.includes("TIMESTAMP") || t.includes("DATETIME")) return "2026-06-2" + (i % 8) + "T09:" + (10 + i) + ":00";
  if (t.includes("DATE")) return "2026-06-" + String(20 + (i % 8)).padStart(2, "0");
  if (t.includes("TIME")) return "0" + (8 + i) + ":30";
  if (t.includes("INT") || t.includes("NUMERIC") || t.includes("DECIMAL") || t.includes("BIGINT")) return (i + 1) * 10;
  if (t.includes("JSON")) return '{"key":"value"}';
  if (t === "TEXT") return "Catatan " + entNama.toLowerCase() + " ke-" + (i + 1) + ".";
  if (f.k === "FK") return 500 + i;
  return entNama.split(" ")[0] + " " + (i + 1);
}

function crudInputType(f) {
  const t = (f.t || "").toUpperCase(), n = f.n.toLowerCase();
  if (t.includes("BOOL")) return "checkbox";
  if (t.includes("TIMESTAMP") || t.includes("DATETIME")) return "datetime-local";
  if (t.includes("DATE")) return "date";
  if (t === "TIME") return "time";
  if (t.includes("INT") || t.includes("NUMERIC") || t.includes("DECIMAL") || n.includes("jumlah") || n.includes("nominal")) return "number";
  if (t === "TEXT" || t.includes("JSON")) return "textarea";
  if (n.includes("email")) return "email";
  return "text";
}

// kolom ringkas untuk tabel (maks 6 kolom pertama yang informatif)
function crudCols(fields) {
  const pk = fields.filter((f) => f.k === "PK");
  const rest = fields.filter((f) => f.k !== "PK" && !/created|updated|deleted/.test(f.n)).slice(0, 5);
  return [...pk.slice(0, 1), ...rest];
}

function EntityCrud({ ent, fields }) {
  const toast = useToast();
  const [rows, setRows] = useState(() => [0, 1, 2, 3, 4].map((i) => {
    const r = { __id: i };
    fields.forEach((f) => { r[f.n] = crudSample(f, i, ent.nama); });
    return r;
  }));
  const [form, setForm] = useState(null);   // {mode:'create'|'edit', data}
  const [del, setDel] = useState(null);     // row utk konfirmasi hapus
  const cols = crudCols(fields);
  const pkName = (fields.find((f) => f.k === "PK") || fields[0]).n;

  function openCreate() {
    const d = { __id: -1 };
    fields.forEach((f) => { d[f.n] = crudInputType(f) === "checkbox" ? false : ""; });
    d[pkName] = 1001 + rows.length;
    setForm({ mode: "create", data: d });
  }
  function save() {
    const d = form.data;
    // validasi field wajib
    const kosong = fields.filter((f) => f.w && f.k !== "PK" && (d[f.n] === "" || d[f.n] == null)).map((f) => f.n);
    if (kosong.length) { toast("Field wajib belum diisi: " + kosong.slice(0, 3).join(", ") + (kosong.length > 3 ? " +" + (kosong.length - 3) : "")); return; }
    if (form.mode === "create") {
      setRows((r) => [...r, { ...d, __id: Date.now() }]);
      toast("Record " + ent.nama + " dibuat", "ok");
    } else {
      setRows((r) => r.map((x) => x.__id === d.__id ? d : x));
      toast("Record diperbarui", "ok");
    }
    setForm(null);
  }
  function confirmDelete() {
    setRows((r) => r.filter((x) => x.__id !== del.__id));
    toast("Record " + (del[pkName] ?? "") + " dihapus (soft-delete + audit log)", "ok");
    setDel(null);
  }
  const fmt = (v) => v === true ? "✓" : v === false ? "—" : String(v ?? "");

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <Badge tone="gray">{rows.length} record demo</Badge>
        <Badge tone={ent.jenis === "Transaksi" ? "blue" : "purple"}>{ent.jenis}</Badge>
        <button className="btn btn-primary btn-sm" style={{ marginLeft: "auto" }} onClick={openCreate}><Icon name="plus" size={14} /> Tambah Record</button>
      </div>
      <div style={{ border: "1px solid var(--line)", borderRadius: 12, overflow: "auto", maxHeight: 320 }}>
        <table className="tbl">
          <thead><tr>{cols.map((c) => <th key={c.n}>{c.n}</th>)}<th style={{ width: 90 }}></th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.__id}>
                {cols.map((c, ci) => <td key={c.n} className={ci === 0 || crudInputType(c) === "number" ? "mono" : ""} style={{ fontSize: 12.5, fontWeight: ci === 1 ? 700 : 400, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{fmt(r[c.n])}</td>)}
                <td>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button className="btn btn-ghost btn-sm" title="Ubah" onClick={() => setForm({ mode: "edit", data: { ...r } })}><Icon name="edit" size={14} /></button>
                    <button className="btn btn-ghost btn-sm" title="Hapus" style={{ color: "var(--red)" }} onClick={() => setDel(r)}><Icon name="trash" size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {form && (
        <Modal wide title={(form.mode === "create" ? "Tambah" : "Ubah") + " — " + ent.nama} subtitle={"Semua " + fields.length + " field Level 4 · " + ent.kode} onClose={() => setForm(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(null)}>Batal</button>
            <button className="btn btn-primary" onClick={save}><Icon name="check" size={16} /> {form.mode === "create" ? "Simpan Record" : "Simpan Perubahan"}</button></>}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "4px 16px", maxHeight: 420, overflowY: "auto", paddingRight: 4 }}>
            {fields.map((f) => {
              const it = crudInputType(f);
              const dis = f.k === "PK" || /created_at|updated_at/.test(f.n);
              const label = (
                <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span className="mono" style={{ fontSize: 11.5 }}>{f.n}</span>
                  {f.w && <span style={{ color: "var(--red)" }}>*</span>}
                  {f.k && <Badge tone={f.k === "PK" ? "purple" : f.k === "FK" ? "blue" : "green"}>{f.k}</Badge>}
                  <span style={{ marginLeft: "auto", fontSize: 10, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>{f.t}{f.l ? "(" + f.l + ")" : ""}</span>
                </label>
              );
              const set = (v) => setForm((s) => ({ ...s, data: { ...s.data, [f.n]: v } }));
              return (
                <div key={f.n} className="field" style={{ marginBottom: 10 }}>
                  {label}
                  {it === "checkbox" ? (
                    <label style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 2px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                      <input type="checkbox" checked={!!form.data[f.n]} disabled={dis} onChange={(e) => set(e.target.checked)} style={{ width: 16, height: 16, accentColor: "var(--orange)" }} /> {form.data[f.n] ? "Ya" : "Tidak"}
                    </label>
                  ) : it === "textarea" ? (
                    <textarea rows={2} value={form.data[f.n]} disabled={dis} onChange={(e) => set(e.target.value)} />
                  ) : (
                    <input type={it} value={form.data[f.n]} disabled={dis} maxLength={f.l && !isNaN(+f.l) ? +f.l : undefined} onChange={(e) => set(e.target.value)} style={dis ? { background: "var(--surface-2)", color: "var(--ink-3)" } : undefined} />
                  )}
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 11.5, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}><Icon name="info" size={13} /> <span style={{ color: "var(--red)" }}>*</span> wajib diisi · PK & kolom audit terkunci otomatis · panjang maks sesuai kamus data</div>
        </Modal>
      )}

      {del && (
        <Modal title="Hapus Record?" subtitle={ent.nama + " · " + pkName + " = " + del[pkName]} onClose={() => setDel(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setDel(null)}>Batal</button>
            <button className="btn btn-primary" style={{ background: "var(--red)" }} onClick={confirmDelete}><Icon name="trash" size={15} /> Ya, Hapus</button></>}>
          <div style={{ display: "flex", gap: 12, padding: 14, background: "var(--red-bg)", borderRadius: 12, marginBottom: 12 }}>
            <Icon name="warn" size={22} style={{ color: "var(--red)", flexShrink: 0 }} />
            <div style={{ fontSize: 13.5, lineHeight: 1.55 }}>
              Tindakan ini akan menghapus record dari <b>{ent.nama}</b>. Penghapusan bersifat <b>soft-delete</b> (kolom <span className="mono" style={{ fontSize: 12 }}>deleted_at</span>) dan tercatat di Audit Log.
            </div>
          </div>
          <div style={{ fontSize: 12.5, color: "var(--ink-2)" }}>
            {crudCols(fields).slice(0, 3).map((c) => <div key={c.n} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--line)" }}><span className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{c.n}</span><b>{String(del[c.n])}</b></div>)}
          </div>
        </Modal>
      )}
    </div>
  );
}

Object.assign(window, { EntityCrud });
