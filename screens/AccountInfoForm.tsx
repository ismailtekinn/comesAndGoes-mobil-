import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import BottomBar from './BottomBar';
import { accountInfo } from '../api/customer';
import { User } from '../types';
import { useUser } from '../contex/useContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountInfoForm = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const {handleLogout,userData,userId} = useUser()
  const [userInfo, setUserInfo] = useState<User>({
    email: '',
    id: 0,
    name: '',
    password: '',
    phone: 0,
    surname: '',
    username: ''
  });

  console.log("user çekiliyor account info sayfası :  ", userData);
  

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    }); 

    const fetchCustomers = async () => {
      try {
        if (userId !== undefined) { 
          const result = await accountInfo(userId);
          setUserInfo(result[0]);
        } else {
          console.error("User ID is undefined.");
        }
      } catch (error) {
        console.error("Müşteriler yüklenirken hata oluştu:", error);
      }
    };
  
    fetchCustomers();

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.formWrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} 
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }}
              style={styles.avatar}
            />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Ad</Text>
            <TextInput style={styles.input} placeholder="Adınızı girin"
            value={userInfo.name} />

            <Text style={styles.label}>Soyad</Text>
            <TextInput style={styles.input} placeholder="Soyadınızı girin"
            value={userInfo.surname} />

            <Text style={styles.label}>Telefon</Text>
            <TextInput style={styles.input} placeholder="Telefon numaranızı girin" 
             value={userInfo.phone.toString()}/>
          </View>

          <TouchableOpacity style={styles.updateButton} onPress={()=> handleLogout()}>
            <Text style={styles.buttonText}>Güncelle</Text>
          </TouchableOpacity>
        </ScrollView>
        <BottomBar />
      </KeyboardAvoidingView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  formWrapper: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: 80, // BottomBar için boşluk bırak
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -30, // Avatarın taşmasını azaltmak için
    paddingTop: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'white',
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 30,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
  },
  updateButton: {
    backgroundColor: '#FF7F00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10, // Altında biraz boşluk bırak
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // bottomBarContainer: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   height: 60,
  //   backgroundColor: '#fff',
  // },
});

export default AccountInfoForm;
