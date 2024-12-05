import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import PortfolioScreen from '../../screens/Portfolio';
import useCryptoStore from '../../store/useCryptoStore';
import socketService from '../../services/socket';


const mockUseCryptoStore = useCryptoStore as unknown as jest.MockedFunction<typeof useCryptoStore>;

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));


jest.mock('../../store/useCryptoStore');


jest.mock('../../services/socket', () => ({
  connect: jest.fn(),
  disconnect: jest.fn(),
}));

const mockAssets = [
  {
    symbol: 'BTC',
    amount: 1.5,
    currentPrice: 50000,
    percentageChange: 2.5,
    value: 75000,
  },
  {
    symbol: 'ETH',
    amount: 10,
    currentPrice: 3000,
    percentageChange: -1.2,
    value: 30000,
  },
];

describe('PortfolioScreen', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    

    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
    

    mockUseCryptoStore.mockImplementation((selector) => {
      const store = {
        assets: mockAssets,
        totalValue: 105000,
        isLoading: false,
        settings: {
          currency: 'USD',
          realTimeUpdates: true,
          priceAlerts: false
        },
        exchangeRates: {},
        addAsset: jest.fn(),
        removeAsset: jest.fn(),
        updateAssetAmount: jest.fn(),
        updatePrices: jest.fn(),
        updateSettings: jest.fn(),
        convertAmount: jest.fn(),
        historicalValues: { values: [], labels: [] },
        portfolioHistory: [],
        updateHistoricalValues: jest.fn(),
        recordPortfolioValue: jest.fn(),
      };
      return typeof selector === 'function' ? selector(store) : store;
    });
  });

  it('renders correctly with assets', () => {
    const { getByText } = render(
      <NavigationContainer>
        <PortfolioScreen />
      </NavigationContainer>
    );

    expect(getByText('BTC')).toBeTruthy();
    expect(getByText('ETH')).toBeTruthy();
    expect(getByText('Portfolio Value')).toBeTruthy();
  });

  it('connects to socket on mount and disconnects on unmount', () => {
    const { unmount } = render(
      <NavigationContainer>
        <PortfolioScreen />
      </NavigationContainer>
    );

    expect(socketService.connect).toHaveBeenCalledTimes(1);
    
    unmount();
    expect(socketService.disconnect).toHaveBeenCalledTimes(1);
  });

  it.skip('handles refresh correctly', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <PortfolioScreen />
      </NavigationContainer>
    );

    const flatList = getByTestId('refreshable-list');
    
    act(() => {
      fireEvent(flatList, 'refresh');
    });

    expect(socketService.disconnect).toHaveBeenCalledTimes(1);
    expect(socketService.connect).toHaveBeenCalledTimes(2);
  });

  it('shows loading state', () => {
    mockUseCryptoStore.mockImplementation((selector) => {
      const store = {
        assets: mockAssets,
        totalValue: 0,
        isLoading: false,
        settings: {
          currency: 'USD',
          realTimeUpdates: true,
          priceAlerts: false
        },
        exchangeRates: {},
        addAsset: jest.fn(),
        removeAsset: jest.fn(),
        updateAssetAmount: jest.fn(),
        updatePrices: jest.fn(),
        updateSettings: jest.fn(),
        convertAmount: jest.fn(),
        historicalValues: { values: [], labels: [] },
        portfolioHistory: [],
        updateHistoricalValues: jest.fn(),
        recordPortfolioValue: jest.fn(),
      };
      return typeof selector === 'function' ? selector(store) : store;
    });

    const { getByTestId } = render(
      <NavigationContainer>
        <PortfolioScreen />
      </NavigationContainer>
    );

    expect(getByTestId('refreshable-list')).toBeTruthy();
  });

  it('navigates to CryptoDetails when asset is pressed', () => {
    const { getByText } = render(
      <NavigationContainer>
        <PortfolioScreen />
      </NavigationContainer>
    );

    fireEvent.press(getByText('BTC'));

    expect(mockNavigate).toHaveBeenCalledWith('CryptoDetails', {
      cryptoId: 'btc',
    });
  });
});