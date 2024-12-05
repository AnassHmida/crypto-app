import React, { useState } from 'react';
import { View, Dimensions, Text, Modal, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { styles } from './styles';
import { colors } from '../../../styles/colors';

interface PriceChartProps {
  data: number[];
  labels: string[];
  currency: string;
}

const PriceChart = ({ data, labels, currency }: PriceChartProps) => {
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth;
  const [selectedPoint, setSelectedPoint] = useState<{
    value: number;
    date: string;
    index: number;
  } | null>(null);

  const processedLabels = labels.map((label, index) => {
    if (labels.length <= 5) return label;
    return index === 0 || index === labels.length - 1 ? label : '';
  });

  const handleDataPointClick = ({ index, value }: { index: number; value: number }) => {
    setSelectedPoint({
      value,
      date: labels[index],
      index
    });
  };

  if (data.length === 0) {
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
            data: data.length > 0 ? data : [0],
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