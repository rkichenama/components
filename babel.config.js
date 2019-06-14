const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-syntax-object-rest-spread',
  '@babel/plugin-transform-runtime',
  '@babel/plugin-transform-async-to-generator'
];

const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        browsers: ['last 2 versions', 'safari >= 7']
      }
    }
  ],
  '@babel/preset-react'
];

if (process.env.NODE_ENV !== 'production') {
  plugins.push('babel-plugin-typescript-to-proptypes');
}

module.exports = {
  presets,
  plugins
};
// https://iamturns.com/typescript-babel/
