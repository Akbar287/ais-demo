import { Card } from "../atoms/Card";
import type { DialogProps } from "@/types/ui";

export function Dialog({ children, onClose, width = "min(440px, 100%)", maxHeight = "85vh", className = "", style }: DialogProps) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(44,36,28,.52)",
        backdropFilter: "blur(7px)",
        WebkitBackdropFilter: "blur(7px)",
        display: "grid",
        placeItems: "center",
        padding: 20,
      }}
    >
      <Card
        className={className}
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
