import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import  useAssetStore from '../../store/useAssetStore';
import useSettingsStore  from '../../store/useSettingsStore';


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
  const priceData = useAssetStore(state => state.assetPrices[symbol]);
  const convertAmount = useSettingsStore(state => state.convertAmount);
  
  const currentValue = priceData?.currentPrice 
    ? convertAmount(priceData.currentPrice * amount, 'USD', currency)
    : 0;
  
  const isPositive = (priceData?.percentageChange || 0) >= 0;

  return (
    <TouchableOpacity 
      testID={`asset-item-${symbol}`}
      style={[styles.container, isSelected && styles.selectedContainer]} 
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={styles.leftSection}>
        {isSelected && (
          <Icon name="check-circle" size={24} color={colors.primary} style={styles.checkIcon} />
        )}
        <View style={styles.symbolContainer}>
          <Text style={styles.symbol}>{symbol}</Text>
          <Text style={[styles.percentageChange, isPositive ? styles.positive : styles.negative]}>
            {isPositive ? '+' : ''}{priceData?.percentageChange?.toFixed(2) ?? '0.00'}%
          </Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.amount}>{amount ?? 0} {symbol}</Text>
        <Text style={styles.value}>{currency} {currentValue.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default AssetItem; 