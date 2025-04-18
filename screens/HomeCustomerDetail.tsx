// import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import BottomBar from "./BottomBar";
// import { useRoute } from "@react-navigation/native";
// import { CardStyleInterpolators } from "@react-navigation/stack";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { RootStackParamList } from "../types";
// import { useNavigation } from "@react-navigation/native";
// import { Picker } from "@react-native-picker/picker";
// import { useIsFocused } from "@react-navigation/native";
// import {
//   compareDebtAndCashReceivable,
//   getCustomerCashDebtList,
// } from "../api/customer";
// import { useUser } from "../contex/useContext";
// import { CashDifferenceType, Customer } from "../interface/IHomeCustomer";
// import { useTranslations } from "../hooks/useTranslation";
// import { LanguageContext } from "../contex/languageContext";
// import { useClock } from "../contex/clockContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const HomeCustomerDetail = () => {
//   const { userId } = useUser();
//   const userIdNumber = userId ? Number(userId) : 0;
//   const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
//   const t = useTranslations();
//   const { activeLanguage } = useContext(LanguageContext);
//   const route = useRoute();
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const isFocused = useIsFocused();
//   const [paraBirimi, setParaBirimi] = useState<string>("TL");
//   const { format,setFormat } = useClock();
//   const [cashDifference, setCashdifference] = useState<CashDifferenceType[]>(
//     []
//   );
//   const { customerId, customerName } = route.params as {
//     customerId: number;
//     customerName: string;
//   };
//   const [expandedId, setExpandedId] = useState<number | null>(null);
//   const toggleDescription = (recordId: number) => {
//     setExpandedId((prevId) => (prevId === recordId ? null : recordId));
//   };

//   const filteredCustomers = customers.filter(
//     (customer) =>
//       customer.debtCurrency.toLowerCase() === paraBirimi.toLowerCase()
//   );
//   const filteredCash = cashDifference.filter(
//     (item) => item.currency.toLowerCase() === paraBirimi.toLowerCase()
//   );
//   const fetchCustomer = async () => {
//     try {
//       const customerData = await getCustomerCashDebtList({
//         customerId: customerId,
//         userId: userIdNumber,
//       });
//       setCustomers(customerData.data);
//     } catch (error) {
//       console.error("Müşteriler yüklenirken hata oluştu:", error);
//     }
//   };
//   const fetchcompareDebtAndCashReceivable = async () => {
//     try {
//       const result = await compareDebtAndCashReceivable({
//         customerId: customerId,
//         userId: userIdNumber,
//       });
//       setCashdifference(result.data);
//     } catch (error) {
//       console.error("Hata :", error);
//     }
//   };

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: t.homeCustomerDetail.pageTitle,
//     });
//   }, [navigation, activeLanguage]);

//   useEffect(() => {
//     if (isFocused) {
//       fetchCustomer();
//       fetchcompareDebtAndCashReceivable();
//     }
//   }, [isFocused]);

//   useEffect(() => {
//     const loadFormat = async () => {
//       try {
//         const savedFormat = await AsyncStorage.getItem('@clock_format');
//         if (savedFormat === '12' || savedFormat === '24') {
//           setFormat(savedFormat as '12' | '24');
//         }
//       } catch (error) {
//         console.error('AsyncStorage verisi yüklenemedi:', error);
//       }
//     };

//     loadFormat();
//   }, [format]);

//   console.log("saat formatı console yazdırılıyor : ", format)
//   // useEffect(() => {
//   //   fetchCustomer();
//   //   fetchcompareDebtAndCashReceivable();
//   // }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity>
//           {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
//         </TouchableOpacity>
//         <Text style={styles.headerText}>{customerName}</Text>
//         <Ionicons
//           name="person-outline"
//           size={24}
//           color="black"
//           style={styles.personIcon}
//         />
//       </View>
//       <View style={styles.balanceContainer}>
//         <View>
//           <Text style={styles.balanceTitle}>{t.homeCustomerDetail.generalBalance}</Text>
//           <Text style={styles.balanceSubtitle}>
//             {filteredCash.length > 0
//               ? filteredCash[0].type === "debt"
//                 ? "Verdim"
//                 : "Aldım"
//               : ""}
//           </Text>

//           <Text
//             style={[
//               styles.balanceValue,
//               {
//                 color:
//                   filteredCash.length > 0 && filteredCash[0].type === "debt"
//                     ? "red"
//                     : "green",
//               },
//             ]}
//           >
//             {filteredCash.length > 0
//               ? `${filteredCash[0].balance} ${filteredCash[0].currency}`
//               : "0.0"}
//           </Text>
//         </View>
//         <View style={styles.currencyPickerContainer}>
//           <Picker
//             style={styles.picker}
//             selectedValue={paraBirimi}
//             onValueChange={(itemValue) => setParaBirimi(itemValue)}
//           >
//             <Picker.Item label={t.homeCustomerDetail.tl} value="TL" />
//             <Picker.Item label={t.homeCustomerDetail.usd} value="Dolar" />
//             <Picker.Item label={t.homeCustomerDetail.euro} value="Euro" />
//             <Picker.Item label={t.homeCustomerDetail.toman} value="Toman" />
//             <Picker.Item label={t.homeCustomerDetail.afghani} value="Afghani" />
//           </Picker>
//         </View>
//       </View>

//       <Text style={styles.operationsTitle}>{t.homeCustomerDetail.operations}</Text>
//       <ScrollView style={styles.operationsList}>
//         {filteredCustomers.map((customer: Customer, index) => {
//           const isExpanded = expandedId === customer.recordId;
//           const shortDescription =
//             customer.description && customer.description.length > 60
//               ? customer.description.slice(0, 60) + "..."
//               : customer.description;

//           return (
//             <TouchableOpacity
//               key={index}
//               onPress={() =>
//                 navigation.navigate("EditTransaction", {
//                   recordId: customer.recordId,
//                   debtAmount: customer.debtAmount,
//                   transactionType: customer.type,
//                   debtIssuanceDate: customer.debtIssuanceDate,
//                   description: customer.description,
//                   img: customer.img,
//                 })
//               }
//             >
//               <View style={styles.operationItem}>
//                 <Ionicons
//                   name={customer.type === "Borç" ? "arrow-up" : "arrow-down"}
//                   size={24}
//                   color={customer.type === "Alacak" ? "green" : "red"}
//                 />
//                 <View style={styles.operationInfo}>
//                   <Text style={styles.operationDate}>
//                     {new Date(customer.debtIssuanceDate).toLocaleString(
//                       "tr-TR",
//                       {
//                         day: "2-digit",
//                         month: "2-digit",
//                         year: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       }
//                     )}
//                   </Text>

//                   {/* Açıklama kısmı */}
//                   {customer.description ? (
//                     <TouchableOpacity
//                       style={styles.descriptionContent}
//                       onPress={() => toggleDescription(customer.recordId)}
//                     >
//                       <Text style={styles.descriptionText}>
//                         {isExpanded ? customer.description : shortDescription}
//                         {customer.description.length > 60 && (
//                           <Text
//                             style={{
//                               fontWeight: "bold",
//                               color: "black",
//                               fontSize: 13,
//                             }}
//                           >
//                             {" "}
//                             {isExpanded ? "Daha az" : "Devamını gör"}
//                           </Text>
//                         )}
//                       </Text>
//                     </TouchableOpacity>
//                   ) : null}
//                 </View>

//                 <Text
//                   style={[
//                     styles.operationAmount,
//                     { color: customer.type === "Alacak" ? "green" : "red" },
//                   ]}
//                 >
//                   {customer.debtAmount} {customer.debtCurrency}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           );
//         })}
//       </ScrollView>

//       <View style={styles.bottomButtons}>
//         <TouchableOpacity
//           style={styles.aldimButton}
//           onPress={() => navigation.navigate("CashReceivable", { customerId })}
//         >
//           <Text style={styles.aldimText}>{t.homeCustomerDetail.cashButton}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.verdimButton}
//           onPress={() => navigation.navigate("AddDebt", { customerId })}
//         >
//           <Text style={styles.verdimText}>{t.homeCustomerDetail.debtButton}</Text>
//         </TouchableOpacity>
//       </View>
//       <BottomBar />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     padding: 20,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginLeft: 15,
//   },
//   personIcon: {
//     marginLeft: "auto",
//   },
//   balanceTitle: {
//     color: "#007AFF",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   balanceValue: {
//     // color: "green",
//     fontSize: 24,
//   },
//   balanceContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   balanceSubtitle: {
//     fontSize: 14,
//     color: "gray",
//   },
//   currencyPickerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     backgroundColor: "#007AFF",
//     borderRadius: 9,
//   },
//   picker: {
//     height: 50,
//     width: 120,
//     borderWidth: 2,
//     borderColor: "#007AFF",
//     color: "white", // Metin rengini beyaz yaptık
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 10, // Padding ekleyerek ortalamayı sağladık
//   },
//   operationsTitle: {
//     marginTop: 15,
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#007AFF",
//   },
//   operationsList: {
//     marginVertical: 10,
//   },
//   operationItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E0E0E0",
//   },
//   operationInfo: {
//     marginLeft: 10,
//   },
//   operationDate: {
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   operationBalance: {
//     fontSize: 12,
//     color: "gray",
//   },
//   operationAmount: {
//     marginLeft: "auto",
//     fontSize: 16,
//   },
//   bottomButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//     marginBottom: 60, // BottomBar ile üst üste gelmesini önlemek için
//     zIndex: 5, // BottomBar'ın üstünde olması için
//   },
//   aldimButton: {
//     backgroundColor: "#caedcd",
//     padding: 15,
//     borderRadius: 5,
//     flex: 1,
//     alignItems: "center",
//     marginRight: 5,
//   },
//   verdimButton: {
//     backgroundColor: "#f6e6e7",
//     padding: 15,
//     borderRadius: 5,
//     flex: 1,
//     alignItems: "center",
//     marginLeft: 5,
//   },
//   aldimText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "green",
//   },
//   verdimText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "red",
//   },
//   descriptionText: {
//     marginTop: 4,
//     fontSize: 12,
//     color: "#333",
//   },
//   descriptionContent: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     maxWidth: 200,
//     marginTop: 5,
//   },
// });

// export default HomeCustomerDetail;


import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomBar from "./BottomBar";
import { useRoute } from "@react-navigation/native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment-hijri";

import {
  compareDebtAndCashReceivable,
  getCustomerCashDebtList,
} from "../api/customer";
import { useUser } from "../contex/useContext";
import { CashDifferenceType, Customer } from "../interface/IHomeCustomer";
import { useTranslations } from "../hooks/useTranslation";
import { LanguageContext } from "../contex/languageContext";
import { useClock } from "../contex/clockContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeCustomerDetail = () => {
  const { userId } = useUser();
  const userIdNumber = userId ? Number(userId) : 0;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const t = useTranslations();
  const { activeLanguage } = useContext(LanguageContext);
  const route = useRoute();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const isFocused = useIsFocused();
  const [paraBirimi, setParaBirimi] = useState<string>("TL");
  const { format, setFormat } = useClock();
  const is12HourFormat = format === "12";
  const locale = is12HourFormat ? "en-US" : "tr-TR";

  const [cashDifference, setCashdifference] = useState<CashDifferenceType[]>(
    []
  );
  const { customerId, customerName } = route.params as {
    customerId: number;
    customerName: string;
  };
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const toggleDescription = (recordId: number) => {
    setExpandedId((prevId) => (prevId === recordId ? null : recordId));
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.debtCurrency.toLowerCase() === paraBirimi.toLowerCase()
  );
  const filteredCash = cashDifference.filter(
    (item) => item.currency.toLowerCase() === paraBirimi.toLowerCase()
  );
  const fetchCustomer = async () => {
    try {
      const customerData = await getCustomerCashDebtList({
        customerId: customerId,
        userId: userIdNumber,
      });
      setCustomers(customerData.data);
    } catch (error) {
      console.error("Müşteriler yüklenirken hata oluştu:", error);
    }
  };
  const fetchcompareDebtAndCashReceivable = async () => {
    try {
      const result = await compareDebtAndCashReceivable({
        customerId: customerId,
        userId: userIdNumber,
      });
      setCashdifference(result.data);
    } catch (error) {
      console.error("Hata :", error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t.homeCustomerDetail.pageTitle,
    });
  }, [navigation, activeLanguage]);

  useEffect(() => {
    if (isFocused) {
      fetchCustomer();
      fetchcompareDebtAndCashReceivable();
    }
  }, [isFocused]);

  useEffect(() => {
    const loadFormat = async () => {
      try {
        const savedFormat = await AsyncStorage.getItem("@clock_format");
        if (savedFormat === "12" || savedFormat === "24") {
          setFormat(savedFormat as "12" | "24");
        }
      } catch (error) {
        console.error("AsyncStorage verisi yüklenemedi:", error);
      }
    };

    loadFormat();
  }, [format]);

  console.log("saat formatı console yazdırılıyor : ", format);
  // useEffect(() => {
  //   fetchCustomer();
  //   fetchcompareDebtAndCashReceivable();
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
        </TouchableOpacity>
        <Text style={styles.headerText}>{customerName}</Text>
        <Ionicons
          name="person-outline"
          size={24}
          color="black"
          style={styles.personIcon}
        />
      </View>
      <View style={styles.balanceContainer}>
        <View>
          <Text style={styles.balanceTitle}>
            {t.homeCustomerDetail.generalBalance}
          </Text>
          <Text style={styles.balanceSubtitle}>
            {filteredCash.length > 0
              ? filteredCash[0].type === "debt"
                ? "Verdim"
                : "Aldım"
              : ""}
          </Text>

          <Text
            style={[
              styles.balanceValue,
              {
                color:
                  filteredCash.length > 0 && filteredCash[0].type === "debt"
                    ? "red"
                    : "green",
              },
            ]}
          >
            {filteredCash.length > 0
              ? `${filteredCash[0].balance} ${filteredCash[0].currency}`
              : "0.0"}
          </Text>
        </View>
        <View style={styles.currencyPickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={paraBirimi}
            onValueChange={(itemValue) => setParaBirimi(itemValue)}
          >
            <Picker.Item label={t.homeCustomerDetail.tl} value="TL" />
            <Picker.Item label={t.homeCustomerDetail.usd} value="Dolar" />
            <Picker.Item label={t.homeCustomerDetail.euro} value="Euro" />
            <Picker.Item label={t.homeCustomerDetail.toman} value="Toman" />
            <Picker.Item label={t.homeCustomerDetail.afghani} value="Afghani" />
          </Picker>
        </View>
      </View>
      <Text style={styles.operationsTitle}>
        {t.homeCustomerDetail.operations}
      </Text>
       <ScrollView style={styles.operationsList}>
         {filteredCustomers.map((customer: Customer, index) => {
          const isExpanded = expandedId === customer.recordId;
          const shortDescription =
            customer.description && customer.description.length > 60
              ? customer.description.slice(0, 60) + "..."
              : customer.description;

          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("EditTransaction", {
                  recordId: customer.recordId,
                  debtAmount: customer.debtAmount,
                  transactionType: customer.type,
                  debtIssuanceDate: customer.debtIssuanceDate,
                  description: customer.description,
                  img: customer.img,
                })
              }
            >
              <View style={styles.operationItem}>
                <Ionicons
                  name={customer.type === "Borç" ? "arrow-up" : "arrow-down"}
                  size={24}
                  color={customer.type === "Alacak" ? "green" : "red"}
                />
                <View style={styles.operationInfo}>
                  <Text style={styles.operationDate}>
                    {new Date(customer.debtIssuanceDate).toLocaleString(
                      locale,
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12:is12HourFormat,
                        timeZone:'UTC'
                      }
                    )}
                  </Text>

                  {/* Açıklama kısmı */}
                  {customer.description ? (
                    <TouchableOpacity
                      style={styles.descriptionContent}
                      onPress={() => toggleDescription(customer.recordId)}
                    >
                      <Text style={styles.descriptionText}>
                        {isExpanded ? customer.description : shortDescription}
                        {customer.description.length > 60 && (
                          <Text
                            style={{
                              fontWeight: "bold",
                              color: "black",
                              fontSize: 13,
                            }}
                          >
                            {" "}
                            {isExpanded ? "Daha az" : "Devamını gör"}
                          </Text>
                        )}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>

                <Text
                  style={[
                    styles.operationAmount,
                    { color: customer.type === "Alacak" ? "green" : "red" },
                  ]}
                >
                  {customer.debtAmount} {customer.debtCurrency}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.aldimButton}
          onPress={() => navigation.navigate("CashReceivable", { customerId })}
        >
          <Text style={styles.aldimText}>
            {t.homeCustomerDetail.cashButton}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.verdimButton}
          onPress={() => navigation.navigate("AddDebt", { customerId })}
        >
          <Text style={styles.verdimText}>
            {t.homeCustomerDetail.debtButton}
          </Text>
        </TouchableOpacity>
      </View>
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
  },
  personIcon: {
    marginLeft: "auto",
  },
  balanceTitle: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  balanceValue: {
    // color: "green",
    fontSize: 24,
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  balanceSubtitle: {
    fontSize: 14,
    color: "gray",
  },
  currencyPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#007AFF",
    borderRadius: 9,
  },
  picker: {
    height: 50,
    width: 120,
    borderWidth: 2,
    borderColor: "#007AFF",
    color: "white", // Metin rengini beyaz yaptık
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10, // Padding ekleyerek ortalamayı sağladık
  },
  operationsTitle: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  operationsList: {
    marginVertical: 10,
  },
  operationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  operationInfo: {
    marginLeft: 10,
  },
  operationDate: {
    fontSize: 14,
    fontWeight: "bold",
  },
  operationBalance: {
    fontSize: 12,
    color: "gray",
  },
  operationAmount: {
    marginLeft: "auto",
    fontSize: 16,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 60, // BottomBar ile üst üste gelmesini önlemek için
    zIndex: 5, // BottomBar'ın üstünde olması için
  },
  aldimButton: {
    backgroundColor: "#caedcd",
    padding: 15,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  verdimButton: {
    backgroundColor: "#f6e6e7",
    padding: 15,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  aldimText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  verdimText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  descriptionText: {
    marginTop: 4,
    fontSize: 12,
    color: "#333",
  },
  descriptionContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    maxWidth: 200,
    marginTop: 5,
  },
});

export default HomeCustomerDetail;
