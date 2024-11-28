import {create} from 'zustand';

interface PortfolioStore {
  assets: {
    symbol: string;
    amount: number;
    value: number;
  }[];
  totalValue: number;
  isLoading: boolean;
}

const useCryptoStore = create<PortfolioStore>((set) => ({
  assets: [
    {symbol: 'BTC', amount: 2.42, value: 8888.8888},
  ],
  totalValue: 8888.8888,
  isLoading: false,
}));

export default useCryptoStore; 