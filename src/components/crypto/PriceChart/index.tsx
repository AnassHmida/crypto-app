import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { styles } from './styles';
import { colors } from '../../../styles/colors';
import useSettingsStore from '../../../store/useSettingsStore';

interface PriceChartProps {
  data: {
    values: number[];
    labels: string[];
  };
}

const PriceChart = ({ data }: PriceChartProps) => {
  const currency = useSettingsStore(state => state.settings.currency);
  const convertAmount = useSettingsStore(state => state.convertAmount);
  
  if (!data?.values?.length) {
    return null;
  }

  const convertedValues = data.values.map(value => 
    convertAmount(value, 'USD', currency)
  );

  const minValue = Math.min(...convertedValues);
  const maxValue = Math.max(...convertedValues);
  const yAxisRange = maxValue - minValue;


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit' }).format(date);
  };

  const filteredLabels = [formatDate(data.labels[0]), formatDate(data.labels[data.labels.length - 1])];
  const labelIndexes = [0, data.labels.length - 1];

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: filteredLabels,
          datasets: [{
            data: convertedValues
          }]
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
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
            r: "0",
            strokeWidth: "0",
          },
          propsForBackgroundLines: {
            stroke: "transparent",
          },
          propsForLabels: {
            fontSize: "10",
          },
          formatYLabel: (value) => Number(value).toFixed(2),
          count: 5,
        }}
        bezier
        style={styles.chart}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLines={false}
        withHorizontalLines={false}
        hidePointsAtIndex={Array.from({ length: data.labels.length }, (_, i) => 
          !labelIndexes.includes(i) ? i : -1
        ).filter(i => i !== -1)}
      />
    </View>
  );
};

export default PriceChart;