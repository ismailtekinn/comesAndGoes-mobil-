import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, Button } from "react-native";
import { Picker } from '@react-native-picker/picker';

import { MoneyTransfer } from "../types/customerType";
import { useCustomerForm } from "../hooks/useCustomerForm";
import { moneyTransfer } from "../api/customer";
import BottomBar from "./BottomBar";

const MoneyTransferScreen = () => {
  const [paraBirimi, setParaBirimi] = useState<string>("TL");
  const userId = 1;
  const {
    customers,
    transferFormData,
    selectedCustomer,
    receiverCustomer,
    handleMoneyTransferInputChange,
    handleMoneyTransferCustomerChange,
    handleSenderCustomerChange,
  } = useCustomerForm(userId);

  const handleSubmit = async () => {
    const moneyTransferData: MoneyTransfer = {
      receivedAmount: parseInt(transferFormData.receivedAmount),
      moneyCurrency: paraBirimi, // Dikkat! Para birimi burada kullanılacak
      senderId: selectedCustomer ? selectedCustomer.id : 0,
      receiverId: receiverCustomer ? receiverCustomer.id : 0,
      intermediaryId: userId,
      receivedDate: new Date(transferFormData.receivedDate),
      transferDate: new Date(transferFormData.transferDate),
    };
    console.log("Form data ekrana yazdırıldı: ", moneyTransferData);
    try {
      const { response } = await moneyTransfer(moneyTransferData);
      console.log("Form data gönderildi", response);
    } catch (error) {
      console.error("Gönderim hatası", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Gönderen Müşteri</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Müşteri Seç</Text>
            <Picker
              selectedValue={selectedCustomer?.id.toString() || ""}
              onValueChange={(value) => handleSenderCustomerChange(parseInt(value))}
            >
              <Picker.Item label="Seçiniz" value="" />
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
              placeholder="Müşteri Telefon"
              value={transferFormData.phone}
              onChangeText={(text) => handleMoneyTransferInputChange("phone", text)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Nakit Alış Tarihi</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={transferFormData.receivedDate}
              onChangeText={(text) => handleMoneyTransferInputChange("receivedDate", text)}
            />
          </View>

          {/* Nakit Miktarı ve Para Birimi Bölümü */}
          <View style={styles.formRow}>
            <TextInput
              style={styles.input}
              placeholder="Nakit Miktarı"
              value={transferFormData.receivedAmount}
              onChangeText={(text) => handleMoneyTransferInputChange("receivedAmount", text)}
            />
            <Picker
              style={styles.picker}
              selectedValue={paraBirimi}
              onValueChange={(value) => setParaBirimi(value)}
            >
              <Picker.Item label="TL" value="TL" />
              <Picker.Item label="Dollar" value="Dollar" />
              <Picker.Item label="Euro" value="Euro" />
            </Picker>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Alıcı Müşteri</Text>
            <Picker
              selectedValue={receiverCustomer?.id.toString() || ""}
              onValueChange={(value) => handleMoneyTransferCustomerChange(parseInt(value))}
            >
              <Picker.Item label="Seçiniz" value="" />
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
            <Text style={styles.label}>Nakit Gönderim Tarihi</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={transferFormData.transferDate}
              onChangeText={(text) => handleMoneyTransferInputChange("transferDate", text)}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Gönder" onPress={handleSubmit} color="#2755ad" />
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
    paddingBottom: 80, // Add padding at the bottom to avoid BottomBar overlap
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
    marginRight: 10, // Araya boşluk koymak için
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
