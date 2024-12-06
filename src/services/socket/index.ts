import useAssetStore from "../../store/useAssetStore";
import useSettingsStore from "../../store/useSettingsStore";
import useAlertStore from "../../store/useAlertStore";
import { SUPPORTED_CRYPTOS } from '../../constants/supportedCryptos';
import { COINAPI_WS_URL, COINAPI_KEY } from '@env';

class SocketService {
  private ws: WebSocket | null = null;
  private readonly WS_URL = COINAPI_WS_URL;
  private readonly API_KEY = COINAPI_KEY;
  private lastUpdate: Record<string, { 
    timestamp: number;
    price: number;
  }> = {};
  
  private readonly UPDATE_THRESHOLD = 1000;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private baseDelay = 1000; 
  private reconnectTimeout: NodeJS.Timeout | null = null;

  connect() {
    try {
      console.log('🔌 Starting CoinAPI connection...');
      this.ws = new WebSocket(`${this.WS_URL}?apikey=${this.API_KEY}`);

      this.ws.onopen = () => {
        console.log('Connected to CoinAPI!');
        this.reconnectAttempts = 0;

        const hello = {
          type: "hello",
          heartbeat: false,
          subscribe_data_type: ["trade"],
          subscribe_filter_symbol_id: SUPPORTED_CRYPTOS.map(
            crypto => `BINANCE_SPOT_${crypto.symbol}_USDT`
          )
        };
        
        this.ws?.send(JSON.stringify(hello));
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'trade') {
            const symbol = data.symbol_id.split('_')[2];
            const currentTime = Date.now();
            const newPrice = parseFloat(data.price);
            
            const lastUpdateData = this.lastUpdate[symbol];
            if (!lastUpdateData || 
                (currentTime - lastUpdateData.timestamp) >= this.UPDATE_THRESHOLD) {
              
              const percentageChange = lastUpdateData 
                ? ((newPrice - lastUpdateData.price) / lastUpdateData.price) * 100
                : 0;
    
              const updates = {
                [symbol]: {
                  price: newPrice,
                  percentageChange
                }
              };

              useAssetStore.getState().updatePrices(updates);
              useAlertStore.getState().checkAlerts(updates);

              this.lastUpdate[symbol] = {
                timestamp: currentTime,
                price: newPrice
              };
            }
          }
        } catch (error) {
          console.error('❌ Message processing error:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        this.attemptReconnect();
      };

      this.ws.onclose = () => {
        console.log('🔌 WebSocket closed');
        this.attemptReconnect();
      };

    } catch (error) {
      console.error('❌ Connection failed:', error);
      this.attemptReconnect();
    }
  }

  private attemptReconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    const delay = Math.min(
      this.baseDelay * Math.pow(2, this.reconnectAttempts),
      30000 
    );

    this.reconnectTimeout = setTimeout(() => {
      console.log(`Attempting reconnect ${this.reconnectAttempts + 1}/${this.maxReconnectAttempts}`);
      this.reconnectAttempts++;
      this.connect();
    }, delay);
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.lastUpdate = {};
    }
    this.reconnectAttempts = 0;
  }
}

const socketService = new SocketService();
export default socketService;