// webpack v4
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        })
    ],
    resolve: {
        alias: {
            engine: path.resolve(__dirname, 'engine/')
        }
    }
};
