import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import AssetItem from '../../components/AssetItem';
import PortfolioHeader from '../../components/PortfolioHeader';
import RefreshableList from '../../components/common/RefreshableList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import socketService from '../../services/socket';
import AddAssetModal from '../../components/AddAssetModal';
import ApiService from '../../services/api/ApiService';
import useAssetStore from '../../store/useAssetStore';
import useSettingsStore from '../../store/useSettingsStore';
import useChartStore from '../../store/useChartStore';

type PortfolioScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Portfolio'
>;

const PortfolioScreen = () => {
  const assets = useAssetStore(state => state.assets);
  const totalValue = useAssetStore(state => state.totalValue);
  const settings = useSettingsStore(state => state.settings);
  const convertAmount = useSettingsStore(state => state.convertAmount);
  const { addAsset, removeAsset, updateAssetAmount } = useAssetStore();

  
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const navigation = useNavigation<PortfolioScreenNavigationProp>();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    socketService.connect();
    return () => socketService.disconnect();
  }, []);

  useEffect(() => {
    if (!isSelectionMode) {
      setSelectedAssets([]);
    }
  }, [isSelectionMode]);

 

  const handleAddAsset = (symbol: string, amount: number) => {
    const existingAsset = assets.find(
      asset => asset.symbol.toLowerCase() === symbol.toLowerCase()
    );

    if (existingAsset) {
      updateAssetAmount(symbol.toUpperCase(), amount);
    } else {
      addAsset(symbol.toUpperCase(), amount);
    }
    setIsAddModalVisible(false);
  };

  const handleDeleteSelected = () => {
    selectedAssets.forEach(symbol => removeAsset(symbol));
    setSelectedAssets([]);
    setIsSelectionMode(false);
  };

  const renderItem = useCallback(({symbol, amount, value, percentageChange}: {
    symbol: string;
    amount: number;
    value: number;
    percentageChange: number;
  }) => (
    <AssetItem
      symbol={symbol}
      amount={amount}
      value={convertAmount(value, 'USD', settings.currency)}
      percentageChange={percentageChange}
      currency={settings.currency}
      onPress={() => {
        if (isSelectionMode) {
          setSelectedAssets(prev => {
            const newSelected = prev.includes(symbol)
              ? prev.filter(s => s !== symbol)
              : [...prev, symbol];
              
            if (newSelected.length === 0) {
              setIsSelectionMode(false);
              return [];
            }
            
            return newSelected;
          });
        } else {
          navigation.navigate('CryptoDetails', {cryptoId: symbol});
        }
      }}
      isSelected={selectedAssets.includes(symbol)}
      onLongPress={() => {
        setIsSelectionMode(true);
        setSelectedAssets([symbol]);
      }}
    />
  ), [settings.currency, selectedAssets, navigation, convertAmount, isSelectionMode]);



  const fetchPortfolioHistory = async () => {
    console.log('fetching portfolio history');
    const data = await ApiService.getInstance().getPortfolioHistoricalData(
      assets,
      settings.currency
    );
    console.log('data ==', data)
    useChartStore.getState().updatePortfolioHistory(data);
  };

  const displayValue = useMemo(() => {
    return convertAmount(totalValue, 'USD', settings.currency);
  }, [totalValue, settings.currency]);


  useEffect(() => {
  
    if (assets.length > 0) {
      fetchPortfolioHistory();
    }
  }, [settings.currency]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      socketService.disconnect();
      socketService.connect();
      await fetchPortfolioHistory();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <RefreshableList
        data={assets}
        isLoading={isRefreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={
          <PortfolioHeader
            totalValue={displayValue}
            onAddPress={() => setIsAddModalVisible(true)}
            isSelectionMode={isSelectionMode}
            selectedCount={selectedAssets.length}
            onDeletePress={handleDeleteSelected}
            onHeaderPress={() => setIsSelectionMode(false)}
          />
        }
        renderItem={renderItem}
      />
      <AddAssetModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAdd={handleAddAsset}
      />
    </SafeAreaView>
  );
};

export default PortfolioScreen; 