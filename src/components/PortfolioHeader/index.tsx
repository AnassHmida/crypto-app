import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import useCryptoStore from '../../store/useCryptoStore';
import PortfolioChart from '../portfolio/PortfolioChart';

interface PortfolioHeaderProps {
  totalValue: number;
}

const PortfolioHeader = ({totalValue}: PortfolioHeaderProps) => {
  const currency = useCryptoStore(state => state.settings.currency);
  const historicalValues = useCryptoStore(state => state.historicalValues);
  
  return (
    <>
      <View style={styles.totalValue}>
        <Text style={styles.totalAmount}>
          {currency} {totalValue.toFixed(2)}
        </Text>
        <Text style={styles.portfolioLabel}>Portfolio Value</Text>
      </View>
      
      <View style={styles.chartContainer}>
        <PortfolioChart
        />
      </View>

      <Text style={styles.assetsTitle}>Assets</Text>
    </>
  );
};

export default PortfolioHeader; 