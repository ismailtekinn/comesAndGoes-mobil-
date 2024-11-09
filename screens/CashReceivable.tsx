import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import DatePicker from "react-native-date-picker";
import BottomBar from "./BottomBar";
import { Picker } from "@react-native-picker/picker";

const CashReceivable = () => {
  const [paraBirimi, setParaBirimi] = useState("TL");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [musteriAdi, setMusteriAdi] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false} // Hızlı kaydırma için kaydırıcıyı gizler
      >
        <View style={styles.box}>
          <View style={styles.header}>
            <Text style={styles.headerText}>User Icon</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.formControl}>
              <Text style={styles.label}>Müşteri Adı</Text>
              <Picker
                selectedValue={musteriAdi}
                onValueChange={(itemValue) => setMusteriAdi(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Müşteri Seçin" value="" />
                <Picker.Item label="Müşteri 1" value="musteri1" />
                <Picker.Item label="Müşteri 2" value="musteri2" />
                <Picker.Item label="Müşteri 3" value="musteri3" />
              </Picker>
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Müşteri Telefon</Text>
              <TextInput style={styles.input} placeholder="Müşteri Telefon" />
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Nakit Miktarı</Text>
              <View style={styles.currencyContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Nakit Miktarı"
                />
                <Picker
                  selectedValue={paraBirimi}
                  onValueChange={(itemValue) => setParaBirimi(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="TL" value="TL" />
                  <Picker.Item label="Dolar" value="Dollar" />
                  <Picker.Item label="Euro" value="Euro" />
                </Picker>
              </View>
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Borç Veriliş Tarihi</Text>
              <TextInput style={styles.input} placeholder="YYYY-MM-DD" />
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Borç Geri Ödeme Tarihi</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  value={selectedDate.toDateString()}
                  editable={false}
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DatePicker
                  modal
                  open={showDatePicker}
                  date={selectedDate}
                  onConfirm={(date) => {
                    setShowDatePicker(false);
                    setSelectedDate(date);
                  }}
                  onCancel={() => {
                    setShowDatePicker(false);
                  }}
                />
              )}
            </View>
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Borç Al</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
    
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20, // Add padding at the bottom to ensure all content is accessible
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    bottom: 40,
  },
  header: {
    backgroundColor: "#0e76a8",
    paddingVertical: 20,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  form: {
    marginTop: 20,
  },
  formControl: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    flex: 1,
  },
  currencyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: "#0e76a8",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CashReceivable;
