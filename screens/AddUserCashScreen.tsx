import React, { useContext, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { addUserCash } from "../api/customer";
import { AddUserCash } from "../types/customerType";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUser } from "../contex/useContext";
import { useTranslations } from "../hooks/useTranslation";
import { LanguageContext } from "../contex/languageContext";
import BottomBar from "./BottomBar";

const AddUserCashScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { transactionType } = route.params as { transactionType: string };
  const { userId } = useUser();
  const userIdNumber = userId ? Number(userId) : 0;
  const t = useTranslations();
  const { activeLanguage } = useContext(LanguageContext);
  const buttonColor = transactionType === "in" ? "green" : "red";
  const [formData, setFormData] = useState<AddUserCash>({
    totalCash: 0,
    cashCurrency: "TL",
    userId: userIdNumber,
    transactionType: transactionType
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t.addUserCashScreen.pageTitle,
    });
  }, [navigation, activeLanguage]);

  const handleAddCash = async () => {
    try {
      const response = await addUserCash(formData);
      if (response.isSuccess) {
        Alert.alert(
          "Başarılı",
          "Hesaba nakit ekleme işlemi başarıyla gerçekleştirildi",
          [
            {
              text: "Tamam",
              onPress: async () => {
                navigation.navigate("HomeCustomerListScreen");
              },
            },
          ]
        );
      }
    } catch (error: any) {
      const errorMessage = error?.message || "Beklenmeyen bir hata oluştu";
      Alert.alert("Hata", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t.addUserCashScreen.totalCash}</Text>
          <TextInput
            style={styles.input}
            placeholder={t.addUserCashScreen.labelCashAmount}
            keyboardType="numeric"
            value={
              formData.totalCash === 0 ? "" : formData.totalCash.toString()
            }
            onChangeText={(value) =>
              setFormData((prev) => ({
                ...prev,
                totalCash: value === "" ? 0 : Number(value),
              }))
            }
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>{t.addUserCashScreen.cashCurrency}</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.cashCurrency}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setFormData((prev) => ({ ...prev, cashCurrency: itemValue }))
              }
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

        <View style={styles.buttonCashContainer}>
          <TouchableOpacity style={[styles.button,{ backgroundColor: buttonColor }]} onPress={handleAddCash}>
            <Text style={styles.buttonText}>
              {t.addUserCashScreen.addCashButton}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomBar />
    </View>
  );
};

export default AddUserCashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "flex-start", // To keep content at the top
    alignItems: "center", // Center horizontally
  },
  card: {
    backgroundColor: "#fff",
    width: "100%", // Card takes full width
    maxWidth: 500, // Limiting card max width for a cleaner layout
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // For Android shadow effect
    marginTop: 20, // Add space from top
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    width: "100%",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    width: "100%",
  },
  picker: {
    height: 50,
  },
  buttonCashContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#2755ad",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
