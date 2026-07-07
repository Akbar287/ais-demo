import { useState } from "react";
import { Icon } from "@/components/atoms";
import { AIS_ROLES } from "@/data/roles";

// ============================================================
// AIS — Login / Pemilihan Peran (RBAC entry point)
// ============================================================
function Login({ onLogin }) {
  const R = AIS_ROLES;
  const order = ["mahasiswa", "dosen", "pa", "kaprodi", "keuangan", "admin", "pustakawan", "pmb", "hr", "pengadaan", "aset", "calon", "lppm", "lpm", "mbkm", "kkn", "tu", "itsm", "kemahasiswaan", "kerjasama", "humas", "bau", "dokumen", "workflow"];
  const cats = ["Pendaftaran", "Akademik", "Riset & Mutu", "Layanan & Operasional", "Platform & Sistem"];
  const safeOrder = order.filter((rid) => R.roleMeta[rid] && R.personas[rid]);
  const [hover, setHover] = useState<string | null>(null);
  const [step, setStep] = useState("auth");
  const [uname, setUname] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [err, setErr] = useState(false);

  function submit(e) {
    if (e) e.preventDefault();
    if (!uname.trim() || !pwd.trim()) { setErr(true); return; }
    setErr(false); setStep("role");
  }

  return (
    <div className="login-wrap" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.15fr)", background: "var(--bg)" }}>
      {/* Brand panel */}
      <div className="login-brand" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(150deg, #2c241c, #4a3a28 60%, var(--orange-600))", color: "#fff", padding: "56px 54px", display: "flex", flexDirection: "column" }}>
        <div style={{ position: "absolute", right: -90, top: -90, width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(217,119,52,.4), transparent 68%)" }} />
        <div style={{ position: "absolute", left: -70, bottom: -80, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,.07), transparent 70%)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 13, position: "relative" }}>
          <div className="sb-logo" style={{ width: 46, height: 46, fontSize: 21 }}>A</div>
          <div>
            <b style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-.02em", display: "block" }}>AIS</b>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.7)" }}>Academic Information System</span>
          </div>
        </div>

        <div style={{ marginTop: "auto", position: "relative" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--orange)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 14 }}>Sistem Informasi Akademik Terpadu</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.08, margin: "0 0 16px", textWrap: "balance" }}>Satu portal,<br />setiap peran punya menunya.</h1>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,.75)", maxWidth: 430, margin: 0 }}>
            Pilih peran untuk masuk. Menu dan hak akses menyesuaikan otomatis mengikuti
            kebijakan <b style={{ color: "#fff" }}>IAM / RBAC</b> di atas arsitektur <b style={{ color: "#fff" }}>34 microservice</b> event-driven.
          </p>
          <div style={{ display: "flex", gap: 22, marginTop: 30, flexWrap: "wrap" }}>
            {[["34", "Microservice"], ["453", "Entitas data"], ["11", "Peran / Modul"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "var(--mono)", color: "#fff" }}>{v}</div>
                <div style={{ fontSize: 11.5, color: "rgba(255,255,255,.6)", fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 38, fontSize: 11.5, color: "rgba(255,255,255,.45)", position: "relative" }}>
          On-premise · Spring Boot · Kafka · Kubernetes · NGINX · PostgreSQL / MongoDB / Elasticsearch
        </div>
      </div>

      {/* Right panel */}
      <div className="login-right" style={{ padding: "44px 54px", display: "flex", flexDirection: "column", justifyContent: step === "auth" ? "center" : "flex-start", maxWidth: 760, width: "100%", overflowY: "auto", maxHeight: "100vh" }}>
        {step === "auth" ? (
          <div style={{ maxWidth: 384, width: "100%", margin: "0 auto" }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.025em", margin: "0 0 6px" }}>Masuk ke akun Anda</h2>
            <p style={{ margin: "0 0 26px", color: "var(--ink-2)", fontSize: 14.5 }}>Gunakan akun SSO universitas Anda (NIM / NIP / NIDN).</p>
            <form onSubmit={submit}>
              <div className="field">
                <label>Username</label>
                <input value={uname} onChange={(e) => { setUname(e.target.value); setErr(false); }} placeholder="NIM / NIP / NIDN" autoFocus />
              </div>
              <div className="field">
                <label>Kata Sandi</label>
                <div style={{ position: "relative" }}>
                  <input type={showPwd ? "text" : "password"} value={pwd} onChange={(e) => { setPwd(e.target.value); setErr(false); }} placeholder="Masukkan kata sandi" style={{ paddingRight: 44 }} />
                  <button type="button" onClick={() => setShowPwd((s) => !s)} aria-label="Tampilkan sandi" style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 32, height: 32, border: "none", background: "none", cursor: "pointer", color: "var(--ink-3)", display: "grid", placeItems: "center" }}><Icon name={showPwd ? "eyeoff" : "eye"} size={18} /></button>
                </div>
              </div>
              {err && <div style={{ fontSize: 12.5, color: "var(--red)", fontWeight: 600, margin: "-6px 0 14px", display: "flex", alignItems: "center", gap: 6 }}><Icon name="warn" size={14} /> Lengkapi username dan kata sandi.</div>}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "var(--ink-2)", cursor: "pointer" }}><input type="checkbox" defaultChecked style={{ width: 15, height: 15, accentColor: "var(--orange)" }} /> Ingat saya</label>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 13, fontWeight: 700, color: "var(--orange-600)", textDecoration: "none" }}>Lupa sandi?</a>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: 13 }}>Masuk <Icon name="chevR" size={16} /></button>
            </form>
            <div style={{ marginTop: 16, padding: "11px 13px", background: "var(--surface-2)", borderRadius: 11, fontSize: 12, color: "var(--ink-3)", display: "flex", gap: 8, alignItems: "center" }}>
              <Icon name="info" size={15} /><span>Demo: isi sembarang username &amp; sandi, lalu pilih peran.</span>
            </div>
            <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 9, fontSize: 12, color: "var(--ink-3)" }}>
              <Icon name="lock" size={15} /><span>Diamankan oleh <b style={{ color: "var(--ink-2)" }}>Identity &amp; Access Service (IAM)</b>.</span>
            </div>
          </div>
        ) : (
        <>
        <button onClick={() => setStep("auth")} className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start", marginBottom: 14 }}><Icon name="chevL" size={15} /> Ganti akun</button>
        <h2 style={{ fontSize: 25, fontWeight: 800, letterSpacing: "-.025em", margin: "0 0 6px" }}>Pilih peran</h2>
        <p style={{ margin: "0 0 22px", color: "var(--ink-2)", fontSize: 14.5 }}>Akun Anda memiliki beberapa peran. Setiap peran membuka modul yang berbeda.</p>

        {cats.map((cat) => (
          <div key={cat} style={{ marginBottom: 22 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 11 }}>{cat}</div>
            <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {safeOrder.filter((rid) => R.roleMeta[rid].cat === cat).map((rid) => {
                const meta = R.roleMeta[rid];
                const on = hover === rid;
                return (
                  <button key={rid} className="card" onMouseEnter={() => setHover(rid)} onMouseLeave={() => setHover(null)}
                    onClick={() => onLogin(rid)}
                    style={{ textAlign: "left", cursor: "pointer", padding: 15, fontFamily: "var(--sans)", border: on ? `1.5px solid ${meta.color}` : "1px solid var(--line)", transform: on ? "translateY(-3px)" : "none", boxShadow: on ? "var(--shadow-lg)" : "var(--shadow)", transition: "all .16s" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, display: "grid", placeItems: "center", background: meta.bg, color: meta.color, flexShrink: 0 }}>
                        <Icon name={meta.ic} size={21} />
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: "-.01em", lineHeight: 1.15 }}>{meta.label}</div>
                        <div style={{ fontSize: 10.5, color: "var(--ink-3)", fontFamily: "var(--mono)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{meta.svc}</div>
                      </div>
                      <Icon name="chevR" size={16} style={{ color: on ? meta.color : "var(--ink-3)", flexShrink: 0 }} />
                    </div>
                    <p style={{ margin: "10px 0 0", fontSize: 12, color: "var(--ink-2)", lineHeight: 1.45 }}>{meta.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12, color: "var(--ink-3)" }}>
          <Icon name="lock" size={15} />
          <span>Autentikasi tersentral di <b style={{ color: "var(--ink-2)" }}>Identity &amp; Access Service (IAM)</b> — SSO, MFA, token & sesi (Redis).</span>
        </div>
        </>
        )}
      </div>
    </div>
  );
}

export { Login };
