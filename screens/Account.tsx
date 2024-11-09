import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import DebtList from "./DebtList"; // DebtList bileşeni için uygun yolu kontrol edin
import Help from "./Help"; // Help bileşeni için uygun yolu kontrol edin
import BottomBar from "./BottomBar";
import CashReceivable from "./CashReceivable";
import CashPaylesList from "./CashPaylesList";
import MoneyTransferList from "./MoneyTransferList";

const Account = () => {
  const [key, setKey] = useState('alacaklar');

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, key === 'alacaklar' && styles.activeTab]}
            onPress={() => setKey('alacaklar')}
          >
            <Text style={styles.tabText}>Alacaklar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, key === 'borclar' && styles.activeTab]}
            onPress={() => setKey('borclar')}
          >
            <Text style={styles.tabText}>Borçlar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, key === 'transferler' && styles.activeTab]}
            onPress={() => setKey('transferler')}
          >
            <Text style={styles.tabText}>Transferler</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          {key === 'borclar' && <DebtList />}
          {key === 'transferler' && <MoneyTransferList/>}
          {key === 'alacaklar' && <CashPaylesList />}

        </View>
      </ScrollView>
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 60, // BottomBar yüksekliğine göre ek alan
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
    justifyContent: 'center',
  },
  tabButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  activeTab: {
    backgroundColor: '#e0f7fa',
    borderColor: '#007bff',
  },
  tabText: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  contentContainer: {
    padding: 16,
  },
});

export default Account;
