import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

interface AssetItemProps {
  symbol: string;
  amount: number;
  value: number;
  percentageChange: number;
  onPress: () => void;
}

const AssetItem = ({
  symbol,
  amount,
  value,
  percentageChange,
  onPress,
}: AssetItemProps) => {
  const isPositive = percentageChange >= 0;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftSection}>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={[
          styles.percentageChange,
          isPositive ? styles.positive : styles.negative,
        ]}>
          {isPositive ? '+' : ''}{percentageChange}%
        </Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.amount}>{amount} {symbol}</Text>
        <Text style={styles.value}>DZD {value.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AssetItem; 