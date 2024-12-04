import React, { useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { styles } from './styles';
import { colors } from '../../../styles/colors';
import useCryptoStore from '../../../store/useCryptoStore';


const PortfolioChart = () => {
  const portfolioHistory = useCryptoStore(state => state.portfolioHistory);

  // Memoize the chart data processing
  const chartData = useMemo(() => {
    // Take only last 24 points to reduce rendering load
    const recentHistory = portfolioHistory.slice(-24);
    
    return {
      values: recentHistory.map(entry => entry.value),
      labels: recentHistory.map(entry => {
        const date = new Date(entry.timestamp);
        return `${date.getDate()}/${date.getMonth() + 1}`;
      })
    };
  }, [portfolioHistory]);

  // Only render if we have data
  if (chartData.values.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: chartData.labels,
          datasets: [{ 
            data: chartData.values,
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(81, 145, 240, ${opacity})`,
          }],
        }}
        width={Dimensions.get('window').width - 32}
        height={180}
        chartConfig={{
          backgroundColor: 'transparent',
          backgroundGradientFrom: colors.background,
          backgroundGradientTo: colors.background,
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(81, 145, 240, ${opacity})`,
          labelColor: () => colors.text.secondary,
          style: {
            borderRadius: 12,
          },
          propsForDots: {
            r: "3",
            strokeWidth: "2",
            stroke: colors.background,
          },
          propsForBackgroundLines: {
            stroke: "transparent",
          },
        }}
        bezier
        style={styles.chart}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLabels={true}
        withHorizontalLabels={true}
      />
    </View>
  );
};

export default PortfolioChart;
