const { promisify } = require('util');
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
// const appendFile = promisify(fs.appendFile);
const { resolve, relative, basename, join } = require('path');
const walk = require('./walk');
const config = require('./webpack-base.config');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { generateFromFile } = require('react-to-typescript-definitions');

const rootFolder = resolve(__dirname, '../');

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
config.output.path = join(rootFolder, '/lib/');
config.output.library = 'rk-components';
config.output.libraryTarget = 'commonjs2';

const defineModule = async (name, filepath) => {
  await writeFile(`lib/${name}.d.ts`, generateFromFile(null, filepath, { topLevelModule: true }));
};

const writeIndexesCurry = () => {
  const index = fs.createWriteStream('lib/index.js', { flags: 'a' });
  const definitions = fs.createWriteStream('lib/index.d.ts', { flags: 'a' });
  return name => {
    index.write(`module.exports.${name} = require('./lib/${name}').default;\n`);
    definitions.write(`import ${name} from 'lib/${name}'; export var ${name};\n`);
  };
};

module.exports = async () => {
  const components = await walk(join(rootFolder, 'src'), file => /\.jsx$/.test(file));
  const writeIndexes = writeIndexesCurry();
  const definitions = [];

  config.entry = components.reduce((entries, component) => {
    const name = basename(component, '.jsx');
    const folder = relative(rootFolder, component);
    entries[name] = [ `./${folder}` ];
    definitions.push(defineModule(name, folder));
    writeIndexes(name);
    return entries;
  }, { });

  await Promise.all(definitions);

  return config;
};
