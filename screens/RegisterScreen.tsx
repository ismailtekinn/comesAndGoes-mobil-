import React, { useContext, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Register } from '../types/authType';
import { register } from '../api/auth';
import { useUser } from '../contex/useContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
import { useTranslations } from '../hooks/useTranslation';
import { LanguageContext } from '../contex/languageContext';

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { handleLogin, handleToken } = useUser();
  const t = useTranslations();
  const { activeLanguage } = useContext(LanguageContext);

  const [formData, setFormData] = useState<Register>({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    roleId: 3,
  });

  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t.registerPage.pageTitle,
    });
  }, [navigation, activeLanguage]);

  const handleSubmit = async () => {
    if (formData.email === '' || formData.password === '') {
      Alert.alert("Hata", "Lütfen ilgili alanları doldurun");
      return;
    }
    try {
      const response = await register(formData);
      Alert.alert(response.message || "Bilinmeyen bir hata oluştu.");
      if (response.success === true) {
        navigation.navigate('Login');
      } else {
        setError(response.message);
      }
    } catch (error: any) {
      Alert.alert("Kayıt Hatası", error.message || "Bilinmeyen bir hata oluştu.");
    }
  };

  return (
    <ImageBackground
      source={require('../assets/img/loginBackground.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <Text style={styles.title}>{t.registerPage.pageTitle}</Text>

          <TextInput
            placeholder={t.registerPage.firstName}
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <TextInput
            placeholder={t.registerPage.lastName}
            style={styles.input}
            value={formData.surname}
            onChangeText={(text) => setFormData({ ...formData, surname: text })}
          />
          <TextInput
            placeholder={t.registerPage.userName}
            style={styles.input}
            value={formData.username}
            onChangeText={(text) => setFormData({ ...formData, username: text })}
          />
          <TextInput
            placeholder={t.registerPage.email}
            style={styles.input}
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
          <TextInput
            placeholder={t.registerPage.phoneNumber}
            style={styles.input}
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
          />
          <TextInput
            placeholder={t.registerPage.password}
            style={styles.input}
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
          />

          <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
            <Text style={styles.registerText}>{t.registerPage.signUp}</Text>
          </TouchableOpacity>

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
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20, // Burayı 50'den 20'ye düşürdük
  },
  form: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Biraz daha şeffaflık
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 28, // 32'den 28'e düşürdüm, daha dengeli
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 45, // 50 yerine 45
    backgroundColor: 'rgba(242, 242, 242, 0.95)',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10, // 12 yerine 10
  },
  registerButton: {
    backgroundColor: '#3478f6',
    paddingVertical: 12, // 15 yerine 12
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#003366',
    textAlign: 'center',
    marginTop: 12, // 15 yerine 12
  },
  signInText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  text: {
    color: 'grey',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default RegisterScreen;
