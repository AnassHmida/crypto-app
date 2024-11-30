import React from 'react';
import {View, Text, Switch} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useCryptoStore from '../../store/useCryptoStore';
import {styles} from './styles';
import CurrencySelector from '../../components/settings/CurrencySelector';
import SettingSwitch from '../../components/common/SettingSwitch';

const AVAILABLE_CURRENCIES = ['DZD', 'USD', 'EUR', 'GBP'];

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
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.section}>
          <SettingSwitch
            testID="price-alerts-switch"
            label="Price Alerts"
            value={settings.priceAlerts}
            onValueChange={handlePriceAlertsChange}
          />
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
    </SafeAreaView>
  );
};

export default SettingsScreen; 