import {StyleSheet} from 'react-native';
import {colors} from '../common/colors';

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
  chartContainer: {
    flex: 1,
    backgroundColor: colors.gray.light,
    margin: 16,
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceContainer: {
    padding: 16,
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