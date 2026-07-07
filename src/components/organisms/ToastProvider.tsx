import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { Icon } from "../atoms/Icon";
import type { ToastKind, ToastPush } from "@/types/ui";

type Toast = {
  id: string;
  message: string;
  kind: ToastKind;
};

const ToastContext = createContext<ToastPush | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function push(message: string, kind: ToastKind = "ok") {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, message, kind }]);
    setTimeout(
      () => setToasts((current) => current.filter((toast) => toast.id !== id)),
      3200,
    );
  }

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="toast-wrap">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.kind}`}>
            <Icon name={toast.kind === "err" ? "warn" : "check"} size={18} />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastPush {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
}
