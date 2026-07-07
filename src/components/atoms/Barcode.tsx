import type { ReactNode } from "react";
import type { BarcodeProps } from "@/types/ui";

export function Barcode({ width = 180 }: BarcodeProps) {
  const bars: ReactNode[] = [];
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
