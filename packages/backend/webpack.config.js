const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
  entry: './handler.ts',
  devtool: 'source-map',
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.ts',
      '.tsx'
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      { test: /\.ts(x?)$/,
        
        exclude: [/node_modules/, /node_modules\/@types\/react/],
        loader: 'ts-loader'
      }
    ],
  },
};
