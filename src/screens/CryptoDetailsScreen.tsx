import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const CryptoDetailsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.symbol}>BTC</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Historical asset prices chart</Text>
        {/* Chart component will go here */}
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Your balance</Text>
        <Text style={styles.balanceAmount}>DZD 8888.8888</Text>
        <Text style={styles.cryptoAmount}>BTC 2.42</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  symbol: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
  },
  filterText: {
    fontSize: 16,
  },
  chartContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    margin: 16,
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 16,
    color: '#666',
  },
  balanceContainer: {
    padding: 16,
  },
  balanceTitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cryptoAmount: {
    fontSize: 16,
    color: '#666',
  },
});

export default CryptoDetailsScreen; 