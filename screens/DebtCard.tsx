import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Customer interface
interface Customer {
  firstName: string;
  lastName: string;
  nakit: string;
  islem: string;
  vt: string;
  at: string;
}

interface Customers {
  customerName: string;
  customerSurname: string;
  debtAmount: string;
  debtCurrency:string;
  debtIssuanceDate: string;
  debtRepaymentDate: string;
}
interface CustomerCardProps {
  // customer: Customer;
  customer : Customers;
  islem: string;

}



const DebtCard: React.FC<CustomerCardProps> = ({ customer,islem }) => {

  const firstLetter = customer.customerName.charAt(0).toUpperCase();

  const formattedIssuanceDate = new Date(customer.debtIssuanceDate).toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const formattedRepaymentDate = new Date(customer.debtRepaymentDate).toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <View style={styles.center}>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{firstLetter}</Text>
          </View>
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>
            {customer.customerName} {customer.customerSurname}
            </Text>
            <View style={styles.datesContainer}>
              <View style={styles.date}>
                <Text style={styles.label}>V.T:</Text>
                <Text style={styles.value}>{formattedIssuanceDate}</Text>
              </View>
              <View style={styles.date}>
                <Text style={styles.label}>A.T:</Text>
                <Text style={styles.value}>{formattedRepaymentDate}</Text>
              </View>
            </View>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => { /* Düzenleme işlemi */ }}>
              <Text style={styles.iconEdit}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { /* Silme işlemi */ }}>
              <Text style={styles.iconDelete}>🗑️</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>{customer.debtAmount}{customer.debtCurrency}</Text>
            <Text style={styles.status}>{islem}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    marginVertical: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 7,
    borderWidth: 3,
    borderColor: '#f31137',
    padding: 16,
    width: '100%',
    maxWidth: 530,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circle: {
    width: 50,
    height: 50,
    backgroundColor: '#f31137',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  customerInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  customerName: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  datesContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  date: {
    marginRight: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
  },
  actions: {
    justifyContent: 'center',
  },
  iconEdit: {
    fontSize: 20,
    color: '#007bff',
  },
  iconDelete: {
    fontSize: 20,
    color: '#dc3545',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    color: '#f31137',
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    color: '#d5cbcc',
    fontSize: 18,
  },
});

export default DebtCard;
