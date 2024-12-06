import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from '../AlertsManager/styles';

interface PriceInputProps {
  value: string;
  onChangeText: (text: string) => void;
  isAbove: boolean;
  onToggleType: () => void;
}

const PriceInput = ({ value, onChangeText, isAbove, onToggleType }: PriceInputProps) => (
  <View style={styles.inputRow}>
    <TextInput
      style={styles.input}
      placeholder="Target Price"
      value={value}
      onChangeText={onChangeText}
      keyboardType="numeric"
    />
    <TouchableOpacity 
      style={[styles.typeButton, isAbove && styles.activeButton]}
      onPress={onToggleType}
    >
      <Text style={styles.typeButtonText}>{isAbove ? 'Above' : 'Below'}</Text>
    </TouchableOpacity>
  </View>
);

export default PriceInput; 