// @ts-nocheck
const config = require('./webpack-base.config');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const { pipe, setDevEnv, addStyleLoader, addHtml } = require('./mutators');

pipe(setDevEnv, addStyleLoader, addHtml('(dev) Components', 'dev'))(config);

module.exports = config;
