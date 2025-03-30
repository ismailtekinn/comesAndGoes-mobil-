import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import BottomBar from "./BottomBar";
import { useUser } from "../contex/useContext";
import { getCustomerList } from "../api/customer";
import EditCustomerModal from "./EditCustomerModal";
import { useTranslations } from "../hooks/useTranslation";
import { LanguageContext } from "../contex/languageContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { LanguageType, RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";

const MyCustomers = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { userId } = useUser();
  const userIdNumber = userId ? Number(userId) : 0;
  const t = useTranslations();
  const { activeLanguage, setActiveLanguage } = useContext(LanguageContext);

  const [searchText, setSearchText] = useState<string>("");
  const [customers, setCustomers] = useState();
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useLayoutEffect(() => {
    if (t?.myCustomerPage?.pageTitle) {
      navigation.setOptions({
        title: t.myCustomerPage.pageTitle,
      });
    }
  }, [navigation, activeLanguage]);
  useEffect(() => {
    fetchCustomers();
  }, [userIdNumber]);

  const fetchCustomers = async () => {
    try {
      const customerList = await getCustomerList(userIdNumber);
      console.log("Müşteri listesi:", customerList.data);
      setCustomers(customerList.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (customer: any) => {
    setSelectedCustomer(customer);
    setModalVisible(true);
    console.log("Edit customer with id:", customer);
  };

  console.log("müşteriler ekrana yazdırılıyor : ", customers);
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder=""
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchIconContainer}>
          <FontAwesome name="search" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>{t.myCustomerPage.name}</Text>
        <Text style={styles.headerText}>{t.myCustomerPage.surname}</Text>
        <Text style={styles.headerText}>{t.myCustomerPage.phone}</Text>
        <Text style={styles.headerText}>{t.myCustomerPage.proccess}</Text>
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 80 }}
        data={customers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.rowText}>{item.clientName}</Text>
            <Text style={styles.rowText}>{item.clientSurname}</Text>
            <Text style={styles.rowText}>{item.clientPhone}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleEdit(item)}
            >
              <Ionicons name="create-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
      {selectedCustomer && (
        <EditCustomerModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onUpdate={fetchCustomers}
          customer={selectedCustomer}
        />
      )}
      {/* <View style={styles.bottomBarContainer}>
        <BottomBar />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff", // Arka plan ekleyerek içeriğin üstüne binmesini önle
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    zIndex: 100, // Öncelikli görünmesini sağla
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",

    padding: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#4A90E2",
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  headerText: {
    width: 80,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 5,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  rowText: {
    width: 90, // Sabit genişlik ver
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f9ff",
    borderRadius: 20,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    backgroundColor: "#f6f9ff",
    borderRadius: 20,
  },
  searchIconContainer: {
    padding: 10,
  },
  button: {
    backgroundColor: "orange",
    borderRadius: 5,
    padding: 5,
    marginLeft: 22,
  },
});

export default MyCustomers;
