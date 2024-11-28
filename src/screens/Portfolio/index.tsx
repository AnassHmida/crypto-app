import React from 'react';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import useCryptoStore from '../../store/useCryptoStore';
import AssetItem from '../../components/AssetItem';
import PortfolioHeader from '../../components/PortfolioHeader';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';

type PortfolioScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainTabs'
>;

const PortfolioScreen = () => {
  const {assets, totalValue} = useCryptoStore();
  const navigation = useNavigation<PortfolioScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={assets}
        keyExtractor={item => item.symbol}
        renderItem={({item}) => (
          <AssetItem
            symbol={item.symbol}
            amount={item.amount}
            value={item.value}
            onPress={() => 
              navigation.navigate('CryptoDetails', {
                cryptoId: item.symbol.toLowerCase(),
              })
            }
          />
        )}
         ListHeaderComponent={<PortfolioHeader totalValue={totalValue} />}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default PortfolioScreen; 