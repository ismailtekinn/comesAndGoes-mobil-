import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import BottomBar from "./BottomBar";
import { accountInfo } from "../api/customer"; // Güncelleme API'si eklendi
import { useUser } from "../contex/useContext";
import { useTranslations } from "../hooks/useTranslation";
import { LanguageContext } from "../contex/languageContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import { updateUser } from "../api/auth";

const AccountInfoForm = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { handleLogout, userId } = useUser();
  const userIdNumber = userId ? Number(userId) : 0;

  // Backend'den çekilen orijinal veriler
  const [userInfo, setUserInfo] = useState({
    email: "",
    id: 0,
    name: "",
    phone: "",
    surname: "",
    username: "",
  });

  // Kullanıcının güncelleyebileceği form verileri
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    surname: "",
  });

  const t = useTranslations();
  const { activeLanguage } = useContext(LanguageContext);

  useLayoutEffect(() => {
    navigation.setOptions({ title: t.accountInfoPage.pageTitle });
  }, [navigation, activeLanguage]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    const fetchUserInfo = async () => {
      try {
        if (userId) {
          const result = await accountInfo(userIdNumber);
          if (result.length > 0) {
            const userData = result[0];

            setUserInfo(userData);
            setFormData((prevFormData) => {
              if (JSON.stringify(prevFormData) !== JSON.stringify(userData)) {
                return {
                  email: userData.email,
                  name: userData.name,
                  phone: userData.phone,
                  surname: userData.surname,
                };
              }
              return prevFormData;
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [userId]);

  // Form verilerini güncelleme fonksiyonu
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Değişiklik olup olmadığını kontrol eden fonksiyon
  const hasChanges = () => {
    return (
      formData.email !== userInfo.email ||
      formData.name !== userInfo.name ||
      formData.phone !== userInfo.phone ||
      formData.surname !== userInfo.surname
    );
  };

  const handleUpdate = async () => {
    if (!hasChanges()) {
      alert(t.accountInfoPage.alertMessageNotChange);
      return;
    }
  
    const updatedFields: Partial<typeof formData> = {...formData  }; 
    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof typeof formData] !== userInfo[key as keyof typeof userInfo]) {
        updatedFields[key as keyof typeof formData] = formData[key as keyof typeof formData];
      }
    });
    try {
      
      const response = await updateUser(userIdNumber, updatedFields);
      alert(t.accountInfoPage.alertMessageSuccessfull);
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      alert(t.accountInfoPage.alertMessageFailed);
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.formWrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.label}>{t.accountInfoPage.name}</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => handleChange("name", text)}
            />

            <Text style={styles.label}>{t.accountInfoPage.surname}</Text>
            <TextInput
              style={styles.input}
              value={formData.surname}
              onChangeText={(text) => handleChange("surname", text)}
            />

            <Text style={styles.label}>{t.accountInfoPage.phone}</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(text) => handleChange("phone", text)}
            />

            <Text style={styles.label}>{t.accountInfoPage.email}</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
            />
          </View>

          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.buttonText}>{t.accountInfoPage.updateButton}</Text>
          </TouchableOpacity>
        </ScrollView>
        {!isKeyboardVisible && <BottomBar />}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
  },
  formWrapper: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  formContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
  },
  label: {
    fontWeight: "700",
    marginBottom: 6,
    fontSize: 16,
    color: "#37474F",
  },
  input: {
    height: 50,
    borderColor: "#42A5F5",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 15,
    backgroundColor: "#FAFAFA",
    fontSize: 16,
    color: "#333",
  },
  updateButton: {
    backgroundColor: "#1976D2",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#1976D2",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default AccountInfoForm;
