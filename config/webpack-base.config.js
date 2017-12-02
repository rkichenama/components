const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    docs: [
      './app/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../doc'),
  },
  module: {
    rules: [
      { // images
        test: /\.(jpe?g|gif|svg|png)$/,
        use: {
          loader: 'raw-loader',
        }
      },
      { // fonts
        test: /\.(woff|ttf|oft|eot)$/,
        use: {
          loader: 'raw-loader',
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
              'transform-class-properties'
            ],
          }
        },
      },
      { // stylesheets
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ]
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['vendor.js']
    }),
  ],
};
