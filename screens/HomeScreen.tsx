import React, { useState, useLayoutEffect, useContext, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import CustomerList from "./CustomerList";
import BottomBar from "./BottomBar";

import { useTranslations } from "../hooks/useTranslation";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { LanguageContext } from "../contex/languageContext";
import { getCustomerList } from "../api/customer";
import { useUser } from "../contex/useContext";
const Home = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [searchText, setSearchText] = useState<string>("");
  const t = useTranslations();
  const { activeLanguage } = useContext(LanguageContext);
  const { userId } = useUser();
  const userIdNumber = userId ? Number(userId) : 0;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: t.homePage.pageTitle,
    });
  }, [navigation, activeLanguage]);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{t.homePage.customersTitle}</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={t.homePage.searchButton}
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.searchIconContainer}>
            <FontAwesome name="search" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.listContainer}>
      <CustomerList  />
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
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2895fe",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f9ff",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    backgroundColor: "#f6f9ff",
    borderRadius: 20,
  },
  searchIconContainer: {
    padding: 10,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default Home;
