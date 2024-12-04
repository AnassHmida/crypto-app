import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';

interface DateRangeFilterProps {
  visible: boolean;
  onClose: () => void;
  onApply: (startDate: Date, endDate: Date) => void;
}

const DateRangeFilter = ({ visible, onClose, onApply }: DateRangeFilterProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
console.log('render')
  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    if (Platform.OS === 'android') {
      setShowStartPicker(false);
    }
    if (event.type !== 'dismissed' && selectedDate) {
      setStartDate(currentDate);
    }
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || endDate;
    if (Platform.OS === 'android') {
      setShowEndPicker(false);
    }
    if (event.type !== 'dismissed' && selectedDate) {
      setEndDate(currentDate);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Custom Date Range</Text>
          
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Start Date:</Text>
            <TouchableOpacity 
              style={styles.dateButton}
              onPress={() => setShowStartPicker(true)}
            >
              <Text style={styles.dateButtonText}>
                {startDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>End Date:</Text>
            <TouchableOpacity 
              style={styles.dateButton}
              onPress={() => setShowEndPicker(true)}
            >
              <Text style={styles.dateButtonText}>
                {endDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          </View>

          {(showStartPicker || showEndPicker) && Platform.OS === 'android' && (
            <DateTimePicker
              value={showStartPicker ? startDate : endDate}
              mode="date"
              onChange={showStartPicker ? handleStartDateChange : handleEndDateChange}
              maximumDate={showStartPicker ? endDate : new Date()}
              minimumDate={showStartPicker ? undefined : startDate}
            />
          )}

          {Platform.OS === 'ios' && (
            <>
              {showStartPicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  onChange={handleStartDateChange}
                  maximumDate={endDate}
                />
              )}
              {showEndPicker && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  onChange={handleEndDateChange}
                  minimumDate={startDate}
                  maximumDate={new Date()}
                />
              )}
            </>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.applyButton]} 
              onPress={() => onApply(startDate, endDate)}
            >
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DateRangeFilter; 