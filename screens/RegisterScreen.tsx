import React, { useContext, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Register } from '../types/authType'; // Register tipi burada tanımlı olmalı
import { register } from '../api/auth'; // Register işlevi burada tanımlı olmalı
import { useUser } from '../contex/useContext'; // Kullanıcı işlemleri için
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
import { useTranslations } from '../hooks/useTranslation';
import { LanguageContext } from '../contex/languageContext';


const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { handleLogin, handleToken } = useUser();
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations();
  const { activeLanguage } = useContext(LanguageContext);
  const [formData, setFormData] = useState<Register>({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    roleId: 3
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      title: t.registerPage.pageTitle,
    });
  }, [navigation, activeLanguage]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    const newValue = type === 'number' ? Number(value) : value;
    setFormData(prevState => ({
      ...prevState,
      [id]: newValue,
    }));
  };

  const handleSubmit = async () => {
    if (formData.email === '' || formData.password === '') {
        Alert.alert("Hata", "Lütfen ilgili alanları doldurun ");
      return;
    }
    try {
      const response = await register(formData);
      Alert.alert( response.message || "Bilinmeyen bir hata oluştu.");
      if (response.success == true) {
        navigation.navigate('Login');
      }
      else{
        setError(response.message
        )
      }
    } catch (error: any) {
       Alert.alert("Giriş Hatası", error.message || "Bilinmeyen bir hata oluştu.");
      
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
      {error && <Text style={styles.errorText}>{error}</Text>}

        <Text style={styles.cardTitle}>{t.registerPage.pageTitle}</Text>
        <TextInput
          style={styles.input}
          placeholder={t.registerPage.firstName}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder={t.registerPage.lastName}
          value={formData.surname}
          onChangeText={(text) => setFormData({ ...formData, surname: text })}
        />
        <TextInput
          style={styles.input}
          placeholder={t.registerPage.userName}
          value={formData.username}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
        />
        <TextInput
          style={styles.input}
          placeholder={t.registerPage.email}
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder={t.registerPage.phoneNumber}
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
        />
        <TextInput
          style={styles.input}
          placeholder={t.registerPage.password}
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />

        <Button title={t.registerPage.signUp} onPress={handleSubmit} />
        <TouchableOpacity>
          <Text style={styles.linkText}>{t.registerPage.passwordReturn}</Text>
        </TouchableOpacity>
        <View style={styles.signInText}>
          <Text style={styles.text}>{t.registerPage.haveAccount}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>{t.registerPage.signIn}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  linkText: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
  },
  signInText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  text: {
    color: 'grey',
  },
});

export default RegisterScreen;
