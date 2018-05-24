const config = require('./webpack-base.config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

config.devServer = {
  contentBase: './doc'
};

config.module.rules
  .filter(({ test }) => test && test.test('.css'))
  .forEach(rule => {
    let { use } = rule;
    // rule.use = ExtractTextPlugin.extract({
    //   fallback: 'style-loader',
    //   use
    // });
    rule.use = [
      MiniCssExtractPlugin.loader,
      ...use
    ];
  });

config.optimization.minimizer = [
  new UglifyJSPlugin({
    uglifyOptions: {
      compress: {
        warnings: false,
        'reduce_vars': false
      },
      output: {
        comments: false
      }
    },
    sourceMap: true,
    parallel: true,
  }),
  new OptimizeCSSAssetsPlugin({
    cssProcessorOptions: {
      discardComments: { removeAll: true },
    },
  }),
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
  // new ExtractTextPlugin('[name].css'),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].css',
    chunkFilename: '[id].css'
  }),
];

config.mode = 'production';

module.exports = config;
