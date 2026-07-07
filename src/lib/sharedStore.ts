"use client";

import { useEffect, useState } from "react";

type SharedWindow = Window & {
  __AIS_STORE?: Record<string, unknown>;
};

function getStore() {
  if (typeof window === "undefined") return null;
  const sharedWindow = window as SharedWindow;
  sharedWindow.__AIS_STORE ??= {};
  return sharedWindow.__AIS_STORE;
}

export function useSharedList<T>(
  key: string,
  seed: T[],
): [T[], (next: T[] | ((current: T[]) => T[])) => void] {
  const [, forceRender] = useState(0);
  const store = getStore();

  if (store && !(key in store)) {
    store[key] = seed;
  }

  useEffect(() => {
    const eventName = `ais-store:${key}`;
    const handleChange = () => forceRender((value) => value + 1);
    window.addEventListener(eventName, handleChange);
    return () => window.removeEventListener(eventName, handleChange);
  }, [key]);

  const current = ((getStore()?.[key] as T[] | undefined) ?? seed);

  function setList(next: T[] | ((current: T[]) => T[])) {
    const activeStore = getStore();
    if (!activeStore) return;

    const previous = ((activeStore[key] as T[] | undefined) ?? seed);
    activeStore[key] =
      typeof next === "function" ? (next as (current: T[]) => T[])(previous) : next;
    window.dispatchEvent(new CustomEvent(`ais-store:${key}`));
  }

  return [current, setList];
}
