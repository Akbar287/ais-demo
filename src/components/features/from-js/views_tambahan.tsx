/* eslint-disable */
// @ts-nocheck
// Generated from js/views_tambahan.jsx by scripts/port-js-ssot.mjs.
"use client";


import * as React from "react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Badge, Barcode, Icon, ImgPlaceholder } from "@/components/atoms";
import { Modal, PageHead } from "@/components/molecules";
import { StaffHero, useToast } from "@/components/organisms";
import { AIS_CONTENT } from "@/data/content";
import { AIS_ERD } from "@/data/erd";
import { AIS_EXP } from "@/data/exp";
import { AIS_ROLES } from "@/data/roles";
import { AIS_DATA } from "@/data/mock-data";
import { initials, rupiah } from "@/lib/format";
import { useSharedList } from "@/lib/sharedStore";

const window = { AIS_CONTENT, AIS_DATA, AIS_ERD, AIS_EXP, AIS_ROLES } as any;

// ============================================================
// AIS — Views: Master UKT & Payment Gateway (Keuangan) +
// Role baru: Pimpinan, Akuntansi, Operator BAA, Operator PDDikti
// Sumber alur: uploads/Sequence-*.md
// ============================================================
const rupiahX = (n) => "Rp " + n.toLocaleString("id");

// ---------------- Master UKT (Keuangan) ----------------
const UKT_MASTER = [
  { gol: "I", kriteria: "Penghasilan ≤ Rp 2 jt", ti: 500000, si: 500000, te: 500000, mhs: 214 },
  { gol: "II", kriteria: "Rp 2–4 jt", ti: 4000000, si: 3750000, te: 3900000, mhs: 486 },
  { gol: "III", kriteria: "Rp 4–7 jt", ti: 5500000, si: 5250000, te: 5400000, mhs: 912 },
  { gol: "IV", kriteria: "Rp 7–12 jt", ti: 7500000, si: 7000000, te: 7300000, mhs: 1048 },
  { gol: "V", kriteria: "> Rp 12 jt", ti: 9000000, si: 8500000, te: 8800000, mhs: 554 },
];

function KeuUKT() {
  const toast = useToast();
  const [edit, setEdit] = useState(null);
  return (
    <div className="anim-in">
      <PageHead title="Master Tarif UKT" desc="Tarif UKT per golongan × program studi (Configuration & Master-Data Service). Perubahan tarif berlaku untuk pembuatan tagihan periode berikutnya."
        actions={<button className="btn btn-primary" onClick={() => toast("Form golongan baru dibuka")}><Icon name="plus" size={16} /> Tambah Golongan</button>} />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th style={{ textAlign: "center" }}>Gol.</th><th>Kriteria Penghasilan</th><th style={{ textAlign: "right" }}>Teknik Informatika</th><th style={{ textAlign: "right" }}>Sistem Informasi</th><th style={{ textAlign: "right" }}>Teknik Elektro</th><th style={{ textAlign: "center" }}>Mahasiswa</th><th></th></tr></thead>
            <tbody>
              {UKT_MASTER.map((u) => (
                <tr key={u.gol}>
                  <td style={{ textAlign: "center" }}><Badge tone="purple">Gol. {u.gol}</Badge></td>
                  <td style={{ color: "var(--ink-2)" }}>{u.kriteria}</td>
                  <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{rupiahX(u.ti)}</td>
                  <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{rupiahX(u.si)}</td>
                  <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{rupiahX(u.te)}</td>
                  <td style={{ textAlign: "center" }}>{u.mhs.toLocaleString("id")}</td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => setEdit(u)}><Icon name="edit" size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {edit && (
        <Modal title={"Ubah Tarif — Golongan " + edit.gol} subtitle={edit.kriteria} onClose={() => setEdit(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setEdit(null)}>Batal</button><button className="btn btn-primary" onClick={() => { setEdit(null); toast("Tarif UKT diperbarui — berlaku periode berikutnya", "ok"); }}><Icon name="check" size={16} /> Simpan</button></>}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div className="field"><label>Teknik Informatika</label><input type="number" defaultValue={edit.ti} /></div>
            <div className="field"><label>Sistem Informasi</label><input type="number" defaultValue={edit.si} /></div>
            <div className="field"><label>Teknik Elektro</label><input type="number" defaultValue={edit.te} /></div>
          </div>
          <div style={{ fontSize: 12.5, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 7 }}><Icon name="info" size={14} /> Perubahan dicatat di Audit Log & butuh persetujuan Workflow.</div>
        </Modal>
      )}
    </div>
  );
}

// ---------------- Payment Gateway (Keuangan) ----------------
const PG_CHANNELS = [
  { nama: "Virtual Account BSI", kode: "va_bsi", biaya: "Rp 2.500", status: "aktif", uptime: 99.9, trx: 1840 },
  { nama: "Virtual Account Mandiri", kode: "va_mandiri", biaya: "Rp 3.000", status: "aktif", uptime: 99.7, trx: 1211 },
  { nama: "Virtual Account BNI", kode: "va_bni", biaya: "Rp 3.000", status: "aktif", uptime: 99.8, trx: 864 },
  { nama: "QRIS", kode: "qris", biaya: "0,7%", status: "aktif", uptime: 99.5, trx: 655 },
  { nama: "Kartu Kredit / Debit", kode: "cc", biaya: "2,9% + 2rb", status: "nonaktif", uptime: 0, trx: 0 },
];
const PG_TRX = [
  { ref: "PG-260623-0912", via: "VA BSI", nim: "11210910000033", jumlah: 5500000, waktu: "23 Jun 09:12", status: "settlement" },
  { ref: "PG-260623-0846", via: "QRIS", nim: "11220910000091", jumlah: 3750000, waktu: "23 Jun 08:46", status: "settlement" },
  { ref: "PG-260623-0815", via: "VA Mandiri", nim: "11200910000018", jumlah: 8200000, waktu: "23 Jun 08:15", status: "pending" },
  { ref: "PG-260622-1722", via: "VA BNI", nim: "11220910000120", jumlah: 1000000, waktu: "22 Jun 17:22", status: "settlement" },
  { ref: "PG-260622-1544", via: "QRIS", nim: "11210910000061", jumlah: 5500000, waktu: "22 Jun 15:44", status: "expire" },
];
const PG_ST = { settlement: ["Settlement", "green"], pending: ["Pending", "amber"], expire: ["Kedaluwarsa", "red"] };

function KeuGateway() {
  const toast = useToast();
  const [trx, setTrx] = useState(PG_TRX.map((t) => ({ ...t })));
  const [sim, setSim] = useState(false);
  function simulate() {
    setTrx((l) => l.map((t) => t.status === "pending" ? { ...t, status: "settlement" } : t));
    toast("Webhook settlement diterima → PAYMENT_VALIDATED → status mahasiswa diperbarui", "ok");
  }
  return (
    <div className="anim-in">
      <PageHead title="Payment Gateway" desc="Integrasi kanal pembayaran (VA host-to-host, QRIS). Callback/webhook memicu event PAYMENT_VALIDATED ke Billing & Student Status."
        actions={<button className="btn btn-primary" onClick={simulate}><Icon name="refresh" size={16} /> Simulasi Callback</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 20 }}>
        {[["Kanal Aktif", PG_CHANNELS.filter((c) => c.status === "aktif").length + "/" + PG_CHANNELS.length, "green"], ["Transaksi Bulan Ini", "4.570", "blue"], ["Nilai Settlement", "Rp 17,7 M", "purple"], ["Success Rate", "98,2%", "amber"]].map(([l, v, t]) => (
          <div key={l} className="stat card" style={{ background: `var(--${t}-bg)`, border: "none" }}><div className="label" style={{ color: `var(--${t})` }}>{l}</div><div className="value" style={{ color: `var(--${t})`, fontSize: 24 }}>{v}</div></div>
        ))}
      </div>
      <div className="grid" style={{ gridTemplateColumns: "1fr 1.3fr" }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="wallet" size={19} style={{ color: "var(--blue)" }} /><h3>Kanal Pembayaran</h3></div>
          <div>
            {PG_CHANNELS.map((c, i) => (
              <div key={c.kode} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: i < PG_CHANNELS.length - 1 ? "1px solid var(--line)" : "none" }}>
                <span className="dot" style={{ background: c.status === "aktif" ? "var(--green)" : "var(--ink-3)", width: 9, height: 9 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5 }}>{c.nama}</div>
                  <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>biaya {c.biaya}{c.status === "aktif" ? " · uptime " + c.uptime + "%" : ""}</div>
                </div>
                <Badge tone={c.status === "aktif" ? "green" : "gray"} dot>{c.status === "aktif" ? "Aktif" : "Nonaktif"}</Badge>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="activity" size={19} style={{ color: "var(--green)" }} /><h3>Transaksi Terakhir</h3></div>
          <div style={{ overflowX: "auto" }}>
            <table className="tbl">
              <thead><tr><th>Ref</th><th>Kanal</th><th>NIM</th><th style={{ textAlign: "right" }}>Jumlah</th><th>Status</th></tr></thead>
              <tbody>
                {trx.map((t) => (
                  <tr key={t.ref}>
                    <td className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{t.ref}</td>
                    <td style={{ fontSize: 12.5 }}>{t.via}</td>
                    <td className="mono" style={{ fontSize: 11.5 }}>{t.nim}</td>
                    <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{rupiahX(t.jumlah)}</td>
                    <td><Badge tone={PG_ST[t.status][1]} dot>{PG_ST[t.status][0]}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------- AKUNTANSI (Sequence-Akuntansi) ----------------
const JURNAL = [
  { no: "JU-2606-041", tgl: "23 Jun", ket: "Penerimaan UKT via VA (batch)", debit: "Bank BSI", kredit: "Pendapatan UKT", nilai: 184500000, status: "posted" },
  { no: "JU-2606-040", tgl: "22 Jun", ket: "Pencairan hibah PDP a.n. B. Sutejo", debit: "Beban Penelitian", kredit: "Kas", nilai: 19500000, status: "posted" },
  { no: "JU-2606-039", tgl: "22 Jun", ket: "Pembayaran PO server (termin 1)", debit: "Aset Tetap", kredit: "Bank Mandiri", nilai: 199000000, status: "review" },
  { no: "JU-2606-038", tgl: "21 Jun", ket: "Gaji & tunjangan Juni (accrual)", debit: "Beban Gaji", kredit: "Utang Gaji", nilai: 3840000000, status: "posted" },
];
function AkunDashboard({ nav }) {
  const R = window.AIS_ROLES; const p = R.personas.akuntansi;
  const tiles = [
    { label: "Jurnal Bulan Ini", value: 214, meta: "3 menunggu review", ic: "scale", c: "var(--blue)", bg: "var(--blue-bg)" },
    { label: "Realisasi Anggaran", value: "68%", meta: "Rp 96 M dari Rp 141 M", ic: "chart", c: "var(--green)", bg: "var(--green-bg)" },
    { label: "Saldo Kas & Bank", value: "Rp 38,2 M", meta: "6 rekening", ic: "wallet", c: "var(--purple)", bg: "var(--purple-bg)", small: true },
    { label: "Tutup Buku", value: "Mei ✓", meta: "Juni berjalan", ic: "check", c: "var(--orange-600)", bg: "var(--orange-50)" },
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="akuntansi" sub="Jurnal umum, buku besar, realisasi anggaran, dan pelaporan keuangan (Accounting & Budget Service)."
        action={<button className="btn btn-primary" onClick={() => nav("akun_jurnal")}><Icon name="scale" size={17} /> Jurnal Umum</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 22 }}>
        {tiles.map((t) => (
          <div key={t.label} className="stat card" style={{ background: t.bg, border: "none" }}>
            <Icon name={t.ic} size={26} className="si" style={{ color: t.c }} />
            <div className="label" style={{ color: t.c }}>{t.label}</div>
            <div className="value" style={{ color: t.c, fontSize: t.small ? 23 : 30 }}>{t.value}</div>
            <div className="meta" style={{ color: t.c }}>{t.meta}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-head"><Icon name="chart" size={19} style={{ color: "var(--green)" }} /><h3>Realisasi per Mata Anggaran</h3></div>
        <div className="card-pad" style={{ display: "grid", gap: 14 }}>
          {[["Belanja Pegawai", 74, "blue"], ["Operasional Pendidikan", 66, "green"], ["Penelitian & PkM", 52, "purple"], ["Belanja Modal / Aset", 61, "amber"]].map(([l, v, t]) => (
            <div key={l}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}><span style={{ fontWeight: 600 }}>{l}</span><b>{v}%</b></div><div className="prog"><i style={{ width: v + "%", background: `var(--${t})` }} /></div></div>
          ))}
        </div>
      </div>
    </div>
  );
}
function AkunJurnal() {
  const toast = useToast();
  const [list, setList] = useState(JURNAL.map((j) => ({ ...j })));
  function post(no) { setList((l) => l.map((j) => j.no === no ? { ...j, status: "posted" } : j)); toast("Jurnal diposting ke buku besar", "ok"); }
  return (
    <div className="anim-in">
      <PageHead title="Jurnal Umum" desc="Entri jurnal otomatis dari event (pembayaran, payroll, PO) + entri manual. Posting memperbarui buku besar." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>No. Jurnal</th><th>Tgl</th><th>Keterangan</th><th>Debit</th><th>Kredit</th><th style={{ textAlign: "right" }}>Nilai</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map((j) => (
                <tr key={j.no}>
                  <td className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{j.no}</td>
                  <td style={{ fontSize: 13 }}>{j.tgl}</td>
                  <td style={{ fontWeight: 700, maxWidth: 240 }}>{j.ket}</td>
                  <td style={{ fontSize: 12.5 }}>{j.debit}</td>
                  <td style={{ fontSize: 12.5 }}>{j.kredit}</td>
                  <td style={{ textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700 }}>{rupiahX(j.nilai)}</td>
                  <td><Badge tone={j.status === "posted" ? "green" : "amber"} dot>{j.status === "posted" ? "Posted" : "Review"}</Badge></td>
                  <td>{j.status === "review" ? <button className="btn btn-soft btn-sm" onClick={() => post(j.no)}>Posting</button> : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>✓</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------- Chart helpers (pure CSS, no SVG/canvas) ----------------
function PimpBarChart({ data, unit }) {
  const max = Math.max(...data.map((d) => d.v));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 150, padding: "0 6px" }}>
      {data.map((d) => (
        <div key={d.l} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, height: "100%", justifyContent: "flex-end" }}>
          <b className="mono" style={{ fontSize: 11 }}>{d.v.toLocaleString("id")}{unit}</b>
          <div style={{ width: "100%", maxWidth: 34, height: (d.v / max * 100) + "%", minHeight: 4, borderRadius: "7px 7px 3px 3px", background: d.c || "var(--blue)" }} />
          <span style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{d.l}</span>
        </div>
      ))}
    </div>
  );
}
function PimpDonut({ segs, size = 148 }) {
  const total = segs.reduce((a, b) => a + b.v, 0);
  let acc = 0;
  const stops = segs.map((s) => { const from = acc / total * 100; acc += s.v; const to = acc / total * 100; return `${s.c} ${from}% ${to}%`; }).join(", ");
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <div style={{ width: size, height: size, borderRadius: "50%", background: `conic-gradient(${stops})`, flexShrink: 0, position: "relative" }}>
        <div style={{ position: "absolute", inset: size * 0.24, borderRadius: "50%", background: "var(--surface)", display: "grid", placeItems: "center", textAlign: "center" }}>
          <div><div className="mono" style={{ fontWeight: 800, fontSize: 17 }}>{total.toLocaleString("id")}</div><div style={{ fontSize: 9.5, color: "var(--ink-3)", fontWeight: 700 }}>TOTAL</div></div>
        </div>
      </div>
      <div style={{ display: "grid", gap: 9 }}>
        {segs.map((s) => (
          <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: s.c, flexShrink: 0 }} />
            <span style={{ fontWeight: 600, flex: 1 }}>{s.l}</span>
            <b className="mono">{Math.round(s.v / total * 100)}%</b>
          </div>
        ))}
      </div>
    </div>
  );
}
function PimpArea({ data, color = "var(--blue)" }) {
  const max = Math.max(...data.map((d) => d.v)), min = Math.min(...data.map((d) => d.v));
  const pts = data.map((d, i) => `${(i / (data.length - 1)) * 100}% ${100 - ((d.v - min) / (max - min || 1)) * 82}%`);
  const poly = `polygon(0% 100%, ${pts.join(", ")}, 100% 100%)`;
  return (
    <div style={{ position: "relative", height: 130 }}>
      <div style={{ position: "absolute", inset: 0, clipPath: poly, background: `linear-gradient(180deg, ${color}, transparent)`, opacity: 0.28 }} />
      <div style={{ display: "flex", justifyContent: "space-between", position: "absolute", inset: "0 0 -22px 0", alignItems: "flex-end" }}>
        {data.map((d) => (<div key={d.l} style={{ textAlign: "center", fontSize: 10.5, color: "var(--ink-3)", fontWeight: 600 }}>{d.l}</div>))}
      </div>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline fill="none" stroke={color.startsWith("var") ? "currentColor" : color} strokeWidth="1.6" vectorEffect="non-scaling-stroke"
          points={data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - ((d.v - min) / (max - min || 1)) * 82}`).join(" ")}
          style={{ color }} />
      </svg>
    </div>
  );
}
function PimpStacked({ segs }) {
  const total = segs.reduce((a, b) => a + b.v, 0);
  return (
    <div>
      <div style={{ display: "flex", height: 26, borderRadius: 8, overflow: "hidden" }}>
        {segs.map((s) => (<div key={s.l} style={{ width: (s.v / total * 100) + "%", background: s.c }} title={s.l} />))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px", marginTop: 10 }}>
        {segs.map((s) => (<div key={s.l} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}><span style={{ width: 9, height: 9, borderRadius: 3, background: s.c }} /><span style={{ color: "var(--ink-2)", fontWeight: 600 }}>{s.l}</span><b className="mono">{Math.round(s.v / total * 100)}%</b></div>))}
      </div>
    </div>
  );
}
function PimpGauge({ value, label, color = "var(--green)" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ width: 108, height: 108, borderRadius: "50%", background: `conic-gradient(${color} ${value * 3.6}deg, var(--surface-2) 0deg)`, display: "grid", placeItems: "center" }}>
        <div style={{ width: 82, height: 82, borderRadius: "50%", background: "var(--surface)", display: "grid", placeItems: "center" }}>
          <div className="mono" style={{ fontWeight: 800, fontSize: 19 }}>{value}%</div>
        </div>
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-2)", textAlign: "center" }}>{label}</span>
    </div>
  );
}
function PimpGroupBar({ groups, series }) {
  const max = Math.max(...groups.flatMap((g) => series.map((s) => g[s.k])));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 22, height: 140, padding: "0 4px" }}>
      {groups.map((g) => (
        <div key={g.l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 100 }}>
            {series.map((s) => (<div key={s.k} style={{ width: 16, height: (g[s.k] / max * 100) + "%", minHeight: 4, borderRadius: "4px 4px 2px 2px", background: s.c }} title={s.k} />))}
          </div>
          <span style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{g.l}</span>
        </div>
      ))}
    </div>
  );
}

// ---------------- PIMPINAN (Sequence-Pimpinan) — Executive Dashboard ----------------
function PimpDashboard({ nav }) {
  const kpi = [
    { label: "Mahasiswa Aktif", value: "12.480", delta: "+4,2%", up: true },
    { label: "Penerimaan YTD", value: "Rp 96,4 M", delta: "+8,1%", up: true },
    { label: "Kelulusan Tepat Waktu", value: "78%", delta: "+3 pt", up: true },
    { label: "Rasio Dosen:Mhs", value: "1 : 28", delta: "-2", up: false },
  ];
  const prodi = [["Teknik Informatika", 642, 3.42, "Unggul"], ["Sistem Informasi", 588, 3.38, "Baik Sekali"], ["Teknik Elektro", 414, 3.29, "Baik Sekali"], ["Ekonomi Syariah", 702, 3.35, "Unggul"]];
  const penerimaan = [{ l: "2022", v: 2210 }, { l: "2023", v: 2340 }, { l: "2024", v: 2480 }, { l: "2025", v: 2600 }, { l: "2026", v: 2710 }];
  const fakultas = [{ l: "Sains & Teknologi", v: 4740, c: "var(--blue)" }, { l: "Ekonomi & Bisnis", v: 2995, c: "var(--green)" }, { l: "Ilmu Sosial & Politik", v: 2245, c: "var(--purple)" }, { l: "Agama Islam", v: 1500, c: "var(--amber)" }, { l: "Kedokteran & Kesehatan", v: 1000, c: "var(--red)" }];
  const kas = [{ l: "Jan", v: 78 }, { l: "Feb", v: 82 }, { l: "Mar", v: 75 }, { l: "Apr", v: 90 }, { l: "Mei", v: 88 }, { l: "Jun", v: 96 }];
  const kepegawaian = [{ l: "PNS", v: 45, c: "var(--blue)" }, { l: "Dosen Tetap Non-PNS", v: 25, c: "var(--purple)" }, { l: "PPPK", v: 20, c: "var(--green)" }, { l: "Kontrak/Honorer", v: 10, c: "var(--amber)" }];
  const admisi = [{ l: "2024", pendaftar: 16200, diterima: 2900, registrasi: 2650 }, { l: "2025", pendaftar: 17300, diterima: 3050, registrasi: 2820 }, { l: "2026", pendaftar: 18400, diterima: 3100, registrasi: 2710 }];
  return (
    <div className="anim-in">
      <StaffHero persona={window.AIS_ROLES.personas.pimpinan} role="pimpinan" sub="Ringkasan eksekutif lintas unit — akademik, keuangan, SDM, dan mutu (read-only)."
        action={<button className="btn btn-primary" onClick={() => nav("pimp_search")}><Icon name="search" size={17} /> Pencarian Global</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(6,1fr)", gap: 10, marginBottom: 18 }}>
        {[["pimp_akademik", "Akademik", "grad", "var(--blue)"], ["pimp_keuangan", "Keuangan", "wallet", "var(--green)"], ["pimp_riset", "Riset & PkM", "beaker", "var(--purple)"], ["pimp_mutu", "Mutu", "shield", "var(--amber)"], ["pimp_sdm", "SDM", "idcard", "var(--red)"], ["pimp_persetujuan", "Persetujuan", "workflow", "var(--blue)"]].map(([id, l, ic, c]) => (
          <button key={id} className="card" onClick={() => nav(id)} style={{ padding: "16px 12px", cursor: "pointer", border: "1px solid var(--line)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, fontFamily: "var(--sans)", textAlign: "center" }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `color-mix(in srgb, ${c} 12%, #fff)`, color: c, display: "grid", placeItems: "center" }}><Icon name={ic} size={21} /></div>
            <span style={{ fontSize: 12.5, fontWeight: 700 }}>{l}</span>
          </button>
        ))}
      </div>

      <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 18 }}>
        {kpi.map((k) => (
          <div key={k.label} className="stat card">
            <div className="label">{k.label}</div>
            <div className="value" style={{ fontSize: 26 }}>{k.value}</div>
            <div className="meta" style={{ color: k.up ? "var(--green)" : "var(--red)", fontWeight: 700 }}>{k.delta} vs tahun lalu</div>
          </div>
        ))}
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr 1fr", marginBottom: 18 }}>
        <div className="card card-pad">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}><Icon name="chart" size={17} style={{ color: "var(--blue)" }} /><b style={{ fontSize: 13.5 }}>Penerimaan Mhs Baru / Tahun</b></div>
          <PimpBarChart data={penerimaan} unit="" />
        </div>
        <div className="card card-pad" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, alignSelf: "flex-start" }}><Icon name="chart" size={17} style={{ color: "var(--amber)" }} /><b style={{ fontSize: 13.5 }}>Capaian Renstra</b></div>
          <PimpGauge value={71} label="Realisasi Rencana Strategis 2026" color="var(--amber)" />
        </div>
        <div className="card card-pad" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, alignSelf: "flex-start" }}><Icon name="check" size={17} style={{ color: "var(--green)" }} /><b style={{ fontSize: 13.5 }}>Indeks Kepuasan Layanan</b></div>
          <PimpGauge value={84} label="Survei kepuasan sivitas (skala 100)" color="var(--green)" />
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: 18 }}>
        <div className="card card-pad">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}><Icon name="users" size={17} style={{ color: "var(--purple)" }} /><b style={{ fontSize: 13.5 }}>Komposisi Mahasiswa per Fakultas</b></div>
          <PimpDonut segs={fakultas} />
        </div>
        <div className="card card-pad">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}><Icon name="wallet" size={17} style={{ color: "var(--blue)" }} /><b style={{ fontSize: 13.5 }}>Tren Arus Kas Bulanan (Rp M)</b></div>
          <PimpArea data={kas} color="var(--blue)" />
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: 18 }}>
        <div className="card card-pad">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}><Icon name="idcard" size={17} style={{ color: "var(--amber)" }} /><b style={{ fontSize: 13.5 }}>Komposisi Kepegawaian</b></div>
          <PimpStacked segs={kepegawaian} />
        </div>
        <div className="card card-pad">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}><Icon name="clipboard" size={17} style={{ color: "var(--green)" }} /><b style={{ fontSize: 13.5 }}>Corong Admisi (ribuan)</b></div>
          <PimpGroupBar groups={admisi.map((a) => ({ l: a.l, pendaftar: a.pendaftar / 1000, diterima: a.diterima / 1000, registrasi: a.registrasi / 1000 }))}
            series={[{ k: "pendaftar", c: "var(--blue)" }, { k: "diterima", c: "var(--purple)" }, { k: "registrasi", c: "var(--green)" }]} />
          <div style={{ display: "flex", gap: 16, fontSize: 11.5, marginTop: 6, justifyContent: "center" }}>
            {[["Pendaftar", "var(--blue)"], ["Diterima", "var(--purple)"], ["Registrasi Ulang", "var(--green)"]].map(([l, c]) => (<span key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: c }} />{l}</span>))}
          </div>
        </div>
      </div>

      <div className="card card-pad" style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}><Icon name="chart" size={17} style={{ color: "var(--purple)" }} /><b style={{ fontSize: 13.5 }}>Realisasi Anggaran per Mata Belanja</b></div>
        <div style={{ display: "grid", gap: 14 }}>
          {[["Belanja Pegawai", 74, "var(--blue)"], ["Operasional Pendidikan", 66, "var(--green)"], ["Penelitian & PkM", 52, "var(--purple)"], ["Belanja Modal / Aset", 61, "var(--amber)"]].map(([l, v, c]) => (
            <div key={l}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}><span style={{ fontWeight: 600 }}>{l}</span><b className="mono">{v}%</b></div><div className="prog"><i style={{ width: v + "%", background: c }} /></div></div>
          ))}
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.3fr 1fr" }}>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="building" size={19} style={{ color: "var(--purple)" }} /><h3>Kinerja Program Studi</h3></div>
          <div style={{ overflowX: "auto" }}>
            <table className="tbl">
              <thead><tr><th>Prodi</th><th style={{ textAlign: "center" }}>Mhs Aktif</th><th style={{ textAlign: "center" }}>IPK Rata²</th><th>Akreditasi</th></tr></thead>
              <tbody>
                {prodi.map(([n, m, ipk, akr]) => (
                  <tr key={n}><td style={{ fontWeight: 700 }}>{n}</td><td style={{ textAlign: "center" }}>{m}</td><td style={{ textAlign: "center", fontFamily: "var(--mono)", fontWeight: 700 }}>{ipk}</td><td><Badge tone={akr === "Unggul" ? "green" : "blue"}>{akr}</Badge></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head"><Icon name="flag" size={19} style={{ color: "var(--red)" }} /><h3>Perlu Perhatian Pimpinan</h3></div>
          <div>
            {[["Reakreditasi Teknik Elektro", "Berlaku s.d. 2026 — siapkan borang", "red", "pimp_mutu"], ["Piutang > 60 hari Rp 620 jt", "64 mahasiswa, usulan kebijakan", "amber", "pimp_keuangan"], ["5 kontrak dosen berakhir ≤ 90 hari", "Keputusan perpanjangan SDM", "blue", "pimp_sdm"]].map(([t, d, tone, target], i, arr) => (
              <div key={i} onClick={() => nav(target)} style={{ display: "flex", gap: 12, padding: "13px 22px", borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none", cursor: "pointer" }}>
                <span className="dot" style={{ background: `var(--${tone})`, width: 9, height: 9, marginTop: 5 }} />
                <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 13.5 }}>{t}</div><div style={{ fontSize: 12, color: "var(--ink-3)" }}>{d}</div></div>
                <Icon name="chevR" size={15} style={{ color: "var(--ink-3)", alignSelf: "center" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------- PIMPINAN — Pencarian Global (lintas seluruh sistem) ----------------
function PimpSearch() {
  const [q, setQ] = useState("");
  const R = window.AIS_ROLES;
  const ERD = window.AIS_ERD;
  const term = q.trim().toLowerCase();

  const users = term ? R.users.filter((u) => (u.nama + u.username + u.role + u.unit).toLowerCase().includes(term)).slice(0, 8) : [];
  const services = term ? R.services.filter((s) => (s.nama + s.kode + s.domain + s.owner).toLowerCase().includes(term)).slice(0, 8) : [];
  const entities = term ? ERD.entities.filter((e) => (e.nama + e.kode + e.subjek).toLowerCase().includes(term)).slice(0, 8) : [];
  const modul = term ? R.modules.filter((m) => m.toLowerCase().includes(term)).slice(0, 8) : [];
  const menus = term ? Object.entries(R.navByRole).flatMap(([role, groups]) => groups.flatMap((g) => g.items.map((it) => ({ role, label: it.label, id: it.id })))).filter((m, i, arr) => (m.label.toLowerCase().includes(term)) && arr.findIndex((x) => x.label === m.label) === i).slice(0, 8) : [];

  const totalHits = users.length + services.length + entities.length + modul.length + menus.length;
  const sections = [
    { title: "Pengguna (IAM)", ic: "users", tone: "blue", rows: users.map((u) => ({ t: u.nama, s: u.username + " · " + u.role + " · " + u.unit, badge: u.status })) },
    { title: "Layanan / Microservice", ic: "server", tone: "purple", rows: services.map((s) => ({ t: s.nama, s: "kode: " + s.kode + " · domain " + s.domain + " · " + s.owner, badge: s.status === "up" ? "Up" : "Down" })) },
    { title: "Entitas Data (Kamus Data L4)", ic: "database", tone: "green", rows: entities.map((e) => ({ t: e.nama, s: e.kode + " · " + e.subjek, badge: e.jenis })) },
    { title: "Modul RBAC", ic: "sliders", tone: "amber", rows: modul.map((m) => ({ t: m, s: "Modul akses (matriks RBAC)", badge: null })) },
    { title: "Menu / Fitur Aplikasi", ic: "link", tone: "gray", rows: menus.map((m) => ({ t: m.label, s: "Peran: " + (R.roleMeta[m.role] ? R.roleMeta[m.role].label : m.role), badge: null })) },
  ].filter((s) => s.rows.length);

  return (
    <div className="anim-in">
      <PageHead title="Pencarian Global" desc="Cari informasi di seluruh lini sistem: pengguna, layanan/microservice, entitas data (Kamus Data), modul RBAC, dan menu aplikasi." />
      <div className="card card-pad" style={{ marginBottom: 18 }}>
        <div className="tb-search" style={{ margin: 0, maxWidth: 560 }}>
          <Icon name="search" size={17} />
          <input autoFocus placeholder="Ketik nama pengguna, layanan, entitas, modul, atau menu…" value={q} onChange={(e) => setQ(e.target.value)} style={{ fontSize: 15 }} />
        </div>
        {term && <div style={{ marginTop: 10, fontSize: 12.5, color: "var(--ink-3)" }}>{totalHits} hasil ditemukan untuk "{q}" di {sections.length} kategori</div>}
      </div>

      {!term ? (
        <div className="empty" style={{ padding: "60px 24px" }}><Icon name="search" size={34} style={{ color: "var(--ink-3)", marginBottom: 12 }} /><div style={{ color: "var(--ink-3)", fontSize: 13.5 }}>Mulai ketik untuk mencari lintas seluruh sistem — 34 layanan, 453 entitas data, {R.users.length}+ pengguna, dan seluruh menu {Object.keys(R.navByRole).length} peran.</div></div>
      ) : totalHits === 0 ? (
        <div className="empty" style={{ padding: "60px 24px" }}><Icon name="warn" size={30} style={{ color: "var(--ink-3)", marginBottom: 12 }} /><div style={{ color: "var(--ink-3)", fontSize: 13.5 }}>Tidak ada hasil untuk "{q}".</div></div>
      ) : (
        <div style={{ display: "grid", gap: 14 }}>
          {sections.map((sec) => (
            <div key={sec.title} className="card">
              <div className="card-head"><Icon name={sec.ic} size={18} style={{ color: `var(--${sec.tone})` }} /><h3>{sec.title}</h3><Badge tone="gray" style={{ marginLeft: "auto" }}>{sec.rows.length}</Badge></div>
              <div>
                {sec.rows.map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 22px", borderBottom: i < sec.rows.length - 1 ? "1px solid var(--line)" : "none" }}>
                    <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 700, fontSize: 13.5 }}>{r.t}</div><div style={{ fontSize: 12, color: "var(--ink-3)" }}>{r.s}</div></div>
                    {r.badge && <Badge tone={r.badge === "Aktif" || r.badge === "Up" ? "green" : "gray"} dot>{r.badge}</Badge>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------- OPERATOR BAA (Sequence-BAA) ----------------
function BaaDashboard({ nav }) {
  const R = window.AIS_ROLES; const p = R.personas.baa;
  const tiles = [
    { label: "Periode Aktif", value: "2025/2026-2", meta: "KRS 2026-1 dibuka", ic: "calendar", c: "var(--blue)", bg: "var(--blue-bg)", small: true },
    { label: "Mahasiswa Aktif", value: "12.480", meta: "seluruh prodi", ic: "users", c: "var(--green)", bg: "var(--green-bg)", small: true },
    { label: "Pengajuan Layanan", value: 17, meta: "cuti, aktif kembali, pindah", ic: "doc", c: "var(--amber)", bg: "var(--amber-bg)" },
    { label: "Terbit KHS", value: "98%", meta: "periode lalu", ic: "award", c: "var(--purple)", bg: "var(--purple-bg)" },
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="baa" sub="Kalender akademik, status mahasiswa (cuti/aktif/DO), dan layanan administrasi akademik terpusat."
        action={<button className="btn btn-primary" onClick={() => nav("baa_status")}><Icon name="userCheck" size={17} /> Layanan Status</button>} />
      <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 22 }}>
        {tiles.map((t) => (
          <div key={t.label} className="stat card" style={{ background: t.bg, border: "none" }}>
            <Icon name={t.ic} size={26} className="si" style={{ color: t.c }} />
            <div className="label" style={{ color: t.c }}>{t.label}</div>
            <div className="value" style={{ color: t.c, fontSize: t.small ? 22 : 30 }}>{t.value}</div>
            <div className="meta" style={{ color: t.c }}>{t.meta}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-head"><Icon name="calendar" size={19} style={{ color: "var(--blue)" }} /><h3>Kalender Akademik 2026/2027 Ganjil</h3><button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("baa_kalender")}>Kelola</button></div>
        <div>
          {[["Pengisian KRS", "15 Jun – 15 Jul 2026", "green"], ["Perkuliahan dimulai", "01 Sep 2026", "blue"], ["UTS", "20 – 31 Okt 2026", "gray"], ["UAS", "05 – 16 Jan 2027", "gray"]].map(([k, v, t], i, arr) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 22px", borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none" }}>
              <span className="dot" style={{ background: `var(--${t === "gray" ? "ink-3" : t})`, width: 9, height: 9 }} />
              <span style={{ flex: 1, fontWeight: 700, fontSize: 13.5 }}>{k}</span>
              <span className="mono" style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const BAA_STATUS = [
  { nim: "11220910000120", nama: "Eka Permata", jenis: "Cuti Akademik", alasan: "Ekonomi keluarga", status: "menunggu" },
  { nim: "11210910000098", nama: "Rizal Fathoni", jenis: "Aktif Kembali", alasan: "Selesai cuti 1 smt", status: "menunggu" },
  { nim: "11200910000077", nama: "Sinta Ayu", jenis: "Pindah Prodi", alasan: "TI → SI", status: "proses" },
  { nim: "11190910000041", nama: "Joko Prasetyo", jenis: "Pengunduran Diri", alasan: "Bekerja penuh waktu", status: "selesai" },
];
function BaaStatus() {
  const toast = useToast();
  const [list, setList] = useState(BAA_STATUS.map((x) => ({ ...x })));
  function act(nim, ok) { setList((l) => l.map((x) => x.nim === nim ? { ...x, status: ok ? "selesai" : "ditolak" } : x)); toast(ok ? "SK status diterbitkan → PDDikti & Billing diperbarui" : "Pengajuan dikembalikan", ok ? "ok" : ""); }
  const tone = { menunggu: ["Menunggu", "amber"], proses: ["Diproses", "blue"], selesai: ["Selesai", "green"], ditolak: ["Dikembalikan", "red"] };
  return (
    <div className="anim-in">
      <PageHead title="Layanan Status Mahasiswa" desc="Cuti, aktif kembali, pindah prodi, undur diri, dan DO — memicu SK + sinkron PDDikti (Student Status Service)." />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Mahasiswa</th><th>Jenis Layanan</th><th>Alasan</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map((x) => (
                <tr key={x.nim}>
                  <td><div style={{ fontWeight: 700 }}>{x.nama}</div><div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{x.nim}</div></td>
                  <td><Badge tone="blue">{x.jenis}</Badge></td>
                  <td style={{ color: "var(--ink-2)", fontSize: 13 }}>{x.alasan}</td>
                  <td><Badge tone={tone[x.status][1]} dot>{tone[x.status][0]}</Badge></td>
                  <td>{x.status === "menunggu" ? (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => act(x.nim, false)}>Tolak</button>
                      <button className="btn btn-soft btn-sm" onClick={() => act(x.nim, true)}><Icon name="check" size={13} /> Terbitkan SK</button>
                    </div>
                  ) : <span style={{ fontSize: 12, color: "var(--ink-3)" }}>—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
function BaaKalender() {
  const toast = useToast();
  const items = [
    ["Pengisian KRS", "15 Jun – 15 Jul 2026", "Terbit"], ["Masa Perwalian/Validasi", "16 – 25 Jul 2026", "Terbit"],
    ["Perkuliahan", "01 Sep – 19 Des 2026", "Terbit"], ["UTS", "20 – 31 Okt 2026", "Terbit"],
    ["UAS", "05 – 16 Jan 2027", "Draf"], ["Input Nilai", "05 – 26 Jan 2027", "Draf"], ["Yudisium & Wisuda II", "Feb 2027", "Draf"],
  ];
  return (
    <div className="anim-in">
      <PageHead title="Kalender Akademik" desc="Tahapan kegiatan akademik per periode — dipakai lintas service (KRS, kelas, penilaian)."
        actions={<button className="btn btn-primary" onClick={() => toast("Tahapan baru ditambahkan")}><Icon name="plus" size={16} /> Tambah Tahapan</button>} />
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Tahapan</th><th>Rentang</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {items.map(([k, v, s]) => (
                <tr key={k}><td style={{ fontWeight: 700 }}>{k}</td><td className="mono" style={{ fontSize: 12.5 }}>{v}</td><td><Badge tone={s === "Terbit" ? "green" : "amber"} dot>{s}</Badge></td><td><button className="btn btn-ghost btn-sm"><Icon name="edit" size={14} /></button></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------- OPERATOR PDDIKTI (Sequence-Operator-PDDikti) ----------------
function FdrOpDashboard({ nav }) {
  const R = window.AIS_ROLES; const p = R.personas.pddikti;
  const tiles = [
    { label: "Sinkron Terakhir", value: "09:58", meta: "hari ini · sukses", ic: "refresh", c: "var(--green)", bg: "var(--green-bg)" },
    { label: "Antrian Push", value: 71, meta: "record menunggu", ic: "upload", c: "var(--amber)", bg: "var(--amber-bg)" },
    { label: "Ditolak Validasi", value: 12, meta: "perlu perbaikan data", ic: "flag", c: "var(--red)", bg: "var(--red-bg)" },
    { label: "Kelengkapan", value: "98,7%", meta: "periode 2025-2", ic: "check", c: "var(--blue)", bg: "var(--blue-bg)" },
  ];
  return (
    <div className="anim-in">
      <StaffHero persona={p} role="pddikti" sub="Sinkronisasi Neo Feeder: mahasiswa, AKM, nilai, dosen — validasi & perbaikan data tolakan."
        action={<button className="btn btn-primary" onClick={() => nav("fdr_sync")}><Icon name="refresh" size={17} /> Sinkronisasi</button>} />
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
      <div className="card">
        <div className="card-head"><Icon name="flag" size={19} style={{ color: "var(--red)" }} /><h3>Record Ditolak Neo Feeder</h3></div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Jenis</th><th>Identitas</th><th>Alasan Tolakan</th><th></th></tr></thead>
            <tbody>
              {[["Nilai", "TIF6103 · 11210910000033", "Bobot nilai di luar skala prodi"], ["Mahasiswa", "11220910000155", "NIK tidak valid (Dukcapil)"], ["AKM", "11200910000018 · 2025-2", "SKS total melebihi batas 24"]].map(([j, id, a], i) => (
                <tr key={i}><td><Badge tone="gray">{j}</Badge></td><td className="mono" style={{ fontSize: 12 }}>{id}</td><td style={{ color: "var(--ink-2)", fontSize: 13 }}>{a}</td><td><button className="btn btn-soft btn-sm">Perbaiki</button></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export { KeuUKT, KeuGateway, AkunDashboard, AkunJurnal, PimpDashboard, PimpSearch, PimpBarChart, PimpDonut, PimpArea, PimpStacked, PimpGauge, BaaDashboard, BaaStatus, BaaKalender, FdrOpDashboard };
