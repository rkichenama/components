'use strict';
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  target: 'web',
  context: path.join(__dirname, '../src'),
  output: {
    filename: 'lib/[name].js',
    library: 'lego',
    libraryTarget: 'commonjs2'
  },
  externals: [
    'react',
    'react-dom',
    'prop-types',
    'jquery',
    'react-highcharts',
    /react-bootstrap/
  ],
  module: {
    noParse: /\.min\.js/,
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader', use: 'css-loader!sass-loader'
        })
      },
      {
        test: /\.svg$/,
        loader: 'file-loader?name=lib/[name].[ext]'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=public/fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('lib/[name].css')
  ]
};
