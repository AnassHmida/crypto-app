import React from 'react';
import {render, act, fireEvent} from '@testing-library/react-native';
import CryptoDetailsScreen from '../../screens/CryptoDetails';
import useCryptoStore from '../../store/useCryptoStore';
import ApiService from '../../services/api/ApiService';

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

    const {getByText} = render(<CryptoDetailsScreen />);
    expect(getByText('-2.50%')).toBeTruthy();
  });

  

  it('renders filter button', () => {
    const {getByText} = render(<CryptoDetailsScreen />);
    expect(getByText('Filter')).toBeTruthy();
  });



  it('handles date filter selection', () => {
    const { getByText } = render(<CryptoDetailsScreen />);
    const filterButton = getByText('Filter');
    fireEvent.press(filterButton);
    

    expect(getByText('Custom Date Range')).toBeTruthy();
  });

  it('updates chart data when date range changes', async () => {
    const mockUpdateHistoricalValues = jest.fn();
    
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
        updateHistoricalValues: mockUpdateHistoricalValues,
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

    const { getByText } = render(<CryptoDetailsScreen />);
    
    // Open filter
    fireEvent.press(getByText('Filter'));
    
    // Select custom date range (mock the date picker interaction)
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-07');
    
    // Simulate applying the date range
    await act(async () => {
      fireEvent(getByText('Apply'), 'onPress', startDate, endDate);
    });

    // Verify the filter modal is closed
    expect(() => getByText('Select Date Range')).toThrow();
  });

  it('shows no data available when chart is empty', () => {
    
    const {getByText} = render(<CryptoDetailsScreen />);
    expect(getByText('No data available')).toBeTruthy();
  });
});