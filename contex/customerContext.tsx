import React, { createContext, useState, useContext, ReactNode } from "react";

// CustomerContext'in value'sunu doğru tipte tanımlıyoruz
const CustomerContext = createContext<
  [any[], React.Dispatch<React.SetStateAction<any[]>>] | undefined
>(undefined);

interface CustomerProviderProps {
  children: ReactNode;
}

export const CustomerProvider = ({ children }: CustomerProviderProps) => {
  // customers ve setCustomers tanımlaması burada yapılıyor
  const [customers, setCustomers] = useState<any[]>([]);
  const [transferCustomers, setTransferCustomers] = useState<any[]>([]);

  return (
    <CustomerContext.Provider value={[customers, setCustomers]}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = (): [any[], React.Dispatch<React.SetStateAction<any[]>>] => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomers must be used within a CustomerProvider");
  }
  return context;
};
