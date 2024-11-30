import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Asset {
  symbol: string;
  amount: number;
  value: number;
  currentPrice: number;
  percentageChange: number;
}

interface Settings {
  currency: string;
  priceAlerts: boolean;
  portfolioAlerts: boolean;
  realTimeUpdates: boolean;
}

interface PortfolioStore {

  assets: Asset[];
  totalValue: number;
  currency: string;
  isLoading: boolean;
  error: string | null;
  settings: Settings;


  addAsset: (symbol: string, amount: number) => void;
  removeAsset: (symbol: string) => void;
  updateAssetAmount: (symbol: string, amount: number) => void;
  updatePrices: (prices: Record<string, number>) => void;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const useCryptoStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      assets: [
        {
          symbol: 'BTC',
          amount: 2.42,
          value: 8888.8888,
          currentPrice: 3672.68,
          percentageChange: 2.5,
        },
      ],
      totalValue: 8888.8888,
      currency: 'DZD',
      isLoading: false,
      error: null,
      settings: {
        currency: 'DZD',
        priceAlerts: true,
        portfolioAlerts: true,
        realTimeUpdates: true,
      },


      addAsset: (symbol, amount) => {
        set(state => {
          const newAsset = {
            symbol,
            amount,
            value: 0,
            currentPrice: 0,
            percentageChange: 0,
          };
          
          return {
            assets: [...state.assets, newAsset],
          };
        });
      },
      removeAsset: (symbol) => {
        set(state => {
          const index = state.assets.findIndex(asset => asset.symbol === symbol);
          if (index !== -1) {
            const removedAsset = state.assets[index];
            return {
              assets: state.assets.filter(asset => asset.symbol !== symbol),
            };
          }
          return state;
        });
      },
      updateAssetAmount: (symbol, amount) => {
        set(state => {
          const index = state.assets.findIndex(asset => asset.symbol === symbol);
          if (index !== -1) {
            const updatedAsset = state.assets[index];
            return {
              assets: state.assets.map(asset =>
                asset.symbol === symbol ? {
                  ...asset,
                  amount: amount,
                  value: amount * asset.currentPrice,
                } : asset
              ),
            };
          }
          return state;
        });
      },
      updatePrices: (prices) => {
        set(state => {
          return {
            assets: state.assets.map(asset => ({
              ...asset,
              value: asset.amount * prices[asset.symbol],
              currentPrice: prices[asset.symbol],
              percentageChange: ((prices[asset.symbol] - asset.currentPrice) / asset.currentPrice) * 100,
            })),
          };
        });
      },
      updateSettings: (newSettings) => {
        set(state => ({
          settings: {
            ...state.settings,
            ...newSettings,
          }
        }));
      },
    }),
    {
      name: 'crypto-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        assets: state.assets,
        settings: state.settings,
        currency: state.currency,
      }),
    }
  )
);

export default useCryptoStore; 