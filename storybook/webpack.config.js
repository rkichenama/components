const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /scss$/,
        loaders: ["style", "css", "sass"],
        include: path.resolve(__dirname, '../src')
      },
      {
        test: /css$/,
        loaders: ["style", "css"],
        include: path.resolve(__dirname, '../node_modules')
      },
      // images
      { test: /\.png$/, loader: 'url-loader?limit=10000' },
      { test: /\.gif$/, loader: 'url-loader?limit=10000' },
      // fonts
      { test: /\.woff2/, loader: 'file-loader' },
      { test: /\.woff/, loader: 'file-loader' },
      { test: /\.svg/, loader: 'file-loader' },
      { test: /\.ttf/, loader: 'file-loader' },
      { test: /\.otf/, loader: 'file-loader' },
      { test: /\.eot/, loader: 'file-loader' }
    ]
  }
};
