import React from 'react';
import {View, Text, TouchableOpacity, Switch} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import useCryptoStore from '../../store/useCryptoStore';
import {styles} from './styles';
import { colors } from '../../styles/common/colors';

const AVAILABLE_CURRENCIES = ['DZD', 'USD', 'EUR', 'GBP'];

const SettingsScreen = () => {
  const {currency, settings, updateSettings} = useCryptoStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Currency Preferences</Text>
        {AVAILABLE_CURRENCIES.map((curr) => (
          <TouchableOpacity
            key={curr}
            style={styles.currencyItem}
            onPress={() => updateSettings({ currency: curr })}>
            <Text style={styles.currencyText}>{curr}</Text>
            {currency === curr && (
              <Icon name="checkmark" size={24} color={colors.primary} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Price Alerts</Text>
          <Switch
            value={settings.priceAlerts}
            onValueChange={(value) => 
              updateSettings({ priceAlerts: value })
            }
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Portfolio Updates</Text>
          <Switch
            value={settings.portfolioAlerts}
            onValueChange={(value) =>
              updateSettings({ portfolioAlerts: value })
            }
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Auto-Refresh</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Real-time Updates</Text>
          <Switch
            value={settings.realTimeUpdates}
            onValueChange={(value) =>
              updateSettings({ realTimeUpdates: value })
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen; 