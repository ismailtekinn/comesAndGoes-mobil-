import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import BottomBar from "./BottomBar";
import { accountInfo } from "../api/customer";
import { User } from "../types";
import { useUser } from "../contex/useContext";
import { useTranslations } from "../hooks/useTranslation";
import { LanguageContext } from "../contex/languageContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";

const AccountInfoForm = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { handleLogout, userData } = useUser();
  const userId = 4;
  const [userInfo, setUserInfo] = useState<User>({
    email: "",

    id: 0,
    name: "",
    password: "",
    phone: 0,
    surname: "",
    username: "",
  });

  const t = useTranslations();
  const { activeLanguage } = useContext(LanguageContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t.accountInfoPage.pageTitle,
    });
  }, [navigation, activeLanguage]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    const fetchCustomers = async () => {
      try {
        if (userId !== undefined) {
          const result = await accountInfo(userId);
          setUserInfo(result[0]);
        } else {
          console.error("User ID is undefined.");
        }
      } catch (error) {
        console.error("Müşteriler yüklenirken hata oluştu:", error);
      }
    };

    fetchCustomers();

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.formWrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.avatar}
            />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>{t.accountInfoPage.name}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.accountInfoPage.firstName}
              value={userInfo.name}
            />

            <Text style={styles.label}>{t.accountInfoPage.surname}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.accountInfoPage.lastName}
              value={userInfo.surname}
            />

            <Text style={styles.label}>{t.accountInfoPage.phone}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.accountInfoPage.phoneNumber}
              value={userInfo.phone.toString()}
            />
          </View>

          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => handleLogout()}
          >
            <Text style={styles.buttonText}>{t.accountInfoPage.updateButton}</Text>
          </TouchableOpacity>
        </ScrollView>
        <BottomBar />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  formWrapper: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: 80, // BottomBar için boşluk bırak
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: -30, // Avatarın taşmasını azaltmak için
    paddingTop: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "white",
  },
  formContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 30,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#007bff",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#f0f0f0",
  },
  updateButton: {
    backgroundColor: "#FF7F00",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10, // Altında biraz boşluk bırak
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  // bottomBarContainer: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   height: 60,
  //   backgroundColor: '#fff',
  // },
});

export default AccountInfoForm;
