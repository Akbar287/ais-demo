import type { ImgPlaceholderProps } from "@/types/ui";

export function ImgPlaceholder({ label, h = 120, r = 14 }: ImgPlaceholderProps) {
  return (
    <div className="ph" style={{ height: h, borderRadius: r, border: "1px dashed var(--line-2)", display: "grid", placeItems: "center" }}>
      <span style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--ink-3)", background: "var(--bg)", padding: "3px 8px", borderRadius: 6 }}>{label}</span>
    </div>
  );
}
