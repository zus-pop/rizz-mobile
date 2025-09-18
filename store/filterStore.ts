import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type FilterData = {
  ageRange: [number, number];
  distance: number;
  interests: string[];
  lookingFor: string;
};

interface FilterStore {
  // State
  filters: FilterData;
  isLoading: boolean;

  // Actions
  setAgeRange: (ageRange: [number, number]) => void;
  setDistance: (distance: number) => void;
  toggleInterest: (interest: string) => void;
  setLookingFor: (option: string) => void;
  clearFilters: () => void;
  setFilters: (filters: FilterData) => void;
  resetToDefaults: () => void;
}

const DEFAULT_FILTERS: FilterData = {
  ageRange: [18, 35],
  distance: 25,
  interests: [],
  lookingFor: '',
};

export const useFilterStore = create<FilterStore>()(
  persist(
    (set, get) => ({
      // Initial state
      filters: DEFAULT_FILTERS,
      isLoading: false,

      // Actions
      setAgeRange: (ageRange) => {
        set((state) => ({
          filters: { ...state.filters, ageRange },
        }));
      },

      setDistance: (distance) => {
        set((state) => ({
          filters: { ...state.filters, distance },
        }));
      },

      toggleInterest: (interest) => {
        set((state) => {
          const currentInterests = state.filters.interests;
          const newInterests = currentInterests.includes(interest)
            ? currentInterests.filter((i) => i !== interest)
            : [...currentInterests, interest];

          return {
            filters: { ...state.filters, interests: newInterests },
          };
        });
      },

      setLookingFor: (option) => {
        set((state) => ({
          filters: { ...state.filters, lookingFor: option },
        }));
      },

      clearFilters: () => {
        set({ filters: DEFAULT_FILTERS });
      },

      setFilters: (filters) => {
        set({ filters });
      },

      resetToDefaults: () => {
        set({ filters: DEFAULT_FILTERS });
      },
    }),
    {
      name: 'filter-storage', // unique name for storage
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ filters: state.filters }), // only persist filters, not loading state
    }
  )
);
