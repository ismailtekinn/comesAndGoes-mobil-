import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet,Text,TouchableOpacity, View } from 'react-native';
import CashPayablesCard from './CashPaylesCard';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
import { cashReceivableList } from '../api/customer';
import { useTranslations } from '../hooks/useTranslation';
import { useUser } from '../contex/useContext';

const CashPaylesList = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [customerss, setCustomers] = useState([]);
  const t = useTranslations();
  console.log(t.accountPageReceivablesTabMenu.receiveCash);
  const { userId } = useUser();
  const userIdNumber = userId ? Number(userId) : 0;
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customerData = await cashReceivableList(userIdNumber);
        console.log("veritabanından çekilen değer ekrana yazdırıldı: ", customerData);
        setCustomers(customerData);
      } catch (error) {
        console.error("Müşteriler yüklenirken hata oluştu:", error);
      }
    };
    fetchCustomers();
  }, []);
  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {customerss.map((customer, index) => (
        <CashPayablesCard key={index} customer={customer} islem="aldım" />
      ))}
    </ScrollView>
    <TouchableOpacity
      style={styles.nakitButton}
      onPress={() => navigation.navigate('CashReceivable')}
    >
      <Text style={styles.nakitButtonText}>{t.accountPageReceivablesTabMenu.receiveCash}</Text>
    </TouchableOpacity>
  </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // height: 550,
  },
  scrollContainer: {
    padding: 30,
    marginTop:10,
  },
  nakitButton: {
    backgroundColor: '#13603c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 20,  
    zIndex:1,
  },
  nakitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default CashPaylesList;
