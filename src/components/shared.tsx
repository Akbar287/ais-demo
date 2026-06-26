// @ts-nocheck
import * as React from "react";

(window as any).React = React;

// ============================================================
// AIS — Shared Components & Icons
// ============================================================
const { useState, useEffect, useRef, createContext, useContext } = React;

// ---------- Icons (stroke-based, 24x24) ----------
function Icon({ name, size = 20, className = "", style = {} }) {
  const P = {
    fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round",
  };
  const paths = {
    home: <><path {...P} d="M3 10.5 12 4l9 6.5" /><path {...P} d="M5 9.5V20h14V9.5" /><path {...P} d="M9.5 20v-5h5v5" /></>,
    user: <><circle {...P} cx="12" cy="8" r="4" /><path {...P} d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6" /></>,
    key: <><circle {...P} cx="8" cy="14" r="4" /><path {...P} d="m11 11 8-8 2 2-2 2 2 2-2 2-2-2-3 3" /></>,
    report: <><path {...P} d="M6 3h8l4 4v14H6z" /><path {...P} d="M14 3v4h4" /><path {...P} d="M9 13h6M9 17h6M9 9h2" /></>,
    wallet: <><path {...P} d="M3 7.5h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path {...P} d="M3 7.5 5 4h11l2 3.5" /><circle {...P} cx="16.5" cy="13.5" r="1.3" /></>,
    book: <><path {...P} d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z" /><path {...P} d="M4 19a2 2 0 0 1 2-2h12" /><path {...P} d="M9 7h6M9 10h4" /></>,
    presentation: <><path {...P} d="M3 4h18M4 4v10h16V4M9 20l3-4 3 4M12 14v2" /></>,
    check: <><path {...P} d="m4 12 5 5L20 6" /></>,
    award: <><circle {...P} cx="12" cy="9" r="5" /><path {...P} d="m8.5 13.5-1.5 7 5-3 5 3-1.5-7" /></>,
    gift: <><rect {...P} x="3.5" y="9" width="17" height="5" rx="1" /><path {...P} d="M5 14v6h14v-6M12 9v11" /><path {...P} d="M12 9C12 6 9 4 7.5 5.5 6 7 9 9 12 9zM12 9c0-3 3-5 4.5-3.5C18 7 15 9 12 9z" /></>,
    help: <><circle {...P} cx="12" cy="12" r="9" /><path {...P} d="M9.5 9.5a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3" /><path {...P} d="M12 17h.01" /></>,
    calendar: <><rect {...P} x="3.5" y="5" width="17" height="16" rx="2.5" /><path {...P} d="M3.5 9.5h17M8 3v4M16 3v4" /></>,
    bell: <><path {...P} d="M6 10a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" /><path {...P} d="M10 20a2 2 0 0 0 4 0" /></>,
    search: <><circle {...P} cx="11" cy="11" r="7" /><path {...P} d="m20 20-3.5-3.5" /></>,
    download: <><path {...P} d="M12 4v11m0 0 4-4m-4 4-4-4" /><path {...P} d="M5 19h14" /></>,
    print: <><path {...P} d="M7 9V4h10v5" /><rect {...P} x="4" y="9" width="16" height="7" rx="2" /><path {...P} d="M7 14h10v6H7z" /><circle cx="17" cy="12" r="1" fill="currentColor" /></>,
    chevR: <><path {...P} d="m9 6 6 6-6 6" /></>,
    chevD: <><path {...P} d="m6 9 6 6 6-6" /></>,
    chevL: <><path {...P} d="m15 6-6 6 6 6" /></>,
    plus: <><path {...P} d="M12 5v14M5 12h14" /></>,
    x: <><path {...P} d="M6 6l12 12M18 6 6 18" /></>,
    logout: <><path {...P} d="M14 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8" /><path {...P} d="M18 8l4 4-4 4M22 12H10" /></>,
    edit: <><path {...P} d="M4 20h4L19 9l-4-4L4 16z" /><path {...P} d="m13.5 6.5 4 4" /></>,
    clock: <><circle {...P} cx="12" cy="12" r="9" /><path {...P} d="M12 7v5l3.5 2" /></>,
    pin: <><path {...P} d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" /><circle {...P} cx="12" cy="10" r="2.5" /></>,
    file: <><path {...P} d="M6 3h8l4 4v14H6z" /><path {...P} d="M14 3v4h4" /></>,
    info: <><circle {...P} cx="12" cy="12" r="9" /><path {...P} d="M12 11v5" /><path {...P} d="M12 7.5h.01" /></>,
    warn: <><path {...P} d="M12 4 2.5 20h19z" /><path {...P} d="M12 10v4" /><path {...P} d="M12 17.5h.01" /></>,
    grad: <><path {...P} d="M12 4 2 9l10 5 10-5z" /><path {...P} d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" /><path {...P} d="M22 9v5" /></>,
    filter: <><path {...P} d="M4 5h16l-6 7v6l-4 2v-8z" /></>,
    sliders: <><path {...P} d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h8M16 18h4" /><circle {...P} cx="16" cy="6" r="2" /><circle {...P} cx="8" cy="12" r="2" /><circle {...P} cx="14" cy="18" r="2" /></>,
    doc: <><path {...P} d="M6 3h12v18H6z" /><path {...P} d="M9 8h6M9 12h6M9 16h4" /></>,
    chart: <><path {...P} d="M4 20V4M4 20h16" /><path {...P} d="M8 16v-4M12 16V8M16 16v-6" /></>,
    mail: <><rect {...P} x="3" y="5" width="18" height="14" rx="2.5" /><path {...P} d="m4 7 8 6 8-6" /></>,
    phone: <><path {...P} d="M5 4h4l1.5 5-2 1.5a11 11 0 0 0 5 5l1.5-2 5 1.5v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" /></>,
    lock: <><rect {...P} x="5" y="11" width="14" height="9" rx="2" /><path {...P} d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
    eye: <><path {...P} d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle {...P} cx="12" cy="12" r="3" /></>,
    eyeoff: <><path {...P} d="M3 3l18 18M10.5 10.6a3 3 0 0 0 4 4M6.5 6.6C4 8.2 2 12 2 12s3.5 7 10 7a10 10 0 0 0 4-.7M9.5 5.3A10 10 0 0 1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-2.6 3.4" /></>,
    users: <><circle {...P} cx="9" cy="8" r="3.5" /><path {...P} d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" /><path {...P} d="M16 5.2a3.5 3.5 0 0 1 0 5.6M17.5 14.6c2 .7 3.5 2.5 3.5 5.4" /></>,
    userCheck: <><circle {...P} cx="9" cy="8" r="4" /><path {...P} d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6" /><path {...P} d="m16 12 2 2 4-4" /></>,
    building: <><rect {...P} x="4" y="3" width="12" height="18" rx="1.5" /><path {...P} d="M16 8h4v13H4" /><path {...P} d="M8 7h2M8 11h2M8 15h2M13 7h0M13 11h0" /></>,
    shield: <><path {...P} d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z" /><path {...P} d="m9 12 2 2 4-4" /></>,
    server: <><rect {...P} x="3" y="4" width="18" height="7" rx="2" /><rect {...P} x="3" y="13" width="18" height="7" rx="2" /><path {...P} d="M7 7.5h.01M7 16.5h.01" /></>,
    database: <><ellipse {...P} cx="12" cy="5.5" rx="8" ry="3" /><path {...P} d="M4 5.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /><path {...P} d="M4 11.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>,
    activity: <><path {...P} d="M3 12h4l3 8 4-16 3 8h4" /></>,
    refresh: <><path {...P} d="M20 11a8 8 0 0 0-14-4l-2 2m0 0V5m0 4h4" /><path {...P} d="M4 13a8 8 0 0 0 14 4l2-2m0 0v4m0-4h-4" /></>,
    trash: <><path {...P} d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></>,
    link: <><path {...P} d="M9 15l6-6" /><path {...P} d="M10.5 7.5 13 5a3.5 3.5 0 0 1 5 5l-2.5 2.5M13.5 16.5 11 19a3.5 3.5 0 0 1-5-5l2.5-2.5" /></>,
    upload: <><path {...P} d="M12 16V5m0 0 4 4m-4-4-4 4" /><path {...P} d="M5 19h14" /></>,
    flag: <><path {...P} d="M5 21V4m0 0h11l-2 4 2 4H5" /></>,
    layers: <><path {...P} d="m12 3 9 5-9 5-9-5z" /><path {...P} d="m3 13 9 5 9-5M3 17l9 5 9-5" /></>,
    cart: <><path {...P} d="M3 4h2l2.2 11.5h10L19.5 8H6" /><circle {...P} cx="9" cy="20" r="1.4" /><circle {...P} cx="17" cy="20" r="1.4" /></>,
    box: <><path {...P} d="M12 3 21 7.5v9L12 21 3 16.5v-9z" /><path {...P} d="M3 7.5 12 12l9-4.5M12 12v9" /></>,
    wrench: <><path {...P} d="M21 3a5 5 0 0 1-6.6 6.6L6 18l-2-2 8.4-8.4A5 5 0 0 1 19 1z" /><path {...P} d="m5 16 3 3" /></>,
    bookOpen: <><path {...P} d="M12 6C10 4.5 6.5 4.3 4 5v13c2.5-.7 6-.5 8 1 2-1.5 5.5-1.7 8-1V5c-2.5-.7-6-.5-8 1z" /><path {...P} d="M12 6v13" /></>,
    play: <><path {...P} d="M7 5v14l11-7z" /></>,
    clipboard: <><rect {...P} x="6" y="4.5" width="12" height="16.5" rx="2" /><path {...P} d="M9 4.5V3.5h6v1" /><path {...P} d="M9 10h6M9 13.5h4" /></>,
    idcard: <><rect {...P} x="3" y="5" width="18" height="14" rx="2.5" /><circle {...P} cx="8.5" cy="11" r="2" /><path {...P} d="M5.4 16c.4-1.4 1.7-2.1 3.1-2.1s2.7.7 3.1 2.1M14.5 9.5h4M14.5 13h4M14.5 16h2.5" /></>,
    menu: <><path {...P} d="M3 6h18M3 12h18M3 18h18" /></>,
    ticket: <><path {...P} d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5V10a2 2 0 0 0 0 4v2.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5V14a2 2 0 0 0 0-4z" /><path {...P} d="M14 6v12" strokeDasharray="2 2" /></>,
    beaker: <><path {...P} d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" /><path {...P} d="M7.5 14h9" /></>,
    handshake: <><path {...P} d="m11 17 2 2 4-4M3 12l4-4 5 4 2-2 4 3" /><path {...P} d="M3 12v3l4 4M21 11v4l-4 4" /></>,
    target: <><circle {...P} cx="12" cy="12" r="8" /><circle {...P} cx="12" cy="12" r="4" /><circle {...P} cx="12" cy="12" r=".5" /></>,
    megaphone: <><path {...P} d="M3 11v2a1 1 0 0 0 1 1h2l9 5V5L6 10H4a1 1 0 0 0-1 1Z" /><path {...P} d="M18 8a4 4 0 0 1 0 8" /></>,
    car: <><path {...P} d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13M5 13h14v4H5zM5 13a2 2 0 0 0-2 2v0M19 13a2 2 0 0 1 2 2v0" /><path {...P} d="M7 17v1.5M17 17v1.5" /></>,
    signature: <><path {...P} d="M3 17c3 0 3-8 6-8s2 6 4 6 2-3 4-3 1.5 1.5 4 1.5" /><path {...P} d="M3 21h18" /></>,
    workflow: <><rect {...P} x="3" y="3" width="6" height="6" rx="1.2" /><rect {...P} x="15" y="15" width="6" height="6" rx="1.2" /><path {...P} d="M9 6h6a3 3 0 0 1 3 3v6" /></>,
    briefcase: <><rect {...P} x="3" y="7" width="18" height="13" rx="2" /><path {...P} d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12h18" /></>,
    scale: <><path {...P} d="M12 3v18M7 7h10M5 21h14" /><path {...P} d="M7 7 4 13a3 3 0 0 0 6 0L7 7ZM17 7l-3 6a3 3 0 0 0 6 0l-3-6Z" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      {paths[name] || null}
    </svg>
  );
}

// ---------- Toast context ----------
const ToastCtx = createContext(null);
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  function push(msg, kind = "ok") {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, msg, kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="toast-wrap">
        {toasts.map((t) => (
          <div key={t.id} className={"toast " + t.kind}>
            <Icon name={t.kind === "err" ? "warn" : "check"} size={18} />
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
const useToast = () => useContext(ToastCtx);

// ---------- Modal ----------
function Modal({ title, subtitle, onClose, children, footer, wide }) {
  useEffect(() => {
    function esc(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" style={wide ? { maxWidth: 860 } : {}} onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h3>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button className="x-btn" onClick={onClose}><Icon name="x" size={18} /></button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

// ---------- Badge ----------
function Badge({ tone = "gray", children, dot }) {
  return <span className={"badge " + tone}>{dot && <span className="dot" style={{ background: "currentColor" }} />}{children}</span>;
}

// ---------- Page header ----------
function PageHead({ title, desc, actions }) {
  return (
    <div className="page-head" style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
      <div style={{ flex: 1 }}>
        <h1>{title}</h1>
        {desc && <p>{desc}</p>}
      </div>
      {actions && <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>{actions}</div>}
    </div>
  );
}

// ---------- Placeholder barcode (for printed reports) ----------
function Barcode({ width = 180 }) {
  const bars = [];
  let x = 0;
  const seed = [2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 2, 1, 3, 1, 2, 1, 4, 2, 1, 3, 1, 2];
  seed.forEach((w, i) => {
    if (i % 2 === 0) bars.push(<rect key={i} x={x} y="0" width={w * 2} height="44" fill="#2c241c" />);
    x += w * 2 + (i % 2 === 0 ? 0 : 0);
    x += i % 2 === 0 ? 0 : w * 2;
  });
  return (
    <svg width={width} height="52" viewBox={`0 0 ${x} 52`} preserveAspectRatio="none" style={{ display: "block" }}>
      {bars}
    </svg>
  );
}

// ---------- Image placeholder ----------
function ImgPlaceholder({ label, h = 120, r = 14 }) {
  return (
    <div className="ph" style={{ height: h, borderRadius: r, border: "1px dashed var(--line-2)", display: "grid", placeItems: "center" }}>
      <span style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--ink-3)", background: "var(--bg)", padding: "3px 8px", borderRadius: 6 }}>{label}</span>
    </div>
  );
}

const rupiah = (n) => "Rp " + n.toLocaleString("id-ID");
const initials = (s) => s.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

Object.assign(window, {
  React, useState, useEffect, useRef, createContext, useContext,
  Icon, ToastProvider, useToast, Modal, Badge, PageHead, Barcode, ImgPlaceholder, rupiah, initials,
});

export { Icon, ToastProvider, useToast, Modal, Badge, PageHead, Barcode, ImgPlaceholder, rupiah, initials, createContext, useContext };
