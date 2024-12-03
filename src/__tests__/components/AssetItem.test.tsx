import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AssetItem from '../../components/AssetItem';

describe('AssetItem', () => {
  const defaultProps = {
    symbol: 'BTC',
    amount: 1.5,
    value: 45000,
    percentageChange: 2.5,
    onPress: jest.fn(),
    currency: 'USD'
  };

  it('renders asset information correctly', () => {
    const {getByText} = render(<AssetItem {...defaultProps} />);
    expect(getByText('BTC')).toBeTruthy();
    expect(getByText('1.5 BTC')).toBeTruthy();
    expect(getByText('USD 45000.00')).toBeTruthy();
    expect(getByText('+2.50%')).toBeTruthy();
  });

  it('handles negative percentage changes', () => {
    const props = {...defaultProps, percentageChange: -2.5};
    const {getByText} = render(<AssetItem {...props} />);
    expect(getByText('-2.50%')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(<AssetItem {...defaultProps} onPress={onPress} />);
    fireEvent.press(getByTestId('asset-item'));
    expect(onPress).toHaveBeenCalled();
  });
}); 