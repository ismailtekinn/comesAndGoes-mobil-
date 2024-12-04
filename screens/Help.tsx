import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import BottomBar from './BottomBar';

const Help: React.FC = () => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.box}>
            <Text style={styles.title}>Bize Ulaşın</Text>
            <View style={styles.formControl}>
              <TextInput
                style={styles.input}
                placeholder="Adınızı girin"
                placeholderTextColor="white"
              />
            </View>
            <View style={styles.formControl}>
              <TextInput
                style={styles.input}
                placeholder="Email adresinizi girin"
                placeholderTextColor="white"
              />
            </View>
            <View style={styles.formControl}>
              <TextInput
                style={styles.input}
                placeholder="Konu başlığını girin"
                placeholderTextColor="white"
              />
            </View>
            <View style={styles.formControl}>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Mesajınızı buraya yazın"
                placeholderTextColor="white"
                multiline
                numberOfLines={3}
              />
            </View>
            <Button title="Gönder" color="#2895fe" onPress={() => {}} />
          </View>

          <View style={styles.contactBox}>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Müşteri Hizmetleri:</Text>
              <Text style={styles.contactInfo}>baysoftworks@gmail.com</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Bize Ulaşın:</Text>
              <Text style={styles.contactInfo}>5357970059</Text>
            </View>
          </View>
        </ScrollView>
      <BottomBar />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    padding: 10,
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#2895fe',
    borderRadius: 20,
    maxWidth: '80%',
    width: '100%',
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  formControl: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    color: 'white',
    backgroundColor: '#2895fe',
  },
  textArea: {
    height: 100,
  },
  contactBox: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#2895fe',
    borderRadius: 10,
    maxWidth: '90%',
    width: '100%',
    padding: 10,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  contactLabel: {
    fontSize: 16,
  },
  contactInfo: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#2895fe',
  },
});

export default Help;
