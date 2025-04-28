import React, { useContext, useLayoutEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import BottomBar from './BottomBar';
import { useClock } from '../contex/clockContext';
import { useTranslations } from '../hooks/useTranslation';
import { LanguageContext } from '../contex/languageContext';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

const Clock = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  // const [activeFormat, setActiveFormat] = useState<'24' | '12'>('24');
  // const { format: activeFormat, setFormat: setActiveFormat } = useClock();
  const { format, setFormat } = useClock();
    const t = useTranslations();
    const { activeLanguage } = useContext(LanguageContext);


      useLayoutEffect(() => {
        navigation.setOptions({
          title: t.clock.pageTitle,
        });
      }, [navigation, activeLanguage]);
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setFormat('24')}
        style={[
          styles.button,
          format === '24' ? styles.activeButton : styles.inactiveButton,
        ]}
      >
        <Text style={[
          styles.buttonText,
          format === '24' ? styles.activeText : styles.inactiveText,
        ]}>
          {/* Miladi Takvim  */}
                  </Text>
        <Text style={[
          styles.buttonText,
          format === '24' ? styles.activeText : styles.inactiveText,
        ]}>
          {t.clock.format24}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => setFormat('12')}
        style={[
          styles.button,
          format === '12' ? styles.activeButton : styles.inactiveButton,
        ]}
      >
        <Text style={[
          styles.buttonText,
          format === '12' ? styles.activeText : styles.inactiveText,
        ]}>
          {/* Hicri Takvim */}
        </Text>
        <Text style={[
          styles.buttonText,
          format === '12' ? styles.activeText : styles.inactiveText,
        ]}>
              {t.clock.format12}
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
