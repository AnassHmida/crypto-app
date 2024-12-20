import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useAlertStore from '../../../store/useAlertStore';
import { styles } from './styles';
import { SUPPORTED_CRYPTOS } from '../../../constants/supportedCryptos';
import PriceInput from '../PriceInput/PriceInput';
import { colors } from '../../../styles/colors';
import AlertList from '../AlertList/AlertList';

interface AlertsManagerProps {
    testID?: string;
  }

const AlertsManager = ({ testID }: AlertsManagerProps) => {
  const { alerts, addAlert, removeAlert } = useAlertStore();
  const [selectedAsset, setSelectedAsset] = useState(SUPPORTED_CRYPTOS[0].symbol);
  const [targetPrice, setTargetPrice] = useState('');
  const [isAbove, setIsAbove] = useState(true);
  const [showCryptoModal, setShowCryptoModal] = useState(false);

  const handleAddAlert = () => {
    if (selectedAsset && targetPrice) {
      addAlert(selectedAsset, parseFloat(targetPrice), isAbove);
      setTargetPrice('');
    }
  };

  const renderCryptoOption = ({ item }: { item: { symbol: string; name: string } }) => (
    <TouchableOpacity
      style={[
        styles.cryptoOption,
        selectedAsset === item.symbol && styles.selectedCrypto
      ]}
      onPress={() => {
        setSelectedAsset(item.symbol);
        setShowCryptoModal(false);
      }}
    >
      <View style={styles.cryptoInfo}>
        <Text style={styles.cryptoSymbol}>{item.symbol}</Text>
        <Text style={styles.cryptoName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View testID={testID} style={styles.container}>
      <View style={styles.addSection}>
        <Text style={styles.title}>Add Price Alert</Text>
        
        <TouchableOpacity
          style={styles.cryptoSelector}
          onPress={() => setShowCryptoModal(true)}
        >
          <Text style={styles.selectedCryptoText}>
            {SUPPORTED_CRYPTOS.find(c => c.symbol === selectedAsset)?.symbol}
          </Text>
          <Icon name="arrow-drop-down" size={24} color={colors.text.primary} />
        </TouchableOpacity>

        <PriceInput
          value={targetPrice}
          onChangeText={setTargetPrice}
          isAbove={isAbove}
          onToggleType={() => setIsAbove(!isAbove)}
        />

        <TouchableOpacity 
          style={[styles.addButton, !targetPrice && styles.addButtonDisabled]}
          onPress={handleAddAlert}
          disabled={!targetPrice}
        >
          <Text style={styles.addButtonText}>Add Alert</Text>
        </TouchableOpacity>
      </View>

      <AlertList 
        alerts={alerts} 
        onRemove={removeAlert}
      />

      <Modal
        visible={showCryptoModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCryptoModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Crypto</Text>
            <FlatList
              data={SUPPORTED_CRYPTOS}
              renderItem={renderCryptoOption}
              keyExtractor={item => item.symbol}
              style={styles.cryptoList}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AlertsManager; 