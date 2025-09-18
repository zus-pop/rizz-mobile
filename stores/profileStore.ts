import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Profile {
  name: string;
  age: number;
  avatar: string;
  bio: string;
  voice?: string;
  university: string;
  interested_in?: string;
  looking_for?: string;
  study_style: string;
  weekend_hobby: string;
  campus_life: string;
  future_plan: string;
  communication_preference: string;
  deal_breakers: string[];
  zodiac: string;
  love_language: string;
}

const defaultProfile: Profile = {
  name: '',
  age: 18,
  avatar: '',
  bio: '',
  voice: '',
  university: '',
  interested_in: '',
  looking_for: '',
  study_style: '',
  weekend_hobby: '',
  campus_life: '',
  future_plan: '',
  communication_preference: '',
  deal_breakers: [],
  zodiac: '',
  love_language: '',
};

interface ProfileState {
  profile: Profile;
  setProfile: (patch: Partial<Profile>) => void;
  resetProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      setProfile: (patch) => set((state) => ({ profile: { ...state.profile, ...patch } })),
      resetProfile: () => set({ profile: defaultProfile }),
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ profile: state.profile }),
    }
  )
);
