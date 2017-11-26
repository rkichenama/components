module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
        ]
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'}
        ]
      },
      // images
      { test: /\.png$/, loader: 'url-loader?limit=10000' },
      { test: /\.gif$/, loader: 'url-loader?limit=10000' },
      // fonts
      { test: /\.woff/, loader: 'file-loader' },
      { test: /\.svg/, loader: 'file-loader' },
      { test: /\.ttf/, loader: 'file-loader' },
      { test: /\.otf/, loader: 'file-loader' },
      { test: /\.eot/, loader: 'file-loader' }
    ]
  }
};
