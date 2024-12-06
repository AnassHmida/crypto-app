import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  ApiService  from '../services/api/ApiService';
import { AVAILABLE_CURRENCIES } from '../screens/Settings';

interface Settings {
  currency: string;
  realTimeUpdates: boolean;
  priceAlerts: boolean;
}

interface SettingsStore {
  settings: Settings;
  exchangeRates: Record<string, number>;
  lastRatesFetch: number | null;
  fetchExchangeRates: () => Promise<Record<string, number> | null>;
  updateSettings: (newSettings: Partial<Settings>) => void;
  convertAmount: (amount: number, fromCurrency: string, toCurrency: string) => number;
}

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      settings: {
        currency: 'USD',
        realTimeUpdates: true,
        priceAlerts: false,
      },
      exchangeRates: {},
      lastRatesFetch: null,

      fetchExchangeRates: async () => {
        const now = Date.now();
        const state = get();
        
        // Check if we have fresh rates in memory
        if (state.lastRatesFetch && 
            (now - state.lastRatesFetch) < CACHE_DURATION && 
            Object.keys(state.exchangeRates).length > 0) {
          return state.exchangeRates;
        }

        try {
          const rates = await ApiService.getInstance().getExchangeRates(AVAILABLE_CURRENCIES);
          if (rates) {
            set({ 
              exchangeRates: { USD: 1, ...rates },
              lastRatesFetch: now 
            });
            return rates;
          }
        } catch (error) {
          console.error('Failed to fetch exchange rates:', error);
        }


        if (Object.keys(state.exchangeRates).length > 0) {
          return state.exchangeRates;
        }

        return null;
      },

      updateSettings: async (newSettings) => {
        const newCurrency = newSettings.currency;
        if (newCurrency) {
          const rates = await get().fetchExchangeRates();
          if (!rates) {
            console.warn('Failed to fetch exchange rates');
            return;
          }

          set(state => ({
            exchangeRates: rates,
            settings: {
              ...state.settings,
              ...newSettings,
            }
          }));
        } else {
          set(state => ({
            settings: {
              ...state.settings,
              ...newSettings,
            }
          }));
        }
      },

      convertAmount: (amount, fromCurrency, toCurrency) => {
        if (fromCurrency === toCurrency) return amount;
        const rates = get().exchangeRates;
        
        if (!rates[fromCurrency] || !rates[toCurrency]) {
          return amount;
        }

        if (fromCurrency === 'USD') {
          return amount * rates[toCurrency];
        }

        if (toCurrency === 'USD') {
          return amount / rates[fromCurrency];
        }

        const inUSD = amount / rates[fromCurrency];
        return inUSD * rates[toCurrency];
      },
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useSettingsStore; 