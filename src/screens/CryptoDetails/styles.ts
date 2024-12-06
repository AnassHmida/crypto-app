import {StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.light,
  },
  assetInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.light,
  },
  assetSymbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginRight: 8,
  },
  chartSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.gray.light,
    borderRadius: 8,
  },
  filterText: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray.light,
  }
}); 