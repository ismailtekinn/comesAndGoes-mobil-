import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { LanguageContextProps, LanguageProviderProps } from '../interface/ILanguage';
import { LanguageType } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LanguageContext = createContext<LanguageContextProps>({
  activeLanguage: "Türkçe",
  setActiveLanguage: () => {}
});


export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [activeLanguage, setActiveLanguage] = useState<LanguageType>("Türkçe");

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("appLanguage");
      if (savedLanguage) {
        setActiveLanguage(savedLanguage as LanguageType);
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (language: LanguageType) => {
    setActiveLanguage(language);
    await AsyncStorage.setItem("appLanguage", language);
  };


  return (
    <LanguageContext.Provider value={{ activeLanguage, setActiveLanguage:changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
