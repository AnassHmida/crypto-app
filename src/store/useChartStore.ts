import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PriceChart {
  values: number[];
  labels: string[];
  lastUpdated: string;
}

interface ChartStore {
  portfolioHistory: Array<{
    timestamp: string;
    value: number;
  }>;
  priceCharts: Record<string, PriceChart>;
  updatePortfolioHistory: (data: Array<{timestamp: string, value: number}>) => void;
  updatePriceChart: (symbol: string, data: PriceChart) => void;
}

const useChartStore = create<ChartStore>()(
  persist(
    (set) => ({
      portfolioHistory: [],
      priceCharts: {},
      
      updatePortfolioHistory: (data) => {
        set({ portfolioHistory: data });
      },

      updatePriceChart: (symbol, data) => {
        set(state => ({
          priceCharts: {
            ...state.priceCharts,
            [symbol]: data
          }
        }));
      }
    }),
    {
      name: 'chart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useChartStore; 