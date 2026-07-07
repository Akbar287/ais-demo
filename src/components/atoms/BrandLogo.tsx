import Image from "next/image";
import type { CSSProperties } from "react";

type BrandLogoProps = {
  size?: number;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
};

export function BrandLogo({ size = 42, className = "", style, priority = false }: BrandLogoProps) {
  const padding = Math.max(3, Math.round(size * 0.1));
  const imageSize = Math.max(18, size - padding * 2);

  return (
    <span
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: Math.max(8, Math.round(size * 0.26)),
        background: "#fff",
        display: "inline-grid",
        placeItems: "center",
        flexShrink: 0,
        overflow: "hidden",
        boxShadow: "0 4px 12px color-mix(in srgb, var(--orange) 24%, transparent)",
        ...style,
      }}
    >
      <Image
        src="/images/logo.png"
        alt="Logo Institut Teknologi Indonesia"
        width={imageSize}
        height={imageSize}
        priority={priority}
        style={{ width: imageSize, height: imageSize, objectFit: "contain", display: "block" }}
      />
    </span>
  );
}
