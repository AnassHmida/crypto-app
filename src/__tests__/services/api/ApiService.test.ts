import axios from 'axios';
import ApiService from '../../../services/api/ApiService';


jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn()
  }))
}));

describe('ApiService', () => {
  let mockAxiosInstance: any;
  let apiService: ApiService;

  beforeEach(() => {
    jest.clearAllMocks();

    (ApiService as any).instance = null;
    
    mockAxiosInstance = {
      get: jest.fn()
    };
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);
    
    apiService = ApiService.getInstance();
  });

  it('should fetch exchange rates successfully', async () => {
    const mockResponse = {
      data: {
        rates: [
          { asset_id_quote: 'EUR', rate: 0.85 },
          { asset_id_quote: 'GBP', rate: 0.73 }
        ]
      }
    };

    mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

    const currencies = ['EUR', 'GBP'];
    const rates = await apiService.getExchangeRates(currencies);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      `/exchangerate/USD?filter_asset_id=${currencies.join(',')}`
    );
    
    expect(rates).toEqual({
      USD: 1,
      EUR: 0.85,
      GBP: 0.73
    });
  });

  it('should handle API errors', async () => {
    mockAxiosInstance.get.mockRejectedValueOnce(new Error('API Error'));

    await expect(apiService.getExchangeRates(['EUR']))
      .rejects.toThrow('API Error');
  });
}); 