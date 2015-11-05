var path = require('path');
var webpack = require('webpack');


module.exports = {
  devtool: 'inline-source-map',

  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
      {test: /\.html$/, loader: 'raw'}
    ]
  },

  output: {
    filename: '[name].js',
    path: path.resolve('./target'),
    publicPath: '/'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('test')
    })
  ],

  resolve: {
    root: path.resolve('./src')
  }
};
