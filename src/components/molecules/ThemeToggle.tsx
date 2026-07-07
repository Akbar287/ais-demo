"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { IconButton } from "../atoms";

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle() {
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <IconButton
      icon={mounted && isDark ? "moon" : "sun"}
      aria-label={mounted && isDark ? "Gunakan mode terang" : "Gunakan mode gelap"}
      title={mounted && isDark ? "Mode gelap" : "Mode terang"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    />
  );
}
