export interface IPdfType {
  clientId: number;
  createdAt: string;
  description: string;
  id: number;
  isActive: boolean;
  transactionAmount: number;
  transactionCurrency: string;
  transactionType: "cash" | "debt";
  userId: number;
}

export interface IPdfCustomerInfo {
  clientName: string;
  clientSurname: string;
  clientPhone: string;
  TotalCash: number;
  TotalDebt: number;
}

export interface TransactionDetailInfo {
  userName: string | undefined;
  userSurname: string | undefined;
  userPhone: number | undefined;
  pdfTransactionAmount: number;
  pdfTransactionType: string;
  pdfTransactionDescription: string;
  pdfTransactionDate: string;
  customerName: string;
  customerSurname : string;
  customerPhone: string;
}
