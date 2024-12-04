import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet,Text,TouchableOpacity, View } from 'react-native';
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

  return (
    // <ScrollView contentContainerStyle={styles.container}>
    //   {customerss.map((customer, index) => (
    //     <CashPayablesCard key={index} customer={customer} islem='aldım' />
    //   ))}

    //   <TouchableOpacity style={styles.nakitButton}onPress={() => navigation.navigate('CashReceivable')}>
    //       <Text style={styles.nakitButtonText}>Nakit Al</Text>
    //    </TouchableOpacity>
    // </ScrollView>
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
      <Text style={styles.nakitButtonText}>Nakit Al</Text>
    </TouchableOpacity>
  </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//     flexGrow: 1,
//   },
//   nakitButton: {
//     backgroundColor: '#13603c', // Button color
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'absolute',
//     paddingTop: 30,
//     bottom: 20,
//     right: 20,
//   },
//   nakitButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 30,
  },
  nakitButton: {
    backgroundColor: '#13603c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20, // Ekranın altından mesafe
    right: 20,  // Sağdan mesafe
  },
  nakitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CashPaylesList;
