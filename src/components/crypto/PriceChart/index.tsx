import React, { useEffect, useState } from 'react';
import { View, Dimensions, Text, Modal, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import useCryptoStore from '../../../store/useCryptoStore';
import { styles } from './styles';
import { colors } from '../../../styles/colors';

interface PriceChartProps {
  data: number[];
  labels: string[];
  currency: string;
  symbol: string;
}

const PriceChart = ({ data, labels, currency, symbol }: PriceChartProps) => {
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth;
  const [selectedPoint, setSelectedPoint] = useState<{
    value: number;
    date: string;
    index: number;
  } | null>(null);

  const updatePriceChart = useCryptoStore(state => state.updatePriceChart);
  const cachedChartData = useCryptoStore(state => state.chartData.prices[symbol]);

  useEffect(() => {
    if (data.length > 0) {
      updatePriceChart(symbol, {
        values: data,
        labels,
        lastUpdated: new Date().toISOString()
      });
    }
  }, [data, labels]);

  const chartData = data.length > 0 ? data : cachedChartData?.values || [];
  const chartLabels = labels.length > 0 ? labels : cachedChartData?.labels || [];

  const processedLabels = chartLabels.map((label, index) => {
    if (chartLabels.length <= 5) return label;
    return index === 0 || index === chartLabels.length - 1 ? label : '';
  });

  const handleDataPointClick = ({ index, value }: { index: number; value: number }) => {
    setSelectedPoint({
      value,
      date: chartLabels[index],
      index
    });
  };

  if (chartData.length === 0) {
    return (
      <View style={styles.container}>
        <Text testID="no-data-message">No data available</Text>
      </View>
    );
  }

  return (
    <View testID="price-chart">
      <LineChart
        data={{
          labels: processedLabels,
          datasets: [{ 
            data: chartData.length > 0 ? chartData : [0],
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(81, 145, 240, ${opacity})`,
          }],
        }}
        width={containerWidth}
        height={containerWidth}
        chartConfig={{
          backgroundColor: 'transparent',
          backgroundGradientFrom: colors.background,
          backgroundGradientTo: colors.background,
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(81, 145, 240, ${opacity})`,
          labelColor: () => colors.text.secondary,
          style: {
            borderRadius: 8,
          },
          propsForDots: {
            r: "4",
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
        withVerticalLines={true}
        withHorizontalLines={true}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        onDataPointClick={handleDataPointClick}
        getDotColor={(dataPoint, index) => 
          selectedPoint?.index === index ? colors.primary : 'rgba(81, 145, 240, 1)'
        }
      />
    </View>
  );
};

export default PriceChart;