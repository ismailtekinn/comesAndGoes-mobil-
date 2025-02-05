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
import { SignIn } from "../types/authType";
import { login } from "../api/auth";
import { useUser } from "../contex/useContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import { LanguageContext } from "../contex/languageContext";

import { useTranslations } from "../hooks/useTranslation";

const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { handleToken, handleLogin } = useUser();
  const t = useTranslations();
  const { activeLanguage } = useContext(LanguageContext);

  
  useLayoutEffect(() => {
    if (t?.loginPage?.pageTitle) {
      navigation.setOptions({
        title: t.loginPage.pageTitle,
      });
    }
  }, [navigation, activeLanguage]);

  const [formData, setFormData] = useState<SignIn>({
    phone: "",
    password: "",
  });

  const handleChange = (name: keyof SignIn, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { phone, password } = formData;
    if (phone === "" || password === "") {
      Alert.alert("Error", "Please enter both phone number and password.");
    } else {
      const { user, token } = await login(formData);
      console.log("user and token: ", user, token);
      if (token && user) {
        handleToken(token);
        console.log("LoginScreen user: ", user);
        handleLogin(user);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.loginPage.pageTitle}</Text>
      <TextInput
        style={styles.input}
        placeholder={t.loginPage.phoneNumber}
        value={formData.phone}
        onChangeText={(value) => handleChange("phone", value)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder={t.loginPage.password}
        value={formData.password}
        onChangeText={(value) => handleChange("password", value)}
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
