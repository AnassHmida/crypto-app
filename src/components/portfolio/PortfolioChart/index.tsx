import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { styles } from './styles';
import { colors } from '../../../styles/colors';
import useChartStore from '../../../store/useChartStore';
import useSettingsStore from '../../../store/useSettingsStore';

const PortfolioChart = () => {
  const portfolioHistory = useChartStore(state => state.portfolioHistory);
  const currency = useSettingsStore(state => state.settings.currency);
  const convertAmount = useSettingsStore(state => state.convertAmount);

  if (!portfolioHistory?.length) return null;

  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit' }).format(date);
  };

  const allLabels = portfolioHistory.map(entry => formatDate(entry.timestamp));
  
  const filteredLabels = [allLabels[0]];
  const labelIndexes = [0, allLabels.length - 1];

  const convertedValues = portfolioHistory.map(entry => 
    convertAmount(entry.value, 'USD', currency)
  );

  const maxValue = Math.max(...convertedValues);

  const minValue = Math.min(...convertedValues);
  const yAxisRange = maxValue - minValue;

 
  
  const formatYLabel = (value: string) => {
    const numValue = parseFloat(value);
    if (numValue >= 1000000) {
      return `${(numValue / 1000000).toFixed(1)}M`;
    } else if (numValue >= 1000) {
      return `${(numValue / 1000).toFixed(1)}K`;
    }
    return numValue.toFixed(0);
  };

  const data = {
    labels: filteredLabels,
    datasets: [{
      data: convertedValues
    }]
  };

  return (
    <View style={styles.container}>
        
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 32}
        height={Dimensions.get('window').height * 0.25}
        chartConfig={{
          backgroundColor: colors.background,
          backgroundGradientFrom: colors.background,
          backgroundGradientTo: colors.background,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(81, 145, 240, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForBackgroundLines: {
            strokeWidth: 0,
          },
          propsForDots: {
            r: "0",
            strokeWidth: "0",
          },
          propsForLabels: {
            fontSize: "10",
          },
          count: 5,
        }}
        bezier
        withHorizontalLines={false}
        withVerticalLines={false}
        withDots={false}

        xLabelsOffset={-10}
        style={{
        
        
        }}
      />
      
    </View>
  );
};

export default PortfolioChart;
