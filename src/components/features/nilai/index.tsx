import { useState } from "react";
import { Badge, Barcode, Icon } from "@/components/atoms";
import { Modal, PageHead } from "@/components/molecules";
import { useToast } from "@/components/organisms";
import { AIS_DATA } from "@/data/mock-data";

// ============================================================
// AIS — Views: Nilai/KHS/Transkrip & Perkuliahan/Kehadiran
// ============================================================

// Default pembobotan
const BOBOT = { formatif: 30, uts: 30, uas: 40 };
function nilaiAkhir(r) {
  if (r.uas == null) return null;
  return (r.formatif * BOBOT.formatif + r.uts * BOBOT.uts + r.uas * BOBOT.uas) / 100;
}

// ===================== NILAI =====================
function Nilai() {
  const D = AIS_DATA, m = D.mahasiswa;
  const toast = useToast();
  const [tab, setTab] = useState("semester");
  const [khsSem, setKhsSem] = useState(D.riwayatSemester.length);

  function khsData(semNo) {
    return D.riwayatSemester.find((s) => s.semester === semNo) || D.riwayatSemester[D.riwayatSemester.length - 1];
  }
  const allSem = [...D.riwayatSemester];

  return (
    <div className="anim-in">
      <PageHead title="Penilaian" desc="Lihat nilai per mata kuliah, Kartu Hasil Studi (KHS), dan transkrip akademik." />

      <div className="seg" style={{ marginBottom: 22 }}>
        <button className={tab === "semester" ? "on" : ""} onClick={() => setTab("semester")}>Nilai Semester Ini</button>
        <button className={tab === "khs" ? "on" : ""} onClick={() => setTab("khs")}>Kartu Hasil Studi</button>
        <button className={tab === "transkrip" ? "on" : ""} onClick={() => setTab("transkrip")}>Transkrip Akademik</button>
      </div>

      {/* ---- Nilai semester ini ---- */}
      {tab === "semester" && (
        <div className="card">
          <div className="card-head"><Icon name="presentation" size={19} style={{ color: "var(--orange)" }} /><h3>Nilai Berjalan — Semester {m.semester}</h3>
            <span className="badge amber" style={{ marginLeft: 8 }}>UAS belum dirilis</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="tbl">
              <thead><tr><th>Mata Kuliah</th><th>SKS</th><th>Formatif <span style={{ fontWeight: 400 }}>(30%)</span></th><th>UTS <span style={{ fontWeight: 400 }}>(30%)</span></th><th>UAS <span style={{ fontWeight: 400 }}>(40%)</span></th><th>Akhir</th><th>Huruf</th></tr></thead>
              <tbody>
                {D.nilaiSemester.map((r) => {
                  const akhir = nilaiAkhir(r);
                  const hf = akhir != null ? D.nilaiHuruf(akhir) : null;
                  return (
                    <tr key={r.kode}>
                      <td><div style={{ fontWeight: 700 }}>{r.nama}</div><div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{r.kode}</div></td>
                      <td>{r.sks}</td>
                      <td className="mono">{r.formatif}</td>
                      <td className="mono">{r.uts}</td>
                      <td>{r.uas == null ? <span style={{ color: "var(--ink-3)" }}>—</span> : <span className="mono">{r.uas}</span>}</td>
                      <td>{akhir == null ? <Badge tone="gray">Menunggu</Badge> : <span className="mono" style={{ fontWeight: 700 }}>{akhir.toFixed(1)}</span>}</td>
                      <td>{hf ? <Badge tone={hf.bobot >= 3 ? "green" : hf.bobot >= 2 ? "amber" : "red"}>{hf.huruf}</Badge> : <span style={{ color: "var(--ink-3)" }}>—</span>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ padding: "14px 24px", background: "var(--surface-2)", fontSize: 12.5, color: "var(--ink-3)", display: "flex", gap: 9, alignItems: "center" }}>
            <Icon name="info" size={16} /> Nilai akhir dihitung otomatis dengan pembobotan default (Formatif 30% · UTS 30% · UAS 40%). Nilai final muncul setelah dosen merilis UAS.
          </div>
        </div>
      )}

      {/* ---- KHS ---- */}
      {tab === "khs" && (() => {
        const data = khsData(khsSem);
        const rows = data.mk.map((mk) => ({ ...mk, ...D.nilaiHuruf(mk.nilai) }));
        return (
          <div className="card">
            <div className="card-head"><Icon name="doc" size={19} style={{ color: "var(--orange)" }} /><h3>Kartu Hasil Studi</h3>
              <select value={khsSem} onChange={(e) => setKhsSem(Number(e.target.value))} style={{ marginLeft: 8, padding: "7px 12px", border: "1px solid var(--line-2)", borderRadius: 10, fontFamily: "var(--sans)", fontWeight: 600, fontSize: 13, background: "var(--surface)" }}>
                {allSem.map((s) => <option key={s.semester} value={s.semester}>Semester {s.semester} — {s.tahun}</option>)}
              </select>
              <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => toast("Mencetak KHS Semester " + data.semester)}><Icon name="print" size={15} /> Cetak KHS</button>
            </div>
            <div style={{ display: "flex", gap: 14, padding: "18px 24px", borderBottom: "1px solid var(--line)" }}>
              <div className="stat" style={{ background: "var(--orange-50)", flex: 1, padding: "14px 18px", borderRadius: 14 }}>
                <div className="label" style={{ color: "var(--orange-600)" }}>IP Semester</div>
                <div className="value" style={{ color: "var(--orange-600)", fontSize: 26 }}>{data.ips.toFixed(2)}</div>
              </div>
              <div className="stat" style={{ background: "var(--blue-bg)", flex: 1, padding: "14px 18px", borderRadius: 14 }}>
                <div className="label" style={{ color: "var(--blue)" }}>SKS Semester</div>
                <div className="value" style={{ color: "var(--blue)", fontSize: 26 }}>{data.sks}</div>
              </div>
              <div className="stat" style={{ background: "var(--green-bg)", flex: 1, padding: "14px 18px", borderRadius: 14 }}>
                <div className="label" style={{ color: "var(--green)" }}>Mata Kuliah</div>
                <div className="value" style={{ color: "var(--green)", fontSize: 26 }}>{data.mk.length}</div>
              </div>
            </div>
            <table className="tbl">
              <thead><tr><th>Kode</th><th>Mata Kuliah</th><th>SKS</th><th>Nilai</th><th>Huruf</th><th>Bobot</th></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.kode}>
                    <td className="mono">{r.kode}</td>
                    <td style={{ fontWeight: 700 }}>{r.nama}</td>
                    <td>{r.sks}</td>
                    <td className="mono">{r.nilai}</td>
                    <td><Badge tone={r.bobot >= 3 ? "green" : r.bobot >= 2 ? "amber" : "red"}>{r.huruf}</Badge></td>
                    <td className="mono">{r.bobot.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })()}

      {/* ---- Transkrip ---- */}
      {tab === "transkrip" && (
        <div className="grid">
          <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
            {[
              { l: "IPK Kumulatif", v: m.ipk.toFixed(2), bg: "var(--orange-50)", c: "var(--orange-600)", ic: "grad" },
              { l: "Total SKS Lulus", v: m.sksLulus, bg: "var(--blue-bg)", c: "var(--blue)", ic: "book" },
              { l: "Semester Ditempuh", v: D.riwayatSemester.length, bg: "var(--purple-bg)", c: "var(--purple)", ic: "calendar" },
              { l: "Predikat", v: "Cumlaude", bg: "var(--green-bg)", c: "var(--green)", ic: "award", small: true },
            ].map((t) => (
              <div key={t.l} className="stat card" style={{ background: t.bg, border: "none" }}>
                <Icon name={t.ic} size={24} className="si" style={{ color: t.c }} />
                <div className="label" style={{ color: t.c }}>{t.l}</div>
                <div className="value" style={{ color: t.c, fontSize: t.small ? 22 : 32 }}>{t.v}</div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-head"><Icon name="doc" size={19} style={{ color: "var(--orange)" }} /><h3>Transkrip Akademik</h3>
              <span className="sub">· {m.nama} · {m.nim}</span>
              <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => toast("Mencetak transkrip akademik (PDF)")}><Icon name="print" size={15} /> Cetak Transkrip</button>
            </div>
            <div style={{ padding: "6px 0" }}>
              {D.riwayatSemester.map((s) => (
                <div key={s.semester}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 24px 8px", position: "sticky" }}>
                    <Badge tone="orange">Semester {s.semester}</Badge>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{s.tahun}</span>
                    <span style={{ marginLeft: "auto", fontSize: 12.5, color: "var(--ink-3)", fontWeight: 600 }}>IPS {s.ips.toFixed(2)} · {s.sks} SKS</span>
                  </div>
                  <table className="tbl">
                    <tbody>
                      {s.mk.map((mk) => {
                        const h = D.nilaiHuruf(mk.nilai);
                        return (
                          <tr key={mk.kode}>
                            <td className="mono" style={{ width: 90, color: "var(--ink-3)" }}>{mk.kode}</td>
                            <td style={{ fontWeight: 600 }}>{mk.nama}</td>
                            <td style={{ width: 60, color: "var(--ink-2)" }}>{mk.sks} SKS</td>
                            <td style={{ width: 70 }}><Badge tone={h.bobot >= 3 ? "green" : h.bobot >= 2 ? "amber" : "red"}>{h.huruf}</Badge></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: 20, background: "var(--surface-2)" }}>
              <Barcode width={150} />
              <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>Transkrip sah dengan validasi barcode. IPK Kumulatif {m.ipk.toFixed(2)} dari {m.sksLulus} SKS.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===================== PERKULIAHAN & KEHADIRAN =====================
function Perkuliahan() {
  const D = AIS_DATA;
  const toast = useToast();
  const [openMK, setOpenMK] = useState<(typeof D.mkAktif)[number] | null>(null);

  return (
    <div className="anim-in">
      <PageHead title="Aktivitas Perkuliahan" desc="Pantau kehadiran, unduh materi, dan lihat detail pertemuan tiap mata kuliah." />

      <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)", marginBottom: 22 }}>
        {(() => {
          const totHadir = D.mkAktif.reduce((a, b) => a + b.hadir, 0);
          const totAll = D.mkAktif.reduce((a, b) => a + b.total, 0);
          const totAlpha = D.mkAktif.reduce((a, b) => a + b.alpha, 0);
          return [
            { l: "Rata-rata Kehadiran", v: Math.round((totHadir / totAll) * 100) + "%", bg: "var(--green-bg)", c: "var(--green)", ic: "check" },
            { l: "Total Alpha", v: totAlpha + "×", bg: "var(--red-bg)", c: "var(--red)", ic: "warn" },
            { l: "Mata Kuliah Aktif", v: D.mkAktif.length, bg: "var(--blue-bg)", c: "var(--blue)", ic: "book" },
          ].map((t) => (
            <div key={t.l} className="stat card" style={{ background: t.bg, border: "none" }}>
              <Icon name={t.ic} size={24} className="si" style={{ color: t.c }} />
              <div className="label" style={{ color: t.c }}>{t.l}</div>
              <div className="value" style={{ color: t.c, fontSize: 30 }}>{t.v}</div>
            </div>
          ));
        })()}
      </div>

      <div className="grid" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
        {D.mkAktif.map((mk) => {
          const pct = Math.round((mk.hadir / mk.total) * 100);
          const warn = pct < 75;
          return (
            <div key={mk.kode} className="card card-pad">
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: "var(--orange-50)", color: "var(--orange)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="book" size={21} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14.5 }}>{mk.nama}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)" }}><span className="mono">{mk.kode}</span> · {mk.dosen}</div>
                </div>
                <Badge tone={warn ? "red" : "green"}>{pct}%</Badge>
              </div>
              <div className="prog" style={{ marginBottom: 12 }}><i style={{ width: pct + "%", background: warn ? "var(--red)" : "linear-gradient(90deg, var(--green), #5cb585)" }} /></div>
              <div style={{ display: "flex", gap: 14, fontSize: 12, marginBottom: 14 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span className="dot" style={{ background: "var(--green)" }} /> Hadir {mk.hadir}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span className="dot" style={{ background: "var(--amber)" }} /> Izin {mk.izin}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span className="dot" style={{ background: "var(--blue)" }} /> Sakit {mk.sakit}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span className="dot" style={{ background: "var(--red)" }} /> Alpha {mk.alpha}</span>
              </div>
              <button className="btn btn-ghost btn-sm" style={{ width: "100%" }} onClick={() => setOpenMK(mk)}>Lihat Detail Pertemuan <Icon name="chevR" size={15} /></button>
            </div>
          );
        })}
      </div>

      {openMK && (
        <Modal wide title={openMK.nama} subtitle={`${openMK.kode} · ${openMK.dosen} · ${openMK.hadir}/${openMK.total} pertemuan hadir`} onClose={() => setOpenMK(null)}
          footer={<button className="btn btn-ghost" onClick={() => setOpenMK(null)}>Tutup</button>}>
          <table className="tbl" style={{ border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden" }}>
            <thead><tr><th>Pert.</th><th>Tanggal</th><th>Topik / Materi</th><th>Status</th><th>Materi</th></tr></thead>
            <tbody>
              {D.pertemuan.map((p) => {
                const tone = p.status === "Hadir" ? "green" : p.status === "Alpha" ? "red" : p.status === "Izin" ? "amber" : p.status === "Sakit" ? "blue" : "gray";
                return (
                  <tr key={p.ke}>
                    <td style={{ fontWeight: 700, textAlign: "center", width: 50 }}>{p.ke}</td>
                    <td className="mono" style={{ fontSize: 12, whiteSpace: "nowrap" }}>{p.tanggal}</td>
                    <td style={{ fontWeight: 600 }}>{p.topik}</td>
                    <td><Badge tone={tone} dot>{p.status}</Badge></td>
                    <td>{p.materi ? <button className="btn btn-soft btn-sm btn-icon-only" title={p.materi} onClick={() => toast("Mengunduh " + p.materi)}><Icon name="download" size={15} /></button> : <span style={{ color: "var(--ink-3)", fontSize: 12 }}>—</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Modal>
      )}
    </div>
  );
}

export { Nilai, Perkuliahan };
