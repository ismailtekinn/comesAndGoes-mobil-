import React, { useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Linking,
} from "react-native";
import BottomBar from "./BottomBar";
import { useTranslations } from "../hooks/useTranslation";
import { LanguageContext } from "../contex/languageContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const Help: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const t = useTranslations();
  const { activeLanguage } = useContext(LanguageContext);
  const whatsappUrl = "https://wa.me/+905357970059";
  const gmailUrl = "mailto:baysoftworks@gmail.com";
  const linkedinUrl = "https://www.linkedin.com/in/ismail-tekin-38b40b1a5/";
  useLayoutEffect(() => {
    navigation.setOptions({
      title: t.helpPage.pageTitle,
    });
  }, [navigation, activeLanguage]);
  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("URL desteklenmiyor: " + url);
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <View style={styles.box}>
          <Text style={styles.title}>{t.helpPage.title}</Text>
          <Text style={styles.subtitle}>{t.helpPage.description}</Text>
          <View style={styles.iconContainer}>
            <View style={styles.iconWrapper}>
              <Text style={styles.iconLabel}>WhatsApp</Text>
              <TouchableOpacity onPress={() => openLink(whatsappUrl)}>
                <FontAwesome name="whatsapp" size={35} color="#25D366" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconWrapper}>
              <Text style={styles.iconLabel}>Gmail</Text>
              <TouchableOpacity onPress={() => openLink(gmailUrl)}>
                <FontAwesome name="envelope" size={35} color="#D44638" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconWrapper}>
              <Text style={styles.iconLabel}>LinkedIn</Text>
              <TouchableOpacity onPress={() => openLink(linkedinUrl)}>
                <FontAwesome name="linkedin" size={35} color="#0077B5" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <BottomBar />
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fc",
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 20,
    maxWidth: "90%",
    width: "100%",
    padding: 30,
    marginVertical: 20,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 36,
    color: "#2755ad",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  iconWrapper: {
    alignItems: "center",
    backgroundColor: "#ffff",
    borderRadius: 50,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
});

export default Help;
