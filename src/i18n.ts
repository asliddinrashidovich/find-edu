import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import uz from './locales/uz/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      uz: { translation: uz },
    },
    lng: 'en', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;