import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type SettingsData = {
  notifications: boolean;
  darkMode: boolean;
  privacy: 'public' | 'private';
  accountEmail: string;
  // Add more settings as needed
};

const DEFAULT_SETTINGS: SettingsData = {
  notifications: true,
  darkMode: false,
  privacy: 'public',
  accountEmail: '',
};

interface SettingsStore {
  settings: SettingsData;
  setSetting: <K extends keyof SettingsData>(key: K, value: SettingsData[K]) => void;
  setSettings: (settings: SettingsData) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      setSetting: (key, value) =>
        set((state) => ({
          settings: { ...state.settings, [key]: value },
        })),
      setSettings: (settings) => set({ settings }),
      resetSettings: () => set({ settings: DEFAULT_SETTINGS }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ settings: state.settings }),
    }
  )
);
