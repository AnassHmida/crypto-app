import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

interface AssetItemProps {
  symbol: string;
  amount: number;
  value: number;
  onPress: () => void;
}

const AssetItem = ({symbol, amount, value, onPress}: AssetItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftSection}>
        <Text style={styles.symbol}>{symbol}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.amount}>{amount}</Text>
        <Text style={styles.value}>DZD {value}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AssetItem; 