import { create } from 'zustand';
import { translations as viTranslations } from '../i18n/vi';
import { translations as enTranslations } from '../i18n/en';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Locale = 'en' | 'vi';

interface LanguageStore {
  locale: Locale;
  setLocale: (locale: Locale | null) => Promise<void>;
  t: (key: string) => any;
  isLoading: boolean;
}

const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

export const useLanguage = create<LanguageStore>((set, get) => ({
  locale: 'en',
  isLoading: true,

  setLocale: async (locale: Locale | null) => {
    const newLocale = locale || 'en';
    set({ locale: newLocale });
    try {
      await AsyncStorage.setItem('locale', newLocale);
    } catch (error) {
      console.error('Failed to save locale:', error);
    }
  },

  t: (key: string) => {
    const { locale } = get();
    const translations = locale === 'vi' ? viTranslations : enTranslations;
    const value = getNestedValue(translations, key);
    return value !== undefined ? value : key;
  },
}));

// Initialize locale from storage
AsyncStorage.getItem('locale').then((savedLocale) => {
  useLanguage.setState({
    locale: (savedLocale as Locale) || 'en',
    isLoading: false,
  });
});

