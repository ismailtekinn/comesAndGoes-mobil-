import React, { useContext, useLayoutEffect, useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LanguageContext } from "../contex/languageContext";
import BottomBar from "./BottomBar";
import { useTranslations } from "../hooks/useTranslation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUser } from "../contex/useContext";
import { TransactionFields } from "../types/accountType";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { addDebt } from "../api/customer";
import { getCurrentTimeForRegion } from "../utils/dateUtils";

const AddTransaction = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { activeLanguage } = useContext(LanguageContext);
  const [paraBirimi, setParaBirimi] = useState("TL");

  const t = useTranslations();
  const route = useRoute();
  const { customerId, transactionType } = route.params as {
    customerId: number;
    transactionType: string;
  };
  const buttonColor = transactionType === "cash" ? "green" : "red";

  const { userId } = useUser();
  const userIdNumber = userId ? Number(userId) : 0;
  console.log("object", customerId);
  const [formData, setFormData] = useState<TransactionFields>({
    transactionAmount: 0,
    transactionCurrency: "TL",
    transactionType: transactionType,
    description: "",
    createdAt: "",
    userId: userIdNumber,
    clientId: customerId,
  });

  const handleSubmit = async () => {
    const currentTime = getCurrentTimeForRegion();
    const payload = {
      ...formData,
      createdAt: currentTime,
    };

    try {
      const response = await addDebt(payload);
      if (response.isSuccess) {
        navigation.goBack();
      } else {
        Alert.alert("Hata", response.message);
      }
    } catch (error: any) {
      const errorMessage = error?.message || "Beklenmeyen bir hata oluştu";
      Alert.alert("Hata", errorMessage);
    }
  };

  useLayoutEffect(() => {
    if (transactionType == "debt") {
    } else {
      navigation.setOptions({
        title: t.cashReceivablePage.pageTitle,
      });
    }
  }, [navigation, activeLanguage]);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.formRow}>
            <TextInput
              style={styles.input}
              placeholder={t.addDebtPage.cashAmount}
              keyboardType="numeric"
              value={formData.transactionAmount.toString()}
              onChangeText={(text) =>
                setFormData((prev) => ({
                  ...prev,
                  transactionAmount: parseFloat(text) || 0,
                }))
              }
            />
            <Picker
              style={styles.picker}
              selectedValue={formData.transactionCurrency}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, transactionCurrency: value }))
              }
            >
              <Picker.Item label={t.addDebtPage.tl} value="TL" />
              <Picker.Item label={t.addDebtPage.usd} value="Dolar" />
              <Picker.Item label={t.addDebtPage.euro} value="Euro" />
              <Picker.Item label={t.addDebtPage.toman} value="Toman" />
              <Picker.Item label={t.addDebtPage.afghani} value="Afghani" />
            </Picker>
          </View>

          <View style={[styles.formRow, { marginTop: 10 }]}>
            <TextInput
              style={styles.input}
              placeholder={t.debtPage.description}
              value={formData.description}
              onChangeText={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
              }
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: buttonColor }]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>
              {formData.transactionType === "debt"
                ? t.debtPage.borrowMoney
                : t.cashPage.borrowMoney}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f8", marginTop: 40 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    height: 360,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  formRow: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  input: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    marginRight: 10,
    color: "#333",
  },
  picker: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    color: "#555",
  },
  submitButton: {
    backgroundColor: "#f31137",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default AddTransaction;
