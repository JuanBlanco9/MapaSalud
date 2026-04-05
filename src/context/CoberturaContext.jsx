import { createContext, useContext } from "react";

const CoberturaContext = createContext(null);

export function CoberturaProvider({ value, children }) {
  return (
    <CoberturaContext.Provider value={value}>
      {children}
    </CoberturaContext.Provider>
  );
}

export function useCobertura() {
  const ctx = useContext(CoberturaContext);
  if (!ctx) throw new Error("useCobertura must be used within CoberturaProvider");
  return ctx;
}
