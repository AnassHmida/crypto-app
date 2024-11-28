import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import TabNavigator from './TabNavigator';
import CryptoDetailsScreen from '../screens/CryptoDetails';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CryptoDetails"
          component={CryptoDetailsScreen}
          options={{title: 'Crypto Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator; 