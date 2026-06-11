import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en.json';
import translationAR from './locales/ar.json';

const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('lng') || 'ar', // اللغة الافتراضية هنا العربية
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

// كود سحري لقلب اتجاه الموقع (RTL / LTR) تلقائياً بناءً على اللغة المفعلة
i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
  localStorage.setItem('lng', lng);
});

// تشغيله لأول مرة عند تحميل الموقع
document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = i18n.language;

export default i18n;