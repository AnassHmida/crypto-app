import React from 'react';
import {render} from '@testing-library/react-native';
import CryptoDetailsScreen from '../../screens/CryptoDetails';
import useCryptoStore from '../../store/useCryptoStore';

const mockUseCryptoStore = useCryptoStore as unknown as jest.MockedFunction<typeof useCryptoStore>;

// Mock the navigation hook
jest.mock('@react-navigation/native', () => ({
  useRoute: () => ({
    params: {
      cryptoId: 'btc',
    },
  }),
}));

// Mock the store
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
    mockUseCryptoStore.mockImplementation(() => mockAsset);
  });

  it('renders asset details correctly', () => {
    const {getByText} = render(<CryptoDetailsScreen />);
    
    expect(getByText('BTC')).toBeTruthy();
    expect(getByText('DZD 30000.00')).toBeTruthy();
    expect(getByText('+2.50%')).toBeTruthy();
    expect(getByText('DZD 45000.00')).toBeTruthy();
    expect(getByText(/1.5 BTC/)).toBeTruthy();
  });

  it('handles negative percentage changes', () => {
    const negativeAsset = {
      ...mockAsset,
      percentageChange: -2.5,
    };
    mockUseCryptoStore.mockImplementation(() => negativeAsset);

    const {getByText} = render(<CryptoDetailsScreen />);
    expect(getByText('-2.50%')).toBeTruthy();
  });

  it('renders not found message when asset doesnt exist', () => {
    mockUseCryptoStore.mockImplementation(() => undefined);
    
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