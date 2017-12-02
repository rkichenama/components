const config = require('./webpack-base.config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

config.devServer = {
  contentBase: './doc'
};

config.plugins = [
  ...config.plugins,
  new HtmlWebpackPlugin({
    title: 'Components by Richard Kichenama',
    template: 'app/index.tmpl',
    filename: 'index.html',
    inject: 'body',
    chunksSortMode: 'dependency',
    minify: {
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
    },
    // excludeChunks: [],
  }),
];

module.exports = config;
