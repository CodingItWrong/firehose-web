const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  devServer: {
    static: './dist',
    historyApiFallback: true,
  },
});
