"use client";

import React, { createContext, useContext, useState } from "react";

export type Currency = "NGN" | "GBP";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    if (typeof window === "undefined") return "NGN";
    const saved = localStorage.getItem("shh_currency_v4");
    return saved === "GBP" ? "GBP" : "NGN";
  });

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
