"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Currency = "NGN" | "GBP";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("NGN");

  useEffect(() => {
    const saved = localStorage.getItem("shh_currency_v4");
    // One-time sync from localStorage after hydration (server always renders "NGN") — not a cascading update.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "GBP") setCurrencyState("GBP");
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("shh_currency_v4", c);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, symbol: currency === "NGN" ? "₦" : "£" }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
  return ctx;
}
