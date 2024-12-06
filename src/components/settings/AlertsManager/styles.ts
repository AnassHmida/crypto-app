import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';

export const styles = StyleSheet.create({
  // Main container styles
  container: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  

  addSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  
  
  pickerContainer: {
    backgroundColor: colors.background,
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: colors.text.primary,
  },
  

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    color: colors.text.primary,
    fontSize: 16,
  },
  

  typeButton: {
    backgroundColor: colors.background,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: colors.primary,
  },
  typeButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  

  addButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  

  alertItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  alertSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  alertPrice: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  

  deleteButton: {
    backgroundColor: colors.error,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  
 
  emptyText: {
    textAlign: 'center',
    color: colors.text.secondary,
    fontSize: 16,
    marginTop: 20,
  },
  
  cryptoSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedCryptoText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  
  // Modal styles matching your AddAssetModal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text.primary,
  },
  cryptoList: {
    width: '100%',
    flexGrow: 0,
    marginBottom: 15,
  },
  cryptoOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: colors.gray.light,
  },
  selectedCrypto: {
    backgroundColor: colors.primary + '20',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  cryptoInfo: {
    flex: 1,
  },
  cryptoSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  cryptoName: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});