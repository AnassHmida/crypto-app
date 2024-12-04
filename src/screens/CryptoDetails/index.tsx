import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types';
import useCryptoStore from '../../store/useCryptoStore';
import PriceChart from '../../components/crypto/PriceChart';
import ApiService from '../../services/api/ApiService';
import {styles} from './styles';
import {colors} from '../../styles/colors';
import DateRangeFilter from '../../components/crypto/DateRangeFilter';
import PriceDisplay from '../../components/crypto/PriceDisplay';
import BalanceDisplay from '../../components/crypto/BalanceDisplay';

type CryptoDetailsRouteProp = RouteProp<RootStackParamList, 'CryptoDetails'>;
type TimeRange = '1D' | '1W' | '1M' | '1Y';

const CryptoDetailsScreen = () => {
  const route = useRoute<CryptoDetailsRouteProp>();
  const {cryptoId} = route.params;
  const settings = useCryptoStore(state => state.settings);
  
  const symbol = useCryptoStore(state => 
    state.assets.find(a => a.symbol.toLowerCase() === cryptoId)?.symbol
  );

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [historicalData, setHistoricalData] = useState<{
    prices: number[];
    labels: string[];
  }>({ prices: [], labels: [] });
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistoricalDataWithCustomRange = async (startDate: Date, endDate: Date) => {
    try {
      console.log('Fetching data for range:', {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      });
      setIsLoading(true);
      const response = await ApiService.getInstance().getHistoricalPricesCustomRange(
        cryptoId,
        settings.currency,
        startDate.toISOString(),
        endDate.toISOString()
      );

      if (response) {
        const prices = response.map((item: any) => item.rate_close);
        const labels = response.map((item: any) => {
          const date = new Date(item.time_period_start);
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          return `${day}/${month}`;
        });

        setHistoricalData({
          prices,
          labels
        });
      }
    } catch (error) {
      console.error('Error fetching historical data:', error);
      // You might want to add error handling here
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomDateRange = (startDate: Date, endDate: Date) => {
    console.log('Selected date range:', {
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString(),
      daysBetween: Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    });
    
    setIsFilterVisible(false);
    fetchHistoricalDataWithCustomRange(startDate, endDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.symbol}>{symbol}</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setIsFilterVisible(true)}
        >
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <PriceDisplay cryptoId={cryptoId} />

      <View style={styles.chartContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} testID="loading-indicator" />
        ) : (
          <PriceChart
            data={historicalData.prices}
            labels={historicalData.labels}
            currency={settings.currency}
          />
        )}
      </View>

      <BalanceDisplay cryptoId={cryptoId} />

      <DateRangeFilter
        visible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        onApply={handleCustomDateRange}
      />
    </SafeAreaView>
  );
};

export default CryptoDetailsScreen; 