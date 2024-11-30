import {StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.light,
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  symbol: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  amount: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
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
  deleteAction: {
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: '100%',
  },
}); 