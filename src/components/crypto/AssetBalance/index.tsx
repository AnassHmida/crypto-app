import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';

interface AssetBalanceProps {
  value: number;
  amount: number;
  symbol: string;
  currency: string;
}

const AssetBalance = ({value, amount, symbol, currency}: AssetBalanceProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>Your balance</Text>
    <Text style={styles.amount}>
      {currency} {value.toFixed(2)}
    </Text>
    <Text style={styles.cryptoAmount}>
      {amount} {symbol}
    </Text>
  </View>
);

export default AssetBalance; 