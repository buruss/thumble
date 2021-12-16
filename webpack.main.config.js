const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

// nest.js를 webpack bundle화하기 위해 필요한 플러그인
const WebPackIgnorePlugin = {
  checkResource: function (resource) {
    const lazyImports = [
      '@nestjs/microservices',
      '@nestjs/microservices/microservices-module',
      'cache-manager',
      'class-transformer',
      'class-validator',
      '@nestjs/websockets/socket-module',
      '@nestjs/platform-express',
      '@grpc/grpc-js',
      '@grpc/proto-loader',
      'kafkajs',
      'mqtt',
      'nats',
      'redis',
      'amqplib',
      'amqp-connection-manager',
    ];
    if (!lazyImports.includes(resource)) return false;
    try {
      require.resolve(resource);
    } catch (err) {
      return true;
    }
    return false;
  },
};

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: {
    index: './src/main/index.ts',
    worker: './src/main/worker/index.ts',
  },
  output: {
    filename: '[name].js',
  },
  // Put your normal webpack config below here
  module: {
    rules: [
      ...require('./webpack.rules'),
      {
        test: /\.js$/,
        use: 'unlazy-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
  // Cannot find module '_http_common' 오류 해결
  externals: ['_http_common'],
  plugins: [
    new webpack.IgnorePlugin(WebPackIgnorePlugin),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '.local-chromium'),
          to: '.local-chromium',
        },
        {
          from: path.resolve(__dirname, 'prisma', 'data.db'),
          to: 'data.db',
        },
        {
          from: path.resolve(__dirname, 'prisma', 'schema.prisma'),
          to: 'schema.prisma',
        },
      ],
    }),
  ],
};
