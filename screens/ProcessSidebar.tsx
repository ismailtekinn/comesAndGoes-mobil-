import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useUser } from "../contex/useContext";
import { useTranslations } from "../hooks/useTranslation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type RootStackParamList = {
  AccountInfoForm: undefined;
  Clock: undefined;
  Language: undefined;
  Help: undefined;
  AddUserCashScreen: undefined;
  MyCustomers: undefined;
  HomeCustomerListScreen: undefined;
  AccountActivity: undefined;
};
export interface ProcessSidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}
const ProcessSidebar: React.FC<ProcessSidebarProps> = ({
  isSidebarOpen,
  toggleSidebar,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { handleLogout, userData, userId } = useUser();
  const t = useTranslations();

  if (!isSidebarOpen) return null;

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
        {/* <Ionicons name="close" size={24} color="black" /> */}
        <MaterialCommunityIcons name="close-circle-outline" size={40} color="#E53935" />
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "/profilresmi.jpg" }}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("AccountInfoForm")}
        >
          {/* <Ionicons name="person-outline" size={24} /> */}
          <MaterialCommunityIcons name="account-outline" size={25} color="#2895fe"/>
          <Text style={styles.menuText}>
            {t.homePageOtherMenu.accountDetails}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Language")}
        >
          {/* <Ionicons name="language-outline" size={24} /> */}
          <MaterialCommunityIcons name="translate" size={25}  color="#2895fe"/>
          <Text style={styles.menuText}>{t.homePageOtherMenu.language}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Help")}
        >
          {/* <Ionicons name="help-circle-outline" size={24} /> */}
          <MaterialCommunityIcons name="help-circle-outline" size={25} color="#2895fe" />
          <Text style={styles.menuText}>{t.homePageOtherMenu.help}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Clock")}
        >
          <MaterialCommunityIcons name="calendar-clock" size={24} color="#2895fe" />

          <Text style={styles.menuText}>{t.homePageOtherMenu.timeAndDate}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleLogout()}
        >
          {/* <Ionicons name="log-out-outline" size={24} color="#333" /> */}
          <MaterialCommunityIcons name="logout" size={25} color="#2895fe" />
          <Text style={styles.menuText}>{t.homePageOtherMenu.logout}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "55%",
    // backgroundColor: "white",
    backgroundColor: "#F9FAFB",
    padding: 16,
    shadowColor: "#000",
    borderTopLeftRadius: 24,
borderBottomLeftRadius: 24,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 5,
  },
  closeButton: {
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  menu: {
    marginTop: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "500",
    color: "#2895fe",
  },
});

export default ProcessSidebar;
