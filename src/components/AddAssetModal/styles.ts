import {StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';

export const styles = StyleSheet.create({
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
  cryptoIcon: {
    fontSize: 24,
    marginRight: 12,
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
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.gray.light,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: colors.text.primary,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: colors.primary,
  },
  cancelButton: {
    backgroundColor: colors.error,
  },
  buttonText: {
    color: colors.card,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
}); 