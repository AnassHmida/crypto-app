import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useChartStore from './useChartStore';

export interface Asset {
  symbol: string;
  amount: number;
  currentPrice: number;
  percentageChange: number;
  value: number;
}

interface AssetStore {
  assets: Asset[];
  totalValue: number;
  addAsset: (symbol: string, amount: number) => void;
  removeAsset: (symbol: string) => void;
  updateAssetAmount: (symbol: string, amount: number) => void;
  updatePrices: (updates: Record<string, { price: number, percentageChange: number }>) => void;
  getAsset: (symbol: string) => Asset | undefined;
  assetPrices: Record<string, {
    currentPrice: number;
    percentageChange: number;
  }>;
}

const useAssetStore = create<AssetStore>()(
  persist(
    (set, get) => ({
      assets: [],
      totalValue: 0,
      assetPrices: {},
      
      addAsset: (symbol, amount) => {
        set(state => ({
          assets: [...state.assets, {
            symbol,
            amount,
            currentPrice: 0,
            percentageChange: 0,
            value: 0,
          }],
        }));
      },

      removeAsset: (symbol) => {
        set(state => ({
          assets: state.assets.filter(asset => asset.symbol !== symbol),
        }));
      },

      updateAssetAmount: (symbol, amount) => {
        set(state => ({
          assets: state.assets.map(asset =>
            asset.symbol === symbol ? {
              ...asset,
              amount,
              value: amount * asset.currentPrice
            } : asset
          ),
        }));
      },

      getAsset: (symbol: string) => {
        return get().assets.find(a => a.symbol === symbol);
      },

      updatePrices: (updates) => {
        set(state => {
          let hasChanges = false;
          const newPrices = { ...state.assetPrices };
          
          Object.entries(updates).forEach(([symbol, update]) => {
            if (!newPrices[symbol] || newPrices[symbol].currentPrice !== update.price) {
              hasChanges = true;
              newPrices[symbol] = {
                currentPrice: update.price,
                percentageChange: update.percentageChange
              };
            }
          });

          if (!hasChanges) return state;


          const updatedAssets = state.assets.map(asset => {
            const price = newPrices[asset.symbol]?.currentPrice || 0;
            return {
              ...asset,
              currentPrice: price,
              value: asset.amount * price
            };
          });

          return {
            ...state,
            assets: updatedAssets,
            assetPrices: newPrices,
            totalValue: updatedAssets.reduce((total, asset) => total + asset.value, 0)
          };
        });
      },
    }),
    {
      name: 'asset-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAssetStore; 