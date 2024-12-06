import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import useAssetStore from '../../../store/useAssetStore';
import useSettingsStore from '../../../store/useSettingsStore';

interface BalanceDisplayProps {
  cryptoId: string;
}

const BalanceDisplay = ({ cryptoId }: BalanceDisplayProps) => {
  const settings = useSettingsStore(state => state.settings);
  const convertAmount = useSettingsStore(state => state.convertAmount);
  const asset = useAssetStore(state => 
    state.assets.find(a => a.symbol.toLowerCase() === cryptoId.toLowerCase())
  );

  console.log('Asset found:', {
    cryptoId,
    foundAsset: asset,
    allAssets: useAssetStore.getState().assets
  });

  const convertedValue = asset?.value 
    ? convertAmount(asset.value, 'USD', settings.currency)
    : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your balance</Text>
      <Text style={styles.amount}>
        {settings.currency} {convertedValue.toFixed(2)}
      </Text>
      <Text style={styles.cryptoAmount}>
        {asset?.amount ?? 0} {asset?.symbol}
      </Text>
    </View>
  );
};

export default BalanceDisplay; 