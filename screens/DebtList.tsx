import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import DebtCard from "./DebtCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native"; // navigation kullanımı için gerekli import
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { debCustomerList } from "../api/customer";
import { useTranslations } from "../hooks/useTranslation";
import { useUser } from "../contex/useContext";



const DebtList = () => {
  const [customerss, setCustomers] = useState([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const t = useTranslations();
  const { userId } = useUser();
  const userIdNumber = userId ? Number(userId) : 0;


 const fetchCustomers = async () => {
    try {
      const customerData = await debCustomerList(userIdNumber);
      setCustomers(customerData);
    } catch (error) {
      console.error("Müşteriler yüklenirken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [userIdNumber]);


  const handleAddCustomerClick = () => {
    navigation.navigate("AddDebt");
  };
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.listContainer}>
          {customerss.map((customer, index) => (
            <DebtCard key={index} customer={customer} islem="verdim" /> 
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={handleAddCustomerClick}>
        <Text style={styles.buttonText}>
          {t.accountPageDebtsTabMenu.lendButton}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flexGrow: 1,
  },

  listContainer: {
    marginTop: 30,
  },
  button: {
    backgroundColor: "#f31137",
    padding: 13,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 20,
    zIndex: 1,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DebtList;
