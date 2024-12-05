import {StyleSheet} from 'react-native';
import {colors} from '../../../styles/colors';

export const styles = StyleSheet.create({
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.gray.light,
  },
  selectedItem: {
    backgroundColor: colors.gray.light,
  },
  currencyText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  selectedText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
}); 