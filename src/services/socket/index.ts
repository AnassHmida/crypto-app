import useCryptoStore from "../../store/useCryptoStore";
import { SUPPORTED_CRYPTOS } from '../../constants/supportedCryptos';

class SocketService {
  private ws: WebSocket | null = null;
  private readonly WS_URL = 'wss://ws.coinapi.io/v1/';
  private readonly API_KEY = '';
  private lastUpdate: Record<string, { 
    timestamp: number;
    price: number;
  }> = {};
  

  private readonly UPDATE_THRESHOLD = 1000;

  connect() {
    try {
      console.log('🔌 Starting CoinAPI connection...');
      this.ws = new WebSocket(`${this.WS_URL}?apikey=${this.API_KEY}`);

      this.ws.onopen = () => {
        console.log('Connected to CoinAPI!');
        
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
    
              useCryptoStore.getState().updatePrices({
                [symbol]: {
                  price: newPrice,
                  percentageChange
                }
              });


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
      };

      this.ws.onclose = () => {
        console.log('🔌 WebSocket closed');
        this.lastUpdate = {};
      };

    } catch (error) {
      console.error('❌ Connection failed:', error);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.lastUpdate = {};
    }
  }
}

const socketService = new SocketService();
export default socketService;