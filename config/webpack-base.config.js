const path = require('path');
const webpack = require('webpack');

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
      { // code
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'env', {
                  'targets': {
                    'browsers': ['last 2 versions', 'safari >= 7'],
                  }
                }
              ],
              'react'
            ],
            plugins: [
              'transform-class-properties',
              'transform-object-rest-spread',
              'transform-runtime',
              'transform-async-to-generator',
            ],
          }
        },
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
      '.js',
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  mode: 'development',
};
