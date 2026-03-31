"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const PortalContext = createContext<any>(null);

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const session = Cookies.get("user_session");
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  return (
    <PortalContext.Provider value={{ user, setUser }}>
      {children}
    </PortalContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(PortalContext);
  if (!context) throw new Error("useAuth must be used within PortalProvider");
  return context;
};