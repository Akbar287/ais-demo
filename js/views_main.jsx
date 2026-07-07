// ============================================================
// AIS — Views: Dashboard, Profil, Pembayaran
// ============================================================

// ===================== DASHBOARD =====================
function Dashboard({ nav, krsState }) {
  const D = window.AIS_DATA;
  const m = D.mahasiswa;
  const toast = useToast();
  const hariIni = "Senin";
  const jadwalHariIni = D.jadwal.filter((j) => j.hari === hariIni);
  const totalSKS = krsState.approved ? krsState.sks : D.mkAktif.reduce((a, b) => a + b.sks, 0);

  const tiles = [
    { label: "IPK Kumulatif", value: m.ipk.toFixed(2), meta: `${m.sksLulus} SKS lulus`, ic: "grad", bg: "var(--orange-50)", fg: "var(--orange-600)", iconc: "var(--orange)" },
    { label: "Semester Aktif", value: m.semester, meta: m.tahunAjaran, ic: "calendar", bg: "var(--blue-bg)", fg: "var(--blue)", iconc: "var(--blue)" },
    { label: "SKS Semester Ini", value: totalSKS, meta: `dari maks ${m.sksMax} SKS`, ic: "book", bg: "var(--purple-bg)", fg: "var(--purple)", iconc: "var(--purple)" },
    { label: "Status Akademik", value: m.status, meta: "Pembayaran lunas", ic: "check", bg: "var(--green-bg)", fg: "var(--green)", iconc: "var(--green)", small: true },
  ];

  const quickLinks = [
    { id: "krs", label: "Isi KRS", ic: "book", tone: "orange", desc: "Periode dibuka" },
    { id: "nilai", label: "Lihat Nilai", ic: "presentation", tone: "blue", desc: "Nilai UTS keluar" },
    { id: "kehadiran", label: "Kehadiran", ic: "check", tone: "green", desc: "Rekap absensi" },
    { id: "beasiswa", label: "Beasiswa", ic: "gift", tone: "purple", desc: "3 dibuka" },
  ];

  return (
    <div className="anim-in">
      {/* Hero */}
      <div className="card" style={{ marginBottom: 22, overflow: "hidden", position: "relative", background: "linear-gradient(120deg, #fff, var(--orange-50))", border: "1px solid var(--orange-100)" }}>
        <div style={{ position: "absolute", right: -40, top: -40, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(217,119,52,.12), transparent 70%)" }} />
        <div className="card-pad" style={{ display: "flex", alignItems: "center", gap: 22, padding: "30px 30px" }}>
          <div className="sb-ava" style={{ width: 64, height: 64, fontSize: 24, borderRadius: 18, background: "linear-gradient(135deg, var(--orange), #e89b5a)", color: "#fff", boxShadow: "0 8px 20px rgba(217,119,52,.3)" }}>{initials(m.nama)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, color: "var(--ink-2)", fontWeight: 600 }}>Assalamu'alaikum, selamat datang kembali 👋</div>
            <h1 style={{ margin: "3px 0 6px", fontSize: 26, fontWeight: 800, letterSpacing: "-.025em" }}>{m.nama}</h1>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Badge tone="orange"><span className="mono">{m.nim}</span></Badge>
              <Badge tone="gray">{m.prodi}</Badge>
              <Badge tone="gray">{m.fakultas}</Badge>
              <Badge tone="green" dot>{m.status}</Badge>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => nav("krs")}><Icon name="book" size={17} /> Isi KRS Sekarang</button>
        </div>
      </div>

      {/* Stat tiles */}
      <div className="grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", marginBottom: 22 }}>
        {tiles.map((t) => (
          <div key={t.label} className="stat card" style={{ background: t.bg, border: "none" }}>
            <Icon name={t.ic} size={26} className="si" style={{ color: t.iconc }} />
            <div className="label" style={{ color: t.fg }}>{t.label}</div>
            <div className="value" style={{ color: t.fg, fontSize: t.small ? 24 : 32 }}>{t.value}</div>
            <div className="meta" style={{ color: t.fg }}>{t.meta}</div>
          </div>
        ))}
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.6fr 1fr" }}>
        {/* Left column */}
        <div className="grid" style={{ alignContent: "start" }}>
          {/* Jadwal hari ini */}
          <div className="card">
            <div className="card-head">
              <Icon name="clock" size={19} style={{ color: "var(--orange)" }} />
              <h3>Jadwal Hari Ini</h3>
              <span className="sub">· {hariIni}</span>
              <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => nav("kalender")}>Lihat Kalender</button>
            </div>
            <div style={{ padding: "8px 0" }}>
              {jadwalHariIni.map((j, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "13px 24px", borderBottom: i < jadwalHariIni.length - 1 ? "1px solid var(--line)" : "none" }}>
                  <div style={{ textAlign: "center", minWidth: 58 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, fontFamily: "var(--mono)" }}>{j.jam.split(" - ")[0]}</div>
                    <div style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>{j.jam.split(" - ")[1]}</div>
                  </div>
                  <div style={{ width: 3, alignSelf: "stretch", borderRadius: 4, background: "var(--orange)" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{j.nama}</div>
                    <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{j.dosen}</div>
                  </div>
                  <Badge tone="blue"><Icon name="pin" size={13} /> {j.ruang}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            {quickLinks.map((q) => (
              <button key={q.id} className="card" style={{ cursor: "pointer", textAlign: "left", padding: 16, border: "1px solid var(--line)", background: "var(--surface)", fontFamily: "var(--sans)", transition: "transform .15s, box-shadow .15s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                onClick={() => nav(q.id)}>
                <div style={{ width: 38, height: 38, borderRadius: 11, display: "grid", placeItems: "center", marginBottom: 10, background: `var(--${q.tone === "orange" ? "orange-50" : q.tone + "-bg"})`, color: `var(--${q.tone === "orange" ? "orange-600" : q.tone})` }}>
                  <Icon name={q.ic} size={20} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 13.5 }}>{q.label}</div>
                <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 2 }}>{q.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right column — pengumuman */}
        <div className="card" style={{ alignSelf: "start" }}>
          <div className="card-head">
            <Icon name="bell" size={19} style={{ color: "var(--orange)" }} />
            <h3>Pengumuman</h3>
            <span className="sb-badge" style={{ marginLeft: "auto", background: "var(--orange)" }}>{D.pengumuman.length}</span>
          </div>
          <div>
            {D.pengumuman.map((p, i) => {
              const tones = { KRS: "orange", Ujian: "blue", Beasiswa: "purple", Sistem: "gray" };
              return (
                <div key={i} style={{ padding: "15px 22px", borderBottom: i < D.pengumuman.length - 1 ? "1px solid var(--line)" : "none", cursor: "pointer" }}
                  onClick={() => toast("Membuka detail pengumuman")}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <Badge tone={tones[p.tag]}>{p.tag}</Badge>
                    {p.penting && <Badge tone="red" dot>Penting</Badge>}
                    <span style={{ marginLeft: "auto", fontSize: 11.5, color: "var(--ink-3)", fontWeight: 600 }}>{p.tanggal}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 13.5, lineHeight: 1.35, marginBottom: 3 }}>{p.judul}</div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.5 }}>{p.isi}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================== PROFIL =====================
function Profil() {
  const D = window.AIS_DATA;
  const m = D.mahasiswa;
  const toast = useToast();
  const [tab, setTab] = useState("biodata");
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ email: m.email, telepon: m.telepon, alamat: m.alamat });
  const [pw, setPw] = useState({ lama: "", baru: "", konfirmasi: "" });
  const [show, setShow] = useState({ lama: false, baru: false, konfirmasi: false });

  const biodataRows = [
    ["Nama Lengkap", m.nama], ["NIM", m.nim, true], ["Tempat, Tgl Lahir", `${m.tempatLahir}, ${m.tanggalLahir}`],
    ["Jenis Kelamin", m.jenisKelamin], ["Agama", m.agama], ["Golongan Darah", m.golonganDarah],
    ["Fakultas", m.fakultas], ["Program Studi", m.prodi], ["Jenjang", m.jenjang],
    ["Angkatan", m.angkatan], ["Dosen Penasihat Akademik", m.dosenPA], ["Golongan UKT", m.statusUKT],
  ];
  const ortuRows = [["Nama Ayah", m.namaAyah], ["Nama Ibu", m.namaIbu], ["Pekerjaan Ayah", m.pekerjaanAyah]];

  function submitPw(e) {
    e.preventDefault();
    if (!pw.lama || !pw.baru) { toast("Lengkapi semua field password", "err"); return; }
    if (pw.baru.length < 6) { toast("Password baru minimal 6 karakter", "err"); return; }
    if (pw.baru !== pw.konfirmasi) { toast("Konfirmasi password tidak cocok", "err"); return; }
    setPw({ lama: "", baru: "", konfirmasi: "" });
    toast("Password berhasil diubah");
  }

  return (
    <div className="anim-in">
      <PageHead title="Profil Saya" desc="Lihat dan perbarui biodata serta keamanan akun Anda." />

      <div className="seg" style={{ marginBottom: 22 }}>
        <button className={tab === "biodata" ? "on" : ""} onClick={() => setTab("biodata")}>Biodata</button>
        <button className={tab === "password" ? "on" : ""} onClick={() => setTab("password")}>Ubah Password</button>
      </div>

      {tab === "biodata" && (
        <div className="grid" style={{ gridTemplateColumns: "300px 1fr" }}>
          {/* Card kiri */}
          <div className="card card-pad" style={{ textAlign: "center", alignSelf: "start" }}>
            <div className="sb-ava" style={{ width: 96, height: 96, fontSize: 36, borderRadius: 28, margin: "8px auto 16px", background: "linear-gradient(135deg, var(--orange), #e89b5a)", color: "#fff" }}>{initials(m.nama)}</div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>{m.nama}</div>
            <div className="mono" style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 2 }}>{m.nim}</div>
            <div style={{ margin: "14px 0" }}><Badge tone="green" dot>Mahasiswa {m.status}</Badge></div>
            <div style={{ borderTop: "1px solid var(--line)", paddingTop: 14, marginTop: 6, display: "grid", gap: 10, textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}><Icon name="mail" size={16} style={{ color: "var(--ink-3)" }} /><span style={{ color: "var(--ink-2)", wordBreak: "break-all" }}>{form.email}</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}><Icon name="phone" size={16} style={{ color: "var(--ink-3)" }} /><span style={{ color: "var(--ink-2)" }}>{form.telepon}</span></div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13 }}><Icon name="pin" size={16} style={{ color: "var(--ink-3)", flexShrink: 0, marginTop: 1 }} /><span style={{ color: "var(--ink-2)" }}>{form.alamat}</span></div>
            </div>
            <div style={{ background: "var(--amber-bg)", borderRadius: 12, padding: "10px 12px", marginTop: 16, fontSize: 11.5, color: "#a6760e", textAlign: "left", display: "flex", gap: 8 }}>
              <Icon name="info" size={15} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>Perbarui biodata secara berkala untuk keperluan beasiswa dan administrasi.</span>
            </div>
          </div>

          {/* Detail kanan */}
          <div className="grid" style={{ alignContent: "start" }}>
            <div className="card">
              <div className="card-head">
                <Icon name="user" size={19} style={{ color: "var(--orange)" }} />
                <h3>Data Diri & Akademik</h3>
                <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto" }} onClick={() => { if (edit) toast("Perubahan kontak disimpan"); setEdit(!edit); }}>
                  <Icon name={edit ? "check" : "edit"} size={15} /> {edit ? "Simpan" : "Edit Kontak"}
                </button>
              </div>
              <div style={{ padding: "6px 0" }}>
                {biodataRows.map(([k, v, mono], i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "200px 1fr", padding: "11px 24px", borderBottom: "1px solid var(--line)", fontSize: 13.5, alignItems: "center" }}>
                    <span style={{ color: "var(--ink-3)", fontWeight: 600 }}>{k}</span>
                    <span className={mono ? "mono" : ""} style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
                {edit && (
                  <div style={{ padding: "16px 24px", background: "var(--orange-50)", display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
                    <div className="field" style={{ margin: 0 }}><label>Email</label><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                    <div className="field" style={{ margin: 0 }}><label>Telepon</label><input value={form.telepon} onChange={(e) => setForm({ ...form, telepon: e.target.value })} /></div>
                    <div className="field" style={{ margin: 0, gridColumn: "1 / -1" }}><label>Alamat</label><input value={form.alamat} onChange={(e) => setForm({ ...form, alamat: e.target.value })} /></div>
                  </div>
                )}
              </div>
            </div>
            <div className="card">
              <div className="card-head"><Icon name="user" size={19} style={{ color: "var(--purple)" }} /><h3>Data Orang Tua / Wali</h3></div>
              <div style={{ padding: "6px 0" }}>
                {ortuRows.map(([k, v], i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "200px 1fr", padding: "11px 24px", borderBottom: i < ortuRows.length - 1 ? "1px solid var(--line)" : "none", fontSize: 13.5 }}>
                    <span style={{ color: "var(--ink-3)", fontWeight: 600 }}>{k}</span>
                    <span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "password" && (
        <div className="card" style={{ maxWidth: 520 }}>
          <div className="card-head"><Icon name="lock" size={19} style={{ color: "var(--orange)" }} /><h3>Ubah Password</h3></div>
          <form className="card-pad" onSubmit={submitPw}>
            {[["lama", "Password Lama"], ["baru", "Password Baru"], ["konfirmasi", "Konfirmasi Password Baru"]].map(([k, label]) => (
              <div className="field" key={k}>
                <label>{label}</label>
                <div style={{ position: "relative" }}>
                  <input type={show[k] ? "text" : "password"} value={pw[k]} placeholder="••••••••" onChange={(e) => setPw({ ...pw, [k]: e.target.value })} style={{ paddingRight: 44 }} />
                  <button type="button" onClick={() => setShow({ ...show, [k]: !show[k] })} style={{ position: "absolute", right: 8, top: 8, background: "none", border: "none", cursor: "pointer", color: "var(--ink-3)", padding: 5 }}>
                    <Icon name={show[k] ? "eyeoff" : "eye"} size={18} />
                  </button>
                </div>
                {k === "baru" && <div className="hint">Minimal 6 karakter, kombinasi huruf & angka disarankan.</div>}
              </div>
            ))}
            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 6 }}><Icon name="check" size={17} /> Simpan Password Baru</button>
          </form>
        </div>
      )}
    </div>
  );
}

// ===================== PEMBAYARAN =====================
function Pembayaran() {
  const D = window.AIS_DATA;
  const toast = useToast();
  const [detail, setDetail] = useState(null);
  const totalBayar = D.pembayaran.reduce((a, b) => a + b.nominal, 0);

  return (
    <div className="anim-in">
      <PageHead title="Rekap Pembayaran" desc="Riwayat pembayaran UKT/SPP per semester. Pembayaran terlambat membuat status menjadi Tidak Aktif." />

      <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)", marginBottom: 22 }}>
        <div className="stat card" style={{ background: "var(--green-bg)", border: "none" }}>
          <Icon name="check" size={26} className="si" style={{ color: "var(--green)" }} />
          <div className="label" style={{ color: "var(--green)" }}>Status Pembayaran</div>
          <div className="value" style={{ color: "var(--green)", fontSize: 24 }}>Lunas</div>
          <div className="meta" style={{ color: "var(--green)" }}>Semester berjalan</div>
        </div>
        <div className="stat card" style={{ background: "var(--orange-50)", border: "none" }}>
          <Icon name="wallet" size={26} className="si" style={{ color: "var(--orange)" }} />
          <div className="label" style={{ color: "var(--orange-600)" }}>UKT per Semester</div>
          <div className="value" style={{ color: "var(--orange-600)", fontSize: 24 }}>{rupiah(D.mahasiswa.ukt)}</div>
          <div className="meta" style={{ color: "var(--orange-600)" }}>{D.mahasiswa.statusUKT}</div>
        </div>
        <div className="stat card" style={{ background: "var(--blue-bg)", border: "none" }}>
          <Icon name="chart" size={26} className="si" style={{ color: "var(--blue)" }} />
          <div className="label" style={{ color: "var(--blue)" }}>Total Dibayarkan</div>
          <div className="value" style={{ color: "var(--blue)", fontSize: 24 }}>{rupiah(totalBayar)}</div>
          <div className="meta" style={{ color: "var(--blue)" }}>{D.pembayaran.length} semester lunas</div>
        </div>
      </div>

      <div className="card">
        <div className="card-head"><Icon name="wallet" size={19} style={{ color: "var(--orange)" }} /><h3>Riwayat Pembayaran</h3>
          <button className="btn btn-soft btn-sm" style={{ marginLeft: "auto" }} onClick={() => toast("Mengunduh rekap pembayaran (PDF)")}><Icon name="download" size={15} /> Unduh Rekap</button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Semester</th><th>Jenis</th><th>Nominal</th><th>Tgl Bayar</th><th>Bank</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {D.pembayaran.map((p, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700 }}>{p.semester}</td>
                  <td style={{ color: "var(--ink-2)" }}>{p.jenis}</td>
                  <td className="mono" style={{ fontWeight: 600 }}>{rupiah(p.nominal)}</td>
                  <td style={{ color: "var(--ink-2)" }}>{p.tglBayar}</td>
                  <td style={{ color: "var(--ink-2)" }}>{p.bank}</td>
                  <td><Badge tone="green" dot>{p.status}</Badge></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => setDetail(p)}>Detail</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {detail && (
        <Modal title="Detail Pembayaran" subtitle={detail.semester} onClose={() => setDetail(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setDetail(null)}>Tutup</button><button className="btn btn-primary" onClick={() => { toast("Mencetak bukti pembayaran"); }}><Icon name="print" size={16} /> Cetak Bukti</button></>}>
          <div style={{ display: "grid", gap: 2 }}>
            {[["Jenis Pembayaran", detail.jenis], ["Nominal", rupiah(detail.nominal)], ["Virtual Account", detail.va, true], ["Bank", detail.bank], ["Jatuh Tempo", detail.jatuhTempo], ["Tanggal Bayar", detail.tglBayar]].map(([k, v, mono], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--line)", fontSize: 14 }}>
                <span style={{ color: "var(--ink-3)", fontWeight: 600 }}>{k}</span>
                <span className={mono ? "mono" : ""} style={{ fontWeight: 700 }}>{v}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0 0" }}>
              <span style={{ color: "var(--ink-3)", fontWeight: 600, fontSize: 14 }}>Status</span>
              <Badge tone="green" dot>{detail.status}</Badge>
            </div>
            <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 14, padding: 16, background: "var(--surface-2)", borderRadius: 14 }}>
              <Barcode width={160} />
              <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>Kode validasi cetak. Pindai untuk verifikasi keaslian dokumen.</div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

Object.assign(window, { Dashboard, Profil, Pembayaran });
