import {StyleSheet} from 'react-native';
import {colors} from '../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
  },
  label: {
    fontSize: 16,
    color: colors.text.primary,
  },
}); 