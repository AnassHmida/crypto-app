import React from 'react';
import {Text} from 'react-native';

interface CurrencyValueProps {
  value: number;
  currency?: string;
  style?: object;
}

const CurrencyValue = ({value, currency = 'USD', style}: CurrencyValueProps) => (
  <Text style={style}>
    {currency} {value.toFixed(2)}
  </Text>
);

export default CurrencyValue; 