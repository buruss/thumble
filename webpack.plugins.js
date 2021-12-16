const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = [new AntdDayjsWebpackPlugin(), new ForkTsCheckerWebpackPlugin({ async: true })];
