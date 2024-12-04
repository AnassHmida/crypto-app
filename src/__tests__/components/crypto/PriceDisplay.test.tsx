import React from 'react';
import {render} from '@testing-library/react-native';
import PriceDisplay from '../../../components/crypto/PriceDisplay';
import useCryptoStore from '../../../store/useCryptoStore';

jest.mock('../../../store/useCryptoStore');

const mockUseCryptoStore = useCryptoStore as jest.MockedFunction<typeof useCryptoStore>;

describe('PriceDisplay', () => {
  beforeEach(() => {
    mockUseCryptoStore.mockImplementation((selector) => {
      const store = {
        settings: { 
          currency: 'USD',
          realTimeUpdates: false,
          priceAlerts: false
        },
        assets: [{
          symbol: 'bitcoin',
          currentPrice: 45000,
          percentageChange: 2.5,
          amount: 0,
          value: 0
        }],
        exchangeRates: {},
        totalValue: 0,
        historicalValues: { values: [], labels: [] },
        isLoading: false,
        portfolioHistory: [],
        addAsset: () => {},
        removeAsset: () => {},
        updateAssetAmount: () => {},
        updateSettings: () => {},
        fetchPrices: () => {},
        fetchExchangeRates: () => {},
        calculateTotalValue: () => {},
        reset: () => {},
        updatePrices: () => {},
        convertAmount: () => 0,
        updateHistoricalValues: () => {},
        recordPortfolioValue: () => {}
      };
      return selector(store);
    });
  });

  it('renders price and percentage change', () => {
    const props = {
      cryptoId: 'bitcoin'
    };
    
    const {getByText} = render(<PriceDisplay {...props} />);
    expect(getByText('USD 45000.00')).toBeTruthy();
    expect(getByText('+2.50%')).toBeTruthy();
  });

  it('handles negative percentage change', () => {
    mockUseCryptoStore.mockImplementation((selector) => {
      const store = {
        settings: { 
          currency: 'USD',
          realTimeUpdates: false,
          priceAlerts: false
        },
        assets: [{
          symbol: 'bitcoin',
          currentPrice: 45000,
          percentageChange: -2.5,
          amount: 0,
          value: 0
        }],
        exchangeRates: {},
        totalValue: 0,
        historicalValues: { values: [], labels: [] },
        isLoading: false,
        portfolioHistory: [],
        addAsset: () => {},
        removeAsset: () => {},
        updateAssetAmount: () => {},
        updateSettings: () => {},
        fetchPrices: () => {},
        fetchExchangeRates: () => {},
        calculateTotalValue: () => {},
        reset: () => {},
        updatePrices: () => {},
        convertAmount: () => 0,
        updateHistoricalValues: () => {},
        recordPortfolioValue: () => {}
      };
      return selector(store);
    });

    const props = {
      cryptoId: 'bitcoin'
    };
    
    const {getByText} = render(<PriceDisplay {...props} />);
    expect(getByText('-2.50%')).toBeTruthy();
  });
}); 