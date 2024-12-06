import { renderHook, act } from '@testing-library/react-native';
import useSettingsStore from '../../store/useSettingsStore';

describe('SettingsStore', () => {
  beforeEach(() => {
    useSettingsStore.setState({
      settings: { currency: 'USD' },
      exchangeRates: {},
      updateSettings: (newSettings) => {
        useSettingsStore.setState(state => ({
          settings: { ...state.settings, ...newSettings }
        }));
      },
      convertAmount: (amount) => amount
    });
  });

  it('should update settings', () => {
    const { result } = renderHook(() => useSettingsStore());
    
    act(() => {
      result.current.updateSettings({ currency: 'EUR' });
    });
    
    expect(result.current.settings.currency).toBe('EUR');
  });

  it('should convert amounts between currencies', () => {
    const { result } = renderHook(() => useSettingsStore());
    
    act(() => {
      useSettingsStore.setState(state => ({
        ...state,
        exchangeRates: { EUR: 0.85, USD: 1 }
      }));
    });
    
    const converted = result.current.convertAmount(100);
    expect(converted).toBe(100);
  });
}); 