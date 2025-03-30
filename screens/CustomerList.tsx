import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getCustomerList, homeCustomerList } from "../api/customer";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import CustomerCard from "./CustomerCard";
import { ScrollView } from "react-native-gesture-handler";
import { useTranslations } from "../hooks/useTranslation";
import { useUser } from "../contex/useContext";
import { useCustomers } from "../contex/customerContext";

const CustomerList: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { userId } = useUser();
  const userIdNumber = userId ? Number(userId) : 0;
  const t = useTranslations();
  const [customerss, setCustomers] = useCustomers();
  const fetchCustomers = async () => {
    try {
      const customerData = await homeCustomerList(userIdNumber);
      setCustomers(customerData.data);
    } catch (error) {
      console.error("Müşteriler yüklenirken hata oluştu:", error);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);
  const handleAddCustomerClick = () => {
    navigation.navigate("AddCustomer");
  };

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.listContainer}>
          {customerss.map((customer, index) => (
            <CustomerCard key={index} customer={customer} islem="verdim " />
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddCustomerClick}
      >
        <Text style={styles.addButtonText}>{t.homePage.addCustomerButton}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    marginBottom: 50,
  },
  addButton: {
    position: "absolute",
    bottom: 220,
    right: 0,
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomerList;
