import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import CustomerList from "./CustomerList";
import BottomBar from "./BottomBar";

const Home = () => {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Müşteriler</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Müşteri ara"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.searchIconContainer}>
            <FontAwesome name="search" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.listContainer}>
        <CustomerList />
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
