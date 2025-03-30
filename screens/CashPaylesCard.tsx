import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslations } from "../hooks/useTranslation";
import { LanguageContext } from "../contex/languageContext";

interface Customers {
  customerName: string;
  customerSurname: string;
  debtAmount: string;
  debtCurrency: string;
  debtIssuanceDate: string;
  debtRepaymentDate: string;
}

interface CustomerCardProps {
  customer: Customers;
  islem: string;
}

const { width } = Dimensions.get("window"); // Ekran genişliğini alıyoruz

const CashPayablesCard: React.FC<CustomerCardProps> = ({ customer, islem }) => {
  const firstLetter = customer.customerName.charAt(0).toUpperCase();
  const t = useTranslations();

  const { activeLanguage } = useContext(LanguageContext);
  islem = t.cashCard.transaction;

  const formattedIssuanceDate = new Date(
    customer.debtIssuanceDate
  ).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedRepaymentDate = new Date(
    customer.debtRepaymentDate
  ).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <View style={styles.center}>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{firstLetter}</Text>
          </View>
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>
              {customer.customerName} {customer.customerSurname}
            </Text>
            <View style={styles.datesContainer}>
              <View style={styles.date}>
                <Text style={styles.label}>{t.cashCard.receivedDate}</Text>
                <Text style={styles.value}>{formattedIssuanceDate}</Text>
              </View>
              <View style={styles.date}>
                <Text style={styles.label}>{t.cashCard.transferDate}</Text>
                <Text style={styles.value}>{formattedRepaymentDate}</Text>
              </View>
            </View>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => {
                /* Düzenleme işlemi */
              }}
            >
              <FontAwesome name="edit" size={20} color="#007bff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                /* Silme işlemi */
              }}
              style={styles.deleteIcon}
            >
              <FontAwesome name="trash" size={20} color="#dc3545" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>
            {customer.debtAmount} {customer.debtCurrency}
          </Text>
          <Text style={styles.status}>{islem}</Text>
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
    borderWidth: 3,
    borderColor: "#10853e",
    padding: 16,
    width: "90%",
    maxWidth: 630,
  },
  row: {
    flexDirection: width > 400 ? "row" : "column", // Küçük ekranlarda alt alta gelsin

    justifyContent: "space-between",
    alignItems: "center",
  },
  circle: {
    width: 50,
    height: 50,
    backgroundColor: "#10853e",
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
  datesContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  date: {
    marginRight: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
  },
  actions: {
    flexDirection: width > 400 ? "row" : "column", // Küçük ekranlarda düğmeler alt alta gelsin
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
  },
  deleteIcon: {
    marginTop: 10,
  },
  amountContainer: {
    alignItems: "flex-end",
    marginTop: 10,
  },
  amount: {
    color: "#10853e",
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    color: "#d5cbcc",
    fontSize: 18,
  },
});

export default CashPayablesCard;
