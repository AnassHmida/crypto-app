import React from 'react';
import { render } from '@testing-library/react-native';
import PriceDisplay from '../../../components/crypto/PriceDisplay';
import useAssetStore from '../../../store/useAssetStore';
import useSettingsStore from '../../../store/useSettingsStore';

jest.mock('../../../store/useAssetStore');
jest.mock('../../../store/useSettingsStore');

describe('PriceDisplay', () => {
  beforeEach(() => {
    (useAssetStore as jest.Mock).mockImplementation((selector) => {
      const store = {
        assetPrices: {
          BTC: {
            currentPrice: 30000,
            percentageChange: 2.5
          }
        }
      };
      return selector(store);
    });

    (useSettingsStore as jest.Mock).mockImplementation((selector) => {
      const store = {
        settings: { currency: 'USD' },
        convertAmount: (amount: number) => amount
      };
      return selector(store);
    });
  });

  it('renders price and percentage change', () => {
    const { getByText } = render(
      <PriceDisplay 
        cryptoId="BTC"
        showPercentage={true}
      />
    );
    
    expect(getByText('USD 30000.00')).toBeTruthy();
    expect(getByText('+2.50%')).toBeTruthy();
  });
});