import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types';
import useCryptoStore from '../../store/useCryptoStore';
import {styles} from './styles';

type CryptoDetailsRouteProp = RouteProp<RootStackParamList, 'CryptoDetails'>;

const CryptoDetailsScreen = () => {
  const route = useRoute<CryptoDetailsRouteProp>();
  const {cryptoId} = route.params;
  
  const asset = useCryptoStore(state => 
    state.assets.find(a => a.symbol.toLowerCase() === cryptoId)
  );

  if (!asset) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Asset not found</Text>
      </SafeAreaView>
    );
  }

  const isPositive = asset.percentageChange >= 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.symbol}>{asset.symbol}</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.currentPrice}>
          DZD {asset.currentPrice.toFixed(2)}
        </Text>
        <Text style={[
          styles.percentageChange,
          isPositive ? styles.positive : styles.negative,
        ]}>
          {isPositive ? '+' : ''}{asset.percentageChange.toFixed(2)}%
        </Text>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Historical asset prices chart</Text>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Your balance</Text>
        <Text style={styles.balanceAmount}>
          DZD {asset.value.toFixed(2)}
        </Text>
        <Text style={styles.cryptoAmount}>
          {asset.amount} {asset.symbol}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default CryptoDetailsScreen; 