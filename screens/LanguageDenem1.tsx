import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import BottomBar from './BottomBar';
import { LanguageContext } from '../contex/languageContext';
import { useContext } from 'react';
import { LanguageType } from '../types';

const languages: LanguageType[] = ["Türkçe", "İngilizce", "Farsça"]; // ✅ Hata düzeltilmiş

const Language = () => {
  const { activeLanguage, setActiveLanguage } = useContext(LanguageContext);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {languages.map((language) => (
          <Pressable
            key={language}
            onPress={() => setActiveLanguage(language)} // ✅ someValue yerine language kullanıldı
            style={[
              styles.languageButton,
              activeLanguage === language ? styles.activeButton : styles.inactiveButton,
            ]}
          >
            <Text
              style={[
                styles.languageText,
                activeLanguage === language ? styles.activeText : styles.inactiveText,
              ]}
            >
              {language}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <BottomBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  languageButton: {
    borderRadius: 10,
    borderWidth: 2,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
  },
  activeButton: {
    backgroundColor: '#2895fe',
    borderColor: 'transparent',
  },
  inactiveButton: {
    backgroundColor: '#ffffff',
    borderColor: '#2895fe',
  },
  languageText: {
    fontSize: 18,
  },
  activeText: {
    color: '#ffffff',
  },
  inactiveText: {
    color: '#2895fe',
  },
});

export default Language;
