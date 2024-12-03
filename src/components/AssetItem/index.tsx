import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

interface AssetItemProps {
  symbol: string;
  amount: number;
  value: number;
  percentageChange: number;
  currency: string;
  onPress: () => void;
}

const AssetItem = React.memo(({
  symbol,
  amount,
  value,
  percentageChange,
  currency,
  onPress,
}: AssetItemProps) => {
  const isPositive = percentageChange >= 0;

  return (
    <TouchableOpacity 
      testID="asset-item" 
      style={styles.container} 
      onPress={onPress}
    >
      <View style={styles.leftSection}>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={[
          styles.percentageChange,
          isPositive ? styles.positive : styles.negative,
        ]}>
          {isPositive ? '+' : ''}{percentageChange?.toFixed(2) ?? '0.00'}%
        </Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.amount}>{amount ?? 0} {symbol}</Text>
        <Text style={styles.value}>{currency} {value?.toFixed(2) ?? '0.00'}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default AssetItem; 