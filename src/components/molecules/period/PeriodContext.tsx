import { createContext, useContext, useSyncExternalStore } from "react";
import type {
  AcademicPeriod,
  PeriodContextValue,
  PeriodStatus,
} from "@/types/ui";

export const AIS_PERIODS = [
  { id: "2026-1", ta: "2026/2027", smt: "Ganjil", status: "planning" },
  { id: "2025-2", ta: "2025/2026", smt: "Genap", status: "active" },
  { id: "2025-1", ta: "2025/2026", smt: "Ganjil", status: "archived" },
  { id: "2024-2", ta: "2024/2025", smt: "Genap", status: "archived" },
  { id: "2024-1", ta: "2024/2025", smt: "Ganjil", status: "archived" },
] as const satisfies readonly AcademicPeriod[];

export const PERIOD_STATUS: Record<
  PeriodStatus,
  readonly [label: string, color: string, background: string]
> = {
  active: ["Aktif", "var(--green)", "var(--green-bg)"],
  planning: ["Mendatang", "var(--blue)", "var(--blue-bg)"],
  archived: ["Arsip", "var(--ink-3)", "var(--surface-2)"],
};

const PeriodCtx = createContext<PeriodContextValue | null>(null);
const PERIOD_STORAGE_KEY = "ais_period";
const PERIOD_CHANGE_EVENT = "ais-period-change";

function subscribeToPeriodChange(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(PERIOD_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(PERIOD_CHANGE_EVENT, callback);
  };
}

function getStoredPeriodId() {
  try {
    return localStorage.getItem(PERIOD_STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerPeriodId() {
  return null;
}

export function usePeriod(): PeriodContextValue {
  const context = useContext(PeriodCtx);
  if (!context) {
    throw new Error("usePeriod must be used inside PeriodProvider");
  }
  return context;
}

export function PeriodProvider({ children }: { children: React.ReactNode }) {
  const activePeriod = AIS_PERIODS.find((item) => item.status === "active")!;
  const storedPeriodId = useSyncExternalStore(
    subscribeToPeriodChange,
    getStoredPeriodId,
    getServerPeriodId,
  );
  const period =
    AIS_PERIODS.find((item) => item.id === storedPeriodId) ?? activePeriod;

  function setPeriod(nextPeriod: AcademicPeriod) {
    try {
      localStorage.setItem(PERIOD_STORAGE_KEY, nextPeriod.id);
      window.dispatchEvent(new Event(PERIOD_CHANGE_EVENT));
    } catch {
      // The active period remains the safe fallback when storage is unavailable.
    }
  }

  return <PeriodCtx.Provider value={{ period, setPeriod }}>{children}</PeriodCtx.Provider>;
}
