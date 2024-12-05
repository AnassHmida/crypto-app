# Crypto Portfolio Tracker

A React Native application for real-time cryptocurrency portfolio tracking with offline support and price alerts.

## Features

- Real-time cryptocurrency price tracking
- Portfolio value visualization with historical data
- Offline support with data persistence
- Price alerts and notifications
- Custom date range filtering
- Multiple currency support
- Interactive price charts

## Technical Architecture

### State Management

The application uses Zustand for state management with persistent storage. Key features:

- Persistent storage using AsyncStorage
- Cached chart data for offline support
- Real-time price updates
- Portfolio history tracking
- Price alerts management

### Charts and Data Visualization

Two main chart components handle data visualization:

1. **PortfolioChart**: Displays aggregated portfolio value
   - 24-hour historical data
   - 5-minute cache for offline support
   - Automatic data refresh
   - Combined value calculation
   - Offline fallback support

2. **PriceChart**: Shows individual cryptocurrency prices
   - Interactive price points
   - Custom date range support
   - Responsive design
   - Cached data fallback
   - Multiple timeframe support

### Data Flow

1. **Price Updates**
   - Real-time price fetching via WebSocket
   - Automatic portfolio value recalculation
   - Price alerts monitoring
   - Chart data updates with 5-minute cache

2. **Offline Support**
   - All critical data persisted via Zustand
   - Automatic fallback to cached data
   - Graceful error handling for network failures

3. **Portfolio History**
   - Daily portfolio value recording
   - 30-day historical data retention
   - Automatic data cleanup


## Getting Started

1. Clone the repository

2. Create a .env file in the root directory with:

- COINAPI_KEY=your_api_key_here
- COINAPI_REST_URL=https://rest.coinapi.io/v1
- COINAPI_WS_URL=wss://ws.coinapi.io/v1

2. Install dependencies:
   npm install
3. Start the development server:
   npm start
4. Run on iOS/Android:
   npm run ios
   # or
   npm run android


## Performance Considerations

- Chart data cached for 5 minutes
- Optimized re-renders using React hooks
- Efficient data structures for quick access
- Network request batching
- Automatic cleanup of historical data

