import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
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

export interface Customer {
  customerName: string;
  customerSurname: string;
  debtAmount: string;
  debtIssuanceDate: string;
  debtRepaymentDate: string;
  debtCurrency: string;
  type: string;
}
interface Customers {
  customerName: string;
  debtAmount: string;
  debtCurrency: string;
  debtIssuanceDate: string;
  debtRepaymentDate: string;
}

interface CustomerCardProps {
  customer: Customer;
  islem: string;
}
const { width } = Dimensions.get("window"); // Ekran genişliğini alıyoruz

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, islem }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [transaction, setTransaction] = useState<string>();
  const [cardColor, setCardColor] = useState<string>();
  const statusStyle = {
    color: cardColor,
    fontSize: 16,
  };
  const t = useTranslations();

  const { activeLanguage } = useContext(LanguageContext);

  const firstLetter = customer.customerName.charAt(0).toUpperCase();
  const handleEdit = () => {
    Alert.alert(
      "Edit",
      `Editing ${customer.customerName} ${customer.customerSurname}`
    );
  };
  const handleDelete = () => {
    Alert.alert(
      "Delete",
      `Deleting ${customer.customerName} ${customer.customerSurname}`
    );
  };

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

  useEffect(() => {
    if (customer.type == "Receivable") {
      setTransaction(t.cashCard.transaction);
      // setTransaction("aldım"); 
      setCardColor("#2895fe");
    } else {
      // setTransaction("verdim");
      
      setTransaction(t.debtCard.transaction);

      setCardColor("#f31137");
    }
  });
  const handleCardPress = () => {};

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
          <Text style={statusStyle}>{transaction}</Text>
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
    padding: 16,
    width: width > 600 ? "60%" : "90%", // Küçük ekranlarda %90, geniş ekranlarda %60
    maxWidth: 530,
    minHeight: 130,
    elevation: 5,
    shadowColor: "#000",
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
    color: "#2895fe",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CustomerCard;
