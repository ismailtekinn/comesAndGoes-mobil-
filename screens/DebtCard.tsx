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

const { width } = Dimensions.get("window"); 

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

const DebtCard: React.FC<CustomerCardProps> = ({ customer, islem }) => {
  const firstLetter = customer.customerName.charAt(0).toUpperCase();
  const t = useTranslations();

  const { activeLanguage } = useContext(LanguageContext);
  islem = t.debtCard.transaction;


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
                <Text style={styles.label}>{t.debtCard.receivedDate}</Text>
                <Text style={styles.value}>{formattedIssuanceDate}</Text>
              </View>
              <View style={styles.date}>
                <Text style={styles.label}>{t.debtCard.transferDate}</Text>
                <Text style={styles.value}>{formattedRepaymentDate}</Text>
              </View>
            </View>
          </View>

          {/* Butonlar - Küçük ekranlarda alt alta gelmesi için flex yönü değiştirildi */}
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
    borderWidth: 2,
    borderColor: "#f31137",
    padding: 16,
    width: width > 600 ? "60%" : "90%", // Küçük ekranlarda %90, geniş ekranlarda %60
    maxWidth: 530,
    minHeight: 130, // Sabit yükseklik yerine min yükseklik
    elevation: 5, // Android gölge efekti
    shadowColor: "#000", // iOS gölge efekti
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  row: {
    flexDirection: width > 400 ? "row" : "column", // Küçük ekranlarda alt alta gelsin
    alignItems: "center",
    justifyContent: "space-between",
  },
  circle: {
    width: 50,
    height: 50,
    backgroundColor: "#f31137",
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
    marginTop: 12,
    flexWrap: "wrap", // Küçük ekranlarda alt alta gelmesi için
  },
  date: {
    marginRight: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  value: {
    fontSize: 14,
    marginTop: 5,
  },
  actions: {
    flexDirection: width > 400 ? "row" : "column", // Küçük ekranlarda düğmeler alt alta gelsin
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
  },
  iconEdit: {
    fontSize: 20,
    color: "#007bff",
    marginHorizontal: 5, // İkonlar arasında boşluk bırak
  },
  iconDelete: {
    fontSize: 20,
    color: "#dc3545",
    marginHorizontal: 5,
  },
  amountContainer: {
    alignItems: "center", // Küçük ekranlarda ortalanması için
    marginTop: width > 400 ? 0 : 10, // Küçük ekranlarda araya boşluk ekle
  },
  amount: {
    color: "#f31137",
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    color: "#7e7e7e",
    fontSize: 16,
  },
});

export default DebtCard;
