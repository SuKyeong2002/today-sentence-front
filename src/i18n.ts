import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './locales/en.json';
import ko from './locales/ko.json';

const getStoredLanguage = async () => {
  try {
    const storedLang = await AsyncStorage.getItem('appLanguage');
    return storedLang || 'ko'; 
  } catch (error) {
    console.error('Error fetching language:', error);
    return 'ko';
  }
};

const initLanguage = async () => {
  const language = await getStoredLanguage();
  await i18n.changeLanguage(language);
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4', 
    resources: {
      en: { translation: en },
      ko: { translation: ko }
    },
    lng: 'ko', 
    fallbackLng: 'ko',
    interpolation: { escapeValue: false }
  });

initLanguage();

export default i18n;
