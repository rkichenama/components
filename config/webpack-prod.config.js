const config = require('./webpack-base.config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { uglify, css } = require('./minifiers.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

config.devServer = {
  contentBase: './doc'
};

config.module.rules
  .filter(({ test }) => test && test.test('.css'))
  .forEach(rule => {
    let { use } = rule;
    rule.use = [
      MiniCssExtractPlugin.loader,
      ...use
    ];
  });

config.optimization.minimizer = [
  uglify,
  css
];

config.plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  ...config.plugins,
  new HtmlWebpackPlugin({
    title: 'Components by Richard Kichenama',
    bodyCls: 'prod',
    template: 'app/index.tmpl',
    filename: 'index.html',
    inject: 'body',
    chunksSortMode: 'dependency',
    minify: {
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
    },
    excludeChunks: [ 'worker' ],
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].css',
    chunkFilename: '[id].css'
  }),
];

config.mode = 'production';

module.exports = config;
