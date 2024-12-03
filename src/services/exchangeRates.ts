import AsyncStorage from '@react-native-async-storage/async-storage';
import { AVAILABLE_CURRENCIES } from '../screens/Settings';
import useCryptoStore from '../store/useCryptoStore';
import ApiService from './api/ApiService';
const apiService = ApiService.getInstance();

const RATES_CACHE_KEY = '@exchange_rates';
const CACHE_DURATION = 60 * 60 * 1000; 

interface CachedRates {
  timestamp: number;
  rates: Record<string, number>;
}

export const getExchangeRates = async (): Promise<Record<string, number> | null> => {
  try {
    const storeRates = useCryptoStore.getState().exchangeRates;
    if (Object.keys(storeRates).length > 0) {
      return storeRates;
    }

    const cached = await AsyncStorage.getItem(RATES_CACHE_KEY);
    if (cached) {
      const { rates }: CachedRates = JSON.parse(cached);
      return { USD: 1, ...rates };
    }

    const rates = await apiService.getExchangeRates(AVAILABLE_CURRENCIES);

    await AsyncStorage.setItem(RATES_CACHE_KEY, JSON.stringify({
      timestamp: Date.now(),
      rates
    }));
    
    useCryptoStore.setState({ exchangeRates: rates });

    return rates;
  } catch (error) {
    console.error('Exchange rates error:', error);
    
    try {
      const cached = await AsyncStorage.getItem(RATES_CACHE_KEY);
      if (cached) {
        const { rates }: CachedRates = JSON.parse(cached);
        return { USD: 1, ...rates };
      }
    } catch (e) {
      console.error('Failed to get cached rates:', e);
    }
    return null;
  }
};

