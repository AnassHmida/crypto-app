import React, { useState, useEffect, useCallback } from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types';
import useAssetStore from '../../store/useAssetStore';
import useSettingsStore from '../../store/useSettingsStore';
import useChartStore from '../../store/useChartStore';
import PriceChart from '../../components/crypto/PriceChart';
import ApiService from '../../services/api/ApiService';
import {styles} from './styles';
import {colors} from '../../styles/colors';
import DateRangeFilter from '../../components/crypto/DateRangeFilter';
import PriceDisplay from '../../components/crypto/PriceDisplay';
import BalanceDisplay from '../../components/crypto/BalanceDisplay';

type CryptoDetailsRouteProp = RouteProp<RootStackParamList, 'CryptoDetails'>;

const CryptoDetailsScreen = () => {
  const route = useRoute<CryptoDetailsRouteProp>();
  const { cryptoId  } = route.params;
  const asset = cryptoId
  const settings = useSettingsStore(state => state.settings);
  const { updatePriceChart } = useChartStore();
  const priceChart = useChartStore(state => state.priceCharts[cryptoId]);

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleDateRangeApply = async (startDate: Date, endDate: Date) => {
    setIsFilterVisible(false);
    setIsLoading(true);
    try {
      const data = await ApiService.getInstance().getHistoricalPricesCustomRange(
        cryptoId,
        settings.currency,
        startDate.toISOString(),
        endDate.toISOString()
      );
      updatePriceChart(cryptoId, {
        values: data.map((d: { rate_close: number }) => d.rate_close),
        labels: data.map((d: { time_period_start: string }) => d.time_period_start),
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to load chart data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {

    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 1);
    handleDateRangeApply(startDate, endDate);
  }, []);

  if (!asset) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Asset not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.assetInfo}>
        <Text style={styles.assetSymbol}>{cryptoId}</Text>

      </View>
      <View style={styles.header}>
        <PriceDisplay cryptoId={cryptoId.toLowerCase()} />
      </View>

    

      <View style={styles.chartSection}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Price History</Text>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setIsFilterVisible(true)}
          >
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>

        <DateRangeFilter
          visible={isFilterVisible}
          onClose={() => setIsFilterVisible(false)}
          onApply={handleDateRangeApply}
        />
        
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <PriceChart data={priceChart || {values: [], labels: []}} />
        )}
      </View>

      <View style={styles.balanceSection}>
        <BalanceDisplay cryptoId={cryptoId.toLowerCase()} />
      </View>
    </SafeAreaView>
  );
};

export default CryptoDetailsScreen; 