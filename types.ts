import { Customers } from "./screens/DebtDetailList";

export type RootStackParamList = {
    Home: undefined;
    Signin: undefined;
    Help: undefined;
    Clock: undefined;
    Language: undefined;
    AddDebt: undefined;
    AccountInfoForm: undefined;
    Account: undefined;
    FormListDeneme: undefined;
    MoneyTransferScreen : undefined;
    CashReceivable:undefined;
    AddCustomer: undefined;
    DebtDetail: { customer: Customers }; 
    Login : undefined
    Register: undefined

}

export type User = {
    id: number;
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    phone: number;
  };
  

  export type LanguageType = "Türkçe" | "İngilizce" | "Farsça";