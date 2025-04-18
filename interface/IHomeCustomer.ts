export interface Customer {
    id: number;
    debtIssuanceDate: string;
    recordId:number,
    debtAmount: number;
    debtCurrency: string;
    description:string;
    type: "Borç" | "Alacak";
    img:string;
  }

  export interface CashTransaction {
    id: number;
    totalCash: number;
    cashCurrency: string;
    transactionType: "in" | "out";
    userId: number;
    createdAt:string;
    description:string;
  }
  

 export  type CashDifferenceType = {
    balance: number;
    currency: string;
    type: string;
  };