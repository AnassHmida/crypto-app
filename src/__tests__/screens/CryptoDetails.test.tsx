import React from 'react';
import {render} from '@testing-library/react-native';
import CryptoDetailsScreen from '../../screens/CryptoDetails';
import useCryptoStore from '../../store/useCryptoStore';

const mockUseCryptoStore = useCryptoStore as unknown as jest.MockedFunction<typeof useCryptoStore>;


jest.mock('@react-navigation/native', () => ({
  useRoute: () => ({
    params: {
      cryptoId: 'btc',
    },
  }),
}));

jest.mock('../../store/useCryptoStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('CryptoDetailsScreen', () => {
  const mockAsset = {
    symbol: 'BTC',
    amount: 1.5,
    value: 45000,
    currentPrice: 30000,
    percentageChange: 2.5,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCryptoStore.mockImplementation((selector) => {
      const store = {
        assets: [mockAsset],
        settings: {
          currency: 'USD',
          realTimeUpdates: false,
          priceAlerts: false
        },
        exchangeRates: {},
        totalValue: 0,
        isLoading: false,
        addAsset: jest.fn(),
        removeAsset: jest.fn(),
        updateAsset: jest.fn(),
        fetchExchangeRates: jest.fn(),
        setCurrency: jest.fn(),
        updateAssetAmount: jest.fn(),
        updatePrices: jest.fn(),
        updateSettings: jest.fn(),
        convertAmount: jest.fn(),
      };
      return selector(store);
    });
  });

  it('renders asset details correctly', () => {
    const {getByText} = render(<CryptoDetailsScreen />);
    
    expect(getByText('BTC')).toBeTruthy();
    expect(getByText('USD 30000.00')).toBeTruthy();
    expect(getByText('+2.50%')).toBeTruthy();
    expect(getByText('USD 45000.00')).toBeTruthy();
    expect(getByText('1.5 BTC')).toBeTruthy();
  });

  it('handles negative percentage changes', () => {
    const negativeAsset = {
      ...mockAsset,
      percentageChange: -2.5,
    };
    
    mockUseCryptoStore.mockImplementation((selector) => {
      const store = {
        assets: [negativeAsset],
        settings: {
          currency: 'USD',
          realTimeUpdates: false,
          priceAlerts: false
        },
        exchangeRates: {},
        totalValue: 0,
        isLoading: false,
        addAsset: jest.fn(),
        removeAsset: jest.fn(),
        updateAsset: jest.fn(),
        fetchExchangeRates: jest.fn(),
        setCurrency: jest.fn(),
        updateAssetAmount: jest.fn(),
        updatePrices: jest.fn(),
        updateSettings: jest.fn(),
        convertAmount: jest.fn(),
      };
      return selector(store);
    });

    const {getByText} = render(<CryptoDetailsScreen />);
    expect(getByText('-2.50%')).toBeTruthy();
  });

  it('renders not found message when asset doesnt exist', () => {
    mockUseCryptoStore.mockImplementation((selector) => {
      const store = {
        assets: [],
        settings: {
          currency: 'USD',
          realTimeUpdates: false,
          priceAlerts: false
        },
        exchangeRates: {},
        totalValue: 0,
        isLoading: false,
        addAsset: jest.fn(),
        removeAsset: jest.fn(),
        updateAsset: jest.fn(),
        fetchExchangeRates: jest.fn(),
        setCurrency: jest.fn(),
        updateAssetAmount: jest.fn(),
        updatePrices: jest.fn(),
        updateSettings: jest.fn(),
        convertAmount: jest.fn(),
      };
      return selector(store);
    });
    
    const {getByText} = render(<CryptoDetailsScreen />);
    expect(getByText('Asset not found')).toBeTruthy();
  });

  it('renders filter button', () => {
    const {getByText} = render(<CryptoDetailsScreen />);
    expect(getByText('Filter')).toBeTruthy();
  });

  it('renders historical chart placeholder', () => {
    const {getByText} = render(<CryptoDetailsScreen />);
    expect(getByText('Historical asset prices chart')).toBeTruthy();
  });
});