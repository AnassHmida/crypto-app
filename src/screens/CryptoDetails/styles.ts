import {StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  symbol: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterButton: {
    backgroundColor: colors.gray.light,
    padding: 8,
    borderRadius: 8,
  },
  filterText: {
    fontSize: 16,
  },
  priceContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.light,
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  percentageChange: {
    fontSize: 16,
    fontWeight: '500',
  },
  positive: {
    color: colors.success,
  },
  negative: {
    color: colors.error,
  },
  chartContainer: {
    flex: 1,
    backgroundColor: colors.gray.light,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  balanceContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray.light,
  },
  balanceTitle: {
    fontSize: 18,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cryptoAmount: {
    fontSize: 16,
    color: colors.text.secondary,
  },
}); 