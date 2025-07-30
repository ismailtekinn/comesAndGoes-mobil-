import React, { useContext, useEffect, useRef, useState } from "react";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import AccountInfoForm from "./screens/AccountInfoForm";
import Clock from "./screens/Clock";
import Language from "./screens/Language";
import Help from "./screens/Help";
import AdminHome from "./screens/AdminHome";
import ScrollableListScreen from "./screens/ScrolView";
import MoneyTransferScreen from "./screens/MoneyTransferScreen";
import AddCustomer from "./screens/AddCustomer";
import DebtDetail from "./screens/DebtDetail";
import { useUser } from "./contex/useContext";
import RegisterScreen from "./screens/RegisterScreen";
import { LanguageContext } from "./contex/languageContext";
import CashReceivable from "./screens/CashReceivable";
import AddDebt from "./screens/AddDebt";
import DebtList from "./screens/DebtList";
import AddUserCashScreen from "./screens/AddUserCashScreen";
import PasswordUpdateScreen from "./screens/PasswordUpdateScreen";
import MyCustomers from "./screens/MyCustomers";
import HomeCustomerListScreen from "./screens/HomeCustomerListScreen";
import HomeCustomerDetail from "./screens/HomeCustomerDetail";
import AccountActivity from "./screens/AccountActivity";
import EditTransaction from "./screens/EditTransaction";
import EditAccountActivity from "./screens/EditAccountActivity";
import AddTransaction from "./screens/AddTransaction";
import CurrencyConverter from "./screens/CurrencyConvert";

const Stack = createStackNavigator();

const AppRoute: React.FC = () => {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const { userData, token, isLoading } = useUser();
  const { setActiveLanguage } = useContext(LanguageContext);
//   useEffect(() => {
//   const timeout = setTimeout(() => {
//     if (navigationRef.current && !isLoading) {
//       if (token && userData) {
//         if (userData.roleId === 1) {  
//           navigationRef.current.navigate("AdminHome");
//         } else {
//           navigationRef.current.navigate("HomeCustomerListScreen");
//         }
//       } else {
//         navigationRef.current.navigate("Login");
//       }
//     }
//   }, 0); // 0 ms bile olsa render sonrası çalışır

//   return () => clearTimeout(timeout);
// }, [token, isLoading]);


  useEffect(() => {
    const timeout = setTimeout(() => {
      if (navigationRef.current && !isLoading) {
        if (token && userData) {
          if (userData.roleId === 1) {
            navigationRef.current.reset({
              index: 0,
              routes: [{ name: "AdminHome" }],
            });
          } else {
            navigationRef.current.reset({
              index: 0,
              routes: [{ name: "HomeCustomerListScreen" }],
            });
          }
        } else {
          navigationRef.current.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [token, userData, isLoading]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {token && userData ? (
          <>

             <Stack.Screen name="AdminHome" component={AdminHome} />
            <Stack.Screen
              name="HomeCustomerListScreen"
              component={HomeCustomerListScreen}
            />
            <Stack.Screen name="AccountInfoForm" component={AccountInfoForm} />
            <Stack.Screen name="Clock" component={Clock} />
            <Stack.Screen name="Language" component={Language} />
            <Stack.Screen name="Help" component={Help} />
            <Stack.Screen name="CashReceivable" component={CashReceivable} />
            <Stack.Screen
              name="AddUserCashScreen"
              component={AddUserCashScreen}
            />
            <Stack.Screen
              name="PasswordUpdateScreen"
              component={PasswordUpdateScreen}
            />
            <Stack.Screen name="MyCustomers" component={MyCustomers} />

            <Stack.Screen
              name="HomeCustomerDetail"
              component={HomeCustomerDetail}
            />
            <Stack.Screen name="AccountActivity" component={AccountActivity} />
            <Stack.Screen name="EditTransaction" component={EditTransaction} />
            <Stack.Screen
              name="EditAccountActivity"
              component={EditAccountActivity}
            />
            <Stack.Screen
              name="ScrollableListScreen"
              component={ScrollableListScreen}
            />

            <Stack.Screen
              name="MoneyTransferScreen"
              component={MoneyTransferScreen}
            />
            <Stack.Screen name="AddDebt" component={AddDebt} />
            <Stack.Screen name="AddTransaction" component={AddTransaction} />
            <Stack.Screen name="DebtList" component={DebtList} />

            <Stack.Screen name="AddCustomer" component={AddCustomer} />
            <Stack.Screen name="DebtDetail" component={DebtDetail} />
            <Stack.Screen name="CurrencyConverter" component={CurrencyConverter} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoute;
