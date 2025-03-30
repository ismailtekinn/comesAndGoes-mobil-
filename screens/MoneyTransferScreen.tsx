import React, { useContext, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MoneyTransfer } from "../types/customerType";
import { useCustomerForm } from "../hooks/useCustomerForm";
import { getMoneyTransfers, moneyTransfer } from "../api/customer";
import BottomBar from "./BottomBar";
import { useUser } from "../contex/useContext";
import { useTranslations } from "../hooks/useTranslation";
import { LanguageContext } from "../contex/languageContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import { useMoneyTransferCustomers } from "../contex/mtcustomerContext";

const MoneyTransferScreen = () => {
  const [paraBirimi, setParaBirimi] = useState<string>("TL");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { handleLogout, userData, userId } = useUser();
  const t = useTranslations();
  const { activeLanguage } = useContext(LanguageContext);
  const [transferCustomers, setTransferCustomers] = useMoneyTransferCustomers();
  const userIdNumber = userId ? Number(userId) : 0;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: t.accounPage.pageTitle,
    });
  }, [navigation, activeLanguage]);
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
    console.log("Form data ekrana yazdırıldı: ", moneyTransferData);
    try {
      const response = await moneyTransfer(moneyTransferData);
      if (response.isSuccess) {
        Alert.alert(
          "Başarılı",
          "Nakit Gönderim İşlemi Başarıyla Gerçekleştirildi",
          [
            {
              text: "Tamam",
              onPress: async () => {
                const customerData = await getMoneyTransfers(userIdNumber);
                setTransferCustomers(customerData);
                navigation.navigate("Home");
              },
            },
          ]
        );
      }
      console.log("Form data gönderildi", moneyTransferData);
    } catch (error: any) {
      const errorMessage = error?.message || "Beklenmeyen bir hata oluştu";
      Alert.alert("Hata", errorMessage);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>{t.moneyTransferPage.sendCustomer}</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              {t.moneyTransferPage.selectCustomer}
            </Text>
            <Picker
              selectedValue={selectedCustomer?.id.toString() || ""}
              onValueChange={(value) =>
                handleSenderCustomerChange(parseInt(value))
              }
            >
              <Picker.Item label={t.moneyTransferPage.select} value="" />
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
              placeholder={t.moneyTransferPage.customerPhone}
              value={transferFormData.phone}
              onChangeText={(text) =>
                handleMoneyTransferInputChange("phone", text)
              }
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              {t.moneyTransferPage.cashPurchaseDate}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={transferFormData.receivedDate}
              onChangeText={(text) =>
                handleMoneyTransferInputChange("receivedDate", text)
              }
            />
          </View>
          <View style={styles.formRow}>
            <TextInput
              style={styles.input}
              placeholder={t.moneyTransferPage.cashAmount}
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

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              {t.moneyTransferPage.buyerCustomer}
            </Text>
            <Picker
              selectedValue={receiverCustomer?.id.toString() || ""}
              onValueChange={(value) =>
                handleMoneyTransferCustomerChange(parseInt(value))
              }
            >
              <Picker.Item label={t.moneyTransferPage.select} value="" />
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
            <Text style={styles.label}>
              {t.moneyTransferPage.cashSendingDate}
            </Text>
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
            <Button
              title={t.moneyTransferPage.send}
              onPress={handleSubmit}
              color="#2755ad"
            />
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

export default MoneyTransferScreen;
