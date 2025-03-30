import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomBar from "./BottomBar";
import { useUser } from "../contex/useContext";
import {
  compareDebtAndCashReceivableAllList,
  getCustomerCashDebtAllList,
  getUserCash,
  getUserCashAmountAllList,
} from "../api/customer";
import {
  CashDifferenceType,
  CashTransaction,
  Customer,
} from "../interface/IHomeCustomer";
import { Picker } from "@react-native-picker/picker";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";

const transactions = [
  {
    date: "Bugün 02:26",
    balance: "54722.0 ₺",
    amount: "4500.0 ₺",
    type: "borç",
  },
  {
    date: "Bugün 02:26",
    balance: "59222.0 ₺",
    amount: "5000.0 ₺",
    type: "nakit",
  },
  {
    date: "21 Temmuz 2024 18:07",
    balance: "54222.0 ₺",
    amount: "52222.0 ₺",
    type: "nakit",
  },
  {
    date: "19 Temmuz 2024 19:03",
    balance: "2000.0 ₺",
    amount: "3000.0 ₺",
    type: "borç",
  },
  {
    date: "19 Temmuz 2024 19:03",
    balance: "5000.0 ₺",
    amount: "5000.0 ₺",
    type: "nakit",
  },
];

const AccountActivity = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { userId } = useUser();
  const userIdNumber = userId ? Number(userId) : 0;
  const [customers, setCustomers] = useState<any[]>([]);
  const [cashDifference, setCashdifference] = useState<any[]>([]);

  const [paraBirimi, setParaBirimi] = useState<string>("TL");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.cashCurrency.toLowerCase() === paraBirimi.toLowerCase()
  );
  const filteredCash = cashDifference.filter(
    (item) => item.cashCurrency.toLowerCase() === paraBirimi.toLowerCase()
  );

  const fetchCustomer = async () => {
    try {
      const customerData = await getUserCashAmountAllList(userIdNumber);

      setCashdifference(customerData.data);
    } catch (error) {
      console.error("Müşteriler yüklenirken hata oluştu:", error);
    }
  };
  const fetchcompareDebtAndCashReceivable = async () => {
    try {
      const result = await getUserCash(userIdNumber);
      setCustomers(result.data);
    } catch (error) {
      console.error("Hata :", error);
    }
  };
  useEffect(() => {
    fetchCustomer();
    fetchcompareDebtAndCashReceivable();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.balanceTitle}>Nakit bakiyesi</Text>
      <View style={styles.currencyPickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={paraBirimi}
          onValueChange={(itemValue) => setParaBirimi(itemValue)}
        >
          <Picker.Item label="TL" value="TL" />
          <Picker.Item label="USD" value="USD" />
          <Picker.Item label="Euro" value="Euro" />
          <Picker.Item label="Toman" value="Toman" />
          <Picker.Item label="Afghani" value="Afghani" />
        </Picker>
      </View>
      <View style={styles.balanceRow}>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={styles.balanceLabel}>Toplam Giren</Text>
          <Text
            style={[
              styles.positiveBalance,
              {
                color: filteredCash.some(
                  (item) => item.transactionType === "in"
                )
                  ? "green"
                  : "black",
              },
            ]}
          >
            <Text>
              {filteredCustomers.length > 0
                ? `${filteredCustomers[0]?.inTotal || 0} ${
                    filteredCustomers[0]?.cashCurrency || ""
                  }`
                : "Veri yok"}
            </Text>
          </Text>
        </View>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={styles.balanceLabel}>Toplam Çıkan</Text>
          <Text
            style={[
              styles.negativeBalance,
              {
                color: "red",
              },
            ]}
          >
            {/* {filteredCustomers[0].outTotal} {filteredCustomers[0].cashCurrency} */}
            {filteredCustomers.length > 0
              ? `${filteredCustomers[0]?.outTotal || 0} ${
                  filteredCustomers[0]?.cashCurrency || ""
                }`
              : "Veri yok"}
          </Text>
        </View>
      </View>
      <Text style={styles.totalBalance}>
        Genel Bakiye:{" "}
        <Text
          style={{
            color:
              (filteredCustomers[0]?.difference || 0) >
              (filteredCustomers[0]?.outTotal || 0)
                ? "green"
                : "red",
          }}
        >
          {filteredCustomers[0]?.difference}
          {filteredCustomers[0]?.cashCurrency}
        </Text>
      </Text>

      <Text style={styles.transactionTitle}>
        İşlemler ({transactions.length})
      </Text>
      {/* <ScrollView style={styles.transactionList}>
        {filteredCash.map((customer: CashTransaction, index) => (
          <View key={index} style={styles.transactionItem}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={customer.type === "Borç" ? "remove-circle" : "add-circle"}
                size={42}
                color={customer.type === "Alacak" ? "#60be66" : "#f0505c"}
              />
            </View>
            <View style={styles.transactionTextContainer}>
              <Text style={styles.transactionDate}>
                {new Date(customer.debtIssuanceDate).toLocaleString("tr-TR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
            <Text
              style={[
                styles.transactionAmount,
                { color: customer.type === "Borç" ? "red" : "green" },
              ]}
            >
              {customer.debtAmount} {customer.debtCurrency}
            </Text>
          </View>
        ))}
      </ScrollView> */}
      <ScrollView style={styles.transactionList}>
        {filteredCash.map((transaction: CashTransaction, index) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={
                  transaction.transactionType === "out"
                    ? "remove-circle"
                    : "add-circle"
                }
                size={42}
                color={
                  transaction.transactionType === "in" ? "#60be66" : "#f0505c"
                }
              />
            </View>
            <View style={styles.transactionTextContainer}>
              <Text style={styles.transactionDate}>
                {new Date().toLocaleString("tr-TR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
            <Text
              style={[
                styles.transactionAmount,
                {
                  color:
                    transaction.transactionType === "out" ? "red" : "green",
                },
              ]}
            >
              {transaction.totalCash} {transaction.cashCurrency}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cashButton}
          onPress={() =>
            navigation.navigate("AddUserCashScreen", { transactionType: "in" })
          }
        >
          <Text style={styles.aldimText}>MEVCUT NAKİT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.debtButton}
          onPress={() =>
            navigation.navigate("AddUserCashScreen", { transactionType: "out" })
          }
        >
          <Text style={styles.verdimText}>BORÇ MİKTARI</Text>
        </TouchableOpacity>
      </View>
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FBFF", paddingHorizontal: 16 },
  header: { flexDirection: "row", alignItems: "center", marginTop: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginLeft: 10 },
  balanceTitle: {
    color: "#2D9CDB",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  positiveBalance: { color: "#60be66", fontSize: 20, fontWeight: "bold" },
  negativeBalance: { color: "#f0505c", fontSize: 20, fontWeight: "bold" },
  totalBalance: {
    color: "#2D9CDB",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 9,
    textAlign: "center",
  },
  currencyPickerContainer: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "flex-end",
    right: 16,
    borderRadius: 9,
    width: 120,
  },
  picker: {
    height: 50,
    width: 120,
    borderWidth: 2,
    borderColor: "#007AFF",
    color: "black", // Metin rengini beyaz yaptık
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 20,
    color: "#2D9CDB",
  },
  transactionList: { marginTop: 10 },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center", // Dikey hizalama
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 5,
  },
  transactionDate: { fontSize: 16, fontWeight: "bold" },
  transactionBalance: { color: "#828282" },
  transactionAmount: { fontSize: 16, fontWeight: "bold" },

  iconContainer: {
    marginRight: 10, // Simge ile metin arasına boşluk
  },
  transactionTextContainer: {
    flex: 1, // Metin alanının genişliği esnek olsun
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 80, // BottomBar ile üst üste gelmesini önlemek için
    zIndex: 5, // BottomBar'ın üstünde olması için
  },
  cashButton: {
    backgroundColor: "#caedcd",
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginRight: 5,
  },
  debtButton: {
    backgroundColor: "#f6e6e7",
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  aldimText: {
    color: "#008700", // Metin rengini koyu yeşil yaptık
    fontSize: 16,
  },
  verdimText: {
    color: "#f24c56", // Metin rengini koyu kırmızı yaptık
    fontSize: 16,
  },
  balanceLabel: {
    fontSize: 12,
    color: "#2D9CDB",
    marginBottom: 5,
    textAlign: "center",
  },
});

export default AccountActivity;
