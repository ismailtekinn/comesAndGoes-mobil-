import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import MoneyTransferCard, { Customers } from "./MoneyTransferCard";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import BottomBar from "./BottomBar";
import { getMoneyTransfers } from "../api/customer";
import { green } from "react-native-reanimated/lib/typescript/Colors";
import { useTranslations } from "../hooks/useTranslation";
import { useUser } from "../contex/useContext";
import { useCustomers } from "../contex/customerContext";
import { useMoneyTransferCustomers } from "../contex/mtcustomerContext";

const MoneyTransferList = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [customerss, setCustomers] = useState([]);
  const [transferCustomers, setTransferCustomers] = useMoneyTransferCustomers();
  const t = useTranslations();
  const { userId } = useUser();
  const userIdNumber = userId ? Number(userId) : 0;
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customerData = await getMoneyTransfers(userIdNumber);
        console.log(
          "money veritabanından çekilen değer ekrana yazdırıldı: ",
          customerData
        );
        setTransferCustomers(customerData);
      } catch (error) {
        console.error("Müşteriler yüklenirken hata oluştu:", error);
      }
    };
    fetchCustomers();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {transferCustomers.map((transferCustomer, index) => (
          <MoneyTransferCard
            key={index}
            customer={transferCustomer}
            islem="transfer edildi"
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MoneyTransferScreen")}
      >
        <Text style={styles.buttonText}>
          {t.accountTransferTabMenu.transferButton}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  listContainer: {
    padding: 30,
    marginTop: 30,
    height: "100%",
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 20,
    zIndex: 1,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
export default MoneyTransferList;
