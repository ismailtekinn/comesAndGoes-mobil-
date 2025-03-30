export interface Customer {
    id: number;
    debtIssuanceDate: string;
    debtAmount: number;
    debtCurrency: string;
    type: "Borç" | "Alacak";
  }

  export interface CashTransaction {
    id: number;
    totalCash: number;
    cashCurrency: string;
    transactionType: "in" | "out";
    userId: number;
  }
  

 export  type CashDifferenceType = {
    balance: number;
    currency: string;
    type: string;
  };