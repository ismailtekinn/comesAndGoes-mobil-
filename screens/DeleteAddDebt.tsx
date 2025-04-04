import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { MoneyTransfer } from "../types/customerType";
import { useCustomerForm } from "../hooks/useCustomerForm";
import { moneyTransfer } from "../api/customer";
import BottomBar from "./BottomBar";
import { useUser } from "../contex/useContext";
import { useTranslations } from "../hooks/useTranslation";
import { LanguageContext } from "../contex/languageContext";

const AddDebt = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { activeLanguage } = useContext(LanguageContext);
  const [paraBirimi, setParaBirimi] = useState("TL");
  const {handleLogout, userData,userId} = useUser();
  const t = useTranslations();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: t.addDebtPage.pageTitle,
    });
  },[navigation,activeLanguage])
  const userIdNumber = userId ? Number(userId) : 0;
  const {
    customers,
    transferFormData,
    selectedCustomer,
    receiverCustomer,
    handleMoneyTransferInputChange,
    handleMoneyTransferCustomerChange,
    handleSenderCustomerChange,
  } = useCustomerForm(userIdNumber);

  const handleSubmit = async () => {
    const moneyTransferData: MoneyTransfer = {
      receivedAmount: parseInt(transferFormData.receivedAmount),
      moneyCurrency: paraBirimi, 
      senderId: selectedCustomer ? selectedCustomer.id : 0,
      receiverId: receiverCustomer ? receiverCustomer.id : 0,
      intermediaryId: userIdNumber,
      receivedDate: new Date(transferFormData.receivedDate),
      transferDate: new Date(transferFormData.transferDate),
    };
    try {
      const response  = await moneyTransfer(moneyTransferData);
    } catch (error) {
      console.error("Gönderim hatası", error);
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t.addDebtPage.selectCustomer}</Text>
            <Picker
              selectedValue={selectedCustomer?.id.toString() || ""}
              onValueChange={(value) =>
                handleSenderCustomerChange(parseInt(value))
              }
            >
              <Picker.Item label={t.addDebtPage.select} value="" />
              {customers.map((customer) => (
                <Picker.Item
                  key={customer.id}
                  label={`${customer.clientName} ${customer.clientSurname}`}
                  value={customer.id.toString()}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder={t.addDebtPage.customerPhone}
              value={transferFormData.phone}
              onChangeText={(text) =>
                handleMoneyTransferInputChange("phone", text)
              }
            />
          </View>
          <View style={styles.formRow}>
            <TextInput
              style={styles.input}
              placeholder={t.addDebtPage.cashAmount}
              value={transferFormData.receivedAmount}
              onChangeText={(text) =>
                handleMoneyTransferInputChange("receivedAmount", text)
              }
            />
            <Picker
              style={styles.picker}
              selectedValue={paraBirimi}
              onValueChange={(value) => setParaBirimi(value)}
            >
              <Picker.Item label={t.addDebtPage.tl} value={t.addDebtPage.tl} />
              <Picker.Item label={t.addDebtPage.usd} value={t.addDebtPage.usd} />
              <Picker.Item label={t.addDebtPage.euro} value={t.addDebtPage.euro} />
              <Picker.Item label={t.addDebtPage.toman} value={t.addDebtPage.toman} />
              <Picker.Item label={t.addDebtPage.afghani} value={t.addDebtPage.afghani} />
            </Picker>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>{t.addDebtPage.debtLendingDate}</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={transferFormData.receivedDate}
              onChangeText={(text) =>
                handleMoneyTransferInputChange("receivedDate", text)
              }
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>{t.addDebtPage.debtRepaymentDate}</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={transferFormData.transferDate}
              onChangeText={(text) =>
                handleMoneyTransferInputChange("transferDate", text)
              }
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button title={t.addDebtPage.lend} onPress={handleSubmit} color="#f31137" />
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
    backgroundColor: "#f6f6f6",
    marginTop:50,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 80, 
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    marginRight: 10, 
  },
  picker: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default AddDebt;
