import React from 'react';
import {render, act, fireEvent, waitFor} from '@testing-library/react-native';
import CryptoDetailsScreen from '../../screens/CryptoDetails';
import useAssetStore from '../../store/useAssetStore';
import useSettingsStore from '../../store/useSettingsStore';
import useChartStore from '../../store/useChartStore';
import ApiService from '../../services/api/ApiService';

jest.mock('@react-navigation/native', () => ({
  useRoute: () => ({
    params: {
      cryptoId: 'btc',
    },
  }),
}));

const mockUseAssetStore = useAssetStore as jest.MockedFunction<typeof useAssetStore>;

jest.mock('../../store/useAssetStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseSettingsStore = useSettingsStore as jest.MockedFunction<typeof useSettingsStore>;

jest.mock('../../store/useSettingsStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseChartStore = useChartStore as jest.MockedFunction<typeof useChartStore>;

jest.mock('../../store/useChartStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../services/api/ApiService', () => ({
  getInstance: () => ({
    getHistoricalPricesCustomRange: jest.fn()
  })
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
    
    mockUseAssetStore.mockImplementation((selector) => {
      const store = {
        assets: [mockAsset],
        assetPrices: {
          BTC: {
            currentPrice: 30000,
            percentageChange: 2.5
          }
        },
        getAsset: () => mockAsset,
        totalValue: 45000,
        addAsset: jest.fn(),
        removeAsset: jest.fn(),
        updateAssetAmount: jest.fn(),
        updatePrices: jest.fn()
      };
      return selector(store);
    });

    mockUseSettingsStore.mockImplementation((selector) => {
      const store = {
        settings: {
          currency: 'USD',
          realTimeUpdates: true,
          priceAlerts: true,
        },
        convertAmount: jest.fn().mockReturnValue(30000),
        exchangeRates: {},
        lastRatesFetch: Date.now(),
        fetchExchangeRates: jest.fn(),
        updateSettings: jest.fn()
      };
      return selector(store);
    });

    mockUseChartStore.mockImplementation((selector) => {
      const store = {
        priceCharts: {
          btc: {
            values: [29000, 30000, 31000],
            labels: ['2024-01-01', '2024-01-02', '2024-01-03'],
            lastUpdated: new Date().toISOString()
          }
        },
        updatePriceChart: jest.fn(),
        portfolioHistory: [
          { timestamp: '2024-01-01', value: 29000 },
          { timestamp: '2024-01-02', value: 30000 },
          { timestamp: '2024-01-03', value: 31000 }
        ],
        updatePortfolioHistory: jest.fn()
      };
      return selector(store);
    });
  });

  it('renders loading state initially', () => {
    const {getByTestId} = render(<CryptoDetailsScreen />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('displays correct crypto symbol', () => {
    const {getByText} = render(<CryptoDetailsScreen />);
    expect(getByText('BTC')).toBeTruthy();
  });

  it('displays price information', async () => {
    const {getByText} = render(<CryptoDetailsScreen />);
    await waitFor(() => {
      expect(getByText('USD 30000.00')).toBeTruthy();
      expect(getByText('+2.50%')).toBeTruthy();
    });
  });

  it('handles date filter selection', async () => {
    const {getByText} = render(<CryptoDetailsScreen />);
    fireEvent.press(getByText('Filter'));
    await waitFor(() => {
      expect(getByText('Custom Date Range')).toBeTruthy();
    });
  });
});