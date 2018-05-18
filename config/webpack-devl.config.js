const config = require('./webpack-base.config');
const webpack = require('webpack');
// const NpmInstallPlugin = require('npm-install-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackServeWaitpage = require('webpack-serve-waitpage');

config.serve = {
  hot: true,
  clipboard: false,
  add: (app, middleware, options) => {
    app.use(webpackServeWaitpage(options, {
      title: 'development',
      theme: 'dark'
    }));
  }
};

config.devServer = {
  contentBase: './docs'
};

config.module.rules
  .filter(({ test }) => test && test.test('.css'))
  .forEach(rule => {
    let { use } = rule;
    rule.use = [require.resolve('style-loader'), ...use];
  });

config.plugins = [
  ...config.plugins,
  // new NpmInstallPlugin({
  //   dev: false,
  //   quiet: true,
  // }),
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
  // new webpack.HotModuleReplacementPlugin(),
];

config.mode = 'development';

module.exports = config;
