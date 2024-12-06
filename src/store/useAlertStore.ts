import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notificationService from '../services/notifications';

export interface PriceAlert {
  id: string;
  symbol: string;
  targetPrice: number;
  isAbove: boolean;
  createdAt: string;
}

interface AlertStore {
  alerts: PriceAlert[];
  addAlert: (symbol: string, targetPrice: number, isAbove: boolean) => void;
  removeAlert: (id: string) => void;
  checkAlerts: (prices: Record<string, { price: number }>) => void;
}

const useAlertStore = create<AlertStore>()(
  persist(
    (set, get) => ({
      alerts: [],

      addAlert: (symbol, targetPrice, isAbove) => {
        set(state => ({
          alerts: [...state.alerts, {
            id: Date.now().toString(),
            symbol,
            targetPrice,
            isAbove,
            createdAt: new Date().toISOString()
          }]
        }));
      },

      removeAlert: (id) => {
        set(state => ({
          alerts: state.alerts.filter(alert => alert.id !== id)
        }));
      },

      checkAlerts: (prices) => {
        const triggeredAlerts: string[] = [];
        
        get().alerts.forEach(alert => {
          const currentPrice = prices[alert.symbol]?.price;
          if (currentPrice) {
            if (
              (alert.isAbove && currentPrice >= alert.targetPrice) ||
              (!alert.isAbove && currentPrice <= alert.targetPrice)
            ) {
              notificationService.sendPriceAlert(
                alert.symbol,
                alert.targetPrice,
                alert.isAbove
              );
              triggeredAlerts.push(alert.id);
            }
          }
        });

        if (triggeredAlerts.length > 0) {
          set(state => ({
            alerts: state.alerts.filter(alert => !triggeredAlerts.includes(alert.id))
          }));
        }
      },
    }),
    {
      name: 'alert-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAlertStore; 