import type { DemoRole } from "@/types/demo";

export function viewToSegment(view: string): string {
  return view.replaceAll("_", "-");
}

export function segmentToView(segment: string): string {
  return segment.replaceAll("-", "_");
}

function encodePart(value: string): string {
  return encodeURIComponent(value);
}

export function roleViewPath(role: DemoRole, view: string, rest: string[] = []): string {
  const parts = [role, viewToSegment(view), ...rest].filter(Boolean);
  return `/${parts.map(encodePart).join("/")}`;
}

export function publicPath(page: "home" | "login" | "modul" | "berita" | "agenda", id?: string): string {
  if (page === "home") return "/";
  const base = page === "agenda" ? "/agenda" : `/${page}`;
  return id ? `${base}/${encodePart(id)}` : base;
}
