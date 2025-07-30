import { Customers } from "./screens/DebtDetailList";

export type RootStackParamList = {
    Home: undefined;
    Signin: undefined;
    Help: undefined;
    Clock: undefined;
    Language: undefined;
    AddDebt: {customerId: number};
    AddTransaction: {customerId: number, transactionType: string};
    AddDebtDeneme: undefined;
    AccountInfoForm: undefined;
    Account: undefined;
    FormListDeneme: undefined;
    MoneyTransferScreen : undefined;
    // CashReceivable:undefined;
    CashReceivable:{customerId: number};
    CashReceivableDeneme:undefined;
    AddCustomer: undefined;
    DebtDetail: { customer: Customers }; 
    Login : undefined;
    Register: undefined;
    DebtList: undefined;
    AddUserCashScreen:{transactionType : string};
    PasswordUpdateScreen : undefined
    HomeCustomerListScreen: undefined
    HomeCustomerDetail: {customerId: number,customerName: string,customerSurname:string,customerPhone:string}
    AccountActivityDeneme: undefined
    AccountActivity:undefined
    CreatePdfButton:undefined
    EditAccountActivity: {id: number,totalCash:number,transactionType: string,description:string}
    EditTransaction:{recordId: number,debtAmount:number,transactionType: string,debtIssuanceDate:string,description:string,customerName: string,customerSurname:string,customerPhone:string}
    CurrencCurrencyConverteryConverter:undefined

}

export type User = {
    id: number;
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    phone: number;
    roleId:number;
  };
  

  export type LanguageType = "Türkçe" | "İngilizce" | "Farsça";