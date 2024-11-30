import {renderHook, act} from '@testing-library/react-native';
import useCryptoStore from '../../store/useCryptoStore';

describe('CryptoStore', () => {
  beforeEach(() => {
    const {result} = renderHook(() => useCryptoStore());
    act(() => {
      result.current.assets = [];
      result.current.totalValue = 0;
    });
  });

  it('should add an asset', () => {
    const {result} = renderHook(() => useCryptoStore());
    act(() => {
      result.current.addAsset('BTC', 1.5);
    });
    expect(result.current.assets).toHaveLength(1);
    expect(result.current.assets[0].symbol).toBe('BTC');
  });

  it('should remove an asset', () => {
    const {result} = renderHook(() => useCryptoStore());
    act(() => {
      result.current.addAsset('ETH', 2.0);
      result.current.removeAsset('ETH');
    });
    expect(result.current.assets).toHaveLength(0);
  });

  it('should update settings', () => {
    const {result} = renderHook(() => useCryptoStore());
    act(() => {
      result.current.updateSettings({ currency: 'USD' });
    });
    expect(result.current.settings.currency).toBe('USD');
    
    // Test other settings
    act(() => {
      result.current.updateSettings({ priceAlerts: false });
    });
    expect(result.current.settings.priceAlerts).toBe(false);
  });
}); 