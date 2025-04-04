import React, { useContext, useEffect,useRef, useState  } from "react";
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import AccountInfoForm from "./screens/AccountInfoForm";
import Clock from "./screens/Clock";
import Language from "./screens/Language";
import Account from "./screens/Account";
import Help from "./screens/Help";
import AdminHome from "./screens/AdminHome";
import ScrollableListScreen from "./screens/ScrolView";
import MoneyTransferList from "./screens/MoneyTransferList";
import MoneyTransferScreen from "./screens/MoneyTransferScreen";
import AddCustomer from "./screens/AddCustomer";
import DebtDetail from "./screens/DebtDetail";
import { useUser } from "./contex/useContext";
import RegisterScreen from "./screens/RegisterScreen";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "./contex/languageContext";
import CashReceivable from "./screens/CashReceivable";
import AddDebt from "./screens/AddDebt";
import DebtList from "./screens/DebtList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LanguageType } from "./types";
import AddUserCashScreen from "./screens/AddUserCashScreen";
import PasswordUpdateScreen from "./screens/PasswordUpdateScreen";
import MyCustomers from "./screens/MyCustomers";
import EditCustomerModal from "./screens/EditCustomerModal";
import HomeCustomerListScreen from "./screens/HomeCustomerListScreen";
import HomeCustomerDetail from "./screens/HomeCustomerDetail";
import AccountActivity from "./screens/AccountActivity";
import EditTransaction from "./screens/EditTransaction";

const Stack = createStackNavigator();

const AppRoute: React.FC = () => {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const { userData , token } = useUser();
  const { setActiveLanguage } = useContext(LanguageContext);

  useEffect(() => {
    if (navigationRef.current) {
      if (token && userData) {
        navigationRef.current.navigate("HomeCustomerListScreen");
      } else {
        navigationRef.current.navigate("Login");
      }
    }
  }, [token]);


  console.log("token ekrana yazdırıldı burası app root", userData,token)
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{headerLeft : ()=> null }} />
        <Stack.Screen name="AccountInfoForm" component={AccountInfoForm} />
        <Stack.Screen name="Clock" component={Clock} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="AdminHome" component={AdminHome} />
        <Stack.Screen name="CashReceivable" component={CashReceivable}/>
        <Stack.Screen name="AddUserCashScreen" component={AddUserCashScreen}/>
        <Stack.Screen name="PasswordUpdateScreen" component={PasswordUpdateScreen}/>
        <Stack.Screen name="MyCustomers" component={MyCustomers}/>
        <Stack.Screen name="HomeCustomerListScreen" component={HomeCustomerListScreen}/>
        <Stack.Screen name="HomeCustomerDetail" component={HomeCustomerDetail}/>
        <Stack.Screen name="AccountActivity" component={AccountActivity}/>
        <Stack.Screen name="EditTransaction" component={EditTransaction}/>
        <Stack.Screen
          name="ScrollableListScreen"
          component={ScrollableListScreen}
        />
        <Stack.Screen
          name="MoneyTransferList"
          component={MoneyTransferList}
        />
        <Stack.Screen
          name="MoneyTransferScreen"
          component={MoneyTransferScreen}
        />
        <Stack.Screen name="AddDebt" component={AddDebt} />
        <Stack.Screen name="DebtList" component={DebtList} />


        <Stack.Screen name="AddCustomer" component={AddCustomer} />
        <Stack.Screen name="DebtDetail" component={DebtDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoute;
