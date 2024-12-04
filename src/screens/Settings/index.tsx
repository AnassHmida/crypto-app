import React from 'react';
import {View, Text, Switch, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useCryptoStore from '../../store/useCryptoStore';
import {styles} from './styles';
import CurrencySelector from '../../components/settings/CurrencySelector';
import SettingSwitch from '../../components/common/SettingSwitch';
import AlertsManager from '../../components/settings/AlertsManager';

export const AVAILABLE_CURRENCIES = [ 'USD', 'EUR', 'GBP'];
interface Settings {
  currency: string;
  realTimeUpdates: boolean;
  priceAlerts: boolean; 
}
const SettingsScreen = () => {
  const {settings, updateSettings} = useCryptoStore();

  const handlePriceAlertsChange = () => {
    updateSettings({ priceAlerts: !settings.priceAlerts });
  };

  const handleCurrencySelect = (curr: string) => {
    console.log('Updating currency to:', curr);
    updateSettings({ currency: curr });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.sectionTitle}>Currency Preferences</Text>
          <View style={styles.section}>
            <CurrencySelector
              currencies={AVAILABLE_CURRENCIES}
              selectedCurrency={settings.currency}
              onSelect={handleCurrencySelect}
            />
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Price Alerts</Text>
          <View style={styles.section}>
            <SettingSwitch
              testID="price-alerts-switch"
              label="Enable Price Alerts"
              value={settings.priceAlerts}
              onValueChange={handlePriceAlertsChange}
            />
            {settings.priceAlerts && <AlertsManager />}
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Auto-Refresh</Text>
          <View style={styles.section}>
            <SettingSwitch
              label="Real-time Updates"
              value={settings.realTimeUpdates}
              onValueChange={(value) => updateSettings({ realTimeUpdates: value })}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen; 