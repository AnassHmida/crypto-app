import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';


interface AssetItemProps {
  symbol: string;
  amount: number;
  value: number;
  percentageChange: number;
  currency: string;
  onPress: () => void;
  onLongPress: () => void;
  isSelected?: boolean;
}

const AssetItem = React.memo(({
  symbol,
  amount,
  value,
  percentageChange,
  currency,
  onPress,
  onLongPress,
  isSelected,
}: AssetItemProps) => {
  const isPositive = percentageChange >= 0;

  return (
    <TouchableOpacity 
      testID={`asset-item-${symbol}`}
      style={[
        styles.container,
        isSelected && styles.selectedContainer
      ]} 
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={styles.leftSection}>
        {isSelected && (
          <Icon 
            name="check-circle" 
            size={24} 
            color={colors.primary}
            style={styles.checkIcon} 
          />
        )}
        <View style={styles.symbolContainer}>
          <Text style={styles.symbol}>{symbol}</Text>
          <Text style={[
            styles.percentageChange,
            isPositive ? styles.positive : styles.negative,
          ]}>
            {isPositive ? '+' : ''}{percentageChange?.toFixed(2) ?? '0.00'}%
          </Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.amount}>{amount ?? 0} {symbol}</Text>
        <Text style={styles.value}>{currency} {value?.toFixed(2) ?? '0.00'}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default AssetItem; 