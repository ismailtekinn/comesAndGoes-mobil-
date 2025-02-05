import React, { useEffect, useState } from 'react'
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import DebtCard from './DebtCard';
import { useNavigation } from '@react-navigation/native'; // navigation kullanımı için gerekli import
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { debCustomerList } from '../api/customer';
import { useTranslations } from '../hooks/useTranslation';


const DebtList = () => {
  const [customerss, setCustomers] = useState([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const t = useTranslations();
  

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customerData = await debCustomerList(1);
        console.log("veritabanından çekilen değer ekrana yazdırıldı: ", customerData);
        setCustomers(customerData);
      } catch (error) {
        console.error("Müşteriler yüklenirken hata oluştu:", error);
      }
    };

    fetchCustomers();
  }, []);
  const handleAddCustomerClick = () => {
    navigation.navigate('AddDebt')
  };


  // const customers = [
  //   {
  //     firstName: 'Ahmet',
  //     lastName: 'Yılmaz',
  //     nakit: '500 ₺',
  //     islem: 'verdim',
  //     vt: '28.01.2000',
  //     at: '20.01.2000',
  //   },
  //   {
  //     firstName: 'Ahmet',
  //     lastName: 'Yılmaz',
  //     nakit: '500 ₺',
  //     islem: 'verdim',
  //     vt: '28.01.2000',
  //     at: '20.01.2000',
  //   },
  //   {
  //     firstName: 'Ahmet',
  //     lastName: 'Yılmaz',
  //     nakit: '500 ₺',
  //     islem: 'verdim',
  //     vt: '28.01.2000',
  //     at: '20.01.2000',
  //   },
  // ];
  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>  
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.listContainer}>
          {customerss.map((customer, index) => (
            <DebtCard key={index} customer={customer} islem='verdim' /> // DebtCard bileşenini her müşteri için render ediyoruz
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={handleAddCustomerClick}>
        <Text style={styles.buttonText}>{t.accountPageDebtsTabMenu.lendButton}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    padding: 16,
    backgroundColor: '#fff',
    // borderStartColor: 'green',
    flexGrow: 1,
  },

  listContainer: { 
    backgroundColor: 'green',
  },
  button: {
    backgroundColor: '#f31137',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    // bottom: 20,
    right: 20,
    zIndex: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DebtList;


