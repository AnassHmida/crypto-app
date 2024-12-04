import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getExchangeRates } from '../services/exchangeRates';

interface Asset {
  symbol: string;
  amount: number;
  currentPrice: number;
  percentageChange: number;
  value: number;
}

interface Settings {
  currency: string;
  realTimeUpdates: boolean;
  priceAlerts: boolean; 
}

interface PortfolioHistory {
  timestamp: string;
  value: number;
}

interface PortfolioStore {
  assets: Asset[];
  settings: Settings;
  exchangeRates: Record<string, number>;
  totalValue: number;
  historicalValues: {
    values: number[];
    labels: string[];
  };
  isLoading: boolean;
  portfolioHistory: PortfolioHistory[];

  addAsset: (symbol: string, amount: number) => void;
  removeAsset: (symbol: string) => void;
  updateAssetAmount: (symbol: string, amount: number) => void;
  updatePrices: (updates: Record<string, { price: number, percentageChange: number }>) => void;
  updateSettings: (newSettings: Partial<Settings>) => void;
  convertAmount: (amount: number, fromCurrency: string, toCurrency: string) => number;
  updateHistoricalValues: (value: number) => void;
  recordPortfolioValue: (value: number) => void;
}

const useCryptoStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      assets: [
        {
          symbol: 'BTC',
          amount: 2.42,
          currentPrice: 95900,
          percentageChange: 2.5,
          value: 2.42 * 95900,
        },
      ],
      settings: {
        currency: 'USD',
        realTimeUpdates: true,
        priceAlerts: false,
      },
      exchangeRates: {},
      totalValue: 2.42 * 95900,
      historicalValues: {
        values: [],
        labels: [],
      },
      isLoading: false,
      portfolioHistory: [],

      addAsset: (symbol, amount) => {
        set(state => {
          const newAsset = {
            symbol,
            amount,
            currentPrice: 0,
            percentageChange: 0,
            value: 0,
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
                  currentPrice: updatedAsset.currentPrice,
                } : asset
              ),
            };
          }
          return state;
        });
      },
      updatePrices: (updates) => {
        console.log('💰 Received price updates:', updates);
        set(state => {
          const assets = state.assets.map(asset => {
            const update = updates[asset.symbol];
            if (update) {
              const price = state.settings.currency === 'USD' 
                ? update.price 
                : get().convertAmount(update.price, 'USD', state.settings.currency);
              
              return {
                ...asset,
                currentPrice: price,
                percentageChange: update.percentageChange,
                value: price * asset.amount,
              };
            }
            return asset;
          });
      
          const newTotalValue = assets.reduce((total, asset) => total + asset.value, 0);
      
          const now = new Date();
    
            const newHistory = [...state.portfolioHistory, {
              timestamp: now.toISOString(),
              value: newTotalValue
            }];
            
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            const filteredHistory = newHistory.filter(entry => 
              new Date(entry.timestamp) > thirtyDaysAgo
            );
            console.log('📈 Filtered portfolio history:', filteredHistory);
            return { 
              assets,
              totalValue: newTotalValue,
              portfolioHistory: filteredHistory
            };
          

          
        });
      },
      updateSettings: async (newSettings) => {
        const newCurrency = newSettings.currency;
        if (newCurrency) {
          const rates = await getExchangeRates();
          if (!rates) {
            console.warn('No exchange rates available, keeping current prices');
            set(state => ({
              settings: {
                ...state.settings,
                ...newSettings,
              }
            }));
            return;
          }

          set(state => {
            const oldCurrency = state.settings.currency;
            
            set({ exchangeRates: rates });
            

            const assets = state.assets.map(asset => ({
              ...asset,
              currentPrice: get().convertAmount(asset.currentPrice, oldCurrency, newCurrency),
              value: get().convertAmount(asset.value, oldCurrency, newCurrency)
            }));

            const newTotalValue = assets.reduce((total, asset) => total + asset.value, 0);

            return {
              assets,
              totalValue: newTotalValue,
              settings: {
                ...state.settings,
                ...newSettings,
              }
            };
          });
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
          console.warn(`Missing rate for ${fromCurrency} or ${toCurrency}`);
          return amount;
        }
        

        if (fromCurrency === 'USD') {
          return amount * rates[toCurrency]; 
        }
        

        if (toCurrency === 'USD') {
          return amount / rates[fromCurrency]; 
        }
        

        const inUSD = amount / rates[fromCurrency];
        const final = inUSD * rates[toCurrency];
        
        console.log(`Converting ${fromCurrency} to ${toCurrency}:`, {
          start: `${fromCurrency} ${amount}`,
          throughUSD: `USD ${inUSD}`,
          final: `${toCurrency} ${final}`,
          rates: {
            [`${fromCurrency}_rate`]: rates[fromCurrency],
            [`${toCurrency}_rate`]: rates[toCurrency]
          }
        });
        
        return final;
      },
      updateHistoricalValues: (value) => {
        set(state => {
          const date = new Date();
          const label = `${date.getDate()}/${date.getMonth() + 1}`;
          
          return {
            historicalValues: {
              values: [...state.historicalValues.values, value],
              labels: [...state.historicalValues.labels, label],
            }
          };
        });
      },
      recordPortfolioValue: (value: number) => {
        const now = new Date();
        console.log('📊 Recording portfolio value:', {
          timestamp: now.toISOString(),
          value: value
        });

        set(state => {
          const newEntry = {
            timestamp: now.toISOString(),
            value: value
          };

          const newHistory = [...state.portfolioHistory, newEntry];
  
          return {
            portfolioHistory: newHistory
          };
        });
      },
    }),
    {
      name: 'crypto-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        assets: state.assets,
        settings: state.settings,
        exchangeRates: state.exchangeRates,
        totalValue: state.totalValue,
        historicalValues: state.historicalValues,
        isLoading: state.isLoading,
        portfolioHistory: state.portfolioHistory,
      }),
    }
  )
);

export default useCryptoStore; 