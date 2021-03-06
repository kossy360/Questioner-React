const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    hot: true,
    open: true,
    port: 1996,
    historyApiFallback: true
  },
  mode: 'development',
});
