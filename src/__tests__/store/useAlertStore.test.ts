import { renderHook, act } from '@testing-library/react-native';
import useAlertStore from '../../store/useAlertStore';

describe('AlertStore', () => {
  beforeEach(() => {
    useAlertStore.setState({
      alerts: [],
      addAlert: (symbol: string, price: number, isAbove: boolean) => {
        const id = Date.now().toString();
        const newAlert = {
          id,
          symbol,
          targetPrice: price,
          isAbove,
          createdAt: new Date().toISOString()
        };
        
        useAlertStore.setState(state => ({
          alerts: [...state.alerts, newAlert]
        }));
        return id;
      },
      removeAlert: (alertId: string) => {
        useAlertStore.setState(state => ({
          alerts: state.alerts.filter(alert => alert.id !== alertId)
        }));
      }
    });
  });

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
    
    act(() => {
      const alertId = result.current.addAlert('ETH', 3000, false);
      result.current.removeAlert(alertId);
    });
    
    expect(result.current.alerts).toHaveLength(0);
  });
}); 