import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import useCryptoStore from '../../store/useCryptoStore';
import AssetItem from '../../components/AssetItem';
import PortfolioHeader from '../../components/PortfolioHeader';
import RefreshableList from '../../components/common/RefreshableList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import socketService from '../../services/socket';
import {colors} from '../../styles/colors';
import { SUPPORTED_CRYPTOS } from '../../constants/supportedCryptos';
import AddAssetModal from '../../components/AddAssetModal';

export interface Asset {
  symbol: string;
  amount: number;
  currentPrice: number;
  percentageChange: number;
  value: number;
}

type PortfolioScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainTabs'
>;

const PortfolioScreen = () => {
  const {assets, totalValue, isLoading, settings, addAsset, removeAsset} = useCryptoStore();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const navigation = useNavigation<PortfolioScreenNavigationProp>();

  useEffect(() => {
    socketService.connect();


    return () => {
      socketService.disconnect();
    };
  }, []);

  const handleRefresh = () => {
    console.log('🔄 Refreshing...');
    socketService.disconnect();
    socketService.connect();
  };

  const handleAddPress = () => setIsAddModalVisible(true);
  
  const handleAddAsset = (symbol: string, amount: number) => {
    const existingAsset = assets.find(
      asset => asset.symbol.toLowerCase() === symbol.toLowerCase()
    );

    if (existingAsset) {
      // If asset exists, replace its amount
      useCryptoStore.getState().updateAssetAmount(symbol.toUpperCase(), amount);
    } else {
      // If it's a new asset, add it
      addAsset(symbol.toUpperCase(), amount);
    }
    setIsAddModalVisible(false);
  };

  const handleAssetLongPress = (symbol: string) => {
    setIsSelectionMode(true);
    setSelectedAssets([symbol]);
  };

  const handleAssetPress = (symbol: string) => {
    if (isSelectionMode) {
      setSelectedAssets(prev => {
        const newSelected = prev.includes(symbol) 
          ? prev.filter(s => s !== symbol)
          : [...prev, symbol];

        if (newSelected.length === 0) {
          setIsSelectionMode(false);
        }
        return newSelected;
      });
    } else {
      navigation.navigate('CryptoDetails', {
        cryptoId: symbol.toLowerCase(),
      });
    }
  };

  const handleHeaderPress = () => {
    if (isSelectionMode) {
      setIsSelectionMode(false);
      setSelectedAssets([]);
    }
  };

  const handleDeleteSelected = () => {
    selectedAssets.forEach(symbol => removeAsset(symbol));
    setIsSelectionMode(false);
    setSelectedAssets([]);
  };

  const renderAsset = (asset: Asset) => (
    <AssetItem
      symbol={asset.symbol}
      amount={asset.amount}
      value={asset.value}
      percentageChange={asset.percentageChange}
      currency={settings.currency}
      onPress={() => handleAssetPress(asset.symbol)}
      onLongPress={() => handleAssetLongPress(asset.symbol)}
      isSelected={selectedAssets.includes(asset.symbol)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <RefreshableList
        testID="refreshable-list"
        data={assets}
        renderItem={renderAsset}
        isLoading={isLoading}
        onRefresh={handleRefresh}
        ListHeaderComponent={
          <PortfolioHeader 
            totalValue={totalValue} 
            onAddPress={handleAddPress}
            isSelectionMode={isSelectionMode}
            selectedCount={selectedAssets.length}
            onDeletePress={handleDeleteSelected}
            onHeaderPress={handleHeaderPress}
          />
        }
        keyExtractor={item => item.symbol}
      />

      <Text testID="selected-count">
        {`${selectedAssets.length} ${selectedAssets.length === 1 ? 'item' : 'items'} selected`}
      </Text>

      <AddAssetModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAdd={handleAddAsset}
      />
    </SafeAreaView>
  );
};

export default PortfolioScreen; 