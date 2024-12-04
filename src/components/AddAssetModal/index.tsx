import React from 'react';
import {Modal, View, Text, TouchableOpacity, TextInput, FlatList} from 'react-native';
import {styles} from './styles';
import {SUPPORTED_CRYPTOS} from '../../constants/supportedCryptos';
import {colors} from '../../styles/colors';

interface AddAssetModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (symbol: string, amount: number) => void;
}

const AddAssetModal = ({visible, onClose, onAdd}: AddAssetModalProps) => {
  const [selectedSymbol, setSelectedSymbol] = React.useState('');
  const [amount, setAmount] = React.useState('');

  const handleAdd = () => {
    if (selectedSymbol && amount) {
      onAdd(selectedSymbol, parseFloat(amount));
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedSymbol('');
    setAmount('');
    onClose();
  };

  return (
    <Modal
      testID="add-asset-modal"
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Asset</Text>
          
          <FlatList
            data={SUPPORTED_CRYPTOS}
            style={styles.cryptoList}
            renderItem={({item: crypto}) => (
              <TouchableOpacity
                style={[
                  styles.cryptoOption,
                  selectedSymbol === crypto.symbol && styles.selectedCrypto
                ]}
                onPress={() => setSelectedSymbol(crypto.symbol)}
              >
                <Text style={styles.cryptoIcon}>{crypto.icon}</Text>
                <View style={styles.cryptoInfo}>
                  <Text style={styles.cryptoSymbol}>{crypto.symbol}</Text>
                  <Text style={styles.cryptoName}>{crypto.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.symbol}
          />
          
          {selectedSymbol && (
            <TextInput
              style={styles.input}
              placeholder={`Amount of ${selectedSymbol}`}
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
            />
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.button, 
                styles.addButton,
                (!selectedSymbol || !amount) && styles.disabledButton
              ]}
              onPress={handleAdd}
              disabled={!selectedSymbol || !amount}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddAssetModal; 