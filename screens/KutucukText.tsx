import React, { useState, useContext, useLayoutEffect, useRef } from "react";
import {
  View,
  Alert,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SignIn } from "../types/authType";
import { login } from "../api/auth";
import { useUser } from "../contex/useContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { LanguageType, RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import { LanguageContext } from "../contex/languageContext";
import { useTranslations } from "../hooks/useTranslation";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";

const PHONE_DIGITS = 10; // Telefon numarası için kutu sayısı

const KutucukText = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { handleToken, handleLogin } = useUser();
  const t = useTranslations();
  const { activeLanguage, setActiveLanguage } = useContext(LanguageContext);
  const languages: LanguageType[] = ["Türkçe", "İngilizce", "Farsça"];

  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState<string[]>(Array(PHONE_DIGITS).fill(""));
  const inputs = useRef<(TextInput | null)[]>([]);

  useLayoutEffect(() => {
    if (t?.loginPage?.pageTitle) {
      navigation.setOptions({
        title: t.loginPage.pageTitle,
      });
    }
  }, [navigation, activeLanguage]);

  const handlePhoneChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      const newPhone = [...phone];
      newPhone[index] = text;
      setPhone(newPhone);

      if (text && index < PHONE_DIGITS - 1) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handlePhoneKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && phone[index] === "") {
      if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const phoneNumber = phone.join("");
    if (phoneNumber.length < PHONE_DIGITS || password === "") {
      Alert.alert("Hata", "Lütfen telefon numarası ve şifre girin.");
      return;
    }

    try {
      const response = await login({ phone: phoneNumber, password });
      const { user, token } = response.data;
      if (token && user) {
        handleToken(token);
        handleLogin(user);
        Alert.alert("Giriş Başarılı", "Başarıyla giriş yaptınız.");
        navigation.navigate("Home");
      } else {
        Alert.alert("Giriş Hatası", "Kullanıcı veya token bilgisi bulunamadı.");
      }
    } catch (error: any) {
      Alert.alert("Hata", error?.message || "Beklenmeyen bir hata oluştu");
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
      <Text style={styles.text}>Telefon Numarası</Text>
      <View style={styles.phoneContainer}>
        {phone.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            style={styles.phoneInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handlePhoneChange(text, index)}
            onKeyPress={(e) => handlePhoneKeyPress(e, index)}
          />
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder={t.loginPage.password}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

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
  phoneContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  phoneIcon: {
    marginRight: 10,
  },
  phoneInput: {
    width: 25,
    height: 30,
    borderWidth: 2,
    borderColor: "#007BFF",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 2,
    backgroundColor: "#fff",
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
  signUpText: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  text: {
    color: "grey",
    marginBottom:3
  },
  linkText: {
    color: "blue",
    textAlign: "center",
    marginTop: 10,
    marginLeft: 5,
  },
});

export default KutucukText;

