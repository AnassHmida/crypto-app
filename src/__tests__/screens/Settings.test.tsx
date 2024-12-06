import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsScreen from '../../screens/Settings';
import useSettingsStore from '../../store/useSettingsStore';

// Mock the stores
jest.mock('../../store/useSettingsStore');

describe('SettingsScreen', () => {
  // Setup mock implementation
  beforeEach(() => {
    (useSettingsStore as jest.Mock).mockImplementation((selector) => {
      const store = {
        settings: {
          currency: 'USD',
          priceAlerts: false
        },
        updateSettings: jest.fn()
      };
      return selector(store);
    });
  });

  it('renders correctly with initial settings', () => {
    const { getByText } = render(<SettingsScreen />);
    
    expect(getByText('Currency Preferences')).toBeTruthy();
    expect(getByText('Price Alerts')).toBeTruthy();
  });

  it('displays currency selector with available currencies', () => {
    const { getByText } = render(<SettingsScreen />);
    
    expect(getByText('USD')).toBeTruthy();
    expect(getByText('EUR')).toBeTruthy();
    expect(getByText('GBP')).toBeTruthy();
  });

  it('handles currency selection', () => {
    const mockUpdateSettings = jest.fn();
    (useSettingsStore as jest.Mock).mockImplementation((selector) => {
      const store = {
        settings: {
          currency: 'USD',
          priceAlerts: false
        },
        updateSettings: mockUpdateSettings
      };
      return selector(store);
    });

    const { getByTestId } = render(<SettingsScreen />);
    const eurOption = getByTestId('currency-option-EUR');
    
    fireEvent.press(eurOption);
    
    expect(mockUpdateSettings).toHaveBeenCalledWith({ currency: 'EUR' });
  });

  it('toggles price alerts', () => {
    const mockUpdateSettings = jest.fn();
    (useSettingsStore as jest.Mock).mockImplementation((selector) => {
      const store = {
        settings: {
          currency: 'USD',
          priceAlerts: false
        },
        updateSettings: mockUpdateSettings
      };
      return selector(store);
    });

    const { getByTestId } = render(<SettingsScreen />);
    const alertsSwitch = getByTestId('price-alerts-switch');
    
    fireEvent(alertsSwitch, 'onValueChange', true);
    
    expect(mockUpdateSettings).toHaveBeenCalledWith({ priceAlerts: true });
  });

  it('shows AlertsManager when price alerts are enabled', () => {
    (useSettingsStore as jest.Mock).mockImplementation((selector) => {
      const store = {
        settings: {
          currency: 'USD',
          priceAlerts: true
        },
        updateSettings: jest.fn()
      };
      return selector(store);
    });

    const { getByTestId } = render(<SettingsScreen />);
    
    expect(() => getByTestId('alerts-manager')).not.toThrow();
  });

  it('does not show AlertsManager when price alerts are disabled', () => {
    (useSettingsStore as jest.Mock).mockImplementation((selector) => {
      const store = {
        settings: {
          currency: 'USD',
          priceAlerts: false
        },
        updateSettings: jest.fn()
      };
      return selector(store);
    });

    const { queryByTestId } = render(<SettingsScreen />);
    
    // AlertsManager should not be rendered when priceAlerts is false
    expect(queryByTestId('alerts-manager')).toBeNull();
  });
});