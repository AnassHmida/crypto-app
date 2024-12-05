import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useCryptoStore from '../../store/useCryptoStore';
import { styles } from './styles';
import CurrencySelector from '../../components/settings/CurrencySelector';
import SettingSwitch from '../../components/common/SettingSwitch';
import AlertsManager from '../../components/settings/AlertsManager';

export const AVAILABLE_CURRENCIES = ['USD', 'EUR', 'GBP'];

const SettingsScreen = () => {
  const { settings, updateSettings } = useCryptoStore();

  const sections = [
    {
      id: 'currency',
      title: 'Currency Preferences',
      component: (
        <CurrencySelector
          currencies={AVAILABLE_CURRENCIES}
          selectedCurrency={settings.currency}
          onSelect={(curr) => updateSettings({ currency: curr })}
        />
      ),
    },
    {
      id: 'alerts',
      title: 'Price Alerts',
      component: (
        <>
          <SettingSwitch
            testID="price-alerts-switch"
            label="Enable Price Alerts"
            value={settings.priceAlerts}
            onValueChange={() => updateSettings({ priceAlerts: !settings.priceAlerts })}
          />
          {settings.priceAlerts && <AlertsManager />}
        </>
      ),
    },
  
  ];

  const renderItem = ({ item }) => (
    <View>
      <Text style={styles.sectionTitle}>{item.title}</Text>
      <View style={styles.section}>{item.component}</View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sections}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default SettingsScreen; 