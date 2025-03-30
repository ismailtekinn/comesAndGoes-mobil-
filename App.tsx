import "setimmediate"; // 📌 setimmediate'ı içe aktar
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import ScrollableListScreen from "./screens/ScrolView";
import LoginScreen from "./screens/LoginScreen";
import Help from "./screens/Help";
import Language from "./screens/Language";
import Clock from "./screens/Clock";
import CustomerCard from "./screens/CustomerCard";
import ProcessSidebar from "./screens/ProcessSidebar";
import DebtList from "./screens/DebtList";
import DebtCard from "./screens/DebtCard";
import AddDebt from "./screens/DeleteAddDebt";
import AccountInfoForm from "./screens/AccountInfoForm";
import Account from "./screens/Account";
import AdminHome from "./screens/AdminHome";
import HomeScreen from "./screens/HomeScreen";
import CashReceivable from "./screens/DeleteCashReceivable";
import MoneyTransferList from "./screens/MoneyTransferList";
import MoneyTransferScreen from "./screens/MoneyTransferScreen";
import AddCustomer from "./screens/AddCustomer";
import DebtDetailList from "./screens/DebtDetailList";
import DebtDetail from "./screens/DebtDetail";
import AppRoute from "./AppRoute";
import { UserProvider } from "./contex/useContext";
import { LanguageProvider } from "./contex/languageContext";
import { CustomerProvider } from "./contex/customerContext";
import { MoneyTransferCustomerProvider } from "./contex/mtcustomerContext";
import { Platform } from "react-native";


declare var global: {
  setImmediate: (fn: Function, ...args: any[]) => void;
};

if (typeof global !== "undefined" && Platform.OS !== "web") {
  global.setImmediate = global.setImmediate || ((fn, ...args) => setTimeout(fn, 0, ...args));
}

const Stack = createStackNavigator();

export default function App() {

  return (
    <MoneyTransferCustomerProvider>
    <CustomerProvider>
      <LanguageProvider>
        <UserProvider>
          <StatusBar style="auto" />
          <AppRoute />
        </UserProvider>
      </LanguageProvider>
    </CustomerProvider>
    </MoneyTransferCustomerProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
