import {StyleSheet} from 'react-native';
import {colors} from '../common/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
  },
  currency: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  totalValue: {
    padding: 16,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  portfolioLabel: {
    fontSize: 18,
    color: colors.text.secondary,
  },
  chartContainer: {
    height: 200,
    backgroundColor: colors.gray.light,
    margin: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartLabel: {
    color: colors.text.secondary,
  },
  assetsSection: {
    flex: 1,
    padding: 16,
  },
  assetsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
}); 