import {StyleSheet} from 'react-native';
import {colors} from '../../../styles/colors';

export const styles = StyleSheet.create({
  percentageChange: {
    fontSize: 14,
    fontWeight: '500',
  },
  positive: {
    color: colors.success,
  },
  negative: {
    color: colors.error,
  },
}); 