import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // İkonlar için @expo/vector-icons kullanıyoruz.

interface Customers {
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
}

const DebtDetailCard: React.FC<CustomerCardProps> = ({ customer }) => {
  const navigation = useNavigation();
  let islemIcon: JSX.Element;
  let islemColor: string;
  let islem: string;

  if (customer.type === 'Debt') {
    islemColor = '#f21236';
    islemIcon = <FontAwesome name="arrow-up" size={24} color="#fff" />;
    islem = 'verdim';
  } else {
    islemIcon = <FontAwesome name="arrow-down" size={24} color="#fff" />;
    islemColor = '#10853e';
    islem = 'aldım';
  }

  const formattedIssuanceDate = new Date(customer.debtIssuanceDate).toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const time = new Date(customer.debtIssuanceDate).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

  const formattedRepaymentDate = new Date(customer.debtRepaymentDate).toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.iconContainer, { backgroundColor: '#2895fe' }]}>
          {islemIcon}
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{formattedIssuanceDate}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.amountText, { color: islemColor }]}>
            {customer.debtAmount}
          </Text>
          <Text style={styles.islemText}>{islem}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#2895fe',
    borderWidth: 2,
    marginVertical: 10,
    padding: 20,
    maxWidth: 530,
    width: '100%',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 14,
    color: '#888',
  },
  amountContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  amountText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  islemText: {
    fontSize: 14,
    color: '#d5cbcc',
  },
});

export default DebtDetailCard;
