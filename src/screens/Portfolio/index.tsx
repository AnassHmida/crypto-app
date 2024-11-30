import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import useCryptoStore from '../../store/useCryptoStore';
import AssetItem from '../../components/AssetItem';
import PortfolioHeader from '../../components/PortfolioHeader';
import RefreshableList from '../../components/common/RefreshableList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';

export interface Asset {
  symbol: string;
  amount: number;
  value: number;
  percentageChange: number;
}

type PortfolioScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainTabs'
>;

const PortfolioScreen = () => {
  const {assets, totalValue, isLoading} = useCryptoStore();
  const navigation = useNavigation<PortfolioScreenNavigationProp>();

  const handleRefresh = () => {
    console.log('Refreshing...');
  };

  const renderAsset = (asset: Asset) => (
    <AssetItem
      symbol={asset.symbol}
      amount={asset.amount}
      value={asset.value}
      percentageChange={asset.percentageChange}
      onPress={() => 
        navigation.navigate('CryptoDetails', {
          cryptoId: asset.symbol.toLowerCase(),
        })
      }
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <RefreshableList
        data={assets}
        renderItem={renderAsset}
        isLoading={isLoading}
        onRefresh={handleRefresh}
        ListHeaderComponent={<PortfolioHeader totalValue={totalValue} />}
        keyExtractor={item => item.symbol}
      />
    </SafeAreaView>
  );
};

export default PortfolioScreen; 