import {StyleSheet} from 'react-native';
import {colors} from '../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  cryptoAmount: {
    fontSize: 16,
    color: colors.text.secondary,
  },
}); 