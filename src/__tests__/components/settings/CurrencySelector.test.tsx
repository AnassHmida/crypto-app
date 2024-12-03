import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CurrencySelector from '../../../components/settings/CurrencySelector';

describe('CurrencySelector', () => {
  const currencies = ['USD', 'EUR', 'GBP'];
  const onSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all currency options', () => {
    const {getAllByTestId} = render(
      <CurrencySelector
        currencies={currencies}
        selectedCurrency="USD"
        onSelect={onSelect}
      />
    );
    expect(getAllByTestId('currency-option')).toHaveLength(3);
  });

  it('highlights selected currency', () => {
    const {getByTestId} = render(
      <CurrencySelector
        currencies={['USD', 'EUR']}
        selectedCurrency="USD"
        onSelect={() => {}}
      />
    );
    const selectedOption = getByTestId('currency-option-USD');
    expect(selectedOption).toBeTruthy();
  });

  it('calls onSelect when currency is pressed', () => {
    const {getByTestId} = render(
      <CurrencySelector
        currencies={currencies}
        selectedCurrency="USD"
        onSelect={onSelect}
      />
    );
    fireEvent.press(getByTestId('currency-option-USD'));
    expect(onSelect).toHaveBeenCalledWith('USD');
  });
}); 