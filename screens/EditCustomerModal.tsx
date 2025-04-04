import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { EditCustomerModalProps } from "../interface/IEditCustomer";
import { updateCustomer } from "../api/customer";
import { useUser } from "../contex/useContext";
import { Customer } from "../types/customerType";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import { useTranslations } from "../hooks/useTranslation";
import { LanguageContext } from "../contex/languageContext";

const EditCustomerModal: React.FC<EditCustomerModalProps> = ({
  visible,
  onClose,
  customer,
  onUpdate,
}) => {
  
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const t = useTranslations();
  const { activeLanguage, setActiveLanguage } = useContext(LanguageContext);

  const { userId } = useUser();
  const userIdNumber = userId ? Number(userId) : 0;
  const [formData, setFormData] = useState<Customer>({
    clientName: customer?.clientName || "",
    clientSurname: customer?.clientSurname || "",
    clientPhone: customer?.clientPhone || "",
    userId: userIdNumber,
  });

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const handleSave = async () => {
    try {
      const response = await updateCustomer(formData);
      if (response.isSuccess) {
        Alert.alert("Başarılı", "Müşteri başarıyla eklendi!", [
          {
            text: "Tamam",
            onPress: () => {
              onClose();
              onUpdate();
            },
          },
        ]);
      } else {
        Alert.alert(response.message || "Bilinmeyen bir hata oluştu.");
      }
    } catch (error: any) {
      console.error("Kayıt başarısız", error);
      const errorMessage = error?.message || "Beklenmeyen bir hata oluştu";
      Alert.alert("Hata", errorMessage);
    }
  };

  useEffect(() => {
    if (customer) {
      console.log("Modal açıldı, müşteri bilgisi:", customer);
      setFormData({
        clientName: customer.clientName || "",
        clientSurname: customer.clientSurname || "",
        clientPhone: customer.clientPhone || "",
        userId: userIdNumber,
      });
    }
  }, [customer]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>{t.myCustomerPage.mofalPage}</Text>

            <TextInput
              style={styles.input}
              placeholder="Ad"
              value={formData.clientName}
              onChangeText={(text) => handleChange("clientName", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Soyad"
              value={formData.clientSurname}
              onChangeText={(text) => handleChange("clientSurname", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Telefon"
              keyboardType="phone-pad"
              value={formData.clientPhone}
              onChangeText={(text) => handleChange("clientPhone", text)}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>{t.myCustomerPage.saveButton}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={styles.buttonText} onPress={onClose}>
                {t.myCustomerPage.cancelButton}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Arka planı yarı saydam yapar
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default EditCustomerModal;
