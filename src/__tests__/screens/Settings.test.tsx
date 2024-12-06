import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SettingsScreen from '../../screens/Settings';
import useSettingsStore from '../../store/useSettingsStore';
import useAlertStore from '../../store/useAlertStore';

jest.mock('../../store/useSettingsStore', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('../../store/useAlertStore', () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockUseSettingsStore = useSettingsStore as jest.MockedFunction<typeof useSettingsStore>;
const mockUseAlertStore = useAlertStore as jest.MockedFunction<typeof useAlertStore>;

describe('SettingsScreen', () => {
  const mockUpdateSettings = jest.fn();
  const mockAddAlert = jest.fn();
  const mockRemoveAlert = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseSettingsStore.mockImplementation((selector) => {
      const store = {
        settings: {
          currency: 'USD',
          priceAlerts: true,
          realTimeUpdates: true,
        },
        updateSettings: mockUpdateSettings,
        exchangeRates: {
          EUR: 0.85,
          GBP: 0.73
        },
        convertAmount: jest.fn(),
      };
      return typeof selector === 'function' ? selector(store) : store;
    });

    mockUseAlertStore.mockImplementation((selector) => {
      const store = {
        alerts: [
          {
            id: '1',
            symbol: 'BTC',
            targetPrice: 50000,
            isAbove: true
          }
        ],
        addAlert: mockAddAlert,
        removeAlert: mockRemoveAlert,
      };
      return typeof selector === 'function' ? selector(store) : store;
    });
  });

  it('renders all settings sections', () => {
    const {getByText} = render(<SettingsScreen />);
    expect(getByText('Currency Preferences')).toBeTruthy();
    expect(getByText('Price Alerts')).toBeTruthy();
  });

  it('handles currency selection', () => {
    const {getByTestId} = render(<SettingsScreen />);
    const currencyOption = getByTestId('currency-option-USD');
    fireEvent.press(currencyOption);
    expect(mockUpdateSettings).toHaveBeenCalledWith({ currency: 'USD' });
  });

  it('toggles notification settings', () => {
    const {getByTestId} = render(<SettingsScreen />);
    const priceAlertsSwitch = getByTestId('price-alerts-switch');
    
    fireEvent(priceAlertsSwitch, 'onValueChange', false);
    expect(mockUpdateSettings).toHaveBeenCalledWith({ priceAlerts: false });
  });

  it('displays existing alerts when price alerts are enabled', () => {
    const {getByText} = render(<SettingsScreen />);
    expect(getByText('BTC')).toBeTruthy();
    expect(getByText('↑ $50,000.00')).toBeTruthy();
  });

  it('allows adding new price alerts', () => {
    const {getByTestId, getByText} = render(<SettingsScreen />);
    const addButton = getByText('Add Alert');
    
    fireEvent.changeText(getByTestId('price-input'), '45000');
    fireEvent.press(addButton);
    
    expect(mockAddAlert).toHaveBeenCalledWith('BTC', 45000, true);
  });

  it('allows removing existing alerts', () => {
    const {getAllByTestId} = render(<SettingsScreen />);
    const deleteButtons = getAllByTestId('delete-alert-button');
    
    fireEvent.press(deleteButtons[0]);
    expect(mockRemoveAlert).toHaveBeenCalledWith('1');
  });
}); 