// @ts-nocheck
const { React, useState, useEffect, useRef, Icon, useToast, Modal, Badge, PageHead, Barcode, ImgPlaceholder, rupiah, initials, StaffHero } = window as any;

// ============================================================
// AIS — View: Isi KRS (Kartu Rencana Studi)
// ============================================================

function toMin(t) { const [h, m] = t.trim().split(":").map(Number); return h * 60 + m; }
function bentrok(a, b) {
  if (a.hari !== b.hari) return false;
  const [a1, a2] = a.jam.split(" - ").map(toMin);
  const [b1, b2] = b.jam.split(" - ").map(toMin);
  return a1 < b2 && b1 < a2;
}

function KRS({ krsState, setKrsState }) {
  const D = window.AIS_DATA;
  const m = D.mahasiswa;
  const toast = useToast();
  const [confirm, setConfirm] = useState(false);
  const [detailMK, setDetailMK] = useState(null);

  const selected = krsState.selected;
  const selectedMK = D.tawaranMK.filter((mk) => selected.includes(mk.kode));
  const totalSKS = selectedMK.reduce((a, b) => a + b.sks, 0);
  const sisaSKS = m.sksMax - totalSKS;
  const locked = krsState.submitted; // setelah diajukan tidak bisa diubah

  function isBentrok(mk) {
    return selectedMK.some((s) => s.kode !== mk.kode && bentrok(s, mk));
  }

  function toggle(mk) {
    if (locked) return;
    if (selected.includes(mk.kode)) {
      setKrsState({ ...krsState, selected: selected.filter((k) => k !== mk.kode) });
      return;
    }
    if (totalSKS + mk.sks > m.sksMax) { toast(`Melebihi batas ${m.sksMax} SKS (IP ${m.ipk})`, "err"); return; }
    if (isBentrok(mk)) { toast(`Jadwal bentrok dengan mata kuliah lain`, "err"); return; }
    if (mk.terisi >= mk.kuota) { toast("Kuota kelas penuh", "err"); return; }
    setKrsState({ ...krsState, selected: [...selected, mk.kode] });
  }

  function ajukan() {
    setConfirm(false);
    setKrsState({ ...krsState, submitted: true, sks: totalSKS });
    toast("KRS diajukan. Menunggu validasi Dosen PA.");
  }
  function simulasiPA() {
    setKrsState({ ...krsState, approved: true });
    toast("Dosen PA menyetujui KRS Anda 🎉");
  }
  function reset() {
    setKrsState({ selected: [], submitted: false, approved: false, sks: 0 });
    toast("KRS dibatalkan, silakan isi ulang");
  }

  // Pre-checks
  const checks = [
    { ok: true, label: "Pembayaran UKT semester ini", val: "Lunas" },
    { ok: true, label: "Dosen Penasihat Akademik", val: m.dosenPA },
    { ok: true, label: "Periode pengisian KRS", val: "10 – 24 Jun 2026" },
    { ok: true, label: `Batas SKS (IP ${m.ipk})`, val: `${m.sksMax} SKS` },
  ];

  return (
    <div className="anim-in">
      <PageHead title="Isi KRS" desc={`Kartu Rencana Studi · ${m.tahunAjaran} · Semester ${m.semester}`}
        actions={krsState.approved ? <button className="btn btn-primary" onClick={() => toast("Mencetak KRS (PDF)")}><Icon name="print" size={16} /> Cetak KRS</button> : null} />

      {/* Status alur */}
      <div className="card" style={{ marginBottom: 22, padding: "18px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {[
            { t: "Syarat Terpenuhi", done: true },
            { t: "Pilih Mata Kuliah", done: locked },
            { t: "Diajukan", done: locked },
            { t: "Validasi Dosen PA", done: krsState.approved },
          ].map((s, i, arr) => (
            <React.Fragment key={i}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", display: "grid", placeItems: "center", flexShrink: 0, fontWeight: 800, fontSize: 13, background: s.done ? "var(--green)" : (i === (locked ? (krsState.approved ? 4 : 3) : 1) ? "var(--orange)" : "var(--surface-2)"), color: s.done || i === (locked ? (krsState.approved ? 4 : 3) : 1) ? "#fff" : "var(--ink-3)" }}>
                  {s.done ? <Icon name="check" size={16} /> : i + 1}
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: s.done ? "var(--ink)" : "var(--ink-3)", whiteSpace: "nowrap" }}>{s.t}</span>
              </div>
              {i < arr.length - 1 && <div style={{ flex: 1, height: 2, background: s.done ? "var(--green)" : "var(--line)", margin: "0 14px", borderRadius: 2 }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {krsState.approved ? (
        <KRSApproved selectedMK={selectedMK} totalSKS={totalSKS} reset={reset} />
      ) : (
        <div className="grid" style={{ gridTemplateColumns: "1fr 320px", alignItems: "start" }}>
          {/* Tabel penawaran */}
          <div className="card">
            <div className="card-head">
              <Icon name="book" size={19} style={{ color: "var(--orange)" }} />
              <h3>Penawaran Mata Kuliah</h3>
              <span className="sub">· Semester 5 — Teknik Informatika</span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="tbl">
                <thead><tr><th style={{ width: 44 }}></th><th>Mata Kuliah</th><th>SKS</th><th>Jadwal</th><th>Sisa</th><th></th></tr></thead>
                <tbody>
                  {D.tawaranMK.map((mk) => {
                    const on = selected.includes(mk.kode);
                    const conflict = !on && isBentrok(mk);
                    const full = mk.terisi >= mk.kuota;
                    const overSKS = !on && totalSKS + mk.sks > m.sksMax;
                    const disabled = locked || conflict || full || overSKS;
                    return (
                      <tr key={mk.kode} style={{ background: on ? "var(--orange-50)" : undefined, opacity: disabled && !on ? .55 : 1 }}>
                        <td>
                          <button onClick={() => toggle(mk)} disabled={locked || (!on && (conflict || full || overSKS))} style={{ width: 22, height: 22, borderRadius: 7, border: on ? "none" : "2px solid var(--line-2)", background: on ? "var(--orange)" : "#fff", cursor: locked ? "not-allowed" : "pointer", display: "grid", placeItems: "center", color: "#fff", padding: 0 }}>
                            {on && <Icon name="check" size={14} />}
                          </button>
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 7 }}>{mk.nama} {mk.wajib && <Badge tone="orange">Wajib</Badge>}</div>
                          <div style={{ fontSize: 12, color: "var(--ink-3)" }}><span className="mono">{mk.kode}</span> · Kelas {mk.kelas} · {mk.dosen}</div>
                          {conflict && <div style={{ fontSize: 11.5, color: "var(--red)", fontWeight: 600, marginTop: 3, display: "flex", alignItems: "center", gap: 4 }}><Icon name="warn" size={13} /> Bentrok jadwal</div>}
                        </td>
                        <td><span style={{ fontWeight: 700 }}>{mk.sks}</span></td>
                        <td style={{ fontSize: 12.5 }}><div style={{ fontWeight: 600 }}>{mk.hari}</div><div className="mono" style={{ color: "var(--ink-3)", fontSize: 11.5 }}>{mk.jam}</div></td>
                        <td><Badge tone={full ? "red" : mk.kuota - mk.terisi <= 5 ? "amber" : "green"}>{mk.kuota - mk.terisi}/{mk.kuota}</Badge></td>
                        <td><button className="btn btn-ghost btn-sm btn-icon-only" onClick={() => setDetailMK(mk)}><Icon name="info" size={16} /></button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Panel ringkasan */}
          <div className="grid" style={{ position: "sticky", top: 90 }}>
            {/* Pre-checks */}
            <div className="card card-pad">
              <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 12 }}>Syarat Pengisian KRS</div>
              <div style={{ display: "grid", gap: 10 }}>
                {checks.map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--green-bg)", color: "var(--green)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="check" size={13} /></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>{c.label}</div>
                      <div style={{ fontSize: 12.5, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SKS counter */}
            <div className="card card-pad">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                <span style={{ fontSize: 13.5, fontWeight: 700 }}>SKS Diambil</span>
                <span><b style={{ fontSize: 26, color: "var(--orange-600)" }}>{totalSKS}</b><span style={{ color: "var(--ink-3)", fontWeight: 700 }}> / {m.sksMax}</span></span>
              </div>
              <div className="prog" style={{ marginBottom: 8 }}><i style={{ width: `${(totalSKS / m.sksMax) * 100}%`, background: totalSKS > m.sksMax ? "var(--red)" : "linear-gradient(90deg, var(--orange), #e89b5a)", transition: "width .3s" }} /></div>
              <div style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 14 }}>{selectedMK.length} mata kuliah dipilih · sisa {sisaSKS} SKS</div>

              {locked ? (
                <div>
                  <div style={{ background: "var(--amber-bg)", borderRadius: 12, padding: "12px 14px", fontSize: 12.5, color: "#a6760e", display: "flex", gap: 9, marginBottom: 12 }}>
                    <Icon name="clock" size={17} style={{ flexShrink: 0 }} />
                    <span><b>Menunggu validasi</b> dari Dosen PA — {m.dosenPA}.</span>
                  </div>
                  <button className="btn btn-primary" style={{ width: "100%", marginBottom: 8 }} onClick={simulasiPA}><Icon name="check" size={16} /> Simulasikan Validasi PA</button>
                  <button className="btn btn-ghost btn-sm" style={{ width: "100%" }} onClick={reset}>Batalkan & Isi Ulang</button>
                </div>
              ) : (
                <button className="btn btn-primary" style={{ width: "100%" }} disabled={selectedMK.length === 0} onClick={() => setConfirm(true)}>
                  Ajukan KRS ke Dosen PA <Icon name="chevR" size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirm modal */}
      {confirm && (
        <Modal title="Ajukan KRS?" subtitle="Periksa kembali sebelum diajukan ke Dosen PA." onClose={() => setConfirm(false)}
          footer={<><button className="btn btn-ghost" onClick={() => setConfirm(false)}>Batal</button><button className="btn btn-primary" onClick={ajukan}><Icon name="check" size={16} /> Ya, Ajukan</button></>}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "var(--orange-50)", borderRadius: 12, marginBottom: 14 }}>
            <span style={{ fontWeight: 700 }}>{selectedMK.length} mata kuliah</span>
            <span style={{ fontWeight: 800, color: "var(--orange-600)" }}>{totalSKS} SKS</span>
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {selectedMK.map((mk) => (
              <div key={mk.kode} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5 }}>
                <Icon name="book" size={16} style={{ color: "var(--orange)" }} />
                <span style={{ fontWeight: 600, flex: 1 }}>{mk.nama}</span>
                <span className="mono" style={{ color: "var(--ink-3)", fontSize: 12 }}>{mk.hari} · {mk.jam}</span>
                <Badge tone="gray">{mk.sks} SKS</Badge>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 16, display: "flex", gap: 8 }}>
            <Icon name="info" size={16} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>Setelah diajukan, KRS tidak dapat diubah hingga divalidasi atau ditolak oleh Dosen PA.</span>
          </div>
        </Modal>
      )}

      {/* Detail MK modal */}
      {detailMK && (
        <Modal title={detailMK.nama} subtitle={`${detailMK.kode} · ${detailMK.sks} SKS · Kelas ${detailMK.kelas}`} onClose={() => setDetailMK(null)}
          footer={<button className="btn btn-ghost" onClick={() => setDetailMK(null)}>Tutup</button>}>
          <div style={{ display: "grid", gap: 2 }}>
            {[["Dosen Pengampu", detailMK.dosen], ["Hari", detailMK.hari], ["Waktu", detailMK.jam], ["Ruang", detailMK.ruang], ["Kuota", `${detailMK.terisi} / ${detailMK.kuota} terisi`], ["Sifat", detailMK.wajib ? "Wajib" : "Pilihan"]].map(([k, v], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid var(--line)", fontSize: 14 }}>
                <span style={{ color: "var(--ink-3)", fontWeight: 600 }}>{k}</span><span style={{ fontWeight: 700 }}>{v}</span>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}

function KRSApproved({ selectedMK, totalSKS, reset }) {
  const D = window.AIS_DATA, m = D.mahasiswa;
  return (
    <div className="grid">
      <div className="card" style={{ background: "var(--green-bg)", border: "1px solid #bfe3cd", padding: "18px 24px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 14, background: "var(--green)", color: "#fff", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="check" size={24} /></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: "#25543d" }}>KRS Disetujui Dosen PA</div>
          <div style={{ fontSize: 13, color: "#3f7556" }}>Mata kuliah Anda kini masuk ke absensi & penilaian. Selamat belajar!</div>
        </div>
        <Badge tone="green" dot>Tervalidasi</Badge>
      </div>

      <div className="card">
        <div className="card-head"><Icon name="doc" size={19} style={{ color: "var(--orange)" }} /><h3>Kartu Rencana Studi</h3>
          <span className="sub">· {m.tahunAjaran}</span>
          <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto" }} onClick={reset}>Isi Ulang</button>
        </div>
        <div className="card-pad" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, borderBottom: "1px solid var(--line)" }}>
          {[["Nama", m.nama], ["NIM", m.nim], ["Dosen PA", m.dosenPA], ["Total SKS", `${totalSKS} SKS`]].map(([k, v]) => (
            <div key={k}><div style={{ fontSize: 11.5, color: "var(--ink-3)", fontWeight: 600 }}>{k}</div><div style={{ fontWeight: 700, fontSize: 13.5 }}>{v}</div></div>
          ))}
        </div>
        <table className="tbl">
          <thead><tr><th>No</th><th>Kode</th><th>Mata Kuliah</th><th>SKS</th><th>Kelas</th><th>Jadwal</th><th>Ruang</th></tr></thead>
          <tbody>
            {selectedMK.map((mk, i) => (
              <tr key={mk.kode}>
                <td style={{ color: "var(--ink-3)" }}>{i + 1}</td>
                <td className="mono">{mk.kode}</td>
                <td style={{ fontWeight: 700 }}>{mk.nama}</td>
                <td>{mk.sks}</td>
                <td>{mk.kelas}</td>
                <td style={{ fontSize: 12.5 }}>{mk.hari}, <span className="mono">{mk.jam}</span></td>
                <td>{mk.ruang}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: 20, background: "var(--surface-2)" }}>
          <Barcode width={150} />
          <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>Dokumen ini sah dengan validasi barcode. Dicetak dari AIS — {m.nim}.</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { KRS });

export {};
