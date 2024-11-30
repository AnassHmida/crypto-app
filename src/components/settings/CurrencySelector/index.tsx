import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../styles/colors';
import {styles} from './styles';

interface CurrencySelectorProps {
  currencies: string[];
  selectedCurrency: string;
  onSelect: (currency: string) => void;
}

const CurrencySelector = ({
  currencies,
  selectedCurrency,
  onSelect,
}: CurrencySelectorProps) => {

    console.log("selected currency === ",selectedCurrency)
  return (
    <View>
      {currencies.map((currency) => (
        <TouchableOpacity
          key={currency}
          testID={`currency-option-${currency}`}
          style={[
            styles.currencyItem,
            selectedCurrency === currency && styles.selectedItem
          ]}
          onPress={() => onSelect(currency)}>
          <Text 
            testID="currency-option" 
            style={[
              styles.currencyText,
              selectedCurrency === currency && styles.selectedText
            ]}>
            {currency}
          </Text>
          {selectedCurrency === currency && (
            <Icon name="checkmark" size={20} color={colors.primary} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CurrencySelector; 