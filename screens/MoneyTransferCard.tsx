import React, { useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { format } from "date-fns";
import { useTranslations } from "../hooks/useTranslation";
import { LanguageContext } from "../contex/languageContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

export interface Customers {
  senderName: string;
  senderSurname: string;
  receiverName: string;
  receiverSurname: string;
  receivedAmount: string;
  moneyCurrency: string;
  receivedDate: string;
  transferDate: string;
}

interface CustomerCardProps {
  customer: Customers;
  islem: string;
}

const MoneyTransferCard: React.FC<CustomerCardProps> = ({
  customer,
  islem,
}) => {
  const receivedDate = format(new Date(customer.receivedDate), "dd/MM/yyyy");
  const transferDate = format(new Date(customer.transferDate), "dd/MM/yyyy");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const t = useTranslations();
  const { activeLanguage } = useContext(LanguageContext);
  islem = t.moneyTransferCard.transaction;
  
  return (
    <View style={styles.cardContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t.moneyTransferCard.senderCustomer}</Text>
        <Text style={styles.value}>
          {customer.senderName} {customer.senderSurname}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t.moneyTransferCard.receiverCustomer}</Text>
        <Text style={styles.value}>
          {customer.receiverName} {customer.receiverSurname}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t.moneyTransferCard.receivedDate}</Text>
        <Text style={styles.value}>{receivedDate}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t.moneyTransferCard.transferDate}</Text>
        <Text style={styles.value}>{transferDate}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>
          {customer.receivedAmount} {customer.moneyCurrency}
        </Text>
        <Text style={styles.transactionType}>{islem}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity>
          <FontAwesome name="edit" size={20} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteIcon}>
          <FontAwesome name="trash" size={20} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");
const isSmallDevice = width < 350;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderColor: "#2755ad",
    borderWidth: 2,
    borderRadius: 7,
    padding: 15,
    marginVertical: 10,
    width: "100%",
  },
  infoContainer: {
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    color: "#2755ad",
    fontSize: isSmallDevice ? 14 : 16,
  },
  value: {
    fontWeight: "bold",
    color: "#000",
    fontSize: isSmallDevice ? 14 : 16,
  },
  amountContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  amount: {
    fontWeight: "bold",
    fontSize: isSmallDevice ? 16 : 18,
    color: "#2755ad",
  },
  transactionType: {
    fontSize: isSmallDevice ? 10 : 12,
    color: "#007bff",
  },
  actionsContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "column",
  },
  deleteIcon: {
    marginTop: 10,
  },
});

export default MoneyTransferCard;
