import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import các file JSON chứa bản dịch
import en from './locales/en.json';
import vi from './locales/vi.json';

export const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
} as const;

i18next
  .use(initReactI18next) // Tích hợp i18next với React
  .init({
    resources,
    lng: 'vi', // Ngôn ngữ mặc định
    fallbackLng: 'en', // Ngôn ngữ dự phòng nếu không tìm thấy key
    interpolation: {
      escapeValue: false, // React đã tự bảo vệ khỏi XSS
    },
    compatibilityJSON: 'v4', // SỬA ĐỔI: Cần thiết cho phiên bản i18next mới
  });

export default i18next;