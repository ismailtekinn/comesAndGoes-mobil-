// import { useContext } from 'react';
// import { LanguageContext } from '../contex/languageContext';
// import translations from '../constants/language/translations';

// export const useTranslations = () => {
//   const { activeLanguage } = useContext(LanguageContext);
//   return translations[activeLanguage];
// };


import { useContext } from 'react';
import { LanguageContext } from '../contex/languageContext';
import translations from '../constants/language/translations';

export const useTranslations = () => {
  const { activeLanguage } = useContext(LanguageContext);
  
  const languageData = translations[activeLanguage] || translations["Türkçe"];

  return languageData;
};
