import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import CurrencySelector from '../../components/settings/CurrencySelector';
import SettingSwitch from '../../components/common/SettingSwitch';
import AlertsManager from '../../components/settings/AlertsManager';
import useSettingsStore from '../../store/useSettingsStore';

export const AVAILABLE_CURRENCIES = ['USD', 'EUR', 'GBP'];

const SettingsScreen = () => {
  const settings = useSettingsStore(state => state.settings);
  const updateSettings = useSettingsStore(state => state.updateSettings);

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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sections}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <View style={styles.section}>{item.component}</View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default SettingsScreen; 