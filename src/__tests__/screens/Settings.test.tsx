import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SettingsScreen from '../../screens/Settings';
import useCryptoStore from '../../store/useCryptoStore';


const mockUseCryptoStore = useCryptoStore as unknown as jest.MockedFunction<typeof useCryptoStore>;

jest.mock('../../store/useCryptoStore', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('SettingsScreen', () => {
  const mockUpdateSettings = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCryptoStore.mockImplementation(() => ({
      settings: {
        currency: 'USD',
        priceAlerts: true,
        portfolioAlerts: false,
        realTimeUpdates: true,
      },
      updateSettings: mockUpdateSettings,
    }));
  });

  it('renders all settings sections', () => {
    const {getByText} = render(<SettingsScreen />);
    expect(getByText('Currency Preferences')).toBeTruthy();
    expect(getByText('Price Alerts')).toBeTruthy();
    expect(getByText('Auto-Refresh')).toBeTruthy();
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
}); 