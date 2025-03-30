// import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   ScrollView,
//   StyleSheet,
//   Button,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { useFocusEffect, useNavigation } from "@react-navigation/native";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { RootStackParamList } from "../types";
// import BottomBar from "./BottomBar";
// import { useUser } from "../contex/useContext";
// import { useTranslations } from "../hooks/useTranslation";
// import { LanguageContext } from "../contex/languageContext";
// import { Customer, Debt } from "../types/customerType";
// import { addDebt, getCustomerList, homeCustomerList } from "../api/customer";
// import { AddDebtFormData, FormData } from "../hooks/useCustomerForm";
// import { useCustomers } from "../contex/customerContext";

// const AddDebt = () => {
//   const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
//   const { activeLanguage } = useContext(LanguageContext);
//   const [paraBirimi, setParaBirimi] = useState("TL");
//   const { userId } = useUser();
//   const userIdNumber = userId ? Number(userId) : 0;
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
//     null
//   );
//   const [customerss, setCustomerss] = useCustomers();

//   const t = useTranslations();
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     surname: "",
//     phone: "",
//     cashAmount: 0,
//     debtDate: "2025-07-17",
//     repaymentDate: "2025-08-17",
//     debtCurrency: "TL",
//   });
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await getCustomerList(userIdNumber);
//         console.log("borç verme ekranında ki müşteriler console yazdırılıyor: ", data)
//         setCustomers(data.data);
//       } catch (error) {
//         console.error("Müşteriler alınamadı", error);
//       }
//     }
//     fetchData();
//   }, [userId]);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: t.addDebtPage.pageTitle,
//     });
//   }, [navigation, activeLanguage]);

//   const handleSubmit = async () => {
//     const debtData: Debt = {
//       creditorId: userIdNumber,
//       debtAmount: formData.cashAmount,
//       debtorId: selectedCustomer ? selectedCustomer.id : 0,
//       debtCurrency: formData.debtCurrency,
//       debtIssuanceDate: new Date(formData.debtDate),
//       debtRepaymentDate: new Date(formData.repaymentDate),
//     };
//     try {
//       const response = await addDebt(debtData);
//       if (response.isSuccess) {
//         Alert.alert(
//           "Başarılı",
//           "Borç verme işlemi başarıyla gerçekleştirildi",
//           [
//             {
//               text: "Tamam",
//               onPress: async () => {
//                 const customerData = await homeCustomerList(userIdNumber);
//                 setCustomerss(customerData.data);
//                 navigation.navigate("HomeCustomerListScreen");}
//             },
//           ]
//         );
//       } else {
//         Alert.alert("Hata", response.message);
//       }
//     } catch (error: any) {
//       const errorMessage = error?.message || "Beklenmeyen bir hata oluştu";
//       Alert.alert("Hata", errorMessage);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <View style={styles.card}>
//           <View style={styles.formGroup}>
//             <Text style={styles.label}>{t.addDebtPage.selectCustomer}</Text>
//             <Picker
//               selectedValue={
//                 selectedCustomer ? selectedCustomer.id.toString() : ""
//               }
//               onValueChange={(itemValue) => {
//                 const customer = customers.find(
//                   (cust) => cust.id.toString() === itemValue
//                 );
//                 setSelectedCustomer(customer || null);
//               }}
//             >
//               <Picker.Item label={t.cashReceivablePage.select} value="" />
//               {customers.map((customer) => (
//                 <Picker.Item
//                   key={customer.id}
//                   label={`${customer.clientName} ${customer.clientSurname}`}
//                   value={customer.id.toString()}
//                 />
//               ))}
//             </Picker>
//           </View>

//           <View style={styles.formGroup}>
//             <TextInput
//               style={styles.input}
//               placeholder={t.addDebtPage.customerPhone}
//               value={selectedCustomer ? selectedCustomer.clientPhone : ""}
//             />
//           </View>
//           <View style={styles.formRow}>
//             <TextInput
//               style={styles.input}
//               placeholder={t.addDebtPage.cashAmount}
//               value={formData.cashAmount ? formData.cashAmount.toString() : ""}
//               onChangeText={(value) =>
//                 setFormData({
//                   ...formData,
//                   cashAmount: parseFloat(value),
//                 })
//               }
//               keyboardType="numeric"
//             />
//             <Picker
//               style={styles.picker}
//               selectedValue={paraBirimi}
//               onValueChange={(itemValue) => {
//                 setParaBirimi(itemValue);
//                 setFormData({ ...formData, debtCurrency: itemValue });
//               }}
//             >
//               <Picker.Item label={t.addDebtPage.tl} value={t.addDebtPage.tl} />
//               <Picker.Item
//                 label={t.addDebtPage.usd}
//                 value={t.addDebtPage.usd}
//               />
//               <Picker.Item
//                 label={t.addDebtPage.euro}
//                 value={t.addDebtPage.euro}
//               />
//               <Picker.Item
//                 label={t.addDebtPage.toman}
//                 value={t.addDebtPage.toman}
//               />
//               <Picker.Item
//                 label={t.addDebtPage.afghani}
//                 value={t.addDebtPage.afghani}
//               />
//             </Picker>
//           </View>

//           <View style={styles.formGroup}>
//             <Text style={styles.label}>{t.addDebtPage.debtLendingDate}</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="YYYY-MM-DD"
//               value={formData.debtDate}
//               onChangeText={(value) =>
//                 setFormData({ ...formData, debtDate: value })
//               }
//             />
//           </View>
//           <View style={styles.formGroup}>
//             <Text style={styles.label}>{t.addDebtPage.debtRepaymentDate}</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="YYYY-MM-DD"
//               value={formData.repaymentDate}
//               onChangeText={(value) =>
//                 setFormData({ ...formData, repaymentDate: value })
//               }
//             />
//           </View>
//           <View style={styles.buttonContainer}>
//             <Button
//               title={t.addDebtPage.lend}
//               color="#f31137"
//               onPress={handleSubmit}
//             />
//           </View>
//         </View>
//       </ScrollView>
//       <BottomBar />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f6f6f6",
//     marginTop: 50,
//   },
//   scrollContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 80,
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   formGroup: {
//     marginBottom: 15,
//   },
//   formRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   label: {
//     marginBottom: 5,
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 10,
//     fontSize: 16,
//     backgroundColor: "#fff",
//     marginRight: 10,
//   },
//   picker: {
//     flex: 1,
//   },
//   buttonContainer: {
//     marginTop: 20,
//     alignItems: "center",
//   },
// });

// export default AddDebt;
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import BottomBar from "./BottomBar";
import { useUser } from "../contex/useContext";
import { useTranslations } from "../hooks/useTranslation";
import { LanguageContext } from "../contex/languageContext";
import { Customer, Debt, NewDebt } from "../types/customerType";
import { addDebt, getCustomerList, homeCustomerList } from "../api/customer";
import { AddDebtFormData, FormData } from "../hooks/useCustomerForm";
import { useCustomers } from "../contex/customerContext";

const AddDebt = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { customerId } = route.params as { customerId: number };
  const { activeLanguage } = useContext(LanguageContext);
  const [paraBirimi, setParaBirimi] = useState("TL");
  const { userId } = useUser();
  const userIdNumber = userId ? Number(userId) : 0;
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [customerss, setCustomerss] = useCustomers();

  const t = useTranslations();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    phone: "",
    cashAmount: 0,
    debtDate: "2025-07-17",
    repaymentDate: "2025-08-17",
    debtCurrency: "TL",
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCustomerList(userIdNumber);
        console.log(
          "borç verme ekranında ki müşteriler console yazdırılıyor: ",
          data
        );
        setCustomers(data.data);
      } catch (error) {
        console.error("Müşteriler alınamadı", error);
      }
    }
    fetchData();
  }, [userId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t.addDebtPage.pageTitle,
    });
  }, [navigation, activeLanguage]);

  const handleSubmit = async () => {
    const debtData: NewDebt = {
      debtAmount: formData.cashAmount,
      debtCurrency: formData.debtCurrency,
      debtorId: customerId ? customerId : 0,
      creditorId: userIdNumber,
    };
    try {
      const response = await addDebt(debtData);
      if (response.isSuccess) {
        Alert.alert(
          "Başarılı",
          "Borç verme işlemi başarıyla gerçekleştirildi",
          [
            {
              text: "Tamam",
              onPress: async () => {
                const customerData = await getCustomerList(userIdNumber);
                setCustomerss(customerData.data);

                navigation.navigate("HomeCustomerListScreen");
              },
            },
          ]
        );
      } else {
        Alert.alert("Hata", response.message);
      }
    } catch (error: any) {
      const errorMessage = error?.message || "Beklenmeyen bir hata oluştu";
      Alert.alert("Hata", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.formRow}>
            <TextInput
              style={styles.input}
              placeholder={t.addDebtPage.cashAmount}
              value={formData.cashAmount ? formData.cashAmount.toString() : ""}
              onChangeText={(value) =>
                setFormData({
                  ...formData,
                  cashAmount: parseFloat(value),
                })
              }
              keyboardType="numeric"
            />
            <Picker
              style={styles.picker}
              selectedValue={paraBirimi}
              onValueChange={(itemValue) => {
                setParaBirimi(itemValue);
                setFormData({ ...formData, debtCurrency: itemValue });
              }}
            >
              <Picker.Item label={t.addDebtPage.tl} value={t.addDebtPage.tl} />
              <Picker.Item
                label={t.addDebtPage.usd}
                value={t.addDebtPage.usd}
              />
              <Picker.Item
                label={t.addDebtPage.euro}
                value={t.addDebtPage.euro}
              />
              <Picker.Item
                label={t.addDebtPage.toman}
                value={t.addDebtPage.toman}
              />
              <Picker.Item
                label={t.addDebtPage.afghani}
                value={t.addDebtPage.afghani}
              />
            </Picker>
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{t.addDebtPage.lend}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8", // Daha yumuşak ve modern bir arka plan rengi
    marginTop: 40, // Üst boşluk biraz azaltıldı
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // BottomBar ile çakışmayı önlemek için artırıldı
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 15, // Daha yuvarlak köşeler
    height: 300,
    padding: 35, // İç boşluk artırıldı
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, // Daha yumuşak gölge
    shadowRadius: 8,
    elevation: 6, // Android için biraz daha belirgin gölge
  },
  title: {
    fontSize: 24,
    fontWeight: "700", // Daha kalın ve modern bir font
    textAlign: "center",
    color: "#333", // Daha koyu ve okunaklı renk
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20, // Form elemanları arasında daha fazla boşluk
  },
  formRow: {
    flexDirection: "row",
    backgroundColor: "#fafafa", // Hafif gri arka plan
    borderRadius: 10,
    padding: 5, // İç boşluk eklenerek daha düzenli görünüyor
    borderWidth: 1,
    borderColor: "#e0e0e0", // İnce ve zarif bir çerçeve
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "600",
    color: "#333", // Daha koyu ve net bir renk
  },
  input: {
    flex: 1,
    borderWidth: 0, // Çerçeveyi formRow'a taşıdık
    borderRadius: 8,
    padding: 12, // Daha rahat bir yazma alanı
    fontSize: 16,
    backgroundColor: "#fff",
    marginRight: 10,
    color: "#333", // Yazı rengi koyulaştırıldı
  },
  picker: {
    flex: 1,
    backgroundColor: "#fff", // Daha temiz bir görünüm
    borderRadius: 8,
    color: "#555", // Hafif gri tonlu metin
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#f31137", // Daha canlı ve dikkat çekici bir kırmızı ton
    paddingVertical: 15,
    borderRadius: 12, // Daha yuvarlak köşeler
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100, // Konum korunuyor
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700", // Daha belirgin yazı
    textTransform: "uppercase",
    letterSpacing: 1, // Harfler arası hafif boşluk eklenerek şıklık artırıldı
  },
});

export default AddDebt;
