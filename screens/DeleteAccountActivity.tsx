import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import AccountActivityCard from "./DeleteAccountActivityCard"; // Kart bileşeni
import { AccountActivityCardCustomer } from "./DeleteAccountActivityCard"; // Tipi içe aktardık

const AccountActivity = () => {
  // Müşteri verileri
  const customerList: AccountActivityCardCustomer[] = [
    {
      customerName: "Ahmet",
      customerSurname: "Yılmaz",
      debtAmount: "500",
      debtIssuanceDate: "2024-02-10",
      debtRepaymentDate: "2024-03-10",
      debtCurrency: "₺",
      type: "Receivable", // Alacaklı
    },
    {
      customerName: "Mehmet",
      customerSurname: "Demir",
      debtAmount: "1000",
      debtIssuanceDate: "2024-01-15",
      debtRepaymentDate: "2024-04-15",
      debtCurrency: "$",
      type: "Payable", // Borçlu
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {customerList.map((customer, index) => (
        <AccountActivityCard key={index} customer={customer} islem={customer.type} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
});

export default AccountActivity;
