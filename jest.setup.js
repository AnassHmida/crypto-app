jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
  };
});


// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
    multiGet: jest.fn(),
    multiSet: jest.fn(),
    multiRemove: jest.fn(),
    mergeItem: jest.fn(),
  }));
  

  jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
  
  jest.mock('@react-navigation/native', () => ({
    NavigationContainer: ({ children }) => children,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
  }));
  
  jest.mock('react-native-push-notification', () => ({
    configure: jest.fn(),
    onRegister: jest.fn(),
    onNotification: jest.fn(),
    addEventListener: jest.fn(),
    requestPermissions: jest.fn(),
    createChannel: jest.fn(),
    Importance: {
      DEFAULT: 3,
      HIGH: 4,
      LOW: 2,
      MIN: 1,
      NONE: 0,
    },
  }));
  
  jest.mock('@react-native-community/push-notification-ios', () => ({
    addEventListener: jest.fn(),
    requestPermissions: jest.fn(),
    getInitialNotification: jest.fn(),
  }));

  jest.mock('@react-navigation/bottom-tabs', () => ({
    createBottomTabNavigator: () => ({
      Navigator: ({ children }) => children,
      Screen: ({ children }) => children,
    }),
  }));
  
  jest.mock('@react-navigation/native-stack', () => ({
    createNativeStackNavigator: () => ({
      Navigator: ({ children }) => children,
      Screen: ({ children }) => children,
    }),
  }));
  
  jest.mock('@react-native-community/datetimepicker', () => {
    const mockComponent = require('react-native/jest/mockComponent');
    return mockComponent('@react-native-community/datetimepicker');
  });
  

  
