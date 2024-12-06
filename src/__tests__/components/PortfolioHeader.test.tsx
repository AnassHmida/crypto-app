import React from 'react';
import {render} from '@testing-library/react-native';
import PortfolioHeader from '../../components/portfolio/PortfolioHeader';

describe('PortfolioHeader', () => {
  it('renders portfolio value correctly', () => {
    const {getByText} = render(<PortfolioHeader totalValue={50000} />);
    expect(getByText('USD 50000.00')).toBeTruthy();
    expect(getByText('Portfolio Value')).toBeTruthy();
  });

  it('renders assets title', () => {
    const {getByText} = render(<PortfolioHeader totalValue={50000} />);
    expect(getByText('Assets')).toBeTruthy();
  });
}); 