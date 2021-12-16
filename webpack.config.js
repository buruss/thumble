const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const path = require('path');

module.exports = {
  context: __dirname, // to automatically find tsconfig.json
  entry: {
    login: './src/login/index.tsx',
    main: './src/main/index.tsx',
  },
  output: { path: path.resolve(__dirname, 'dist'), filename: '[name].js' },
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    alias: {
      react: 'react',
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
