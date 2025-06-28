import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ExchangeRatesMethod } from "../api/currency";
import { useTranslations } from "../hooks/useTranslation";
import { LanguageContext } from "../contex/languageContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

const CurrencyConverter = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [amount, setAmount] = useState<string>("1");

  const currencyOptions: { label: string; value: string }[] = [
    { label: "🇹🇷 TRY", value: "TRY" },
    { label: "🇺🇸 USD", value: "USD" },
    { label: "🇪🇺 EUR", value: "EUR" },
    { label: "🇮🇷 IRR", value: "IRR" },
    { label: "🇦🇫 AFN", value: "AFN" },
  ];

  const [fromCurrency, setFromCurrency] = useState(currencyOptions[1].value); // USD
  const [toCurrency, setToCurrency] = useState(currencyOptions[0].value); // TRY
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [exchangeRates1, setExchangeRates1] = useState<Record<
    string,
    number
  > | null>(null);

  const t = useTranslations();
  const { activeLanguage } = useContext(LanguageContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t.currencyConvert.pageTitle,
    });
  }, [navigation, activeLanguage]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response1 = await ExchangeRatesMethod();
        setExchangeRates1(response1.data.rates);
      } catch (error) {
        console.error("Kurlar yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  const convertCurrency = () => {
    if (!exchangeRates1) return;

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return;

    const fromRate = exchangeRates1[fromCurrency];
    const toRate = exchangeRates1[toCurrency];

    if (!fromRate || !toRate) {
      console.error("Seçilen para birimi desteklenmiyor.");
      return;
    }

    const usdAmount = numericAmount / fromRate; // FROM → USD
    const convertedAmount = usdAmount * toRate; // USD → TO

    setResult(convertedAmount);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={{ marginTop: 10, color: "#555" }}>
          Kurlar yükleniyor...
        </Text>
      </View>
    );
  }

  if (!exchangeRates1) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: "red", fontSize: 16 }}>
          Kur bilgileri alınamadı.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>

      <Text style={styles.label}> {t.currencyConvert.amount}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Miktar girin"
        value={amount}
        onChangeText={setAmount}
      />

      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>{t.currencyConvert.currency}</Text>
          <Picker
            selectedValue={fromCurrency}
            onValueChange={(itemValue) => setFromCurrency(itemValue)}
            style={styles.picker}
          >
            {currencyOptions.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>{t.currencyConvert.currency}</Text>
          <Picker
            selectedValue={toCurrency}
            onValueChange={(itemValue) => setToCurrency(itemValue)}
            style={styles.picker}
          >
            {currencyOptions.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={convertCurrency}>
        <Text style={styles.buttonText}>{t.currencyConvert.translate}</Text>
      </TouchableOpacity>

      {result !== null && (
        <Text style={styles.result}>
          {t.currencyConvert.result}:{" "}
          <Text style={{ fontWeight: "bold", color: "#2563eb" }}>
            {result.toFixed(4)} {toCurrency}
          </Text>
        </Text>
      )}
    </View>
  );
};

export default CurrencyConverter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#f9fafb",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 25,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#d1d5db",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#f3f4f6",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
  result: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "#111827",
  },
});
