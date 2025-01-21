import React, { useEffect,useRef  } from "react";
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
import CashReceivable from "./screens/CashReceivable";
import ScrollableListScreen from "./screens/ScrolView";
import MoneyTransferList from "./screens/MoneyTransferList";
import MoneyTransferScreen from "./screens/MoneyTransferScreen";
import AddDebt from "./screens/AddDebt";
import AddCustomer from "./screens/AddCustomer";
import DebtDetail from "./screens/DebtDetail";
import { useUser } from "./contex/useContext";
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createStackNavigator();

const AppRoute: React.FC = () => {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const { userData , token } = useUser();

  useEffect(() => {
    if (navigationRef.current) {
      if (token) {
        navigationRef.current.navigate("Home");
      } else {
        navigationRef.current.navigate("Login");
      }
    }
  }, [token]);

  console.log("token ekrana yazdırıldı burası app root", userData,token)
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName={token ? "Home" : "Login"}>
    //     {token ? (
    //       <>
    //         <Stack.Screen name="Home" component={HomeScreen} />
    //         <Stack.Screen name="Login" component={LoginScreen} />
    //         <Stack.Screen name="AccountInfoForm" component={AccountInfoForm} />
    //         <Stack.Screen name="Clock" component={Clock} />
    //         <Stack.Screen name="Language" component={Language} />
    //         <Stack.Screen name="Account" component={Account} />
    //         <Stack.Screen name="Help" component={Help} />
    //         <Stack.Screen name="AdminHome" component={AdminHome} />
    //         <Stack.Screen name="CashReceivable" component={CashReceivable} />
    //         <Stack.Screen
    //           name="ScrollableListScreen"
    //           component={ScrollableListScreen}
    //         />
    //         <Stack.Screen
    //           name="MoneyTransferList"
    //           component={MoneyTransferList}
    //         />
    //         <Stack.Screen
    //           name="MoneyTransferScreen"
    //           component={MoneyTransferScreen}
    //         />
    //         <Stack.Screen name="AddDebt" component={AddDebt} />
    //         <Stack.Screen name="AddCustomer" component={AddCustomer} />
    //         <Stack.Screen name="DebtDetail" component={DebtDetail} />
    //       </>
    //     ) : (
    //       <Stack.Screen name="Login" component={LoginScreen} />
    //     )}
    //   </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AccountInfoForm" component={AccountInfoForm} />
        <Stack.Screen name="Clock" component={Clock} />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="AdminHome" component={AdminHome} />
        <Stack.Screen name="CashReceivable" component={CashReceivable}/>
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
        <Stack.Screen name="AddCustomer" component={AddCustomer} />
        <Stack.Screen name="DebtDetail" component={DebtDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoute;
