import React from 'react';
import {Text} from 'react-native';
import {styles} from './styles';

interface PercentageChangeProps {
  value: number;
  style?: object;
}

const PercentageChange = ({value, style}: PercentageChangeProps) => {
  const isPositive = value >= 0;
  
  return (
    <Text style={[
      styles.percentageChange,
      isPositive ? styles.positive : styles.negative,
      style
    ]}>
      {isPositive ? '+' : ''}{value.toFixed(2)}%
    </Text>
  );
};

export default PercentageChange; 