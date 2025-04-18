import React, { useState, useContext, useLayoutEffect } from "react";
import {
  View,
  Alert,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Feather from "react-native-vector-icons/Feather"; 
import { SignIn } from "../types/authType";
import { login } from "../api/auth";
import { useUser } from "../contex/useContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { LanguageType, RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import { LanguageContext } from "../contex/languageContext";
import { useTranslations } from "../hooks/useTranslation";
import { Picker } from "@react-native-picker/picker";

const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { handleToken, handleLogin } = useUser();
  const t = useTranslations();
  const { activeLanguage, setActiveLanguage } = useContext(LanguageContext);
  const languages: LanguageType[] = ["Türkçe", "İngilizce", "Farsça"];

  const [formData, setFormData] = useState<SignIn>({
    phone: "7520",
    password: "2090",
  });

  const [passwordVisible, setPasswordVisible] = useState(false); 

  useLayoutEffect(() => {
    if (t?.loginPage?.pageTitle) {
      navigation.setOptions({
        title: t.loginPage.pageTitle,
      });
    }
  }, [navigation, activeLanguage]);

  const handleChange = (name: keyof SignIn, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { phone, password } = formData;
    if (phone === "" || password === "") {
      Alert.alert("Hata", "Lütfen telefon numarası ve şifre girin.");
      return;
    }
    try {
      const response = await login(formData);
      const { user, token } = response.data;
      if (token && user) {
        handleToken(token);
        handleLogin(user);
        navigation.navigate("HomeCustomerListScreen");
      } else {
        Alert.alert("Giriş Hatası", "Kullanıcı veya token bilgisi bulunamadı.");
      }
    } catch (error: any) {
      const errorMessage = error?.message || "Beklenmeyen bir hata oluştu";
      console.log("Hata detayı:", error);
      Alert.alert("Hata", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.languageDropdownContainer}>
        <Picker
          selectedValue={activeLanguage}
          style={styles.languagePicker}
          itemStyle={{ color: "#000", fontSize: 16 }}
          onValueChange={(itemValue) => setActiveLanguage(itemValue)}
        >
          {languages.map((language, index) => (
            <Picker.Item
              key={index}
              label={t.languagePage.languageTypes[index]}
              value={language}
            />
          ))}
        </Picker>
      </View>
      <Text style={styles.title}>{t.loginPage.pageTitle}</Text>

      <TextInput
        style={styles.input}
        placeholder={t.loginPage.phoneNumber}
        value={formData.phone}
        onChangeText={(value) => handleChange("phone", value)}
        autoCapitalize="none"
      />

      {/* Şifre Girişi */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder={t.loginPage.password}
          value={formData.password}
          onChangeText={(value) => handleChange("password", value)}
          secureTextEntry={!passwordVisible} // 👈 Şifre görünürlüğünü dinamik olarak değiştiriyoruz
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeIcon}
        >
          <Feather
            name={passwordVisible ? "eye" : "eye-off"} // 👈 Şifre görünürlüğüne göre ikon değişiyor
            size={22}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <Button
        onPress={handleSubmit}
        title={t.loginPage.pageTitle || "Login"}
        color="#007BFF"
      />

      <View style={styles.signUpText}>
        <Text style={styles.text}>{t.loginPage.haveNoAccount}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.linkText}>{t.loginPage.signUp}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signUpText}>
        <TouchableOpacity
          onPress={() => navigation.navigate("PasswordUpdateScreen")}
        >
          <Text style={styles.linkText}>{t.loginPage.forgetPassword}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// **Stil Güncellemeleri**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  languageDropdownContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 150,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 100,
  },
  languagePicker: {
    height: 60,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16,
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  signUpText: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  text: {
    color: "grey",
  },
  linkText: {
    color: "blue",
    textAlign: "center",
    marginTop: 10,
    marginLeft: 5,
  },
});

export default LoginScreen;
