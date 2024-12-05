import React from 'react';
import {render} from '@testing-library/react-native';
import AssetBalance from '../../../components/crypto/AssetBalance';

describe('AssetBalance', () => {
  const props = {
    value: 45000,
    amount: 1.5,
    symbol: 'BTC',
    currency: 'USD'
  };

  it('renders balance information', () => {
    const {getByText} = render(<AssetBalance {...props} />);
    expect(getByText('Your balance')).toBeTruthy();
    expect(getByText('USD 45000.00')).toBeTruthy();
    expect(getByText('1.5 BTC')).toBeTruthy();
  });
}); 