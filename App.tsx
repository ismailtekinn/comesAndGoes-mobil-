import "setimmediate"; // 📌 setimmediate'ı içe aktar
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import AppRoute from "./AppRoute";
import { UserProvider } from "./contex/useContext";
import { LanguageProvider } from "./contex/languageContext";
import { CustomerProvider } from "./contex/customerContext";
import { MoneyTransferCustomerProvider } from "./contex/mtcustomerContext";
import { Platform } from "react-native";
import { ClockProvider } from "./contex/clockContext";

declare var global: {
  setImmediate: (fn: Function, ...args: any[]) => void;
};

if (typeof global !== "undefined" && Platform.OS !== "web") {
  global.setImmediate =
    global.setImmediate || ((fn, ...args) => setTimeout(fn, 0, ...args));
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <ClockProvider>
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
    </ClockProvider>
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
