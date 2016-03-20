const autoprefixer = require('autoprefixer');
const path = require('path');


module.exports = {
  entry: {
    main: './src/main.js',
    vendor: [
      'babel-polyfill',
      'angular',
      'angular-ui-router',
      'ng-redux',
      'redux'
    ]
  },

  output: {
    filename: '[name].js',
    path: path.resolve('./target'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules'],
    root: path.resolve('.')
  },

  postcss: [
    autoprefixer({ browsers: ['last 3 versions', 'Firefox ESR'] })
  ],

  sassLoader: {
    outputStyle: 'compressed',
    precision: 10,
    sourceComments: false
  }
};
