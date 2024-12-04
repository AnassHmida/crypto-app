import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 12,
    width: '90%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.text.primary,
  },
  dateContainer: {
    marginVertical: 10,
  },
  dateLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.text.primary,
  },
  dateButton: {
    padding: 12,
    backgroundColor: colors.gray.light,
    borderRadius: 8,
  },
  dateButtonText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: colors.gray.light,
  },
  applyButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.card,
    textAlign: 'center',
    fontWeight: 'bold',
  },
}); 