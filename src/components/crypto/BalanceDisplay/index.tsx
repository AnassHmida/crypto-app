import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import useCryptoStore from '../../../store/useCryptoStore';

interface BalanceDisplayProps {
  cryptoId: string;
}

const BalanceDisplay = ({ cryptoId }: BalanceDisplayProps) => {
  const settings = useCryptoStore(state => state.settings);
  const asset = useCryptoStore(state => 
    state.assets.find(a => a.symbol.toLowerCase() === cryptoId)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your balance</Text>
      <Text style={styles.amount}>
        {settings.currency} {asset?.value?.toFixed(2) ?? '0.00'}
      </Text>
      <Text style={styles.cryptoAmount}>
        {asset?.amount ?? 0} {asset?.symbol}
      </Text>
    </View>
  );
};

export default BalanceDisplay; 