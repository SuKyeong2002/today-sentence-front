import i18n from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const changeLanguage = async (lang: string) => {
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem('appLanguage', lang);
};

export const getStoredLanguage = async () => {
  try {
    const storedLang = await AsyncStorage.getItem('appLanguage');
    return storedLang || 'ko';
  } catch (error) {
    console.error('Error fetching language:', error);
    return 'ko';
  }
};
