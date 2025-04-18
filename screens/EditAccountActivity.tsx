import React, { useContext, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { deleteUserCash, updateUserCash } from "../api/customer";
import { useTranslations } from "../hooks/useTranslation";
import { LanguageContext } from "../contex/languageContext";

export interface EditAccountActivityFormData {
  id: number;
  totalCash: number;
  description: string;
}
const EditAccountActivity = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const t = useTranslations();
  const { activeLanguage } = useContext(LanguageContext);
  const route = useRoute();
  const { id, description, totalCash, transactionType } = route.params as {
    id: number;
    description: string;
    totalCash: number;
    transactionType: string;
  };
  const [formData, setFormData] = useState<EditAccountActivityFormData>({
    id: id,
    description: description,
    totalCash: totalCash,
  });

  const handleUpdate = async () => {
    try {
      const response = await updateUserCash(formData);
      if (response.isSuccess) {
        navigation.goBack();
        // navigation.pop(2);
      } else {
        Alert.alert("Hata", response.message);
        console.log("object", response.message);
      }
    } catch (error) {
      Alert.alert("Hata", "Beklenmeyen bir hata oluştu.");
      console.error(error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await deleteUserCash(id);
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
        title: t.editAccountActivity.pageTitle,
      });
    }, [navigation, activeLanguage]);
  return (
    <View style={styles.container}>
      <Text style={styles.phoneNumber}></Text>
      <View style={styles.contentContainer}>
        <TextInput
          style={[
            styles.amountInput,
            { color: transactionType === "out" ? "red" : "green" },
          ]}
          value={formData.totalCash?.toString() ?? ""}
          onChangeText={(text) => {
            const parsed = parseFloat(text.replace(",", "."));
            setFormData({ ...formData, totalCash: isNaN(parsed) ? 0 : parsed });
          }}
          placeholder="0,00"
          placeholderTextColor="#ccc"
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={formData.description}
          placeholderTextColor="#A0A0A0"
          placeholder={t.editAccountActivity.description}
          scrollEnabled={true}
          multiline={true}
          onChangeText={(text) =>
            setFormData({ ...formData, description: text })
          }
        />
      </View>
      <TouchableOpacity style={styles.deleteButton}>
        <Ionicons
          name="trash"
          size={24}
          color="white"
          onPress={() =>
            Alert.alert(
          t.editAccountActivity.deleteTitle,
              t.editAccountActivity.deleteDescription,
              [
                {
                  text: t.editAccountActivity.deleteNo,
                  style: "cancel",
                },
                {
                  text: t.editAccountActivity.deleteYes,
                  onPress: handleDelete,
                },
              ],
              { cancelable: true }
            )
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.saveButton,
          { backgroundColor: transactionType === "out" ? "red" : "green" },
        ]}
        onPress={handleUpdate}
      >
        <Text style={styles.saveButtonText}>{t.editAccountActivity.saveButton}
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

export default EditAccountActivity;
