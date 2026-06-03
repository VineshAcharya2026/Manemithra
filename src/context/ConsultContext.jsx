import { createContext, useCallback, useContext, useState } from "react";
import ConsultationModal from "../components/ConsultationModal";

const ConsultContext = createContext(null);

export function ConsultProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [meta, setMeta] = useState({});

  const openConsult = useCallback((options = {}) => {
    setMeta(options);
    setIsOpen(true);
  }, []);

  const closeConsult = useCallback(() => {
    setIsOpen(false);
    setMeta({});
  }, []);

  return (
    <ConsultContext.Provider value={{ openConsult, closeConsult, isOpen }}>
      {children}
      {isOpen && <ConsultationModal onClose={closeConsult} meta={meta} />}
    </ConsultContext.Provider>
  );
}

export function useConsult() {
  const ctx = useContext(ConsultContext);
  if (!ctx) {
    throw new Error("useConsult must be used within ConsultProvider");
  }
  return ctx;
}
