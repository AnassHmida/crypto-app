import React, { useEffect, useState } from 'react';
import { View, Dimensions, ActivityIndicator, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import ApiService from '../../../services/api/ApiService';
import useCryptoStore from '../../../store/useCryptoStore';
import { styles } from './styles';
import { colors } from '../../../styles/colors';

const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

const PortfolioChart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const assets = useCryptoStore(state => state.assets);
  const currency = useCryptoStore(state => state.settings.currency);
  const chartData = useCryptoStore(state => state.chartData.portfolio);
  const updatePortfolioChart = useCryptoStore(state => state.updatePortfolioChart);

  useEffect(() => {
    loadChartData();
  }, []);

  const loadChartData = async () => {
    if (chartData.values.length > 0) {
      const cacheAge = Date.now() - new Date(chartData.lastUpdated).getTime();
      if (cacheAge < CACHE_EXPIRY_TIME) {
        setIsLoading(false);
        return;
      }
    }
    await fetchPortfolioHistory();
  };

  const fetchPortfolioHistory = async () => {
    if (assets.length === 0) {
      setIsLoading(false);
      return;
    }

    const endDate = new Date();
    const startDate = new Date();
    startDate.setHours(startDate.getHours() - 24);

    try {
      const historicalData = await Promise.all(
        assets.map(asset => 
          ApiService.getInstance().getHistoricalPricesCustomRange(
            asset.symbol.toLowerCase(),
            currency,
            startDate.toISOString(),
            endDate.toISOString()
          )
        )
      );


      const combinedData = historicalData.reduce((acc, curr) => {
        curr.forEach((dataPoint: any) => {
          const timestamp = new Date(dataPoint.time_period_start).getTime();
          acc[timestamp] = (acc[timestamp] || 0) + dataPoint.rate_close;
        });
        return acc;
      }, {} as Record<number, number>);


      const sortedData = Object.entries(combinedData)
        .sort(([a], [b]) => parseInt(a) - parseInt(b));


      const values = sortedData.map(([_, value]) => value);
      const labels = sortedData.map(([timestamp]) => 
        new Date(parseInt(timestamp)).toLocaleTimeString()
      );

      updatePortfolioChart({
        values,
        labels,
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error fetching portfolio history:', error);
      setError('Failed to fetch portfolio data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container} testID="price-chart">
      <LineChart
        data={{
          labels: chartData.labels,
          datasets: [{ 
            data: chartData.values.length > 0 ? chartData.values : [0],
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(81, 145, 240, ${opacity})`,
          }],
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          backgroundColor: colors.background,
          backgroundGradientFrom: colors.background,
          backgroundGradientTo: colors.background,
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(81, 145, 240, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForBackgroundLines: {
            strokeWidth: 0,
          },
          propsForDots: {
            r: '0',
            strokeWidth: '0',
          },
          propsForLabels: {
            fontSize: '10',
          },
        }}
        hidePointsAtIndex={Array.from({ length: chartData.labels.length }, (_, i) => i)}
        bezier
        withHorizontalLines={false}
        withVerticalLines={false}
        withDots={false}
        style={{
            paddingRight: 0


        }}
      />
    </View>
  );
};

export default PortfolioChart;
