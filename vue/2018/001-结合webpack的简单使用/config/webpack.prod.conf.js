const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackDevConfig = require('./webpack.dev.conf');
const path = require('path');

webpackDevConfig.plugins = [];

module.exports = merge(webpackDevConfig, {
    output: {
        filename: '[name].[hash].js', // 将出口文件重命名 为了解决 浏览器缓存问题，提升用户体验
        publicPath: ''
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"' // 定义当前node环境为生产环境
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: false // 压缩js
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index-prod.html'),
            filename: path.resolve(__dirname, '../dist/index.html'),
            inject: true
        })
    ]
});