// import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Platform,
//   Image,
// } from "react-native";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { RootStackParamList } from "../types";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { deleteTransaction, editTransaction } from "../api/customer";
// import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";
// import { useTranslations } from "../hooks/useTranslation";
// import { LanguageContext } from "../contex/languageContext";
// import { getCurrentTimeForRegion } from "../utils/dateUtils";

// export interface TransactionFormData {
//   recordId: number;
//   debtAmount: number;
//   debtIssuanceDate: string;
//   description: string;
//   img: string;
// }

// const EditTransaction = () => {
//   const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
//   const route = useRoute();
//   const {
//     recordId,
//     debtAmount,
//     transactionType,
//     debtIssuanceDate,
//     description,
//     img,
//   } = route.params as {
//     recordId: number;
//     debtAmount: number;
//     transactionType: string;
//     debtIssuanceDate: string;
//     description: string;
//     img: string;
//   };
//   const [date, setDate] = useState(new Date());
// const [date, setDate] = useState(new Date(debtIssuanceDate ?? new Date()));
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [imageUri, setImageUri] = useState<string | null>(null);
//   const [formData, setFormData] = useState<TransactionFormData>({
//     recordId: recordId,
//     debtAmount: debtAmount,
//     debtIssuanceDate: debtIssuanceDate,
//     description: description,
//     img: img,
//   });

//   const t = useTranslations();
//   const { activeLanguage } = useContext(LanguageContext);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       // mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });
//     if (!result.canceled) {
//       const selectedImageUri = result.assets[0].uri;
//       setImageUri(selectedImageUri);
//       setFormData((prev) => ({
//         ...prev,
//         img: selectedImageUri,
//       }));
//     }
//   };

//   const handleUpdate = async () => {
//     const currentTime = getCurrentTimeForRegion();
//     const updatedFormData = {
//       ...formData,
//       debtIssuanceDate: currentTime
//   };
//     try {
//       const response = await editTransaction(updatedFormData, transactionType);
//       if (response.isSuccess) {
//         // navigation.goBack();
//         navigation.pop(2);
//       } else {
//         Alert.alert("Hata", response.message);
//         console.log("object", response.message);
//       }
//     } catch (error) {
//       Alert.alert("Hata", "Beklenmeyen bir hata oluştu.");
//       console.error(error);
//     }
//   };
//   const handleDateChange = (event: any, selectedDate?: Date) => {
//     const currentDate = selectedDate || date;
//     setShowDatePicker(false);
//     // setDate(currentDate);
//     setFormData((prev) => ({
//       ...prev,
//       debtIssuanceDate: currentDate.toISOString(),
//     }));
//   };
//   const handleDelete = async () => {
//     console.log("object", recordId);
//     try {
//       const response = await deleteTransaction(recordId);
//       if (response.isSuccess) {
//         navigation.goBack();
//       } else {
//         Alert.alert("Hata", response.message);
//       }
//     } catch (error) {
//       Alert.alert("Hata", "Beklenmeyen bir hata oluştu.");
//       console.error(error);
//     }
//   };

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: t.editTransaction.pageTitle,
//     });
//   }, [navigation, activeLanguage]);
//   useEffect(() => {
//     const getPermission = async () => {
//       const { status } =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== "granted") {
//         alert("Sorry, we need camera roll permissions to make this work!");
//       }
//     };
//     getPermission();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.phoneNumber}></Text>

//       <View style={styles.contentContainer}>
//         <TextInput
//           style={[
//             styles.amountInput,
//             { color: transactionType === "Borç" ? "red" : "green" },
//           ]}
//           placeholder="0,00"
//           placeholderTextColor="#ccc"
//           keyboardType="numeric"
//           value={formData.debtAmount.toString()}
//           onChangeText={(text) =>
//             setFormData({ ...formData, debtAmount: Number(text) })
//           }
//         />
//         <TouchableOpacity
//           style={styles.dateButton}
//           onPress={() => setShowDatePicker(true)}
//         >
//           <Ionicons name="calendar" size={20} color="black" />
//           <Text style={styles.dateText}>{formData.debtIssuanceDate}</Text>
//         </TouchableOpacity>
//         {showDatePicker && (
//           <DateTimePicker
//             value={date}
//             mode="date"
//             display={Platform.OS === "ios" ? "spinner" : "default"}
//             onChange={handleDateChange}
//           />
//         )}
//         <TextInput
//           style={[
//             styles.input,
//             // { height: Math.min(100, (formData.description.length / 40) * 100) },
//             { height: 100 },
//           ]}
//           placeholder={t.editTransaction.description}
//           value={formData.description}
//           placeholderTextColor="#A0A0A0"
//           // multiline={true} // Çok satırlı input
//           scrollEnabled={true} // Kaydırma etkin
//           onChangeText={(text) =>
//             setFormData({ ...formData, description: text })
//           }
//         />
//         <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
//           <Ionicons name="camera" size={20} color="black" />
//           <Text style={styles.imageText}>{t.editTransaction.addImage}</Text>
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity style={styles.deleteButton}>
//         <Ionicons
//           name="trash"
//           size={24}
//           color="white"
//           onPress={() =>
//             Alert.alert(
//               "Sil",
//               "Bu kaydı silmek istediğinize emin misiniz?",
//               [
//                 {
//                   text: "Hayır",
//                   onPress: () => console.log("Silme işlemi iptal edildi."),
//                   style: "cancel",
//                 },
//                 {
//                   text: "Evet",
//                   onPress: handleDelete,
//                 },
//               ],
//               { cancelable: true }
//             )
//           }
//         />
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
//         <Text style={styles.saveButtonText}>
//           {t.editTransaction.saveButton}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   phoneNumber: {
//     color: "#3498db",
//     fontSize: 18,
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   contentContainer: {
//     alignItems: "flex-start",
//     width: "100%",
//   },
//   amountInput: {
//     fontSize: 32,
//     color: "red",
//     fontWeight: "bold",
//     marginBottom: 10,
//     borderBottomWidth: 1,
//     borderColor: "#ccc",
//     paddingVertical: 5,
//   },
//   dateButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f0f0f0",
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 10,
//   },
//   dateText: {
//     marginLeft: 5,
//     fontSize: 16,
//   },
//   input: {
//     width: "100%",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 10,
//     textAlignVertical: "top",
//   },
//   imageButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f0f0f0",
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 10,
//   },
//   imageText: {
//     marginLeft: 5,
//     fontSize: 16,
//   },
//   saveButton: {
//     backgroundColor: "red",
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 10,
//     marginTop: 100,
//     width: "100%",
//     alignItems: "center",
//   },
//   saveButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   deleteButton: {
//     position: "absolute",
//     backgroundColor: "darkred",
//     padding: 5,
//     borderRadius: 10,
//     marginVertical: 20,
//     right: 5,
//     width: "15%",
//     height: 50,
//     alignItems: "center",
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   deleteButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//     marginLeft: 10,
//   },
//   imagePreviewContainer: {
//     width: "100%",
//     // alignItems: "center",
//     marginTop: 10,
//   },

//   imagePreview: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },
// });

// export default EditTransaction;
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { deleteTransaction, editTransaction } from "../api/customer";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useTranslations } from "../hooks/useTranslation";
import { LanguageContext } from "../contex/languageContext";
import { toZonedTime } from 'date-fns-tz';
import { getCurrentTimeForRegion } from "../utils/dateUtils";

export interface TransactionFormData {
  recordId: number;
  debtAmount: number;
  debtIssuanceDate: string;
  description: string;
  img: string;
}

const EditTransaction = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const {
    recordId,
    debtAmount,
    transactionType,
    debtIssuanceDate,
    description,
    img,
  } = route.params as {
    recordId: number;
    debtAmount: number;
    transactionType: string;
    debtIssuanceDate: string;
    description: string;
    img: string;
  };
  const [date, setDate] = useState(new Date(debtIssuanceDate ?? new Date()));
  console.log("object",date)
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [formData, setFormData] = useState<TransactionFormData>({
    recordId: recordId,
    debtAmount: debtAmount,
    debtIssuanceDate: debtIssuanceDate,
    description: description,
    img: img,
  });

  const t = useTranslations();
  const { activeLanguage } = useContext(LanguageContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setImageUri(selectedImageUri);
      setFormData((prev) => ({
        ...prev,
        img: selectedImageUri,
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await editTransaction(formData, transactionType);
      if (response.isSuccess) {
        // navigation.goBack();
        navigation.pop(2);
      } else {
        Alert.alert("Hata", response.message);
        console.log("object", response.message);
      }
    } catch (error) {
      Alert.alert("Hata", "Beklenmeyen bir hata oluştu.");
      console.error(error);
    }
  };
  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDate = toZonedTime(currentDate, timeZone);
    setShowDatePicker(false);
    setDate(currentDate);
    setFormData((prev) => ({
      ...prev,
      debtIssuanceDate: localDate.toISOString(),
    }));
  };
  const handleDelete = async () => {
    try {
      const response = await deleteTransaction(recordId,transactionType);
      if (response.isSuccess) {
        navigation.goBack();
      } else {
        Alert.alert("Hata", response.message);
      }
    } catch (error) {
      Alert.alert("Hata", "Beklenmeyen bir hata oluştu.");
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t.editTransaction.pageTitle,
    });
  }, [navigation, activeLanguage]);
  useEffect(() => {
    const getPermission = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    };
    getPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.phoneNumber}></Text>

      <View style={styles.contentContainer}>
        <TextInput
          style={[
            styles.amountInput,
            { color: transactionType === "Borç" ? "red" : "green" },
          ]}
          placeholder="0,00"
          placeholderTextColor="#ccc"
          keyboardType="numeric"
          value={formData.debtAmount.toString()}
          onChangeText={(text) =>
            setFormData({ ...formData, debtAmount: Number(text) })
          }
        />
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons name="calendar" size={20} color="black" />
          <Text style={styles.dateText}>{formData.debtIssuanceDate}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}
        <TextInput
          style={[
            styles.input,
            // { height: Math.min(100, (formData.description.length / 40) * 100) },
            { height: 100 },
          ]}
          placeholder={t.editTransaction.description}
          value={formData.description}
          placeholderTextColor="#A0A0A0"
          scrollEnabled={true} 
          onChangeText={(text) =>
            setFormData({ ...formData, description: text })
          }
        />
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Ionicons name="camera" size={20} color="black" />
          <Text style={styles.imageText}>{t.editTransaction.addImage}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.deleteButton}>
        <Ionicons
          name="trash"
          size={24}
          color="white"
          onPress={() =>
            Alert.alert(
              "Sil",
              "Bu kaydı silmek istediğinize emin misiniz?",
              [
                {
                  text: "Hayır",
                  onPress: () => console.log("Silme işlemi iptal edildi."),
                  style: "cancel",
                },
                {
                  text: "Evet",
                  onPress: handleDelete,
                },
              ],
              { cancelable: true }
            )
          }
        />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.saveButton,
        {backgroundColor:transactionType === 'Borç' ? 'red' : 'green'}
      ]} onPress={handleUpdate}>
        <Text style={styles.saveButtonText}>
          {t.editTransaction.saveButton}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  phoneNumber: {
    color: "#3498db",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  contentContainer: {
    alignItems: "flex-start",
    width: "100%",
  },
  amountInput: {
    fontSize: 32,
    color: "red",
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 5,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  dateText: {
    marginLeft: 5,
    fontSize: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    textAlignVertical: "top",
  },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  imageText: {
    marginLeft: 5,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginTop: 100,
    width: "100%",
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteButton: {
    position: "absolute",
    backgroundColor: "darkred",
    padding: 5,
    borderRadius: 10,
    marginVertical: 20,
    right: 5,
    width: "15%",
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  imagePreviewContainer: {
    width: "100%",
    marginTop: 10,
  },

  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default EditTransaction;
