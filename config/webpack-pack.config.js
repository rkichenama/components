const path = require('path');
const walk = require('./walk');
const config = require('./webpack-base.config');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const rootFolder = path.resolve(__dirname, '../');

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
  new MiniCssExtractPlugin({
    filename: '[name].css'
  }),
];

config.mode = 'production';
config.target = 'web';
config.optimization = undefined;
config.externals = [
  'react',
  'react-dom',
  'prop-types',
  'axios',
]; // everything that would have been in the vendor bundle
config.output.path = path.join(rootFolder, '/lib/');
config.output.library = 'rk-components';
config.output.libraryTarget = 'commonjs2';

module.exports = async () => {
  const components = await walk(path.join(rootFolder, 'src'), file => /\.jsx$/.test(file));

  config.entry = components.reduce((entries, component) => {
    const name = path.basename(component, '.jsx');
    const folder = path.relative(rootFolder, component);
    entries[name] = [ `./${ folder }` ];
    entries.index.push(`./${ folder }`);
    return entries;
  }, { index: [] });

  return config;
};
