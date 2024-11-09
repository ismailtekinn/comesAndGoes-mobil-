import React from 'react'
import LoginScreen from './LoginScreen'

import { View, Text, Button, StyleSheet } from 'react-native';


const HomePage = ({ navigation }: { navigation: any }) => {
  return (

      <Button title="Go to Home" onPress={() => navigation.navigate('Login')} />

    //   <Button title="Go to Home" onPress={() => navigation.navigate('Help')} />
    //   <Button title="Go to Home" onPress={() => navigation.navigate('AdminHome')} />
    //   <Button title="Go to Home" onPress={() => navigation.navigate('Login')} />
    //   <Button title="Go to Home" onPress={() => navigation.navigate('Login')} />

  )
}

export default HomePage
