import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { format } from 'date-fns';

export interface Customers {
  senderName: string;
  senderSurname: string;
  receiverName: string;
  receiverSurname: string;
  receivedAmount: string;
  moneyCurrency: string;
  receivedDate: string;
  transferDate: string;
}

interface CustomerCardProps {
  customer: Customers;
  islem: string;
}

const MoneyTransferCard: React.FC<CustomerCardProps> = ({ customer, islem }) => {
  const receivedDate = format(new Date(customer.receivedDate), 'dd/MM/yyyy');
  const transferDate = format(new Date(customer.transferDate), 'dd/MM/yyyy');

  return (
    <View style={styles.cardContainer}>
      <View style={styles.row}>
        <Text style={styles.label}>NAKİTİ VEREN:</Text>
        <Text style={styles.value}>
          {customer.senderName} {customer.senderSurname}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>NAKİTİ ALAN:</Text>
        <Text style={styles.value}>
          {customer.receiverName} {customer.receiverSurname}
        </Text>
      </View>
      <View style={styles.dateRow}>
        <Text style={styles.dateLabel}>A.T:</Text>
        <Text style={styles.dateValue}>{receivedDate}</Text>
        <Text style={styles.dateLabel}>G.T:</Text>
        <Text style={styles.dateValue}>{transferDate}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity>
          <FontAwesome name="edit" size={20} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteIcon}>
          <FontAwesome name="trash" size={20} color="#dc3545" />
        </TouchableOpacity>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>{customer.receivedAmount}</Text>
        <Text style={styles.transactionType}>{islem}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#2755ad',
    borderWidth: 2,
    borderRadius: 7,
    padding: 15,
    paddingHorizontal: 20, // Yatay padding eklendi
    marginVertical: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8, // Alt boşluk artırıldı
    alignItems: 'center', // Elemanları ortalayarak hizaladık
  },
  label: {
    fontWeight: 'bold',
    color: '#2755ad', // Yazı rengini daha belirgin yaptık
    flex: 1, // Alanın yarısını kaplaması için
  },
  value: {
    fontWeight: 'bold',
    color: '#000',
    flex: 2, // Diğer tarafa daha fazla alan verelim
    textAlign: 'left', // Sağda hizalayalım
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    textAlign: 'left',
    marginLeft: -50,
    paddingHorizontal: 50,
    // alignItems:'center',
    
  },
  dateLabel: {
    fontWeight: 'bold',
    color: '#2755ad',
    // marginHorizontal: 5,
  },
  dateValue: {
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 5,
  },
  actionsContainer: {
    position: 'absolute',
    top: 10,
    right: 80,
    flexDirection: 'column',
  },
  deleteIcon: {
    marginTop: 10,
  },
  amountContainer: {
    position: 'absolute',
    bottom: 50,
    right: 5,
    alignItems: 'center',
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2755ad',
  },
  transactionType: {
    fontSize: 12,
    color: '#007bff',
    textAlign: 'right',
  },
});
export default MoneyTransferCard;
