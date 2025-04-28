import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
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
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useTranslations } from "../hooks/useTranslation";
import { LanguageContext } from "../contex/languageContext";
import { useClock } from "../contex/clockContext";
import { formatDate } from "../utils/formatDate";
const AccountActivity = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { userId } = useUser();
  const isFocused = useIsFocused();

  const t = useTranslations();
  const { activeLanguage } = useContext(LanguageContext);
  const userIdNumber = userId ? Number(userId) : 0;
  const [customers, setCustomers] = useState<any[]>([]);
  const [cashDifference, setCashdifference] = useState<any[]>([]);
  const [paraBirimi, setParaBirimi] = useState<string>("TL");
  // const locale = navigator.language;
  const { format, setFormat } = useClock();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const toggleDescription = (recordId: number) => {
    setExpandedId((prevId) => (prevId === recordId ? null : recordId));
  };

  const is12HourFormat = format === "12";
  const locale = is12HourFormat ? "en-US" : "tr-TR";

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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t.accounPage.pageTitle,
    });
  }, [navigation, activeLanguage]);

  useEffect(() => {
    if (isFocused) {
      fetchCustomer();
      fetchcompareDebtAndCashReceivable();
    }
  }, [isFocused]);

  // useEffect(() => {
  //   fetchCustomer();
  //   fetchcompareDebtAndCashReceivable();
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.balanceTitle}></Text>
      <View style={styles.currencyPickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={paraBirimi}
          onValueChange={(itemValue) => setParaBirimi(itemValue)}
        >
          <Picker.Item label={t.accounPage.tl} value="TL" />
          <Picker.Item label={t.accounPage.usd} value="Dolar" />
          <Picker.Item label={t.accounPage.euro} value="Euro" />
          <Picker.Item label={t.accounPage.toman} value="Toman" />
          <Picker.Item label={t.accounPage.afghani} value="Afghani" />
        </Picker>
      </View>
      <View style={styles.balanceRow}>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={styles.balanceLabel}>{t.accounPage.totalIn}</Text>
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
                : t.accounPage.emptyData}
            </Text>
          </Text>
        </View>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={styles.balanceLabel}>{t.accounPage.totalOut}</Text>
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
              : t.accounPage.emptyData}
          </Text>
        </View>
      </View>
      <Text style={styles.totalBalance}>
        {t.accounPage.cashBalance}:{" "}
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
        {t.accounPage.operations} ({filteredCash.length})
      </Text>

      <ScrollView style={styles.transactionList}>
        {filteredCash.map((transaction: CashTransaction, index) => {
          const isExpanded = expandedId === transaction.id;
          const shortDescription =
            transaction.description && transaction.description.length > 60
              ? transaction.description.slice(0, 60) + "..."
              : transaction.description;

          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("EditAccountActivity", {
                  id: transaction.id,
                  description: transaction.description,
                  totalCash: transaction.totalCash,
                  transactionType: transaction.transactionType,
                })
              }
              onLongPress={() => toggleDescription(transaction.id)} // uzun basınca aç/kapa
            >
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
                      transaction.transactionType === "in"
                        ? "#60be66"
                        : "#f0505c"
                    }
                  />
                </View>
                <View style={styles.transactionTextContainer}>
                  <Text style={styles.transactionDate}>
                    {new Date(transaction.createdAt).toLocaleString(locale, {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: is12HourFormat,
                      timeZone: "UTC",
                    })}
                  </Text>

                  {/* Açıklama (açılır kapanır) */}
                  {transaction.description ? (
                    <TouchableOpacity
                      style={styles.descriptionContent}
                      onPress={() => toggleDescription(transaction.id)}
                    >
                      <Text style={styles.transactionDescription}>
                        {isExpanded
                          ? transaction.description
                          : shortDescription}
                        {transaction.description.length > 10 && (
                          <Text
                            style={{
                              fontWeight: "bold",
                              color: "black",
                              fontSize: 17,
                            }}
                          >
                            {" "}
                            {isExpanded
                              ? t.accounPage.less
                              : t.accounPage.seeMore}
                          </Text>
                        )}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
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
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cashButton}
          onPress={() =>
            navigation.navigate("AddUserCashScreen", { transactionType: "in" })
          }
        >
          <Text style={styles.aldimText}>{t.accounPage.cashAmount}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.debtButton}
          onPress={() =>
            navigation.navigate("AddUserCashScreen", { transactionType: "out" })
          }
        >
          <Text style={styles.verdimText}>{t.accounPage.debtAmount}</Text>
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  debtButton: {
    backgroundColor: "#f6e6e7",
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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
  transactionDescription: {
    fontSize: 13,
    color: "#444",
    marginTop: 2,
  },

  descriptionContent: {
    marginTop: 4,
  },
});

export default AccountActivity;
