import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';

interface PriceDisplayProps {
  currentPrice: number;
  percentageChange: number;
  currency: string;
}

const PriceDisplay = ({
  currentPrice = 0,
  percentageChange = 0,
  currency = 'USD',
}: PriceDisplayProps) => {
  const isPositive = percentageChange >= 0;
  
  return (
    <View style={styles.container}>
      <Text style={styles.currentPrice}>
        {currency} {currentPrice.toFixed(2)}
      </Text>
      <Text
        style={[styles.percentageChange, isPositive ? styles.positive : styles.negative]}>
        {isPositive ? '+' : ''}{percentageChange}%
      </Text>
    </View>
  );
};

export default PriceDisplay; 