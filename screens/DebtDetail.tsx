import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import BottomBar from './BottomBar';
import DebtDetailList from './DebtDetailList';

const DebtDetail = () => {
  const route = useRoute();
  const { customer } = route.params; 

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <DebtDetailList customer={customer} islemList=' ' />
      </ScrollView>
      <BottomBar />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    marginVertical: 10,
  },
});

export default DebtDetail;
