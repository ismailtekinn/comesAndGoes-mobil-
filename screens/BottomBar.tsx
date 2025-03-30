import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProcessSidebar from './ProcessSidebar'; 
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from '../types'; 
import { useTranslations } from "../hooks/useTranslation";

const BottomBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const t = useTranslations();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate('HomeCustomerListScreen')} style={styles.button}>
          <Ionicons name="home-outline" size={28} color="#2895fe" />
          <Text style={styles.text}>{t.homePage.homeIcon}</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('AccountActivity')} style={styles.button}>
          <Ionicons name="person-outline" size={28} color="#2895fe" />
          <Text style={styles.text}>{t.homePage.accountIcon}</Text>
        </Pressable>
        <Pressable onPress={toggleSidebar} style={styles.button}>
          <Ionicons 
            name="menu-outline" 
            size={28} 
            color={isSidebarOpen ? "red" : "#2895fe"} 
          />
          <Text style={[styles.text, { color: isSidebarOpen ? "red" : "black" }]}>{t.homePage.otherIcon}</Text>
        </Pressable>
      </View>

      <ProcessSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignItems: 'center',
    paddingVertical: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  button: {
    alignItems: 'center',
    padding: 10, 
  },
  text: {
    fontSize: 14,
    marginTop: 4,
    color: '#000',
  },
});

export default BottomBar;
