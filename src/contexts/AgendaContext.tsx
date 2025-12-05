"use client";

import React from "react";

type AgendaContextValue = {
  selectedIds: Set<string>;
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
  hydrated: boolean;
};

const AgendaContext = React.createContext<AgendaContextValue | undefined>(undefined);

const STORAGE_KEY = "confplanner:agenda";

export function AgendaProvider({ children }: { children: React.ReactNode }) {
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = React.useState(false);

  // Load from localStorage
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const arr: string[] = JSON.parse(raw);
        setSelectedIds(new Set(arr));
      }
    } catch {
      console.error("Error loading agenda from localStorage");
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage
  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(selectedIds)));
    } catch {
      console.error("Error saving agenda to localStorage");
    }
  }, [selectedIds]);

  const add = (id: string) => setSelectedIds((prev) => new Set(prev).add(id));
  const remove = (id: string) =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  const toggle = (id: string) =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const clear = () => setSelectedIds(new Set());

  const value = React.useMemo(
    () => ({ selectedIds, add, remove, toggle, clear, hydrated }),
    [selectedIds, hydrated],
  );

  return <AgendaContext.Provider value={value}>{children}</AgendaContext.Provider>;
}

export function useAgenda() {
  const ctx = React.useContext(AgendaContext);
  if (!ctx) throw new Error("useAgenda must be used inside AgendaProvider");
  return ctx;
}
