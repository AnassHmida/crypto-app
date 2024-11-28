import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../styles/screens/portfolioStyles';

const PortfolioScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.currency}>DZD</Text>
      </View>

      <View style={styles.totalValue}>
        <Text style={styles.totalAmount}>DZD 9999.9999</Text>
        <Text style={styles.portfolioLabel}>Portfolio Value</Text>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartLabel}>Historical portfolio value chart</Text>
      </View>

      <View style={styles.assetsSection}>
        <Text style={styles.assetsTitle}>Assets</Text>
        <ScrollView>
          {/* Asset list will go here */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PortfolioScreen; 