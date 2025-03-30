import React, { createContext, useState, useContext, ReactNode } from "react";

// CustomerContext'in value'sunu doğru tipte tanımlıyoruz
const MoneyTransferCustomerContext = createContext<
  [any[], React.Dispatch<React.SetStateAction<any[]>>] | undefined
>(undefined);

interface MoneyTransferCustomerProviderProps {
  children: ReactNode;
}

export const MoneyTransferCustomerProvider = ({ children }: MoneyTransferCustomerProviderProps) => {
  // customers ve setCustomers tanımlaması burada yapılıyor
  const [transferCustomers, setTransferCustomers] = useState<any[]>([]);

  return (
    <MoneyTransferCustomerContext.Provider value={[transferCustomers, setTransferCustomers]}>
      {children}
    </MoneyTransferCustomerContext.Provider>
  );
};

export const useMoneyTransferCustomers = (): [any[], React.Dispatch<React.SetStateAction<any[]>>] => {
  const context = useContext(MoneyTransferCustomerContext);
  if (!context) {
    throw new Error("useCustomers must be used within a CustomerProvider");
  }
  return context;
};
