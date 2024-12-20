import axios, { AxiosInstance } from 'axios';
import { COINAPI_REST_URL, COINAPI_KEY } from '@env';
import { Asset } from '../../store/useAssetStore';

class ApiService {
  private static instance: ApiService;
  private api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL: COINAPI_REST_URL,
      headers: {
        'X-CoinAPI-Key': COINAPI_KEY
      }
    });
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public async getExchangeRates(currencies: string[]): Promise<Record<string, number>> {
    try {
      const response = await this.api.get(`/exchangerate/USD?filter_asset_id=${currencies.join(',')}`);
      const rates: Record<string, number> = { USD: 1 };
      
      if (!response?.data) {
        throw new Error('API Error');
      }
      
      if (!Array.isArray(response.data.rates)) {
        throw new Error('API Error');
      }
      
      response.data.rates.forEach((rate: { asset_id_quote: string; rate: number }) => {
        rates[rate.asset_id_quote] = rate.rate;
      });
      
      return rates;
    } catch (error) {
      console.error('API Error:', error instanceof Error ? error.message : error);
      throw new Error('API Error');
    }
  }

  async getHistoricalPrices(symbol: string, timeRange: string, currency: string): Promise<any> {
    const now = new Date();
    let startTime: Date;
    let period_id: string;

    switch (timeRange) {
      case '1D':
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        period_id = '5MIN';
        break;
      case '1W':
        startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        period_id = '1HRS';
        break;
      case '1M':
        startTime = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        period_id = '1DAY';
        break;
      case '1Y':
        startTime = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        period_id = '1DAY';
        break;
      default:
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        period_id = '5MIN';
    }

    const response = await this.api.get(
      `/exchangerate/${symbol}/${currency}/history`,
      {
        params: {
          period_id,
          time_start: startTime.toISOString(),
          time_end: now.toISOString(),
          limit: 2000
        }
      }
    );

    return response.data;
  }

    async getHistoricalPricesCustomRange(
    symbol: string,
    currency: string = 'USD',
    startDate: string,
    endDate: string
  ) {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const daysDiff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

      // Choose period based on date range
      let period_id: string;
      if (daysDiff <= 1) {
        period_id = '30MIN';      // 30-minute intervals for 1 day
      } else if (daysDiff <= 7) {
        period_id = '2HRS';       // 2-hour intervals for a week
      } else if (daysDiff <= 30) {
        period_id = '8HRS';       // 8-hour intervals for a month
      } else if (daysDiff <= 90) {
        period_id = '1DAY';       // Daily for up to 3 months
      } else if (daysDiff <= 180) {
        period_id = '2DAY';       // 2-day intervals for up to 6 months
      } else if (daysDiff <= 365) {
        period_id = '3DAY';       // 3-day intervals for up to a year
      } else {
        period_id = '1WEK';       // Weekly for over a year
      }

      console.log(`Using period_id: ${period_id} for ${daysDiff} days range`);

      start.setUTCHours(0, 0, 0, 0);
      end.setUTCHours(23, 59, 59, 999);
      console.log('symbol ==== ',symbol)
      console.log('currency ==== ',currency)
      const response = await axios.get(
        `${COINAPI_REST_URL}/exchangerate/${symbol}/USD/history`,
        {
          params: {
            period_id,
            time_start: start.toISOString(),
            time_end: end.toISOString(),
            limit: 2000  // Maximum limit to get as many data points as possible
          },
          headers: {
            'X-CoinAPI-Key': COINAPI_KEY
          }
        }
      );

      console.log(`Received ${response.data} data points`);

      // Sort the data chronologically
      const sortedData = response.data.sort((a: any, b: any) => 
        new Date(a.time_period_start).getTime() - new Date(b.time_period_start).getTime()
      );

      return sortedData;
    } catch (error) {
      console.error('Error fetching historical prices:', error);
      throw error;
    }
  }

  async getPortfolioHistoricalData(assets: Asset[], currency: string) {
    try {

      const endDate = new Date();
      const startDate = new Date();


      const assetHistories = await Promise.all(
        assets.map(async (asset) => {
          const history = await this.getHistoricalPricesCustomRange(
            asset.symbol.toLowerCase(),
            currency,
            startDate.toISOString(),
            endDate.toISOString()
          );
          
          // Map the history to include the asset amount
          return history.map((dataPoint: any) => ({
            timestamp: dataPoint.time_period_start,
            value: dataPoint.rate_close * asset.amount
          }));
        })
      );

      // Combine all histories by timestamp
      const combinedHistory = this.combineHistoricalData(assetHistories);
      return combinedHistory;
    } catch (error) {
      console.error('Error fetching portfolio historical data:', error);
      return [];
    }
  }

  private combineHistoricalData(assetHistories: any[]) {
    // Create a map of timestamp to total value
    const timestampMap = new Map<string, number>();

    assetHistories.forEach(assetHistory => {
      assetHistory.forEach((dataPoint: any) => {
        const existing = timestampMap.get(dataPoint.timestamp) || 0;
        timestampMap.set(dataPoint.timestamp, existing + dataPoint.value);
      });
    });

    // Convert map to sorted array
    return Array.from(timestampMap.entries())
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([timestamp, value]) => ({
        timestamp,
        value
      }));
  }
}

export default ApiService; 