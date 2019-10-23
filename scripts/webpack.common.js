const path = require('path');

const libraryName = 'HERETracking';

let outputFile = libraryName + '.js';

const config = {
  context: path.resolve(__dirname, '..', 'src'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, '..', 'lib'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }, {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'eslint-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  plugins: [],
  resolve: {
    modules: [
      path.resolve(__dirname, '../', 'node_modules'),
      path.resolve(__dirname, '../', 'src')
    ]
  }
};

module.exports = config;
