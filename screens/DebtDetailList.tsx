import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import DebtDetailCard from './DebtDetailCard'; // DebtDetailCard componentinizi uyarladığınızı varsayıyorum.
import { debtdetailCustomerList } from '../api/customer';

export interface Customers {
  type: string;
  customerName: string;
  customerSurname: string;
  debtAmount: string;
  debtCurrency: string;
  debtIssuanceDate: string;
  debtRepaymentDate: string;
  id: number;
  totalReceivables: number;
  totalDebts: number;
  difference: number;
}

interface CustomerCardProps {
  customer: Customers;
  islemList: string;
}

const DebtDetailList: React.FC<CustomerCardProps> = ({ customer, islemList }) => {
  const [customers, setCustomers] = useState<Customers[]>([]);
  const userId = 1;
  const customerId = customer.id;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customerData = await debtdetailCustomerList({ userId, customerId });
        setCustomers(customerData.data.combinedResult);
      } catch (error) {
        console.error('Müşteri işlemleri yüklenirken bir hata oldu');
      }
    };
    fetchCustomers();
  }, []);

  return (
    <View style={styles.container}>
      {customers.map((customer, index) => (
        <DebtDetailCard key={index} customer={customer} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  islemText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default DebtDetailList;
