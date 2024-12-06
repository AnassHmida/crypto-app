import { renderHook, act } from '@testing-library/react-native';
import useChartStore from '../../store/useChartStore';

describe('ChartStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useChartStore());
    act(() => {
      result.current.portfolioHistory = [];
      result.current.priceCharts = {};
    });
  });

  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useChartStore());
    expect(result.current.portfolioHistory).toEqual([]);
    expect(result.current.priceCharts).toEqual({});
  });

  it('should update portfolio history', () => {
    const { result } = renderHook(() => useChartStore());
    const mockHistoryData = [
      { timestamp: '2024-01-01', value: 1000 },
      { timestamp: '2024-01-02', value: 1100 },
      { timestamp: '2024-01-03', value: 1200 }
    ];

    act(() => {
      result.current.updatePortfolioHistory(mockHistoryData);
    });

    expect(result.current.portfolioHistory).toEqual(mockHistoryData);
  });

  it('should update price chart for a specific symbol', () => {
    const { result } = renderHook(() => useChartStore());
    const mockChartData = {
      values: [100, 200, 300],
      labels: ['Jan', 'Feb', 'Mar'],
      lastUpdated: '2024-01-01T00:00:00.000Z'
    };

    act(() => {
      result.current.updatePriceChart('BTC', mockChartData);
    });

    expect(result.current.priceCharts['BTC']).toEqual(mockChartData);
  });

  it('should handle multiple price charts', () => {
    const { result } = renderHook(() => useChartStore());
    const mockBTCData = {
      values: [100, 200, 300],
      labels: ['Jan', 'Feb', 'Mar'],
      lastUpdated: '2024-01-01T00:00:00.000Z'
    };
    const mockETHData = {
      values: [400, 500, 600],
      labels: ['Jan', 'Feb', 'Mar'],
      lastUpdated: '2024-01-01T00:00:00.000Z'
    };

    act(() => {
      result.current.updatePriceChart('BTC', mockBTCData);
      result.current.updatePriceChart('ETH', mockETHData);
    });

    expect(result.current.priceCharts['BTC']).toEqual(mockBTCData);
    expect(result.current.priceCharts['ETH']).toEqual(mockETHData);
    expect(Object.keys(result.current.priceCharts)).toHaveLength(2);
  });

  it('should update existing price chart data', () => {
    const { result } = renderHook(() => useChartStore());
    const initialData = {
      values: [100, 200, 300],
      labels: ['Jan', 'Feb', 'Mar'],
      lastUpdated: '2024-01-01T00:00:00.000Z'
    };
    const updatedData = {
      values: [150, 250, 350],
      labels: ['Jan', 'Feb', 'Mar'],
      lastUpdated: '2024-01-02T00:00:00.000Z'
    };

    act(() => {
      result.current.updatePriceChart('BTC', initialData);
      result.current.updatePriceChart('BTC', updatedData);
    });

    expect(result.current.priceCharts['BTC']).toEqual(updatedData);
  });
});