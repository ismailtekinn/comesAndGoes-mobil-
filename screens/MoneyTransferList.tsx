import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MoneyTransferCard, { Customers } from './MoneyTransferCard'; // Card bileşeni için yolu güncelle
import { useNavigation } from '@react-navigation/native'; // navigation kullanımı için gerekli import
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import BottomBar from './BottomBar';
import { getMoneyTransfers } from '../api/customer';

const MoneyTransferList = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [customerss, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customerData = await getMoneyTransfers(1);
        console.log("money veritabanından çekilen değer ekrana yazdırıldı: ", customerData);
        setCustomers(customerData);
      } catch (error) {
        console.error("Müşteriler yüklenirken hata oluştu:", error);
      }
    };

    fetchCustomers();
  }, []);

  const customerData: Customers[] = [
    {
      senderName: "Ahmet",
      senderSurname: "Yılmaz",
      receiverName: "Mehmet",
      receiverSurname: "Kaya",
      receivedAmount: "5000₺",
      moneyCurrency: "TRY",
      receivedDate: "2023-09-01",
      transferDate: "2023-09-05"
    },
    {
      senderName: "Fatma",
      senderSurname: "Demir",
      receiverName: "Ayşe",
      receiverSurname: "Koç",
      receivedAmount: "2000₺",
      moneyCurrency: "USD",
      receivedDate: "2023-08-21",
      transferDate: "2023-08-23"
    },
    {
      senderName: "Ahmet",
      senderSurname: "Yılmaz",
      receiverName: "Mehmet",
      receiverSurname: "Kaya",
      receivedAmount: "5000₺",
      moneyCurrency: "TRY",
      receivedDate: "2023-09-01",
      transferDate: "2023-09-05"
    },
    {
      senderName: "Fatma",
      senderSurname: "Demir",
      receiverName: "Ayşe",
      receiverSurname: "Koç",
      receivedAmount: "2000₺",
      moneyCurrency: "USD",
      receivedDate: "2023-08-21",
      transferDate: "2023-08-23"
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {customerss.map((customer, index) => (
          <MoneyTransferCard key={index} customer={customer} islem='transfer edildi' />
        ))}
      </ScrollView>
      {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MoneyTransfer')}> */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MoneyTransferScreen')}>
        <Text style={styles.buttonText}>Transfer Et</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    flexDirection: 'column',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 20,
  
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default MoneyTransferList;
