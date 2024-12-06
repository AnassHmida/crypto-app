import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { styles } from '../AlertsManager/styles';
import { PriceAlert } from '../../../store/useAlertStore';

interface AlertListProps {
  alerts: PriceAlert[];
  onRemove: (id: string) => void;
}

const AlertList = ({ alerts, onRemove }: AlertListProps) => (
  <FlatList
    data={alerts}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <View style={styles.alertItem}>
        <View>
          <Text style={styles.alertSymbol}>{item.symbol}</Text>
          <Text style={styles.alertPrice}>
            {item.isAbove ? 'Above' : 'Below'} ${item.targetPrice}
          </Text>
        </View>
        <TouchableOpacity 
          onPress={() => onRemove(item.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    )}
    ListEmptyComponent={
      <Text style={styles.emptyText}>No price alerts set</Text>
    }
  />
);

export default AlertList; 