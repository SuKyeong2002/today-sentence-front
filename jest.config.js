module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest/setup.js'], 
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-navigation|@react-navigation|react-test-renderer)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
