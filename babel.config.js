module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: true,
        allowUndefined: false,
      },
    ],
    'react-native-reanimated/plugin',
    ['@babel/plugin-transform-private-methods', { loose: false }], 
    ['@babel/plugin-transform-private-property-in-object', { loose: false }],
    ['@babel/plugin-transform-class-properties', { loose: false }],
    ['@babel/plugin-proposal-export-namespace-from'], // 추가
    ['@babel/plugin-proposal-export-default-from'], // 추가
  ],
};
