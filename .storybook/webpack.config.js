// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

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
      { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=10000' },
      // fonts
      { test: /\.woff/, loader: 'file-loader' },
      { test: /\.svg/, loader: 'file-loader' },
      { test: /\.ttf/, loader: 'file-loader' },
      { test: /\.otf/, loader: 'file-loader' },
      { test: /\.eot/, loader: 'file-loader' }
    ]
  }
};
