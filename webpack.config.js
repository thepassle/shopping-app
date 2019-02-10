const path = require('path');
const createDefaultConfig = require('@open-wc/building-webpack/default-config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const { resolve, join } = require('path');

const defaultConfig = createDefaultConfig({
  indexHTML: path.resolve(__dirname, './src/index.html'),
  indexJS: path.resolve(__dirname, './src/index.js'),
});

const images = [{
    from: resolve(`./src/img`),
    to: join(resolve('dist'), 'img'),
    flatten: true
}];

module.exports = merge(defaultConfig, {
	plugins: [
		new CopyWebpackPlugin(images)
	]
});