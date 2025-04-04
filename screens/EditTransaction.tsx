import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const EditTransaction = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleUpdate = () => {
    Alert.alert("Güncelleme", `Miktar: ${amount}\nTarih: ${date}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.phoneNumber}>+90 531 872 68 28</Text>

      <View style={styles.contentContainer}>
        <Text style={styles.amount}>555,00</Text>

        <TouchableOpacity style={styles.dateButton}>
          <Ionicons name="calendar" size={20} color="black" />
          <Text style={styles.dateText}>2025-03-18</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Ayrıntıları giriniz (Ürün adı, Fatura no, Miktar...)"
          placeholderTextColor="#A0A0A0"
        />

        <TouchableOpacity style={styles.imageButton}>
          <Ionicons name="camera" size={20} color="black" />
          <Text style={styles.imageText}>Resim ekle</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.saveButtonText}>KAYDET</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  phoneNumber: {
    color: "#3498db",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  contentContainer: {
    alignItems: "flex-start", // sola yaslama
    width: "100%",
  },
  amount: {
    fontSize: 32,
    color: "red",
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  dateText: {
    marginLeft: 5,
    fontSize: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  imageText: {
    marginLeft: 5,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginTop: 40, // ← buraya eklendi
    width: "100%",
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EditTransaction;
