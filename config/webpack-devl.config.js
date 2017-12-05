const config = require('./webpack-base.config');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

config.devServer = {
  contentBase: './docs'
};

config.plugins = [
  ...config.plugins,
  new NpmInstallPlugin({
    dev: false,
    quiet: true,
  }),
  new HtmlWebpackPlugin({
    title: '(dev) Components',
    bodyCls: 'dev',
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
  new webpack.HotModuleReplacementPlugin(),
];

module.exports = config;
