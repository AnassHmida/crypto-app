import React from 'react';
import {View, Text, Switch} from 'react-native';
import {colors} from '../../../styles/colors';
import {styles} from './styles';

interface SettingSwitchProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  testID?: string; 
}

const SettingSwitch = ({label, value, onValueChange,testID}: SettingSwitchProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: colors.gray.light, true: colors.primary }}
      thumbColor={colors.background}
      testID={testID}
    />
  </View>
);

export default SettingSwitch; 