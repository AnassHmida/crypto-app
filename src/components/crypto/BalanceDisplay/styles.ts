import {StyleSheet} from 'react-native';
import {colors} from '../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: 8,
  },
  cryptoAmount: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 4,
  },
}); 