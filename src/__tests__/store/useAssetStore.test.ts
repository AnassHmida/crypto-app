import { renderHook, act } from '@testing-library/react-native';
import useAssetStore from '../../store/useAssetStore';

describe('AssetStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useAssetStore());
    act(() => {
      result.current.assets = [];
      result.current.totalValue = 0;
    });
  });

  it('should add an asset', () => {
    const { result } = renderHook(() => useAssetStore());
    act(() => {
      result.current.addAsset('BTC', 1.5);
    });
    expect(result.current.assets).toHaveLength(1);
    expect(result.current.assets[0].symbol).toBe('BTC');
  });

  it('should remove an asset', () => {
    const { result } = renderHook(() => useAssetStore());
    act(() => {
      result.current.addAsset('ETH', 2.0);
      result.current.removeAsset('ETH');
    });
    expect(result.current.assets).toHaveLength(0);
  });
}); 