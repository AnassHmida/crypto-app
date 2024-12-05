import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';
import useCryptoStore from '../../store/useCryptoStore';
import PortfolioChart from '../portfolio/PortfolioChart';
import { colors } from '../../styles/colors';

interface PortfolioHeaderProps {
  totalValue: number;
  onAddPress: () => void;
  isSelectionMode: boolean;
  selectedCount: number;
  onDeletePress: () => void;
  onHeaderPress: () => void;
}

const PortfolioHeader = ({
  totalValue, 
  onAddPress, 
  isSelectionMode,
  selectedCount,
  onDeletePress,
  onHeaderPress
}: PortfolioHeaderProps) => {
  const currency = useCryptoStore(state => state.settings.currency);
  
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

      <View testID="selection-mode-header">
    
      </View>
    </>
  );
};

export default PortfolioHeader;