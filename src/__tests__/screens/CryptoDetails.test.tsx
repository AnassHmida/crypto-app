import React from 'react';
import {render, act, fireEvent, waitFor} from '@testing-library/react-native';
import CryptoDetailsScreen from '../../screens/CryptoDetails';
import useCryptoStore from '../../store/useCryptoStore';
import ApiService from '../../services/api/ApiService';

const mockUseCryptoStore = useCryptoStore as jest.MockedFunction<typeof useCryptoStore>;

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
        historicalValues: { values: [], labels: [] },
        portfolioHistory: [],
        updateHistoricalValues: jest.fn(),
        recordPortfolioValue: jest.fn(),
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

  it('renders loading state initially', () => {
    const {getByTestId} = render(<CryptoDetailsScreen />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it.skip('renders chart when data is loaded', async () => {
    const mockApiService = ApiService.getInstance();
    const spy = jest.spyOn(mockApiService, 'getHistoricalPricesCustomRange');
    
    spy.mockImplementationOnce(() => 
      Promise.resolve([
        {
          rate_close: 45000,
          time_period_start: '2024-01-01T00:00:00.000Z'
        },
        {
          rate_close: 46000,
          time_period_start: '2024-01-02T00:00:00.000Z'
        }
      ])
    );

    const {getByTestId} = render(<CryptoDetailsScreen />);
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(getByTestId('price-chart')).toBeTruthy();
  });

  it('handles date filter selection', async () => {
    const {getByText} = render(<CryptoDetailsScreen />);
    
    // Open filter
    fireEvent.press(getByText('Filter'));
    
    // Wait for filter modal to be visible
    await waitFor(() => {
      expect(getByText('Custom Date Range')).toBeTruthy();
    });
  });

  it.skip('shows no data message when api returns empty data', async () => {
    const mockApiService = ApiService.getInstance();
    const spy = jest.spyOn(mockApiService, 'getHistoricalPricesCustomRange');
    spy.mockImplementationOnce(() => Promise.resolve([]));

    const {getByTestId} = render(<CryptoDetailsScreen />);
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(getByTestId('no-data-message')).toBeTruthy();
  }, 10000);

  it('displays correct crypto symbol', () => {
    const {getByText} = render(<CryptoDetailsScreen />);
    expect(getByText('BTC')).toBeTruthy();
  });
});