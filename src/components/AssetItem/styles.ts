import {StyleSheet} from 'react-native';
import {colors} from '../../styles/common/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
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
    fontSize: 16,
    fontWeight: '600',
  },
  amount: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 