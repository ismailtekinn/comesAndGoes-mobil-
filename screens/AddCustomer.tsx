import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Customer } from "../types/customerType";
import { addCustomer } from "../api/customer";
import { FontAwesome } from "@expo/vector-icons";
import BottomBar from "./BottomBar";
import { useUser } from "../contex/useContext";

const AddCustomer: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {handleLogout, userData,userId} = useUser()


  const userIdNumber = userId ? Number(userId) : 0;
  const [formData, setFormData] = useState<Customer>({
    clientName: 'Kerim',
    clientSurname: 'Araz',
    clientPhone: '551148',
    userId : userIdNumber ,
    id : 0,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log("form data console yazdırıldı",formData)
      const response = await addCustomer(formData);
      setSuccessMessage(response.message);

      Alert.alert("Başarılı", "Müşteri başarıyla eklendi!");

      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);
    } catch (error) {
      console.error("Kayıt başarısız", error);
      Alert.alert("Hata", "Müşteri eklenirken bir hata oluştu.");
    }
  };

  return (
    <View style={styles.container}>
      {successMessage && <Text style={styles.successMessage}>{successMessage}</Text>}

      <View style={styles.formContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome name="user" size={50} color="#f6f6f6" />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ad"
            value={formData.clientName}
            onChangeText={(text) => handleInputChange("clientName", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Soyad"
            value={formData.clientSurname}
            onChangeText={(text) => handleInputChange("clientSurname", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefon"
            value={formData.clientPhone}
            keyboardType="phone-pad"
            onChangeText={(text) => handleInputChange("clientPhone", text)}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
          <Text style={styles.addButtonText}>Müşteri Ekle</Text>
        </TouchableOpacity>
      </View>
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  successMessage: {
    color: "green",
    textAlign: "center",
    marginVertical: 10,
  },
  formContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2755ad",
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddCustomer;
