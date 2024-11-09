import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useNavigation } from "@react-navigation/native";

export interface Customer {
  firstName: string;
  lastName: string;
  nakit: string;
  islem: string;
  vt: string;
  at: string;
}

interface CustomerCardProps {
  customer: Customer;
  islem: string;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer,islem }) => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  if (customer.islem !== "verdim") {
    return null;
  }

  const firstLetter = customer.firstName.charAt(0).toUpperCase();

  const handleEdit = () => {
    Alert.alert("Edit", `Editing ${customer.firstName} ${customer.lastName}`);
  };

  const handleDelete = () => {
    Alert.alert("Delete", `Deleting ${customer.firstName} ${customer.lastName}`);
  };

  const handleCardPress = () => {
    navigation.navigate("DebtDetail", { customer });
  };

  return (
    <TouchableOpacity onPress={handleCardPress} style={styles.card}>
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>{firstLetter}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {customer.firstName} {customer.lastName}
        </Text>
        <View style={styles.detailContainer}>
          <View style={styles.detail}>
            <Text style={styles.label}>V.T:</Text>
            <Text>{customer.vt}</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.label}>A.T:</Text>
            <Text>{customer.at}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.nakit}>{customer.nakit}</Text>
        <Text style={styles.islem}>{customer.islem}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 7,
    borderWidth: 3,
    borderColor: "#2895fe",
    maxWidth: 530,
    width: "100%",
    height: 120,
    padding: 16,
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#2895fe",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  iconText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    textAlign: "center",
    fontWeight: "bold",
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  
  },
  detail: {
    marginRight: 32,
    flexDirection: "row",
    bottom:-20,
    // paddingHorizontal: 50,
  },
  label: {
    fontSize: 16,
    marginRight: 5,
  },
  actions: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginLeft: "auto",
  },
  editText: {
    color: "#007bff",
    fontSize: 20,
    marginRight: 8,
  },
  deleteText: {
    color: "#dc3545",
    fontSize: 20,
  },
  footer: {
    alignItems: "flex-end",
  },
  nakit: {
    color: "#f31137",
    fontSize: 18,
    fontWeight: "bold",
  },
  islem: {
    color: "#d5cbcc",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CustomerCard;
