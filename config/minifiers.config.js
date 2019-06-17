const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  uglify: new UglifyJSPlugin({
    uglifyOptions: {
      mangle: {
        keep_fnames: true,
      },
      warnings: false,
      compress: {
        'reduce_vars': false
      },
      output: {
        beautify: false,
        comments: false
      }
    },
    sourceMap: true,
    parallel: true,
  }),
  css: new OptimizeCSSAssetsPlugin({
    cssProcessorOptions: {
      discardComments: { removeAll: true },
    },
  })
};
