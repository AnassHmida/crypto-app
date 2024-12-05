import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import ApiService from '../../../services/api/ApiService';
import useCryptoStore from '../../../store/useCryptoStore';
import { styles } from './styles';
import { colors } from '../../../styles/colors';

const PortfolioChart = () => {
  const [chartData, setChartData] = useState<{values: number[], labels: string[]}>({
    values: [],
    labels: []
  });
  
  const assets = useCryptoStore(state => state.assets);
  const currency = useCryptoStore(state => state.settings.currency);

  const formatToK = (value: number): string => {
    if (value >= 1000000) {
      return `${currency}${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${currency}${(value / 1000).toFixed(1)}K`;
    }
    return `${currency}${value.toFixed(0)}`;
  };

  useEffect(() => {
    fetchPortfolioHistory();
  }, []);

  const fetchPortfolioHistory = async () => {
    if (assets.length === 0) return;

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

      setChartData({ values, labels });
    } catch (error) {
      console.error('Error fetching portfolio history:', error);
    }
  };

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
