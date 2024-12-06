import {StyleSheet} from 'react-native';
import {colors} from '../../../styles/colors';

export const styles = StyleSheet.create({
  totalValue: {
    padding: 16,
    backgroundColor: colors.background,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  portfolioLabel: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  chartContainer: {
    height: 200,
    backgroundColor: colors.gray.light,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  chartLabel: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  assetsTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  actionButton: {
    padding: 8,
  },
  assetsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  titleContainer: {
    flex: 1,
    paddingVertical: 8,
  },
}); 