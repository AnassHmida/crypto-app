module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-vector-icons|@react-native)/)',
  ],
};
