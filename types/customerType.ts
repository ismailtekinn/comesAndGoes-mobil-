export type Customer = {
    clientName: string;
    clientSurname: string;
    clientPhone: string;
    userId: number;
    // id: number;
}

export type Debt = {
    debtAmount: number;
    debtCurrency: string;
    debtorId: number;
    creditorId: number;
    debtIssuanceDate: Date;
    debtRepaymentDate: Date;
}
export type NewDebt = {
    debtAmount: number;
    debtCurrency: string;
    debtorId: number;
    creditorId: number;
    description : string;
    debtIssuanceDate:string;
}
export type DebtDetail = {
 userId: number;
 customerId: number;
}
export type MoneyTransfer = {
    receivedAmount: number;
    moneyCurrency: string;
    senderId: number;
    receiverId: number;
    intermediaryId: number;
    transferDate: Date;
    receivedDate: Date;
}
export type AddUserCash = {
    totalCash: number;
    cashCurrency: string;
    userId: number;
    transactionType:string;
    description : string;
}
export type CustomerListProps = {
    reload: boolean;
  };