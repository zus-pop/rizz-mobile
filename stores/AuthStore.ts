interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = createStore<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
    }),
    {
      name: 'auth-storage',
      getStorage: () => AsyncStorage,
    }
  )
);
