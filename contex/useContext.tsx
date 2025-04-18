import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage import edildi
import { User } from "../types";
import { Text } from "react-native";

interface AuthContextProps {
  userData?: User | null;
  token?: string | null;
  handleLogin: (user: User) => void;
  handleLogout: () => void;
  handleToken: (token: string) => void;
  setUserData: React.Dispatch<React.SetStateAction<User | undefined>>;
  userId?: number;
  isLoading: boolean;
}
const UserContext = createContext<AuthContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<User | undefined>();
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userId = userData?.id;

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedUser = await AsyncStorage.getItem("userData");
        if (storedToken && storedUser) {
          setToken(JSON.parse(storedToken));
          setUserData(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredData();
  }, []);

  const handleLogin = async (user: User) => {
    try {
      console.log("burası useContext user handle login içerisinde console yazdırılıyor",user.id)
      setUserData(user);
      await AsyncStorage.setItem("userData", JSON.stringify(user));
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  };

  const handleToken = async (token: string) => {
    try {
      console.log("token handle token methoduna geldi");
      setToken(token);
      await AsyncStorage.setItem("token", JSON.stringify(token));
    } catch (error) {
      console.error("Failed to save token:", error);
    }
  };

  const handleLogout = async () => {
    try {
      setUserData(undefined);
      setToken(null);
      console.log("logout methodu çağrıldı");
      await AsyncStorage.removeItem("token"); // AsyncStorage'dan token sil
      await AsyncStorage.removeItem("userData"); // Kullanıcı verisini sil
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>; // Yüklenme durumu için basit bir text
  }

  return (
    <UserContext.Provider
      value={{
        userData,
        token,
        userId,
        handleLogin,
        handleLogout,
        setUserData,
        handleToken,
        isLoading, 
        
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
