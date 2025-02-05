import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { getCustomerList, homeCustomerList } from "../api/customer";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import CustomerCard from "./CustomerCard"; 
import { ScrollView } from "react-native-gesture-handler";
import { useTranslations } from "../hooks/useTranslation";

const CustomerList: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const t = useTranslations();
//   const [customers, setCustomers] = useState([]);

  const customers = [
    {
      firstName: "Ahmet",
      lastName: "Yılmaz",
      nakit: "500 ₺",
      islem: "verdim",
      vt: "28.01.2000",
      at: "20.01.2000",
    },
    {
      firstName: "Ayşe",
      lastName: "Kara",
      nakit: "1000 ₺",
      islem: "aldım",
      vt: "17.01.2000",
      at: "17.01.2000",
    },
    {
      firstName: "Mehmet",
      lastName: "Demir",
      nakit: "600 ₺",
      islem: "verdim",
      vt: "20.01.2000",
      at: "20.01.2000",
    },
  ];

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customerData = await homeCustomerList(1);
        // setCustomers(customerData.data);
      } catch (error) {
        console.error("Müşteriler yüklenirken hata oluştu:", error);
      }
    };
    fetchCustomers();
  }, []);

  const handleAddCustomerClick = () => {
    navigation.navigate("AddCustomer");
  };

  return (
    <View style={styles.container}>
    <ScrollView>
        <View>
        {customers.map((customer, index) => (
          <CustomerCard key={index} customer={customer} islem=' ' />
        ))}
        </View>
    </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddCustomerClick}>
        <Text style={styles.addButtonText}>{t.homePage.addCustomerButton}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  addButton: {
    position: "absolute",
    bottom: 120,
    right: 30,
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
