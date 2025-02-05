import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './constants/language/en.json'
import tr from './constants/language/tr.json'
i18next
  .use(initReactI18next)  
  .init({
    resources: {
      en: { loginPage: en.loginPage },
      tr: { loginPage: tr.loginPage },
    },
    lng: 'tr',  
    fallbackLng: 'en',  
    interpolation: {
      escapeValue: false,  
    },
  });
