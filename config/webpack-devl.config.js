const config = require('./webpack-base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackServeWaitpage = require('webpack-serve-waitpage');

config.serve = {
  contentBase: './docs',
  hot: true,
  clipboard: false,
  add: (app, middleware, options) => {
    app.use(webpackServeWaitpage(options, {
      title: 'development',
      disableWhenValid: false,
      template: require('fs').readFileSync(require('path').resolve(__dirname, 'kichenama.ejs'), 'utf8'),
    }));
  }
};

config.devServer = {
  contentBase: require('path').resolve(__dirname, './docs')
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
    excludeChunks: [ 'worker' ],
  }),
  // new webpack.HotModuleReplacementPlugin(),
];

config.mode = 'development';
config.performance.hints = false;

module.exports = config;
