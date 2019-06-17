const path = require('path');
const webpack = require('webpack');
const babelrc = require('../babel.config');

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    docs: [ './app/index.js' ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../docs'),
  },
  module: {
    rules: [
      { // images
        test: /\.(jpe?g|gif|svg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'media/[name].[hash:8].[ext]',
          }
        }
      },
      { // fonts
        test: /\.(woff2?|ttf|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          }
        }
      },
      { // javascript and typescript
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: babelrc
        }
      },
      { //typescript
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            transpileOnly: true
          }
        }
      },
      { // stylesheets
        test: /\.module\.s?css$/,
        use: [
          { loader: 'css-loader', options: {
            modules: true,
            localIdentName: '[local]---[hash:base64:5]',
            importLoaders: 1
          } },
          { loader: 'sass-loader', options: { outputStyle: 'compressed' } },
        ]
      },
      { // stylesheets
        test: /\.s?css$/,
        use: [
          { loader: 'css-loader' },
          { loader: 'sass-loader', options: { outputStyle: 'compressed' } },
        ]
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
      },
    },
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 2000000, // 2MB
    maxAssetSize: 1000000, // 1MB
    assetFilter: file => file.endsWith('.js')
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['vendor.js']
    }),
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, '../src/'),
    },
    extensions: [
      '.jsx',
      '.tsx',
      '.js',
      '.ts'
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  mode: 'development'
};
