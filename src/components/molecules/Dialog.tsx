import { Card } from "../atoms/Card";
import type { DialogProps } from "@/types/ui";

export function Dialog({ children, onClose, width = "min(440px, 100%)", maxHeight = "85vh", className = "", style }: DialogProps) {
  return (
    <div
      className="dialog-bg"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(255,238,214,.46)",
        backdropFilter: "blur(34px) saturate(1.42)",
        WebkitBackdropFilter: "blur(34px) saturate(1.42)",
        display: "grid",
        placeItems: "center",
        padding: 20,
      }}
    >
      <Card
        className={["dialog-card", className].filter(Boolean).join(" ")}
        onClick={(event) => event.stopPropagation()}
        style={{
          position: "relative",
          width,
          maxHeight,
          display: "flex",
          flexDirection: "column",
          zIndex: 10001,
          boxShadow: "var(--shadow-lg)",
          padding: 8,
          animation: "pop .18s",
          ...style,
        }}
      >
        {children}
      </Card>
    </div>
  );
}
