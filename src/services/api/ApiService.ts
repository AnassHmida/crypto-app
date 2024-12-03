import axios, { AxiosInstance } from 'axios';

class ApiService {
  private static instance: ApiService;
  private api: AxiosInstance;
  private readonly COINAPI_KEY = '';

  private constructor() {
    this.api = axios.create({
      baseURL: 'https://rest.coinapi.io/v1',
      headers: {
        'X-CoinAPI-Key': this.COINAPI_KEY
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
}

export default ApiService; 