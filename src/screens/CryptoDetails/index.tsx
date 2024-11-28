import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

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
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Your balance</Text>
        <Text style={styles.balanceAmount}>DZD 8888.8888</Text>
        <Text style={styles.cryptoAmount}>BTC 2.42</Text>
      </View>
    </SafeAreaView>
  );
};

export default CryptoDetailsScreen; 