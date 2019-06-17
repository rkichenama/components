const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const { uglify, css } = require('./minifiers.config');

// all functions mutate the object
module.exports = {
  pipe: (...fns) => fns.reduceRight((f, g) => (...args) => f(g(...args))),
  compose: (...fns) => fns.reduce((f, g) => (...args) => f(g(...args))),
  addMinifiers (config) {
    config.optimization.minimizer = [
      uglify,
      css
    ];
    return config;
  },
  setProdEnv (config) {
    config.plugins.unshift(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    );
    config.mode = 'production';
    config.devServer = {
      contentBase: './doc'
    };
    config.externals = [
      'react',
      'react-dom',
      'prop-types',
      'axios',
    ];
    return config;
  },
  setDevEnv (config) {
    config.devServer = {
      contentBase: resolve(__dirname, '../docs'),
      compress: false,
      port: 9000,
      clientLogLevel: 'silent',
      hot: true,
      host: '0.0.0.0'
    };
    config.mode = 'development';
    config.performance.hints = false;
    config.stats = 'errors-only';
    return config;
  },
  addCssExtraction (config) {
    config.module.rules
      .filter(({ test }) => test && test.test('.css'))
      .forEach(rule => {
        let { use } = rule;
        rule.use = [
          MiniCssExtractPlugin.loader,
          ...use
        ];
      });
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].css'
      })
    );
    return config;
  },
  addHtml (title, bodyCls) {
    return (config) => {
      config.plugins.push(
        new HtmlWebpackPlugin({
          title,
          bodyCls,
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
        })
      );
      return config;
    };
  },
  addStyleLoader (config) {
    config.module.rules
      .filter(({ test }) => test && test.test('.css'))
      .forEach(rule => {
        let { use } = rule;
        rule.use = [require.resolve('style-loader'), ...use];
      });
    return config;
  },
};
