// App.tsx

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import HomePage from "./screens/HomePage";
import ScrollableListScreen from "./screens/ScrolView";
import LoginScreen from "./screens/LoginScreen";
import Help from "./screens/Help";
import Language from "./screens/Language";
import Clock from "./screens/Clock";
import CustomerCard from "./screens/CustomerCard";
import ProcessSidebar from "./screens/ProcessSidebar";
import DebtList from "./screens/DebtList";
import DebtCard from "./screens/DebtCard";
import AddDebt from "./screens/AddDebt";
import AccountInfoForm from "./screens/AccountInfoForm";
import Account from "./screens/Account";
import AdminHome from "./screens/AdminHome";
import HomeScreen from "./screens/HomeScreen";
import CashReceivable from "./screens/CashReceivable";
import MoneyTransferList from "./screens/MoneyTransferList";
import MoneyTransferScreen from "./screens/MoneyTransferScreen";
import AddCustomer from "./screens/AddCustomer";
import DebtDetailList from "./screens/DebtDetailList";
import DebtDetail from "./screens/DebtDetail";
import AppRoute from "./AppRoute";
import { UserProvider } from "./contex/useContext";
import { LanguageProvider } from "./contex/languageContext";
// import MoneyTransferCard from './screens/MoneyTransferCard';
import './i18n'

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <LanguageProvider>
      <UserProvider>
        <StatusBar style="auto" />
        <AppRoute />
      </UserProvider>
    </LanguageProvider>
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

// <NavigationContainer>
//   <Stack.Navigator initialRouteName="Home">
//     <Stack.Screen name="Home" component={HomeScreen} />
//     <Stack.Screen name="Login" component={LoginScreen} />
//     <Stack.Screen name="AccountInfoForm" component={AccountInfoForm} />
//     <Stack.Screen name="Clock" component={Clock} />
//     <Stack.Screen name="Language" component={Language} />
//     <Stack.Screen name="Account" component={Account} />
//     <Stack.Screen name="Help" component={Help} />
//     <Stack.Screen name="AdminHome" component={AdminHome} />
//     <Stack.Screen name="CashReceivable" component={CashReceivable} />
//     <Stack.Screen name="{Language" component={Language} />
//     <Stack.Screen name="ScrollableListScreen" component={ScrollableListScreen} />
//     <Stack.Screen name="MoneyTransferList" component={MoneyTransferList} />
//     <Stack.Screen name="MoneyTransferScreen" component={MoneyTransferScreen} />
//     <Stack.Screen name="AddDebt" component={AddDebt} />
//     <Stack.Screen name="AddCustomer" component={AddCustomer} />
//     <Stack.Screen name="DebtDetail" component={DebtDetail} />
//   </Stack.Navigator>
// </NavigationContainer>
