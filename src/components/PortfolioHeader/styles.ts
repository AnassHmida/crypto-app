import {StyleSheet} from 'react-native';
import {colors} from '../../styles/common/colors';

export const styles = StyleSheet.create({
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
  assetsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 8,
  },
}); 