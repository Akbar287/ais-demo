"use client";

import { useMemo, useState } from "react";
import { Badge, Icon } from "@/components/atoms";
import { Chip, PubFooter, PubHero, PubNav } from "@/components/features/from-js/views_publik";
import {
  ACADEMIC_CALENDAR,
  ADMISSION_PATHWAYS,
  PUBLIC_PRODI,
  findProgramStudy,
  type AcademicCalendarItem,
  type PublicProgramStudy,
} from "@/data/public-academic";
import { rupiah } from "@/lib/format";

type PublicNav = {
  login: () => void;
  home: (hash?: string) => void;
  berita: () => void;
  events: () => void;
  programStudi: (slug?: string) => void;
  kalender: () => void;
};

type PageProps = {
  nav: PublicNav;
};

type ProgramDetailProps = PageProps & {
  slug?: string;
};

const KATEGORI_TONE: Record<AcademicCalendarItem["kategori"], string> = {
  Pendaftaran: "orange",
  Tes: "blue",
  Hasil: "green",
};

function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div style={{ marginBottom: 26 }}>
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--orange-600)", marginBottom: 8 }}>{eyebrow}</div>
      <h2 style={{ fontSize: 28, lineHeight: 1.15, fontWeight: 900, letterSpacing: 0, margin: "0 0 8px" }}>{title}</h2>
      {desc && <p style={{ color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.6, maxWidth: 720, margin: 0 }}>{desc}</p>}
    </div>
  );
}

function ProdiCard({ prodi, nav }: { prodi: (typeof PUBLIC_PRODI)[number]; nav: PublicNav }) {
  return (
    <article
      className="pub-card pub-fadeup"
      onClick={() => nav.programStudi(prodi.slug)}
      style={{ border: "1px solid var(--line)", borderRadius: 18, background: "var(--surface)", padding: 22, display: "flex", flexDirection: "column", gap: 16, cursor: "pointer" }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--orange-50)", color: prodi.warna, display: "grid", placeItems: "center", flexShrink: 0 }}>
          <Icon name={prodi.icon} size={22} />
        </div>
        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontSize: 17, fontWeight: 900, lineHeight: 1.2, margin: "0 0 5px" }}>{prodi.nama}</h3>
          <div style={{ fontSize: 12.5, color: "var(--ink-3)", fontWeight: 600 }}>{prodi.fakultas}</div>
        </div>
      </div>
      <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-2)", margin: 0, flex: 1 }}>{prodi.ringkas}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <Badge tone={prodi.akreditasi === "Unggul" ? "green" : "blue"}>{prodi.akreditasi}</Badge>
        <Badge tone="gray">{prodi.jenjang}</Badge>
        <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 5, color: "var(--orange-600)", fontSize: 12.5, fontWeight: 800 }}>
          Detail <Icon name="arrowR" size={14} />
        </span>
      </div>
    </article>
  );
}

export function ProgramStudiIndex({ nav }: PageProps) {
  const featured = PUBLIC_PRODI.slice(0, 4);
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <PubNav nav={nav} active="Program Studi" />
      <PubHero
        eyebrow="PROGRAM STUDI"
        title="Program Sarjana Institut Teknologi Indonesia"
        desc="Jelajahi 10 program studi S1 ITI untuk bidang rekayasa, teknologi, perencanaan, industri, dan manajemen."
        kicker={
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 }}>
            <button className="btn btn-primary" onClick={() => nav.kalender()}><Icon name="calendar" size={16} /> Kalender PMB</button>
            <button className="btn" style={{ background: "rgba(255,255,255,.12)", color: "#fff", borderColor: "rgba(255,255,255,.2)" }} onClick={() => nav.login()}><Icon name="user" size={16} /> Portal Akademik</button>
          </div>
        }
      />

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 40px 72px" }}>
        <SectionTitle eyebrow="PILIHAN STUDI" title="Temukan program yang sesuai minat Anda" desc="Setiap kartu menuju halaman detail program studi, lengkap dengan fokus pembelajaran, kurikulum, prospek karier, fasilitas, dan jalur pendaftaran." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
          {PUBLIC_PRODI.map((prodi) => <ProdiCard key={prodi.slug} prodi={prodi} nav={nav} />)}
        </div>
      </section>

      <section style={{ background: "var(--surface-2)", padding: "56px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionTitle eyebrow="JALUR MASUK" title="Tiga jalur pendaftaran calon mahasiswa" desc="Halaman kalender akademik menampilkan tahapan pendaftaran, tes atau asesmen, dan hasil untuk setiap jalur." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
            {ADMISSION_PATHWAYS.map((jalur) => (
              <div key={jalur.slug} style={{ border: "1px solid var(--line)", borderRadius: 18, background: "var(--surface)", padding: 22 }}>
                <Badge tone={jalur.slug === "tes-mandiri" ? "blue" : jalur.slug === "rpl" ? "purple" : "orange"}>{jalur.nama}</Badge>
                <h3 style={{ fontSize: 18, fontWeight: 900, margin: "14px 0 8px" }}>{jalur.ringkas}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-2)", margin: "0 0 14px" }}>{jalur.deskripsi}</p>
                <button className="btn btn-ghost btn-sm" onClick={() => nav.kalender()}><Icon name="calendar" size={14} /> Lihat Jadwal</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 40px 72px" }}>
        <SectionTitle eyebrow="UNGGULAN" title="Prodi dengan peminatan teknologi dan industri" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {featured.map((prodi) => (
            <button key={prodi.slug} onClick={() => nav.programStudi(prodi.slug)} className="pub-card" style={{ textAlign: "left", border: "1px solid var(--line)", borderRadius: 16, background: "var(--surface)", padding: 18, fontFamily: "var(--sans)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Icon name={prodi.icon} size={20} style={{ color: prodi.warna }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 900 }}>{prodi.nama}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>{prodi.fokus.slice(0, 2).join(" · ")}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
      <PubFooter nav={nav} />
    </div>
  );
}

export function ProgramStudiDetail({ slug, nav }: ProgramDetailProps) {
  const prodi = findProgramStudy(slug) ?? PUBLIC_PRODI[0];
  const related = PUBLIC_PRODI.filter((item) => item.slug !== prodi.slug).slice(0, 3);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <PubNav nav={nav} active="Program Studi" />
      <PubHero
        eyebrow="DETAIL PROGRAM STUDI"
        title={prodi.nama}
        desc={prodi.deskripsi}
        kicker={
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
            <Badge tone={prodi.akreditasi === "Unggul" ? "green" : "blue"}>{prodi.akreditasi}</Badge>
            <Badge tone="gray">{prodi.jenjang}</Badge>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,.75)", fontSize: 13, fontWeight: 700 }}>
              <Icon name="users" size={15} /> {prodi.mahasiswa.toLocaleString("id")} mahasiswa aktif
            </span>
          </div>
        }
      />

      <section className="pub-detail-grid pub-program-detail" style={{ width: "100%", maxWidth: 1160, boxSizing: "border-box", margin: "0 auto", padding: "48px 40px 72px", display: "grid", gridTemplateColumns: "minmax(0, 1fr) 300px", gap: 36, alignItems: "start" }}>
        <main className="pub-detail-main" style={{ minWidth: 0 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => nav.programStudi()} style={{ marginBottom: 22 }}><Icon name="chevL" size={15} /> Semua Program Studi</button>
          <SectionTitle eyebrow="PROFIL" title={prodi.ringkas} desc={prodi.deskripsi} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 34 }}>
            {[
              ["Fakultas", prodi.fakultas, "building"],
              ["Jenjang", prodi.jenjang, "grad"],
              ["Akreditasi", prodi.akreditasi, "award"],
              ["Website", prodi.website.replace("https://", ""), "link"],
            ].map(([label, value, icon]) => (
              <div key={label} style={{ border: "1px solid var(--line)", borderRadius: 16, background: "var(--surface)", padding: 18, display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--orange-50)", color: prodi.warna, display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name={icon} size={18} /></div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 11.5, color: "var(--ink-3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em" }}>{label}</div>
                  <div style={{ fontSize: 13.5, fontWeight: 800, overflow: "hidden", textOverflow: "ellipsis" }}>{value}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gap: 34 }}>
            <DetailBlock title="Fokus Pembelajaran" icon="target" items={prodi.fokus} />
            <SemesterCourses rows={prodi.mataKuliahSemester} />
            <SemesterFees rows={prodi.biayaSemester} />
            <DetailBlock title="Prospek Karier" icon="briefcase" items={prodi.prospek} />
            <DetailBlock title="Fasilitas Pendukung" icon="building" items={prodi.fasilitas} />
          </div>
        </main>

        <aside className="pub-sidebar" style={{ position: "sticky", top: 84, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ border: "1px solid var(--line)", borderRadius: 18, padding: 22, background: "var(--surface)", boxShadow: "var(--shadow)" }}>
            <div style={{ width: 54, height: 54, borderRadius: 16, background: "var(--orange-50)", color: prodi.warna, display: "grid", placeItems: "center", marginBottom: 14 }}><Icon name={prodi.icon} size={25} /></div>
            <h3 style={{ fontSize: 18, fontWeight: 900, margin: "0 0 8px" }}>Daftar ke {prodi.nama}</h3>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-2)", margin: "0 0 16px" }}>Pilih Jalur Raport, Tes Mandiri, atau RPL melalui kalender PMB publik.</p>
            <button className="btn btn-primary" style={{ width: "100%", marginBottom: 10 }} onClick={() => nav.kalender()}><Icon name="calendar" size={16} /> Lihat Kalender</button>
            <button className="btn btn-ghost" style={{ width: "100%" }} onClick={() => nav.login()}><Icon name="user" size={16} /> Portal Akademik</button>
          </div>
          <div style={{ border: "1px solid var(--line)", borderRadius: 18, padding: 20, background: "var(--surface)" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "var(--ink-3)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 12 }}>Prodi Lainnya</div>
            <div style={{ display: "grid", gap: 10 }}>
              {related.map((item) => (
                <button key={item.slug} onClick={() => nav.programStudi(item.slug)} style={{ display: "flex", alignItems: "center", gap: 10, border: "none", background: "var(--surface-2)", borderRadius: 12, padding: 11, textAlign: "left", fontFamily: "var(--sans)", cursor: "pointer" }}>
                  <Icon name={item.icon} size={17} style={{ color: item.warna, flexShrink: 0 }} />
                  <span style={{ fontSize: 12.5, fontWeight: 800 }}>{item.nama}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </section>
      <PubFooter nav={nav} />
    </div>
  );
}

function DetailBlock({ title, icon, items }: { title: string; icon: string; items: string[] }) {
  return (
    <section style={{ border: "1px solid var(--line)", borderRadius: 18, background: "var(--surface)", padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ width: 38, height: 38, borderRadius: 12, background: "var(--orange-50)", color: "var(--orange-600)", display: "grid", placeItems: "center" }}><Icon name={icon} size={18} /></div>
        <h2 style={{ fontSize: 19, fontWeight: 900, margin: 0 }}>{title}</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 10 }}>
        {items.map((item) => (
          <div key={item} style={{ display: "flex", gap: 9, alignItems: "flex-start", padding: 12, borderRadius: 12, background: "var(--surface-2)" }}>
            <Icon name="check" size={15} style={{ color: "var(--green)", marginTop: 2, flexShrink: 0 }} />
            <span style={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.4 }}>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SemesterCourses({ rows }: { rows: PublicProgramStudy["mataKuliahSemester"] }) {
  return (
    <section style={{ border: "1px solid var(--line)", borderRadius: 18, background: "var(--surface)", padding: 24 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14, marginBottom: 18, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 12, background: "var(--orange-50)", color: "var(--orange-600)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="bookOpen" size={18} /></div>
          <div>
            <h2 style={{ fontSize: 19, fontWeight: 900, margin: "0 0 4px" }}>Mata Kuliah Semester 1-8</h2>
            <p style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.5, margin: 0 }}>Rancangan kurikulum publik untuk membantu calon mahasiswa membaca alur pembelajaran.</p>
          </div>
        </div>
        <Badge tone="orange">8 Semester</Badge>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(235px, 1fr))", gap: 12 }}>
        {rows.map((row) => (
          <article key={row.semester} style={{ border: "1px solid var(--line)", borderRadius: 15, background: "var(--surface-2)", padding: 15 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 900 }}>Semester {row.semester}</div>
              <Badge tone="gray">{row.sks} SKS</Badge>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {row.mataKuliah.map((course) => (
                <div key={course} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <Icon name="check" size={14} style={{ color: "var(--green)", marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.4, fontWeight: 650 }}>{course}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SemesterFees({ rows }: { rows: PublicProgramStudy["biayaSemester"] }) {
  return (
    <section style={{ border: "1px solid var(--line)", borderRadius: 18, background: "var(--surface)", padding: 24 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14, marginBottom: 18, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 12, background: "var(--orange-50)", color: "var(--orange-600)", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="wallet" size={18} /></div>
          <div>
            <h2 style={{ fontSize: 19, fontWeight: 900, margin: "0 0 4px" }}>Estimasi Biaya Semester 1-8</h2>
            <p style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.5, margin: 0 }}>Komponen berikut bersifat estimasi biaya yang mungkin muncul dan dapat berubah mengikuti ketetapan PMB atau Keuangan.</p>
          </div>
        </div>
        <Badge tone="orange">Estimasi</Badge>
      </div>
      <div className="pub-table-scroll" style={{ overflowX: "auto", border: "1px solid var(--line)", borderRadius: 14 }}>
        <table className="tbl pub-fee-table" style={{ minWidth: 860 }}>
          <thead>
            <tr>
              <th>Semester</th>
              <th>SPP/UKT</th>
              <th>Praktikum/Studio</th>
              <th>Kegiatan</th>
              <th>Lainnya</th>
              <th>Total Estimasi</th>
              <th>Catatan</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const total = row.spp + row.praktikum + row.kegiatan + row.lainnya;
              return (
                <tr key={row.semester}>
                  <td style={{ fontWeight: 900 }}>Semester {row.semester}</td>
                  <td>{rupiah(row.spp)}</td>
                  <td>{rupiah(row.praktikum)}</td>
                  <td>{rupiah(row.kegiatan)}</td>
                  <td>{row.lainnya > 0 ? rupiah(row.lainnya) : "-"}</td>
                  <td style={{ fontWeight: 900, color: "var(--orange-600)" }}>{rupiah(total)}</td>
                  <td style={{ color: "var(--ink-2)", minWidth: 210 }}>{row.catatan}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function KalenderAkademikPublic({ nav }: PageProps) {
  const [jalur, setJalur] = useState("Semua");
  const [kategori, setKategori] = useState("Semua");
  const filtered = useMemo(() => {
    return ACADEMIC_CALENDAR.filter((item) =>
      (jalur === "Semua" || item.jalur === jalur) &&
      (kategori === "Semua" || item.kategori === kategori)
    );
  }, [jalur, kategori]);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <PubNav nav={nav} active="Kalender Akademik" />
      <PubHero
        eyebrow="KALENDER AKADEMIK"
        title="Kalender PMB dan Seleksi Mahasiswa Baru"
        desc="Pantau jadwal pendaftaran, tes atau asesmen, dan pengumuman hasil untuk Jalur Raport, Tes Mandiri, dan RPL."
        kicker={
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 26 }}>
            <Badge tone="orange">Pendaftaran</Badge>
            <Badge tone="blue">Tes</Badge>
            <Badge tone="green">Hasil</Badge>
          </div>
        }
      />

      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "38px 40px 72px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32, alignItems: "start" }} className="pub-detail-grid">
          <main>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
              <Chip label="Semua Jalur" tone="orange" on={jalur === "Semua"} onClick={() => setJalur("Semua")} />
              {ADMISSION_PATHWAYS.map((item) => <Chip key={item.slug} label={item.nama} on={jalur === item.nama} tone={item.slug === "tes-mandiri" ? "blue" : item.slug === "rpl" ? "purple" : "orange"} onClick={() => setJalur(item.nama)} />)}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
              <Chip label="Semua Tahap" tone="orange" on={kategori === "Semua"} onClick={() => setKategori("Semua")} />
              {(["Pendaftaran", "Tes", "Hasil"] as const).map((item) => <Chip key={item} label={item} on={kategori === item} tone={KATEGORI_TONE[item]} onClick={() => setKategori(item)} />)}
            </div>

            <div style={{ position: "relative", paddingLeft: 30 }}>
              <div style={{ position: "absolute", left: 9, top: 8, bottom: 8, width: 2, background: "var(--line)" }} />
              {filtered.map((item) => (
                <CalendarItem key={`${item.jalur}-${item.kategori}-${item.judul}`} item={item} />
              ))}
            </div>
          </main>

          <aside className="pub-sidebar" style={{ position: "sticky", top: 84, display: "grid", gap: 18 }}>
            <div style={{ border: "1px solid var(--line)", borderRadius: 18, background: "var(--surface)", padding: 22, boxShadow: "var(--shadow)" }}>
              <h3 style={{ fontSize: 18, fontWeight: 900, margin: "0 0 8px" }}>Jalur Pendaftaran</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-2)", margin: "0 0 16px" }}>Pilih jalur sesuai profil calon mahasiswa. Jadwal dapat berubah mengikuti keputusan panitia PMB.</p>
              <div style={{ display: "grid", gap: 12 }}>
                {ADMISSION_PATHWAYS.map((item) => (
                  <div key={item.slug} style={{ borderRadius: 14, background: "var(--surface-2)", padding: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                      <Badge tone={item.slug === "tes-mandiri" ? "blue" : item.slug === "rpl" ? "purple" : "orange"}>{item.nama}</Badge>
                    </div>
                    <div style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.5 }}>{item.ringkas}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ border: "1px solid var(--line)", borderRadius: 18, background: "linear-gradient(135deg, var(--orange-50), var(--surface))", padding: 22 }}>
              <h3 style={{ fontSize: 17, fontWeight: 900, margin: "0 0 8px" }}>Sudah memilih prodi?</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-2)", margin: "0 0 14px" }}>Lihat detail program studi sebelum menentukan pilihan pertama dan kedua.</p>
              <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => nav.programStudi()}><Icon name="book" size={16} /> Lihat Prodi</button>
            </div>
          </aside>
        </div>
      </section>
      <PubFooter nav={nav} />
    </div>
  );
}

function CalendarItem({ item }: { item: AcademicCalendarItem }) {
  return (
    <article style={{ position: "relative", paddingBottom: 18 }}>
      <div style={{ position: "absolute", left: -30, top: 18, width: 20, height: 20, borderRadius: "50%", background: "var(--surface)", border: `4px solid var(--${KATEGORI_TONE[item.kategori]})` }} />
      <div className="pub-card" style={{ border: "1px solid var(--line)", borderRadius: 18, background: "var(--surface)", padding: 20, display: "grid", gridTemplateColumns: "88px 1fr", gap: 18 }}>
        <div style={{ textAlign: "center", borderRadius: 15, background: "var(--orange-50)", color: "var(--orange-600)", padding: "12px 8px", alignSelf: "start" }}>
          <div style={{ fontSize: 24, fontWeight: 900, lineHeight: 1 }}>{item.akhir ? `${item.tanggal}-${item.akhir}` : item.tanggal}</div>
          <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase" }}>{item.bulan} {item.tahun}</div>
        </div>
        <div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
            <Badge tone={KATEGORI_TONE[item.kategori]}>{item.kategori}</Badge>
            <Badge tone={item.jalur === "Tes Mandiri" ? "blue" : item.jalur === "RPL" ? "purple" : "orange"}>{item.jalur}</Badge>
          </div>
          <h3 style={{ fontSize: 18, lineHeight: 1.25, fontWeight: 900, margin: "0 0 7px" }}>{item.judul}</h3>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-2)", margin: 0 }}>{item.deskripsi}</p>
        </div>
      </div>
    </article>
  );
}
