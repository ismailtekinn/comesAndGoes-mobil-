import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomBar from "./BottomBar";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useCustomers } from "../contex/customerContext";
import { getCustomerList, getfilterCustomerList } from "../api/customer";
import { useUser } from "../contex/useContext";
import { Picker } from "@react-native-picker/picker";

const HomeCustomerListScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [customerss, setCustomers] = useCustomers();
  const [filterCustomer, setFilterCustomer] = useState<any[]>([]);
  const { userId } = useUser();
  const userIdNumber = userId ? Number(userId) : 0;
  const [paraBirimi, setParaBirimi] = useState<string>("TL");
  const [searchText, setSearchText] = useState("");


  const filteredCustomers = customerss.filter(
    (customer) =>
      customer.balance.currency.toLowerCase() === paraBirimi.toLowerCase()
  );
  const handleAddCustomerClick = () => {
    navigation.navigate("AddCustomer");
  };

  const fetchCustomers = async () => {
    try {
      const customerData = await getCustomerList(userIdNumber);
      setCustomers(customerData.data);
    } catch (error) {
      console.error("Müşteriler yüklenirken hata oluştu:", error);
    }
  };

  const fetchPagination = async (searchQuery: string) => {
    try {
      const filterData = await getfilterCustomerList(userIdNumber, searchQuery);
      setFilterCustomer(filterData.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchText.trim().length > 0) {
        fetchPagination(searchText);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn); 
  }, [searchText]);
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <View style={styles.container}>
      {/* <View style={styles.balanceContainer}>
        <Text style={styles.receivedText}>Aldım: 500.0 ₺</Text>
        <Text style={styles.givenText}>Verdim: 0.0 ₺</Text>
      </View> */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Müşteriler</Text>

        <View style={styles.currencyPickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={paraBirimi}
            onValueChange={(itemValue) => setParaBirimi(itemValue)}
          >
            <Picker.Item label="TL" value="TL" />
            <Picker.Item label="Dolar" value="Dolar" />
            <Picker.Item label="Euro" value="Euro" />
            <Picker.Item label="Toman" value="Toman" />
            <Picker.Item label="Afghani" value="Afghani" />
          </Picker>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          placeholder="Arama"
          style={styles.searchInput}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      {searchText.trim() && (
        <View style={styles.newSection}>
          {filterCustomer.length > 0 ? (
            filterCustomer.map((customer) => (
              <View key={customer.id} style={styles.customerItem}>
                <Text
                  style={styles.clientName}
                  onPress={() => {
                    navigation.navigate("HomeCustomerDetail", {
                      customerId: customer.id,
                      customerName: customer.clientName,
                    });

                    setSearchText("");
                  }}
                >
                  {customer.clientName} {customer.clientSurname}{" "}
                  {customer.clientPhone}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>Veri Bulunamadı</Text>
          )}
        </View>
      )}
      <ScrollView
        style={{ marginTop: 16 }}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        {filteredCustomers.map((customer) => {
          const firstLetter = customer.clientName?.charAt(0)?.toUpperCase();
          return (
            <TouchableOpacity
              key={customer.id}
              style={styles.customerCard}
              onPress={() =>
                navigation.navigate("HomeCustomerDetail", {
                  customerId: customer.id,
                  customerName: customer.clientName,
                })
              }
            >
              <View style={styles.circle}>
                <Text style={styles.circleText}>{firstLetter}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.customerName}>{customer.clientName}</Text>
                <Text style={styles.dateText}>{customer.date}</Text>
              </View>

              <Text
                style={[
                  styles.amountText,
                  {
                    color:
                      customer.balance.type === "debt"
                        ? "red"
                        : customer.balance.type === "cash"
                        ? "green"
                        : "blue",
                  },
                ]}
              >
                {customer.balance.balance} {customer.balance.currency}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          handleAddCustomerClick();
        }}
      >
        <Text style={styles.addButtonText}>Müşteri Ekle</Text>
      </TouchableOpacity>
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFF",
    padding: 16,
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  receivedText: {
    fontSize: 16,
    color: "green",
  },
  givenText: {
    fontSize: 16,
    color: "red",
  },
  header: {
    flexDirection: "row",
    marginVertical: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#e8effc",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
  currencyPickerContainer: {
    top: 16,
    right: -120,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 9,
  },
  picker: {
    height: 50,
    width: 120,
    borderWidth: 2,
    borderColor: "#007AFF",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  customerCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 8,
  },
  circle: {
    width: 50,
    height: 50,
    backgroundColor: "#e4f2ff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  circleText: {
    color: "#1b1b1c",
    fontSize: 19,
    fontWeight: "bold",
    fontFamily: "Arial",
  },
  customerName: {
    fontSize: 17,
    fontWeight: "bold",
  },
  dateText: {
    color: "gray",
  },
  amountText: {
    fontSize: 16,
    color: "green",
  },
  addButton: {
    position: "absolute", // Butonu ekranda sabit konuma getirir
    bottom: 120, // Ekranın altından 20px yukarıda
    right: 20, // Ekranın sağından 20px içeride
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Android için gölge
    shadowColor: "#000", // iOS için gölge efekti
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  customerItem: {
    backgroundColor: "#f4f4f4",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
  },
  clientName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  clientBalance: {
    fontSize: 14,
    color: "#555",
  },
  newSection: {
    backgroundColor: "#f4f4f4",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
  },
  newSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  noDataText: {
    fontSize: 16,
    color: "gray",
  },
});

export default HomeCustomerListScreen;
