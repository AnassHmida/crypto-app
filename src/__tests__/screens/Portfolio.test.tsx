import React from 'react';
import {render} from '@testing-library/react-native';
import PortfolioScreen from '../../screens/Portfolio';
import * as useCryptoStoreModule from '../../store/useCryptoStore';

jest.mock('../../store/useCryptoStore');
const mockUseCryptoStore = jest.fn();
(useCryptoStoreModule.default as unknown as jest.Mock) = mockUseCryptoStore;

describe('PortfolioScreen', () => {
  beforeEach(() => {
    mockUseCryptoStore.mockReturnValue({
      assets: [
        {symbol: 'BTC', amount: 1, value: 40000, percentageChange: 2.5},
      ],
      totalValue: 40000,
      isLoading: false,
      settings: {
        currency: 'DZD',
        priceAlerts: true,
        portfolioAlerts: true,
        realTimeUpdates: true,
      }
    });
  });

  it('renders portfolio value', () => {
    const {getByText} = render(<PortfolioScreen />);
    expect(getByText('DZD 40000')).toBeTruthy();
  });

  it('renders asset list', () => {
    const {getByText} = render(<PortfolioScreen />);
    expect(getByText('BTC')).toBeTruthy();
  });
});