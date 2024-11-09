import React, { useState } from 'react';
import { View, Alert, TextInput, Button, Text, StyleSheet } from 'react-native';
import { SignIn } from '../types/authType'; // SignIn tipinin bulunduğu dosyayı içe aktarıyoruz.
import { login } from '../api/auth';
import { useUser } from '../contex/useContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { handleToken,handleLogin } = useUser();
  const [formData, setFormData] = useState<SignIn>({
    phone: '',
    password: '',
  });

  // Parametrelerin tiplerini belirtiyoruz.
  const handleChange = (name: keyof SignIn, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit =  async() => {
    const { phone, password } = formData;
    if (phone === '' || password === '') {
      Alert.alert('Error', 'Please enter both phone number and password.');
    } else {
      const { user, token } = await login(formData);
      console.log("user and token: ",user, token);
      if (token && user) {
        handleToken(token);
        console.log("burası login sayfası user yazdırdım: ",user)
        handleLogin(user)
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Phone Number" 
        value={formData.phone} 
        onChangeText={value => handleChange('phone', value)}
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        value={formData.password} 
        onChangeText={value => handleChange('password', value)} 
        secureTextEntry
        autoCapitalize="none"
      />
      <Button 
        onPress={handleSubmit} 
        title="Login" 
        color="#007BFF" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0', // Arka plan rengi
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center', // Başlığı ortala
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#fff', // Girdi alanının arka plan rengi
  },
});

export default LoginScreen;
