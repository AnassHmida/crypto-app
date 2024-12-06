import { renderHook, act } from '@testing-library/react-native';
import useAlertStore from '../../store/useAlertStore';

describe('AlertStore', () => {
  it('should add an alert', () => {
    const { result } = renderHook(() => useAlertStore());
    act(() => {
      result.current.addAlert('BTC', 50000, true);
    });
    expect(result.current.alerts).toHaveLength(1);
    expect(result.current.alerts[0].symbol).toBe('BTC');
  });

  it('should remove an alert', () => {
    const { result } = renderHook(() => useAlertStore());
    let alertId: string;
    
    act(() => {
      result.current.addAlert('ETH', 3000, false);
      alertId = result.current.alerts[0].id;
      result.current.removeAlert(alertId);
    });
    
    expect(result.current.alerts).toHaveLength(0);
  });
}); 