import type { PageHeadProps } from "@/types/ui";

export function PageHead({ title, desc, actions }: PageHeadProps) {
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
