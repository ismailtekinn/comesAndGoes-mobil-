import React, { useContext, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import DatePicker from "react-native-date-picker";
import BottomBar from "./BottomBar";
import { Picker } from "@react-native-picker/picker";
import { Debt } from "../types/customerType";
import { useUser } from "../contex/useContext";
import { useCustomerForm } from "../hooks/useCustomerForm";
import { addCashReceivable } from "../api/customer";
import { useTranslations } from "../hooks/useTranslation";
import { LanguageContext } from "../contex/languageContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";


const CashReceivable = () => {
  const [paraBirimi, setParaBirimi] = useState("TL");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [musteriAdi, setMusteriAdi] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const t = useTranslations();
  const { activeLanguage } = useContext(LanguageContext);
  const { handleLogout, userData, userId } = useUser();
  const userIdNumber = userId ? Number(userId) : 0;
  const {
    customers,
    formData,
    selectedCustomer,
    transferFormData,
    setFormData,
    handleCustomerChange,
    setSelectedCustomer,
    handleInputChange,
    handleMoneyTransferInputChange,
    handleSenderCustomerChange,
  } = useCustomerForm(userIdNumber);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t.cashReceivablePage.pageTitle,
    });
  }, [navigation, activeLanguage]);
  
  const handleSubmit = async () => {
    const debtData: Debt = {
      debtAmount: formData.cashAmount,
      debtCurrency: formData.debtCurrency,
      debtorId: userIdNumber,
      creditorId: selectedCustomer ? selectedCustomer.id : 0,
      debtIssuanceDate: new Date(formData.debtDate),
      debtRepaymentDate: new Date(formData.repaymentDate),
    };
    try {
      const response = await addCashReceivable(debtData);
      setFormData({
        name: "",
        surname: "",
        phone: "",
        cashAmount: 0,
        debtDate: "2025-07-17",
        repaymentDate: "2025-07-17",
        debtCurrency: "TL",
      });

      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);
    } catch (error) {
      console.error("registration failed", error);
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
              <Text style={styles.label}>{t.cashReceivablePage.customerName}</Text>
              <Picker
                selectedValue={selectedCustomer?.id.toString() || ""}
                onValueChange={(value) =>
                  handleSenderCustomerChange(parseInt(value))
                }
              >
                <Picker.Item label={t.cashReceivablePage.select} value="" />
                {customers.map((customer) => (
                  <Picker.Item
                    key={customer.id}
                    label={`${customer.clientName} ${customer.clientSurname}`}
                    value={customer.id.toString()}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>{t.cashReceivablePage.customerPhone}</Text>
              <TextInput
                style={styles.input}
                placeholder={t.cashReceivablePage.customerPhone}
                value={transferFormData.phone}
                onChangeText={(text) =>
                  handleMoneyTransferInputChange("phone", text)
                }
              />
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>{t.cashReceivablePage.cashAmount} </Text>
              <View style={styles.currencyContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={t.cashReceivablePage.cashAmount}
                  value={transferFormData.receivedAmount}
                  onChangeText={(text) =>
                    handleMoneyTransferInputChange("receivedAmount", text)
                  }
                />

                <Picker
                  selectedValue={paraBirimi}
                  onValueChange={(itemValue) => setParaBirimi(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label={t.cashReceivablePage.tl} value={t.cashReceivablePage.tl} />
                  <Picker.Item label={t.cashReceivablePage.usd} value={t.cashReceivablePage.usd} />
                  <Picker.Item label={t.cashReceivablePage.euro} value={t.cashReceivablePage.euro} />
                  <Picker.Item label={t.cashReceivablePage.toman} value={t.cashReceivablePage.toman} />
                  <Picker.Item label={t.cashReceivablePage.afghani} value={t.cashReceivablePage.afghani} />
                </Picker>
              </View>
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>{t.cashReceivablePage.debtLendingDate}  </Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={transferFormData.receivedDate}
                onChangeText={(text) =>
                  handleMoneyTransferInputChange("receivedDate", text)
                }
              />
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>{t.cashReceivablePage.debtRepaymentDate}</Text>
              <TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  value={transferFormData.transferDate}
                  onChangeText={(text) =>
                    handleMoneyTransferInputChange("receivedDate", text)
                  }
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DatePicker
                  modal
                  open={showDatePicker}
                  date={selectedDate}
                  onConfirm={(date) => {
                    setShowDatePicker(false);
                    setSelectedDate(date);
                  }}
                  onCancel={() => {
                    setShowDatePicker(false);
                  }}
                />
              )}

            </View>
            <View style={styles.submitButton}>
              <Button title={t.cashReceivablePage.borrowMoney} onPress={handleSubmit} />
            </View>
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
    borderRadius: 10,
    padding: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    bottom: 40,
  },
  header: {
    // backgroundColor: "#0e76a8",
    paddingVertical: 20,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginLeft: 10,
  },
  submitButton: {
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default CashReceivable;
