/* eslint-disable */
// @ts-nocheck
// Generated from js/views_humas_crud.jsx by scripts/port-js-ssot.mjs.
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
// AIS — Humas CRUD: Berita, Event/Agenda, Kategori
// Semua memakai shared store (useSharedList) yang men-seed dari
// window.AIS_CONTENT, sehingga perubahan langsung tercermin di
// halaman publik Berita & Agenda (views_publik.jsx).
// Store keys: content_berita · content_events · content_kat_berita · content_kat_event
// ============================================================
const HMS_GRAD = {
  blue: "linear-gradient(135deg,#1a4b8c,#2d7dd2)", green: "linear-gradient(135deg,#1b7340,#34d399)",
  purple: "linear-gradient(135deg,#6d28d9,#a78bfa)", orange: "linear-gradient(135deg,#c2410c,#fb923c)",
  red: "linear-gradient(135deg,#9f1239,#fb7185)", teal: "linear-gradient(135deg,#0f766e,#2dd4bf)",
  slate: "linear-gradient(135deg,#0f172a,#475569)", gold: "linear-gradient(135deg,#a16207,#fbbf24)",
};
const HMS_TONES = ["blue", "green", "purple", "orange", "red", "amber", "teal", "gray"];
const hmsKatBeritaSeed = () => Object.entries(window.AIS_CONTENT.KAT_TONE).map(([nama, tone]) => ({ nama, tone }));
const hmsKatEventSeed = () => Object.entries(window.AIS_CONTENT.EVT_TONE).map(([nama, tone]) => ({ nama, tone }));
const hmsSlug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || ("item-" + Date.now());

// ---------------- BERITA (CRUD penuh) ----------------
function HumasBerita() {
  const toast = useToast();
  const [rows, setRows] = useSharedList("content_berita", window.AIS_CONTENT.berita.slice());
  const [kat] = useSharedList("content_kat_berita", hmsKatBeritaSeed());
  const [q, setQ] = useState("");
  const [fk, setFk] = useState("Semua");
  const [form, setForm] = useState(null);
  const [del, setDel] = useState(null);
  const katNames = kat.map((k) => k.nama);
  const toneOf = (n) => (kat.find((k) => k.nama === n) || {}).tone || "gray";
  const blank = { judul: "", kategori: katNames[0] || "Pengumuman", ringkas: "", isi: "", img: "blue", status: "Draf", tags: "" };
  const list = rows.filter((b) => (fk === "Semua" || b.kategori === fk) && (b.judul.toLowerCase().includes(q.toLowerCase()) || (b.ringkas || "").toLowerCase().includes(q.toLowerCase())));

  function save() {
    const d = form.data;
    if (!d.judul.trim() || !d.ringkas.trim()) { toast("Judul & ringkasan wajib diisi"); return; }
    const body = d.isi.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean);
    const tags = d.tags.split(",").map((t) => t.trim()).filter(Boolean);
    if (form.mode === "create") {
      setRows((l) => [{
        id: hmsSlug(d.judul), judul: d.judul, ringkas: d.ringkas, kategori: d.kategori,
        tgl: "05 Jul 2026", iso: "2026-07-05", penulis: "Humas ITI", baca: Math.max(1, Math.round(body.join(" ").length / 900)),
        views: 0, img: HMS_GRAD[d.img], status: d.status, tags: tags.length ? tags : [d.kategori], body: body.length ? body : [d.ringkas],
      }, ...l]);
      toast(d.status === "Terbit" ? "Berita diterbitkan & tampil di portal publik" : "Berita disimpan sebagai " + d.status, "ok");
    } else {
      setRows((l) => l.map((x) => x.id === d.id ? { ...x, judul: d.judul, ringkas: d.ringkas, kategori: d.kategori, status: d.status, img: HMS_GRAD[d.img] || x.img, tags: tags.length ? tags : x.tags, body: body.length ? body : x.body } : x));
      toast("Berita diperbarui", "ok");
    }
    setForm(null);
  }
  function openEdit(b) {
    const imgKey = Object.keys(HMS_GRAD).find((k) => HMS_GRAD[k] === b.img) || "blue";
    setForm({ mode: "edit", data: { id: b.id, judul: b.judul, kategori: b.kategori, ringkas: b.ringkas, isi: (b.body || []).join("\n\n"), img: imgKey, status: b.status, tags: (b.tags || []).join(", ") } });
  }
  const STONE = { Terbit: "green", Review: "amber", Draf: "gray" };

  return (
    <div className="anim-in">
      <PageHead title="Berita & Artikel" desc="Kelola konten berita (draft → review → terbit). Berita berstatus Terbit langsung tampil di halaman publik."
        actions={<button className="btn btn-primary" onClick={() => setForm({ mode: "create", data: { ...blank } })}><Icon name="plus" size={16} /> Tulis Berita</button>} />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <div className="tb-search" style={{ margin: 0, width: 280 }}><Icon name="search" size={16} /><input placeholder="Cari berita…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <div className="seg">{["Semua", ...katNames].slice(0, 6).map((k) => <button key={k} className={fk === k ? "on" : ""} onClick={() => setFk(k)}>{k}</button>)}</div>
        <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--ink-3)" }}>{list.length} berita</span>
      </div>
      <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th style={{ width: 54 }}></th><th>Judul</th><th>Kategori</th><th>Tanggal</th><th style={{ textAlign: "center" }}>Dibaca</th><th>Status</th><th></th></tr></thead>
        <tbody>{list.map((b) => (
          <tr key={b.id}>
            <td><div style={{ width: 38, height: 38, borderRadius: 9, background: b.img }} /></td>
            <td style={{ fontWeight: 700, maxWidth: 320 }}>{b.judul}</td>
            <td><Badge tone={toneOf(b.kategori)}>{b.kategori}</Badge></td>
            <td style={{ fontSize: 12.5 }}>{b.tgl}</td>
            <td style={{ textAlign: "center", fontFamily: "var(--mono)" }}>{(b.views || 0).toLocaleString("id")}</td>
            <td><Badge tone={STONE[b.status] || "gray"} dot>{b.status}</Badge></td>
            <td><div style={{ display: "flex", gap: 4 }}>
              {b.status !== "Terbit" && <button className="btn btn-ghost btn-sm" title="Terbitkan" onClick={() => { setRows((l) => l.map((x) => x.id === b.id ? { ...x, status: "Terbit" } : x)); toast("Berita diterbitkan", "ok"); }}><Icon name="check" size={14} style={{ color: "var(--green)" }} /></button>}
              <button className="btn btn-ghost btn-sm" title="Ubah" onClick={() => openEdit(b)}><Icon name="edit" size={14} /></button>
              <button className="btn btn-ghost btn-sm" title="Hapus" style={{ color: "var(--red)" }} onClick={() => setDel(b)}><Icon name="trash" size={14} /></button>
            </div></td>
          </tr>
        ))}</tbody>
      </table></div></div>

      {form && (
        <Modal wide title={form.mode === "create" ? "Tulis Berita" : "Ubah Berita"} subtitle="26.1.2 · Berita / Konten" onClose={() => setForm(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(null)}>Batal</button><button className="btn btn-primary" onClick={save}><Icon name="check" size={16} /> {form.mode === "create" ? "Simpan Berita" : "Simpan Perubahan"}</button></>}>
          <div className="field"><label>Judul <span style={{ color: "var(--red)" }}>*</span></label><input value={form.data.judul} autoFocus onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, judul: e.target.value } }))} placeholder="Judul berita" /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <div className="field"><label>Kategori</label><select value={form.data.kategori} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, kategori: e.target.value } }))}>{katNames.map((k) => <option key={k}>{k}</option>)}</select></div>
            <div className="field"><label>Status</label><select value={form.data.status} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, status: e.target.value } }))}><option>Draf</option><option>Review</option><option>Terbit</option></select></div>
          </div>
          <div className="field"><label>Ringkasan <span style={{ color: "var(--red)" }}>*</span></label><textarea rows={2} value={form.data.ringkas} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, ringkas: e.target.value } }))} placeholder="Ringkasan singkat (tampil di kartu & meta)" /></div>
          <div className="field"><label>Isi Berita <span style={{ fontSize: 11, color: "var(--ink-3)" }}>(pisahkan paragraf dengan baris kosong)</span></label><textarea rows={5} value={form.data.isi} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, isi: e.target.value } }))} placeholder={"Paragraf pertama…\n\nParagraf kedua…"} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <div className="field"><label>Tag <span style={{ fontSize: 11, color: "var(--ink-3)" }}>(pisahkan koma)</span></label><input value={form.data.tags} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, tags: e.target.value } }))} placeholder="cth. Prestasi, Riset" /></div>
            <div className="field"><label>Warna Banner</label>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 4 }}>
                {Object.keys(HMS_GRAD).map((k) => (<button key={k} type="button" onClick={() => setForm((s) => ({ ...s, data: { ...s.data, img: k } }))} title={k} style={{ width: 30, height: 30, borderRadius: 8, background: HMS_GRAD[k], border: form.data.img === k ? "2.5px solid var(--ink)" : "2.5px solid transparent", cursor: "pointer" }} />))}
              </div>
            </div>
          </div>
        </Modal>
      )}
      {del && (
        <Modal title="Hapus Berita?" subtitle={del.judul} onClose={() => setDel(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setDel(null)}>Batal</button><button className="btn btn-primary" style={{ background: "var(--red)" }} onClick={() => { setRows((l) => l.filter((x) => x.id !== del.id)); toast("Berita dihapus", "ok"); setDel(null); }}><Icon name="trash" size={15} /> Ya, Hapus</button></>}>
          <div style={{ display: "flex", gap: 12, padding: 14, background: "var(--red-bg)", borderRadius: 12 }}><Icon name="warn" size={22} style={{ color: "var(--red)", flexShrink: 0 }} /><div style={{ fontSize: 13.5, lineHeight: 1.55 }}>Menghapus <b>{del.judul}</b> juga menghapusnya dari halaman publik. Tindakan ini tidak dapat dibatalkan.</div></div>
        </Modal>
      )}
    </div>
  );
}

// ---------------- EVENT / AGENDA (CRUD penuh) ----------------
function HumasEvent() {
  const toast = useToast();
  const [rows, setRows] = useSharedList("content_events", window.AIS_CONTENT.events.slice());
  const [kat] = useSharedList("content_kat_event", hmsKatEventSeed());
  const [form, setForm] = useState(null);
  const [del, setDel] = useState(null);
  const katNames = kat.map((k) => k.nama);
  const toneOf = (n) => (kat.find((k) => k.nama === n) || {}).tone || "gray";
  const blank = { nama: "", jenis: katNames[0] || "Akademik", tgl: "", waktu: "09:00 – 12:00 WIB", lokasi: "", penyelenggara: "", kuota: 100, biaya: "Gratis", img: "purple", deskripsi: "" };

  function save() {
    const d = form.data;
    if (!d.nama.trim() || !d.tgl.trim()) { toast("Nama & tanggal event wajib diisi"); return; }
    if (form.mode === "create") {
      setRows((l) => [...l, {
        id: hmsSlug(d.nama), nama: d.nama, jenis: d.jenis, tgl: d.tgl, iso: "2026-07-15", waktu: d.waktu, lokasi: d.lokasi || "—",
        penyelenggara: d.penyelenggara || "ITI", kuota: +d.kuota || 100, terdaftar: 0, biaya: d.biaya, img: HMS_GRAD[d.img],
        deskripsi: d.deskripsi || d.nama, agenda: [["—", "Susunan acara menyusul"]], narasumber: [],
      }]);
      toast("Event dibuat & tampil di Agenda publik", "ok");
    } else {
      setRows((l) => l.map((x) => x.id === d.id ? { ...x, nama: d.nama, jenis: d.jenis, tgl: d.tgl, waktu: d.waktu, lokasi: d.lokasi, penyelenggara: d.penyelenggara, kuota: +d.kuota, biaya: d.biaya, img: HMS_GRAD[d.img] || x.img, deskripsi: d.deskripsi } : x));
      toast("Event diperbarui", "ok");
    }
    setForm(null);
  }
  function openEdit(e) {
    const imgKey = Object.keys(HMS_GRAD).find((k) => HMS_GRAD[k] === e.img) || "purple";
    setForm({ mode: "edit", data: { id: e.id, nama: e.nama, jenis: e.jenis, tgl: e.tgl, waktu: e.waktu, lokasi: e.lokasi, penyelenggara: e.penyelenggara, kuota: e.kuota, biaya: e.biaya, img: imgKey, deskripsi: e.deskripsi } });
  }

  return (
    <div className="anim-in">
      <PageHead title="Agenda / Event" desc="Kelola agenda & event kampus (26.1.3). Event tampil di halaman Agenda publik beserta pendaftaran."
        actions={<button className="btn btn-primary" onClick={() => setForm({ mode: "create", data: { ...blank } })}><Icon name="plus" size={16} /> Buat Event</button>} />
      <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th style={{ width: 54 }}></th><th>Nama Event</th><th>Jenis</th><th>Tanggal</th><th>Lokasi</th><th style={{ textAlign: "center" }}>Kuota</th><th>Biaya</th><th></th></tr></thead>
        <tbody>{rows.map((e) => (
          <tr key={e.id}>
            <td><div style={{ width: 38, height: 38, borderRadius: 9, background: e.img }} /></td>
            <td style={{ fontWeight: 700, maxWidth: 260 }}>{e.nama}{e.lampau ? <Badge tone="gray" style={{ marginLeft: 6 }}>lampau</Badge> : null}</td>
            <td><Badge tone={toneOf(e.jenis)}>{e.jenis}</Badge></td>
            <td style={{ fontSize: 12.5 }}>{e.tgl}</td>
            <td style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{e.lokasi}</td>
            <td style={{ textAlign: "center", fontFamily: "var(--mono)" }}>{e.terdaftar}/{e.kuota}</td>
            <td style={{ fontSize: 12.5 }}>{e.biaya}</td>
            <td><div style={{ display: "flex", gap: 4 }}>
              <button className="btn btn-ghost btn-sm" title="Ubah" onClick={() => openEdit(e)}><Icon name="edit" size={14} /></button>
              <button className="btn btn-ghost btn-sm" title="Hapus" style={{ color: "var(--red)" }} onClick={() => setDel(e)}><Icon name="trash" size={14} /></button>
            </div></td>
          </tr>
        ))}</tbody>
      </table></div></div>

      {form && (
        <Modal wide title={form.mode === "create" ? "Buat Event" : "Ubah Event"} subtitle="26.1.3 · Agenda / Event" onClose={() => setForm(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(null)}>Batal</button><button className="btn btn-primary" onClick={save}><Icon name="check" size={16} /> {form.mode === "create" ? "Simpan Event" : "Simpan Perubahan"}</button></>}>
          <div className="field"><label>Nama Event <span style={{ color: "var(--red)" }}>*</span></label><input value={form.data.nama} autoFocus onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, nama: e.target.value } }))} placeholder="cth. Seminar Nasional AI" /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <div className="field"><label>Jenis</label><select value={form.data.jenis} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, jenis: e.target.value } }))}>{katNames.map((k) => <option key={k}>{k}</option>)}</select></div>
            <div className="field"><label>Tanggal <span style={{ color: "var(--red)" }}>*</span></label><input value={form.data.tgl} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, tgl: e.target.value } }))} placeholder="cth. 15 Jul 2026" /></div>
            <div className="field"><label>Waktu</label><input value={form.data.waktu} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, waktu: e.target.value } }))} /></div>
            <div className="field"><label>Lokasi</label><input value={form.data.lokasi} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, lokasi: e.target.value } }))} placeholder="cth. Auditorium Utama" /></div>
            <div className="field"><label>Penyelenggara</label><input value={form.data.penyelenggara} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, penyelenggara: e.target.value } }))} /></div>
            <div className="field"><label>Kuota</label><input type="number" value={form.data.kuota} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, kuota: e.target.value } }))} /></div>
            <div className="field"><label>Biaya</label><input value={form.data.biaya} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, biaya: e.target.value } }))} placeholder="Gratis / Rp 50.000" /></div>
            <div className="field"><label>Warna Banner</label>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 4 }}>
                {Object.keys(HMS_GRAD).map((k) => (<button key={k} type="button" onClick={() => setForm((s) => ({ ...s, data: { ...s.data, img: k } }))} title={k} style={{ width: 28, height: 28, borderRadius: 8, background: HMS_GRAD[k], border: form.data.img === k ? "2.5px solid var(--ink)" : "2.5px solid transparent", cursor: "pointer" }} />))}
              </div>
            </div>
          </div>
          <div className="field" style={{ margin: 0 }}><label>Deskripsi</label><textarea rows={3} value={form.data.deskripsi} onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, deskripsi: e.target.value } }))} placeholder="Deskripsi kegiatan…" /></div>
        </Modal>
      )}
      {del && (
        <Modal title="Hapus Event?" subtitle={del.nama} onClose={() => setDel(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setDel(null)}>Batal</button><button className="btn btn-primary" style={{ background: "var(--red)" }} onClick={() => { setRows((l) => l.filter((x) => x.id !== del.id)); toast("Event dihapus", "ok"); setDel(null); }}><Icon name="trash" size={15} /> Ya, Hapus</button></>}>
          <div style={{ display: "flex", gap: 12, padding: 14, background: "var(--red-bg)", borderRadius: 12 }}><Icon name="warn" size={22} style={{ color: "var(--red)", flexShrink: 0 }} /><div style={{ fontSize: 13.5, lineHeight: 1.55 }}>Menghapus <b>{del.nama}</b> juga menghapusnya dari halaman Agenda publik.</div></div>
        </Modal>
      )}
    </div>
  );
}

// ---------------- KATEGORI (berita & event) ----------------
function HumasKategori() {
  const toast = useToast();
  const [tab, setTab] = useState("berita");
  const storeKey = tab === "berita" ? "content_kat_berita" : "content_kat_event";
  const [kat, setKat] = useSharedList(storeKey, tab === "berita" ? hmsKatBeritaSeed() : hmsKatEventSeed());
  const [berita] = useSharedList("content_berita", window.AIS_CONTENT.berita.slice());
  const [events] = useSharedList("content_events", window.AIS_CONTENT.events.slice());
  const [form, setForm] = useState(null);
  const [del, setDel] = useState(null);
  const pakai = (nama) => tab === "berita" ? berita.filter((b) => b.kategori === nama).length : events.filter((e) => e.jenis === nama).length;

  function save() {
    const d = form.data;
    if (!d.nama.trim()) { toast("Nama kategori wajib diisi"); return; }
    if (form.mode === "create") {
      if (kat.some((k) => k.nama.toLowerCase() === d.nama.trim().toLowerCase())) { toast("Kategori sudah ada"); return; }
      setKat((l) => [...l, { nama: d.nama.trim(), tone: d.tone }]); toast("Kategori ditambahkan", "ok");
    } else {
      setKat((l) => l.map((k) => k.nama === form.orig ? { nama: d.nama.trim(), tone: d.tone } : k)); toast("Kategori diperbarui", "ok");
    }
    setForm(null);
  }

  return (
    <div className="anim-in">
      <PageHead title="Kelola Kategori" desc="Master kategori untuk Berita & Event beserta warna (tone). Dipakai sebagai filter di halaman publik."
        actions={<button className="btn btn-primary" onClick={() => setForm({ mode: "create", data: { nama: "", tone: "blue" } })}><Icon name="plus" size={16} /> Tambah Kategori</button>} />
      <div className="card card-pad" style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        {[["berita", "Kategori Berita"], ["event", "Kategori Event"]].map(([k, l]) => <button key={k} className={"btn btn-sm " + (tab === k ? "btn-soft" : "btn-ghost")} onClick={() => setTab(k)}>{l}</button>)}
      </div>
      <div className="card"><div style={{ overflowX: "auto" }}><table className="tbl">
        <thead><tr><th>Kategori</th><th>Pratinjau Badge</th><th style={{ textAlign: "center" }}>Dipakai</th><th></th></tr></thead>
        <tbody>{kat.map((k) => (
          <tr key={k.nama}>
            <td style={{ fontWeight: 700 }}>{k.nama}</td>
            <td><Badge tone={k.tone}>{k.nama}</Badge></td>
            <td style={{ textAlign: "center" }}><Badge tone="gray">{pakai(k.nama)} item</Badge></td>
            <td><div style={{ display: "flex", gap: 4 }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setForm({ mode: "edit", orig: k.nama, data: { nama: k.nama, tone: k.tone } })}><Icon name="edit" size={14} /></button>
              <button className="btn btn-ghost btn-sm" style={{ color: "var(--red)" }} onClick={() => setDel(k)}><Icon name="trash" size={14} /></button>
            </div></td>
          </tr>
        ))}</tbody>
      </table></div></div>

      {form && (
        <Modal title={form.mode === "create" ? "Tambah Kategori" : "Ubah Kategori"} subtitle={tab === "berita" ? "Kategori Berita" : "Kategori Event"} onClose={() => setForm(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(null)}>Batal</button><button className="btn btn-primary" onClick={save}><Icon name="check" size={16} /> Simpan</button></>}>
          <div className="field"><label>Nama Kategori <span style={{ color: "var(--red)" }}>*</span></label><input value={form.data.nama} autoFocus onChange={(e) => setForm((s) => ({ ...s, data: { ...s.data, nama: e.target.value } }))} placeholder="cth. Prestasi" /></div>
          <div className="field" style={{ margin: 0 }}><label>Warna (tone)</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
              {HMS_TONES.map((t) => (<button key={t} type="button" onClick={() => setForm((s) => ({ ...s, data: { ...s.data, tone: t } }))} style={{ border: form.data.tone === t ? "2px solid var(--ink)" : "1px solid var(--line-2)", borderRadius: 999, padding: 0, cursor: "pointer", background: "none" }}><Badge tone={t}>{t}</Badge></button>))}
            </div>
          </div>
        </Modal>
      )}
      {del && (
        <Modal title="Hapus Kategori?" subtitle={del.nama} onClose={() => setDel(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setDel(null)}>Batal</button><button className="btn btn-primary" style={{ background: "var(--red)" }} onClick={() => { setKat((l) => l.filter((x) => x.nama !== del.nama)); toast("Kategori dihapus", "ok"); setDel(null); }}><Icon name="trash" size={15} /> Ya, Hapus</button></>}>
          <div style={{ display: "flex", gap: 12, padding: 14, background: pakai(del.nama) ? "var(--amber-bg)" : "var(--red-bg)", borderRadius: 12 }}><Icon name="warn" size={22} style={{ color: pakai(del.nama) ? "#a6760e" : "var(--red)", flexShrink: 0 }} /><div style={{ fontSize: 13.5, lineHeight: 1.55 }}>{pakai(del.nama) ? <>Kategori <b>{del.nama}</b> masih dipakai <b>{pakai(del.nama)} item</b>. Item lama tetap menyimpan nama kategori ini, tapi tak lagi muncul sebagai filter.</> : <>Menghapus kategori <b>{del.nama}</b>.</>}</div></div>
        </Modal>
      )}
    </div>
  );
}

export { HumasBerita, HumasEvent, HumasKategori };
