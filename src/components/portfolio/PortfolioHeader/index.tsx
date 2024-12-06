import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';
import useSettingsStore from '../../../store/useSettingsStore';
import PortfolioChart from '../PortfolioChart';
import { colors } from '../../../styles/colors';

interface PortfolioHeaderProps {
  totalValue: number;
  onAddPress: () => void;
  isSelectionMode: boolean;
  selectedCount: number;
  onDeletePress: () => void;
  onHeaderPress: () => void;
}

const PortfolioHeader = React.memo(({
  totalValue, 
  onAddPress, 
  isSelectionMode,
  selectedCount,
  onDeletePress,
  onHeaderPress
}: PortfolioHeaderProps) => {
  const currency = useSettingsStore(state => state.settings.currency);
  console.log('pro')
  return (
    <>
      <View style={styles.totalValue}>
        <Text style={styles.totalAmount}>
          {currency} {totalValue.toFixed(2)}
        </Text>
        <Text style={styles.portfolioLabel}>Portfolio Value</Text>
      </View>
      
      <View style={styles.chartContainer}>
        <PortfolioChart />
      </View>

      <View style={styles.assetsTitleContainer}>
        <TouchableOpacity 
          style={styles.titleContainer} 
          onPress={onHeaderPress}
        >
          <Text style={styles.assetsTitle}>
            {isSelectionMode 
              ? `${selectedCount} ${selectedCount === 1 ? 'item' : 'items'} selected`
              : 'Assets'
            }
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
  testID={isSelectionMode ? 'delete-button' : 'add-asset-button'}
  onPress={isSelectionMode ? onDeletePress : onAddPress} 
          style={styles.actionButton}
        >
          <Icon 
            name={isSelectionMode ? "delete" : "add-circle-outline"} 
            size={24} 
              color={isSelectionMode ? colors.error : colors.primary} 
          />
        </TouchableOpacity> 
      </View>
    </>
  );
});

export default PortfolioHeader;