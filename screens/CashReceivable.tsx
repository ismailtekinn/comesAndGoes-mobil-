import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import DatePicker from "react-native-date-picker";
import BottomBar from "./BottomBar";
import { Picker } from "@react-native-picker/picker";
import { useTranslations } from "../hooks/useTranslation";
import { LanguageContext } from "../contex/languageContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Customer, Debt, NewDebt } from "../types/customerType";
import {
  addCashReceivable,
  getCustomerList,
  homeCustomerList,
} from "../api/customer";
import { useUser } from "../contex/useContext";
import { FormData } from "../hooks/useCustomerForm";
import { useCustomers } from "../contex/customerContext";

const CashReceivable = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
    const { customerId } = route.params as { customerId: number };
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [paraBirimi, setParaBirimi] = useState("TL");
  const t = useTranslations();
  const { activeLanguage } = useContext(LanguageContext);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { handleLogout, userData, userId } = useUser();
  const userIdNumber = userId ? Number(userId) : 0;
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [customerss, setCustomerss] = useCustomers();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    phone: "",
    cashAmount: 0,
    debtDate: "2025-07-17",
    repaymentDate: "2025-08-17",
    debtCurrency: "TL",
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      title: t.cashReceivablePage.pageTitle,
    });
  }, [navigation, activeLanguage]);

  const handleSubmit = async () => {
    const debtData: NewDebt = {
      debtAmount: formData.cashAmount,
      debtCurrency: formData.debtCurrency,
      debtorId: userIdNumber,
      creditorId: customerId ? customerId : 0,
    };
    try {
      const response = await addCashReceivable(debtData);
      if (response.isSuccess) {
        Alert.alert("Başarılı", "Nakit başarıyla eklendi", [
          {
            text: "Tamam",
            onPress: async () => {
              const customerData = await getCustomerList(userIdNumber);
              setCustomerss(customerData.data);
              navigation.navigate("HomeCustomerListScreen");
            },
          },
        ]);
        setFormData({
          name: "",
          surname: "",
          phone: "",
          cashAmount: 0,
          debtDate: "",
          repaymentDate: "",
          debtCurrency: "TL",
        });
      } else {
        Alert.alert("Hata", response.message);
      }

      setFormData({
        name: "",
        surname: "",
        phone: "",
        cashAmount: 0,
        debtDate: "",
        repaymentDate: "",
        debtCurrency: "TL",
      });
    } catch (error: any) {
      const errorMessage = error?.message || "Beklenmeyen bir hata oluştu";
      Alert.alert("Hata", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.box}>
          <View style={styles.form}>
            <View style={styles.formControl}>
              <Text style={styles.label}>
                {t.cashReceivablePage.cashAmount}
              </Text>
              <View style={styles.currencyContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={t.cashReceivablePage.cashAmount}
                  value={
                    formData.cashAmount ? formData.cashAmount.toString() : ""
                  }
                  onChangeText={(value) =>
                    setFormData({
                      ...formData,
                      cashAmount: parseFloat(value) || 0,
                    })
                  }
                  keyboardType="numeric"
                />
                <Picker
                  selectedValue={paraBirimi}
                  onValueChange={(itemValue) => {
                    setParaBirimi(itemValue);
                    setFormData({ ...formData, debtCurrency: itemValue });
                  }}
                  style={styles.picker}
                >
                  <Picker.Item
                    label={t.cashReceivablePage.tl}
                    value={t.cashReceivablePage.tl}
                  />
                  <Picker.Item
                    label={t.cashReceivablePage.usd}
                    value={t.cashReceivablePage.usd}
                  />
                  <Picker.Item
                    label={t.cashReceivablePage.euro}
                    value={t.cashReceivablePage.euro}
                  />
                  <Picker.Item
                    label={t.cashReceivablePage.toman}
                    value={t.cashReceivablePage.toman}
                  />
                  <Picker.Item
                    label={t.cashReceivablePage.afghani}
                    value={t.cashReceivablePage.afghani}
                  />
                </Picker>
              </View>
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>
                {t.cashReceivablePage.borrowMoney}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  box: {
    backgroundColor: "#fff",
    height: 300,
    borderRadius: 10,
    padding: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  form: {
    marginTop: 20,
  },
  formControl: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    flex: 1,
  },
  currencyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    flex: 1,
    marginLeft: 10,
  },
  // submitButton: {
  //   padding: 15,
  //   borderRadius: 20,
  //   alignItems: "center",
  //   marginTop: 20,
  // },

  submitButton: {
    backgroundColor: "#007bff", // Mavi tonlarında buton
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    elevation: 5, // Android için gölge efekti
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default CashReceivable;
