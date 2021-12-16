const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const path = require('path');

const staticFolders = ['static']; // asset directories

module.exports = [
  new AntdDayjsWebpackPlugin(),
  new ForkTsCheckerWebpackPlugin({ async: true }),
  ...staticFolders.map(staticFolder => {
    return new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'renderer', staticFolder),
          to: path.resolve(__dirname, '.webpack', 'renderer', staticFolder),
        },
      ],
    });
  }),
];
