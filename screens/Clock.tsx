import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import BottomBar from './BottomBar';

const Clock = () => {
  const [activeFormat, setActiveFormat] = useState<'24' | '12'>('24');

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setActiveFormat('24')}
        style={[
          styles.button,
          activeFormat === '24' ? styles.activeButton : styles.inactiveButton,
        ]}
      >
        <Text style={[
          styles.buttonText,
          activeFormat === '24' ? styles.activeText : styles.inactiveText,
        ]}>
          Zaman Göstergesi : 15:00
        </Text>
        <Text style={[
          styles.buttonText,
          activeFormat === '24' ? styles.activeText : styles.inactiveText,
        ]}>
          24 Saat Formatı
        </Text>
      </Pressable>

      <Pressable
        onPress={() => setActiveFormat('12')}
        style={[
          styles.button,
          activeFormat === '12' ? styles.activeButton : styles.inactiveButton,
        ]}
      >
        <Text style={[
          styles.buttonText,
          activeFormat === '12' ? styles.activeText : styles.inactiveText,
        ]}>
          Zaman Göstergesi : 03:00
        </Text>
        <Text style={[
          styles.buttonText,
          activeFormat === '12' ? styles.activeText : styles.inactiveText,
        ]}>
          12 Saat Formatı
        </Text>
      </Pressable>
      <BottomBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  button: {
    borderRadius: 10,
    borderWidth: 2,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
  },
  activeButton: {
    backgroundColor: '#2895fe',
    borderColor: 'transparent',
  },
  inactiveButton: {
    backgroundColor: '#ffffff',
    borderColor: '#2895fe',
  },
  buttonText: {
    fontSize: 18,
  },
  activeText: {
    color: '#ffffff',
  },
  inactiveText: {
    color: '#2895fe',
  },
});

export default Clock;
