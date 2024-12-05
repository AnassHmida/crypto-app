import {StyleSheet} from 'react-native';
import {colors} from '../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  percentageChange: {
    fontSize: 16,
    marginTop: 8,
  },
  positive: {
    color: colors.success,
  },
  negative: {
    color: colors.error,
  },
}); 