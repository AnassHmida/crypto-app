import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import useCryptoStore from '../../../store/useCryptoStore';

interface PriceDisplayProps {
  cryptoId: string;
}

const PriceDisplay = ({ cryptoId }: PriceDisplayProps) => {
  const settings = useCryptoStore(state => state.settings);
  const currentPrice = useCryptoStore(state => 
    state.assets.find(a => a.symbol.toLowerCase() === cryptoId)?.currentPrice
  );
  const percentageChange = useCryptoStore(state => 
    state.assets.find(a => a.symbol.toLowerCase() === cryptoId)?.percentageChange
  );

  const isPositive = (percentageChange || 0) >= 0;

  return (
    <View style={styles.container}>
      <Text style={styles.currentPrice}>
        {settings.currency} {currentPrice?.toFixed(2)}
      </Text>
      <Text style={[
        styles.percentageChange,
        isPositive ? styles.positive : styles.negative,
      ]}>
        {isPositive ? '+' : ''}{percentageChange?.toFixed(2)}%
      </Text>
    </View>
  );
};

export default PriceDisplay; 