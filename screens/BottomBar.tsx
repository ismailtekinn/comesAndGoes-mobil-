import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProcessSidebar from './ProcessSidebar'; 
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from '../types'; 

const BottomBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate('Home')} style={styles.button}>
          <Ionicons name="home-outline" size={28} color="#2895fe" />
          <Text style={styles.text}>Anasayfa</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Account')} style={styles.button}>
          <Ionicons name="person-outline" size={28} color="#2895fe" />
          <Text style={styles.text}>Hesap</Text>
        </Pressable>
        <Pressable onPress={toggleSidebar} style={styles.button}>
          <Ionicons 
            name="menu-outline" 
            size={28} 
            color={isSidebarOpen ? "red" : "#2895fe"} 
          />
          <Text style={[styles.text, { color: isSidebarOpen ? "red" : "black" }]}>Diğer</Text>
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
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  button: {
    alignItems: 'center',
    padding: 10, // Dokunma alanını büyütme
  },
  text: {
    fontSize: 14,
    marginTop: 4, // İkonla metin arasındaki boşluk
    color: '#000', // Varsayılan metin rengi
  },
});

export default BottomBar;
