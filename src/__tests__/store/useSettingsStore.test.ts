import { renderHook, act } from '@testing-library/react-native';
import useSettingsStore from '../../store/useSettingsStore';

describe('SettingsStore', () => {
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
      // Mock exchange rates
      result.current.exchangeRates = {
        EUR: 0.85,
        GBP: 0.73
      };
    });
    
    const converted = result.current.convertAmount(100, 'USD', 'EUR');
    expect(converted).toBe(85);
  });
}); 