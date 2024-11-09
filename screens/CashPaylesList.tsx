import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet,Text,TouchableOpacity } from 'react-native';
import CashPayablesCard from './CashPaylesCard';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
import { cashReceivableList } from '../api/customer';

const CashPaylesList = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [customerss, setCustomers] = useState([]);
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customerData = await cashReceivableList(1);
        console.log("veritabanından çekilen değer ekrana yazdırıldı: ", customerData);
        setCustomers(customerData);
      } catch (error) {
        console.error("Müşteriler yüklenirken hata oluştu:", error);
      }
    };

    fetchCustomers();
  }, []);
  
  // const customers = [
  //   {
  //     firstName: "Ahmet",
  //     lastName: "Yılmaz",
  //     nakit: "500₺",
  //     islem: "verdim",
  //     vt: "28.01.2000",
  //     at: "20.01.2000",
  //   },
  //   {
  //     firstName: "Mehmet",
  //     lastName: "Demir",
  //     nakit: "600₺",
  //     islem: "verdim",
  //     vt: "20.01.2000",
  //     at: "20.01.2000",
  //   },   
  //   {
  //     firstName: "Ayse",
  //     lastName: "Kara",
  //     nakit: "100₺",
  //     islem: "aldım",
  //     vt: "17.01.2000",
  //     at: "17.01.2000",
  //   },

  // ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {customerss.map((customer, index) => (
        <CashPayablesCard key={index} customer={customer} islem='aldım' />
      ))}


      <TouchableOpacity style={styles.nakitButton}onPress={() => navigation.navigate('CashReceivable')}>
          <Text style={styles.nakitButtonText}>Nakit Al</Text>
       </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  nakitButton: {
    backgroundColor: '#13603c', // Button color
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  nakitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CashPaylesList;
