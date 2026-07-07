/* eslint-disable */
// @ts-nocheck
// Generated from js/views_wisuda.jsx by scripts/port-js-ssot.mjs.
"use client";


import * as React from "react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Badge, Barcode, Icon, ImgPlaceholder } from "@/components/atoms";
import { Modal, PageHead } from "@/components/molecules";
import { useToast } from "@/components/organisms";
import { AIS_CONTENT } from "@/data/content";
import { AIS_ERD } from "@/data/erd";
import { AIS_EXP } from "@/data/exp";
import { AIS_ROLES } from "@/data/roles";
import { AIS_DATA } from "@/data/mock-data";
import { initials, rupiah } from "@/lib/format";
import { useSharedList } from "@/lib/sharedStore";

const window = { AIS_CONTENT, AIS_DATA, AIS_ERD, AIS_EXP, AIS_ROLES } as any;

// ============================================================
// AIS — Views: Pendaftaran Wisuda (mahasiswa) — Graduation Service
// ============================================================
function Wisuda() {
  const toast = useToast();
  const rupiah = window.AIS_DATA.rupiah || ((n) => "Rp " + n.toLocaleString("id"));
  const [step, setStep] = useState(0); // 0 syarat, 1 form, 2 selesai

  // Syarat kelulusan (terhubung beberapa service)
  const syarat = [
    { label: "SKS lulus ≥ 144", ok: true, val: "146 SKS", svc: "Assessment" },
    { label: "IPK ≥ 2.00", ok: true, val: "3,71", svc: "Assessment" },
    { label: "Tugas Akhir lulus sidang", ok: true, val: "Lulus · A", svc: "Thesis" },
    { label: "Bebas tanggungan keuangan", ok: true, val: "Lunas", svc: "Billing" },
    { label: "Bebas pinjaman perpustakaan", ok: true, val: "Tidak ada", svc: "Library" },
    { label: "Unggah karya ilmiah ke repositori", ok: false, val: "Belum diunggah", svc: "Library" },
  ];
  const semuaOk = syarat.every((s) => s.ok);

  return (
    <div className="anim-in">
      <PageHead title="Pendaftaran Wisuda" desc="Daftar wisuda periode ke-2 TA 2025/2026. Sistem memeriksa kelayakan otomatis dari beberapa layanan." />

      {/* Stepper */}
      <div className="card card-pad" style={{ marginBottom: 18, display: "flex", gap: 8, alignItems: "center" }}>
        {["Cek Syarat", "Isi Formulir", "Selesai"].map((l, i) => (
          <React.Fragment key={l}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 13, background: step >= i ? "var(--orange)" : "var(--surface-2)", color: step >= i ? "#fff" : "var(--ink-3)" }}>{step > i ? "✓" : i + 1}</div>
              <span style={{ fontWeight: 700, fontSize: 13.5, color: step >= i ? "var(--ink)" : "var(--ink-3)" }}>{l}</span>
            </div>
            {i < 2 && <div style={{ flex: 1, height: 2, background: step > i ? "var(--orange)" : "var(--line)" }} />}
          </React.Fragment>
        ))}
      </div>

      {step === 0 && (
        <div className="grid" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
          <div className="card" style={{ alignSelf: "start" }}>
            <div className="card-head"><Icon name="check" size={19} style={{ color: "var(--green)" }} /><h3>Syarat Kelulusan & Wisuda</h3></div>
            <div style={{ padding: "4px 0" }}>
              {syarat.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 24px", borderBottom: i < syarat.length - 1 ? "1px solid var(--line)" : "none" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", display: "grid", placeItems: "center", background: s.ok ? "var(--green-bg)" : "var(--amber-bg)", color: s.ok ? "var(--green)" : "#a6760e", flexShrink: 0 }}><Icon name={s.ok ? "check" : "warn"} size={16} /></div>
                  <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 13.5 }}>{s.label}</div><div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>Sumber: {s.svc} Service</div></div>
                  <Badge tone={s.ok ? "green" : "amber"} dot>{s.val}</Badge>
                </div>
              ))}
            </div>
          </div>
          <div className="card card-pad" style={{ alignSelf: "start" }}>
            <h3 style={{ margin: "0 0 6px", fontSize: 15 }}>Status Kelayakan</h3>
            <div style={{ textAlign: "center", padding: "18px 0" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", margin: "0 auto 12px", display: "grid", placeItems: "center", background: semuaOk ? "var(--green-bg)" : "var(--amber-bg)", color: semuaOk ? "var(--green)" : "#a6760e" }}><Icon name={semuaOk ? "grad" : "warn"} size={34} /></div>
              <div style={{ fontWeight: 800, fontSize: 16 }}>{semuaOk ? "Memenuhi Syarat" : "1 Syarat Belum Terpenuhi"}</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 4 }}>{semuaOk ? "Anda dapat melanjutkan pendaftaran." : "Unggah karya ilmiah ke repositori dahulu."}</div>
            </div>
            <button className="btn btn-primary" style={{ width: "100%" }} disabled={!semuaOk} onClick={() => setStep(1)}>Lanjut ke Formulir <Icon name="chevR" size={15} /></button>
            {!semuaOk && <button className="btn btn-soft" style={{ width: "100%", marginTop: 8 }} onClick={() => toast("Buka unggah repositori (Perpustakaan)")}>Unggah Karya Ilmiah</button>}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="card card-pad" style={{ maxWidth: 680 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16 }}>Formulir Pendaftaran Wisuda</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="field"><label>Nama (sesuai ijazah)</label><input defaultValue="Aisyah Nur Ramadhani" /></div>
            <div className="field"><label>Gelar</label><input defaultValue="S.Kom" /></div>
            <div className="field"><label>Ukuran Toga</label><select><option>S</option><option>M</option><option>L</option><option>XL</option></select></div>
            <div className="field"><label>Jumlah Tamu</label><select><option>1</option><option>2</option><option>3</option></select></div>
          </div>
          <div className="field"><label>Judul Tugas Akhir (untuk buku wisuda)</label><textarea rows={2} defaultValue="Optimasi Penjadwalan Kuliah dengan Algoritma Genetika" /></div>
          <div className="field" style={{ marginBottom: 18 }}><label>Biaya Wisuda</label><input disabled value="Rp 750.000 — tagihan otomatis dibuat di Billing" style={{ background: "var(--surface-2)" }} /></div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button className="btn btn-ghost" onClick={() => setStep(0)}>Kembali</button>
            <button className="btn btn-primary" onClick={() => { setStep(2); toast("Pendaftaran wisuda terkirim", "ok"); }}><Icon name="check" size={16} /> Daftar Wisuda</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="card card-pad" style={{ maxWidth: 560, textAlign: "center", padding: 40 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 18px", display: "grid", placeItems: "center", background: "var(--green-bg)", color: "var(--green)" }}><Icon name="grad" size={38} /></div>
          <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800 }}>Pendaftaran Berhasil 🎓</h2>
          <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.6, margin: "0 0 20px" }}>Anda terdaftar pada Wisuda Periode II TA 2025/2026. Tagihan biaya wisuda telah dibuat — selesaikan pembayaran sebelum 15 Juli 2026.</p>
          <div style={{ display: "inline-flex", gap: 8 }}><Badge tone="purple">No. Urut: W2-0451</Badge><Badge tone="amber" dot>Menunggu pembayaran</Badge></div>
        </div>
      )}
    </div>
  );
}

export { Wisuda };
