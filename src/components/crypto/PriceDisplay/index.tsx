import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import useAssetStore from '../../../store/useAssetStore';
import useSettingsStore from '../../../store/useSettingsStore';

interface PriceDisplayProps {
  cryptoId: string;
}

const PriceDisplay = ({ cryptoId }: PriceDisplayProps) => {
  const settings = useSettingsStore(state => state.settings);
  const convertAmount = useSettingsStore(state => state.convertAmount);
  
  // Only subscribe to the price data
  const priceData = useAssetStore(state => state.assetPrices[cryptoId.toUpperCase()]);

  const isPositive = (priceData?.percentageChange || 0) >= 0;
  const convertedPrice = priceData?.currentPrice 
    ? convertAmount(priceData.currentPrice, 'USD', settings.currency)
    : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.currentPrice}>
        {settings.currency} {convertedPrice.toFixed(2)}
      </Text>
      <Text style={[
        styles.percentageChange,
        isPositive ? styles.positive : styles.negative,
      ]}>
        {isPositive ? '+' : ''}{priceData?.percentageChange?.toFixed(2)}%
      </Text>
    </View>
  );
};

export default PriceDisplay; 