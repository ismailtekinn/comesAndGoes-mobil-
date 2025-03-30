import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { UpdatePassword } from "../types/authType";
import { updatePassword } from "../api/customer";
import { useUser } from "../contex/useContext";
import { useTranslations } from "../hooks/useTranslation";
import { LanguageContext } from "../contex/languageContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { LanguageType, RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
const PasswordUpdateScreen = () => {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { userId } = useUser();
  const t = useTranslations();
  const { activeLanguage, setActiveLanguage } = useContext(LanguageContext);
  const userIdNumber = userId ? Number(userId) : 0;
  const [formData, setFormData] = useState<UpdatePassword>({
    newPassword: "",
    userId: userIdNumber,
  });

  useLayoutEffect(() => {
    if (t?.updatePassword?.pageTitle) {
      navigation.setOptions({
        title: t.updatePassword.pageTitle,
      });
    }
  }, [navigation, activeLanguage]);

  const handleChange = async () => {
    if (formData.newPassword !== confirmPassword) {
      Alert.alert("Hata", "Şifreler eşleşmiyor!");
      return;
    }
    try {
      const response = await updatePassword(formData);
      if (response.success === true) {
        console.log("işlem başarılı");
        Alert.alert(response.message);
      } else {
        Alert.alert(response.message);
      }
    } catch (error: any) {
      Alert.alert("Hata", error.message || "Bilinmeyen bir hata oluştu");
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={t.updatePassword.newPassword}
        value={formData.newPassword}
        onChangeText={(value) => {
          setFormData((prev) => ({
            ...prev,
            newPassword: value,
          }));
        }}
      />

      <TextInput
        style={styles.input}
        placeholder={t.updatePassword.newPasswordConfirm}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleChange}>
        <Text style={styles.buttonText}>{t.updatePassword.updateButton}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007bff",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PasswordUpdateScreen;
