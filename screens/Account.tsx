import React, { useContext, useLayoutEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import DebtList from "./DebtList"; // DebtList bileşeni için uygun yolu kontrol edin
import Help from "./Help"; // Help bileşeni için uygun yolu kontrol edin
import BottomBar from "./BottomBar";
import CashReceivable from "./CashReceivable";
import CashPaylesList from "./CashPaylesList";
import MoneyTransferList from "./MoneyTransferList";
import { useTranslations } from "../hooks/useTranslation";
import { LanguageContext } from "../contex/languageContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";

const Account = () => {
  const [key, setKey] = useState('alacaklar');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const t = useTranslations();
  const { activeLanguage } = useContext(LanguageContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t.accounPage.pageTitle,
    });
  }, [navigation, activeLanguage]);
  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, key === 'alacaklar' && styles.activeTab]}
            onPress={() => setKey('alacaklar')}
          >
            <Text style={styles.tabText}>{t.accountPageReceivablesTabMenu.receivables}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, key === 'borclar' && styles.activeTab]}
            onPress={() => setKey('borclar')}
          >
            <Text style={styles.tabText}>{t.accountPageReceivablesTabMenu.payables}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, key === 'transferler' && styles.activeTab]}
            onPress={() => setKey('transferler')}
          >
            <Text style={styles.tabText}>{t.accountPageReceivablesTabMenu.transfers}</Text>
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
