import React from 'react';
import {render} from '@testing-library/react-native';
import PriceDisplay from '../../../components/crypto/PriceDisplay';

describe('PriceDisplay', () => {
  it('renders price and percentage change', () => {
    const props = {
      currentPrice: 45000,
      percentageChange: 2.5,
      currency: 'USD'
    };
    
    const {getByText} = render(<PriceDisplay {...props} />);
    expect(getByText('USD 45000.00')).toBeTruthy();
    expect(getByText('+2.5%')).toBeTruthy();
  });

  it('handles negative percentage change', () => {
    const props = {
      currentPrice: 45000,
      percentageChange: -2.5,
      currency: 'USD'
    };
    
    const {getByText} = render(<PriceDisplay {...props} />);
    expect(getByText('-2.5%')).toBeTruthy();
  });
}); 