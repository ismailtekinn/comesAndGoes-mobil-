import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { LanguageContext } from "../contex/languageContext";
import { useTranslations } from "../hooks/useTranslation";

export interface AccountActivityCardCustomer {
  customerName: string;
  customerSurname: string;
  debtAmount: string;
  debtIssuanceDate: string;
  debtRepaymentDate: string;
  debtCurrency: string;
  type: string;
}

interface AccountActivityCardProps {
  customer: AccountActivityCardCustomer;
  islem: string;
}

const { width } = Dimensions.get("window");

const AccountActivityCard: React.FC<AccountActivityCardProps> = ({ customer, islem }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [transaction, setTransaction] = useState<string>();
  const [cardColor, setCardColor] = useState<string>();
  const t = useTranslations();

  const { activeLanguage } = useContext(LanguageContext);

  const firstLetter = customer.customerName.charAt(0).toUpperCase();

  const formattedIssuanceDate = new Date(customer.debtIssuanceDate).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    if (customer.type === "Receivable") {
      setTransaction(t.cashCard.transaction);
      setCardColor("#2895fe");
    } else {
      setTransaction(t.debtCard.transaction);
      setCardColor("#f31137");
    }
  }, []);

  return (
    <View style={styles.center}>
      <View style={styles.card}>
        <View style={styles.row}>
          {/* İlk harf dairesi */}
          <View style={styles.circle}>
            <Text style={styles.circleText}>{firstLetter}</Text>
          </View>

          {/* Müşteri Bilgileri */}
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>
              {customer.customerName} {customer.customerSurname}
            </Text>
            <Text style={styles.date}>
              {t.debtCard.receivedDate}: {formattedIssuanceDate}
            </Text>
          </View>

          {/* Borç Tutarı */}
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>
              {customer.debtAmount} {customer.debtCurrency}
            </Text>
            <Text style={[styles.transaction, { color: cardColor }]}>{transaction}</Text>
          </View>

          {/* İşlem Butonları */}
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => {}}>
              <FontAwesome name="edit" size={20} color="#007bff" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <FontAwesome name="trash" size={20} color="#dc3545" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#2895fe",
    padding: 15,
    width: width > 600 ? "60%" : "90%",
    maxWidth: 530,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  row: {
    flexDirection: "row", // Yatay hizalama
    alignItems: "center",
    justifyContent: "space-between",
  },
  circle: {
    width: 50,
    height: 50,
    backgroundColor: "#2895fe",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  circleText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  customerInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  customerName: {
    fontSize: 17,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    marginTop: 5,
    color: "#666",
  },
  amountContainer: {
    alignItems: "center",
  },
  amount: {
    color: "#2895fe",
    fontSize: 18,
    fontWeight: "bold",
  },
  transaction: {
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 10,
  },
});

export default AccountActivityCard;
